				/***********************************************************
				        file name:       main.js
						author:          chenliang 
						create date:     2009-11-30          
						description:
						2010-12-25   youhongyu  导出提示修改
				********************************************************/

				/**********************************************************
				function name:    getCaption(str, code, isdefault)
				function:		  解析字符串
				parameters:       str：要解析的字符串 
								  code：解析关键字 例如 zh  en
								  isdefault：当解析不出来时返回的默认值         
				return:			  返回根据关键字解析好的字符
				description:      要解析的字符串格式必须为以'{'开头,'/}'结束的字符串
				********************************************************/

				function getCaption(str, code, isdefault) {
						if(str==''||null==str||undefined==str){
							return isdefault;
						}else{
							
							var arr = str.split("/}");
							if(arr!=str){
								var forArrLength = arr.length - 1;
								for (var i = 0; i < forArrLength; i++) {
									var scode = "{" + code + "=";
									var val = arr[i].split(scode);
									var flag = false;
									if (val.length > 1) {
										return val[1];
										flag = true;
										break;
									}
									if (flag == true) {
										break;
									}
								}
							}else{return isdefault}
						}
				}
				
				/**********************************************************
				function name:    strtrim(str)
				function:		  去除字符串中开始时出现的空格
				parameters:       str：要去除空格的字符串 
				return:			  返回去除空格的字符串
				description:      
				********************************************************/
				function strtrim(str) {
					var pattern = new RegExp("^[\\s]+", "gi");
					return str.replace(pattern, "");
				}
				
				/**********************************************************
				function name:    trimstr(str)
				function:		  去除字符串中末尾出现的空格
				parameters:       str：要去除空格的字符串 
				return:			  返回去除空格的字符串
				description:      
				********************************************************/
				function trimstr(str) {
				 	var pattern = new RegExp("[\\s]+$","gi");
				    return str.replace(pattern,"");
				}
				
				/**********************************************************
				function name:    trimstr(str)
				function:		  去除字符串中开始和结束的空格
				parameters:       str：要去除空格的字符串 
				return:			  返回去除空格的字符串
				description:      
				********************************************************/
				function trim(str) {
				        return trimstr(strtrim(str));
				}
				
				/**********************************************************
				function name:    getI18n(languageType,tablename)
				function:		  国际化时要用到的函数，去别名表里取当前表字段的别名，并进行解析
				parameters:       languageType：当前语言环境;tablename：要取别名的表名
				return:			  返回字符串
				description:      返回的字符串别名通过','分隔开
				********************************************************/
				function getI18n(languageType,tablename){					
					var str = "";
					var urlstr=tsd.buildParams({ 	
					 		 						packgname:'service',//java包
								 					clsname:'ExecuteSql',//类名
								 					method:'exeSqlData',//方法名
								 					ds:'tsdBilling',//数据源名称 对应的WEB-INF/classes/ApplicationContent.xml中配置的数据源
								 					tsdcf:'mssql',//指向配置文件名称
								 					tsdoper:'query',//操作类型 
								 					datatype:'xmlattr',//返回数据格式 
								 					tsdpk:'main.geti18n'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
								 				});
						$.ajax({
						url:'mainServlet.html?'+urlstr+'&tablename='+tablename,
						datatype:'xml',
						cache:false,//如果值变化可能性比较大 一定要将缓存设成false
						timeout: 1000,
						async: false ,//同步方式
						success:function(xml){
							$(xml).find('row').each(function(){
								var i18str = $(this).attr("field_alias");
								var s = getCaption(i18str,languageType,i18str);
								str = str+s+',';								
							});
						}
					});
					return str;
				}	
				
				/**********************************************************
				function name:    getFields(tablename)
				function:		  取出当前表的所有字段，用于权限判断
				parameters:       tablename: 要取字段的表名
				return:			  返回字符串
				description:      返回的字符串别名通过','分隔开
				********************************************************/
				function getFields(tablename){
					var str = "";
					var urlstr=tsd.buildParams({ 	
					 		 						packgname:'service',//java包
								 					clsname:'ExecuteSql',//类名
								 					method:'exeSqlData',//方法名
								 					ds:'tsdBilling',//数据源名称 对应的WEB-INF/classes/ApplicationContent.xml中配置的数据源
								 					tsdcf:'mssql',//指向配置文件名称
								 					tsdoper:'query',//操作类型 
								 					datatype:'xmlattr',//返回数据格式 
								 					tsdpk:'main.gettablefields'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
								 				});
						$.ajax({
						url:'mainServlet.html?'+urlstr+'&tablename='+tablename,
						datatype:'xml',
						cache:false,//如果值变化可能性比较大 一定要将缓存设成false
						timeout: 1000,
						async: false ,//同步方式
						success:function(xml){
							$(xml).find('row').each(function(){
								var fieldsstr = $(this).attr("field_name");
								str = str + fieldsstr + ",";
							});
						}
					});
					return str;
				}
				
				/**********************************************************
				function name:    isIP(str)
				function:		  验证当前ip是否合法
				parameters:       str: 要验证的字符串
				return:			  返回true或false
				description:     
				********************************************************/
				function  isIP(str){   
				  var   ip = /^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/;   
				  return  ip.test(str);   
				} 
				
				/**********************************************************
				function name:    checkNum(str)
				function:		  判断输入字符串是否全是数字
				parameters:       str: 要验证的字符串
				return:			  返回true或false
				description:     
				********************************************************/
	            function checkNum(str){return str.match(/\D/)==null} 
	            
	            /**********************************************************
				function name:    checkNum(str)
				function:		  判断输入字符串是否不含有字母
				parameters:       str: 要验证的字符串
				return:			  返回true或false
				description:     
				********************************************************/
	            function checkEng(str){return str.match(/^[a-zA-Z]+$/)}
            	
				/**********************************************************
				function name:    checkPassword(pwd)
				function:		  验证字符串是否是数字和字母的组合
				parameters:       pwd: 要验证的字符串
				return:			  返回i. 
				description:     
				********************************************************/
				function checkPassword(pwd){
						var i = 0;
						//先判断密码是否全是数字
						if(checkNum(pwd)){
							i = 1;//字符串全是数字返回1
						}else{
							//判断密码是否含有字母
							if(!checkEng(pwd)){
								i = 2;//字符串全是数字返回2
							}else{
								i = 3;//字符串全是数字和字母的组合返回3
							}
						}
						return i;
            	}
            	
            	/**********************************************************
				function name:    genModelName()
				function:		  取日志模块名称
				parameters:       
				return:			  返回日志模块名称 
				description:     
				********************************************************/
				
				function genModelName()
				{
					var navv = document.location.search;//取当前页面的url
					var infoo = "";
					var temp = "";
					
					temp = decodeURIComponent(parseUrl(navv,"pmenuname","")); //解析字符串并进行解码
					infoo += tsd.encodeURIComponent(temp);//对解析好的字符串进行解码
					infoo += ">>>";
					temp = decodeURIComponent(parseUrl(navv,"imenuname",""));
					infoo += tsd.encodeURIComponent(temp);
					
					return infoo;
				}
				/**********************************************************
				function name:    writeLogInfo(modulename,logintype,loginfo)
				function:		  记录日志的通用函数
				parameters:       modulename：模块名称
								  logintype：日志类型
								  loginfo：要记录的日志信息
				return:			  无返回值
				description:      模块名称和日志信息必需是已经转码好的字符串，需在页面添加几个隐藏域
								  在页面调用时需加上几个隐藏域：    
				   				<%@page import="com.tsd.service.util.Log" %>
				   				<input type='hidden' id='userloginip' value='<%=Log.getIpAddr(request) %>' /> 
				   				<input type='hidden' id='userloginid' value='<%=session.getAttribute("userid") %>' /> 
				********************************************************/
				function writeLogInfo(modulename,logintype,loginfo){
					//2009-11-30 修改日志处理函数
					if(''==modulename){
						modulename = genModelName();
					}
					var thisuserlogid = $('#userloginid').val();
					var thisuserloginip = $('#userloginip').val();
					
					if(logintype!=''&&logintype!=null){
						var urlstr=tsd.buildParams({ 	
								 		 						packgname:'service',//java包
											 					clsname:'ExecuteSql',//类名
											 					method:'exeSqlData',//方法名
											 					ds:'tsdLog',//数据源名称 对应的WEB-INF/classes/ApplicationContent.xml中配置的数据源
											 					tsdcf:'mssql',//指向配置文件名称
											 					tsdoper:'exe',//操作类型 
											 					tsdpk:'logManager.loginfo'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
											 				});
									$.ajax({
										url:'mainServlet.html?'+urlstr+'&userid='+thisuserlogid+'&modulename='+modulename+'&logtype='+logintype+'&loginfo='+loginfo+'&ipaddress='+thisuserloginip,                    
										cache:false,//如果值变化可能性比较大 一定要将缓存设成false
										timeout: 1000,
										async: false ,//同步方式
										success:function(msg){}
									});
					}
				}
				
				
				
				/**********************************************************
				function name:    openWindow(type,tablename)
				function:		  打开面板
				parameters:       type：要执行的操作类型
								  tablename：要对哪个表的数据进行操作
				return:			  打开页面 
				description:      
				********************************************************/
				/****
					WebRoot\script\public\main.js中的openWindow(type,tablename)
					该方法和WebRoot\script\public\transfer.js中的openDiaQueryG(type,tablename,tableflag)中重复
					建议统一使用WebRoot\script\public\transfer.js中的openDiaQueryG(type,tablename,tableflag)
					
					尤红玉 20100925
				*****/
				function openWindow(type,tablename){
					$('#queryName').val(type);
					$('#whichorder').val(1);
					if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
						window.showModalDialog("/tsd2009/queryServlet?tablename="+tablename+"&url=/search.jsp",window,"dialogWidth:700px; dialogHeight:500px; center:yes; scroll:no");
				    }
				    else{
						window.showModalDialog("/tsd2009/queryServlet?tablename="+tablename+"&url=/search.jsp",window,"dialogWidth:690px; dialogHeight:600px; center:yes; scroll:no");
					}
				}
				
				/**********************************************************
				function name:    fuheQbuildParams()
				function:		  复合查询参数获取
				parameters:      
				return:			  拼接好的复合参数字符串
				description:      
				********************************************************/
				 function fuheQbuildParams(){
				 	//每次拼接参数必须初始化此参数
					tsd.QualifiedVal=true;
				 	var params='';
				 	var fusearchsql = encodeURIComponent($("#fusearchsql").val());
				 	//如果有可能值是汉字 请使用encodeURI()函数转码
				 	params+='&fusearchsql='+fusearchsql;			 	
				 	//注意：不要在此做空的判断 即使为空 也必须放入请求中			 	
				 	//每次拼接参数必须添加此判断
					if(tsd.Qualified()==false){return false;}
					return params;
				 }
				 
				/**********************************************************
				function name:    fuheQuery(querysql,querypagesql)
				function:		  复合查询操作
				parameters:       querysql：要执行查询的sql语句
								  querypagesql：用于计算分页的sql语句
				return:			  
				description:      jqgrid的id是写死的，需要注意一下
				********************************************************/
				function fuheQuery(querysql,querypagesql)
				{
					var params = fuheQbuildParams();			
					if(params=='&fusearchsql='){
						params +='1=1';
					}	
							
				 	//此处的url参数主要修改tsdpname（对应存储过程的名称）、tsdExeType(操作类型)			 	
				 	var urlstr1=tsd.buildParams({  packgname:'service',//java包
												  clsname:'ExecuteSql',//类名
												  method:'exeSqlData',//方法名
												  ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
												  tsdcf:'mssql',//指向配置文件名称
												  tsdoper:'query',//操作类型 
												  datatype:'xml',//返回数据格式 
												  tsdpk:querysql,//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
												  tsdpkpagesql:querypagesql
												});
					var languageType = $('#languageType').val();					
					var link = urlstr1 + params+'&lang='+languageType;	
					var column = $('#thecolumn').val();
				 	$("#editgrid").setGridParam({url:'mainServlet.html?'+link+'&cloumn='+column}).trigger("reloadGrid");
				 	setTimeout($.unblockUI, 15);//关闭面板			
				}
				
				/**********************************************************
				function name:    fuheBroadQuery(querysql,querypagesql)
				function:		  复合查询操作
				parameters:       querysql：要执行查询的sql语句
								  querypagesql：用于计算分页的sql语句
				return:			  
				description:      jqgrid的id是写死的，需要注意一下
				********************************************************/
				function fuheBroadQuery(querysql,querypagesql)
				{
					var params = fuheQbuildParams();			
					if(params=='&fusearchsql='){
						params +='1=1';
					}	
							
				 	//此处的url参数主要修改tsdpname（对应存储过程的名称）、tsdExeType(操作类型)			 	
				 	var urlstr1=tsd.buildParams({  packgname:'service',//java包
												  clsname:'ExecuteSql',//类名
												  method:'exeSqlData',//方法名
												  ds:'broadband',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
												  tsdcf:'mysql',//指向配置文件名称
												  tsdoper:'query',//操作类型 
												  datatype:'xml',//返回数据格式 
												  tsdpk:querysql,//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
												  tsdpkpagesql:querypagesql
												});
					var languageType = $('#languageType').val();	
					var dept = $('#thelimitdept').val();				
					var link = urlstr1 + params+'&lang='+languageType+'&CurrDept='+tsd.encodeURIComponent(dept);		
					var column = $('#thecolumn').val();
					
				 	$("#editgrid").setGridParam({url:'mainServlet.html?'+link+'&cloumn='+column}).trigger("reloadGrid");
				 	setTimeout($.unblockUI, 15);//关闭面板			
				}
				
				/**********************************************************
				function name:    fuheQuery(querysql,querypagesql)
				function:		  复合查询操作
				parameters:       querysql：要执行查询的sql语句
								  querypagesql：用于计算分页的sql语句
				return:			  
				description:      传的参数不一样
				********************************************************/
				function fuheQueryAlias(querysql,querypagesql,jqid)
				{
					var params = fuheQbuildParams();		
					if(params=='&fusearchsql='){
						params +='1=1';
					}	
							
				 	//此处的url参数主要修改tsdpname（对应存储过程的名称）、tsdExeType(操作类型)			 	
				 	var urlstr1=tsd.buildParams({  packgname:'service',//java包
												  clsname:'ExecuteSql',//类名
												  method:'exeSqlData',//方法名
												  ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
												  tsdcf:'mssql',//指向配置文件名称
												  tsdoper:'query',//操作类型 
												  datatype:'xml',//返回数据格式 
												  tsdpk:querysql,//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
												  tsdpkpagesql:querypagesql
												});
					var link = urlstr1 + params;	
					var table_name = $('#table_name').val();
					var languageType = $("#languageType").val();
				 	$("#"+jqid).setGridParam({url:'mainServlet.html?'+link+'&languageType='+languageType+'&fieldtable='+table_name}).trigger("reloadGrid");
				 	setTimeout($.unblockUI, 15);//关闭面板			
				}
				
				/**********************************************************
				function name:    fuheQuery(querysql,querypagesql)
				function:		  复合查询操作
				parameters:       querysql：要执行查询的sql语句
								  querypagesql：用于计算分页的sql语句
				return:			  
				description:      传的参数不一样
				********************************************************/
				function fuheBroadAlias(querysql,querypagesql)
				{
					var params = fuheQbuildParams();			
					if(params=='&fusearchsql='){
						params +='1=1';
					}	
				 	//此处的url参数主要修改tsdpname（对应存储过程的名称）、tsdExeType(操作类型)			 	
				 	var urlstr1=tsd.buildParams({  packgname:'service',//java包
												  clsname:'ExecuteSql',//类名
												  method:'exeSqlData',//方法名
												  ds:'broadband',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
												  tsdcf:'mysql',//指向配置文件名称
												  tsdoper:'query',//操作类型 
												  datatype:'xml',//返回数据格式 
												  tsdpk:querysql,//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
												  tsdpkpagesql:querypagesql
												});
					var link = urlstr1 + params;	
				 	$("#editgrid").setGridParam({url:'mainServlet.html?'+link}).trigger("reloadGrid");
				 	setTimeout($.unblockUI, 15);//关闭面板			
				}
				/**********************************************************
				function name:    fuheQuery(querysql,querypagesql)
				function:		  复合查询操作
				parameters:       querysql：要执行查询的sql语句
								  querypagesql：用于计算分页的sql语句
				return:			  
				description:      所使用的数据源不一样
				********************************************************/
				function fuheQueryLog(querysql,querypagesql,theparams)
				{
					var params = fuheQbuildParams();			
					if(params=='&fusearchsql='){
						params +='1=1';
					}	
							
				 	//此处的url参数主要修改tsdpname（对应存储过程的名称）、tsdExeType(操作类型)			 	
				 	var urlstr1=tsd.buildParams({  packgname:'service',//java包
												  clsname:'ExecuteSql',//类名
												  method:'exeSqlData',//方法名
												  ds:'tsdLog',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
												  tsdcf:'mssql',//指向配置文件名称
												  tsdoper:'query',//操作类型 
												  datatype:'xml',//返回数据格式 
												  tsdpk:querysql,//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
												  tsdpkpagesql:querypagesql
												});
					var link = urlstr1 + params;	
					var column = $('#thecolumn').val();
					
				 	$("#editgrid").setGridParam({url:'mainServlet.html?'+link+'&cloumn='+column+theparams}).trigger("reloadGrid");
				 	setTimeout($.unblockUI, 15);//关闭面板			
				}
				
				/**********************************************************
				function name:    fuheQuery(querysql,querypagesql)
				function:		  复合查询操作
				parameters:       querysql：要执行查询的sql语句
								  querypagesql：用于计算分页的sql语句
				return:			  
				description:      传递的参数不一样
				********************************************************/
				function fuheQueryUserLine(querysql,querypagesql,mkj,column)
				{
					var params = fuheQbuildParams();			
					if(params=='&fusearchsql='){
						params +='1=1';
					}	
							
				 	//此处的url参数主要修改tsdpname（对应存储过程的名称）、tsdExeType(操作类型)			 	
				 	var urlstr1=tsd.buildParams({  packgname:'service',//java包
												  clsname:'ExecuteSql',//类名
												  method:'exeSqlData',//方法名
												  ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
												  tsdcf:'mssql',//指向配置文件名称
												  tsdoper:'query',//操作类型 
												  datatype:'xml',//返回数据格式 
												  tsdpk:querysql,//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
												  tsdpkpagesql:querypagesql
												});
					var link = urlstr1 + params;	
					var languageType = $("#languageType").val();
				 	$("#editgrid").setGridParam({url:'mainServlet.html?'+link+'&languageType='+languageType+'&str='+tsd.encodeURIComponent(mkj)+'&cloumn='+column}).trigger("reloadGrid");
				 	setTimeout($.unblockUI, 15);//关闭面板			
				}
			
				/**********************************************************
				function name:    fuheDel(deletesql,modulename)
				function:		  进行批量删除操作
				parameters:       deletesql：要执行删除的sql语句
								  modulename：模块名称
				return:			  
				description:      
				********************************************************/ 
				function fuheDelLog(deletesql,modulename){
					var deleteinformation = $("#deleteinformation").val();
					var operationtips = $("#operationtips").val();	
					jConfirm(deleteinformation,operationtips,function(x){
				 		if(x==true)
				 		{	
				 		var params = fuheQbuildParams();	
				 		//此处的url参数主要修改tsdpname（对应存储过程的名称）、tsdExeType(操作类型)			 	
					 	var urlstr1=tsd.buildParams({  packgname:'service',//java包
													  clsname:'ExecuteSql',//类名
													  method:'exeSqlData',//方法名
													  ds:'tsdLog',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
													  tsdcf:'mssql',//指向配置文件名称
													  tsdoper:'exe',//操作类型 
													  datatype:'xml',//返回数据格式 
													  tsdpk:deletesql//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
													  
													});
						var link='mainServlet.html?'+urlstr1+params; 
						
					 	$.ajax({
								url:link,
								cache:false,//如果值变化可能性比较大 一定要将缓存设成false
								timeout: 1000,
								async: false ,//同步方式
								success:function(msg){
									if(msg=="true"){
										var operationtips = $("#operationtips").val();
										var successful = $("#successful").val();									
										jAlert(successful,operationtips);
										setTimeout($.unblockUI, 15);
										reloadDataLog('logManager.query','logManager.querypage');
									}	
								}
							});
						}
					});		
				}
				
				/**********************************************************
				function name:    dataDownload(sql)
				function:		  导出数据到excel用到的函数
				parameters:       sql：要执行查询数据的sql语句
				return:			  
				description:      
				********************************************************/ 
				function dataDownload(sql) {
						var params = fuheQbuildParams();
						if(params=='&fusearchsql='){
							params +='1=1';
						}	
					 	//此处的url参数主要修改tsdpname（对应存储过程的名称）、tsdExeType(操作类型)			 	
					 	var urlstr=tsd.buildParams({  packgname:'service',//java包
													  clsname:'ExecuteSql',//类名
													  method:'exeSqlData',//方法名
													  ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
													  tsdcf:'mssql',//指向配置文件名称
													  tsdoper:'query',//操作类型 
													  datatype:'datafileDown',//返回数据格式 
													  tsdpk:sql//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
													});
						if($("#download").size()==0)
							$("body").append("<iframe id='download' name='download' width='0' height='0'></iframe>");
					    	$("#download").attr("src","mainServlet.html?"+urlstr + params);
				}	
				
				/**********************************************************
				function name:    dataDownloadLog(sql)
				function:		  导出系统日志数据用到函数
				parameters:       sql：要执行查询数据的sql语句
				return:			  
				description:      数据源不一样
				********************************************************/ 
				function dataDownloadLog(sql) {
						var params = fuheQbuildParams();			
						if(params=='&fusearchsql='){
							params +='1=1';
						}	
					 	//此处的url参数主要修改tsdpname（对应存储过程的名称）、tsdExeType(操作类型)			 	
					 	var urlstr=tsd.buildParams({  packgname:'service',//java包
													  clsname:'ExecuteSql',//类名
													  method:'exeSqlData',//方法名
													  ds:'tsdLog',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
													  tsdcf:'mssql',//指向配置文件名称
													  tsdoper:'query',//操作类型 
													  datatype:'datafileDown',//返回数据格式 
													  tsdpk:sql//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
													});
						if($("#download").size()==0)
							$("body").append("<iframe id='download' name='download' width='0' height='0'></iframe>");
					    	$("#download").attr("src","mainServlet.html?"+urlstr + params);
						
				}	
				
				/**********************************************************
				function name:    reloadData(sql,sqlpage)
				function:		  重新加载jqgrid中的数据用到的函数
				parameters:       sql：要执行查询数据的sql语句
								  sqlpage：用于计算分页的sql语句
				return:			  
				description:      在执行完添加、修改、删除之后需要将jqgrid中的数据重新加载一遍，只是执行的sql语句不一样
				********************************************************/ 
				function reloadData(sql,sqlpage){
			 		 var urlstr=tsd.buildParams({ 	
			 		 						packgname:'service',//java包
						 					clsname:'ExecuteSql',//类名
						 					method:'exeSqlData',//方法名
						 					datatype:'xml',//返回数据格式 
						 					ds:'tsdBilling',//数据源名称 对应的WEB-INF/classes/ApplicationContent.xml中配置的数据源
						 					tsdcf:'mssql',//指向配置文件名称
						 					tsdoper:'query',//操作类型 
						 					tsdpk:sql,//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
						 					tsdpkpagesql:sqlpage//依赖tsdpk 用于计算分页的sql配置名称应在tsdcf配置的文件中指定
						 				});
				 	$("#editgrid").setGridParam({url:'mainServlet.html?'+urlstr}).trigger("reloadGrid");
				 	setTimeout($.unblockUI, 15);//关闭面板
				}
				
				function reloadDataLog(sql,sqlpage){
			 		 var urlstr=tsd.buildParams({ 	
			 		 						packgname:'service',//java包
						 					clsname:'ExecuteSql',//类名
						 					method:'exeSqlData',//方法名
						 					datatype:'xml',//返回数据格式 
						 					ds:'tsdLog',//数据源名称 对应的WEB-INF/classes/ApplicationContent.xml中配置的数据源
						 					tsdcf:'mssql',//指向配置文件名称
						 					tsdoper:'query',//操作类型 
						 					tsdpk:sql,//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
						 					tsdpkpagesql:sqlpage//依赖tsdpk 用于计算分页的sql配置名称应在tsdcf配置的文件中指定
						 				});
					var column = $('#thecolumn').val();
					var logkey = $('#logkey').val();
					var logvalue = $('#logvalue').val();
					var params = '';
					params += '&key='+logkey;
					params += '&value='+logvalue;
				 	$("#editgrid").setGridParam({url:'mainServlet.html?'+urlstr+'&cloumn='+column+params}).trigger("reloadGrid");
				 	setTimeout($.unblockUI, 15);//关闭面板
				}
				
				/**********************************************************
				function name:    printThisReport(reportname,param)
				function:		  打印报表的通用函数(旧)
				parameters:       reportname：要打印的报表名称，即后缀为.cpt的文件
								  param: 报表需要传递的参数 格式：&id=···&username=···
				return:			  
				description:      报表文件统一放在WEB-INF/reportlets/com/tsdreport/下。
								  页面需添加的相关信息：
								  <%
									String path = request.getContextPath();
									String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ path + "/";
								  %>
								  <input type='hidden' id='thisbasePath' value='<%=basePath %>' /> 	
				********************************************************/ 
				function printThisReport(reportname,param){
					var basepath = $('#thisbasePath').val();
					location.href = basepath + 'ReportServer?reportlet=/com/tsdreport/'+reportname+'.cpt'+param;
				}
				
				/**********************************************************
				function name:    printThisReport1(menuid,tablename,param,userid,groupid,userdept)
				function:		  打印报表的通用函数(新)
				parameters:       menuid：菜单id
								  tablename：打印报表的标识(用来区分同一页面多个报表)	
								  param: 报表需要传递的参数 格式：&id=···&username=···
								  userid:用户id
								  groupid:所在权限组
								  userdept:所在区域
								  reportfalg:打开报表样式  1为模块页面打开  0或为undefined 在原页面窗口打开
				author：			  孙琳
				return:			  
				description:      报表文件统一放在WEB-INF/reportlets/com/tsdreport/下。
								  页面需添加的相关信息：
								  <%
									String path = request.getContextPath();
									String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ path + "/";
								  %>
								  <input type='hidden' id='thisbasePath' value='<%=basePath %>' /> 	
				********************************************************/ 
				function printThisReport1(menuid,tablename,param,userid,groupid,userdept,reportfalg){
						//存放报表名称								
		        		var ReportName=getReportName(menuid,tablename);
		        		
		        		var basepath = $('#thisbasePath').val();
		        		//判断数据库中是否有此条记录
		        		if(ReportName == undefined||ReportName == 'undefined'||ReportName == ''){
		        			alert("请添加报表配置！");
		        			return false;
		        		}else{
		        			if(reportfalg == undefined||reportfalg == 'undefined'||reportfalg == ''){
		        				//进行打印操作
		        				location.href = basepath + 'ReportServer?reportlet=/com/tsdreport/'+ReportName+param+'&userid='+userid+'&groupid='+groupid+'&userdept='+userdept+"&______" + new Date();
		        		
		        			}else if(reportfalg==1){
		        				//进行打印操作		        				
		        				basepath = basepath + 'ReportServer?reportlet=/com/tsdreport/'+ReportName+param+'&userid='+userid+'&groupid='+groupid+'&userdept='+userdept+"&______" + new Date();
		        				//window.showModalDialog(basepath,window,"dialogWidth:760px; dialogHeight:580px; center:yes; scroll:no");
		        				window.open(basepath);
		        			}

							else if(reportfalg==2){
		        				//进行打印操作		        				
		        				basepath = basepath + 'ReportServer?reportlet=/com/tsdreport/'+ReportName+param+'&userid='+userid+'&groupid='+groupid+'&userdept='+userdept+"&______" + new Date();
		        				window.showModalDialog(basepath,window,"dialogWidth:760px; dialogHeight:580px; center:yes; scroll:no");
		        				//window.open(basepath);
		        			}	
		        			else if(reportfalg==3){
		        				//进行打印操作
		        				basepath = basepath + 'ReportServer?reportlet=/com/tsdreport/'+ReportName+param+'&userid='+userid+'&groupid='+groupid+'&userdept='+userdept+"&______" + new Date();
		        				$("#reportIF").attr("src",basepath);
		        			}	        			
		        		}					 
				}
				
				/**********************************************************
				function name:    getReportName(menuid,tablename)
				function:		  从数据库中获取报表名称
				parameters:       menuid：菜单id
								  tablename：打印报表的标识(用来区分同一页面多个报表)
				author：			  尤红玉
				return:			  
				description:     2010-12-14
				********************************************************/ 
				function getReportName(menuid,tablename){
						var ReportName='';
						var urlstr = tsd.buildParams({
				        		packgname : 'service', //java包
						        clsname : 'ExecuteSql', //类名
						        method : 'exeSqlData', //方法名
						        ds : 'tsdBilling', //数据源名称 对应的WEB-INF/classes/ApplicationContent.xml中配置的数据源
						        tsdoper : 'query', //操作类型 
						        datatype : 'xmlattr', //返回数据格式 
						        tsdpk : 'cReport.reportname' //执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
				    	});
					    $.ajax({
					        url : 'mainServlet.html?' + urlstr + '&menuid=' + menuid + '&reportflag=' + tablename + '&tsdtemp=' + Math.random(), 
					        datatype : 'xml', cache : false, //如果值变化可能性比较大 一定要将缓存设成false
					        timeout : 1000, async : false , //同步方式
					        success : function (xml){ 
					        	/*
					        	//后台数据不返回数据信息时使用此方法判断
					        	//判断数据库中是否有此条记录,size() == 0代表数据库中无此记录
					        	if($(xml).find('row').size() == 0){
					        		alert("请添加报表配置！");
					        		return false;
					        	}else{
					        		$(xml).find('row').each(function (){
					        			//进行打印操作
					        			location.href = basepath + 'ReportServer?reportlet=/com/tsdreport/'+$(this).attr("reportname")+param+'&userid='+userid+'&groupid='+groupid+'&userdept='+userdept;
						            });
					        	}
					        	*/
					        	$(xml).find('row').each(function (){
					        		ReportName=$(this).attr("reportname");				        		
						        });
					        }
					        
					    });
					    return ReportName;
				}
				/**********************************************************
				function name:    createIcon(id,iconarea)
				function:		  页面初始化时加载所有图标
				parameters:       id：初始化图标的id
								  iconarea：显示图标的区域
				return:			  
				description:      
				********************************************************/ 
				function createIcon(str,iconarea,thelen){
					for(var i = 1 ; i < thelen;i++){
						var obj = document.getElementById(iconarea);
					    var newr = document.getElementById(str).cloneNode(true);
					    newr.setAttribute("id","icon"+i);
					  	newr.setAttribute("value","style/icon/"+i+".gif");   
					    var newl = document.createElement("LABEL");
					    newl.setAttribute("createimg","icon"+i);
					     
					    var iconpath = $("#iconpath").val();
					    var thestr = '';
					    if(i%10==0){
					    	thestr = '<br/>';
					    }
					    newl.innerHTML = "<img style='margin-left: 2px' src='"+iconpath+i+".gif'/>"+thestr;
				    
					    obj.appendChild(newr);
					    obj.appendChild(newl);
					}
				}
				
				/**********************************************************
				function name:    getIconList(id,iconarea,isdisplay)
				function:		  打开面板时加载图标列表
				parameters:       id：getIconList(str,iconarea,isdisplay)
								  iconarea：显示图标的区域
								  isdisplay：将图标区域显示出来
				return:			  
				description:      
				********************************************************/ 
				function getIconList(str,iconarea,isdisplay,thelen){
					 $("#"+iconarea).html("");
					 createIcon(str,iconarea,thelen);
					 document.getElementById(isdisplay).style.display = '';
				}
				
				/**********************************************************
				function name:    getChecked(id,isdisplay)
				function:		  将选中的图标进行回传
				parameters:       id：选中图标的id
								  isdisplay：将图标隐藏起来
				return:			  
				description:      
				********************************************************/ 
				function getChecked(str,isdisplay){
					/******************************
					** 遍历所有的单选框，找出被选中的 *
					****************************/
					var icon = document.getElementsByName("icon");
					for (var i=0; i<icon.length; i++){
					     if(icon[i].checked){
					    	$("#"+str).val(icon[i].value);
					  	  }
					}
					document.getElementById(isdisplay).style.display = 'none';
				}
				
				
				/*****************可选择导出数据字段******************************/
				/**********************************************************
				function name:    thisDownLoad(tablename)
				function:		  显示要导出的数据列
				parameters:      tablename：表名,thiscol:要一行显示的字段数
				return:			  
				description:      
				********************************************************/
				function thisDownLoad(ds,tsdcf,tablename,lantype,thiscol){
					$('#query').html('全选');
					//var thearr = new Array();
					if(confirm('您确定要导出所查询出的数据吗?')){
						 var urlstr=tsd.buildParams({ 
    										packgname:'service',//java包
						 					clsname:'ExecuteSql',//类名
						 					method:'exeSqlData',//方法名
						 					ds:ds,//数据源名称 对应的WEB-INF/classes/ApplicationContent.xml中配置的数据源
						 					tsdcf:tsdcf,//指向配置文件名称
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
								var thevalue = "";
								var i = 1;
								if(thiscol==''||thiscol==undefined){
									thiscol = 5;
								}
								$(xml).find('row').each(function(){
									var thebr = '';
									var thefieldname = $(this).attr("field_name") ;
									
									var thefieldalias = getCaption($(this).attr("field_alias"),lantype,'');
									if(thefieldalias!=''){
										if(i*1%thiscol==0){
											thebr = '<br/>';
										}
										thevalue += "<span class='spanstyle'><input type='checkbox' name='thefields' value='"+thefieldname+"' style='width:16px;height:16px;'><label style='text-align: left;margin-left:5px;font-size:14px;'>"+thefieldalias+"</label></span>"+thebr;										
										i++;
									}
								});									
								thevalue += "<br/>";
								thevalue += "<h4>选择导出类型：</h4>"
								thevalue += "&nbsp&nbsp<input type='radio' name='exporttype' value='"+"xls"+"' checked='checked'/>导出为Excel&nbsp&nbsp";
								thevalue += "&nbsp&nbsp<input type='radio' name='exporttype' value='"+"txt"+"'/>导出为txt&nbsp&nbsp";
								thevalue += "&nbsp&nbsp<input type='radio' name='exporttype' value='"+"xmlx"+"'/>导出为xml&nbsp&nbsp";
								thevalue += "&nbsp&nbsp<input type='radio' name='exporttype' value='"+"dbf"+"'/>导出为dbf";											
								$('#thelistform').html(thevalue);															
					 			autoBlockFormAndSetWH('thefieldsform',20,20,'closethisinfo',"#ffffff",false,740,'');//弹出查询面板							 
							 	//	autoBlockFormAndSetWH(formId,top,left,closeId,bgColor,ifOverlayClose,width,height)
							 }
						 });
					}
				}
				
				
				/**********************************************************
				function name:    thisDataDownload(ds,tsdcf,cols,table)
				function:		  数据列下载
				parameters:       ds：数据源
								  tsdcf：sql配置
								  cols: 显示列
								  table: 表名
								  table2: 表别名
				return:			  
				description:      数据列下载  select <cols> from <table> where <fusearchsql>
				********************************************************/
				function thisDataDownload(ds,tsdcf,cols,table,flagsql,limitflag,table2) {
						//组合排序条件
						var orderby = "&orderby=" ;
						var sqlorderby = $("#GLOBAL_PUBLIC_EXPORT").val();
						if(sqlorderby!= undefined && sqlorderby != "undefined" && sqlorderby!="" ){
							orderby = orderby + encodeURIComponent(sqlorderby);
						}else{
							orderby = orderby + " and 1=1 " ;
						}
						var params = fuheQbuildParams();
						if(params=='&fusearchsql='){
							params +='1=1';
						}
						params = params + orderby ;
						cols = cols.replace(",undefined","");
						// $('#status').show();//显示LOADING…						 
						var exporttype = $('#thelistform [name="exporttype"][checked=true]:radio').val();	
						var querycountp='&table='+table+params;					
						var resvalue = querytablecount(querycountp);
						if(exporttype=='xls'&&parseInt(resvalue,10)>65535){
							alert("Excel数据导出超过系统最大值为65535条，无法执行导出操作！");
							return false;
						}else if(exporttype=='dbf'&&parseInt(resvalue,10)>100000){
							alert("dbf数据导出超过系统最大值十万条，无法执行导出操作！");
							return false;
						}else if(exporttype=='xmlx'&&parseInt(resvalue,10)>200000){
							alert("xml数据导出超过系统最大值二十万条，无法执行导出操作！");
							return false;
						}else if(exporttype=='txt'&&parseInt(resvalue,10)>500000){
							alert("txt数据掏出超过系统最大值50万条，无法执行导出操作！");
							return false;
						}				
						
						
						params += '&tablealias='+table2;
						
						if(cols!=''&&cols!=null&&cols!=undefined){
							params += '&cols='+cols;
						}else{
							alert('请选择导出字段!');
							return false;
						} 
						if(table!=''&&table!=null&&table!=undefined){
							params += '&table='+table;
						}else{
							alert('请选择导出字段!');
							return false;
						}
						var sql = '';
						var whichsql = 0;
						if(flagsql==''||flagsql==undefined){
							sql = 'main.Export';
						}						
						else{
							sql = 'main.ExportField';
							var fieldtable = $('#table_name').val();
							params += '&fieldtable='+fieldtable;
							whichsql = 1;
						}						
						var exportflag = 0;						
						if(limitflag==true){
							exportflag = 1;
						}	
						params += '&exportflag='+exportflag;
						params += '&whichsql='+whichsql;					
						
					 	var urlstr=tsd.buildParams({packgname:'service',//java包
													clsname:'ExecuteSql',//类名
													method:'exeSqlData',//方法名
													ds:ds,//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
													tsdcf:tsdcf,//指向配置文件名称
													tsdoper:'query',//操作类型
													datatype:exporttype,//返回数据格式 
													tsdpk:sql//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
													});													
						if($("#download").size()==0)
							$("body").append("<iframe id='download' name='download' width='0' height='0'></iframe>");							
					    $("#download").attr("src","mainServlet.html?"+urlstr + params);				    	
				}	
				
				/**
				*根据不同的导出方式查询数据提示每种导出数据方式最多能导出多少条
				**/
				function querytablecount(params){
					var res = '';
					var urlstr=tsd.buildParams({packgname:'service',//java包
									 			clsname:'ExecuteSql',//类名
									 			method:'exeSqlData',//方法名
									 			ds:'tsdBilling',//数据源名称 对应的WEB-INF/classes/ApplicationContent.xml中配置的数据源
									 			tsdcf:'mssql',//指向配置文件名称
									 			tsdoper:'query',//操作类型 
									 			datatype:'xmlattr',//返回数据格式 
									 			tsdpk:'main.querytablecount' //执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
									 			});							  	
	
					$.ajax({
						url:'mainServlet.html?'+urlstr+params,
						datatype:'xml',
						cache:false,//如果值变化可能性比较大 一定要将缓存设成false
						timeout: 1000,
						async: false ,//同步方式
						success:function(xml){
								$(xml).find('row').each(function(){
									res = $(this).attr("cont");//是否已接收									
								});
						}
					});				
					return res;
				}
				
				/**********************************************************
				function name:    checkedAllFields()
				function:		  数据列全选
				parameters:      
				return:			  
				description:      
				********************************************************/
				function checkedAllFields(){
					var tagname=document.getElementsByName('thefields');  
					for(var i=0;i<tagname.length;i++){
							if(tagname[i].checked == true){
								for(var j = 0;j<tagname.length;j++){
									tagname[j].checked = false;									
								}
								$('#query').html('全选');
								break;
							}else{
								for(var j = 0;j<tagname.length;j++){
									tagname[j].checked = true;									
								}
								$('#query').html('全不选');
								break;
							}
					}  
				}
				
				
				/**********************************************************
				function name:    getTheCheckedFields(ds,tsdcf,table)
				function:		   获取选中的数据列
				parameters:        ds：数据源
								   tsdcf：数据源配置
								   table: 表名,要显示数据的表的名称
								   table2: 别名表中的table_name的值
								   flag：外加附带限制条件
				return:			   
				description:      
				********************************************************/
				function getTheCheckedFields(ds,tsdcf,table,table2,flagfield){
					var thename=document.getElementsByName('thefields');  				
					var thevalue = '';
					var theclos = '';
					var atable = table;
					if(table2!=undefined){
						atable = table2;
					}
					var arr = displayFields(atable);
					var limitarr = thename.length;
					//如果字段较多则只取前20个
					var limitflag = false;
					var disi = 0;
					for(var i = 0 ; i < limitarr;i++){
						if(thename[i].checked==true){
					    	disi++;
					    }
					}
					if(disi>20){
						limitarr = 20;
						limitflag = true;
					}					
					for(var i=0;i<limitarr;i++){
						if(thename[i].checked==true){
							theclos += arr[i] + ',';
						}
					}
					theclos = theclos.substring(0,theclos.lastIndexOf(','));
					/**
					var keys_ = 0;
					if(limitflag==true){
						var myDate = new Date(); 
						keys_ = myDate.getTime();//时间的唯一性
						var theclos_ = '';
						for(var i=0;i<thename.length;i++){
						    if(thename[i].checked==true){
						     	theclos_ += arr[i].replace(/\'/g,'"') + ',';//将'号替换为双引号
						    }
						}
						theclos_ = theclos_.substring(0,theclos_.lastIndexOf(','));
						
						addExportField(theclos_,keys_);//加入数据到临时表
					}
					*/
					//dataDownload('tsdBilling','mssql',theclos,'sys_user');	
					var dataflag = thisDataDownload(ds,tsdcf,theclos,table,flagfield,limitflag,atable);				
					//将面板关闭
					if(dataflag!=false){
						setTimeout($.unblockUI, 15);
					}
					
				}
				
				//视图查询用到的方法
				function getTheCheckedFieldstwo(ds,tsdcf,table1,table2){
					var thename=document.getElementsByName('thefields');  
					var thevalue = '';
					var theclos = '';
					var arr = displayFields(table1);
					
					var limitarr = thename.length;
					//如果字段较多则只取前20个
					var limitflag = false;
					var disi = 0;
					for(var i = 0 ; i < limitarr;i++){
						if(thename[i].checked==true){
					    	disi++;
					    }
					}
					if(disi>20){
						limitarr = 20;
						limitflag = true;
					}
					for(var i=0;i<limitarr;i++){
					    if(thename[i].checked==true){
					     	theclos += arr[i] + ',';
					    }
					}
					theclos = theclos.substring(0,theclos.lastIndexOf(','));
					
					/**
					var keys_ = 0;
					if(limitflag==true){
						var myDate = new Date(); 
						keys_ = myDate.getTime();
						var theclos_ = '';
						for(var i=0;i<thename.length;i++){
						    if(thename[i].checked==true){
						     	theclos_ += arr[i].replace(/\'/g,'"') + ',';
						    }
						}
						theclos_ = theclos_.substring(0,theclos_.lastIndexOf(','));
						addExportField(theclos_,keys_);
					}
					*/
					
					//dataDownload('tsdBilling','mssql',theclos,'sys_user');
					
					thisDataDownload(ds,tsdcf,theclos,table2,'',limitflag);
					
					//将面板关闭
					setTimeout($.unblockUI, 15);
				}
				
				//去除数组重复元素
				function uniqueData_(data){   
				    data = data || [];   
				        var a = {};   
				    for (var i=0; i<data.length; i++) {   
				        var v = data[i];   
				        if (typeof(a[v]) == 'undefined'){   
				            a[v] = 1;   
				        }   
				    };   
				    data.length=0;   
				    for (var i in a){   
				        data[data.length] = i;   
				    }   
				    return data;   
				}
				
				
				