import React, { PureComponent } from 'react';
import { Card, Form, Row, Col, Input, Radio,Button,Modal } from 'antd';
import { connect } from 'dva';

const RadioGroup = Radio.Group;

@Form.create()
@connect(state => ({
  shopMallStore: state.shopMallStore,
}))

export default class ShopEdit extends PureComponent {
  render() {
    const {
        shopMallStore: { formData, formTitle,formVisible },
        form: { getFieldDecorator, getFieldValue },
      } = this.props;
  
      const col = {
        sm: 24,
        md: 12,
      };

      const footerJsx = [
        <Button key="close" onClick={this.props.callback}>
          关闭
        </Button>,
        <Button type="primary" onClick={() => this.onBtnDataClick(2)}>
          保存
        </Button>,
      ];
    const resultJsx = (
      <Modal
        visible={formVisible}
        title={formTitle}
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.callback}
        footer={footerJsx}
        width={900}
        bodyStyle={{ paddingRight: 30, paddingLeft: 30 }}
      >
        <Card title="账户设置" bordered={false}>
          <Form layout="vertical">
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="账户属性">
                  {getFieldDecorator('is_belong_park', {
                    initialValue: formData.is_belong_park || 1,
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                    ],
                  })(
                    <RadioGroup>
                      <Radio value={1}>个人账户</Radio>
                      <Radio value={2}>企业账户</Radio>
                    </RadioGroup>
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="商铺编号">
                  {getFieldDecorator('code', {
                    initialValue: formData.code || '',
                    rules: [
                      {
                        required: getFieldValue('is_belong_park') === 1,
                        message: '请输入商铺编号',
                      },
                    ],
                  })(<Input placeholder="请输入商铺编号" maxLength="50" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="商铺名称">
                  {getFieldDecorator('name', {
                    initialValue: formData.name || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入商铺名称',
                      },
                    ],
                  })(<Input placeholder="请输入商铺名称" maxLength="50" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="商铺品牌">
                  {getFieldDecorator('brand', {
                    initialValue: formData.brand !== '' ? formData.brand : formData.name,
                    rules: [
                      {
                        required: true,
                        message: '请输入商铺品牌',
                      },
                    ],
                  })(<Input placeholder="请输入商铺品牌" maxLength="50" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Modal>
    );
    return resultJsx;
  }
}
