package dao;

import org.glaze.framework.core.persistent.base.BaseDao;

import pojo.User;

public interface UserDao extends BaseDao<User, Integer> {

	/**
	 * 登录是否成功
	 * 
	 * @param user
	 * @return
	 */
	public boolean loginSuccess(User user);
	
	/**
	 * 登录是否成功
	 * 
	 * @param user
	 * @return
	 */
	public boolean userIsExist(String userId);
	
	/**
	 * 获得所有的用户的主键
	 * @return
	 */
	public int[] getAllUserIds();

}
