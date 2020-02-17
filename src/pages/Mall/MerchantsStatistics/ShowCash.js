import React, { PureComponent } from 'react';
import { Form, Button, Card, Modal, InputNumber, Input, Row, Col } from 'antd';
import StoreService from '@/services/s_store';
import { connect } from 'dva';
import TXvscode from './TXvscode';

@connect(state => ({
  merchantsStatistics: state.merchantsStatistics,
}))
@Form.create()
export default class ShowCash extends PureComponent {
  state = {
    clickflag: false,
    time_number: 120,
    storeId: '',
  };

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    StoreService.getStoreId().then(data => {
      if (data[0]) {
        const store = data[0];
        this.setState({ storeId: store.store.store_id });
      }
    });
  }

  onSaveCallback = () => {
    const { onSubmit } = this.props;
    const { storeId } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        formData.store_id = storeId;
        formData.draw_money = formData.draw_money * 100;
        onSubmit(formData);
      }
    });
    this.props.handleDataFormCancel();
   
  };

  handleDataFormSubmit = value => {
    this.props.dispatch({
      type: 'merchantsStatistics/QRTX',
      payload: value,
    });
  };

  handleDataFormCancel() {
    this.props.dispatch({
      type: 'merchantsStatistics/showTX',
      payload: false,
    });
  }
  
  renderShowCash() {
    return <TXvscode onCancel={this.handleDataFormCancel} onSubmit={this.handleDataFormSubmit} />;
  }

  /**
   * 界面渲染
   */
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      merchantsStatistics: { visibleTxMoal, storePhone },
      balanyu,
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const footerJsx = [
      <Button style={{ marginRight: 10 }} key="close" onClick={this.props.onCancel}>
        关闭
      </Button>,
      <Button type="primary" key="unauth" onClick={this.onSaveCallback}>
        下一步
      </Button>,
    ];

    const resultJsx = (
      <Modal
        width={600}
        visible={visibleTxMoal}
        title="商家提现"
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.onCancel}
        footer={footerJsx}
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        <Card bordered={false}>
          <Form style={{ maxWidth: 600 }}>
            <Form.Item {...formItemLayout} label="商家余额">
              {balanyu}
            </Form.Item>
            <Form.Item {...formItemLayout} label="提现金额">
              {getFieldDecorator('draw_money', {
                initialValue: 0,
                rules: [
                  {
                    required: true,
                    message: '请填写',
                  },
                ],
              })(<InputNumber min={0} />)}
            </Form.Item>
          </Form>
        </Card>
        {this.renderShowCash()}
      </Modal>
    );
    return resultJsx;
  }
}
