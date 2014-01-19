package dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.glaze.framework.core.persistent.base.impl.BaseDaoImpl;

import constants.SystemConstants;

import pojo.Invitation;
import vo.InvitationBean;
import dao.InvitationDao;

public class InvitationDaoImpl extends BaseDaoImpl<Invitation, Integer>
		implements InvitationDao {

	@Override
	public boolean deleteInvitationByTopic(int topicId) {

		String jpql = "DELETE FROM invitation WHERE topicId = " + topicId;

		return executiveSQLUpdate(jpql.toString());
	}

	@Override
	public List<Invitation> selectInvitationByIndex(int... rowStartIdxAndCount) {

		String jpql = "SELECT model FROM pojo.Invitation model ORDER BY model.date DESC";

		List<Invitation> list = findByJPQL(jpql, rowStartIdxAndCount);

		return list;

	}

	@Override
	public List<Invitation> selectInvitationByTopic(int topicId,
			int... rowStartIdxAndCount) {

		String jpql = "SELECT model FROM pojo.Invitation model WHERE model.topicId="
				+ topicId + " ORDER BY model.date DESC";

		List<Invitation> list = findByJPQL(jpql, rowStartIdxAndCount);

		return list;

	}

	@Override
	public List<Invitation> selectInvitationByUserId(int authorUserId,
			int... rowStartIdxAndCount) {

		String jpql = "SELECT model FROM pojo.Invitation model WHERE model.userId="
				+ authorUserId + " ORDER BY model.date DESC";

		List<Invitation> list = findByJPQL(jpql, rowStartIdxAndCount);

		return list;

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<InvitationBean> listInvitation(String sord, String sidx,
			int... rowStartIdxAndCount) {

		StringBuilder sql = new StringBuilder(
				SystemConstants.StringBuilderInitSize);
		sql
				.append("SELECT invitation.*,user.name,topic.topictitle FROM invitation invitation,user user,topic topic ");
		sql
				.append("WHERE invitation.userId = user.id AND topic.id = invitation.topicId ORDER BY ");
		sql.append(sidx).append(" ").append(sord).append(" LIMIT ");
		sql.append(rowStartIdxAndCount[0]).append(",").append(
				rowStartIdxAndCount[1]);

		return (List<InvitationBean>) selectGridBean(sql.toString(), sord,
				sidx, rowStartIdxAndCount);

	}

	@SuppressWarnings("unchecked")
	protected void buildSerializable(ResultSet resultSet, List list)
			throws SQLException {
		InvitationBean invitationBean = null;
		while (resultSet.next()) {
			int id = resultSet.getInt(1);
			String date = resultSet.getString(3);
			String title = resultSet.getString(4);
			String name = resultSet.getString(7);
			String topictitle = resultSet.getString(8);
			invitationBean = new InvitationBean();
			invitationBean.setDate(date);
			invitationBean.setId(id);
			invitationBean.setTitle(title);
			invitationBean.setTopicName(topictitle);
			invitationBean.setUserName(name);

			list.add(invitationBean);
		}

	}

	@Override
	public long searchInvitationBeansNum(String serchType,
			Map<String, Object> conditionMap, int... rowStartIdxAndCount) {

		StringBuilder sql = new StringBuilder(
				SystemConstants.StringBuilderInitSize);
		sql
				.append("SELECT COUNT(invitation.id) FROM invitation invitation,user user,topic topic ");
		sql
				.append("WHERE invitation.userId = user.id AND invitation.topicId = topic.id ");

		buildSearchCountSQL(serchType, sql, conditionMap);

		logger.info("sql:" + sql.toString());

		return countNumSQLQuick(sql.toString());

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<InvitationBean> searchInvitationBean(String serchType,
			Map<String, Object> conditionMap, String sord, String sidx,
			int... rowStartIdxAndCount) {

		// 拼写前置sql语句
		StringBuilder sql = new StringBuilder(
				SystemConstants.StringBuilderInitSize);
		sql
				.append("SELECT invitation.*,user.name,topic.topictitle FROM invitation invitation,user user,topic topic ");
		sql
				.append("WHERE invitation.userId = user.id AND invitation.topicId = topic.id ");

		// 拼装多关联按条件查询的sql语句
		buildSearchSQL(serchType, sql, conditionMap, sord, sidx,
				rowStartIdxAndCount);

		logger.info("sql:" + sql.toString());

		return (List<InvitationBean>) selectGridBean(sql.toString(), sord,
				sidx, rowStartIdxAndCount);
	}

}
