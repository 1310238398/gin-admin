import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Modal, Row, Alert, Button } from 'antd';
import UserTypeShow from '../UserType/Show';
import { formatDate } from '../../../utils/utils';

@connect(state => ({
  authCode: state.authCode,
}))
export default class AuthCodeViewCard extends PureComponent {
  componentDidMount() {
    const { id, type, callback, info } = this.props;
    this.props.dispatch({
      type: 'authCode/loadForm',
      payload: {
        id,
        type,
        callback,
        info,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'authCode/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  onItemDisableOKClick = id => {
    this.props.dispatch({
      type: 'authCode/submitInvalid',
      payload: { record_id: id, status: 2 },
    });
  };

  onItemDisableClick = item => {
    Modal.confirm({
      title: `确定作废认证码【${item.code}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onItemDisableOKClick.bind(this, item.record_id),
    });
  };

  onModalOKClick = () => {
    const { formData } = this.props.authCode;
    this.onItemDisableClick(formData);
  };

  render() {
    const {
      authCode: { formTitle, formVisible, formData, submitting },
      info,
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

    const modalProps = {};
    if (formData.status === 1) {
      modalProps.cancelText = '关闭';
      modalProps.okText = '作废';
      modalProps.onOk = this.onModalOKClick;
    } else {
      modalProps.footer = <Button onClick={this.onModalCancelClick}>关闭</Button>;
    }

    return (
      <Modal
        title={formTitle}
        width={600}
        visible={formVisible}
        maskClosable={false}
        confirmLoading={submitting}
        destroyOnClose
        onCancel={this.onModalCancelClick}
        {...modalProps}
        style={{ top: 20 }}
      >
        <Form>
          <Form.Item {...formItemLayout} label="企业名称">
            <span className="ant-form-text">{formData.enterprise_name}</span>
          </Form.Item>
          <Form.Item {...formItemLayout} label="认证码类型">
            <span className="ant-form-text">
              {formData.code_type && (
                <UserTypeShow enterpriseID={info.record_id} code={formData.code_type} />
              )}
            </span>
          </Form.Item>
          <Form.Item {...formItemLayout} label="生效方式">
            <span className="ant-form-text">{formData.effective_mode === 1 ? '时间' : '次数'}</span>
          </Form.Item>
          {formData.effective_mode === 1 && (
            <Form.Item {...formItemLayout} label="有效期">
              <span className="ant-form-text">
                {formatDate(formData.effective_start, 'YYYY/MM/DD')} ~{' '}
                {formatDate(formData.effective_end, 'YYYY/MM/DD')}
              </span>
            </Form.Item>
          )}
          {formData.effective_mode === 2 && (
            <Form.Item {...formItemLayout} label="剩余次数/总次数">
              <span className="ant-form-text">
                {formData.effective_number - formData.used_number}/{formData.effective_number}
                （次）
              </span>
            </Form.Item>
          )}
          <Form.Item {...formItemLayout} label="状态">
            <span className="ant-form-text">{formData.status === 1 ? '有效' : '作废'}</span>
          </Form.Item>
        </Form>
        <div style={{ height: 1, width: '100%', background: '#F0F0F0' }} />
        <Row style={{ marginTop: 10, marginBottom: 10, textAlign: 'center' }}>
          <span style={{ fontSize: 18 }}>企业认证码：</span>
        </Row>
        <Row>
          <Alert
            showIcon={false}
            type="success"
            style={{ textAlign: 'center' }}
            message={<span style={{ fontSize: 48 }}>{formData.code}</span>}
          />
        </Row>
        <Row style={{ marginTop: 10, marginBottom: 10, textAlign: 'center' }}>
          <span style={{ color: '#A9A9A9', fontSize: 14 }}>
            请复制上面的认证码发送给您的员工完成员工认证
          </span>
        </Row>
      </Modal>
    );
  }
}
