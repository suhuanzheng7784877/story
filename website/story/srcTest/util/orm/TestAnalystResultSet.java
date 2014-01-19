package util.orm;


import java.lang.reflect.InvocationTargetException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import javax.sql.DataSource;

import org.glaze.framework.util.orm.AnalystResultSet;
import org.junit.Test;

import testfather.FatherTest;
import vo.NewsCommentBean;
import dao.ArticleDao;

public class TestAnalystResultSet extends FatherTest {

	static ArticleDao articleDao = springAppContent.getBean("articleDao",
			ArticleDao.class);

	@Test
	public void testtranslatecolumnNameToSetMethod() {
		String columnName = "commentMessage";
		String mm = AnalystResultSet.translatecolumnNameToSetMethod(columnName);
		System.out.println(mm);
	}

	@Test
	public void test06() throws SQLException {
		DataSource dataSource = articleDao.getDataSource();
		Connection connection = dataSource.getConnection();
		Statement statement = connection.createStatement();
		String sql = "SELECT newscomment.*,user.name,news.title FROM newscomment newscomment,user user,news news  WHERE newscomment.commentUserId = user.id AND newscomment.newsId=news.id";
		ResultSet resultSet = statement.executeQuery(sql);
		ResultSetMetaData resultSetMetaData = resultSet.getMetaData();
		int columncount = resultSetMetaData.getColumnCount();

		for (int i = 1; i <= columncount; i++) {
			String columnName = resultSetMetaData.getColumnName(i);
			System.out.println(columnName);
		}

	}

	@Test
	public void test07() throws SQLException {
		DataSource dataSource = articleDao.getDataSource();
		Connection connection = dataSource.getConnection();
		Statement statement = connection.createStatement();
		String sql = "SELECT newscomment.*,user.name,news.title FROM newscomment newscomment,user user,news news  WHERE newscomment.commentUserId = user.id AND newscomment.newsId=news.id";
		ResultSet resultSet = statement.executeQuery(sql);

		try {
			List objects = AnalystResultSet.getBeans(sql,NewsCommentBean.class,
					resultSet);
			System.out.println(objects);
		} catch (RuntimeException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (CloneNotSupportedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
