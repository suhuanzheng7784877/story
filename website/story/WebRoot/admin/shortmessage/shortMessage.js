/***********************************************************
		        file name:       userManage.js
				author:          youhongyu 
				create date:     2010-10-5          
				description:
				modify:			 
 ********************************************************/
/*
 添加，修改 表格样式调整涉及方法
 */
//关闭表格面板
function closeo() {
	clearText('operformT1');
	setTimeout($.unblockUI, 50);//关闭面板
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

//修改单挑记录时的信息重置方法
function resett() {
	var key = $("#pkid").val();
	loadDataByIdKey(key);
}

/*
 * 添加记录的提交
 */
function addSubmit() {
	var basePath = $("#basePath").val();
	var options = {
		url : basePath + "/shortMessage/sendAllUsersMessage.action", //提交给哪个执行
		type : 'POST',
		datatype : 'json',
		success : function(json) {
			//target : '#Tip', //后台将把传递过来的值赋给该元素
		//alert($('#Tip').val());
		closeo();
		jQuery("#editgrid").trigger("reloadGrid");//更新jqgrid
	}, //显示操作提示
	error : function(e) {
		alert('有错误！');
	},
	complete : function() {
		alert('发送完成！');
	}
	};
	$('#operformT1').ajaxSubmit(options);
	return false; //为了不刷新页面,返回false，反正都已经在后台执行完了，没事！

}