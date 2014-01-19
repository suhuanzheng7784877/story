   
/*******************************************************************************************************
        file name:       internationalizatio.js
        author:          wenxuming 
        create date:     2001-01-21          
        description:
*******************************************************************************************************/

/**********************************************************************
function name:    brodbandinter
function:         宽带业务受理国际化字段
parameters:       languageType:国际化中英文    
return:			  
description:      对页面的字段进行国际化操作（所有库里有的字段）
**********************************************************************/   
   function brodbandinter(languageType){     
         var languageType = $("#languageType").val();          
        var res = fetchFieldAlias('radcheck',languageType);
        $("#spanFee5").text(res['Fee5']);//当前费用
        $("#spanAcctStartTime").text(res['AcctStartTime']);//有效日期
        $("#spanAcctStopTime").text(res['AcctStopTime']);//失效日期
        $("#spanidcard").text(res['idcard']);//证件号码
        $("#spanidtype").text(res['idtype']);//证件类型
        $("#spaniFeeType").text(res['iFeeType']);//计费规则
        $("#spaniSimultaneous").text(res['iSimultaneous']);//同时在线数
        $("#spaniStatus").text(res['iStatus']);//用户状态
        $("#spanlinkman").text(res['linkman']);//联系人
        $("#spanlinkphone").text(res['linkphone']);//联系电话
        $("#spanmobile").text(res['mobile']);//移动电话
        $("#spanPauseStartTime").text(res['PauseStartTime']);//申停日期
        $("#spanPauseStopTime").text(res['PauseStopTime']);//复停日期
        $("#spanPayType").text(res['PayType']);//用户类别        
        $("#spanRemainFee").text(res['RemainFee']);//上月余额
        $("#spansAddress").text(res['sAddress']);//用户地址
        $("#spansAddress1").text(res['sAddress']);//用户地址        
        $("#spansBm").text(res['sBm']);//一级部门 
        $("#spansBm2").text(res['sBm2']);//二级部门 
        $("#spansBm3").text(res['sBm3']);//三级部门 
        $("#spansBm4").text(res['sBm4']);//四级部门 
        $("#spansDh").text(res['sDh']);//绑定电话 
        $("#spangetsDh").text(res['sDh']);//绑定电话
        $("#spansDh1").text(res['sDh1']);//用户类型 
        $("#spansDh11").text(res['sDh1']);
        $("#spansDh2").text(res['sDh2']);//用户区域 
        $("#spanspeed").text(res['speed']);//上网宽带 
        $("#spansRegDate").text(res['sRegDate']);//开户日期
        $("#spansRealName").text(res['sRealName']);//用户名称
        $("#spanUserName").text(res['UserName']);//上网帐号
        $("#spangetUserName").text(res['UserName']);//上网帐号2
        $("#spanUserName1").text(res['UserName1']);//MAC地址
        $("#spanValue").text(res['Value']);//上网密码
        $("#spanvlanid").text(res['vlanid']);//绑定vlanid
        $("#spanidaddr").text(res['ipaddr']);//绑定IP
        $("#spandevno").text(res['UserID']);//BAS设备
     }   