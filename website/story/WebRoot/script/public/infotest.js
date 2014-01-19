
/***********************************************************
		        file name:       transfer.js
				author:          youhongyu 
				create date:     2009-12-11         
				description:
				modify:			 2010-03-30  修改页面验证方式
********************************************************/

/**********************************************************
				function name:   isRequired(str)
				function:		 判断该字符串是否为空
				parameters:       str：要判断的字符串
				return:			 不为空ture  空false 
				description:     拼接中使用
********************************************************/
function isRequired(str){
	if(str==null||str=="")
	{
		return false;
	}
	else{
		return true;
	}	
} 

/**********************************************************
				function name:  testLen(str,max)
				function:		判断该字符串长度是否超过最大长度
				parameters:     str：要判断的字符串
								max：允许最大长度
				return:			长度在范围之内ture  超过范围false 
				description:    拼接中使用
********************************************************/
function testLen(str,max){
	var len =str.length;
	var strlen=0;
 	for(var j=0;j<len;j++){
  	 	var leg=str.charCodeAt(j);     //获取字符的ASCII码值				  	 	
			if(leg>255){ //判断如果长度大于255					                 
			 	strlen=strlen+2;   //则表示是汉字为两个字节								 							 	
			}else {
				strlen+=1;       //否则表示是英文字符，为一个字节							
			}							
	}	
	if(strlen>max){
		return false;
	}
	else{
		return true;
	}	
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

/**********************************************************
				function name:    delTrim(str)
				function:		  去掉字符的前后空格	
				parameters:       str：要解析的字符串       
				return:			  返回去掉字符的前后空格的字符
				description:      
********************************************************/
			      	    
function delTrim(str) 
{
        return  str.replace(/(^\s*)|(\s*$)/g,"");        
}


/**********************************************************
				function name:   isDecimal(val)
				function:		 判断输入的字符是否为数字或三位小数以内小数 
				parameters:       val：要解析的字符串
								  
				return:			  true 符合要求 false 不符合要求
				description:      在获取参数处验证
********************************************************/
function isDecimal(val) {    
     var str = val;   
     if(str.length!=0){   
         reg=/^\d+(\.?\d{0,3})$/;   
		 if(!reg.test(str)){
		    return false;
		 }   
      }  
      return true; 
} 

/**********************************************************
				function name:   isNumTwoY(val)
				function:		 判断输入的字符是否为数字或两位小数以内小数 
				parameters:       val：要解析的字符串
								  
				return:			  true 符合要求 false 不符合要求
				description:      在获取参数处验证
				
				
	例子：
		if(isNumTwoY(fee)){
 			params+="&fee="+fee;
 		}
 		else{
 			alert($("#feeg").html()+"请输入数字，且小数位不要大于两位！");
 			$("#fee").focus();
 			return false;
 		}	
********************************************************/
function isNumTwoY(val) {    
     var str = val;   
     if(str.length!=0){   
         reg=/^\d+(\.?\d{0,2})$/;   
		 if(!reg.test(str)){
		    return false;
		 }   
      }  
      return true; 
} 

/**********************************************************
				function name:   isMoney(val)
				function:		 判断输入的字符是否为数字或4位小数以内小数 
				parameters:       val：要解析的字符串
								  
				return:			  true 符合要求 false 不符合要求
				description:      在获取参数处验证
				//验证输入信息是否为money型
				if(isMoney(Price)){
		 			paramsStr+="and Price ="+Price+" " ;
		 		}
		 		else{
		 			alert($("#Priceg").html()+"请输入数字，且小数位不要大于四位！");
		 			$("#Price").focus();
		 			return false;
		 		}
********************************************************/
function isMoney(val) {    
     var str = val;   
     if(str.length!=0){   
         reg=/^\d+(\.?\d{0,4})$/;
		 if(!reg.test(str)){
		    return false;
		 }   
      }  
      return true; 
}

/**********************************************************
				function name:   isNumericY(val)
				function:		 判断输入的字符是否为数字或4位小数以内小数 
				parameters:       val：要解析的字符串
								  
				return:			  true 符合要求 false 不符合要求
				description:      在获取参数处验证
********************************************************/
function isNumericY(val) {    
     var str = val;
     var len = str.indexOf('.'); 
     if(len==-1&&str.length>3||len>3){
     		return false;     	
     }
     if(str.length!=0){
         reg=/^\d+(\.?\d{0,2})$/;
		 if(!reg.test(str)){
		    return false;
		 }
      }
      return true;
}

/**********************************************************
				function name:   isTelY(val)
				function:		 判断输入字符串是否符合电话号码格式
				parameters:       val：要解析的字符串
								  
				return:			  true 符合要求 false 不符合要求
				description:      在获取参数处验证
				
				例子：
		if(dh!=null&&dh!=""){
	 		if(isTelY(dh)){
	 			params+="&dh="+tsd.encodeURIComponent(dh);
	 		}
	 		else{
	 			//电话号码请输入整数！
	 			alert("<fmt:message key='Revenue.bTelephone'/><fmt:message key='global.invalid'/>");
	 			$("#dh").focus();
	 			return false;
	 		}
	 	}	
		else{	
				//请输入电话号码!
				alert("<fmt:message key='phonepay.phone'/>");
				$("#dh").focus();
				return false;
		} 
********************************************************/
function isTelY(val) {
		var str = val; 
 		var reb =/^\ {0,}[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+\ {0,}$/;
		if(!reb.test(str)){		     
			    return false;
		} 
      return true; 
}
/**********************************************************
				function name:   replaceChinese(str,max)
				function:		 控制只允许输入 数字 和 字母
				parameters:       str：要解析的字符串
								  max:最长的长度       
				return:			  返回正确的字符，替换原来的字符串
				description:      onkeyup事件中使用 
********************************************************/
function replaceChinese(str,max){
    str= str.replace(/[^\a-zA-Z0-9]/g,''); 
	var l=str.length;
	if(l>max) str=str.substr(0,max);
	return str;
}  




/**********************************************************
				function name:   replacenumeric(str)
				function:		  sqlserver numeric类型 
				parameters:       str：要解析的字符串  
				return:			  返回正确的字符
				description:      onkeyup事件中使用 范围在(-00000.00,00000.00)之间，小数保留四位
********************************************************/
		        function replacenumeric(str){
					 str= str.replace(/[^\d\.-]/g,''); 
					 var jian=str.indexOf('-');
					 if(jian!=0){			
						 if(isNaN(str)){
						 str=str.substr(0,str.length-1);
						 }
					}else{
						if(str.length!=1&&jian==0){
						 if(isNaN(str)){
							 str=str.substr(0,str.length-1);
							 }
						}
					}
					var dian=str.indexOf('.');
					if(dian!=-1){
						var f=str.length-dian-1;
						if(f>2){
							str=str.substr(0,dian+3);
						}
					}
					if(str>+99999.99){
						str=str.substr(0,8);
					}
					if(str<-99999.99){
						str=str.substr(0,8);
					}
		        	return str;
				}

/**********************************************************
				function name:   replaceMoneyS(str)
				function:		  sqlserver numeric类型 
				parameters:       str：要解析的字符串  
				return:			  返回正确的字符
				description:      onkeyup事件中使用 范围在(-0000000000.00,00000.00)之间，小数保留四位 18
********************************************************/
		        function replaceMoneys(str){
					 str= str.replace(/[^\d\.-]/g,''); 
					 var jian=str.indexOf('-');
					 if(jian!=0){			
						 if(isNaN(str)){
						 str=str.substr(0,str.length-1);
						 }
					}else{
						if(str.length!=1&&jian==0){
						 if(isNaN(str)){
							 str=str.substr(0,str.length-1);
							 }
						}
					}
					var dian=str.indexOf('.');
					if(dian!=-1){
						var f=str.length-dian-1;
						if(f>2){
							str=str.substr(0,dian+3);
						}
					}
		        	return str;
				}
 /**********************************************************
				function name:    isNum(str)
				function:		  验证输入的是否为数字
				parameters:       str：要解析的字符串
				return:			  true:str 格式正确
								  false:str 格式不正确
				description:      提交验证 
********************************************************/
		 		function isNum(str)
				{
				 var reg=/^\d*$/;			
				 if(!reg.test(str))
				  {		  
				   return false;
				  }
				  return true;
				}
/**********************************************************
				function name:   isNoChinese(str)
				function:		 验证输入字符是否为 数字 和 字母，不允许为汉字
				parameters:       str：要解析的字符串
								  max:最长的长度       
				return:			  返回正确的字符，替换原来的字符串
				description:      onkeyup事件中使用 
********************************************************/
function isNoChinese(str){
    var reg= /^[a-zA-Z0-9]*$/; 
    //var reg= /^[a-zA-Z0-9]{0,}$/; 
	if(!reg.test(str)) {
		return false;
	}
	else{
		return true;
	}
}  
/**********************************************************
				function name:   subInt(str)
				function:		 验证int类型
				parameters:       str：要解析的字符串
				return:			  0:是非法字符
								  1:长度超过范围
								  2:合法
				description:      提交验证 
********************************************************/
function subInt(str){
	if(str!=''){
		 if(!isInt(str))
		 		return 0;
		 if(str<-2147483648||str>2147483647)
				 return 1;
	}
	 return 2;
}
 /**********************************************************
				function name:   isInt(str)
				function:		 验证是否是整数,如果是整数，返回true;
				parameters:       str：要解析的字符串
				return:			  true:str 格式正确
								  false:str 格式不正确
				description:      提交验证 
********************************************************/
	  function isInt(str){
	  var flag=false;
	 if(!isNaN(str)) flag=true;
	  return flag;
	  }