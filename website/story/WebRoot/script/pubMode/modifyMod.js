/*****************************************************************
 * name: modifyMod.js
 * author: 尤红玉
 * version: 1.0, 2010-9-26
 * description: 查询模板维护页面脚本
 * modify:
 *		2010-11-05 youhongyu 添加注释功能		
 *****************************************************************/



/**********************************************************
				function name:   generateTree(qid)
				function:		 点击jqgrid中的记录时，显示该记录上对应的查询树
				parameters:      qid：树id
				return:			 
				description:      
				Date:			  2010-9-25 
********************************************************/
function generateTree(qid){				
		var dmtree = new dTree('dmtree');
		var urlstr=tsd.buildParams({  packgname:'service',//java包
									  clsname:'ExecuteSql',//类名
									  method:'exeSqlData',//方法名
									  ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
									  tsdcf:'mssql',//指向配置文件名称
									  tsdoper:'query',//操作类型 
									  datatype:'xmlattr',//返回数据格式 
									  tsdpk:'search_tree.gettree'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
									});	
		$.ajax({
			url:'mainServlet.html?'+urlstr+'&qid='+qid,
			datatype:'xml',
			cache:false,//如果值变化可能性比较大 一定要将缓存设成false
			timeout: 1000,
			async: false ,//同步方式
			success:function(xml){
				/////////////////////////////
				//只有 url参数中 datatype="xmlattr"时才可以这样通过属性取值////
				$(xml).find('row').each(function(){
					//$(this).attr(参数) 参数对应的数据库中的列名 默认小写 
					///如果sql语句中指定列名 则按指定名称给参数
					//pid,cid,notestr,notepic,qid
					var pid = $(this).attr("pid");
					var cid = $(this).attr("cid");
					var notestr = $(this).attr("notestr");							
					var notepic = $(this).attr("notepic");
					dmtree.add(cid,pid,notestr,"","","",notepic,notepic,open);
				});
			}
		});
		$("#treediv").html(dmtree.toString());
		autoBlockFormAndSetWH('querytree',60,60,'Qclose',"#ffffff",false,400,300);
}



/**********************************************************
				function name:   queryByID(key)
				function:		 根据关键字取出一条信息，详细记录
				parameters:      
								 key：关键字值
				return:			 
				description:     根据关键字取出一条信息，详细记录
				Date:			 2010-9-25 
********************************************************/
function queryByID(key){				 
		var urlstr=tsd.buildParams({  packgname:'service',//java包
									  clsname:'ExecuteSql',//类名
									  method:'exeSqlData',//方法名
									  ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
									  tsdcf:'mssql',//指向配置文件名称
									  tsdoper:'query',//操作类型 
									  datatype:'xmlattr',//返回数据格式 
									  tsdpk:'modifyMod.queryByKey'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
									});	
		$.ajax({
			url:'mainServlet.html?'+urlstr+'&qid='+key,
			datatype:'xml',
			cache:false,//如果值变化可能性比较大 一定要将缓存设成false
			timeout: 1000,
			async: false ,//同步方式
			success:function(xml){
				/////////////////////////////
				//只有 url参数中 datatype="xmlattr"时才可以这样通过属性取值////
				$(xml).find('row').each(function(){
					//$(this).attr(参数) 参数对应的数据库中的列名 默认小写 
					///如果sql语句中指定列名 则按指定名称给参数
					var oldstr=[];
					//name,menid,userid,groupid,querysql
					var qid = $(this).attr("qid");
					oldstr.push(qid);	
					$("#qid").val(qid);
					
					var name = $(this).attr("name");	
					oldstr.push(name);						
					$("#name").val(name);							
					
					var groupid = $(this).attr("groupid");
					oldstr.push(groupid);	
					$("#groupid").val(groupid);
					
					$("#logoldstr").val(oldstr);							
				});
			}
		});
}

 /**
 * jqgrid面板中，删除按钮操作
 * @param key 查询该条记录的参数
 * @return 
 */
function deleteRow(key){
		 	
		//是否有执行删除的权限
		var deleteright = $("#deleteright").val();
		if(deleteright=="true"){			
			 	var deleteinformation = $("#deleteinformation").val();
				var operationtips = $("#operationtips").val();
			 	jConfirm(deleteinformation,operationtips,function(x){
			 		 if(x==true){
				 		 	var falg = true;
				 		 	var urlstr=tsd.buildParams({  packgname:'service',//java包
														  clsname:'ExecuteSql',//类名
														  method:'exeSqlData',//方法名
														  ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
														  tsdcf:'mssql',//指向配置文件名称
														  tsdoper:'exe',//操作类型 
														  datatype:'xml',//返回数据格式 
														  tsdpk:'search_tree.delete'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
														});
							var urlstr='mainServlet.html?'+urlstr+'&qid='+key; 
							$.ajax({
								url:urlstr,
								cache:false,//如果值变化可能性比较大 一定要将缓存设成false
								timeout: 1000,
								async: false ,//同步方式
								success:function(msg){
									if(msg=="true"){									
										falg = false;
										//写入日志操作
										logwritePub('query_tree',2,'','qid='+key,'查询模板维护');							
									}	
								}
							});
					
						 	if(falg==true){return false;}					 	
							var urlstr=tsd.buildParams({  packgname:'service',//java包
																  clsname:'ExecuteSql',//类名
																  method:'exeSqlData',//方法名
																  ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
																  tsdcf:'mssql',//指向配置文件名称
																  tsdoper:'exe',//操作类型 
																  datatype:'xml',//返回数据格式 
																  tsdpk:'modifyMod.delete'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
																});
								var urlstr='mainServlet.html?'+urlstr+'&qid='+key; 
								$.ajax({
									url:urlstr,
									cache:false,//如果值变化可能性比较大 一定要将缓存设成false
									timeout: 1000,
									async: false ,//同步方式
									success:function(msg){
										if(msg=="true"){
											var operationtips = $("#operationtips").val();
											var successful = $("#successful").val();
											jAlert(successful,operationtips);
											setTimeout($.unblockUI, 15);
											
											$("#editgrid").trigger("reloadGrid");
																						
											//写入日志操作
											logwritePub('query_global',2,'','qid='+key,'查询模板维护');												
										}	
									}
								});
						}
				});
		}
		else{					
			var operationtips = $("#operationtips").val();
			var deletepower = $("#deletepower").val();
			jAlert(deletepower,operationtips);
		}
}	
		
	


 /**
 * jqgrid上修改按钮操作 ，打开修改面板并加载将要修改的数据
 * @param key 关键字值
 * @return 
 */
function openRowModify(key){			
		var editright = $("#editright").val();
		if(editright=="true"){
				markTable(0);//显示红色*号
				var editinfo = $("#editinfo").val();
			 	$(".top_03").html(editinfo);//设置编辑框的标题
			 	isDisabledN('query_global','',''); 
				openpan();
				$("#modify").show();$("#reset").show();
				clearText('operformT1');				
				queryByID(key);		
				setTableFields();
				opendsss();	
		}
		else{
				var operationtips = $("#operationtips").val();
				var editpower = $("#editpower").val();
				jAlert(editpower,operationtips);
		}		
}


/**********************************************************
				function name:   setTableFields()
				function:		 字段权限域控制 针对修改和 批量修改的时候权限控制
				parameters:      
				return:			 
				description:     
********************************************************/
function setTableFields(){
		//从隐藏域获取可编辑字段
		var editfields = $("#editfields").val();		
		var spower = editfields.split(",");
		/****************************
		****  考虑字段大小写问题   ****
		****************************/			
		var atr = '';
		for(var i = 0 ; i <spower.length;i++){
			atr+=spower[i]+'@';	
		}									
		var atrarr = atr.split('@');
		var arr = atrarr.sort();
		
		if(arr.length>0){
			for(var i=1;i<arr.length;i++){
				
				if(arr[i]!=='' && ($("#"+arr[i]).length>0)){
					$('#'+arr[i]).removeAttr("disabled");
					$("#"+arr[i]).removeClass();
					$("#"+arr[i]).addClass("textclass");
				}														
			}
		}
}
			


 /**
 * 修改面板中，修改按钮操作
 * @param
 * @return 
 */
function modifyObj(){
	
		//判断用户组多选面板，是否已经确定选项	 
		 if($('#thedept').css('display')=='block'){
		 	alert('请确定用户组信息！');
		 	$("#groupid").focus();
		 	return ;
		 }
		 
		 //获取修改信息
		 var params = buildParams();
		 if(params==false){return false;}			
		 var urlstr=tsd.buildParams({     packgname:'service',//java包
										  clsname:'ExecuteSql',//类名
										  method:'exeSqlData',//方法名
										  ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
										  tsdcf:'mssql',//指向配置文件名称
										  tsdoper:'exe',//操作类型 
										  datatype:'xml',//返回数据格式 
										  tsdpk:'modifyMod.modify'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
										});
		 	urlstr+=params;
			$.ajax({
				url:'mainServlet.html?'+urlstr,
				cache:false,//如果值变化可能性比较大 一定要将缓存设成false
				timeout: 1000,
				async: false ,//同步方式
				success:function(msg){
					if(msg=="true"){					
						//操作成功
						var successful = $("#successful").val();
						alert(successful);
						// 释放资源 						
						setTimeout($.unblockUI, 15);
						//刷新jagrid面板
						$("#editgrid").trigger("reloadGrid");
						
						//写入日志操作
						var modifyCon = params.split("&modifyCon=");
						var modifyVal = params.split("&modifyVal=");
						//transferApos()去掉字符串的'号，等特殊字符
						logwritePub('query_global',3,modifyVal[1],modifyVal[0],'查询模板维护');
					}	
				}
		});
}
		
/**********************************************************
		function name:   buildParams()
		function:		 通过表单值构造数据操作参数
		parameters:      
		return:			 
		description:     通过表单值构造数据操作参数 请根据业务参数的多少和属性进行修改
		@oper 操作类型 modify|save
		Date:				2010-9-26 
********************************************************/
function buildParams(){
	 	//每次拼接参数必须初始化此参数
		tsd.QualifiedVal=true;				
	 	var params='';
	 	var modifyCon = '';
	 	var modifyVal ='';
	 	var qid = $("#qid").val();
	 	var name = $("#name").val();
	 	var groupid = $("#groupid").val();
	 	
	    if(name==''||name==null){
	    	alert($("#notinput").val()+$("#nameg").text());
	    	$("#name").focus();
	    	return false;
	    }
	 	if(groupid==''||groupid==null){
	    	alert($("#notinput").val()+$("#groupidg").text());
	    	$("#groupid").focus();
	    	return false;
	    }
	   
 	 	modifyCon= 'qid='+qid;
 	 	modifyVal = $("#nameg").text()+' :'+name+$("#groupidg").text()+' :'+groupid;
	 	//如果有可能值是汉字 请使用encodeURI()函数转码
	 	params+="&qid="+qid;
 		params+="&name="+tsd.encodeURIComponent(name);
 		params+="&groupid="+tsd.encodeURIComponent(groupid);
 		
 		params+="&modifyCon="+modifyCon;
 		params+="&modifyVal="+modifyVal;
		//每次拼接参数必须添加此判断
		if(tsd.Qualified()==false){return false;}
		return params;
}



/**********************************************************
		function name:   closeo()
		function:		 关闭表格面板
		parameters:      
		return:			 
		description:     关闭表格面板，添加，修改 表格样式调整涉及方法
		Date:				2010-9-26 
********************************************************/
function closeo(){		
		clearText('operformT1');
		setTimeout($.unblockUI, 15);//关闭面板	
}
/**********************************************************
		function name:   openpan()
		function:		 打开表格面板
		parameters:      
		return:			 
		description:     打开表格面板，添加，修改 表格样式调整涉及方法
		Date:				2010-9-26 
********************************************************/
function openpan(){		
		autoBlockFormAndSetWH('pan',60,5,'closeo',"#ffffff",true,450,280);//弹出查询面板		
		$("#modify").hide();$("#reset").hide();$("#clearB").hide();
}
/**********************************************************
		function name:   resett()
		function:		
		parameters:      
		return:			 
		description:     修改单条记录时的信息重置方法
		Date:				2010-9-26 
********************************************************/
function resett(){
		var key=$("#qid").val();
		queryByID(key);	
}	


/*************************************************************
		function name:   getUserPower()
		function:		 查看当前用户的扩展权限，对spower字段进行解析
		parameters:     
		return:			 
		description:     查看当前用户的扩展权限，对spower字段进行解析
		Date:			 2010-9-25 
		
		该页面的权限主要用于设置可编辑域，修改和删除权限不需要设置都能用
*************************************************************/	
function getUserPower(){
		 var urlstr=tsd.buildParams({ 	  packgname:'service',
					 					  clsname:'Procedure',
										  method:'exequery',
					 					  ds:'tsdBilling',//数据源名称 对应的spring配置的数据源
					 					  tsdpname:'modifyMod.getPower',//存储过程的映射名称
					 					  tsdExeType:'query',
					 					  datatype:'xmlattr'
				 					});
		/************************
		*   调用存储过程需要的参数 *
		**********************/
		var userid = $('#useridd').val();	
		var groupid = $('#zid').val();
		var imenuid = $('#imenuid').val();
		
		/****************
		*   拼接权限参数 *
		**************/		
		var editfields = '';			
		var spower = '';				
		var str = 'true';
		
		$.ajax({
				url:'mainServlet.html?'+urlstr+'&userid='+userid+'&groupid='+groupid+'&menuid='+imenuid,
				datatype:'xml',
				cache:false,//如果值变化可能性比较大 一定要将缓存设成false
				timeout: 1000,
				async: false ,//同步方式
				success:function(xml){
					$(xml).find('row').each(function(){
							spower += $(this).attr("spower")+'@';
					});
				}
		});
		if(spower!=''&&spower!='all@'){
				var spowerarr = spower.split('@');				
				for(var i = 0;i<spowerarr.length-1;i++){					
					editfields += getCaption(spowerarr[i],'editfields','');
				}
		}else if(spower=='all@'){				
				editfields = getFields('query_global');			
		}				
	
		$("#editfields").val(editfields);
}



/*************************************************
--------------------------------------------------
		用于实现修改面板用户组复选框功能
--------------------------------------------------
*************************************************/
/*************************************************
		function name:   opendsss()
		function:		 显示复选框面板
		parameters:     
		return:			 
		description:    显示复选框面板
		Date:			2010-9-25 
*************************************************/			
function opendsss(){
	$("#dept").attr('style','display:block');	
	$("#thedept").attr('style','display:none');
}


 /**
 * 页面初始化时加载组信息，供用户进行选择  
     获取减免项目名称
 * @param
 * @return 
 */
function getTheDept(){
	getDeptName();
	$("#dept").attr('style','display:none');
	$("#thedept").attr('style','display:block');
}
/**
 *  在对用户信息进行修改的时候将用户以前的值默认为选中状态
 * @param 
 * @return 
 */
function getDeptName(){		
	var thestavalue = $('#groupid').val();
	forChecked('depts',thestavalue,'~');		
}
/*************************************************
		function name:   getformInfo()
		function:		 根据数据库返回的数据，自动生产复选框面板
		parameters:     
		return:			 
		description:     根据数据库返回的数据，自动生产复选框面板
		Date:			 2010-9-25 
*************************************************/	
function getformInfo(){
	$('#thedeptform').remove();
	
	//将返回的结果集生成一个form出来
	var thevalue='<table width="300" border="0" cellspacing="0" cellpadding="0" style="border:1px solid #dfe0e1; padding:5px; background:#f6f7f8; font-size:12px;margin:5px 0px; ">';
	thevalue +='<tr><td height="35" colspan="3">'+"<input type='button'  id='checkall' onclick=isCheckedAll('depts',true); value='全选' style='width:51px;height:25px;text-align:center;border:1px solid #b5b5b5; background:#f9f9f9;line-height:25px;  margin-left:10px;'><input type='button'  id='uncheckall' onclick=isCheckedAll('depts',false); value='反选' style='line-height:25px;width:51px;height:25px;text-align:center;border:1px solid #b5b5b5; background:#f9f9f9;  margin-left:10px;'><input type='button'  onclick=getCheckValue('groupid','thedept','dept','depts','~') value='确定' style='line-height:25px;width:51px;height:25px;text-align:center;border:1px solid #b5b5b5; background:#f9f9f9;  margin-left:10px;'><input type='button' onclick=cancelTheOper('dept','thedept') value='取消' style='line-height:25px;width:51px;height:25px;text-align:center;border:1px solid #b5b5b5; background:#f9f9f9;  margin-left:10px;'>"+'</td></tr>';
	var i=0;
		
		var urlstr=buildParamsSql('query','xmlattr','modifyMod.getgroupid','');
		$.ajax({
			url:'mainServlet.html?'+urlstr,
			datatype:'xml',
			cache:false,//如果值变化可能性比较大 一定要将缓存设成false
			timeout: 1000,
			async: false ,//同步方式
			success:function(xml){
				//将返回的结果集生成一个form出来				
				$(xml).find('row').each(function(){								
						var areaval = $(this).attr("groupid");
						var area = $(this).attr("groupname");																						
						//生成复选框	
						if(i%2==0){
							thevalue +='<tr ><td height="20" width="135px" color="#666666"> '+"<input type='checkbox' name='depts' value='"+areaval+"' style='width:15px;height:15px;border:0px;'><label style='text-align: left;'>"+area+"</label>"+'</td>';
						}else if(i%2==1){
							thevalue +='<td color="#666666" width="135px"> '+"<input type='checkbox' name='depts' value='"+areaval+"' style='width:15px;height:15px;border:0px;'><label style='text-align: left;'>"+area+"</label>"+'</td>';
						}
						i++;
				});				
			}
			
		});
		thevalue +='</table>';	
		$('#thedept').html(thevalue);
}
