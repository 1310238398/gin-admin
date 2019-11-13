import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, DatePicker, Modal, InputNumber, Radio } from 'antd';
import moment from 'moment';
import UserTypeRadioGroup from '../UserType/RadioGroup';

@connect(state => ({
  authCode: state.authCode,
  enterprise: state.enterprise,
}))
@Form.create()
export default class AuthCodeCard extends PureComponent {
  state = {
    mode: '2',
  };

  componentDidMount() {
    const { id, type, callback, info, enterId } = this.props;
    this.props.dispatch({
      type: 'authCode/loadForm',
      payload: {
        id,
        type,
        callback,
        info,
      },
    });

    this.props.dispatch({
      type: 'enterprise/loadFormTag',
      payload: enterId,
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'authCode/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  onModalOKClick = () => {
    const { info } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        formData.effective_mode = parseInt(formData.effective_mode, 10);
        formData.confirm_flag = parseInt(formData.confirm_flag, 10);
        formData.effective_number = formData.effective_number
          ? parseInt(formData.effective_number, 10)
          : 0;

        if (formData.effective_date) {
          const ranges = formData.effective_date;
          formData.effective_start = moment(ranges[0], 'YYYY-MM-DD');
          formData.effective_end = moment(ranges[1], 'YYYY-MM-DD');
        }
        // formData.record_id = info.record_id;
        formData.enterprise_id = info.record_id;
        this.props.dispatch({
          type: 'authCode/submit',
          payload: formData,
        });
      }
    });
  };

  onChange = e => {
    this.setState({ mode: e.target.value });
  };

  render() {
    const {
      info,
      authCode: { formTitle, formVisible, formData, submitting },
      form: { getFieldDecorator },
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

    return (
      <Modal
        title={formTitle}
        width={600}
        visible={formVisible}
        maskClosable={false}
        confirmLoading={submitting}
        destroyOnClose
        okText="生成"
        onOk={this.onModalOKClick}
        onCancel={this.onModalCancelClick}
        style={{ top: 20 }}
      >
        <Form>
          {/* <Form.Item {...formItemLayout} label="园区名称">
            {getFieldDecorator('park_name', {
              initialValue: formData.park_name,
            })(<span className="ant-form-text">{formData.park_name}</span>)}
          </Form.Item> */}
          <Form.Item {...formItemLayout} label="企业名称">
            {getFieldDecorator('enterprise_name', {
              initialValue: formData.enterprise_name,
            })(<span className="ant-form-text">{formData.enterprise_name}</span>)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="认证码类型">
            {getFieldDecorator('code_type', {
              initialValue: formData.code_type,
              rules: [
                {
                  required: true,
                  message: '请选择认证码类型',
                },
              ],
            })(<UserTypeRadioGroup enterpriseID={info.record_id} />)}
          </Form.Item>
          {/* <Form.Item {...formItemLayout} label="是否需要管理员确认">
            {getFieldDecorator('confirm_flag', {
              initialValue: '2',
            })(
              <Radio.Group>
                <Radio value="1">是</Radio>
                <Radio value="2">否</Radio>
              </Radio.Group>
            )}
          </Form.Item> */}
          <Form.Item {...formItemLayout} label="生效方式">
            {getFieldDecorator('effective_mode', {
              initialValue: '2',
            })(
              <Radio.Group onChange={this.onChange}>
                <Radio value="1">时间</Radio>
                <Radio value="2">次数</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          {this.state.mode === '1' && (
            <Form.Item {...formItemLayout} label="有效日期">
              {getFieldDecorator('effective_date', {
                required: true,
                message: '请选择有效日期',
              })(
                <DatePicker.RangePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: '100%' }}
                />
              )}
            </Form.Item>
          )}
          {this.state.mode === '2' && (
            <Form.Item {...formItemLayout} label="认证次数">
              {getFieldDecorator('effective_number', {
                initialValue: 1,
              })(<InputNumber min={1} max={9999} />)}
            </Form.Item>
          )}
        </Form>
      </Modal>
    );
  }
}
