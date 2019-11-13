import { PureComponent } from 'react';
import { Modal, Button, Input, Form, Card } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

const { TextArea } = Input;
@Form.create()
export default class SignnoPassLog extends PureComponent {
  /**
   * 初始化界面数据
   * @param {数据记录}}}} data
   */

  // 驳回
  onBtnUnAuthClick = () => {
    this.props.onCancel();
    // const { onShopInfoFrameCloseCallback, onBtnUnReasonClick, data } = this.props;
    // this.queryForm = this.props.form.getFieldsValue();

    // console.log(this.queryForm.remark);
    // if (!isObjectNullOrUndefinedOrEmpty(this.queryForm)) {
    //   data.remark = this.queryForm.remark;
    //   onBtnUnReasonClick(data);

    //   onShopInfoFrameCloseCallback();
    // }
  };

  /**
   * 界面渲染
   */
  render() {
    const { getFieldDecorator } = this.props.form;
    console.log('this.props', this.props);

    const footerJsx = [
      <Button key="close" onClick={this.props.onCancel}>
        关闭
      </Button>,
      <Button key="unauth" type="danger" onClick={this.onBtnUnAuthClick}>
        驳回
      </Button>,
    ];

    const resultJsx = (
      <Modal
        visible
        title="拒绝通过的原因"
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.onCancel}
        footer={footerJsx}
        className="darkModal"
        style={{ marginBottom: '0px', marginTop: '0px' }}
      >
        <div style={{ borderTop: '1px solid #fff', paddingTop: '10px' }}>
          <Form layout="inline">
            <FormItem span={12} label="请输入存在的问题" style={{ color: '#fff' }}>
              {getFieldDecorator('remark', {
                rules: [
                  {
                    required: true,
                    message: '请输入原因',
                  },
                ],
              })(<TextArea rows={4} />)}
            </FormItem>
          </Form>
        </div>
      </Modal>
    );
    return resultJsx;
  }
}
