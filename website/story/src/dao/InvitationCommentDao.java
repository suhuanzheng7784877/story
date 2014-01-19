package dao;


import java.util.List;
import java.util.Map;

import org.glaze.framework.core.persistent.base.BaseDao;

import pojo.InvitationComment;
import vo.InvitationCommentBean;

/**
 * 贴子评论
 * 
 * @author liuyann
 */
public interface InvitationCommentDao extends BaseDao<InvitationComment, Integer> {

	/**
	 * 该用户对于贴子的评论
	 * 
	 * @param userId
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List<InvitationComment> selectInvitationCommentByCommentUserId(
			final int commentUserId, final int... rowStartIdxAndCount);

	/**
	 * 该贴子的评论
	 * 
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List<InvitationComment> selectInvitationCommentByInvitationId(
			final int invitationId, final int... rowStartIdxAndCount);
	
	/**
	 * 按照热点主题，删除论坛贴子评论
	 * @param topicId
	 * @return
	 */
	public boolean deleteInvitationByTopic(int topicId);
	
	/**
	 * 按照帖子，删除贴子评论
	 * @param invitationId
	 * @return
	 */
	public boolean deleteCommentByInvitation(int invitationId);
	
	public List<InvitationCommentBean> selectInvitationCommentBean(String sord,
			String sidx, int... rowStartIdxAndCount);
	
	public List<InvitationCommentBean> searchInvitationCommentBean(String serchType,
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
	public long searchInvitationCommentBeansNum(String serchType,
			Map<String, Object> conditionMap, int... rowStartIdxAndCount);

}
