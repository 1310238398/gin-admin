/* eslint-disable react/react-in-jsx-scope */
import React, { PureComponent } from 'react';
import { Card, Form, Row, Col, Input, Button, Modal } from 'antd';
import { connect } from 'dva';
import { DicSelect } from '@/components/Dictionary';

@Form.create()
@connect(state => ({
  agent: state.agent,
}))
export default class AgentEdit extends PureComponent {
  state = {};

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type } = this.props;
    this.props.dispatch({
      type: 'agent/loadForm',
      payload: {
        id,
        type,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'agent/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  // 保存，暂存
  onBtnDataClick() {
    const { callback } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        this.props.dispatch({
          type: 'agent/submit',
          payload: formData,
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
      agent: { formData, formTitle, formVisible },
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
        title={formTitle}
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
        <Card title="代理商信息" bordered={false}>
          <Form layout="vertical">
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="代理商名称">
                  {getFieldDecorator('name', {
                    initialValue: formData.name || '',
                    rules: [
                      {
                        required: true,
                        message: '请填写',
                      },
                    ],
                  })(<Input placeholder="请输入" maxLength="100" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="公司地址">
                  {getFieldDecorator('address', {
                    initialValue: formData.address || '',
                    rules: [
                      {
                        required: false,
                        message: '请输入',
                      },
                    ],
                  })(<Input placeholder="请输入" maxLength="200" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="电话">
                  {getFieldDecorator('phone', {
                    initialValue: formData.phone || '',
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请输入',
                      },
                    ],
                  })(<Input placeholder="请输入" maxLength="50" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="联系人">
                  {getFieldDecorator('contacter', {
                    initialValue: formData.contacter || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(<Input placeholder="请输入" maxLength="50" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="行业类别">
                  {getFieldDecorator('category', {
                    initialValue: formData.category || '',
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                    ],
                  })(
                    <DicSelect
                      vmode="stirng"
                      pcode="OPER$#enterprise_category_industry"
                      selectProps={{ placeholder: '请选择' }}
                    />
                  )}
                </Form.Item>
              </Col>

              <Col {...col}>
                <Form.Item label="备注">
                  {getFieldDecorator('memo', {
                    initialValue: formData.memo || '',
                    rules: [
                      {
                        required: false,
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
