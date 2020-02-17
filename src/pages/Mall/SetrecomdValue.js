import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Modal, Row, Col, InputNumber } from 'antd';

@connect(state => ({
  commodityManagement: state.commodityManagement,
}))
@Form.create()
export default class SetrecomdValue extends PureComponent {
  onModalCancelClick = () => {
    this.props.onCloseCallback();
  };

  onModalOKClick = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        const { goods_id } = this.props.data;
        this.props.dispatch({
          type: 'commodityManagement/submitRecommdValues',
          payload: {
            goods_id,
            recommend_num: formData.recommend_num,
          },
        });
        this.props.onCloseCallback();
      }
    });
  };

  render() {
    const {
      data,
      form: { getFieldDecorator },
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

    return (
      <Modal
        title="设置商品推荐值"
        width={600}
        visible
        maskClosable={false}
        destroyOnClose
        okText="确定"
        cancelText="关闭"
        onOk={this.onModalOKClick}
        onCancel={this.onModalCancelClick}
        style={{ top: 20 }}
        bodyStyle={{ height: 250 }}
      >
        <Form>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="推荐值">
                {getFieldDecorator('recommend_num', {
                  initialValue: data.recommend_num ? data.recommend_num : 0,
                  rules: [
                    {
                      required: true,
                      message: '请填写',
                    },
                  ],
                })(<InputNumber min={0} step={1} />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
