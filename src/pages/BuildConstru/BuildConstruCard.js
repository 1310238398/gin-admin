import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Card, Radio, Modal, Row, Col } from 'antd';

@connect(({ buildconstru }) => ({
  buildconstru,
}))
@Form.create()
class BuildConstruCard extends PureComponent {
  onOKClick = () => {
    const { form, onSubmit } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        delete formData.parent_name;
        formData.btype = parseInt(formData.btype, 10);
        formData.floor_area = parseInt(formData.floor_area, 10);
        formData.usage_area = parseInt(formData.usage_area, 10);
        formData.billing_area = parseInt(formData.billing_area, 10);
        onSubmit(formData);
      }
    });
  };

  dispatch = action => {
    const { dispatch } = this.props;
    dispatch(action);
  };

  render() {
    const {
      buildconstru: { formVisible, formTitle, formData, submitting, selectNode },
      form: { getFieldDecorator },
      onCancel,
    } = this.props;

    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 18,
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
        onOk={this.onOKClick}
        onCancel={onCancel}
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        <Card bordered={false}>
          <Form>
            <Row>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="建筑编号">
                  {getFieldDecorator('code', {
                    initialValue: formData.code,
                    rules: [
                      {
                        required: true,
                        message: '请输入建筑编号',
                      },
                    ],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="建筑名称">
                  {getFieldDecorator('name', {
                    initialValue: formData.name,
                    rules: [
                      {
                        required: true,
                        message: '请输入建筑名称',
                      },
                    ],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="建筑类型">
                  {getFieldDecorator('btype', {
                    initialValue: formData.btype ? formData.btype.toString() : '',
                    rules: [
                      {
                        required: true,
                        message: '请选择建筑类型',
                      },
                    ],
                  })(
                    <Radio.Group>
                      <Radio value="90">区域</Radio>
                      <Radio value="80">楼栋</Radio>
                      <Radio value="70">单元</Radio>
                      <Radio value="60">楼层</Radio>
                      <Radio value="50">门牌</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="上级菜单">
                  {getFieldDecorator('parent_name', {
                    initialValue: selectNode.name,
                    rules: [
                      {
                        required: false,
                        message: '请输入建筑编号',
                      },
                    ],
                  })(<Input placeholder="请输入" readOnly />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="建筑面积">
                  {getFieldDecorator('floor_area', {
                    initialValue: formData.floor_area ? formData.floor_area.toString() : '0',
                    rules: [
                      {
                        required: true,
                        message: '请输入建筑面积',
                      },
                    ],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="使用面积">
                  {getFieldDecorator('usage_area', {
                    initialValue: formData.usage_area ? formData.usage_area.toString() : '0',
                    rules: [
                      {
                        required: true,
                        message: '请输入使用面积',
                      },
                    ],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="计费面积">
                  {getFieldDecorator('billing_area', {
                    initialValue: formData.billing_area ? formData.billing_area.toString() : '0',
                    rules: [
                      {
                        required: true,
                        message: '请输入计费面积',
                      },
                    ],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Modal>
    );
  }
}

export default BuildConstruCard;
