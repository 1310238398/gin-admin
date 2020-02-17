import React, { PureComponent } from 'react';
import { Form, Button, Card, Modal, Alert, Input } from 'antd';

@Form.create()
export default class Refuse extends PureComponent {
  onSaveCallback = () => {
    const { callback,callbackClose } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        formData.record_id = this.props.id;
        formData.status = 4;
        callback(formData);
        callbackClose();
      }
    });
  };

  /**
   * 界面渲染
   */
  render() {
    const { getFieldDecorator } = this.props.form;
    const { storename } = this.props;
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
      <Button style={{ marginRight: 10 }} key="close" onClick={this.props.callbackClose}>
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
        title="驳回原因"
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.callbackClose}
        footer={footerJsx}
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        <Card bordered={false}>
          <table width="100%">
            <tbody>
              <tr>
                <td>
                  {/* 全局统计信息 */}
                  <Alert type="info" showIcon message={`您选择驳回的商铺是:${storename}`} />
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
        <Card bordered={false}>
          <Form style={{ maxWidth: 600 }}>
            <Form.Item {...formItemLayout} label="驳回原因">
              {getFieldDecorator('audit_reason', {
                rules: [
                  {
                    required: true,
                    message: '请填写',
                  },
                ],
              })(<Input.TextArea rows={4} />)}
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    );
    return resultJsx;
  }
}
