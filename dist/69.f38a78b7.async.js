(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[69],{"ic/p":function(e,t,a){"use strict";var l=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("+L6B");var d=l(a("2/Rp"));a("Pwec");var u=l(a("CtXQ"));a("iQDF");var r=l(a("+eQT"));a("IzEo");var s=l(a("bx4M"));a("14J3");var i=l(a("BMrR"));a("jCWc");var n=l(a("kPKH")),f=l(a("jehZ"));a("5NDa");var c=l(a("5rEg")),m=l(a("p0pE")),p=l(a("qIgq"));a("miYZ");var o=l(a("tsqr")),E=l(a("2Taf")),b=l(a("vZ4D")),g=l(a("l4Ni")),_=l(a("ujKo")),h=l(a("MhPg"));a("y8nQ");var v,y,N,k,I=l(a("Vl3Y")),w=l(a("q1tI")),x=a("MuoO"),q=l(a("wd/R")),A=l(a("XZXw")),V=l(a("9DcN")),L=l(a("t1vl")),T=a("+n12"),j=a("6LfW"),P=l(a("KhQK")),B=(v=I.default.create(),y=(0,x.connect)(function(e){return{enterprise:e.enterprise}}),v(N=y((k=function(e){function t(){var e,a;(0,E.default)(this,t);for(var l=arguments.length,d=new Array(l),u=0;u<l;u++)d[u]=arguments[u];return a=(0,g.default)(this,(e=(0,_.default)(t)).call.apply(e,[this].concat(d))),a.state={disabled:!1},a.handleBtnClick=function(){a.props.form.validateFieldsAndScroll(function(e,t){if(!e){t.member_cut=Math.round(Number(t.member_cut)),t.corporation_type=Math.round(Number(t.corporation_type)),t.representative_idcard_front?t.representative_idcard_front=t.representative_idcard_front:o.default.error("\u8eab\u4efd\u8bc1\u8bc1\u4ef6\u7167\u4fe1\u606f\u7f3a\u5931\uff0c\u8bf7\u5b8c\u5584"),t.representative_idcard_back?t.representative_idcard_back=t.representative_idcard_back:o.default.error("\u8eab\u4efd\u8bc1\u8bc1\u4ef6\u7167\u4fe1\u606f\u7f3a\u5931\uff0c\u8bf7\u5b8c\u5584");var l=(0,p.default)(t.license_image,1);if(t.license_image=l[0],t.issue_time&&""!==t.issue_time&&t.expiration_time&&"\u957f\u671f\u6709\u6548"!==t.expiration_time){var d=(0,m.default)({},t);a.props.dispatch({type:"enterprise/applyStore",payload:d})}}})},a}return(0,h.default)(t,e),(0,b.default)(t,[{key:"render",value:function(){var e={labelCol:{xs:{span:24},sm:{span:10}},wrapperCol:{xs:{span:24},sm:{span:14}}},t={labelCol:{xs:{span:24},sm:{span:5}},wrapperCol:{xs:{span:24},sm:{span:19}}},a={sm:24,md:12},l={sm:24,md:24},m={sm:24,md:24},p=c.default.TextArea,o=this.props.form.getFieldDecorator,E=this.props.storeApply.register;return w.default.createElement(A.default,{title:"\u4f01\u4e1a\u4fe1\u606f"},w.default.createElement("div",{className:P.default.APPLYStore},w.default.createElement("div",{className:P.default.TOPtitle},w.default.createElement("p",null,"\u4f01\u4e1a\u57fa\u672c\u4fe1\u606f")),w.default.createElement(s.default,{bordered:!1},w.default.createElement(I.default,null,w.default.createElement(i.default,null,w.default.createElement(n.default,a,w.default.createElement(I.default.Item,(0,f.default)({},e,{label:"\u4f01\u4e1a\u540d\u79f0"}),o("name",{initialValue:E.name||"",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u4f01\u4e1a\u540d\u79f0"}]})(w.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165\u4f01\u4e1a\u540d\u79f0",disabled:this.state.disabled,maxLength:"50"})))),w.default.createElement(n.default,a,w.default.createElement(I.default.Item,(0,f.default)({},e,{label:"\u884c\u4e1a\u7c7b\u522b"}),o("category",{initialValue:E.category,rules:[{required:!1,message:"\u8bf7\u8f93\u5165\u884c\u4e1a\u7c7b\u522b"}]})(w.default.createElement(j.DicSelect,{vmode:"int",pcode:"OPER$#enterprise_category_industry",selectProps:{placeholder:"\u8bf7\u9009\u62e9"}}))))),w.default.createElement(i.default,null,w.default.createElement(n.default,a,w.default.createElement(I.default.Item,(0,f.default)({},e,{label:"\u4f01\u4e1a\u7535\u8bdd"}),o("phone",{initialValue:E.phone||"",rules:[{required:!0,whitespace:!0,message:"\u8bf7\u8f93\u5165\u4f01\u4e1a\u7535\u8bdd"}]})(w.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165\u4f01\u4e1a\u7535\u8bdd",disabled:this.state.disabled,maxLength:"20"})))),w.default.createElement(n.default,a,w.default.createElement(I.default.Item,(0,f.default)({},e,{label:"\u4f01\u4e1a\u7ba1\u7406\u5458\u59d3\u540d"}),o("applicant_name",{initialValue:E.applicant_name||"",rules:[{required:!0}]})(w.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165",disabled:this.state.disabled,maxLength:"11"}))))),w.default.createElement(i.default,null,w.default.createElement(n.default,a,w.default.createElement(I.default.Item,(0,f.default)({},e,{label:"\u8054\u7cfb\u4eba\u7535\u8bdd"}),o("applicant_tel",{initialValue:E.applicant_tel||"",rules:[{required:!0,whitespace:!0,type:"number",transform:function(e){if(e)return Number(e)},message:"\u8bf7\u8f93\u5165\u7533\u8bf7\u8054\u7cfb\u4eba\u7535\u8bdd"}]})(w.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165\u7533\u8bf7\u8054\u7cfb\u4eba\u7535\u8bdd",disabled:this.state.disabled,maxLength:"11"})))),w.default.createElement(n.default,a,w.default.createElement(I.default.Item,(0,f.default)({},e,{label:"\u4f01\u4e1a\u5730\u5740"}),o("address",{initialValue:E.address||"",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u4f01\u4e1a\u5730\u5740"}]})(w.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165\u4f01\u4e1a\u5730\u5740",disabled:this.state.disabled,maxLength:"100"}))))))),w.default.createElement("div",{className:P.default.TOPtitle},w.default.createElement("p",null,"\u7ecf\u8425\u5355\u4f4d\u57fa\u672c\u4fe1\u606f")),w.default.createElement(s.default,{bordered:!1},w.default.createElement(I.default,null,w.default.createElement(i.default,null,w.default.createElement(n.default,a,w.default.createElement(I.default.Item,(0,f.default)({},e,{label:"\u7edf\u4e00\u793e\u4f1a\u4fe1\u7528\u4ee3\u7801"}),o("credit_code",{initialValue:E.credit_code||"",rules:[{required:!0,message:"\u8bf7\u8f93\u5165"}]})(w.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165",disabled:this.state.disabled,maxLength:"18"}))))),w.default.createElement(i.default,null,w.default.createElement(n.default,a,w.default.createElement(I.default.Item,(0,f.default)({},e,{label:"\u4f01\u4e1a\u89c4\u6a21"}),o("size",{initialValue:E.size?E.size.toString():""})(w.default.createElement(j.DicSelect,{vmode:"int",pcode:"OPER$#enterprise_scale",selectProps:{placeholder:"\u8bf7\u9009\u62e9"}})))),w.default.createElement(n.default,a,w.default.createElement(I.default.Item,(0,f.default)({},e,{label:"\u516c\u53f8\u7c7b\u578b"}),o("corporation_type",{initialValue:E.corporation_type?E.corporation_type.toString():""})(w.default.createElement(j.DicSelect,{vmode:"int",pcode:"OPER$#company_type",selectProps:{placeholder:"\u8bf7\u9009\u62e9"}})))),w.default.createElement(n.default,a,w.default.createElement(I.default.Item,(0,f.default)({},e,{label:"\u6cd5\u5b9a\u4ee3\u8868\u4eba"}),o("representative",{initialValue:E.representative||"",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6cd5\u5b9a\u4ee3\u8868\u4eba"}]})(w.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165\u6cd5\u5b9a\u4ee3\u8868\u4eba",disabled:this.state.disabled,maxLength:"20"}))))),w.default.createElement(i.default,null,w.default.createElement(n.default,m,w.default.createElement(I.default.Item,(0,f.default)({},t,{label:"\u7ecf\u8425\u8303\u56f4"}),o("business_scope",{initialValue:E.business_scope||"",rules:[{required:!1,message:"\u8bf7\u8f93\u5165\u7ecf\u8425\u8303\u56f4"}]})(w.default.createElement(p,{placeholder:"\u8bf7\u8f93\u5165\u7ecf\u8425\u8303\u56f4",autosize:{minRows:2,maxRows:6},disabled:this.state.disabled}))))),w.default.createElement(i.default,null,w.default.createElement(n.default,a,w.default.createElement(I.default.Item,(0,f.default)({},e,{label:"\u8425\u4e1a\u6267\u7167\u5f00\u59cb\u6709\u6548\u671f"}),o("business_license_sdate",{initialValue:(0,q.default)(E.business_license_sdate)||"",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8425\u4e1a\u6267\u7167\u6709\u6548\u671f"}]})(w.default.createElement(r.default,{format:"YYYY-MM-DD",placeholder:"\u8bf7\u9009\u62e9",disabled:this.state.disabled})))),w.default.createElement(n.default,a,w.default.createElement(I.default.Item,(0,f.default)({},e,{label:"\u8425\u4e1a\u6267\u7167\u7ed3\u675f\u6709\u6548\u671f"}),o("business_license_edate",{initialValue:E.business_license_edate||"",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8425\u4e1a\u6267\u7167\u7ed3\u675f\u6709\u6548\u671f"}]})(w.default.createElement(L.default,{onValue:E.business_license_edate||"",ondisabled:this.state.disabled}))))),w.default.createElement(i.default,null,w.default.createElement(n.default,{sm:6,push:"2"},w.default.createElement(I.default.Item,{label:"\u4f01\u4e1aLOGO"},w.default.createElement("span",{style:{color:"red"}},"\uff08\u56fe\u7247\u4e0a\u4f20\u683c\u5f0fjpg,jpeg,png\uff09"),o("logo",{initialValue:E.logo?[E.logo]:"",rules:[{required:!0,message:"\u8bf7\u4e0a\u4f20\u4f01\u4e1aLOGO"}]})(this.state.disabled?w.default.createElement("div",{className:P.default.seeImg},w.default.createElement("div",{className:[P.default.imgMask,this.state.BigA?P.default.black:""].join(" ")},w.default.createElement("div",{className:P.default.preview},this.state.BigA&&w.default.createElement(u.default,{type:"zoom-in",theme:"outlined",className:P.default.icon})),w.default.createElement("img",{src:E.portrait,alt:"\u672a\u4e0a\u4f20"}))):w.default.createElement(V.default,{num:1,bucket:"mall",listType:"picture-card"})))),w.default.createElement(n.default,{sm:4,push:2},w.default.createElement(I.default.Item,{label:"\u8425\u4e1a\u6267\u7167"},w.default.createElement("span",{style:{color:"red"}},"\uff08\u56fe\u7247\u4e0a\u4f20\u683c\u5f0fjpg,jpeg,png\uff09"),o("business_license",{initialValue:E.business_license?[E.business_license]:"",rules:[{required:!0,message:"\u8bf7\u4e0a\u4f20\u8425\u4e1a\u6267\u7167"}]})(this.state.disabled?w.default.createElement("div",{className:P.default.seeImg},w.default.createElement("div",{className:[P.default.imgMask,this.state.BigA?P.default.black:""].join(" ")},w.default.createElement("div",{className:P.default.preview},this.state.BigA&&w.default.createElement(u.default,{type:"zoom-in",theme:"outlined",className:P.default.icon})),w.default.createElement("img",{src:E.license_image,alt:"\u672a\u4e0a\u4f20"}))):w.default.createElement(V.default,{num:1,bucket:"mall",listType:"picture-card"})))),w.default.createElement(n.default,{sm:5,push:4},w.default.createElement(I.default.Item,{label:"\u6cd5\u5b9a\u4ee3\u8868\u4eba\u8eab\u4efd\u8bc1(\u6b63\u9762)"},w.default.createElement("span",{style:{color:"red"}},"\uff08\u56fe\u7247\u4e0a\u4f20\u683c\u5f0fjpg,jpeg,png\uff09"),o("representative_idcard_front",{initialValue:E.representative_idcard_front?[E.representative_idcard_front]:"",rules:[{required:!0,message:"\u8bf7\u4e0a\u4f20\u6cd5\u5b9a\u4ee3\u8868\u4eba\u8eab\u4efd\u8bc1(\u6b63\u9762)"}]})(this.state.disabled?w.default.createElement("div",{className:P.default.seeImg},w.default.createElement("div",{className:[P.default.imgMask,this.state.BigA?P.default.black:""].join(" ")},w.default.createElement("div",{className:P.default.preview},this.state.BigA&&w.default.createElement(u.default,{type:"zoom-in",theme:"outlined",className:P.default.icon})),w.default.createElement("img",{src:E.persional_id_image,alt:"\u672a\u4e0a\u4f20"}))):w.default.createElement(V.default,{num:1,bucket:"mall",listType:"picture-card"})))),w.default.createElement(n.default,{sm:5,push:4},w.default.createElement(I.default.Item,{label:"\u6cd5\u5b9a\u4ee3\u8868\u4eba\u8eab\u4efd\u8bc1(\u53cd\u9762)"},w.default.createElement("span",{style:{color:"red"}},"\uff08\u56fe\u7247\u4e0a\u4f20\u683c\u5f0fjpg,jpeg,png\uff09"),o("representative_idcard_back",{initialValue:E.representative_idcard_back?[E.representative_idcard_back]:"",rules:[{required:!0,message:"\u8bf7\u4e0a\u4f20\u6cd5\u5b9a\u4ee3\u8868\u4eba\u8eab\u4efd\u8bc1(\u53cd\u9762)"}]})(this.state.disabled?w.default.createElement("div",{className:P.default.seeImg},w.default.createElement("div",{className:[P.default.imgMask,this.state.BigA?P.default.black:""].join(" ")},w.default.createElement("div",{className:P.default.preview},this.state.BigA&&w.default.createElement(u.default,{type:"zoom-in",theme:"outlined",className:P.default.icon})),w.default.createElement("img",{src:E.persional_id_image,alt:"\u672a\u4e0a\u4f20"}))):w.default.createElement(V.default,{num:1,bucket:"mall",listType:"picture-card"}))))),this.props.storeApply.store.store_id&&w.default.createElement("div",null,w.default.createElement(i.default,null,w.default.createElement(n.default,a,w.default.createElement(I.default.Item,(0,f.default)({},e,{label:"\u5165\u9a7b\u56ed\u533a\u65f6\u95f4"}),w.default.createElement("span",{className:P.default.marginTL},""!==E.entry_date?(0,T.formatTimestamp)(E.entry_date):"")))),w.default.createElement(i.default,null,w.default.createElement(n.default,a,w.default.createElement(I.default.Item,(0,f.default)({},e,{label:"\u5ba1\u6838\u72b6\u6001"}),1===E.application_status&&w.default.createElement("span",{className:P.default.marginTL},"\u5ba1\u6838\u4e2d "),2===E.application_status&&w.default.createElement("span",{className:P.default.marginTL},"\u901a\u8fc7 "),3===E.application_status&&w.default.createElement("span",{className:P.default.marginTL},"\u9a73\u56de ")))),3===E.audit_status&&w.default.createElement(i.default,null,w.default.createElement(n.default,a,w.default.createElement(I.default.Item,(0,f.default)({},e,{label:"\u9a73\u56de\u7f18\u7531"}),w.default.createElement("span",{className:P.default.marginTL},E.audit_suggest))))),!this.props.storeApply.store.store_id&&w.default.createElement("div",null,w.default.createElement(i.default,null,w.default.createElement(n.default,(0,f.default)({},l,{style:{textAlign:"center"}}),w.default.createElement(d.default,{type:"primary",style:{marginTop:"10px"},disabled:this.props.storeApply.btnDisabled,onClick:this.handleBtnClick},"\u63d0\u4ea4")))),w.default.createElement("div",null,3===E.audit_status&&w.default.createElement(i.default,null,w.default.createElement(n.default,(0,f.default)({},l,{style:{textAlign:"center"}}),w.default.createElement(d.default,{type:"primary",style:{marginTop:"10px"},disabled:this.props.storeApply.btnDisabled,onClick:this.handleBtnClick},"\u91cd\u65b0\u63d0\u4ea4"))))))))}}]),t}(w.default.PureComponent),N=k))||N)||N);t.default=B}}]);