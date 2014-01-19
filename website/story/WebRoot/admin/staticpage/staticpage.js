/***********************************************************
		        file name:       userManage.js
				author:          youhongyu 
				create date:     2010-10-5          
				description:
				modify:			 
 ********************************************************

 ***************打开保存面板*************
 ************************************/
function updateIndex() {

	$.ajax( {
		url : '../../staticpage/updateIndex.action',
		datatype : 'json',
		cache : false,//如果值变化可能性比较大 一定要将缓存设成false
		timeout : 1000,
		async : false,//同步方式
		success : function(json) {

			if ("true" == json) {
				alert("成功生成首页");
			} else {
				alert("生成首页失败，请检查原因");
			}

		}
	});
}

/**
 * 调用后台，手工生成Lucene索引的ajax
 */
function manualGenerateLuceneIndex() {
	$.ajax( {
		url : '../../search/manualindex.action',
		datatype : 'json',
		cache : false,//如果值变化可能性比较大 一定要将缓存设成false
		timeout : 1000,
		async : false,//同步方式
		success : function(json) {

			if ("true" == json) {
				alert("成功生成查询索引");
			} else {
				alert("生成查询索引失败，请检查原因");
			}

		}
	});
}
