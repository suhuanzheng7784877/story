package dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.glaze.framework.core.persistent.base.impl.BaseDaoImpl;

import pojo.ShortMessage;
import constants.SystemConstants;
import dao.ShortMessageDao;

public class ShortMessageDaoImpl extends BaseDaoImpl<ShortMessage, Integer>
		implements ShortMessageDao {

	@Override
	public long countUnReadMessage(int toUserId) {

		String sql = "SELECT COUNT(id) FROM shortmessage WHERE toUserId=? AND isread = 0";

		long countNum = executiveSQLSelectCount(sql,toUserId);

		return countNum;
	}

	@Override
	public List<ShortMessage> selectShortMessageByUserId(int toUserId,
			int... rowStartIdxAndCount) {
		String jpql = "SELECT model FROM pojo.ShortMessage model WHERE 1=1 AND model.toUserId ="
				+ toUserId + " ORDER BY model.date DESC";

		List<ShortMessage> list = findByJPQL(jpql, rowStartIdxAndCount);

		return list;
	}

	@Override
	public List<ShortMessage> selectUnReadShortMessageByIndex(int toUserId,
			int... rowStartIdxAndCount) {
		String jpql = "SELECT model FROM pojo.ShortMessage model WHERE 1=1 AND model.toUserId ="
				+ toUserId
				+ " AND model.isRead = false ORDER BY model.date DESC";

		List<ShortMessage> list = findByJPQL(jpql, rowStartIdxAndCount);

		return list;
	}

	@Override
	public boolean updateReadShortMessage(int shortMessageId) {
		String sql = "UPDATE shortmessage SET isread=true WHERE id="
				+ shortMessageId;
		return executiveSQLUpdate(sql);
	}

	@Override
	public boolean sendAllUserMessageJPA(String title, String message,
			Object[] userIds, int sendUserId) {
		ShortMessage shortMessage = null;

		int userIdsLength = userIds.length;

		List<ShortMessage> shortMessageList = new ArrayList<ShortMessage>(
				userIdsLength);
		for (Object toUserId : userIds) {
			shortMessage = new ShortMessage();
			shortMessage.setDate(new Date());
			shortMessage.setMessage(message);
			shortMessage.setRead(false);
			shortMessage.setSendUserId(sendUserId);
			shortMessage.setTitle(title);
			shortMessage.setToUserId(Integer.parseInt(toUserId.toString()));
			shortMessageList.add(shortMessage);
		}

		// 批量提交
		saveBatchJPA(shortMessageList);

		return false;
	}

	@Override
	public boolean sendAllUserMessagePreparedSql(String title, String message,
			int[] userIds, int sendUserId) {

		int userIdslength = userIds.length;

		List<Object[]> parameterList = new ArrayList<Object[]>(userIdslength);

		String sql = "INSERT INTO shortmessage (date,isread,message,sendUserId,title,toUserId) VALUES(now(),false,?,?,?,?)";
		Object[] objects = null;
		for (int i = 0; i < userIdslength; i++) {
			int userId = userIds[i];
			objects = new Object[4];
			objects[0] = message;
			objects[1] = sendUserId;
			objects[2] = title;
			objects[3] = userId;
			parameterList.add(objects);
			objects = null;
		}

		return saveBatchSQL(sql, parameterList);
	}

	@Override
	public boolean sendAllUserMessageSql(String title, String message,
			Object[] userIds, int sendUserId) {

		int userIdslength = userIds.length;
		StringBuilder[] sqlBatch = new StringBuilder[userIdslength];

		for (int i = 0; i < userIdslength; i++) {
			int userId = (Integer) userIds[i];
			sqlBatch[i] = new StringBuilder(SystemConstants.StringBuilderInitSize);
			sqlBatch[i]
					.append("INSERT INTO shortmessage (date,isread,message,sendUserId,title,toUserId) ");
			sqlBatch[i].append("VALUES(").append("now(),").append("false,'")
					.append(message).append("',").append(sendUserId);

			sqlBatch[i].append(",'").append(title).append("',").append(userId)
					.append(")");

		}

		return saveBatchSQL(sqlBatch);

	}
}
