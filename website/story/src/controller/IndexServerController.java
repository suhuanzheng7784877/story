package controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import pojo.User;
import dao.UserDao;

/**
 * 首页数据的控制器
 * 
 * @author liuyan
 */
@Controller
@RequestMapping("/index")
public class IndexServerController {

	// 用户
	@Autowired
	private UserDao userDao;

	// 是否需要更新主页数据
	public volatile static boolean isRefreshIndexMap = true;

	/**
	 * 进入登陆的主页面
	 * 
	 * @return
	 */
	@RequestMapping(value = "/index.action")
	public String index(HttpServletRequest request,
			HttpServletResponse response, HttpSession session) {
		verifyCookie(request, response, session);
		return "redirect:/index.html";
	}

	
	/**
	 * 验证Cookie是否存在用户信息
	 */
	private void verifyCookie(HttpServletRequest request,
			HttpServletResponse response, HttpSession session) {

		User user = (User) session.getAttribute("loginUser");

		if (null != user) {
			// 该用户,已经登录
			return;
		} else {
			// session中不含有登录的用户信息,则尝试从Cookie中去取
			Cookie[] cookies = request.getCookies();

			if (null == cookies || 0 == cookies.length) {
				return;
			}

			String usernameCookie = null;
			String passwordCookie = null;
			if (cookies != null) {
				String cookieName = null;
				for (Cookie cookie : cookies) {
					cookieName = cookie.getName();

					if (null == cookieName) {
						continue;
					}

					if ("SESSION_LOGIN_USERNAME".equals(cookieName)) {
						usernameCookie = cookie.getValue(); // 得到cookie的用户名
						continue;
					}
					if ("SESSION_LOGIN_PASSWORD".equals(cookieName)) {
						passwordCookie = cookie.getValue(); // 得到cookie的密码
						continue;
					}
				}

				if (usernameCookie == null || passwordCookie == null) {
					return;
				} else {
					// 如果Cookie存在用户信息
					user = new User();
					user.setName(usernameCookie);
					user.setPassword(passwordCookie);

					// 进入登陆流程
					if (userDao.loginSuccess(user)) {

						// 登陆成功
						// session的赋值
						session.setAttribute("loginUser", user);
						return;
					}
				}
			}
		}

	}

}
