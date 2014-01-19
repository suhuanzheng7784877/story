package util.cache;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.glaze.framework.core.dto.TableInfo;

import quartzjob.TableInfoCacheJobAction;

/**
 * 系统表的dao服务
 * 
 * @author liuyan
 */
public class TableInfoDao {

	public static Logger logger = Logger.getLogger(TableInfoDao.class);

	private DataSource dbcpDataSource;

	public DataSource getDbcpDataSource() {
		return dbcpDataSource;
	}

	public void setDbcpDataSource(DataSource dbcpDataSource) {
		this.dbcpDataSource = dbcpDataSource;
	}
	
	/**
	 * 缓存所有的业务表名
	 */
	private final static List<String> tableNameList = new ArrayList<String>(30);

	// 除去的表
	private final static String systemTableName = "tableinfo";

	// 清表语句
	private final static String deleteTableInfoSql = "DELETE FROM tableinfo";

	// 初始化原表
	private final static String insertTableInfoZero = "INSERT INTO tableinfo (tablename,datacount) VALUES (?,?)";

	// 查询表记录总个数
	private final static String selectTableInfoCount = "SELECT COUNT(1) FROM ";

	// 更新表记录个数
	private final static String updateTableInfoCount = "UPDATE tableinfo SET datacount=? WHERE tablename=?";

	/**
	 * 初始化系统表,系统启动的时候，只允许调用一次
	 */
	public synchronized void initSystemTableInfo() {

		Connection conn = null;
		DatabaseMetaData metaData = null;
		Statement statement = null;
		PreparedStatement preparedStatement = null;
		ResultSet rs = null;
		try {
			conn = dbcpDataSource.getConnection();

			// 1-清空原始记录
			statement = conn.createStatement();
			statement.execute(deleteTableInfoSql);

			// 2-获取表元信息
			metaData = conn.getMetaData();
			rs = metaData.getTables(conn.getCatalog(), "", null,
					new String[] { "TABLE" });

			String tableName = null;

			while (rs.next()) {
				tableName = rs.getString("TABLE_NAME");
				if (systemTableName.equals(tableName)) {
					continue;
				}

				// 缓存表名
				tableNameList.add(tableName);
				logger.info("init_size-TABLE_NAME:" + tableName);
			}

			// 3-重置表的记录状态为0
			preparedStatement = conn.prepareStatement(insertTableInfoZero);
			TableInfo tableInfo = null;
			for (String tableNameStr : tableNameList) {

				preparedStatement.setString(1, tableNameStr);
				preparedStatement.setInt(2, 0);
				preparedStatement.addBatch();
				preparedStatement.clearParameters();

				// 往全局缓存添加初始化表对象
				tableInfo = new TableInfo(tableNameStr, 0);
				TableInfoCacheJobAction.getTableinfocache().put(tableNameStr,
						tableInfo);
			}
			preparedStatement.executeBatch();
			preparedStatement.clearBatch();

			// 更新系统表的内容，目前是记录条数
			updateSystemTableInfo();

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {

				rs.close();
				rs = null;

				preparedStatement.close();
				preparedStatement = null;

				statement.close();
				statement = null;

				metaData = null;
				conn.close();
				conn = null;
			} catch (SQLException e) {
				e.printStackTrace();
			}

		}

	}

	/**
	 * 更新系统表的内容，目前是记录条数
	 */
	public void updateSystemTableInfo() {
		Connection conn = null;
		Statement statement = null;
		PreparedStatement preparedStatement = null;
		ResultSet rs = null;
		try {
			conn = dbcpDataSource.getConnection();
			statement = conn.createStatement();
			String sql = null;
			preparedStatement = conn.prepareStatement(updateTableInfoCount);
			TableInfo tableInfo = null;
			for (String tableName : tableNameList) {
				sql = selectTableInfoCount + tableName;
				rs = statement.executeQuery(sql);
				while (rs.next()) {
					int result = rs.getInt(1);
					preparedStatement.setInt(1, result);
					preparedStatement.setString(2, tableName);
					preparedStatement.addBatch();

					// 往全局缓存添加初始化表对象
					tableInfo = new TableInfo(tableName, result);
					TableInfoCacheJobAction.getTableinfocache().put(tableName,
							tableInfo);

				}
			}

			// 更新每张表的记录总个数,方便业务查询count记录的时候，不必访问数据库
			preparedStatement.executeBatch();

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {

				rs.close();
				rs = null;

				statement.close();
				statement = null;

				preparedStatement.close();
				preparedStatement = null;

				conn.close();
				conn = null;
			} catch (SQLException e) {
				e.printStackTrace();
			}

		}

	}

}
