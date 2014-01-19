package dao.impl;

import org.glaze.framework.core.persistent.base.impl.BaseDaoImpl;

import constants.SystemConstants;

import pojo.UserInfo;
import dao.UserInfoDao;

public class UserInfoDaoImpl extends BaseDaoImpl<UserInfo, Integer> implements
		UserInfoDao {

	@Override
	public boolean addUserexperience(int id, int experience) {

		StringBuilder sql = new StringBuilder(
				SystemConstants.StringBuilderInitSize);
		sql.append("UPDATE userinfo SET experience=experience+").append(
				experience).append(" WHERE id=").append(id);

		return executiveSQLUpdate(sql.toString());
	}

	@Override
	public boolean addUserscore(int id, int score) {

		StringBuilder sql = new StringBuilder(
				SystemConstants.StringBuilderInitSize);
		sql.append("UPDATE userinfo SET score=score+").append(score).append(
				" WHERE id=").append(id);

		return executiveSQLUpdate(sql.toString());

	}

	@Override
	public boolean decreaseUserscore(int id, int score) {
		StringBuilder sql = new StringBuilder(
				SystemConstants.StringBuilderInitSize);
		sql.append("UPDATE userinfo SET score=score-").append(score).append(
				" WHERE id=").append(id);

		return executiveSQLUpdate(sql.toString());
	}

	@Override
	public boolean updateUserheadurl(int id, String newUserHeadUrl) {
		StringBuilder sql = new StringBuilder(
				SystemConstants.StringBuilderInitSize);
		sql.append("UPDATE userinfo SET userheadurl='").append(newUserHeadUrl)
				.append("' WHERE id=").append(id);

		return executiveSQLUpdate(sql.toString());
	}

}
