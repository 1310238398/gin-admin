/* eslint-disable react/react-in-jsx-scope */
import React, { PureComponent } from 'react';
import { Card, Form, Row, Col, Button, Modal, Radio, InputNumber } from 'antd';
import { connect } from 'dva';

const RadioGroup = Radio.Group;
@Form.create()
@connect(state => ({
  advertisSet: state.advertisSet,
}))
export default class AdvertisSetEdit extends PureComponent {
  state = {};

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type } = this.props;
    this.props.dispatch({
      type: 'advertisSet/loadForm',
      payload: {
        id,
        type,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'advertisSet/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  // 保存，暂存
  onBtnDataClick() {
    const {
      callback,
      advertisSet: { formData },
    } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formDataC = { ...values };
        formDataC.record_id = formData.record_id;
        this.props.dispatch({
          type: 'advertisSet/submit',
          payload: formDataC,
        });
        callback();
      }
    });
  }

  /**
   * 界面渲染
   */
  render() {
    const {
      advertisSet: { formData,  formVisible },
      form: { getFieldDecorator },
    } = this.props;

    const col = {
      sm: 24,
      md: 12,
    };

    const footerJsx = [
      <Button key="close" onClick={this.props.callback}>
        关闭
      </Button>,
      <Button type="primary" onClick={() => this.onBtnDataClick()}>
        保存
      </Button>,
    ];

    const resultJsx = (
      <Modal
        visible={formVisible}
        title={'设置信息'}
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.callback}
        footer={footerJsx}
        width={1000}
        style={{ top: 20 }}
        bodyStyle={{ paddingRight: 30, paddingLeft: 30 }}
      >
        <Card title="" bordered={false}>
          <Form layout="vertical">
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="权重值">
                  {getFieldDecorator('weight', {
                    initialValue: formData.weight || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(
                    <InputNumber step={1} min={0} placeholder="请输入" style={{ width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="是否固定该广告">
                  {getFieldDecorator('fixed', {
                    initialValue: formData.fixed || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(
                    <RadioGroup>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </RadioGroup>
                  )}
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
