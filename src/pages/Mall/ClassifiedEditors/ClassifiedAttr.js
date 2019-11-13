import React, { PureComponent } from 'react';
// import { Modal, Tag, Button, Card,Table,Menu, Dropdown } from "antd";
import { Form, Button } from 'antd';
import { connect } from 'dva';
// import styles from './ClassifiedEditors.less';

@Form.create()
@connect(state => ({
  commodityClassificationmanagement: state.commodityClassificationmanagement,
}))
export default class ClassifiedAttr extends PureComponent {
  // state = {
  //   sizeLabel: this.props.property,
  //   visible: true,
  // };

  // componentDidMount() {
  //   console.log(this.props);
  // }

  // shouldComponentUpdate() {
  //   return true;
  // }

  // deleteInputLabel = (item, i) => {
  //   this.state.sizeLabel.data.values.splice(i, 1);
  //   this.setState({
  //     ...this.state.sizeLabel
  //   })
  // }

  // addInputLabel = () => {
  //   let value = this.refs.addInputValue.input.value;
  //   if (value.length > 0 && (this.state.sizeLabel.data.values.indexOf(value) < 0)) {
  //     this.state.sizeLabel.data.values.push(String(value));
  //     this.setState({
  //       ...this.state.sizeLabel
  //     })
  //   }
  //   this.refs.addInputValue.input.focus();
  // }

  // editCompiled = () => {
  //   if (this.state.sizeLabel.data.values.length == '') {
  //     message.error('请填写参数规格');
  //   } else {
  //     this.props.form.validateFieldsAndScroll((errors, values) => {
  //       if (!errors) {
  //         console.log(values)
  //         let payload = {
  //           "property_id": this.state.sizeLabel.data.property_id || '',
  //           "code": values.attrCode,
  //           "name": values.attrName,
  //           "values": this.state.sizeLabel.data.values
  //         }
  //         console.log(payload);
  //         if (this.state.sizeLabel.mode === 1) {
  //           this.props.dispatch({
  //             type: 'productsAttrManagement/addProductsAttr',
  //             payload: payload
  //           })
  //         } else {
  //           this.props.dispatch({
  //             type: 'productsAttrManagement/editProductsAttr',
  //             payload: payload
  //           })
  //         }
  //         this.props.closeEditModaltest();
  //       }
  //     });
  //   }
  // }

  // cancle = () => {
  //   this.props.closeEditModaltest();
  // }

  render() {
    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 10 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 14 },
    //   },
    // };
    // const tailFormItemLayout = {
    //   wrapperCol: {
    //     xs: {
    //       span: 24,
    //       offset: 0,
    //     },
    //     sm: {
    //       span: 14,
    //       offset: 10,
    //     },
    //   },
    // };
    // const { getFieldDecorator } = this.props.form;

    // const columns = [
    //   {
    //     title: '属性名称',
    //     dataIndex: 'name',
    //     key: 'name',
    //   },
    //   {
    //     title: '属性名称',
    //     dataIndex: 'name',
    //     key: 'name',
    //   },
    // ];

    // const { TextArea } = Input;
    // const attrList = this.state.sizeLabel.data.values ? this.state.sizeLabel.data.values : [];
    return (
      <div>
        <Button type="primary">添加</Button>
        {/* <Table columns={columns} dataSource={data} /> */}
      </div>
    );
  }
}
