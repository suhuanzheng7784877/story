package dao;


import java.util.List;
import java.util.Map;

import org.glaze.framework.core.persistent.base.BaseDao;

import pojo.ArticleComment;
import vo.ArticleCommentBean;

/**
 * 异闻录评论
 * 
 * @author liuyann
 */
public interface ArticleCommentDao extends BaseDao<ArticleComment, Integer> {

	/**
	 * 该用户对于异闻录的评论
	 * 
	 * @param userId
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List<ArticleComment> selectArticleCommentByCommentUserId(
			final int commentUserId, final int... rowStartIdxAndCount);

	/**
	 * 该异闻录的评论
	 * 
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List<ArticleComment> selectArticleCommentByIndex(
			final int articleId, final int... rowStartIdxAndCount);
	
	public List<ArticleCommentBean> selectArticleCommentBean(String sord,
			String sidx, int... rowStartIdxAndCount);
	
	public List<ArticleCommentBean> searchArticleCommentBean(String serchType,
			Map<String, Object> conditionMap, String sord, String sidx,
			int... rowStartIdxAndCount);

	public long searchArticleCommentBeansNum(String serchType,
			Map<String, Object> conditionMap, int... rowStartIdxAndCount);

}
