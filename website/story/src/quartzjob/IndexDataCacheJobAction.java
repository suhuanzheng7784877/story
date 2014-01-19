package quartzjob;

import org.apache.log4j.Logger;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;

import util.cache.ContentPageWriter;

/**
 * 更新缓存的定时任务
 * 
 * @author 刘岩
 */
public class IndexDataCacheJobAction extends QuartzJobBean {

	private static Logger logger = Logger
			.getLogger(IndexDataCacheJobAction.class);

	@Autowired
	private int timeout;

	@Autowired
	private ContentPageWriter contentPageWriter;

	public int getTimeout() {
		return timeout;
	}

	public void setTimeout(int timeout) {
		this.timeout = timeout;
	}

	public ContentPageWriter getContentPageWriter() {
		return contentPageWriter;
	}

	public void setContentPageWriter(ContentPageWriter contentPageWriter) {
		this.contentPageWriter = contentPageWriter;
	}

	@Override
	protected void executeInternal(JobExecutionContext jobExecutionContext)
			throws JobExecutionException {

		logger.info("执行重新生成首页文件任务");
		contentPageWriter.generateIndexPageForWebBootStart();
		logger.info("执行重新生成首页文件任务--结束");

	}
}
