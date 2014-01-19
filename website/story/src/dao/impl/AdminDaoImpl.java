package dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.glaze.framework.core.persistent.base.impl.BaseDaoImpl;

import pojo.Admin;
import dao.AdminDao;

public class AdminDaoImpl extends BaseDaoImpl<Admin, Integer> implements
		AdminDao {
	
	@Override
	public boolean adminLogin(Admin admin) {
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("adminName", admin.getAdminName());
		conditionMap.put("password", admin.getPassword());

		List<Admin> admins = findByProperty(conditionMap);
		if (1 == admins.size()) {
			Admin adminFind = admins.get(0);
			admin.setId(adminFind.getId());
			return true;
		}
		return false;
	}

}
