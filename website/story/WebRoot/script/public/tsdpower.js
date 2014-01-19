
/**********************************************************
				function name:   getUserPowerNEW(htmlinfo,userid,groupid,imenuid,powerParams)
				function:		 查看当前用户的扩展权限，对spower字段进行解析
				parameters:      htmlinfo：程序员配置的页面可控权限信息
								 userid： 登入账号
								 groupid：用户权限组
								 imenuid：菜单信息
								 powerParams:权限 存储过程的映射名称
				return:			 
				description:      
				
				
页面权限配置格式
var htmlinfo = [
{oper:'add',		id:'openadd1,openadd2',		type:'1',value:''},
{oper:'delB',		id:'opendel1,opendel2',		type:'1',value:''}, 
{oper:'editB',		id:'openmod1,openmod2',		type:'1',value:''},
{oper:'export',		id:'export1,export2',		type:'1',value:''},
{oper:'print',		id:'print1,print2',			type:'1',value:''},
{oper:'query',		id:'gjquery1,gjquery2',		type:'1',value:''},
{oper:'saveQueryM',	id:'savequery1,savequery2',	type:'1',value:''},
{oper:'delete',	id:'deleteright',				type:'2',value:'true'},
{oper:'edit',	id:'editright',					type:'2',value:'true'},
{oper:'editfields',id:'editfields',				type:'3',value:'Zhji_Code'},
{oper:'valinfo',id:'valinfo',					type:'4',value:'Zhji,Code'}
];

jsonhtml 中的type有四种类型：
								1:表示按钮类型，将按钮置为可用 
								2：true false 通过获取id隐藏域的值，来判断是否拥有该权限
								3:字段可编辑域 value 为页面对应表名 如果操作多个表可以有多个域关键字
								4：字符串 改权限需要根据获得的字符串信息来判断值				
********************************************************/



function getUserPowerNEW(htmlinfo,userid,groupid,imenuid,powerParams){
		/**
		解析json  获取页面配置权限信息
		*/ 
		//alert(htmlinfo);
		//存放json 解析出来信息
		var htmloper = new Array();
		var str = htmlinfo;
		
		for(i=0;i<str.length;i++){
			htmloper[i] = new Array();			
			htmloper[i][0] = str[i].oper;//存放权限关键字
			htmloper[i][1] = str[i].id;//存放对应 html元素 id
			htmloper[i][2] = str[i].type;//存放权限类型
			htmloper[i][3] = str[i].value;//存放权限默认值
			htmloper[i][4] ='';			//附加域，用来存放业务处理或，关键字的最终值
		}
		/**
		获取数据库中页面对应权限信息
		*/		
		//设置读取数据库参数
		 var urlstr=tsd.buildParams({ 	  packgname:'service',
					 					  clsname:'Procedure',
										  method:'exequery',
					 					  ds:'tsdBilling',//数据源名称 对应的spring配置的数据源
					 					  tsdpname:powerParams,//存储过程的映射名称
					 					  tsdExeType:'query',
					 					  datatype:'xmlattr'
		
		});				
		var spower = '';	//存放数据库权限初值
		$.ajax({
				url:'mainServlet.html?'+urlstr+'&userid='+userid+'&groupid='+groupid+'&menuid='+imenuid,
				datatype:'xml',
				cache:false,//如果值变化可能性比较大 一定要将缓存设成false
				timeout: 1000,
				async: false ,//同步方式
				success:function(xml){
					$(xml).find('row').each(function(){
							spower += $(this).attr("spower")+'@';
					});
				}
		});
		
		//alert(spower);
		//存放数据库中解析出来的用户权限
		var powerA = new Array();
		var k = 0;
		//获取权限和其的对应值
		
		//当用户以 非admin 身份登入的时候，设置权限
		if(spower!=''&&spower!='all@'){				
				var pattern = /\{([\w\d]+)=([\w\d_,]+)\/\}/g; //定义匹配 {add=true}的正则表达式
				var result ;
				var i = 0;
				while((result= pattern.exec(spower))!=null)
				{
					powerA[i] =new Array();
					powerA[i][0]=result[1];
					powerA[i][1]=result[2];
					i++;					
				}
					
				//通过数据看信息和htmljson参数确定 权限的最终值
				for(var h=0;h<htmloper.length;h++){
					for(var g=0;g<powerA.length;g++){
						if(htmloper[h][0]==powerA[g][0]){							
							if(htmloper[h][2]=='1'||htmloper[h][2]=='2'){
								if(powerA[g][1]=='true'){
									//alert(htmloper[h][1]+":"+htmloper[h][1].length);
									htmloper[h][4]=true;
								}								
								//alert(htmloper[h][0]);
							}							
							else if(htmloper[h][2]=='3'||htmloper[h][2]=='4'){									
									htmloper[h][4]+=powerA[g][1];								
							}
						}
					}					
				}				
		}
		//当用户以admin身份登入的时候，设置权限
		else if(spower=='all@'){			
				//从用户页面htmlinfo参数 得到对应关键字和value值
				for(var h=0;h<htmloper.length;h++){						
					if(htmloper[h][2]=='1'||htmloper[h][2]=='2'){								
						htmloper[h][4]=true;
					}					
					else if(htmloper[h][2]=='4'){								
						htmloper[h][4]=htmloper[h][3];	
					}						
					else if(htmloper[h][2]=='3'){								
						htmloper[h][4]=getFields(htmloper[h][3]);
					}	
				}	
		}
		
		//通过权限值，设置页面权限信息
		for(var h=0;h<htmloper.length;h++){						
			//alert(htmloper[h][3]);	
			if(htmloper[h][2]=='1'&&htmloper[h][4]==true){				
				var htmlField = htmloper[h][1].split(",");
				for(var t=0;t<htmlField.length;t++){
					//alert(htmlField[t]);
					$("#"+htmlField[t]).removeAttr("disabled");
				}				
			}
			//alert(htmloper[h][3]);
			else if(htmloper[h][2]=='2'||htmloper[h][2]=='3'||htmloper[h][2]=='4'){				
				var htmlField = htmloper[h][1].split(",");
				for(var t=0;t<htmlField.length;t++){
					//alert(htmlField[t]);
					$("#"+htmlField[t]).val(htmloper[h][4]);
				}				
			}
			
		}		
}

/**********************************************************
				function name:   removeFieldDisabled(key,prefix,suffix,type)
				function:		 将添加或修改面板中的字段置为可用 
				parameters:      tablename：表名
								 prefix:表单id值的开头
								 suffix:表单id值的结尾
								 type :lower 把字段转为小写 larger 把字段名转为大写
				return:			 
				description:      是 removeDisabled(key)的 改进
********************************************************/
function removeFieldDisabled(tablename,prefix,suffix,type){
	var fields = getFields(tablename);
	var fieldarr = fields.split(",");					
	for(var j = 0 ; j <fieldarr.length-1;j++){
			var fieldname =fieldarr[j];
			if(type=='lower'){
				fieldname=fieldname.toLowerCase();
			}
			else if(type=='larger'){
				fieldname=fieldname.toUpperCase();
			}	
			if($('#'+prefix+fieldname+suffix).length>0){
				$('#'+prefix+fieldname+suffix).removeAttr("disabled");
				$('#'+prefix+fieldname+suffix).removeClass("textclass2");			
				$('#'+prefix+fieldname+suffix).addClass("textclass");		
			}	
		
			if($('#check'+prefix+fieldname+suffix).length>0){				
				$('#check'+prefix+fieldname+suffix).removeAttr("disabled");
				$('#check'+prefix+fieldname+suffix).removeClass("textclass2");			
				$('#check'+prefix+fieldname+suffix).addClass("textclass");	
			}
			
	}
}
/**********************************************************
				function name:   isFieldDisabled(key,prefix,suffix,type)
				function:		 将添加或修改面板中的字段置为不可用 
				parameters:      tablename：表名
								 prefix:表单id值的开头
								 suffix:表单id值的结尾
								 type :lower 把字段转为小写 larger 把字段名转为大写
				return:			 
				description:  
********************************************************/
function isFieldDisabled(tablename,prefix,suffix,type){
	var fields = getFields(tablename);
	var fieldarr = fields.split(",");
	
	for(var j = 0 ; j <fieldarr.length-1;j++){
			//alert($('#'+prefix+fieldarr[j]+suffix).length+"---prefix");
			//alert($('#check'+prefix+fieldarr[j]+suffix).length+"--check");
			var fieldname =fieldarr[j];
			if(type=='lower'){
				fieldname=fieldname.toLowerCase();
			}
			else if(type=='larger'){
				fieldname=fieldname.toUpperCase();
			}
			if($('#'+prefix+fieldname+suffix).length>0){
				$('#'+prefix+fieldname+suffix).attr("disabled","disabled");
				$('#'+prefix+fieldname+suffix).removeClass("textclass");
				$('#'+prefix+fieldname+suffix).addClass("textclass2");
			}
			
			if($('#check'+prefix+fieldname+suffix).length>0){
				$('#check'+prefix+fieldname+suffix).attr("disabled","disabled");
				$('#check'+prefix+fieldname+suffix).removeClass("textclass");
				$('#check'+prefix+fieldname+suffix).addClass("textclass2");
			}
	}
	
}

/**********************************************************
				function name:   keyWordDisabled(fieldA,prefix,suffix)
				function:		 将表的关键字 字段置为不可用  
				parameters:      fieldA：表的关键字 字段  字段之间用'，'隔开,如："Zjjx,ZjjxZu"
								 prefix:表单id值的开头
								 suffix:表单id值的结尾
				return:			 
				description:   是 isDisabled(key)的 改进
********************************************************/
function keyWordDisabled(fieldA,prefix,suffix){
	var fields = fieldA;
	var fieldarr = fields.split(",");
	for(var j = 0 ; j <fieldarr.length;j++){			
			if($('#'+prefix+fieldarr[j]+suffix).length>0){
				$('#'+prefix+fieldarr[j]+suffix).attr("disabled","disabled");	
				$('#'+prefix+fieldarr[j]+suffix).removeClass("textclass");		
				$('#'+prefix+fieldarr[j]+suffix).addClass("textclass2");	
			}
				
			if($('#check'+prefix+fieldarr[j]+suffix).length>0){
				$('#check'+prefix+fieldarr[j]+suffix).attr("disabled","disabled");	
				$('#check'+prefix+fieldarr[j]+suffix).removeClass("textclass");		
				$('#check'+prefix+fieldarr[j]+suffix).addClass("textclass2");
			}
						
	}
}

/**********************************************************
				function name:   keyWordRemoveDisabled(fieldA,prefix,suffix)
				function:		 将表的关键字 字段置为不可用  
				parameters:      fieldA：表的关键字 字段  字段之间用'，'隔开,如："Zjjx,ZjjxZu"
								 prefix:表单id值的开头
								 suffix:表单id值的结尾
				return:			 
				description:   是 isDisabled(key)的 改进
********************************************************/
function keyWordRemoveDisabled(fieldA,prefix,suffix){
	var fields = fieldA;
	var fieldarr = fields.split(",");
	for(var j = 0 ; j <fieldarr.length;j++){
			if($('#'+prefix+fieldarr[j]+suffix).length>0){
				$('#'+prefix+fieldarr[j]+suffix).removeAttr("disabled");
				$('#'+prefix+fieldarr[j]+suffix).removeClass("textclass2");			
				$('#'+prefix+fieldarr[j]+suffix).addClass("textclass");		
			}	
		
			if($('#check'+prefix+fieldarr[j]+suffix).length>0){				
				$('#check'+prefix+fieldarr[j]+suffix).removeAttr("disabled");
				$('#check'+prefix+fieldarr[j]+suffix).removeClass("textclass2");			
				$('#check'+prefix+fieldarr[j]+suffix).addClass("textclass");	
			}
						
	}
}

/**********************************************************
				function name:   setTableFieldsAble(idN,tablename,prefix,suffix,type)
				function:		 字段权限域控制 针对修改和 批量修改的时候权限控制
				parameters:      tablename：表名
								 idN：可编辑域
								 prefix:表单元素id值的开头
								 suffix:表单元素id值的结尾
								 type : lower 把字段转为小写 larger 把字段名转为大写
				return:			 
				description:     
********************************************************/
function setTableFieldsAble(tablename,idN,prefix,suffix,type){
		//获取权限表中的可编辑域信息
		var editfields = $("#"+idN).val();
		/*************************************
		**将当前表的所有字段取出来，分割字符串 ***
		var fields = getFields(tablename);
		var fieldarr = fields.split(",");
		*************************************/
		
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
			for(var i=0;i<arr.length;i++){
					var fieldname = arr[i];
					if(type=='lower'){
						fieldname = fieldname.toLowerCase();
					}
					else if(type=='larger'){
						fieldname = fieldname.toUpperCase();
					}
					if(arr[i]==''||arr[i]==undefined){
					}else{
						if($('#'+prefix+fieldname+suffix).length>0){
							$('#'+prefix+fieldname+suffix).removeAttr("disabled");
							$("#"+prefix+fieldname+suffix).removeClass("textclass2");
							$("#"+prefix+fieldname+suffix).addClass("textclass");
						}						
						if($('#check'+prefix+fieldname+suffix).length>0){
							$('#check'+prefix+fieldname+suffix).removeAttr("disabled");
							$('#check'+prefix+fieldname+suffix).removeClass("textclass2");
							$('#check'+prefix+fieldname+suffix).addClass("textclass");
						}						
					}
			}
		}
}