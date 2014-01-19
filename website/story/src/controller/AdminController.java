package controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import pojo.Admin;
import dao.AdminDao;

@Controller
@RequestMapping("/mywebsiteadmin")
public class AdminController {

	@Autowired
	private AdminDao adminDao;

	/**
	 * 进入登陆的主页面
	 * 
	 * @return
	 */
	@RequestMapping(value = "/adminLogin.action")
	public String adminLogin() {
		return "/admin/adminLogin";

	}

	/**
	 * 管理员注销
	 * 
	 * @return
	 */
	@RequestMapping(value = "/adminLogout.action")
	public String adminLogout(HttpSession session) {
		session.removeAttribute("admin");
		return "/admin/adminLogin";
	}

	/**
	 * 管理员登录提交
	 * 
	 * @return
	 */
	@RequestMapping(value = "/adminLoginSubmit.action")
	public String adminLoginSubmit(@ModelAttribute("admin") Admin admin,
			HttpSession session, HttpServletRequest request,
			HttpServletResponse response) {

		boolean loginSuccess = adminDao.adminLogin(admin);

		// 登陆成功
		if (loginSuccess) {
			// session赋值
			session.setAttribute("admin", admin);
			return "redirect:/admin/adminMain.jsp";
		}

		// 登陆不成功
		return "/admin/adminLogin";
	}

}
