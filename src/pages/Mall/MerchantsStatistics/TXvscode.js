import React, { PureComponent } from 'react';
import { Form, Button, Card, Modal, InputNumber, Input, Row, Col } from 'antd';
import StoreService from '@/services/s_store';
import { connect } from 'dva';

@connect(state => ({
  merchantsStatistics: state.merchantsStatistics,
}))
@Form.create()
export default class TXvscode extends PureComponent {
  state = {
    clickflag: false,
    time_number: 120,
    storeId: '',
  };

  //  默认的组件挂载时的初始化。
  async componentDidMount() {
    await StoreService.getStoreId().then(data => {
        if (data[0]) {
          const store = data[0];
          this.setState({ storeId: store.store.store_id });
        }
      });
    // 查询商家是否绑定手机号
     this.props.dispatch({
      type: 'merchantsStatistics/BindMobliNumber',
      store:this.state.storeId,
    });
    
  }

  onSaveCallback = () => {
    const { onSubmit } = this.props;

    const {
      merchantsStatistics: { dwID },
    } = this.props;
    const { storeId } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        formData.store_id = storeId;
        formData.draw_id = dwID;
        onSubmit(formData);
      }
    });
  };

  hqYzm() {
    const {
      merchantsStatistics: { storePhone, dwID},
    } = this.props;
    const { storeId } = this.state;
    this.clickflag = true;
    this.inTime = setInterval(() => {
      this.time_number = this.time_number - 1;
      if (this.time_number === 0) {
        clearTimeout(this.inTime);
        this.time_number = 120;
        this.clickflag = false;
      }
    }, 1000);
    this.props.dispatch({
      type: 'merchantsStatistics/CFDX',
      payload: { storePhone, storeId,dwID },
    });
  }

  /**
   * 界面渲染
   */
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      merchantsStatistics: { visibleNext },
    } = this.props;
    const { clickflag, time_number } = this.state;
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
        确认提现
      </Button>,
    ];

    const resultJsx = (
      <Modal
        width={600}
        visible={visibleNext}
        title="商家提现"
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.onCancel}
        footer={footerJsx}
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        <Card bordered={false}>
          <Form>
            <Form.Item {...formItemLayout} label="">
              <Button onClick={clickflag ? this.hqYzm() : time_number + 's后重发'}>
                发送验证码
              </Button>
            </Form.Item>

            <Form.Item {...formItemLayout} label="验证码">
              {getFieldDecorator('vcode', {
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
      </Modal>
    );
    return resultJsx;
  }
}
