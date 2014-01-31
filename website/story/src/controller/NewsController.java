package controller;


import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.glaze.framework.core.controler.base.BaseController;
import org.glaze.framework.util.DateUtils;
import org.glaze.framework.util.FileAndIOUtils;
import org.glaze.framework.util.ProjectInfoUtil;
import org.glaze.framework.util.PropertiesUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import pojo.News;
import vo.NewsBean;
import vo.NewsCommentBean;
import dao.NewsCommentDao;
import dao.NewsDao;

/**
 * 新闻业务控制器
 * 
 * @author liuyan
 */
@Controller
@RequestMapping("/news")
public class NewsController extends BaseController {
	
	protected static final Logger logger  = Logger.getLogger(NewsController.class);

	final String newspicRoot = PropertiesUtil
			.getValue("story.mp3store.newspic");

	// 项目的绝对路径
	String projectRealPath = null;

	@Autowired
	private NewsDao newsDao;

	@Autowired
	private NewsCommentDao newsCommentDao;

	/**
	 * 查看多个新闻信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/showNews.action")
	@ResponseBody
	public Map<String, Object> showNews(
			@RequestParam(required = false, defaultValue = "1") int page,
			@RequestParam(required = false, defaultValue = "15") int records,
			@RequestParam(required = false, defaultValue = "ASC") String sord,
			@RequestParam(required = false, defaultValue = "id") String sidx) {
		
		// 起始记录
		int start = (page - 1) * records;

		List<NewsBean> newsBeanList = newsDao.listNewsBean(
				sord, sidx, start, records);

		Map<String,Object> map = buildResponseMap(newsDao, newsBeanList, page,
				records);
		
		return map;
	}

	/**
	 * 查看多个新闻信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/showNewsComment.action")
	@ResponseBody
	public Map<String, Object> showNewsComment(
			@RequestParam(required = false, defaultValue = "1") int page,
			@RequestParam(required = false, defaultValue = "15") int records,
			@RequestParam(required = false, defaultValue = "ASC") String sord,
			@RequestParam(required = false, defaultValue = "id") String sidx) {

		// 起始记录
		int start = (page - 1) * records;

		// mp3实体
		List<NewsCommentBean> newsCommentList = newsCommentDao
				.selectNewsCommentBean(sord, sidx, start, records);
		return buildResponseMap(newsCommentDao, newsCommentList, page, records);

	}

	/**
	 * 查看单独新闻详细信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/showOneNews.action")
	@ResponseBody
	public Map<String, Object> showOneNews(@RequestParam int id) {
		// mp3实体
		News news = newsDao.findById(id);
		Map<String, Object> map = new HashMap<String, Object>(4);
		map.put("result", news);
		return map;

	}

	/**
	 * 查看单独新闻详细信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/addNews.action")
	@ResponseBody
	public Map<String, Object> addNews(
			@RequestParam("filePic") MultipartFile multipartFile,
			@ModelAttribute("news") News news,
			MultipartHttpServletRequest request) {
		

		// mp3的前缀名称，按时间
		String picName = DateUtils.DateToString();

		String picPathPic = newspicRoot + picName + ".jpg";

		if (projectRealPath == null) {
			projectRealPath = ProjectInfoUtil.getProjectRealPath(request);
		}

		String targetDirPic = projectRealPath + picPathPic;

		// 执行上传mp3
		FileAndIOUtils.springMultipartFileUpload(multipartFile, targetDirPic);

		news.setDate(new Date());
		news.setNewTitlePic(picPathPic);

		// mp3实体
		boolean result = newsDao.save(news);
		Map<String, Object> map = new HashMap<String, Object>(4);
		map.put("result", result);
		return map;

	}

	/**
	 * 删除单个用户信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/delete.action")
	@ResponseBody
	public Map<String, Boolean> delete(@RequestParam int id) {

		Map<String, Boolean> map = new HashMap<String, Boolean>(4);

		// 删除新闻评论
		boolean success = newsCommentDao.deleteCommentByNews(id);
		if (!success) {
			map.put("result", success);
			return map;
		}

		// 删除新闻实体
		success = newsDao.deleteNews(id);
		map.put("result", success);
		return map;
	}

	/**
	 * 删除单个用户信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/deleteComment.action")
	@ResponseBody
	public Map<String, Boolean> deleteComment(@RequestParam int id) {

		Map<String, Boolean> map = new HashMap<String, Boolean>(4);

		// 删除新闻评论
		boolean success = newsCommentDao.delete(id);
		map.put("result", success);
		return map;
	}
	
	
	/**
	 * 查看多个异闻录详细信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/searchNewsComment.action")
	@ResponseBody
	public Map<String, Object> searchNewsComment(
			@RequestParam(required = false, defaultValue = "eq") String serchType,
			@RequestParam(required = false, defaultValue = "") String commentMessage,
			@RequestParam(required = false, defaultValue = "1") int page,
			@RequestParam(required = false, defaultValue = "15") int records,
			@RequestParam(required = false, defaultValue = "ASC") String sord,
			@RequestParam(required = false, defaultValue = "id") String sidx) {

		// 1-起始记录计算
		int start = (page - 1) * records;

		// 2-拼接条件map
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("newscomment.commentMessage", commentMessage);

		// 3-查询实体条件过滤后的集合
		List<NewsCommentBean> newsCommentBeanList = newsCommentDao.searchNewsCommentBean(serchType,
				conditionMap, sord, sidx, start, records);

		// 4-查询条件过滤后的总记录数
		long allrecords = newsCommentDao.searchNewsCommentsNum(serchType,conditionMap,start,records);

		return buildSearchResponseMap(allrecords, newsCommentBeanList, page, records,
				serchType, conditionMap);

	}
	
	/**
	 * 按条件搜索多个用户详细信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/searchNews.action")
	@ResponseBody
	public Map<String, Object> searchNews(
			@RequestParam(required = false, defaultValue = "1") int page,
			@RequestParam(required = false, defaultValue = "15") int rows,
			@RequestParam(required = false, defaultValue = "ASC") String sord,
			@RequestParam(required = false, defaultValue = "id") String sidx,
			@RequestParam Map<String, Object> conditionMap) {

		// 搜索类型
		String serchType = (String) conditionMap.get("serchType");

		// 构建符合条件的map，用于hibernate的查询条件
		buildConditionMap(conditionMap);

		// 起始记录
		int start = (page - 1) * rows;

		// 用户集合
		List<News> userList = newsDao.findByProperty(serchType, sidx, sord,
				conditionMap, start, rows);
		return buildResponseMap(newsDao, userList, page, rows, serchType,
				conditionMap);

	}

}
