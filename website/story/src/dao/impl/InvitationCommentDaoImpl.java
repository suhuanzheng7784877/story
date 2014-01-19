package dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.glaze.framework.core.persistent.base.impl.BaseDaoImpl;

import pojo.InvitationComment;
import vo.InvitationCommentBean;
import constants.SystemConstants;
import dao.InvitationCommentDao;

public class InvitationCommentDaoImpl extends
		BaseDaoImpl<InvitationComment, Integer> implements InvitationCommentDao {

	@Override
	public List<InvitationComment> selectInvitationCommentByCommentUserId(
			int commentUserId, int... rowStartIdxAndCount) {

		String jpql = "SELECT model FROM pojo.InvitationComment model WHERE model.commentUserId="
				+ commentUserId + " ORDER BY model.date DESC";

		List<InvitationComment> list = findByJPQL(jpql, rowStartIdxAndCount);

		return list;

	}

	@SuppressWarnings("unchecked")
	protected void buildSerializable(ResultSet resultSet, List list)
			throws SQLException {
		InvitationCommentBean invitationCommentBean = null;
		while (resultSet.next()) {
			int id = resultSet.getInt(1);
			String commentMessage = resultSet.getString(2);
			Date commentDate = resultSet.getDate(4);
			String name = resultSet.getString(6);
			String title = resultSet.getString(7);
			invitationCommentBean = new InvitationCommentBean();
			invitationCommentBean.setId(id);
			invitationCommentBean.setDate(commentDate);
			invitationCommentBean.setCommentMessage(commentMessage);
			invitationCommentBean.setName(name);
			invitationCommentBean.setTitle(title);

			list.add(invitationCommentBean);
		}

	}

	@Override
	public List<InvitationComment> selectInvitationCommentByInvitationId(
			int invitationId, int... rowStartIdxAndCount) {

		String jpql = "SELECT model FROM pojo.InvitationComment model WHERE model.invitationId="
				+ invitationId + " ORDER BY model.date DESC";

		List<InvitationComment> list = findByJPQL(jpql, rowStartIdxAndCount);

		return list;

	}

	@Override
	public boolean deleteInvitationByTopic(int topicId) {
		StringBuilder sql = new StringBuilder(
				SystemConstants.StringBuilderInitSize);
		sql
				.append("DELETE FROM invitationcomment WHERE invitationcomment.invitationId IN ");
		sql.append("(SELECT invitation.id FROM invitation,topic ");
		sql.append(
				"WHERE invitation.topicId = topic.id AND topic.id=" + topicId)
				.append(")");

		return executiveSQLUpdate(sql.toString());
	}

	/**
	 * 按照帖子，删除贴子评论
	 * 
	 * @param invitationId
	 * @return
	 */
	public boolean deleteCommentByInvitation(int invitationId) {

		StringBuilder sql = new StringBuilder(
				"DELETE FROM invitationcomment WHERE invitationcomment.invitationId = ");
		sql.append(invitationId);

		return executiveSQLUpdate(sql.toString());

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<InvitationCommentBean> selectInvitationCommentBean(String sord,
			String sidx, int... rowStartIdxAndCount) {

		StringBuilder sql = new StringBuilder(
				SystemConstants.StringBuilderInitSize);
		sql
				.append("SELECT invitationcomment.id,invitationcomment.commentMessage,invitationcomment.date,user.name,invitation.title ");
		sql
				.append("FROM invitationcomment invitationcomment,user user,invitation invitation ");
		sql
				.append("WHERE invitationcomment.commentUserId = user.id AND invitationcomment.invitationId=invitation.id ");
		sql.append("ORDER BY ").append(sidx).append(" ").append(sord).append(
				" LIMIT ?,?");

		return (List<InvitationCommentBean>) quaryGridListPrepare(sql
				.toString(), InvitationCommentBean.class,
				rowStartIdxAndCount[0], rowStartIdxAndCount[1]);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<InvitationCommentBean> searchInvitationCommentBean(
			String serchType, Map<String, Object> conditionMap, String sord,
			String sidx, int... rowStartIdxAndCount) {
		// 拼写前置sql语句
		StringBuilder sql = new StringBuilder(
				SystemConstants.StringBuilderInitSize);
		sql
				.append("SELECT invitationcomment.id,invitationcomment.commentMessage,invitationcomment.date,user.name,invitation.title ");
		sql
				.append("FROM invitationcomment invitationcomment,user user,invitation invitation ");
		sql
				.append("WHERE invitationcomment.commentUserId = user.id AND invitationcomment.invitationId=invitation.id ");

		// 拼装多关联按条件查询的sql语句
		buildSearchSQL(serchType, sql, conditionMap, sord, sidx,
				rowStartIdxAndCount);

		logger.info("sql:" + sql.toString());

		return (List<InvitationCommentBean>) selectGridBean(sql.toString(),
				sord, sidx, rowStartIdxAndCount);
	}

	@Override
	public long searchInvitationCommentBeansNum(String serchType,
			Map<String, Object> conditionMap, int... rowStartIdxAndCount) {

		StringBuilder sql = new StringBuilder(
				SystemConstants.StringBuilderInitSize);
		sql
				.append("SELECT COUNT(invitationcomment.id) FROM invitationcomment invitationcomment,user user,invitation invitation ");
		sql
				.append("WHERE invitationcomment.commentUserId = user.id AND invitationcomment.invitationId=invitation.id ");

		buildSearchCountSQL(serchType, sql, conditionMap);

		logger.info("sql:" + sql.toString());

		return countNumSQLQuick(sql.toString());
	}
}
