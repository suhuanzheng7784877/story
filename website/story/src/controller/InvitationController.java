package controller;


import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.glaze.framework.core.controler.base.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import pojo.Invitation;
import pojo.InvitationComment;
import pojo.Topic;
import pojo.User;
import vo.InvitationBean;
import vo.InvitationCommentBean;
import dao.InvitationCommentDao;
import dao.InvitationDao;
import dao.TopicDao;
import dao.UserInfoDao;

@Controller
@RequestMapping("/bbsinvitation")
public class InvitationController extends BaseController {

	@Autowired
	private TopicDao topicDao;

	@Autowired
	private InvitationDao invitationDao;

	@Autowired
	private InvitationCommentDao invitationCommentDao;

	@Autowired
	private UserInfoDao userInfoDao;

	/**
	 * 增加论坛版块
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/savetopic.action")
	public String saveTopic(@ModelAttribute("topic") Topic topic) {
		topicDao.save(topic);
		return "success";

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
		boolean success = invitationCommentDao.deleteCommentByInvitation(id);
		if (!success) {
			map.put("result", success);
			return map;
		}

		// 删除新闻实体
		success = invitationDao.delete(id);
		map.put("result", success);
		return map;
	}

	/**
	 * 发表论坛贴子
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/saveinvitation.action")
	public String saveInvitation(HttpSession session,
			@ModelAttribute("invitation") Invitation invitation) {
		User userTemp = (User) session.getAttribute("loginUser");

		// 无session
		if (null == userTemp) {
			// 没有session
			return "error";
		}

		int userId = userTemp.getId();
		invitation.setUserId(userId);
		invitation.setDate(new Date());

		// 增加论坛帖子
		invitationDao.save(invitation);

		// 用户增加相关信息
		userInfoDao.addUserexperience(userId, 5);
		userInfoDao.addUserscore(userId, 2);

		return "success";

	}

	/**
	 * 发表论坛评论
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/saveinvitationcomment.action")
	public String saveinvitationcomment(
			HttpSession session,
			@ModelAttribute("invitationComment") InvitationComment invitationComment) {
		User userTemp = (User) session.getAttribute("loginUser");

		// 无session
		if (null == userTemp) {
			// 没有session
			return "error";
		}

		int userId = userTemp.getId();
		invitationComment.setCommentUserId(userId);
		invitationComment.setDate(new Date());

		// 增加论坛帖子
		invitationCommentDao.save(invitationComment);

		// 用户增加相关信息
		userInfoDao.addUserexperience(userId, 2);
		userInfoDao.addUserscore(userId, 1);

		return "success";

	}

	/**
	 * 查看贴子
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/listinvitationbytopic.action")
	@ResponseBody
	public Map<String, Object> listInvitationByTopic(@RequestParam int topicId,
			@RequestParam(required = false, defaultValue = "1") int page,
			@RequestParam(required = false, defaultValue = "15") int records) {

		// 起始记录
		int start = (page - 1) * records;

		List<Invitation> invitationList = invitationDao
				.selectInvitationByTopic(topicId, start, records);

		return buildResponseMap(invitationDao, invitationList, page, records);

	}

	/**
	 * 查看贴子
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/listinvitation.action")
	@ResponseBody
	public Map<String, Object> listInvitation(
			@RequestParam(required = false, defaultValue = "1") int page,
			@RequestParam(required = false, defaultValue = "15") int records,
			@RequestParam(required = false, defaultValue = "ASC") String sord,
			@RequestParam(required = false, defaultValue = "id") String sidx) {

		// 起始记录
		int start = (page - 1) * records;

		List<InvitationBean> invitationBeanList = invitationDao.listInvitation(
				sord, sidx, start, records);

		return buildResponseMap(invitationDao, invitationBeanList, page,
				records);

	}

	/**
	 * 分页查看贴子评论
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/showInvitationcomment.action")
	@ResponseBody
	public Map<String, Object> showInvitationcomment(
			@RequestParam(required = false, defaultValue = "1") int page,
			@RequestParam(required = false, defaultValue = "15") int records,
			@RequestParam(required = false, defaultValue = "ASC") String sord,
			@RequestParam(required = false, defaultValue = "id") String sidx) {
		
		// 起始记录
		int start = (page - 1) * records;

		// mp3实体
		List<InvitationCommentBean> invitationCommentList = invitationCommentDao
				.selectInvitationCommentBean(sord, sidx, start, records);
		return buildResponseMap(invitationCommentDao, invitationCommentList, page, records);

	}

	/**
	 * 查看多个异闻录详细信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/searchinvitations.action")
	@ResponseBody
	public Map<String, Object> searchinvitations(
			@RequestParam(required = false, defaultValue = "eq") String serchType,
			@RequestParam(required = false, defaultValue = "") String title,
			@RequestParam(required = false, defaultValue = "1") int page,
			@RequestParam(required = false, defaultValue = "15") int records,
			@RequestParam(required = false, defaultValue = "ASC") String sord,
			@RequestParam(required = false, defaultValue = "id") String sidx) {

		// 1-起始记录计算
		int start = (page - 1) * records;

		// 2-拼接条件map
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("invitation.title", title);

		// 3-查询实体条件过滤后的集合
		List<InvitationBean> articleList = invitationDao.searchInvitationBean(
				serchType, conditionMap, sord, sidx, start, records);

		// 4-查询条件过滤后的总记录数
		long allrecords = invitationDao.searchInvitationBeansNum(serchType,
				conditionMap, start, records);

		return buildSearchResponseMap(allrecords, articleList, page, records,
				serchType, conditionMap);

	}

	/**
	 * 查看单条贴子
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/showInvitation.action")
	@ResponseBody
	public Map<String, Object> showInvitation(HttpServletRequest request,
			@RequestParam int invitationId) {
		Invitation invitation = invitationDao.findById(invitationId);
		Map<String, Object> map = new HashMap<String, Object>(4);
		map.put("result", invitation);
		return map;
	}
	
	/**
	 * 查看多个异闻录详细信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/searchinvitationComments.action")
	@ResponseBody
	public Map<String, Object> searchinvitationComments(
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
		conditionMap.put("invitationcomment.commentMessage", commentMessage);

		// 3-查询实体条件过滤后的集合
		List<InvitationCommentBean> articleList = invitationCommentDao.searchInvitationCommentBean(
				serchType, conditionMap, sord, sidx, start, records);

		// 4-查询条件过滤后的总记录数
		long allrecords = invitationCommentDao.searchInvitationCommentBeansNum(serchType,
				conditionMap, start, records);

		return buildSearchResponseMap(allrecords, articleList, page, records,
				serchType, conditionMap);

	}
}
