(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[28],{"1fEn":function(e,t,a){"use strict";var n=a("g09b"),o=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("IzEo");var r=n(a("bx4M"));a("+L6B");var l=n(a("2/Rp"));a("Pwec");var i=n(a("CtXQ"));a("nRaC");var u=n(a("5RzL")),d=n(a("p0pE")),c=n(a("2Taf")),s=n(a("vZ4D")),f=n(a("l4Ni")),p=n(a("ujKo")),h=n(a("MhPg"));a("y8nQ");var m,g,b,k,v=n(a("Vl3Y")),C=o(a("q1tI")),y=a("MuoO"),I=v.default.Item,E=(m=(0,y.connect)(function(e){return{boardManage:e.boardManage}}),g=v.default.create(),m(b=g((k=function(e){function t(e){var a;return(0,c.default)(this,t),a=(0,f.default)(this,(0,p.default)(t).call(this,e)),a.formSubmit=function(){a.props.form.validateFieldsAndScroll(function(e,t){if(!e){var n=(0,d.default)({},t);a.props.dispatch({type:"boardManage/submitColumns",payload:n})}})},a.state={columnids:e.boardManage.orgdata.desc.columnids},a}return(0,h.default)(t,e),(0,s.default)(t,[{key:"componentDidMount",value:function(){this.props.dispatch({type:"boardManage/queryColumnTree1"})}},{key:"componentDidUpdate",value:function(e,t,a){null!==a&&this.updateColumnids(a.orgdata.desc.columnids)}},{key:"getSnapshotBeforeUpdate",value:function(e){return this.props.boardManage!==e.boardManage?this.props.boardManage:null}},{key:"updateColumnids",value:function(e){this.setState({columnids:e})}},{key:"render",value:function(){var e=this.props,t=e.boardManage,a=t.configTreeData,n=t.submitting,o=e.form.getFieldDecorator,d=this.state.columnids,c={treeData:a,multiple:!0,showCheckedStrategy:u.default.SHOW_ALL,treeCheckStrictly:!0,dropdownStyle:{maxHeight:400,overflow:"auto"},placeholder:"\u8bf7\u9009\u62e9\u680f\u76ee",treeDefaultExpandAll:!0,allowClear:!0};return C.default.createElement(r.default,{title:"\u5c55\u677f\u9996\u9875\u4e00\u7ea7\u5bfc\u822a\u914d\u7f6e",loading:n,actions:[C.default.createElement(l.default,{onClick:this.formSubmit},C.default.createElement(i.default,{type:"save"}),"\u4fdd\u5b58")]},C.default.createElement(v.default,null,C.default.createElement(I,{label:"\u680f\u76ee"},o("columnids",{initialValue:d})(C.default.createElement(u.default,c)))))}}]),t}(C.PureComponent),b=k))||b)||b);t.default=E},Pjlz:function(e,t,a){"use strict";var n=a("g09b"),o=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("IzEo");var r=n(a("bx4M")),l=n(a("p0pE")),i=n(a("2Taf")),u=n(a("vZ4D")),d=n(a("l4Ni")),c=n(a("ujKo")),s=n(a("MhPg"));a("B9cy");var f,p,h,m=n(a("Ol7k")),g=o(a("q1tI")),b=a("MuoO"),k=n(a("isLq")),v=m.default.Content,C=(f=(0,b.connect)(function(e){return{boardManage:e.boardManage}}),f((h=function(e){function t(){var e,a;(0,i.default)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return a=(0,d.default)(this,(e=(0,c.default)(t)).call.apply(e,[this].concat(o))),a.state={id:null,name:null},a.onMenuChange=function(e){a.setState((0,l.default)({},e))},a}return(0,s.default)(t,e),(0,u.default)(t,[{key:"componentDidUpdate",value:function(e,t,a){var n=this;null!==a&&function(){n.setState({id:null})}()}},{key:"getSnapshotBeforeUpdate",value:function(e){return e.match.params.type!==this.props.match.params.type?this.props.match.params.type:null}},{key:"render",value:function(){var e=this.state,t=e.id,a=e.name,n=this.props.match.params.type,o="parks"===n?"\u56ed\u533a\u5c55\u677f\u7ba1\u7406":"enterprises"===n?"\u4f01\u4e1a\u5c55\u677f\u7ba1\u7406":"\u672a\u77e5";return g.default.createElement(r.default,{title:o},g.default.createElement(m.default,null,"parks"===n&&g.default.createElement(v,null,null===t?g.default.createElement(k.default,{orgid:"001",orgname:a}):null),"enterprises"===n&&g.default.createElement(v,null,g.default.createElement(k.default,{orgid:"002",orgname:a}))))}}]),t}(g.PureComponent),p=h))||p);t.default=C},QrY8:function(e,t,a){"use strict";var n=a("g09b"),o=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("2qtc");var r=n(a("kLXV"));a("+L6B");var l=n(a("2/Rp"));a("IzEo");var i=n(a("bx4M"));a("Pwec");var u,d,c,s=n(a("CtXQ")),f=n(a("gWZ8")),p=n(a("2Taf")),h=n(a("vZ4D")),m=n(a("l4Ni")),g=n(a("ujKo")),b=n(a("MhPg")),k=o(a("q1tI")),v=a("MuoO"),C=n(a("9DcN")),y=(u=(0,v.connect)(function(e){return{boardManage:e.boardManage}}),u((c=function(e){function t(e){var a;(0,p.default)(this,t),a=(0,m.default)(this,(0,g.default)(t).call(this,e)),a.onChangeFile=function(e){a.setState({fileList:(0,f.default)(e),chg:!0})},a.onClickLeft=function(e,t){var n=(0,f.default)(a.state.fileList);if(0!==t){var o=n[t-1];n[t-1]=e,n[t]=o,a.setState({fileList:(0,f.default)(n),chg:!0})}},a.onClickRight=function(e,t){var n=(0,f.default)(a.state.fileList);if(t!==n.length-1){var o=n[t+1];n[t+1]=e,n[t]=o,a.setState({fileList:(0,f.default)(n),chg:!0})}},a.onClickDelete=function(e,t){var n=a.state.fileList.filter(function(e,a){return t!==a});a.setState({fileList:(0,f.default)(n),chg:!0})},a.onClickView=function(e){a.setState({previewVisible:!0,previewImage:e,chg:!0})},a.onSave=function(){var e=a.state.fileList;a.setState({chg:!1}),a.props.dispatch({type:"boardManage/submitIcon",payload:{icon:e}})},a.handleCancel=function(){return a.setState({previewVisible:!1})},a.renderList=function(){var e=a.state.fileList,t={width:"33%",textAlign:"bottom"},n=e.map(function(e,n){return k.default.createElement(i.default.Grid,{key:"img_".concat(e),style:t},k.default.createElement(i.default,{style:{maxHeight:"250px"},cover:k.default.createElement("div",{style:{height:200,display:"flex",justifyContent:"center",alignItems:"center",padding:10}},k.default.createElement("img",{alt:e,src:e,style:{maxHeight:"200px",maxWidth:"100%"}})),actions:[k.default.createElement(s.default,{type:"left",onClick:function(){return a.onClickLeft(e,n)}}),k.default.createElement(s.default,{type:"delete",onClick:function(){return a.onClickDelete(e,n)}}),k.default.createElement(s.default,{type:"eye",onClick:function(){return a.onClickView(e,n)}}),k.default.createElement(s.default,{type:"right",onClick:function(){return a.onClickRight(e,n)}})]}))});return k.default.createElement(i.default,null,n)};var n=e.boardManage.orgdata.desc.icon?e.boardManage.orgdata.desc.icon:[];return a.state={fileList:n||[],previewVisible:!1,previewImage:"",chg:!1},a}return(0,b.default)(t,e),(0,h.default)(t,[{key:"componentDidUpdate",value:function(e,t,a){null!==a&&this.updateFileList(a)}},{key:"getSnapshotBeforeUpdate",value:function(e){if(this.props.boardManage!==e.boardManage){if(!this.props.boardManage)return[];if(!e.boardManage)return this.props.boardManage;var t=this.props.boardManage.orgdata.desc.icon||[],a=t.join(","),n=e.boardManage.orgdata.desc.icon||[],o=n.join(",");if(a!==o)return t}return null}},{key:"updateFileList",value:function(e){this.setState({fileList:(0,f.default)(e)})}},{key:"render",value:function(){var e=this.state,t=e.previewVisible,a=e.previewImage,n=e.fileList,o=this.props.submitting,u=!this.state.chg;return k.default.createElement(i.default,{title:k.default.createElement(C.default,{bucket:"cms",name:"data",num:9,listType:"text",accept:"image/*",showUploadList:!1,onChange:this.onChangeFile,value:n}),extra:k.default.createElement(l.default,{loading:o,onClick:this.onSave,disabled:u,type:"primary"},k.default.createElement(s.default,{type:"save"}),"\u4fdd\u5b58")},this.renderList(),k.default.createElement(r.default,{visible:t,onCancel:this.handleCancel,foot:null},k.default.createElement("img",{alt:"example",style:{width:"100%"},src:a})))}}]),t}(k.PureComponent),d=c))||d);t.default=y},Zg7o:function(e,t,a){"use strict";var n=a("g09b"),o=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("IzEo");var r=n(a("bx4M"));a("+L6B");var l=n(a("2/Rp"));a("Awhp");var i=n(a("KrTs"));a("2qtc");var u=n(a("kLXV")),d=n(a("p0pE")),c=n(a("2Taf")),s=n(a("vZ4D")),f=n(a("l4Ni")),p=n(a("ujKo")),h=n(a("rlhR")),m=n(a("MhPg"));a("y8nQ");var g,b,k,v,C=n(a("Vl3Y")),y=o(a("q1tI")),I=a("MuoO"),E=a("+n12"),D=a("riZX"),M=n(a("LeT2")),S=(g=(0,I.connect)(function(e){return{boardManage:e.boardManage,boardColumn:e.boardColumn,loading:e.loading.models.boardColumn}}),b=C.default.create(),g(k=b((v=function(e){function t(){var e,a;(0,c.default)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return a=(0,f.default)(this,(e=(0,p.default)(t)).call.apply(e,[this].concat(o))),a.state={dataFormID:"",dataDetail:!1,dataColumnID:"",searchObj:{status:[0,1],org:"",range:1}},a.onTableChange=function(e){a.props.dispatch({type:"boardColumn/fetch",pagination:{current:e.current,pageSize:e.pageSize}})},a.onResetFormClick=function(){var e=a.props.orgid;a.props.form.resetFields(),a.props.dispatch({type:"boardColumn/saveSearch",payload:{status:[0,1],org:e,range:1}}),a.refreshTree(),a.props.dispatch({type:"boardColumn/fetch"})},a.onSearchFormSubmit=function(e){var t=a.props.orgid,n=(0,d.default)({},e);n.org=t,n.range=1,a.props.dispatch({type:"boardColumn/fetch",payload:n})},a.onDataFormCallback=function(e){e&&"ok"===e&&(a.props.dispatch({type:"boardColumn/fetch"}),a.refreshTree()),a.showStep(-1)},a.onDataDetailCallback=function(){a.setState({dataDetail:!1,dataColumnID:"",step:-1})},a.onItemDetailClick=function(e){a.setState({dataDetail:!0,dataColumnID:e})},a.onAddClick=function(){a.setState({dataFormID:""},function(){a.showStep(0)})},a.onItemDescClick=function(e){a.setState({dataFormID:e},function(){a.showStep(0)})},a.onItemCtrlClick=function(e){a.setState({dataFormID:e},function(){a.showStep(1)})},a.onItemExtraClick=function(e){a.setState({dataFormID:e},function(){a.showStep(2)})},a.onDelOKClick=function(e){a.props.dispatch({type:"boardColumn/del",payload:e}),a.refreshTree()},a.onItemDeleteClick=function(e){u.default.confirm({title:"\u786e\u5b9a\u5220\u9664\u8be5\u6570\u636e\u5417\uff1f",okText:"\u786e\u8ba4",okType:"danger",cancelText:"\u53d6\u6d88",onOk:a.onDelOKClick.bind((0,h.default)(a),e)})},a.onItemLockClick=function(e){u.default.confirm({title:"\u786e\u5b9a\u9501\u5b9a\u8be5\u680f\u76ee\u5417\uff1f",okText:"\u786e\u8ba4",okType:"danger",cancelText:"\u53d6\u6d88",onOk:function(){a.props.dispatch({type:"boardColumn/lock",payload:e}),a.refreshTree()}})},a.onItemUnLockClick=function(e){u.default.confirm({title:"\u786e\u5b9a\u89e3\u9501\u8be5\u680f\u76ee\u5417\uff1f",okText:"\u786e\u8ba4",okType:"danger",cancelText:"\u53d6\u6d88",onOk:function(){a.props.dispatch({type:"boardColumn/unlock",payload:e}),a.refreshTree()}})},a.onItemRecoverClick=function(e){u.default.confirm({title:"\u786e\u5b9a\u8981\u6062\u590d\u680f\u76ee\u5417\uff1f",okText:"\u786e\u8ba4",okType:"danger",cancelText:"\u53d6\u6d88",onOk:function(){a.props.dispatch({type:"boardColumn/recover",payload:e}),a.refreshTree()}})},a.onItemDestroyClick=function(e){u.default.confirm({title:"\u786e\u5b9a\u5f7b\u5e95\u5220\u9664\u8be5\u680f\u76ee\u5417\uff1f\u5f7b\u5e95\u5220\u9664\u540e\u4e0d\u80fd\u6062\u590d\u3002",okText:"\u786e\u8ba4",okType:"danger",cancelText:"\u53d6\u6d88",onOk:function(){a.props.dispatch({type:"boardColumn/destroy",payload:e}),a.refreshTree()}})},a.showStep=function(e){a.setState({step:e})},a.refreshTree=function(){var e=a.props.orgid;a.props.dispatch({type:"boardColumn/queryColumnTree",org:e})},a.onItemViewClick=function(e){a.setState({dataDetail:!0,dataColumnID:e})},a.renderDataForm=function(){if(a.state.step>-1)return y.default.createElement(D.ColumnEdit,{columnId:a.state.dataFormID,orgid:a.props.orgid,step:a.state.step,callback:a.onDataFormCallback})},a.renderDataDetail=function(){if(a.state.dataDetail)return y.default.createElement(D.ColumnCard,{id:a.state.dataColumnID,callback:a.onDataDetailCallback,visible:!0})},a.creOps=function(e){if(0!==e.desc.kind)return null;var t=[];return 0===e.status.status&&t.push({icon:"edit",name:"\u4fee\u6539\u63cf\u8ff0",handler:function(){return a.onItemDescClick(e.column_id)}}),0===e.status.status&&t.push({icon:"edit",name:"\u63a7\u5236\u53c2\u6570",handler:function(){return a.onItemCtrlClick(e.column_id)}}),0===e.status.status&&t.push({icon:"edit",name:"\u6269\u5c55\u5c5e\u6027",handler:function(){return a.onItemExtraClick(e.column_id)}}),0===e.status.status&&t.push({icon:"delete",name:"\u5220\u9664",handler:function(){return a.onItemDeleteClick(e.column_id)}}),0===e.status.status&&t.push({icon:"lock",name:"\u9501\u5b9a",handler:function(){return a.onItemLockClick(e.column_id)}}),1===e.status.status&&t.push({icon:"unlock",name:"\u89e3\u9501",handler:function(){return a.onItemUnLockClick(e.column_id)}}),-1===e.status.status&&t.push({icon:"reload",name:"\u6062\u590d",handler:function(){return a.onItemRecoverClick(e.column_id)}}),-1===e.status.status&&t.push({icon:"close",name:"\u5f7b\u5e95\u5220\u9664",handler:function(){return a.onItemDestroyClick(e.column_id)}}),t},a}return(0,m.default)(t,e),(0,s.default)(t,[{key:"componentDidMount",value:function(){var e=this.props.orgid;this.props.dispatch({type:"boardColumn/saveOrgid",payload:e});var t=this.state.searchObj;t.org=e,this.setState({searchObj:t}),this.props.dispatch({type:"boardColumn/saveSearch",payload:(0,d.default)({},t)}),this.props.dispatch({type:"boardColumn/fetch"}),this.refreshTree()}},{key:"render",value:function(){var e=this,t=this.props,a=t.loading,n=t.boardColumn.data,o=n.list,u=n.pagination,d=this.state.searchObj,c=[{title:"\u680f\u76ee\u540d\u79f0",dataIndex:"desc.name",width:200,render:function(t,a){return y.default.createElement("span",{onClick:function(){return e.onItemDetailClick(a.column_id)}},t)}},{title:"\u77ed\u540d\u79f0",dataIndex:"desc.short_name",width:100},{title:"\u72b6\u6001",dataIndex:"status.status",width:100,render:function(e){switch(e){case-1:return y.default.createElement(i.default,{status:"default",text:"\u5df2\u5220\u9664"});case 0:return y.default.createElement(i.default,{status:"proccess",text:"\u672a\u9501\u5b9a"});case 1:return y.default.createElement(i.default,{status:"success",text:"\u5df2\u9501\u5b9a"});default:return y.default.createElement(i.default,{status:"error",text:"\u672a\u77e5"})}}},{title:"\u680f\u76ee\u7c7b\u578b",dataIndex:"desc.kind",render:function(e){var t="";return 0===e&&(t="\u4e00\u822c\u680f\u76ee"),1===e&&(t="\u7cfb\u7edf\u680f\u76ee"),2===e&&(t="\u4e13\u9898\u680f\u76ee"),3===e&&(t="\u4ea4\u6d41\u4e92\u52a8"),y.default.createElement("span",null,t)}},{title:"\u521b\u5efa\u7528\u6237",dataIndex:"operator.creator_name"},{title:"\u521b\u5efa\u65f6\u95f4",dataIndex:"operator.cre_time",render:function(e){return y.default.createElement("span",null,(0,E.parseUtcTime)(e))}}],s={sm:24,md:24,lg:24,xl:12,xxl:8};return y.default.createElement(r.default,{bordered:!1},y.default.createElement(D.ColumnSearch,{onSearch:this.onSearchFormSubmit,hide:{org:!0},col:s,searchObj:d}),y.default.createElement(M.default,{loading:a,ops:this.creOps,title:function(){return y.default.createElement(l.default,{icon:"plus",type:"primary",onClick:function(){return e.onAddClick()}},"\u65b0\u5efa")},rowKey:function(e){return e.column_id},dataSource:o,columns:c,pagination:u,onChange:this.onTableChange,scroll:{x:1e3},onRow:function(t){return{onClick:function(){e.onItemViewClick(t.column_id)}}}}),this.renderDataForm(),this.renderDataDetail())}}]),t}(y.PureComponent),k=v))||k)||k);t.default=S},isLq:function(e,t,a){"use strict";var n=a("g09b"),o=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("IzEo");var r=n(a("bx4M"));a("+L6B");var l=n(a("2/Rp"));a("5Dmo");var i,u,d,c=n(a("3S7+")),s=n(a("2Taf")),f=n(a("vZ4D")),p=n(a("l4Ni")),h=n(a("ujKo")),m=n(a("MhPg")),g=o(a("q1tI")),b=a("MuoO"),k=n(a("QrY8")),v=n(a("Zg7o")),C=n(a("1fEn")),y=n(a("zEiX")),I=(i=(0,b.connect)(function(e){return{boardManage:e.boardManage}}),i((d=function(e){function t(e){var a;(0,s.default)(this,t),a=(0,p.default)(this,(0,h.default)(t).call(this,e)),a.state={tabKey:"images"},a.onClickOpen=function(){var e=a.props.orgid;a.props.dispatch({type:"boardManage/openOrg",orgid:e})},a.onTabChange=function(e){a.setState({tabKey:e})},a.onClickPublish=function(){var e=a.props.orgid;a.props.dispatch({type:"boardManage/publishOrg",orgid:e})},a.onClickNoPublish=function(){var e=a.props.orgid;a.props.dispatch({type:"boardManage/noPublishOrg",orgid:e})},a.handleTabChange=function(e){switch(e){case"images":break;case"columns":break;default:}};var n=a.props.orgid;return n&&a.props.dispatch({type:"boardManage/fetchOrg",orgid:n}),a}return(0,m.default)(t,e),(0,f.default)(t,[{key:"componentDidUpdate",value:function(e){"orgid"in e&&e.orgid!==this.props.orgid&&this.props.dispatch({type:"boardManage/fetchOrg",orgid:this.props.orgid})}},{key:"render",value:function(){var e=this,t=this.props,a=t.orgname,n=t.orgid,o=t.boardManage,i=o.loading,u=o.exists,d=o.orgdata,s=this.state.tabKey,f=g.default.createElement(c.default,{title:n,mouseEnterDelay:1},g.default.createElement("span",null,a)),p=[{key:"images",tab:"\u5c55\u793a\u56fe\u7247"},{key:"columns",tab:"\u680f\u76ee\u7ba1\u7406"},{key:"parks",tab:"\u5c55\u677f\u7ba1\u7406"},{key:"infos",tab:"\u4fe1\u606f\u7ba1\u7406"}],h={loading:i,title:f};u&&(h.tabList=p,h.activeTabKey=s,h.onTabChange=function(t){e.onTabChange(t,"key")});var m=d.desc&&d.desc.status?d.desc.status:0;return h.extra=0===m?g.default.createElement(l.default,{onClick:this.onClickPublish},"\u53d1\u5e03"):1===m?g.default.createElement(l.default,{onClick:this.onClickNoPublish},"\u53d6\u6d88\u53d1\u5e03"):"",g.default.createElement(r.default,h,!u&&g.default.createElement(l.default,{onClick:this.onClickOpen},"\u5f00\u901a\u5c55\u677f"),u&&"images"===s&&g.default.createElement(k.default,{orgid:n}),u&&"columns"===s&&g.default.createElement(v.default,{orgid:n}),u&&"parks"===s&&g.default.createElement(C.default,{orgid:n}),u&&"infos"===s&&g.default.createElement(y.default,{orgid:n}))}}]),t}(g.PureComponent),u=d))||u);t.default=I},zEiX:function(e,t,a){"use strict";var n=a("g09b"),o=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("IzEo");var r,l,i,u=n(a("bx4M")),d=n(a("p0pE")),c=n(a("jehZ")),s=n(a("2Taf")),f=n(a("vZ4D")),p=n(a("l4Ni")),h=n(a("ujKo")),m=n(a("MhPg")),g=o(a("q1tI")),b=a("MuoO"),k=a("+n12"),v=a("e2PP"),C=n(a("F6yL")),y=a("riZX"),I=(r=(0,b.connect)(function(e){return{boardManage:e.boardManage,boardInfo:e.boardInfo}}),r((i=function(e){function t(){var e,a;(0,s.default)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return a=(0,p.default)(this,(e=(0,h.default)(t)).call.apply(e,[this].concat(o))),a.state={dataForm:!1,dataInfo:!1,dataInfoID:""},a.searchObj={status:[0,2,5]},a.onItemViewClick=function(e){a.setState({dataInfo:!0,dataInfoID:e})},a.onTableChange=function(e){a.props.dispatch({type:"boardInfo/fetch",pagination:{current:e.current,pageSize:e.pageSize}})},a.onSearch=function(e){a.props.dispatch({type:"boardInfo/fetch",payload:e})},a.onDataFormCallback=function(e){a.setState({dataForm:!1,dataFormID:""}),e&&a.props.dispatch({type:"boardInfo/fetch"})},a.onItemDesc=function(e){a.setState({dataForm:!0,dataFormID:e})},a.onDataInfoCallback=function(e){"ok"===e&&a.props.dispatch({type:"boardInfo/fetch"}),a.setState({dataInfo:!1,dataInfoID:""})},a.onTableCallback=function(e){"ok"===e&&a.props.dispatch({type:"boardInfo/fetch"})},a.renderNewButton=function(){var e={callback:a.onDataFormCallback,org:a.props.boardManage.orgid,hideOrg:!0};a.state.dataForm&&(e.id=a.state.dataFormID,e.datatype=a.state.dataType);var t={visible:a.state.dataForm,edit:e};return g.default.createElement(v.NewButton,(0,c.default)({},t,{mode:"button"}))},a.renderDataInfo=function(){if(a.state.dataInfo)return g.default.createElement(v.InfoCard,{id:a.state.dataInfoID,callback:a.onDataInfoCallback})},a}return(0,m.default)(t,e),(0,f.default)(t,[{key:"componentDidMount",value:function(){var e=this.props.orgid;this.searchObj=(0,d.default)({},this.searchObj,{org:e}),this.props.dispatch({type:"boardInfo/saveOrgid",payload:e}),this.props.dispatch({type:"boardInfo/saveSearch",payload:{}}),this.props.dispatch({type:"boardInfo/fetch",payload:(0,d.default)({},this.searchObj)})}},{key:"render",value:function(){var e=this,t=this.props,a=t.boardInfo,n=a.loading,o=a.data,r=o.list,l=o.pagination,i=t.boardManage.orgid,c=[{title:"\u72b6\u6001",dataIndex:"status.status",width:100,render:function(e){return g.default.createElement(v.InfoStatus,{code:e})}},{title:"\u6240\u5c5e\u680f\u76ee",dataIndex:"desc.column_id",width:100,render:function(e){return g.default.createElement(y.ColumnShow,{value:e})}},{title:"\u6807\u9898",dataIndex:"desc.title",width:350},{title:"\u521b\u5efa\u7528\u6237",dataIndex:"operator.creator",width:100,render:function(e){return g.default.createElement(C.default,{uid:e})}},{title:"\u521b\u5efa\u65f6\u95f4",dataIndex:"operator.cre_time",render:function(e){return g.default.createElement("span",null," ",(0,k.parseUtcTime)(e)," ")}}],s=(0,d.default)({},l),f={title:function(){return e.renderNewButton()},loading:n,rowKey:function(e){return e.info_id},dataSource:r,columns:c,pagination:s,onChange:this.onTableChange,scroll:{x:1e3},onRow:function(t){return{onClick:function(){e.onItemViewClick(t.info_id)}}}},p={sm:24,md:24,lg:24,xl:12,xxl:8};return g.default.createElement(u.default,{bordered:!1},g.default.createElement(v.InfoSearch,{onSearch:this.onSearch,hide:{org:1},searchObj:{org:i},col:p}),g.default.createElement(v.InfoTableList,{tableProps:f,onCallBack:function(t){return e.onTableCallback(t)},infoOps:{edit:{handler:function(t){e.onItemDesc(t.info_id,t)}}}}),this.renderDataInfo())}}]),t}(g.PureComponent),l=i))||l);t.default=I}}]);