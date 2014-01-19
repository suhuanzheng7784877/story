/*****************************************************************
 * name: (searchMod.js)
 * author: 尤红玉
 * version: 1.0, 2010-9-26
 * description: 查询模板维护页面对应js文件
 * modify:
 *		2010-11-05 youhongyu 添加注释功能	
 *****************************************************************/
 


//用于表识当前选项卡	
var tabStatus=1;

/**
 * 点击切换选项卡操作
 * @param id 当前被点击的选项卡表识，通过该表识打开相应选项卡
 * @return 
 */			
function tabsChg(id)
{
		$("#gridd").empty();
		$("#gridd").append('<table id="editgrid" class="scroll" cellpadding="0" cellspacing="0"></table>');
		$("#gridd").append('<div id="pagered" class="scroll" style="text-align: left;"></div>');
		$("#fusearchsql").val("");		
		switch(id)
		{
			case 1:
				tabStatus=1;					
				ready1();
				break;
			case 2:
				tabStatus=2;			
				ready2();
				break;
		}		
}

/**
 * 第一个选项卡对应的jqgrid的数据加载，和其对应的弹出面板中标签的国际化 	
 * @param 
 * @return 
 */
function ready1(){
			/////设置命令参数
			var urlstr=tsd.buildParams({ packgname:'service',//java包
											  clsname:'ExecuteSql',//类名
											  method:'exeSqlData',//方法名
											  ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
											  tsdcf:'mssql',//指向配置文件名称
											  tsdoper:'query',//操作类型 
											  datatype:'xml',//返回数据格式 
											  tsdpk:'searchMod.query1',//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
											  tsdpkpagesql:'searchMod.querypage1'//依赖tsdpk 用于计算分页的sql配置名称应在tsdcf配置的文件中指定
										});
			//对jgGrid的操作符进行国际化
			var opr = $("#operation").val();
			//获取数据表对应字段国际化信息
			//qid,name,menid,userid,groupid,querysql			
			var languageType = $("#languageType").val();
			var thisdata = loadData('query_global',languageType,1);
			
			var qidg = thisdata.getFieldAliasByFieldName('qid');
			var nameg = thisdata.getFieldAliasByFieldName('name');
			var menidg = thisdata.getFieldAliasByFieldName('menid');
			var useridg = thisdata.getFieldAliasByFieldName('userid');
			var groupidg = thisdata.getFieldAliasByFieldName('groupid');		
			
			
			//给页面中存储字段的隐藏标签赋值
			$("#qidg").html(qidg);
			$("#nameg").html(nameg);
			$("#menidg").html(menidg);
			
			var imenuid = $("#imenuid").val();
			var userid = $("#useridd").val();
			var tabpage = $("#tabpage").val();
		
			jQuery("#editgrid").jqGrid({			
				//ZjMkj,BjMkj,ZjjxZu,NetName,ID
				url:'mainServlet.html?'+urlstr+'&menid='+imenuid+'&userid='+userid+'&tabpage='+tabpage,
				datatype: 'xml', 
				colNames:[opr,qidg,nameg,menidg,useridg,groupidg], 
				colModel:[ 
						{name:'viewOperation',index:'viewOperation',sortable:false,width:100,hidden:true},//如果有操作列 请勿更改或者删除
						{name:'qid',index:'qid', width:80,hidden:true}, 
				       	{name:'name',index:'name',width:260},
				       	{name:'menid',index:'menid',width:160,hidden:true},
				       	{name:'userid',index:'userid', width:100,hidden:true}, 
				       	{name:'groupid',index:'groupid',width:260}
				       	], 
				       	// qid,name,menid,userid,groupid,querysql
				       	rowNum:5, //默认分页行数
				       	rowList:[5,10,20], //可选分页行数
				       	imgpath:'plug-in/jquery/jqgrid/themes/basic/images/', 
				       	pager: jQuery('#pagered'), 
				       	sortname: 'qid', //默认排序字段
				       	viewrecords: true, 
				       	//hidegrid: false, 
				       	sortorder: 'asc',//默认排序方式 
				       	caption:'个人模板', 
				       	height:'160px', //高
				        //width:document.documentElement.clientWidth-27,
				       	loadComplete:function(){
										$("#editgrid").setSelection('0', true);
										$("#editgrid").focus();
										///自动适应 工作空间
										// var reduceHeight=$("#navBar").height()+$("#operTitle").height()+$("#buttons").height()+$("#pagered").height();
										//setAutoGridHeight("editgrid",reduceHeight);
										//setAutoGridWidth("editgrid",'0');
										/*********定义需要的行链接按钮************
										////@1  表格的id
										////@2  链接名称
										////@3  链接地址或者函数名称
										////@4  行主键列的名称 可以是隐藏列
										////@5  链接激活方式 枚举类型 href：为跳转页面 ，click：事件激活方式
										////@6  按钮的位置，，，不允许重复，不允许跳跃 范围 1+	*/
										//var editinfo = $("#editinfo").val();
										//var deleteinfo = $("#deleteinfo").val();
										//addRowOperBtn('editgrid',editinfo,'openRowModify','qid','click',1);
										//addRowOperBtn('editgrid',deleteinfo,'deleteRow','qid','click',2);
									   /****执行行按钮添加********
										*@1 表格ID
										*@2 操作按钮数量 等于定义数量
										*依赖于addRowOperBtn(,,,,,)函数 顺序不可调换*/
										//executeAddBtn('editgrid',2);
										
										},
										ondblClickRow:function(ids){	
											/*
											if(ids!=null){     
							                    var qid=$("#editgrid").getCell(ids,"qid");
							                   	generateTree(qid);
						                   	}
						                   	*/
										},onSelectRow:function(rowid){											
											if(rowid!=null){		       
							                    var qid=$("#editgrid").getCell(rowid,"qid");
							                   	generateTree(qid);
						                   	}						                   								
										}			
				}).navGrid('#pagered', {edit: false, add: false, add: false, del: false, search: false}, //options 
					{height:140,reloadAfterSubmit:true,closeAfterEdit:true}, // edit options 
					{height:140,reloadAfterSubmit:true,closeAfterAdd:true}, // add options 
					{reloadAfterSubmit:false}, // del options 
					{} // search options 
					); 					
	}
	
	
	/**
	 * 第二个选项卡对应的jqgrid的数据加载
	 * @param 
	 * @return 
	 */
	function ready2(){
			//给页面中存储字段的隐藏标签赋值			
			$("#qidg").html(qidg);
			$("#nameg").html(nameg);
			$("#menidg").html(menidg);
			
			var groupidI = $('#zid').val();
			var groupidIA = groupidI.split('~');
			var lenI = groupidIA.length;
			var qidA=[];
			var urlstr=buildParamsSql('query','xmlattr','searchMod.getgroupid','');
			
			var imenuid = $("#imenuid").val();
			var userid = $("#useridd").val();
			var tabpage = $("#tabpage").val();
			$.ajax({
				url:'mainServlet.html?'+urlstr+'&menid='+imenuid+'&userid='+userid+'&tabpage='+tabpage,
				datatype:'xml',
				cache:false,//如果值变化可能性比较大 一定要将缓存设成false
				timeout: 1000,
				async: false ,//同步方式
				success:function(xml){
					$(xml).find('row').each(function(){
							var qid = $(this).attr("qid");
							var groupid = $(this).attr("groupid");
							if(groupid==undefined){return;}
							var groupidA = groupid.split('~');
							var len=groupidA.length;
							var flag=false;
							for(var j=0;j<len;j++){							
								for(var i=0;i<lenI;i++){
									if(groupidIA[i]==groupidA[j]){
										qidA.push(qid);
										flag = true;
										break;
									}
								}
								if(flag==true){break;}
							}																						
					});
				}
			});
			if(qidA==''){qidA=0;}
			/////设置命令参数
			var urlstr=tsd.buildParams({      packgname:'service',//java包
											  clsname:'ExecuteSql',//类名
											  method:'exeSqlData',//方法名
											  ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
											  tsdcf:'mssql',//指向配置文件名称
											  tsdoper:'query',//操作类型 
											  datatype:'xml',//返回数据格式 
											  tsdpk:'searchMod.query2',//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
											  tsdpkpagesql:'searchMod.querypage2'//依赖tsdpk 用于计算分页的sql配置名称应在tsdcf配置的文件中指定
										});
			//对jgGrid的操作符进行国际化
			var opr = $("#operation").val();
			//获取数据表对应字段国际化信息
			//qid,name,menid,userid,groupid,querysql
			var languageType = $("#languageType").val();
			var thisdata = loadData('query_global',languageType,1);
			
			var qidg = thisdata.getFieldAliasByFieldName('qid');
			var nameg = thisdata.getFieldAliasByFieldName('name');
			var menidg = thisdata.getFieldAliasByFieldName('menid');
			var useridg = thisdata.getFieldAliasByFieldName('userid');
			var groupidg = thisdata.getFieldAliasByFieldName('groupid');
			
					
			var imenuid = $("#imenuid").val();
			var userid = $("#useridd").val();
			var tabpage = $("#tabpage").val();
			
			jQuery("#editgrid").jqGrid({				
				url:'mainServlet.html?'+urlstr+'&menid='+imenuid+'&userid='+userid+'&qidA='+qidA+'&tabpage='+tabpage,
				datatype: 'xml', 
				colNames:[opr,qidg,nameg,menidg,useridg,groupidg], 
				colModel:[ 
						{name:'viewOperation',index:'viewOperation',sortable:false,width:100,hidden:true},//如果有操作列 请勿更改或者删除
						{name:'qid',index:'qid', width:80,hidden:true}, 
				       	{name:'name',index:'name',width:200},
				       	{name:'menid',index:'menid',width:80,hidden:true},
				       	{name:'userid',index:'userid', width:140}, 
				       	{name:'groupid',index:'groupid',width:180}
				       
				       	], 
				       	// qid,name,menid,userid,groupid,querysql
				       	rowNum:5, //默认分页行数
				       	rowList:[5,10,20], //可选分页行数
				       	imgpath:'plug-in/jquery/jqgrid/themes/basic/images/', 
				       	pager: jQuery('#pagered'), 
				       	sortname: 'qid', //默认排序字段
				       	viewrecords: true, 
				       	//hidegrid: false, 
				       	sortorder: 'asc',//默认排序方式 
				       	caption:'其它模板', 
				       	height:'160px', //高
				       // width:document.documentElement.clientWidth-27,
				       	loadComplete:function(){
										$("#editgrid").setSelection('0', true);
										$("#editgrid").focus();
										///自动适应 工作空间
										// var reduceHeight=$("#navBar").height()+$("#operTitle").height()+$("#buttons").height()+$("#pagered").height();
										//setAutoGridHeight("editgrid",reduceHeight);
										//setAutoGridWidth("editgrid",'0');
										/*********定义需要的行链接按钮************
										////@1  表格的id
										////@2  链接名称
										////@3  链接地址或者函数名称
										////@4  行主键列的名称 可以是隐藏列
										////@5  链接激活方式 枚举类型 href：为跳转页面 ，click：事件激活方式
										////@6  按钮的位置，，，不允许重复，不允许跳跃 范围 1+	*/
										//var editinfo = $("#editinfo").val();
										//var deleteinfo = $("#deleteinfo").val();
										//addRowOperBtn('editgrid',editinfo,'openRowModify','qid','click',1);
										//addRowOperBtn('editgrid',deleteinfo,'deleteRow','qid','click',2);
									   /****执行行按钮添加********
										*@1 表格ID
										*@2 操作按钮数量 等于定义数量
										*依赖于addRowOperBtn(,,,,,)函数 顺序不可调换*/
										//executeAddBtn('editgrid',2);
										},
										ondblClickRow:function(ids){
											/*		
											if(ids!=null){		       
							                    var qid=$("#editgrid").getCell(ids,"qid");
							                   	generateTree(qid);
						                   	}
						                   	*/	
										},onSelectRow:function(rowid){											
											if(rowid!=null){		       
							                    var qid=$("#editgrid").getCell(rowid,"qid");
							                   	generateTree(qid);
						                   	}						                   								
										}			
				}).navGrid('#pagered', {edit: false, add: false, add: false, del: false, search: false}, //options 
					{height:140,reloadAfterSubmit:true,closeAfterEdit:true}, // edit options 
					{height:140,reloadAfterSubmit:true,closeAfterAdd:true}, // add options 
					{reloadAfterSubmit:false}, // del options 
					{} // search options 
					); 
	}
			

/**
 * 生成树 qid：查询模板的id
 * @param 
 * @return 
 */
function generateTree(qid){			
				$("#qidd").val(qid);	
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
						
							var pid = $(this).attr("pid");							
							var cid = $(this).attr("cid");
							var notestr = $(this).attr("notestr");							
							var notepic = $(this).attr("notepic");
							dmtree.add(cid,pid,notestr,"","","",notepic,notepic,open);
							
							//pid,cid,notestr,notepic,qid
						});
					}
				});
	$("#treediv").html(dmtree.toString());
	//$("#querytree").append("<button onclick='modquery();'></button>");
	autoBlockFormAndSetWH('querytree',60,60,'Qclose',"#ffffff",true,400,300);
	//autoBlockForm('querytree',60,'close',"#ffffff",false);//弹出查询面板
}


/**
 * 模块查询
 * @param 
 * @return 
 */
function modquery(){
		var qid = $("#qidd").val();
		var querysql='';
		var urlstr=tsd.buildParams({  		 
											  packgname:'service',//java包
											  clsname:'ExecuteSql',//类名
											  method:'exeSqlData',//方法名
											  ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
											  tsdcf:'mssql',//指向配置文件名称
											  tsdoper:'query',//操作类型 
											  datatype:'xml',//返回数据格式 
											  tsdpk:'search.getSql'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
											});	
				$.ajax({
					url:'mainServlet.html?'+urlstr+'&qid='+qid,
					datatype:'xml',
					cache:false,//如果值变化可能性比较大 一定要将缓存设成false
					timeout: 1000,
					async: false ,//同步方式
					success:function(xml){
						$(xml).find('row').each(function(){
							$(this).find('cell').each(function()
							{
								querysql=$(this).text();					
							});
						});
					}
				});
					
				querysql=quotesCf(querysql);
				window.dialogArguments.document.getElementById("fusearchsql").value=querysql;
				window.dialogArguments.fuheQuery(); 
        		window.close();         		
}
/**********************************************************
				function name:   quotesCf(str)
				function:		 对查询条件中的非法字符进行替换，使其满足sql语法标准
				parameters:      str：需要进行字符替换的字符串
				return:			 res：替换之后的字符串
				description:      
				Date:			  2010-9-25 
********************************************************/
function quotesCf(str){
		var arr = [["\"","&lt;","&gt;","&amp;","&quot;"],["'","<",">","&","\""]];	
		var res = str;
			for(i=0;i<arr[0].length;i++)
			{
				res = res.replace(new RegExp(arr[0][i],"g"),arr[1][i]);						
			}
		return res;
}


/**
 * 页面模板维护按钮，打开模板维护窗口
 * @param 
 * @return 
 */		
function openModifyD(){
	//获取 用户 用户组 菜单id信息
	var userid = $('#useridd').val();
	var groupid = $('#zid').val();
	var imenuid = $('#imenuid').val();
	var tabpage = $("#tabpage").val();
	window.showModalDialog('mainServlet.html?pagename=pubMode/modifyMod.jsp&imenuid='+imenuid+'&userid='+userid+'&groupid='+groupid+'&tabpage='+tabpage,window,"dialogWidth:570px; dialogHeight:450px;center:yes; scroll:yes");
} 