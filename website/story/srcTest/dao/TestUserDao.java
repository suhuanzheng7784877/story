package dao;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;

import pojo.User;
import pojo.UserInfo;
import testfather.FatherTest;

public class TestUserDao extends FatherTest {

	static UserDao userDao = springAppContent.getBean("userDao", UserDao.class);
	static UserInfoDao userinfoDao = springAppContent.getBean("userInfoDao",
			UserInfoDao.class);

	@Test
	public void test01() {

		User user = new User();
		user.setName("liuyan1");
		user.setPassword("1");
		user.setEmail("liuyan1@163.com");
		user.setRegdate(new Date());
		UserInfo userInfo = new UserInfo();
		userInfo.setBirthday(new Date());
		userInfo.setExperience(1);
		userInfo.setNickname("昵称1");
		userInfo.setScore(0);
		userInfo.setSex("1");
		userInfo.setShortmotto("流氓1");
		userInfo.setUserheadurl("http");
		userInfo.setUsermess("介绍1");
		userInfo.setWebsite("没有1");
		userInfo.setWork("工作1");

		try {
			user.setUserInfo(userInfo);
			userDao.save(user);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Test
	public void test02() {

		try {
			User user = userDao.findById(1);
			System.out.println(user);
			// 无session的情况下会报错，session已经关闭
			System.out.println(user.getUserInfo());
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Test
	public void test03() {

		try {
			boolean isSuc = userDao.delete(1);
			System.out.println(isSuc);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Test
	public void test04() {

		try {
			List<User> list = userDao.findAll("regdate", "DESC", 0, 2);

			System.out.println(list);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Test
	public void test05() {

		Map<String, Object> conditionMap = new HashMap<String, Object>();

		conditionMap.put("name", "liuyan2");
		conditionMap.put("password", "222");

		try {
			List<User> list = userDao.findByProperty("eq", null, null,
					conditionMap);

			System.out.println(list);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Test
	public void test06() {

		try {
			User user = userDao.findById(3);
			System.out.println(user);
			user.setPassword("imposs");
			userDao.update(user);

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Test
	public void test07() {

		try {

			Map<String, Object> conditionMap = new HashMap<String, Object>();
			conditionMap.put("PKkey", "id");
			conditionMap.put("PKValue", 3);
			conditionMap.put("name", "刘岩");
			conditionMap.put("password", "liuyan215");

			boolean result = userDao.update(conditionMap);
			System.out.println(result);

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Test
	public void test08() {

		try {
			UserInfo userInfo = userinfoDao.findById(3);
			System.out.println(userInfo);

			userInfo.setScore(1000);
			userInfo.setUserheadurl("http://www.api.jpg");
			userinfoDao.update(userInfo);

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	@Test
	public void test09() {
		int[] ids = userDao.getAllUserIds();
		
		System.out.println(ids.length);
		
		for(Object id:ids){
			System.out.println(id.toString());
		}
		
	}

}
