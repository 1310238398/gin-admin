import React, { PureComponent } from 'react';
import { Form, Button, Card, Modal, Alert, Input } from 'antd';
import { connect } from 'dva';


@connect(state => ({
    coupon: state.coupon,
}))
@Form.create()
export default class RefuseReason extends PureComponent {
  onSaveCallback = () => {
    const { refuseBack } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        formData.id = this.props.data.record_id;
        // 保存数据
        refuseBack(formData);
      }
    });
  };

  /**
   * 界面渲染
   */
  render() {
    const { getFieldDecorator } = this.props.form;
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
      <Button style={{ marginRight: 10 }} key="close" onClick={this.props.callback}>
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
        title="拒绝退券原因"
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.callback}
        footer={footerJsx}
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        <Card bordered={false}>
          <Form style={{ maxWidth: 600 }}>
            <Form.Item {...formItemLayout} label="拒绝退款原因">
              {getFieldDecorator('migration_date', {
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
