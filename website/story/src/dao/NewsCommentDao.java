package dao;


import java.util.List;
import java.util.Map;

import org.glaze.framework.core.persistent.base.BaseDao;

import pojo.NewsComment;
import vo.NewsCommentBean;

/**
 * 异闻录评论
 * 
 * @author liuyann
 */
public interface NewsCommentDao extends BaseDao<NewsComment, Integer> {

	/**
	 * 该用户对于异闻录的评论
	 * 
	 * @param userId
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List<NewsComment> selectNewsCommenttByCommentUserId(
			final int commentUserId, final int... rowStartIdxAndCount);

	/**
	 * 该异闻录的评论
	 * 
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List<NewsComment> selectNewsCommentByIndex(final int newsCommentId,
			final int... rowStartIdxAndCount);

	/**
	 * 按照新闻主键删除相关的评论
	 * 
	 * @param newsId
	 * @return
	 */
	public boolean deleteCommentByNews(int newsId);

	public List<NewsCommentBean> selectNewsCommentBean(String sord,
			String sidx, int... rowStartIdxAndCount);

	public List<NewsCommentBean> searchNewsCommentBean(String serchType,
			Map<String, Object> conditionMap, String sord, String sidx,
			int... rowStartIdxAndCount);

	public long searchNewsCommentsNum(String serchType,
			Map<String, Object> conditionMap, int... rowStartIdxAndCount);

}
