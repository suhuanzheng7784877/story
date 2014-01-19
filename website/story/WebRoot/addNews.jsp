<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

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
		<form action="news/addNews.action" method="post"
			enctype="multipart/form-data">
			<fieldset>
				<table border="1">
					<tr>
						<td>
							文件名
						</td>
						<td>
							<input name="title" type="text" />
						</td>
					</tr>
					<tr>
						<td>
							描述
						</td>
						<td>
							<input name="shrotMessage" type="text" />
						</td>
					</tr>
					<tr>
						<td>
							內容
						</td>
						<td>
							<input name="newsContent" type="text" />
						</td>
					</tr>
					<tr>
						<td>
							新闻图片
						</td>
						<td>
							<input name="filePic" type="file" />
						</td>
					</tr>
					<tr>
						<td></td>
						<td>
							<input type="submit" value="提交" />
							<input type="reset" value="取消" />
						</td>
					</tr>
				</table>
			</fieldset>
		</form>
	</body>
</html>
