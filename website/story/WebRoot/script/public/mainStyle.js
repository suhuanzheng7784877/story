 /*****************************************************************
 * name: mainStyle.js
 * author:
 * version: 1.0,  2009
 * description: 
 * modify:
 *		2011-1-7 youhongyu 修改clearText方法
 *****************************************************************/

$(document).ready(function() {

		////////////////////////////////////////////////
		////用户主要使用的菜单按下效果
		////////////////////////////////////////////////
		$('#menus').find('ul').find('a').click(function(){
									$('#menus').find('ul').find('a').removeClass();
			$('#menus').find('ul').find('a').addClass('links');
			
			$(this).addClass('top-menu li this');
			$('#top-menu').find('ul').find('a').removeClass();
			$('#top-menu').find('ul').find('a').addClass('mainmenu');
			$('#privatemenu').addClass('this');
	
		});
		
		////////////////////////////////////////////////////////////
		////顶部菜单
		/////////////////////////////////////////////////////////
		$('#top-menu').find('ul').find('a').click(function(){
			
			$('#top-menu').find('ul').find('a').removeClass();
			$('#top-menu').find('ul').find('a').addClass('mainmenu');
			$(this).addClass('this');
			
			
		})
		
		////////////////////////////////////////////
		/////表单自动变色提示
		////////////////////////////////////////////
		$("#login-main .input input").mouseover(function(){
				$(this).css("background","#ffff99");
				$(this).css("border","#0066CC solid 1px;");
				$(this).focus();
				$(this).select();

			}).mouseout(function(){
					$(this).css("background","#e8f7ff");
					$(this).css("border","solid #7BB8EA 1px");
				});
		
		/**************************
		 **加载数据列表信
		 **************************/
			$("#dataList tr:even").addClass("over");
			$("#dataList tr:odd").addClass("alt");
			$("#dataList .title").removeClass("over");
			$("#dataList tr").mouseover(function(){
					 if($("#dataList tr").index(this)!=0){
				 		$(this).addClass("move");}
					}).mouseout(function(){
					if($("#dataList tr").index(this)!=0){
						
						//$("#dataList tr:even").addClass("over");
						//$("#dataList tr:odd").addClass("alt");
						$(this).removeClass("move");
					}else{}
				})
			$("#dataList tr:even").click(function(){		 
				if($("#dataList tr").index(this)!=0){
					if($(this).attr('class').indexOf('select')==-1){			
						$(this).addClass("select");
						$(this).find("input").attr("checked","checked");
					}else{
						$(this).removeClass("select");
						$(this).addClass("over");
						$(this).find("input").attr("checked","");
					}
				}
			})
			$("#dataList tr:odd").click(function(){
				
				if($(this).attr('class').indexOf('select')==-1){
					$(this).addClass("select");
					$(this).find("input").attr("checked","checked");
				}else{
					$(this).removeClass("select");
					$(this).addClass("alt");
					$(this).find("input").attr("checked","");
				}
			})
		
});
		/////////////////////////////////////////////
		///// 全选 反选 不选
		/////////////////////////////////////////////
	//param:all none reverse 
	function checkes(param){
		if(param=="all"){
			$(document).find("input").attr("checked","checked");
		}
		if(param=="none"){
			$(document).find("input").attr("checked","");
		}
		if(param=="reverse"){
				$(document).find("input").each(function(){
													
					if($(this).attr("checked")!=true){
							$(this).attr("checked","checked");
						}else{$(this).attr("checked","");}									
				});
		}
		$(document).find("input").each(function(){
													
					if($(this).attr("checked")!=true){
						$(this).parent().parent().removeClass("select");
							
						}else{$(this).parent().parent().addClass("select");}									
				});
	}
	
	//追加操作列
	 function setCell(gridId){
	 	var menuTblRow = document.getElementById(gridId).rows;
	 	var len = menuTblRow.length;
		for(var j=1;j<len;j++){
	 		var newCell = menuTblRow[j].insertCell(-1);
			}	
	 	}
	function setThisCell(strid){
	 	var menuTblRow = document.getElementById(strid).rows;
	 	var len = menuTblRow.length;
		for(var j=1;j<len;j++){
	 		var newCell = menuTblRow[j].insertCell(-1);
			}	
	 	}
var menuOpers=[]; 

	////组装
	////gridId	 表格的id
	////linkName 链接名称
	////url      链接地址
	////idName   行主键列的名称 可以是隐藏列
	////outType  链接激活方式 枚举类型 href：为跳转页面 ，click：事件激活方式
	////index    该按钮在行按钮的位置 数字
	////参数id 7-13预留为字段ID
	function addRowOperBtn(gridId,linkName,url,idName,outType,index){
			var menuTblRow = document.getElementById(gridId).rows;
			var idName_b = arguments[6];
			var idName_c = arguments[7];
			var idName_d = arguments[8];
			var idName_e = arguments[9];
			var idName_f = arguments[10];
			var idName_g = arguments[11];
			var idName_h = arguments[12];
			var useSecondKey = (typeof idName_b=='undefined'?false:true);
			var useThirdKey = (typeof idName_c=='undefined'?false:true);
			var useFouthKey = (typeof idName_d=='undefined'?false:true);
			var useFifthKey = (typeof idName_e=='undefined'?false:true);
			var useSixthKey = (typeof idName_f=='undefined'?false:true);
			var useSevenKey = (typeof idName_g=='undefined'?false:true);
			var useEighthKey = (typeof idName_h=='undefined'?false:true);
			//alert(idName_b+"+"+useSecondKey);
	 		var len = menuTblRow.length;
	 				var temp=[]; 
					for(var j=1;j<len;j++){
						var params =jQuery('#'+gridId).getRowData(j)[idName];
						var paramsb;
						
						if(useSecondKey)
							paramsb=jQuery('#'+gridId).getRowData(j)[idName_b];
						if(useThirdKey)
							paramsc=jQuery('#'+gridId).getRowData(j)[idName_c];
						if(useFouthKey)
							paramsd=jQuery('#'+gridId).getRowData(j)[idName_d];
						if(useFifthKey)
							paramse=jQuery('#'+gridId).getRowData(j)[idName_e];
						if(useSixthKey)
							paramsf=jQuery('#'+gridId).getRowData(j)[idName_f];
						if(useSevenKey)
							paramsg=jQuery('#'+gridId).getRowData(j)[idName_g];
						if(useEighthKey)
							paramsh=jQuery('#'+gridId).getRowData(j)[idName_h];
						
						//alert(index);
						var btnHtml='';
							if(outType=='link'){
								btnHtml+='<a href=\"'+url+'&'+idName+'='+params;
								if(useSecondKey)
									btnHtml+='&'+idName_b + '=' + paramsb;
								if(useThirdKey)
									btnHtml+='&'+idName_c + '=' + paramsc;
								if(useFouthKey)
									btnHtml+='&'+idName_d + '=' + paramsd;
								if(useFifthKey)
									btnHtml+='&'+idName_e + '=' + paramse;
								if(useSixthKey)
									btnHtml+='&'+idName_f + '=' + paramsf;
								if(useSevenKey)
									btnHtml+='&'+idName_g + '=' + paramsg;
								if(useEighthKey)
									btnHtml+='&'+idName_h + '=' + paramsh;
								btnHtml+='\">'+linkName+'</a>';
							}else if(outType=='click'){
								btnHtml+='<a href=\"javascript:'+url+"('"+params;
								if(useSecondKey)
								{btnHtml+="','"+paramsb;}
								if(useThirdKey)
								{btnHtml+="','"+paramsc;}
								if(useFouthKey)
								{btnHtml+="','"+paramsd;}
								if(useFifthKey)
								{btnHtml+="','"+paramse;}
								if(useSixthKey)
								{btnHtml+="','"+paramsf;}
								if(useSevenKey)
								{btnHtml+="','"+paramsg;}
								if(useEighthKey)
								{btnHtml+="','"+paramsh;}
								
								btnHtml=btnHtml+"')\">"+linkName+'</a>';
							}
							
							temp[j]=btnHtml;
						
					}
					
						menuOpers[index-1]=temp;
	}
	/////执行行按钮添加
	//////表格ID
	//////count 每行所包含的自定义的链接按钮数量
	///////依赖于addRowOperBtn(gridId,linkName,url,idName,outType)函数
	function executeAddBtn(gridId,count){
			setCell(gridId);
			//setThisCell(gridId);
			var menuTblRow = document.getElementById(gridId).rows;
	 		var len = menuTblRow.length;
	 		var nc=count;
	 		var rowlinkHtml=[];
	 		var x;
	 		for(x=0;x < nc ; x++){
			 	var temp =[];
			 		 temp= menuOpers[x];
			 	 	
					for(var j=0;j<len;j++){
						if(rowlinkHtml[j]==""||rowlinkHtml[j]==undefined||rowlinkHtml[j]=='undefined'){
							rowlinkHtml[j]="";
						}
						if(temp[j]==undefined){
							continue;
						}
						rowlinkHtml[j]+="["+temp[j]+"]&nbsp&nbsp&nbsp";
					}				
				}
				for(var j=0;j<len;j++){
					
					jQuery("#"+gridId).setRowData(j,{viewOperation:rowlinkHtml[j]});
		}
		menuOpers=new Array(); 
	}
		function executeAddBtnWithoutAddCell(gridId,count){
			if($("#"+gridId+" tr.jqgrow[id='1']").text()=="")
			{
				return false;
			}
			//setCell(gridId);
			//setThisCell(gridId);
			var menuTblRow = document.getElementById(gridId).rows;
	 		var len = menuTblRow.length;
	 		var nc=count;
	 		var rowlinkHtml=[];
	 			for(var x=0;x < nc;x++){
			 	var temp =[];
			 		 temp= menuOpers[x];
			 	 	
					for(var j=0;j<len;j++){
						if(rowlinkHtml[j]==""||rowlinkHtml[j]==undefined||rowlinkHtml[j]=='undefined'){
							rowlinkHtml[j]="";
						}
						if(temp[j]==undefined){
							continue;
						}
						rowlinkHtml[j]+=temp[j]+"&nbsp&nbsp&nbsp";
					}
				
				}
				for(var j=0;j<len;j++){
					
					jQuery("#"+gridId).setRowData(j,{viewOperation:rowlinkHtml[j]});
					
				}
			 menuOpers=new Array(); 
	}
	/**********************************************************
				function name:   clearText(formId,type)
				function:		 清空指定表单
				parameters:      formId :表单id
								 type ：不填或则 1 :清空表单  2:重置表单								 
				return:			 
				description:     清空表单时：对可见的非button的input元素都清空
								 重置表单时：对有value默认值的重置为默认值
				Date:			 2011-1-7 
	********************************************************/
	function clearText(formId,type){
		if(type==2){
			document.getElementById(formId).reset();
		}else if(type==1 || type==undefined){
			$("#"+formId+" :input:visible").not(":button,:radio,:checkbox").val("");
		}
	}
	
			////////////////////////////
			//适应容器大小
			//idname 当前div id
			//reduceWidth 需要减去的宽度
			///////////////////
			function setAutoWidth(idname,reduceWidth){
			var w=document.documentElement.clientWidth-reduceWidth-5;
				$("#"+idname).width(w);
			}
			////////////////////////////
			//
			//idname 当前div id
			//reduceHeight 需要减去的高度
			///////////////////
			function setAutoHeight(idname,reduceHeight){
			var h=document.documentElement.clientHeight-reduceHeight-3;
			$("#"+idname).height(h);						///$('#'+idname).css("height",(document.documentElement.clientHeight-155));
						//$('#'+idname).css("width",(document.body.clientWidth-176));
			}
			////////////////////////////
			//适应容器大小
			//idname 当前div id
			//reduceWidth 需要减去的宽度
			///////////////////
			function setAutoGridWidth(idname,reduceWidth){
				var w=document.documentElement.clientWidth-reduceWidth-4;;
				$("#"+idname).setGridWidth(w);
			//	$("#"+idname).width($("body").width());
				//$("body").width($("#"+idname).width());
			//	$(document.body.scrollWidth).resize(function(){alert("resize");setAutoGridWidth(idname,reduceWidth)});
			}
			////////////////////////////
			//
			//idname 当前div id
			//reduceHeight 需要减去的高度
			///////////////////
			function setAutoGridHeight(idname,reduceHeight){
		//	alert(document.documentElement.clientHeight);
				var h=document.documentElement.clientHeight-reduceHeight-68;
				$('#'+idname).setGridHeight(h);						///$('#'+idname).css("height",(document.documentElement.clientHeight-155));
						//$('#'+idname).css("width",(document.body.clientWidth-176));
			}
			
	var tsd={
		buildParams:function(tsdParams){
		requestStr='';
		if(this.vaildate(tsdParams.packgname)){requestStr+='&packgname='+tsdParams.packgname;}
		if(this.vaildate(tsdParams.clsname)){	requestStr+='&clsname='+tsdParams.clsname;}
		if(this.vaildate(tsdParams.method)){	requestStr+='&method='+tsdParams.method;}
		if(this.vaildate(tsdParams.ds)){requestStr+='&ds='+tsdParams.ds;	}
		if(this.vaildate(tsdParams.datatype)){	requestStr+='&datatype='+tsdParams.datatype;	}
		if(this.vaildate(tsdParams.page)){	requestStr+='&page='+tsdParams.page;	}
		if(this.vaildate(tsdParams.rows)){	requestStr+='&rows='+tsdParams.rows;}
		if(this.vaildate(tsdParams.tsdExeType)){requestStr+='&tsdExeType='+tsdParams.tsdExeType;	}
		if(this.vaildate(tsdParams.tsdpname)){	requestStr+='&tsdpname='+tsdParams.tsdpname;}
		if(this.vaildate(tsdParams.tsdoper)){	requestStr+='&tsdoper='+tsdParams.tsdoper;}
		if(this.vaildate(tsdParams.tsdcf)){requestStr+='&tsdcf='+tsdParams.tsdcf;}
		if(this.vaildate(tsdParams.tsdpk)){requestStr+='&tsdpk='+tsdParams.tsdpk;}
		if(this.vaildate(tsdParams.tsdpkpagesql)){	requestStr+='&tsdpkpagesql='+tsdParams.tsdpkpagesql;	}
		if(this.vaildate(tsdParams.Sidx)){	requestStr+='&Sidx='+tsdParams.Sidx;	}
		if(this.vaildate(tsdParams.sord)){	requestStr+='&sord='+tsdParams.sord;	}
		if(this.vaildate(tsdParams.tsdfilename)){	requestStr+='&tsdfilename='+tsdParams.tsdfilename;	}
		if(this.vaildate(tsdParams.tsdUserId)){	requestStr+='&tsdUserId='+tsdParams.tsdUserId;	}
		if(this.vaildate(tsdParams.dataName)){	requestStr+='&dataName='+tsdParams.dataName;	}
		if(this.vaildate(tsdParams.idColumnName)){	requestStr+='&idColumnName='+tsdParams.idColumnName;	}
		
				//常量表配置关键字
		if(this.vaildate(tsdParams.identity)){	requestStr+='&identity='+tsdParams.identity;	}
		if(this.vaildate(tsdParams.pattern)){	requestStr+='&pattern='+tsdParams.pattern;	}
		if(this.vaildate(tsdParams.argument)){	requestStr+='&argument='+tsdParams.argument;	}
		//lvkui 解决因参数格式不对导致tomcat日志出现'Parameters: Invalid chunk ignored;'
		requestStr = requestStr.substring(1);
		
		return requestStr;
		},vaildate:function (str){
			if(str==undefined){return false;}
			if(str==null){return false;}
			if(str==""){return false;}
			return true;
			},
			encodeURIComponent:function(val){
			//	val=val.replace("<","&lt;").replace(">","&gt;").replace("&","&amp;").replace("\"\"","&quot;");
				//if((val.indexOf("<")!=-1)||(val.indexOf(">")!=-1)||(val.indexOf("&")!=-1)||(val.indexOf("'")!=-1)||(val.indexOf("=")!=-1)){this.QualifiedVal=false;}
				//youhongyu 修改正则表达式，不过滤 &符号  原来语句  var  vkeyWords=/^[^\|"'<>|&|=]*$/;
				var  vkeyWords=/^[^\|"'<>||=]*$/; 
				if(!vkeyWords.test(val)){
					
					var reg = /^\s*(\S+)\s*$/;					
					if(reg.test(val)){
						this.QualifiedVal=false;}					
					
					//this.QualifiedVal=false;
				}
				return encodeURIComponent(val);
			},Qualified:function(){if(this.QualifiedVal==false){alert("请勿输入非法字符");return false};return true;}
			,QualifiedVal:true
			,setTitle:function(idStr,title){
				$(idStr).html(title);
				
			},noCache:function(url){
				location.href=url+"&tsdcache="+Math.random();
			}
			
		}
		
		tsd.tsdtip=function(){this.xOffset=2;this.yOffset=10;$(".tsdtip").unbind().hover(function(a){this.t=this.title;this.title="";this.top=(a.pageY+10);this.left=(a.pageX-14);$("body").append('<p id="tsdtip"><img id="tsdtipArrow" />'+this.t+"</p>");$("p#tsdtip #tsdtipArrow").attr("src","style/images/public/tsdtip_arrow.png");$("p#tsdtip").css("top",this.top+"px").css("left",this.left+"px").css("cursor","pointer").fadeIn("slow")},function(){this.title=this.t;$("p#tsdtip").fadeOut("slow").remove()}).mousemove(function(a){this.top=(a.pageY+10);this.left=(a.pageX-14);$("p#tsdtip").css("top",this.top+"px").css("left",this.left+"px")})}
		
		
		function exptable(tableid, expfile) {	
	var oXL = new ActiveXObject("Excel.Application"); //创建AX对象excel	
	var oWB = oXL.Workbooks.Add(); //获取workbook对象	
	var oSheet = oWB.ActiveSheet; //激活当前sheet
	
	var curTbl = document.getElementById(tableid);
	var Lenr = curTbl.rows.length;//取得表格行数	
	
    if (tableid=='list10'){
		var arr_name=new Array('会议号','实例号', '会议主题', '会议发起人', '预定参会方数', '预定会议时间', '话始时间', '状态', '时长', '话终时间', '录音文件');
		oSheet.Columns(3).ColumnWidth=20;
		oSheet.Columns(4).ColumnWidth=20;
		oSheet.Columns(7).ColumnWidth=22;
		oSheet.Columns(10).ColumnWidth=22;
		oSheet.Columns(11).ColumnWidth=60;
		oSheet.Columns(1).HorizontalAlignment=2;
		oSheet.Columns(2).HorizontalAlignment=2;
		oSheet.Columns(4).HorizontalAlignment=2;//设置会议发起人为左对齐，避免在excel中对齐方式不同而显示混乱
		oSheet.Columns(7).NumberFormatLocal="@";//设置话始时间为文本格式，避免在excel中科学计数显示
		oSheet.Columns(10).NumberFormatLocal="@";//设置话终时间为文本格式，避免在excel中科学计数显示
	}
	else{
		var arr_name=new Array('会议发起人','会议号','会议主题', '主叫+IP', '本地号码', '话始时间', '话终时间','时长','状态','原因','会议类型','会议实例号','预定参会方数','预定会议时间','录音文件');	
		oSheet.Columns(4).ColumnWidth=20;
		oSheet.Columns(5).ColumnWidth=15;
		oSheet.Columns(6).ColumnWidth=22;
		oSheet.Columns(7).ColumnWidth=22;	
		oSheet.Columns(15).ColumnWidth=60;	
		oSheet.Columns(2).HorizontalAlignment=2;//设置会议号为左对齐，避免在excel中对齐方式不同而显示混乱	
		oSheet.Columns(5).NumberFormatLocal="@";//设置本地号码为文本格式，避免在excel中科学计数显示
		oSheet.Columns(6).NumberFormatLocal="@";//设置话始时间为文本格式，避免在excel中科学计数显示
		oSheet.Columns(7).NumberFormatLocal="@";//设置话终时间为文本格式，避免在excel中科学计数显示
	};
	
	//导出表格数据
	for (i = 0; i < Lenr; i++)
	{
		var Lenc = curTbl.rows(i).cells.length;
		var jj=0;//临时变量，用来处理表格中有隐藏列的情况。
		//取得每行的列数
		for (j = 0; j < Lenc; j++)
		{
			//除隐藏列外，其余进行赋值
		   if (curTbl.rows[i].cells[j].style.display != "none")
		   {		     			 
			 oSheet.Cells(i + 1, jj+1).value = curTbl.rows(i).cells(j).innerText;		
			 jj++;
		   };	 
		}
	}
	
	//导出表格标题。保存标题必须放在保存数据之后，要不然会错位
	for (k = 0; k < arr_name.length; k++)
	{
         oSheet.Cells(1, k+1).value = arr_name[k];
	}		
	oSheet.Rows(1).Font.Bold = true;  //设置标题行为粗体
	oSheet.Rows("2:"+Lenr).Font.Size=9;
	oXL.Visible = true;
	//设置excel可见属性   
}
