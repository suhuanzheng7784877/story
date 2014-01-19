<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib uri="http://ckeditor.com" prefix="ckeditor"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>template</title>


		<%@ include file="../commendInclud.jsp"%>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/ckeditor/ckeditor.js">
</script>

		<!-- 特殊业务js 该页面对应的js文件 -->
		<script type="text/javascript" src="storymp3Manager.js">
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
				<button type="button" id="openadd1" onclick="openadd();">
					新增
				</button>
				<button type="button" onclick=openQuery();;>
					查询
				</button>
			</div>
			<!-- 用户操作标题以及放一些快捷按钮 结束-->

			<!-- jqgrid 展示部分 开始 -->
			<table id="editgrid" class="scroll" cellpadding="0" cellspacing="0"></table>
			<div id="pagered" class="scroll" style="text-align: left;"></div>
			<!-- jqgrid 展示部分 结束 -->
		</div>

		<!-- 添加修改面板  开始 -->
		<div class="neirong" id="pan" style="display: none">
			<br />
			<div class="top">
				<div class="top_01">
					<div class="top_01left">
						<div class="top_02">
							<img
								src="${pageContext.request.contextPath}/style/img/neibut01.gif" />
						</div>
						<div class="top_03">
							功能名称
						</div>
						<div class="top_04">
							<img
								src="${pageContext.request.contextPath}/style/img/neibut03.gif" />
						</div>
					</div>
					<div class="top_01right">
						<a href="javascript:void(0);" onclick="closeo();"><span
							style="margin-left: 5px;">关闭</span> </a>
					</div>
				</div>
				<div class="top02right">
					<img
						src="${pageContext.request.contextPath}/style/img/toptiaoright.gif" />
				</div>
			</div>
			<div class="midd">
				<form id='operformT1' name="operformT1" onsubmit="return false;"
					action="#" method="post" enctype="multipart/form-data">
					<input type="hidden" name="pkid" id="pkid"></input>
					<table width="100%" id="tdiv" border="0" cellspacing="0"
						cellpadding="0" style="line-height: 33px; font-size: 12px;">
						<tr>
							<td width="20%" align="left" class="labelclass">
								<label id="nameg">
									mp3标题名称：
								</label>
							</td>
							<td width="25%" align="left"
								style="border-bottom: 1px solid #A9C8D9;">
								<input type="text" name="title" id="title" maxlength="30"
									onpropertychange="TextUtil.NotMax(this)"
									class="textclass required"></input>
								<label class="addred"></label>
							</td>
							<td width="20%" align="left" class="labelclass">
								<label id="passwordg">
									需要积分数：
								</label>
							</td>
							<td width="25%" align="left"
								style="border-bottom: 1px solid #A9C8D9;">
								<select id="needscore" name="needscore">
									<option value="0">
										0
									</option>
									<option value="1">
										1
									</option>
									<option value="2">
										2
									</option>
									<option value="3">
										3
									</option>
									<option value="4">
										4
									</option>
									<option value="5">
										5
									</option>
									<option value="6">
										6
									</option>
									<option value="7">
										7
									</option>
									<option value="8">
										8
									</option>
									<option value="9">
										9
									</option>
									<option value="10">
										10
									</option>
									<option value="11">
										11
									</option>
									<option value="12">
										12
									</option>
									<option value="13">
										13
									</option>
									<option value="14">
										14
									</option>
									<option value="15">
										15
									</option>
									<option value="16">
										16
									</option>
									<option value="17">
										17
									</option>
									<option value="18">
										18
									</option>
									<option value="19">
										19
									</option>
									<option value="20">
										20
									</option>
								</select>
								<label class="addred"></label>
							</td>
						</tr>
						<tr>
							<td width="20%" align="left" class="labelclass">
								<label id="emailg">
									mp3文件上传：
								</label>
							</td>
							<td width="25%" align="left"
								style="border-bottom: 1px solid #A9C8D9;" colspan="3">
								<input name="fileMp3" type="file" />
							</td>
						</tr>
						<tr>
							<td width="20%" align="left" class="labelclass">
								<label id="emailg">
									mp3图片上传：
								</label>
							</td>
							<td width="25%" align="left"
								style="border-bottom: 1px solid #A9C8D9;" colspan="3">
								<input name="filePic" type="file" />
							</td>
						</tr>
						<tr>
							<td width="20%" align="left" class="labelclass" colspan="1">
								<label id="emailg">
									mp3详细信息：
								</label>
							</td>
							<td class="labelclass" colspan="3"></td>
						</tr>
						<tr>
							<td width="100%" align="left"
								style="border-bottom: 1px solid #A9C8D9;" colspan="4">
								<input type="textarea" name="message" id="message" onpropertychange="TextUtil.NotMax(this)"
									class="textclass required"></input>
								<label class="addred"></label>
							</td>
						</tr>
						<tr id="serchId" style="display: block" align="center">
							<td colspan="4" align="center">
								<div align="center">
									<label style="white-space: nowrap;">
										查询类型：
									</label>
									<input type="radio" id="serchType2" name="serchType"
										checked="checked" value="eq" class="pub_radio" />
									精确
									<input type="radio" id="serchType3" name="serchType"
										value="LIKE" class="pub_radio" />
									模糊
								</div>
							</td>
						</tr>
					</table>
				</form>


				<form id='operformT2' name="operformT2" onsubmit="return false;"
					action="#" method="post">
					<input type="hidden" name="pkid" id="pkid"></input>
					<table width="100%" id="tdiv" border="0" cellspacing="0"
						cellpadding="0" style="line-height: 33px; font-size: 12px;">
						<tr>
							<td width="20%" align="left" class="labelclass">
								<label id="nameg">
									mp3标题名称：
								</label>
							</td>
							<td width="25%" align="left"
								style="border-bottom: 1px solid #A9C8D9;">
								<input type="text" name="titleInfo" id="titleInfo"
									maxlength="30" onpropertychange="TextUtil.NotMax(this)"
									class="textclass required"></input>
								<label class="addred"></label>
							</td>
							<td width="20%" align="left" class="labelclass">
								<label id="passwordg">
									需要积分数：
								</label>
							</td>
							<td width="25%" align="left"
								style="border-bottom: 1px solid #A9C8D9;">
								<input type="needscore" name="needscoreInfo" id="needscoreInfo"
									maxlength="20" onpropertychange="TextUtil.NotMax(this)"
									class="textclass required"></input>
								<label class="addred"></label>
							</td>
						</tr>
						<tr>
							<td width="20%" align="left" class="labelclass">
								<label id="nameg">
									上线日期：
								</label>
							</td>
							<td width="25%" align="left"
								style="border-bottom: 1px solid #A9C8D9;">
								<input type="text" name="dateInfo" id="dateInfo" maxlength="30"
									onpropertychange="TextUtil.NotMax(this)"
									class="textclass required"></input>
								<label class="addred"></label>
							</td>
							<td width="20%" align="left" class="labelclass">
								<label id="passwordg">
									下载量：
								</label>
							</td>
							<td width="25%" align="left"
								style="border-bottom: 1px solid #A9C8D9;">
								<input type="needscore" name="downloadcountInfo"
									id="downloadcountInfo" maxlength="20"
									onpropertychange="TextUtil.NotMax(this)"
									class="textclass required"></input>
								<label class="addred"></label>
							</td>
						</tr>
						<tr>
							<td width="20%" align="left" class="labelclass">
								<label id="emailg">
									mp3详细描述信息：
								</label>
							</td>
							<td width="25%" align="left"
								style="border-bottom: 1px solid #A9C8D9;" colspan="3">
								<div id="messageInfo"></div>
							</td>
						</tr>
					</table>
				</form>
				<div class="midd_butt">
					<!-- 查询     -->
					<button class="tsdbutton" id="jdquery"
						onclick="serchObjectSubmit();">
						查询
					</button>
					<!-- 保存新增 -->
					<button class="tsdbutton" id="readd"
						style="width: 80px; heigth: 27px;" onclick="addSubmit();">
						新增
					</button>
					<!-- 修改     -->
					<button class="tsdbutton" id="modify"
						style="width: 63px; heigth: 27px;" onclick="updateObjectSubmit();">
						修改
					</button>
					<!-- 清空     -->
					<button class="tsdbutton" id="clearB"
						style="width: 63px; heigth: 27px;" onclick=clearText('operformT1');>
						清空
					</button>
					<!-- 取消     -->
					<button class="tsdbutton" id="reset"
						style="width: 63px; heigth: 27px;" onclick="resett();">
						取消
					</button>
					<!-- 关闭 	 -->
					<button class="tsdbutton" id="closeo"
						style="width: 63px; heigth: 27px;" onclick="closeo();">
						关闭
					</button>
				</div>
			</div>
		</div>

		<!-- 添加修改面板  结束 -->
		<input type="hidden" id="basePath"
			value="${pageContext.request.contextPath}" />
		<input type="hidden" id="Tip" />
		<script type="text/javascript">
<!--使用ckeditor编辑图片上传-->
			CKEDITOR.replace('message',{
				toolbar :
				[ { name: 'message1', items : ['Source','NewPage','Preview' ] },  
				  { name: 'basicstyles', items : ['Bold','Italic','Strike','-','RemoveFormat' ] },
				  { name: 'justifytyles', items : ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock']},
				  { name: 'clipboard', items : ['Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] }, 
				  { name:'editing', items : [ 'Find','Replace','-','SelectAll','-','Scayt' ] },
				  { name:'styles', items : [ 'Styles','Format' ] },
				  { name: 'paragraph', items : ['NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote' ] }, 
				  { name:'insert', items :['Image','Table','HorizontalRule','Smiley','SpecialChar','PageBreak' ,'Iframe'] },
				  { name: 'links', items : [ 'Link','Unlink','Anchor' ] }, { name: 'tools', items :[ 'Maximize' ] }
				  ],
        		uiColor : '#9AB8F3',
        		height:'100px',
				filebrowserImageUploadUrl : '${pageContext.request.contextPath}/fileupload/uploadpic.action?type=storymp3'
			});
		</script>
	</body>
</html>