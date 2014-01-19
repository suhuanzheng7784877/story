package dao;

import t.Person;

public interface MyUserService {
	public int countAll();
	
	public Person selectOne(int id);
	
	public Person selectOneHiber(int id);

}
