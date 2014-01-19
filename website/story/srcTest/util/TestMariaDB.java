package util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.junit.Test;

public class TestMariaDB {

	@Test
	public void testConnection() throws ClassNotFoundException {

		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;

		String className = "org.mariadb.jdbc.Driver";
		Class.forName(className);
		String sql = "select * from storymp3";
		try {
			String url = "jdbc:mysql://localhost:13306/story?useUnicode=true&characterEncoding=UTF-8&rewriteBatchedStatements=true&useServerPrepStmts=true&cachePrepStmts=true&prepStmtCacheSize=128&prepStmtCacheSqlLimit=512&autoReconnect=true";
			String user = "root";
			String password = "111111";
			conn = DriverManager.getConnection(url, user, password);
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				String id = rs.getString(1);
				String title = rs.getString(7);
				System.out.println(id + ":" + title);
			}
		} catch (SQLException e) {
			System.out.println("数据库链接错误");
			e.printStackTrace();
		}

	}

}
