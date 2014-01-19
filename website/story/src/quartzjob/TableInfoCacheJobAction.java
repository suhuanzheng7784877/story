package quartzjob;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.log4j.Logger;
import org.glaze.framework.core.dto.TableInfo;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;

import util.cache.TableInfoDao;

/**
 * 更新缓存的定时任务
 * 
 * @author 刘岩
 */
public class TableInfoCacheJobAction extends QuartzJobBean {

	private static Logger logger = Logger
			.getLogger(TableInfoCacheJobAction.class);
	
	/**
	 * 缓存业务表的一些系想你
	 *  key:表名
	 *  value:表元实体信息
	 */
	public final static Map<String,TableInfo> TableInfoCacheMap = new ConcurrentHashMap<String,TableInfo>(16,0.75F);

	public static Map<String, TableInfo> getTableinfocache() {
		return TableInfoCacheMap;
	}

	@Autowired
	private int timeout;

	public int getTimeout() {
		return timeout;
	}

	public void setTimeout(int timeout) {
		this.timeout = timeout;
	}
	
	@Autowired
	private TableInfoDao tableInfoDao;


	public TableInfoDao getTableInfoDao() {
		return tableInfoDao;
	}

	public void setTableInfoDao(TableInfoDao tableInfoDao) {
		this.tableInfoDao = tableInfoDao;
	}

	@Override
	protected void executeInternal(JobExecutionContext jobExecutionContext)
			throws JobExecutionException {

		logger.info("执行重新生成业务表总记录数任务--开始");
		tableInfoDao.updateSystemTableInfo();
		logger.info("执行重新生成业务表总记录数任务--结束");

	}
}
