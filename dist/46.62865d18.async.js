(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[46],{"2dHB":function(e,t,a){e.exports={frame:"web\\pages\\-mall\\-shop-change-audit-info\\-shop-change-audit-info-frame",headImage:"web\\pages\\-mall\\-shop-change-audit-info\\-shop-change-audit-info-headImage",headImageone:"web\\pages\\-mall\\-shop-change-audit-info\\-shop-change-audit-info-headImageone",title:"web\\pages\\-mall\\-shop-change-audit-info\\-shop-change-audit-info-title",label:"web\\pages\\-mall\\-shop-change-audit-info\\-shop-change-audit-info-label",left:"web\\pages\\-mall\\-shop-change-audit-info\\-shop-change-audit-info-left",right:"web\\pages\\-mall\\-shop-change-audit-info\\-shop-change-audit-info-right",zong:"web\\pages\\-mall\\-shop-change-audit-info\\-shop-change-audit-info-zong",popoverbackdrop:"web\\pages\\-mall\\-shop-change-audit-info\\-shop-change-audit-info-popoverbackdrop",imgresponsive:"web\\pages\\-mall\\-shop-change-audit-info\\-shop-change-audit-info-imgresponsive"}},fMkE:function(e,t,a){"use strict";var l=a("tAuX"),n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("2qtc");var r=n(a("kLXV"));a("+L6B");var u=n(a("2/Rp"));a("+BJd");var d=n(a("mr32")),s=n(a("2Taf")),o=n(a("vZ4D")),i=n(a("l4Ni")),c=n(a("ujKo")),f=n(a("MhPg")),m=l(a("q1tI")),p=a("+n12"),g=n(a("2dHB")),h=function(e){function t(){var e,a;(0,s.default)(this,t);for(var l=arguments.length,n=new Array(l),r=0;r<l;r++)n[r]=arguments[r];return a=(0,i.default)(this,(e=(0,c.default)(t)).call.apply(e,[this].concat(n))),a.state={bigImage:!1,ShowUrl:null,bigImageafter:!1,ShowUrlafter:null,bigImagebefore:!1,ShowUrlbefore:null,bigImagebeforeid:!1},a.statusRender=function(e){switch(e){case 1:return m.default.createElement(d.default,{color:"blue"},"\u7533\u8bf7\u4e2d");case 2:return m.default.createElement(d.default,{color:"green"},"\u901a\u8fc7");case 3:return m.default.createElement(d.default,{color:"red"},"\u9a73\u56de");default:return""}},a.membercutRender=function(e){switch(e){case 1:return m.default.createElement(d.default,{color:"blue"},"\u4e0d\u53c2\u4e0e");case 2:return m.default.createElement(d.default,{color:"green"},"\u53c2\u4e0e");default:return""}},a}return(0,f.default)(t,e),(0,o.default)(t,[{key:"shouBigImage",value:function(e){this.setState({ShowUrl:e,bigImage:!0})}},{key:"hideBigImage",value:function(){this.setState({bigImage:!1})}},{key:"shouBigImageAfter",value:function(e){this.setState({ShowUrlafter:e,bigImageafter:!0})}},{key:"hideBigImageAfter",value:function(){this.setState({bigImageafter:!1})}},{key:"shouBigImagebefore",value:function(e){this.setState({ShowUrlbefore:e,bigImagebefore:!0})}},{key:"hideBigImagebefore",value:function(){this.setState({bigImagebefore:!1})}},{key:"hideBigImagebeforeId",value:function(){this.setState({bigImagebeforeid:!1})}},{key:"render",value:function(){var e=this,t=this.props.data,a=null,l=null,n=null,d=null,s=null,o=null,i=null,c=null;a=t.old_portrait?t.old_portrait:"/s/mall/noimage.jpg",l=t.old_license_image?t.old_license_image:"/s/mall/noimage.jpg",t.old_persional_id_image?(n=t.old_persional_id_image.split(",")[0],d=t.old_persional_id_image.split(",")[1]):(n="/s/mall/noimage.jpg",d="/s/mall/noimage.jpg"),s=t.portrait?t.portrait:"/s/mall/noimage.jpg",o=t.license_image?t.license_image:"/s/mall/noimage.jpg",t.persional_id_image?(i=t.persional_id_image.split(",")[0],c=t.persional_id_image.split(",")[1]):(i="/s/mall/noimage.jpg",c="/s/mall/noimage.jpg");var f=[m.default.createElement(u.default,{key:"close",onClick:this.props.onShopInfoFrameCloseCallback},"\u5173\u95ed")],h=m.default.createElement(r.default,{className:g.default.frame,visible:!0,title:"\u5e97\u94fa\u53d8\u66f4\u5ba1\u6838",destroyOnClose:!0,maskClosable:!1,onCancel:this.props.onShopInfoFrameCloseCallback,footer:f},m.default.createElement("table",{style:{width:"100%",border:1}},m.default.createElement("tbody",null,m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u5e97\u94fa\u57fa\u672c\u4fe1\u606f"),m.default.createElement("td",{className:g.default.title},"\u4fee\u6539\u524d"),m.default.createElement("td",{className:g.default.title},"\u4fee\u6539\u540e")),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u5e97\u94fa\u7f16\u53f7\uff1a"),m.default.createElement("td",{className:g.default.title},t.old_store_code),m.default.createElement("td",{className:g.default.title},t.store_code)),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u5e97\u94fa\u540d\u79f0\uff1a"),m.default.createElement("td",{className:g.default.title},t.old_name),m.default.createElement("td",{className:g.default.title},t.name)),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u8ba1\u79df\u9762\u79ef\uff1a"),m.default.createElement("td",{className:g.default.title},t.old_rent_area?t.old_rent_area:null,"\u33a1"),m.default.createElement("td",{className:g.default.title},t.rent_area?t.rent_area:null,"\u33a1")),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u4e1a\u6001\uff1a"),m.default.createElement("td",{className:g.default.title},t.old_store_type?t.old_store_type:null),m.default.createElement("td",{className:g.default.title},t.store_type?t.store_type:null)),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u5546\u94fa\u54c1\u724c\uff1a"),m.default.createElement("td",{className:g.default.title},""!==t.old_brand?t.old_brand:t.name),m.default.createElement("td",{className:g.default.title},""!==t.brand?t.brand:t.name)),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u5546\u94fa\u7535\u8bdd\uff1a"),m.default.createElement("td",{className:g.default.title},""!==t.old_store_tel?t.old_store_tel:null),m.default.createElement("td",{className:g.default.title},""!==t.store_tel?t.store_tel:null)),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u5546\u94fa\u7ba1\u7406\u5458\uff1a"),m.default.createElement("td",{className:g.default.title},""!==t.old_applicant_name?t.old_applicant_name:null),m.default.createElement("td",{className:g.default.title},""!==t.applicant_name?t.applicant_name:null)),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u8054\u7cfb\u4eba\u7535\u8bdd\uff1a"),m.default.createElement("td",{className:g.default.title},""!==t.old_applicant_tel?t.old_applicant_tel:null),m.default.createElement("td",{className:g.default.title},""!==t.applicant_tel?t.applicant_tel:null)),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u5546\u94fa\u5730\u5740\uff1a"),m.default.createElement("td",{className:g.default.title},""!==t.old_business_address?t.old_business_address:null),m.default.createElement("td",{className:g.default.title},""!==t.business_address?t.business_address:null)),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u8425\u4e1a\u5f00\u59cb\u65f6\u95f4\uff1a"),m.default.createElement("td",{className:g.default.title},""!==t.old_open_time?t.old_open_time:null),m.default.createElement("td",{className:g.default.title},""!==t.open_time?t.open_time:null)),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u8425\u4e1a\u7ed3\u675f\u65f6\u95f4\uff1a"),m.default.createElement("td",{className:g.default.title},""!==t.old_close_time?t.old_close_time:null),m.default.createElement("td",{className:g.default.title},""!==t.close_time?t.close_time:null)),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u5e97\u94fa\u57fa\u672c\u4fe1\u606f"),m.default.createElement("td",{className:g.default.title},"\u4fee\u6539\u524d"),m.default.createElement("td",{className:g.default.title},"\u4fee\u6539\u540e")),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u7edf\u4e00\u793e\u4f1a\u4fe1\u7528\u4ee3\u7801\uff1a"),m.default.createElement("td",{className:g.default.title},""!==t.old_credit_code?t.old_credit_code:null),m.default.createElement("td",{className:g.default.title},""!==t.credit_code?t.credit_code:null)),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u7ecf\u8425\u5355\u4f4d\u540d\u79f0\uff1a"),m.default.createElement("td",{className:g.default.title},""!==t.old_corporation?t.old_corporation:null),m.default.createElement("td",{className:g.default.title},""!==t.corporation?t.corporation:null)),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u7ecf\u8425\u5355\u4f4d\u7c7b\u578b\uff1a"),m.default.createElement("td",{className:g.default.title},1===t.old_corporation_type?"\u4e2a\u4f53\u8425\u4e1a\u8005":"\u5de5\u5546\u4f01\u4e1a"),m.default.createElement("td",{className:g.default.title},1===t.corporation_type?"\u4e2a\u4f53\u8425\u4e1a\u8005":"\u5de5\u5546\u4f01\u4e1a")),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u6cd5\u5b9a\u4ee3\u8868\u4eba\uff1a"),m.default.createElement("td",{className:g.default.title},t.old_legal_persion?t.old_legal_persion:null),m.default.createElement("td",{className:g.default.title}," ",t.legal_persion?t.legal_persion:null)),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u7ecf\u8425\u8303\u56f4\uff1a"),m.default.createElement("td",{className:g.default.title,title:t.old_business_scope?t.old_business_scope:null},t.old_business_scope?t.old_business_scope:null),m.default.createElement("td",{className:g.default.title,title:t.business_scope?t.business_scope:null},t.business_scope?t.business_scope:null)),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u8425\u4e1a\u6267\u7167\u6709\u6548\u671f\uff1a"),m.default.createElement("td",{className:g.default.title},t.old_issue_time&&""!==t.old_issue_time?(0,p.parseUtcTime)(t.old_issue_time,"YYYY-MM-DD"):"","\xa0\u81f3\xa0",t.old_expiration_time),m.default.createElement("td",{className:g.default.title},t.issue_time&&""!==t.issue_time?(0,p.parseUtcTime)(t.issue_time,"YYYY-MM-DD"):"","\xa0\u81f3\xa0",t.expiration_time)),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u6cd5\u5b9a\u4ee3\u8868\u4eba\u4fe1\u606f\uff1a"),m.default.createElement("td",{className:g.default.title},m.default.createElement("img",{alt:"\u5934\u50cf",src:n,className:g.default.headImage,onClick:function(){return e.shouBigImageAfter(n)}}),m.default.createElement("img",{alt:"\u5934\u50cf",src:d,className:g.default.headImage,onClick:function(){return e.shouBigImageAfter(d)}})),m.default.createElement("td",{className:g.default.title},m.default.createElement("img",{alt:"\u5934\u50cf",src:i,className:g.default.headImage,onClick:function(){return e.shouBigImageAfter(i)}}),m.default.createElement("img",{alt:"\u5934\u50cf",src:c,className:g.default.headImage,onClick:function(){return e.shouBigImageAfter(c)}}))),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u8425\u4e1a\u6267\u7167\uff1a"),m.default.createElement("td",{className:g.default.title},m.default.createElement("img",{alt:"\u5934\u50cf",src:l,className:g.default.headImage,onClick:function(){return e.shouBigImage(l)}})),m.default.createElement("td",{className:g.default.title},m.default.createElement("img",{alt:"\u5934\u50cf",src:o,className:g.default.headImage,onClick:function(){return e.shouBigImage(o)}}))),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u5e97\u94faLogo\uff1a"),m.default.createElement("td",{className:g.default.title},m.default.createElement("img",{alt:"\u5934\u50cf",src:a,className:g.default.headImage})),m.default.createElement("td",{className:g.default.title},m.default.createElement("img",{alt:"\u5934\u50cf",src:s,className:g.default.headImage}))),m.default.createElement("tr",null,m.default.createElement("td",{className:g.default.title},"\u5e73\u53f0\u4f1a\u5458\u4f18\u60e0\uff1a"),m.default.createElement("td",{className:g.default.title},this.membercutRender(t.old_member_cut)),m.default.createElement("td",{className:g.default.title},this.membercutRender(t.member_cut))))),m.default.createElement("div",{style:{borderTop:"1px solid #ccc"}},"\u7533\u8bf7\u65f6\u95f4\uff1a ",0===t.created?"":(0,p.formatTimestamp)(t.created),"\u5ba1\u6838\u72b6\u6001\uff1a",this.statusRender(t.application_status),"\u901a\u8fc7/\u62d2\u7edd\u65f6\u95f4\uff1a",0===t.updated?"":(0,p.formatTimestamp)(t.updated)),this.state.bigImagebefore?m.default.createElement("div",{className:g.default.popoverbackdrop,onClick:function(){return e.hideBigImagebefore()}},m.default.createElement("img",{className:g.default.imgresponsive,src:this.state.ShowUrlbefore,alt:"\u67e5\u770b\u5931\u8d25"})):null,this.state.bigImagebeforeid?m.default.createElement("div",{className:g.default.popoverbackdrop,onClick:function(){return e.hideBigImagebeforeId()}},m.default.createElement("img",{className:g.default.imgresponsive,src:this.state.shouBigImagebeforeId,alt:"\u67e5\u770b\u5931\u8d25"})):null,this.state.bigImage?m.default.createElement("div",{className:g.default.popoverbackdrop,onClick:function(){return e.hideBigImage()}},m.default.createElement("img",{className:g.default.imgresponsive,src:this.state.ShowUrl,alt:"\u67e5\u770b\u5931\u8d25"})):null,this.state.bigImageafter?m.default.createElement("div",{className:g.default.popoverbackdrop,onClick:function(){return e.hideBigImageAfter()}},m.default.createElement("img",{className:g.default.imgresponsive,src:this.state.ShowUrlafter,alt:"\u67e5\u770b\u5931\u8d25"})):null);return h}}]),t}(m.PureComponent);t.default=h},hPxf:function(e,t,a){"use strict";var l=a("g09b"),n=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("g9YV");var r=l(a("wCAj"));a("IzEo");var u=l(a("bx4M"));a("14J3");var d=l(a("BMrR"));a("OaEy");var s=l(a("2fM7"));a("jCWc");var o=l(a("kPKH")),i=l(a("jehZ"));a("5NDa");var c=l(a("5rEg")),f=l(a("p0pE"));a("+BJd");var m=l(a("mr32"));a("qVdP");var p=l(a("jsC+"));a("+L6B");var g=l(a("2/Rp"));a("lUTK");var h=l(a("BvKs"));a("2qtc");var E=l(a("kLXV")),_=l(a("2Taf")),b=l(a("vZ4D")),N=l(a("l4Ni")),v=l(a("ujKo")),I=l(a("rlhR")),y=l(a("MhPg"));a("y8nQ");var k=l(a("Vl3Y"));a("iQDF");var C,S,F,w,B=l(a("+eQT")),q=n(a("q1tI")),x=a("MuoO"),T=l(a("jcFm")),D=l(a("wd/R")),P=l(a("XZXw")),M=l(a("fMkE")),j=l(a("zU6M")),U=a("+n12"),A=l(a("zwZs")),R=B.default.RangePicker,Y=(C=(0,x.connect)(function(e){return{shopChangeaudit:e.shopChangeaudit}}),S=k.default.create(),C(F=S((w=function(e){function t(){var e,a;(0,_.default)(this,t);for(var l=arguments.length,n=new Array(l),r=0;r<l;r++)n[r]=arguments[r];return a=(0,N.default)(this,(e=(0,v.default)(t)).call.apply(e,[this].concat(n))),a.state={from:null,to:null,queryFormDisplay:!1,shopInfoFrame:{visible:!1,data:null},noPassshopInfoFrame:{visible:!1,data:null}},a.queryForm=null,a.pagination={},a.onBtnSearchClick=function(){a.pagination={current:1,pageSize:10},a.queryForm=a.props.form.getFieldsValue(),a.queryForm.name&&(a.queryForm.name=a.queryForm.name.replace(/(^\s*)|(\s*$)/g,"")),a.queryForm.fromto?(a.state.from=a.queryForm.fromto[0].unix(),a.state.to=a.queryForm.fromto[1].unix(),a.queryForm.from=a.state.from,a.queryForm.to=a.state.to):(a.queryForm.from=a.state.from,a.queryForm.to=a.state.to),delete a.queryForm.fromto,a.queryListData(a.queryForm,a.pagination)},a.onTableChange=function(e){var t=a.queryForm;a.queryListData(t,e)},a.onBtnClearClick=function(){a.props.form.resetFields()},a.onQueryFormToggleClick=function(){var e=a.state.queryFormDisplay;a.setState({queryFormDisplay:!e})},a.onWriteOffCallback=function(e){a.setState({shopInfoFrame:{visible:!0,data:e,noPass:1}})},a.onPassOffCallback=function(e){a.props.dispatch({recordId:e.record_id}),a.closeSubFrame()},a.closeSubFrame=function(){a.setState({shopInfoFrame:{visible:!1,data:null}})},a.closenoPasssSubFrame=function(){a.setState({noPassshopInfoFrame:{visible:!1,data:null}})},a.onBtnReasonClick=function(e){a.props.dispatch({type:"shopChangeaudit/UnAuth",reason:e}),a.closeSubFrame()},a.onpassCallback=function(e){E.default.confirm({title:"\u64cd\u4f5c\u786e\u8ba4",content:"\u786e\u8ba4\u8981\u901a\u8fc7\u6b64\u5546\u94fa\uff1f",okType:"danger",okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88",onOk:a.passOff.bind((0,I.default)(a),e)})},a.passOff=function(e){a.props.dispatch({type:"shopChangeaudit/passOff",register:e.register_id}),a.closeSubFrame()},a.showStoreStatueInfoFrame=function(e){a.setState({shopInfoFrame:{visible:!0,data:e}})},a}return(0,y.default)(t,e),(0,b.default)(t,[{key:"componentDidMount",value:function(){this.props.dispatch({type:"shopChangeaudit/queryShopstatue"}),this.onBtnSearchClick()}},{key:"onrefuseCallback",value:function(e){this.setState({noPassshopInfoFrame:{visible:!0,data:e}})}},{key:"queryListData",value:function(e,t){this.props.dispatch({type:"shopChangeaudit/queryShopStatueTotalInfo",params:e,pagination:{current:t.current,pageSize:t.pageSize}})}},{key:"render",value:function(){var e=this,t={labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:16}}},a=this.props.form.getFieldDecorator,l=this.props.shopChangeaudit,n=l.tableData,E=n.list,_=n.pagination,b=l.shopStatueList,N=l.loading,v="YYYY/MM/DD",I=100,y=[{title:"\u64cd\u4f5c",key:"operation",fixed:"left",width:I,render:function(t,a){return q.default.createElement(p.default,{placement:"bottomCenter",overlay:q.default.createElement(h.default,null,q.default.createElement(h.default.Item,{onClick:function(){return e.showStoreStatueInfoFrame(a)}},"\u67e5\u770b"),1===a.application_status?q.default.createElement(h.default.Item,{onClick:function(){return e.onpassCallback(a)}},"\u901a\u8fc7"):null,1===a.application_status?q.default.createElement(h.default.Item,{onClick:function(){return e.onrefuseCallback(a)}},"\u62d2\u7edd"):null)},q.default.createElement(g.default,null,"\u64cd\u4f5c"))}},{title:"\u5e97\u94fa\u540d\u79f0\uff08\u4fee\u6539\u524d\uff09",dataIndex:"old_name",key:"old_name",width:400,render:function(e){return q.default.createElement("div",{title:e,className:A.default.des},e)}},{title:"\u5e97\u94fa\u540d\u79f0\uff08\u4fee\u6539\u540e\uff09",dataIndex:"name",key:"name",width:400,render:function(e){return q.default.createElement("div",{title:e,className:A.default.des},e)}},{title:"\u7533\u8bf7\u65f6\u95f4",dataIndex:"created",key:"created",render:function(e){return e?(0,U.formatTimestamp)(e):""}},{title:"\u5ba1\u6838\u72b6\u6001",dataIndex:"application_status",key:"application_status",render:function(e){switch(e){case 1:return q.default.createElement(m.default,{color:"blue"},"\u7533\u8bf7\u4e2d");case 2:return q.default.createElement(m.default,{color:"green"},"\u901a\u8fc7");case 3:return q.default.createElement(m.default,{color:"red"},"\u9a73\u56de");default:return null}}},{title:"\u901a\u8fc7/\u62d2\u7edd\u65f6\u95f4",dataIndex:"updated",key:"updated",render:function(e){return e?(0,U.formatTimestamp)(e):""}}],C=(0,f.default)({showSizeChanger:!0,showQuickJumper:!0,showTotal:function(e){return q.default.createElement("span",null,"\u5171",e,"\u6761\u8bb0\u5f55")}},_),S=q.default.createElement("div",null,q.default.createElement(P.default,{title:"\u5e97\u94fa\u53d8\u66f4\u5ba1\u6838"},q.default.createElement(u.default,{bordered:!1,style:{marginTop:"16px"}},q.default.createElement(k.default,null,q.default.createElement(d.default,null,q.default.createElement(o.default,{span:6},q.default.createElement(T.default,(0,i.default)({},t,{label:"\u5e97\u94fa\u540d\u79f0"}),a("name",{})(q.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165"})))),q.default.createElement(o.default,{span:6},q.default.createElement(T.default,(0,i.default)({},t,{label:"\u5e97\u94fa\u72b6\u6001"}),a("application_status",{})(q.default.createElement(s.default,{placeholder:"\u8bf7\u9009\u62e9"},b.map(function(e){return q.default.createElement(s.default.Option,{key:e.code,value:e.code},e.name)}))))),q.default.createElement(o.default,{span:6},q.default.createElement(T.default,(0,i.default)({},t,{label:"\u7533\u8bf7\u65f6\u95f4"}),a("fromto",{})(q.default.createElement(R,{showTime:{defaultValue:(0,D.default)("00:00:00")},placeholder:["\u5f00\u59cb\u65f6\u95f4","\u7ed3\u675f\u65f6\u95f4"],format:v}))))),q.default.createElement(d.default,null,q.default.createElement(o.default,{span:24,style:{textAlign:"right"}},q.default.createElement(g.default,{type:"primary",onClick:this.onBtnSearchClick},"\u67e5\u8be2"),q.default.createElement(g.default,{style:{marginLeft:8},onClick:this.onBtnClearClick},"\u6e05\u7a7a"))))),q.default.createElement(u.default,{bordered:!1},q.default.createElement(r.default,{loading:N,dataSource:E,columns:y,scroll:{x:1500},onChange:this.onTableChange,pagination:C}))),this.state.shopInfoFrame.visible&&q.default.createElement(M.default,{data:this.state.shopInfoFrame.data,onShopInfoFrameCloseCallback:this.closeSubFrame,onHangupCallback:this.hangupOff}),this.state.noPassshopInfoFrame.visible&&q.default.createElement(j.default,{data:this.state.noPassshopInfoFrame.data,onShopInfoFrameCloseCallback:this.closenoPasssSubFrame,onBtnUnReasonClick:this.onBtnReasonClick}));return S}}]),t}(q.PureComponent),F=w))||F)||F);t.default=Y}}]);