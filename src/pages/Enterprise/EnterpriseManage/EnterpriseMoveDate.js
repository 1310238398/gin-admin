import React, { PureComponent } from 'react';
import { Form, Button, Card, Modal, DatePicker, Alert } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

@connect(state => ({
  enterprise: state.enterprise,
}))
@Form.create()
export default class EnterpriseMoveDate extends PureComponent {
  onSaveCallback = () => {
    const { callback } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        formData.id = this.props.data.record_id;
        formData.migration_date = formData.migration_date.format('YYYY-MM-DD');
        // 保存数据
        callback(formData);
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
        title="企业迁出日期"
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
                  <Alert
                    type="info"
                    showIcon
                    message={`您选择迁出的企业是:${this.props.data.name}`}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
        <Card bordered={false}>
          <Form style={{ maxWidth: 600 }}>
            <Form.Item {...formItemLayout} label="企业迁出日期">
              {getFieldDecorator('migration_date', {
                initialValue: data.migration_date ? moment(data.migration_date, 'YYYY-MM-DD') : '',
                rules: [
                  {
                    required: true,
                    message: '请选择',
                  },
                ],
              })(<DatePicker placeholder="选择时间" format="YYYY-MM-DD" />)}
            </Form.Item>
            {/* <Form.Item {...tailFormItemLayout}>{footerJsx}</Form.Item> */}
          </Form>
        </Card>
      </Modal>
    );
    return resultJsx;
  }
}
