import React, { PureComponent } from 'react';
import { Form, Input, Modal, Upload, Button, Icon } from 'antd';
import StageSelect from '../StageSelect';

class StageInfoDialog extends PureComponent {
  handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  };

  dispatch = action => {
    const { dispatch } = this.props;
    dispatch(action);
  };

  render() {
    const { visible, item } = this.props;

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

    return (
      <Modal
        title={`录入【${item.type}】数据`}
        className="darkModal"
        width={600}
        visible={visible}
        destroyOnClose
        onOk={this.onOKClick}
        onCancel={() => {
          this.handleCancel();
        }}
        footer={null}
      >
        <Form className="darkForm">
          <Form.Item {...formItemLayout} label="招商阶段">
            <StageSelect value={item.stage} />
          </Form.Item>
          <Form.Item {...formItemLayout} label="地点">
            <Input placeholder="请输入地点" />
          </Form.Item>
          <Form.Item {...formItemLayout} label="描述">
            <Input.TextArea rows={4} placeholder="请输入描述" />
          </Form.Item>
          <Form.Item {...formItemLayout} label="附件上传">
            <Upload name="attach" listType="picture">
              <Button>
                <Icon type="upload" /> 点击上传附件
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button
              type="primary"
              onClick={() => {
                this.handleCancel();
              }}
            >
              保存
            </Button>
            <Button
              onClick={() => {
                this.handleCancel();
              }}
              style={{ marginLeft: 30 }}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default StageInfoDialog;
