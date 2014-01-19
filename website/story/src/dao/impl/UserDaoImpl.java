package dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.glaze.framework.core.persistent.base.impl.BaseDaoImpl;

import pojo.User;
import dao.UserDao;

public class UserDaoImpl extends BaseDaoImpl<User, Integer> implements UserDao {

	@Override
	public boolean loginSuccess(User user) {
		Map<String, Object> conditionMap = new HashMap<String, Object>(4,0.75F);
		conditionMap.put("name", user.getName());
		conditionMap.put("password", user.getPassword());

		List<User> users = findByProperty(conditionMap);
		User userFind = null;
		if (1 == users.size()) {
			userFind = users.get(0);
			user.setId(userFind.getId());
			user.setEmail(userFind.getEmail());
			return true;
		}
		return false;
	}

	@Override
	public boolean userIsExist(String userId) {

		Map<String, Object> conditionMap = new HashMap<String, Object>(4);
		conditionMap.put("name", userId);

		List<User> users = findByProperty(conditionMap);
		if (1 == users.size()) {
			return true;
		}
		return false;

	}

	@Override
	public int[] getAllUserIds() {
		String sql = "SELECT id FROM user";

		int[] result = selectIntIds(sql);
		if (result != null && result.length > 0) {
			return result;
		} else {
			return null;
		}
	}

}
