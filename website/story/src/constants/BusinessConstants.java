package constants;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import pojo.NewsType;
import pojo.Topic;
import dao.NewsTypeDao;
import dao.TopicDao;

/**
 * 业务需要用到的常量类型
 * 
 * @author liuyan
 */
public class BusinessConstants {

	// 全局的新闻类型集合
	private static final List<NewsType> newsTypeList = new CopyOnWriteArrayList<NewsType>();

	// 全局的论坛版块
	private static final List<Topic> topicList = new CopyOnWriteArrayList<Topic>();

	private TopicDao topicDao;

	private NewsTypeDao newsTypeDao;

	public NewsTypeDao getNewsTypeDao() {
		return newsTypeDao;
	}

	public void setNewsTypeDao(NewsTypeDao newsTypeDao) {
		this.newsTypeDao = newsTypeDao;
	}

	public TopicDao getTopicDao() {
		return topicDao;
	}

	public void setTopicDao(TopicDao topicDao) {
		this.topicDao = topicDao;
	}

	/**
	 * 初始化全局数据的集合
	 */
	public void initList() {

		List<Topic> listtopic = topicDao.findAll();
		List<NewsType> listnewsType = newsTypeDao.findAll();
		// 论坛类型的初始化
		topicList.addAll(listtopic);
		newsTypeList.addAll(listnewsType);
	}

	public static List<NewsType> getNewsTypeList() {
		return newsTypeList;
	}

	public static List<Topic> getTopicList() {
		return topicList;
	}

}
