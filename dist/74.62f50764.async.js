(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[74],{"8Xsg":function(e,t,a){"use strict";var l=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("+L6B");var d=l(a("2/Rp"));a("sRBo");var u=l(a("kaz8"));a("7Kak");var r=l(a("9yH6"));a("Pwec");var i=l(a("CtXQ"));a("iQDF");var n=l(a("+eQT"));a("OaEy");var s=l(a("2fM7"));a("IzEo");var m=l(a("bx4M"));a("Xi6J");var f=l(a("kl6h"));a("14J3");var c=l(a("BMrR"));a("jCWc");var p=l(a("kPKH")),o=l(a("jehZ"));a("5NDa");var E=l(a("5rEg")),h=l(a("d6i3")),g=l(a("1l/V"));a("2qtc");var b=l(a("kLXV")),_=l(a("p0pE"));a("miYZ");var v=l(a("tsqr")),y=l(a("2Taf")),k=l(a("vZ4D")),x=l(a("l4Ni")),I=l(a("ujKo")),N=l(a("MhPg"));a("y8nQ");var V,w,A,q,L=l(a("Vl3Y")),C=l(a("q1tI")),H=a("MuoO"),M=l(a("wd/R")),T=l(a("XZXw")),j=l(a("9DcN")),B=l(a("t1vl")),D=a("+n12"),O=l(a("AX5t")),Y=(V=L.default.create(),w=(0,H.connect)(function(e){return{storeApply:e.store}}),V(A=w((q=function(e){function t(){var e,a;(0,y.default)(this,t);for(var l=arguments.length,d=new Array(l),u=0;u<l;u++)d[u]=arguments[u];return a=(0,x.default)(this,(e=(0,I.default)(t)).call.apply(e,[this].concat(d))),a.state={checked:!0,disabled:!1},a.checkedChange=function(e){a.setState({checked:e.target.checked})},a.handleBtnClick=function(){var e="HH:mm";a.props.form.validateFieldsAndScroll(function(t,l){if(!t)if(a.state.checked){if(l.member_cut=Math.round(Number(l.member_cut)),l.corporation_type=Math.round(Number(l.corporation_type)),l.persional_id_image1&&l.persional_id_image1.length&&l.persional_id_image2&&l.persional_id_image2.length?l.persional_id_image="".concat(l.persional_id_image1[0],",").concat(l.persional_id_image2[0]):v.default.error("\u8eab\u4efd\u8bc1\u8bc1\u4ef6\u7167\u4fe1\u606f\u7f3a\u5931\uff0c\u8bf7\u5b8c\u5584"),l.open_time&&""!==l.open_time?l.open_time=l.open_time.format(e):l.open_time="",l.close_time&&""!==l.close_time?l.close_time=l.close_time.format(e):l.close_time="",l.issue_time&&""!==l.issue_time&&l.expiration_time&&"\u957f\u671f\u6709\u6548"!==l.expiration_time&&(0,M.default)(l.issue_time).unix(0)>(0,M.default)(l.expiration_time).unix(0))return void v.default.error("\u8425\u4e1a\u6267\u7167\u5f00\u59cb\u65f6\u95f4\u4e0d\u5f97\u665a\u4e8e\u8425\u4e1a\u6267\u7167\u7ed3\u675f\u65f6\u95f4");l.issue_time&&""!==l.issue_time&&(l.issue_time=l.issue_time.format("YYYY-MM-DD"));var d=(0,_.default)({},l);d.portrait=l.portrait[0],d.license_image=l.license_image[0],a.props.dispatch({type:"store/applyStore",payload:d})}else v.default.error("\u8bf7\u9605\u8bfb\u5e76\u63a5\u53d7\u300a\u5f00\u5e97\u89c4\u7ea6\u300b")})},a.shopRegulation=function(){b.default.info({title:"\u5f00\u5e97\u89c4\u7ea6",width:"600px",content:C.default.createElement("div",null,C.default.createElement("p",null,"\u63d0\u793a\u4f7f\u7528\u672c\u516c\u53f8\u670d\u52a1\u6240\u987b\u9075\u5b88\u7684\u6761\u6b3e\u548c\u6761\u4ef6\u3002"),C.default.createElement("p",null,"1\u3001\u7528\u6237\u8d44\u683c"),C.default.createElement("p",null,"\u672c\u516c\u53f8\u7684\u670d\u52a1\u4ec5\u5411\u9002\u7528\u6cd5\u5f8b\u4e0b\u80fd\u591f\u7b7e\u8ba2\u5177\u6709\u6cd5\u5f8b\u7ea6\u675f\u529b\u7684\u5408\u540c\u7684\u4e2a\u4eba\u63d0\u4f9b\u5e76\u4ec5\u7531\u5176\u4f7f\u7528\u3002\u5728\u4e0d\u9650\u5236\u524d\u8ff0\u89c4\u5b9a\u7684\u524d\u63d0\u4e0b\uff0c\u672c\u516c\u53f8\u7684\u670d\u52a1\u4e0d\u541118\u5468\u5c81\u4ee5\u4e0b\u6216\u88ab\u4e34\u65f6\u6216\u65e0\u9650\u671f\u4e2d\u6b62\u7684\u7528\u6237\u63d0\u4f9b\u3002\u5982\u60a8\u4e0d\u5408\u8d44\u683c\uff0c\u8bf7\u52ff\u4f7f\u7528\u672c\u516c\u53f8\u7684\u670d\u52a1\u3002\u6b64\u5916\uff0c\u60a8\u7684\u5e10\u6237\uff08\u5305\u62ec\u4fe1\u7528\u8bc4\u4ef7\uff09\u548c\u7528\u6237\u540d\u4e0d\u5f97\u5411\u5176\u4ed6\u65b9\u8f6c\u8ba9\u6216\u51fa\u552e\u3002\u53e6\u5916\uff0c\u672c\u516c\u53f8\u4fdd\u7559\u6839\u636e\u5176\u610f\u613f\u4e2d\u6b62\u6216\u7ec8\u6b62\u60a8\u7684\u5e10\u6237\u7684\u6743\u5229\u3002"),C.default.createElement("p",null,"2\u3001\u60a8\u7684\u8d44\u6599\uff08\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\u6240\u6dfb\u52a0\u7684\u4efb\u4f55\u5546\u54c1\uff09\u4e0d\u5f97\uff1a"),C.default.createElement("p",null,"* \u5177\u6709\u6b3a\u8bc8\u6027\u3001\u865a\u5047\u3001\u4e0d\u51c6\u786e\u6216\u5177\u8bef\u5bfc\u6027\uff1b"),C.default.createElement("p",null,"* \u4fb5\u72af\u4efb\u4f55\u7b2c\u4e09\u65b9\u8457\u4f5c\u6743\u3001\u4e13\u5229\u6743\u3001\u5546\u6807\u6743\u3001\u5546\u4e1a\u79d8\u5bc6\u6216\u5176\u4ed6\u4e13\u6709\u6743\u5229\u6216\u53d1\u8868\u6743\u6216\u9690\u79c1\u6743\uff1b"),C.default.createElement("p",null,"* \u8fdd\u53cd\u4efb\u4f55\u9002\u7528\u7684\u6cd5\u5f8b\u6216\u6cd5\u89c4\uff08\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\u6709\u5173\u51fa\u53e3\u7ba1\u5236\u3001\u6d88\u8d39\u8005\u4fdd\u62a4\u3001\u4e0d\u6b63\u5f53\u7ade\u4e89\u3001\u5211\u6cd5\u3001\u53cd\u6b67\u89c6\u6216\u8d38\u6613\u60ef\u4f8b/\u516c\u5e73\u8d38\u6613\u6cd5\u5f8b\u7684\u6cd5\u5f8b\u6216\u6cd5\u89c4\uff09\uff1b"),C.default.createElement("p",null,"* \u6709\u4fae\u8fb1\u6216\u8005\u8bfd\u8c24\u4ed6\u4eba\uff0c\u4fb5\u5bb3\u4ed6\u4eba\u5408\u6cd5\u6743\u76ca\u7684\u5185\u5bb9\uff1b"),C.default.createElement("p",null,"* \u6709\u6deb\u79fd\u3001\u8272\u60c5\u3001\u8d4c\u535a\u3001\u66b4\u529b\u3001\u51f6\u6740\u3001\u6050\u6016\u6216\u8005\u6559\u5506\u72af\u7f6a\u7684\u5185\u5bb9\uff1b"),C.default.createElement("p",null,"* \u5305\u542b\u53ef\u80fd\u7834\u574f\u3001\u6539\u53d8\u3001\u5220\u9664\u3001\u4e0d\u5229\u5f71\u54cd\u3001\u79d8\u5bc6\u622a\u53d6\u3001\u672a\u7ecf\u6388\u6743\u800c\u63a5\u89e6\u6216\u5f81\u7528\u4efb\u4f55\u7cfb\u7edf\u3001\u6570\u636e\u6216\u4e2a\u4eba\u8d44\u6599\u7684\u4efb\u4f55\u75c5\u6bd2\u3001\u7279\u6d1b\u4f9d\u6728\u9a6c\u3001\u8815\u866b\u3001\u5b9a\u65f6\u70b8\u5f39\u3001\u5220\u9664\u8747\u3001\u590d\u6d3b\u8282\u5f69 \u86cb\u3001\u95f4\u8c0d\u8f6f\u4ef6\u6216\u5176\u4ed6\u7535\u8111\u7a0b\u5e8f\uff1b"),C.default.createElement("p",null,"3\u3001\u8fdd\u7ea6"),C.default.createElement("p",null,"\u5982\u53d1\u751f\u4ee5\u4e0b\u60c5\u5f62\uff0c\u672c\u516c\u53f8\u53ef\u80fd\u9650\u5236\u60a8\u7684\u6d3b\u52a8\u3001\u7acb\u5373\u5220\u9664\u60a8\u7684\u5546\u54c1\u3001\u5411\u672c\u516c\u53f8\u793e\u533a\u53d1\u51fa\u6709\u5173\u60a8\u7684\u884c\u4e3a\u7684\u8b66\u544a\u3001\u53d1\u51fa\u8b66\u544a\u901a\u77e5\u3001\u6682\u65f6\u4e2d\u6b62\u3001\u65e0\u9650\u671f\u5730\u4e2d\u6b62\u6216\u7ec8\u6b62\u60a8\u7684\u7528\u6237\u8d44\u683c\u53ca\u62d2\u7edd\u5411\u60a8\u63d0\u4f9b\u670d\u52a1\uff1a"),C.default.createElement("p",null,"(a)\u60a8\u8fdd\u53cd\u672c\u534f\u8bae\u6216\u7eb3\u5165\u672c\u534f\u8bae\u7684\u6587\u4ef6\uff1b"),C.default.createElement("p",null,"(b)\u672c\u516c\u53f8\u65e0\u6cd5\u6838\u8bc1\u6216\u9a8c\u8bc1\u60a8\u5411\u672c\u516c\u53f8\u63d0\u4f9b\u7684\u4efb\u4f55\u8d44\u6599\uff1b"),C.default.createElement("p",null,"(c)\u672c\u516c\u53f8\u76f8\u4fe1\u60a8\u7684\u884c\u4e3a\u53ef\u80fd\u5bf9\u60a8\u3001\u672c\u516c\u53f8\u7528\u6237\u6216\u672c\u516c\u53f8\u9020\u6210\u635f\u5931\u6216\u6cd5\u5f8b\u8d23\u4efb\u3002"),C.default.createElement("p",null,"4\u3001\u8d23\u4efb\u9650\u5236"),C.default.createElement("p",null,"\u672c\u516c\u53f8\u3001\u672c\u516c\u53f8\u7684\u5173\u8054\u516c\u53f8\u548c\u76f8\u5173\u5b9e\u4f53\u6216\u672c\u516c\u53f8\u7684\u4f9b\u5e94\u5546\u5728\u4efb\u4f55\u60c5\u51b5\u4e0b\u5747\u4e0d\u5c31\u56e0\u672c\u516c\u53f8\u7684\u7f51\u7ad9\u3001\u672c\u516c\u53f8\u7684\u670d\u52a1\u6216\u672c\u534f\u8bae\u800c\u4ea7\u751f\u6216\u4e0e\u4e4b\u6709\u5173\u7684\u5229\u6da6\u635f\u5931\u6216\u4efb\u4f55\u7279\u522b\u3001\u95f4\u63a5\u6216\u540e\u679c\u6027\u7684\u635f\u5bb3\uff08\u65e0\u8bba\u4ee5\u4f55\u79cd\u65b9\u5f0f\u4ea7\u751f\uff0c\u5305\u62ec\u758f\u5ffd\uff09\u627f\u62c5\u4efb\u4f55\u8d23\u4efb\u3002\u60a8\u540c\u610f\u60a8\u5c31\u60a8\u81ea\u8eab\u884c\u4e3a\u4e4b\u5408\u6cd5\u6027\u5355\u72ec\u627f\u62c5\u8d23\u4efb\u3002\u60a8\u540c\u610f\uff0c\u672c\u516c\u53f8\u548c\u672c\u516c\u53f8\u7684\u6240\u6709\u5173\u8054\u516c\u53f8\u548c\u76f8\u5173\u5b9e\u4f53\u5bf9\u672c\u516c\u53f8\u7528\u6237\u7684\u884c\u4e3a\u7684\u5408\u6cd5\u6027\u53ca\u4ea7\u751f\u7684\u4efb\u4f55\u7ed3\u679c\u4e0d\u627f\u62c5\u8d23\u4efb\u3002"),C.default.createElement("p",null,"5\u3001\u65e0\u4ee3\u7406\u5173\u7cfb"),C.default.createElement("p",null,"\u7528\u6237\u548c\u672c\u516c\u53f8\u662f\u72ec\u7acb\u7684\u5408\u540c\u65b9\uff0c\u672c\u534f\u8bae\u65e0\u610f\u5efa\u7acb\u4e5f\u6ca1\u6709\u521b\u7acb\u4efb\u4f55\u4ee3\u7406\u3001\u5408\u4f19\u3001\u5408\u8425\u3001\u96c7\u5458\u4e0e\u96c7\u4e3b\u6216\u7279\u8bb8\u7ecf\u8425\u5173\u7cfb\u3002\u672c\u516c\u53f8\u4e5f\u4e0d\u5bf9\u4efb\u4f55\u7528\u6237\u53ca\u5176\u7f51\u4e0a\u4ea4\u6613\u884c\u4e3a\u505a\u51fa\u660e\u793a\u6216\u9ed8\u8bb8\u7684\u63a8\u8350\u3001\u627f\u8bfa\u6216\u62c5\u4fdd\u3002"),C.default.createElement("p",null,"6\u3001\u4e00\u822c\u89c4\u5b9a"),C.default.createElement("p",null,"\u672c\u534f\u8bae\u5728\u6240\u6709\u65b9\u9762\u5747\u53d7\u4e2d\u534e\u4eba\u6c11\u5171\u548c\u56fd\u6cd5\u5f8b\u7ba1\u8f96\u3002\u672c\u534f\u8bae\u7684\u89c4\u5b9a\u662f\u53ef\u5206\u5272\u7684\uff0c\u5982\u672c\u534f\u8bae\u4efb\u4f55\u89c4\u5b9a\u88ab\u88c1\u5b9a\u4e3a\u65e0\u6548\u6216\u4e0d\u53ef\u6267\u884c\uff0c\u8be5\u89c4\u5b9a\u53ef\u88ab\u5220\u9664\u800c\u5176\u4f59\u6761\u6b3e\u5e94\u4e88\u4ee5\u6267\u884c\u3002"))})},a}return(0,N.default)(t,e),(0,k.default)(t,[{key:"componentDidMount",value:function(){var e=(0,g.default)(h.default.mark(function e(){var t;return h.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.props.dispatch({type:"store/getStore"});case 2:t=this.props.storeApply.register,1===t.application_status&&this.setState({disabled:!0});case 4:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"render",value:function(){var e={labelCol:{xs:{span:24},sm:{span:10}},wrapperCol:{xs:{span:24},sm:{span:14}}},t={labelCol:{xs:{span:24},sm:{span:5}},wrapperCol:{xs:{span:24},sm:{span:19}}},a={sm:24,md:12},l={sm:24,md:24},h={sm:24,md:24},g=E.default.TextArea,b=this.props.form.getFieldDecorator,_=this.props.storeApply.register;return C.default.createElement(T.default,{title:"\u5f00\u5e97\u7533\u8bf7"},C.default.createElement("div",{className:O.default.APPLYStore},C.default.createElement("div",{className:O.default.TOPtitle},C.default.createElement("p",null,"\u5e97\u94fa\u57fa\u672c\u4fe1\u606f")),C.default.createElement(m.default,{bordered:!1},C.default.createElement(L.default,null,C.default.createElement(c.default,null,C.default.createElement(p.default,a,C.default.createElement(L.default.Item,(0,o.default)({},e,{label:"\u5546\u94fa\u7f16\u53f7"}),b("store_code",{initialValue:_.store_code||"",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5546\u94fa\u7f16\u53f7"}]})(C.default.createElement(E.default,{placeholder:"\u8bf7\u8f93\u5165\u5546\u94fa\u7f16\u53f7",disabled:this.state.disabled,maxLength:"50"}))))),C.default.createElement(c.default,null,C.default.createElement(p.default,a,C.default.createElement(L.default.Item,(0,o.default)({},e,{label:"\u5546\u94fa\u540d\u79f0"}),b("name",{initialValue:_.name||"",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5546\u94fa\u540d\u79f0"}]})(C.default.createElement(E.default,{placeholder:"\u8bf7\u8f93\u5165\u5546\u94fa\u540d\u79f0",disabled:this.state.disabled,maxLength:"50"})))),C.default.createElement(p.default,a,C.default.createElement(L.default.Item,(0,o.default)({},e,{label:"\u5546\u94fa\u54c1\u724c"}),b("brand",{initialValue:""!==_.brand?_.brand:_.name,rules:[{required:!1,message:"\u8bf7\u8f93\u5165\u5546\u94fa\u54c1\u724c"}]})(C.default.createElement(E.default,{placeholder:"\u8bf7\u8f93\u5165\u5546\u94fa\u54c1\u724c",disabled:this.state.disabled,maxLength:"50"}))))),C.default.createElement(c.default,null,C.default.createElement(p.default,a,C.default.createElement(L.default.Item,(0,o.default)({},e,{label:"\u5546\u94fa\u7535\u8bdd"}),b("store_tel",{initialValue:_.store_tel||"",rules:[{required:!0,whitespace:!0,message:"\u8bf7\u8f93\u5165\u5546\u94fa\u7535\u8bdd"}]})(C.default.createElement(E.default,{placeholder:"\u8bf7\u8f93\u5165\u5546\u94fa\u7535\u8bdd",disabled:this.state.disabled,maxLength:"20"})))),C.default.createElement(p.default,a,C.default.createElement(L.default.Item,(0,o.default)({},e,{label:"\u5546\u94fa\u7ba1\u7406\u5458\u59d3\u540d"}),b("applicant_name",{initialValue:_.applicant_name||"",rules:[{required:!0}]})(C.default.createElement(E.default,{placeholder:"\u8bf7\u8f93\u5165",disabled:this.state.disabled,maxLength:"11"}))))),C.default.createElement(c.default,null,C.default.createElement(p.default,a,C.default.createElement(L.default.Item,(0,o.default)({},e,{label:"\u8054\u7cfb\u4eba\u7535\u8bdd"}),b("applicant_tel",{initialValue:_.applicant_tel||"",rules:[{required:!0,whitespace:!0,type:"number",transform:function(e){if(e)return Number(e)},message:"\u8bf7\u8f93\u5165\u7533\u8bf7\u8054\u7cfb\u4eba\u7535\u8bdd"}]})(C.default.createElement(E.default,{placeholder:"\u8bf7\u8f93\u5165\u7533\u8bf7\u8054\u7cfb\u4eba\u7535\u8bdd",disabled:this.state.disabled,maxLength:"11"})))),C.default.createElement(p.default,a,C.default.createElement(L.default.Item,(0,o.default)({},e,{label:"\u5546\u94fa\u5730\u5740"}),b("business_address",{initialValue:_.business_address||"",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5546\u94fa\u5730\u5740"}]})(C.default.createElement(E.default,{placeholder:"\u8bf7\u8f93\u5165\u5546\u94fa\u5730\u5740",disabled:this.state.disabled,maxLength:"100"}))))),C.default.createElement(c.default,null,C.default.createElement(p.default,a,C.default.createElement(L.default.Item,(0,o.default)({},e,{label:"\u8425\u4e1a\u5f00\u59cb\u65f6\u95f4"}),b("open_time",{initialValue:_.open_time&&"0:0"!==_.open_time?(0,M.default)(_.open_time,"HH:mm"):(0,M.default)("08:00","HH:mm"),rules:[{required:!1,message:"\u8bf7\u9009\u62e9"}]})(C.default.createElement(f.default,{format:"HH:mm",disabled:this.state.disabled})))),C.default.createElement(p.default,a,C.default.createElement(L.default.Item,(0,o.default)({},e,{label:"\u8425\u4e1a\u7ed3\u675f\u65f6\u95f4"}),b("close_time",{initialValue:_.close_time&&"0:0"!==_.close_time?(0,M.default)(_.close_time,"HH:mm"):(0,M.default)("21:00","HH:mm"),rules:[{required:!1,message:"\u8bf7\u9009\u62e9"}]})(C.default.createElement(f.default,{defaultValue:(0,M.default)("21:00","HH:mm"),format:"HH:mm",disabled:this.state.disabled}))))))),C.default.createElement("div",{className:O.default.TOPtitle},C.default.createElement("p",null,"\u7ecf\u8425\u5355\u4f4d\u57fa\u672c\u4fe1\u606f")),C.default.createElement(m.default,{bordered:!1},C.default.createElement(L.default,null,C.default.createElement(c.default,null,C.default.createElement(p.default,a,C.default.createElement(L.default.Item,(0,o.default)({},e,{label:"\u7edf\u4e00\u793e\u4f1a\u4fe1\u7528\u4ee3\u7801"}),b("credit_code",{initialValue:_.credit_code||"",rules:[{required:!0,message:"\u8bf7\u8f93\u5165"}]})(C.default.createElement(E.default,{placeholder:"\u8bf7\u8f93\u5165",disabled:this.state.disabled,maxLength:"18"})))),C.default.createElement(p.default,a,C.default.createElement(L.default.Item,(0,o.default)({},e,{label:"\u7ecf\u8425\u5355\u4f4d\u540d\u79f0"}),b("corporation",{initialValue:_.corporation||"",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7ecf\u8425\u5355\u4f4d\u540d\u79f0"}]})(C.default.createElement(E.default,{placeholder:"\u8bf7\u8f93\u5165\u7ecf\u8425\u5355\u4f4d\u540d\u79f0",disabled:this.state.disabled,maxLength:"100"}))))),C.default.createElement(c.default,null,C.default.createElement(p.default,a,C.default.createElement(L.default.Item,(0,o.default)({},e,{label:"\u7ecf\u8425\u5355\u4f4d\u7c7b\u578b"}),b("corporation_type",{initialValue:_.corporation_type?_.corporation_type.toString():""})(C.default.createElement(s.default,{disabled:this.state.disabled},C.default.createElement(s.default.Option,{value:"1"},"\u4e2a\u4f53\u7ecf\u8425\u8005"),C.default.createElement(s.default.Option,{value:"2"},"\u5de5\u5546\u4f01\u4e1a"),C.default.createElement(s.default.Option,{value:"3"},"\u5176\u4ed6"))))),C.default.createElement(p.default,a,C.default.createElement(L.default.Item,(0,o.default)({},e,{label:"\u6cd5\u5b9a\u4ee3\u8868\u4eba"}),b("legal_persion",{initialValue:_.legal_persion||"",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6cd5\u5b9a\u4ee3\u8868\u4eba"}]})(C.default.createElement(E.default,{placeholder:"\u8bf7\u8f93\u5165\u6cd5\u5b9a\u4ee3\u8868\u4eba",disabled:this.state.disabled,maxLength:"20"}))))),C.default.createElement(c.default,null,C.default.createElement(p.default,h,C.default.createElement(L.default.Item,(0,o.default)({},t,{label:"\u7ecf\u8425\u8303\u56f4"}),b("business_scope",{initialValue:_.business_scope||"",rules:[{required:!1,message:"\u8bf7\u8f93\u5165\u7ecf\u8425\u8303\u56f4"}]})(C.default.createElement(g,{placeholder:"\u8bf7\u8f93\u5165\u7ecf\u8425\u8303\u56f4",autosize:{minRows:2,maxRows:6},disabled:this.state.disabled}))))),C.default.createElement(c.default,null,C.default.createElement(p.default,a,C.default.createElement(L.default.Item,(0,o.default)({},e,{label:"\u8425\u4e1a\u6267\u7167\u5f00\u59cb\u6709\u6548\u671f"}),b("issue_time",{initialValue:(0,M.default)(_.issue_time)||"",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8425\u4e1a\u6267\u7167\u6709\u6548\u671f"}]})(C.default.createElement(n.default,{format:"YYYY-MM-DD",placeholder:"\u8bf7\u9009\u62e9",disabled:this.state.disabled})))),C.default.createElement(p.default,a,C.default.createElement(L.default.Item,(0,o.default)({},e,{label:"\u8425\u4e1a\u6267\u7167\u7ed3\u675f\u6709\u6548\u671f"}),b("expiration_time",{initialValue:_.expiration_time||"",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8425\u4e1a\u6267\u7167\u7ed3\u675f\u6709\u6548\u671f"}]})(C.default.createElement(B.default,{onValue:_.expiration_time||"",ondisabled:this.state.disabled}))))),C.default.createElement(c.default,null,C.default.createElement(p.default,{sm:6,push:"2"},C.default.createElement(L.default.Item,{label:"\u5546\u94faLOGO"},C.default.createElement("span",{style:{color:"red"}},"\uff08\u56fe\u7247\u4e0a\u4f20\u683c\u5f0fjpg,jpeg,png\uff09"),b("portrait",{initialValue:_.portrait?[_.portrait]:"",rules:[{required:!0,message:"\u8bf7\u4e0a\u4f20\u5546\u94faLOGO"}]})(this.state.disabled?C.default.createElement("div",{className:O.default.seeImg},C.default.createElement("div",{className:[O.default.imgMask,this.state.BigA?O.default.black:""].join(" ")},C.default.createElement("div",{className:O.default.preview},this.state.BigA&&C.default.createElement(i.default,{type:"zoom-in",theme:"outlined",className:O.default.icon})),C.default.createElement("img",{src:_.portrait,alt:"\u672a\u4e0a\u4f20"}))):C.default.createElement(j.default,{num:1,bucket:"mall",listType:"picture-card"})))),C.default.createElement(p.default,{sm:4,push:2},C.default.createElement(L.default.Item,{label:"\u8425\u4e1a\u6267\u7167"},C.default.createElement("span",{style:{color:"red"}},"\uff08\u56fe\u7247\u4e0a\u4f20\u683c\u5f0fjpg,jpeg,png\uff09"),b("license_image",{initialValue:_.license_image?[_.license_image]:"",rules:[{required:!0,message:"\u8bf7\u4e0a\u4f20\u8425\u4e1a\u6267\u7167"}]})(this.state.disabled?C.default.createElement("div",{className:O.default.seeImg},C.default.createElement("div",{className:[O.default.imgMask,this.state.BigA?O.default.black:""].join(" ")},C.default.createElement("div",{className:O.default.preview},this.state.BigA&&C.default.createElement(i.default,{type:"zoom-in",theme:"outlined",className:O.default.icon})),C.default.createElement("img",{src:_.license_image,alt:"\u672a\u4e0a\u4f20"}))):C.default.createElement(j.default,{num:1,bucket:"mall",listType:"picture-card"})))),C.default.createElement(p.default,{sm:5,push:4},C.default.createElement(L.default.Item,{label:"\u6cd5\u5b9a\u4ee3\u8868\u4eba\u8eab\u4efd\u8bc1(\u6b63\u9762)"},C.default.createElement("span",{style:{color:"red"}},"\uff08\u56fe\u7247\u4e0a\u4f20\u683c\u5f0fjpg,jpeg,png\uff09"),b("persional_id_image1",{initialValue:_.persional_id_image?[_.persional_id_image.split(",")[0]]:"",rules:[{required:!0,message:"\u8bf7\u4e0a\u4f20\u6cd5\u5b9a\u4ee3\u8868\u4eba\u8eab\u4efd\u8bc1(\u6b63\u9762)"}]})(this.state.disabled?C.default.createElement("div",{className:O.default.seeImg},C.default.createElement("div",{className:[O.default.imgMask,this.state.BigA?O.default.black:""].join(" ")},C.default.createElement("div",{className:O.default.preview},this.state.BigA&&C.default.createElement(i.default,{type:"zoom-in",theme:"outlined",className:O.default.icon})),C.default.createElement("img",{src:_.persional_id_image,alt:"\u672a\u4e0a\u4f20"}))):C.default.createElement(j.default,{num:1,bucket:"mall",listType:"picture-card"})))),C.default.createElement(p.default,{sm:5,push:4},C.default.createElement(L.default.Item,{label:"\u6cd5\u5b9a\u4ee3\u8868\u4eba\u8eab\u4efd\u8bc1(\u53cd\u9762)"},C.default.createElement("span",{style:{color:"red"}},"\uff08\u56fe\u7247\u4e0a\u4f20\u683c\u5f0fjpg,jpeg,png\uff09"),b("persional_id_image2",{initialValue:_.persional_id_image?[_.persional_id_image.split(",")[1]]:"",rules:[{required:!0,message:"\u8bf7\u4e0a\u4f20\u6cd5\u5b9a\u4ee3\u8868\u4eba\u8eab\u4efd\u8bc1(\u53cd\u9762)"}]})(this.state.disabled?C.default.createElement("div",{className:O.default.seeImg},C.default.createElement("div",{className:[O.default.imgMask,this.state.BigA?O.default.black:""].join(" ")},C.default.createElement("div",{className:O.default.preview},this.state.BigA&&C.default.createElement(i.default,{type:"zoom-in",theme:"outlined",className:O.default.icon})),C.default.createElement("img",{src:_.persional_id_image,alt:"\u672a\u4e0a\u4f20"}))):C.default.createElement(j.default,{num:1,bucket:"mall",listType:"picture-card"}))))),C.default.createElement(c.default,null,C.default.createElement(p.default,a,C.default.createElement(L.default.Item,(0,o.default)({},e,{label:"\u5e73\u53f0\u4f1a\u5458\u4f18\u60e0"}),b("member_cut",{initialValue:_.member_cut?_.member_cut.toString():"1"})(C.default.createElement(r.default.Group,{disabled:this.state.disabled},C.default.createElement(r.default,{value:"1",defaultChecked:!1,disabled:!0},"\u4e0d\u53c2\u4e0e"),C.default.createElement(r.default,{value:"2",disabled:!0},"\u53c2\u4e0e")))))),this.props.storeApply.store.store_id&&C.default.createElement("div",null,C.default.createElement(c.default,null,C.default.createElement(p.default,a,C.default.createElement(L.default.Item,(0,o.default)({},e,{label:"\u63d0\u4ea4\u65e5\u671f"}),C.default.createElement("span",{className:O.default.marginTL},""!==_.created?(0,D.formatTimestamp)(_.created):"")))),C.default.createElement(c.default,null,C.default.createElement(p.default,a,C.default.createElement(L.default.Item,(0,o.default)({},e,{label:"\u5ba1\u6838\u72b6\u6001"}),1===_.application_status&&C.default.createElement("span",{className:O.default.marginTL},"\u5ba1\u6838\u4e2d "),2===_.application_status&&C.default.createElement("span",{className:O.default.marginTL},"\u901a\u8fc7 "),3===_.application_status&&C.default.createElement("span",{className:O.default.marginTL},"\u9a73\u56de ")))),3===_.application_status&&C.default.createElement(c.default,null,C.default.createElement(p.default,a,C.default.createElement(L.default.Item,(0,o.default)({},e,{label:"\u9a73\u56de\u7f18\u7531"}),C.default.createElement("span",{className:O.default.marginTL},_.remark))))),!this.props.storeApply.store.store_id&&C.default.createElement("div",null,C.default.createElement(c.default,null,C.default.createElement(p.default,(0,o.default)({},l,{style:{textAlign:"center"}}),C.default.createElement(u.default,{checked:this.state.checked,onChange:this.checkedChange},"\u5df2\u9605\u8bfb\u5e76\u63a5\u53d7"),C.default.createElement("span",{onClick:this.shopRegulation,style:{color:"#3f88bf",marginLeft:"-17px"}},"\u300a\u5f00\u5e97\u89c4\u7ea6\u300b"))),C.default.createElement(c.default,null,C.default.createElement(p.default,(0,o.default)({},l,{style:{textAlign:"center"}}),C.default.createElement(d.default,{type:"primary",style:{marginTop:"10px"},disabled:this.props.storeApply.btnDisabled,onClick:this.handleBtnClick},"\u63d0\u4ea4")))),C.default.createElement("div",null,C.default.createElement(c.default,null,C.default.createElement(p.default,(0,o.default)({},l,{style:{textAlign:"center"}}),C.default.createElement(u.default,{checked:this.state.checked,onChange:this.checkedChange},"\u5df2\u9605\u8bfb\u5e76\u63a5\u53d7"),C.default.createElement("span",{onClick:this.shopRegulation,style:{color:"#3f88bf",marginLeft:"-17px"}},"\u300a\u5f00\u5e97\u89c4\u7ea6\u300b"))),3===_.application_status&&C.default.createElement(c.default,null,C.default.createElement(p.default,(0,o.default)({},l,{style:{textAlign:"center"}}),C.default.createElement(d.default,{type:"primary",style:{marginTop:"10px"},disabled:this.props.storeApply.btnDisabled,onClick:this.handleBtnClick},"\u91cd\u65b0\u63d0\u4ea4"))))))))}}]),t}(C.default.PureComponent),A=q))||A)||A);t.default=Y}}]);