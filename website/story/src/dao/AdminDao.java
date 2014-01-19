package dao;

import org.glaze.framework.core.persistent.base.BaseDao;

import pojo.Admin;

public interface AdminDao extends BaseDao<Admin, Integer> {

	/**
	 * 管理员登录
	 * 
	 * @param admin
	 * @return
	 */
	public boolean adminLogin(Admin admin);

}
