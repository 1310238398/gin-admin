(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[47],{Jrvs:function(e,t,a){e.exports={frame:"web\\pages\\-mall\\-store-manage-info\\-store-manage-info-frame",headImage:"web\\pages\\-mall\\-store-manage-info\\-store-manage-info-headImage",headImageone:"web\\pages\\-mall\\-store-manage-info\\-store-manage-info-headImageone",title:"web\\pages\\-mall\\-store-manage-info\\-store-manage-info-title",titleo1:"web\\pages\\-mall\\-store-manage-info\\-store-manage-info-titleo1",popoverbackdrop:"web\\pages\\-mall\\-store-manage-info\\-store-manage-info-popoverbackdrop",imgresponsive:"web\\pages\\-mall\\-store-manage-info\\-store-manage-info-imgresponsive",main:"web\\pages\\-mall\\-store-manage-info\\-store-manage-info-main",topInfo:"web\\pages\\-mall\\-store-manage-info\\-store-manage-info-topInfo",warnLabel:"web\\pages\\-mall\\-store-manage-info\\-store-manage-info-warnLabel",topInfoLeft:"web\\pages\\-mall\\-store-manage-info\\-store-manage-info-topInfoLeft",topInfoCenter:"web\\pages\\-mall\\-store-manage-info\\-store-manage-info-topInfoCenter",topInfoRight:"web\\pages\\-mall\\-store-manage-info\\-store-manage-info-topInfoRight",form:"web\\pages\\-mall\\-store-manage-info\\-store-manage-info-form",formImage:"web\\pages\\-mall\\-store-manage-info\\-store-manage-info-formImage",label:"web\\pages\\-mall\\-store-manage-info\\-store-manage-info-label"}},U3Xj:function(e,t,a){"use strict";var l=a("tAuX"),n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("IzEo");var r=n(a("bx4M"));a("Telt");var o=n(a("Tckk"));a("+L6B");var u=n(a("2/Rp"));a("2qtc");var i=n(a("kLXV"));a("+BJd");var f=n(a("mr32")),s=n(a("2Taf")),d=n(a("vZ4D")),c=n(a("l4Ni")),m=n(a("ujKo")),g=n(a("MhPg")),p=l(a("q1tI")),h=a("+n12"),E=n(a("+kNj")),y=n(a("Jrvs")),b=E.default.Description,k=function(e){function t(){var e,a;(0,s.default)(this,t);for(var l=arguments.length,n=new Array(l),r=0;r<l;r++)n[r]=arguments[r];return a=(0,c.default)(this,(e=(0,m.default)(t)).call.apply(e,[this].concat(n))),a.state={bigImage:!1,ShowUrl:null,bigImageyingye:!1,ShowUrlyingye:null,bigImagefading:!1,ShowUrlfading:null},a.statusRender=function(e){switch(e){case 1:return p.default.createElement(f.default,{color:"blue"},"\u6b63\u5e38");case 2:return p.default.createElement(f.default,{color:"green"},"\u6b47\u4e1a");case 3:return p.default.createElement(f.default,{color:"red"},"\u6302\u8d77");default:return""}},a.tranSchange=function(e){return""!==e?parseFloat(e).toFixed(2):""},a.onBtnHangupOffClick=function(){var e=a.props,t=e.onShopInfoFrameCloseCallback,l=e.onHangupCallback,n=e.data;i.default.confirm({title:"\u64cd\u4f5c\u786e\u8ba4",content:"\u786e\u5b9a\u8981\u6302\u8d77\u6b64\u5546\u94fa\uff1f",okType:"danger",okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88",onOk:function(){l(n),t()}})},a.onBtnCancleOffClick=function(){var e=a.props,t=e.onShopInfoFrameCloseCallback,l=e.oncancelCallback,n=e.data;i.default.confirm({title:"\u64cd\u4f5c\u786e\u8ba4",content:"\u786e\u5b9a\u8981\u53d6\u6d88\u6302\u8d77\u6b64\u5546\u94fa\uff1f",okType:"danger",okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88",onOk:function(){l(n),t()}})},a}return(0,g.default)(t,e),(0,d.default)(t,[{key:"shouBigImage",value:function(e){this.setState({ShowUrl:e,bigImage:!0})}},{key:"shouBigImageyingye",value:function(e){this.setState({ShowUrlyingye:e,bigImageyingye:!0})}},{key:"shouBigImagefading",value:function(e){this.setState({ShowUrlfading:e,bigImagefading:!0})}},{key:"hideBigImage",value:function(){this.setState({bigImage:!1})}},{key:"hideBigImageyingye",value:function(){this.setState({bigImageyingye:!1})}},{key:"hideBigImagefading",value:function(){this.setState({bigImagefading:!1})}},{key:"render",value:function(){var e=this,t=this.props.data,a=null,l=null,n=null,f=null;a=t.portrait?t.portrait:"/s/defaultphoto/http.png",l=t.license_image?t.license_image:"/s/defaultphoto/http.png",t.persional_id_image?([n][0]=t.persional_id_image.split(","),[f][1]=t.persional_id_image.split(",")):n="/s/defaultphoto/http.png";var s=[p.default.createElement(u.default,{key:"close",onClick:this.props.onShopInfoFrameCloseCallback},"\u5173\u95ed"),p.default.createElement(u.default,{key:"writeoff",type:"danger",onClick:this.onBtnHangupOffClick},"\u6302\u8d77")],d=[p.default.createElement(u.default,{key:"close",onClick:this.props.onShopInfoFrameCloseCallback},"\u5173\u95ed"),p.default.createElement(u.default,{key:"writeoff",type:"danger",onClick:this.onBtnCancleOffClick},"\u53d6\u6d88\u6302\u8d77")],c=p.default.createElement(i.default,{className:y.default.frame,visible:!0,title:"\u5546\u94fa\u8be6\u60c5",destroyOnClose:!0,maskClosable:!1,onCancel:this.props.onShopInfoFrameCloseCallback,footer:1===t.store_status||2===t.store_status?s:d},p.default.createElement("div",{className:y.default.main},p.default.createElement(r.default,{title:"\u5e97\u94fa\u57fa\u672c\u4fe1\u606f",bordered:!1},p.default.createElement("div",{className:y.default.topInfo},p.default.createElement("div",{className:y.default.topInfoLeft},p.default.createElement(o.default,{src:a,shape:"circle",size:100,style:{marginLeft:49},onClick:function(){return e.shouBigImage(a)}})),p.default.createElement("div",{className:y.default.topInfoCenter},p.default.createElement("span",null,t.name),p.default.createElement("span",null,"\u5546\u94fa\u7ba1\u7406\u5458\uff1a",t.applicant_name),p.default.createElement("span",null,"\u5546\u94fa\u7535\u8bdd\uff1a",t.store_tel))),p.default.createElement("div",{className:y.default.form,style:{marginTop:25}},p.default.createElement(E.default,{title:"",size:"large",style:{marginBottom:32}},p.default.createElement(b,{term:"\u5546\u94fa\u7f16\u53f7"},t.store_code),p.default.createElement(b,{term:"\u5546\u94fa\u540d\u79f0"},t.name),p.default.createElement(b,{term:"\u8ba1\u79df\u9762\u79ef"},this.tranSchange(t.rent_area),"\u33a1")),p.default.createElement(E.default,{title:"",size:"large",style:{marginBottom:32}},p.default.createElement(b,{term:"\u4e1a\u6001"},t.store_type),p.default.createElement(b,{term:"\u5546\u94fa\u54c1\u724c"},""!==t.brand?t.brand:t.name),p.default.createElement(b,{term:"\u5546\u94fa\u7535\u8bdd"},t.store_tel)),p.default.createElement(E.default,{title:"",size:"large",col:3,style:{marginBottom:32}},p.default.createElement(b,{term:"\u5546\u94fa\u7ba1\u7406\u5458"},t.applicant_name),p.default.createElement(b,{term:"\u8054\u7cfb\u4eba\u7535\u8bdd"},t.applicant_tel),p.default.createElement(b,{term:"\u5546\u94fa\u5730\u5740"},t.business_address)),p.default.createElement(E.default,{title:"",size:"large",col:3,style:{marginBottom:32}},p.default.createElement(b,{term:"\u8425\u4e1a\u5f00\u59cb\u65f6\u95f4"},t.open_time),p.default.createElement(b,{term:"\u8425\u4e1a\u7ed3\u675f\u65f6\u95f4"},t.close_time)))),p.default.createElement(r.default,{title:"\u7ecf\u8425\u5355\u4f4d\u57fa\u672c\u4fe1\u606f",bordered:!1},p.default.createElement("div",{className:y.default.form},p.default.createElement(E.default,{title:"",size:"large",style:{marginBottom:32}},p.default.createElement(b,{term:"\u7edf\u4e00\u793e\u4f1a\u4fe1\u7528\u4ee3\u7801"},t.credit_code),p.default.createElement(b,{term:"\u7ecf\u8425\u5355\u4f4d\u540d\u79f0"},t.corporation),p.default.createElement(b,{term:"\u7ecf\u8425\u5355\u4f4d\u7c7b\u578b"},1===t.corporation_type?"\u4e2a\u4f53\u8425\u4e1a\u8005":"\u5de5\u5546\u4f01\u4e1a")),p.default.createElement(E.default,{title:"",size:"large",style:{marginBottom:32}},p.default.createElement(b,{term:"\u6cd5\u5b9a\u4ee3\u8868\u4eba"},t.legal_persion),p.default.createElement(b,{term:"\u7ecf\u8425\u8303\u56f4"},t.business_scope),p.default.createElement(b,{term:"\u8425\u4e1a\u6267\u7167\u6709\u6548\u671f"},t.issue_time&&""!==t.issue_time?(0,h.parseUtcTime)(t.issue_time,"YYYY-MM-DD"):"","\xa0\u81f3\xa0",t.expiration_time)),p.default.createElement(E.default,{title:"",size:"large",style:{marginBottom:32}},p.default.createElement(b,{term:"\u6cd5\u5b9a\u4ee3\u8868\u4eba\u4fe1\u606f"},p.default.createElement("div",{style:{display:"flex"}},n&&p.default.createElement("div",{className:y.default.formImage,style:{width:248,height:160,marginLeft:20}},p.default.createElement("img",{src:n,alt:"\u8eab\u4efd\u8bc1",onClick:function(){return e.shouBigImagefading(n)}})),f&&p.default.createElement("div",{className:y.default.formImage,style:{width:248,height:160,marginLeft:20}},p.default.createElement("img",{src:f,alt:"\u8eab\u4efd\u8bc1",onClick:function(){return e.shouBigImagefading(f)}}))))),p.default.createElement(E.default,{title:"",size:"large",style:{marginBottom:32}},p.default.createElement(b,{term:"\u8425\u4e1a\u6267\u7167"},p.default.createElement("div",{className:y.default.formImage,style:{width:147,height:147,marginLeft:20}},p.default.createElement("img",{src:l,alt:"\u8425\u4e1a\u6267\u7167",onClick:function(){return e.shouBigImageyingye(l)}})))),p.default.createElement(E.default,{title:"",size:"large",style:{marginBottom:32}},p.default.createElement(b,{term:"\u7533\u8bf7\u72b6\u6001"},this.statusRender(t.store_status)))))),this.state.bigImage?p.default.createElement("div",{className:y.default.popoverbackdrop,onClick:function(){return e.hideBigImage()}},p.default.createElement("img",{className:y.default.imgresponsive,src:this.state.ShowUrl,alt:"\u67e5\u770b\u5931\u8d25"})):null,this.state.bigImageyingye?p.default.createElement("div",{className:y.default.popoverbackdrop,onClick:function(){return e.hideBigImageyingye()}},p.default.createElement("img",{className:y.default.imgresponsive,src:this.state.ShowUrlyingye,alt:"\u67e5\u770b\u5931\u8d25"})):null,this.state.bigImagefading?p.default.createElement("div",{className:y.default.popoverbackdrop,onClick:function(){return e.hideBigImagefading()}},p.default.createElement("img",{className:y.default.imgresponsive,src:this.state.ShowUrlfading,alt:"\u67e5\u770b\u5931\u8d25"})):null);return c}}]),t}(p.PureComponent);t.default=k},"s+ZB":function(e,t,a){"use strict";var l=a("g09b"),n=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("g9YV");var r=l(a("wCAj"));a("IzEo");var o=l(a("bx4M"));a("OaEy");var u=l(a("2fM7"));a("iQDF");var i=l(a("+eQT"));a("14J3");var f=l(a("BMrR"));a("jCWc");var s=l(a("kPKH")),d=l(a("jehZ"));a("5NDa");var c=l(a("5rEg")),m=l(a("p0pE"));a("+BJd");var g=l(a("mr32"));a("qVdP");var p=l(a("jsC+"));a("+L6B");var h=l(a("2/Rp"));a("lUTK");var E=l(a("BvKs"));a("Pwec");var y=l(a("CtXQ"));a("2qtc");var b=l(a("kLXV")),k=l(a("2Taf")),v=l(a("vZ4D")),I=l(a("l4Ni")),C=l(a("ujKo")),w=l(a("rlhR")),S=l(a("MhPg"));a("y8nQ");var _,F,B,O,T=l(a("Vl3Y")),x=n(a("q1tI")),q=a("MuoO"),N=l(a("jcFm")),M=a("7tlc"),L=l(a("wd/R")),D=a("+n12"),U=l(a("U3Xj")),z=l(a("XZXw")),j=l(a("zwZs")),P=(_=(0,q.connect)(function(e){return{storeManage:e.storeManage}}),F=T.default.create(),_(B=F((O=function(e){function t(){var e,a;(0,k.default)(this,t);for(var l=arguments.length,n=new Array(l),r=0;r<l;r++)n[r]=arguments[r];return a=(0,I.default)(this,(e=(0,C.default)(t)).call.apply(e,[this].concat(n))),a.state={queryFormDisplay:!1,shopInfoFrame:{visible:!1,data:null}},a.queryForm=null,a.pagination={},a.onBtnSearchClick=function(){a.pagination={current:1,pageSize:10},a.queryForm=a.props.form.getFieldsValue(),(0,D.isObjectNullOrUndefinedOrEmpty)(a.queryForm)||((0,M.isNullOrUndefined)(a.queryForm.from)||(a.queryForm.from=parseInt(a.queryForm.from/1e3,10)),(0,M.isNullOrUndefined)(a.queryForm.to)||(a.queryForm.to=parseInt(a.queryForm.to/1e3,10)),(0,M.isNullOrUndefined)(a.queryForm.store_status)||(a.queryForm.store_status=parseInt(a.queryForm.store_status,10))),a.queryListData(a.queryForm,a.pagination)},a.onTableChange=function(e){var t=a.queryForm;a.queryListData(t,e)},a.onBtnClearClick=function(){a.props.form.resetFields()},a.onQueryFormToggleClick=function(){var e=a.state.queryFormDisplay;a.setState({queryFormDisplay:!e})},a.showStoreStatueInfoFrame=function(e){a.setState({shopInfoFrame:{visible:!0,data:e}})},a.onWriteOffCallback=function(e){a.setState({shopInfoFrame:{visible:!0,data:e,noPass:1}})},a.onPassOffCallback=function(e){a.props.dispatch({recordId:e.record_id}),a.closeSubFrame()},a.onUnAuthCallback=function(e){a.props.dispatch({res:e}),a.closeSubFrame()},a.closeSubFrame=function(){a.setState({shopInfoFrame:{visible:!1,data:null}})},a.ondeleCallback=function(e){b.default.confirm({title:"\u64cd\u4f5c\u786e\u8ba4",content:"\u786e\u8ba4\u8981\u5220\u9664\u6b64\u5546\u94fa\uff1f",okType:"danger",okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88",onOk:a.deleOff.bind((0,w.default)(a),e)})},a.deleOff=function(e){a.props.dispatch({type:"storeManage/writeOff",recordId:e.record_id}),a.closeSubFrame()},a.onhangupCallback=function(e){b.default.confirm({title:"\u64cd\u4f5c\u786e\u8ba4",content:"\u786e\u8ba4\u8981\u6302\u8d77\u6b64\u5546\u94fa\uff1f",okType:"danger",okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88",onOk:a.hangupOff.bind((0,w.default)(a),e)})},a.hangupOff=function(e){a.props.dispatch({type:"storeManage/hangUp",recordId:e.store_id}),a.closeSubFrame()},a.oncancelCallback=function(e){b.default.confirm({title:"\u64cd\u4f5c\u786e\u8ba4",content:"\u786e\u8ba4\u8981\u53d6\u6d88\u6302\u8d77\u6b64\u5546\u94fa\uff1f",okType:"danger",okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88",onOk:a.cancelOff.bind((0,w.default)(a),e)})},a.cancelOff=function(e){a.props.dispatch({type:"storeManage/cancle",recordId:e.store_id}),a.closeSubFrame()},a}return(0,S.default)(t,e),(0,v.default)(t,[{key:"componentDidMount",value:function(){this.props.dispatch({type:"storeManage/queryStorestatue"}),this.onBtnSearchClick()}},{key:"queryListData",value:function(e,t){this.props.dispatch({type:"storeManage/queryShopStatueTotalInfo",params:e,pagination:{current:t.current,pageSize:t.pageSize}})}},{key:"render",value:function(){var e=this,t=this.state.queryFormDisplay,a={labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:16}}},l=this.props.form.getFieldDecorator,n=this.props.storeManage,b=n.tableData,k=b.list,v=b.pagination,I=n.storeStatueList,C=n.loading,w="YYYY/MM/DD",S={display:t?"block":"none"},_=t?x.default.createElement("span",null,"\u6536\u8d77 ",x.default.createElement(y.default,{type:"up"})):x.default.createElement("span",null,"\u5c55\u5f00 ",x.default.createElement(y.default,{type:"down"})),F=120,B=[{title:"\u64cd\u4f5c",key:"operation",fixed:"left",width:100,render:function(t,a){return x.default.createElement(p.default,{placement:"bottomCenter",overlay:x.default.createElement(E.default,null,x.default.createElement(E.default.Item,{onClick:function(){return e.showStoreStatueInfoFrame(a)}},"\u67e5\u770b"),1===a.store_status||2===a.store_status?x.default.createElement(E.default.Item,{onClick:function(){return e.onhangupCallback(a)}},"\u6302\u8d77"):null,3===a.store_status?x.default.createElement(E.default.Item,{onClick:function(){return e.oncancelCallback(a)}},"\u53d6\u6d88\u6302\u8d77"):null,x.default.createElement(E.default.Item,{onClick:function(){return e.ondeleCallback(a)}},"\u5220\u9664"))},x.default.createElement(h.default,null,"\u64cd\u4f5c"))}},{title:"\u5e97\u94faLOGO",dataIndex:"portrait",render:function(e){return x.default.createElement("img",{src:e,alt:"",style:{width:60,height:60}})}},{title:"\u5e97\u94fa\u540d\u79f0",dataIndex:"name"},{title:"\u7ecf\u8425\u5355\u4f4d\u540d\u79f0",dataIndex:"corporation",width:400,render:function(e){return x.default.createElement("div",{title:e,className:j.default.des},e)}},{title:"\u6cd5\u5b9a\u4ee3\u8868\u4eba",dataIndex:"legal_persion"},{title:"\u7ecf\u8425\u8303\u56f4",dataIndex:"business_scope",width:F,render:function(e){return x.default.createElement("div",{title:e,className:j.default.address},e)}},{title:"\u7ecf\u8425\u5730\u5740",dataIndex:"business_address",width:F,render:function(e){return x.default.createElement("div",{title:e,className:j.default.address},e)}},{title:"\u5e97\u94fa\u7535\u8bdd",dataIndex:"store_tel"},{title:"\u5f00\u5e97\u901a\u8fc7\u65f6\u95f4",dataIndex:"passed",render:function(e){return""!==e&&0!==e?(0,D.formatTimestamp)(e):""}},{title:"\u5e97\u94fa\u72b6\u6001",dataIndex:"store_status",render:function(e){switch(e){case 1:return x.default.createElement(g.default,{color:"blue"},"\u6b63\u5e38");case 2:return x.default.createElement(g.default,{color:"green"},"\u6b47\u4e1a");case 3:return x.default.createElement(g.default,{color:"red"},"\u6302\u8d77");default:return null}}}],O=(0,m.default)({showSizeChanger:!0,showQuickJumper:!0,showTotal:function(e){return x.default.createElement("span",null,"\u5171",e,"\u6761\u8bb0\u5f55")}},v),q=x.default.createElement("div",null,x.default.createElement(z.default,{title:"\u5e97\u94fa\u7ba1\u7406"},x.default.createElement(o.default,{bordered:!1,style:{marginTop:"16px"}},x.default.createElement(T.default,null,x.default.createElement(f.default,null,x.default.createElement(s.default,{span:6},x.default.createElement(N.default,(0,d.default)({},a,{label:"\u5e97\u94fa\u540d\u79f0"}),l("name",{})(x.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165"})))),x.default.createElement(s.default,{span:8},x.default.createElement(N.default,(0,d.default)({},a,{label:"\u7ecf\u8425\u5355\u4f4d\u540d\u79f0"}),l("corporation",{})(x.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165"})))),x.default.createElement(s.default,{span:6},x.default.createElement(N.default,(0,d.default)({},a,{label:"\u6cd5\u5b9a\u4ee3\u8868\u4eba"}),l("legal_persion",{})(x.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165"}))))),x.default.createElement(f.default,null,x.default.createElement(s.default,{span:6},x.default.createElement(N.default,(0,d.default)({},a,{label:"\u5e97\u94fa\u7535\u8bdd"}),l("tel",{})(x.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165"})))),x.default.createElement(s.default,{span:8},x.default.createElement(N.default,(0,d.default)({},a,{label:"\u7533\u8bf7\u65e5\u671fFrom"}),l("from",{})(x.default.createElement(i.default,{format:w,style:{width:"100%"},showTime:{defaultValue:(0,L.default)("00:00:00","HH:mm:ss")}})))),x.default.createElement(s.default,{span:6},x.default.createElement(N.default,(0,d.default)({},a,{label:"\u7533\u8bf7\u65e5\u671fTo"}),l("to",{})(x.default.createElement(i.default,{format:w,style:{width:"100%"},showTime:{defaultValue:(0,L.default)("23:59:59","HH:mm:ss")}}))))),x.default.createElement(f.default,{style:(0,m.default)({},S)},x.default.createElement(s.default,{span:6},x.default.createElement(N.default,(0,d.default)({},a,{label:"\u5e97\u94fa\u72b6\u6001"}),l("store_status",{})(x.default.createElement(u.default,{placeholder:"\u8bf7\u9009\u62e9"},I.map(function(e){return x.default.createElement(u.default.Option,{key:e.code,value:e.code},e.name)})))))),x.default.createElement(f.default,null,x.default.createElement(s.default,{span:24,style:{textAlign:"right"}},x.default.createElement(h.default,{type:"primary",onClick:this.onBtnSearchClick},"\u67e5\u8be2"),x.default.createElement(h.default,{style:{marginLeft:8},onClick:this.onBtnClearClick},"\u6e05\u7a7a"),x.default.createElement("a",{style:{marginLeft:8,fontSize:12},onClick:this.onQueryFormToggleClick},_))))),x.default.createElement(o.default,{bordered:!1},x.default.createElement(r.default,{loading:C,dataSource:k,columns:B,scroll:{x:1800},onChange:this.onTableChange,pagination:O}))),this.state.shopInfoFrame.visible&&x.default.createElement(U.default,{data:this.state.shopInfoFrame.data,onShopInfoFrameCloseCallback:this.closeSubFrame,onHangupCallback:this.hangupOff,oncancelCallback:this.cancelOff}));return q}}]),t}(x.PureComponent),B=O))||B)||B);t.default=P}}]);