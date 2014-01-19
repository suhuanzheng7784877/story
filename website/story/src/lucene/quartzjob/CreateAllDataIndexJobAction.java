package lucene.quartzjob;

import java.util.concurrent.locks.ReentrantLock;

import lucene.index.ArticleRefreshIndex;
import lucene.index.InvitationRefreshIndex;
import lucene.index.NewsRefreshIndex;

import org.apache.log4j.Logger;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

/**
 * 创建所有数据索引的定时执行任务
 * 
 * @author liuyan
 */
public class CreateAllDataIndexJobAction extends QuartzJobBean {

	private static Logger logger = Logger
			.getLogger(CreateAllDataIndexJobAction.class);

	// 公平重入锁
	private static final ReentrantLock lock = new ReentrantLock(true);

	private NewsRefreshIndex newsRefreshIndex;

	private InvitationRefreshIndex invitationRefreshIndex;

	private ArticleRefreshIndex articleRefreshIndex;

	public NewsRefreshIndex getNewsRefreshIndex() {
		return newsRefreshIndex;
	}

	public void setNewsRefreshIndex(NewsRefreshIndex newsRefreshIndex) {
		this.newsRefreshIndex = newsRefreshIndex;
	}

	public InvitationRefreshIndex getInvitationRefreshIndex() {
		return invitationRefreshIndex;
	}

	public void setInvitationRefreshIndex(
			InvitationRefreshIndex invitationRefreshIndex) {
		this.invitationRefreshIndex = invitationRefreshIndex;
	}

	public ArticleRefreshIndex getArticleRefreshIndex() {
		return articleRefreshIndex;
	}

	public void setArticleRefreshIndex(ArticleRefreshIndex articleRefreshIndex) {
		this.articleRefreshIndex = articleRefreshIndex;
	}

	private volatile static boolean IsCanSearch = true;

	/**
	 * 是否可以执行查询动作
	 * 
	 * @return
	 */
	public static boolean IsCanSearch() {
		return IsCanSearch;
	}

	/**
	 * 更换“是否可查询”的标识位
	 * 
	 * @param boolen
	 */
	private static void updateIsCanSearch(boolean boolen) {
		try {
			lock.lock();
			IsCanSearch = boolen;
		} finally {
			lock.unlock();
		}

	}

	/**
	 * 更新“是否可查询”为==true
	 */
	public static void updateIsCanSearchToCan() {
		updateIsCanSearch(true);
	}

	/**
	 * 更新“是否可查询”为==false
	 */
	public static void updateIsCanSearchToUnCan() {
		updateIsCanSearch(false);
	}

	@Override
	protected void executeInternal(JobExecutionContext context)
			throws JobExecutionException {

		if (!CreateAllDataIndexJobAction.IsCanSearch) {
			return;
		}

		// 方法中，加锁了,如果正在进行索引，则【不能进行搜索】
		updateIsCanSearchToUnCan();

		// 开始时间
		long startTime = System.currentTimeMillis();

		executiveRefreshIndex();

		// 开始时间
		long endTime = System.currentTimeMillis();

		long spendTime = endTime - startTime;

		logger.info("触发系统强制gc");
		// 等同于使用了System.gc();
		Runtime.getRuntime().gc();
		logger.info("创建数据索引文件，完成.总共历时：" + spendTime + "ms");

		// 方法中，加锁了,如果正在进行索引，则【可以进行搜索】
		updateIsCanSearchToCan();

	}

	private void executiveRefreshIndex() {
		logger.info("创建数据索引文件");
		newsRefreshIndex.executiveRefreshIndex();
		invitationRefreshIndex.executiveRefreshIndex();
		articleRefreshIndex.executiveRefreshIndex();
	}

}
