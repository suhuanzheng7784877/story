package dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Test;

import pojo.Article;
import pojo.StoryMp3;
import pojo.User;
import testfather.FatherTest;

public class TestStoryMp3Dao extends FatherTest {

	static UserDao userDao = springAppContent.getBean("userDao", UserDao.class);

	static StoryMp3Dao storyMp3Dao = springAppContent.getBean("storyMp3Dao",
			StoryMp3Dao.class);

	@Test
	public void test01() {

		StoryMp3 storyMp3 = new StoryMp3();
		storyMp3.setDate(new Date());
		storyMp3.setDownloadcount(0);
		storyMp3.setMessage("mp3内容");
		storyMp3.setMp3url("http://mp3/2.mp3");
		storyMp3.setNeedscore(1);
		storyMp3.setTitle("mp3标题1");
		try {
			storyMp3Dao.save(storyMp3);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Test
	public void test02() {

		try {
			StoryMp3 storyMp3 = storyMp3Dao.findById(1);
			System.out.println(storyMp3);
			StoryMp3 storyMp32 = storyMp3Dao.findById(1);
			System.out.println(storyMp32);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Test
	public void test03() {

		try {
			boolean result = storyMp3Dao.delete(1);
			System.out.println(result);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Test
	public void test04() {

		try {
			StoryMp3 storyMp3 = storyMp3Dao.findById(1);
			storyMp3.setDownloadcount(90);
			storyMp3.setNeedscore(10);
			boolean result = storyMp3Dao.update(storyMp3);
			System.out.println(result);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Test
	public void test05() {

		try {
			StoryMp3 storyMp3 = storyMp3Dao.findById(2);

			User user1 = userDao.findById(1);

			List<User> downloadUsers = new ArrayList<User>();
			downloadUsers.add(user1);

			boolean result = storyMp3Dao.update(storyMp3);
			System.out.println(result);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Test
	public void test06() {
		StoryMp3 storyMp3 = storyMp3Dao.findById(2);
	}

	@Test
	public void test07() {

		Article article = new Article();

		String sql = "insert into storymp3downloadusers (storymp3id,userid) values(1,1)";

		boolean result = storyMp3Dao.executiveSQLUpdate(sql);
		System.out.println(result);
	}

	@Test
	public void test08() {
		String sql = "select * from storymp3downloadusers where storymp3id=1 AND userid=1";

		List<Object[]> result = storyMp3Dao.executiveSQLSelectResultSet(sql);
		for (Object[] object : result) {
			Integer id = (Integer) object[0];
			Integer storymp3id = (Integer) object[1];
			Integer userid = (Integer) object[2];
			System.out.println(id);
			System.out.println(storymp3id);
			System.out.println(userid);
		}
	}

}
