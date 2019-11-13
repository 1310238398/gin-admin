import React, { PureComponent } from 'react';
import { Form, Button, Card, Modal } from 'antd';
import { connect } from 'dva';
import EnterpriseFlags from '../../../components/EnterpriseFlags/EnterpriseFlags';

@connect(state => ({
  enterprise: state.enterprise,
}))
@Form.create()
export default class EnterpriseFlag extends PureComponent {
  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { data } = this.props;
    this.props.dispatch({
      type: 'enterprise/loadFormTag',
      payload: data.record_id,
    });
  }

  onSaveCallback = () => {
    const { callback } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        const tagList = [];
        if (formData && formData.tags.length > 0) {
          for (let i = 0; i < formData.tags.length; i += 1) {
            tagList.push(parseFloat(formData.tags[i].code));
          }
        }
        callback({ tags: tagList }, this.props.data.record_id);
      }
    });
  };

  /**
   * 界面渲染
   */
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      enterprise: { enterpriseTag },
    } = this.props;
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
        title="企业标记"
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.callbackClose}
        footer={footerJsx}
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        <Card bordered={false}>
          <Form style={{ maxWidth: 600 }}>
            <Form.Item {...formItemLayout} label="企业标记">
              {getFieldDecorator('tags', {
                initialValue: enterpriseTag,
                rules: [
                  {
                    required: true,
                    message: '请选择',
                  },
                ],
              })(<EnterpriseFlags />)}
            </Form.Item>
            {/* <Form.Item {...tailFormItemLayout}>{footerJsx}</Form.Item> */}
          </Form>
        </Card>
      </Modal>
    );
    return resultJsx;
  }
}
