package dao;

import java.util.Date;
import java.util.List;

import org.junit.Test;

import pojo.ShortMessage;
import testfather.FatherTest;

public class TestShortMessageDao extends FatherTest {

	static ShortMessageDao shortMessageDao = springAppContent.getBean(
			"shortMessageDao", ShortMessageDao.class);

	static UserDao userDao = springAppContent.getBean("userDao", UserDao.class);

	@Test
	public void test01() {

		ShortMessage shortMessage = new ShortMessage();
		shortMessage.setDate(new Date());
		shortMessage.setTitle("标题");
		shortMessage.setMessage("短信息内容");
		shortMessage.setRead(false);
		shortMessage.setToUserId(1);
		shortMessage.setToUserId(1);

		shortMessageDao.save(shortMessage);

	}

	@Test
	public void test02() {
		shortMessageDao.delete(2);

	}

	@Test
	public void test03() {
		shortMessageDao.updateReadShortMessage(1);
	}

	@Test
	public void test04() {
		long result1 = shortMessageDao.countUnReadMessage(1);
		System.out.println(result1);
		long result2 = shortMessageDao.countUnReadMessage(1);
		System.out.println(result2);
	}

	@Test
	public void test05() {
		List<ShortMessage> result = shortMessageDao.selectShortMessageByUserId(
				1, 0, 2);
		System.out.println(result);
	}

	@Test
	public void test06() {

		String title = "系统信息";
		String message = "消息内容";
		int[] userIds = userDao.getAllUserIds();

		//shortMessageDao.sendAllUserMessageJPA(title, message, userIds, 1);
	}

	@Test
	public void test07() {

		String title = "系统信息";
		String message = "消息内容";
		int[] userIds = userDao.getAllUserIds();

		//shortMessageDao.sendAllUserMessageSql(title, message, userIds, 1);
	}

}
