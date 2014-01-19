package dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.glaze.framework.core.persistent.base.impl.BaseDaoImpl;

import constants.SystemConstants;

import pojo.ArticleComment;
import vo.ArticleCommentBean;
import dao.ArticleCommentDao;

public class ArticleCommentDaoImpl extends BaseDaoImpl<ArticleComment, Integer>
		implements ArticleCommentDao {

	@SuppressWarnings("unchecked")
	@Override
	public List<ArticleComment> selectArticleCommentByCommentUserId(
			int commentUserId, int... rowStartIdxAndCount) {

		StringBuilder sql = new StringBuilder(
				SystemConstants.StringBuilderInitSize);

		sql
				.append("SELECT * FROM articlecomment articlecomment ");
		sql.append("WHERE articlecomment.commentUserId =?");
		sql.append(" ORDER BY articlecomment.date DESC");

		List<ArticleComment> list = (List<ArticleComment>) quaryGridListPrepare(
				sql.toString(), ArticleComment.class, commentUserId);

		return list;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ArticleComment> selectArticleCommentByIndex(int articleId,
			int... rowStartIdxAndCount) {
		StringBuilder sql = new StringBuilder(
				SystemConstants.StringBuilderInitSize);
		sql
				.append("SELECT * FROM articlecomment articlecomment ");
		sql.append("WHERE articlecomment.articleId =?");
		sql.append(" ORDER BY articlecomment.date DESC");

		List<ArticleComment> list = (List<ArticleComment>) quaryGridListPrepare(
				sql.toString(), ArticleComment.class, articleId);

		return list;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ArticleCommentBean> selectArticleCommentBean(String sord,
			String sidx, int... rowStartIdxAndCount) {

		StringBuilder sql = new StringBuilder(
				SystemConstants.StringBuilderInitSize);
		sql
				.append("SELECT articlecomment.id,articlecomment.commentMessage,articlecomment.date,user.name,article.title ");
		sql
				.append("FROM articlecomment articlecomment,user user,article article ");
		sql
				.append("WHERE articlecomment.commentUserId = user.id AND articlecomment.articleId=article.id ORDER BY ");
		sql.append(sidx).append(" ").append(sord).append(" LIMIT ?,?");

		return (List<ArticleCommentBean>) selectGridBeanPrepare(sql.toString(),
				sord, sidx, rowStartIdxAndCount);
	}

	@SuppressWarnings("unchecked")
	protected void buildSerializable(ResultSet resultSet, List list)
			throws SQLException {
		ArticleCommentBean articleCommentBean = null;
		while (resultSet.next()) {
			int id = resultSet.getInt(1);
			String commentMessage = resultSet.getString(2);
			String commentDate = resultSet.getString(3);
			String name = resultSet.getString(4);
			String title = resultSet.getString(5);
			articleCommentBean = new ArticleCommentBean();
			articleCommentBean.setCommentId(id);
			articleCommentBean.setCommentDate(commentDate);
			articleCommentBean.setCommentMessage(commentMessage);
			articleCommentBean.setCommentUserName(name);
			articleCommentBean.setTitle(title);

			list.add(articleCommentBean);
			articleCommentBean = null;
		}

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ArticleCommentBean> searchArticleCommentBean(String serchType,
			Map<String, Object> conditionMap, String sord, String sidx,
			int... rowStartIdxAndCount) {

		// 拼写前置sql语句
		StringBuilder sql = new StringBuilder(
				SystemConstants.StringBuilderInitSize);

		sql
				.append("SELECT articlecomment.*,user.name,article.title FROM articlecomment articlecomment,user user,article article ");
		sql
				.append("WHERE articlecomment.commentUserId = user.id AND articlecomment.articleId=article.id ");

		// 拼装多关联按条件查询的sql语句
		buildSearchSQL(serchType, sql, conditionMap, sord, sidx,
				rowStartIdxAndCount);

		logger.info("sql:" + sql.toString());

		return (List<ArticleCommentBean>) selectGridBean(sql.toString(), sord,
				sidx, rowStartIdxAndCount);

	}

	@Override
	public long searchArticleCommentBeansNum(String serchType,
			Map<String, Object> conditionMap, int... rowStartIdxAndCount) {

		StringBuilder sql = new StringBuilder(
				SystemConstants.StringBuilderInitSize);
		sql
				.append("SELECT COUNT(articlecomment.id) FROM articlecomment articlecomment,user user,article article ");
		sql
				.append("WHERE articlecomment.commentUserId = user.id AND articlecomment.articleId=article.id ");

		buildSearchCountSQL(serchType, sql, conditionMap);

		logger.info("sql:" + sql.toString());

		return countNumSQLQuick(sql.toString());

	}

}
