package dao;

import t.Person;

public class MyUserServiceImpl implements MyUserService {

	private MyUserDao myUserDao;
	private MyUserDao hiberUserDao;

	public MyUserDao getHiberUserDao() {
		return hiberUserDao;
	}

	public void setHiberUserDao(MyUserDao hiberUserDao) {
		this.hiberUserDao = hiberUserDao;
	}

	public MyUserDao getMyUserDao() {
		return myUserDao;
	}

	public void setMyUserDao(MyUserDao myUserDao) {
		this.myUserDao = myUserDao;
	}

	public int countAll() {
		return this.myUserDao.countAll();
	}

	@Override
	public Person selectOne(int id) {
		return myUserDao.selectOne(id);
	}

	@Override
	public Person selectOneHiber(int id) {
		return hiberUserDao.selectOneHiber(id);
	}

}
