import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Card, Modal, TreeSelect, Row, Col, InputNumber } from 'antd';

@connect(state => ({
  enterpriseDepartment: state.enterpriseDepartment,
}))
@Form.create()
export default class EnterpriseDepartmentCard extends PureComponent {
  componentDidMount() {
    const { id, type, callback, info } = this.props;
    this.props.dispatch({
      type: 'enterpriseDepartment/loadForm',
      payload: {
        id,
        type,
        callback,
        info,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'enterpriseDepartment/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  onModalOKClick = () => {
    const { info } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        formData.enterprise_id = info.record_id;
        this.props.dispatch({
          type: 'enterpriseDepartment/submit',
          payload: formData,
        });
      }
    });
  };

  render() {
    const {
      enterpriseDepartment: { formTitle, formVisible, formData, submitting, treeData },
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
        md: { span: 18 },
      },
    };
    const formItemLayout2 = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
      },
    };

    return (
      <Modal
        title={formTitle}
        width={850}
        visible={formVisible}
        maskClosable={false}
        confirmLoading={submitting}
        destroyOnClose
        onOk={this.onModalOKClick}
        onCancel={this.onModalCancelClick}
      >
        <Card bordered={false}>
          <Form>
            <Row>
              <Col md={12} sm={24}>
                <Form.Item {...formItemLayout} label="部门名称">
                  {getFieldDecorator('name', {
                    initialValue: formData.name,
                    rules: [
                      {
                        required: true,
                        message: '请输入部门名称',
                      },
                    ],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col md={12} sm={24}>
                <Form.Item {...formItemLayout} label="部门上级">
                  {getFieldDecorator('parent_id', {
                    initialValue: formData.parent_id,
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(
                    <TreeSelect
                      showSearch
                      // treeDefaultExpandedKeys={[treeData.length > 0 && treeData[0].record_id]}
                      treeNodeFilterProp="title"
                      style={{ minWidth: 200 }}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={treeData}
                      placeholder="请选择"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col md={12} sm={24}>
                <Form.Item {...formItemLayout} label="排序值">
                  {getFieldDecorator('sequence', {
                    initialValue: formData.sequence ? formData.sequence : 0,
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(<InputNumber style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col md={24} sm={24}>
                <Form.Item {...formItemLayout2} label="备注">
                  {getFieldDecorator('memo', {
                    initialValue: formData.memo,
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(<Input.TextArea placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Modal>
    );
  }
}
