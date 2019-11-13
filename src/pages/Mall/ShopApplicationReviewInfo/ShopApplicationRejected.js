import React, { PureComponent } from 'react';
import { Modal, Button, Input, Form } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import styles from './ShopApplicationReviewInfo.less';
import { isObjectNullOrUndefinedOrEmpty } from '../../../utils/utils';

const { TextArea } = Input;
@Form.create()
export default class ShopApplicationRejected extends PureComponent {
  /**
   * 初始化界面数据
   * @param {数据记录}}}} data
   */
  // initFrameData(data) {}

  // 驳回
  onBtnUnAuthClick = () => {
    const { onShopInfoFrameCloseCallback, onBtnUnReasonClick, data } = this.props;
    this.queryForm = this.props.form.getFieldsValue();
    if (!isObjectNullOrUndefinedOrEmpty(this.queryForm)) {
      data.remark = this.queryForm.remark;
      onBtnUnReasonClick(data);

      onShopInfoFrameCloseCallback();
    }
  };

  /**
   * 界面渲染
   */
  render() {
    const { getFieldDecorator } = this.props.form;

    const footerJsx = [
      <Button key="close" onClick={this.props.onShopInfoFrameCloseCallback}>
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
        title="商铺申请驳回"
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.onShopInfoFrameCloseCallback}
        footer={footerJsx}
      >
        <Form>
          <FormItem>
            {getFieldDecorator('remark', {
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
