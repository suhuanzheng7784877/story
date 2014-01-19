/*****************************************************************
 * name: order.js
 * author: 尤红玉
 * version: 1.0, 2010-9-26
 * description: 组合排序页面对应js文件
 * modify:
 *		2010-11-05 youhongyu 添加注释功能	
 *****************************************************************/
			
		 /**********************************************************
			function name:    getCaption(str, code, isdefault)
			function:		  解析字符串
			parameters:       str：要解析的字符串 
							  code：解析关键字
							  isdefault：当解析不出来时返回的默认值         
			return:			  返回根据关键字解析好的字符
			description:      要解析的字符串格式必须为以'{'开头,'/}'结束的字符串
			********************************************************/
			function getCaption(str,code,isdefault){
				var arr = str.split("/}");
				for(var i = 0 ; i <arr.length-1;i++){
					var scode = "{"+code+"=";
					var val = arr[i].split(scode);
					var flag = false;
					if(val.length>1){
						return val[1];
						flag = true;
						break;
					}
					if(flag==true){
						break;
					}
				}
			}

            /**********************************************************
				function name:    getI18n()
				function:		  获取多语言字段并解析
				parameters:       
				return:			  
				description:    
				********************************************************/
        	function getI18n()
			{				
				$.each($("label[id^='Field_Alias']"),function(i,n){
				$(n).text(getCaption($(n).text(),$("#lanType").val(),$(n).text()));				
				});
			}
			
        		
       
        	//用于改变选中字段颜色
        	var lnum=0; 
        	
        	/**
			 * 页面全部右移按钮事件 
			 * @param
			 * @return 
			 */
        	function movRightAll(){
        		$("div[id^='Field_Order']").each(function(i,n){
        			//获取升序方式
        			var orderby =$("input[name='orderBy'][checked]").val();
        			//移动div域
        			var jdom = $("#Field_Order"+i).remove();
        			$("#orderfield").append(jdom);
        			//根据选中的升序方式选择显示图片
        			if(orderby=="desc"){
        				$("#Oby"+i).val("desc");
        				$("#Oimage"+i).attr("src","style/images/public/desc.jpg");
        			}
        			else if(orderby=="asc"){
        				$("#Oby"+i).val("asc");
        				$("#Oimage"+i).attr("src","style/images/public/asc.jpg");
        			}
        			//显示图片域
        			$("#Oimage"+i).attr("style","display:block");
        			//$("#Oform"+i).attr("style","display:block");
        		});
        	}
        	
        	
        	/**
			 * 页面全部左移按钮事件 
			 * @param
			 * @return 
			 */
        	function movLeftAll(){
        		$("div[id^='Field_Order']").each(function(i,n){
        			
        			//移动div域
        			var jdom = $("#Field_Order"+i).remove();
        			$("#queryfield").append(jdom);
        			
        			//图片域不可见
        			$("#Oimage"+i).attr("style","display:none");
        			//$("#Oform"+i).attr("style","display:none");
        		});
        	}
        	
        	
        	/**
			 * 页面单条字段右移按钮事件 
			 * @param
			 * @return 
			 */
        	function movRight(){
        		var key = $("#FieldNum").val();
        		var jdom = $("#Field_Order"+key).remove();
        		$("#orderfield").append(jdom);
        		
        		//获取升序方式
        		var orderby =$("input[name='orderBy'][checked]").val();
        			
        		if(orderby=="desc"){
        			$("#Oby"+key).val("desc");
        			$("#Oimage"+key).attr("src","style/images/public/desc.jpg");
        		}
        		else if(orderby=="asc"){
        			$("#Oby"+key).val("asc");
        			$("#Oimage"+key).attr("src","style/images/public/asc.jpg");
        		}
        		else{}
        		//显示图片域
        		$("#Oimage"+key).attr("style","display:block");
        	}
        	
        	
        	/**
			 * 页面单条字段左移按钮事件 
			 * @param
			 * @return 
			 */
        	function movLeft(){
        		var key = $("#FieldNum").val();
        		var jdom = $("#Field_Order"+key).remove();
        		$("#queryfield").append(jdom);
        		//图片域设为不可见
        		$("#Oimage"+key).attr("style","display:none");
        		//$("#Oform"+key).attr("style","display:none");
        	}
        	
        	
        	/**
			 * 页面面板中标签选择事件 
			 * @param key：被选中的标签id
			 * @return 
			 */
        	function selAlias(key){
        		//选中字段加样式
        		document.all("Field_Alias"+lnum).style.backgroundColor="#ffffff" ;
        		document.all("Field_Alias"+key).style.backgroundColor="#C0D2EC" ;
				lnum=key;
				//标识选中字段的id序号
				$("#FieldNum").val(key);
        	}
        	
			
        	/**
			 * 提交排序查询
			 * @param 
			 * @return 
			 */
        	function queryOrder(){
        		var nameA=[];
        		var aliasA=[];
        		var orderByA=[];
	        	$("#orderfield").each(function(i,n){
	        		$(n).find("label[id^='Field_Name']").each(function(){
	        			nameA.push($(this).text());
	        		});
	        		$(n).find("label[id^='Field_Alias']").each(function(){
	        			aliasA.push($(this).text());
	        		});
	        		$(n).find("input[id^='Oby']").each(function(){
	        			orderByA.push($(this).val());
	        		});
	        	});
        		var len = nameA.length;
        		var sqlstr="";
        		for(i=0;i<len;i++){
        			if(typeof(orderByA[i])=="undefined"){
        				alert($("#OrderByInfo").val());
        				return false;
        			}
        		}
        		if(len>0){sqlstr="order by ";}
        		for(i=0;i<len;i++){
        			if(i<len-1){
        			 	sqlstr +=" "+nameA[i]+" "+orderByA[i]+",";
        			}
        			else{
        				sqlstr +=" "+nameA[i]+" "+orderByA[i];
        			}
        		}
        		
        		if(sqlstr==""){
        			window.close();
        		}
        		else{
        			window.dialogArguments.zhOrderExe(sqlstr);
        			var treecid =window.dialogArguments.document.getElementById("GLOBAL_PUBLIC_EXPORT");
					if(sqlstr!="" && treecid!=null)
					{	
        				window.dialogArguments.document.getElementById("GLOBAL_PUBLIC_EXPORT").value=sqlstr ;
        			}
        			window.close(); 
        		}
        	}