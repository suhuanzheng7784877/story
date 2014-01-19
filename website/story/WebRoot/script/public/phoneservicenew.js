//电话业务受理专用js


//取当前查询电话的杂费信息 从表AttachFee_TmpNew取得
function getghZF(Dh)
	{
		var res = fetchMultiArrayValue("phoneservice.getdhZF",6,"&Dh="+Dh);
		if(res[0]==undefined ||res[0][0]==undefined)
		{
			return false;
		}
		var zfInfo = "";
		zfInfo += "<tr>";
		zfInfo += "<td>";
		zfInfo += $("#getinternet0153").val();
		zfInfo += "</td>";
		zfInfo += "<td>";
		zfInfo += $("#getinternet0154").val();
		zfInfo += "</td>";
		zfInfo += "<td>";
		zfInfo += $("#getinternet0155").val();
		zfInfo += "</td>";
		zfInfo += "<td>";
		zfInfo += $("#getinternet0156").val();
		zfInfo += "</td>";
		zfInfo += "<td>";
		zfInfo += $("#getinternet0157").val();
		zfInfo += "</td>";
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
			$("#dhZFX").html(zfInfo);
		
		$("#dhZFX tr:eq(0)").css("font-weight","700");
	}
	
	
	//打开页面时调用的存储过程
	function openPage(params,tsdpkstr){
	
		/////设置命令参数
		/*
			var urlstr=tsd.buildParams({ packgname:'service',//java包
										  clsname:'ExecuteSql',//类名
										  method:'exeSqlData',//方法名
										  ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
										  tsdcf:'mssql',//指向配置文件名称
										  tsdoper:'exe',//操作类型 
										  datatype:'xml',//返回数据格式 
										  tsdpk:tsdpkstr//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
										});									
				
								
				$.ajax({
						url:'mainServlet.html?'+urlstr+params,
						cache:false,//如果值变化可能性比较大 一定要将缓存设成false
						timeout: 1000,
						async: false ,//同步方式
						success:function(msg){
							if(msg=="true"){
								
								//var operationtips = $("#operationtips").val();
								//var successful = $("#successful").val();
								//jAlert(successful,operationtips);		
														
							}	
						}
					});
		*/
		var result = fetchMultiPValue(tsdpkstr,6,params);
			if(result[0]==undefined || result[0][0]==undefined || result[0][0]=='-1')
			{
				
			}
			else
			{
				
			}			
	}
	
	//打开页面时调用的存储过程
	function openPage1(userid){
	
		/////设置命令参数
			var urlstr=tsd.buildParams({ packgname:'service',//java包
										  clsname:'ExecuteSql',//类名
										  method:'exeSqlData',//方法名
										  ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
										  tsdcf:'mssql',//指向配置文件名称
										  tsdoper:'exe',//操作类型 
										  datatype:'xml',//返回数据格式 
										  tsdpk:'phoneTk.openPage'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
										});									
				urlstr+="&userid="+encodeURIComponent(userid);
								
				$.ajax({
						url:'mainServlet.html?'+urlstr,
						cache:false,//如果值变化可能性比较大 一定要将缓存设成false
						timeout: 1000,
						async: false ,//同步方式
						success:function(msg){
							if(msg=="true"){
								/*
								var operationtips = $("#operationtips").val();
								var successful = $("#successful").val();
								jAlert(successful,operationtips);		
								*/						
							}	
						}
					});
	}
		  /////////////////////////////////////////////////////////////////
	      // 查询该电话费用项信息
	      /////////////////////////////////////////////////////////////////	
		  function addspeediFeeType(Dh)
		  {
		  
		   var ify="";
	       var urlstr=tsd.buildParams({ 	packgname:'service',//java包
						 					clsname:'ExecuteSql',//类名
						 					method:'exeSqlData',//方法名
						 					ds:'tsdBilling',//数据源名称 对应的WEB-INF/classes/ApplicationContent.xml中配置的数据源
						 					tsdcf:'mssql',//指向配置文件名称
						 					tsdoper:'query',//操作类型 
						 					datatype:'xmlattr',
						 					tsdpk:'phonestopopenpay.queryphoneFYX'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
						 				});			 							
			$.ajax({
					url:'mainServlet.html?'+urlstr+"&dh="+Dh,
					datatype:'xml',
					cache:false,//如果值变化可能性比较大 一定要将缓存设成false
					timeout: 1000,
					async: false ,//同步方式
					success:function(xml){
					            ify="";
					            $("#dhzftab tr:has('td')").remove();
								$(xml).find('row').each(function(){
								var id = $(this).attr("ID");
								var feetype = $(this).attr("FeeType");
								var feecode = $(this).attr("FeeCode");								
								var Price = $(this).attr("Price");		
								var TjPrice = $(this).attr("TjPrice");	
								var StartDate = $(this).attr("StartDate");
								var EndDate = $(this).attr("EndDate");	
								if(id!=undefined){	
								ify += "<tr>";
								//<input type='checkbox' name='checkbox1' id='ck' onclick='javascript:iFeetypeSJ("+feecode+")' value='"+feecode+"' style='width:15px; height:15px; border:0px;float:rith; line-height:'/>
								
								ify += "<td><center>";
								ify += "<input type=\"checkbox\" id=\"v_dhzftab_check" + id +  "\" onclick=Dhzf_checkIs() />";
								ify += "</center></td>";								
								ify += "<td><center>";
								ify += $(this).attr("FeeType");
								ify += "</center></td>";
								ify += "<td><center>";
								ify += $(this).attr("FeeCode");
								ify += "</center></td>";
								ify += "<td><center>";
								ify += $(this).attr("Price");
								ify += "</center></td>";
								ify += "<td><center>";
								ify += $(this).attr("TjPrice");
								ify += "</center></td>";
								ify += "<td><center>";
								ify += $(this).attr("StartDate");
								ify += "</center></td>";
								ify += "<td><center>";
								ify += $(this).attr("EndDate");
								ify += "</center></td>";
								ify += "<tr>";	
								}														
							});
							//$("#addspeediFeetype").append(ify);
							
							$("#dhzftab").append(ify);
						}
					});
		   }
		   
		  //取当前查询电话的杂费信息 从表AttachFee_TmpNew取得
			function gettjTC(Dh)
			{
				var ify="";
				var i = 0 ;
			       var urlstr=tsd.buildParams({ 	packgname:'service',//java包
								 					clsname:'ExecuteSql',//类名userChoose
								 					method:'exeSqlData',//方法名
								 					ds:'tsdBilling',//数据源名称 对应的WEB-INF/classes/ApplicationContent.xml中配置的数据源
								 					tsdcf:'mssql',//指向配置文件名称
								 					tsdoper:'query',//操作类型 
								 					datatype:'xmlattr',
								 					tsdpk:'phonestopopenpay.getPackagetype'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
								 				});
					$.ajax({
							url:'mainServlet.html?'+urlstr+"&dh="+Dh,
							datatype:'xml',
							cache:false,//如果值变化可能性比较大 一定要将缓存设成false
							timeout: 1000,
							async: false ,//同步方式
							success:function(xml){
							            // feename,bytc_type, Opendate,Startdate,ys 
							            ify="";							            
							            $("#bytctab tr:has('td')").remove();
										$(xml).find('row').each(function(){
										var id = $(this).attr("feename");								
										if(id!=undefined){	
										ify += "<tr>";
										//<input type='checkbox' name='checkbox1' id='ck' onclick='javascript:iFeetypeSJ("+feecode+")' value='"+feecode+"' style='width:15px; height:15px; border:0px;float:rith; line-height:'/>								
										ify += "<td><center>";
										ify += "<input type=\"checkbox\" id=\"v_bytctab_check\"" + i +  "\" onclick=Bytc_checkIs() />";
										ify += "</center></td>";								
										ify += "<td><center>";
										ify += $(this).attr("feename");
										ify += "</center></td>";
										ify += "<td><center>";
										ify += $(this).attr("bytc_type");
										ify += "</center></td>";
										ify += "<td><center>";
										ify += $(this).attr("Opendate");
										ify += "</center></td>";
										ify += "<td><center>";
										ify += $(this).attr("Startdate");
										ify += "</center></td>";
										ify += "<td><center>";
										ify += $(this).attr("ys");
										ify += "</center></td>";								
										ify += "<tr>";	
										i++;
										}														
									});
									$("#dhTCX").append(ify);
								}
							});		
					}
	
			 //添加新费用的时候判断该费用项是否已经在临时表里 停复机
		    function JudgeISNOTStorage(params,parm)
		    {
		        var result;
		        var res = fetchMultiArrayValue("phonestopopenpay.queryisnotfeename",6,"&Dh="+parm+"&FeeType="+params);	
		        result = res[0][0];
		        return result;	    
		    }
	
			 //判但起始时间是否大于截至时间
		    function gettimedayTF(parm,params)
		    {
		       var result;
		       var res = fetchMultiArrayValue("phonelnstalled.getstartendtime",6,"&starttime="+parm+"&endtime="+params);
		       result = res[0][0];
		       return result;
		    }
			//添加电话费用杂费信息   停复机
		   function insertphonefeenameTF()
		   {
		      
		      var phone = $("#phone").val();//获取电话号码	      
		      var phonefeename = $("#phonefeename").val();//获取费用名称
		      if(phonefeename==''||phonefeename==undefined){
        		//alert("请选择费用名称！");
        		alert($("#getinternet0445").val());
        		$("#phonefeename").focus();
        		return false;
        	}
		      phonefeename = tsd.encodeURIComponent(phonefeename);//进行转码
		      //验证固话费用名称是否唯一
		      var ress = JudgeISNOTStorage(phonefeename,phone);
		      if(ress!=0)
		      {
		      	alert($("#getinternet0008").val());
		      	return false;
		      }
		      //参数列表获取
		      var feecode = $("#feecode").val();
		      var feelv = $("#feelv").val();
		      var TJfeelv = $("#TJfeelv").val();
		      var ZFStartday = $("#ZFStartday").val();
		      
		      if(!/^\d{4}-\d{2}-\d{2}$/.test(ZFStartday))
		      {
		      	$("#ZFStartday").focus();
		      	return false;
		      }
		      
		      var ZFEndday = $("#ZFEndday").val();
		      
		      if(!/^\d{4}-\d{2}-\d{2}$/.test(ZFEndday))
		      {
		      	$("#ZFEndday").focus();
		      	return false;
		      }
		      
		      var ZFStartmonth = ZFStartday.substring(0,7);//起始月
		      ZFStartmonth = ZFStartmonth.replace('-',"");
		      
		      var ZFEndmonth = ZFEndday.substring(0,7);//终止月
		      ZFEndmonth = ZFEndmonth.replace('-',"");
		      
		      var feename = $("#Subtype").val();
		      feename = tsd.encodeURIComponent(feename);
		      
		      //检测终止时间是否大于起始时间
		      var resg = gettimedayTF(ZFStartday,ZFEndday);
		      resg = parseInt(resg,10);
		      if(resg<=0)
		      {
					alert($("#getinternet0015").val());
					$("#ZFEndday").select();
		      		$("#ZFEndday").focus();
		      		return false;
		      }
		     //判断电话是否不为空
		      if(phone=="")
		      {
		      	alert($("#getinternet0140").val());
		      	return false;
		      }
		      var userid = tsd.encodeURIComponent($("#userid").val());
		      
		      //往临时表中插入新纪录 res用于存放返回值 ，true插入成，false插入失败
		      var res = executeNoQuery("phonestopopenpay.insertphonefeename",6,"&dh="+phone+"&feetype="+phonefeename+"&feecode="+feecode+"&feelv="+feelv+"&TJfeelv="+TJfeelv+"&StartMonth="+ZFStartmonth+"&EndMonth="+ZFEndmonth+"&StartDate="+ZFStartday+"&EndDate="+ZFEndday+"&feename="+feename+"&OperID="+userid);
		      
		      if(res=="true")
		      {
		        alert($("#getinternet0016").val());
		        addspeediFeeType(phone);//重新加载数据
		        var dhg= $("#spandh").text();
		        var spanFeeName= $("#spanFeeName").text();
		       	//var spanFeeCode= $("#spanFeeCode").text();
		       	//var spanPrice= $("#spanPrice").text();
		       	//var spanTjPrice= $("#spanTjPrice").text();
		       	var starttimeinfo= $("#starttimeinfo").val();
		       	var terminationinfo= $("#terminationinfo").val();
		       	
		       	var addinfo = $("#addinfo").val();
		       	
		        //写入日志操作 
				var str ="(AttachFee_TmpNew)"+addinfo+"。"+dhg+":"+phone+";"+spanFeeName+":"+$("#phonefeename").val()+";"+starttimeinfo+":"+ $("#ZFStartday").val()+";" +terminationinfo+":"+$("#ZFEndday").val() +";";
				writeLogInfo("","add",encodeURIComponent(str));		
		        $("#feecode").val("");
		        $("#feelv").val("");
		        $("#TJfeelv").val("");
		        $("#ZFStartday").val("");
		        $("#ZFEndday").val("");
		        $("#Subtype").val("");
		        $("#feenameid").val("");
		        $("#Subtype").val("");
		        $("#phonefeename").val("");     		
									
		      }
		      else
		      {
		        alert($("#getinternet0017").val());		        
		      }
		    }
		    
		   //生成电话费用名称下拉框        
	        function getphonefeenameTF()
	        {
	           $("#phonefeename").html("<option value=\"\">--"+$("#getinternet0365").val()+"--</option>");
	           
	           var res = fetchMultiArrayValue("phonelnstalled.queryphonefeename",6,"");
	           
	           if(res[0]==undefined || res[0][0]==undefined)
	           {
					return false;
	           }
	           
	           var querysel="";
			   for(var i=0;i<res.length;i++)
			   {
			       var ee="<option value='"+res[i][2]+"'>"+res[i][2]+"</option>";	
			       querysel+=ee;					
			   }
			   
			   $("#phonefeename").append(querysel);
	        }
			/**
			*固话杂费  费用名称   下拉框change事件
	        *根据电话费用名称对因的相关数据    
	        *停复机   
			*/
        function getfeenameall()
        {
           var phonefeename = $("#phonefeename").val();
           alert(phonefeename);         
           if(phonefeename=="")
           {
              $("#feecode").val("");
              $("#Subtype").val("");
              $("#feelv").val("");
              $("#TJfeelv").val("");
              $("#ZFStartday").val("");
              $("#ZFEnday").val("");
              return false;
           }
           var feename = $("#phonefeetype option:selected").text();
           if($("#phonefeetype").val()==""){
           		feename="";
           	}
           //取费用项信息
           var res = fetchMultiArrayValue("phonelnstalled.queryfeenameall",6,"&FeeType="+tsd.encodeURIComponent(phonefeename)+"&vfeename="+tsd.encodeURIComponent(feename));
           var FeeCode = res[0][0];
           var FeeName = res[0][1];
           var Price = res[0][3];
           var TjPrice = res[0][4];
           $("#feecode").val(FeeCode);
           $("#Subtype").val(FeeName);
           $("#feelv").val(Price);
           $("#TJfeelv").val(TjPrice);
        }
        
        //选中所有的电话杂费项 停复机
	    function Dhzf_CheckAllTF()
	    {
	    	if($("#dhzftab_checkall").attr("checked")){
        		$("input[id^='v_dhzftab_check']").attr("checked","checked");
        	}
        	else{
        		$("input[id^='v_dhzftab_check']").removeAttr("checked");
        	}        
	    }
	    //固话月杂费 复选框和头部选框的级联
	    function Dhzf_checkIs(){	    	
				//定义一个临时变量，避免重复使用同一个选择器选择页面中的元素，提升程序效率。
				var $tmp=$("input[id^='v_dhzftab_check']");
				//用filter方法筛选出选中的复选框。并直接给CheckedAll赋值。
				$('#dhzftab_checkall').attr('checked',$tmp.length==$tmp.filter(':checked').length);	
	 		
	    }
	   
	      
		    //删除列表中的电话费用杂费信息 停复机
		    function deletephonefeenameTF()
		    {	
				//获取选中的复选框
				var checkedDhzf = $("input[id^='v_dhzftab_check'][checked]");
				//计算选中复选框的个数
	        	var count = $(checkedDhzf).size();
	        	if(count==0||count==undefined){
	        		//alert("请选择要删除套餐！");
	        		alert($("#getinternet0446").val());
	        		return false;
        		}
	        	
	        	//获取电话号码
	        	var dh = $("#phone").val();
	        	//定义变量用于存放固话杂费的费用名称
	        	var feetype = "";
	        	//做标识，
	        	var result = true;
	        	var resultTmp = false;
	        	var feetypeA =[];
	        	for(var i=0;i<count;i++)
	        	{
	        		//获取费用名称的值
	        		feetype = $(checkedDhzf[i]).parent().parent().next().text();
	        		feetypeA.push(feetype);
	        		/********
	        		alert($(checkedDhzf[i]));
	        		alert($(checkedDhzf[i]).parent());
	        		alert($(checkedDhzf[i]).parent().parent());
	        		alert($(checkedDhzf[i]).parent().parent().next());
	        		alert($(checkedDhzf[i]).parent().parent().next().text());
	        		*****/
	        		//alert(feetype);
	        		//删除选中纪录
	        		resultTmp = executeNoQuery("phonestopopenpay.deletephonefeename",6,"&FeeType="+tsd.encodeURIComponent(feetype)+"&Dh="+dh);
	        		if(resultTmp=="false" || resultTmp==false)
	        		{
	        			result = false;
	        		}
	        	}
	        	
	        	if(result)
	        	{
	        		alert($("#getinternet0050").val());
	        	}
	        	else
	        	{
	        		alert($("#getinternet0051").val());
	        	}
	        	//重新加载数据
	        	addspeediFeeType(dh);
	        	var dhg= $("#spandh").text();
	        	var spanFeeName= $("#spanFeeName").text();
		       	//var spanFeeCode= $("#spanFeeCode").text();
		       	//var spanPrice= $("#spanPrice").text();
		       	//var spanTjPrice= $("#spanTjPrice").text();
		       	//var starttimeinfo= $("#starttimeinfo").val();
		       	//var terminationinfo= $("#terminationinfo").val();
		       	
		       	var deleteinfo = $("#deleteinfo").val();
		       	
		        //写入日志操作 
				var str ="(AttachFee_TmpNew)"+deleteinfo+"。"+";"+dhg+":"+ dh+";"+spanFeeName+":"+feetypeA ;
				writeLogInfo("","delete",encodeURIComponent(str));		
		       
		    }
		     //生成电话包月套餐下拉框       
	        function getPackagetypeTF()
	        {
	           $("#Packagetype").html("<option value=\"\">--"+$("#getinternet0365").val()+"--</option>");
	           
	           var res = fetchMultiArrayValue("phonelnstalled.queryPackagetype",6,"");
	           
	           if(res[0]==undefined || res[0][0]==undefined)
	           {
	           		return false;
	           }
	           
	           var querysel="";
			   for(var i=0;i<res.length;i++)
			   {
			       var ee="<option value='"+res[i][0]+"'>"+res[i][0]+"</option>";	
			       querysel+=ee;					
			   }
			   
			   $("#Packagetype").append(querysel);
	        }  
	    	//选中所有的包月套餐 停复机		    
	        function Bytc_CheckALLTF()
	        {
	        	if($("#bytctab_checkall").attr("checked"))
	        		$("input[id^='v_bytctab_check']").attr("checked","checked");
	        	else
	        		$("input[id^='v_bytctab_check']").removeAttr("checked");
	        }
        	 //包月套餐 复选框和头部选框的级联
		    function Bytc_checkIs(){
		    		//定义一个临时变量，避免重复使用同一个选择器选择页面中的元素，提升程序效率。
					var $tmp=$("input[id^='v_bytctab_check']");
					//用filter方法筛选出选中的复选框。并直接给CheckedAll赋值。
					$('#bytctab_checkall').attr('checked',$tmp.length==$tmp.filter(':checked').length);	
		 	}
		 	
		 	 //包月套餐保存临时表
        function Bytc_SaveTF()
        {
        	//验证是否选择包月套餐类型
        	var tctype = $("#Packagetype").val();
        	if(tctype=="" || tctype==undefined)
        	{        		
        		alert("请选择包月套餐类型");
        		$("#Packagetype").focus();
        		return false;
        	}
        	else
        	{        		
        		//alert(/^\d{4}-\d{2}-\d{2}$/.test($("#TCStarttime").val()));
        		var dh = $("#phone").val();
        		//验证所添加套餐类型是否已存在
        		var existedcheck=fetchSingleValue("phonelnstalled.checkbytcexisted",6,"&bytctype="+tsd.encodeURIComponent(tctype)+"&dh="+dh);
        		existedcheck = parseInt(existedcheck);
        		if(existedcheck!=0)
        		{
        			alert($("#getinternet0055").val() + tctype + $("#getinternet0014").val());
        			return false;
        		}
        		
        		if(!/^\d{4}-\d{2}-\d{2}$/.test($("#TCStarttime").val()))
        		{
        			$("#TCStarttime").focus();
        			return false;
        		}
        		if(!/^\d{4}-\d{2}-\d{2}$/.test($("#TCEndtime").val()))
        		{
        			$("#TCEndtime").focus();
        			return false;
        		}
        		
        		var startdate = $("#TCStarttime").val();
        		var enddate = $("#TCEndtime").val();
        		//检测时间
        		var timecheck=fetchSingleValue("phonelnstalled.getstartendtime",6,"&starttime="+startdate+"&endtime="+enddate);
        		timecheck = parseInt(timecheck);
        		if(isNaN(timecheck) || timecheck<=0)
        		{
        			alert($("#getinternet0015").val());
        			return false;
        		}
        		
        		//取费用名称和月数
        		var res = fetchMultiArrayValue("phonelnstalled.queryPackagetypeByWhere",6,"&bytctype="+tsd.encodeURIComponent(tctype));
        		
        		if(res[0]==undefined || res[0][0]==undefined)
        		{
        			return false;
        		}
        		
        		var feename = res[0][0];
        		var ys = res[0][2];        		
        		
        		var startmonth=startdate.substr(0,7).replace("-","");
        		var endmonth=enddate.substr(0,7).replace("-","");
        		
        		
        		var userid = $("#userid").val();
        		
        		var params = "";
        		params += "&feename=";
        		params += tsd.encodeURIComponent(feename);
        		params += "&bytctype=";
        		params += tsd.encodeURIComponent(tctype);
        		params += "&dh=";
        		params += dh;
        		params += "&Openmonth=";
        		params += startmonth;
        		params += "&Opendate=";
        		params += startdate;
        		params += "&Startmonth=";
        		params += endmonth;
        		params += "&Startdate=";
        		params += enddate;
        		params += "&ys=";
        		params += ys;
        		params += "&OperID=";
        		params += userid;
        		
        		var insertRes = executeNoQuery("phonelnstalled.addbytc",6,params);
        		if(insertRes=="true" || insertRes==true)
        		{
        			alert($("#getinternet0016").val());
        			//Bytc_Refresh();
        			gettjTC(dh);
        		}
        		else
        		{
        			alert($("#getinternet0017").val());
        		}
        		
        		var dhg= $("#spandh").text();
	        	var tcname= $("#spanTCLX_table").text();		       
		       	var starttimeinfo= $("#starttimeinfo").val();
		       	var terminationinfo= $("#terminationinfo").val();
		       	
		       	var addinfo = $("#addinfo").val();
		       	
		        //写入日志操作 
				var str ="(qhyt_bytc_detail_Tmp)"+addinfo+"。"+dhg+":"+dh+";"+tcname+":"+$("#Packagetype").val()+";"+starttimeinfo+":"+ $("#TCStarttime").val()+";" +terminationinfo+":"+$("#TCEndtime").val() +";";
				writeLogInfo("","add",encodeURIComponent(str));		
					
        		$("#Packagetype").val("");
        		$("#TCStarttime").val("");
        		$("#TCEndtime").val("");
        		//'<feename>','<bytctype>','<dh>','<Openmonth>','<Opendate>','<Startmonth>','<Startdate>',<ys>,'<OperID>')
        	}
        }    
        
         //包月套餐删除
        function Bytc_DelTF()
        {
        	var checkedBytc = $("input[id^='v_bytctab_check'][checked]");
        	var count = $(checkedBytc).size();
        	//alert(count);
        	if(count==0||count==undefined){
        		//alert("请选择要删除套餐！");
        		alert($("#getinternet0446").val());
        		return false;
        	}
        	
        	var dh = $("#phone").val();
        	var tclx = "";
        	
        	var result = true;
        	var resultTmp = false;
        	var tclxA =[];
        	for(var i=0;i<count;i++)
        	{
        		tclx = $(checkedBytc[i]).parent().parent().next().next().text();
        		tclxA.push(tclx);
        		//alert(tclx);
        		resultTmp = executeNoQuery("phonelnstalled.delbytc",6,"&bytctype="+tsd.encodeURIComponent(tclx)+"&dh="+dh);
        		
        		if(resultTmp=="false" || resultTmp==false)
        		{
        			result = false;
        		}
        	}
        	
        	if(result)
        	{
        		alert($("#getinternet0019").val());
        		
        	}
        	else
        	{
        		alert($("#getinternet0020").val());
        	}
        	
        	gettjTC(dh);//更新列表
        	 //写入日志操作
        	var dhg= $("#spandh").text();
        	var tcname= $("#spanTCLX_table").text();	       
	       	var deleteinfo = $("#deleteinfo").val();
			var str ="(qhyt_bytc_detail_Tmp)"+deleteinfo+"。"+";"+dhg+":"+ dh+";"+tcname+":"+tclxA ;
			writeLogInfo("","delete",encodeURIComponent(str));	
        	
        }
        
        //执行Ywsl_IfCanSouli存储过程 获取返回值
		function exeYwslIfCanSouliTF(params) {
			//判断存储过程返回值
			var falg = true;
			//Ywsl_IfCanSouli 'Hth=合同号;dh=电话号码;OperID=工号;Ywlx=强制停开机;Func=0'			
			/////设置命令参数
			var urlstr=tsd.buildParams({ packgname:'service',//java包
									clsname:'Procedure',//类名
									method:'exequery',//方法名
									ds:'tsdBilling',//数据源名称 对应的 WEB-INF/classes/ApplicationContent.xml中配置的数据源
									tsdExeType:'query',//操作类型 
									datatype:'xml',//返回数据格式 
									tsdpname:'phoneTk.YwslIfCanSouli'
									});	 
				var	Res ='';														
				urlstr+="&params="+encodeURIComponent(params);
				$.ajax({
						url:'mainServlet.html?'+urlstr,
						datatype:'xmlattr',
						cache:false,//如果值变化可能性比较大 一定要将缓存设成false
						timeout: 1000,
						async: false ,//同步方式
						success:function(xml){
						
							$(xml).find('row').each(function(){
								//获取存储过程返回值。
								Res = $(this).attr("ResMessage");		
								//国际化标签	操作提示			
								var operationtips = '<fmt:message key="global.operationtips"/>';
								//国际化标签 操作成功。
								var successful = '<fmt:message key="global.successful"/>';
								
								if(Res==''||Res==undefined||Res=='undefined'){
									//成功提示
									//jAlert(successful,operationtips);	
									//alert("查找成功！");
									falg = true;	
									setTimeout($.unblockUI,1);												
								}
								else{
									//错误提示
									alert(Res);
									//jAlert(Res,operationtips);
									falg = false;
								}
								
							});
						}
				});
				return falg;
		}
		   
	
	