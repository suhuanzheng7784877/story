<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>

		<title>管理员登陆</title>

	</head>

	<body>
		管理员登录
		<h2>
			登录表单
		</h2>
		<form action="adminLoginSubmit.action" method="post" onsubmit="">
			<fieldset>
				<table border="1">
					<tr>
						<td>
							账户
						</td>
						<td>
							<input name="adminName" />
						</td>
					</tr>
					<tr>
						<td>
							密码
						</td>
						<td>
							<input name="password" type="password" />
						</td>
					</tr>
					<tr>
						<td>
							验证码
						</td>
						<td>
							<img alt="des" height="36px" width="100px"
								src="<%=path%>/admin/imagecode.jsp" />
						</td>
					</tr>
					<tr>
						<td></td>
						<td>
							<input type="submit" value="登录" />
							<input type="reset" value="取消" />
						</td>
					</tr>

				</table>
			</fieldset>
		</form>
	</body>
</html>
