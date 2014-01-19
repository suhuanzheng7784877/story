package lucene;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSource;
import org.junit.Test;

import testfather.FatherTest;

public class TestDataSource extends FatherTest {
	
	@Test
	public void testJDBCFromDataSource() throws SQLException {
		DataSource dataSource = springAppContent.getBean("dbcpDataSource",
				BasicDataSource.class);
		Connection connection = dataSource.getConnection();

		String sql = "select * from news";
		// 创建一个jdbc声明
		Statement stmt = connection.createStatement();
		// 执行查询
		ResultSet rs = stmt.executeQuery(sql);
		while (rs.next()) {
			String id = rs.getString("id");
			String newscontent = rs.getString("newscontent");
			String title = rs.getString("title");
			
			System.out.println(id+":"+title);
			System.out.println("newscontent-----");
			System.out.println(newscontent);
		}
	}

}
