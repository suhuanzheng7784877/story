package lucene.controller;

import lucene.index.ArticleRefreshIndex;
import lucene.index.InvitationRefreshIndex;
import lucene.index.NewsRefreshIndex;
import lucene.quartzjob.CreateAllDataIndexJobAction;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 手工生成Lucene索引的类
 * 
 * @author liuyan
 */
@Controller
@RequestMapping("/search")
public class ManualController {

	private static Logger logger = Logger.getLogger(ManualController.class);

	@Autowired
	private NewsRefreshIndex newsRefreshIndex;

	@Autowired
	private InvitationRefreshIndex invitationRefreshIndex;

	@Autowired
	private ArticleRefreshIndex articleRefreshIndex;

	/**
	 * 手工生成索引
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/manualindex.action")
	@ResponseBody
	public boolean manualGenerateLuceneIndex() {

		if (!CreateAllDataIndexJobAction.IsCanSearch()) {
			return false;
		}

		String threadName = Thread.currentThread().getName();

		// 加锁,如果正在进行索引，则不能进行搜索
		while (!CreateAllDataIndexJobAction.IsCanSearch()) {
			try {
				Thread.sleep(10000L);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		
		//更新表示位状态
		CreateAllDataIndexJobAction.updateIsCanSearchToUnCan();

		// 开始时间
		long startTime = System.currentTimeMillis();

		logger.info(threadName + ":[手工]创建数据索引文件");
		newsRefreshIndex.executiveRefreshIndex();
		invitationRefreshIndex.executiveRefreshIndex();
		articleRefreshIndex.executiveRefreshIndex();

		logger.info(threadName + ":[手工]触发系统强制gc");
		// 等同于使用了System.gc();
		Runtime.getRuntime().gc();

		CreateAllDataIndexJobAction.updateIsCanSearchToCan();
		// 结束时间
		long endTime = System.currentTimeMillis();

		// 时间间隔
		long spendTime = endTime - startTime;

		logger.info(threadName + ":[手工]创建数据索引文件，完成.总共历时：" + spendTime + "ms");

		return true;

	}

}
