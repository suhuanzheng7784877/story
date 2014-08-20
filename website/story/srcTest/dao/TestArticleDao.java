package dao;

import java.util.Date;
import java.util.List;

import org.junit.Test;

import pojo.Article;
import testfather.FatherTest;

public class TestArticleDao extends FatherTest {

	static UserDao userDao = springAppContent.getBean("userDao", UserDao.class);

	static ArticleDao articleDao = springAppContent.getBean("articleDao",
			ArticleDao.class);
	static ArticleCommentDao articleCommentDao = springAppContent.getBean(
			"articleCommentDao", ArticleCommentDao.class);
	
	@Test
	public void test00(){
	}
	
	@Test
	public void test01() {
		
		
		
		
		Article article = new Article();
		article.setContent("内容1");
		article.setIsPass("1");
		article.setTitle("标题1");
		article.setDate(new Date());

		article.setAuthorUserId(1);

		try {
			articleDao.save(article);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Test
	public void test02() {

		Article article = articleDao.findById(1);
		System.out.println(article);

	}

	@Test
	public void test03() throws Exception {

		Article article = articleDao.findById(1);
		article.setTitle("新标题");
		articleDao.update(article);
	}

	@Test
	public void test04() throws Exception {
		int authorUserId = 1;
		int start = 0;
		int limit = 2;

		List<Article> list = articleDao.selectArticleByUserId(authorUserId,
				start, limit);
		System.out.println(list);
	}

	@Test
	public void test05() throws Exception {
		articleDao.delete(2);
	}

	@Test
	public void test06() {
		int articleId = 1;
		List list = articleCommentDao.selectArticleCommentByIndex(articleId,
				null);
		System.out.println(list);
	}

}
