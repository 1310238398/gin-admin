import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Radio, Input, Select } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
@connect(state => ({
  columnInfoCol: state.columnInfoCol,
}))
@Form.create()
export default class Step2 extends PureComponent {
  constructor(props) {
    super(props);
    const { id, callback } = props;
    callback(this.formSubmit);
    if (id) {
      this.props.dispatch({
        type: 'columnInfoCol/fetchFormCtrl',
        payload: id,
      });
    }
  }

  formSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        this.props.dispatch({
          type: 'columnInfoCol/submitCtrl',
          payload: formData,
        });
      }
    });
  };

  render() {
    const {
      columnInfoCol: { formData },
      form: { getFieldDecorator },
    } = this.props;
    const intsTypes = this.props.columnInfoCol.intsTypes ? this.props.columnInfoCol.intsTypes : [];
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 14 },
      },
    };

    // const formRichItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 7 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 24 },
    //     md: { span: 24 },
    //   },
    // };

    // const editorProps = {
    //   height: 200,
    // };
    // is_col_reply"`   // 是否开启栏目评论 0 不开启 1 开启
    // is_reply"`       // 是否开启信息评论 0 不开启 1 开启
    // is_info_chk"`    // 是否开启信息审核 0 不开启 1 开启
    // is_chk"`         // 发评论审核模式  0 不需要审核  1 需要所有者审核 2 需要组织审核 3 需要平台审核
    // allow_int_code"` // 允许的互动模式 对应InteractionTypeDesc中的Code
    // is_submit"`      // 是否允许投稿 0 不开启 1 开启
    // is_public"`      // 是否允许公开 0 不开启 1 开启
    // info_mode"`      // 信息编辑模式 -1 禁止发文章 0 多篇文章模式 1 单篇文章模式
    return (
      <Form>
        <FormItem {...formItemLayout} label="信息详情连接">
          {getFieldDecorator('infourl', {
            initialValue: formData.infourl,
            rules: [
              {
                required: false,
                message: '请输入信息详情连接',
              },
            ],
          })(<Input placeholder="请输入/xxx/xxx/xxx/:infoid" maxLength="100" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="栏目信息模式">
          {getFieldDecorator('info_mode', {
            initialValue: formData.info_mode,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <RadioGroup name="radiogroup">
              <Radio value={-1}>禁止发信息</Radio>
              <Radio value={0}>一般模式</Radio>
              <Radio value={1}>单篇信息发布模式</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="允许的互动模式">
          {getFieldDecorator('allow_int_code', {
            initialValue: formData.allow_int_code,
            rules: [
              {
                required: false,
              },
            ],
          })(
            <Select mode="multiple">
              {(() => {
                if (intsTypes) {
                  return intsTypes.map(item => {
                    return (
                      <Option key={item.code} value={item.code}>
                        {item.name}
                      </Option>
                    );
                  });
                }
              })()}
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="是否开启栏目评论">
          {getFieldDecorator('is_col_reply', {
            initialValue: formData.is_col_reply,
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
        <FormItem {...formItemLayout} label="是否开启信息评论">
          {getFieldDecorator('is_reply', {
            initialValue: formData.is_reply,
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
        <FormItem {...formItemLayout} label="是否开启信息审核">
          {getFieldDecorator('is_info_chk', {
            initialValue: formData.is_info_chk,
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
        <FormItem {...formItemLayout} label="是否开启评论审核">
          {getFieldDecorator('is_chk', {
            initialValue: formData.is_chk,
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
        <FormItem {...formItemLayout} label="是否开启投稿">
          {getFieldDecorator('is_submit', {
            initialValue: formData.is_submit,
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
        <FormItem {...formItemLayout} label="是否允许公开">
          {getFieldDecorator('is_public', {
            initialValue: formData.is_public,
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
        <FormItem {...formItemLayout} label="是否允许开放给其他组织使用">
          {getFieldDecorator('is_org', {
            initialValue: formData.is_org,
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
      </Form>
    );
  }
}
