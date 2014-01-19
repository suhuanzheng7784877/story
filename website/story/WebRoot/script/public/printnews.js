var NewsTime = 5000; //每条新闻的停留时间
var TextTime = 100;  //新闻标题文字出现等待时间，越小越快

var newsi = 0;
var txti = 0;
var txttimer;
var newstimer;

function shownew(str,newshref)
{
 
 var newstitle = new Array(); //新闻标题
 var newshref = new Array();  //新闻链接
 newstitle[0] = str;
 newshref[0] =newshref;

 var endstr = '_'
 hwnewstr = newstitle[newsi];
 newslink = newshref[newsi];
 if(txti==(hwnewstr.length-1)){endstr='';}
 if(txti>=hwnewstr.length){
  clearInterval(txttimer);
  clearInterval(newstimer);
  newsi++;
  if(newsi>=newstitle.length){
   newsi = 0
  }
  newstimer = setInterval('shownew()',NewsTime);
  txti = 0;
  return;
 }
 clearInterval(txttimer);
 document.getElementById('HotNews').href=newslink;
 document.getElementById('HotNews').innerHTML = hwnewstr.substring(0,txti+1)+endstr;
 txti++;
 txttimer = setInterval('shownew()',TextTime);
}