(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{"41qo":function(e,t,a){e.exports={videoEquipmentList:"web\\pages\\-building\\-device\\-video-equipment\\-video-equipment-list-videoEquipmentList",buttons:"web\\pages\\-building\\-device\\-video-equipment\\-video-equipment-list-buttons"}},"8rb4":function(e,t,a){"use strict";var n=a("tAuX"),l=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("g9YV");var i=l(a("wCAj")),r=l(a("p0pE"));a("Pwec");var d=l(a("CtXQ")),o=l(a("2Taf")),u=l(a("vZ4D")),c=l(a("l4Ni")),s=l(a("ujKo")),f=l(a("MhPg")),p=n(a("q1tI")),m=a("6LfW"),h=l(a("rZaG")),v=l(a("41qo")),E=function(e){function t(){var e,a;(0,o.default)(this,t);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return a=(0,c.default)(this,(e=(0,s.default)(t)).call.apply(e,[this].concat(l))),a.state={selectedRowKeys:[],selectedRows:[]},a.handleTableSelectRow=function(e,t){a.setState({selectedRowKeys:e,selectedRows:t})},a.columns=function(){return[{title:"\u8bbe\u5907\u540d\u79f0",dataIndex:"name",width:250,render:function(e,t){return 1===t.flag?p.default.createElement(p.default.Fragment,null,p.default.createElement("span",null,e),p.default.createElement(d.default,{type:"fire",styles:{color:"red"}})):p.default.createElement("span",null,e)}},{title:"\u8bbe\u5907\u7c7b\u578b",dataIndex:"device_type",width:100,render:function(e){return p.default.createElement(m.DicShow,{pcode:"OPER$#monitor_category",code:[e],show:function(e){return e}})}},{title:"\u4e09\u65b9\u7cfb\u7edf",dataIndex:"third_name",width:100},{title:"\u89c6\u9891\u7f16\u53f7",dataIndex:"device_code",width:100}]},a.onAddClick=function(){var e=a.props.onAddClick;a.setState({selectedRowKeys:[],selectedRows:[]},function(){e()})},a}return(0,f.default)(t,e),(0,u.default)(t,[{key:"componentWillReceiveProps",value:function(e){return e.list!==this.props.list&&this.setState({selectedRowKeys:[],selectedRows:[]}),!0}},{key:"render",value:function(){var e=this,t=this.state,a=t.selectedRowKeys,n=t.selectedRows,l=this.props,d=l.pagination,o=l.list,u=l.loading,c=l.selectBuilding,s=l.onItemEditClick,f=l.onItemMigrationClick,m=l.onTableChange,E=(0,r.default)({showSizeChanger:!0,showQuickJumper:!0,showTotal:function(e){return p.default.createElement("span",null,"\u5171",e,"\u6761")}},d);return p.default.createElement("div",{className:v.default.videoEquipmentList},p.default.createElement("div",{className:v.default.buttons},null!==c?p.default.createElement(h.default,{icon:"plus",key:"add",code:"add",type:"primary",onClick:function(){e.onAddClick()}},"\u65b0\u589e\u8bbe\u5907"):null,1===n.length&&[p.default.createElement(h.default,{key:"edit",code:"edit",icon:"edit",onClick:function(){return s(n[0])}},"\u7f16\u8f91"),p.default.createElement(h.default,{key:"del",code:"del",icon:"delete",type:"danger",onClick:function(){return f(n[0])}},"\u5220\u9664")]),p.default.createElement(i.default,{rowSelection:{selectedRowKeys:a,onChange:this.handleTableSelectRow},loading:u,rowKey:function(e){return e.record_id},dataSource:o,columns:this.columns(),pagination:E,onChange:m}))}}]),t}(p.PureComponent);t.default=E},"K/3n":function(e,t,a){"use strict";var n=a("tAuX"),l=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("2qtc");var i=l(a("kLXV")),r=l(a("2Taf")),d=l(a("vZ4D")),o=l(a("l4Ni")),u=l(a("ujKo")),c=l(a("MhPg")),s=n(a("q1tI")),f=l(a("ogJW")),p=function(e){function t(e){var a;return(0,r.default)(this,t),a=(0,o.default)(this,(0,u.default)(t).call(this,e)),a.onCancelClick=function(){var e=a.props.callback;e()},a.onOKClick=function(){var e=a.state.address;a.props.onSubmit(e)},a.handleFormChange=function(e,t){a.setState({address:{record_id:t.record_id,name:e}})},a.state={data:e.formData?e.formData:{},address:{}},a}return(0,c.default)(t,e),(0,d.default)(t,[{key:"render",value:function(){var e=this.props,t=e.visible,a=e.onCancel,n=this.state.address;return s.default.createElement(i.default,{title:"\u9009\u62e9\u6240\u5c5e\u5206\u7ec4",width:347,visible:t,maskClosable:!1,destroyOnClose:!0,onOk:this.onOKClick,onCancel:a,style:{top:20},bodyStyle:{maxHeight:"calc( 100vh - 158px )",overflowY:"auto"}},s.default.createElement(f.default,{data:n,onChange:this.handleFormChange}))}}]),t}(s.PureComponent),m=p;t.default=m},NRSZ:function(e,t,a){"use strict";var n=a("g09b"),l=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("2qtc");var i=n(a("kLXV"));a("IzEo");var r=n(a("bx4M"));a("14J3");var d=n(a("BMrR"));a("+L6B");var o=n(a("2/Rp"));a("iQDF");var u=n(a("+eQT"));a("jCWc");var c=n(a("kPKH")),s=n(a("jehZ")),f=n(a("gWZ8")),p=n(a("p0pE")),m=n(a("2Taf")),h=n(a("vZ4D")),v=n(a("l4Ni")),E=n(a("ujKo")),g=n(a("rlhR")),y=n(a("MhPg"));a("y8nQ");var C=n(a("Vl3Y"));a("OaEy");var k=n(a("2fM7"));a("5NDa");var b,q,_,S,w=n(a("5rEg")),D=l(a("q1tI")),I=a("6LfW"),F=n(a("wd/R")),M=a("MuoO"),P=n(a("gYS4")),V=l(a("4i3h")),R=n(a("ykPU")),T=n(a("K/3n")),x=n(a("8nCW")),K=w.default.TextArea,O=(k.default.Option,b=(0,M.connect)(function(e){return{videoEquipment:e.videoEquipment}}),q=C.default.create(),b(_=q((S=function(e){function t(){var e,a;(0,m.default)(this,t);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return a=(0,v.default)(this,(e=(0,E.default)(t)).call.apply(e,[this].concat(l))),a.dateFormat="YYYY-MM-DDTHH:mm:ssZ",a.onModalOKClick=function(){var e=a.props,t=(e.selectBuilding,e.onSaved),n=e.videoEquipment.formSBID;e.videoEquipment.positions;a.props.form.validateFieldsAndScroll(function(e,l){if(!e)if(n){var i=a.props.videoEquipment.formSBData,r=(0,p.default)({},i,l);r.installation_date&&(r.installation_date=r.installation_date.format(a.dateFormat)),r.manufacture_date&&(r.manufacture_date=r.manufacture_date.format(a.dateFormat)),V.updateEq(r).then(function(){t(r)})}else{var d={name:l.name,device_code:l.device_code,device_type:l.device_type,device_model:l.device_model,norm_value:l.norm_value,memo:l.memo,positions:l.positions,third_id:l.third_id,installation_date:l.installation_date?l.installation_date.format(a.dateFormat):null,manufacture_date:l.manufacture_date?l.manufacture_date.format(a.dateFormat):null};V.createEq(d).then(function(){t()})}})},a.onModalCancelClick=function(){var e=a.props.onClose;e()},a.onAddGroup=function(){a.props.dispatch({type:"videoEquipment/changeFormVisibleStock",payload:!0})},a.handleDataFormCancel=function(){a.props.dispatch({type:"videoEquipment/changeFormVisibleStock",payload:!1})},a.handleDataFormSubmit=function(e){for(var t=a.props.form,n=t.getFieldValue("positions"),l=!1,i=0;i<n.length;i+=1)if(n[i].record_id===e.record_id){l=!0;break}l||(n=[].concat((0,f.default)(n),[e])),t.setFieldsValue({positions:n}),a.handleDataFormCancel()},a.onAddSeeLive=function(){var e=a.props.videoEquipment.formSBData;a.props.dispatch({type:"videoEquipment/loadSeeForm",payload:e,callback:a.handleCallback.bind((0,g.default)(a))})},a.handleCallback=function(){a.props.dispatch({type:"videoEquipment/changeFormSeeVisible",payload:!0})},a.handleFormCancel=function(){a.props.dispatch({type:"videoEquipment/changeFormSeeVisible",payload:!1})},a}return(0,y.default)(t,e),(0,h.default)(t,[{key:"componentWillMount",value:function(){var e=this.props.selectBuilding;this.props.dispatch({type:"videoEquipment/seeListInfo",payload:{record_id:e}})}},{key:"renderDataForm",value:function(){var e=this.props.videoEquipment,t=e.formSeeVisible,a=e.formSeeTitle,n=e.formSeeData;return t&&D.default.createElement(x.default,{visible:t,title:a,formData:n,onCancel:this.handleFormCancel})}},{key:"renderGroupForm",value:function(){var e=this.props.videoEquipment.formVisibleStock;return D.default.createElement(T.default,{visible:e,onCancel:this.handleDataFormCancel,onSubmit:this.handleDataFormSubmit})}},{key:"render",value:function(){var e=this,t=this.props,a=t.videoEquipment,n=a.formSBData,l=a.selectList,f=a.formSBID,p=a.positions,m=t.form.getFieldDecorator,h=t.editVisible,v=n&&n.manufacture_date?(0,F.default)(n.manufacture_date,"YYYY-MM-DD"):null,E=n&&n.installation_date?(0,F.default)(n.installation_date,"YYYY-MM-DD"):null,g=n&&n.positions?n.positions:p,y={labelCol:{xs:{span:24},sm:{span:10}},wrapperCol:{xs:{span:24},sm:{span:14}}},b={labelCol:{xs:{span:24},sm:{span:5}},wrapperCol:{xs:{span:24},sm:{span:19}}},q={sm:24,md:12},_={sm:24,md:24};return D.default.createElement(i.default,{title:f?"\u7f16\u8f91\u89c6\u9891\u8bbe\u5907":"\u65b0\u589e\u89c6\u9891\u8bbe\u5907",width:800,visible:h,okText:"\u4fdd\u5b58",cancelText:"\u5173\u95ed",onOk:this.onModalOKClick,onCancel:this.onModalCancelClick},D.default.createElement(r.default,{bordered:!1,className:P.default.gate},D.default.createElement(C.default,null,D.default.createElement(d.default,{span:24},D.default.createElement(c.default,q,D.default.createElement(C.default.Item,(0,s.default)({},y,{label:"\u89c6\u9891\u8bbe\u5907\u7f16\u53f7"}),m("device_code",{initialValue:n.device_code||"",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u89c6\u9891\u8bbe\u5907\u7f16\u53f7"}]})(D.default.createElement(w.default,{placeholder:"\u8bf7\u8f93\u5165\u89c6\u9891\u8bbe\u5907\u7f16\u53f7"})))),D.default.createElement(c.default,q,D.default.createElement(C.default.Item,(0,s.default)({},y,{label:"\u89c6\u9891\u8bbe\u5907\u540d\u79f0"}),m("name",{initialValue:n.name,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u89c6\u9891\u8bbe\u5907\u540d\u79f0"}]})(D.default.createElement(w.default,{placeholder:"\u8bf7\u8f93\u5165\u89c6\u9891\u8bbe\u5907\u540d\u79f0"})))),D.default.createElement(c.default,q,D.default.createElement(C.default.Item,(0,s.default)({},y,{label:"\u8bbe\u5907\u7c7b\u578b"}),m("device_type",{initialValue:n.device_type,rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u8bbe\u5907\u7c7b\u578b"}]})(D.default.createElement(I.DicSelect,{vmode:"int",pcode:"OPER$#monitor_category",selectProps:{placeholder:"\u8bf7\u9009\u62e9"}})))),D.default.createElement(c.default,q,D.default.createElement(C.default.Item,(0,s.default)({},y,{label:"\u4e09\u65b9\u7cfb\u7edf"}),m("third_id",{initialValue:n.third_id,rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u4e09\u65b9\u7cfb\u7edf"}]})(D.default.createElement(k.default,{placeholder:"\u8bf7\u9009\u62e9",style:{width:"100%"}},l.map(function(e){return D.default.createElement(k.default.Option,{key:e.record_id,value:e.record_id},e.name)}))))),D.default.createElement(c.default,q,D.default.createElement(C.default.Item,(0,s.default)({},y,{label:"\u8bbe\u5907\u751f\u4ea7\u65e5\u671f"}),m("manufacture_date",{initialValue:v,rules:[{required:!1,message:"\u8bbe\u5907\u751f\u4ea7\u65e5\u671f"}]})(D.default.createElement(u.default,{format:"YYYY-MM-DD",showToday:!1,style:{width:"100%"}})))),D.default.createElement(c.default,q,D.default.createElement(C.default.Item,(0,s.default)({},y,{label:"\u8bbe\u5907\u5b89\u88c5\u65e5\u671f"}),m("installation_date",{initialValue:E,rules:[{required:!1,message:"\u8bbe\u5907\u5b89\u88c5\u65e5\u671f"}]})(D.default.createElement(u.default,{format:"YYYY-MM-DD",showToday:!1,style:{width:"100%"}})))),D.default.createElement(c.default,q,D.default.createElement(C.default.Item,(0,s.default)({},y,{label:"\u6240\u5c5e\u5206\u7ec4"}),m("norm_value",{rules:[{required:!1,message:"\u6240\u5c5e\u5206\u7ec4"}]})(D.default.createElement(o.default,{icon:"plus",type:"primary",onClick:function(){return e.onAddGroup()}},"\u65b0\u589e\u6240\u5c5e\u5206\u7ec4")))),D.default.createElement(c.default,(0,s.default)({},q,{className:P.default.seeBtn}),D.default.createElement(C.default.Item,y,D.default.createElement(o.default,{type:"primary",icon:"eye",onClick:function(){return e.onAddSeeLive()}}," ","\u67e5\u770b\u5b9e\u51b5"))),D.default.createElement(c.default,_,D.default.createElement(C.default.Item,(0,s.default)({},b,{label:"\u6240\u5c5e\u5206\u7ec4\u5217\u8868"}),m("positions",{initialValue:g,rules:[{required:!0,message:"\u8bf7\u9009\u62e9"}]})(D.default.createElement(R.default,null)))),D.default.createElement(c.default,_,D.default.createElement(C.default.Item,(0,s.default)({},b,{label:"\u5907\u6ce8"}),m("memo",{initialValue:n.memo||"",rules:[{required:!1,message:"\u5907\u6ce8"}]})(D.default.createElement(K,{rows:4}))))))),this.renderDataForm(),this.renderGroupForm())}}]),t}(D.PureComponent),_=S))||_)||_);t.default=O},Ss0I:function(e,t,a){e.exports={gate:"web\\pages\\-building\\-device\\-video-equipment\\index-gate",left:"web\\pages\\-building\\-device\\-video-equipment\\index-left",right:"web\\pages\\-building\\-device\\-video-equipment\\index-right"}},Zm3k:function(e,t,a){"use strict";var n=a("g09b"),l=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("IzEo");var i=n(a("bx4M"));a("+L6B");var r=n(a("2/Rp"));a("Pwec");var d=n(a("CtXQ"));a("OaEy");var o=n(a("2fM7"));a("5NDa");var u=n(a("5rEg")),c=n(a("p0pE"));a("miYZ");var s=n(a("tsqr")),f=n(a("qIgq"));a("/xke");var p=n(a("TeRw"));a("2qtc");var m=n(a("kLXV")),h=n(a("2Taf")),v=n(a("vZ4D")),E=n(a("l4Ni")),g=n(a("ujKo")),y=n(a("rlhR")),C=n(a("MhPg"));a("y8nQ");var k=n(a("Vl3Y"));a("lUTK");var b,q,_,S,w=n(a("BvKs")),D=l(a("q1tI")),I=a("MuoO"),F=a("6LfW"),M=n(a("8rb4")),P=n(a("NRSZ")),V=n(a("Ss0I")),R=n(a("XZXw")),T=a("w7Oj"),x=l(a("4i3h")),K=n(a("oBcY")),O=w.default.SubMenu,B=(b=(0,I.connect)(function(e){var t=e.videoEquipment,a=e.loading;return{videoEquipment:t,loading:a.models.videoEquipment}}),q=k.default.create(),b(_=q((S=function(e){function t(){var e,a;(0,h.default)(this,t);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return a=(0,E.default)(this,(e=(0,g.default)(t)).call.apply(e,[this].concat(l))),a.state={selectBuilding:null,selectBuildingPath:null,selectedRowKeys:[],selectedRows:[],treeSelectedKeys:[],editVisible:!1,data:{list:[],pagination:{}},result:""},a.pageSize=10,a.current=1,a.onNewparten=function(){a.props.dispatch({type:"videoEquipment/loadFZForm",payload:{type:"A"}})},a.onCloseGroup=function(){a.props.dispatch({type:"videoEquipment/treeVisible",payload:!1})},a.handleClickedit=function(e){a.props.dispatch({type:"videoEquipment/loadFZForm",payload:{record_id:e.record_id,type:"E"}})},a.onAddClick=function(){var e=a.state.selectBuilding;a.props.dispatch({type:"videoEquipment/loadSPForm",payload:{type:"A",group_id:e}})},a.onItemEditClick=function(e){a.props.dispatch({type:"videoEquipment/loadSPForm",payload:{type:"E",record_id:e.record_id}}),a.props.dispatch({type:"videoEquipment/seeListInfo",payload:{record_id:e.record_id}})},a.onItemMigrationClick=function(e){m.default.confirm({title:"\u786e\u5b9a\u5220\u9664\u89c6\u9891\u8bbe\u5907\u3010".concat(e.name,"\u3011\uff1f"),okText:"\u786e\u8ba4",okType:"danger",cancelText:"\u53d6\u6d88",onOk:function(){x.delEq(e).then(function(){p.default.success({key:"deleteDevice",message:"\u8bbe\u5907\u5220\u9664\u6210\u529f",description:"\u89c6\u9891\u8bbe\u5907\u3010".concat(e.name,"\u3011\u5df2\u7ecf\u5220\u9664!")}),a.props.dispatch({type:"videoEquipment/fetchEQ",search:{position_id:a.getParentID()},pagination:{}})})}})},a.onClose=function(){a.props.dispatch({type:"videoEquipment/changeFormVisible",payload:!1}),a.props.dispatch({type:"videoEquipment/fetchEQ",search:{position_id:a.getParentID()},pagination:{}})},a.onSaved=function(){a.props.dispatch({type:"videoEquipment/changeFormVisible",payload:!1}),a.props.dispatch({type:"videoEquipment/fetchEQ",search:{position_id:a.getParentID()},pagination:{}})},a.getParentID=function(){var e=a.state.treeSelectedKeys,t="";if(e.length>0){var n=(0,f.default)(e,1);t=n[0]}return t},a.deleClickdel=function(e){a.getSBList(e.record_id),m.default.confirm({title:"\u64cd\u4f5c\u786e\u8ba4",content:"\u786e\u8ba4\u8981\u5220\u9664\u6b64\u5206\u7ec4\uff1f",okType:"danger",okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88",onOk:a.del.bind((0,y.default)(a),e)})},a.del=function(e){var t=a.state.result,n=t.list||[];e.children&&e.children.length>0?s.default.warn("\u8be5\u5206\u7ec4\u4e0b\u9762\u5b58\u5728\u4e0b\u7ea7\u83dc\u5355\uff0c\u4e0d\u5141\u8bb8\u5220\u9664\uff0c\u5982\u9700\u5220\u9664\u8bf7\u5148\u5c06\u4e0b\u7ea7\u83dc\u5355\u5220\u9664"):n&&n.length>0?s.default.warn("\u8be5\u5206\u7ec4\u4e0b\u9762\u5b58\u5728\u89c6\u9891\u76d1\u63a7\u8bbe\u5907\uff0c\u4e0d\u5141\u8bb8\u5220\u9664"):a.props.dispatch({type:"videoEquipment/del",payload:e.record_id}),a.props.dispatch({type:"videoEquipment/queryTreeStore"}),a.props.dispatch({type:"videoEquipment/fetchEQ",search:{},pagination:{}})},a.getSBList=function(e){var t={q:"page",pageSize:a.pageSize,current:a.current};null!==e&&(t.position_id=e),x.queryEQ(t).then(function(e){a.setState({result:e})})},a.onGroupSaved=function(){a.props.dispatch({type:"videoEquipment/treeVisible",payload:!1}),a.props.dispatch({type:"videoEquipment/queryTreeStore"}),a.props.dispatch({type:"videoEquipment/fetchEQ",search:{},pagination:{}})},a.onResetFormClick=function(){var e=a.props.form;e.resetFields(),a.props.dispatch({type:"videoEquipment/fetchEQ",search:{position_id:a.getParentID()},pagination:{}})},a.onTableChange=function(e){a.props.dispatch({type:"videoEquipment/fetchEQ",pagination:{current:e.current,pageSize:e.pageSize}})},a.onSearchFormSubmit=function(e){e&&e.preventDefault();var t=a.props.form;t.validateFields(function(e,t){e||(a.props.dispatch({type:"videoEquipment/fetchEQ",search:(0,c.default)({},t,{position_id:a.getParentID()}),pagination:{}}),a.clearSelectRows())})},a.clearSelectRows=function(){var e=a.state.selectedRowKeys;0!==e.length&&a.setState({selectedRowKeys:[],selectedRows:[]})},a}return(0,C.default)(t,e),(0,v.default)(t,[{key:"componentDidMount",value:function(){this.props.dispatch({type:"videoEquipment/queryTreeStore"}),this.props.dispatch({type:"videoEquipment/listThird"}),this.props.dispatch({type:"videoEquipment/fetchEQ",search:{},pagination:{}})}},{key:"renderDataForm",value:function(){var e=this.props.videoEquipment.treeVisible;if(e)return D.default.createElement(K.default,{editVisible:e,onClose:this.onCloseGroup,onGroupSaved:this.onGroupSaved})}},{key:"onSelect",value:function(e){var t=[e.record_id];this.setState({treeSelectedKeys:t,selectBuilding:e.record_id,selectBuildingPath:e});var a=this.props.videoEquipment.search,n={position_id:""};t.length>0&&(n.position_id=t[0]),this.props.dispatch({type:"videoEquipment/fetchEQ",search:(0,c.default)({},a,n),pagination:{}}),this.clearSelectRows(),this.props.dispatch({type:"videoEquipment/seeListInfo",payload:t.record_id})}},{key:"renderSearchForm",value:function(){var e=this.props.form.getFieldDecorator,t=this.props.videoEquipment.selectList;return D.default.createElement(T.SearchCard,{form:this.props.form,onSearch:this.onSearchFormSubmit,onReset:this.onResetFormClick},D.default.createElement(T.SearchItem,{label:"\u8bbe\u5907\u540d\u79f0"},e("name")(D.default.createElement(u.default,{placeholder:"\u8bf7\u8f93\u5165"}))),D.default.createElement(T.SearchItem,{label:"\u4e09\u65b9\u7cfb\u7edf"},e("third_id",{rules:[{required:!1,message:"\u8bf7\u9009\u62e9"}]})(D.default.createElement(o.default,{placeholder:"\u8bf7\u9009\u62e9",style:{width:"100%"}},t.map(function(e){return D.default.createElement(o.default.Option,{key:e.record_id,value:e.record_id},e.name)})))),D.default.createElement(T.SearchItem,{label:"\u8bbe\u5907\u7c7b\u578b"},e("device_type")(D.default.createElement(F.DicSelect,{vmode:"int",pcode:"OPER$#monitor_category",selectProps:{placeholder:"\u8bf7\u9009\u62e9"}}))))}},{key:"renderNavMenuItems",value:function(e){var t=this;return e?e.map(function(e){return e.name?e.children&&e.children.some(function(e){return e.name})?D.default.createElement(O,{title:D.default.createElement("span",{onClick:function(){return t.onSelect(e)}},D.default.createElement("span",null,e.name),D.default.createElement(d.default,{type:"edit",onClick:function(){return t.handleClickedit(e)}}),D.default.createElement(d.default,{type:"close",onClick:function(a){a.stopPropagation(),t.deleClickdel(e)}})),key:e.record_id},t.renderNavMenuItems(e.children)):D.default.createElement(w.default.Item,{key:e.record_id},D.default.createElement("span",{onClick:function(){return t.onSelect(e)}},e.name," ",D.default.createElement("span",null,D.default.createElement(d.default,{type:"edit",onClick:function(){return t.handleClickedit(e)}}),D.default.createElement(d.default,{type:"close",onClick:function(){return t.deleClickdel(e)}})))):null}):[]}},{key:"render",value:function(){var e=this,t=this.state,a=t.selectBuilding,n=t.selectBuildingPath,l=(t.editVisible,t.editDevice,this.props.videoEquipment),d=l.loading,o=l.dataList,u=l.data,c=u.list,s=u.pagination,f=l.formVisible;return D.default.createElement(R.default,{title:"\u89c6\u9891\u8bbe\u5907\u7ba1\u7406"},D.default.createElement(i.default,{className:V.default.gate},D.default.createElement("table",null,D.default.createElement("tbody",null,D.default.createElement("tr",null,D.default.createElement("td",{className:V.default.left},D.default.createElement("div",null,D.default.createElement(r.default,{icon:"plus",type:"primary",onClick:function(){return e.onNewparten()}},"\u65b0\u5efa")),D.default.createElement("div",{style:{display:"flex",flex:"wrap"}},D.default.createElement(w.default,{style:{width:256},defaultSelectedKeys:["1"],defaultOpenKeys:["sub1"],mode:"inline"},this.renderNavMenuItems(o)),this.renderDataForm())),D.default.createElement("td",{className:V.default.right},this.renderSearchForm(),D.default.createElement(M.default,{selectBuilding:a,list:c,pagination:s,loading:d,onTableChange:this.onTableChange,onAddClick:this.onAddClick,onItemEditClick:this.onItemEditClick,onItemMigrationClick:this.onItemMigrationClick})))))),f?D.default.createElement(P.default,{editVisible:f,selectBuilding:a,selectBuildingPath:n,onClose:this.onClose,onSaved:this.onSaved}):null)}}]),t}(D.PureComponent),_=S))||_)||_);t.default=B},gYS4:function(e,t,a){e.exports={seeBtn:"web\\pages\\-building\\-device\\-video-equipment\\-video-equipment-edit-seeBtn"}},oBcY:function(e,t,a){"use strict";var n=a("g09b"),l=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("2qtc");var i=n(a("kLXV"));a("IzEo");var r=n(a("bx4M"));a("14J3");var d=n(a("BMrR"));a("nRaC");var o=n(a("5RzL"));a("jCWc");var u=n(a("kPKH")),c=n(a("jehZ")),s=n(a("p0pE")),f=n(a("2Taf")),p=n(a("vZ4D")),m=n(a("l4Ni")),h=n(a("ujKo")),v=n(a("MhPg"));a("y8nQ");var E=n(a("Vl3Y"));a("5NDa");var g,y,C,k,b=n(a("5rEg")),q=l(a("q1tI")),_=a("MuoO"),S=(a("6LfW"),l(a("4i3h"))),w=b.default.TextArea,D=(g=(0,_.connect)(function(e){return{videoEquipment:e.videoEquipment}}),y=E.default.create(),g(C=y((k=function(e){function t(){var e,a;(0,f.default)(this,t);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return a=(0,m.default)(this,(e=(0,h.default)(t)).call.apply(e,[this].concat(l))),a.onModalOKClick=function(){var e=a.props,t=e.videoEquipment.formID,n=e.onGroupSaved;a.props.form.validateFieldsAndScroll(function(e,l){if(!e)if(t){var i=a.props.videoEquipment.formData,r=(0,s.default)({},i,l);S.update(r).then(function(){n(r)})}else{var d={name:l.name,parent_id:l.parent_id,code:l.code,memo:l.memo};S.create(d).then(function(){n()})}})},a.onModalCancelClick=function(){var e=a.props.onClose;e()},a}return(0,v.default)(t,e),(0,p.default)(t,[{key:"componentDidMount",value:function(){this.props.dispatch({type:"videoEquipment/fetchTree"})}},{key:"render",value:function(){var e=this.props,t=e.videoEquipment,a=t.treeData,n=t.formData,l=t.formID,s=e.form.getFieldDecorator,f=e.editVisible,p={labelCol:{xs:{span:24},sm:{span:5}},wrapperCol:{xs:{span:24},sm:{span:19}}},m={sm:24,md:24};return q.default.createElement(i.default,{title:l?"\u7f16\u8f91\u89c6\u9891\u5206\u7ec4":"\u65b0\u589e\u89c6\u9891\u5206\u7ec4",width:600,visible:f,okText:"\u4fdd\u5b58",cancelText:"\u5173\u95ed",onOk:this.onModalOKClick,onCancel:this.onModalCancelClick},q.default.createElement(r.default,{bordered:!1},q.default.createElement(E.default,null,q.default.createElement(d.default,{span:24},q.default.createElement(u.default,m,q.default.createElement(E.default.Item,(0,c.default)({},p,{label:"\u5206\u7ec4\u540d"}),s("name",{initialValue:n.name,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5206\u7ec4\u540d"}]})(q.default.createElement(b.default,{placeholder:"\u8bf7\u8f93\u5165\u5206\u7ec4\u540d"})))),q.default.createElement(u.default,m,q.default.createElement(E.default.Item,(0,c.default)({},p,{label:"\u4e0a\u7ea7\u5206\u7ec4"}),s("parent_id",{initialValue:n.parent_id,rules:[{required:!1,message:"\u8bf7\u9009\u62e9\u4e0a\u7ea7\u5206\u7ec4"}]})(q.default.createElement(o.default,{showSearch:!0,treeDefaultExpandedKeys:[a.length>0&&a[0].record_id],treeNodeFilterProp:"title",style:{minWidth:200},dropdownStyle:{maxHeight:400,overflow:"auto"},treeData:a,placeholder:"\u8bf7\u9009\u62e9"})))),q.default.createElement(u.default,m,q.default.createElement(E.default.Item,(0,c.default)({},p,{label:"\u5206\u7ec4\u7f16\u53f7"}),s("code",{initialValue:n.code,rules:[{required:!1,message:"\u8bf7\u8f93\u5165\u5206\u7ec4\u7f16\u53f7"}]})(q.default.createElement(b.default,{placeholder:"\u8bf7\u8f93\u5165\u5206\u7ec4\u7f16\u53f7"})))),q.default.createElement(u.default,m,q.default.createElement(E.default.Item,(0,c.default)({},p,{label:"\u5907\u6ce8"}),s("memo",{initialValue:n.memo||"",rules:[{required:!1,message:"\u5907\u6ce8"}]})(q.default.createElement(w,{rows:4}))))))))}}]),t}(q.PureComponent),C=k))||C)||C);t.default=D},ogJW:function(e,t,a){"use strict";var n=a("tAuX"),l=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=l(a("p0pE"));a("6UJt");var r=l(a("DFOY")),d=l(a("2Taf")),o=l(a("vZ4D")),u=l(a("l4Ni")),c=l(a("ujKo")),s=l(a("MhPg")),f=n(a("q1tI")),p=n(a("4i3h")),m="/",h=function(e){function t(e){var a;return(0,d.default)(this,t),a=(0,u.default)(this,(0,c.default)(t).call(this,e)),a.handleChange=function(e,t){a.setState({value:e});var n=t?t[t.length-1]:[],l=[];if(n&&(n.record_id&&l.push({record_id:n.record_id}),n.children&&n.children.length>0)){var i=a.myFilter(n.children,l);n.children=i}a.triggerChange(e,n)},a.triggerChange=function(e,t){var n=a.props.onChange;n&&n(e.join(m),t)},a.state={value:e.value,options:[],children:[],items:[]},a}return(0,s.default)(t,e),(0,o.default)(t,[{key:"componentDidMount",value:function(){var e=this;p.queryTreeStore({q:"tree"}).then(function(t){var a=t.list||[];a&&e.setState({options:e.ruleValidate(a)})})}},{key:"ruleValidate",value:function(e){var t=!0;function a(e){e.forEach(function(e){e.label=e.name,e.value=e.name,t&&(e.record_id?e.children&&e.children.length&&a(e.children):t=!1)})}return a(e),e}},{key:"myFilter",value:function(e,t){return e.filter(function(e){return t.filter(function(t){return t.record_id===e.parent_id}).length>0})}},{key:"render",value:function(){var e=this.state,t=e.options,a=e.value;return f.default.createElement(r.default,{value:a,options:t,onChange:this.handleChange,changeOnSelect:!0,placeholder:"\u8bf7\u9009\u62e9\u6240\u5c5e\u5206\u7ec4",style:{width:"100%"}})}}],[{key:"getDerivedStateFromProps",value:function(e,t){return"value"in e?(0,i.default)({},t,{value:e.value}):t}}]),t}(f.PureComponent);t.default=h},ykPU:function(e,t,a){"use strict";var n=a("tAuX"),l=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=l(a("p0pE"));a("5Dmo");var r=l(a("3S7+"));a("+BJd");var d=l(a("mr32")),o=l(a("2Taf")),u=l(a("vZ4D")),c=l(a("l4Ni")),s=l(a("ujKo")),f=l(a("MhPg")),p=n(a("q1tI")),m=function(e){function t(e){var a;return(0,o.default)(this,t),a=(0,c.default)(this,(0,s.default)(t).call(this,e)),a.handleClose=function(e){var t=a.state.tags,n=t.filter(function(t){return t.record_id!==e});a.setState({tags:n}),a.triggerChange(n)},a.triggerChange=function(e){var t=a.props.onChange;t&&t(e)},a.state={tags:e.value?e.value:[]},a}return(0,f.default)(t,e),(0,u.default)(t,[{key:"render",value:function(){var e=this,t=this.state.tags;return p.default.createElement("div",null,t&&t.length>0&&t.map(function(t){var a=t.name?t.name.length>100:"",n=p.default.createElement(d.default,{key:t.record_id,closable:!0,onClose:function(){return e.handleClose(t.record_id)}},a?"".concat(t.name.slice(0,100),"..."):t.name);return a?p.default.createElement(r.default,{title:t.name,key:t.name},n):n}))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return"value"in e?(0,i.default)({},t,{tags:e.value}):t}}]),t}(p.PureComponent),h=m;t.default=h}}]);