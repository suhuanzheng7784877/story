
$(function(){
	$("#squerybegindate,#squeryenddate").focus(function(){
		WdatePicker({startDate:'%y-%M-01 00:00:00',dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true});
   	});
});
//简单查询调用的函数，paramDh：每次查询的电话参数或许不一样，paramHth：每次查询的合同号参数或许不一样；busidate：区分是受理日期还是申告日期
function eQuery(paramUserid,paramDh,paramHth,busidate){
	var suserid = $('#squeryuserid').val();
	var sdh = $('#squerydh').val();
	var shth = $('#squeryhth').val();
	var sbegindate = $('#squerybegindate').val();
	var senddate = $('#squeryenddate').val();
	
	var paramval = ' 1=1 '
	//(1=1 and  Xdh = '5879424')
	if(suserid != ''){
		paramval += " and "+paramUserid+" = '"+ suserid + "'";
	}
	if(sdh != ''){
		paramval += " and "+paramDh+" = '"+ sdh + "'";
	}
	if(shth != ''){
		paramval += " and "+paramHth+" = '"+ shth + "'";
	}
	if(sbegindate != '' && senddate == ''){
		alert('请选择结束日期');
		$('#squeryenddate').focus();
		return false;
	}
	if(sbegindate == '' && senddate != ''){
		alert('请选择起始时间');
		$('#squerybegindate').focus();
		return false;
	}
	if(sbegindate != '' && senddate!=''){
		//paramval += " and to_char("+busidate+",'yyyy-MM-dd') = '"+ sdate + "'";
		paramval += " and "+busidate+" BETWEEN to_date('"+ sbegindate + "','yyyy-MM-dd') AND to_date('"+senddate+"','yyyy-MM-dd')";
	}
	$('#fusearchsql').val('('+paramval+')');
	fuheQuery();
}



