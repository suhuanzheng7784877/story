/********************************************
----------------------------------------------               
               付2010
---------------------------------------------
*******************************************/
/********************************************************************************************
			function name:  addRowOperBtnimage(gridId,url,idName,outType,index,oprtype,imageurl,atitle,linkName)
			function:		jqGrid增加操作按钮。
			parameters:     gridId	 表格的id
						    linkName 链接名称
						    url      链接地址,即方法名
						    idName   行主键列的名称 可以是隐藏列
						    outType  链接激活方式 枚举类型 href：为跳转页面 ，click：事件激活方式
						    index    该按钮在行按钮的位置 数字
							imageurl 图片的链接地址
							atitle: 鼠标放在按钮上浮动的文字
							linkName：不定数的&nbsp;用来调整图片宽带。
							参数id 8-14预留为字段ID
			return:			返回根据关键字解析好的字符
			description:    要解析的字符串格式必须为以'{'开头,'/}'结束的字符串,
							和常用的addRowOperBtn方法区别是具体操作是以图片表示
								
	例子:addRowOperBtnimage('editgrid','openModify','id','click',1,"images/ltubiao_01.gif","修改","&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");//修改
		addRowOperBtnimage('editgrid','openDel','id','click',2,"images/ltubiao_02.gif",'删除',"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");//删除
		addRowOperBtnimage('editgrid','openInfo','id','click',3,'images/ltubiao_03.gif',"详细","&nbsp;&nbsp;&nbsp;");//详细
		executeAddBtn('editgrid',3);
**********************************************************************************************/
	var menuOpers=[]; 
	function addRowOperBtnimage(gridId,url,idName,outType,index,imageurl,atitle,linkName){
	
			var menuTblRow = document.getElementById(gridId).rows;
			var idName_b = arguments[8];
			var idName_c = arguments[9];
			var idName_d = arguments[10];
			var idName_e = arguments[11];
			var idName_f = arguments[12];
			var idName_g = arguments[13];
			var idName_h = arguments[14];
				
			var useSecondKey = (typeof idName_b=='undefined'?false:true);
			var useThirdKey = (typeof idName_c=='undefined'?false:true);
			var useFouthKey = (typeof idName_d=='undefined'?false:true);
			var useFifthKey = (typeof idName_e=='undefined'?false:true);
			var useSixthKey = (typeof idName_f=='undefined'?false:true);
			var useSevenKey = (typeof idName_g=='undefined'?false:true);
			var useEighthKey = (typeof idName_h=='undefined'?false:true);		
			
	 		var len = menuTblRow.length;
	 				var temp=[]; 
					for(var j=1;j<len;j++){
						var params =jQuery('#'+gridId).getRowData(j)[idName];						
						var paramsb ;
						
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
								//btnHtml+='<a href=\"'+url+'&'+idName+'='+params;
								btnHtml+='<a title='+atitle+' style=\" text-decoration:none; background-image: url('+imageurl+');\" href=\"javascript:'+url+"('"+params;
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
								btnHtml+='<a title='+atitle+' style=\" text-decoration:none; background-image: url('+imageurl+');\" href=\"javascript:'+url+"('"+params;
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
	
	
	
/**********************************************************
				function name:  getRb_Field(Table_Name,id,lie,wid,hidename)
				function:		qGrid 获得可以显示的字段。
				parameters:     Table_Name:要操作的表的名字，确保rb_Field中有这个表的别名记录
							    id:主键,适用于主键字段隐藏(WebSelectable = 'F')的情况.
							    	如果主键字段是显示的(WebSelectable = 'T'),可以把这个参数写成"'xx'"
							    lie:操作列的名字,如果是空字符串，就是没有操作列。
							    wid:操作列的宽度
							    hidename:参数ziduans保存到页面中的一个隐藏域。此为隐藏域的名称。
								参数id 5-11 预留为字段ID,适用于多个主键字段隐藏(WebSelectable = 'F')的情况
				return:			1有个名称为 参数hidename的隐藏域。作为参数"ziduans" 传给后台。sql语句形如SELECT <ziduans> FROM vw_radcheck
								2.方法返回三维数组。col[0]代表jqGrid的jqGrid中的colNames;
								col[1]代表jqGrid的jqGrid中的colModel;col[2][0]：jqgrid显示数据中的第一个字段
				description:    可以省略不写或者可以为空字段串的字段是:								
								wid:默认为“150”，（默认列的宽度，只能是象素值，不能是百分比）							
							
				引入要求：
				1.mssql中有danganM.queryRb_Field=select  Field_Name,  ShowOrder,ShowWidth from Rb_Field WHERE (Table_Name = '<Table_Name>') and(WebSelectable = 'T')
				2.确保rb_Field表中有表Table_Name的有关数据。
				modify :
							2011-2-16：添加通用单表编辑 显示字段控制。
********************************************************/
function getRb_Field(Table_Name,id,lie,wid,hidename){
	     	//省略后的默认值，
	   		if(wid==""||wid==undefined||wid=="0")
	   		{
	   			wid="150";
	   		}		
		    var Field_Name=new Array();
		    var ShowOrder=new Array();
		    var ShowWidth=new Array();
		    var i=-1;	    
		    var ShowWidthp=[];
		    var Fieldname=new Array();//排列顺序后的
		    var col=[[],[],[]]; 	   
		    var ziduans="";//要传给sql语句的参数
	  		var idName_b = arguments[5];
			var idName_c = arguments[6];
			var idName_d = arguments[7];
			var idName_e = arguments[8];
			var idName_f = arguments[9];
			var idName_g = arguments[10];
			var idName_h = arguments[11];
				
			var useSecondKey = (typeof idName_b=='undefined'?false:true);
			var useThirdKey = (typeof idName_c=='undefined'?false:true);
			var useFouthKey = (typeof idName_d=='undefined'?false:true);
			var useFifthKey = (typeof idName_e=='undefined'?false:true);
			var useSixthKey = (typeof idName_f=='undefined'?false:true);
			var useSevenKey = (typeof idName_g=='undefined'?false:true);
			var useEighthKey = (typeof idName_h=='undefined'?false:true);			
			
			/*****************
			*单表编辑模块
				判断菜单id是否为空
					是：执行sql语句danganM.queryRb_Field
					否：判断改菜单是否为单表编辑模块 and 判断singletable表中的showfields字段值是否不为空
						是:执行sql语句danganM.queryRb_Field
						否：执行sql语句main.queryRb_Field_single					
			*****************/
			var sqlname='';
			var singleImenuid = $("#singleTabEimenuid").val();
			if(singleImenuid==''||singleImenuid==undefined||singleImenuid=='undefined'){
				sqlname='danganM.queryRb_Field';
			}else{
				var countnum = fetchSingleValue('main.ifSingleTab',6,'&imenuid='+singleImenuid);
				if(countnum>0){
					sqlname='main.queryRb_Field_single';
				}else{
					sqlname='danganM.queryRb_Field';
				}
			}
	    	$.ajax({
	    			//main.queryRb_Field_single
					//url:"mainServlet.html?packgname=service&clsname=ExecuteSql&method=exeSqlData&ds=tsdBilling&tsdcf=mssql&tsdoper=query&datatype=xmlattr&tsdpk=danganM.queryRb_Field&Table_Name="+Table_Name,
					url:"mainServlet.html?packgname=service&clsname=ExecuteSql&method=exeSqlData&ds=tsdBilling&tsdcf=mssql&tsdoper=query&datatype=xmlattr&tsdpk="+sqlname+"&Table_Name="+Table_Name+"&menuid="+singleImenuid,
					type:'post',
					datatype:'exe',
					cache:false,//如果值变化可能性比较大 一定要将缓存设成false
					timeout: 1000,
					async: false ,//同步方式					
					success:function(xml){
						$(xml).find('row').each(function(){	
								i++;	
								Fieldname[i]=$(this).attr("Field_Name".toLowerCase());
								// Field_Name[i]=$(this).attr("Field_Name");
								// ShowOrder[i]=$(this).attr("ShowOrder");
								ShowWidth[i]=$(this).attr("ShowWidth".toLowerCase());
								 								
						});
					}
			 	});
				
			//排列顺序
			/**
			for(var j=0;j<=i;j++){
				for(var r=0;r<=i;r++){				
					if(ShowOrder[r]==j+1){
						Fieldname[j]=Field_Name[r];
						if(ShowWidth[r]!="0"&&ShowWidth[r]!=""&&ShowWidth[r]!=undefined){
							ShowWidthp[j]=ShowWidth[r];
						}else{
							ShowWidthp[j]="150";//默认列的宽度，只能是象素值，不能是百分比,默认值:150
						}					
					}
				}
			}	
			**/
			//控制jqgrid的宽度
			for(var j=0;j<=i;j++){	
					if(ShowWidth[j]!="0"&&ShowWidth[j]!=""&&ShowWidth[j]!=undefined){
						ShowWidthp[j]=ShowWidth[j];
					}else{
						ShowWidthp[j]="150";//默认列的宽度，只能是象素值，不能是百分比,默认值:150
					}
			}
			
			//var opr = $("#operation").val();
			
			var thisdata = loadData(Table_Name,'<%=languageType %>',1);
			if(lie!=""){//有操作列的情况
				var strtemp='';
				//单表编辑模块调用此方法时，隐藏域中的字段去掉最前面的GS_ ,以匹配数据库字段。
					//修改原因：因为隐藏域中的字段会和jqgrid中的字段出现重名，导致取值的时候不能确定取那个字段的值。				
				if(typeof(g_SingleTabE)=="undefined"){
						ziduans=ziduans+id+","+id;				
						if(useSecondKey)
							ziduans=ziduans+","+idName_b;
						if(useThirdKey)
							ziduans=ziduans+","+idName_c;
						if(useFouthKey)
							ziduans=ziduans+","+idName_d;
						if(useFifthKey)
							ziduans=ziduans+","+idName_e;
						if(useSixthKey)
							 ziduans=ziduans+","+idName_f;
						if(useSevenKey)
							ziduans=ziduans+","+idName_g;
						if(useEighthKey)
							ziduans=ziduans+","+idName_h;
				}
				else if (g_SingleTabE=='yes'){				
						strtemp=id.replace(new RegExp("GS_"),"");
						ziduans=ziduans+strtemp+","+strtemp;				
						if(useSecondKey){
							strtemp=idName_b.replace(new RegExp("GS_"),"");
							ziduans=ziduans+","+strtemp;
						}
						if(useThirdKey){
							strtemp=idName_c.replace(new RegExp("GS_"),"");
							ziduans=ziduans+","+strtemp;
						}
						if(useFouthKey){
							strtemp=idName_d.replace(new RegExp("GS_"),"");
							ziduans=ziduans+","+strtemp;
						}
						if(useFifthKey){
							strtemp=idName_e.replace(new RegExp("GS_"),"");
							ziduans=ziduans+","+strtemp;
						}
						if(useSixthKey){
							strtemp=idName_f.replace(new RegExp("GS_"),"");
							ziduans=ziduans+","+strtemp;
						}
						if(useSevenKey){
							strtemp=idName_g.replace(new RegExp("GS_"),"");
							ziduans=ziduans+","+strtemp;
						}
						if(useEighthKey){
							strtemp=idName_h.replace(new RegExp("GS_"),"");
							ziduans=ziduans+","+strtemp;
						}
				}
										
				for(var i=0;i<Fieldname.length;i++){
					ziduans=ziduans+","+Fieldname[i];
				}
			}else{
				for(var i=0;i<Fieldname.length;i++){
					if(i==0){
						ziduans=ziduans+Fieldname[i];
					}else{
						ziduans=ziduans+","+Fieldname[i];
					}
				}
			}	
			$("#"+hidename).val(ziduans);
			if(lie!=""){//有操作列的情况
				col[0][0]=lie;
				//col[0][0]="修改|&nbsp;删除|&nbsp;详细";
				wid=parseInt(wid+"");
				//jqGrid中的colModel
				col[1][0]={name:'viewOperation',index:'viewOperation',sortable:false,width:wid};				
				
				var count=0;				
				if(useSecondKey){
					col[0][2]=idName_b;//jqGrid中的colNames			
					col[1][2]={name:idName_b,index:idName_b,hidden:true};
					count=1;
				}
				if(useThirdKey){
					col[0][3]=idName_c;//jqGrid中的colNames			
					col[1][3]={name:idName_c,index:idName_b,hidden:true};
					count=2;
				}
				if(useFouthKey){
					col[0][4]=idName_d;//jqGrid中的colNames			
					col[1][4]={name:idName_d,index:idName_d,hidden:true};
					count=3;
				}
				if(useFifthKey){
					col[0][5]=idName_e;//jqGrid中的colNames			
					col[1][5]={name:idName_e,index:idName_e,hidden:true};
					count=4;
				}
				if(useSixthKey){
					col[0][6]=idName_f;//jqGrid中的colNames			
					col[1][6]={name:idName_f,index:idName_f,hidden:true};
					count=5;
				}
				if(useSevenKey){
					col[0][7]=idName_g;//jqGrid中的colNames			
					col[1][7]={name:idName_g,index:idName_g,hidden:true};
					count=6;
				}
				if(useEighthKey){
					col[0][8]=idName_h;//jqGrid中的colNames			
					col[1][8]={name:idName_h,index:idName_h,hidden:true};
					count=7;
				}	
				col[0][1]=id;//jqGrid中的colNames			
				col[1][1]={name:id,index:id,hidden:true};
				col[2][0]=Fieldname[0];
				
				
				
				for(var i=0;i<Fieldname.length;i++){					
					col[0][i+2+count]=thisdata.getFieldAliasByFieldName(Fieldname[i]);	
					ShowWidthp[i]=parseInt(ShowWidthp[i]+"");	
					if(ShowWidthp[i]=='0'){
						col[1][i+2+count]={name:Fieldname[i],index:Fieldname[i]};
					}else{
						col[1][i+2+count]={name:Fieldname[i],index:Fieldname[i],width:ShowWidthp[i]};//"{name:'"+Fieldname[i]+"',index:'"+Fieldname[i]+"',width:"+ShowWidthp[i]+"}";
					} 
				}
			}else{
				for(var i=0;i<Fieldname.length;i++){
					col[0][i]=thisdata.getFieldAliasByFieldName(Fieldname[i]);	
					ShowWidthp[i]=parseInt(ShowWidthp[i]+"");		
					if(ShowWidthp[i]=='0'){
						col[1][i]={name:Fieldname[i],index:Fieldname[i]};
					}else{
						col[1][i]={name:Fieldname[i],index:Fieldname[i],width:ShowWidthp[i]};//"{name:'"+Fieldname[i]+"',index:'"+Fieldname[i]+"',width:"+ShowWidthp[i]+"}";
					} 
				}
			}		
			//alert("ziduans="+ziduans+"col[0]"+col[0]+"col[1]"+col[1]);
			return col;
} 
	      

/**********************************************************
				function name:   markTable(key)
				function:		 给添加面板中的必填项加*（红色）突出标注
				parameters:      key：0添加红色*   1 去掉
				return:			 
				description:     在必填项的后面加上  <span class="addred"></span>
								 在打开添加面板的是调用markTable(0)；给必填项添加"*".
								 在打开修改面板的时候调用markTable(1)；去掉必填项前添加"*".
********************************************************/				
function markTable(key){
	if(key==0){
		$(".addred").html("*");
		$(".addred").attr("style","color:#ff0000");
		$(".delred").html("*");
		$(".delred").attr("style","color:#ffffff");
	}
	else{
		$(".addred").empty();
		$(".delred").empty();
	}
}
