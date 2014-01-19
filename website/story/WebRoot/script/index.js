/*****************************************************************
 * name: index.js
 * author: 尤红玉
 * version: 1.0, 2013-2-8
 * description: 
 * modify:
 *				
 *****************************************************************/

/**********************************************************
 function name:   login()
 function:		 
 parameters:     
 return:			 
 description:      
 Date:			 2013-2-8
 ********************************************************/
function login() {

	var l_username = $("#l_username").val();

	var l_password = $("#l_password").val();

	$.ajax( {
		url : 'user/login.action',
		datatype : 'json',
		type : "POST",
		data : {
			name : l_username,
			password : l_password
		},
		cache : false,//如果值变化可能性比较大 一定要将缓存设成false
		timeout : 2000,
		success : function(json) {
			alert(json);

			//json解析方式			
		var obj = eval('(' + json + ')');
		//alert(obj.result);
	}
	});
}
