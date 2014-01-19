<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>template</title>


		<%@ include file="../commendInclud.jsp"%>

		<!-- 特殊业务js 该页面对应的js文件 -->
		<script type="text/javascript" src="staticpage.js">
</script>
	</head>
	<style type="text/css">
.style1 {
	background-color: #A9C3E8;
	padding: 4px;
}

#navBar1 {
	height: 26px;
	background:
		url(${pageContext.request.contextPath}/style/img/daohangbg.jpg);
	line-height: 28px;
}

cas {
	float: left;
	width: 100%;
	height: 26px;
	background:
		url(${pageContext.request.contextPath}/style/img/daohangbg.jpg)
		repeat-x;
	line-height: 28px;
}

body {
	background-color: #fff;
}
</style>

	<body>
		<div id="navBar1">
			<table width="100%" height="26px">
				<tr>
					<td width="80%" valign="middle">
						<div id="navBar" style="float: left">
							<img
								src="${pageContext.request.contextPath}/style/icon/dot11.gif"
								style="margin-left: 10px" />
							当前所在位置 :
						</div>
					</td>
					<td width="20%" align="right" valign="top">
						<div id="d2back">
							<a href="javascript:void(0);"
								onclick="parent.history.back();returnfalse;">返回</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div id="zong">
			<!-- 用户操作标题以及放一些快捷按钮 开始-->
			<div id="buttons">
				<button type="button" id="openadd1" onclick="updateIndex();">
					重新生成首页
				</button>

				<button type="button" onclick="manualGenerateLuceneIndex();">
					手工生成索引
				</button>
			</div>


		</div>
		<input type="hidden" id="basePath"
			value="${pageContext.request.contextPath}" />
		<input type="hidden" id="Tip" />
	</body>
</html>