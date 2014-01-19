<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>琉璃仙境</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta name="baidu_union_verify" content="69baabb7d6c3ea7d73db3b21d95e451a">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords"
			content="恐怖故事,恐怖mp3,原创小说,午夜拍案惊奇,午夜故事,mp3,月玲珑,配音,音乐,AV,玄幻,奇幻,异文,政治,社会,新闻,微博,下载,故事,小说,异闻录">
		<meta http-equiv="恐怖故事,恐怖mp3,原创小说,午夜拍案惊奇,午夜故事,mp3,月玲珑,配音,音乐,AV,玄幻,奇幻,异文,政治,社会,新闻,微博,下载,故事,小说,异闻录">
		<link rel="stylesheet" href="style/css/base.css" type="text/css" />
		<link rel="stylesheet" href="style/css/index_nd_02.css" type="text/css" />
	</head>
	<body>
	<div class="w980 mauto index">
	
	<!--header start -->	
	<div class="header mt5">
		<div>
			<div class="header_left">
			</div>
			<div class="header_middle">
				<div class="w300"><a href="http://www.nd157.com"><img src="style/images/index/logo.png" /></a></div>
				<div class="w664">
					<div class="w663 ">
						<div class="pl580 fz16">
							<a href="/login">登录</a>
							<span class="pipe">|</span>
							<a href="/runtime/register">注册</a>
						</div>
					</div>
					 <div class="w663">
					 <div class="pl223">
						<form action="search/search.action" id="scbar_form" method="post" autocomplete="off" target="_blank">
							<div class="search-input">
								<div class="menu_type mt5">
									<select name="searchtype" id="search_type" style="width:70px;height:26px;">
		 
										<option value="article">异文录</option>
		 
										<option value="invitation">论坛</option>
                                        
                                        <option value="news">资讯</option>			 
									</select>
								</div>
								<div class="inputc mt5"><input class="text xg1" name="queryKeyWord" id="search_q"  type="text"></div> 
								<button type="submit" name="SearchSubmit" id="SearchSubmit" value="true"></button> 
							</div> 
						</form>
					 </div>
					 </div>
				</div>		
			</div>
			<div class="header_right">
			</div>	
		</div>		
		<div class="navBar">
			 <ul class="menubar">
					<li onmouseout="channel_onmouseout(this)" onmouseover="channel_onmouseover(this)" class=" "><a onclick="channel_onclick(this)" id="channel_home">灵异录</a></li>
					<li onmouseout="channel_onmouseout(this)" onmouseover="channel_onmouseover(this)" class=" "><a onclick="channel_onclick(this)" id="channel_article">MP3下载</a></li>
					<li onmouseout="channel_onmouseout(this)" onmouseover="channel_onmouseover(this)" class=" "><a onclick="channel_onclick(this)" id="channel_blog">论坛</a></li>
				</ul>
		 </div>
	</div>
	<!--header end-->
	<!-- content start-->
	<div class="center">
		﻿<div class="center_middle">
			<div class="center_middle_row">
				<div class="center_middle_left"><img src="style/images/index/banner01.png" width="380px" height="300px"/></div>
				<div class="center_middle_right tap">
					<div class="tap_banner">
						<div class="tap_banner_left"></div>
						<div class="tap_banner_middle">
							<div class="w314 tap_banner_title ml10"><a class="white" href="#" titlt="最新MP3故事">最新MP3故事</a><!-- <a>最新计划</a> --></div>
							<div class=""><a href="#"><img src="style/images/more.png" class="mt8"/></a></div>
							
						</div>
						<div class="tap_banner_right"></div>
					</div>
					<div class="tap_content">
						<div class="tap_content_left"></div>
						<div class="tap_content_middle">
							<ul class="center_ul">
							<!--遍历mp3-->
							<#list storyMp3List as storyMp3>
								<li>
									<div class="w229">
										<!--id是数值型，加上?c对于大于4位的数值不会出现分隔符,-->
										<a href="storymp3/showmp3.action?mp3id=${storyMp3.id?c}" titlt="${storyMp3.title}" class="black">${storyMp3.title}</a>
									</div>
									<div class="w100">[${storyMp3.date?string("yyyy-MM-dd")}]</div>
								</li>
							</#list>
							</ul>
						</div>
						<div class="tap_content_right"></div>
					</div>
				</div>
			</div>		
			
			<div class="center_middle_row">
				<div class="center_middle_left tap">
					<div class="tap_banner">
						<div class="tap_banner_left"></div>
						<div class="tap_banner_middle">
							<div class="w314 tap_banner_title ml10"><a class="white" href="#" titlt="最新异文">最新异文</a><!-- <a>最新计划</a> --></div>
							<div class=""><a href="#"><img src="style/images/more.png" class="mt8"/></a></div>
							
						</div>
						<div class="tap_banner_right"></div>
					</div>
					<div class="tap_content">
						<div class="tap_content_left"></div>
						<div class="tap_content_middle">
							<ul class="center_ul">
								<!--遍历文章-->
								<#list articleList as article>
								<li>
									<div class="w229">
										<a href="article/showOneArticles.action?articleId=${article.id?c}" titlt="${article.title}" class="black">${article.title}</a>
									</div>
									<div class="w100">[${article.date?string("MM-dd HH:mm")}]</div>
								</li>
								</#list>
							</ul>
						</div>
						<div class="tap_content_right"></div>
					</div>
				</div>
				<div class="center_middle_right tap">
					<div class="tap_banner">
						<div class="tap_banner_left"></div>
						<div class="tap_banner_middle">
							<div class="w314 tap_banner_title ml10"><a class="white" href="#" titlt="最新资讯">最新资讯</a><!-- <a>最新计划</a> --></div>
							<div class=""><a href="#"><img src="style/images/more.png" class="mt8"/></a></div>
							
						</div>
						<div class="tap_banner_right"></div>
					</div>
					<div class="tap_content">
						<div class="tap_content_left"></div>
						<div class="tap_content_middle">
							<ul class="center_ul">
								<!--遍历贴子-->
								<#list newsList as news>
								<li>
									<div class="w229">
										<a href="news/showOneNews.action?id=${news.id?c}" titlt="${news.title}" class="black">${news.title}</a>
									</div>
									<div class="w100">[${news.date?string("MM-dd HH:mm")}]</div>
								</li>
								</#list>			
							</ul>
						</div>
						<div class="tap_content_right"></div>
					</div>
				</div>
			</div>
			
			<div class="center_middle_row">
				<div class="tap_one_banner">
						<div class="tap_one_banner_left"></div>
						<div class="tap_one_banner_middle">
							<div class="w694 tap_one_banner_title ml10"><a class="white" href="#" titlt="最新贴子">最新贴子</a><!-- <a>最新计划</a> --></div>
							<div class=""><a href="#"><img src="style/images/more.png" class="mt8"/></a></div>
							
						</div>
						<div class="tap_one_banner_right"></div>
				</div>
				<div class="invitation">				
				
					<div class="center_one_middle_left tap">					
						<div class="tap_one_content">
							<div class="tap_one_content_left"></div>
							<div class="tap_one_content_middle">
								<ul class="center_ul">
									<li>
										<div class="w229">
											<a href="/article/148032" class="black">HttpClient的相关例子</a>
										</div>
										<div class="w100">[2013-04-04]</div>
									</li>
															<li>
										<div class="w229">
											<a href="/article/148007" class="black">最成功的创业家：追求影响力 不差钱</a>
										</div>
										<div class="w100">[2013-04-03]</div>
									</li>
															<li>
										<div class="w229">
											<a href="/article/138126" class="black">开始</a>
										</div>
										<div class="w100">[2013-04-02]</div>
									</li>
															<li>
										<div class="w229">
											<a href="/article/138044" class="black">必须趁早确立目标，越早越好</a>
										</div>
										<div class="w100">[2013-04-02]</div>
									</li>
									<li>
										<div class="w229">
											<a href="/article/138037" class="black">挑战逆境，赢得辉煌的人生</a>
										</div>
										<div class="w100">[2013-04-02]</div>
									</li>
									<li>
										<div class="w229">
											<a href="/article/138037" class="black">挑战逆境，赢得辉煌的人生</a>
										</div>
										<div class="w100">[2013-04-02]</div>
									</li>
									<li>
										<div class="w229">
											<a href="/article/138037" class="black">挑战逆境，赢得辉煌的人生</a>
										</div>
										<div class="w100">[2013-04-02]</div>
									</li>
									<li>
										<div class="w229">
											<a href="/article/138037" class="black">挑战逆境，赢得辉煌的人生</a>
										</div>
										<div class="w100">[2013-04-02]</div>
									</li>
									<li>
										<div class="w229">
											<a href="/article/138037" class="black">挑战逆境，赢得辉煌的人生</a>
										</div>
										<div class="w100">[2013-04-02]</div>
									</li>
									<li>
										<div class="w229">
											<a href="/article/138037" class="black">挑战逆境，赢得辉煌的人生</a>
										</div>
										<div class="w100">[2013-04-02]</div>
									</li>	
									<li>
										<div class="w229">
											<a href="/article/138037" class="black">挑战逆境，赢得辉煌的人生</a>
										</div>
										<div class="w100">[2013-04-02]</div>
									</li>									
								</ul>
							</div>
							<div class="tap_content_right"></div>
						</div>
					</div>
					<div class="center_one_middle_right tap">					
						<div class="tap_one_content">
							<div class="tap_one_content_left"></div>
							<div class="tap_one_content_middle">
								<ul class="center_ul">
									<li>
										<div class="w229">
											<a href="/article/148032" class="black">HttpClient的相关例子</a>
										</div>
										<div class="w100">[2013-04-04]</div>
									</li>
															<li>
										<div class="w229">
											<a href="/article/148007" class="black">最成功的创业家：追求影响力 不差钱</a>
										</div>
										<div class="w100">[2013-04-03]</div>
									</li>
															<li>
										<div class="w229">
											<a href="/article/138126" class="black">开始</a>
										</div>
										<div class="w100">[2013-04-02]</div>
									</li>
															<li>
										<div class="w229">
											<a href="/article/138044" class="black">必须趁早确立目标，越早越好</a>
										</div>
										<div class="w100">[2013-04-02]</div>
									</li>
									<li>
										<div class="w229">
											<a href="/article/138037" class="black">挑战逆境，赢得辉煌的人生</a>
										</div>
										<div class="w100">[2013-04-02]</div>
									</li>
									<li>
										<div class="w229">
											<a href="/article/138037" class="black">挑战逆境，赢得辉煌的人生</a>
										</div>
										<div class="w100">[2013-04-02]</div>
									</li>
									<li>
										<div class="w229">
											<a href="/article/138037" class="black">挑战逆境，赢得辉煌的人生</a>
										</div>
										<div class="w100">[2013-04-02]</div>
									</li>
									<li>
										<div class="w229">
											<a href="/article/138037" class="black">挑战逆境，赢得辉煌的人生</a>
										</div>
										<div class="w100">[2013-04-02]</div>
									</li>
									<li>
										<div class="w229">
											<a href="/article/138037" class="black">挑战逆境，赢得辉煌的人生</a>
										</div>
										<div class="w100">[2013-04-02]</div>
									</li>
									<li>
										<div class="w229">
											<a href="/article/138037" class="black">挑战逆境，赢得辉煌的人生</a>
										</div>
										<div class="w100">[2013-04-02]</div>
									</li>	
									<li>
										<div class="w229">
											<a href="/article/138037" class="black">挑战逆境，赢得辉煌的人生</a>
										</div>
										<div class="w100">[2013-04-02]</div>
									</li>									
								</ul>
							</div>
							<div class="tap_content_right"></div>
						</div>
					</div>
				</div><!-- end 论坛内容-->
			</div>			
		</div>
		
		
		<div class="center_right">
			<div><img src="style/images/index/talk_panel.png" width="199px" height="309px"/></div>	
			<div class="qa">
				<div class="qa_banner">
					<div class="tap_banner_left"></div>
					<div class="qa_banner_middle">
						<div class="w135 tap_banner_title ml8"><a class="white" href="#">最新计划</a></div>
						<div class=""><a href="#"><img src="style/images/more.png" class="mt8"/></a></div>
					</div>
					<div class="tap_banner_right"></div>
				</div>
				<div class="qa_content">
					<div class="qa_content_left"></div>
					<div class="qa_content_middle">
						<ul>
													<li>
								<div class="fz12 nowrap"><a class="blue" href="/plan/144004" title="坚持提升网站质量">坚持提升网站质量</a></div>
								<div class="pl20 mt3 nowrap color_chashu"><a title="我相信有付出才有收获">我相信有付出才有收获</a></div>
							</li>
													<li>
								<div class="fz12 nowrap"><a class="blue" href="/plan/138095" title="朝花夕拾    ">朝花夕拾    </a></div>
								<div class="pl20 mt3 nowrap color_chashu"><a title="   业精于勤荒于嬉   ">   业精于勤荒于嬉   </a></div>
							</li>
													<li>
								<div class="fz12 nowrap"><a class="blue" href="/plan/92001" title=" 目标大声说出来  "> 目标大声说出来  </a></div>
								<div class="pl20 mt3 nowrap color_chashu"><a title=" 新的一天，把我们叫醒的，除了闹钟还有梦想！"> 新的一天，把我们叫醒的，除了闹钟还有梦想！</a></div>
							</li>
												</ul>
					</div>
					<div class="qa_content_right"></div>
				</div>
			</div>
			
			<div class="mt12"><img src="style/images/index/date.png" width="199px" height="136px"/></div>	
			<div class="button3">	
				<div class="button3_left">
				</div>
				<div class="button3_middle">
				</div>
				<div class="button3_right">
				</div>
			</div>
		</div>
	</div>
	<!-- content end-->
	<!-- footer start-->
	<div class="footer">
			<div class="info">
		<p> 
			<a target="_blank" class="sohupp-linkcolor" href="#">加盟团队</a> - 
            <a target="_blank" class="sohupp-linkcolor" href="#">广告联系</a> - 
            <a target="_blank" class="sohupp-linkcolor" href="#">客服中心</a> - 
            <a target="_blank" class="sohupp-linkcolor" href="#">
			<img src="ico_onlineservice.gif" /></a>
			<a href="#" target="_blank" class="sohupp-linkcolor">意见建议</a> -
            <a target="_blank" class="sohupp-linkcolor" href="#">联系方式</a> - 
            <a target="_blank" class="sohupp-linkcolor" href="#">保护隐私权</a> - 
            <a target="_blank" class="sohupp-linkcolor" href="#">团队介绍</a> - 
			<a href="http://www.jcoom.com" target="_blank" class="sohupp-linkcolor">灵异录首页</a>
		</p>
		<p>
			Copyright <span class="fontArial">&copy;2013 jcoom.com Inc.
			All Rights Reserved. 灵异录网站 版权所有</span> 
		</p>
	</div>	</div>
	<!-- footer end-->
</div>
</body>  
</html>