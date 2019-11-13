import React, { PureComponent } from 'react';
import { Modal, Button, Input, Form } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import styles from './EnterpriseAuditInfo.less';

const { TextArea } = Input;
@Form.create()
export default class EnterpriseAuditReason extends PureComponent {
  /**
   * 初始化界面数据
   * @param {数据记录}}}} data
   */
  // initFrameData(data) {}

  // 驳回
  onBtnUnAuthClick = () => {
    const { onEnterpriseInfoFrameCloseCallback, onBtnUnReasonClick, data } = this.props;

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        formData.record_id = data.record_id;
        onBtnUnReasonClick(formData);

        onEnterpriseInfoFrameCloseCallback();
      }
    });
  };

  /**
   * 界面渲染
   */
  render() {
    const { getFieldDecorator } = this.props.form;

    const footerJsx = [
      <Button key="close" onClick={this.props.onEnterpriseInfoFrameCloseCallback}>
        关闭
      </Button>,
      <Button key="unauth" type="danger" onClick={this.onBtnUnAuthClick}>
        驳回
      </Button>,
    ];

    const resultJsx = (
      <Modal
        className={styles.frame}
        visible
        title="企业申请驳回"
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.onEnterpriseInfoFrameCloseCallback}
        footer={footerJsx}
      >
        <Form>
          <FormItem>
            {getFieldDecorator('audit_suggest', {
              rules: [
                {
                  required: true,
                  message: '请输入驳回原因',
                },
              ],
            })(<TextArea rows={4} />)}
          </FormItem>
        </Form>
      </Modal>
    );
    return resultJsx;
  }
}
