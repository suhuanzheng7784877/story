/*****************************************************************
 * name: search.js
 * author: 尤红玉
 * version: 1.0, 2010-9-26
 * description: 通用查询页面对应js文件
 * modify:
 *		2010-11-05 yhy 添加注释功能	
 *      2010-12-28 chenze    添加确定时向调用页面返回中文描述信息
 *		2012-8-9 yhy 获取查询值提示不准确，更新提示；设置类型为数字的查询默认值为0；
 *****************************************************************/

 /**********************************************************
function name:    getI18n()
function:		  获取多语言字段并解析
parameters:       
return:			  
description:    
********************************************************/
function getI18n()
{
	$.each($("p[id^='Field_Alias']"),function(i,n){					
		$(n).text((getCaption($(n).text(),$("#lanType").val(),$(n).text())));					
	});
}	
			


/**
 * 更新存放树节点新的数组
 * @param nodestr ：节点显示信息
 * @param parentid ：父节点id
 * @param sqlstr ：节点的sql子句
 * @param relation :节点与上一个节点之间的关系
 * @return 
 */
function updateTreeA(nodestr,parentid,sqlstr,relation){
			nodestrA.push(nodestr);
			nodeparentA.push(parentid);	
			var childid = getChildId();		//计算当前子节点的id			
			nodechildA.push(childid+1);
			//nodechildA.push(nodechildA.length+1);
			sqlA.push(sqlstr);
			relationA.push(relation);
			
			var nodepic ;
			if(relation=="and"){
				nodepic="style/images/public/andpic.jpg";
				nodepicA.push(nodepic);
			}
			else {
				nodepic="style/images/public/orpic.jpg";
				nodepicA.push(nodepic);
			}						
}
			

/**
 * 根据操作符号、数据类型对页面填写的查询条件进行格式化 	
 	格式化message
 * @param oper ：操作符
 * @param message ：查询条件
 * @param DataType ：字段类型
 * @return 返回格式化后的查询条件
 */
function formatMessage(oper,message,DataType){
			var messagestr ='';
			//如果选择的是：类似,不类似,包含,不包含这四种运算符的话则需要给字符串加上%	
			var similar = $("#opersimilar").val();	
			var nsimilarr = $("#opernsimilar").val();
			var contain = $("#opercontain").val();
			var ncontain = $("#operncontain").val();
			if(oper==similar || oper==nsimilarr)
			{
				messagestr="'"+message+"%'";
			}
			else if(oper==contain || oper==ncontain)
			{
				messagestr="'%"+message+"%'";
			}					
			//通过判断字段的类型是数字还是其他，来确定是否要在输入查询值两边加上单引号。
			else if(DataType=="dtInteger"||DataType=="dtDouble"){
				messagestr=message;
			}	
			else if(DataType=="dtdatetime"){
				//messagestr=message;
				messagestr = " to_date('"+message+"'&#44;'yyyy-mm-dd hh24:mi:ss') ";
			}				
			else{
				messagestr="'"+message+"'";
			}
			return messagestr;
}


/**
 * 获取查询值，message值
 * @param
 * @return 返回message值;如果未选择值，或是没有输入查询值，则返回false
 */
function getMessage(){
			//判断查询值是输入还是选择获取的	
			var markMes = $("#markMes").val();
			var message='';	
			var flag = true;			
			if(markMes=="2"){//选择查询值
				message = $("input[name='message']:checked").val();//字段的值
				if(typeof(message)=='undefined')
				{
					$("#message").focus();
					//请选择查询项！	
					alert($("#operSelVal").val());					
					flag = false;
				}
			}
			else{
				//判断是否选中查询字段
				message = $("input[name='message']").val();
				if(typeof(message)=='undefined')
				{							
					$("#message").focus();
					//请选择需要查询字段！
					alert($("#operSelField").val());					
					flag = false;
				}
				else
				{							
					//去掉查询值的左右空格
					message = message.replace(/^\s*/,"").replace(/\s*$/,""); 					
				}
			}
			//判断是否有查询值，有返回查询值，没有返回false;
			if(flag==false){
				return false;
			}
			else{
				return message;
			}
}
			

/**
 * 生成树，刷新树是调用方法
 * @param
 * @return 
 */
function generateTree()
{
		dmtree = new dTree('dmtree');
		for(i=0;i<nodestrA.length;i++)
		{	if(typeof nodechildA[i] != 'undefined')			 	
			dmtree.add(nodechildA[i],nodeparentA[i],nodestrA[i],"#","","",nodepicA[i],nodepicA[i],open);
		}	
		$("#111").html(dmtree.toString());
				
}

/**
 * 获取子节点的最大id 
 	用户删除子节点时，重新计算子节点的id
 * @param
 * @return 
 */	
function getChildId(){
		var childlen= nodechildA.length;
		var childinend = 0;
		for(i=0;i<childlen;i++){
			var childid = parseInt(nodechildA[childlen-1-i],10);
			if(isNaN(childid)){				
			}
			else{				
				childinend = childid;
				break;
			}					
		}
		return childinend;
}
			
			/**
			 * 判断是否输入自定义运算符 
			 	如果自定义运算符输入框为可见，操作符取自此自定义运算符，否则取自单选运算符
			 * @param oper：当前选中操作符
			 * @return 本次操作用户所用操作符
			 */	
			function getOperA(oper)
			{
				var operr = oper;
				var obj = document.getElementById("operA");
				var operA= $("input[name='operA']").val();
				if(obj.style.display == "block")
				{
					if( typeof(operA)=='undefined')
					{
						alert($("#operwornoper").val());
						return false;
					}
					else{
						return operA;
					}					
				}
				else{
					return oper;
				}
			}
			
			
			/**
			 * 切换自定义操作符输入框显示情况
			 * @param 
			 * @return 
			 */
			function definedOper()
			{	
				var obj = document.getElementById("operA");
				if(obj.style.display == "none")
				{
					obj.style.display = "block";
				}
				else
				{
					document.getElementById("operA").value ="";
					obj.style.display = "none";
				}
			}			
			
			
			/**
			 * 隐藏查询值面板
			 * @param 
			 * @return 
			 */
			function hideArea(){
				$("#valarea").hide();
				
				//查询树区域宽度设置
				$("#111").css("width","322px");
				$("#treeTab").css("width","340px");
			}
			
			
			/**
			 * 显示查询值面板
			 * @param 
			 * @return 
			 */
			function showArea(){			
				$("#valarea").show();
				
				//查询树区域宽度设置			
				$("#111").css("width","170px");
				$("#treeTab").css("width","180px");
			}			
			
			
			/**
			 * 根据字段表配置 数据字典，显示可查询列表 （以具体信息配置）
			 	<DICT=1:a:a1;2;3:c:c2;4:d:d4;5:e:d5;6/>
				格式要求 开头：<DICT=
						结尾：/>
						一个条件和下一个条件区分： ;
						查询值和value值分隔符： :
						条件的尾部不要加‘；’
						
			 * @param 
			 * @return 
			 */
			function getZDval(str) {
					if(''==str||null==str||undefined==str||'undefined'==str){
						return false;
					}else{
						var arr = str.split("<DICT=");
						//var arr1 = arr[1].split("/>");
						if(arr!=str){
							var arr1 = arr[1].split("/>");
							if(arr1!==arr){
								var valueinfo = arr1[0].replace(/(^\s*)|(\s*$)/g,"");//去掉生成的空格
								var arr2 =valueinfo.split(";");
								for(var i =0;i<arr2.length;i++){
									var area='';				
									var arr3=arr2[i].split(":");
									if(''==arr3[1]||null==arr3[1]||undefined==arr3[1]||'undefined'==arr3[1]){										
										//<DICT=1;2;3/> 查询值和value值一样
										area="<p style='height:20px;white-space:nowrap;'><input type='radio' id='message' name='message' value='"+arr3[0]+"'/>"+arr3[0]+"</p>";
									}
									else{
										//查询值和value值不一样
										area="<p style='height:20px;white-space:nowrap;'><input type='radio' id='message' name='message' value='"+arr3[0]+"'/>"+arr3[1]+"</p>";
									}
									$("#valfield2").append(area);	
								}
							}
						}							
					}
					return;
			}
			
			
			
			/**
			 * 根据字段表配置 数据字典，显示可查询列表 （以sql语句配置）
			 	sql;数据源;指向配置文件名称
				select 模块局=MokuaiJu,a=MokuaiJu,b=MokuaiJu from MokuaiJu;tsdBilling;mssql
				格式要求 开头：select
				如果没有配置 数据源 和 指向配置文件名称则默认
				数据源为：tsdBilling
				指向配置文件名称：mssql		
			 	
			 * @param 
			 * @return 
			 */
			function getZDsql(str) {
					
					//根据str 解析出sql语句   数据源ds   数据库tsdcf
					var arr = str.split(";");
					var urlstr='';		//ajax提交url设置
					var sqlstr = arr[0]; // 存放解析出来的sql语句
					var dsstr = arr[1];// 存放解析出来的数据源ds
					var tsdcfstr = arr[2];// 存放解析出来的数据库tsdcf
					
					
					//默认 数据源和数据库配置文件名 设置
					if(''==arr[1]||'undefined'==arr[1]||undefined==arr[1]){
						dsstr = 'tsdBilling';
					}
					if(''==arr[2]||'undefined'==arr[2]||undefined==arr[2]){
						tsdcfstr = 'mssql';
					}
					
				
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
						url:'mainServlet.html?'+urlstr+'&searchsql='+encodeURIComponent(sqlstr),
						datatype:'xml',
						cache:false,//如果值变化可能性比较大 一定要将缓存设成false
						timeout: 1000,
						async: false ,//同步方式
						success:function(xml){							
						   
								$(xml).find('row').each(function(){
									var varstr=[];
									var area='';									
									
									$(this).find('cell').each(function()
									{										
										varstr.push($(this).text());										
									});	
									
									if(''==varstr[1]||null==varstr[1]||undefined==varstr[1]||'undefined'==varstr[1]){
										area="<p style='height:20px;white-space:nowrap;'><input type='radio' id='message' name='message' value='"+varstr[0]+"'/>"+varstr[0]+"</p>";	
									}									
									else{
										area="<p style='height:20px;white-space:nowrap;'><input type='radio' id='message' name='message' value='"+varstr[0]+"'/>"+varstr[1]+"</p>";	
									}																			
									$("#valfield2").html($("#valfield2").html()+area);									
							 	});
						}
					});	
			}		
				
				
			/**
			 * 点击表字段时，弹出输入框			 	
			 * @param i:字段标识
			 * @return 
			 */
	        function openziduan(i){ 
	        
	        	$("#valfield1").empty();//查询条件输入框
	        	$("#valfield2").empty();//查询条件选择面板
	        	var num=i;				//被选中字段index
	        	
	        	//更新被选中字段颜色
				document.all("Field_Alias"+num).style.backgroundColor="#C0D2EC" ;
				if(lnum!=0&&lnum!=num)
				{				
					document.all("Field_Alias"+lnum).style.backgroundColor="#ffffff" ;
				}
				lnum=num;
	        	
	        	//将被选择字段信息存入隐藏域
	        	var DD= $("#DataDict"+num).val();//获取字段 数据字典信息	        	
	        	var Table_Name = $("#Table_Name"+num).text();
	        	var Field_Name = $("#Field_Name"+num).text();
	        	var Field_Alias = $("#Field_Alias"+num).text();
	        	var DataType = $("#DataType"+num).text();
	        	$("#Table_Name").val(Table_Name);
	        	$("#Field_Name").val(Field_Name);
	        	$("#Field_Alias").val(Field_Alias);
	        	$("#DataType").val(DataType);
	        	
				//因为在rb_field中的数据字典字段，不能确定select的大小写了，为了进行比较，将其转化成大写字符。
				var DDUP = DD.toUpperCase();		     	
	        	if(DD.split("/>").length>1){
	        		//根据字段表配置 数据字典，显示可查询列表 
	        		getZDval(DD); 
	        		$("#markMes").val(2);
	        		showArea();//显示字段可选择查询条件
	        	}
	        	else if(DDUP.indexOf("SELECT")!=-1){
	        		DD = transferOper(DD);//替换字符串中的大于号和小于号
	        				 
	        		getZDsql(DD);//根据字段表配置 数据字典，显示可查询列表	        		
	        		$("#markMes").val(2);
	        		showArea();//显示字段可选择查询条件
	        	}	        	
	        	else{        	
	        		$("#markMes").val(1);
	        		hideArea();//隐藏字段可选择查询条件
					if(DataType=='dtdatetime')
					{
						document.getElementById("valfield1").innerHTML="<input  type=\"text\" name=\"message\" id=\"message\" onfocus=\"WdatePicker({startDate:'%y-%M-01 00:00:00',dateFmt:'yyyy-MM-dd HH:mm:ss',alwaysUseStartDate:true})\"/>";
						document.getElementById("message").value = getDate();
					}
					else if(DataType=='dtBoolean')
					{
						document.getElementById("valfield1").innerHTML="<input  type=\"radio\" name=\"message\" id=\"message\" value=\"true\" checked=\"checked\"/>是<input  type=\"radio\" name=\"message\" id=\"message\" value=\"false\"/>否" ;
					}
					else 
					{						
						if(DataType=='int'||DataType=='dtInteger' || DataType=='dtDouble'){
							document.getElementById("valfield1").innerHTML="<input type=\"text\" name=\"message\" id=\"message\" value=\"0\" />";
						}else{
							document.getElementById("valfield1").innerHTML="<input type=\"text\" name=\"message\" id=\"message\" />";
						}						
					}
					$("#message").focus();
										 
					$("#message").blur(function(){
							var message=$("#message").val();
							if(message!=null&&message!=""){
								//$("#message").val($("#message").val().replace(/[^\d]/g,''));
								if(DataType=='int'||DataType=='dtInteger')
								{
									isDigit(message);
								}
								else if(DataType=='dtDouble')
								{				
									isDouble(message);
								}					
								else{}
							}
					});				
				}	//end 输入框为普通文本框
			}
			
			
			/**
			 * 替换字符串中的大于号和小于号		 	
			 * @param str:需要进行替换的字符串
			 * @return 替换之后的字符串
			 */
			function transferOper(str){
					var arr = [								
								['&GT;','&LT;'],
								[">","<"]
							];	
					var res = str;
							for(i=0;i<arr[0].length;i++)
							{
									res = res.replace(new RegExp(arr[0][i],"g"),arr[1][i]);				
							}
					return res;
			}
			
			
			 /**
			 * 获取系统时间
			 * @param 
			 * @return  返回本机系统时间
			 */
			function getDate()
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
			
			 

			 /**
			 * 判断输入的字符是否为双精度   
			 * @param  val：要进行判断的字符串
			 * @return  true：符合要求；false：不符合要求
			 */
			 function isDouble(val)    
			 {    
			     var str = val;   
			     if(str.length!=0){   
			         reg=/^[-\+]?\d+(\.?\d{0,2})$/;   
					 if(!reg.test(str)){   
					     alert($("#operworndouble").val());//对不起，您输入的双精度类型格式不正确!					     
					     $("#message").focus();
					     $("#message").select();
					     return false;
					 }   
			      }   
			 }  
			
			
			 /**
			 * 判断是否为整数   
			 * @param  val：要进行判断的字符串
			 * @return  true：符合要求；false：不符合要求
			 */
			function isDigit(value){				
				var patrn=/^[0-9]\d*$/; 
				if (patrn.exec(value)==null) {
					alert($("#operworninteger").val());//请输入整数！
					$("#message").focus();
					return false;
				}	
			}
			
								
			/**
			 * 清空整棵查询树   
			 * @param  
			 * @return  
			 */
			function clearTree(){
				nodestrA.length = 1;
        		nodeparentA.length = 1;
        		nodechildA.length = 1;
        		nodepicA.length = 1;
        		sqlA.length = 1;
        		relationA.length = 1;	
        		generateTree();
			}
			
			
			
			/**
			 * 辅助数组操作，判断val值是否在数组arr中   
			 * @param  val:要验证的值
			 * @param  arr:要验证的数组
			 * @return  ress:-1:val值在arr中不存，否为存在
			 */
			function inArray(val,arr)
			{
				var ress = -1;
				for(i=0;i<arr.length;i++)
				{
					if(val==arr[i])
					{
						ress = i;
						break;
					}
				}
				return ress;
			}
			
			
			/**
			 * 检测是否为叶子节点	 
			 * @param  selfid:要进行检测的节点id
			 * @return  ress:-1:val值在arr中不存，否为存在
			 */			
			function checkLeave(selfid)
			{
				return inArray(selfid,nodeparentA)==-1;
			}
			
			
			
			/**
			 * 删除叶子节点 
			 * @param  leaveValue:要进行删除的节点id
			 * @return  
			 */	
			function removeLeaveNode(leaveValue)
			{
				var idx=inArray(leaveValue,nodechildA);
				
        		delete nodechildA[idx];
				delete nodeparentA[idx];
				delete nodestrA[idx];				
        		delete nodepicA[idx];
        		delete sqlA[idx];
        		delete relationA[idx];        		
			}
			
			
			/**
			 * 删除树特定节点
			 * @param  leaveValue:要进行删除的节点id
			 * @return  
			 */
			function removeNode(id)
			{
				if(checkLeave(id))//如果是叶子节点直接删除
				{
					removeLeaveNode(id);
				}
				else//不是叶子节点，先删除其子节点
				{
						var p_id=inArray(id,nodeparentA);
						while(p_id>-1)
						{							
							//判断该节点 是否已被删除
							if(nodechildA[p_id]==''||nodechildA[p_id]==undefined){
							
							}
							else{
								removeNode(nodechildA[p_id]);//递归删除本次子节点
								p_id=inArray(id,nodeparentA);//获取下一个子节点							
							}
						}
						removeLeaveNode(id);//删除本节点
				}
			}
			
			
			
			/**
			 * 页面删除本条按钮事件
			 * @param 
			 * @return  
			 */					
			function Del()
			{		
				if(typeof(dmtree.aNodes[dmtree.selectedNode])=='undefined'||inArray(parseInt(dmtree.aNodes[dmtree.selectedNode].id),nodechildA)==-1){
					
					alert($("#operwornnsel").val());//请选择一个节点！
					return false;
				}
				if(dmtree.aNodes[dmtree.selectedNode].id==0){
						alert($("#operwornnotdel").val());//此节点不能删除！
						return false;	
				}
				
				//删除特定子节点
				removeNode(parseInt(dmtree.aNodes[dmtree.selectedNode].id));
				generateTree();//生成查询树
			}
			
			
			
			/**
			 * 树生成sql语句
			 * @param id:节点id，在此页面中id=0   typ：1 取描述
			 * @return  
			 */	
			function generateSql(id,typ)
			{
				if(checkLeave(id)) //判断该节点是不是叶子节点
				{
					if(typ==undefined)
					{
						return sqlA[inArray(id,nodechildA)];
					}
					else if(typ==1)
					{
						return nodestrA[inArray(id,nodechildA)];
					}
				}
				else //该节点有子节点走这步
				{
					var p_id=inArray(id,nodeparentA);
					var res = "(";
					if(typ==undefined)
					{
						res += sqlA[inArray(id,nodechildA)];
					}
					else if(typ==1)
					{
						res += nodestrA[inArray(id,nodechildA)];
					}				
					$.each(nodeparentA,function(i,n){
						if(n==id)
						{	
							//当删除节点了，会出现节点为'' 的情况，这种情况下，这样的节点不用操作，否则会有死循环
							if(nodechildA[i]==''||nodechildA[i]==undefined){								
							}
							else{
								res += " "+relationA[i] +"  ";			
								res += generateSql(nodechildA[i],typ);
							}
						}
					});					
					res += ")";					
					return res;
				}			
			}	
			
			/**
			 * 将查询树保存到调用该高级查询的页面里，
			 	以用于做保存本次查询为模板，和查询之后第二次打开面板显示上次查询条件
			 * @param 
			 * @return  
			 */	
			function insertParentTree(){
				//将生产查询数和查询语句的数组转化成另一数组
				var treeInfo =[[],[],[],[],[],[]];	
				
				
				var j=0;
				for(var i=0;i<nodechildA.length;i++)
				{	
					if(!isNaN(nodechildA[i])){	
						treeInfo[0][j]=nodechildA[i];
						treeInfo[1][j]=nodeparentA[i];
						treeInfo[2][j]=nodestrA[i];
						treeInfo[3][j]=nodepicA[i];
						treeInfo[4][j]=sqlA[i];
						treeInfo[5][j]=relationA[i];	
						j++;
					}			
				}
				
				//存储查询情况
				var tablename = $("#tablename").val();
				var tableflag = $("#tableflag").val();
				var temp =tablename +tableflag;		
				window.dialogArguments.document.getElementById("treecidQ123"+temp).value=treeInfo[0];
				window.dialogArguments.document.getElementById("treepidQ123"+temp).value=treeInfo[1];
				window.dialogArguments.document.getElementById("treestrQ123"+temp).value=treeInfo[2];
				window.dialogArguments.document.getElementById("treepicQ123"+temp).value=treeInfo[3];
				window.dialogArguments.document.getElementById("treesqlQ123"+temp).value=treeInfo[4];
				window.dialogArguments.document.getElementById("treerelationQ123"+temp).value=treeInfo[5];
				
								
				//用于模板查询
				var treecid =window.dialogArguments.document.getElementById("treecid");
				var treepid =window.dialogArguments.document.getElementById("treepid");
				var treestr =window.dialogArguments.document.getElementById("treestr");
				var treepic =window.dialogArguments.document.getElementById("treepic");
				if(treecid==null==treepid==null||treestr==null||treepic==null){
					return;
				}
					
				window.dialogArguments.document.getElementById("treecid").value=treeInfo[0];
				window.dialogArguments.document.getElementById("treepid").value=treeInfo[1];
				window.dialogArguments.document.getElementById("treestr").value=treeInfo[2];
				window.dialogArguments.document.getElementById("treepic").value=treeInfo[3];
			}
			
			/**
			 * 根据表名 和 标识 自动给主页面生产一串隐藏域
			 	用于保存查询之后第二次打开面板显示上次查询条件
			 * @param 
			 * @return  
			 */	
			function appendHiddenField(){			
				var len1 = window.dialogArguments.document.getElementById("searcholdtabStatus");
				if(len == null){
					window.dialogArguments.appendModSave();
				}
				
				var tablename = $("#tablename").val();
				var tableflag = $("#tableflag").val();
				var len = window.dialogArguments.document.getElementById("treecidQ123"+tablename+tableflag);				
				if(len == null){
					window.dialogArguments.appendHidden(tablename,tableflag);					
					generateTree();//生成查询树
					return false;
				}				
				else{
					getOldTreeinfo(tablename,tableflag);//获取主页面隐藏域的信息，生成查询数
					return true;
				}
			}
			
		
			/**
			 * 获取主页面隐藏域的信息，生成查询树
			 * @param tablename：表名
			 * @param tableflag:标识，区分一个页面中多个分享卡
			 * @return  
			 */	
			function getOldTreeinfo(tablename,tableflag){
					var temp = tablename+tableflag;
					var	nodechildAStr = window.dialogArguments.document.getElementById("treecidQ123"+temp).value;
				
					var	nodeparentAStr = window.dialogArguments.document.getElementById("treepidQ123"+temp).value;
					var	nodestrAStr = window.dialogArguments.document.getElementById("treestrQ123"+temp).value;
					var	nodepicAStr = window.dialogArguments.document.getElementById("treepicQ123"+temp).value;
					var	sqlAStr = window.dialogArguments.document.getElementById("treesqlQ123"+temp).value;
					var	relationAStr = window.dialogArguments.document.getElementById("treerelationQ123"+temp).value;
								
					var nodechildL = nodechildAStr.split(',');
					var nodeparentL = nodeparentAStr.split(',');
					var nodestrL = nodestrAStr.split(',');
					var nodepicAStr = nodepicAStr.split(',');
					var sqlL = sqlAStr.split(',');
					var relationL = relationAStr.split(',');
					
					//判断是否有原始查询数据，如果有的话，进行初始化查询条件生产				
					if(nodechildL.length>1){	
					
						nodechildA = nodechildL;
						nodeparentA = nodeparentL;
						nodestrA = nodestrL;
						nodepicA = nodepicAStr;
						sqlA = sqlL;
						relationA = relationL;	
					}			
					generateTree();//生成查询树
			}			
			
			
			
			/**
			 * 替换sql语句中的中文操作符为sql操作符
			 * @param str：sql语句
			 * @param arr:存放要进行替换的二维数组，arr[0]:被替换的字符,arr[1]：替换后的字符
			 * @return  返回替换后的sql语句
			 */		
			function parseSql(str,arr)
			{
				var res = str;
				for(i=0;i<arr[0].length;i++)
				{
					res = res.replace(new RegExp(arr[0][i],"g"),arr[1][i]);						
				}
				return res;
			}
			
						
				
			/**
			 * 生成sql语句，并向父窗口提交查询
			 * @param 
			 * @return  
			 */		
			function sendQuery()
			{					
				insertParentTree();//往调用页面添加查询树
				//alert(nodestrA);	alert(sqlA); 
				var sql = generateSql(0);
				var sqlstr = generateSql(0,1);
				sqlstr = sqlstr.replace("(查询","(1=1");
				//alert(sql);alert(sqlstr);
				var arr = [
					
					[$("#opergreaterequal").val(),$("#operlessequal").val(),$("#opernsimilar").val(),
					$("#opersimilar").val(),$("#operncontain").val(),$("#opercontain").val(),$("#opersmaller").val(),
					$("#opergreater").val(),$("#operunequal").val(),$("#operequal").val(),'&#44;' ],
					['>=','<=','not like','like','not like','like','<','>','<>','=',',']
				];				
				var sql = parseSql(sql,arr);	//选取条件和实际符号之间转化。			
				if(sql=="1=1"){
					window.close();
				}	
				else
				{
					window.dialogArguments.document.getElementById("fusearchsql").value=sql;
					if(window.dialogArguments.document.getElementById("fusearchdesciption")!=null)
					{
						window.dialogArguments.document.getElementById("fusearchdesciption").value = sqlstr;
					}
					//存储查询分项卡标识
					var tablename = $("#tablename").val();
					var tableflag = $("#tableflag").val();
					var temp =tablename +tableflag;	
					window.dialogArguments.document.getElementById("searcholdtabStatus").value=temp;
									
					//var flag = parseUrl(document.location.search,"flag","");	
					var treecid =window.dialogArguments.document.getElementById("fuheflag");		
					if(tableflag!=""&&treecid!=null)
					{						
						window.dialogArguments.document.getElementById("fuheflag").value = tableflag;
						
					}			
					window.dialogArguments.fuheExe();
        			window.close();  
				}	
			}
