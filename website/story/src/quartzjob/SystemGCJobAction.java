package quartzjob;

import org.apache.log4j.Logger;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

/**
 * 更新缓存的定时任务
 * 
 * @author 刘岩
 */
public class SystemGCJobAction extends QuartzJobBean {

	private static Logger logger = Logger.getLogger(SystemGCJobAction.class);

	@Override
	protected void executeInternal(JobExecutionContext arg0)
			throws JobExecutionException {
		logger.info("触发系统强制gc");
		// 等同于使用了System.gc();
		Runtime.getRuntime().gc();
	}

}
