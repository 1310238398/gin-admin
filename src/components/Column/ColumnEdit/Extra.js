import React, { PureComponent } from 'react';
// import { connect } from 'dva';
import { Form, Input, Radio, Card, Select, Button, InputNumber } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

@Form.create()
export default class Extra extends PureComponent {
  constructor(props) {
    super(props);
    const { data } = props;
    this.state = { edit: data };
  }

  state = {
    edit: {},
  };

  onChangeKind = e => {
    const { edit } = this.state;
    edit.kind = e;
    this.setState({ edit });
  };

  onSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        const { callback } = this.props;
        callback(formData);
      }
    });
  };

  showParams = () => {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 14 },
      },
    };
    const {
      // columnManage: { extraTypes },
      form: { getFieldDecorator },
      extraTypes,
    } = this.props;
    const { edit } = this.state;
    const out = [];
    if (edit && edit.kind) {
      for (const value of extraTypes) {
        if (value && value.code && value.params) {
          if (value.code === edit.kind) {
            for (const val of value.params) {
              let ival = '';
              if (edit.param_values) {
                ival = edit.param_values[val.pcode];
              }
              out.push(
                <FormItem key={val.pcode} {...formItemLayout} label={`${val.name}(${val.pcode})`}>
                  {getFieldDecorator(`param_values.${val.pcode}`, {
                    initialValue: ival,
                  })(this.rendParamInput(val))}
                </FormItem>
              );
            }
            break;
          }
        }
      }
    }
    return <div>{out}</div>;
  };

  rendParamInput = ({ typ, value }) => {
    switch (typ) {
      case 'string':
        return <Input placeholder="请输入" maxLength="100" />;
      case 'int':
        return <InputNumber placeholder="请输入" />;
      case 'menu': {
        const os = value.map(item => {
          return <Option value={item.value}>{item.name}</Option>;
        });
        return <Select>{os}</Select>;
      }
      default:
        return '不支持的类型';
    }
  };

  render() {
    const { data } = this.props;
    const {
      // columnManage: { extraTypes },
      form: { getFieldDecorator },
      extraTypes,
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 14 },
      },
    };
    return (
      <Form>
        <FormItem {...formItemLayout} label="属性名称">
          {getFieldDecorator('name', {
            initialValue: data.name,
            rules: [
              {
                required: true,
                message: '请输入属性名称',
              },
            ],
          })(<Input placeholder="请输入" maxLength="20" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="属性编码">
          {getFieldDecorator('code', {
            initialValue: data.code,
            rules: [
              {
                required: true,
                message: '请输入属性编码',
              },
            ],
          })(<Input placeholder="请输入" maxLength="20" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="属性种类">
          {getFieldDecorator('kind', {
            initialValue: data.kind,
            rules: [
              {
                required: true,
                message: '请输入属性种类',
              },
            ],
          })(
            <Select onChange={this.onChangeKind}>
              {extraTypes.map(item => {
                return (
                  <Option key={item.code} value={item.code}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          )}
        </FormItem>
        <Card title="属性种类的扩展参数设置">{this.showParams()}</Card>
        <FormItem {...formItemLayout} label="提示消息">
          {getFieldDecorator('placeholder', {
            initialValue: data.placeholder,
            rules: [
              {
                required: false,
                message: '请输入提示消息',
              },
            ],
          })(<Input placeholder="请输入" maxLength="100" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="是否必填">
          {getFieldDecorator('required', {
            initialValue: data.required,
            rules: [
              {
                required: true,
                message: '请选择是或否',
              },
            ],
          })(
            <RadioGroup name="radiogroup">
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="是否客户端可以更改">
          {getFieldDecorator('isupdate', {
            initialValue: data.isupdate,
            rules: [
              {
                required: true,
                message: '请选择是或否',
              },
            ],
          })(
            <RadioGroup name="radiogroup">
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="错误提示消息">
          {getFieldDecorator('message', {
            initialValue: data.message,
            rules: [
              {
                required: false,
                message: '错误提示消息',
              },
            ],
          })(<Input placeholder="请输入" maxLength="100" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="规则信息">
          {getFieldDecorator('rulses', {
            initialValue: data.rulses,
            rules: [
              {
                required: false,
                message: '错误提示消息',
              },
            ],
          })(<TextArea placeholder="请输入" autosize={{ minRows: 2, maxRows: 6 }} />)}
        </FormItem>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            textAlign: 'right',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px',
          }}
        >
          <Button onClick={this.onSubmit} type="primary">
            确定
          </Button>
        </div>
      </Form>
    );
  }
}
