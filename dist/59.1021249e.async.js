(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[59],{"8TeL":function(e,t,a){"use strict";var r=a("g09b"),n=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("2qtc");var l=r(a("kLXV"));a("IzEo");var d=r(a("bx4M"));a("giR+");var o=r(a("fyUT"));a("14J3");var i=r(a("BMrR"));a("nRaC");var p=r(a("5RzL"));a("jCWc");var c=r(a("kPKH")),s=r(a("jehZ"));a("5NDa");var u=r(a("5rEg")),f=r(a("p0pE")),m=r(a("2Taf")),h=r(a("vZ4D")),y=r(a("l4Ni")),v=r(a("ujKo")),D=r(a("MhPg"));a("y8nQ");var E,g,k,C,b=r(a("Vl3Y")),w=n(a("q1tI")),S=a("MuoO"),F=(E=(0,S.connect)(function(e){return{enterpriseDepartment:e.enterpriseDepartment}}),g=b.default.create(),E(k=g((C=function(e){function t(){var e,a;(0,m.default)(this,t);for(var r=arguments.length,n=new Array(r),l=0;l<r;l++)n[l]=arguments[l];return a=(0,y.default)(this,(e=(0,v.default)(t)).call.apply(e,[this].concat(n))),a.onModalCancelClick=function(){a.props.dispatch({type:"enterpriseDepartment/changeFormVisible",payload:!1}),a.props.callback()},a.onModalOKClick=function(){var e=a.props.info;a.props.form.validateFieldsAndScroll(function(t,r){if(!t){var n=(0,f.default)({},r);n.enterprise_id=e.record_id,a.props.dispatch({type:"enterpriseDepartment/submit",payload:n})}})},a}return(0,D.default)(t,e),(0,h.default)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.id,a=e.type,r=e.callback,n=e.info;this.props.dispatch({type:"enterpriseDepartment/loadForm",payload:{id:t,type:a,callback:r,info:n}})}},{key:"render",value:function(){var e=this.props,t=e.enterpriseDepartment,a=t.formTitle,r=t.formVisible,n=t.formData,f=t.submitting,m=t.treeData,h=e.form.getFieldDecorator,y={labelCol:{xs:{span:24},sm:{span:6}},wrapperCol:{xs:{span:24},sm:{span:18},md:{span:18}}},v={labelCol:{xs:{span:12},sm:{span:3}},wrapperCol:{xs:{span:24}}};return w.default.createElement(l.default,{title:a,width:850,visible:r,maskClosable:!1,confirmLoading:f,destroyOnClose:!0,onOk:this.onModalOKClick,onCancel:this.onModalCancelClick},w.default.createElement(d.default,{bordered:!1},w.default.createElement(b.default,null,w.default.createElement(i.default,null,w.default.createElement(c.default,{md:12,sm:24},w.default.createElement(b.default.Item,(0,s.default)({},y,{label:"\u90e8\u95e8\u540d\u79f0"}),h("name",{initialValue:n.name,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u90e8\u95e8\u540d\u79f0"}]})(w.default.createElement(u.default,{placeholder:"\u8bf7\u8f93\u5165"})))),w.default.createElement(c.default,{md:12,sm:24},w.default.createElement(b.default.Item,(0,s.default)({},y,{label:"\u90e8\u95e8\u4e0a\u7ea7"}),h("parent_id",{initialValue:n.parent_id,rules:[{required:!1}]})(w.default.createElement(p.default,{showSearch:!0,treeNodeFilterProp:"title",style:{minWidth:200},dropdownStyle:{maxHeight:400,overflow:"auto"},treeData:m,placeholder:"\u8bf7\u9009\u62e9"}))))),w.default.createElement(i.default,null,w.default.createElement(c.default,{md:12,sm:24},w.default.createElement(b.default.Item,(0,s.default)({},y,{label:"\u6392\u5e8f\u503c"}),h("sequence",{initialValue:n.sequence?n.sequence:0,rules:[{required:!1}]})(w.default.createElement(o.default,{style:{width:"100%"}}))))),w.default.createElement(i.default,null,w.default.createElement(c.default,{md:24,sm:24},w.default.createElement(b.default.Item,(0,s.default)({},v,{label:"\u5907\u6ce8"}),h("memo",{initialValue:n.memo,rules:[{required:!1}]})(w.default.createElement(u.default.TextArea,{placeholder:"\u8bf7\u8f93\u5165"}))))))))}}]),t}(w.PureComponent),k=C))||k)||k);t.default=F},BQEg:function(e,t,a){"use strict";var r=a("g09b"),n=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("g9YV");var l=r(a("wCAj"));a("B9cy");var d=r(a("Ol7k"));a("IzEo");var o=r(a("bx4M"));a("fOrg");var i=r(a("+KLJ"));a("+L6B");var p=r(a("2/Rp"));a("14J3");var c=r(a("BMrR"));a("jCWc");var s=r(a("kPKH"));a("5NDa");var u=r(a("5rEg"));a("ozfa");var f=r(a("MJZm")),m=r(a("qIgq"));a("2qtc");var h=r(a("kLXV")),y=r(a("p0pE"));a("miYZ");var v=r(a("tsqr")),D=r(a("2Taf")),E=r(a("vZ4D")),g=r(a("l4Ni")),k=r(a("ujKo")),C=r(a("rlhR")),b=r(a("MhPg"));a("y8nQ");var w,S,F,T,R=r(a("Vl3Y")),_=n(a("q1tI")),q=a("MuoO"),I=r(a("XZXw")),x=r(a("8TeL")),K=r(a("/NA6")),M=(w=(0,q.connect)(function(e){return{enterpriseDepartment:e.enterpriseDepartment}}),S=R.default.create(),w(F=S((T=function(e){function t(){var e,a;(0,D.default)(this,t);for(var r=arguments.length,n=new Array(r),l=0;l<r;l++)n[l]=arguments[l];return a=(0,g.default)(this,(e=(0,k.default)(t)).call.apply(e,[this].concat(n))),a.state={selectedRows:[],selectedRowsCon:[],dataForm:!1,dataFormID:"",dataFormType:"",treeSelectedKeys:[]},a.onDelBatchOKClick=function(e){var t=a.props,r=t.location.query,n=t.enterpriseDepartment,l=n.parentId,d=n.dataList,o=l;d&&d.length>0?v.default.warn("\u8be5\u90e8\u95e8\u4e0b\u9762\u5b58\u5728\u4e0b\u7ea7\u90e8\u95e8\uff0c\u4e0d\u5141\u8bb8\u5220\u9664\uff0c\u5982\u9700\u5220\u9664\u8bf7\u5148\u5c06\u4e0b\u7ea7\u90e8\u95e8\u5220\u9664"):a.props.dispatch({type:"enterpriseDepartment/del",payload:e,info:(0,y.default)({key_id:o},r)}),a.setState({selectedRows:[],selectedRowsCon:[]})},a.onBatchDelClick=function(e){var t=e.record_id,r=a.props.location.query;a.props.dispatch({type:"enterpriseDepartment/fetchChildren",info:(0,y.default)({item_id:t},r)}),h.default.confirm({title:"\u786e\u8ba4\u5220\u9664\u9009\u4e2d\u7684\u90e8\u95e8\u5417\uff1f",okText:"\u786e\u8ba4",okType:"danger",cancelText:"\u53d6\u6d88",onOk:a.onDelBatchOKClick.bind((0,C.default)(a),e)})},a.onAddClick=function(){a.setState({dataForm:!0,dataFormID:"",dataFormType:"A"})},a.onBatchEditClick=function(e){a.setState({dataForm:!0,dataFormID:e,dataFormType:"E"})},a.onItemDelClick=function(e){h.default.confirm({title:"\u786e\u5b9a\u5220\u9664\u3010\u90e8\u95e8\u6570\u636e\uff1a".concat(e.name,"\u3011\uff1f"),okText:"\u786e\u8ba4",okType:"danger",cancelText:"\u53d6\u6d88",onOk:a.onDelOKClick.bind((0,C.default)(a),e.record_id)})},a.onTableSelectRow=function(e,t){a.setState({selectedRows:e,selectedRowsCon:t})},a.onTableChange=function(e){var t=a.props,r=t.location.query,n=t.enterpriseDepartment.parentId,l=n;a.props.dispatch({type:"enterpriseDepartment/fetch",pagination:{current:e.current,pageSize:e.pageSize},info:(0,y.default)({key_id:l},r)})},a.onResetFormClick=function(){var e=a.props.location.query;a.props.form.resetFields(),a.props.dispatch({type:"enterpriseDepartment/savePagination",payload:{}}),a.props.dispatch({type:"enterpriseDepartment/saveSearch",payload:{parent_id:a.getParentID()}}),a.props.dispatch({type:"enterpriseDepartment/fetch",info:e})},a.onSearchFormSubmit=function(e){var t=a.props.location.query;e&&e.preventDefault(),a.props.dispatch({type:"enterpriseDepartment/savePagination",payload:{}});var r=a.props.form.getFieldsValue();a.props.dispatch({type:"enterpriseDepartment/fetch",payload:{name:r.name},info:t})},a.onDataFormCallback=function(e){var t=a.props,r=t.location.query,n=t.enterpriseDepartment.parentId,l=n;a.setState({dataForm:!1,dataFormID:""}),e&&"ok"===e&&(a.props.dispatch({type:"enterpriseDepartment/fetchSearchTree",payload:r}),a.props.dispatch({type:"enterpriseDepartment/fetch",info:(0,y.default)({key_id:l},r)}))},a.getParentID=function(){var e=a.state.treeSelectedKeys,t="";if(e.length>0){var r=(0,m.default)(e,1);t=r[0]}return t},a.renderTreeNodes=function(e){return e.map(function(e){return e.children?_.default.createElement(f.default.TreeNode,{title:e.name,key:e.record_id,dataRef:e},a.renderTreeNodes(e.children)):_.default.createElement(f.default.TreeNode,{title:e.name,key:e.record_id,dataRef:e})})},a}return(0,b.default)(t,e),(0,E.default)(t,[{key:"componentDidMount",value:function(){var e=this.props.location.query;this.props.dispatch({type:"enterpriseDepartment/saveSearch",payload:{}}),this.props.dispatch({type:"enterpriseDepartment/savePagination",payload:{}}),this.props.dispatch({type:"enterpriseDepartment/fetchSearchTree",payload:e}),this.props.dispatch({type:"enterpriseDepartment/fetch",payload:{},pagination:{},info:e})}},{key:"onDelOKClick",value:function(e){this.props.dispatch({type:"enterpriseDepartment/del",payload:{record_id:e}})}},{key:"renderDataForm",value:function(){var e=this.props.location.query;if(this.state.dataForm)return _.default.createElement(x.default,{id:this.state.dataFormID,type:this.state.dataFormType,callback:this.onDataFormCallback,info:e})}},{key:"renderSearchForm",value:function(){var e=this.props.form.getFieldDecorator;return _.default.createElement(R.default,{onSubmit:this.onSearchFormSubmit,layout:"inline"},_.default.createElement(c.default,{gutter:{md:8,lg:24,xl:48}},_.default.createElement(s.default,{md:8,sm:24},_.default.createElement(R.default.Item,{label:"\u90e8\u95e8\u540d\u79f0"},e("name")(_.default.createElement(u.default,{placeholder:"\u8bf7\u8f93\u5165"}))))),_.default.createElement("div",{style:{overflow:"hidden"}},_.default.createElement("span",{style:{float:"right",marginBottom:24}},_.default.createElement(p.default,{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),_.default.createElement(p.default,{style:{marginLeft:8},onClick:this.onResetFormClick},"\u91cd\u7f6e"))))}},{key:"renderProvince",value:function(e){var t=this.props.province.treeData,a=function t(a){for(var r=0;r<a.length;r+=1){if(a[r].record_id===e)return a[r].name;if(a[r].children&&a[r].children.length>0){var n=t(a[r].children);if(""!==n)return n}}return""};return _.default.createElement("span",null,a(t))}},{key:"render",value:function(){var e=this,t=this.props,a=t.enterpriseDepartment,r=a.loading,n=a.data,c=n.list,s=n.pagination,u=a.searchTreeData,h=a.expandedKeys,v=t.location.query,D=this.state,E=D.selectedRowsCon,g=D.selectedRows,k=[{title:"\u90e8\u95e8\u540d\u79f0",dataIndex:"name"},{title:"\u5907\u6ce8",dataIndex:"memo"}],C=(0,y.default)({showSizeChanger:!0,showQuickJumper:!0,showTotal:function(e){return _.default.createElement("span",null,"\u5171",e,"\u6761")}},s),b=[{title:"\u4f01\u4e1a\u7ba1\u7406",href:"/enterprise/enterpriselist"},{title:"\u90e8\u95e8\u7ba1\u7406",href:""}];return _.default.createElement(I.default,{title:"\u90e8\u95e8\u7ba1\u7406",breadcrumbList:b},_.default.createElement(o.default,{bordered:!1},_.default.createElement("table",{width:"100%"},_.default.createElement("tbody",null,_.default.createElement("tr",null,_.default.createElement("td",null,_.default.createElement(i.default,{type:"info",showIcon:!0,message:"\u5f53\u524d\u6240\u5728\u4f01\u4e1a\uff1a".concat(this.props.location.query.name)})))))),_.default.createElement(d.default,null,_.default.createElement(d.default.Sider,{width:240,style:{background:"#fff",borderRight:"1px solid lightGray"}},_.default.createElement(f.default,{expandedKeys:h,onSelect:function(t,a){var r=a.selectedNodes;e.setState({treeSelectedKeys:t});var n=e.props.enterpriseDepartment.search,l={parent_id:"",parent_type:""},d=t[0];if(t.length>0){var o=(0,m.default)(t,1);l.parent_id=o[0],l.parent_type=r[0].props.dataRef.type}e.props.dispatch({type:"enterpriseDepartment/savePagination",payload:{}}),e.props.dispatch({type:"enterpriseDepartment/saveSearch",payload:(0,y.default)({},n,l)}),e.props.dispatch({type:"enterpriseDepartment/fetch",info:(0,y.default)({key_id:d},v)})},onExpand:function(t){e.props.dispatch({type:"enterpriseDepartment/saveExpandedKeys",payload:t})}},this.renderTreeNodes(u))),_.default.createElement(d.default.Content,null,_.default.createElement(o.default,{bordered:!1},_.default.createElement("div",{className:K.default.tableList},_.default.createElement("div",{className:K.default.conBtn},_.default.createElement(p.default,{icon:"plus",type:"primary",onClick:function(){return e.onAddClick()}},"\u65b0\u5efa"),1===g.length&&_.default.createElement("span",{className:K.default.delBtn},_.default.createElement(p.default,{icon:"edit",type:"danger",onClick:function(){return e.onBatchEditClick(g[0])}},"\u7f16\u8f91")),1===g.length&&_.default.createElement("span",{className:K.default.editBtn},_.default.createElement(p.default,{icon:"delete",type:"danger",onClick:function(){return e.onBatchDelClick(E[0])}},"\u5220\u9664"))),_.default.createElement("div",null,_.default.createElement(l.default,{rowSelection:{selectedRowKeys:g,onChange:this.onTableSelectRow,selectedRows:E,hideDefaultSelections:!0},loading:r,rowKey:function(e){return e.record_id},dataSource:c,columns:k,pagination:C,onChange:this.onTableChange})))))),this.renderDataForm())}}]),t}(_.PureComponent),F=T))||F)||F);t.default=M}}]);