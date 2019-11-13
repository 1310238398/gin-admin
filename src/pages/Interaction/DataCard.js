import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, Col, Radio, Select, InputNumber, Switch } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

@connect(state => ({
  interactionType: state.interactionType,
}))
@Form.create()
export default class DataCard extends PureComponent {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }

  componentDidMount() {
    const { id, callback } = this.props;
    this.props.dispatch({
      type: 'interactionType/loadForm',
      payload: {
        id,
        callback,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'interactionType/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  onModalOKClick = () => {
    this.formSubmit();
  };

  formSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };

        this.props.dispatch({
          type: 'interactionType/submitDesc',
          payload: formData,
        });
      }
    });
  };

  render() {
    const {
      interactionType: { formTitle, formVisible, formData, submitting },
      form: { getFieldDecorator },
      id,
    } = this.props;

    const desc = formData.desc ? formData.desc : {};

    return (
      <Modal
        title={formTitle}
        visible={formVisible}
        width="70%"
        maskClosable={false}
        confirmLoading={submitting}
        destroyOnClose
        onOk={this.onModalOKClick}
        onCancel={this.onModalCancelClick}
        style={{ top: 20 }}
        bodyStyle={{ maxWidth: 1280, height: 500, overflowY: 'auto' }}
      >
        <Form>
          <FormItem {...formItemLayout} label="编号">
            {!id &&
              getFieldDecorator('code', {
                initialValue: desc.code,
                rules: [
                  {
                    required: true,
                    message: '请输入编号',
                  },
                ],
              })(<Input placeholder="请输入" maxLength={100} />)}
            {id && desc.code}
          </FormItem>
          <FormItem {...formItemLayout} label="名称">
            {getFieldDecorator('name', {
              initialValue: desc.name,
              rules: [
                {
                  required: true,
                  message: '请输入名称',
                },
              ],
            })(<Input placeholder="请输入" maxLength={100} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="模式">
            {getFieldDecorator('mode', {
              initialValue: desc.mode,
              rules: [
                {
                  required: true,
                  message: '请选择模式',
                },
              ],
            })(
              <Select>
                <Option value={0}>累计计数</Option>
                <Option value={1}>最后记录</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="分数" {...formItemLayout}>
            <Col span={11}>
              <FormItem help="输入最小分数">
                {getFieldDecorator('min', {
                  initialValue: desc.min,
                  rules: [
                    {
                      required: true,
                      message: '请输入',
                    },
                  ],
                })(<InputNumber />)}
              </FormItem>
            </Col>
            <Col span={2}>
              <span
                style={{
                  display: 'inline-block',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                -
              </span>
            </Col>
            <Col span={11}>
              <FormItem help="最大分数">
                {getFieldDecorator('max', {
                  initialValue: desc.max,
                  rules: [
                    {
                      required: true,
                      message: '请输入',
                    },
                  ],
                })(<InputNumber />)}
              </FormItem>
            </Col>
          </FormItem>

          <FormItem {...formItemLayout} label="是否开放">
            {getFieldDecorator('is_public', {
              initialValue: desc.is_public,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <RadioGroup name="radiogroup">
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="是否启用平均值">
            {getFieldDecorator('is_agv', {
              initialValue: desc.is_agv,
              valuePropName: 'checked',
              rules: [
                {
                  required: true,
                },
              ],
            })(<Switch checkedChildren="是" unCheckedChildren="否" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
