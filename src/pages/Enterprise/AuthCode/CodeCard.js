import React, { PureComponent } from 'react';
import { Modal, Button, Row, Alert } from 'antd';

export default class CodeCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      visible: true,
    };
  }

  onModalCancelClick = () => {
    this.setState({ visible: false });
    this.props.callback();
  };

  render() {
    return (
      <Modal
        title="企业认证码"
        width={600}
        visible={this.state.visible}
        maskClosable={false}
        destroyOnClose
        footer={
          <Button type="primary" onClick={this.onModalCancelClick}>
            确定
          </Button>
        }
        onCancel={this.onModalCancelClick}
        style={{ top: 20 }}
      >
        <Row style={{ marginTop: 50, marginBottom: 10, textAlign: 'center' }}>
          <span style={{ fontSize: 20 }}>已为您成功生成认证码：</span>
        </Row>
        <Row>
          <Alert
            showIcon={false}
            type="success"
            style={{ textAlign: 'center' }}
            message={<span style={{ fontSize: 56 }}>{this.state.value}</span>}
          />
        </Row>
        <Row style={{ marginTop: 10, marginBottom: 50, textAlign: 'center' }}>
          <span style={{ color: '#A9A9A9', fontSize: 16 }}>
            请复制上面的认证码发送给您的员工完成员工认证
          </span>
        </Row>
      </Modal>
    );
  }
}
