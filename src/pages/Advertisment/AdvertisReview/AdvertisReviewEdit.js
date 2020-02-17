/* eslint-disable react/react-in-jsx-scope */
import React, { PureComponent } from 'react';
import { Card, Form, Row, Col, Input, Button, Modal } from 'antd';
import { connect } from 'dva';

@Form.create()
@connect(state => ({
  advertisReview: state.advertisReview,
}))
export default class AdvertisReviewEdit extends PureComponent {
  state = {};

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type } = this.props;
    this.props.dispatch({
      type: 'advertisReview/loadForm',
      payload: {
        id,
        type,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'advertisReview/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  // 保存，暂存
  onBtnDataClick() {
    const {
      dataCallBack,
      advertisReview: { formData },
    } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formDataC = { ...values };
        formDataC.record_id = formData.record_id;
        dataCallBack(formDataC);
      }
    });
  }

  /**
   * 界面渲染
   */
  render() {
    const {
      advertisReview: { formData, formTitle, formVisible },
      form: { getFieldDecorator },
    } = this.props;

    const col = {
      sm: 24,
      md: 12,
    };
    const colCjy = {
      sm: 24,
      md: 24,
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
        title={'驳回信息'}
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.callback}
        footer={footerJsx}
        width={1000}
        style={{ top: 20 }}
        bodyStyle={{
          paddingRight: 30,
          paddingLeft: 30,
          overflowY: 'scroll',
          paddingBottom: 0,
          paddingTop: 0,
        }}
      >
        <Card title="" bordered={false}>
          <Form layout="vertical">
            <Row gutter={32}>
              <Col {...colCjy}>
                <Form.Item label="驳回原因">
                  {getFieldDecorator('audit_reason', {
                    initialValue: formData.audit_reason || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(<Input.TextArea placeholder="请输入" autosize={{ minRows: 2, maxRows: 6 }} />)}
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
