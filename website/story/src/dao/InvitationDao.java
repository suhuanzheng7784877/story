package dao;


import java.util.List;
import java.util.Map;

import org.glaze.framework.core.persistent.base.BaseDao;

import pojo.Invitation;
import vo.InvitationBean;

/**
 * 论坛贴子dao
 * 
 * @author liuyan
 */
public interface InvitationDao extends BaseDao<Invitation, Integer> {

	/**
	 * 按照用户查询相关的贴子记录
	 * 
	 * @param userId
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List<Invitation> selectInvitationByUserId(final int authorUserId,
			final int... rowStartIdxAndCount);

	/**
	 * 将首页要显示的贴子查询出来
	 * 
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List<Invitation> selectInvitationByIndex(
			final int... rowStartIdxAndCount);

	/**
	 * 显示某个板块下面的贴子
	 * 
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List<Invitation> selectInvitationByTopic(final int topicId,
			final int... rowStartIdxAndCount);

	/**
	 * 删除板块下的所有帖子
	 * 
	 * @param topicId
	 * @return
	 */
	public boolean deleteInvitationByTopic(final int topicId);

	/**
	 * 显示贴子
	 * 
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List<InvitationBean> listInvitation(String sord, String sidx,
			int... rowStartIdxAndCount);

	public List<InvitationBean> searchInvitationBean(String serchType,
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
	public long searchInvitationBeansNum(String serchType,
			Map<String, Object> conditionMap, int... rowStartIdxAndCount);

}
