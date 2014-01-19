/***********************************************************
		        file name:       transfer.js
				author:          youhongyu 
				create date:     2009-11-30          
				description:
********************************************************/

/**********************************************************
				function name:   引入该js时执行该js
				function:		  打开通用查询面板
				parameters:       
				return:				  
				description:      调用通用的导出查询功能时，需要将组合排序的排序条件传过去
********************************************************/	
jQuery(document).ready(function () {
	if($("#GLOBAL.PUBLIC.EXPORT").length == 0){
		$("body").append('<input type="hidden" id="GLOBAL_PUBLIC_EXPORT" />');//用于判断修改的关键字的值是不是在数据库中已经有重复的
	}
});


/**********************************************************
				function name:    openDiaQueryG(type,tablename,tableflag)
				function:		  打开通用查询面板
				parameters:       type：操作方式 （query、delete、modify）
								  tablename：表名
								  tableflag：隐藏域标识符 用去区分一个页面中来之不同jqgrid 中的通用查询
				return:				  
				description:      打开查询排序面板
********************************************************/	
function openDiaQueryG(type,tablename,tableflag){	
	//如果tableflage 参数没有填写，这个给其赋值为false
	if(typeof(tableflag)=='undefined'||tableflag==undefined){
		tableflag=false;
	}
	
	//改通用查询的类型 type ：query  modify  delete
	$('#queryName').val(type);
	
	//打开通用查询窗口
	if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
		window.showModalDialog("queryServlet.html?tablename="+tablename+"&url=/pubMode/search.jsp&tableflag="+tableflag,window,"dialogWidth:700px; dialogHeight:500px; center:yes; scroll:no;status=no");
    }
    else{
		window.showModalDialog("queryServlet.html?tablename="+tablename+"&url=/pubMode/search.jsp&tableflag="+tableflag,window,"dialogWidth:690px; dialogHeight:600px; center:yes; scroll:no;status=no");
	}
}


/**********************************************************
				function name:    openDiaO(tablename)
				function:		  打开组合排序面板
				parameters:       tablename：表明
				return:			  
				description:     
********************************************************/
function openDiaO(tablename){
	if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
		window.showModalDialog("queryServlet.html?tablename="+tablename+"&url=/pubMode/order.jsp",window,"dialogWidth:610px; dialogHeight:320px; center:yes; scroll:no;status=no");
    }
    else{
		window.showModalDialog("queryServlet.html?tablename="+tablename+"&url=/pubMode/order.jsp",window,"dialogWidth:620px; dialogHeight:350px; center:yes; scroll:no;status=no");
	}	
}

/**********************************************************
				function name:    change(str,t1,t2)
				function:		  替换字符串中特殊字符
				parameters:       str：替换字符串中
								  t1：str中还有的字符串数组
								  t2：要替换成的字符串数组
				return:			  返回根据替换过的字符
				description:     将字符串中的t1数组中信息替换成t2中的对应信息 
********************************************************/
function change(str,t1,t2){
		var res=str;
		
		for(i=0;i<t1.length;i++)
		{
			res = res.replace(new RegExp(t1[i],"g"),t2[i]);						
		}
		return res;
}

/**********************************************************
				function name:    transfer(str)
				function:		  替换字符串中特殊字符
				parameters:       str：替换字符串中
				return:			  返回根据替换过的字符
				description:      替换字符串中的">","<","'" 符号 
								用于写入日志
********************************************************/
function transfer(str){
		var arr = [
					[">","<","'"],
					['&gt;','&lt;','&apos;']
				];	
		var res = str;
				for(i=0;i<arr[0].length;i++)
				{
						res = res.replace(new RegExp(arr[0][i],"g"),arr[1][i]);				
				}
		return res;
}


/******************************************************
	function name:  translateHtml(str)
	function:		html字符集转换成符号
	parameters:     str：
	return:			
	description:   	添加查询模板
	date：			2010-01-07
********************************************************/	
function translateHtml(str){
		var arr = [["&lt;","&gt;","&amp;","&quot;"],["<",">","&","\""]];	
		var res = str;
			for(i=0;i<arr[0].length;i++)
			{
				res = res.replace(new RegExp(arr[0][i],"g"),arr[1][i]);						
			}
		return res;
}

/******************************************************
	function name:  translateOper(str)
	function:		html字符集转换成符号
	parameters:     str：
	return:			
	description:   	添加查询模板
	date：			2010-01-07
********************************************************/	
function translateOper(str){
		var arr = [["<",">","&","\""],["&lt;","&gt;","&amp;","&quot;"]];	
		var res = str;
			for(i=0;i<arr[0].length;i++)
			{
				res = res.replace(new RegExp(arr[0][i],"g"),arr[1][i]);						
			}
		return res;
}

/*******************************************************
				function name:    transferApos(str)
				function:		  替换字符串中特殊字符
				parameters:       str：替换字符串中
				return:			  返回根据替换过的字符
				description:     替换字符串中的"'" 符号 
								用于写入日志
********************************************************/
function transferApos(str){
		var arr = [
					["'"],
					["''"]
				];	
		var res = str;
		if(res==undefined){return;}
		for(i=0;i<arr[0].length;i++)
		{
			res = res.replace(new RegExp(arr[0][i],"g"),arr[1][i]);						
		}
		return res;
}
/*******************************************************
				function name:    untransferApos(str)
				function:		  替换字符串中特殊字符
				parameters:       str：替换字符串中
				return:			  返回根据替换过的字符
				description:     替换字符串中的"''" 符号 
								用于页面执行数据字典中的sql语句
********************************************************/
function untransferApos(str){
		var arr = [
					["''"],
					["'"]
				];	
		var res = str;
		if(res==undefined){return;}
		for(i=0;i<arr[0].length;i++)
		{
			res = res.replace(new RegExp(arr[0][i],"g"),arr[1][i]);						
		}
		return res;
}

/******************************************************
	function name:  quotesC(str)
	function:		添加查询模板
	parameters:     str：
	return:			
	description:   	添加查询模板
	date：			2010-01-07
********************************************************/	
function quotesC(str){
		var arr = [["'"],["\""]];	
		var res = str;
			for(i=0;i<arr[0].length;i++)
			{
				res = res.replace(new RegExp(arr[0][i],"g"),arr[1][i]);						
			}
		return res;
}



/**********************************************************
				function name:   strtrimB(str)
				function:		 去除字符串中两端空格
				parameters:      str：需要操作的字符串
				return:			 返回修改之后的字符串
				description:     
********************************************************/		
function strtrimB(str) {
		if(str==undefined||str=="undefined"){}
		else{
				var pattern = str.replace(/^\s*/,"").replace(/\s*$/,"");
		}
		return pattern;
}

/**********************************************************
				function name:    getTariffBar(languageType,imenuid,tsdpname,groupid)
				function:		  资费设置头部菜单存储过程读取 
				parameters:       languageType：当前语言环境
								  imenuid：菜单id
								  tsdpname：存储过程的映射名称
								  groupid：用户权限组
				return:			  
				description:     资费设置头部菜单存储过程读取 
********************************************************/
function getTariffBar(languageType,imenuid,tsdpname,groupid){
	
	var navv = document.location.search;
	var infoo = "";			
	infoo = parseUrl(navv,"pmenuname","");
	var str ="&pmenuname="+infoo+"&imenuname=" ;
	var TariffBarA = [[],[],[]];
	var urlstr=tsd.buildParams({      packgname:'service',
				 					  clsname:'Procedure',
									  method:'exequery',
				 					  ds:'tsdBilling',//数据源名称 对应的spring配置的数据源
				 					  tsdpname:tsdpname,//存储过程的映射名称
				 					  tsdExeType:'query',
				 					  datatype:'xmlattr'
			 					});
	
		$.ajax({
				url:'mainServlet.html?'+urlstr,
				datatype:'xml',
				cache:false,//如果值变化可能性比较大 一定要将缓存设成false
				timeout: 1000,
				async: false ,//同步方式
				success:function(xml){
					$(xml).find('row').each(function(){
							TariffBarA[0].push($(this).attr("imenuid"));
							var s = getCaption($(this).attr("smenuname"),languageType,'');
							TariffBarA[1].push(s);
							TariffBarA[2].push($(this).attr("smenuurl"));
					});
				}
		});
		
		var TBarASize = TariffBarA[0].length;
		for(i=0;i<TBarASize;i++)
		{			
			var temp =str+TariffBarA[1][i];
						
			if(i==0){
				
				$("#tariffBar").append("<span class='padWid'>费率设置导航:</span>");
				if(TariffBarA[0][i]==imenuid){
					$("#tariffBar").append("<li><a href=\"javascript:openMenu('"+TariffBarA[0][i]+"','"+TariffBarA[2][i]+"','"+groupid+"','"+temp+"')\"  id='isActive'>" +TariffBarA[1][i]+ "</a></li>");
				}
				else{
					$("#tariffBar").append("<li><a href=\"javascript:openMenu('"+TariffBarA[0][i]+"','"+TariffBarA[2][i]+"','"+groupid+"','"+temp+"')\" >" +TariffBarA[1][i]+ "</a></li>");
				}
			}
			else{				
				$("#tariffBar").append('<span class="padWid"><img src="style/images/public/arrow_right.png"/></span>');
				if(TariffBarA[0][i]==imenuid){
					$("#tariffBar").append("<li><a href=\"javascript:openMenu('"+TariffBarA[0][i]+"','"+TariffBarA[2][i]+"','"+groupid+"','"+temp+"')\"  id='isActive'>" +TariffBarA[1][i]+ "</a></li>");
				}
				else{
					$("#tariffBar").append("<li><a href=\"javascript:openMenu('"+TariffBarA[0][i]+"','"+TariffBarA[2][i]+"','"+groupid+"','"+temp+"')\" >" +TariffBarA[1][i]+ "</a></li>");
				}
			}
		}				
}
/**********************************************************
				function name:    openMenu(key,key1,groupid)
				function:		  触发右侧菜单点击事件
				parameters:       key：菜单名称
								  key1：菜单id
								  groupid：用户权限组
								  str:存放当前所在位置信息
				return:			  
				description:     资费设置头部 点击打开对应的菜单,触发右侧菜单点击事件.
********************************************************/		
function openMenu(key,key1,groupid,str){
		//var treeid = mtree.aNodes[mtree.selectedNode].id
		//更新自己窗口内容
		document.location='mainServlet.html?pagename='+key1+"&imenuid="+key+"&groupid="+groupid+str;
		/**新旧菜单替换，暂时先无此功能
		//执行父窗口菜单
		parent.aler(key);
		*/
		parent.Ext.app.tsd.clickNodeById(key);
}
/**********************************************************
				function name:    openDiaQ(type,tablename)
				function:		  打开查询排序面板
				parameters:       type：操作方式 （query、delete、modify）
								  tablename：表明
				return:			  
				description:     
********************************************************/	
function openDiaQ(type,tablename){
	$('#queryName').val(type);
	if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
		window.showModalDialog("queryServlet.html?tablename="+tablename+"&url=/pubMode/search.jsp",window,"dialogWidth:700px; dialogHeight:500px; center:yes; scroll:no;status=no");
    }
    else{
		window.showModalDialog("queryServlet.html?tablename="+tablename+"&url=/pubMode/search.jsp",window,"dialogWidth:690px; dialogHeight:600px; center:yes; scroll:no;status=no");
	}
}	


/**********************************************************
				function name:   checkNum(str)
				function:		 判断是否全是数字
				parameters:      str：需要判断的字符
				return:			 返回判断结果：全为数字返回true、不全为数字返回false
				description:     
********************************************************/
function checkNum(str){return str.match(/\D/)==null ;} 
/**********************************************************
				function name:   printMark(key)
				function:		 往页面元素class值为mark的元素中添加红色*号，或则是去掉该好色*符号。
									作用给添加、修改面板中的必填项加*（红色）突出标注。
				parameters:      key：标识符，0：添加红色*号，1：去掉红色*号。
				return:			 
				description:     在必填项的后面加上  <span class="mark"></span>
								 在打开添加面板的是调用printMark(0)；给必填项添加"*".
								 在打开修改面板的时候调用printMark(1)；去掉必填项前添加"*".
********************************************************/				
function printMark(key){
	if(key==0){
		$(".mark").html("*");
	//	$(".mark").css("color","#ff0000");
		$(".mark").attr("style","float:left;line-height:24px;color:#ff0000");
		$(".mark1").html("*");
		$(".mark1").attr("style","float:left;line-height:24px;color:#ffffff");
	}
	else{
		$(".mark").empty();
		$(".mark1").empty();
	}
}
/**********************************************************
				function name:   setLabelN(key,prefix,suffix)
				function:		 给添加或修改面板中字段标签做国际化
				parameters:      key：表名
								 prefix:表单id值的开头
								 suffix:表单id值的结尾
				return:			 
				description:     给添加或修改面板中字段标签做国际化
********************************************************/
function setLabelN(key,prefix,suffix){
	//取出别名表中的相关表的所有字段名
	var fields = getFields(key);	
	var fieldarr = fields.split(",");	
	//获取数据表对应字段国际化信息
	var thisdata = loadData(key,'<%=languageType %>',1);					
	for(var j=0 ; j<fieldarr.length-1;j++){	
		var strO =$('#'+prefix+fieldarr[j]+suffix) ;
		//alert(strO.length);
		if(strO.length>0){		
			//给页面中存储字段的隐藏标签赋值			
			strO.html(thisdata.getFieldAliasByFieldName(fieldarr[j]));
		}
	}
}

/**********************************************************
				function name:   removeDisabled(key)
				function:		 将添加或修改面板中的字段置为可用 
				parameters:      key：表名
				return:			 
				description:     
********************************************************/
function removeDisabled(key){
	var fields = getFields(key);
	var fieldarr = fields.split(",");					
	for(var j = 0 ; j <fieldarr.length-1;j++){
		$('#'+fieldarr[j]).removeAttr("disabled");
	}
}
/**********************************************************
				function name:   isDisabled(key)
				function:		 将添加或修改面板中的字段置为不可用 
				parameters:      key：表名
				return:			 
				description:     
********************************************************/
function isDisabled(key){
	var fields = getFields(key);
	var fieldarr = fields.split(",");
	for(var j = 0 ; j <fieldarr.length-1;j++){
		$('#'+fieldarr[j]).attr("disabled","disabled");
	}
}
/**********************************************************
				function name:   removeDisabledN(key,prefix,suffix)
				function:		 将添加或修改面板中的字段置为可用 
				parameters:      key：表名
								 prefix:表单id值的开头
								 suffix:表单id值的结尾
				return:			 
				description:      是 removeDisabled(key)的 改进
********************************************************/
function removeDisabledN(key,prefix,suffix){
	var fields = getFields(key);
	var fieldarr = fields.split(",");					
	for(var j = 0 ; j <fieldarr.length-1;j++){			
			$('#'+prefix+fieldarr[j]+suffix).removeAttr("disabled");
			$('#'+prefix+fieldarr[j]+suffix).removeClass();			
			$('#'+prefix+fieldarr[j]+suffix).addClass("textclass");	
	}
}
/**********************************************************
				function name:   isDisabledN(key,prefix,suffix)
				function:		 将添加或修改面板中的字段置为不可用 
				parameters:      key：表名
								 prefix:表单id值的开头
								 suffix:表单id值的结尾
				return:			 
				description:   是 isDisabled(key)的 改进
********************************************************/
function isDisabledN(key,prefix,suffix){
	var fields = getFields(key);
	var fieldarr = fields.split(",");
	for(var j = 0 ; j <fieldarr.length-1;j++){		
			$('#'+prefix+fieldarr[j]+suffix).attr("disabled","disabled");	
			$('#'+prefix+fieldarr[j]+suffix).removeClass();		
			$('#'+prefix+fieldarr[j]+suffix).addClass("textclass2");					
	}
}
/**********************************************************
				function name:  buildParamsSqlByS(sourstr,key,key1,key2,key3)
				function:		sql配置文件数据访问参数拼接
				parameters:     sourstr:数据源
								key：操作类型
								key1:返回数据格式
								key2：执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
								key3：依赖tsdpk 用于计算分页的sql配置名称应在tsdcf配置的文件中指定
				return:			返回sql配置文件数据访问参数
				description:     
********************************************************/
function buildParamsSqlByS(sourstr,key,key1,key2,key3){
	//2011.11.22 wangli 目的：支持第6个参数，以改变配置文件名
	//修改前是tsdcf:'mssql'，修改后是tsdcf:configFile,具体见下面的代码
	var configFile = arguments[5];
	if(configFile==undefined)
	{
		configFile = 'mssql';
	}
	//end
		var urlstr=tsd.buildParams({  
							packgname:'service',//java包
							clsname:'ExecuteSql',//类名
							method:'exeSqlData',//方法名
							ds:sourstr,//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
							//tsdcf:'mssql',//指向配置文件名称
							tsdcf:configFile,//指向配置文件名称
							tsdoper:key,//操作类型 
							datatype:key1,//返回数据格式 
							tsdpk:key2,//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
							tsdpkpagesql:key3//依赖tsdpk 用于计算分页的sql配置名称应在tsdcf配置的文件中指定
			 				});
		return urlstr;
}


/**********************************************************
				function name:  buildParamsPro(key,key1)
				function:		存储过程数据访问参数拼接 
				parameters:     key：存储过程的映射名称
								key1:执行存储过程的方式
				return:			返回存储过程数据访问参数拼接
				description:     
********************************************************/
function buildParamsPro(key,key1){
	var urlstr=tsd.buildParams({
						packgname:'service',
			 			clsname:'Procedure',
						method:'exequery',
			 			ds:'tsdBilling',//数据源名称 对应的spring配置的数据源
			 			tsdpname:key,//存储过程的映射名称
			 			tsdExeType:key1,
			 			datatype:'xmlattr'
		 				});
	return urlstr;
}
/**********************************************************
				function name:  buildParamsSql(key,key1,key2,key3)
				function:		sql配置文件数据访问参数拼接
				parameters:     key：操作类型 
								key1:返回数据格式
								key2：执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
								key3：依赖tsdpk 用于计算分页的sql配置名称应在tsdcf配置的文件中指定
				return:			返回sql配置文件数据访问参数
				description:     
********************************************************/
function buildParamsSql(key,key1,key2,key3){
		var urlstr=tsd.buildParams({  
							packgname:'service',//java包
							clsname:'ExecuteSql',//类名
							method:'exeSqlData',//方法名
							ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
							tsdcf:'mssql',//指向配置文件名称
							tsdoper:key,//操作类型 
							datatype:key1,//返回数据格式 
							tsdpk:key2,//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
							tsdpkpagesql:key3//依赖tsdpk 用于计算分页的sql配置名称应在tsdcf配置的文件中指定
			 				});
		return urlstr;
}

/**********************************************************
				function name:  isNum2(val)
				function:		判断输入的字符是否为最多有两位小数
				parameters:     val：需要进行判断的字符串
								
				return:			返回 true val符合格式要求  false val不符合格式要求
				description:     
********************************************************/		
function isNum2(val)    
 {    
     var str = val;   
     if(str.length!=0){   
         reg=/^[-\+]?\d+(\.?\d{0,2})$/;   
		 if(!reg.test(str)){   
		     return false;
		 }   
      }   
      return true;
 } 
 /**********************************************************
				function name:  isButie(val)
				function:		判断输入的字符是否为最多有四位小数，整数位最多5位
				parameters:     val：需要进行判断的字符串
								
				return:			返回 true val符合格式要求  false val不符合格式要求
				description:     
********************************************************/ 
function isButie(val)    
 {    
     var str = val;   
     if(str.length!=0){   
         reg=/^([-\+]?\d{0,5})+(\.?\d{0,4})$/;   
		 if(!reg.test(str)){   
		     return false;
		 }   
      }   
      return true;
 }  
  /**********************************************************
				function name:  isNum4(val)
				function:		判断输入的字符是否为最多有4位小数  
				parameters:     val：需要进行判断的字符串
								
				return:			返回 true val符合格式要求  false val不符合格式要求
				description:     
********************************************************/ 
function isNum4(val)    
 {    
     var str = val;   
     if(str.length!=0){   
         reg=/^[-\+]?\d+(\.?\d{0,4})$/;   
		 if(!reg.test(str)){   
		     return false;
		 }   
      }   
      return true;
 }  
  /**********************************************************
				function name:  isDigit(value)
				function:		判断输入的字符是否整数 
				parameters:     value：需要进行判断的字符串
								
				return:			返回 true val符合格式要求  false val不符合格式要求
				description:     
********************************************************/ 			 
function isDigit(value){				
	var patrn=/^[0-9]\d*$/; 
	if (patrn.exec(value)==null) {
		return false;
	}	
	return true;
}
/**********************************************************
	function name:  getDateD()
	function:		获取系统时间
	parameters:     
					
	return:			返回 时间格式0000-00-00
	description:     
********************************************************/ 	
function getDateD()
{
	  var d,s,t;
	  d=new Date();
	  s=d.getFullYear().toString(10)+"-";
	  t=d.getMonth()+1;
	  s+=(t>9?"":"0")+t+"-";
	  t=d.getDate();
	  s+=(t>9?"":"0")+t;
	  return s;
}
 /**********************************************************
	function name:  getDateS()
	function:		获取系统时间
	parameters:     
					
	return:			返回 时间格式 0000-00-00 00:00:00
	description:     
********************************************************/ 
function getDateS()
{
  var d,s,t;
  d=new Date();
  s=d.getFullYear().toString(10)+"-";
  t=d.getMonth()+1;
  s+=(t>9?"":"0")+t+"-";
  t=d.getDate();
  s+=(t>9?"":"0")+t+" ";
  t=d.getHours();
  s+=(t>9?"":"0")+t+":";
  t=d.getMinutes();
  s+=(t>9?"":"0")+t+":";
  t=d.getSeconds();
  s+=(t>9?"":"0")+t;
  return s;
}
 /**********************************************************
	function name:  getLoadP(languageType,tablename)
	function:		去别名表里取当前表字段的别名，并进行解析
	parameters:     languageType：当前语言环境
					tablename ：表名
					
	return:			返回 数组，数组存放表对应的 字段，别名 ，字段类型
	description:      国际化时要用到的函数，
********************************************************/ 			
function getLoadP(languageType,tablename){
	
	var str = [[],[],[]];
	var urlstr=tsd.buildParams({ 	
	 		 						packgname:'service',//java包
				 					clsname:'ExecuteSql',//类名
				 					method:'exeSqlData',//方法名
				 					ds:'tsdBilling',//数据源名称 对应的WEB-INF/classes/ApplicationContent.xml中配置的数据源
				 					tsdcf:'mssql',//指向配置文件名称
				 					tsdoper:'query',//操作类型 
				 					datatype:'xmlattr',//返回数据格式 
				 					tsdpk:'main.fetchInfo'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
				 				});
		$.ajax({
		url:'mainServlet.html?'+urlstr+'&table='+tablename,
		datatype:'xml',
		cache:false,//如果值变化可能性比较大 一定要将缓存设成false
		timeout: 1000,
		async: false ,//同步方式
		success:function(xml){
			$(xml).find('row').each(function(){
				var i18str1 = $(this).attr("field_name");
				// 字段
				str[0].push(i18str1); 
				
				var i18str2 = $(this).attr("field_alias");
				
				/*100308
				
				if(i18str2==''||i18str2==null){}
				else{
					var arr = i18str2.split("/}");
					if(arr.length==1){
						
					}
					else{
						 i18str2 = getCaption(i18str2,languageType,'');
					}
				}
				*/
				var arr = i18str2.split("/}");
					if(arr.length==1){
						
					}
					else{
						 i18str2 = getCaption(i18str2,languageType,'');
					}
				//国际化别名
				str[1].push(i18str2); 
				var i18str3 = $(this).attr("DataType");
				//字段类型
				str[2].push(i18str3); 
				
			});
		}
	});
	return str;
}
 /**********************************************************
	function name:  getI18nNoLan(languageType,tablename)
	function:		去别名表里取当前表字段的别名，并进行解析
	parameters:     languageType：当前语言环境
					tablename ：表名
					
	return:			返回 数组，数组存放表对应的 字段，别名 ，
	description:    国际化时要用到的函数，
********************************************************/ 	
function getI18nNoLan(languageType,tablename){
	
	var  str = [[],[]];
	var urlstr=tsd.buildParams({ 	
	 		 						packgname:'service',//java包
				 					clsname:'ExecuteSql',//类名
				 					method:'exeSqlData',//方法名
				 					ds:'tsdBilling',//数据源名称 对应的WEB-INF/classes/ApplicationContent.xml中配置的数据源
				 					tsdcf:'mssql',//指向配置文件名称
				 					tsdoper:'query',//操作类型 
				 					datatype:'xmlattr',//返回数据格式 
				 					tsdpk:'main.fetchInfo'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
				 				});
		$.ajax({
		url:'mainServlet.html?'+urlstr+'&table='+tablename,
		datatype:'xml',
		cache:false,//如果值变化可能性比较大 一定要将缓存设成false
		timeout: 1000,
		async: false ,//同步方式
		success:function(xml){
			$(xml).find('row').each(function(){
				var i18str = $(this).attr("Field_Alias");
				var s = '';
				if(i18str==''||i18str==null){}
				else{
					var arr = i18str.split("/}");
					if(arr.length==1){
						 s=i18str;
					}
					else{
						 s = getCaption(i18str,languageType,'');
					}
				}
				var i18str1 = $(this).attr("Field_Name");
				str[0].push(i18str1); 
				str[1].push(s);
				//str = str+s+',';
			});
		}
	});
	return str;
}	
 /**********************************************************
	function name:  cjkEncode(text)
	function:		打印报表，传参之前需先要将参数转码，
	parameters:     text：需要进行转码的字符串				
	return:			返回 转码后的字符串
	description:     打印报表，需要将查询参数传过去，传参之前需先要将参数转码，
					对URL或者只对URL里面的参数名字和参数值，进行cjkEncode的编码
	如%，#，$，&，/，?，+，=，@等字符时，需要在cjkEncode之后，再次调用javascript的encodeURIComponent对这些特殊字符进行编码。
********************************************************/ 	
function cjkEncode(text) {   
		if (text == null) {   
	        return "";   
	    }   
		var newText = "";   
	    for (var i = 0; i < text.length; i++) {   
	        var code = text.charCodeAt (i);    
	        if (code >= 128 || code == 91 || code == 93) {//91 is "[", 93 is "]".   
	            newText += "[" + code.toString(16) + "]";   
	        } else {   
	            newText += text.charAt(i);   
	        }   
	    }   
	 return newText;   
} 
 /**********************************************************
	function name:  getPriParams()
	function:		打印报表，报表查询参数的生产 
	parameters:     			
	return:			返回 报表查询参数
	description:     打印报表，需要将查询参数传过去，此方法生成参数
	
	在printThisReport('tariff/Repeaters',getPriParams())方法中用到
********************************************************/ 
function getPriParams(){
	var params='';
	var fusearchsql = encodeURIComponent(cjkEncode($("#fusearchsql").val()));
 	//如果有可能值是汉字 请使用encodeURI()函数转码
 	params+='&fusearchsql='+fusearchsql;			 	
 	if(params=='&fusearchsql='){
		params +='1=1';
	}
	
	return params;
}
 /**********************************************************
	function name:  getGridNameModel(tablename)
	function:		从别名表中获取 页面数据表的别名 字段名
	parameters:     tablename ：表名			
	return:			返回 报表查询参数
	description:     根据等到的字段名 别名 生成grid的头部
					根据字段名生成sql语句的查询字段   
********************************************************/				
function getGridNameModel(tablename){
 	//获取数据表对应字段国际化信息
	var languageType = $("#languageType").val();
	var gridA =[[],[],[]];
	var colNames=[];
	var colModels=[];
	var temp='';
	
	//获取别名表中本数据表信息
	var strarr = getI18nNoLan(languageType,tablename);
	
	/**********************************************************
	**************** 用于生成下载的sql语句的查询语句****************
	************************************************************/
			var params = '';
			for (i=0;i<strarr[0].length;i++){
				if(i==0)
					params += strarr[0][i]+ ' as ' +strarr[1][i];
				else
					params += ","+strarr[0][i]+ ' as ' +strarr[1][i];
					//params += ","+FAlias[i]+ ' as ' +tsd.encodeURIComponent(FName[i]);
			}
			$("#121").val(params);
	/******************************************************************
	* 生成grid 标题  colModels 存放grid colModel信息 colNames 存放grid colName信息 *
	**     生成的grid没有操作列      * *
	*********************************************************************/	
		//生成操作列name,index信息
		for(i=0;i<strarr[0].length;i++){
			temp = "{name:'"+ strarr[0][i] + "',index:'" + strarr[0][i] + "',width:80}";
			colModels.push(eval("(" + temp + ")"));
		}
		gridA[0]=strarr[1];
		gridA[1]=colModels;
		$("#cols").val(strarr[0]);
		return gridA;
}

 /**********************************************************
	function name:  isCheckedAll(name,state)
	function:		复选框控件的 全选、反选 按钮事件   
	parameters:     name ：该复选框的name值
					state：目前操作状态 ture 全选  false 反选。
	return:			
	description:    复选框控件的  全选、反选 按钮事件  
	date：			2009-12-29
********************************************************/	

function isCheckedAll(name,state){
	var tagname=document.getElementsByName(name);  
	if(state==true){
		for(var i=0;i<tagname.length;i++){
        	tagname[i].checked = state;
    	} 
	}
	else{
		for(var i=0;i<tagname.length;i++){
        	if(tagname[i].checked ==true) {
        		tagname[i].checked =false
        	}else{
        		tagname[i].checked =true
        	}        	
    	}
	}        
}
 /**********************************************************
	function name:  getTheChecked(name,key)
	function:		获取被选中的值  
	parameters:     name ：该复选框的name值
					key	 ：个值之间的链接符 ~，+ ，,等
	return:			thevalue ：被选项和链接符拼接的结果。
	description:    复选框控件 获取被选中的值 ；其中key为各值之间的链接符，
	date：			2009-12-29
********************************************************/				

function getTheChecked(name,key){
	var thename=document.getElementsByName(name);  
    
    var thevalue = '';
    for(var i=0;i<thename.length;i++){
    	if(thename[i].checked==true){
    		thevalue += thename[i].value + key;
    	}
    }
    var num = thevalue.lastIndexOf(key);
	thevalue = thevalue.substring(0,num);	
	
	$('#thecheckedvalue').val(thevalue);
	if(thevalue.indexOf(key)==0){
		thevalue = thevalue.substring(1,thevalue.length);
	}	
    return thevalue;
}
/**********************************************************
	function name:  getCheckValue(id,id2,id3,name,oper)
	function:		将选中的值赋给指定输入区 
	parameters:     id 	 ：该复选框textarea的 id值
					id2	 ：存放复选框的span的id值
					id3	 : 存放textarea的span标签的id值
					name :	该复选框的name值
					oper :	各值之间的链接符 ~，+ ，,等
	return:			
	description:   将选中的值赋给指定输入区
	date：			2009-12-29
********************************************************/	
function getCheckValue(id,id2,id3,name,oper){
	$('#'+id).val('');
	$('#'+id).val(getTheChecked(name,oper));
	document.getElementById(id2).style.display = 'none';
	document.getElementById(id3).style.display = '';				
}
/**********************************************************
	function name:  cancelTheOper(str,thestr)
	function:		复选框 取消按钮 操作
	parameters:     str 	 ：存放textarea的span标签的id值
					thestr	 ：存放复选框的span的id值					
	return:			
	description:    复选框 取消按钮 操作
	date：			2009-12-29
********************************************************/
function cancelTheOper(str,thestr){	
	document.getElementById(str).style.display='block';
	document.getElementById(thestr).style.display='none';
}
/**********************************************************
	function name:  forChecked(name,thisvalue,oper)
	function:		复选框 标识被选上的复选框
	parameters:     name 	 	：该复选框的name值
					thisvalue	：textarea的中值	
					oper	 	：各值之间的链接符 ~，+ ，,等			
	return:			
	description:    复选框 标识被选上的复选框
	date：			2009-12-29
********************************************************/	
function forChecked(name,thisvalue,oper){
	if(''!=thisvalue&&null!=thisvalue){
		var thenum = thisvalue.lastIndexOf(oper);
		var m = 0;
		if(thenum==-1){
		thisvalue += oper;
		m = 1;
		}
		var thearr = thisvalue.split(oper);
		var tagname=document.getElementsByName(name);
	  
	//获取name的所有的值
		for(var i = 0 ; i < tagname.length;i++){
		//获取以前的记录选中值
			for(var j = 0;j<thearr.length-m;j++){
			if(strtrim(tagname[i].value)==strtrim(thearr[j])){
			        tagname[i].checked = true;
			        break;
			    }
			}
		}
	}
}

/******************************************************
在使用模板查询页面时，需要将次面板加到页面中，
<form action="#" name="addquery" style="display: none" id="addquery" onsubmit="return false;">
				<div id="input-Unit">
					<div class="title">
						<h3></h3>
						 <div class="lguanbi"  onclick="javascript:$('#Qclose').click();"><a href="#" onclick="javascript:$('#Qclose').click();"><fmt:message key="global.close" /></a></div>
					</div>
					<div id="inputtext">
						<p>
							<label>
								<span id="nameg_mod">
									<fmt:message key="oper.modName"/>
								</span>
							</label>
							<input type="text" name="name_mod" id="name_mod" onkeyup="this.value=replaceStrsql(this.value,80)"></input>
							<font style="color: #ff0000;float: left;margin-left: 2px;">*</font>
						</p>
					</div>
				</div>			
					<div id="buttons">						
						<button type="button" onclick="saveQuery(1);">
							<fmt:message key="global.save" />
						</button>
						<button type="button" id="Qclose">							
							<fmt:message key="global.close" />
						</button>
					</div>
				
			</form>

将下面隐藏域加入页面中
				<!-- 查询树信息存放 -->
				<input type="hidden" id='treepid' />	
				<input type="hidden" id='treecid' />	
				<input type="hidden" id='treestr' />	
				<input type="hidden" id='treepic' />	
				
				<!-- 高级查询 模板隐藏域 -->
				<input type="hidden" id="queryright"/>
				<input type="hidden" id="queryMright"/>
				<input type="hidden" id="saveQueryMright"/>		
				
				<input type="hidden" id="useridd" value="<%=userid %>"/>
				
将下面按钮加入到面板中			
			<button type="button" onclick="openQuery();">
				<!--查询-->
				<fmt:message key="global.query" />
			</button>
			<button id='mbquery1' onclick='openQueryM(1);' >
				<!--模板查询--><fmt:message key="oper.mod"/>
			</button>
			<button id='gjquery1' onclick="openDiaQ('query','vw_radhuizong');" disabled="disabled">
				<!--高级查询-->
				<fmt:message key="oper.queryA"/>
			</button>
			<button id='savequery1' onclick="opensaveQ();" disabled="disabled">
				<!--保存本次查询--><fmt:message key="oper.modSave"/>
			</button> 
			
权限控制
加载
//queryright queryMright saveQueryMright
			var queryright = $("#queryright").val();			
			var saveQueryMright = $("#saveQueryMright").val();
			
			if(queryright=="true"){
				document.getElementById("gjquery1").disabled=false;
				document.getElementById("gjquery2").disabled=false;
			}		
			if(saveQueryMright=="true"){
				document.getElementById("savequery1").disabled=false;
				document.getElementById("savequery2").disabled=false;
			}
			**************************************************************
			//queryright queryMright saveQueryMright
			var queryMright = $("#queryMright").val();
			if(queryMright=="true"){
				document.getElementById("mbquery1").disabled=false;
				document.getElementById("mbquery2").disabled=false;
			}
			****************************************************************
			
获取权限方法里
				var queryright = '';				
				var queryMright = '';
				var saveQueryMright ='';
				
				queryright += getCaption(spowerarr[i],'query','')+'|';
				queryMright += getCaption(spowerarr[i],'queryM','')+'|';
				saveQueryMright += getCaption(spowerarr[i],'saveQueryM','')+'|';
				
				
						$("#queryright").val(str);						
						$("#queryMright").val(str);
						$("#saveQueryMright").val(str);
				
					var hasquery = queryright.split('|');
					var hasqueryM = queryMright.split('|');
					var hassaveQueryM = saveQueryMright.split('|');
					
					for(var i = 0;i<hasquery.length;i++){
						if(hasquery[i]=='true'){
							$("#queryright").val(str);
							break;
						}
					}					
					for(var i = 0;i<hasqueryM.length;i++){
						if(hasqueryM[i]=='true'){
							$("#queryMright").val(str);
							break;
						}
					}
					
					for(var i = 0;i<hassaveQueryM.length;i++){
						if(hassaveQueryM[i]=='true'){
							$("#saveQueryMright").val(str);
							break;
						}
					}
					
					
						
					

<button onclick='generateTree();'> 打印查询树</button>

*********************************************************/
/******************************************************
	function name:  openModT()
	function:		打开保存面板,添加查询模板
	parameters:     tablename：表名
					flag ：标识
	return:			
	description:  	打开保存面板,添加查询模板
	date：			2010-02-26
	新的面板样式
********************************************************/
function openModT(tablename,flag){		
		//判断打开该模板为查询的按钮 和 隐藏域中存放的查询信息是不是属于同一表
			//id为searcholdtabStatus 的隐藏域中存放最近一次使用通用查询分享卡的标识
		var oldtabStatus = $("#searcholdtabStatus").val();
		if(typeof(flag)=='undefined'){flag='false';}
		var newtabStatus = tablename+flag;
		
		//获取查询树信息
		var fusearchsql = $("#fusearchsql").val();	
		var treepid = $("#treepid").val();
		
		if(oldtabStatus==newtabStatus || arguments.length==0){
				if(treepid!=''&&fusearchsql!='&fusearchsql='&&fusearchsql!=''){					
					$(".top_03").html('查询模板保存');//标题
					clearText('addquery');
					autoBlockFormAndSetWH('modT',60,5,'closeModB',"#ffffff",false,1000,'');//弹出查询面板
					return ;
				}	
		}
		alert('请先用高级查询，在保存。');
		clearModTree();
		return;						
}


/******************************************************
	function name:  closeoMod()
	function:		关闭表格面板
	parameters:     
	return:			
	description:  	关闭表格面板
	date：			2010-02-26
	新的面板样式
********************************************************/
function closeoMod(){		
		clearText('addquery');
		setTimeout($.unblockUI, 7);//关闭面板		
}
/******************************************************
	function name:  saveModQuery(key)
	function:		添加查询模板
	parameters:     key：一个页面有多个jgrid时，用于判断目前操作的是哪个jgrid
	return:			
	description:   	添加查询模板
	date：			2010-02-26
********************************************************/			
function saveModQuery(key){
		//获取 用户 用户组 菜单id信息
		var userid = $('#useridd').val();	
		var groupid = $('#zid').val();
		var imenuid = $('#imenuid').val();
		
		//获取查询树信息
		var fusearchsql = $("#fusearchsql").val();
		var treepid = $("#treepid").val();
		var treecid = $("#treecid").val();
		var treestr = $("#treestr").val();
		var treepic = $("#treepic").val();
		
		
		//获取模板标题
		var name = $("#name_mod").val();
		if(name==null||name==''){
			alert("请输入模板标题！");
			$("#name_mod").focus();
			return false;
		}	
		fusearchsql=quotesC(tsd.encodeURIComponent(fusearchsql));
		name=tsd.encodeURIComponent(name);
		var params='';
		params='&name='+name+'&menid='+imenuid+'&userid='+userid+'&groupid='+groupid+'&querysql='+fusearchsql+'&tabpage='+key;	
		var urlstr=tsd.buildParams({  
									packgname:'service',//java包
									clsname:'ExecuteSql',//类名
									method:'exeSqlData',//方法名
									ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
									tsdcf:'mssql',//指向配置文件名称
									tsdoper:'exe',//操作类型
									datatype:'xml',//返回数据格式
									tsdpk:'search.saveM'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
		});
		urlstr+=params;
		//此处的url参数主要修改tsdpname（对应存储过程的名称）、tsdExeType(操作类型)
		$.ajax({
		url:'mainServlet.html?'+urlstr,
		cache:false,//如果值变化可能性比较大 一定要将缓存设成false
		timeout: 1000,
		async: false ,//同步方式
			success:function(msg){
				if(msg=="true"){
					
				}
			}
		});	
						
		//获取模板qid
		var qid ='';
		var urlstr1=tsd.buildParams({  
								  packgname:'service',//java包
								  clsname:'ExecuteSql',//类名
								  method:'exeSqlData',//方法名
								  ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
								  tsdcf:'mssql',//指向配置文件名称
								  tsdoper:'query',//操作类型 
								  datatype:'xmlattr',//返回数据格式 
								  tsdpk:'search.getMaxid'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
								});	
		$.ajax({
			url:'mainServlet.html?'+urlstr1,
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
					qid = $(this).attr("qid");											
				});
			}
		});
		var pidA = treepid.split(',');
		var cidA = treecid.split(',');
		var strA = treestr.split(',');
		var picA = treepic.split(',');
		var lenT= pidA.length;
		//在页面上拼接sql语句，insert into ，把多条语句拼接完之后一并执行。<insertstr>
		//var insertstr='begin  ';
		var insertstr='   ';
		for(var i=0;i<lenT;i++){
			insertstr+="INSERT INTO query_tree(pid,cid,notestr,notepic,qid) VALUES("+pidA[i]+","+cidA[i]+",'"+strA[i]+"','"+picA[i]+"',"+qid+");";
		}
		//insertstr+= " end ;";
		var urlstr2=tsd.buildParams({  
						packgname:'service',//java包
						clsname:'ExecuteSql',//类名
						method:'exeSqlData',//方法名
						ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
						tsdcf:'mssql',//指向配置文件名称
						tsdoper:'exe',//操作类型
						datatype:'xml',//返回数据格式
						tsdpk:'search_tree.save'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
		});
		urlstr2+='&insertstr='+encodeURIComponent(insertstr);
		//此处的url参数主要修改tsdpname（对应存储过程的名称）、tsdExeType(操作类型)
		$.ajax({
		url:'mainServlet.html?'+urlstr2,
		cache:false,//如果值变化可能性比较大 一定要将缓存设成false
		timeout: 1000,
		async: false ,//同步方式
			success:function(msg){
				if(msg=="true"){
					var successful = $("#successful").val();
					alert(successful);
					setTimeout($.unblockUI, 15);//关闭面板
					closeoMod();
				}
			}
		});	
		
		//清空查询树信息		
		var treepid = $("#treepid").val('');
		var treecid = $("#treecid").val('');
		var treestr = $("#treestr").val('');
		var treepic = $("#treepic").val('');
}

/******************************************************
	function name:  opensaveQ()
	function:		打开保存面板,添加查询模板
	parameters:     
	return:			
	description:  	打开保存面板,添加查询模板
	date：			2010-01-07
********************************************************/
function opensaveQ(){		
		//获取查询树信息
		var fusearchsql = $("#fusearchsql").val();	
		var treepid = $("#treepid").val();
		if(treepid==''||fusearchsql=='&fusearchsql='){
			alert('请先用高级查询，在保存。');
			return;
		}
	 	var addinfo = $("#addinfo").val(); 	
	 	tsd.setTitle($("#input-Unit .title h3"),addinfo); 	
		clearText('addquery');
		hideError();//隐藏错误信息	
		autoBlockFormAndSetWH('addquery',60,60,'Qclose',"#ffffff",false,730,'');//弹出查询面板
}
/******************************************************
	function name:  saveQuery()
	function:		添加查询模板
	parameters:     
	return:			
	description:   	添加查询模板
	date：			2010-01-07
********************************************************/			
function saveQuery(key){
		//获取 用户 用户组 菜单id信息
		var userid = $('#useridd').val();	
		var groupid = $('#zid').val();
		var imenuid = $('#imenuid').val();
		//获取查询树信息
		var fusearchsql = $("#fusearchsql").val();
		var treepid = $("#treepid").val();
		var treecid = $("#treecid").val();
		var treestr = $("#treestr").val();
		var treepic = $("#treepic").val();
		
		
		//获取模板标题
		var name = $("#name_mod").val();
		if(name==null||name==''){
			//<fmt:message key='tariff.input'/><fmt:message key='oper.modName'/>
			alert("请输入模板标题！");
			$("#name_mod").focus();
			return false;
		}	
		fusearchsql=quotesC(tsd.encodeURIComponent(fusearchsql));
		name=tsd.encodeURIComponent(name);
		var params='';
		params='&name='+name+'&menid='+imenuid+'&userid='+userid+'&groupid='+groupid+'&querysql='+fusearchsql+'&tabpage='+key;	
		var urlstr=tsd.buildParams({  
									packgname:'service',//java包
									clsname:'ExecuteSql',//类名
									method:'exeSqlData',//方法名
									ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
									tsdcf:'mssql',//指向配置文件名称
									tsdoper:'exe',//操作类型
									datatype:'xml',//返回数据格式
									tsdpk:'search.saveM'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
		});
		urlstr+=params;
		//此处的url参数主要修改tsdpname（对应存储过程的名称）、tsdExeType(操作类型)
		$.ajax({
		url:'mainServlet.html?'+urlstr,
		cache:false,//如果值变化可能性比较大 一定要将缓存设成false
		timeout: 1000,
		async: false ,//同步方式
			success:function(msg){
				if(msg=="true"){
					
				}
			}
		});	
						
		//获取模板qid
		var qid ='';
		var urlstr1=tsd.buildParams({  
								  packgname:'service',//java包
								  clsname:'ExecuteSql',//类名
								  method:'exeSqlData',//方法名
								  ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
								  tsdcf:'mssql',//指向配置文件名称
								  tsdoper:'query',//操作类型 
								  datatype:'xmlattr',//返回数据格式 
								  tsdpk:'search.getMaxid'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
								});	
		$.ajax({
			url:'mainServlet.html?'+urlstr1,
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
					qid = $(this).attr("qid");											
				});
			}
		});
		var pidA = treepid.split(',');
		var cidA = treecid.split(',');
		var strA = treestr.split(',');
		var picA = treepic.split(',');
		var lenT= pidA.length;
		//在页面上拼接sql语句，insert into ，把多条语句拼接完之后一并执行。<insertstr>
		var insertstr='begin ';
		for(var i=0;i<lenT;i++){
			insertstr+="INSERT INTO query_tree(pid,cid,notestr,notepic,qid) VALUES("+pidA[i]+","+cidA[i]+",'"+strA[i]+"','"+picA[i]+"',"+qid+");";
		}
		insertstr+="  end;";		
		//alert(insertstr);
		
		var urlstr2=tsd.buildParams({  
						packgname:'service',//java包
						clsname:'ExecuteSql',//类名
						method:'exeSqlData',//方法名
						ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
						tsdcf:'mssql',//指向配置文件名称
						tsdoper:'exe',//操作类型
						datatype:'xml',//返回数据格式
						tsdpk:'search_tree.save'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
		});
		urlstr2+='&insertstr='+encodeURIComponent(insertstr);
		//此处的url参数主要修改tsdpname（对应存储过程的名称）、tsdExeType(操作类型)
		$.ajax({
		url:'mainServlet.html?'+urlstr2,
		cache:false,//如果值变化可能性比较大 一定要将缓存设成false
		timeout: 1000,
		async: false ,//同步方式
			success:function(msg){
				if(msg=="true"){
					var operationtips = $("#operationtips").val();
					var successful = $("#successful").val();
					jAlert(successful,operationtips);
					setTimeout($.unblockUI, 15);//关闭面板
					
				}
			}
		});	
		
		//清空查询树信息
		clearModTree();	
}
/******************************************************
	function name:  clearModTree()
	function:		清空查询树信息
	parameters:     str：
	return:			
	description:   	生成树
	date：			2010-01-07
********************************************************/
function clearModTree(){		
		var treepid = $("#treepid").val('');
		var treecid = $("#treecid").val('');
		var treestr = $("#treestr").val('');
		var treepic = $("#treepic").val('');
}


/******************************************************
	function name:  generateTree(str)
	function:		生成树
	parameters:     str：
	return:			
	description:   	生成树
	date：			2010-01-07
********************************************************/
function generateTree()
{				
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
			url:'mainServlet.html?'+urlstr+'&qid=24',
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
		$("#111").html(dmtree.toString());
		
}
/******************************************************
	function name:  openQueryM(key)
	function:		打开查询模板页面
	parameters:     key：标识符
	return:			
	description:   	打开查询模板页面
	date：			2010-01-07
********************************************************/
function openQueryM(key){
		//获取 用户 用户组 菜单id信息
		var userid = $('#useridd').val();	
		var groupid = $('#zid').val();
		var imenuid = $('#imenuid').val();
		window.showModalDialog('mainServlet.html?pagename=pubMode/searchMod.jsp&imenuid='+imenuid+'&groupid='+groupid+'&tabpage='+key,window,"dialogWidth:570px; dialogHeight:450px; center:yes; scroll:yes");
} 
/******************************************************
	function name:   displayFields(tablename)
	function:		拼接要显示的数据列
	parameters:     tablename： 表名
	return:			导出sql字符串
	description:   	导出功能中 拼接要显示的数据列
	date：			2010-01-18
********************************************************/
function displayFields(tablename){
					var thearr = new Array();
					var  languageType = $("#languageType").val();
						 var urlstr=tsd.buildParams({
    										packgname:'service',//java包
						 					clsname:'ExecuteSql',//类名
						 					method:'exeSqlData',//方法名
						 					ds:'tsdBilling',//数据源名称 对应的WEB-INF/classes/ApplicationContent.xml中配置的数据源
						 					tsdcf:'mssql',//指向配置文件名称
						 					tsdoper:'query',//操作类型 
						 					datatype:'xmlattr',//返回数据格式 
						 					tsdpk:'roleManager.gettheeditfields'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
						 					});
						$.ajax({
							url:'mainServlet.html?'+urlstr+'&tablename='+tablename,
							datatype:'xml',
							cache:false,//如果值变化可能性比较大 一定要将缓存设成false
							timeout: 1000,
							async: false ,//同步方式
							success:function(xml){
								$(xml).find('row').each(function(){
										var thefieldname = $(this).attr("Field_Name".toLowerCase()) ;
										var thefieldalias = getCaption($(this).attr("Field_Alias".toLowerCase()),languageType,'');
										if(thefieldalias!=''){
											var disvalue = thefieldname + ' as ' + '"'+tsd.encodeURIComponent(thefieldalias)+'"';//---chen xiaohua,在tsd.encodeURIComponent(thefieldalias)这个语句两边加上双引号。
											thearr.push(disvalue);
										}
								 });
							 }
						 });
					return thearr;
				}
/**********************************************************
	function name:  printField()
	function:		在页面上打印出排序时的下拉列表
	parameters:    	
	return:			
	description:  在页面中id为 orderName+i的下拉列表中打印表的字段和字段别名， 
********************************************************/	
function printField(){
	var selsValues = ["","Zjjx","ZjjxZu","Zjfj","Bjfj","Jxlx"];
	var selsD = ["",Zjjxg,ZjjxZug,Zjfjg,Bjfjg,Jxlxg];
	var selsValueSize = selsValues.length;
	for(i=1;i<6;i++)
	{
		for(j=0;j<selsValueSize;j++)
		{
			$("#orderName"+i).append("<option value=\"" + selsValues[j] + "\">"+ selsD[j] + "</option>");
		}
	}
}

/**********************************************************
				function name:   setTableFields(key,prefix,suffix)
				function:		 字段权限域控制
				parameters:      tablename：表名
								 prefix:表单id值的开头
								 suffix:表单id值的结尾
				return:			 
				description:     
********************************************************/

function setTableFields(tablename,prefix,suffix){
		//获取权限表中的可编辑域信息
		var editfields = $("#editfields").val();
		
		/*************************************
		**   将当前表的所有字段取出来，分割字符串 ***
		*************************************/
		var fields = getFields(tablename);
		var fieldarr = fields.split(",");
		/**********************************
		**   将当前表中的可编辑字段取出来 *****
		**********************************/
		var spower = editfields.split(",");
		
		/***************************
		**  考虑字段大小写问题   *****
		*************************/
		var atr = '';
		for(var i = 0 ; i <spower.length;i++){
			atr+=spower[i]+'@';	
		}			
		var atrarr = atr.split('@');
		var arr = atrarr.sort();			
		if(arr.length>0){
			for(var i=1;i<arr.length;i++){
				for(var j = 0 ; j <fieldarr.length-1;j++){
					if(arr[i]==fieldarr[j]){													
						
						$('#'+prefix+arr[i]+suffix).removeAttr("disabled");									
						$("#"+prefix+arr[i]+suffix).removeClass();
						$("#"+prefix+arr[i]+suffix).addClass("textclass");											
						break;
					}
				}
			}
		}
}


/**********************************************************
				function name:   logwritePub(tablename,status,content,condition,title)
				function:		 写日志
				parameters:      tablename:表名 
								 status ：状态 ：1添加 2删除 3修改 4批量删除 5批量修改
								 content ：写入日志的内容
								 condition：条件，查询或删除条件
								 title : 菜单名称，不写js自动取得
				return:			 
				description:     写日志
				Date:			 2010-10-9  
********************************************************/
function logwritePub(tablename,status,content,condition,title){	
	tsd.QualifiedVal=true; 	
	var str = '';	
	if(title != undefined){
		str = tsd.encodeURIComponent(title);		
	}
	switch(status){
		case 1:
		///增加		
				writeLogInfo(str,"add",tsd.encodeURIComponent("("+tablename+")"+$("#addinfo").val()+" : "+content));				
				break;
		case 2:
		///删除		
				writeLogInfo(str,"delete",tsd.encodeURIComponent("("+tablename+")"+$("#deleteinfo").val()+" : "+condition));
				break;			
		case 3:
		///修改
				writeLogInfo(str,"edit",tsd.encodeURIComponent("("+tablename+")"+$("#editinfo").val()+" : "+content+"。"+$("#conditions").val()+" : "+condition));			
				break;			
		case 4:
		///批量删除		
				writeLogInfo(str,"Bulk Delete",tsd.encodeURIComponent("("+tablename+")"+$("#deletebinfo").val()+" :"+condition));	
				break;
		case 5:
		///批量修改		
				writeLogInfo(str,"Batch Edit",tsd.encodeURIComponent("("+tablename+")"+$("#modifybinfo").val()+" "+content+" 。 "+$("#conditions").val()+" :"+condition));	
				break;			
	}
		
	//每次拼接参数必须添加此判断
	if(tsd.Qualified()==false){return false;}
}

/**********************************************************
				function name:  TextUtil.NotMax
				function:		判断该字符串长度是否超过最大长度
				parameters:     
				return:			提示超出长度
				description:    拼接中使用
********************************************************/
var TextUtil = new Object(); 
TextUtil.NotMax = function(oTextArea){ 
    var maxText = oTextArea.getAttribute("maxlength");
    var falg = true;
    var strlen=0;
    var len =oTextArea.value.length;
    for(var j=0;j<len;j++){
  	 	var leg=oTextArea.value.charCodeAt(j);     //获取字符的ASCII码值				  	 	
			if(leg>255){ //判断如果长度大于255					                 
			 	strlen=strlen+2;   //则表示是汉字为两个字节								 							 	
			}else {
				strlen+=1;       //否则表示是英文字符，为一个字节							
			}			
			if(strlen > maxText){ 				
	            oTextArea.value = oTextArea.value.substring(0,j); 
	            //alert("超出限制");	            
	            return false;
    		}						
	}	    
} 



/***********************************************************
				function name:  appendHidden(tablename,tableflag)
				function:		高级查询显示上次查询情况的隐藏域
				parameters:     tablename：表名
								tableflag：隐藏域标识符
				description: 	根据 前缀+表名+特殊标识符 组成隐藏域的id
				该隐藏域用于存放页面上，高级查询上次查询条件
				用于再次查询时能显示出上次查询的条件并可修改
***********************************************************/
function appendHidden(tablename,tableflag){
	var str = tablename+tableflag;
	var $text11 = $("<input type='hidden' id='treecidQ123"+str+"' value='123456asdf'/>");	
	var $text12 = $("<input type='hidden' id='treepidQ123"+str+"'/>");
	var $text13 = $("<input type='hidden' id='treestrQ123"+str+"'/>");
	var $text14 = $("<input type='hidden' id='treepicQ123"+str+"'/>");
	var $text15 = $("<input type='hidden' id='treesqlQ123"+str+"'/>");
	var $text16 = $("<input type='hidden' id='treerelationQ123"+str+"'/>");	
	
	$("body").append($text11);
	$("body").append($text12);
	$("body").append($text13);
	$("body").append($text14);
	$("body").append($text15);
	$("body").append($text16);
	
}

/***********************************************************
				function name:  appendModSave(tablename,tableflag)
				function:		生成隐藏域，用于保存查询的分项卡信息
				parameters:     
				description: 	id=searcholdtabStatus
***********************************************************/
function appendModSave(){	
	var $text11 = $("<input type='hidden' id='searcholdtabStatus' />");		
	$("body").append($text11);	
}