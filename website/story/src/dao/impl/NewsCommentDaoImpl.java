package dao.impl;


import java.util.List;
import java.util.Map;

import org.glaze.framework.core.persistent.base.impl.BaseDaoImpl;

import pojo.NewsComment;
import vo.NewsCommentBean;
import constants.SystemConstants;
import dao.NewsCommentDao;

public class NewsCommentDaoImpl extends BaseDaoImpl<NewsComment, Integer>
		implements NewsCommentDao {

	@Override
	public List<NewsComment> selectNewsCommentByIndex(int newsCommentId,
			int... rowStartIdxAndCount) {
		String jpql = "SELECT model FROM pojo.NewsComment model WHERE model.commentUserId ="
				+ newsCommentId + " ORDER BY model.date DESC";

		List<NewsComment> list = findByJPQL(jpql, rowStartIdxAndCount);

		return list;
	}

	@Override
	public List<NewsComment> selectNewsCommenttByCommentUserId(
			int commentUserId, int... rowStartIdxAndCount) {
		String jpql = "SELECT model FROM pojo.NewsComment model WHERE model.newsId ="
				+ commentUserId + " ORDER BY model.date DESC";

		List<NewsComment> list = findByJPQL(jpql, rowStartIdxAndCount);

		return list;
	}

	@Override
	public boolean deleteCommentByNews(int newsId) {

		String sql = "DELETE FROM newscomment WHERE newscomment.newsId="
				+ newsId;

		return executiveSQLUpdate(sql);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<NewsCommentBean> selectNewsCommentBean(String sord,
			String sidx, int... rowStartIdxAndCount) {

		StringBuilder sql = new StringBuilder(SystemConstants.StringBuilderInitSize);
		sql
				.append("SELECT newscomment.id,newscomment.commentMessage,newscomment.date,user.name,news.title ");
		sql.append("FROM newscomment newscomment,user user,news news ");
		sql
				.append("WHERE newscomment.commentUserId = user.id AND newscomment.newsId=news.id ORDER BY ");
		sql.append(sidx).append(" ").append(sord).append(" LIMIT ?,?");

		return (List<NewsCommentBean>) quaryGridListPrepare(sql.toString(),
				NewsCommentBean.class,rowStartIdxAndCount[0],rowStartIdxAndCount[1]);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<NewsCommentBean> searchNewsCommentBean(String serchType,
			Map<String, Object> conditionMap, String sord, String sidx,
			int... rowStartIdxAndCount) {

		// 拼写前置sql语句
		StringBuilder sql = new StringBuilder(SystemConstants.StringBuilderInitSize);
		sql
				.append("SELECT newscomment.id,newscomment.commentMessage,newscomment.date,user.name,news.title ");
		sql.append("FROM newscomment newscomment,user user,news news ");
		sql
				.append("WHERE newscomment.commentUserId = user.id AND newscomment.newsId=news.id ");

		// 拼装多关联按条件查询的sql语句
		buildSearchSQL(serchType, sql, conditionMap, sord, sidx,
				rowStartIdxAndCount);

		logger.info("sql:" + sql.toString());

		return (List<NewsCommentBean>) quaryGridList(sql.toString(),
				NewsCommentBean.class);

	}

	@Override
	public long searchNewsCommentsNum(String serchType,
			Map<String, Object> conditionMap, int... rowStartIdxAndCount) {

		StringBuilder sql = new StringBuilder(SystemConstants.StringBuilderInitSize);
		sql
				.append("SELECT COUNT(newscomment.id) FROM newscomment newscomment,user user,news news ");
		sql
				.append("WHERE newscomment.commentUserId = user.id AND newscomment.newsId=news.id ");

		buildSearchCountSQL(serchType, sql, conditionMap);

		logger.info("sql:" + sql.toString());

		return countNumSQLQuick(sql.toString());

	}

}
