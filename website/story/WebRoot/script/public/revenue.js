/*******************************************************************************************************
        file name:       revenue.js
        author:          chenze 
        create date:     2009-10-09          
        description:
*******************************************************************************************************/

/**********************************************************************
function name:    AmountInWords
function:         金额大写转换
parameters:       dValue:要转换的数字金额,例12345.678
                  maxDec:保留位数,例2       
return:						返回大写金额
description:      金额大写转换
**********************************************************************/
function AmountInWords(dValue, maxDec) 
{
    // 验证输入金额数值或数值字符串：
    dValue = dValue.toString().replace(/,/g, ""); 
    dValue = dValue.replace(/^0+/, "");      // 金额数值转字符、移除逗号、移除前导零
    if (dValue == "") { return "零元整"; }      // （错误：金额为空！）
    else if (isNaN(dValue))
    {
		return "错误：金额不是合法的数值！";
	} 
    
    var minus = "";                             // 负数的符号“-”的大写：“负”字。可自定义字符，如“（负）”。
    var CN_SYMBOL = "";                         // 币种名称（如“人民币”，默认空）
    if (dValue.length > 1)
    {
        if (dValue.indexOf('-') == 0) { dValue = dValue.replace("-", ""); minus = "负"; }   // 处理负数符号“-”
        if (dValue.indexOf('+') == 0) { dValue = dValue.replace("+", ""); }                 // 处理前导正数符号“+”（无实际意义）
    }
    
    // 变量定义：
    var vInt = ""; 
    var vDec = "";               // 字符串：金额的整数部分、小数部分
    var resAIW;                                 // 字符串：要输出的结果
    var parts;                                  // 数组（整数部分.小数部分），length=1时则仅为整数。
    var digits, radices, bigRadices, decimals; // 数组：数字（0~9——零~玖）；基（十进制记数系统中每个数字位的基是10——拾,佰,仟）；大基（万,亿,兆,京,垓,杼,穰,沟,涧,正）；辅币（元以下，角/分/厘/毫/丝）。
    var zeroCount;                              // 零计数
    var i, p, d;                                // 循环因子；前一位数字；当前位数字。
    var quotient, modulus;                      // 整数部分计算用：商数、模数。

    // 金额数值转换为字符，分割整数部分和小数部分：整数、小数分开来搞（小数部分有可能四舍五入后对整数部分有进位）。
    var NoneDecLen = (typeof(maxDec) == "undefined" || maxDec == null || Number(maxDec) < 0 || Number(maxDec) > 5);     // 是否未指定有效小数位（true/false）
    parts = dValue.split('.');                      // 数组赋值：（整数部分.小数部分），Array的length=1则仅为整数。
    if (parts.length > 1) 
    {
        vInt = parts[0]; vDec = parts[1];           // 变量赋值：金额的整数部分、小数部分
        
        if(NoneDecLen) { maxDec = vDec.length > 5 ? 5 : vDec.length; }                                  // 未指定有效小数位参数值时，自动取实际小数位长但不超5。
        var rDec = Number("0." + vDec);     
        rDec *= Math.pow(10, maxDec); rDec = Math.round(Math.abs(rDec)); rDec /= Math.pow(10, maxDec); // 小数四舍五入
        var aIntDec = rDec.toString().split('.');
        if(Number(aIntDec[0]) == 1) { vInt = (Number(vInt) + 1).toString(); }                           // 小数部分四舍五入后有可能向整数部分的个位进位（值1）
        if(aIntDec.length > 1) { vDec = aIntDec[1]; } else { vDec = ""; }
    }
    else { vInt = dValue; vDec = ""; if(NoneDecLen) { maxDec = 0; } } 
    if(vInt.length > 44) { return "错误：金额值太大了！整数位长【" + vInt.length.toString() + "】超过了上限——44位/千正/10^43（注：1正=1万涧=1亿亿亿亿亿，10^40）！"; }
    
    // 准备各字符数组 Prepare the characters corresponding to the digits:
    digits = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");         // 零~玖
    radices = new Array("", "拾", "佰", "仟");                                              // 拾,佰,仟
    bigRadices = new Array("", "万", "亿", "兆", "京", "垓", "杼", "穰" ,"沟", "涧", "正"); // 万,亿,兆,京,垓,杼,穰,沟,涧,正
    decimals = new Array("角", "分", "厘", "毫", "丝");                                     // 角/分/厘/毫/丝
    
    resAIW = ""; // 开始处理
    
    // 处理整数部分（如果有）
    if (Number(vInt) > 0) 
    {
        zeroCount = 0;
        for (i = 0; i < vInt.length; i++) 
        {
            p = vInt.length - i - 1; d = vInt.substr(i, 1); quotient = p / 4; modulus = p % 4;
            if (d == "0") { zeroCount++; }
            else 
            {
                if (zeroCount > 0) { resAIW += digits[0]; }
                zeroCount = 0; resAIW += digits[Number(d)] + radices[modulus];
            }
            if (modulus == 0 && zeroCount < 4) { resAIW += bigRadices[quotient]; }
        }
        resAIW += "元";
    }
    
    // 处理小数部分（如果有）
    for (i = 0; i < vDec.length; i++) { d = vDec.substr(i, 1); if (d != "0") { resAIW += digits[Number(d)] + decimals[i]; } }
    
    // 处理结果
    if (resAIW == "") { resAIW = "零" + "元"; }     // 零元
    if (vDec == "") { resAIW += "整"; }             // ...元整
    resAIW = CN_SYMBOL + minus + resAIW;            // 人民币/负......元角分/整
    return resAIW;
}


/**********************************************************************
function name:    fetchSingleValue
function:         fetchSingleValue(key,dss,param)

parameters:       key:要请求的SQL语句对应配置文件中键值
                  dss:数据源编号,0为宽带的 mysql数据源，1-7为固话的sqlServer数据源，具体查看函数identifyDs
                  param :
                  
return:           能取到值时返回取到的值，否则返回undefined
description:      从数据库中取单个值，通用
**********************************************************************/
function fetchSingleValue(key,dss,param)
{
	var result;
	var configFile = arguments[3];
	if(configFile==undefined)
	{
		configFile = dss?'mssql':'mysql';
	}
	var urlMm = tsd.buildParams({ packgname:'service',
				clsname:'ExecuteSql',//类名
				method:'exeSqlData',//方法名
				ds:identifyDs(dss),
				tsdcf:configFile,//指向配置文件名称
				tsdoper:'query',//操作类型 
				datatype:'xml',//返回数据格式 
				tsdpk:key
			});
	//alert(urlMm +"_"+param);
	$.ajax({
		url:"mainServlet.html?" + urlMm + param,
		async:false,
		cache:false,
		timeout:1000,
		type:'post',
		success:function(xml){
			$(xml).find("row:first").each(function(){
				$(this).find("cell:first").each(function(){
					result = $(this).text();
				});
			});
		}
	});
	return result;
}

/**********************************************************************
function name:    fetchMultiPValue
function:         fetchMultiPValue(key,dss,param),通过存储过程取回多个值，返回值 N*M 数组

parameters:       key:要请求的存储过程的展现名
                  dss:数据源编号,0为宽带的 mysql数据源，1-7为固话的sqlServer数据源，具体查看函数identifyDs
                  param为需要的参数,格式为"&param1=value1&param2=value2";
                  
return:           能取到值时返回取到的值的多维数据，否则返回没有值的一维数据

description:      从数据库中取多值 N*M 数组，通用，主要用于取权限
**********************************************************************/
function fetchMultiPValue(key,dss,param)
{
	var result = new Array();
	var i = 0;
	var j = 0;
	
	var urlMm = tsd.buildParams({ packgname:'service',
				clsname:'Procedure',//类名
				method:'exequery',//方法名
				ds:identifyDs(dss),
				tsdExeType:'query',//操作类型 
				datatype:'xml',//返回数据格式 
				tsdpname:key
				});
	//alert(urlMm +"_"+param);
	
	$.ajax({
		url:"mainServlet.html?" + urlMm + param,
		async:false,
		cache:false,
		timeout:1000,
		type:'post',
		success:function(xml){
			$(xml).find("row").each(function(){
				result[i++] = new Array();
				$(this).find("cell").each(function(){
					result[i-1].push($(this).text());
				});
			});
		}
	});
	return result;
}


/**********************************************************************
function name:    fetchMultiValue
function:         fetchMultiValue(key,dss,param),通过SQL语句取回多个值，返回值 N*1 数组

parameters:       key:要请求的的SQL语句在配置文件中的键值
                  dss:数据源编号,0为宽带的 mysql数据源，1-7为固话的sqlServer数据源，具体查看函数identifyDs
                  param为需要的参数,格式为"&param1=value1&param2=value2";
                  
return:           能取到值时返回取到的值的 N*1 多维数据，否则返回没有值的一维数据

description:      从数据库中取多值 N*1 数组，其值为key查询的结果集中的第一列数据，通用
**********************************************************************/
function fetchMultiValue(key,dss,param)
{
	var result = new Array();
	var configFile = arguments[3];
	if(configFile==undefined)
	{
		configFile = dss?'mssql':'mysql';
	}
	
	var urlMm = tsd.buildParams({ packgname:'service',
				clsname:'ExecuteSql',//类名
				method:'exeSqlData',//方法名
				ds:identifyDs(dss),
				tsdcf:configFile,//指向配置文件名称
				tsdoper:'query',//操作类型 
				datatype:'xml',//返回数据格式 
				tsdpk:key
				});
	//alert(urlMm +"_"+param);
	$.ajax({
		url:"mainServlet.html?" + urlMm + param,
		async:false,
		cache:false,
		timeout:1000,
		type:'post',
		success:function(xml){
			$(xml).find("row").each(function(){
				$(this).find("cell:first").each(function(){
					result.push($(this).text());
				});
			});
		}
	});
	
	return result;
}

/**********************************************************************
function name:    fetchMultiKVValue
function:         fetchMultiKVValue(key,dss,param),通过SQL语句取回多个值，返回带键值的 N*1 数组

parameters:       key:要请求的的SQL语句在配置文件中的键值
                  dss:数据源编号,0为宽带的 mysql数据源，1-7为固话的sqlServer数据源，具体查看函数identifyDs
                  param为需要的参数,格式为"&param1=value1&param2=value2";
                  key_val:键值数组,第一列为键名，第二列为值名
                  
return:           能取到值时返回取到的值的多维数据，否则返回没有值的一维数据

description:      通过SQL语句取回多个值，返回带键值的数组，通用
**********************************************************************/
function fetchMultiKVValue(key,dss,param,key_val)
{
	var result = new Array();
	var configFile = arguments[4];
	if(configFile==undefined)
	{
		configFile = dss?'mssql':'mysql';
	}
	
	var urlMm = tsd.buildParams({ packgname:'service',
				clsname:'ExecuteSql',//类名
				method:'exeSqlData',//方法名
				ds:identifyDs(dss),
				tsdcf:configFile,//指向配置文件名称
				tsdoper:'query',//操作类型 
				datatype:'xmlattr',//返回数据格式 
				tsdpk:key
				});
	//alert(urlMm +"_"+param);
	$.ajax({
		url:"mainServlet.html?" + urlMm + param,
		async:false,
		cache:false,
		timeout:1000,
		type:'post',
		success:function(xml){
			$(xml).find("row").each(function(){
				var arr_key = $(this).attr(key_val[0]);
				var arr_val = $(this).attr(key_val[1]);
				result[arr_key] = arr_val;				
			});
		}
	});	
	return result;
}

/**********************************************************************
function name:    fetchParsedFieldAlias
function:         fetchParsedFieldAlias(key,dss,param,key_val),通过SQL语句取回多个值，返回带键值的 N*1 数组

parameters:       key:要请求的的SQL语句在配置文件中的键值
                  dss:数据源编号,0为宽带的 mysql数据源，1-7为固话的sqlServer数据源，具体查看函数identifyDs
                  param为需要的参数,格式为"&param1=value1&param2=value2";
                  lan:语言参数
                  key_val:键值数组,第一列为键名，第二列为值名
                  
return:           能取到值时返回取到的值的多维数据，否则返回没有值的一维数据

description:      通过SQL语句取回多个值，返回带键值的数组，通用
**********************************************************************/
function fetchParsedFieldAlias(key,dss,param,lan,key_val)
{
	var result = new Array();
	var configFile = arguments[5];
	if(configFile==undefined)
	{
		configFile = dss?'mssql':'mysql';
	}
		
		var urlMm = tsd.buildParams({ packgname:'service',
					clsname:'ExecuteSql',//类名
					method:'exeSqlData',//方法名
					ds:identifyDs(dss),
					tsdcf:configFile,//指向配置文件名称
					tsdoper:'query',//操作类型 
					datatype:'xmlattr',//返回数据格式 
					tsdpk:key
					});
		//alert(urlMm +"_"+param);
		$.ajax({
			url:"mainServlet.html?" + urlMm + param,
			async:false,
			cache:false,
			timeout:1000,
			type:'post',
			success:function(xml){
				$(xml).find("row").each(function(){
					var arr_key = $(this).attr(key_val[0].toLowerCase());
					var arr_val = getCaption($(this).attr(key_val[1].toLowerCase()),lan,$(this).attr(key_val[1].toLowerCase()));
					result[arr_key] = arr_val;
					
				});
			}
		});			
		return result;
}


/**********************************************************************
function name:    fetchFieldAlias
function:         fetchFieldAlias(tablename,lan),通过表名和语言标志取别名，返回带键值的 N*1 数组

parameters:       tablename:要取别名的表
                  lan:语言标志
                  
return:           能取到值时返回取到的值的多维数据，否则返回没有值的一维数据

description:      通过表名取字段别名，返回带键值的数组，通用
**********************************************************************/
function fetchFieldAlias(tablename,lan)
{
	var res = fetchParsedFieldAlias("main.fetchInfo",6,"&table="+tablename,lan,["Field_Name","Field_Alias"]);	
	return res;
}

/**********************************************************************
function name:    fetchMultiValue
function:         fetchMultiValue(key,dss,param),通过SQL语句取回多个值，返回值 N*M 数组

parameters:       key:要请求的的SQL语句在配置文件中的键值
                  dss:数据源编号,0为宽带的 mysql数据源，1-7为固话的sqlServer数据源，具体查看函数identifyDs
                  param为需要的参数,格式为"&param1=value1&param2=value2";
                  
return:           能取到值时返回取到的值的 N*M 多维数据，否则返回没有值的一维 1*0 数据

description:      从数据库中取多值 N*M 数组，其值为key查询的结果集的所有数据，通用
**********************************************************************/
function fetchMultiArrayValue(key,dss,param)
{
	var result = new Array();
	var i = 0;
	var j = 0;
	var configFile = arguments[3];
	if(configFile==undefined)
	{
		configFile = dss?'mssql':'mysql';
	}
	
	var urlMm = tsd.buildParams({ packgname:'service',
				clsname:'ExecuteSql',//类名
				method:'exeSqlData',//方法名
				ds:identifyDs(dss),
				tsdcf:configFile,//指向配置文件名称
				tsdoper:'query',//操作类型 
				datatype:'xml',//返回数据格式 
				tsdpk:key
				});
	//alert(urlMm +"_"+param);
	$.ajax({
		url:"mainServlet.html?" + urlMm + param,
		async:false,
		cache:false,
		timeout:1000,
		type:'post',
		success:function(xml){
			$(xml).find("row").each(function(){
				result[i++] = new Array();
				$(this).find("cell").each(function(){
					result[i-1].push($(this).text());
				});
			});
		}
	});
	
	return result;
}

/**********************************************************************
function name:    executeNoQuery
function:         executeNoQuery(key,dss,param),通过SQL语句执行删除和修改操作

parameters:       key:要请求的的SQL语句在配置文件中的键值
                  dss:数据源编号,0为宽带的 mysql数据源，1-7为固话的sqlServer数据源，具体查看函数identifyDs
                  param:为需要的参数,格式为"&param1=value1&param2=value2";
                  
return:           成功时返回true,失败时返回"false"或false;

description:      通过SQL语句执行删除和修改操作，执行key查询，通用
**********************************************************************/
function executeNoQuery(key,dss,param)
{
	var result = false;
	var configFile = arguments[3];
	if(configFile==undefined)
	{
		configFile = dss?'mssql':'mysql';
	}
	var urll = tsd.buildParams({ packgname:'service',
				clsname:'ExecuteSql',//类名
				method:'exeSqlData',//方法名
				ds:identifyDs(dss),
				tsdcf:configFile,//指向配置文件名称
				tsdoper:'exe',//操作类型 
				datatype:'xml',//返回数据格式 
				tsdpk:key
				});
	$.ajax({
		url:"mainServlet.html?" + urll + param,
		async:false,
		cache:false,
		timeout:1000,
		type:'post',
		success:function(xml){result = xml;}		
	});
	return result;
}

/**********************************************************************
function name:    executeNoQueryProc
function:         executeNoQueryProc(key,dss,param),通过SQL语句执行无返回的存储过程

parameters:       key:要请求的的SQL语句在配置文件中的键值
                  dss:数据源编号,0为宽带的 mysql数据源，1-7为固话的sqlServer数据源，具体查看函数identifyDs
                  param:为需要的参数,格式为"&param1=value1&param2=value2";
                  
return:           成功时返回true,失败时返回"false"或false;

description:      通过SQL语句执行无返回的存储过程，执行key查询，通用
**********************************************************************/
function executeNoQueryProc(key,dss,param)
{
	var result = false;
	var urll = tsd.buildParams({ packgname:'service',
				clsname:'Procedure',//类名
				method:'exequery',//方法名
				ds:identifyDs(dss),
				tsdExeType:'exe',//操作类型 
				datatype:'xml',//返回数据格式 
				tsdpname:key
				});
	$.ajax({
		url:"mainServlet.html?" + urll + param,
		async:false,
		cache:false,
		timeout:1000,
		type:'post',
		success:function(xml){result = xml;}		
	});
	return result;
}

/**********************************************************************
function name:    loadData
function:         loadData(tablename,language,index,OperationName),加载页面所需的表的别名信息

parameters:       tablename:表名
                  language:语言标志，英文时为en,中文为zh
                  index:grid所需操作列的位置,1为第一列为操作列，0为最后一列为操作列，2为无操作列
                  OperationName:Grid操作列标题，默认为操作，当OperationName不为空时显示为OperationName
                  
return:           返回一个对象，其中键FieldName为取得的字段名称的数组
                                      FieldAlias为字段别名的数组
                                      DataType为字段数据类型的数组
                                      colNames为操作列和字段别名的数组，用于jqGrid的列标头，即jqGrid的colNames
                                      colModels为操作列和字段的对象数组，用于jqGrid的列信息，即jqGrid的colModel
                                      getFieldAliasByFieldName(fname),根据列名取列别名，无别名时返回"无别名"
                                      setWidth(obj),设置列宽度，obj格式为{列名:宽度},如{id:120}
                                      setHidden(obj),设置隐藏列，obj格式为[列名,列名,列名],如[id1,id2,id3]

description:      加载页面所需的表的别名信息，通用，主要胜于jqGrid的colNames和colModel获取,例:PhoneHuafeiInformation.jsp
**********************************************************************/
function loadData(tablename,language,index,OperationName)
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
		var res = fetchMultiArrayValue("main.fetchInfoLimit",6,"&table="+tablename);
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

		this.ShowWidth = [];
		
		this.AliasKeyVal = fetchFieldAlias(tablename,language);
		
		var temp = "";
		
		for(var i=0;i<zidx;i++)
		{
			//列名
			FieldName.push(res[i][0]);
			
			//数据类型
			DataType.push(res[i][2]);

			ShowWidth.push(res[i][3]);

			//获取操作列名字段信息
			temp = getCaption(res[i][1],language,res[i][1]);
			//别名
			FieldAlias.push(temp);
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
				colNames.unshift(OperationName==undefined?"操作":OperationName);
				//设置第一最后一列为操作列
				temp = "{name:'viewOperation',index:'viewOperation',width:100}";
				colModels.unshift(eval("(" + temp + ")"));
			}
			else if(index==0)
			{
				colNames.push(OperationName==undefined?"操作":OperationName);
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
		gridData.ShowWidth = ShowWidth;
		
		//根据字段名取别名
		gridData.getFieldAliasByFieldName=function(fname)
		{/*
			var idx = $.inArray(fname,gridData.FieldName);			
			if(idx==-1)
			{
				return "无列名";
			}
			else
			{
				return gridData.FieldAlias[idx];
			}*/
			return (AliasKeyVal==undefined || AliasKeyVal[fname]==undefined)?"无列名":AliasKeyVal[fname];
		}
		
		//根据字段名设置宽度
		/*gridData.setWidth=function(obj)
		{
			$.each(obj,function(i,n){
				
				var idx = $.inArray(i,gridData.FieldName);				
				
				if(idx!=-1)
				{
					if(index==1)
					{
						idx += 1;
					}
					gridData.colModels[idx].width = n;
				}
			});
		}*/
		
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


/**********************************************************************
function name:    identifyDs
function:         identifyDs(dss),解析数字为数据源名称

parameters:       dss:数据源编号,0为宽带的 mysql数据源，1-7为固话的sqlServer数据源
                             0   宽带认证服务器：broadband（MYSQL radius）
                             1   营收服务器：tsdCharge（MSSQL telcount2009）   
                             2   分拣服务器：tsdCDR（MSSQL telcount2009）   
                             3,4,5   详单服务器：tsdBill tsdLog tsdHis（MSSQL telcount2009 telcount2009log telcount2009his）    
                             6   计费服务器：tsdBilling（MSSQL telcount2009）
                             7   报表工单服务器：tsdReport（MSSQL telcount2009）
                  
return:           返回数据源名称

description:      解析数字为数据源名称，本js文件取值所需
**********************************************************************/
function identifyDs(dss)
{
	switch(dss)
	{
		case 0:
			return "broadband";
			break;
		case 1:
			return "tsdCharge";
			break;
		case 2:
			return "tsdCDR";
			break;
		case 3:
			return "tsdBill";
			break;
		case 4:
			return "tsdLog";
			break;
		case 5:
			return "tsdHis";
			break;
		case 6:
			return "tsdBilling";
			break;
		case 7:
			return "tsdReport";
			break;
		case 8:
			return "tsdradius";
			break;
		default:
			return "";
			break;		
	}
}



/**********************************************************************
function name:    genNavv
function:         genNavv(),取导航栏信息

parameters:       无
                  
return:           导航栏信息，格式为 一级模块名 >>> 页面名

description:      取导航栏信息，格式为 一级模块名 >>> 页面名,通用
                           页面调用时：$("#navBar").append(genNavv());
                           原始navBar为:
                           	<div id="navBar" style="font-size:14px;">
                           		<img src="style/icon/dot11.gif" />
                           		<fmt:message key="global.location" />:
                           	</div>
**********************************************************************/
function genNavv()
{
	var navv = document.location.search;
	var infoo = "";
	
	//infoo += '<img src="style/icon/dot11.gif" />';
	//infoo += '<fmt:message key="global.location" />:&nbsp;&nbsp;';
			
	infoo += decodeURIComponent(parseUrl(navv,"pmenuname",""));
	infoo += "&nbsp;&nbsp;&gt;&gt;&gt;&nbsp;&nbsp; ";
	infoo += decodeURIComponent(parseUrl(navv,"imenuname",""));
	
	return infoo;
}


/**********************************************************************
function name:    parseUrl
function:         parseUrl(str,tagBegin,defaultVal)

parameters:       str:要解析的字符串，格式为:url?param1=value1&param2=value2
                  tagBegin:要取值的名称，如:param1
                  defaultVal:取不到值的默认返回值
                  
return:           返回取到的tagBegin的值

description:      解析str并返回需要取的值
**********************************************************************/
function parseUrl(str,tagBegin,defaultVal)
{
	
	var idxB='';
	
	idxB = str.indexOf("?"+tagBegin+"=");
	if(idxB==-1){
		idxB = str.indexOf("&"+tagBegin+"=");		
	}
	var idxE = str.indexOf("&",idxB+1);
	if(idxB==-1)
	{		
		return defaultVal;
	}
	else
	{
		if(idxE==-1)
		{
			return str.substring(idxB + tagBegin.length + 2);
		}
		else
		{
			return str.substring(idxB + tagBegin.length + 2,idxE);
		}
	}
}

/**********************************************************************
function name:    fetchAttrArray
function:         fetchAttrArray(key,dss,param)，取arr指定列的值

parameters:       key:要请求的的SQL语句在配置文件中的键值
                  dss:数据源编号,0为宽带的 mysql数据源，1-7为固话的sqlServer数据源，具体查看函数identifyDs
                  param:为需要的参数,格式为"&param1=value1&param2=value2";
                  
return:           成功时返回true,失败时返回"false"或false;

description:      通过SQL语句执行删除和修改操作，执行key查询，通用
**********************************************************************/
function fetchAttrArray(key,dss,param,arr)
{
	var result = new Array();
	var i = 0;
	var j = 0;
	var configFile = arguments[4];
	if(configFile==undefined)
	{
		configFile = dss?'mssql':'mysql';
	}
	var urlMm = tsd.buildParams({ packgname:'service',
				clsname:'ExecuteSql',//类名
				method:'exeSqlData',//方法名
				ds:identifyDs(dss),
				tsdcf:configFile,//指向配置文件名称
				tsdoper:'query',//操作类型 
				datatype:'xmlattr',//返回数据格式 
				tsdpk:key
				});
	//alert(urlMm +"_"+param);
	$.ajax({
		url:"mainServlet.html?" + urlMm + param,
		async:false,
		cache:false,
		timeout:1000,
		success:function(xml){
			$(xml).find("row").each(function(){
				result[i++] = new Array();
				$.each(arr,function(i,n){
					result[i-1].push($(this).attr(n));
				});
			});
		}
	});
	
	return result;
}
/**********************************************************************
function name:    printWithoutPreview
function:         printWithoutPreview(reportname,paramvalue)

parameters:       reportname:报表文件的文件名
                  paramvalue:报表文件中定义的参数，如报表文件中定义了参数param1,param2,需传参数为value1,value2,则paramvalue为:param1_value1_param2_value2
                  页面需添加一个iframe,不应该被包含有其它隐藏的元素中
                  <iframe id="printReportDirect"  style="width:120px;height:0px;visibility:visible" src="print.jsp"></iframe>
                  
return:           成功时返回true,失败时返回"false"或false;

description:      通过SQL语句执行删除和修改操作，执行key查询，通用
**********************************************************************/
function printWithoutPreview(reportname,paramvalue)
{
	document.getElementById('printReportDirect').contentWindow.RepPri(reportname,paramvalue);
}

function gobackInNavbar(navBar)
{
	$("#" + navBar).append("<span id=\"goback\">返回</span>");		
	$("#goback").css({position:"absolute",top:"0px",right:"0px","font-size":"12px"}).click(function(){
		history.go(-1);
	}).hover(function(){
		$(this).css({"text-decoration":"underline","cursor":"pointer"});
	},function(){
		$(this).css({"text-decoration":"none","cursor":"none"});
	});
}   


/**********************************************************************
function name:    getretdescript
function:         getretdescript(params,paramss,byparmto,parmto,languageType)

parameters:       params:存储过程名,
                  paramss:存储过程返回的标识,
                  byparmto:被替换的字符串变量,
                  parmto:要替换的字符串变量,
                  languageType:返回的国际化
                  
return:           返回res为要提示的字符串

description:      通过各项参数来获取存储过程返回procreturn表里提示值的提示信息
**********************************************************************/
	 function getretdescript(params,paramss,byparmto,parmto,languageType)
	 {
	 	var res;
	 	var urlstr=tsd.buildParams({packgname:'service',//java包
						 					clsname:'ExecuteSql',//类名
						 					method:'exeSqlData',//方法名
						 					ds:'tsdBilling',//数据源名称 对应的WEB-INF/classes/ApplicationContent.xml中配置的数据源
						 					tsdcf:'mssql',//指向配置文件名称
						 					tsdoper:'query',//操作类型 
						 					datatype:'xmlattr',
						 					tsdpk:'backstore.getretdescript'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
						 				});						
           $.ajax({
	            url:'mainServlet.html?'+urlstr+'&procname='+params+"&rettag="+paramss+"&byreplaceto="+byparmto+"&toreplace="+parmto,
	            datatype:'xml',
	            cache:false,//如果值变化可能性比较大 一定要将缓存设成false
	            timeout: 1000,
	            async: false ,//同步方式
	            success:function(xml){
	               $(xml).find('row').each(function(){
	                  var retdescript = $(this).attr("resretdescript");
	                  res = getCaption(retdescript,languageType,"");
			       });
			    }
			});
		return res==undefined?paramss:res;			
	 }
	 
	 
	 
	 
	 /////地址选择
	function c_p_address_fun_New(control,topp,leftt,area,add,extract)
	{		 	     
		if($("#c_p_address").size()<1)
		{
			$("body").append("<div id=\"c_p_address\"></div>");
		}
		
		var top = (topp == null || topp == undefined)? 100 : topp;
		
		var left = (leftt == null || leftt == undefined)? 20 : leftt;
		
		$("#c_p_address").css({'position':'absolute','left':left,'top':top,'background-color':'#FFFFFF','border':'#99ccff 1px solid'});
		$("#c_p_address").empty();		
		var address_tab="";
		
		address_tab += "<div class=\"neirong\" id=\"address_tabn\" style=\"width:720px;\">";
		address_tab += "<div class=\"top\">";
		//添加隐藏信息
		address_tab += "<span id=\"c_p_address_control\" style=\"display:none;\">";
		address_tab += control;
		address_tab += "</span>";
		address_tab += "<span id=\"c_p_address_extract\" style=\"display:none;\">";
		address_tab += extract;
		address_tab += "</span>";
		address_tab += "<div class=\"top_01\" id=\"thisdrag\">";
		
		
		address_tab += "<div class=\"top_01left\">";
		address_tab += "<div class=\"top_02\">";
		address_tab += "<img src=\"image/neibut01.gif\" />";
		address_tab += "</div>";
		address_tab += "<div class=\"top_03\" id=\"titlediv\">";
		address_tab += "添加地址";
		address_tab += "</div>";
		address_tab += "<div class=\"top_04\">";
		address_tab += "<img src=\"image/neibut03.gif\" />";
		address_tab += "</div>";
		address_tab += "</div>";
		
		address_tab += "<div class=\"top_01right\">";
		address_tab += "<a href=\"javascript:;\" onclick=\"javascript:$('#c_p_address_bncancel').click();\">关闭</a>";
		address_tab += "</div>";
		
		address_tab += "</div>";
		address_tab += "<div class=\"top02right\">";
		address_tab += "<img src=\"image/toptiaoright.gif\" />";
		address_tab += "</div>";	
		address_tab += "</div>";
			
		address_tab += "<div class=\"midd\" style=\"background-color:#FFFFFF;text-align:left;overflow-x:hidden;width:100%\">";
					
		
		address_tab += "<table id=\"address_tabb\" style=\"\">";
		address_tab += "<tr><td align=\"right\"";
		if(area==false)
		{
			address_tab += " style=\"display:none\"";
		}
		address_tab += ">区域</td><td";
		if(area==false)
		{
			address_tab += " style=\"display:none\"";
		}
		address_tab += "><select id=\"c_p_address_seluserarea\"><option value=\"\">--请选择--</option></select></td>";
		address_tab += "<td>小区号</td><td><select id=\"c_p_address_xq\"><option value=\"\">--请选择--</option></select></td><td>楼栋号</td><td><select id=\"c_p_address_ld\"><option value=\"\">--请选择--</option></select></td><td>单元号</td><td><select id=\"c_p_address_dy\"><option value=\"\">--请选择--</option></select></td><td>门牌号</td><td><select id=\"c_p_address_mp\"><option value=\"\">--请选择--</option></select></td></tr>";
		address_tab += "</table>";
		
		
		address_tab += "</div>";
			
		address_tab += "<div class=\"midd_butt\" style=\"width:100%\">";				
		
		address_tab += "<button type=\"button\" class=\"tsdbutton\" id=\"c_p_address_bnok\">";
		address_tab += "确定";
		address_tab += "</button>";
		
		address_tab += "<button type=\"button\" class=\"tsdbutton\" id=\"c_p_address_bncancel\">";
		address_tab += "关闭";
		address_tab += "</button>";
		
		if(add==true)
		{
			address_tab += "<button type=\"button\" class=\"tsdbutton\" onclick=\"window.showModalDialog('mainServlet.html?pagename=line/addressManage.jsp&imenuid=1085&pmenuname=号线管理 &imenuname=地址库管理&groupid="+$("#zid").val()+"',window,'dialogWidth:820px; dialogHeight:650px; center:yes; scroll:yes')\">";
			address_tab += "增加";
			address_tab += "</button>";
		}
		
		address_tab += "</div>"; 
		address_tab += "</div>";

		$("#c_p_address").append(address_tab);
		
		$("#address_tabn").draggable({handle:"#thisdrag"});
		getuserareato();							
		var cpad = $("#c_p_address_addright").val();
		if(cpad=="true"){
		  $("#c_p_address_add").removeAttr("disabled");		  		  	  
		}
		$("select[id^='c_p_address_']").css("width","100px");		
		//c_p_bindToAddr(1,"c_p_address_xq","");
		var sua = $("select[id='c_p_address_seluserarea'] :selected").html();
		c_p_bindToAddr(1,"c_p_address_xq","&addrarea=" + tsd.encodeURIComponent(sua));
				
		//获得焦点时显示
		//autoBlockForm("c_p_address",top,"c_p_address_bncancel","#FFFFFF",false);
		$("#c_p_address").show("slow");

		//修改区域后触发
		$("#c_p_address_seluserarea").change(function(){
			var sua = $("select[id='c_p_address_seluserarea'] :selected").html();
			c_p_bindToAddr(1,"c_p_address_xq","&addrarea=" + tsd.encodeURIComponent(sua));
		});
		//选择小区后更新楼栋数据
		$("#c_p_address_xq").change(function(){
			//alert($("#c_p_address_xq").val()); 
			var addr = $("#c_p_address_xq").val();
			if(addr!="")
			{
				c_p_bindToAddr(2,"c_p_address_ld","&addr=" + $("#c_p_address_xq").val());
			}
		});
		//选择楼栋后更新单元数据
		$("#c_p_address_ld").change(function(){
			//alert($("#c_p_address_xq").val()); 
			var addr = $("#c_p_address_ld").val();
			if(addr!="")
			{
				c_p_bindToAddr(3,"c_p_address_dy","&addr=" + $("#c_p_address_ld").val());
			}
		});
		//选择单元后更新门牌数据
		$("#c_p_address_dy").change(function(){
			//alert($("#c_p_address_xq").val()); 
			var addr = $("#c_p_address_dy").val();
			if(addr!="")
			{
				c_p_bindToAddr(4,"c_p_address_mp","&addr=" + addr);
			}
		});
		
		$("#c_p_address_bnok").click(function(){
			
			var info = "";
			var errinfo = "";
			
			var elems = ['xq','ld','dy','mp'];
			var infoo = ['小区号','楼栋号','单元号','门牌号'];
			
			for(var j=0;j<4;j++)
			{
				if($("#c_p_address_"+elems[j]).val() != "")
				{
					info += $("select[id='c_p_address_"+elems[j]+"'] :selected").html();
					info += ",";
					
					if($("#c_p_address_extract").text()=="true" && j<3 && $("#c_p_address_"+elems[j+1]).val() == "")
					{
						errinfo = "请选择" + infoo[j+1];
					}
				}
			}
			
			if(errinfo!="")
			{
				alert(errinfo);
			}
			else
			{
				info = info.replace(new RegExp(",","g"),"");
				
				if(info=="")
				{
					alert("请选择地址");
					$("#c_p_address_xq").focus();
				}
				else
				{
					//返回 地址写入查询框
					$("#" + $("#c_p_address_control").text()).val(info);
					//关闭面板
					$("#c_p_address").hide('slow');
					
					$("#" + $("#c_p_address_control").text()).select();
					$("#" + $("#c_p_address_control").text()).focus();
				}
				$("#c_p_address_bncancel").click();
			}			
			
		});
		
		$("#c_p_address_bncancel").click(function(){
			//关闭面板
			$("#c_p_address").hide('slow');
		});
	}
	
	var resto="";
	function c_p_bindToAddr(idx,selid,param)
	{
	    var userarea = $("#userareaid").val();
		var res = fetchMultiArrayValue("AddressBox.query"+idx,6,param+"&addrarea="+tsd.encodeURIComponent(userarea));
		var elems = ['xq','ld','dy','mp'];
		//alert(res[0] == undefined + ":" + res[0][0] == undefined);
		resto=res[0][0];
		if(res[0] == undefined || res[0][0] == undefined || res[0] == "")
		{
			for(var j=idx;j<=4;j++)
			{
				$("#c_p_address_"+elems[j-1]).empty();
				$("#c_p_address_"+elems[j-1]).append("<option value=\"\">--请选择--</option>");
			}
			
			return false;
		}
		$("#"+selid).empty();
		$("#"+selid).append("<option value=\"\">--请选择--</option>");
		
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
			$("#c_p_address_"+elems[j-1]).append("<option value=\"\">--请选择--</option>");
		}
	}
	
 //选择用户所在区域     
      function getuserareato()
      {
         var uareato="";            
         var urlstr=tsd.buildParams({packgname:'service',//java包
			 					clsname:'ExecuteSql',//类名
			 					method:'exeSqlData',//方法名
			 					ds:'tsdBilling',//数据源名称 对应的WEB-INF/classes/ApplicationContent.xml中配置的数据源
			 					tsdcf:'mssql',//指向配置文件名称
			 					tsdoper:'query',//操作类型 
			 					datatype:'xmlattr',
			 					tsdpk:'adduser.getuserarea'//执行的主Sql语句的配置名，应选取tsdcf中配置的文件里指定
			 				});										
		$.ajax({
			url:'mainServlet.html?'+urlstr,
			datatype:'xml',
			cache:false,//如果值变化可能性比较大 一定要将缓存设成false
			timeout: 1000,
			async: false ,//同步方式
			success:function(xml){	
				uareato="";
				$("#c_p_address_seluserarea").empty();			       
				$(xml).find('row').each(function(){	
					var xuhao = $(this).attr("Xuhao");
					var ywarea = $(this).attr("YwArea");
					if(ywarea!=undefined){
						var ee="<option value='"+xuhao+"' "+ (ywarea==$("#userareaid").val()?" selected='selected' ":"") +">"+ywarea+"</option>";
						uareato=uareato+ee;								       
					}
				 });							        				       						        
				$("#c_p_address_seluserarea").html(uareato);					       
			}
		});
	}
	
	//计算带宽
	function calBSpeed(speed)
	{
		if(speed.toUpperCase().indexOf("PPPOE")==0)
		{
			return speed.toUpperCase().replace("PPPOE","");
		}
		else
		{
			speed = parseInt(speed,10);
			return (speed/1024000)+"M";
		}	
	}