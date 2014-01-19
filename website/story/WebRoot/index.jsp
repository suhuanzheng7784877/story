<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.util.Map,java.util.List,pojo.*"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>琉璃仙境</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords"
			content="恐怖故事,恐怖mp3,原创小说,午夜拍案惊奇,午夜故事,mp3,月玲珑,配音,音乐,AV,玄幻,奇幻,异文,政治,社会,新闻,微博,下载,故事,小说,异闻录">
		<meta http-equiv="description" content="This is my page">

		<link rel="stylesheet" type="text/css" href="style/css/preview.css" />
		<link rel="stylesheet" type="text/css" href="style/css/bootstrap.css" />
		<link rel="stylesheet" type="text/css" href="style/css/index.css" />
		<script type="text/javascript" src="script/index.js">
</script>
		<script type="text/javascript" src="plug-in/jquery/jquery-1.9.0.js">
</script>

		<%
			Map indexDataMap = (Map) request.getAttribute("indexDate");
			System.out.println("indexDataMap:" + indexDataMap);

			List<Article> articleList = (List<Article>) indexDataMap
					.get("articleList");
			List<StoryMp3> storyMp3List = (List<StoryMp3>) indexDataMap
					.get("storyMp3List");
			List<News> newsList = (List<News>) indexDataMap.get("newsList");
			;
		%>

	</head>

	<body>
		<div class="container main">
			<header class="container">
			<div class="row" style="padding: 10px 0;">
				<div class="span30 " style="float: left;">
					<div class="row logorow">
						<a href="/home/start" title="web开发站"><img
								src="style/img/logo.jpg" /> </a>
					</div>
				</div>
				<div class="span70">
					<div class="row">
						<div class="span69">
							<div class="manageBar">
								<a href="#">登录</a><span class="pipe">|</span><a
									href="/runtime/register">注册</a>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="span69">
							<div class="search-form pull-right">
								<form action="/runtime/search.jspx" id="scbar_form" method="get"
									autocomplete="off" target="_blank">
									<div class="search-input">
										<div class="menu_type">
											<select name="type" id="search_type"
												style="width: 70px; height: 26px;">

												<option value="article">
													文章
												</option>

												<option value="blog">
													博客
												</option>

												<option value="res">
													开源
												</option>

												<option value="bbs">
													论坛
												</option>

											</select>
										</div>
										<div class="inputc">
											<input class="text xg1" name="q" id="search_q" type="text">
										</div>
										<button type="submit" name="SearchSubmit" id="SearchSubmit"
											value="true"></button>
									</div>
								</form>
							</div>
						</div>
					</div>

				</div>
			</div>
			<div class="row">
				<div class="span100">
					<div class="navBar">
						<ul class="menubar">
							<li onMouseOver="channel_onmouseover(this)"
								onmouseout="channel_onmouseout(this)">
								<a id="channel_home" onClick="channel_onclick(this)">首页</a>
							</li>
							<li onMouseOver="channel_onmouseover(this)"
								onmouseout="channel_onmouseout(this)">
								<a id="channel_article" onClick="channel_onclick(this)">文章</a>
							</li>
							<li onMouseOver="channel_onmouseover(this)"
								onmouseout="channel_onmouseout(this)">
								<a id="channel_blog" onClick="channel_onclick(this)">新闻</a>
							</li>
							<li onMouseOver="channel_onmouseover(this)"
								onmouseout="channel_onmouseout(this)">
								<a id="channel_res" onClick="channel_onclick(this)">故事视听</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			</header>

			<div class="container page">
				<!--row-->
				<div class="row">
					<div class="span71" style="float: left;">
						<div class="row ">
							<div class="span35" style="float: left;">
								<div class="list_box topBox" id="bannerNews">
									<div id="imgbanner">
										<div id="imgbanner_bg"></div>
										<!--标题背景-->
										<div id="imgbanner_info"></div>
										<!--标题-->
										<ul>
											<li class="on">
												1
											</li>
											<li>
												2
											</li>
											<li>
												3
											</li>
											<li>
												4
											</li>
										</ul>
										<div id="imgbanner_list">
											<a href="/blog/article/712" target="_blank"><img
													src="http://www.dev26.com/ueditor/jsp/upload/1359648735593.jpg"
													title="仿微博字符统计和本地存储功能的实现" alt="仿微博字符统计和本地存储功能的实现" /> </a>
											<a href="/ann/announcement/583" target="_blank"><img
													src="http://www.dev26.com/upload/4/10/1098.jpg"
													title="中华英才网的覆灭：自杀式改版与被动挨打" alt="中华英才网的覆灭：自杀式改版与被动挨打" /> </a>
											<a href="/ann/announcement/582" target="_blank"><img
													src="http://www.dev26.com/upload/4/9/1097.jpg"
													title="互联网公司 请裁掉无线部门！" alt="互联网公司 请裁掉无线部门！" /> </a>
											<a href="/bbs/topic/763" target="_blank"><img
													src="http://www.dev26.com/ueditor/jsp/upload/1359077313812.jpg"
													title="程序员性格怪癖是才华横溢的表现还是危险分子征兆？"
													alt="程序员性格怪癖是才华横溢的表现还是危险分子征兆？" /> </a>
										</div>
									</div>
								</div>
							</div>
							<div class="span35 offset1">
								<div class="list_box topBox">
									<h2 class="hd">
										<span><a href="/announcement/start" title="更多">更多&gt;&gt;</a>
										</span><font>聚焦</font>新闻
									</h2>
									<div class="box_cn_top">
										<h3 class="h3">
											<a href="/ann/announcement/583">中华英才网的覆灭：自杀改版与被动挨打</a>
										</h3>
										<p>
											中华英才网还没被卖掉，200名员工已经要求被裁员，甚至不惜围堵高管，对于美国母公司Monster来说……
										</p>
										<ul class="ul_list_top">
											<li>
												<span class="pull-right timeago" title="2013-02-01 22:19"></span><span
													class="fl">【开源】</span><a href="/res/resource/170"
													target="_blank" title="${a.title}">JavaScript 面向对象框架 dejavu</a>
											</li>
											<li>
												<span class="pull-right timeago" title="2013-02-01 00:25"></span><span
													class="fl">【博客】</span><a href="/blog/article/712"
													target="_blank" title="${a.title}">仿微博字符统计和本地存储功能的实现</a>
											</li>
											<li>
												<span class="pull-right timeago" title="2013-02-01 00:08"></span><span
													class="fl">【新闻】</span><a href="/ann/announcement/583"
													target="_blank" title="${a.title}">中华英才网的覆灭：自杀式改版与被动挨打</a>
											</li>
											<li>
												<span class="pull-right timeago" title="2013-01-28 11:37"></span><span
													class="fl">【新闻】</span><a href="/ann/announcement/582"
													target="_blank" title="${a.title}">互联网公司 请裁掉无线部门！</a>
											</li>
											<li>
												<span class="pull-right timeago" title="2013-01-28 11:37"></span><span
													class="fl">【新闻】</span><a href="/ann/announcement/582"
													target="_blank" title="${a.title}">互联网公司 请裁掉无线部门！</a>
											</li>
											<li>
												<span class="pull-right timeago" title="2013-02-01 00:08"></span><span
													class="fl">【新闻】</span><a href="/ann/announcement/583"
													target="_blank" title="${a.title}">中华英才网的覆灭：自杀式改版与被动挨打</a>
											</li>
											<li>
												<span class="pull-right timeago" title="2013-01-28 11:37"></span><span
													class="fl">【新闻】</span><a href="/ann/announcement/582"
													target="_blank" title="${a.title}">互联网公司 请裁掉无线部门！</a>
											</li>
											<li>
												<span class="pull-right timeago" title="2013-01-28 11:37"></span><span
													class="fl">【新闻】</span><a href="/ann/announcement/582"
													target="_blank" title="${a.title}">互联网公司 请裁掉无线部门！</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div class="row mar_10">
							<div class="span35" style="float: left;">
								<div class="list_box">
									<h2 class="hd">
										<span><a href="/announcement/start" title="更多">更多&gt;&gt;</a>
										</span>新闻
									</h2>
									<ul class="list" id="newIndexList">

										<%
											for (News newObj : newsList) {
										%>

										<li>
											<span class="pull-right timeago"
												title="<%=newObj.getTitle()%>"></span><a
												href="/ann/announcement/583" target="_blank"
												title="<%=newObj.getTitle()%>"><%=newObj.getShrotMessage()%></a>
										</li>

										<%
											}
										%>
									</ul>
								</div>
							</div>
							<div class="span35 offset1">
								<div class="list_box">
									<h2 class="hd">
										<span><a href="/pioneering/start" title="更多">更多&gt;&gt;</a>
										</span><font>创业</font>故事
									</h2>
									<ul class="list">
										<li>
											<span class="pull-right timeago" title="2013-01-22 09:28"></span><a
												href="/pio/pioneering/267" target="_blank"
												title="风投者的悖论：创业者的理想与公司报表孰轻孰重">风投者的悖论：创业者的理想与公司报表孰轻孰重</a>
										</li>
										<li>
											<span class="pull-right timeago" title="2013-01-16 22:08"></span><a
												href="/pio/pioneering/266" target="_blank"
												title="中国互联网创业者的困境">中国互联网创业者的困境</a>
										</li>
										<li>
											<span class="pull-right timeago" title="2013-01-09 11:20"></span><a
												href="/pio/pioneering/265" target="_blank"
												title="“出走”阿里创办米折网&nbsp;获IDG千万融资">“出走”阿里创办米折网&nbsp;获IDG千万融资</a>
										</li>
										<li>
											<span class="pull-right timeago" title="2013-01-02 14:22"></span><a
												href="/pio/pioneering/264" target="_blank"
												title="创业公司招人两难：资深人士，招还是不招？">创业公司招人两难：资深人士，招还是不招？</a>
										</li>
										<li>
											<span class="pull-right timeago" title="2012-12-26 15:38"></span><a
												href="/pio/pioneering/263" target="_blank"
												title="创新工场开始向初创企业提供人民币融资">创新工场开始向初创企业提供人民币融资</a>
										</li>
										<li>
											<span class="pull-right timeago" title="2012-12-21 09:43"></span><a
												href="/pio/pioneering/262" target="_blank"
												title="40%&nbsp;创业企业&nbsp;A&nbsp;轮融资难">40%&nbsp;创业企业&nbsp;A&nbsp;轮融资难</a>
										</li>
										<li>
											<span class="pull-right timeago" title="2012-12-18 09:53"></span><a
												href="/pio/pioneering/261" target="_blank"
												title="马云的终极梦想：30&nbsp;家公司，三波&nbsp;IPO">马云的终极梦想：30&nbsp;家公司，三波&nbsp;IPO</a>
										</li>
										<li>
											<span class="pull-right timeago" title="2012-12-15 09:13"></span><a
												href="/pio/pioneering/260" target="_blank"
												title="你知道我今天为什么来公司上班吗？">你知道我今天为什么来公司上班吗？</a>
										</li>
										<li>
											<span class="pull-right timeago" title="2012-12-13 14:02"></span><a
												href="/pio/pioneering/259" target="_blank"
												title="怎么会是泡沫？科技行业仍处大萧条时期">怎么会是泡沫？科技行业仍处大萧条时期</a>
										</li>
										<li>
											<span class="pull-right timeago" title="2012-12-12 09:34"></span><a
												href="/pio/pioneering/258" target="_blank"
												title="挑选初创企业的考虑因素">挑选初创企业的考虑因素</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="row mar_10">
							<div class="span71" style="float: left;">
								<div class="list_box">
									<h2 class="hd">
										<span><a href="/article/start" title="更多">更多&gt;&gt;</a>
										</span><font>异闻录</font>
									</h2>
									<dl class="list">


										<%
											for (Article article : articleList) {
										%>
										<dt>
											<span class="pull-right timeago"
												title="<%=article.getTitle()%>"></span><a
												href="/blog/article/714" target="_blank"
												title="<%=article.getTitle()%>"><%=article.getTitle()%></a>
										</dt>
										<dd>
											<%=article.getContent().substring(0, 30)%>……
										</dd>
										<%
											}
										%>
									</dl>
								</div>
							</div>
						</div>
						<div class="row mar_10">
							<div class="span35" style="float: left;">
								<div class="list_box">
									<h2 class="hd">
										<span><a href="/bbs/board/205" title="更多">更多&gt;&gt;</a>
										</span><font>代码</font>分享
									</h2>
									<ul class="list">
										<li>
											<a href="/bbs/topic/757" target="_blank"
												title="jsp引用servlet生成的验证码}">jsp引用servlet生成的验证码</a>
										</li>
										<li>
											<a href="/bbs/topic/754" target="_blank" title="常用mysql基础语句}">常用mysql基础语句</a>
										</li>
										<li>
											<a href="/bbs/topic/751" target="_blank"
												title="hibernate&nbsp;配置ehcache缓存}">hibernate&nbsp;配置ehcache缓存</a>
										</li>
										<li>
											<a href="/bbs/topic/750" target="_blank"
												title="实现CSS压缩和CSS格式化的核心代码}">实现CSS压缩和CSS格式化的核心代码</a>
										</li>
										<li>
											<a href="/bbs/topic/745" target="_blank"
												title="使用NodeJS+Express从GET/POST和Request&nbsp;取值}">使用NodeJS+Express从GET/POST和Request&nbsp;取值</a>
										</li>
										<li>
											<a href="/bbs/topic/742" target="_blank"
												title="iframe无刷新跨域上传文件并获取返回值}">iframe无刷新跨域上传文件并获取返回值</a>
										</li>
										<li>
											<a href="/bbs/topic/739" target="_blank"
												title="利用sql语句实现字段替换}">利用sql语句实现字段替换</a>
										</li>
										<li>
											<a href="/bbs/topic/738" target="_blank"
												title="javascript在Object对象原型上扩展toJSON方法}">javascript在Object对象原型上扩展toJSON方法</a>
										</li>
										<li>
											<a href="/bbs/topic/731" target="_blank"
												title="javascript实现命名空间}">javascript实现命名空间</a>
										</li>
										<li>
											<a href="/bbs/topic/730" target="_blank"
												title="JSP如何防范SQL注入攻击}">JSP如何防范SQL注入攻击</a>
										</li>
									</ul>
								</div>
							</div>
							<div class="span35 offset1">
								<div class="list_box">
									<h2 class="hd">
										<span><a href="/bbs/board/207" title="更多">更多&gt;&gt;</a>
										</span><font>编程</font>生涯
									</h2>
									<ul class="list">
										<li>
											<a href="/bbs/topic/763" target="_blank"
												title="程序员性格怪癖是才华横溢的表现还是危险分子征兆？}">程序员性格怪癖是才华横溢的表现还是危险分子征兆？</a>
										</li>
										<li>
											<a href="/bbs/topic/761" target="_blank"
												title="程序员为何喜欢半夜工作？}">程序员为何喜欢半夜工作？</a>
										</li>
										<li>
											<a href="/bbs/topic/760" target="_blank"
												title="为什么软件程序员的价值总是被严重的低估}">为什么软件程序员的价值总是被严重的低估</a>
										</li>
										<li>
											<a href="/bbs/topic/759" target="_blank"
												title="如何判断自己是否到了该辞职的时候}">如何判断自己是否到了该辞职的时候</a>
										</li>
										<li>
											<a href="/bbs/topic/756" target="_blank"
												title="让每天变成&nbsp;26&nbsp;小时}">让每天变成&nbsp;26&nbsp;小时</a>
										</li>
										<li>
											<a href="/bbs/topic/752" target="_blank"
												title="投入工作与生活幸福，并非简单对立}">投入工作与生活幸福，并非简单对立</a>
										</li>
										<li>
											<a href="/bbs/topic/748" target="_blank" title="程序员如何保持优秀}">程序员如何保持优秀</a>
										</li>
										<li>
											<a href="/bbs/topic/746" target="_blank"
												title="少编码多思考：代码越多&nbsp;问题越多}">少编码多思考：代码越多&nbsp;问题越多</a>
										</li>
										<li>
											<a href="/bbs/topic/740" target="_blank" title="程序研发之舌战风云}">程序研发之舌战风云</a>
										</li>
										<li>
											<a href="/bbs/topic/734" target="_blank"
												title="关于项目经理/IT顾问的两则笑话}">关于项目经理/IT顾问的两则笑话</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="row mar_10">
							<div class="span71" style="float: left;">
								<div class="list_box">
									<h2 class="hd">
										<span><a href="/bbs/board/206" title="更多">更多&gt;&gt;</a>
										</span><font>技术</font>交流
									</h2>
									<dl class="list">
										<dt>
											<span class="pull-right timeago" title="2013-02-02 02:55"></span><a
												href="/bbs/topic/764" target="_blank"
												title="sac&nbsp;lancel&nbsp;france 最后更新：${t.updatedDateAsString}">sac&nbsp;lancel&nbsp;france</a>
										</dt>
										<dd>
											lancel Lancement d'une marque spéciale 135 anniversaire de la
											naissance de L'Angèle Lancel sacs à main par,lancel s...
										</dd>
										<dt>
											<span class="pull-right timeago" title="2012-12-28 15:32"></span><a
												href="/bbs/topic/753" target="_blank"
												title="jquery&nbsp;选择器的问题 最后更新：${t.updatedDateAsString}">jquery&nbsp;选择器的问题</a>
										</dt>
										<dd>

											$("input:not(:checked) + span") 请问 有知道这个是什么意思的吗？感谢！

										</dd>
										<dt>
											<span class="pull-right timeago" title="2012-12-28 10:20"></span><a
												href="/bbs/topic/725" target="_blank"
												title="前端开发该如何学习？ 最后更新：${t.updatedDateAsString}">前端开发该如何学习？</a>
										</dt>
										<dd>
											做好好久的前端开发了，一直不知道一个合格的前端开发人员都应该具有哪些能力？ 需要学习什么
										</dd>
										<dt>
											<span class="pull-right timeago" title="2012-12-17 10:50"></span><a
												href="/bbs/topic/741" target="_blank"
												title="Java&nbsp;object类中有哪些方法 最后更新：${t.updatedDateAsString}">Java&nbsp;object类中有哪些方法</a>
										</dt>
										<dd>

											面试问的最多的问题是：“Java
											object类中有哪些方法？归类总结一下”。一般情况下，3年以上工作经验的回答少于6个方法的，会导致减分，2年以下工作经验的知道6个以上会加分。到阿里云后面试过30+，回答让我满意的人很少。
											作为...
										</dd>
										<dt>
											<span class="pull-right timeago" title="2012-12-15 20:55"></span><a
												href="/bbs/topic/736" target="_blank"
												title="一个可以运算复杂数据运算的javascript库 最后更新：${t.updatedDateAsString}">一个可以运算复杂数据运算的javascript库</a>
										</dt>
										<dd>

											介绍一个可以运算复杂数据运算的js库，名字叫Numbers.js，可以进行三角，矩阵等复杂运算，
											地址在：https://github.com/sjkaliski/numbers.js，使用简单，可以支持在node.js和普通j...
										</dd>
									</dl>
								</div>
							</div>
						</div>
						<div class="row mar_10">
							<div class="span71" style="float: left;">
								<div class="list_box list_job">
									<h2 class="hd">
										<span><a href="#" title="更多">更多&gt;&gt;</a> </span><font>求职</font>招聘
									</h2>
									<ul class="list">
										<li class="cnli">
											<span class="pull-right timeago" title="2012-12-19 09:46"></span><a
												href="/bbs/topic/747" target="_blank"
												title="Hadoop基础题库 最后更新：${t.updatedDateAsString}">Hadoop基础题库</a>
										</li>
										<li class="cnli">
											<span class="pull-right timeago" title="2012-10-22 00:20"></span><a
												href="/bbs/topic/706" target="_blank"
												title="seo面试题分析,祝seo面试成功 最后更新：${t.updatedDateAsString}">seo面试题分析,祝seo面试成功</a>
										</li>
										<li class="cnli">
											<span class="pull-right timeago" title="2012-10-17 09:58"></span><a
												href="/bbs/topic/705" target="_blank"
												title="上海/杭州人才招聘 最后更新：${t.updatedDateAsString}">上海/杭州人才招聘</a>
										</li>
										<li class="cnli">
											<span class="pull-right timeago" title="2012-10-02 18:11"></span><a
												href="/bbs/topic/694" target="_blank"
												title="微软,EMC,百度,SAP,IBM内部推荐及猎头高薪招聘最新职位列表&nbsp;15w～50w 最后更新：${t.updatedDateAsString}">微软,EMC,百度,SAP,IBM内部推荐及猎头高薪招聘最新职位列表&nbsp;15w～50w</a>
										</li>
										<li class="cnli">
											<span class="pull-right timeago" title="2012-09-11 13:38"></span><a
												href="/bbs/topic/684" target="_blank"
												title="关于开发人员招聘的那点吐槽 最后更新：${t.updatedDateAsString}">关于开发人员招聘的那点吐槽</a>
										</li>
									</ul>
								</div>
							</div>

						</div>
					</div>
					<div class="span28 offset1">
						<div class="list_box row ">
							<h2 class="hd">
								用户登录
							</h2>
							<form class="form-horizontal" action="/runtime/signon.jspx"
								method="post" enctype="application/x-www-form-urlencoded"
								onsubmit="return checkSignon(this);">
								<div class="control-group">
									<label class="control-label" for="l_username">
										用户名
									</label>
									<div class="controls">
										<input type="text" name="username" id="l_username"
											placeholder="用户名" maxlength="20"
											regex="^[a-zA-Z0-9][a-zA-Z0-9\-]{1,18}[a-zA-Z0-9]$"
											msg="用户名输入有误：" />
									</div>
								</div>
								<div class="control-group">
									<label class="control-label" for="l_password">
										密码
									</label>
									<div class="controls">
										<input type="password" name="password" id="l_password"
											placeholder="密码" maxlength="20"
											regex="^[a-zA-Z0-9][a-zA-Z0-9\-]{1,18}[a-zA-Z0-9]$"
											msg="密码输入有误：" />
									</div>
								</div>
								<div class="control-group">
									<div class="controls">
										<input type="button" class="btn btn-success"
											onclick="login();" value="登录网站" />
										<a href="/runtime/register.jspx" class="regBt">注册</a><a
											href="/runtime/forgotPassword.jspx" class="regBt">忘记密码?</a>
									</div>
								</div>
							</form>
						</div>
						<div class="list_box row mar_10 ">
							<div class="span28">
								<h4 class="msgHD">
									发布微博:
								</h4>
							</div>
							<form class="form-inline">
								<textarea class="msgContent limited" id="content"></textarea>
								<button type="button" class="btn btn-success msgBtn" id="saybt">
									发布
								</button>
								<input type="hidden" name="maxlength" value="100">
								<p class="num-p">
									可以输入
									<span class="charsLeft">100</span> 个字符
								</p>
							</form>
							<ul class="media-list" id="recentweibo">
								<li class="media">
									<div class="row">
										<a class="pull-left" href="/blog/start.jspx?username=wangtao">
											<img class="media-object userAvatar"
												src="/upload/logo/191/74/wangtao.jpg" alt="爱自由" title="爱自由" />
										</a>
										<div class="media-body msgBody">
											<div style="padding-right: 20px;">
												<a href="/blog/start.jspx?username=wangtao"
													class="pull-left">爱自由</a>：
												<span class="time pull-right">(<a
													href="/weibo.jspx?id=206&amp;object=View">0评</a>)</span><span
													class="time timeago pull-right" title="2013-01-31 23:54"></span>
											</div>
											<div class="weiboContent">
												好久没来了，上来看看
											</div>
										</div>
									</div>
								</li>
								<li class="media">
									<div class="row">
										<a class="pull-left" href="/blog/start.jspx?username=undead">
											<img class="media-object userAvatar"
												src="/upload/logo/125/22/undead.jpg" alt="黑神领主" title="黑神领主" />
										</a>
										<div class="media-body msgBody">
											<div style="padding-right: 20px;">
												<a href="/blog/start.jspx?username=undead" class="pull-left">黑神领主</a>：
												<span class="time pull-right">(<a
													href="/weibo.jspx?id=205&amp;object=View">0评</a>)</span><span
													class="time timeago pull-right" title="2013-01-23 10:04"></span>
											</div>
											<div class="weiboContent">
												大家早上好
											</div>
										</div>
									</div>
								</li>
								<li class="media">
									<div class="row">
										<a class="pull-left"
											href="/blog/start.jspx?username=zhonghuayidao"> <img
												class="media-object userAvatar"
												src="/upload/logo/default.gif" alt="中华医道" title="中华医道" /> </a>
										<div class="media-body msgBody">
											<div style="padding-right: 20px;">
												<a href="/blog/start.jspx?username=zhonghuayidao"
													class="pull-left">中华医道</a>：
												<span class="time pull-right">(<a
													href="/weibo.jspx?id=204&amp;object=View">0评</a>)</span><span
													class="time timeago pull-right" title="2013-01-22 21:31"></span>
											</div>
											<div class="weiboContent">
												[/表情1]漫将柳线编图案，乐把雨丝绘画屏。
											</div>
										</div>
									</div>
								</li>
								<li class="media">
									<div class="row">
										<a class="pull-left"
											href="/blog/start.jspx?username=zhonghuayidao"> <img
												class="media-object userAvatar"
												src="/upload/logo/default.gif" alt="中华医道" title="中华医道" /> </a>
										<div class="media-body msgBody">
											<div style="padding-right: 20px;">
												<a href="/blog/start.jspx?username=zhonghuayidao"
													class="pull-left">中华医道</a>：
												<span class="time pull-right">(<a
													href="/weibo.jspx?id=203&amp;object=View">0评</a>)</span><span
													class="time timeago pull-right" title="2013-01-22 21:26"></span>
											</div>
											<div class="weiboContent">
												[/表情62]“诚实是上策”。可是照此去做的人不见得都是老实人。
											</div>
										</div>
									</div>
								</li>
								<li class="media">
									<div class="row">
										<a class="pull-left"
											href="/blog/start.jspx?username=suhuanzheng7784877"> <img
												class="media-object userAvatar"
												src="/upload/logo/40/162/suhuanzheng7784877.jpg" alt="小大人"
												title="小大人" /> </a>
										<div class="media-body msgBody">
											<div style="padding-right: 20px;">
												<a href="/blog/start.jspx?username=suhuanzheng7784877"
													class="pull-left">小大人</a>：
												<span class="time pull-right">(<a
													href="/weibo.jspx?id=202&amp;object=View">0评</a>)</span><span
													class="time timeago pull-right" title="2013-01-22 19:42"></span>
											</div>
											<div class="weiboContent">
												增加点人气
											</div>
										</div>
									</div>
								</li>
							</ul>
							<a href="/weibo.jspx?object=List" class="pull-right more">更多&gt;&gt;</a>
						</div>
						<div class="list_box row mar_10">
							<h2 class="hd">
								<span><a href="/res/start" title="更多">更多&gt;&gt;</a> </span><font>开源</font>软件
							</h2>
							<ul class="list leftbox">
								<li>
									<a href="/res/resource/170" target="_blank"
										title="JavaScript&nbsp;面向对象框架&nbsp;dejavu">JavaScript&nbsp;面向对象框架&nbsp;dejavu</a>
								</li>
								<li>
									<a href="/res/resource/169" target="_blank"
										title="jQuery&nbsp;图像放大镜插件&nbsp;Mlens">jQuery&nbsp;图像放大镜插件&nbsp;Mlens</a>
								</li>
								<li>
									<a href="/res/resource/168" target="_blank"
										title="jQuery&nbsp;表格响应式插件&nbsp;FooTable">jQuery&nbsp;表格响应式插件&nbsp;FooTable</a>
								</li>
								<li>
									<a href="/res/resource/167" target="_blank"
										title="服务器端JavaScript 框架 Ejscript">服务器端JavaScript 框架 Ejscript</a>
								</li>
								<li>
									<a href="/res/resource/166" target="_blank"
										title="中文开源邮件系统&nbsp;ExtMail">中文开源邮件系统&nbsp;ExtMail</a>
								</li>
								<li>
									<a href="/res/resource/165" target="_blank"
										title="V8&nbsp;的&nbsp;Java&nbsp;封装&nbsp;jav8">V8&nbsp;的&nbsp;Java&nbsp;封装&nbsp;jav8</a>
								</li>
								<li>
									<a href="/res/resource/164" target="_blank"
										title="Java的JSON处理器&nbsp;fastjson">Java的JSON处理器&nbsp;fastjson</a>
								</li>
								<li>
									<a href="/res/resource/163" target="_blank"
										title="嵌入式JavaScript框架&nbsp;jQTouch">嵌入式JavaScript框架&nbsp;jQTouch</a>
								</li>
								<li>
									<a href="/res/resource/162" target="_blank"
										title="jQuery语法着色插件 Chili">jQuery语法着色插件 Chili</a>
								</li>
								<li>
									<a href="/res/resource/161" target="_blank"
										title="网易前端JS框架 NEJ">网易前端JS框架 NEJ</a>
								</li>
							</ul>
						</div>
						<div class="list_box row mar_10 ">
							<h2 class="hd">
								<span><a href="/article/start" title="更多">更多&gt;&gt;</a>
								</span><font>精华</font>文章
							</h2>
							<ul class="list leftbox">
								<li>
									<a href="/blog/article/712">仿微博字符统计和本地存储功能的实现</a>
								</li>
								<li>
									<a href="/blog/article/705">参数化查询为什么能够防止SQL注入</a>
								</li>
								<li>
									<a href="/blog/article/694">MySQL数据库集群配置</a>
								</li>
								<li>
									<a href="/blog/article/693">MySql无限分类数据结构--预排序遍历树算法</a>
								</li>
								<li>
									<a href="/blog/article/692">使用&nbsp;Hibernate&nbsp;Shards&nbsp;对数据进行切分</a>
								</li>
								<li>
									<a href="/blog/article/691">使用&nbsp;Hibernate&nbsp;Shards&nbsp;进行切分</a>
								</li>
								<li>
									<a href="/blog/article/687">jQuery的deferred对象详解</a>
								</li>
								<li>
									<a href="/blog/article/679">JavaScript对象valueOf与toString方法</a>
								</li>
								<li>
									<a href="/blog/article/676">深入理解&nbsp;Java中的&nbsp;流&nbsp;(Stream)</a>
								</li>
								<li>
									<a href="/blog/article/664">ANT build.xml文件详解</a>
								</li>
							</ul>
						</div>
						<div class="banner_box row mar_10 ">
							<!-- 请置于所有广告位代码之前 -->
							<script type="text/javascript"
								src="http://cbjs.baidu.com/js/m.js">
</script>
							<!-- 广告位：1000广告位 -->
							<script type="text/javascript">
BAIDU_CLB_fillSlot("550636");</script>
						</div>
					</div>
				</div>
			</div>
			<footer>
			© |
			<a href="">关于我们</a> |
			<a href="mailto:webdev26@126.com">广告联系</a> | 京ICP备号-1
			</footer>
		</div>
		<script type="text/javascript">
</script>
	</body>
</html>
