import React, { PureComponent } from 'react';
import { Form, Button, Card, Modal, InputNumber, Input, Row, Col } from 'antd';

@Form.create()
export default class ShowChangeTel extends PureComponent {
  state = {};

  //  默认的组件挂载时的初始化。
  componentDidMount() {}

  onSaveCallback = () => {
    const { onSubmit, data } = this.props;
    // const {
    //     enterprise: { formData: oldFormData },
    //   } = this.props;

    //   const formData = { ...oldFormData, ...values };
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...data, ...values };

        onSubmit(formData);
      }
    });
  };

  /**
   * 界面渲染
   */
  render() {
    const { getFieldDecorator } = this.props.form;
    const { data } = this.props;
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
        保存
      </Button>,
    ];

    const resultJsx = (
      <Modal
        width={600}
        visible
        title="编辑企业联系人电话"
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.onCancel}
        footer={footerJsx}
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        <Card bordered={false}>
          <Form style={{ maxWidth: 600 }}>
            <Form.Item {...formItemLayout} label="联系电话">
              {getFieldDecorator('contact_tel', {
                initialValue: data.contact_tel?data.contact_tel:'',
                rules: [
                  {
                    required: true,
                    message: '请填写',
                  },
                ],
              })(<Input maxLength={18} />)}
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    );
    return resultJsx;
  }
}
