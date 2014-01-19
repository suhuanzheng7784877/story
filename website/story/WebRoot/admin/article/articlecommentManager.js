/***********************************************************
		        file name:       userManage.js
				author:          youhongyu 
				create date:     2010-10-5          
				description:
				modify:			 
 ********************************************************/

/**********************************************************
 页面初始化加载的信息
 **********************************************************/
jQuery(document).ready(function() {
	openGridJson();//初始化jqgrid数据
		//当前页面所在位置		
		//$("#navBar1").append(genNavv());			

		/*****************************
		 * 在角色设置面板上显示所有角色 *
		 ****************************/
		//listAll();
	});

/**********************************************************
 function name:  openGridJson()
 function:		初始化jqgrid数据
 parameters:       
 return:			
 description:  	用json的方式打开list页面
 create date:     2010-10-5   
 ********************************************************/
function openGridJson() {

	//列表
	jQuery("#editgrid").jqGrid(
			{
				url : "../../article/showALLArticleComments.action",
				datatype : "json",
				colNames : [ '操作', '主键', '异文录标题', '评论人','评论日期', '评论内容' ],
				colModel : [ {
					name : 'viewOperation',
					index : 'viewOperation',
					sortable : false,
					width : 120
				}, {
					name : "commentId",
					index : "commentId",
					label : "commentId",
					width : 60
				}, {
					name : "title",
					index : "title",
					label : "title",
					width : 150
				}, {
					name : "commentUserName",
					index : "commentUserName",
					label : "commentUserName",
					width : 120
				}, {
					name : "commentDate",
					index : "commentDate",
					label : "commentDate",
					width : 160
				}, {
					name : "commentMessage",
					index : "commentMessage",
					label : "commentMessage",
					width : 400
				} ],
				jsonReader : {
					root : "result",
					page : "page",//当前页
					total : "total",//总页数
					rows : "rows",//每页显示记录数
					records : "records",//总记录数
					repeatitems : false,
					id : "0"
				},
				rowNum : 15, //默认分页行数
				rowList : [ 10, 15, 20 ], //可选分页行数
				imgpath : '../../plug-in/jquery/jqgrid/themes/basic/images',
				pager : jQuery('#pagered'),
				sortname : 'id', //默认排序字段
				viewrecords : true,
				//hidegrid: false, 
				sortorder : 'asc',//默认排序方式 
				caption : '操作面板',
				height : 320, //高
				//width : document.documentElement.clientWidth - 27,
				loadComplete : function() {
					$("#editgrid").setSelection('0', true);
					$("#editgrid").focus();
					addRowOperBtn('editgrid', "删除", 'deleteOneObject', 'commentId',
							'click', 1);

					/////执行行按钮添加
					//////表格ID
					///////依赖于addRowOperBtn(gridId,linkName,url,idName,outType)函数
					executeAddBtn('editgrid', 1);
				}

			}).navGrid('#pagered', {
		edit : false,
		add : false,
		add : false,
		del : false,
		search : false
	}, //options 
			{
				height : 280,
				reloadAfterSubmit : true,
				closeAfterEdit : true
			}, // edit options 
			{
				height : 280,
				reloadAfterSubmit : true,
				closeAfterAdd : true
			}, // add options 
			{
				reloadAfterSubmit : false
			}, // del options 
			{} // search options 
			);

}

/**************************************
 ****  		打开简单查询面板  		  *****
 ***************************************/
function openQuery() {

	$('#serchId').show();
	markTable(1); //隐藏红色*号	 	
	removeDisabledN('Zhji_Code', '', '');//设置所有字段为可输入状态
	$(".top_03").html('查询');//标题		
	openpan();
	$('#jdquery').show();
	clearText('operformT1');

}

/*
 添加，修改 表格样式调整涉及方法
 */
//关闭表格面板
function closeo() {
	clearText('operformT1');
	setTimeout($.unblockUI, 50);//关闭面板
}

//打开表格面板
function openpan() {
	autoBlockFormAndSetWH('pan', 5, 10, 'closeo', "#ffffff", true, 1000, '');//弹出查询面板
	$("#operformT1 :input").removeAttr("disabled");
	$("#operformT1 :input").removeClass("textclass2").addClass("textclass");//将面板中的输入框设置为可用
	$("#operformT1").show();
	$("#operformT2").hide();
	$("#jdquery").hide();
	$("#modifyB").hide();
	$("#readd").hide();
	$("#save").hide();
	$("#modify").hide();
	$("#reset").hide();
	$("#clearB").hide();
}

//修改单挑记录时的信息重置方法
function resett() {
	var key = $("#pkid").val();
	loadDataByIdKey(key);
}

/**
 * 删除单条记录
 */
function deleteOneObject(key) {
	if (confirm("您确定要删除该记录吗？")) {
		$.ajax( {
			url : '../../article/deleteComment.action?id=' + key,
			datatype : 'json',
			cache : false,//如果值变化可能性比较大 一定要将缓存设成false
			timeout : 1000,
			async : false,//同步方式
			success : function(json) {
				jQuery("#editgrid").trigger("reloadGrid");
			}
		});
	}

}

/*
 * 按条件查询记录
 */
function serchObjectSubmit() {
	var basePath = $("#basePath").val();
	var commentMessage = $("#commentMessage").val();
	var serchType = $(":radio[name=serchType]:checked").val();
	var con = "serchType=" + tsd.encodeURIComponent(serchType) + "&commentMessage="
			+ tsd.encodeURIComponent(commentMessage);
	var requestUrl = basePath + "/article/searchArticleComments.action?" + con;
	//更改url重新加载
	$("#editgrid").setGridParam( {
		url : requestUrl
	}).trigger("reloadGrid");

	//关闭窗口
	closeo();

}