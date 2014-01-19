<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>网站后台</title>

		<!-- 公共的css、js页面 -->
		<%@ include file="commendInclud.jsp"%>


		<script type="text/javascript">

var mtree = new dTree('', '${pageContext.request.contextPath}');
$(document).ready(function() {
	getusermenu();

});

//根据用户权限来获取菜单组
function getusermenu() {
	$
			.ajax( {
				url : 'menu.xml',
				datatype : 'xml',
				cache : true,//如果值变化可能性比较大 一定要将缓存设成false
				timeout : 10000,
				async : true,//异步的方式
				success : function(xml) {
					//只有 url参数中 datatype="xmlattr"时才可以这样通过属性取值
					mtree = new dTree('mtree',
							'${pageContext.request.contextPath}');
					mtree.add(0, -1, '操作菜单', "#", "", "", "", "", false);
					var pmenuname = '';
					$(xml)
							.find('row')
							.each(
									function() {
										var id = $(this).find("imenuid").text();

										var parentid = $(this)
												.find("iparentid").text(); //父菜单id

										//暂时注释
										var sParentName = '父菜单名称';//$(this).attr("sparentname"); //父菜单名称								

										var name = $(this).find("smenuname")
												.text(); //菜单名称

										var sImgIco = "${pageContext.request.contextPath}/plug-in/dtree/img"
												+ $(this).find("simgico")
														.text();
										var url = $(this).find("smenuurl")
												.text();//菜单对应页面路径
										var thepage = "javascript:jumpPage('${pageContext.request.contextPath}/"
												+ url + "')";

										mtree.add(id, parentid, name, thepage,
												"", "", sImgIco, "", false);
									});
					$("#usermenu").html(mtree.toString());
					//页面跳转
					jumpPage('right.jsp');
				}
			});
}

//页面跳转
function jumpPage(pagename) {
	if (pagename == "#") {
		return;
	}
	$("#tsdIframe").attr('target', 'tsdIframe');
	$("#tsdIframe").attr('src', pagename);
}
</script>


		<!--[if IE]>
<style type="text/css">
.toplogo {
    background:none;
    filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${pageContext.request.contextPath}/style/img/logobg.png' ,sizingMethod='crop');
}
.toplogo01{
    background:none;    
		filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${pageContext.request.contextPath}/style/img/logo02.png' ,sizingMethod='crop');
}
.topbot01{
    background:none;
    filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${pageContext.request.contextPath}/style/img/topbot01.png' ,sizingMethod='crop');
}
.topbot02{
    background:none;
    filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${pageContext.request.contextPath}/style/img/topbot02.png' ,sizingMethod='crop');
}
.topbot03{
    background:none;
    filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${pageContext.request.contextPath}/style/img/topbot03.png' ,sizingMethod='crop');
}
</style>
<![endif]-->



		<style type="text/css">
#winpop {
	width: 250px;
	height: 0px;
	position: absolute;
	right: 0;
	bottom: 0;
	border: 1px solid #666;
	margin-bottom: 35px;
	padding: 1px;
	background: #FFFFFF;
	overflow: hidden;
	display: none;
}

#winpop .title {
	width: 100%;
	height: 22px;
	line-height: 20px;
	background: #FFCC00;
	font-weight: bold;
	text-align: center;
	font-size: 12px;
}

#winpop .con {
	width: 100%;
	height: 120px;
	font-weight: bold;
	font-size: 14px;
	color: #FF0000;
	text-decoration: underline;
}  /* http://www.webdm.cn */
#silu {
	font-size: 12px;
	color: #666;
	position: absolute;
	right: 0;
	text-align: right;
	text-decoration: underline;
	line-height: 22px;
	top: 300px
}

.close {
	position: absolute;
	right: 4px;
	top: -1px;
	color: #FFF;
	cursor: pointer
}
</style>
		<style type="text/css">
.thisnotice {
	position: absolute;
	top: 30px;
	left: -70px;
	z-index: 2;
	font-size: 12px;
}
</style>
		<style type="text/css">
<!--
#scrollWrap {
	width: 280px;
	height: 18px;
	overflow: hidden;
}

#scrollMsg {
	float: left;
	text-align: left;
	padding: 0 5px;
}

#scrollMsg ul {
	margin: 0;
	padding: 0;
}

#scrollMsg li {
	line-height: 18px;
	list-style: none;
}

#scrollMsg li a {
	color: #FFFFFF;
	text-decoration: none;
}

#scrollMsg li a:hover {
	color: #F60;
}
-->
</style>

		<style type="text/css" rel="stylesheet">
body,html {
	border: 0;
	margin: 0;
	padding: 0;
}

html {
	height: 100%;
}

body {
	overflow: hidden;
	width: 100%;
	height: 100%;
}

#banner {
	height: 50px;
}

.left-wrapper {
	bottom: 35px;
	top: 50px;
	left: 0px;
	z-index: 3;
	width: 220px;
	display: block;
	position: absolute;;
	height: expression(document.body.offsetHeight -                         85 +    
		             
		      'px');
	background-color: #edf6fd;
}

.left-title {
	color: #fff;
	height: 28px;
	line-height: 28px;
	background-image:
		url(${pageContext.request.contextPath}/style/img/leftbg.jpg);
	width: 220px;
	position: absolute;
	left: 0px;
	top: 50px;
}

.separator {
	position: absolute;
	top: 50px;
	bottom: 35px;
	left: 220px;;
	height: expression(document.body.offsetHeight -                         85 +    
		             
		      'px');
	border-left: 1px solid #CEE0EE;
	background-color: #edf6fd;
	height: 100%;
	width: 12px;
}

.separator-larger {
	position: absolute;
	top: 50px;
	bottom: 35px;
	left: 0px;;
	height: expression(document.body.offsetHeight -                         85 +    
		             
		      'px');
	border-left: 1px solid #CEE0EE;
	background-color: #edf6fd;
	height: 100%;
	width: 12px;
}

.tag-separator {
	position: relative;
	display: block;
	/* top:50%;*/ /*left:50%;*/
}

.content-wrapper {
	top: 50px;
	right: 0px;
	z-index: 4;
	left: 232px;
	bottom: 35px;
	display: block;
	overflow: hidden;
	position: absolute;
	background-color: white;
}

.content-wrapper-larger {
	top: 50px;
	right: 0px;
	z-index: 4;
	left: 12px;
	bottom: 35px;
	display: block;
	overflow: hidden;
	position: absolute;
	background-color: white;
}

.main-frame {
	overflow: auto;
	z-index: 5;
	width: 100%;;
	width: expression(document.body.offsetWidth -                         232 +    
		             
		      'px');
	height: 100%;;
	height: expression(document.body.offsetHeight -                         85 +    
		             
		      'px');
}

.main-frame-larger {
	overflow: auto;
	z-index: 5;
	width: 100%;;
	width: expression(document.body.offsetWidth -                         12 +    
		              
		     'px');
	height: 100%;;
	height: expression(document.body.offsetHeight -                         85 +    
		             
		      'px');
}

.footer {
	overflow: hidden;
	position: absolute;
	z-index: 6;
	display: block;
	bottom: 0px;
	_bottom: -1px;
	left: 0px;
	right: 0px;;
	width: expression(document.body.offsetWidth -                         0 +    
		              
		     'px');
}
</style>

	</head>

	<body scroll="no" onunload="logInfo()">
		<div class="top">
			<div class="top00">
				<div class="toplogo">
					<div class="toplogo01"></div>

					<div class="toprig">
						<div class="topanniu">
							<div class="topanniu_01"
								style="background: url(${pageContext.request.contextPath}/style/img/topr03.gif) no-repeat 0px 7px;">
								<a href="#" onclick="window.close();">退出</a>
							</div>
						</div>
						<div class="topbot">
							<div id="logininfo" style="width: 500px; text-align: left;"></div>
						</div>
					</div>

				</div>
			</div>

			<div id="showTree">
				<div align="center" class="left-title">
					导航菜单
				</div>
				<div id="usermenu"
					style="bottom: 35px; top: 78px; left: 0px; z-index: 3; width: 210px; display: block; position: absolute;; height: expression(document.body.offsetHeight -                         118 +                         'px'); background-color: #edf6fd; overflow-x: hidden; overflow-y: auto; padding-top: 5px; padding-left: 10px;"></div>
			</div>

			<div class="separator" id="ctrlBnt_div">
				<div class="Hideaway tag-separator" id="ctrlBnt" onclick="ctrlbar()">
					<a href="#" onfocus="this.blur()"
						style="height: 500px; line-height: 500px;"></a>
				</div>
			</div>
			<div id="tsdIframe_div" class="content-wrapper">
				<iframe class="main-frame" id="tsdIframe" name="right"
					src="right.jsp" hidefocus frameborder="no" marginwidth="0"
					marginheight="0"></iframe>
			</div>

			<div class="footer bott">
				网站后台 版权所有
			</div>


		</div>
		<script type="text/javascript">
function thiswillhide() {
	$('#winpop').hide('slow');
	$('#soundtips').html('');
}
</script>

		<input type="hidden" id='returnvalue' />
		<input type="hidden" id='setup' />
		<input type="hidden" id='move' />
		<input type="hidden" id='destroy' />
	</body>
</html>
