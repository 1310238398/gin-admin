(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[54],{apEN:function(e,t,a){},xnBU:function(e,t,a){"use strict";var l=a("g09b"),n=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("IzEo");var r=l(a("bx4M"));a("5NDa");var u=l(a("5rEg"));a("14J3");var i=l(a("BMrR"));a("+L6B");var s=l(a("2/Rp"));a("jCWc");var d=l(a("kPKH")),c=l(a("jehZ"));a("giR+");var f=l(a("fyUT")),o=l(a("d6i3")),m=l(a("1l/V")),p=l(a("2Taf")),h=l(a("vZ4D")),v=l(a("l4Ni")),E=l(a("ujKo")),g=l(a("MhPg"));a("y8nQ");var b,y,k,w,I=l(a("Vl3Y")),x=n(a("q1tI")),S=a("MuoO"),_=l(a("XZXw")),P=(l(a("apEN")),l(a("gbAA"))),V=(b=(0,S.connect)(function(e){return{merchantsStatistics:e.merchantsStatistics}}),y=I.default.create(),b(k=y((w=function(e){function t(){var e,a;(0,p.default)(this,t);for(var l=arguments.length,n=new Array(l),r=0;r<l;r++)n[r]=arguments[r];return a=(0,v.default)(this,(e=(0,E.default)(t)).call.apply(e,[this].concat(n))),a.state={phone:"",storeId:"",clickflag:!1,time_number:120},a}return(0,g.default)(t,e),(0,h.default)(t,[{key:"componentDidMount",value:function(){var e=(0,m.default)(o.default.mark(function e(){var t=this;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.props.dispatch({type:"merchantsStatistics/getStoreNew"});case 2:P.default.getStoreId().then(function(e){if(e[0]){var a=e[0];t.setState({storeId:a.store.store_id})}});case 3:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"hqYzm",value:function(){var e=this,t=this.props.form,a=this.state.storeId,l=t.getFieldValue("phone");this.clickflag=!0,this.inTime=setInterval(function(){e.time_number=e.time_number-1,0===e.time_number&&(clearTimeout(e.inTime),e.time_number=120,e.clickflag=!1)},1e3),this.props.dispatch({type:"merchantsStatistics/hQyzm",payload:{buildings:l,storeId:a}})}},{key:"bindPhone",value:function(){var e=this.props.form,t=this.state.storeId,a=e.getFieldValue("phone"),l=e.getFieldValue("vcode");this.props.dispatch({type:"merchantsStatistics/bDPhone",payload:{phone:a,vcode:l,storeId:t}})}},{key:"showSecond",value:function(){var e=this.state.time_number;return"".concat(e," + s\u540e\u91cd\u53d1")}},{key:"render",value:function(){var e=this,t={labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:16}}},a=this.props.form.getFieldDecorator,l={sm:24,md:12},n=this.state,o=(n.clickflag,n.time_number,this.props.merchantsStatistics.xy),m=this.state.phone,p=x.default.createElement("div",null,x.default.createElement(_.default,{title:"\u7ed1\u5b9a\u624b\u673a\u53f7"},x.default.createElement(r.default,{bordered:!1,style:{marginTop:"16px"}},x.default.createElement(I.default,null,x.default.createElement(i.default,null,x.default.createElement(d.default,l,x.default.createElement(I.default.Item,(0,c.default)({},t,{label:"\u624b\u673a\u53f7"}),a("phone",{initialValue:m,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u624b\u673a\u53f7"}]})(x.default.createElement(f.default,{placeholder:"\u8bf7\u8f93\u5165\u624b\u673a\u53f7",maxLength:"18"})))),x.default.createElement(d.default,l,x.default.createElement(s.default,{onClick:function(){return e.hqYzm()}},"\u53d1\u9001\u9a8c\u8bc1\u7801"))),x.default.createElement(i.default,null,x.default.createElement(d.default,l,x.default.createElement(I.default.Item,(0,c.default)({label:"\u9a8c\u8bc1\u7801"},t),a("vcode",{initialValue:"",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801"}]})(x.default.createElement(u.default,{placeholder:"\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801",maxLength:"18"}))))),x.default.createElement(i.default,null,x.default.createElement(d.default,{span:12,offset:6},x.default.createElement("a",{href:o},"\u7b7e\u7f72\u670d\u52a1\u534f\u8bae"))),x.default.createElement(i.default,null,x.default.createElement(d.default,{span:12,offset:6},x.default.createElement(s.default,{onClick:function(){return e.bindPhone()}},"\u786e\u8ba4\u7ed1\u5b9a")))))));return p}}]),t}(x.PureComponent),k=w))||k)||k);t.default=V}}]);