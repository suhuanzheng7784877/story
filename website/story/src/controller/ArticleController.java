package controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.glaze.framework.core.controler.base.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import pojo.Article;
import pojo.User;
import vo.ArticleBean;
import vo.ArticleCommentBean;
import dao.ArticleCommentDao;
import dao.ArticleDao;

@Controller
@RequestMapping("/article")
public class ArticleController extends BaseController {

	@Autowired
	private ArticleDao articleDao;
	
	@Autowired
	private ArticleCommentDao articleCommentDao;

	/**
	 * 查看多个异闻录详细信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/showArticles.action")
	@ResponseBody
	public Map<String, Object> showArticles(
			@RequestParam(required = false, defaultValue = "1") int page,
			@RequestParam(required = false, defaultValue = "15") int records,
			@RequestParam(required = false, defaultValue = "ASC") String sord,
			@RequestParam(required = false, defaultValue = "id") String sidx) {
		// 起始记录
		int start = (page - 1) * records;
		// mp3实体
		List<Article> articleList = articleDao.findByProperty(sidx, sord,
				start, records);
		return buildResponseMap(articleDao, articleList, page, records);

	}

	/**
	 * 查看多个异闻录详细信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/showAllArticles.action")
	@ResponseBody
	public Map<String, Object> showAllArticles(
			@RequestParam(required = false, defaultValue = "1") int page,
			@RequestParam(required = false, defaultValue = "15") int records,
			@RequestParam(required = false, defaultValue = "ASC") String sord,
			@RequestParam(required = false, defaultValue = "id") String sidx) {

		// 起始记录
		int start = (page - 1) * records;

		// grid实体
		List<ArticleBean> articleList = articleDao.selectArticleBean(sord,
				sidx, start, records);

		return buildResponseMap(articleDao, articleList, page, records);

	}
	
	/**
	 * 查看多个异闻录详细信息评论
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/showALLArticleComments.action")
	@ResponseBody
	public Map<String, Object> showALLArticleComments(
			@RequestParam(required = false, defaultValue = "1") int page,
			@RequestParam(required = false, defaultValue = "15") int records,
			@RequestParam(required = false, defaultValue = "ASC") String sord,
			@RequestParam(required = false, defaultValue = "id") String sidx) {

		// 起始记录
		int start = (page - 1) * records;

		// grid实体
		List<ArticleCommentBean> articleList = articleCommentDao.selectArticleCommentBean(sord,
				sidx, start, records);

		return buildResponseMap(articleCommentDao, articleList, page, records);

	}
	
	/**
	 * 查看多个异闻录详细信息评论
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/searchArticleComments.action")
	@ResponseBody
	public Map<String, Object> searchArticleComments(
			@RequestParam(required = false, defaultValue = "eq") String serchType,
			@RequestParam(required = false, defaultValue = "") String commentMessage,
			@RequestParam(required = false, defaultValue = "1") int page,
			@RequestParam(required = false, defaultValue = "15") int records,
			@RequestParam(required = false, defaultValue = "ASC") String sord,
			@RequestParam(required = false, defaultValue = "id") String sidx) {

		// 1-起始记录计算
		int start = (page - 1) * records;

		// 2-拼接条件map
		Map<String, Object> conditionMap = new HashMap<String, Object>(4);
		conditionMap.put("articlecomment.commentMessage", commentMessage);

		// 3-查询实体条件过滤后的集合
		List<ArticleCommentBean> articleCommentBeanList = articleCommentDao.searchArticleCommentBean(serchType,
				conditionMap, sord, sidx, start, records);

		// 4-查询条件过滤后的总记录数
		long allrecords = articleCommentDao.searchArticleCommentBeansNum(serchType,conditionMap,start,records);

		return buildSearchResponseMap(allrecords, articleCommentBeanList, page, records,
				serchType, conditionMap);

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

		// 删除新闻评论
		boolean success = articleCommentDao.delete(id);
		Map<String, Boolean> map = new HashMap<String, Boolean>(4);
		map.put("result", success);
		return map;
	}

	/**
	 * 查看多个异闻录详细信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/searchArticles.action")
	@ResponseBody
	public Map<String, Object> searchArticles(
			@RequestParam(required = false, defaultValue = "eq") String serchType,
			@RequestParam(required = false, defaultValue = "") String title,
			@RequestParam(required = false, defaultValue = "1") int page,
			@RequestParam(required = false, defaultValue = "15") int records,
			@RequestParam(required = false, defaultValue = "ASC") String sord,
			@RequestParam(required = false, defaultValue = "id") String sidx) {

		// 1-起始记录计算
		int start = (page - 1) * records;

		// 2-拼接条件map
		Map<String, Object> conditionMap = new HashMap<String, Object>(4);
		conditionMap.put("article.title", title);

		// 3-查询实体条件过滤后的集合
		List<ArticleBean> articleList = articleDao.searchArticleBean(serchType,
				conditionMap, sord, sidx, start, records);

		// 4-查询条件过滤后的总记录数
		long allrecords = articleDao.searchArticlesNum(serchType,conditionMap,start,records);

		return buildSearchResponseMap(allrecords, articleList, page, records,
				serchType, conditionMap);

	}

	/**
	 * 查看登录用户自己的多个异闻录详细信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/showMyArticles.action")
	@ResponseBody
	public Map<String, Object> showMyArticles(
			@RequestParam(required = false, defaultValue = "1") int page,
			@RequestParam(required = false, defaultValue = "15") int records,
			HttpSession session) {

		// 起始记录
		int start = (page - 1) * records;

		// 此信息从session中来
		User user = (User) session.getAttribute("loginUser");

		if (user == null) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("result", false);
			return map;
		}

		// mp3实体
		List<Article> articleList = articleDao.selectArticleByUserId(user
				.getId(), start, records);

		// 条件
		Map<String, Object> conditionMap = new HashMap<String, Object>(4);
		conditionMap.put("authorUserId", user.getId());

		return buildResponseMap(articleDao, articleList, page, records, "eq",
				conditionMap);

	}

	/**
	 * 查看登录用户自己的多个异闻录详细信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/showOneUserArticles.action")
	@ResponseBody
	public Map<String, Object> showOneUserArticles(@RequestParam int userid,
			@RequestParam(required = false, defaultValue = "1") int page,
			@RequestParam(required = false, defaultValue = "15") int records) {

		// 起始记录
		int start = (page - 1) * records;

		// mp3实体
		List<Article> articleList = articleDao.selectArticleByUserId(userid,
				start, records);

		// 条件
		Map<String, Object> conditionMap = new HashMap<String, Object>(4);
		conditionMap.put("authorUserId", userid);

		return buildResponseMap(articleDao, articleList, page, records, "eq",
				conditionMap);

	}

	/**
	 * 查看其中一篇文章的详细信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/showOneArticles.action")
	@ResponseBody
	public Map<String, Object> showOneArticle(@RequestParam int articleId) {
		
		// mp3实体
		ArticleBean articleBean = articleDao.selectOneArticleBean(articleId);
		Map<String, Object> map = new HashMap<String, Object>(4);
		map.put("result", articleBean);
		return map;

	}

	/**
	 * 申请文章为mp3格式
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/applyPlayToMp3.action")
	@ResponseBody
	public Map<String, Object> applyPlayToMp3(@RequestParam int articleId) {
		boolean applyPlayToMp3Result = articleDao.applyPlayToMp3(articleId);
		Map<String, Object> map = new HashMap<String, Object>(4);
		map.put("result", applyPlayToMp3Result);
		return map;
	}

}
