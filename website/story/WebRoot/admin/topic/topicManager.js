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
				url : "../../topic/showTopics.action",
				datatype : "json",
				colNames : [ '操作', '主键', '热点标题', '热点描述' ],
				colModel : [ {
					name : 'viewOperation',
					index : 'viewOperation',
					sortable : false,
					width : 200
				}, {
					name : "id",
					index : "id",
					label : "ID",
					width : 180
				}, {
					name : "topicTitle",
					index : "topicTitle",
					label : "Last Name",
					width : 200,
					sortable : true
				}, {
					name : "topicIntro",
					index : "topicIntro",
					label : "topicIntro",
					width : 350,
					sortable : true
				}],
				jsonReader : {
					root : "result",
					page : "page",//当前页
					total : "total",//总页数
					rows : "rows",//每页显示记录数
					records : "records",//总记录数
					repeatitems : false,
					id : "0"
				},
				rowNum : 10, //默认分页行数
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

					addRowOperBtn('editgrid', "修改", 'openRowModify', 'id',
							'click', 1);
					addRowOperBtn('editgrid', "删除", 'deleteOneObject', 'id',
							'click', 2);
					addRowOperBtn('editgrid', "详细", 'openObjectInfo', 'id',
							'click', 3);

					/////执行行按钮添加
					//////表格ID
					///////依赖于addRowOperBtn(gridId,linkName,url,idName,outType)函数
					executeAddBtn('editgrid', 3);
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
	autoBlockFormAndSetWH('pan', 60, 5, 'closeo', "#ffffff", true, 1000, '');//弹出查询面板
	$("#operformT1 :input").removeAttr("disabled");
	$("#operformT1 :input").removeClass("textclass2").addClass("textclass");//将面板中的输入框设置为可用
	$("#operformT1").show();
	$("#jdquery").hide();
	$("#modifyB").hide();
	$("#readd").hide();
	$("#save").hide();
	$("#modify").hide();
	$("#reset").hide();
	$("#clearB").hide();
}

/***************************************
 ***************打开保存面板*************
 ************************************/
function openadd() {

	$('#serchId').hide();
	markTable(0);//显示红色*号
	$(".top_03").html('添加');//标题		 	
	removeDisabledN('Zhji_Code', '', '');
	openpan();
	$("#save").show();
	$("#readd").show();
	clearText('operformT1');
}
/****************************************
 ****  打开修改面板并加载将要修改的数据    ****
 ****************************************/
function openRowModify(id) {
	$('#serchId').hide();

	loadDataByIdKey(id);
	openpan();
	$("#modify").show();
	$("#reset").show();

}

/*
 * 打开一个对象的详细信息
 */
function openObjectInfo(id) {

	$('#serchId').hide();
	loadDataByIdKey(id);
	openpan();
	$("#operformT1 :input").removeClass("textclass").addClass("textclass2");
	$("#operformT1 :input").attr("disabled", "disabled");
}

//修改单挑记录时的信息重置方法
function resett() {
	var key = $("#pkid").val();
	loadDataByIdKey(key);
}

function loadDataByIdKey(id) {
	$.ajax( {
		url : '../../topic/showOneTopic.action?id=' + id,
		datatype : 'json',
		cache : false,//如果值变化可能性比较大 一定要将缓存设成false
		timeout : 1000,
		async : false,//同步方式
		success : function(json) {

			//将json字符串转换成json对象
		var jsonstrObj = eval('(' + json + ')');

		//
		var topicTitle = jsonstrObj.result.topicTitle;
		var id = jsonstrObj.result.id;
		var topicIntro = jsonstrObj.result.topicIntro;

		//对form表单中的div赋值
		$("#topicTitle").val(topicTitle);
		$("#topicIntro").val(topicIntro);
		$("#pkid").val(id);
	}
	});
}

/*
 * 添加记录的提交
 */
function addSubmit() {
	var basePath = $("#basePath").val();
	var options = {
		url : basePath + "/topic/savetopic.action", //提交给哪个执行
		type : 'POST',
		datatype : 'json',
		success : function(json) {			
			//target : '#Tip', //后台将把传递过来的值赋给该元素
			//alert($('#Tip').val());
			closeo();
			jQuery("#editgrid").trigger("reloadGrid");//更新jqgrid
		}, //显示操作提示
		error:function(e){
			alert('有错误！');			
		},
		complete: function(){		
		}
	};
	$('#operformT1').ajaxSubmit(options);
	return false; //为了不刷新页面,返回false，反正都已经在后台执行完了，没事！
	
}

/**
 * 更新记录的提交
 */
function updateObjectSubmit() {

	var basePath = $("#basePath").val();
	var id = $("#pkid").val();
	var options = {
		url : basePath + "/topic/updatetopic.action?id=" + id, //提交给哪个执行
		type : 'POST',
		datatype : 'json',
		success : function(json) {
			closeo();
			jQuery("#editgrid").trigger("reloadGrid");//更新jqgrid
		} //显示操作提示
	};
	$('#operformT1').ajaxSubmit(options);
	return false; //为了不刷新页面,返回false，反正都已经在后台执行完了，没事！

}

/**
 * 删除单条记录
 */
function deleteOneObject(key) {
	if (confirm("您确定要删除该记录吗？")) {
		$.ajax( {
			url : '../../topic/delete.action?id=' + key,
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