package controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import pojo.ShortMessage;
import pojo.User;
import dao.ShortMessageDao;
import dao.UserDao;

/**
 * 短信息
 * 
 * @author liuyan
 */
@Controller
@RequestMapping("/shortMessage")
public class ShortMessageController {

	@Autowired
	private ShortMessageDao shortMessageDao;

	@Autowired
	private UserDao userDao;

	/**
	 * 给所有用户发送系统短信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/sendAllUsersMessage.action")
	@ResponseBody
	public String sendAllUsersMessage(@RequestParam String title,
			@RequestParam String message) {

		int[] userIds = userDao.getAllUserIds();
		shortMessageDao.sendAllUserMessagePreparedSql(title, message, userIds,
				1);

		return "success";
	}

	/**
	 * 给指定用户发送系统短信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/sendUsersMessage.action")
	@ResponseBody
	public Map<String, Object> sendUsersMessage(HttpSession session,
			@ModelAttribute("shortMessage") ShortMessage shortMessage) {

		// 此信息从session中来
		User user = (User) session.getAttribute("loginUser");
		Map<String, Object> map = new HashMap<String, Object>();
		if (user == null) {
			// 用户未登陆，不能提供下载
			map.put("error", "nologin");
			map.put("result", false);
			return map;
		}

		shortMessage.setDate(new Date());
		shortMessage.setRead(false);
		shortMessage.setSendUserId(user.getId());

		boolean result = shortMessageDao.save(shortMessage);
		map.put("result", result);
		return map;
	}
}
