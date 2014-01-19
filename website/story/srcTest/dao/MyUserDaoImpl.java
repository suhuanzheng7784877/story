package dao;

import org.glaze.framework.core.persistent.base.impl.BaseDaoImpl;

import t.Person;
import constants.SystemConstants;

public class MyUserDaoImpl extends BaseDaoImpl<Person, Integer> implements
		MyUserDao {

	@Override
	public int countAll() {
		return 0;
	}

	@Override
	public Person selectOne(int id) {
		return null;
	}

	@Override
	public Person selectOneHiber(int id) {
		StringBuilder sql = new StringBuilder(
				SystemConstants.StringBuilderInitSize);
		sql.append("SELECT * FROM person ");
		sql.append("WHERE id = ").append(id);
		
		return findById(id);
	}

}
