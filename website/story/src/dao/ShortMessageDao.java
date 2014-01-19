package dao;

import java.util.List;

import org.glaze.framework.core.persistent.base.BaseDao;

import pojo.ShortMessage;

public interface ShortMessageDao extends BaseDao<ShortMessage, Integer> {

	/**
	 * 按照用户查询所有短信息
	 * 
	 * @param userId
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List<ShortMessage> selectShortMessageByUserId(final int toUserId,
			final int... rowStartIdxAndCount);

	/**
	 * 选择未读取的短信息
	 * 
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List<ShortMessage> selectUnReadShortMessageByIndex(int toUserId,
			final int... rowStartIdxAndCount);

	/**
	 * 修改短信息状态为已读
	 * 
	 * @param articleId
	 * @return
	 */
	public boolean updateReadShortMessage(int shortMessageId);

	/**
	 * 统计未读取的短信息
	 * 
	 * @param userId
	 * @return
	 */
	public long countUnReadMessage(int toUserId);

	/**
	 * 给所有用户发短信息
	 * 
	 * @param message
	 * @return
	 */
	public boolean sendAllUserMessageJPA(String title, String message,
			Object[] toUserIds,int sendUserId);
	
	/**
	 * 给所有用户发短信息
	 * 
	 * @param message
	 * @return
	 */
	public boolean sendAllUserMessageSql(String title, String message,
			Object[] userIds,int sendUserId);
	
	/**
	 * 使用预编译给所有用户发短信息
	 * 
	 * @param message
	 * @return
	 */
	public boolean sendAllUserMessagePreparedSql(String title, String message,
			int[] userIds, int sendUserId);

}
