/*
 * jqGrid extension for manipulating Grid Data
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 */
;(function(a){a.fn.extend({editRow:function(k,r,h,t,n,u,s,v){return this.each(function(){var b=this,j,p,c,i=0,g=null,o=[];if(!b.grid){return}var w,q,l;if(!b.p.multiselect){c=a("#"+k,b.grid.bDiv).attr("editable")||"0";if(c=="0"){a('#'+k+' td',b.grid.bDiv).each(function(d){j=b.p.colModel[d].name;l=b.p.colModel[d].hidden===true?true:false;try{p=a.unformat(this,{colModel:b.p.colModel[d]},d)}catch(_){p=a.htmlDecode(a(this).html())}o[j]=p;if(j!=='cb'&&j!=='subgrid'&&b.p.colModel[d].editable===true&&!l){if(g===null){g=d}a(this).html("");var m=a.extend(b.p.colModel[d].editoptions||{},{id:k+"_"+j,name:j});if(!b.p.colModel[d].edittype){b.p.colModel[d].edittype="text"}var f=createEl(b.p.colModel[d].edittype,m,p,a(this));a(f).addClass("editable");a(this).append(f);if(b.p.colModel[d].edittype=="select"&&b.p.colModel[d].editoptions.multiple===true&&a.browser.msie){a(f).width(a(f).width())}i++}});if(i>0){o['id']=k;b.p.savedRow.push(o);a('#'+k,b.grid.bDiv).attr("editable","1");a('#'+k+" td:eq("+g+") input",b.grid.bDiv).focus();if(r===true){a('#'+k,b.grid.bDiv).bind("keydown",function(d){if(d.keyCode===27){a(b).restoreRow(k)}if(d.keyCode===13){a(b).saveRow(k,t,n,u,s,v);return false}d.stopPropagation()})}if(typeof h==="function"){h(k)}}}}})},saveRow:function(h,t,n,u,s,v){return this.each(function(){var c=this,i,g={},o={},w,q,l,k;if(!c.grid){return}w=a('#'+h,c.grid.bDiv).attr("editable");n=n?n:c.p.editurl;if(w==="1"&&n){a('#'+h+" td",c.grid.bDiv).each(function(f){i=c.p.colModel[f].name;if(i!=='cb'&&i!=='subgrid'&&c.p.colModel[f].editable===true){if(c.p.colModel[f].hidden===true){g[i]=a(this).html()}else{switch(c.p.colModel[f].edittype){case"checkbox":var b=["Yes","No"];if(c.p.colModel[f].editoptions){b=c.p.colModel[f].editoptions.value.split(":")}g[i]=a("input",this).attr("checked")?b[0]:b[1];break;case'text':case'password':case'textarea':g[i]=htmlEncode(a("input, textarea",this).val());break;case'select':if(!c.p.colModel[f].editoptions.multiple){g[i]=a("select>option:selected",this).val();o[i]=a("select>option:selected",this).text()}else{var j=a("select",this);g[i]=a(j).val();var p=[];a("select > option:selected",this).each(function(d,m){p[d]=a(m).text()});o[i]=p.join(",")}break}l=checkValues(g[i],f,c);if(l[0]===false){l[1]=g[i]+" "+l[1];return false}}}});if(l[0]===false){try{info_dialog(a.jgrid.errors.errcap,l[1],a.jgrid.edit.bClose,c.p.imgpath)}catch(e){alert(l[1])}return}if(g){g["id"]=h;if(u){a.extend(g,u)}}if(!c.grid.hDiv.loading){c.grid.hDiv.loading=true;a("div.loading",c.grid.hDiv).fadeIn("fast");if(n=='clientArray'){g=a.extend(g,o);a(c).setRowData(h,g);a('#'+h,c.grid.bDiv).attr("editable","0");for(var r=0;r<c.p.savedRow.length;r++){if(c.p.savedRow[r].id===h){q=r;break}}if(q>=0){c.p.savedRow.splice(q,1)}if(typeof s==="function"){s(h,res.responseText)}}else{a.ajax({url:n,data:g,type:"POST",complete:function(d,m){if(m==="success"){var f;if(typeof t==="function"){f=t(d)}else f=true;if(f===true){g=a.extend(g,o);a(c).setRowData(h,g);a('#'+h,c.grid.bDiv).attr("editable","0");for(var b=0;b<c.p.savedRow.length;b++){if(c.p.savedRow[b].id===h){q=b;break}};if(q>=0){c.p.savedRow.splice(q,1)}if(typeof s==="function"){s(h,d.responseText)}}else{a(c).restoreRow(h)}}},error:function(d,m){if(typeof v=="function"){v(d,m)}else{alert("Error Row: "+h+" Result: "+d.status+":"+d.statusText+" Status: "+m)}}})}c.grid.hDiv.loading=false;a("div.loading",c.grid.hDiv).fadeOut("fast");a("#"+h,c.grid.bDiv).unbind("keydown")}}})},restoreRow:function(j){return this.each(function(){var d=this,m,f;if(!d.grid){return}for(var b=0;b<d.p.savedRow.length;b++){if(d.p.savedRow[b].id===j){f=b;break}}if(f>=0){a(d).setRowData(j,d.p.savedRow[f]);a('#'+j,d.grid.bDiv).attr("editable","0");d.p.savedRow.splice(f,1)}})}})})(jQuery);