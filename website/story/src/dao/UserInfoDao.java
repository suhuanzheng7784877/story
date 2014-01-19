package dao;

import org.glaze.framework.core.persistent.base.BaseDao;

import pojo.UserInfo;

public interface UserInfoDao extends BaseDao<UserInfo, Integer> {
	
	/**
	 * 更新用户头像
	 * @param id
	 * @param newUserHeadUrl
	 * @return
	 */
	public boolean updateUserheadurl(int id,String newUserHeadUrl);
	
	/**
	 * 增加用户经验
	 * @param id
	 * @param experience
	 * @return
	 */
	public boolean addUserexperience(int id,int experience);
	
	/**
	 * 增加用户积分
	 * @param id
	 * @param experience
	 * @return
	 */
	public boolean addUserscore(int id,int score);
	
	/**
	 * 减少用户积分
	 * @param id
	 * @param experience
	 * @return
	 */
	public boolean decreaseUserscore(int id,int score);
	
}
