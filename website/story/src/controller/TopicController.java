package controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.glaze.framework.core.controler.base.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import pojo.Topic;
import dao.InvitationCommentDao;
import dao.InvitationDao;
import dao.TopicDao;

/**
 * 短信息
 * 
 * @author liuyan
 */
@Controller
@RequestMapping("/topic")
public class TopicController extends BaseController {

	@Autowired
	private TopicDao topicDao;

	@Autowired
	private InvitationDao invitationDao;

	@Autowired
	private InvitationCommentDao invitationCommentDao;

	/**
	 * 查看多个异闻录详细信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/showTopics.action")
	@ResponseBody
	public Map<String, Object> showTopics(
			@RequestParam(required = false, defaultValue = "1") int page,
			@RequestParam(required = false, defaultValue = "15") int rows,
			@RequestParam(required = false, defaultValue = "ASC") String sord,
			@RequestParam(required = false, defaultValue = "id") String sidx) {

		// 起始记录
		int start = (page - 1) * rows;

		// records:每页最多显示记录数

		// 用户集合
		List<Topic> topicList = topicDao
				.findByProperty(sidx, sord, start, rows);
		return buildResponseMap(topicDao, topicList, page, rows);

	}

	/**
	 * 查看多个异闻录详细信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/showOneTopic.action")
	@ResponseBody
	public Map<String, Topic> showOneTopic(@RequestParam int id) {
		Map<String, Topic> map = new HashMap<String, Topic>();
		Topic topic = topicDao.findById(id);

		map.put("result", topic);
		return map;
	}

	/**
	 * 给所有用户发送系统短信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/savetopic.action")
	@ResponseBody
	public String saveTopic(@ModelAttribute("topic") Topic topic) {
		boolean saveTopic = topicDao.save(topic);
		if (saveTopic) {
			return "success";
		} else {
			return "error";
		}

	}

	/**
	 * 用户修改基本信息
	 * 
	 * @param userInfo
	 * @return
	 */
	@RequestMapping(value = "/updatetopic.action")
	@ResponseBody
	public Map<String, Boolean> updateTopic(@ModelAttribute("topic") Topic topic) {
		Map<String, Boolean> map = new HashMap<String, Boolean>();
		boolean success = topicDao.update(topic);
		map.put("result", success);
		return map;
	}

	/**
	 * 删除贴子热点
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/delete.action")
	@ResponseBody
	public Map<String, Boolean> delete(@RequestParam int id) {
		Map<String, Boolean> map = new HashMap<String, Boolean>(4);
		boolean reslut = false;
		// TODO:因为没有业务逻辑层：service，在控制层组合各个分离的dao业务
		// 删除评论
		reslut = invitationCommentDao.deleteInvitationByTopic(id);

		if (!reslut) {
			map.put("result", reslut);
			return map;
		}

		// 删除帖子
		reslut = topicDao.deleteTopic(id);
		if (!reslut) {
			map.put("result", reslut);
			return map;
		}

		// 删除主题
		reslut = invitationDao.deleteInvitationByTopic(id);

		map.put("result", reslut);
		return map;
	}

}
