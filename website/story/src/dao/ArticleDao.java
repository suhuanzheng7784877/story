package dao;


import java.util.List;
import java.util.Map;

import org.glaze.framework.core.persistent.base.BaseDao;

import pojo.Article;
import vo.ArticleBean;

public interface ArticleDao extends BaseDao<Article, Integer> {

	/**
	 * 查询grid的数据
	 * 
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List<ArticleBean> selectArticleBean(String sord, String sidx,
			int... rowStartIdxAndCount);

	public ArticleBean selectOneArticleBean(int id);

	/**
	 * 按照用户查询相关的异闻录记录
	 * 
	 * @param userId
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List<Article> selectArticleByUserId(final int authorUserId,
			final int... rowStartIdxAndCount);

	/**
	 * 将首页要显示的异闻录查询出来
	 * 
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List<Article> selectArticleByIndex(final int... rowStartIdxAndCount);

	/**
	 * 申请将其播放为mp3
	 * 
	 * @param articleId
	 * @return
	 */
	public boolean applyPlayToMp3(int articleId);

	/**
	 * 按条件查询
	 * 
	 * @param serchType
	 * @param map
	 * @param sord
	 * @param sidx
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List<ArticleBean> searchArticleBean(String serchType,
			Map<String, Object> conditionMap, String sord, String sidx,
			int... rowStartIdxAndCount);

	/**
	 * 统计按条件的总记录数
	 * 
	 * @param serchType
	 * @param conditionMap
	 * @param sord
	 * @param sidx
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public long searchArticlesNum(String serchType,
			Map<String, Object> conditionMap, int... rowStartIdxAndCount);

}
