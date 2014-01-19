package dao.impl;


import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.glaze.framework.core.persistent.base.impl.BaseDaoImpl;

import constants.SystemConstants;

import pojo.Article;
import vo.ArticleBean;
import dao.ArticleDao;

public class ArticleDaoImpl extends BaseDaoImpl<Article, Integer> implements
		ArticleDao {

	@Override
	public List<Article> selectArticleByUserId(int authorUserId,
			int... rowStartIdxAndCount) {

		String jpql = "SELECT model FROM pojo.Article model WHERE 1=1 AND model.authorUserId ="
				+ authorUserId + " ORDER BY model.date DESC";

		List<Article> list = findByJPQL(jpql, rowStartIdxAndCount);

		return list;
	}

	@Override
	public boolean applyPlayToMp3(int articleId) {
		String sql = "UPDATE article SET isPass=1 WHERE id=" + articleId;
		return executiveSQLUpdate(sql);
	}

	@Override
	public List<Article> selectArticleByIndex(final int... rowStartIdxAndCount) {
		String jpql = "SELECT model FROM pojo.Article model ORDER BY model.date DESC";

		List<Article> list = findByJPQL(jpql, rowStartIdxAndCount);

		return list;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ArticleBean> selectArticleBean(String sord, String sidx,
			int... rowStartIdxAndCount) {

		StringBuilder sql = new StringBuilder(SystemConstants.StringBuilderInitSize);
		sql
				.append("SELECT article.id,article.date,article.isPass,article.title,user.name ");
		sql.append("FROM article article LEFT JOIN user user ");
		sql.append("ON user.id = article.authorUserId ORDER BY ");
		sql.append(sidx).append(" ").append(sord).append(" LIMIT ?,?");

		return (List<ArticleBean>) selectGridBeanPrepare(sql.toString(), sord, sidx,
				rowStartIdxAndCount);

	}

	@SuppressWarnings("unchecked")
	public List<ArticleBean> searchArticleBean(String serchType,
			Map<String, Object> conditionMap, String sord, String sidx,
			int... rowStartIdxAndCount) {

		// 拼写前置sql语句
		StringBuilder sql = new StringBuilder(SystemConstants.StringBuilderInitSize);
		sql.append("SELECT article.id,article.date,article.isPass,article.title,user.name ");
		sql.append("FROM article article,user user ");
		sql.append("WHERE article.authorUserId = user.id ");

		// 拼装多关联按条件查询的sql语句
		buildSearchSQL(serchType, sql, conditionMap, sord, sidx,
				rowStartIdxAndCount);

		logger.info("sql:" + sql.toString());

		return (List<ArticleBean>) selectGridBean(sql.toString(), sord, sidx,
				rowStartIdxAndCount);

	}

	public ArticleBean selectOneArticleBean(int id) {

		StringBuilder sql = new StringBuilder(SystemConstants.StringBuilderInitSize);
		sql.append("SELECT article.*,user.name FROM article article,user user ");
		sql.append("WHERE article.authorUserId = user.id AND article.id=?");

		return (ArticleBean) selectOneGridBean(sql.toString(),id);

	}

	@Override
	public long searchArticlesNum(String serchType,
			Map<String, Object> conditionMap, int... rowStartIdxAndCount) {

		StringBuilder sql = new StringBuilder(SystemConstants.StringBuilderInitSize);
		sql.append("SELECT COUNT(article.id) FROM article article,user user ");
		sql.append("WHERE article.authorUserId = user.id ");

		buildSearchCountSQL(serchType, sql, conditionMap);

		logger.info("sql:" + sql.toString());

		return countNumSQLQuick(sql.toString());

	}

	@SuppressWarnings("unchecked")
	protected void buildSerializable(ResultSet resultSet, List list)
			throws SQLException {
		ArticleBean articleBean = null;
		while (resultSet.next()) {
			int id = resultSet.getInt(1);
			String date = resultSet.getString(2);
			String isPassInt = resultSet.getString(3);
			String title = resultSet.getString(4);
			String name = resultSet.getString(5);
			String isPass = "";
			if ("0".equals(isPassInt)) {
				isPass = "未申请";
			} else if ("1".equals(isPassInt)) {
				isPass = "提交申请";
			} else if ("2".equals(isPassInt)) {
				isPass = "通过";
			}
			articleBean = new ArticleBean();
			articleBean.setId(id);
			articleBean.setDate(date);
			articleBean.setName(name);
			articleBean.setTitle(title);
			articleBean.setIsPass(isPass);
			list.add(articleBean);
			articleBean = null;
		}

	}

	protected ArticleBean buildSerializable(ResultSet resultSet)
			throws SQLException {
		ArticleBean articleBean = null;
		while (resultSet.next()) {
			int id = resultSet.getInt(1);
			String content = resultSet.getString(3);
			String date = resultSet.getString(4);
			String isPassInt = resultSet.getString(5);
			String title = resultSet.getString(6);
			String name = resultSet.getString(7);
			String isPass = "";
			if ("0".equals(isPassInt)) {
				isPass = "未申请";
			} else if ("1".equals(isPassInt)) {
				isPass = "提交申请";
			} else if ("2".equals(isPassInt)) {
				isPass = "通过";
			}
			articleBean = new ArticleBean();
			articleBean.setId(id);
			articleBean.setContent(content);
			articleBean.setDate(date);
			articleBean.setName(name);
			articleBean.setTitle(title);
			articleBean.setIsPass(isPass);
		}

		return articleBean;

	}

}
