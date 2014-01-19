 /*****************************************************************
 * name: SingleTabE.js
 * author: 尤红玉
 * version: 1.0,  2010-9-17
 * description: 单表编辑页面脚本
 * modify:
 *		2010-11-05 youhongyu 添加注释功能
 		2011-12-26 youhongyu jqgrid显示多表关联
 		2011-01-04 youhongyu 修改默认数据显示方式
 		2011-01-06 youhongyu 添加jqgrid默认排序字段、批量删除jqgrid数据更新方式
 		2011-01-06 youhongyu 级联初步实现添加、修改、显示面板单选字段级联
		2011-01-07 youhongyu 级联实现添加、修改、显示面板多选字段级联
		2011-01-10 youhongyu 级联实现简单查询面板字段级联
		2011-01-12 youhongyu 针对权限组管理菜单特殊处理 （获取这个处理注释掉了）
		2011-01-14 youhongyu 添加字段唯一性判断功能
		2011-01-22 youhongyu 添加初始化条件
		2011-02-28 youhongyu 可编辑字段控制修改，权限控制处，可编辑字段的修改。
		2011-4-6   youhongyu 有关键字为日期型是，打开显示详细信息报错
		2011-4-6   youhongyu 字段级联中，关联字段不出来。
		2011-4-15  youhongyu 修改jqgrid显示多表关联，使用非admin用户登入，jqgrid上应显示关联表字段的地方不显示
								问题：原来用于格式化话jqggrid的json串中只有可编辑字段的信息，非可编辑字段没有，
								解决方案：用显示详细的json串格式化显示jqgrid的字符串		
		2011-4-20  youhongyu 	1)jqgrid上有关联的话，没有个select部分加表别名，如果两个表的字段重名了，会导致sql语句报错
      							2)主键：关联部分主键不能替换。
      							3)不更改jqgrid中隐藏列的顺序
      	2011-4-27  youhongyu	下拉多选框样式错误，原因：添加该插件时，传入的字段id错误，不是该循环体内的id
       	2011-4-27  youhongyu	添加对bsum=1的字段进行求和
       	2011-5-3   youhongyu	更改：关键字可修改
       	2011-5-13  youhongyu    增加单表编辑设置默认排序规则
       	2011-7-13  youhongyu    通过读取配置表来判断初始化的时候是否显示数据
       	2011-7-14  youhongyu    简单查询有包含查询改成 类似查询 
       	2011-7-18  youhongyu    添加一个功能 页面刚被打开时条件，只在页面刚被打开起作用，进行增删改查操作后不起作用。
       	2011-7-20  youhongyu	简单查询优化：类型为日期-按时间段进行查询； 类型为数字-具体查询；其它的类型进行类似查询
       	2011-8-1   youhongyu    单表编辑 初始配置的条件支持变量替换
		$.get('mainServlet.html',{packgname:'service',clsname:'DBService',method:'service',operate:'decideDBType',ds:'tsdBill'},function(data){
	 *    alert(data);	 
	 * });
 *****************************************************************/
 logoldA = new Array();
//	针对非单表编辑页面，但是调用该页面部分方法报错做一些特殊处理
jQuery(document).ready(function () {
	$("body").append('<input type="hidden" id="modifywhere" />');//用于判断修改的关键字的值是不是在数据库中已经有重复的	
	
	//标识该表是否有需要进行求和的字段，0：无 ；1：有 。默认值为：0
	if(typeof(g_ifSum)=="undefined"){
		g_ifSum=0;
	}
	//初始化页面数据时，默认排序方式
	if(typeof(orderby_key)=="undefined"){
		orderby_key='';
	}
	
	//初始化页面数据时，默认排序方式
	if(typeof(isshowname)=="undefined"){
		isshowname='';
	}

	//页面刚开始显示的条件
	if(typeof(DisplayConditions)=="undefined"){
		DisplayConditions=' 1=1 ';
	}
	//当前系统使用的数据库类型
	if(typeof(theDBType)=="undefined"){
		theDBType = decideDBType();
	}
	
});
/**********************************************************
function name:  decideDBType()
				function:		 获取当前数据库类型
				parameters:   postgresql enterprisedb  oracle mssql mysql
**********************************************************/
function decideDBType (){
	var datastr ='';
	
  	$.ajax({
						url:'mainServlet.html?&packgname=service&clsname=DBService&method=service&operate=decideDBType&ds=tsdBill',
						datatype:'data',
						cache:false,//如果值变化可能性比较大 一定要将缓存设成false
						timeout: 1000,
						async: false ,//同步方式
						success:function(data){
							datastr=data;
						}
	});
  	return datastr;
}
/**********************************************************
				function name:   setBuildParams(packgname,clsname,method,ds,tsdcf,tsdoper,datatype,tsdpk,tsdpkpagesql)
				function:		 设置命令参数 
				parameters:      
								  packgname:java包
								  clsname:类名
								  method:方法名
								  ds:数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
								  tsdcf:指向配置文件名称
								  tsdoper:操作类型 
								  datatype:返回数据格式 
								  tsdpk:执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
								  tsdpkpagesql:依赖tsdpk 用于计算分页的sql配置名称应在tsdcf配置的文件中指定
				return:			 
				description:     设置命令参数
				Date:			  2010-9-7 
********************************************************/
function setBuildParams(packgname,clsname,method,ds,tsdcf,tsdoper,datatype,tsdpk,tsdpkpagesql){
		/////设置命令参数
		var urlstr=tsd.buildParams({ 	  packgname:packgname,//java包
										  clsname:clsname,//类名
										  method:method,//方法名
										  ds:ds,//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
										  tsdcf:tsdcf,//指向配置文件名称
										  tsdoper:tsdoper,//操作类型 
										  datatype:datatype,//返回数据格式 
										  tsdpk:tsdpk,//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
										  tsdpkpagesql:tsdpkpagesql//依赖tsdpk 用于计算分页的sql配置名称应在tsdcf配置的文件中指定
		});
		return urlstr;
}
/**********************************************************
				function name:   setFieldName(tablename,prefix,suffix)
				function:		  从别名表中获取字段名，设置添加面板的标签值 
				parameters:      tablename：表名
								 prefix:表单元素id值的开头
								 suffix:表单元素id值的结尾
								 languageType:	国际化标识							  
				return:			 
				description:     从别名表中获取字段名，设置添加面板的标签值 
				Date:				2010-9-7 
********************************************************/
function setFieldName(tablename,prefix,suffixN,languageType){
		//获取数据表对应字段国际化信息	
		var thisdata = loadData(tablename,languageType,1);		
		for(var i = 0 ; i <fieldarr.length-1;i++){
			var Jxlxg = thisdata.getFieldAliasByFieldName(fieldarr[i]);		
			//给页面中存储字段的隐藏标签赋值			
			$("#"+prefix+fieldarr[i]+suffixN).html(Jxlxg);
		}
}
/**********************************************************
				function name:   readJQgird(tablename,oper,urlstr)
				function:		 将添加或修改面板中的字段置为可用 
				parameters:      tablename：表名
								 oper:'修改|删除|详细'
								 urlstr:ajax提交参数
				return:			 
				description:      
				Date:				2010-9-7 
********************************************************/
function readJQgird(oper,urlstr,callback){
				
		//设置jqgrid标题头
		var navv = document.location.search;
		var infoo = decodeURIComponent(parseUrl(navv,"imenuname",""));
		
		//菜单id
		var imenuid = $("#imenuid").val();
		//jqgrid数据填充 得到jqGrid要显示的字段
		var col=[[],[]];
		//拼接要执行的字符串
		var evalstr = 'col=getRb_Field(tablealiasName,"\'id\'",oper,"120","ziduansF"';		
		var keylen=keyGridTop.length;		
		for(var i=0;i<keylen;i++){
			evalstr +=",'"+keyGridTop[i]+"'";
		}
		evalstr +=")";
		eval(evalstr);		
		
		var column = $("#ziduansF").val();
		//对column进行格式化
	
		column = formatColumn(column);
		$("#ziduansF").val(column);
		var fuhesql = "1=1";
		//通过读取配置表来判断初始化的时候是否显示数据
			//新版本进行配置 初始化显示数据
			if(isshowdata==1){fuhesql="1=2";}
			//老版本进行配置 初始化显示数据
			var disall = fetchSingleValue("PhoneHuafeiInformation.dishidden",6,"&menuid=" + tsd.encodeURIComponent(imenuid));
			if(disall!="0") {fuhesql="1=2";}
		//显示条件 只在页面刚被打开起作用，进行增删改查操作后不起作用。
		if(DisplayConditions==''){
			fuhesql = fuhesql ;
		}else{
			fuhesql = fuhesql+' and '+DisplayConditions;
		}

		fuhesql = "&fusearchsql="+tsd.encodeURIComponent(fuhesql);
		//////////////////////////////////////////////
		/////设置命令参数
		
		var urlstr2=tsd.buildParams({ 	  packgname:'service',//java包
										  clsname:'ExecuteSql',//类名
										  method:'exeSqlData',//方法名
										  ds:dataSource,//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
										  tsdcf:tsdcf,//指向配置文件名称
										  tsdoper:'query',//操作类型 
										  datatype:'xml',//返回数据格式 
										  tsdpk:'publicmode.queryByOrder',//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
										  tsdpkpagesql:'publicmode.queryByOrderpage'//依赖tsdpk 用于计算分页的sql配置名称应在tsdcf配置的文件中指定
		});	
		urlstr2 = urlstr2 +keyQueryS+"&initialization="+initialization;		
		var params ='&column='+column+'&tablename='+tablename+"&tablenameleft="+tablenameleft+fuhesql+"&orderby="+orderby_key;
		if(orderby_key==''){
			urlstr2=urlstr;
		}
		jQuery("#editgrid").jqGrid({
			url:'mainServlet.html?'+urlstr2 +params,
			datatype: 'xml',
			colNames:col[0],
			colModel:col[1],
			       	rowNum:10, //默认分页行数
			       	rowList:[10,15,20], //可选分页行数
			       	imgpath:'plug-in/jquery/jqgrid/themes/basic/images/',
			       	pager: jQuery('#pagered'),
			       	sortname: col[2][0], //默认排序字段,jqgird上显示的第一个字段
			       	//sortname:orderby_key,
			       	viewrecords: true,
			       	//hidegrid: false,
			       	sortorder: 'desc',//默认排序方式
			       	caption:infoo,
			       	height: document.documentElement.clientHeight - 182,
			        //	width:document.documentElement.clientWidth-27,
			       	loadComplete:function(){			       						
										$("#editgrid").setSelection('0', true);
										$("#editgrid").focus();
										///自动适应 工作空间
										 var reduceHeight=$("#navBar").height()+$("#operTitle").height()+$("#buttons").height()+$("#pagered").height();
										setAutoGridHeight("editgrid",reduceHeight);
										
										//如果查询的jqgrid没有任何数据，则不显示第一行的按钮
										if($("#editgrid tr.jqgrow[id='1']").html()==""){
											return false;
										}
										
										/*********************************
										添加按钮处理
										*********************************/										
										var editinfo = $("#editinfo").val();
										var deleteinfo = $("#deleteinfo").val();
										var PLmesAll = $("#PLmesAll").val();
										var PLprint = $("#PLprint").val();
										
										var evalstr = '';
										var keylen=keyGridTop.length;		
										for(var i=0;i<keylen;i++){
											evalstr +=",'"+keyGridTop[i]+"'";
										}
										
										//根据配置权限功能显示 ，jqgrid列表左侧可用功能								
										var deleteJQ = $("#deleteJQ").val();
										var editJQ = $("#editJQ").val();
										var showInfoJQ = $("#showInfoJQ").val();
										var printRowJQ = $("#printRowJQ").val();
										var butint=0;
										if(editJQ=='true'){
											butint++;
											eval("addRowOperBtnimage('editgrid','openRowModify','id','click',"+butint+",'style/images/public/ltubiao_01.gif','"+
											editinfo+"','&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'"+evalstr+")");//修改											
										}
										if(deleteJQ=='true'){
											butint++;
											eval("addRowOperBtnimage('editgrid','deleteRow','id','click',"+butint+",'style/images/public/ltubiao_02.gif','"+
												deleteinfo+"','&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'"+evalstr+")");//删除												
										}										
										if(showInfoJQ=='true'){
											butint++;
											eval("addRowOperBtnimage('editgrid','openRowInfo','id','click',"+butint+",'style/images/public/ltubiao_03.gif','"+PLmesAll+"','&nbsp;&nbsp;&nbsp;'"+
											evalstr+")");//详细
										}	
										if(printRowJQ=='true'){
											butint++;
											eval("addRowOperBtnimage('editgrid','openRowPrint','id','click',"+butint+",'style/images/public/print-view.png','"+PLprint+"','&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'"+
											evalstr+")");//打印
										}														
										if(butint!=0){
											executeAddBtn('editgrid',butint);
										}																			
										
									},ondblClickRow:function(ids){
										//判断是否有显示详细功能，有则可双击打开显示详细面板
										var showInfoJQ = $("#showInfoJQ").val();
										if(showInfoJQ=='true'){
											//判断jqgrid改行记录是否有值
											if(ids != null) {										
													var evalstrs = "'id'";		
													var keylens=keyGridTop.length;		
													for(var i=0;i<keylens;i++){
														//evalstr +=",'"+keyGridTop[i]+"'";
														evalstrs +=",'"+$("#editgrid").getCell(ids,keyGridTop[i])+"'";
													}													
													eval("openRowInfo("+evalstrs+")");													
											}
										}
									},gridComplete:function(){
										//执行权限设置和添加面板生产
										/**
										if(callback){
											callback();
										}	
										*/
									}
			}).navGrid('#pagered',{edit: false, add: false, add: false, del: false, search: false}, //options 
				{height:280,reloadAfterSubmit:true,closeAfterEdit:true}, // edit options 
				{height:280,reloadAfterSubmit:true,closeAfterAdd:true}, // add options 
				{reloadAfterSubmit:false}, // del options 
				{} // search options 
				);	
				//重新置jqgrid刷新参数
				$("#editgrid").setGridParam({url:'mainServlet.html?'+urlstr+params});
				//根据初始化的时候是否显示数据 决定是否要对要求和的字段进行求和					
				if(isshowdata==1){return false;}
				else {
					SumFiledS(g_ifSum);
				}		
				
}
/**************************************************************************
				function name:   formatColumn(column)
				function:		 功能按钮配置
				parameters:   	column   :查询字段
				return:			返回格式化后的字段
				description:     
				Date:			 2010-12-26
***************************************************************************/
function formatColumn(column){
	//替换查询字段
	column=("," + column).replace(/,(?!\')/g,","+tablename+".").replace(",","");
	var jsonstr = $("#fieldjsoninfoXX").val();
	//json解析方式
	var obj = eval('(' + jsonstr + ')');	
	for(var i=0;i<obj.rows.length;i++){	
	
		//字段数字字典
		var selectname = obj.rows[i].selectname;
		//判断是否有数字字典		
		if(selectname!=''&&selectname!=undefined){			
			var field_name = obj.rows[i].field_name;
			var arr = selectname.split(';');
			//数字字段为单选项
			//数字字段为单选项
			if(arr[0].toLowerCase()=='s'){
				//计算该字段的次数，如果大于1则表示该字段为关键字，第一个位置不被替换
				var count_str = column.split(tablename+"."+field_name).length-1;
				if(count_str>1){
					column = column.replace(new RegExp(tablename+"."+field_name),"----");
					column = column.replace(new RegExp(tablename+"."+field_name,"g"),arr[3]);
					column = column.replace(new RegExp("----"),tablename+"."+field_name);
				}else{
					column = column.replace(new RegExp(tablename+"."+field_name,"g"),arr[3]);
				}				
				tablenameleft = " left join "+arr[1] +" on "+tsd.encodeURIComponent(arr[2])+"="+tablename+"."+field_name+" " +tablenameleft;
			}
			//数字字段为多选项
			else if(arr[0].toLowerCase()=='w'){
				var languageType = $("#languageType").val();
				
				var strCh='';
				
				//根据数据库类型 修改sql语句
				if(theDBType=='postgresql'){
					strCh = "getMultiValues(trim(to_char2("+tablename+"."+field_name+")),'"+arr[1]+"','"+arr[2]+"','"+arr[3]+"','"+obj.rows[i].mulselectoper+"','','"+languageType+"')";
				}else{
					strCh = "getMultiValues(trim("+tablename+"."+field_name+"),'"+arr[1]+"','"+arr[2]+"','"+arr[3]+"','"+obj.rows[i].mulselectoper+"','','"+languageType+"')";
				}
				//计算该字段的次数，如果大于1则表示该字段为关键字，第一个位置不被替换
				var count_str = column.split(tablename+"."+field_name).length-1;				
				if(count_str>1){
					column = column.replace(new RegExp(tablename+"."+field_name),"----");
					column = column.replace(new RegExp(tablename+"."+field_name,"g"),strCh);
					column = column.replace(new RegExp("----"),tablename+"."+field_name);
				}else{
					column = column.replace(new RegExp(tablename+"."+field_name,"g"),strCh);
				}						
			}		
		}
	}
	return column;
}


/**************************************************************************
				function name:   showRightBut()
				function:		 功能按钮配置
				parameters:      
				return:			 operstr: jqgrid左侧第一列标题值
				description:     根据菜单管理中对页面功能的配置，显示可用功能按钮
				Date:			 2010-10-26
***************************************************************************/
function showRightBut(){
		//先隐藏所有功能按钮				
		$("#buttons>button").each(function(){		
			$(this).hide();					
		});			
		
		//jqgrid左侧第一列标题值
		var operstr='';
		
		//根据配置的功能权限，来控制可用功能按钮			
		if(rights!=''){
			var rightsA = rights.split('~');
			var titleinfo='';
			for(var i = 0 ; i <rightsA.length;i++){
								
				//根据配置的功能权限，显示功能按钮
				if(rightsA[i]=='add'){				//添加
					$("#openadd1").show();
					$("#openadd2").show();
				}
				else if(rightsA[i]=='orderBy'){		//组合排序
					$("#order1").show();
					$("#order2").show();
				}
				else if(rightsA[i]=='jdQuery'){		//简单查询
					$("#jdquery1").show();
					$("#jdquery2").show();
				}
				else if(rightsA[i]=='query'){		//高级查询
					$("#gjquery1").show();
					$("#gjquery2").show();
				}
				else if(rightsA[i]=='modQuery'){	//模板查询
					$("#mbquery1").show();
					$("#mbquery2").show();
				}
				else if(rightsA[i]=='saveQueryM'){	//保存模板查询
					$("#savequery1").show();
					$("#savequery2").show();
				}
				else if(rightsA[i]=='delB'){		//批量删除
					$("#opendel1").show();
					$("#opendel2").show();
				}
				else if(rightsA[i]=='editB'){		//批量修改
					$("#openmod1").show();
					$("#openmod2").show();
				}
				else if(rightsA[i]=='export'){		//导出数据
					$("#export1").show();
					$("#export2").show();
				}
				else if(rightsA[i]=='print'){		//打印
					$("#print1").show();
					$("#print2").show();
				}
				else if(rightsA[i]=='edit'){		//修改
					$("#editJQ").val('true');
					titleinfo =$("#PLedit").val();
					operstr +=titleinfo+'|';				
				}
				else if(rightsA[i]=='delete'){		//删除
					$("#deleteJQ").val('true');
					titleinfo =$("#PLdelete").val();
					operstr += titleinfo+'|';
				}
				
				else if(rightsA[i]=='showInfo'){	//显示详细
					$("#showInfoJQ").val('true');
					titleinfo =$("#PLmesAll").val();
					operstr += titleinfo+'|';
				}
				else if(rightsA[i]=='printRow'){	//对单挑记录的打印预览
					$("#printRowJQ").val('true');
					titleinfo =$("#PLprint").val();
					operstr += titleinfo;
				}
				
			}
		}
		return operstr;	
}

/**************************************************************************
				function name:   openRowInfo()
				function:		 显示详细信息
				parameters:      
				return:			 
				description:     显示详细信息
				Date:				2010-9-7 
***************************************************************************/
function openRowInfo(){
		creatInfoPan();//判断是否要生成面板
		markTable(1);//显示红色*号		
		$(".top_03").html($("#mesall").val());//设置编辑框的标题 
		clearText('operformTXX');
		clearMultiSelect();//清空多选下拉框
		
		//根据联合主键查询该条记录
		var len = arguments.length;
		var keyparams = keyWhereS;
		if(len>1){
			for(var i=1;i<len;i++){
				keyparams = keyparams.replace('key'+i,tsd.encodeURIComponent(arguments[i]));
			}			
		}
		var whereinfo = "&whereinfo="+keyparams;
		//queryByID(whereinfo);
		queryByID(whereinfo,"fieldjsoninfoXX",prefix,suffixIW,isRelatedInfoXX,relatedInfoXX,isRelateValXX);
				
		openpanXX();
}

/**************************************************************************
				function name:   openRowPrint()
				function:		 对单挑记录进行打印预览
				parameters:      
				return:			 
				description:     对单挑记录进行打印预览
				Date:			 2011-9-6
***************************************************************************/
function openRowPrint(){
	//根据联合主键查询该条记录
	var evalstr = '';
	var keyGridRowA = keyGridRow.split(",");
	for(var i = 0 ; i <keyGridRowA.length;i++){
		if(arguments[i+1]!='undefined'){
			evalstr +="&"+keyGridRowA[i]+"="+ encodeURIComponent(cjkEncode(arguments[i+1]));
		}
	}
	
	var menuid=$("#imenuid").val();
	var userid= $("#useridd").val();
	var groupid = $("#zid").val();
	groupid=groupid.replace(new RegExp("~","g"),",");
	var userdept= $("#departname").val();
	var managearea = $("#managearea").val();
	evalstr += "&managearea=" + managearea;
	printThisReport1(menuid,'Row',evalstr,userid,groupid,userdept,1);
}
/**********************************************************
				function name:   queryByID(whereinfo)
				function:		 根据关键字取出一条信息，详细记录
				parameters:      
								 whereinfo：条件
								 jsonid: 存放json的域id
								 prefixkey ： prefix前缀
								 suffixWkey ： suffixW标签后缀
								 isRelatedInfokey : isRelatedInfo 被关联字段的信息 数组1：字段名  数组2：单选复选值  数组3：数据字典保存起来  数组4：多选分隔符
				return:			 
				description:     根据关键字取出一条信息，详细记录
				Date:				2010-9-7 
********************************************************/
function queryByID(whereinfo,jsonid,prefixkey,suffixWkey,isRelatedInfokey,relatedInfokey,isRelateValkey){  
		 		
 		var urlstr=tsd.buildParams({ 
							  packgname:'service',//java包
							  clsname:'ExecuteSql',//类名
							  method:'exeSqlData',//方法名
							  ds:dataSource,//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
							  tsdcf:tsdcf,//指向配置文件名称
							  tsdoper:'query',//操作类型
							  datatype:'xmlattr',//返回数据格式
							  tsdpk:'publicmode.queryByKey'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
		});
									
		$.ajax({
			url:'mainServlet.html?'+urlstr+whereinfo+'&tablename='+tablename,
			datatype:'xml',
			cache:false,//如果值变化可能性比较大 一定要将缓存设成false
			timeout: 1000,
			async: false ,//同步方式
			success:function(xml){
				
				
				//只有 url参数中 datatype="xmlattr"时才可以这样通过属性取值
				$(xml).find('row').each(function(){
					//用于存放本条记录
					//var oldstr=[];
					logoldA=[];
					//$(this).attr(参数) 参数对应的数据库中的列名 默认小写
					///如果sql语句中指定列名 则按指定名称给参数
					
					//从别名表中获取到的字段信息
				 	var jsonstr = $("#"+jsonid).val();
					//json解析方式
					var obj = eval('(' + jsonstr + ')');
					for(var i=0;i<obj.rows.length;i++){	
						
						var fieldnamestr = prefixkey+obj.rows[i].field_name+suffixWkey;
						var keyname =  $(this).attr(obj.rows[i].field_name.toLowerCase());
						
						if(keyname != undefined){
							
						}
						if(obj.rows[i].selecttype>10){//多选框值处理
							var mulselectoper = obj.rows[i].mulselectoper;
							var arr = keyname.split(mulselectoper);
							for(var j=0;j<arr.length;j++){
								//将复选框中应被选中的选项设置为选中
								$("[name='"+fieldnamestr+"']").each(function(){
									if($(this).val()==arr[j]){
										$(this).attr("checked","checked");
										if(j==arr.length-1){
											$(this).click();
											$(this).attr("checked","checked");
										}			
									}
								}) ;
							}
						} else{//非多选框值处理
							$("#"+fieldnamestr).val(keyname);							
						}
						logoldA.push(keyname);
					}
					//将被关联的字的val值保存起来
					for(var key in isRelatedInfokey){
							var strval = $(this).attr(key.toLowerCase());
							isRelateValkey[key]=new Array();
							isRelateValkey[key][0]=strval;							
					}
					$("#logoldstr").val(logoldA);
					//showRelatedInfo();//显示被级联的值
					showRelatedInfo(prefixkey,suffixWkey,isRelatedInfokey,relatedInfokey,isRelateValkey);
				});
			}
		});
}


/*******************************************************
				function name:   saveObj(saves)
				function:		 添加操作  
				parameters:      saves: 0保存新增 1保存退出
				return:			 
				description:     添加操作 
				Date:				2010-9-7 
********************************************************/
function saveObj(saves){		
		//通过表单值构造数据操作参数
		var params=saveBuildParams();		
		if(params==false){return false;}
		
		
		var Uniflag = UniqueGroupExist();
		if(Uniflag== true){ return ;}
		/************************
			判断关键是否重复
		************************/
		 var flag = KeyWordUnique(1);
		 if(flag==true){return false;}			
			/***************************
			*    判断完成，进行保存操作   *
			***************************/	
			var urlstr=tsd.buildParams({  
										packgname:'service',//java包
										clsname:'ExecuteSql',//类名
										method:'exeSqlData',//方法名
										ds:dataSource,//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
										tsdcf:tsdcf,//指向配置文件名称
										tsdoper:'exe',//操作类型
										datatype:'xml',//返回数据格式
										tsdpk:'publicmode.save'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
			});
			urlstr+="&tablename="+tablename+'&saveinfo='+params;
			//此处的url参数主要修改tsdpname（对应存储过程的名称）、tsdExeType(操作类型)
			$.ajax({
			url:'mainServlet.html?'+urlstr,
			cache:false,//如果值变化可能性比较大 一定要将缓存设成false
			timeout: 1000,
			async: false ,//同步方式
				success:function(msg){
					if(msg=="true"){
						
						var successful = $("#successful").val();
						alert(successful);						
						
						//写入日志操作						
						//transferApos()去掉字符串的'号，等特殊字符
						logwrite(1,transferApos($("#LogContentS").val()),'');		
					
						if(saves==2){
							fuheQuery();
							/****
							$("#editgrid").trigger("reloadGrid");
							//字段求和计算
							var paramsSum = fuheQbuildParams();
							SumFiledS(g_ifSum,paramsSum);
							setTimeout($.unblockUI, 0);//关闭面板		
							****/					
						}else{
							closeflash=true;//表示关闭时需要刷新
							clearText('operformT1');
							clearMultiSelect();//清空多选下拉框
						}		
					}
				}
			});				
}


 /**
 * 修改面板中，修改按钮操作
 * @param
 * @return 
 */
function modifyObj(){
		 var params = modifyBuildParams(1);//修改面板参数拼接
		 if(params==false){return false;}
		 
		 //判断不可重复的字段是否满足条件
		 var Uniflag = UniqueGroupExist();
		 if(Uniflag== true){ return ;}
		 //修改时判断关键字是否已经存在
		 var flag = KeyWordUnique(2);
		 if(flag==true){return false;}	
		 var modifywhere = $("#modifywhere").val();	
		 var urlstr=tsd.buildParams({     packgname:'service',//java包
										  clsname:'ExecuteSql',//类名
										  method:'exeSqlData',//方法名
										  ds:dataSource,//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
										  tsdcf:tsdcf,//指向配置文件名称
										  tsdoper:'exe',//操作类型 
										  datatype:'xml',//返回数据格式 
										  tsdpk:'publicmode.modify'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
		});
	
		$.ajax({
			url:'mainServlet.html?'+urlstr +params + '&tablename='+tablename+"&whereinfo="+modifywhere,
			cache:false,//如果值变化可能性比较大 一定要将缓存设成false
			timeout: 1000,
			async: false ,//同步方式
			success:function(msg){
				if(msg=="true"){
					//操作提示国际化 操作成功
					var successful = $("#successful").val();
					alert(successful);		
					
					setTimeout($.unblockUI, 0);//释放资源
					$("#editgrid").trigger("reloadGrid");//更新jqgrid
					//字段求和计算
					var paramsSum = fuheQbuildParams();
					SumFiledS(g_ifSum,paramsSum);
					
					//写入日志操作
					var whereinfoStr = params.split("&logcondition=");
					//transferApos()去掉字符串的'号，等特殊字符
					logwrite(3,transferApos($("#LogContentS").val()),transferApos(whereinfoStr[1]));				
				}	
			}
		});
}


 /**
 * 删除指定的记录
 * @param
 * @return 
 */
function deleteRow(){
		/**
		//对菜单的特殊判断 返回 true 有修改功能			
		var menuPar = menuParticular(arguments);
		if(menuPar == false){return ;}
		*/
					 	 	
	 	//是否有执行删除的权限 			 
		var deleteright = $("#deleteright").val();
		if(deleteright=="true"){	
		 	var deleteinformation = $("#deleteinformation").val();			
			if(confirm(deleteinformation)){
				
					//根据联合主键查询该条记录
					var len = arguments.length;
					var keyparams = keyWhereS;
					if(len>1){
						for(var i=1;i<len;i++){
							//从删除按钮处获取参数arguments的第二个参数开始，给查询调价赋值
							keyparams = keyparams.replace('key'+i,tsd.encodeURIComponent(arguments[i]));
						}			
					}
					var whereinfo = "&whereinfo="+keyparams;					
					//queryByID(whereinfo);
					
					//删除前特殊验证：1为进行验证 ；否则为不进行验证
					if(delspecial=='1'){
					
							var urlMm = tsd.buildParams({ 	packgname:'service',
															clsname:'Procedure',//类名
															method:'exequery',//方法名
															ds:dataSource,
															tsdExeType:'query',//操作类型 
															datatype:'xmlattr',//返回数据格式 
															tsdpname:'pub.delspecial'
														});
							var userid = $("#useridd").val();
							var keystrinfo =keyparams.replace(new RegExp("=","g"),"~-");
							var params = "&tablename="+tablename+"&flag="+codeinfo+"&pub_userid="+userid+"&whereinfo="+keystrinfo;														
							//var params = "&tablename=tbl_cardno&flag=1&pub_userid=yhy&cpassword=q";
							$.ajax({
								url:"mainServlet.html?" + urlMm + params,
								async:false,
								cache:false,
								timeout:1000,
								type:'post',
								success:function(xml){
									$(xml).find("row").each(function(){
										
											var res = $(this).attr("res");
											var tag = $(this).attr("tag");
											if(res=='SUCCEED'){
												var successful = $("#successful").val();
												alert(successful);
												
												setTimeout($.unblockUI, 0);
												$("#editgrid").trigger("reloadGrid");	
												//字段求和计算
												var paramsSum = fuheQbuildParams();
												SumFiledS(g_ifSum,paramsSum);											
												
												//写入日志操作
												logwrite(2,'',transferApos(keyparams));	
											}else{
												alert(tag);
											}										
									});
								}
							});
					}else{
							var urlstr=tsd.buildParams({  packgname:'service',//java包
														  clsname:'ExecuteSql',//类名
														  method:'exeSqlData',//方法名
														  ds:dataSource,//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
														  tsdcf:tsdcf,//指向配置文件名称
														  tsdoper:'exe',//操作类型 
														  datatype:'xml',//返回数据格式 
														  tsdpk:'publicmode.delete'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
														});
							var urlstr='mainServlet.html?'+urlstr+'&tablename='+tablename+whereinfo; 
							$.ajax({
								url:urlstr,
								cache:false,//如果值变化可能性比较大 一定要将缓存设成false
								timeout: 1000,
								async: false ,//同步方式
								success:function(msg){
									if(msg=="true"){
										var successful = $("#successful").val();
										alert(successful);
										setTimeout($.unblockUI, 0);
										$("#editgrid").trigger("reloadGrid");
										
										//字段求和计算
										var paramsSum = fuheQbuildParams();
										SumFiledS(g_ifSum,paramsSum);
												
										//写入日志操作
										logwrite(2,'',transferApos(keyparams));	
									}
								}
							});	
					}
			}					
		}
		else{
			var deletepower = $("#deletepower").val();
			alert(deletepower);
		}
}		

/**********************************************************
				function name:    fuheExe()
				function:		  公共查询模块接口，判断当前的查询方式
				parameters:      
				return:			 
				description:      
				Date:				2010-9-7 
********************************************************/
function fuheExe()
{
		var queryName= document.getElementById("queryName").value;
		if(queryName=="delete")
		{
			fuheDel();
		}
		else if(queryName=="modify")
		{
			fuheOpenModify();
		}
		else
		{
			fuheQuery();
		}
}


/**********************************************************
				function name:    fuheQuery()
				function:		  高级查询方法，获取通用查询模块生成的sql语句进行查询，更新jqgrid
				parameters:       
				return:			  
				description:      
				Date:				2010-9-7 
********************************************************/
function fuheQuery()
{
		var params = fuheQbuildParams();			
		if(params=='&fusearchsql='){
			params +='1=1';
		}	
				
	 	//此处的url参数主要修改tsdpname（对应存储过程的名称）、tsdExeType(操作类型)			 	
	 	var urlstr1=tsd.buildParams({  packgname:'service',//java包
									  clsname:'ExecuteSql',//类名
									  method:'exeSqlData',//方法名
									  ds:dataSource,//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
									  tsdcf:tsdcf,//指向配置文件名称
									  tsdoper:'query',//操作类型 
									  datatype:'xml',//返回数据格式 
									  tsdpk:'publicmode.fuheQueryByWhere',//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
									  tsdpkpagesql:'publicmode.fuheQueryByWherepage'
									});
		var column = $("#ziduansF").val();	
		var link = urlstr1 + params+"&tablename="+tablename+keyQueryS+"&tablenameleft="+tablenameleft+"&column="+column+"&initialization="+initialization;
		$("#editgrid").setGridParam({url:'mainServlet.html?'+link}).trigger("reloadGrid");
		SumFiledS(g_ifSum,params);
		clearText('operformT1');
		clearMultiSelect();//清空多选下拉框
	 	setTimeout($.unblockUI, 0);//关闭面板
}


/**********************************************************
				function name:    fuheModify()
				function:		  通过复合批量修改对象
				parameters:       
				return:			  
				description:     
				Date:				2010-9-7 
********************************************************/
function fuheModify()
{
		var mparams =modifyBuildParams(2);//获取修改字段信息
		if(mparams==false){return false; setTimeout($.unblockUI, 0); }
		var params = fuheQbuildParams();
		if(params==false){return false;}
		params += mparams;
		var urlstr=tsd.buildParams({  packgname:'service',//java包
									  clsname:'ExecuteSql',//类名
									  method:'exeSqlData',//方法名
									  ds:dataSource,//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
									  tsdcf:tsdcf,//指向配置文件名称
									  tsdoper:'exe',//操作类型 
									  datatype:'xml',//返回数据格式 
									  tsdpk:'publicmode.fuheModifyBy'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
									});
	 	urlstr+=params;
		$.ajax({
			url:'mainServlet.html?'+urlstr +"&tablename="+ tablename+"&initialization="+initialization ,
			cache:false,//如果值变化可能性比较大 一定要将缓存设成false
			timeout: 1000,
			async: false ,//同步方式
			success:function(msg){
				if(msg=="true"){
					var successful = $("#successful").val();
					alert(successful);
					fuheQuery();
					
					//写入日志操作
					var context ="UPDATE "+tablename+" "+ transferApos($("#BatchEditLog").val())+" where "+transferApos($("#fusearchsql").val());
					logwrite(5,"",context);					
				}	
			}
		});				
}


 /**
 * 复合查询的批量删除操作 
 * @param
 * @return 
 */
function fuheDel(){
		var deleteinformation = $("#deleteinformation").val();		
		if(confirm(deleteinformation)){		
		
				if(delspecial=='1'){
					
							var urlMm = tsd.buildParams({ 	packgname:'service',
															clsname:'Procedure',//类名
															method:'exequery',//方法名
															ds:dataSource,
															tsdExeType:'query',//操作类型 
															datatype:'xmlattr',//返回数据格式 
															tsdpname:'pub.delspecial'
														});
														
							var userid = $("#useridd").val();
							var fusearchsql = $("#fusearchsql").val();//删除条件  
							var keystrinfo =fusearchsql.replace(new RegExp("=","g"),"~-");
							var params = "&tablename="+tablename+"&flag="+codeinfo+"&pub_userid="+userid+"&whereinfo="+keystrinfo;	
																
							//var params = "&tablename=tbl_cardno&flag=1&pub_userid=yhy&cpassword=q";
							$.ajax({
								url:"mainServlet.html?" + urlMm + params,
								async:false,
								cache:false,
								timeout:1000,
								type:'post',
								success:function(xml){
									$(xml).find("row").each(function(){
										
											var res = $(this).attr("res");
											var tag = $(this).attr("tag");
											if(res=='SUCCEED'){
												var successful = $("#successful").val();
												alert(successful);
												setTimeout($.unblockUI, 0);	
												
												
												var fusearchsqlstr	=$("#fusearchsql").val();
												$("#fusearchsql").val("");
												
												//刷新jqgrid	 显示表中所有数据
												fuheQuery();
												/*******		
												$("#editgrid").trigger("reloadGrid");
												//字段求和计算
												var paramsSum = fuheQbuildParams();
												SumFiledS(g_ifSum,paramsSum);
												******/	
												//写入日志操作
												var conttext = 'DELETE FROM '+tablename+' where '+transferApos(fusearchsqlstr);
												logwrite(4,"",conttext);
											}else{
												alert(tag);
											}										
									});
								}
							});
				}
				else{
								
		 			var params = fuheQbuildParams();//删除条件
		 									    
			 		//此处的url参数主要修改tsdpname（对应存储过程的名称）、tsdExeType(操作类型)			 	
				 	var urlstr1=tsd.buildParams({  packgname:'service',//java包
												  clsname:'ExecuteSql',//类名
												  method:'exeSqlData',//方法名
												  ds:dataSource,//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
												  tsdcf:tsdcf,//指向配置文件名称
												  tsdoper:'exe',//操作类型 
												  datatype:'xml',//返回数据格式 
												  tsdpk:'publicmode.fuheDeleteBy'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
												});
					var link='mainServlet.html?'+urlstr1+params+'&tablename='+tablename+'&initialization='+initialization; 
				 	$.ajax({
							url:link,
							cache:false,//如果值变化可能性比较大 一定要将缓存设成false
							timeout: 1000,
							async: false ,//同步方式
							success:function(msg){
								if(msg=="true"){								
									var successful = $("#successful").val();									
									alert(successful);											
									setTimeout($.unblockUI, 0);															
									
									//刷新jqgrid
									var fusearchsqlstr	=$("#fusearchsql").val();	
									$("#fusearchsql").val("");
									//刷新jqgrid	 显示表中所有数据
									fuheQuery();
									/**********************
									$("#editgrid").trigger("reloadGrid");
									//字段求和计算
									var paramsSum = fuheQbuildParams();
									SumFiledS(g_ifSum,paramsSum);
									**********************/
									
									//写入日志操作
									var conttext = 'DELETE FROM '+tablename+' where '+transferApos(fusearchsqlstr);
									logwrite(4,"",conttext);																
								}	
							}
						});
					}
			}		
}
 
/**********************************************************
				function name:   zhOrderExe(sqlstr)
				function:		 执行组合排序
				parameters:      sqlstr：排序sql子字符串
				return:			 
				description:     公用模块的组合排序
				Date:				2010-9-7 
********************************************************/
function zhOrderExe(sqlstr){
		var params = fuheQbuildParams();				
		if(params=='&fusearchsql='){
			params +='1=1';
		}
		var paramsinfo =params+'&orderby='+sqlstr;	
		var column = $("#ziduansF").val();			    
	 	//此处的url参数主要修改tsdpname（对应存储过程的名称）、tsdExeType(操作类型)			 	
	 	var urlstr1=tsd.buildParams({  packgname:'service',//java包
									  clsname:'ExecuteSql',//类名
									  method:'exeSqlData',//方法名
									  ds:dataSource,//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
									  tsdcf:tsdcf,//指向配置文件名称
									  tsdoper:'query',//操作类型 
									  datatype:'xml',//返回数据格式 
									  tsdpk:'publicmode.queryByOrder',//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
									  tsdpkpagesql:'publicmode.queryByOrderpage'
									});
		var link = urlstr1 + paramsinfo+'&tablename='+tablename+keyQueryS+"&tablenameleft="+tablenameleft+"&initialization="+initialization;						
	 	$("#editgrid").setGridParam({url:'mainServlet.html?'+link+'&column='+column}).trigger("reloadGrid");
	 	//字段求和计算
		//SumFiledS(g_ifSum,params);
	 	//jAlert("操作成功","操作提示");
		setTimeout($.unblockUI, 0);
}


/**********************************************************
				function name:   openadd()
				function:		 打开保存面板
				parameters:      
				return:			 
				description:     打开保存面板
				Date:				2010-9-7 
********************************************************/
function openadd(){
		creatPanAdd();//判断是否要生成面板
	 	markTable(0);//显示红色*号
	 	$(".top_03").html($("#addinfo").val());//标题

		openpan();
		$("#save").show();
	 	$("#readd").show();
		clearText('operformT1');
		clearMultiSelect();//清空多选下拉框
		keyWordRemoveDisabled(keyGridRow,prefix,suffixW);//将关键字标签值为可用
}
 /**
 * 根据菜单id ，对菜单进行特殊验证，
 	满足条件返回true，不满足返回false
 * @param params:验证参数
 * @return  boolean ： true：有修改功能  false：没有修改功能
 */
function menuParticular(){
	
	//根据联合主键查询该条记录
	var len = arguments[0].length;
	//菜单id
	var imenuid = $("#imenuid").val();
	if(len>1){	
		//判断该菜单是不是“权限组管理菜单”，如果是判断改权限组是不是为系统权限组
			//（即权限组名为‘dataadministrators’或‘administrators’，是的话不允许修改或删除）
		if(imenuid==2302){
			if(arguments[0][2]=='dataadministrators' || arguments[0][2]=='administrators'){
				var ChiefPowerGroup = $("#ChiefPowerGroup").val();
				alert(ChiefPowerGroup);
				return false;
			}
		}
		else{
			return true;
		}
	}
	else{
		return true;
	}
}
 /**
 * 打开修改面板
 * @param
 * @return 
 */
function openRowModify(){
		/**
		//对菜单的特殊判断 返回 true 有修改功能			
		var menuPar = menuParticular(arguments);
		if(menuPar == false){return ;}	
		*/						
		var editright = $("#editright").val();
		if(editright=="true"){				
				
				creatPanAdd();//判断是否要生成面板
				markTable(0);//显示红色*号
				var editinfo = $("#editinfo").val();
			 	$(".top_03").html(editinfo);//设置编辑框的标题	 	
				openpan();//打开面板
				$("#modify").show();$("#reset").show();
				clearText('operformT1');
				clearMultiSelect();//清空多选下拉框
				
				//根据联合主键查询该条记录
				var len = arguments.length;
				var keyparams = keyWhereS;
				if(len>1){
					for(var i=1;i<len;i++){
						keyparams = keyparams.replace('key'+i,tsd.encodeURIComponent(arguments[i]));
					}					
				}
				var whereinfo = "&whereinfo="+keyparams;
				$("#modifywhere").val(keyparams);
				//设置修改面板的初始值
				queryByID(whereinfo,"fieldjsoninfo",prefix,suffixW,isRelatedInfo,relatedInfo,isRelateVal);
				
				$("#modifyreset").val(whereinfo);	//将查询该条记录的条件写入隐藏域，作为面板的取消按钮条件			
				keyWordDisabled(keyGridRow,prefix,suffixW);//设置主键为不可编辑	
				
				//2011-5-3根据可编辑域 中的字段将可编辑的主键域置为可修改状态
				var modifyfields = $("#editfields").val();
				modifyfields =modifyfields.substr(0,modifyfields.length-1);//去掉最后的逗号
				keyWordRemoveDisabled(modifyfields,prefix,suffixW);//根据权限页面设置的可编辑字段，将字段置为可编辑				
		}
		else{
				alert($("#editpower").val());//提示没有修改权限
		}
}


 /**
 * 打开批量修改面板
 * @param
 * @return 
 */
function fuheOpenModify()
{			
		creatPanAdd();//判断是否要生成面板
		markTable(1);//隐藏红色*号
	 	$(".top_03").html($("#modifybinfo").val());//标题		 	
		openpan();
		$("#modifyB").show();
		clearText('operformT1');
		clearMultiSelect();///清空多选下拉框
		keyWordDisabled(keyGridRow,prefix,suffixW);	//设置主键为不可编辑
}


/**********************************************************
				function name:   saveBuildParams()
				function:		 通过表单值构造数据操作参数
				parameters:      
				return:			 
				description:      请根据业务参数的多少和属性进行修改
				@oper 操作类型 modify|save
				Date:				2010-9-7 
********************************************************/
function saveBuildParams(){
 	//每次拼接参数必须初始化此参数
	tsd.QualifiedVal=true;				
 	var params='';
 	var savefield = '('; //存放保存数据的前半部分
 	var savevalue = '('; //存放保存数据的后半部分
 	var logstr = '';//用于存放拼接写入日志的字符串
 	
 	//从别名表中获取到的字段信息
 	var jsonstr = $("#fieldjsoninfo").val();
	//json解析方式
	var obj = eval('(' + jsonstr + ')');
	
	for(var i=0;i<obj.rows.length;i++){	
		if(obj.rows[i].keytype==3){
			
		}else{
			var fieldname = obj.rows[i].field_name;	//表的字段名		
			var fieldvalue ='';//字段值
			var selecttype = obj.rows[i].selecttype;
			
			//字段输入值的获取，多选框获取方式和其他的不一样
			if(selecttype>10){//多选框值获取
				//fieldvalue = $('#check'+prefix+fieldname+suffixW).val();
				var multistr='';
				var mulselectoper = obj.rows[i].mulselectoper;
				$("[name='"+prefix+fieldname+suffixW+"'][checked]").each(function(){
					multistr +=$(this).val()+mulselectoper;				
				}) ; 
				var len = multistr.lastIndexOf(mulselectoper);
				if(len>0){multistr = multistr.substr(0,len);}
				fieldvalue = multistr;			
			}
			else{//非多选框的值获取
				fieldvalue = $("#"+prefix+fieldname+suffixW).val();			
			}
			
			//对象输入框左右空格,选择宽和日期类型不需要去空格
			if(selecttype==0&&obj.rows[i].datatype!='dtdatetime' ){
				fieldvalue= fieldvalue.replace(/(^\s*)|(\s*$)/g,"");
			}
			
			//如果文本框的值为null，则值为'';对于多选框，显示值为Select options，则其值为空
	 		if(fieldvalue=='null' || (fieldvalue=='Select options' && selecttype>10)){
	 			fieldvalue='';
	 		}
				
			
				//对必填项进行验证
				if(obj.rows[i].keytype==1 || obj.rows[i].keytype==2){//1为关键字 2为必填项
					if(fieldvalue==''){
						var str=$("#"+prefix+fieldname+suffixN).html();
						var inputinfo =$("#inputAlarmInfo").val();
						alert(inputinfo+str);
						$("#"+prefix+fieldname+suffixW).focus();
						return false;
					}
				}
				
			//当插入值为空的时候，不把该字段放到插入语句中
			if(fieldvalue!=''){	
				//数据类型 控制可输入字符
				if(obj.rows[i].datatype=='dtInteger' || obj.rows[i].datatype=='int'
				|| obj.rows[i].datatype=='dtDouble'){
				
					//只允许输入数值型字符	
					if(fieldvalue==''){				
		 				//params+="&"+fieldname+"=0";
		 				savevalue +=0;
		 			}else{
		 				savevalue +=fieldvalue;
		 				//params+="&"+fieldname+"="+fieldvalue;
		 			}			
				}		
				else if(obj.rows[i].datatype=='dtdatetime'){//加入日期控件
				
					if(fieldvalue==''){					
						savevalue +="to_date(\'1990-01-01 00:00:00\',\'YYYY-MM-DD HH24:MI:SS\')";
		 				//params+="&"+fieldname+"=";
		 			}
		 			else{	 				
		 				savevalue +="to_date(\'"+fieldvalue+"\',\'YYYY-MM-DD HH24:MI:SS\')";
		 				//params+="&"+fieldname+"="+tsd.encodeURIComponent(fieldvalue);
		 			}
				}
				else {							
					if(obj.rows[i].inputtype=='2'){//只允许输入数值型字符	
						if(fieldvalue==''){
							savevalue += "\'0\'";
			 				//params+="&"+fieldname+"=0";
			 			}else{
			 				savevalue += "'"+fieldvalue + "'";
			 				//params+="&"+fieldname+"="+fieldvalue;
			 			}					
					}
					else{//允许输入任何字符串
						if(fieldvalue==''){
			 				//params+="&"+fieldname+"=";
			 				savevalue +="\'\'";
			 			}
			 			else{
			 				savevalue += "'"+tsd.encodeURIComponent(fieldvalue)+"'";
			 				//params+="&"+fieldname+"="+tsd.encodeURIComponent(fieldvalue);
			 			}					
					}
				}
				
			
				savefield += fieldname;//增加添加字段名
				if(logstr.split(";").length<=6){
					logstr += $("#"+prefix+fieldname+suffixN).html()+" : "+fieldvalue+"; ";	//拼接写入日志字符串
				}
				savefield +=',';
				savevalue +=',';
			}
							
		}
	}
	
	//把要写入日志的字符串放入隐藏域
	$("#LogContentS").val(logstr);
	
	//去掉savevalue  savefield 尾巴处，号
	var len1 = savefield.lastIndexOf(',');
	if(len1>0){savefield = savefield.substr(0,len1);}
	
	var len2 = savevalue.lastIndexOf(',');
	if(len2>0){savevalue = savevalue.substr(0,len2);}	
	
	savefield+=')';
	savevalue+=')';
	params = savefield + " VALUES " + savevalue;	
	
	//每次拼接参数必须添加此判断
	if(tsd.Qualified()==false){return false;}
	return params;
}


/**********************************************************
				function name:   modifyBuildParams(type)
				function:		 修改面板参数拼接
				parameters:      type : 1修改单条记录 2 批量修改
				return:			 
				description:      请根据业务参数的多少和属性进行修改
				@oper 操作类型 modify|save
				Date:				2010-9-7 
********************************************************/
function modifyBuildParams(type){
 	//每次拼接参数必须初始化此参数
	tsd.QualifiedVal=true;				
 	var params='';
 	
 	var modifyfield = ' set '; //存放修改数据的前半部分sql
 	var modifykey = ' '; //存放修改数据的后半部分sql
 	var logcondition = ' '; //日志修改条件
 	var logstr = '';//写入日志串
 	//var logoldstr = $("#logoldstr").val();
 	//logoldA = logoldstr.split(",");

 	//从别名表中获取到的字段信息
 	var jsonstr = $("#fieldjsoninfo").val();
	//json解析方式
	var obj = eval('(' + jsonstr + ')');
	
	for(var i=0;i<obj.rows.length;i++){	
				
				var temporary = '';//字段和修改值的临时记录
				var templog = '';//用于写入日志 字段和修改值的临时记录
				var fieldname = obj.rows[i].field_name;	//表的字段名		
				var fieldvalue ='';//字段值
				var selecttype = obj.rows[i].selecttype;
				
				//字段输入值的获取，多选框获取方式和其他的不一样
				if(selecttype>10){//多选框值获取
					//fieldvalue = $('#check'+prefix+fieldname+suffixW).val();
					var mulselectoper = obj.rows[i].mulselectoper;
					var multistr='';	
					$("[name='"+prefix+fieldname+suffixW+"'][checked]").each(function(){
						multistr +=$(this).val()+mulselectoper;			
							
					}) ; 
					var len = multistr.lastIndexOf(mulselectoper);
					if(len>0){multistr = multistr.substr(0,len);}
					fieldvalue = multistr;					
				}
				else{//非多选框的值获取
					fieldvalue = $("#"+prefix+fieldname+suffixW).val();			
				}
				
				//对象输入框左右空格,选择宽和日期类型不需要去空格
				if(selecttype==0&&obj.rows[i].datatype!='dtdatetime' && obj.rows[i].keytype!=3 ){
					fieldvalue= fieldvalue.replace(/(^\s*)|(\s*$)/g,"");
				}
				
				//如果文本框的值为null，则值为'';对于多选框，显示值为Select options，则其值为空
		 		if(fieldvalue=='null' || (fieldvalue=='Select options' && selecttype>10)){
		 			fieldvalue='';
		 		}
						
				if(type==1){ //更新一条记录
					//对必填项进行验证
					if(obj.rows[i].keytype==1 || obj.rows[i].keytype==2){//1为关键字 2为必填项
						if(fieldvalue==''){
							var str=$("#"+prefix+fieldname+suffixN).html();
							var inputinfo =$("#inputAlarmInfo").val();
							alert(inputinfo+str);
							$("#"+prefix+fieldname+suffixW).focus();
							return false;
						}
					}
					
					//数据类型 控制可输入字符
					if(obj.rows[i].datatype=='dtInteger' || obj.rows[i].datatype=='int'
					|| obj.rows[i].datatype=='dtDouble'){
					
						//只允许输入数值型字符	
						if(fieldvalue!=''){	
			 				temporary=fieldname+"="+fieldvalue;
			 				templog = fieldname+"="+fieldvalue;
			 			}else{
			 				temporary=fieldname+"=0";
			 				templog = fieldname+"=0";
			 			}
					}		
					else if(obj.rows[i].datatype=='dtdatetime'){//加入日期控件
					
						if(fieldvalue!=''){
							temporary= fieldname+"=to_date(\'"+fieldvalue+"\',\'YYYY-MM-DD HH24:MI:SS\') ";
							templog = fieldname+"=to_date(\'"+fieldvalue+"\',\'YYYY-MM-DD HH24:MI:SS\') ";	
			 			}else{
			 				//2012-8-24 yhy star
			 				//日期为空的时候，set a=''报错，更新为set a=null
			 				temporary= fieldname+"=null"; 
			 				//2012-8-24 yhy end
			 				templog = fieldname+"=''"; 
			 			}
					}
					else {	
						if(fieldvalue!=''){	
				 				temporary= fieldname+"='"+tsd.encodeURIComponent(fieldvalue)+"'"; 
				 				templog = fieldname+"='"+fieldvalue+"'"; 	
				 		}else {
				 			if(obj.rows[i].inputtype=='2'){//只允许输入数值型字符
				 			
				 				temporary= fieldname+"='0'";
				 				templog = fieldname+"='0'";
				 			}
				 			else{							//允许输入任何字符串
				 			
				 				temporary= fieldname+"=''"; 
				 				templog = fieldname+"=''";
				 			}
				 		}						
					}
					
					if(temporary!=''){	
						//	拼接关键字用于	进行唯一性判断
						if(obj.rows[i].keytype==1||obj.rows[i].keytype==3){//是关键字添加到
							modifykey += temporary+" and ";		
							logcondition += templog+" and ";					
						}
						//alert("fieldname:"+fieldname+"----logoldA[i]:"+logoldA[i]+"----fieldvalue:"+fieldvalue);
						//拼接需要修改的字段值
						if(logoldA[i] != fieldvalue){
							modifyfield += temporary+" , ";
							logstr += $("#"+prefix+fieldname+suffixN).html()+" : "+fieldvalue+"; ";
						}
						
					}
				}else{//更新全部记录
					  //数据类型 控制可输入字符
					if(obj.rows[i].datatype=='dtInteger' || obj.rows[i].datatype=='int'
					|| obj.rows[i].datatype=='dtDouble'){
					
						//只允许输入数值型字符	
						if(fieldvalue!=''){	
			 				temporary=fieldname+"="+fieldvalue;
			 			}			
					}		
					else if(obj.rows[i].datatype=='dtdatetime'){//加入日期控件
					
						if(fieldvalue!=''){
							temporary= fieldname+"=to_date(\'"+fieldvalue+"\',\'YYYY-MM-DD HH24:MI:SS\') ";
			 				//temporary= fieldname+"='"+tsd.encodeURIComponent(fieldvalue)+"'"; 				
			 			}
					}
					else {	
						if(fieldvalue!=''){
							if(obj.rows[i].inputtype=='2'){//只允许输入数值型字符
								temporary= fieldname+"='"+tsd.encodeURIComponent(fieldvalue)+"'"; 
							}else{							//允许输入任何字符串
								temporary= fieldname+"='"+tsd.encodeURIComponent(fieldvalue)+"'"; 
							}
						}				 		
					}
					
					
					if(temporary!=''){		
						if(obj.rows[i].keytype==1||obj.rows[i].keytype==3){//是关键字添加到
							//modifykey += temporary+" and ";
						}
						else{		
							modifyfield += temporary+" ,";
							logstr += $("#"+prefix+fieldname+suffixN).html()+" : "+fieldvalue+"; ";	
																			
						}	
					}	
				}
	}
	//把要写入日志的字符串放入隐藏域 
	$("#LogContentS").val(logstr);
	
	
	//处理拼接字符串的最后一个, 或 and
	modifykey+=' 1=1';	
	logcondition += ' 1=1';
	var len = modifyfield.lastIndexOf(',');
	modifyfield = modifyfield.substr(0,len);
	
	if(modifyfield==''){
		var inputModifyField = $("#inputModifyField").val();
		alert(inputModifyField);
		return false;
	}
	//params = "&modifySet="+modifyfield+"&whereinfo="+modifykey+"&logcondition="+ logcondition;
	params = "&modifySet="+modifyfield+"&logcondition="+ logcondition;
	$("#BatchEditLog").val(modifyfield);
		 	
	//每次拼接参数必须添加此判断
	if(tsd.Qualified()==false){return false;}
	return params;
}

/**********************************************************
				function name:    fuheQbuildParams()
				function:		  复合查询参数获取
				parameters:       
				return:			  
				description:      
				Date:				2010-9-7 
********************************************************/
function fuheQbuildParams(){
	 	//每次拼接参数必须初始化此参数
		tsd.QualifiedVal=true;
	 	var params='';
	 	
	 	//如果有可能值是汉字 请使用encodeURI()函数转码
	 	var fusearchsql = encodeURIComponent($("#fusearchsql").val());		 	
	 	params+='&fusearchsql='+fusearchsql;
	 			 	
	 	//注意：不要在此做空的判断 即使为空 也必须放入请求中			 	
	 	//每次拼接参数必须添加此判断
		if(tsd.Qualified()==false){return false;}
		return params;
}

/**********************************************************
		function name:   closeoXX()
		function:		 关闭详细信息表格面板
		parameters:      
		return:			 
		description:     关闭详细信息表格面板
		Date:				2010-9-26 
********************************************************/
function closeoXX(){
		clearText('operformTX');
		clearMultiSelect();//清空多选下拉框
		setTimeout($.unblockUI, 0);//关闭面板		
}
/**********************************************************
				function name:   openpanXX()
				function:		  打开详细信息表格面板
				parameters:      
				return:			 
				description:     打开详细信息表格面板
				Date:				2010-9-7 
********************************************************/
function openpanXX(){		
		autoBlockFormAndSetWH('panX',60,5,'closeoX',"#ffffff",false,1000,'');//弹出查询面板		
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
		if(closeflash){
				fuheQuery();
				/**
		 		 closeflash=false;
		 		 $("#editgrid").trigger("reloadGrid");
		 		 SumFiledS(g_ifSum);
		 		**/	 		 
		 }
		clearText('operformT1');
		clearMultiSelect();//清空多选下拉框
		setTimeout($.unblockUI, 0);//关闭面板		
}


/**********************************************************
				function name:   openpan()
				function:		  打开表格面板
				parameters:      
				return:			 
				description:     打开表格面板
				Date:				2010-9-7 
********************************************************/
function openpan(){		
		autoBlockFormAndSetWH('pan',60,5,'closeo',"#ffffff",false,1000,'');//弹出查询面板		
		$("#modifyB").hide();
		$("#readd").hide();
		$("#save").hide();
		$("#modify").hide();
		$("#reset").hide();
		$("#clearB").hide();
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
		clearText('operformT1');
		clearMultiSelect();	// 清空多选下拉框
		var whereinfo=$("#modifyreset").val();
		//queryByID(whereinfo);
		queryByID(whereinfo,"fieldjsoninfo",prefix,suffixW,isRelatedInfo,relatedInfo,isRelateVal);
}


/**********************************************************
				function name:   openDiaOrder()
				function:		 打开组合排序窗口
				parameters:      
				return:			 
				description:     打开组合排序窗口，表名不同，可排序的字段不同
				Date:				2010-9-7 
********************************************************/
function openDiaOrder(){
	openDiaO(tablealiasName);
}


/**********************************************************
				function name:   openDiaQuery()
				function:		 打开复合查询
				parameters:      
				return:			 
				description:     打开复合查询窗口，表名不同，可查询字段不同
				Date:				2010-9-7 
********************************************************/
function openDiaQuery(){
	openDiaQueryG('query',tablealiasName);
}


/**********************************************************
				function name:   openDiaDelete()
				function:		 打开批量删除窗口
				parameters:      
				return:			 
				description:     打开批量删除窗口，表名不同，可查询字段不同
				Date:				2010-9-7 
********************************************************/
function openDiaDelete(){
	openDiaQueryG('delete',tablealiasName);
}

/**********************************************************
				function name:   openDiaModify()
				function:		 打开批量删除窗口
				parameters:      
				return:			 
				description:     打开批量删除窗口，表名不同，可查询字段不同
				Date:				2010-9-7 
********************************************************/
function openDiaModify(){
	openDiaQueryG('modify',tablealiasName);
}

/**********************************************************
				function name:   openDiaPrint()
				function:		 打开预览报表窗口
				parameters:      
				return:			 
				description:     打开预览报表窗口
				Date:				2010-9-7 
********************************************************/
function openDiaPrint(){
	//printThisReport(reportName,getPriParams());
	var menuid=$("#imenuid").val();
	//var tablename='';
	var userid= $("#useridd").val();
	var groupid = $("#zid").val();
	groupid=groupid.replace(new RegExp("~","g"),",");
	var userdept= $("#departname").val();
	printThisReport1(menuid,tablename,getPriParams(),userid,groupid,userdept,1);
}


/**********************************************************
				function name:   openDiaDownLoad()
				function:		 打开导出数据窗口
				parameters:      
				return:			 
				description:     打开导出数据窗口
				Date:				2010-9-7 
********************************************************/
function openDiaDownLoad(){	
	thisDownLoad('tsdBilling','mssql',tablealiasName,languageType);	
}


/**********************************************************
				function name:   exeDownLoad()
				function:		 执行导出数据
				parameters:      
				return:			 
				description:     执行导出数据
				Date:				2010-9-7 
********************************************************/
function exeDownLoad(){	
	getTheCheckedFields(dataSource,'mssql',tablename,tablealiasName);
}


/**********************************************************
				function name:   saveModQueryOper()
				function:		 保存模板查询
				parameters:      
				return:			 
				description:     保存模板查询
				Date:				2010-9-7 
********************************************************/
function saveModQueryOper(){
	saveModQuery(tablename);
}

/**********************************************************
				function name:   exeModquery()
				function:		 模板查询
				parameters:      
				return:			 
				description:     模板查询
				Date:				2010-9-7 
********************************************************/
function exeModqueryOper(){	
	openQueryM(tablename);
}


/**********************************************************
				function name:   getPublicFieldInfo(type)
				function:		 根据表名获取字段信息
				parameters:      type:1 新增、修改、批量修改面板数据加载
										2：显示详细面板数据加载      
				return:			 
				description:     根据表名获取字段信息
				Date:				2010-9-7 
********************************************************/
function getPublicFieldInfo(type){
	var falg='F';
	var tsdpkstr ='';
	if(type == 1){
		tsdpkstr ='publicmode.getfieldinfo';
	}else {
		tsdpkstr ='publicmode.getfieldinfoXX';
	}	
	var urlstr=tsd.buildParams({ 	      packgname:'service',//java包
										  clsname:'ExecuteSql',//类名
										  method:'exeSqlData',//方法名
										  ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
										  tsdcf:'mssql',//指向配置文件名称
										  tsdoper:'query',//操作类型 
										  datatype:'jsonattr',//返回数据格式 
										  tsdpk:tsdpkstr
							   });
	//传入可编辑字段控制						   
	var editfields = ","+$("#editfields").val();
	
	$.ajax({
		url:'mainServlet.html?'+urlstr+'&tablename='+tablealiasName+'&editfields='+editfields,
		datatype:'json',
		cache:false,//如果值变化可能性比较大 一定要将缓存设成false
		timeout: 1000,
		async: false ,//同步方式
		success:function(json){	
			/******************			
			如果别名表没有相应的信息，
			提示：别名表中无符合条件信息！
			
			//json.xml 是将json变量中存放的json字符串直接转化成xml格式
			*******************/
			json = translateHtml(json);
			
			if(json.xml==undefined){
				if(type==1){
					$("#fieldjsoninfo").val(json);
				}else{
					$("#fieldjsoninfoXX").val(json);
				}
				falg='T';					
			}		
			else if($(json.xml).find('row').length==0){
				var unMessRbfield = $("#unMessRbfield").val();
				alert(unMessRbfield);
				falg='F';
						
			}else{
				falg='T';
			}
			
			/*  //json解析方式
				var obj = eval('(' + json + ')');
				alert(obj.rows[1].Field_Name);
			*/
		}
	});	
	return falg;
}

/***************************************字段唯一性判断 start ********************************************/
/**********************************************************
				function name:   getUniqueGroup()
				function:		 获取要唯一性判断的字段及分组情况
				parameters:      
				return:			 
				description:     获取要唯一性判断的字段及分组情况
				Date:			 2011-1-14
********************************************************/
function getUniqueGroup (){

		var jsonstr = $("#fieldjsoninfo").val();//从别名表中获取到的字段信息	 	
		/***********json解析方式***********/
		var obj = eval('(' + jsonstr + ')');		
		for(var i=0;i<obj.rows.length;i++){	
			//只对有唯一性判断的字段进行记录
			if(obj.rows[i].uniquegroup!=null&&obj.rows[i].uniquegroup!='null'&&obj.rows[i].uniquegroup!=''){
				if(unigroupinfo[obj.rows[i].uniquegroup]==undefined){
					unigroupinfo[obj.rows[i].uniquegroup] = new Array();
				}		
				unigroupinfo[obj.rows[i].uniquegroup].push(obj.rows[i].field_name); 				
			}
		}
}

/**********************************************************
				function name:   UniqueGroupExist()
				function:		 根据唯一性判断的字段及分组，对其进行唯一性判断
				parameters:      
				return:			 
				description:     获取个字段的值和数据库中的进行比较判断字段是否唯一存在
				Date:			 2011-1-14
********************************************************/
function UniqueGroupExist(){
	var flag =false;
	for(var key in unigroupinfo){
		//	获取各组字段的值和数据库中的进行比较判断字段是否唯一存在
		var uniqueinfo = "" ;
		var uniquestr="";
		var uniquefield="";
		var len = unigroupinfo[key].length;
		if(len>0){
			uniquefield = unigroupinfo[key][0];
			for(var i=0;i<len;i++){
				uniqueinfo +=unigroupinfo[key][i] +"='"+tsd.encodeURIComponent($("#"+prefix+unigroupinfo[key][i]+suffixW).val())+"' and " ;
				uniquestr +=$("#"+prefix+unigroupinfo[key][i]+suffixN).text()+" ";
			}
			uniqueinfo += " 1=1 ";	
			flag = dataExist(uniqueinfo,uniquestr,uniquefield);	
			if(flag==true){
				break;
			}
		}		
	}
	return flag;	
}
/**********************************************************
				function name:   dataExist()
				function:		 唯一性的判断
				parameters:      
				return:			 
				description:     将相应的数据可数据可库中的信息进行唯一性对比
				Date:			 2011-1-14
********************************************************/
function dataExist(uniqueinfo,uniquestr,uniquefield){		
			var flag = false;
			var urlstr=tsd.buildParams({
										packgname:'service',//java包
										clsname:'ExecuteSql',//类名
										method:'exeSqlData',//方法名
										ds:dataSource,//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
										tsdcf:tsdcf,//指向配置文件名称
										tsdoper:'query',//操作类型
										datatype:'xmlattr',//返回数据格式
										tsdpk:'publicmode.keyExist'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
			});
			
			
			urlstr += "&tablename="+tablename+'&whereinfo='+uniqueinfo;
			$.ajax({
			url:'mainServlet.html?'+urlstr,
			datatype:'xml',
			cache:false,//如果值变化可能性比较大 一定要将缓存设成false
			timeout: 1000,
			async: false ,//同步方式
				success:function(xml){					
					$(xml).find('row').each(function(){
						var keynum = $(this).attr("keynum");
						if(keynum > 0){								
								var worninfo = $("#worninfo").val();
								var SingleTabEused = $("#SingleTabEused").val();
								alert(uniquestr+SingleTabEused);	
								$("#"+prefix+uniquefield+suffixW).focus();		
								flag = true;						
						}
					});
				}
			});	
		
		return flag;
}
/***************************************** 字段唯一性判断 end ********************************************/

/**********************************************************
				function name:   formatKey()
				function:		 对关键字的格式进行格式化
				parameters:      
				return:			 
				description:     对关键字的格式进行格式化
				Date:			 2010-9-8
********************************************************/
function formatKey(){
		
		/**
		//关键字的三种格式
		var keyQueryS='';// Kemu+'_'+LTRIM(STR(Hzyf))+'_'+Dh	
		var keyGridRow ='';//
		var keyWhereS='';
		*/
		var knum = 0;//用来标识联合主键key位置
	 	var jsonstr = $("#fieldjsoninfo").val();//从别名表中获取到的字段信息
	 	
		/***********json解析方式***********/
		var obj = eval('(' + jsonstr + ')');
		
		for(var i=0;i<obj.rows.length;i++){	
		
			if(obj.rows[i].keytype==1||obj.rows[i].keytype==3){//只对关键字字段进行处理
				knum++;		
				var fieldname = obj.rows[i].field_name;	//表的字段名
				var DataType = obj.rows[i].datatype;				
				
				//数据类型 控制可输入字符
				if(DataType=='dtInteger' || DataType=='int' || DataType=='dtDouble'){//数值型			
		 			keyQueryS += "&key"+knum+"=LTRIM(STR("+fieldname+"))";
		 			keyWhereS +=fieldname+"=key"+knum+" and ";
				}		
				else if(DataType=='dtdatetime'){//加入日期控件
		 			keyQueryS += "&key"+knum+"="+fieldname;
		 			keyWhereS +=fieldname+"=to_date('key"+knum+"','yyyy-mm-dd hh24:mi:ss') and ";
				}
				else {		
			 		keyQueryS += "&key"+knum+"="+fieldname;
			 		keyWhereS +=fieldname+"='key"+knum+"' and ";
				}
				keyGridRow +=fieldname+",";//jqgrid添加左侧按钮时，需要参数
				keyGridTop.push("GS_"+fieldname);				
			}		
		}
		
		var len1 = keyGridRow.lastIndexOf(',');
		if(len1>0){keyGridRow = keyGridRow.substr(0,len1);}
		
		
		if(knum<4){
			for(var j=knum+1;j<=4;j++){
				keyQueryS += "&key"+j+"='id'";
			}
		}
		
		var len3 = keyWhereS.lastIndexOf(' and ');
		if(len3>0){keyWhereS = keyWhereS.substr(0,len3);}		
}

 /**
 * 级联修改 、显示详细面板数据显示处理
 * @param
 * @return 
 */
function showRelatedInfo(prefixkey,suffixWkey,isRelatedInfokey,relatedInfokey,isRelateValkey){
	//触发所有有onchange事件字段的onchange事件
	for(var key1 in relatedInfokey){
		$("#"+prefixkey+key1+suffixWkey).trigger("onchange");
	}
	
	//设置被级联的val值
	for(var key in isRelateValkey){
		if(isRelatedInfokey[key][0]==11){
				var mulselectoper = isRelatedInfokey[key][2];
				var valstr =isRelateValkey[key][0];
				var arr = valstr.split(mulselectoper);
				
				for(var j=0;j<arr.length;j++){
					//将复选框中应被选中的选项设置为选中
					$("[name='"+prefixkey+key+suffixWkey+"']").each(function(){
						if($(this).val()==arr[j]){
							$(this).attr("checked","checked");
							if(j==arr.length-1){
								$(this).click();
								$(this).attr("checked","checked");
							}			
						}
					}) ;
				}
		}else if(isRelatedInfokey[key][0]==1){
			$("#"+prefixkey+key+suffixWkey).val(isRelateValkey[key][0]);
		}		
	}
}
/**********************************************************
				function name:   getValbyRel(val,field,type,prefixkey,suffixWkey)
				function:		 字段的onchange事件，
				parameters:      val：该字段当前值
								 field：级联字段
								 type: 1:添加 、修改、详细
								  	   2：简单查询
								 prefixkey ： prefix
								 suffixWkey ： suffixW
								 opentype:1 新增 修改 ，2 显示详细 								 
				return:			 
				description:    
				Date:				2010-9-7 
********************************************************/
function getValbyRel(val,field,type,prefixkey,suffixWkey,opentype){
	//opentype:1为打开新增 修改 ；2为打开显示详细 	
	var isRelatedInfokey='';
	if(opentype=='1'){
		isRelatedInfokey=isRelatedInfo;
	}else if(opentype=='2'){
		isRelatedInfokey=isRelatedInfoXX;
	}
	
	var selectinfo = $("#selectinfo").val();//请选择的国际化
	var relfield = field.split(",");
	
	for(var i=0; i<relfield.length;i++){
		var area = '';
		if(type=='1'){
				area = getDataDictsql(isRelatedInfokey[relfield[i]][1],val);//根据数据字典获取该字段的下拉框值
				var fieldnamestr = prefixkey+relfield[i]+suffixWkey;
				//级联字段为多选
				if(isRelatedInfokey[relfield[i]][0]==11){					
					$("#"+fieldnamestr+"td").html("");
					var $tr_1 = '<select multiple="multiple" name="'+fieldnamestr+'" id="'+fieldnamestr+'" class="textclass" >';
					$tr_1 += '<option value="">'+selectinfo+'</option>'+area;
					$tr_1 += '</select>';
					$("#"+fieldnamestr+"td").html($tr_1);
					$("#"+fieldnamestr).multiSelect({ oneOrMoreSelected: '*'},'','check'+fieldnamestr,isRelatedInfokey[relfield[i]][2]);
				}
				//级联字段为单选
				else if(isRelatedInfokey[relfield[i]][0]==1){	
					var strarea = '<option value="" >'+selectinfo+'</option>';
					$("#"+fieldnamestr).html(strarea+area);
				}
				
		}//end if :type=1
		else if(type==2){
				area = getDataDictsql(isRelatedInfoQ[relfield[i]][1],val);//根据数据字典获取该字段的下拉框值
				//级联字段为多选
				if(isRelatedInfoQ[relfield[i]][0]==11){
					$("#"+prefix+relfield[i]+suffixQW+"td").html("");
					var $tr_1 = '<select multiple="multiple" name="'+prefix+relfield[i]+suffixQW+'" id="'+prefix+relfield[i]+suffixQW+'" class="textclass" >';
					$tr_1 += '<option value="">'+selectinfo+'</option>'+area;
					$tr_1 += '</select>';	
					$("#"+prefix+relfield[i]+suffixQW+"td").html($tr_1);
					$("#"+prefix+relfield[i]+suffixQW).multiSelect({ oneOrMoreSelected: '*'},'','check'+prefix+relfield[i]+suffixQW,isRelatedInfoQ[relfield[i]][2]);
				}
				//级联字段为单选
				else if(isRelatedInfoQ[relfield[i]][0]==1){	
					var strarea = '<option value="" >'+selectinfo+'</option>';
					$("#"+prefix+relfield[i]+suffixQW).html(strarea+area);
				}
		} //end if :type=2
	}//end for	
}
/**********************************************************
				function name:   getDataDictsql(str)
				function:		 根据字段表配置 数据字典，显示可查询列表
				parameters:      str：sql语句
								 keyval：级联条件
				return:			 
				description:     根据字段表配置 数据字典，显示可查询列表
				Date:				2010-9-7 
********************************************************/
function getDataDictsql(str,keyval) {
		//根据str 解析出sql语句   数据源ds   数据库tsdcf
		var arr = str.split(";");
		var urlstr='';
		var sqlstr = arr[0]; // 存放解析出来的sql语句
		var dsstr = 'tsdBilling';// 存放解析出来的数据源ds
		var tsdcfstr = 'mssql';// 存放解析出来的数据库tsdcf
		
		//判断数据库是否定义了数据源
		if(arr[1]!=undefined && arr[1]!='' && arr[1]!='undefined'){
			dsstr=arr[1];
		}
		
		//判断数据库中是否定义了配置文件名
		if(arr[2]!=undefined && arr[2]!='' && arr[2]!='undefined'){
			tsdcfstr=arr[1];
		}
		//判断该字段是否为被关联字段
		if(arr[3]!=undefined && arr[3]!='' && arr[3]!='undefined'){
			sqlstr = arr[3];			
		}
		var area='';//单选项 html拼接	
		
		urlstr=tsd.buildParams({ 	  
						  packgname:'service',//java包
						  clsname:'ExecuteSql',//类名
						  method:'exeSqlData',//方法名
						  ds:dsstr,//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
						  tsdcf:tsdcfstr,//指向配置文件名称
						  tsdoper:'query',//操作类型 
						  datatype:'xml',//返回数据格式 
						  tsdpk:'search.getZDsql'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
		});										
		$.ajax({
			url:'mainServlet.html?'+urlstr+'&searchsql='+tsd.encodeURIComponent(untransferApos(sqlstr))+'&keyval='+keyval,
			datatype:'xml',
			cache:false,//如果值变化可能性比较大 一定要将缓存设成false
			timeout: 1000,
			async: false ,//同步方式
			success:function(xml){
				if($(xml).find('row').text()=='false')
				{
					return false;
				}
				else
				{
					$(xml).find('row').each(function(){
						var varstr=[];
						
						$(this).find('cell').each(function()
						{
							varstr.push($(this).text());										
						});	
						if(''==varstr[1]||null==varstr[1]||undefined==varstr[1]||'undefined'==varstr[1]){
							area +="<option value='"+varstr[0]+"'>"+varstr[0]+"</option>";
						}
						else{
							area +="<option value='"+varstr[0]+"'>"+varstr[1]+"</option>";								
						}
					 });
				}//end if($(xml).find('row').text()=='false')				
			}
	});
	return area;
}			
/**********************************************************
				function name:   getDataDictValue(str)
				function:		 根据字段表配置 数据字典，显示可查询列表
				parameters:      str：常量信息
				return:			 
				description:     根据字段表配置 数据字典，显示可查询列表
				Date:				2010-9-7 
********************************************************/
function getDataDictValue(str) {

		var area='';//单选项 html拼接	
		if(''==str||null==str||undefined==str||'undefined'==str){
			return '';
		}else{
			var arr = str.split("<DICT=");
			if(arr!=str){
				var arr1 = arr[1].split("/>");
				if(arr1!==arr){
					var arr2 =arr1[0].split(";");
					for(var i =0;i<arr2.length;i++){
						
						var arr3=arr2[i].split(":");
						if(''==arr3[1]||null==arr3[1]||undefined==arr3[1]||'undefined'==arr3[1]){
							area +="<option value='"+arr3[0]+"'>"+arr3[0]+"</option>";								
						}
						else{
							area +="<option value='"+arr3[0]+"'>"+arr3[1]+"</option>";								
						}						
						
					}
				}
			}					
			return 	area;					
		}
}

/**********************************************************
				function name:   getFinalTable(datadictstr)
				function:		 从内存中获取常量表信息
				parameters:      str：访问常量表参数信息用；分隔
				return:			 
				description:     从内存中获取常量表信息
				Date:				2010-9-7 
********************************************************/
function getFinalTable(datadictstr){		
		var arr = datadictstr.split(';');
		//alert(arr[0]+">>>>>>>>"+arr[1]+">>>>>>>>"+arr[2]+">>>>>>>>"+arr[3]);
		var identity=arr[0];//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
		var argument=arr[1];//对常量表的过滤条件
		var valuestr =arr[2];//option的value取至的字段名
		var showname = arr[3];//option的显示值取之的字段名		
		
		var urlstr=tsd.buildParams({  
					packgname:'service',		//java包
					clsname:'AskConstant',		//类名
					method:'askConstantTable',	//方法名
					identity:identity,			//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
					pattern:'select',			//访问方式 select：查询常量表信息，update：更新常量表信息
					argument:argument			//对常量表的过滤条件
	 				});
	 				
	 					
		var area='';//单选项 html拼接		
		$.ajax({
			url:'mainServlet.html?'+urlstr,
			datatype:'xml',
			cache:false,//如果值变化可能性比较大 一定要将缓存设成false
			timeout: 1000,
			async: false ,//同步方式
			success:function(xml){
				if($(xml).find('row').text()=='false')
				{
					return false;
				}
				else
				{
					$(xml).find('row').each(function(){
                 			area +="<option value='"+$(this).attr(valuestr)+"'>"+$(this).attr(showname)+"</option>";
					});	
				}										
			}
		});
		return area;
}

/**********************************************************
				function name:   printTable()
				function:		 根据别名表生成添加面板单元格信息
				parameters:      jsonid:json串存放的id
								 formid ： 表单id
								 prefixkey ：  prefix 
								 suffixWkey ： 生成的表单域后缀 suffixW
								 suffixNkey ：suffixN
															// isRelatedInfokey ：isRelatedInfo
								 relatedInfokey ：relatedInfo
								 type :1 新增修改面板、 2显示详细面板 
				return:			 
				description:     根据别名表生成添加面板单元格信息
				用于填充新增、修改、显示详细、批量修改面板
				Date:				2010-9-7 
********************************************************/
function printTable(jsonid,formid,prefixkey,suffixWkey,suffixNkey,relatedInfokey,type){
	
	var jsonstr = $("#"+jsonid).val();
	//json解析方式
	var obj = eval('(' + jsonstr + ')');
	
	var j=0;
	var $tr_1='';//添加面板拼接的html串
	for(var i=0;i<obj.rows.length;i++){
		var fieldname = obj.rows[i].field_name;
		var fieldnamestrP = prefixkey+fieldname+suffixWkey;
		var fieldnamestrN = prefixkey+fieldname+suffixNkey ;
		if(obj.rows[i].keytype=='3'){
				$tr_1 += '<input type="hidden" name="'+fieldnamestrP+'" id="'+fieldnamestrP+'" value=""/>';				
		}else{				
				//是否是下拉选择
				var datadictstr = obj.rows[i].datadict;
				var fieldalias = obj.rows[i].field_alias;
				fieldalias = getCaption(fieldalias,languageType,fieldalias);
				
				if(datadictstr!='null' && datadictstr!=null && datadictstr!=''){
				
					var area=''; //拼接字符串
					var onchangestr ='';//关联字段的onchange方法内容
					var selectinfo = $("#selectinfo").val();//请选择的国际化
					
					if(obj.rows[i].selecttype=='1'||obj.rows[i].selecttype=='11'){//单选 1select  2 常量值  3常量表 					
						if(datadictstr.indexOf("SELECT")!=-1||datadictstr.indexOf("select")!=-1){//单选 1select 
							//判断是否为被关联字段
							var strlength = datadictstr.split(";");	
							if(strlength.length==4){
								//该字段被关联了，将它的字段名、单选复选值、数据字典保存起来
								// 1=打印新增面板 2=打印修改面板
								if(type=='1'){
									isRelatedInfo[fieldname] = new Array();
									isRelatedInfo[fieldname].push(obj.rows[i].selecttype);
									isRelatedInfo[fieldname].push(datadictstr);
									isRelatedInfo[fieldname].push(obj.rows[i].mulselectoper);
								}
								else if(type=='2'){
									isRelatedInfoXX[fieldname] = new Array();
									isRelatedInfoXX[fieldname].push(obj.rows[i].selecttype);
									isRelatedInfoXX[fieldname].push(datadictstr);
									isRelatedInfoXX[fieldname].push(obj.rows[i].mulselectoper);
								}								
							} 
							else{
								area = getDataDictsql(datadictstr);
							}	
			        		
			        	}
			       	} else if(obj.rows[i].selecttype=='2'||obj.rows[i].selecttype=='12'){//单选 2 常量值	       	
			       		datadictstr = translateHtml(datadictstr);
			       		area = getDataDictValue(datadictstr);
			       		
					}else if(obj.rows[i].selecttype=='3'||obj.rows[i].selecttype=='13'){//单选 3 常量表				
						area = getFinalTable(datadictstr);//从内存中获取常量表信息	
					}
					
					if(obj.rows[i].related_field!='null' && obj.rows[i].related_field!=null && obj.rows[i].related_field!=''){
						relatedInfokey[fieldname] = new Array();//relatedInfo[fieldname] 存放有级联的字段
						
						onchangestr ='onchange="getValbyRel(this.value,\''+obj.rows[i].related_field+'\',1,\''+prefixkey+'\',\''+suffixWkey+'\',\''+type+'\');"';	
						//relatedInfo[fieldname].push(onchangestr);//存放改字段
					}
					
					//对单选框html进行拼接
					if(obj.rows[i].selecttype=='1'||obj.rows[i].selecttype=='2'||obj.rows[i].selecttype=='3'){
						$tr_1 += '<td width="120px;" align="right" class="labelclass"><label id="'+fieldnamestrN+'" >'+fieldalias+'</label></td>';
						$tr_1 += '<td width="220px;" align="left" style="border-bottom:1px solid #A9C8D9;">';
						$tr_1 += '<select name="'+fieldnamestrP+'" id="'+fieldnamestrP+'" class="textclass" '+onchangestr+'>';
						$tr_1 += '<option value="">'+selectinfo+'</option>'+area;
						$tr_1 += '</select>';
					}
					//对多选框html进行拼接
					if(obj.rows[i].selecttype=='11'||obj.rows[i].selecttype=='12'||obj.rows[i].selecttype=='13'){
						
						$tr_1 += '<td width="120px;" align="right" class="labelclass"><label id="'+fieldnamestrN+'" >'+fieldalias+'</label></td>';
						$tr_1 += '<td width="220px;" align="left" style="border-bottom:1px solid #A9C8D9;" id="'+fieldnamestrP+'td">';
						$tr_1 += '<select multiple="multiple" name="'+fieldnamestrP+'" id="'+fieldnamestrP+'" class="textclass" '+onchangestr+'>';
						$tr_1 += '<option value="">'+selectinfo+'</option>'+area;
						$tr_1 += '</select>';				
					}			
				}
				//text 输入框类型
				else {		
					var length = obj.rows[i].field_length;//允许输入长度
					var conditionstr ='';//控制输入条件
					if(length==0){
						length=1024;
					}
					//数据类型 控制可输入字符
					if(obj.rows[i].datatype=='dtInteger'||obj.rows[i].datatype=='int'){
						//alert('dtInteger');
						//加入长度控制 只允许输入数值型字符					
						conditionstr = ' style="ime-mode: Disabled" onkeypress="var k=event.keyCode; return k>=48&&k<=57" maxlength="'+length+'" onpaste="return   !clipboardData.getData(text).match(/\D/)" ondragenter="return false" ';
					}
					else if(obj.rows[i].datatype=='dtDouble'){
						//alert('dtDouble');
						//加入长度控制 只允许输入数值型字符	允许输入小数
						conditionstr =' style="ime-mode: Disabled" onkeypress="var k=event.keyCode; return k>=46&&k<=57&&k!=47" maxlength="'+length+'" onpaste="return   !clipboardData.getData(text).match(/\D/)" ondragenter="return false" '; 
					}
					else if(obj.rows[i].datatype=='dtdatetime'){
						//alert('dtdatetime');
						
						//加入日期控件
						conditionstr = ' onfocus="WdatePicker({startDate:\'%y-%M-01 00:00:00\',dateFmt:\'yyyy-MM-dd HH:mm:ss\',alwaysUseStartDate:true})" '  ; 
					}
					else {
						//alert('dtString');				
						if(obj.rows[i].inputtype=='2'){//只允许输入数字	
							//加入长度控制 只允许输入数值型字符					
							conditionstr = ' style="ime-mode: Disabled" onkeypress="var k=event.keyCode; return k>=48&&k<=57" maxlength="'+length+'" onpaste="return   !clipboardData.getData(text).match(/\D/)" ondragenter="return false" ';
						}
						else{//允许输入任何字符串
							//加入长度控制					
							conditionstr =' maxlength='+length+' onpropertychange=TextUtil.NotMax(this) ';					
						}
					}
					$tr_1 += '<td width="120px;" align="right" class="labelclass"><label id="'+fieldnamestrN+'" >'+fieldalias+'</label></td>';
					$tr_1 += '<td width="220px;" align="left" style="border-bottom:1px solid #A9C8D9;"><input type="text" '+conditionstr+' name="'+fieldnamestrP+'" id="'+fieldnamestrP+'" class="textclass"></input>';
				}
				if(obj.rows[i].keytype=='1' || obj.rows[i].keytype=='2'){//必填项标识 1为关键字 2为必填
					$tr_1 +='<label class="addred" ></label>';	//必填项标识			
				}
				//添加换行控制
				if(j%2==0){
					 $tr_1 = '<tr>'+$tr_1+'</td>';
				}
				else if(j%2==1){
					 $tr_1 += '</td></tr>';
					 $("#"+formid+" tbody").html($("#"+formid+" tbody").html()+$tr_1);//打印到页面上
					 $tr_1 ='';
				}
				j++;
		}
	}
	
	//如果td的个数是奇数个，则给整个table加上最后一个td是表格完整
	if((j-1)%2==0){
			 $tr_1 += '<td width="120px;" align="right" class="labelclass"><label></label></td>';
			 $tr_1 += '<td width="220px;" align="left" style="border-bottom:1px solid #A9C8D9;"></td></tr>';
	}
	
	//打印到页面上
	$("#"+formid+" tbody").html($("#"+formid+" tbody").html()+$tr_1);	
	
	/**
	给多选类型的字段
	加上$("#ZeroMonth").multiSelect({ oneOrMoreSelected: '*'},'','checkMonth',',');
	使其拥有下拉多选的样式
	*/
	for(var i=0;i<obj.rows.length;i++){	
		//表的字段名
		var fieldname = obj.rows[i].field_name;	
		var fieldnamestrPM = prefixkey+fieldname+suffixWkey;
		//字段类型
		var datadictstr = obj.rows[i].datadict;
		if(datadictstr!='null' && datadictstr!=null && datadictstr!=''){
			if(obj.rows[i].selecttype=='11'||obj.rows[i].selecttype=='12'||obj.rows[i].selecttype=='13'){
				$("#"+fieldnamestrPM).multiSelect({ oneOrMoreSelected: '*'},'','check'+fieldnamestrPM,obj.rows[i].mulselectoper);
			}
		}
	}	
}


/**********************************************************
				function name:   logwrite()
				function:		 写日志
				parameters:      status ：状态 ：1添加 2删除 3修改 4批量删除 5批量修改
								 content ：写入日志的内容
				return:			 
				description:     写日志
				Date:			2010-9-13 
********************************************************/
function logwrite(status,content,condition){	
	tsd.QualifiedVal=true; 	
	switch(status){
		case 1:
		///增加		
				writeLogInfo("","add",tsd.encodeURIComponent("("+tablename+")"+$("#addinfo").val()+" : "+content));				
				break;
		case 2:
		///删除		
				writeLogInfo("","delete",tsd.encodeURIComponent("("+tablename+")"+$("#deleteinfo").val()+" : "+condition));
				break;			
		case 3:
		///修改
				writeLogInfo("","edit",tsd.encodeURIComponent("("+tablename+")"+$("#editinfo").val()+" : "+content+"。"+$("#conditions").val()+" : "+condition));			
				break;			
		case 4:
		///批量删除		
				writeLogInfo("","Bulk Delete",tsd.encodeURIComponent("("+tablename+")"+$("#deletebinfo").val()+" :"+condition));	
				break;
		case 5:
		///批量修改		
				writeLogInfo("","Batch Edit",tsd.encodeURIComponent("("+tablename+")"+$("#modifybinfo").val()+" : "+condition));	
				break;			
	}
		
	//每次拼接参数必须添加此判断
	if(tsd.Qualified()==false){return false;}
}


/**********************************************************
				function name:   getTableAskInfo()
				function:		 根据菜单id获取生成编辑页面的信息
				parameters:      
				return:			 
				description:     根据菜单id获取生成编辑页面的信息
				Date:				2010-9-13 
********************************************************/
function getTableAskInfo(imenuid){
	var isrow ='true';	
	var urlstr=tsd.buildParams({ 	  	  packgname:'service',//java包
										  clsname:'ExecuteSql',//类名
										  method:'exeSqlData',//方法名
										  ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
										  tsdcf:'mssql',//指向配置文件名称
										  tsdoper:'query',//操作类型 
										  datatype:'xmlattr',//返回数据格式 
										  tsdpk:'publicmode.getAskInfo'
							   });
	
	$.ajax({
		url:'mainServlet.html?'+urlstr+'&menuid='+imenuid,
		datatype:'xml',
		cache:false,//如果值变化可能性比较大 一定要将缓存设成false
		timeout: 1000,
		async: false ,//同步方式
		success:function(xml){
			var rowtext =$(xml).find('row:first').text();
			if(rowtext=='false')
			{	
				//var isrowstr = $("#PLSTEisrow").val();
				
				alert("该页面为配置，请您到菜单管理页面进行配置。");
				isrow ='false';
			}
			else{
				$(xml).find('row').each(function(){
			
					var dbtableName1 = $(this).attr("tablename");
					var dbprintName1 = $(this).attr("printname");				
					var dbdataSource1 = $(this).attr("datasource");
					var tablealiasName1 = $(this).attr("tablealiasname");
					var rights1 = $(this).attr("rights");
					var initialization1 = $(this).attr("whereinfo");
					var delspecial1 = $(this).attr("delspecial");
					var codeinfo1= $(this).attr("code");
					var orderby_key1= $(this).attr("orderby_key");
					var isshowdata1= $(this).attr("isshowdata");
					var DisplayConditions1 = $(this).attr("displayconditions");
													
					//var dbpowerName = $(this).attr("powerName".toLowerCase());
					//var dbconfigName = $(this).attr("configName".toLowerCase());	
					//var str ="dbtableName:"+dbtableName +"--- dbprintName:" + dbprintName+"--dbpowerName"+dbpowerName;
					//str += "---dbdataSource:"+dbdataSource1 + "---tablealiasName1 :"+tablealiasName1+"---"+dbtableName1;
					//alert(str);	
					
					tablename = dbtableName1;//表名
					reportName = dbprintName1;//对应报表名称			
					dataSource = dbdataSource1;//数据源
					delspecial = delspecial1;//是否要进行删除前特殊处理
					codeinfo = codeinfo1;//表标识，
					orderby_key=orderby_key1;//初始化页面数据时，默认排序方式
					isshowdata = isshowdata1;//初始化是否显示数据
					DisplayConditions = DisplayConditions1;//页面刚开始显示的条件
					
					//表别名	如果数据库中表的别名为空，则设置页面上表的别名等于表名
					if(tablealiasName1==''||tablealiasName1=='null'){
						tablealiasName = tablename;
					}else{
						tablealiasName = tablealiasName1;
					}
					rights=rights1;	
					
					//页面条件
					if(initialization1==''||initialization1=='null'||initialization1==undefined||initialization1=='undefined' ){
						initialization=' 1=1 ';
					}else{
						
						initialization1 = ParameterSet(initialization1);//替换session中的值					
						initialization=encodeURIComponent(untransferApos(initialization1));
					}
					//页面刚开始显示的条件
					if(DisplayConditions1==''||DisplayConditions1=='null' ||DisplayConditions1==undefined||DisplayConditions1=='undefined'){
						DisplayConditions=' 1=1 ';
					}else{
						DisplayConditions1 = ParameterSet(DisplayConditions1);//替换session中的值					
						DisplayConditions=untransferApos(DisplayConditions1);
					}
					
					//powerParams = dbpowerName;
					//tsdcf = dbconfigName;		
				});	
			}//end if(isrow)
		}
	});	
	return isrow;
}


/**********************************************************
				function name:   hideButPower()
				function:		 将不可用的功能按钮隐藏
				parameters:      
				return:			 
				description:     将不可用的功能按钮隐藏
				Date:			 2010-9-14 
**************************************************************/
function hideButPower(){	
	$("#buttons>button").each(function(){		
		if($(this).attr("disabled") == true ){
			$(this).hide();
		}
	});
}

/**********************************************************
				function name:   PanHandle()
				function:		 控制生成新增、修改、批量修改面板：弹出面板生成
				parameters:      
				return:			 
				description:     控制生成新增、修改、批量修改面板：
								 根据全局变量iscreatPan 来控制是否要生成新增、修改、批量修改面板。
								 如果iscreatPan==false则表示还未生成该面板，需要生成面板
								 反之则，不在生成。
				Date:			 2010-9-15 
**************************************************************/
function creatPanAdd(){
		if( iscreatPan== false ){
			//alert("keyQueryS>>>"+keyQueryS+"..keyGridRow>>"+keyGridRow+"..keyWhereS>>"+keyWhereS);
			//printTable();//根据别名表生成添加面板单元格信息	
			printTable("fieldjsoninfo","addtable",prefix,suffixW,suffixN,relatedInfo,'1');//根据别名表生成添加面板单元格信息	
			
			/**** 效率问题，该方法已被替换	
			//从别名表中获取字段名，设置添加面板的标签值				
			//setFieldName(tablename,prefix,suffixN,languageType);
			**/
			iscreatPan = true;
		}			
}
/**********************************************************
				function name:   creatInfoPan()
				function:		  控制生成显示详细面板：弹出面板生成
				parameters:      
				return:			 
				description:      根据全局变量iscreatInfoPan 来控制是否要生成面板。
								 如果iscreatInfoPan==false则表示还未生成该面板，需要生成面板
								 反之则，不在生成。
				Date:			 2011-2-24 
**************************************************************/
function creatInfoPan(){
		if( iscreatInfoPan== false ){
			
			/***********************************
			//因为表关联在非admin账号下，显示有问题，所以将其移到初始化时加载
			根据别名表名获取字段信息 组织成一个json字符串,				 		
			//////////////////////用于格式化jqgrid上显示sql语句，和显示详细信息
			var fieldfalg = getPublicFieldInfo(2);
			if(fieldfalg=='F'){ return false; }
			***********************************/	
		
			//printTable();//根据别名表生成添加面板单元格信息
			printTable("fieldjsoninfoXX","Infotable",prefix,suffixIW,suffixIN,relatedInfoXX,'2');
			isFieldDisabled(tablename,prefix,suffixIW);
			/**** 效率问题，该方法已被替换
			//从别名表中获取字段名，设置添加面板的标签值	
			//setFieldName(tablename,prefix,suffixN,languageType);
			**/
			iscreatInfoPan = true;
		}			
}

/**********************************************************
				function name:   openQuery()
				function:		  打开简单查询面板
				parameters:      
				return:			 
				description:     打开简单查询面板
				Date:			 2010-9-15 
**************************************************************/
function openQuery(){		
		if(iscreatPanQuery == false){
			printQueryTable();
			/**** 效率问题，该方法已被替换	
			//从别名表中获取字段名，设置添加面板的标签值				
			//setFieldName(tablename,prefix,suffixQN,languageType);
			**/
			iscreatPanQuery = true;		
		}
		clearText("operformTQuery");//清空表格信息
		clearMultiSelect();//清空多选下拉框
	 	$(".top_03").html($("#queryinfo").val());//标题	 	
		autoBlockFormAndSetWH('QueryPan',60,5,'closeo',"#ffffff",false,1000,'');//弹出查询面板		
}
/**********************************************************
				function name:   closeQuery()
				function:		 关闭简单查询面板
				parameters:      
				return:			 
				description:    
				Date:			 2010-9-15 
**************************************************************/
function closeQuery(){		
		clearText('operformTQuery');//清空表格信息
		clearMultiSelect();//清空多选下拉框
		setTimeout($.unblockUI, 0);//关闭面板		
}
/**********************************************************
				function name:   openQuery()
				function:		 简单查询
				parameters:      
				return:			 
				description:     通过表单值构造数据操作参数 
				请根据业务参数的多少和属性进行修改
				Date:			 2010-9-15 
**************************************************************/
function QbuildParams(){
	
	tsd.QualifiedVal=true; 	//每次拼接参数必须初始化此参数
 	var paramsStr='1=1 ';	//查询字串  	
 	 	
 	var jsonstr = $("#fieldjsoninfoXX").val();//从别名表中获取到的字段信息	
	var obj = eval('(' + jsonstr + ')');//json解析方式	
	for(var i=0;i<obj.rows.length;i++){	
			var temporary ='';
			
			//只对允许可简单查询的字段进行取值
			if(obj.rows[i].isquery=='1'){
					var fieldname = obj.rows[i].field_name;	//表的字段名		
					var fieldvalue ='';//字段值
					var fieldvalueTend ='';//查询字段类型为日期，其查询区间截止值
					var selecttype = obj.rows[i].selecttype;//多选框值获取
					
					
					/*****************************取值**************************/
					//字段输入值的获取，多选框获取方式和其他的不一样
					if(selecttype>10){//多选框值获取
						//fieldvalue = $('#check'+prefix+fieldname+suffixW).val();
						var mulselectoper = obj.rows[i].mulselectoper;
						var multistr='';
						$("[name='"+prefix+fieldname+suffixQW+"'][checked]").each(function(){
							multistr +=$(this).val()+mulselectoper;	
						});
						var len = multistr.lastIndexOf(mulselectoper);
						if(len>0){multistr = multistr.substr(0,len);}
						fieldvalue = multistr;
					}
					else{//非多选框的值获取
						/**
						*如果查询字段为日期的话，此处要对日期区间进行查询
						*/
						if(obj.rows[i].datatype=='dtdatetime'){
							fieldvalue = $("#"+prefix+fieldname+suffixQW+"1").val();
							fieldvalueTend = $("#"+prefix+fieldname+suffixQW+"2").val();
						}else{
							fieldvalue = $("#"+prefix+fieldname+suffixQW).val();
						}
						fieldvalue=filterSep(fieldvalue);	
						//alert("fieldvalue="+fieldvalue);					
					}
					
					//对象输入框左右空格,选择宽和日期类型不需要去空格
					if(selecttype==0&&obj.rows[i].datatype!='dtdatetime' && obj.rows[i].keytype!=3 ){
						fieldvalue= fieldvalue.replace(/(^\s*)|(\s*$)/g,"");
					}
					
					//如果文本框的值为null，则值为'';对于多选框，显示值为Select options，则其值为空
			 		if(fieldvalue=='null' || (fieldvalue=='Select options' && selecttype>10)){
			 			fieldvalue='';
			 		}
			 		
			 		/*******************************类型判断*****************************/
			 		//数据类型 控制可输入字符
					if(obj.rows[i].datatype=='dtInteger' || obj.rows[i].datatype=='int'
					|| obj.rows[i].datatype=='dtDouble'){
						//只允许输入数值型字符	
						if(fieldvalue!=''){
			 				temporary=fieldname+" = '"+fieldvalue+"'";
			 			}
					}
					else if(obj.rows[i].datatype=='dtdatetime'){//加入日期控件
					
						if(fieldvalue!=''){
							temporary= fieldname+" >= to_date(\'"+fieldvalue+"\',\'YYYY-MM-DD HH24:MI:SS\')";
			 			}
			 			if(fieldvalue!=''&&fieldvalueTend!=''){
			 				temporary += " and "+fieldname+" <= to_date(\'"+fieldvalueTend+"\',\'YYYY-MM-DD HH24:MI:SS\')";			 				 
			 			}else if(fieldvalue==''&&fieldvalueTend!=''){
			 				temporary= fieldname+" <= to_date(\'"+fieldvalueTend+"\',\'YYYY-MM-DD HH24:MI:SS\')";
			 			}
					}
					else {
						if(obj.rows[i].inputtype=='2'){//只允许输入数值型字符
							if(fieldvalue!=''){
				 				temporary= fieldname+" like '"+fieldvalue+"%'"; 	 				
				 			}
						}
						else{//允许输入任何字符串
							if(fieldvalue!=''){
				 				temporary= fieldname+" like '"+fieldvalue+"%'"; 
				 			}
						}
					}
					if(temporary != ''){
						paramsStr +=" and "+temporary;
					}						
			}			
	}
	
	//每次拼接参数必须添加此判断
	if(tsd.Qualified()==false){return false;}	
 	$("#fusearchsql").val(paramsStr);
 	fuheQuery();	
}
/**********************************************************
				function name:   filterSep()
				function:		 修改会过滤掉文件名中"\"的这种情况
				parameters:      
				return:			 
				description:     把文件名中的":\"替换成":\\"
				Date:			 2010-9-15 
				author:			 chenxiaohua
********************************************************/
function filterSep(str){
	//var str2=str.replace(":\",":\\\\");
	var str2=str.replace(/\\/,"\\\\");
	return str2;
}

/**********************************************************
				function name:   printQueryTable()
				function:		 根据别名表生成简单查询面板
				parameters:      
				return:			 
				description:     根据别名表生成简单查询面板
				Date:			 2010-9-15 
********************************************************/
function printQueryTable(){	
	
	var jsonstr = $("#fieldjsoninfoXX").val();
	//json解析方式
	var obj = eval('(' + jsonstr + ')');
	
	var j=0;
	var $timeStr='';//日期字段查询的第二个文本框
	var $tr_1='';//添加面板拼接的html串
	for(var i=0;i<obj.rows.length;i++){
		//只显示可以进行简单查询字段
		if(obj.rows[i].isquery=='1'){
				var fieldname = obj.rows[i].field_name;	//字段名
				var fieldalias = obj.rows[i].field_alias;//字段别名
				fieldalias = getCaption(fieldalias,languageType,fieldalias);										
				//是否是下拉选择
				var datadictstr = obj.rows[i].datadict;				
				if(datadictstr!='null' && datadictstr!=null && datadictstr!=''){
				
					var area=''; //拼接字符串
					var onchangestr ='';//关联字段的onchange方法内容
					var selectinfo = $("#selectinfo").val();//请选择的国际化
					
					if(obj.rows[i].selecttype=='1'||obj.rows[i].selecttype=='11'){//单选 1select  2 常量值  3常量表 					
						if(datadictstr.indexOf("SELECT")!=-1||datadictstr.indexOf("select")!=-1){//单选 1select       		
			        		
							//判断是否为被关联字段
							var strlength = datadictstr.split(";");	
							if(strlength.length==4){
								//该字段被关联了，将它的字段名、单选复选值、数据字典保存起来
								isRelatedInfoQ[fieldname] = new Array();
								isRelatedInfoQ[fieldname].push(obj.rows[i].selecttype);
								isRelatedInfoQ[fieldname].push(datadictstr);
								isRelatedInfoQ[fieldname].push(obj.rows[i].mulselectoper);
							} 
							else{
								area = getDataDictsql(datadictstr);
							}
			        	}
			       	} else if(obj.rows[i].selecttype=='2'||obj.rows[i].selecttype=='12'){//单选 2 常量值	       	
			       		datadictstr = translateHtml(datadictstr);
			       		area = getDataDictValue(datadictstr);
			       		     	
					}else if(obj.rows[i].selecttype=='3'||obj.rows[i].selecttype=='13'){//单选 3 常量表				
						area = getFinalTable(datadictstr);//从内存中获取常量表信息	
					}

					if(obj.rows[i].related_field!='null' && obj.rows[i].related_field!=null && obj.rows[i].related_field!=''){
						//relatedInfoQ[fieldname] = new Array();//relatedInfo[fieldname] 存放有级联的字段
						onchangestr ='onchange="getValbyRel(this.value,\''+obj.rows[i].related_field+'\',2,\''+prefix+'\',\''+suffixQW+'\',0);"';
					}					
					
					//对单选框html进行拼接
					if(obj.rows[i].selecttype=='1'||obj.rows[i].selecttype=='2'||obj.rows[i].selecttype=='3'){
						$tr_1 += '<td width="120px;" align="right" class="labelclass"><label id="'+prefix+fieldname+suffixQN+'" >'+fieldalias+'</label></td>';
						$tr_1 += '<td width="220px;" align="left" style="border-bottom:1px solid #A9C8D9;">';
						$tr_1 += '<select name="'+prefix+fieldname+suffixQW+'" id="'+prefix+fieldname+suffixQW+'" class="textclass" '+onchangestr+'>';
						$tr_1 += '<option value="">'+selectinfo+'</option>'+area;
						$tr_1 += '</select>';
					}
					//对多选框html进行拼接
					if(obj.rows[i].selecttype=='11'||obj.rows[i].selecttype=='12'||obj.rows[i].selecttype=='13'){
						
						$tr_1 += '<td width="120px;" align="right" class="labelclass"><label id="'+prefix+fieldname+suffixQN+'" >'+fieldalias+'</label></td>';
						$tr_1 += '<td width="220px;" align="left" style="border-bottom:1px solid #A9C8D9;" id="'+prefix+fieldname+suffixQW+'td">';
						$tr_1 += '<select multiple="multiple" name="'+prefix+fieldname+suffixQW+'" id="'+prefix+fieldname+suffixQW+'" class="textclass" '+onchangestr+'>';
						$tr_1 += '<option value="">'+selectinfo+'</option>'+area;
						$tr_1 += '</select>';				
					}
				}
				//text 输入框类型
				else {		
					var length = obj.rows[i].field_length;//允许输入长度
					var conditionstr ='';//控制输入条件
					if(length==0){
						length=1024;
					}
					//数据类型 控制可输入字符
					if(obj.rows[i].datatype=='dtInteger'||obj.rows[i].datatype=='int'){
						//alert('dtInteger');
						//加入长度控制 只允许输入数值型字符					
						conditionstr = ' style="ime-mode: Disabled" onkeypress="var k=event.keyCode; return k>=48&&k<=57" maxlength="'+length+'" onpaste="return   !clipboardData.getData(text).match(/\D/)" ondragenter="return false" ';
					}
					else if(obj.rows[i].datatype=='dtDouble'){
						//alert('dtDouble');
						//加入长度控制 只允许输入数值型字符	允许输入小数
						conditionstr =' style="ime-mode: Disabled" onkeypress="var k=event.keyCode; return k>=46&&k<=57&&k!=47" maxlength="'+length+'" onpaste="return   !clipboardData.getData(text).match(/\D/)" ondragenter="return false" '; 
					}
					else if(obj.rows[i].datatype=='dtdatetime'){
						//alert('dtdatetime');
						
						//加入日期控件
						conditionstr = ' onfocus="WdatePicker({startDate:\'%y-%M-01 00:00:00\',dateFmt:\'yyyy-MM-dd HH:mm:ss\',alwaysUseStartDate:true})" '  ; 
					}
					else {
						//alert('dtString');				
						if(obj.rows[i].inputtype=='2'){//只允许输入数字	
							//加入长度控制 只允许输入数值型字符					
							conditionstr = ' style="ime-mode: Disabled" onkeypress="var k=event.keyCode; return k>=48&&k<=57" maxlength="'+length+'" onpaste="return   !clipboardData.getData(text).match(/\D/)" ondragenter="return false" ';
						}
						else{//允许输入任何字符串
							//加入长度控制					
							conditionstr =' maxlength='+length+' onpropertychange=TextUtil.NotMax(this) ';					
						}
					}
					if(obj.rows[i].datatype=='dtdatetime'){
						var ST_StartTime=$("#ST_StartTime").val();
						var ST_StopTime=$("#ST_StopTime").val();
						$tr_1 += '<td width="120px;" align="right" class="labelclass"><label id="'+prefix+fieldname+suffixQN+'1" >'+fieldalias+ST_StartTime+'</label></td>';
						$tr_1 += '<td width="220px;" align="left" style="border-bottom:1px solid #A9C8D9;"><input type="text" '+conditionstr+' name="'+prefix+fieldname+suffixQW+'1" id="'+prefix+fieldname+suffixQW+'1" class="textclass"></input></td>';
						
						$timeStr = '<td width="120px;" align="right" class="labelclass"><label id="'+prefix+fieldname+suffixQN+'2" >'+fieldalias+ST_StopTime+'</label></td>';
						$timeStr += '<td width="220px;" align="left" style="border-bottom:1px solid #A9C8D9;"><input type="text" '+conditionstr+' name="'+prefix+fieldname+suffixQW+'2" id="'+prefix+fieldname+suffixQW+'2" class="textclass"></input></td>';
						
					}else{
						$tr_1 += '<td width="120px;" align="right" class="labelclass"><label id="'+prefix+fieldname+suffixQN+'" >'+fieldalias+'</label></td>';
						$tr_1 += '<td width="220px;" align="left" style="border-bottom:1px solid #A9C8D9;"><input type="text" '+conditionstr+' name="'+prefix+fieldname+suffixQW+'" id="'+prefix+fieldname+suffixQW+'" class="textclass"></input></td>';
					}
				}				
				//添加换行控制
				if(j%2==0){
					if(obj.rows[i].datatype=='dtdatetime'){
						$tr_1 = '<tr>'+$tr_1;
						$timeStr += '</tr>';
						$("#operformTQuery tbody").html($("#operformTQuery tbody").html()+$tr_1 + $timeStr);//打印到页面上
						j++;
						$tr_1 ='';
					}else{
						$tr_1 = '<tr>'+$tr_1;						
					}					 
				}
				else if(j%2==1){
					if(obj.rows[i].datatype=='dtdatetime'){
						$tr_1 += '</tr>';						
					 	$("#operformTQuery tbody").html($("#operformTQuery tbody").html()+$tr_1 );//打印到页面上
					 	$tr_1 = '<tr>'+$timeStr;
					 	j++;
					}else{
						$tr_1 += '</tr>';
					 	$("#operformTQuery tbody").html($("#operformTQuery tbody").html()+$tr_1);//打印到页面上
					 	$tr_1 ='';
					}					
				}
				$timeStr ='';
				j++;
		}	
	}
	//如果td的个数是奇数个，则给整个table加上最后一个td是表格完整
	if((j-1)%2==0){
			 $tr_1 += '<td width="120px;" align="right" class="labelclass"><label></label></td>';
			 $tr_1 += '<td width="220px;" align="left" style="border-bottom:1px solid #A9C8D9;"></td></tr>';
	}

	//打印到页面上
	$("#operformTQuery tbody").html($("#operformTQuery tbody").html()+$tr_1);	
			
	
	/**
	给多选类型的字段
	加上$("#ZeroMonth").multiSelect({ oneOrMoreSelected: '*'},'','checkMonth',',');
	使其拥有下拉多选的样式
	*/
	for(var i=0;i<obj.rows.length;i++){	
		//表的字段名
		var fieldname = obj.rows[i].field_name;	
		//字段类型
		var datadictstr = obj.rows[i].datadict;
		if(datadictstr!='null' && datadictstr!=null && datadictstr!=''){
			if(obj.rows[i].selecttype=='11'||obj.rows[i].selecttype=='12'||obj.rows[i].selecttype=='13'){
				$("#"+prefix+fieldname+suffixQW).multiSelect({ oneOrMoreSelected: '*'},'','check'+prefix+fieldname+suffixQW,obj.rows[i].mulselectoper);
			}
		}
	}	
}

 /**
 * 清空多选下拉框
 * @param 
 * @return  
 */
function clearMultiSelect(){
		$(".multiSelectOptions :checkbox:checked").attr("checked",false).parent().removeClass("checked");
		$(".multiSelectOptions :disabled").removeAttr("disabled");
		$(".multiSelect").attr("trueval","");
}



/*******************************************************对字段进行求和处理 start********************************************************/
/**********************************************************
				function name:   getSumKey()
				function:		 对要求和的字段进行提取
				parameters:      
				return:			 
				description:     对要求和的字段进行提取
				Date:			 2011-4-27 9:05:22
********************************************************/
function getSumKey(){
		var knum = 0;//用来判断是否有需要进行求和的字段
	 	var jsonstr = $("#fieldjsoninfo").val();//从别名表中获取到的字段信息
	 	
		/***********json解析方式***********/
		var obj = eval('(' + jsonstr + ')');		
		for(var i=0;i<obj.rows.length;i++){		
			if(obj.rows[i].bsum==1&&obj.rows[i].webselectable=='T'){//只对bsum=1进行求和
				knum++;	
				var fieldname = obj.rows[i].field_name;	//表的字段名
				var fieldalias = obj.rows[i].field_alias;//表的字段别名
				var DataType = obj.rows[i].datatype;	//表字段类型
				g_sumkey[fieldname]=new Array();
				g_sumkey[fieldname].push(fieldalias);							
			}		
		}
		
		//判断是否有需要进行求和的字段
		if(knum >0){
			g_ifSum=1;
		}			
}
/**
 * 给标识字段求和
 * @param status :1 需要打印求和域
 * @return  
*/
function showSumFiledS(status){
	//非单表页面调用了此js，或无求和字段，屏蔽该方法；
	if(status==undefined||status=='undefined'||status==0){return false;}
	var j=0;
	var $tr_1='';//添加面板拼接的html串
	//拼接求和字段写入页面格式
	for(var asumkey in g_sumkey){
		var alias = getCaption(g_sumkey[asumkey][0],$("#languageType").val(),g_sumkey[asumkey][0]);
		$tr_1 = $tr_1+'<td width="14%" align="right" >';
		$tr_1 = $tr_1+'<label>'+alias+'</label>';
		$tr_1 = $tr_1+'</td>';
		$tr_1 = $tr_1+'<td width="19%" align="left" >';
		$tr_1 = $tr_1+'<input type="text" id="'+asumkey+'_sum" style="height: 18px;line-height: 20px;" disabled="disabled" />';
		$tr_1 = $tr_1+'</td>';

		if(j%3==0){
			 $tr_1 = '<tr>'+$tr_1;
		}else if(j%3==1){
			$tr_1 = $tr_1;
		}else if(j%3==2){
			 $tr_1 =$tr_1+'</tr>';
		}
		j++;
	}

	//补全表格
	if((j)%3==1){
		$tr_1 = $tr_1 +'<td width="14%" align="right" ></td>';
		$tr_1 = $tr_1 +'<td width="19%" align="left" ></td>';
		$tr_1 = $tr_1 +'<td width="14%" align="right" ></td>';
		$tr_1 = $tr_1 +'<td width="19%" align="left" ></td>';
		$tr_1 =$tr_1+'</tr>';
	}
	if((j)%3==2){
		$tr_1 = $tr_1 +'<td width="14%" align="right" ></td>';
		$tr_1 = $tr_1 +'<td width="19%" align="left" ></td>';
		$tr_1 =$tr_1+'</tr>';
	}
	//打印到页面上
	$("#listSumTb tbody").html($("#listSumTb tbody").html()+$tr_1);//打印到页面上
	$tr_1 ='';	
}
/**
 * 给标识字段求和
 * @param status:1 需要进行求和，其它：不需要进行求和
 * @return  
*/
function SumFiledS(status,conditions){
		//非单表页面调用了此js，或无求和字段，屏蔽该方法；
		if(status==undefined||status=='undefined'||status==0){return false;}
	
		if(conditions ==undefined||conditions=='undefined' ||conditions==''||conditions=='&fusearchsql='){
			conditions='&fusearchsql= 1=1 ';
		}
		// 将要求和的字段拼接成 sum(key1),sum(key2)
		var sumfields = "";
	 	for(var asumkey1 in g_sumkey){
	 		sumfields += " SUM("+asumkey1+") as "+asumkey1+",";
	 	}
	 	//var len1 = sumfields.lastIndexOf(',');
		//if(len1>0){sumfields = sumfields.substr(0,len1);}
	 	sumfields += " count(1) as sumkeynum";//处理拼接的 sumfields 最后的","问题
	   	var urlstr=tsd.buildParams({ 
							  packgname:'service',//java包
							  clsname:'ExecuteSql',//类名
							  method:'exeSqlData',//方法名
							  ds:dataSource,//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
							  tsdcf:tsdcf,//指向配置文件名称
							  tsdoper:'query',//操作类型
							  datatype:'xmlattr',//返回数据格式
							  tsdpk:'publicmode.sumKey'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
		});
		urlstr = urlstr+'&sumfields='+sumfields+'&initialization='+initialization+conditions+'&tablename='+tablename;				
		$.ajax({
			url:'mainServlet.html?'+urlstr,
			datatype:'xml',
			cache:false,//如果值变化可能性比较大 一定要将缓存设成false
			timeout: 1000,
			async: false ,//同步方式
			success:function(xml){
				//只有 url参数中 datatype="xmlattr"时才可以这样通过属性取值
				$(xml).find('row').each(function(){
					for(var asumkey2 in g_sumkey){
						$("#"+asumkey2+"_sum").val($(this).attr(asumkey2.toLowerCase()));
					}
				});
			},
			error:function(){
				var queryError=$("#queryError").val();
				alert(queryError);
			}
		});	
}
/*******************************************************对字段进行求和处理 end********************************************************/
/******************************************************修改时关键字唯一性判断 start********************************************************/
/**
 * 关键字唯一性判断
 * @param type:1 新增操作；2：单条记录修改操作
 * @return  
*/
function KeyWordUnique(type){
		/************************
			判断关键是否重复
		************************/
		//当其主键为自增型，则不用判断是否重复
		var keyexist = ' 1=1 ';
		var onekey ='';//得到最后一个关键字，用于提示关键字组合重复
		var keyAlarm = '';
		//从别名表中获取到的字段信息
	 	var jsonstr = $("#fieldjsoninfo").val();
		//json解析方式
		var obj = eval('(' + jsonstr + ')');
		for(var i=0;i<obj.rows.length;i++){	
			if(obj.rows[i].keytype==1){
				keyexist +=" and ";			
				var fieldname = obj.rows[i].field_name;	//表的字段名
				var selecttype = obj.rows[i].selecttype;
				onekey = fieldname;
				keyAlarm += $("#"+prefix+fieldname+suffixN).text()+" "; 
				var fieldvalue ='';//字段值		
				//字段输入值的获取，多选框获取方式和其他的不一样
				if(selecttype>10){//多选框值获取
					//fieldvalue = $('#check'+prefix+fieldname+suffixW).val();
					var multistr='';
					var mulselectoper = obj.rows[i].mulselectoper;
					$("[name='"+prefix+fieldname+suffixW+"'][checked]").each(function(){
						multistr +=$(this).val() +mulselectoper;						
					}) ; 
					var len = multistr.lastIndexOf(mulselectoper);
					if(len>0){multistr = multistr.substr(0,len);}
					fieldvalue = multistr;				
				}
				else{//非多选框的值获取
					fieldvalue = $("#"+prefix+fieldname+suffixW).val();			
				}
				
				//对象输入框左右空格,选择宽和日期类型不需要去空格
				if(selecttype==0&&obj.rows[i].datatype!='dtdatetime' ){
					fieldvalue = fieldvalue.replace(/(^\s*)|(\s*$)/g,"");
				}
				
				//数据类型 控制可输入字符
				if(obj.rows[i].datatype=='dtInteger' || obj.rows[i].DataType=='int'
				|| obj.rows[i].datatype=='dtDouble'){	//数值型			
		 			keyexist += fieldname+"="+fieldvalue;
				}		
				else if(obj.rows[i].datatype=='dtdatetime'){//加入日期控件
					keyexist += fieldname+"=to_date(\'"+fieldvalue+"\',\'YYYY-MM-DD HH24:MI:SS\') ";
		 			//keyexist += fieldname+"='"+tsd.encodeURIComponent(fieldvalue)+"' ";
				}
				else {							
					if(obj.rows[i].inputtype=='2'){//只允许输入数值型字符						
			 			keyexist+=fieldname+"='"+fieldvalue+"' ";	 							
					}
					else{//允许输入任何字符串					
			 			keyexist+=fieldname+"='"+tsd.encodeURIComponent(fieldvalue)+"' ";		 							
					}
				}
			}					
		}
		var oldkeyval = $("#modifywhere").val();
		
		if(keyexist != ' 1=1 '){		
			var flag = false;
			var tsdpkstr = '';
			if(type==1){
				tsdpkstr = 'publicmode.keyExist';
			}else if(type==2){
				tsdpkstr = 'publicmode.updatekeyExist';
			}
			var urlstr=tsd.buildParams({
										packgname:'service',//java包
										clsname:'ExecuteSql',//类名
										method:'exeSqlData',//方法名
										ds:dataSource,//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
										tsdcf:tsdcf,//指向配置文件名称
										tsdoper:'query',//操作类型
										datatype:'xmlattr',//返回数据格式
										tsdpk:tsdpkstr//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
			});
			
			//alert(keyexist);
			urlstr += "&tablename="+tablename+'&whereinfo='+keyexist+'&oldkeyval='+oldkeyval;
			$.ajax({
			url:'mainServlet.html?'+urlstr,
			datatype:'xml',
			cache:false,//如果值变化可能性比较大 一定要将缓存设成false
			timeout: 1000,
			async: false ,//同步方式
				success:function(xml){		
					$(xml).find('row').each(function(){
						var keynum = $(this).attr("keynum");
						if(keynum > 0){	
								//是本条记录关键字
								if(type==2 && keynum==1){
									flag = false;
								}else{//非本条记录关键字
									var worninfo = $("#worninfo").val();
									var SingleTabEused=$("#SingleTabEused").val();
									alert(keyAlarm+SingleTabEused);	
									$("#"+prefix+onekey+suffixW).focus();		
									flag = true;
								}
						}
					});					
				}
			});	
		
		}
		return flag;
}
/*******************************************************修改时关键字唯一性判断 end********************************************************/

/*******************************************************初始化条件中参数替换为具体值 start********************************************************/
/**********************************************************
				function name:   ParameterSet(str)
				function:		 替换初始化条件中的参数
				parameters:      str：需要进行替换的字符串
								
				return:			 
				description:     替换初始化条件中的参数
				Date:			 2011-7-26
				
				替换的内容咱是来自session
************************************************************/
function ParameterSet(params){
	var str	=params;
	//更改设备的父节点
	var len0=0;//存放参数参数起始位置
	while(1){	
		
		var len1 = str.indexOf('[?',len0);
		if(len1==-1){break ;}
		var len2 = str.indexOf('?]',len1);
		
		//获取变量名
		var paramname = str.substring(len1+2,len2);
		//alert(i+"paramname:=================="+paramname);
		//要替换的字符串截取
		var paramc = str.substring(len1,len2+2);
		//alert(i+"paramc:=================="+paramc);
		len0 = len2+2;
		//alert("len0="+len0+"------------------len1="+len1+"-----------len2="+len2);		
		
		/*********************************
		* 替换参数变量为session中对应的值
		*********************************/
		var sessionval ='';		
		var urlstr=tsd.buildParams({  
									packgname:'service',
									clsname:'getSessionVal',
									method:'getValuebyName'							
		});
		urlstr +="&AttributeName="+paramname;
		//此处的url参数主要修改tsdpname（对应存储过程的名称）、tsdExeType(操作类型)
		$.ajax({
			url:'mainServlet.html?'+urlstr,
			cache:false,//如果值变化可能性比较大 一定要将缓存设成false
			timeout: 1000,
			async: false ,//同步方式
			success:function(msg){
					sessionval = msg;
					//当session中部存在改属性的时候，返回为null；将null替换为空
					if(sessionval=='null'){
						sessionval='';						
					}
					str = str.replace(paramc,sessionval);					
			}
			
		});	
	}
	return str;		
}

/*******************************************************初始化条件中参数替换为具体值 end********************************************************/

