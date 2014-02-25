package controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.glaze.framework.core.controler.base.BaseController;
import org.glaze.framework.util.PropertiesUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import pojo.User;
import pojo.UserInfo;
import dao.UserDao;
import dao.UserInfoDao;
import dao.async.UserAsynchronizationTaskDaoImpl;

@Controller
@RequestMapping("/user")
public class UserController extends BaseController {

	// cookie的寿命
	private static final int cookieAge = Integer.parseInt(PropertiesUtil
			.getValue("story.index.cookieAge"));

	// cookie中的用户名key
	private static final String SESSION_LOGIN_USERNAME = "SESSION_LOGIN_USERNAME";

	// cookie中的密码key
	private static final String SESSION_LOGIN_PASSWORD = "SESSION_LOGIN_PASSWORD";

	@Autowired
	private UserDao userDao;

	@Autowired
	private UserInfoDao userInfoDao;

	/**
	 * 查看多个异闻录详细信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/showUsers.action")
	@ResponseBody
	public Map<String, Object> showUsers(
			@RequestParam(required = false, defaultValue = "1") int page,
			@RequestParam(required = false, defaultValue = "15") int rows,
			@RequestParam(required = false, defaultValue = "ASC") String sord,
			@RequestParam(required = false, defaultValue = "id") String sidx) {

		// 起始记录
		int start = (page - 1) * rows;

		// records:每页最多显示记录数

		// 用户集合
		List<User> userList = userDao.findByProperty(sidx, sord, start, rows);
		return buildResponseMap(userDao, userList, page, rows);

	}

	/**
	 * 按条件搜索多个用户详细信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/searchUsers.action")
	@ResponseBody
	public Map<String, Object> searchUsers(
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
		List<User> userList = userDao.findByProperty(serchType, sidx, sord,
				conditionMap, start, rows);
		return buildResponseMap(userDao, userList, page, rows, serchType,
				conditionMap);

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
		boolean success = userDao.delete(id);
		Map<String, Boolean> map = new HashMap<String, Boolean>(4);
		map.put("result", success);
		return map;
	}

	/**
	 * 登录
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/login.action", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Boolean> login(@ModelAttribute("user") User user,
			HttpSession session, HttpServletRequest request,
			HttpServletResponse response) {

		// 验证登陆结果
		boolean success = userDao.loginSuccess(user);

		if (success) {
			// session的赋值
			session.setAttribute("loginUser", user);

			// 保存cookie信息
			saveUserCookie(user.getName(), user.getPassword(), request,
					response);
		}

		Map<String, Boolean> map = new HashMap<String, Boolean>(4, 0.75F);
		map.put("result", success);
		return map;
	}

	/**
	 * 个人中心
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/profile.action")
	@ResponseBody
	public Map<String, User> profile(HttpSession session) {
		User userTemp = (User) session.getAttribute("loginUser");
		User user = userDao.findById(userTemp.getId());
		Map<String, User> map = new HashMap<String, User>(4);
		map.put("result", user);
		return map;
	}

	/**
	 * 显示一个用户信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/showOneUser.action")
	@ResponseBody
	public Map<String, User> showOneUser(@RequestParam int id) {
		User user = userDao.findById(id);
		Map<String, User> map = new HashMap<String, User>(4);
		map.put("result", user);
		return map;
	}

	/**
	 * 显示一个用户信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/showOneUserInfo.action")
	@ResponseBody
	public Map<String, UserInfo> showOneUserInfo(@RequestParam int id) {
		User user = userDao.findById(id);
		UserInfo userInfo = user.getUserInfo();
		Map<String, UserInfo> map = new HashMap<String, UserInfo>(4);
		map.put("result", userInfo);
		return map;
	}

	/**
	 * 注销
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/logout.action")
	public String logout(@ModelAttribute("user") User user, HttpSession session) {
		session.removeAttribute("loginUser");
		return "logout";
	}

	/**
	 * 注册用户
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/registeruser.action", method = RequestMethod.POST)
	public String registerUser(@ModelAttribute("user") User user) {

		UserInfo userInfo = new UserInfo();
		user.setRegdate(new Date());
		user.setUserInfo(userInfo);
		
		/*
		boolean saveUser = userDao.save(user);
		if (saveUser) {
			return "redirect:/operateSuccess.jsp?operate=register";
		} else {
			return "redirect:/operateError.jsp?operate=register";
		}
		*/
		UserAsynchronizationTaskDaoImpl userAsynchronizationTaskDaoImpl = new UserAsynchronizationTaskDaoImpl();
		userAsynchronizationTaskDaoImpl.setDao(userDao);
		try {
			asynchronizationTaskEngine.submitTask(userAsynchronizationTaskDaoImpl);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return "redirect:/operateSuccess.jsp?operate=register";

	}

	/**
	 * 添加用户
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/saveuser.action")
	@ResponseBody
	public String saveUser(@ModelAttribute("user") User user) {

		UserInfo userInfo = new UserInfo();
		user.setRegdate(new Date());
		user.setUserInfo(userInfo);
		boolean saveUser = userDao.save(user);
		if (saveUser) {
			return "success";
		} else {
			return "error";
		}

	}

	/**
	 * 用户名是否存在
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/userIsExist.action")
	@ResponseBody
	public Map<String, Boolean> userIsExist(@RequestParam String userId) {
		boolean result = false;
		result = userDao.userIsExist(userId);
		Map<String, Boolean> map = new HashMap<String, Boolean>(4);
		map.put("result", result);
		return map;
	}

	/**
	 * 用户修改基本信息
	 * 
	 * @param userInfo
	 * @return
	 */
	@RequestMapping(value = "/updateuser.action")
	@ResponseBody
	public Map<String, Boolean> updateUser(@ModelAttribute("user") User user) {
		User userTemp = userDao.findById(user.getId());
		user.setUserInfo(userTemp.getUserInfo());
		boolean success = userDao.update(user);
		Map<String, Boolean> map = new HashMap<String, Boolean>(4);
		map.put("result", success);
		return map;
	}

	/**
	 * 用户修改详细信息
	 * 
	 * @param userInfo
	 * @return
	 */
	@RequestMapping(value = "/updateuserinfo.action")
	@ResponseBody
	public Map<String, Boolean> updateUserinfo(
			@ModelAttribute("userInfo") UserInfo userInfo) {
		boolean success = userInfoDao.update(userInfo);
		Map<String, Boolean> map = new HashMap<String, Boolean>(4);
		map.put("result", success);
		return map;
	}

	/**
	 * 用户修改详细信息
	 * 
	 * @param userInfo
	 * @return
	 */
	@RequestMapping(value = "/updateuserheadurl.action")
	@ResponseBody
	public Map<String, Boolean> updateUserheadurl(@RequestParam int id,
			@RequestParam String newUserHeadUrl) {
		boolean success = userInfoDao.updateUserheadurl(id, newUserHeadUrl);
		Map<String, Boolean> map = new HashMap<String, Boolean>(4);
		map.put("result", success);
		return map;
	}

	/**
	 * 保存Cookie信息
	 * 
	 * @param userName
	 * @param userPassword
	 * @param request
	 * @param response
	 */
	private void saveUserCookie(String userName, String userPassword,
			HttpServletRequest request, HttpServletResponse response) {

		String host = request.getServerName();

		// 保存用户名到Cookie
		Cookie cookie = new Cookie(SESSION_LOGIN_USERNAME, userName);
		cookie.setPath("/");
		cookie.setDomain(host);
		cookie.setMaxAge(cookieAge);
		response.addCookie(cookie);

		// 保存密码到Cookie
		cookie = new Cookie(SESSION_LOGIN_PASSWORD, userPassword);
		cookie.setPath("/");
		cookie.setDomain(host);
		cookie.setMaxAge(cookieAge);
		response.addCookie(cookie);
	}

}
