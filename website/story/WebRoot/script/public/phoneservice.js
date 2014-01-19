/*****************************************************************
* name: phoneservice.js
* author: wenxuming
* version: 1.0, 2010-11-09
* description: 电话业务受理专用js
* modify:   
*****************************************************************/	
			
	/*******
    *地址选择器
    *@param;
    *@return;
    ********/
	function c_p_address_fun(control,topp,leftt)
	{
		if($("#c_p_address").size()<1)
		{
			$("#ghSearchBox").after("<div id=\"c_p_address\"></div>");
		}
		var left = leftt;
		var top = topp;		
		if(topp==null || topp==undefined)
		{
			top = $("#" + control).offset().top + 100;
		}		
		if(leftt==null || leftt==undefined)
		{
			left = $("#" + control).offset().left + 60;
		}
		//alert($("#sAddress").parent().offset().left);
		$("#c_p_address").css({'position':'absolute','left':left,'top':top,'background-color':'#FFFFFF','border':'#99ccff 1px solid','height':'112px','width':'800px'});
		$("#c_p_address").empty();
		var address_tab="<table id=\"address_tab\" style=\"\">";
		address_tab += "<tr><td colspan=\"10\"><h4>"+$("#getinternet0374").val()+"</h4></td></tr>";
		address_tab += "<tr><td align=\"right\">"+$("#getinternet0381").val()+"</td><td><select id=\"c_p_address_seluserarea\"><option value=\"\">--"+$("#getinternet0365").val()+"--</option></select></td><td>"+$("#getinternet0375").val()+"</td><td><select id=\"c_p_address_xq\"><option value=\"\">--"+$("#getinternet0365").val()+"--</option></select></td><td>"+$("#getinternet0376").val()+"</td><td><select id=\"c_p_address_ld\"><option value=\"\">--"+$("#getinternet0365").val()+"--</option></select></td><td>"+$("#getinternet0377").val()+"</td><td><select id=\"c_p_address_dy\"><option value=\"\">--"+$("#getinternet0365").val()+"--</option></select></td><td>"+$("#phone.getinternet0378").val()+"</td><td><select id=\"c_p_address_mp\"><option value=\"\">--"+$("#getinternet0365").val()+"--</option></select></td></tr>";
		address_tab += "<tr><td><button id=\"c_p_address_bnok\" class=\"tsdbutton\">"+$("#getinternetSave").val()+"</button></td><td><button id=\"c_p_address_bncancel\" class=\"tsdbutton\">"+$("#getinternet0084").val()+"</button></td><td colspan=\"8\"></td></tr>";
		address_tab += "</table>";
		$("#c_p_address").append(address_tab);
		//getuserareato();该方法被注视
		$("#c_p_address_seluserarea").val($("#userareaid").val());
		var cpad = $("#c_p_address_addright").val();
		if(cpad=="true"){
		  $("#c_p_address_add").removeAttr("disabled");
		}
		$("select[id^='c_p_address_']").css("width","100px");
		//c_p_bindToAddr(1,"c_p_address_xq","");
		var sua = $("select[id='c_p_address_seluserarea'] :selected").html();
		/////////////从内存得到一级地址/////////////////////
		c_p_bindToAddr(1,"c_p_address_xq","&addrarea=" + tsd.encodeURIComponent(sua));
		//获得焦点时显示
		$("#c_p_address").show('slow');
		$(document).one("click",function(event){
			//$("#c_p_address").hide('slow');
			//event.stopPropagation();
		});
		//修改区域后触发
		$("#c_p_address_seluserarea").change(function(){
			var sua = $("select[id='c_p_address_seluserarea'] :selected").html();
			/////////////从内存得到一级地址/////////////////////			
			c_p_bindToAddr(1,"c_p_address_xq","&addrarea=" + tsd.encodeURIComponent(sua));
		});
		//选择小区后更新楼栋数据
		$("#c_p_address_xq").change(function(){
			//alert($("#c_p_address_xq").val()); 
			var addr = $("#c_p_address_xq").val();
			if(addr!="")
			{
				//////////////从内存得到二级地址////////////////////					
				c_p_bindToAddr(2,"c_p_address_ld","&addr=" + tsd.encodeURIComponent(addr));
			}
		});
		//选择楼栋后更新单元数据
		$("#c_p_address_ld").change(function(){
			//alert($("#c_p_address_xq").val()); 
			var addr = $("#c_p_address_ld").val();
			if(addr!="")
			{
				//////////////从内存得到三级地址////////////////////					
				c_p_bindToAddr(3,"c_p_address_dy","&addr=" + tsd.encodeURIComponent(addr));
			}
		});
		//选择单元后更新门牌数据
		$("#c_p_address_dy").change(function(){
			//alert($("#c_p_address_xq").val()); 
			var addr = $("#c_p_address_dy").val();
			if(addr!="")
			{
				//////////////从内存得到四级地址////////////////////					
				c_p_bindToAddr(4,"c_p_address_mp","&addr=" + tsd.encodeURIComponent(addr));
			}
		});

		$("#c_p_address_bnok").click(function(){
			
			var info = "";
			var errinfo = "";
			
			var elems = ['xq','ld','dy','mp'];
			//var infoo = ['小区号','楼栋号','单元号','门牌号'];
			var infoo = [$("#getinternet0375").val(),$("#getinternet0376").val(),$("#getinternet0377").val(),$("#getinternet0378").val()];
			for(var j=0;j<4;j++)
			{
				if($("#c_p_address_"+elems[j]).val() != "")
				{
					info += $("select[id='c_p_address_"+elems[j]+"'] :selected").html();
					info += ",";
				}
			}
			info = info.replace(new RegExp(",","g"),"");
			
			if(info=="")
			{
				//alert("请选择地址");
				alert($("#getinternet0394").val());
				$("#c_p_address_xq").focus();
			}
			else
			{
				//返回 地址写入查询框
				$("#ghSearchBox").val(info);
				//关闭面板
				$("#c_p_address").hide('slow');
				
				$("#ghSearchBox").select();
				$("#ghSearchBox").focus();
			}			
			
		});
		
		$("#c_p_address_bncancel").click(function(){
			//关闭面板
			$("#c_p_address").hide('slow');
		});
	}
	
	function c_p_bindToAddr(idx,selid,param)
	{
	    var userarea = $("#userareaid").val();
		var res = fetchMultiArrayValue("AddressBox.query"+idx,6,param+"&addrarea="+tsd.encodeURIComponent(userarea));
		var elems = ['xq','ld','dy','mp'];
		//alert(res[0] == undefined + ":" + res[0][0] == undefined);
		
		if(res[0] == undefined || res[0][0] == undefined || res[0] == "")
		{
			for(var j=idx;j<=4;j++)
			{
				$("#c_p_address_"+elems[j-1]).empty();
				$("#c_p_address_"+elems[j-1]).append("<option value=\"\">--"+$("#getinternet0365").val()+"--</option>");
			}
			return false;
		}
		$("#"+selid).empty();
		$("#"+selid).append("<option value=\"\">--"+$("#getinternet0365").val()+"--</option>");
		
		var quanju="";
		for(var i=0;i<res.length;i++)
		{
		    var ee="<option value='"+res[i][0]+"'>"+res[i][1]+"</option>";	
		    quanju+=ee					
		}
		 $("#"+selid).html($("#"+selid).html()+quanju);		
		
		//重置索引  > idx + 1 的下拉框
		for(var j=idx + 1;j<=4;j++)
		{
			$("#c_p_address_"+elems[j-1]).empty();
			$("#c_p_address_"+elems[j-1]).append("<option value=\"\">--"+$("#getinternet0365").val()+"--</option>");
		}
	}
			
		 //选择用户所在区域
		 /*        
         function getuserareato(){
            var uareato="";            
            var urlstr=tsd.buildParams({  
										packgname:'service',		//java包
										clsname:'AskConstant',		//类名
										method:'askConstantTable',	//方法名
										identity:'FINAL.area_ywsl',	//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
										pattern:'select',			//访问方式 select：查询常量表信息，update：更新常量表信息
										argument:''				//对常量表的过滤条件
						 				});									
			                $.ajax({
					              url:'mainServlet.html?'+urlstr,
					              datatype:'xml',
					              cache:false,//如果值变化可能性比较大 一定要将缓存设成false
					              timeout: 1000,
					              async: false ,//同步方式
					              success:function(xml){	
					              uareato="";
					              $("#seluserarea").empty();			       
					                $(xml).find('row').each(function(){	
					                  var xuhao = $(this).attr("xuhao");
					                  var ywarea = $(this).attr("ywarea");
					                  if(ywarea!=undefined){
							            var ee="<option value='"+xuhao+"'"+(ywarea==$("#userareaid").val()?"selected='selected'":"")+">"+ywarea+"</option>";
							            uareato=uareato+ee;								       
								      }
							        });							        				       						        
							        $("#c_p_address_seluserarea").html(uareato);					       
							      }
							});
        }   
	*/
	//页面初始化
    function PageInitial()
    {
    	//查询面板键盘事件
		$(document).keydown(function(event){
			//获取元素显示属性
			var panelStatus = $("#multiSearch").css("display");
			
			if(panelStatus == "block")
			{
				//alert(event.keyCode);
				//jqgrid获取被选中的行的index
				var idx = $("#bu_muser").getGridParam("selrow");
				//js中强制转化为数值型
				idx = parseInt(idx,10);
				//alert("A:"+idx);
				//alert(typeof idx);
				var len = $("#bu_muser").getDataIDs().length;
				//alert(typeof len);
				
				if(event.keyCode==40)
				{
					if(idx==null||isNaN(idx))
					{
						$("#bu_muser").setSelection("1");
					}
					else
					{
						$("#bu_muser").setSelection(idx+1);
					}
				}
				else if(event.keyCode==38)
				{
					if(idx==null||isNaN(idx))
					{
						$("#bu_muser").setSelection(len);
					}
					else
					{
						$("#bu_muser").setSelection(idx-1);
					}
				}
				else if(event.keyCode==37)
				{
					$("#bu_pager #prev").click();
				}
				else if(event.keyCode==39)
				{
					$("#bu_pager #next").click();
				}
				else if(event.keyCode==27)
				{
					$("#kdMultiSearchClose").click();
				}
				else if(event.keyCode==13)
				{
					if(idx==null||isNaN(idx)||idx==undefined)
					{
					}
					else
					{
						userChoose($("#bu_muser").getCell(idx,"Yhmc"),$("#bu_muser").getCell(idx,"Dh"),$("#bu_muser").getCell(idx,"Yhdz"));
					}
				}
			}
		});
    	//查询框回车事件
    	$("#ghSearchBox").keydown(function(event){
    		if(event.keyCode==13)
    		{
    			$("#submitButton").click();
    		}
    	});
    	//查询方式更改
    	$("#ghSearchWay").change(function(){
    		$("#ghSearchBox").select();
    		$("#ghSearchBox").focus();
    		
    		if($("#ghSearchWay").val()=="2")
			{							
					$("#ghSearchBox").click();			
			}
    	});
    	
    	$("#ghSearchBox").click(function(){
			if($("#ghSearchWay").val()=="2" && $("#c_p_address").css("display")!="block")
			{
				if(getaddressEditer()=="NO"){
					c_p_address_fun();
				}
			}
		});	
    	
    	//$("#ghBasicInfo select").attr("disabled","disabled");
    	
    	$("#ghBasicInfo :text").attr("disabled","disabled");
    	
    	$("#ghBasicInfo td:even").attr("align","right");
    	$("#ghBasicInfo :text").css("margin-left","5px");
    	
    	$("#ghBasicInfo tr td:even").addClass("labelclass");
    	
    	$("#multiSearch").draggable({handle:"#thisdrag"});
	    	
	    $("#addBzForm").draggable({handle:"#thisdrag"});
    	
    }
    
	function ghSearch()
	{
		//模糊查询总数
		var keys=["Dh","Yhmc","Yhdz"];
		//精确查询
		var keyy=["Revenue.queryByIDExtract","Revenue.queryBySDHExtract","Revenue.queryBySRealNameExtract"];
		//var infos = ["电话","姓名","地址"];
		var infos = [$("#getinternet0103").val(),$("#getinternet0104").val(),$("#getinternet0341").val()];
		var idx = parseInt($("#ghSearchWay").val(),10);
		//alert(idx);
		if($.trim($("#ghSearchBox").val())=="")
		{
			//alert("请输入要查询的用户"+infos[idx]);
			alert($("#getinternet0141").val()+infos[idx]);
			$("#ghSearchBox").select();
			$("#ghSearchBox").focus();
			return false;
		}		
		else
		{
			//每次拼接参数必须初始化此参数
			var param = "";
			tsd.QualifiedVal=true;	
			param = tsd.encodeURIComponent($.trim($("#ghSearchBox").val()));
			if(tsd.Qualified()==false){$("#ghSearchBox").select();$("#ghSearchBox").focus();return false;}			
			var kdjingquechaxun = $("#kdJQ").attr("checked");
			if(kdjingquechaxun)
			{
				var resa = fetchSingleValue(keyy[idx],0,"&UN="+param);
				if(resa==undefined||resa=="")
				{
					//alert("精确查询没有找到"+infos[idx]+"为"+$("#kdSearchBox").val()+"的用户");
					alert($("#getinternet0144").val()+infos[idx]+$("#getinternet0145").val()+$("#kdSearchBox").val()+$("#getinternet0146").val());
					$("#kdSearchBox").select();
					$("#kdSearchBox").focus();
				}
				else
				{
					var resa_sdh = "";
					var resa_srealname = "";
					if(idx==1)
					{
						resa_sdh = $("#kdSearchBox").val();
					}
					else if(idx==2)
					{
						resa_srealname = $("#kdSearchBox").val();
					}
					userChoose(resa,resa_sdh,resa_srealname);
				}
			}
			else
			{			
				var temp = fetchSingleValue("Revenue.queryFuzzyC",6,"&p="+keys[idx]+"&UN="+param);
				if(temp=="0")
				{
					//alert("没有符合条件的用户，请检查输入");
					alert($("#getinternet0142").val());
					$("#ghSearchBox").select();
					$("#ghSearchBox").focus();
				}
				else
				{
					kdMultiUser(keys[idx],param);
				}
			}
		}
	}
	
	
	/////////////////////////查询电话相关信息////////////////////
	function kdMultiUser(flag,UN)
	{
		$("#grid").empty();
		$("#grid").append("<table id=\"bu_muser\" class=\"scroll\"></table><div id=\"bu_pager\" class=\"scroll\"></div>");
		var urlstr = tsd.buildParams({packgname:'service',//java包
							 					clsname:'ExecuteSql',//类名
							 					method:'exeSqlData',//方法名
							 					ds:'tsdBilling',//数据源名称 对应的WEB-INF/classes/ApplicationContent.xml中配置的数据源
							 					tsdcf:'mssql',//指向配置文件名称
							 					tsdoper:'query',//操作类型 
							 					datatype:'xml',
							 					tsdpk:'Revenue.queryFuzzy',//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
							 					tsdpkpagesql:'Revenue.queryFuzzyC',
							 					tsdUserID:'ture'
							 				});
		//var kdFormSett = ["kdUserName","kdsRealName"];
		//alert("Status:"+3);
		//alert(urlstr);
		$("#bu_muser").jqGrid({
				url:'mainServlet.html?' +urlstr + "&p=" + flag + "&UN="+UN, 
				datatype: 'xml', 
				//colNames:['操作','用户姓名','电话','合同号','地址'],
				colNames:[$("#getinternet0342").val(),$("#getinternet0112").val(),$("#getinternet0103").val(),$("#getinternet0100").val(),$("#getinternet0341").val()],
				colModel:[{name:'viewOperation',index:'viewOperation',width:50},
				{name:'Yhmc',index:'Yhmc',width:100},
				{name:'Dh',index:'Dh',width:80},
				{name:'Hth',index:'Hth',width:80},
				{name:'Yhdz',index:'Yhdz',width:350}],
		       	imgpath:'plug-in/jquery/jqgrid/themes/basic/images/', 
		       	pager: jQuery('#bu_pager'), 
		       	sortname:'Yhmc', 
		       	viewrecords: true, 
		       	rowNum:10, //默认分页行数
		       	//rowList:[10,20,30], //可选分页行数
		       	sortorder: 'asc', 
		       	//caption:'用户信息', 
		       	height:260,
		       	//width:726,
		       	loadComplete:function(){
		        	$("#bu_muser").setSelection(1);
		        	//addRowOperBtn('bu_muser','选择','userChoose','Yhmc','click',1,'Dh','Yhdz');
		        	addRowOperBtn('bu_muser',$("#getinternet0343").val(),'userChoose','Yhmc','click',1,'Dh','Yhdz','Hth');		        	
		        	executeAddBtnWithoutAddCell('bu_muser',1);
		        },
		        ondblClickRow:function(idx){
		        	userChoose($("#bu_muser").getCell(idx,"Yhmc"),$("#bu_muser").getCell(idx,"Dh"),$("#bu_muser").getCell(idx,"Yhdz"),$("#bu_muser").getCell(idx,"Hth"));
		        }
			}).navGrid('#bu_pager', {edit: false, add: false, add: false, del: false, search: false}, //options 
				{height:280,reloadAfterSubmit:true,closeAfterEdit:true}, // edit options 
				{height:280,reloadAfterSubmit:true,closeAfterAdd:true}, // add options 
				{reloadAfterSubmit:false}, // del options 
				{} // search options 
				);
			//autoBlockForm("multiSearch","50","close","#FFFFFF",false);
			$("#ghSearchBox").blur();			
			
			autoBlockForm('multiSearch',5,'kdMultiSearchClose',"#FFFFFF",false);
		}
		
	//电话基本信息
	function ghSerBasicInfo(Dh)
	{		
		//查询数据时将正式表中的套餐信息加入到临时表里，调用过程；
		var userid = tsd.encodeURIComponent($("#userid").val());
		//此处调用过程AFTERDHSELECT将固话费用套餐及代缴费用insert到临时表 页面查询						   		
	   	//executeNoQueryProc("PhoneService.TranTmp",6,"&userid=" + tsd.encodeURIComponent(userid) + "&dh="+tsd.encodeURIComponent(Dh));
	   	var result = fetchMultiPValue("PhoneService.TranTmp",6,"&userid=" + tsd.encodeURIComponent(userid) + "&dh="+tsd.encodeURIComponent(Dh));	   	
		if(result[0]!=undefined && result[0][0]!="")
		{
			//从procreturn表中查询失败原因
			if(result[0][0]!='SUCCEED'){
				var resto = fetchSingleValue("dbsql_phone.procreturn",6,"&pname=ywsl_setup&key="+tsd.encodeURIComponent(result[0][1]));
				var languageType = $("#languageType").val();
				//var strreutrn = getCaption(resto,languageType,'套餐固定费获取失败！');
				var strreutrn = getCaption(resto,languageType,$("#getinternet0344").val());
				alert(strreutrn);
			}
		}
		var urlstr=tsd.buildParams({ packgname:'service',//java包
									clsname:'ExecuteSql',//类名
									method:'exeSqlData',//方法名
									ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
									tsdcf:'mssql',//指向配置文件名称
									tsdoper:'query',//操作类型 
									datatype:'xmlattr',//返回数据格式 
									tsdpk:'PhonemoveAddress.dhBasicInfo'
									});
		var params = "&Dh=" + Dh;		
		$.ajax({
			url:"mainServlet.html?"+urlstr+params,
			cache:false,
			success:function(xml){
				$(xml).find("row").each(function(){									
					$("#Dh_yhdang").val($(this).attr("dh")==undefined?"":$(this).attr("dh"));
					//用户地址
					$("#sAddress").val($(this).attr("yhdz")==undefined?"":$(this).attr("yhdz"));
					$("#Yhdz_yhdang").val($(this).attr("yhdz")==undefined?"":$(this).attr("yhdz"));
					//用户姓名
					$("#Yhmcc").val($(this).attr("yhmc")==undefined?"":$(this).attr("yhmc"));
					$("#Yhmc_yhdang").val($(this).attr("yhmc")==undefined?"":$(this).attr("yhmc"));
					//合同号
					$("#Hth_yhdang").val($(this).attr("hth")==undefined?"":$(this).attr("hth"));
					ghSerBasicInfoHthHf($(this).attr("hth"));
					ghSerBasicInfoHth($(this).attr("hth"));
					//一级部门
					$("#Bm1_yhdang").val($(this).attr("bm1")==undefined?"":$(this).attr("bm1"));
					//二级部门
					$("#Bm2_yhdang").val($(this).attr("bm2")==undefined?"":$(this).attr("bm2"));
					//三级部门
					$("#Bm3_yhdang").val($(this).attr("bm3")==undefined?"":$(this).attr("bm3"));
					//四级部门
					$("#Bm4_yhdang").val($(this).attr("bm4")==undefined?"":$(this).attr("bm4"));
					//密码
					$("#querypassword").val($(this).attr("mima")==undefined?"":$(this).attr("mima"));
					$("#Mima_yhdang").val($(this).attr("mima")==undefined?"":$(this).attr("mima"));		
					$("#toMima_yhdang").val($(this).attr("mima")==undefined?"":$(this).attr("mima"));				
					//模块局
					//$("#ModuleBoard").val($(this).attr("mokuaiju")==undefined?"":$(this).attr("mokuaiju"));
					$("#MokuaiJu_yhdang").val($(this).attr("mokuaiju")==undefined?"":$(this).attr("mokuaiju"));						
					//业务区域
					//$("#Businessarea").val($(this).attr("ywarea")==undefined?"":$(this).attr("ywarea"));	
					$("#YwArea_yhdang").val($(this).attr("ywarea")==undefined?"":$(this).attr("ywarea"));
					//联系电话
					//$("#Plinkphone").val($(this).attr("bz9")==undefined?"":$(this).attr("bz9"));
					$("#Bz9_yhdang").val($(this).attr("bz9")==undefined?"":$(this).attr("bz9"));					
					//联系人
					//$("#Plinkman").val($(this).attr("bz8")==undefined?"":$(this).attr("bz8"));		
					$("#Bz8_yhdang").val($(this).attr("bz8")==undefined?"":$(this).attr("bz8"));								
					//计费起始
					//$("#BillingStart").val($(this).attr("startdate")==undefined?"":$(this).attr("startdate"));	
					//$("#StartDate_yhdang").val($(this).attr("startdate")==undefined?"":$(this).attr("startdate"));				
					//计费终止
					//$("#BillingStop").val($(this).attr("enddate")==undefined?"":$(this).attr("enddate"));	
					//$("#EndDate_yhdang").val($(this).attr("enddate")==undefined?"":$(this).attr("enddate"));					
					//装机日期
					//$("#DateInstalled").val($(this).attr("reg_date")==undefined?"":$(this).attr("reg_date"));	
					$("#Reg_Date_yhdang").val($(this).attr("reg_date")==undefined?"":$(this).attr("reg_date"));				
					//强制停开
					$("#qjtkj").val($(this).attr("stopbz")==undefined?"":$(this).attr("stopbz"));		
					$("#StopBz_yhdang").val($(this).attr("stopbz")==undefined?"":$(this).attr("stopbz"));			
					//停机标志
					//$("#TJLogo").val($(this).attr("tjbz")==undefined?"":gethwjbtjbz($(this).attr("tjbz")));
					$("#TJLogo").val($(this).attr("tjbz")==undefined?"":$(this).attr("tjbz"));					
					$("#tfjstatus").val($(this).attr("tjbz")==undefined?"":$(this).attr("tjbz"));					
					//$("#tfjstatus_zh").val($(this).attr("tjbz")==undefined?"":gethwjbtjbz($(this).attr("tjbz")));					
					//$("#Tjbz_yhdang").val($(this).attr("tjbz")==undefined?"":gethwjbtjbz($(this).attr("tjbz")));
					$("#tfjstatus_zh").val($(this).attr("tjbz")==undefined?"":getdatevalue("&cloum=showname&tablename=hwjbdef&key=hwjb='"+$(this).attr("tjbz")+"'"));					
					$("#Tjbz_yhdang").val($(this).attr("tjbz")==undefined?"":getdatevalue("&cloum=showname&tablename=hwjbdef&key=hwjb='"+$(this).attr("tjbz")+"'"));						
					//调级策略
					$("#TJplot").val($(this).attr("adjustsheduleno")==undefined?"":$(this).attr("adjustsheduleno"));	
					$("#AdjustSheduleNo_yhdang").val($(this).attr("adjustsheduleno")==undefined?"":$(this).attr("adjustsheduleno"));				
					//催缴策略
					$("#CJplot").val($(this).attr("callsheduleno")==undefined?"":$(this).attr("callsheduleno"));
					$("#CallSheduleNo_yhdang").val($(this).attr("callsheduleno")==undefined?"":$(this).attr("callsheduleno"));					
					//计费类别
					//$("#piFeeType").val($(this).attr("jflb")==undefined?"":$(this).attr("jflb"));		
					//$("#Jflb_yhdang").val($(this).attr("jflb")==undefined?"":$(this).attr("jflb"));			
					//补贴类别
					//$("#Subsidytype").val($(this).attr("mfjb")==undefined?"":$(this).attr("mfjb"));	
					//$("#Mfjb_yhdang").val($(this).attr("mfjb")==undefined?"":$(this).attr("mfjb"));					
					//话机类型
					//$("#phonetype").val($(this).attr("typenum")==undefined?"":$(this).attr("typenum"));
					//$("#TypeNum_yhdang").val($(this).attr("typenum")==undefined?"":$(this).attr("typenum"));						
					//电话功能
					$("#TrafficLevel").val($(this).attr("dhgn")==undefined?"":$(this).attr("dhgn"));
					//$("#Dhgn_yhdang").val($(this).attr("dhgn")==undefined?"":getyhdangDHgn($(this).attr("dhgn")));
					$("#TrafficLevel_to").val($(this).attr("dhgn")==undefined?"":$(this).attr("dhgn"));	
					$("#Dhgn_yhdang").val($(this).attr("dhgn")==undefined?"":$(this).attr("dhgn"));			
					//交换机编号
					$("#SwitchNumber").val($(this).attr("jhj_id")==undefined?"":$(this).attr("jhj_id"));					
					//移动电话
					//$("#PMobile").val($(this).attr("mobile")==undefined?"":$(this).attr("mobile"));		
					$("#Mobile_yhdang").val($(this).attr("mobile")==undefined?"":$(this).attr("mobile"));				
					//证件类型
					$("#Bz6_yhdang").val(getzjtype($(this).attr("bz6"))==undefined?"":getzjtype($(this).attr("bz6")));				
					//证件号码
					//$("#DocumentsNumber").val($(this).attr("bz7")==undefined?"":$(this).attr("bz7"));
					$("#Bz7_yhdang").val($(this).attr("bz7")==undefined?"":$(this).attr("bz7"));						
					//$("#CreditGrade_yhdang").val(getcreditgradevalue($(this).attr("creditgrade"))==undefined?"":getcreditgradevalue($(this).attr("creditgrade")));//信誉等级						
					$("#CreditPoint_yhdang").val($(this).attr("creditpoint")==undefined?"":$(this).attr("creditpoint"));//信誉积分						
					/*
					$("#CustType_yhdang").val(getcusttypevalue($(this).attr("custtype"))==undefined?"":getcusttypevalue($(this).attr("custtype")));//客户类型
					$("#UserType_yhdang").val(getphoneusertypevalue($(this).attr("usertype"))==undefined?"":getphoneusertypevalue($(this).attr("usertype")));//用户类型
					*/
					$("#CustType_yhdang").val($(this).attr("custtype")==undefined?"":getdatevalue("&cloum=custtype&tablename=custtype&key=custid="+$(this).attr("custtype")));//客户类型
					$("#UserType_yhdang").val($(this).attr("usertype")==undefined?"":getdatevalue("&cloum=yhxz&tablename=yhxz&key=id="+$(this).attr("usertype")));//用户类型				
					//************************************************************************************
					//并机部门
					//$("#cBingJiBuMen").val($(this).attr("bz3")==undefined?"":$(this).attr("bz3"));
					$("#Bz3_yhdang").val($(this).attr("bz3")==undefined?"":$(this).attr("bz3"));
					//并机地址
					//$("#cBingJiDiZhi").val($(this).attr("bz4")==undefined?"":$(this).attr("bz4"));	
					//$("#Bz4_yhdang").val($(this).attr("bz4")==undefined?"":$(this).attr("bz4"));
					//并机备注
					//$("#cBingJiBeiZhu").val($(this).attr("bz5")==undefined?"":$(this).attr("bz5"));
					//$("#Bz5_yhdang").val($(this).attr("bz5")==undefined?"":$(this).attr("bz5"));					
				});
			}
		});
	}
	
	
	
	//得到证件类型显示值
	function getzjtype(key){
		if(key=="7"){
			return $("#getinternet0345").val();//身份证
		}else if(key=="1"){
			return $("#getinternet0346").val();//"教职工";
		}else if(key=="2"){
			return $("#getinternet0347").val();//"本科生";
		}else if(key=="3"){
			return $("#getinternet0348").val();//"研究生";
		}else if(key=="4"){
			return $("#getinternet0349").val();//"离退休";
		}else if(key=="5"){
			return $("#getinternet0350").val();//"护照";
		}else if(key=="6"){
			return $("#getinternet0351").val();//"军官证";
		}else{
			return $("#getinternet0352").val();//"其它";
		}	
	}
	
	//取话费余额和当前月话费
	function ghSerBasicInfoHthHf(Hth)
	{
		var res = fetchMultiArrayValue("PhonemoveAddress.dhBasicInfoHthHf",6,"&Hth="+Hth+"&dhfee="+tsd.encodeURIComponent($("#getinternet0353").val()));//电话费
		if(res[0]==undefined||res[0][0]==undefined)
		{
			return false;
		}
		var str = res[0][1].substr(0,1);
		if(str=="-"){
			//$("#spanyucunYE").text("出帐月欠费");
			$("#spanyucunYE").text($("#getinternet0143").val());
			//$("#spanyucunYE_title").text("出帐月欠费");
			$("#spanyucunYE_title").text($("#getinternet0147").val());
			//话费余额
			$("#phoneBalance").val(res[0][1].substr(1,res[0][1].length));
			$("#phoneBalance_to").val(res[0][1].substr(1,res[0][1].length));
			$("#czyfee").val("NO");
		}else{
			//$("#spanyucunYE").text("出帐月余额");
			$("#spanyucunYE").text($("#getinternet0148").val());
			//$("#spanyucunYE_title").text("出帐月余额");
			$("#spanyucunYE_title").text($("#getinternet0149").val());
			//话费余额
			$("#phoneBalance").val(res[0][1]);
			$("#phoneBalance_to").val(res[0][1]);
			//如果不等于0说明有钱，要提示退费
			if(res[0][1]!="0"){
				$("#czyfee").val("YES");
			}
		}
		var str = res[0][0].substr(0,1);
		if(str=="-"){
			//$("#spanxinyueHF").text("实时欠费");
			$("#spanxinyueHF").text($("#getinternet0150").val());
			$("#mothshuafei").val(res[0][0].substr(1,res[0][0].length));
			$("#sshfee").val("NO");
		}else{
			//$("#spanxinyueHF").text("实时余额");
			$("#spanxinyueHF").text($("#getinternet0151").val());
			$("#mothshuafei").val(res[0][0]);
			$("#sshfee").val("YES");
		}
	}
	
	//取合同号档信息
	function ghSerBasicInfoHth(Hth)
	{
		var urlstr=tsd.buildParams({ packgname:'service',//java包
									clsname:'ExecuteSql',//类名
									method:'exeSqlData',//方法名
									ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
									tsdcf:'mssql',//指向配置文件名称
									tsdoper:'query',//操作类型 
									datatype:'xmlattr',//返回数据格式 
									tsdpk:'PhonemoveAddress.dhBasicInfoHthdang'
									});
		var params = "&Hth=" + Hth;
			$.ajax({
			url:"mainServlet.html?"+urlstr+params,
			cache:false,
			success:function(xml){
				$(xml).find("row").each(function(){
					$("#Hth").val($(this).attr("hth")==undefined?"":$(this).attr("hth"));
					$("#Dh").val($(this).attr("dh")==undefined?"":$(this).attr("dh"));
					$("#Yhmc").val($(this).attr("yhmc")==undefined?"":$(this).attr("yhmc"));
					$("#hthYhmcc").val($(this).attr("yhmc")==undefined?"":$(this).attr("yhmc"));//业务更名中的原合同号姓名
					//用户类型
					$("#usertype").val($(this).attr("yhlb")==undefined?"":$(this).attr("yhlb"));
					$("#Yhlb").val($(this).attr("yhlb")==undefined?"":$(this).attr("yhlb"));
					//用户性质
					$("#UserProper").val($(this).attr("yhxz")==undefined?"":$(this).attr("yhxz"));
					$("#Yhxz").val($(this).attr("yhxz")==undefined?"":$(this).attr("yhxz"));
					//付费策略
					//$("#PayPolicy").val($(this).attr("callpaytype")==undefined?"":getPayPolicy($(this).attr("callpaytype")));
					//$("#CallPayType").val($(this).attr("callpaytype")==undefined?"":getPayPolicy($(this).attr("callpaytype")));
					$("#CallPayType").val($(this).attr("callpaytype")==undefined?"":getdatevalue("&cloum=typename&tablename=CallPayType&key=callpaytype=to_char("+$(this).attr('callpaytype')+")"));
					//收费地点
					$("#feeaddress").val($(this).attr("area")==undefined?"":$(this).attr("area"));
					$("#Area").val($(this).attr("area")==undefined?"":$(this).attr("area"));
					$("#Area_hidden").val($(this).attr("area")==undefined?"":$(this).attr("area"));
					//滞纳金标志
					//$("#ZnjBz").val($(this).attr("znjbz")==undefined?"":getZNJLogo($(this).attr("znjbz")));
					$("#ZnjBz").val($(this).attr("znjbz")==undefined?"":getdatevalue("&cloum=bz&tablename=znjbz&key=znjbz="+$(this).attr("znjbz")));
					//补贴类别
					//$("#HthMfjb").val(geththvalue($(this).attr("hthmfjb"))==undefined?"":geththvalue($(this).attr("hthmfjb")));					
					$("#Bm1").val($(this).attr("bm1")==undefined?"":$(this).attr("bm1"));
					$("#Bm2").val($(this).attr("bm2")==undefined?"":$(this).attr("bm2"));
					$("#Bm3").val($(this).attr("bm3")==undefined?"":$(this).attr("bm3"));
					$("#Bm4").val($(this).attr("bm4")==undefined?"":$(this).attr("bm4"));
					$("#sBm1").val($(this).attr("bm1")==undefined?"":$(this).attr("bm1"));
					$("#sBm2").val($(this).attr("bm2")==undefined?"":$(this).attr("bm2"));
					$("#sBm3").val($(this).attr("bm3")==undefined?"":$(this).attr("bm3"));
					$("#sBm4").val($(this).attr("bm4")==undefined?"":$(this).attr("bm4"));					
					$("#IDCard").val($(this).attr("idcard")==undefined?"":$(this).attr("idcard"));
					$("#Yhdz").val($(this).attr("yhdz")==undefined?"":$(this).attr("yhdz"));//用户地址
			 	    //$("#Bz2").val($(this).attr("bz2")==undefined?"":$(this).attr("bz2")=="Y"?"是":"否");//是否大客户代收
			 	    $("#Bz2").val($(this).attr("bz2")==undefined?"":$(this).attr("bz2")=="Y"?$("#getinternet0354").val():$("#getinternet0355").val());//是否大客户代收
					//$("#Boss_Name").val($(this).attr("boss_name")==undefined?"":$(this).attr("boss_name"));//法人代表		
					//$("#CompType").val(getcomptypevalue($(this).attr("comptype"))==undefined?"":getcomptypevalue($(this).attr("comptype")));//单位类型
					//$("#CreditGrade").val(getcreditgradevalue($(this).attr("creditgrade"))==undefined?"":getcreditgradevalue($(this).attr("creditgrade")));//信誉等级	
					$("#CreditPoint").val($(this).attr("creditpoint")==undefined?"":$(this).attr("creditpoint"));//信誉积分
					//$("#CustType").val(getcusttypevalue($(this).attr("custtype"))==undefined?"":getcusttypevalue($(this).attr("custtype")));//客户类型
					$("#CustType").val($(this).attr("custtype")==undefined?"":getdatevalue("&cloum=custtype&tablename=custtype&key=custid="+$(this).attr("custtype")));//客户类型
					//$("#Email").val($(this).attr("email")==undefined?"":$(this).attr("email"));//邮件地址	
					//$("#FixCode").val($(this).attr("fixcode")==undefined?"":$(this).attr("fixcode"));//传真	
					//$("#HomePage").val($(this).attr("homepage")==undefined?"":$(this).attr("homepage"));//主页
					$("#linkTel").val($(this).attr("linktel")==undefined?"":$(this).attr("linktel"));//联系电话			
					//$("#Manageid").val($(this).attr("manageid")==undefined?"":$(this).attr("manageid"));//营业执照
					//$("#TradeType").val(gettradetypevalue($(this).attr("tradetype"))==undefined?"":gettradetypevalue($(this).attr("tradetype")));//行业类型	
				});
			}
		});
	}
	
	function getdatevalue(key){
		var res = fetchSingleValue('dbsql_phone.querytabledate',1,key);
		if(res==undefined){
			return;
		}
		return res;
	}
	
	//取当前查询电话的杂费信息
	function ghZF(Dh)
	{
		$("#dhZFX").empty();
		var res = fetchMultiArrayValue("PhonemoveAddress.dhZF",6,"&Dh="+Dh);		
		if(res[0]==undefined ||res[0][0]==undefined)
		{
			//$("#gdfeeTips").text("(该用户固定费无信息！)");
			$("#gdfeeTips").text($("#getinternet0152").val());			
			return false;
		}
		$("#gdfeeTips").empty();
		var zfInfo = "";
		zfInfo += "<tr>";
		zfInfo += "<th>";
		//zfInfo += "费用名称";
		zfInfo += $("#getinternet0153").val();
		zfInfo += "</th>";
		zfInfo += "<th>";
		//zfInfo += "费用名称";
		zfInfo += $("#getinternet0153").val();
		zfInfo += "</th>";
		zfInfo += "<th>";
		//zfInfo += "费用";
		zfInfo += $("#getinternet0154").val();		
		zfInfo += "</th>";
		zfInfo += "<th>";
		//zfInfo += "停机费用";
		zfInfo += $("#getinternet0155").val();
		zfInfo += "</th>";
		zfInfo += "<th>";
		//zfInfo += "费用起始时间";
		zfInfo += $("#getinternet0156").val();
		zfInfo += "</th>";
		zfInfo += "<th>";
		//zfInfo += "费用终止时间";
		zfInfo += $("#getinternet0157").val();
		zfInfo += "</th>";
		zfInfo += "</tr>";
		
		for(var i=0;i<res.length;i++)
		{
			zfInfo += "<tr>";
				zfInfo += "<td>";
				zfInfo += res[i][5];
				zfInfo += "</td>";
				zfInfo += "<td>";
				zfInfo += res[i][0];
				zfInfo += "</td>";
				zfInfo += "<td>";
				zfInfo += res[i][1];
				zfInfo += "</td>";
				zfInfo += "<td>";
				zfInfo += res[i][2];
				zfInfo += "</td>";
				zfInfo += "<td>";
				zfInfo += res[i][3];
				zfInfo += "</td>";
				zfInfo += "<td>";
				zfInfo += res[i][4];
				zfInfo += "</td>";
			zfInfo += "</tr>";
		}
		$("#dhZFX").html(zfInfo);		
		$("#dhZFX tr:eq(0)").css("font-weight","700");
		$("#dhZFX td").css("text-align","center");
	}
	
	//取当前查询电话的包月套餐信息
	function gethTC(Dh)
	{
		//var res = fetchMultiArrayValue("PhonemoveAddress.dhZF",6,"&Dh="+Dh);
		$("#dhTCX").empty();
		var res = fetchMultiArrayValue("PhonemoveAddress.dhTC",6,"&dh="+Dh);	
		//判断包月套餐信息是否有数据，没有的话直接退出不做处理
		if(res[0]==undefined ||res[0][0]==undefined)
		{
			return false;
		}
		var zfInfo = "";
		zfInfo += "<tr>";
		zfInfo += "<th>";
		//zfInfo += "费用名称";
		zfInfo += $("#getinternet0153").val();
		zfInfo += "</th>";
		zfInfo += "<th>";
		//zfInfo += "套餐类型";
		zfInfo += $("#getinternet0159").val();
		zfInfo += "</th>";
		zfInfo += "<th>";
		//zfInfo += "起始时间";
		zfInfo += $("#getinternetstarttime").val();
		zfInfo += "</th>";
		zfInfo += "<th>";
		//zfInfo += "终止时间";
		zfInfo += $("#getinternetermination").val();
		zfInfo += "</th>";
		zfInfo += "<th>";
		//zfInfo += "月数";
		zfInfo += $("#getinternet0222").val();		
		zfInfo += "</th>";
		zfInfo += "</tr>";
		
		for(var i=0;i<res.length;i++)
		{
			zfInfo += "<tr>";
				zfInfo += "<td>";
				zfInfo += res[i][0];
				zfInfo += "</td>";
				zfInfo += "<td>";
				zfInfo += res[i][1];
				zfInfo += "</td>";
				zfInfo += "<td>";
				zfInfo += res[i][2];
				zfInfo += "</td>";
				zfInfo += "<td>";
				zfInfo += res[i][3];
				zfInfo += "</td>";
				zfInfo += "<td>";
				zfInfo += res[i][4];
				zfInfo += "</td>";
			zfInfo += "</tr>";
		}
		$("#dhTCX").html(zfInfo);		
		$("#dhTCX tr:eq(0)").css("font-weight","700");
	}
	
	//取当前查询电话的包月套餐信息
	function getdhBYTC(Dh)
	{
		$("#dhBYTC").empty();
		var res = fetchMultiArrayValue("phonelnstalled.queryPackagetypeXXs",6,"&dh="+Dh);
		//判断包月套餐信息是否有数据，没有的话直接退出不做处理
		if(res[0]==undefined ||res[0][0]==undefined)
		{
			//$("#byfeeTips").text("(该用户包月套餐无信息！)");
			$("#byfeeTips").text($("#getinternet0158").val());
			return false;
		}
		$("#byfeeTips").empty();
		var zfInfo = "";
		zfInfo += "<tr>";
		zfInfo += "<th><center>";
		//zfInfo += "套餐类型";
		zfInfo += $("#getinternet0159").val();
		zfInfo += "</center></th>";
		zfInfo += "<th><center>";
		zfInfo += $("#getinternet0159").val();
		zfInfo += "</center></th>";
		zfInfo += "<th><center>";
		//zfInfo += "起始时间";
		zfInfo += $("#getinternetstarttime").val();		
		zfInfo += "</center></th>";
		zfInfo += "<th><center>";
		//zfInfo += "终止时间";
		zfInfo += $("#getinternetermination").val();	
		zfInfo += "</center></th>";
		zfInfo += "</tr>";
		
		for(var i=0;i<res.length;i++)
		{
			zfInfo += "<tr>";
				zfInfo += "<td><center>";
				zfInfo += res[i][0];
				zfInfo += "</center></td>";
				zfInfo += "<td><center>";
				zfInfo += res[i][1];
				zfInfo += "</center></td>";
				zfInfo += "<td><center>";
				zfInfo += res[i][2];
				zfInfo += "</center></td>";
				zfInfo += "<td><center>";
				zfInfo += res[i][3];
				zfInfo += "</center></td>";
			zfInfo += "</tr>";
		}
		$("#dhBYTC").html(zfInfo);		
		$("#dhBYTC tr:eq(0)").css("font-weight","700");
	}
	
	//一次性费用
	function ghPayMoney(feeType)
	{		
		var res = fetchSingleValue("PhonemoveAddress.dhFeeType",6,"&Ywlx="+tsd.encodeURIComponent(feeType));
		if(res==undefined || res == "")
		{
			$("#businesschange").hide();//为空时不显示该区域
			//$("#businesschangecontent").text("(该业务无业务费！)");
			$("#businesschangecontent").text($("#getinternet0160").val());
			//应缴费
			$("#cYingJiao").val("0");			
			$("#cShiShou").val("0");						
			return false;
		}
		$("#businesschangecontent").empty();
		$("#businesschange").show();//不为空时显示该区域
		//缴费项目
		var feeItem = "";
		loadFeeItem(res);
		res = res.split("~");
		var temp = "";
		feeItem += "<table>";	

		for(var i=0;i<res.length;i++)
		{
			executeNoQuery("dbsql_phone.deletebusinessfee",6,"&feetype="+tsd.encodeURIComponent(res[i])+"&userid="+tsd.encodeURIComponent($("#userloginid").val()));//加载杂费前先删除杂费临时表信息
			refreshbusinessfee();
			feeItem += "<td><input type=\"checkbox\" onClick=\"getcheckfee('"+res[i]+"');\" style=\"width:22;padding:0px;border:0px;\" id=\"";
			feeItem += res[i];
			feeItem += "\" />";			
			feeItem += "<span id=\"feeitem_";
			feeItem += i;
			feeItem += "_lbl\">";
			feeItem += res[i];
			feeItem += "</span>";
			feeItem += "</td>";			
		}		
		feeItem += "</table>";
		//应缴费 wxm
		$("#cYingJiao").val("");
		
		//显示费用项目
		$("#feeItem_s").html(feeItem);
		//set the line height
		$("#feeItem_s table tr").css("line-height","26px");
		
		/*wxm
		$("#feeItem_s table input[type='checkbox']").click(function(){
			feeItemChange();
		});*/
		
	}
	//更新费用项和费用金额
	function loadFeeItem(items)
	{
		var res = items.split("~");
		//缴费项目
		var feePItem = res.join(",");
		feePItem = "'" + tsd.encodeURIComponent(feePItem) + "'";
		
		feePItem = feePItem.replace(new RegExp("%2C","g"),"','");
		
		var esr = fetchMultiArrayValue("PhonemoveAddress.dhFTS",6,"&fts="+feePItem);
		//应缴费用
		var fees = 0.0;
		$("#reportparam").val(feePItem);		
		//缴费项目输入框
		var fpitemp = "";		
		for(var k=0;k<esr.length;k++)
		{
			if(esr[k][0]==undefined)
			{
				break;
			}
			fpitemp += esr[k][0];
			fpitemp += ":";
			fpitemp += esr[k][1];
			fpitemp += ",";			
			//费用
			fees += parseFloat(esr[k][1]);
		}
		
		fpitemp = fpitemp.substring(0,fpitemp.length-1);
				
		if(isNaN(fees)) fees = 0;
		if(fpitemp==undefined)	fpitemp = "";
		
		//缴费项目
		$("#cPayItem").val(fpitemp);
		//应缴费 wxm
		//$("#cYingJiao").val(fees);
		
		$("#cShiShou").val(fees);
	}
	//更改费用选项后触发事件
	function feeItemChange()
	{
		var res = "";
		var items = $("#feeItem_s table input[type='checkbox'][checked]");		
		for(var j=0;j<items.length;j++)
		{
			res += $("#"+$(items[j]).attr("id")+"_lbl").text();
			res += "~";
		}
		res = res.substring(0,res.length-1);
		//更新费用项
		loadFeeItem(res);
	}
    
    //查看是否选择单位合同号，如果选择者弹出窗口显示单位同好和单位名称进行选择
        function isnotdanwei(){
        
            $("#queryHTHdw").empty();//每次查询前将以前的数据清空
            var danweiHTHbox = $("#danweiHTHbox").attr("checked");//查看是否被选择
            if(danweiHTHbox==true){
               autoBlockForm('operform',5,'close',"#ffffff",false);//弹出查询框
               var res = fetchMultiArrayValue("phonelnstalled.isnotdanweiHTH",6,"");
               var ify="";
               //ify += "<tr><td width=200><center><h4>单位合同号</h4></center></td><td width=400><center><h4>单位名称</h4></center></td></tr>";
               ify += '<tr><td width=200><center><h4>'+$("#getinternet0356").val()+'</h4></center></td><td width=400><center><h4>'+$("#getinternet0357").val()+'</h4></center></td></tr>';
               for(var i=0;i<res.length;i++){
                    ify += "<tr onClick=\"getHTHdanwei('"+res[i][0]+"')\" onDblClick=\"getinputHTH('"+res[i][0]+"')\" id=\""+res[i][0]+"\">";					
					ify += "<td style=\"width: 180px;height: 20px\"><center>";
					ify += res[i][0];
					ify += "</center></td>";
					ify += "<td width=\"400\"><center>";
					ify += res[i][1];
					ify += "</center></td>";
					ify +="</tr>";
               }
               $("#queryHTHdw").append(ify);
            }else{
               $("#danweiHTHbox").attr("checked","");
               $("#danweiHTH").val("");
               $("#inputDWHTH").val("");//将隐藏域中的清空	
            }
          /********
            $("#queryHTHdw").empty();//每次查询前将以前的数据清空
        	autoBlockForm('operform',5,'close',"#ffffff",false);//弹出查询框
            var res = fetchMultiArrayValue("phonelnstalled.isnotdanweiHTH",6,"");
            var ify="";
            ify += "<thead><tr><th width=\"200\"><center><h4>单位合同号</h4></center></th><th width=\"400\"><center><h4>单位名称</h4></center></th></tr></thead>";
            for(var i=0;i<res.length;i++){
                ify +="<tbody style=\"\max-height: 500px;overflow-y: auto;overflow-x: hidden;\">";
                ify += "<tr onClick=\"getHTHdanwei('"+res[i][0]+"')\" onDblClick=\"getinputHTH('"+res[i][0]+"')\" id=\""+res[i][0]+"\">";					
				ify += "<td style=\"width: 200px;height: 20px\"><center>";
				ify += res[i][0];
				ify += "</center></td>";
				ify += "<td width=\"400\"><center>";
				ify += res[i][1];
				ify += "</center></td>";
				ify +="</tr>";
				ify +="</tbody>";
            }
            $("#queryHTHdw").append(ify);
           // jQuery.page("page",5);
            *********/ 
            
        }
        
        function analizeHwjb(hwjb)
        {
        	if(hwjb=="")
        	{
        		return "";
        	}
        	var result = fetchSingleValue("PhoneModify.oldHwjb",6,"&gh="+hwjb);
        	if(result==undefined)
        	{
        		result = "";
        	}
        	return $.trim(result);
        }
        
        //得到弹出单位合同号信息选择后的合同号
		function getHTHdanwei(params){
		      var inputDWHTH = params; 
		      $("#inputDWHTH").val(inputDWHTH);//把得到的单位合同号添加到隐藏域中点击确定的时候在从隐藏域中取
		      $("#queryHTHdw tr").css('background-color','#ffffff');
		      document.getElementById(params).style.background='#00ffff';
		 }
		//点击弹出合同号狂窗口保存
		function getinputHTH(inputDWHTH){
		     var inputDWHTH = $("#inputDWHTH").val();//从隐藏域中得到单位合同号付给页面显示
		     $("#queryHTHdw tr").css('background-color','#ffffff');
		     $("#danweiHTH").val(inputDWHTH);
		     $("#inputDWHTH").val("");//获取后将隐藏域中的清空		     
		     setTimeout($.unblockUI,15);
		}
		function closeGB(){
		   setTimeout($.unblockUI,15);
		   $("#queryHTHdw tr").css('background-color','#ffffff');
		   $("#danweiHTHbox").attr("checked","");
		   $("#inputDWHTH").val("");//将隐藏域中的清空		   
		}
		///////////////////////////////////////////////////////////////////////////////
		// 功能：这个类使得被附加的表格可以支持行点击高亮
		// 参数：
		//            tbl:                要附加样式的 table.
		//            selectedRowIndex:    初始高亮的行的索引(从 0 开始). 此参数可省。
		//            hilightColor:        高亮颜色。可省（默认为绿色）
		///////////////////////////////////////////////////////////////////////////////
		function TableRowHilighter(tbl, selectedRowIndex, hilightColor) {
		    this.currentRow = null;
		    this.hilightColor = hilightColor ? hilightColor : 'green';   
		
		    if (selectedRowIndex != null 
		        && selectedRowIndex >= 0 
		        && selectedRowIndex < tbl.rows.length) 
		    {
		        this.currentRow = tbl.rows[selectedRowIndex];        
		        tbl.rows[selectedRowIndex].runtimeStyle.backgroundColor = this.hilightColor;
		    }
		
		    var _this = this;
		    tbl.attachEvent("onmouseover", table_onclick);   
		
		    function table_onclick() {
		        var e = event.srcElement;        
		        if (e.tagName == 'TD')
		            e = e.parentElement;            
		        if (e.tagName != 'TR') return;
		        if (e == _this.currentRow) return;        
		        if (_this.currentRow)
		            _this.currentRow.runtimeStyle.backgroundColor = '';
		            
		        e.runtimeStyle.backgroundColor = _this.hilightColor;
		        _this.currentRow = e;
		    }
		}
		
		
		//备注
		
		function addBz(dh)
		{
			if($.trim($("#addBzText").val())=="")
			{
				//alert("请输入备注信息");
				alert($("#getinternet0161").val());
				$("#addBzText").focus();
				$("#addBzText").select();
				return false;
			}
			var memo = "";
			tsd.QualifiedVal=true;	
			memo = tsd.encodeURIComponent($.trim($("#addBzText").val()).substring(0,64));			
			if(tsd.Qualified()==false){return false;}
			var res = executeNoQuery("PhoneModify.addBz",6,"&dh="+dh+"&userid="+$("#userid").val()+"&memo="+memo);
			if(res==true||res=="true")
			{
				//alert("添加备注成功");
				alert($("#getinternet0016").val());
			}
			else
			{
				//alert("添加备注失败");
				alert($("#getinternet0017").val());
			}
		}
		
		function openBzForm(dh)
		{
			showBz(dh);
			autoBlockForm('addBzForm',5,'addBzClose',"#ffffff",false);
			$("#addBzAddExt").click(function(){
				addBz("110");
				if($.trim($("#addBzText").val())=="")
				{
					return false;
				}
				$("#addBzClose").click();
			});
			$("#addBzAddUnt").click(function(){addBz(dh);});
		}
		
		function showBz(dh)
		{
			$("#addBzText").val("");
			
			var res = fetchMultiArrayValue("PhoneModify.showBz",6,"&dh="+dh);
			if(res[0]==undefined || res[0][0]==undefined)
			{
				return false;
			}
			var tablehtml = "";
			
			//tablehtml += "<tr style=\"font-weight:bold;\"><td width=\"8%\">工号</td><td width=\"25%\">时间</td><td  width=\"67%\">备注</td></tr>";
			tablehtml += '<tr style=\"font-weight:bold;\"><td width=\"8%\">'+$("#getinternet0358").val()+'</td><td width=\"25%\">'+$("#getinternet0359").val()+'</td><td  width=\"67%\">'+$("#memo").val()+'</td></tr>';
			
			for(var i=0;i<res.length;i++)
			{
				tablehtml += "<tr>";
				tablehtml += "<td>";
				tablehtml += res[i][0];
				tablehtml += "</td>";
				tablehtml += "<td>";
				tablehtml += res[i][1];
				tablehtml += "</td>";
				tablehtml += "<td>";
				tablehtml += res[i][2];
				tablehtml += "</td>";
				tablehtml += "<tr>";
			}
			
			$("#addBzTab").html(tablehtml);
			$("#addBzTab tr").css("line-height","24px");
			$("#addBzTab tr td").css("background-color","#FFFFFF");
		}
		
		//装机专用JS
		function loadData_phoneinstalled(tablename,language,index,OperationName)
		{
			//语言参数
			if(language==null || language=="" || language!="en")
			{
				language = "zh";
			}
			//修改列位置参数
			if(index==null)
			{
				index = 1;
			}
			var gridData = new Object();
			//取数据集
			var res = fetchMultiArrayValue("phoneinstalled.fetchInfoLimit",6,"&table="+tablename);
			if(typeof res[0]=='undefined')
			{
				//取值失败，返回false;
				return false;
			}
			
			//第2维的长度
			var zidx = res.length;
			//第1维的升序
			var yidx = res[0].length;
			//列别名，用于jqGrid列头显示
			this.colNames = [];
			//列名，用于jqGrid列显示
			this.colModels = [];
			//列名
			this.FieldName = [];
			//列别名
			this.FieldAlias = [];
			//列数据类型
			this.DataType = [];
			
			//默认缺省值
			this.DefaultExpression = [];
			//输入最大值
			this.field_length = [];
			//是否必须
			this.keytype = [];
			
			//select框还是input框
			this.selecttype = [];
			
			//严重时能输入数字还是字符
			this.inputtype = [];
			
			this.AliasKeyVal = fetchFieldAlias(tablename,language);
			
			var temp = "";
			
			for(var i=0;i<zidx;i++)
			{
				//列名
				FieldName.push(res[i][0]);
								
				//数据类型
				DataType.push(res[i][2]);
				//获取操作列名字段信息
				temp = getCaption(res[i][1],language,res[i][1]);				
				keytype.push(res[i][4]);
				selecttype.push(res[i][5]);
				inputtype.push(res[i][6]);
				field_length.push(res[i][7]);
				//别名
				FieldAlias.push(temp);
				//默认缺省值
				DefaultExpression.push(res[i][8]);
				//
				colNames.push(temp);
				//生成操作列name,index信息
				temp = "{name:'"+ res[i][0] + "',index:'" + res[i][0] + "',width:" + (res[i][3]==undefined?"80":res[i][3]) + "}";
				colModels.push(eval("(" + temp + ")"));
			}		
			//操作列语言及位置设置
			if(language=="zh")
			{
				if(index==1)
				{
					colNames.unshift(OperationName==undefined?$("#getinternet0342").val():OperationName);
					//设置第一最后一列为操作列
					temp = "{name:'viewOperation',index:'viewOperation',width:100}";
					colModels.unshift(eval("(" + temp + ")"));
				}
				else if(index==0)
				{
					colNames.push(OperationName==undefined?$("#getinternet0342").val():OperationName);
					//设置最后一列为操作列
					temp = "{name:'viewOperation',index:'viewOperation',width:100}";
					colModels.push(eval("(" + temp + ")"));
				}
				else
				{}
			}
			else
			{
				if(index==1)
				{
					colNames.unshift(OperationName==undefined?"Operation":OperationName);
					//设置第一最后一列为操作列
					temp = "{name:'viewOperation',index:'viewOperation',width:100}";
					colModels.unshift(eval("(" + temp + ")"));
				}
				else if(index==0)
				{
					colNames.push(OperationName==undefined?"Operation":OperationName);
					//设置最后一列为操作列
					temp = "{name:'viewOperation',index:'viewOperation',width:100}";
					colModels.push(eval("(" + temp + ")"));
				}
				else
				{}
			}
			//alert(colNames.length+":"+colModels.length+":"+FieldName.length+":"+FieldAlias.length+":"+DataType.length);
			//alert(colModels.length);	
			gridData.FieldName = FieldName;	
			gridData.FieldAlias = FieldAlias;	
			gridData.DataType = DataType;	
			gridData.colNames = colNames;	
			gridData.colModels = colModels;	
			gridData.AliasKeyVal = AliasKeyVal;
			gridData.keytype = keytype;
			gridData.selecttype = selecttype;
			gridData.inputtype = inputtype;
			gridData.field_length = field_length;
			gridData.DefaultExpression = DefaultExpression;			
			
			//根据字段名取别名
			gridData.getFieldAliasByFieldName=function(fname)
			{
				//return (AliasKeyVal==undefined || AliasKeyVal[fname]==undefined)?"无列名":AliasKeyVal[fname];
				return (AliasKeyVal==undefined || AliasKeyVal[fname]==undefined)?$("#getinternet0361").val():AliasKeyVal[fname];
			}
			
			
			gridData.setWidth=function(obj)
			{
				$.each(obj,function(i,n){
					
					if(i=="Operation")
					{
						if(index==1)
						{
							gridData.colModels[0].width = n;
						}
						else if(index==0)
						{
							gridData.colModels[zidx].width = n;
						}
						else
						{
							//just do it
						}
					}
					else
					{
						var idx = $.inArray(i,gridData.FieldName);				
						
						if(idx!=-1)
						{
							if(index==1)
							{
								idx += 1;
							}
							gridData.colModels[idx].width = n;
						}
					}
				});
			}
			
			/////设置隐藏
			gridData.setHidden=function(obj)
			{
				$.each(obj,function(i,n){
					
					var idx = $.inArray(n,gridData.FieldName);			
					
					if(idx!=-1)
					{
						if(index==1)
						{
							idx += 1;
						}
						gridData.colModels[idx].hidden = true;
					}
				});
			}
			return gridData;
			}
		
		/******
		*判断地址是否可以通过弹出框来选择地址信息，YES可以手动编辑地址框信息，NO是不可以手动编辑，只可以选择地址器
		******/
		function getaddressEditer(){
			var res = fetchMultiArrayValue("dbsql_phone.querytsd_ini",6,"&tsection=address&tident=Editor");
				if(res[0]==undefined || res[0][0]==undefined)
        		{
        			return false;
        		}
        		return res[0][0];
		}
		
		///////////////////////////////////////////////////////////一次性费用处理/////////////////////////////////////////
		//保存业务受理非到临时表businessfee_tmpnew
        function savebusinessfee(){
        	var params='';
        	var sjfeevaluekey = $("#sjfeevalue").val();
        	sjfeevaluekey=sjfeevaluekey.replace(/(^\s*)|(\s*$)/g,"");
        	if(sjfeevaluekey==""){sjfeevaluekey=0;}
        	sjfeevaluekey=parseFloat(sjfeevaluekey,10); 
        	var feenumbervalue = $("#feenumbervalue").val();
        	if(sjfeevaluekey==""){
        		//alert("请输入实际金额！");
        		alert($("#getinternet0049").val());
        		$("#sjfeevalue").select();
        		$("#sjfeevalue").focus();
        		return false;
        	}          	    	
        	var feenamevaluekey = $("#feenamevalue").val();        	       
        	var bz = $("#businessbz").val();
        	bz=bz.replace(/(^\s*)|(\s*$)/g,"");
        	params += "&fee="+sjfeevaluekey;
			params += "&feetype="+tsd.encodeURIComponent(feenamevaluekey);         	
        	params += "&bz="+tsd.encodeURIComponent(bz);
        	params += "&userid="+tsd.encodeURIComponent($("#userloginid").val());
        	var insertRes = executeNoQuery("dbsql_phone.addbusinessfee",6,params);
        	if(insertRes=="true" || insertRes==true)
        		{
        			//alert("添加数据成功");
        			querybusinessfee();
        			$("#businessfee").empty();
        			$("#businessfeevalue :text").val("");
        			refreshbusinessfee(); 
        			closeGB();
        		}
        		else
        		{
        			//alert("添加数据失败");
        			alert($("#getinternet0017").val());
        			refreshbusinessfee();   
        			removecheckbusi();     			
        			closeGB();
        		}        		
        		$("#businessfeevalue :text").val("");
        	querybusinessfee();	
        }
        
        function removecheckbusi(){
        	var fvalue = $("#feenamevalue").val();
        	if($("#"+fvalue+"").attr("checked")){
        		$("#"+fvalue+"").removeAttr("checked");
        	}
        	//loadFeeItem(fvalue);
        	closeGB();
        }
        
        //删除业务受理临时表businessfee_tmpnew
        function deletebusinessfee(feetype){
        	var params='';
			params += "&feetype="+tsd.encodeURIComponent(feetype); 
        	params += "&userid="+tsd.encodeURIComponent($("#userloginid").val());
        	var insertRes = executeNoQuery("dbsql_phone.deletebusinessfee",6,params);
        	if(insertRes=="true" || insertRes==true)
        		{
        			//alert("删除数据成功");
        			alert($("#getinternet0019").val());
        			$("#businessfeevalue :text").val("");
        			$("#businessfee").empty();
        			refreshbusinessfee();
        		}
        		else
        		{
        			//alert("删除数据失败");
        			alert($("#getinternet0020").val());
        			$("#"+feetype+"").attr("checked","checked");
        		}        		
        		$("#businessfeevalue :text").val("");
        		setTimeout("querybusinessfee()",100);
        }
        
        function getcheckfee(key){
        	if($("#"+key+"").attr("checked")){
				var res = fetchMultiArrayValue("PhonemoveAddress.dhFTS",6,"&fts="+tsd.encodeURIComponent("'"+key+"'"));			
				if(res[0]==undefined||res[0][0]==undefined)
				{
				 return "";
				}
				else
				{
					//是否可以更改应缴费项的金额，通过权限来实现	
					if($("#yjfeeright").val()=="true"){
						  $("#sjfeevalue").val("");
						  $("#feenamevalue").val(res[0][0]);
						  $("#feenumbervalue").val(res[0][1]);
						  autoBlockForm('editbusinessfee',5,'close',"#ffffff",false);//弹出查询框
					}else{
											if(res[0][1]==""||res[0][1]=="0"){
												//alert("该费用没有金额！");
												alert($("#getinternet0360").val());
												$("#"+res[0][0]+"").removeAttr("checked");return false;}
											var params='';
											params += "&fee="+res[0][1];
											params += "&feetype="+tsd.encodeURIComponent(res[0][0]);
								        	params += "&userid="+tsd.encodeURIComponent($("#userloginid").val());
								        	var insertRes = executeNoQuery("dbsql_phone.addbusinessfee",6,params);
								        	if(insertRes=="true" || insertRes==true)
								        	{
								        			//alert("添加数据成功");
								        			$("#businessfee").empty();
								        			$("#businessfeevalue :text").val("");
								        			refreshbusinessfee();
								        			closeGB();
								        	 }
								        	 else
								        	 {
								        			//alert("添加数据失败");
								        			alert($("#getinternet0017").val());
								        			refreshbusinessfee();   
								        			removecheckbusi();
								        	  }
								        	querybusinessfee();
					}										
				}
			}else{
				deletebusinessfee(key);				
			}
        }
        
        //从临时表获取金额合计
        function querybusinessfee(){
        	var res = fetchMultiArrayValue("phonelnstalled.querybusinesssumfee",6,"&userid="+tsd.encodeURIComponent($("#userloginid").val()));        	
        	if(res[0]==undefined||res[0][0]==undefined)
			{
				 return "";
			}
			else
			{
			 $("#cYingJiao").val(res[0][0]);
			}
        }
        
        //刷新查询费用项
        function refreshbusinessfee(){	
           $("#businessfee").empty();
           var temp='';
           var res = fetchMultiArrayValue("dbsql_phone.querybusinessfee",6,"&userid="+tsd.encodeURIComponent($("#userloginid").val()));           
           if(res[0]==undefined || res[0][0]==undefined)
           {
           		$("#cPayItem").val("");
           		return false;
           }           
           var querysel="";
           var n=0;
		   for(var i=0;i<res.length;i++)
		   {
		   	   temp += ",";
			   temp += res[i][0];
			   temp += "：";
			   temp += res[i][1];
			   //temp += "元";
			   temp += $("#getinternet0162").val();
		       querysel+="<tr><th style='width:200px;line-height:28px;'><center>";
		       querysel+=res[i][0];
		       querysel+="</center></th><th style='width:115px;line-height:28px;'><center>"
		       querysel+=res[i][1];
		       querysel+="</center></th></tr>";
		       n++;				
		   }
		   for(var j=0;j<5-n;j++){
		   	   querysel+="<tr><th style='width:200px;line-height:28px;'><center>";
		       querysel+="……";
		       querysel+="</center></th><th style='width:115px;line-height:28px;'><center>"
		       querysel+="……";
		       querysel+="</center></th></tr>";	
		   }
		   temp = temp.replace(",","");
		   $("#cPayItem").val(temp);
		   $("#businessfee").append(querysel);
        }