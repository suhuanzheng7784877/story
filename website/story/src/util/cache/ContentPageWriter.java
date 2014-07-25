package util.cache;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.glaze.framework.util.ProjectInfoUtil;
import org.springframework.beans.factory.annotation.Autowired;

import pojo.Article;
import pojo.Invitation;
import pojo.News;
import pojo.StoryMp3;
import pojo.Topic;
import constants.SystemConstants;
import dao.ArticleDao;
import dao.InvitationDao;
import dao.NewsDao;
import dao.StoryMp3Dao;
import dao.TopicDao;
import dao.UserDao;
import freemarker.template.Configuration;
import freemarker.template.DefaultObjectWrapper;
import freemarker.template.Template;
import freemarker.template.TemplateException;

/**
 * 生成静态化主页index辅助类
 * 
 * @author liuyan
 */
public class ContentPageWriter {

	// 日志
	private final static Logger logger = Logger.getLogger(ContentPageWriter.class);

	// freemaker的配置
	final static Configuration config = new Configuration();

	final static DefaultObjectWrapper defaultObjectWrapper = new DefaultObjectWrapper();
	
	// 模板的名字
	public final static String templateName = "/index_nd_20130510.ftl";

	// 文件的缓冲buffer大小
	private final static int bufferSize = 64 * 1024;

	// 异闻录
	@Autowired
	private ArticleDao articleDao;

	// mp3
	@Autowired
	private StoryMp3Dao storyMp3Dao;

	// 新闻
	@Autowired
	private NewsDao newsDao;

	// 用户
	@Autowired
	private UserDao userDao;

	// 版块
	@Autowired
	private TopicDao topicDao;

	// 贴子
	@Autowired
	private InvitationDao invitationDao;

	public ArticleDao getArticleDao() {
		return articleDao;
	}

	public void setArticleDao(ArticleDao articleDao) {
		this.articleDao = articleDao;
	}

	public StoryMp3Dao getStoryMp3Dao() {
		return storyMp3Dao;
	}

	public void setStoryMp3Dao(StoryMp3Dao storyMp3Dao) {
		this.storyMp3Dao = storyMp3Dao;
	}

	public NewsDao getNewsDao() {
		return newsDao;
	}

	public void setNewsDao(NewsDao newsDao) {
		this.newsDao = newsDao;
	}

	public UserDao getUserDao() {
		return userDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	public TopicDao getTopicDao() {
		return topicDao;
	}

	public void setTopicDao(TopicDao topicDao) {
		this.topicDao = topicDao;
	}

	public InvitationDao getInvitationDao() {
		return invitationDao;
	}

	public void setInvitationDao(InvitationDao invitationDao) {
		this.invitationDao = invitationDao;
	}
	
	static String indexPageFileName = "index.html";

	/**
	 * 系统启动时生成首页静态页面
	 */
	public void generateIndexPageForWebBootStart() {

		// 1-获取静态页面相关路径
		// 项目的绝对路径
		String projectRealPath = ProjectInfoUtil.getProjectRealPath();

		// ftl模板的绝对路径
		String templatePath = ProjectInfoUtil.getTemplatePath(projectRealPath);

		// 生成静态页面后的文件路径以及名字
		String staticFileName = projectRealPath + indexPageFileName;

		logger.info("生成静态文件路径:" + staticFileName);

		// 2-获取主页的动态数据
		// 主页数据
		Map<String, Object> pageData = refreshIndexData();

		// 3-调用方法，生成静态页面
		analysisAndGenerateTemplate(templatePath, templateName, staticFileName,
				pageData);

	}

	/**
	 * 刷新静态页要显示的数据
	 * 
	 * @return
	 */
	public Map<String, Object> refreshIndexData() {

		Map<String, Object> pageData = new HashMap<String, Object>(16, 0.75f);

		// 要显示在前台的数据
		List<Article> articleList = null;
		List<StoryMp3> storyMp3List = null;
		List<News> newsList = null;
		List<Topic> topicList = null;
		List<Invitation> invitationList = null;
		long articleCount = 0;
		long storyMp3Count = 0;
		long userCount = 0;
		long invitationCount = 0;

		// 不从缓存中取数据
		articleList = articleDao.selectArticleByIndex(0, 10);
		storyMp3List = storyMp3Dao.selectStoryMp3ByIndex(0, 10);
		newsList = newsDao.selectNewsByIndex(0, 10);
		topicList = topicDao.selectTopicByIndex();
		invitationList = invitationDao.selectInvitationByIndex(0, 10);

		// 总文章数目
		articleCount = articleDao.countNumSQLQuick();
		// 总mp3数目
		storyMp3Count = storyMp3Dao.countNumSQLQuick();
		// 用户总数
		userCount = userDao.countNumSQLQuick();
		// 帖子总数
		invitationCount = invitationDao.countNumSQLQuick();

		pageData.put("articleList", articleList);
		pageData.put("storyMp3List", storyMp3List);
		pageData.put("newsList", newsList);
		pageData.put("topicList", topicList);
		pageData.put("invitationList", invitationList);

		pageData.put("articleCount", articleCount);
		pageData.put("storyMp3Count", storyMp3Count);
		pageData.put("userCount", userCount);
		pageData.put("invitationCount", invitationCount);

		return pageData;
	}

	/**
	 * 使用freemarker生成静态页面
	 * 
	 * @param templatePath
	 * @param templateName
	 * @param staticFileName
	 * @param 最主要的模型数据root
	 */
	public static boolean analysisAndGenerateTemplate(String templatePath,
			String templateName, String staticFileName, Map<?, ?> pageData) {

		OutputStream fos = null;
		Writer out = null;
		try {

			logger.info("开始生成静态页面.....");

			// 获取模板,并设置编码方式，这个编码必须要与页面中的编码格式一致
			// 否则会出现乱码
			config.setDirectoryForTemplateLoading(new File(templatePath));
			config.setObjectWrapper(defaultObjectWrapper);
			Template template = config.getTemplate(templateName,
					SystemConstants.echo);

			// 合并数据模型与模板
			fos = new FileOutputStream(staticFileName);
			out = new BufferedWriter(new OutputStreamWriter(fos,
					SystemConstants.echo), bufferSize);

			template.process(pageData, out);

			logger.info("生成静态页面完成");

			return true;

		} catch (IOException e) {
			e.printStackTrace();
			logger.error("error", e);
			return false;
		} catch (TemplateException e) {
			e.printStackTrace();
			logger.error("error", e);
			return false;
		} finally {
			try {

				if (fos != null) {
					fos.close();
					fos = null;
				}
				if (out != null) {
					out.flush();
					out.close();
					out = null;
				}

				logger.info("关闭索引文件资源");

			} catch (IOException e) {
				e.printStackTrace();
			}

		}
	}
}
