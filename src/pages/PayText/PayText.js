import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Col, Input, Row, InputNumber, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { create } from '@/services/payService';
@connect(() => ({}))
@Form.create()
export default class PayText extends PureComponent {
  state = {};

  componentDidMount() {}

  saveData = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.jump_url = window.location.href;
        const Data = { ...values };
        create(Data).then(data => {
          window.open(data.url, '_blank', '', false);
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

    return (
      <PageHeaderLayout title="测试支付跳转">
        <Form>
          <Row>
            <Col>
              <Form.Item label="金额(单位分)">
                {getFieldDecorator('amount', {
                  rules: [
                    {
                      required: false,
                      message: '请输入',
                    },
                  ],
                })(<InputNumber placeholder="请输入" />)}
              </Form.Item>
            </Col>
          </Row>
          <Button onClick={this.saveData}>支付</Button>
        </Form>
      </PageHeaderLayout>
    );
  }
}
