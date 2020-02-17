import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, InputNumber } from 'antd';

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './BusinessBindingMobile.less';
import StoreService from '@/services/s_store';

@connect(state => ({
  merchantsStatistics: state.merchantsStatistics,
}))
@Form.create()
export default class BusinessBindingMobile extends PureComponent {
  state = {
    phone: '',
    storeId: '',
    clickflag: false,
    time_number: 120,
  };

  /* 挂载完成 */
  async componentDidMount() {
    await this.props.dispatch({
      type: 'merchantsStatistics/getStoreNew',
    });
    StoreService.getStoreId().then(data => {
      if (data[0]) {
        const store = data[0];
        this.setState({ storeId: store.store.store_id });
      }
    });
  }

  // 获取验证码
  hqYzm() {
    const { form } = this.props;

    const { storeId } = this.state;
    const buildings = form.getFieldValue('phone');
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
      type: 'merchantsStatistics/hQyzm',
      payload: { buildings, storeId },
    });
  }

  // 绑定手机号
  bindPhone() {
    const { form } = this.props;
    const { storeId } = this.state;
    const phone = form.getFieldValue('phone');
    const vcode = form.getFieldValue('vcode');
    this.props.dispatch({
      type: 'merchantsStatistics/bDPhone',
      payload: { phone, vcode, storeId },
    });
  }

  // show
  showSecond() {
    const { time_number } = this.state;
    return `${time_number} + s后重发`;
      // {/* <Col {...col}>
      //             {clickflag===false ? (
      //               <Button onClick={this.hqYzm()}>发送验证码</Button>
      //             ) : (
      //               this.showSecond()
      //             )}
      //           </Col> */}
  }


  
  /**
   * 界面渲染
   */
  render() {
    // Item布局
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    const col = {
      sm: 24,
      md: 12,
    };
    const { clickflag, time_number } = this.state;
    const {
      merchantsStatistics: { xy },
    } = this.props;
    const { phone } = this.state;
    // console.log(this.props);
    const resultJsx = (
      <div>
        <PageHeaderLayout title="绑定手机号">
          <Card bordered={false} style={{ marginTop: '16px' }}>
            <Form>
              <Row>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="手机号">
                    {getFieldDecorator('phone', {
                      initialValue: phone,
                      rules: [
                        {
                          required: true,
                          message: '请输入手机号',
                        },
                      ],
                    })(<InputNumber placeholder="请输入手机号" maxLength="18" />)}
                  </Form.Item>
                </Col>
                <Col {...col}>
                  <Button onClick={clickflag ? ()=>this.hqYzm() : `${time_number} + s后重发`}>发送验证码</Button>
                </Col>
              </Row>
              <Row>
                <Col {...col}>
                  <Form.Item label="验证码" {...formItemLayout}>
                    {getFieldDecorator('vcode', {
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: '请输入验证码',
                        },
                      ],
                    })(<Input placeholder="请输入验证码" maxLength="18" />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12} offset={6}>
                  <a href={xy}>签署服务协议</a>
                </Col>
              </Row>
              <Row>
                <Col span={12} offset={6}>
                  <Button onClick={() => this.bindPhone()}>确认绑定</Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </PageHeaderLayout>
      </div>
    );
    return resultJsx;
  }
}
