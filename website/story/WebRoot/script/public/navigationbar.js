/**********************************************************************************
**          *******         ******  *******     **       *****                   **  
**             *            *          *       ** **     *    *                  **
**             *   ******   ******     *      **   **    *****                   ** 
**             *                 *     *     ** *** **   *  *                    **
**             *            ******     *    **       **  *    *                  **
**                                                                               **               
** name:    "WebRoot/script/public/navigationbar.js"                             **
** version: v10.1                                                                ** 
** author:  lvkui                                                                **
** date:    2011-7-22                                                            **
** desc:    页面导航专用js脚本。                                                            **
**          各调用JSP页面只需要将导航条的DIV的ID指定为navBar即可。                          **
** modify:                                                                       ** 
***********************************************************************************/


		//初始化导航栏
function initialBar()
{
	$("#navBar").append(genNavv());
		
	gobackInNavbar("navBar");
		
	if($.browser.mozilla)
	{
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
