(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[70],{VTjl:function(e,t,a){"use strict";var l=a("g09b"),r=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("IzEo");var n=l(a("bx4M"));a("Telt");var i=l(a("Tckk"));a("+BJd");var u,m,d,s=l(a("mr32")),c=l(a("2Taf")),f=l(a("vZ4D")),o=l(a("l4Ni")),g=l(a("ujKo")),E=l(a("MhPg")),p=r(a("q1tI")),y=a("MuoO"),h=a("+n12"),_=l(a("+kNj")),v=a("6LfW"),b=l(a("QyLY")),w=_.default.Description,I=(u=(0,y.connect)(function(e){return{storeApply:e.store}}),u((d=function(e){function t(){var e,a;(0,c.default)(this,t);for(var l=arguments.length,r=new Array(l),n=0;n<l;n++)r[n]=arguments[n];return a=(0,o.default)(this,(e=(0,g.default)(t)).call.apply(e,[this].concat(r))),a.state={bigImage:!1,ShowUrl:null,bigImageyingye:!1,ShowUrlyingye:null},a.tranSchange=function(e){return""!==e?parseFloat(e).toFixed(2):""},a.statusRender=function(e){switch(e){case 1:return p.default.createElement(s.default,{color:"blue"},"\u5f85\u5ba1\u6838");case 2:return p.default.createElement(s.default,{color:"green"},"\u7533\u8bf7\u901a\u8fc7");case 3:return p.default.createElement(s.default,{color:"red"},"\u7533\u8bf7\u9a73\u56de");default:return""}},a}return(0,E.default)(t,e),(0,f.default)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this,t=this.props.storeApply.store,a=null,l=null;a=t.logo?t.logo:"/s/mall/noimage.jpg",l=t.license_image?t.license_image:"/s/mall/noimage.jpg";var r="",u="";return r=t.representative_idcard_front?t.representative_idcard_front:"/s/mall/noimage.jpg",u=t.representative_idcard_back?t.representative_idcard_back:"/s/mall/noimage.jpg",p.default.createElement("div",{className:b.default.main},p.default.createElement(n.default,{title:"\u4f01\u4e1a\u57fa\u672c\u4fe1\u606f",bordered:!1},p.default.createElement("div",{className:b.default.topInfo},p.default.createElement("div",{className:b.default.topInfoLeft},p.default.createElement(i.default,{src:t.headerImgUrl,shape:"circle",size:100,style:{marginLeft:49},onClick:function(){return e.shouBigImage(a)}})),p.default.createElement("div",{className:b.default.topInfoCenter},p.default.createElement("span",null,t.name),p.default.createElement("span",null,"\u4f01\u4e1a\u8054\u7cfb\u7535\u8bdd\uff1a",t.phone,"\u4f01\u4e1a\u90ae\u7bb1\uff1a",t.email),p.default.createElement("span",null,"\u5165\u9a7b\u56ed\u533a\u5730\u5740\uff1a",t.address),p.default.createElement("span",null,"\u4f01\u4e1a\u7b80\u4ecb\uff1a",t.memo))),p.default.createElement("div",{className:b.default.form,style:{marginTop:25}},p.default.createElement(_.default,{title:"",size:"large",col:3,style:{marginBottom:32}},p.default.createElement(w,{term:"\u884c\u4e1a\u7c7b\u522b"},p.default.createElement(v.DicShow,{pcode:"OPER$#enterprise_category_industry",code:[t.category],show:name})),p.default.createElement(w,{term:"\u4f01\u4e1a\u89c4\u6a21"},p.default.createElement(v.DicShow,{pcode:"OPER$#enterprise_scale",code:[t.size],show:name})),p.default.createElement(w,{term:"\u4f01\u4e1a\u7c7b\u578b"},p.default.createElement(v.DicShow,{pcode:"OPER$#company_type",code:[t.company_type],show:name}))),p.default.createElement(_.default,{title:"",size:"large",col:3,style:{marginBottom:32}},p.default.createElement(w,{term:"\u4f01\u4e1a\u8054\u7cfb\u4eba"},t.contacter),p.default.createElement(w,{term:"\u8054\u7cfb\u4eba\u7535\u8bdd"},t.contact_tel)),p.default.createElement(_.default,{title:"",size:"large",style:{marginBottom:32}},p.default.createElement(w,{term:"\u4f01\u4e1a\u5730\u5740"},t.address),p.default.createElement(w,{term:"\u5165\u9a7b\u65f6\u95f4"},(0,h.parseUtcTime)(t.entry_date,"YYYY-MM-DD"))),p.default.createElement(_.default,{title:"",size:"large",style:{marginBottom:32}},p.default.createElement(w,{term:"\u4f01\u4e1a\u7b80\u4ecb"},t.memo)),p.default.createElement(_.default,{title:"",size:"large",style:{marginBottom:32}},p.default.createElement(w,{term:"\u4f01\u4e1a\u5730\u5740"},t.buildings&&t.buildings.map(function(e){return p.default.createElement(s.default,null,e.building_name)}))))),p.default.createElement(n.default,{title:"\u7ecf\u8425\u5355\u4f4d\u57fa\u672c\u4fe1\u606f",bordered:!1},p.default.createElement("div",{className:b.default.form},p.default.createElement(_.default,{title:"",size:"large",style:{marginBottom:32}},p.default.createElement(w,{term:"\u7edf\u4e00\u793e\u4f1a\u4fe1\u7528\u4ee3\u7801"},t.credit_code),p.default.createElement(w,{term:"\u6cd5\u5b9a\u4ee3\u8868\u4eba"},t.representative),p.default.createElement(w,{term:"\u7ecf\u8425\u8303\u56f4"},t.business_scope)),p.default.createElement(_.default,{col:1},p.default.createElement(w,{term:"\u8425\u4e1a\u6267\u7167\u6709\u6548\u671f"},t.business_license_sdate&&""!==t.business_license_sdate?(0,h.parseUtcTime)(t.business_license_sdate,"YYYY-MM-DD"):"","\xa0\u81f3\xa0",t.business_license_edate)),p.default.createElement(_.default,{title:"",size:"large",style:{marginBottom:32}},p.default.createElement(w,{term:"\u8425\u4e1a\u6267\u7167"},p.default.createElement("div",{className:b.default.formImage,style:{width:147,height:147,marginLeft:20}},p.default.createElement("img",{src:l,alt:"\u8425\u4e1a\u6267\u7167",onClick:function(){return e.shouBigImageyingye(l)}})))),p.default.createElement(_.default,{title:"",size:"large",style:{marginBottom:32}},p.default.createElement(w,{term:"\u6cd5\u5b9a\u4ee3\u8868\u4eba\u4fe1\u606f"},p.default.createElement("div",{style:{display:"flex"}},r&&p.default.createElement("div",{className:b.default.formImage,style:{width:248,height:160,marginLeft:20}},p.default.createElement("img",{src:r,alt:"\u8eab\u4efd\u8bc1"})),u&&p.default.createElement("div",{className:b.default.formImage,style:{width:248,height:160,marginLeft:20}},p.default.createElement("img",{src:u,alt:"\u8eab\u4efd\u8bc1"}))))),p.default.createElement(_.default,{title:"",size:"large",style:{marginBottom:32}},p.default.createElement(w,{term:"\u7533\u8bf7\u72b6\u6001"},this.statusRender(t.audit_status)),p.default.createElement(w,{term:"\u901a\u8fc7/\u9a73\u56de\u65f6\u95f4"},0!==t.audit_time?(0,h.parseUtcTime)(t.audit_time,"YYYY-MM-DD"):null)),3===t.audit_status?p.default.createElement(_.default,{title:"",size:"large",style:{marginBottom:32}},p.default.createElement(w,{term:"\u7533\u8bf7\u5efa\u8bae"}," ",t.audit_suggest)):null,this.state.bigImage?p.default.createElement("div",{className:b.default.popoverbackdrop,onClick:function(){return e.hideBigImage()}},p.default.createElement("img",{className:b.default.imgresponsive,src:this.state.ShowUrl,alt:"\u67e5\u770b\u5931\u8d25"})):null,this.state.bigImageyingye?p.default.createElement("div",{className:b.default.popoverbackdrop,onClick:function(){return e.hideBigImageyingye()}},p.default.createElement("img",{className:b.default.imgresponsive,src:this.state.ShowUrlyingye,alt:"\u67e5\u770b\u5931\u8d25"})):null)))}}]),t}(p.PureComponent),m=d))||m),k=I;t.default=k}}]);