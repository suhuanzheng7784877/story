package dao;

import org.glaze.framework.core.persistent.base.BaseDao;

import t.Person;

public interface MyUserDao  extends BaseDao<Person, Integer> {
	
	public int countAll();
	
	public Person selectOne(int id);
	
	public Person selectOneHiber(int id);

}
