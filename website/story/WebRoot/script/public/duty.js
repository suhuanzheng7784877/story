$(function(){
	getUserPower();
});
//随机生成颜色
function randomClr()
{
        var nums=['0','3','6','9','C','F'];
        var clr='#';
        for(var i=0;i<6;i++)
        {
                var n=Math.round(Math.random()*10)%6;
                clr=clr + nums[n];                
        }
        return clr;
}
//打印报表
function printReport(basePath,rptName){
	var reportname = rptName
	var params = $('#tsdreportparams').val();//报表统计参数
	var urll = params+"&"+new Date().getTime();
	//params = '&rptparams='+params.replace(/&/g,';');
	//alert(params);
	var basepath = basePath+'ReportServer?reportlet=/com/tsdreport/commonreport/'+reportname+'.cpt'+params+"&______" + new Date();
   	window.open(basepath);
}