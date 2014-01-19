;(function($){
/**
 * jqGrid Chinese Translation
 * Lun Jun v5.rikugun@gmail.com
 * http://rikugun.javaeye.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.jgrid = {};

$.jgrid.defaults = {
	myZN:"总共",
	recordtext: "条记录",
	loadtext: "读取中...",
	pgtext : "/"
};
$.jgrid.search = {
    caption: "搜索...",
    Find: "查找",
    Reset: "重置",
    odata : ['等于', '不等于', '小于', '小于等于','大于','大于等于', '开始于','结束于','包含' ]
};
$.jgrid.edit = {
    addCaption: "添加记录",
    editCaption: "编辑记录",
    bSubmit: "提交",
    bCancel: "取消",
	bClose: "关闭",
    processData: "处理中...",
    msg: {
        required:"此字段必需",
        number:"请输入有效数字",
        minValue:"输入值必须大于等于",
        maxValue:"输入值必须小于等于",
        email: "这不是有效的e-mail",
        integer: "请输入有效整数值",
		date: "请输入有效日期"
    }
};
$.jgrid.del = {
    caption: "删除",
    msg: "删除所选记录?",
    bSubmit: "删除",
    bCancel: "取消",
    processData: "处理中..."
};
$.jgrid.nav = {
	edittext: " ",
    edittitle: "编辑所选行",
	addtext:" ",
    addtitle: "添加行",
    deltext: " ",
    deltitle: "删除所选行",
    searchtext: " ",
    searchtitle: "查找",
    refreshtext: "",
    refreshtitle: "刷新表格",
    alertcap: "警告",
    alerttext: "请选择行"
};
// setcolumns module
$.jgrid.col ={
    caption: "显示/隐藏行",
    bSubmit: "提交",
    bCancel: "取消"	
};
$.jgrid.errors = {
	errcap : "错误",
	nourl : "没有设置url",
	norecords: "没有要处理的记录",
    model : "Length of colNames <> colModel!"
};
$.jgrid.formatter = {
	integer : {thousandsSeparator: " ", defaulValue: 0},
	number : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, defaulValue: 0},
	currency : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaulValue: 0},
	date : {
		dayNames:   [
			"Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat",
			"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
		],
		monthNames: [
			"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
			"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
		],
		AmPm : ["am","pm","AM","PM"],
		S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th'},
		srcformat: 'Y-m-d',
		newformat: 'd/m/Y',
		masks : {
            ISO8601Long:"Y-m-d H:i:s",
            ISO8601Short:"Y-m-d",
            ShortDate: "n/j/Y",
            LongDate: "l, F d, Y",
            FullDateTime: "l, F d, Y g:i:s A",
            MonthDay: "F d",
            ShortTime: "g:i A",
            LongTime: "g:i:s A",
            SortableDateTime: "Y-m-d\\TH:i:s",
            UniversalSortableDateTime: "Y-m-d H:i:sO",
            YearMonth: "F, Y"
        },
        reformatAfterEdit : false
	},
	baseLinkUrl: '',
	showAction: 'show'
};
// US
// GB
// CA
// AU
})(jQuery);
