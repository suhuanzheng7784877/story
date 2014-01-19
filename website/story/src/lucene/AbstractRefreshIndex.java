package lucene;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.index.CorruptIndexException;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.store.LockObtainFailedException;
import org.apache.lucene.util.Version;

/**
 * 刷新索引的抽象类
 * 
 * @author liuyan
 */
public abstract class AbstractRefreshIndex {

	public Logger logger = Logger.getLogger(AbstractRefreshIndex.class);

	public int commitBatchNum;

	protected String sql = "";

	// 更新索引需要的数据源
	protected DataSource dataSource;

	// 同一所使用的分词器
	protected Analyzer analyzer;

	// 写入索引操作的类
	protected IndexWriter indexWriter;

	protected Directory directory;

	protected IndexWriterConfig indexWriterConfig;

	public IndexWriterConfig getIndexWriterConfig() {
		return indexWriterConfig;
	}

	public void setIndexWriterConfig(IndexWriterConfig indexWriterConfig) {
		this.indexWriterConfig = indexWriterConfig;
	}

	public int getCommitBatchNum() {
		return commitBatchNum;
	}

	public void setCommitBatchNum(int commitBatchNum) {
		this.commitBatchNum = commitBatchNum;
	}

	public DataSource getDataSource() {
		return dataSource;
	}

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	public Analyzer getAnalyzer() {
		return analyzer;
	}

	public void setAnalyzer(Analyzer analyzer) {
		this.analyzer = analyzer;
	}

	/**
	 * 获得JDBCconnection
	 * 
	 * @return
	 * @throws SQLException
	 */
	public Connection getJDBCConnection() throws SQLException {
		
		String threadName = Thread.currentThread().getName();
		
		logger.info(threadName+":获取连接池的连接");
		Connection connection = dataSource.getConnection();
		return connection;
	}

	/**
	 * 初始化
	 */
	protected abstract void init();
	
	protected void initDetail(String indexPath){
		
		String threadName = Thread.currentThread().getName();
		
		logger.info(threadName+":初始化....");

		// 在当前路径下建立一个目录叫indexDir
		File indexDir = new File(indexPath);

		// 创建索引目录
		try {
			if (directory == null) {
				directory = FSDirectory.open(indexDir);
			}

			if (indexWriter == null) {
				indexWriterConfig = new IndexWriterConfig(Version.LUCENE_36, analyzer);
				indexWriter = new IndexWriter(directory, indexWriterConfig);
			}
		} catch (CorruptIndexException e) {
			e.printStackTrace();
			logger.error("初始化失败", e);
		} catch (LockObtainFailedException e) {
			e.printStackTrace();
			logger.error("初始化失败", e);
		} catch (IOException e) {
			e.printStackTrace();
			logger.error("初始化失败", e);
		}
		logger.info(threadName+":初始化完成!");
	}

	/**
	 * 刷新其中一个实体，新闻的索引
	 * 
	 * @param connection
	 * @return
	 */
	public boolean executiveRefreshIndex() {
		
		String threadName = Thread.currentThread().getName();
		
		boolean result = false;
		long nowtime1 = System.currentTimeMillis();
		
		// 初始化一些成员变量
		init();

		logger.info(threadName+":开始重新建立数据索引记录");
		Connection connection = null;
		ResultSet resultSet = null;
		Statement stmt = null;
		// 1-删除原始索引文件夹下的索引
		try {
			result = deleteIndex();

			if (!result) {
				logger.error("删除索引失败");
				return false;
			}

			connection = getJDBCConnection();

			// 2-查询数据库，把ResultSet结果集查询出来
			logger.info(threadName+":查询数据库，把ResultSet结果集查询出来");

			// 创建一个JDBC Statement声明
			stmt = connection.createStatement();

			// 执行查询
			resultSet = stmt.executeQuery(sql);

			// 3-遍历结果集，根据结果集建立Lucene索引
			logger.info(threadName+":遍历结果集，根据结果集建立Lucene索引");
			createIndexByResultSet(resultSet);

			long nowtime2 = System.currentTimeMillis();
			logger.info(threadName+":完成重新建立数据索引记录,花费时间:" + (nowtime2 - nowtime1) + "ms");

		} catch (Exception e) {
			logger.error("刷新索引失败", e);
			e.printStackTrace();
		} finally {
			try {

				if (resultSet != null && !resultSet.isClosed()) {
					resultSet.close();
					resultSet = null;
				}

				if (stmt != null && !stmt.isClosed()) {
					stmt.close();
					stmt = null;
				}

				if (connection != null && !connection.isClosed()) {
					connection.close();
					connection = null;
				}

			} catch (SQLException e) {
				logger.error("关闭索引失败", e);
			}
		}

		return result;
	}

	/**
	 * 删除所有的索引
	 * 
	 * @param indexWriter
	 * @return
	 * @throws IOException
	 */
	protected boolean deleteIndex() throws IOException {
		
		String threadName = Thread.currentThread().getName();
		
		logger.info(threadName+":删除所有的索引");

		// 删除所有的索引
		indexWriter.deleteAll();

		// 提交，刷新lucene缓存
		indexWriter.commit();

		logger.info(threadName+":提交，刷新lucene缓存");

		return true;

	}

	protected ResultSet selectResultSet(Connection connection, String sql) {
		Statement stmt = null;
		try {
			// 创建一个jdbc声明
			stmt = connection.createStatement();

			// 执行查询
			ResultSet rs = stmt.executeQuery(sql);
			return rs;

		} catch (SQLException e) {
			logger.error("获取JDBC Connection失败", e);
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * @throws IOException
	 * @throws SQLException
	 * @throws CorruptIndexException
	 *             根据结果集创建索引
	 * 
	 * @param rs
	 * @param indexWriter
	 * @return
	 * @throws IOException
	 * @throws CorruptIndexException
	 * @throws
	 */
	protected boolean createIndexByResultSet(ResultSet resultSet)
			throws CorruptIndexException, SQLException, IOException {

		// 数据记录计数器
		int sum = 0;

		// lucene的文档对象
		Document doc = null;

		// 遍历结果集合
		while (resultSet.next()) {

			// 由结果集构建Document对象
			doc = buildDocument(resultSet);

			// 添加到操作索引对象
			indexWriter.addDocument(doc);

			// 计数器+1
			sum++;

			// 满一定的记录个数就直接刷新缓存中的数据到硬盘里
			if (0 == sum % commitBatchNum) {

				// 刷新
				indexWriter.commit();
			}

		}

		indexWriter.commit();

		return true;
	}

	/**
	 * 经过resultSet拼装lucene的Document
	 * 
	 * @param resultSet
	 * @return
	 */
	protected abstract Document buildDocument(ResultSet resultSet);

}
