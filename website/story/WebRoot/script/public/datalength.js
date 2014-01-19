  
   /***********************************************************
				        file name:       datalength.js
						author:          fulingqiao
						create date:     2009-11-30          
						description:
				********************************************************/

			/**********************************************************
				function name:    vDemail(str,m,n)
				function:		  
				parameters:       str：要解析的字符串       
				return:			  2:正常；0：不是数字；1超过范围。
				description:       验证demail(m,n)类型
				********************************************************/
			      	    
			      function vDemail(str,m,n) 
			     {
			     var r=2;
			        if(str!=''){
			       
				   		if(isNaN(str)){
				   		
				   		r=0;
				   		}else{		
				   			   			
							var begin=0-(Math.pow(10,m-n)-Math.pow(0.1,n));
							var end=Math.pow(10,m-n+1)-Math.pow(0.1,n);											
							if(str<begin||str>end){							
								r=1;
							}				
						}
				}
					 return r;
			    }
			     /**********************************************************
				function name:   isIP(str)
				function:		 验证ip地址
				parameters:       str：要解析的字符串
				return:			  true:str 格式正确
								  false:str 格式不正确
				description:      提交验证 
				********************************************************/
				
				  function   isIP(str){   
	 				 var ip= /^\ {0,}([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}\ {0,}$/;   
	 				 return   ip.test(str);   
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
					 if(isNaN(str))
					 		return 0;
					 if(str<-2147483648||str>2147483647)
							 return 1;
				}
				 return 2;
				}
				
				
				
				
				
	 			 
	 			 
	 			 
	 			 
	 			  












				/**********************************************************
				function name:    strtrim(str)
				function:		  去掉字符的前后空格	
				parameters:       str：要解析的字符串       
				return:			  返回去掉字符的前后空格的字符
				description:      
				********************************************************/
			      	    
			      function strtrim(str) 
			     {
			        return   str.replace(/(^\s*)|(\s*$)/g,"");
			    }
		
			       /**********************************************************
				function name:    replaceStrsql(str,max)
				function:		  mssql中用,	字符，最长max个字符
				parameters:       str：要解析的字符串
								  max:最长的长度       
				return:			  返回正确的字符
				description:      onkeyup事件中使用,中文长度是2，英文长度是1。最大长度是max
				********************************************************/
			     function replaceStrsql(str,max){ 
			     		str=strtrim(str);
				  	 var n=0;
				  	 var i=0;
				  	while(true){     //应用for循环语句，获取表单提交用户名字符串的长度
							var leg=str.charCodeAt(i);     //获取字符的ASCII码值
							if(leg>255){ //判断如果长度大于255					                 
							 n=n+2;   //则表示是汉字为两个字节						  
							}else {
							n+=1;       //否则表示是英文字符，为一个字节
							}	
							i++;									
						if(n>max){
							if(n==max){
								str=str.substr(0,max); 
							}else{
								str=str.substr(0,max-1);
							}
						break;
						}
					}   	        		
	        		return str;
                }	
                  /**********************************************************
				function name:    replaceStrmysql(str,max)
				function:		  mysql中用,	字符，最长max个字符
				parameters:       str：要解析的字符串
								  max:最长的长度       
				return:			  返回正确的字符
				description:      onkeyup事件中使用， 中文和英文长度都是1
				********************************************************/	
			    function replaceStrmysql(str,max){	
			    	str=strtrim(str);		     
				  	var l=str.length;
				  	if(l>max) str=str.substr(0,max);	        		
	        		return str;
                }		
                 /**********************************************************
				function name:   replaceNum(str,max)
				function:		 纯数字 
				parameters:       str：要解析的字符串
								  max:最长的长度       
				return:			  返回正确的字符
				description:      onkeyup事件中使用 
				********************************************************/
               function replaceNum(str,max){
                str= str.replace(/[^\d]/g,''); 
        		 var l=str.length;
				  	if(l>max) str=str.substr(0,max);
        		return str;
                }
                   /**********************************************************
				function name:   replacTel(str,max)
				function:		  电话/^\d*-?\d*$/;长度最大max
				parameters:       str：要解析的字符串
								  max:最长的长度       
				return:			  返回正确的字符
				description:      onkeyup事件中使用 并且最后要做提交验证。
				********************************************************/
                
               function replacTel(str,max){
                str= str.replace(/[^\d-]/g,''); 
                var l=str.length;
				  	if(l>max) str=str.substr(0,max);
        		return str;
                }
               
                 /**********************************************************
				function name:   replaceIp(str,max)
				function:		  ip地址 长度n
				parameters:       str：要解析的字符串
								  max:最长的长度       
				return:			  返回正确的字符
				description:      onkeyup事件中使用 
				********************************************************/
             
                function replaceIp(str,max){
                str= str.replace(/[^\d\.]/g,''); 
                var l=str.length;
				if(l>max) str=str.substr(0,max);
        		return str;
                }
                 /**********************************************************
				function name:   replaceInt(str)
				function:		  int或int(n)类型   
				parameters:       str：要解析的字符串 
				return:			  返回正确的字符
				description:      onkeyup事件中使用 （-2147483648，2147483647）之间的整数
				********************************************************/
		          function replaceInt(str){
					 str= str.replace(/[^\d-]/g,''); 
					 if(str.substr(0,1)!='-'){			
						 if(isNaN(str)){
						 str=str.substr(0,str.length-1);
						 }
					}else{
						if(str.length!=1&&(str.substr(0,1)=='-')){
						 if(isNaN(str)){
							 str=str.substr(0,str.length-1);
							 }
						}
					}
					if(str>2147483647){
						str=str.substr(0,9);
					}
					if(str<-2147483648) str=str.substr(0,10);
		        	return str;
					
					}
					 /**********************************************************
				function name:   replaceSmallint(str)
				function:		  smallintint类型   
				parameters:       str：要解析的字符串 
				return:			  返回正确的字符
				description:      onkeyup事件中使用 (-32768,32767)之间的整数
				********************************************************/
				      
		          function replaceSmallint(str){
					 str= str.replace(/[^\d-]/g,''); 
					 if(str.substr(0,1)!='-'){			
						 if(isNaN(str)){
						 str=str.substr(0,str.length-1);
						 }
					}else{
						if(str.length!=1&&(str.substr(0,1)=='-')){
						 if(isNaN(str)){
							 str=str.substr(0,str.length-1);
							 }
						}
					}
					if(str>32767){
						str=str.substr(0,4);
					}
					if(str<-32768)str=str.substr(0,5);
		        	return str;
					
					}
					 /**********************************************************
				function name:   replaceF(str,max)
				function:		  float类型的小数，最大99999999999.99 
				parameters:       str：要解析的字符串
								  max:最长的长度       
				return:			  返回正确的字符
				description:      onkeyup事件中使用,float类型的小数，最大99999999999.99 
				********************************************************/
           		function replaceF(str){
           		str= str.replace(/[^\d\.]/g,'');  
           		if(isNaN(str)){str='';}        	
        		return str;
           		}
           		
           			 /**********************************************************
				function name:   replaceMoney(str)
				function:		  sqlserver money类型 
				parameters:       str：要解析的字符串  
				return:			  返回正确的字符
				description:      onkeyup事件中使用 范围在(-922337203685477.5808,922337203685477.5808)之间，小数保留四位
				********************************************************/
		          function replaceMoney(str){
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
					if(f>4){
					str=str.substr(0,dian+5);
					}
					}
					if(str>+922337203685477.5808){
						str=str.substr(0,14);
					}
					if(str<-922337203685477.5808)
					str=str.substr(0,15);
		        	return str;
					
					}
					 /**********************************************************
				function name:   replacedFF(str,max)
				function:		  mysql 中的decimal(m,n)
				parameters:       str：要解析的字符串
								  max:最长的长度       
				return:			  返回正确的字符
				description:      onkeyup事件中使用 decimal类型数据取直规则是，数据长度（包括'-'和'.'）最大是m+2个，小数是n位
				********************************************************/
           		function replacedFF(str,m,n){
           		 str= str.replace(/[^\d\.-]/g,'');
           		 ////整数 
					 if(str.substr(0,1)!='-'){			
						 if(isNaN(str)){
						 str=str.substr(0,str.length-1);
						 }
					}else{
					////负数
						if(str.length!=1&&(str.substr(0,1)=='-')){
						 if(isNaN(str)){
							 str=str.substr(0,str.length-1);
							 }
						}
					}
					///小数点后最大n位
					////整数时小数点前最多m-n+1位，负数时小数点前最多m-n位
					var d=str.indexOf('.');
					if(d==-1){///是整数时
						 var l=str.length;
						if(l>m-n+1) str=str.substr(0,m-n+1);
					}
					if(d!=-1){///是小数时，
					var l=str.length-d-1;
					if(l>n) str=str.substr(0,d+1+n);
						if(d==str.length-1){///小数点在最后
						str=str;
						}
					}
					
					///大小范围
					var begin=0-(Math.pow(10,m-n)-Math.pow(0.1,n));
					var end=Math.pow(10,m-n+1)-Math.pow(0.1,n);				
					if(str<begin||str>end){
						str=str.substr(0,str.length-1);
					}
		        	return str;
           		}
           		
           		
	 			 /**********************************************************
				function name:   checkTel(str)
				function:		 匹配电话号码，因为考虑到国外电话所以只是简要的匹配
				parameters:       str：要解析的字符串
				return:			  true:str 格式正确
								  false:str 格式不正确
				description:      提交验证 
				********************************************************/
		 		
				function checkTel(str)
				{
				 var reg=/^\d*-?\d*$/;			
				 if(!reg.test(str))
				  {		  
				   return false;
				  }
				  return true;
				}
				
				
			
			     /**********************************************************
				function name:   isFloat(str)
				function:		  验证是否是数字，包括小数和负数。
				parameters:       str：要解析的字符串
				return:			  true:str 格式正确
								  false:str 格式不正确
				description:      提交验证 
				********************************************************/
           			function isFloat(str){ 
		           			var flag=true;
						//起始位置不能输入小数点 
						   if(event.keyCode==46 && str.length==0){ 
									flag=false; 
						         event.returnValue = false; 
						   }else{ 
						//以有小数点并且按的是点键 
						if(str.lastIndexOf('.')!=-1 && event.keyCode==46){ 
						  flag=false; 
						   event.returnValue = false; 
						  
						} 
						//没有小数点 
						if(event.keyCode==46 && str.lastIndexOf('.')==-1){ 
						    //并且当是负数时减号后面不能跟小数点 
						     if(str.substr(0,1)=="-" && str.length==1){ 
						     flag=false;        event.returnValue = false; 
						      
						    } 
						    event.returnValue = true; 
						   
						}else{ 
						//确认输入的是否是数字 
						if (event.keyCode < 48 || event.keyCode > 57){ 
						     if(str.length==0 && event.keyCode==45){ 
						     }else{ flag=false;  event.returnValue = false; 
						     } 
						} 
						} 
						       } 				      
				       return flag;
				  }
				  
				  
				  	/**********************************************************
				function name:   subStrsql(str)
				function:		 验证sqlserver varchar(max)类型
				parameters:       str：要解析的字符串
				return:			  
								  1:长度超过范围
								  2:合法
				description:      提交验证 
				********************************************************/
				
				  function subStrsql(str,max){ 
				 	 var r=2;
					 var n=0;
					 var i=0;
				  	while(true){     //应用for循环语句，获取表单提交用户名字符串的长度
							var leg=str.charCodeAt(i);     //获取字符的ASCII码值
							if(isNaN(leg)) break;
							if(leg>255){ //判断如果长度大于255					                 
							 n=n+2;   //则表示是汉字为两个字节						  
							}else {
							n+=1;       //否则表示是英文字符，为一个字节
							}	
							i++;
					}  
					if(n>max){r=1;}          		
	        		return r;
                }	
			
			
				   
				  /**********************************************************
				function name:   subNum(str,max)
				function:		 验证是否是纯数字
				parameters:       str：要解析的字符串
								  max:最大长度
				return:			  0:是非法字符
								  1:长度超过范围
								  2:合法
				description:      提交验证 
				********************************************************/
               function subNum(str,max){
               	if(str!=''){
               var reg=/^\d[0,]$/;
               if(!reg.test(str)) return 0;
                	var l=str.length;
				  	if(l>max) return 1;	
				  }        		
	        		return 2;
                }
              
				/**********************************************************
				function name:   subSmallint(str)
				function:		 验证smallint类型
				parameters:       str：要解析的字符串
				return:			  0:是非法字符
								  1:长度超过范围
								  2:合法
				description:      提交验证 
				********************************************************/
				 
				function subSmallint(str){
					if(str==''||str==null)
							return 2;
					 if(isNaN(str))
					 		return 0;
					 if(str>32768||str<-32767)
							 return 1;
				
				}
				/**********************************************************
				function name:   subFF(str)
				function:		 验证demail(m,n)类型
				parameters:       str：要解析的字符串
								 m,n:demail(m,n)中的两个参数
				return:			  0:是非法字符
								  1:长度超过范围
								  2:合法
				description:      提交验证 
				********************************************************/
				function subFF(str,m,n){
				if(str!=''){
				 var begin=0-(Math.pow(10,m-n)-Math.pow(0.1,n));
					var end=Math.pow(10,m-n+1)-Math.pow(0.1,n);				
					if(str<begin||str>end){
						 return 1;
					}
				}
				 return 2;
				}
			  /**********************************************************
				function name:   subMoney(str)
				function:		 验证money类型
				parameters:       str：要解析的字符串
				return:			 0:是非法字符
								  1:长度超过范围
								  2:合法
				description:      提交验证 
				********************************************************/
				
				function subMoney(str){
				if(str!=''){
					 if(isNaN(str)){
					 		return 0;
					 		}
					if(str<-922337203685477.5808||str>+922337203685477.5808){
							return 1;
						}
				}
				 return 2;
				}
				
               /**********************************************************
				function name:   subTel(str,max)
				function:		 验证电话，
				parameters:       str：要解析的字符串
								  max:最大长度
				return:			  0:是非法字符
								  1:长度超过范围
								  2:合法
				description:      提交验证 
				********************************************************/
                function subTel(str,max){
                if(!checkTel(str)) return 0;
                var l=str.length;
				  	if(l>max) return 1;
				  	return 2;
                }
                 /**********************************************************
				function name:   subStrmysql(str,max)
				function:		 验证是否是整数,如果是整数，返回true;
				parameters:       str：要解析的字符串
								  max:最大长度
				return:			 
								  1:长度超过范围
								  2:合法
				description:      提交验证 
				********************************************************/
			    function subStrmysql(str,max){			     
				  	 var r=2;
					 var n=0;
					 var i=0;
				  	while(true){     //应用for循环语句，获取表单提交用户名字符串的长度
							var leg=str.charCodeAt(i);     //获取字符的ASCII码值
							if(isNaN(leg)) break;
							n+=1;       
							i++;
					}  
					if(n>max){r=1;}          		
	        		return r;
                }		
                	
				  
				  
				  
				  
				  
				  
				  
				  
				  
				  
				  
				  
				  
				  
				  