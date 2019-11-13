import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Radio, Input, Select, message } from 'antd';
import intType from '../../../services/s_interactionType';
import columns from '../../../services/s_columnManage';
import { DicSelect } from '@/components/Dictionary';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
@connect(state => ({
  columnManage: state.columnManage,
}))
@Form.create()
export default class Step2 extends PureComponent {
  constructor(props) {
    super(props);
    const { id, callback } = props;
    callback(this.formSubmit);
    this.state = {
      formData: {},
      intsTypes: [],
      allowInfoKindsRequired: false,
    };
    if (id) {
      this.fetchCtrl();
      this.fetchIntType();
    }
  }

  fetchIntType = async () => {
    const intsresp = await intType.queryAll();
    if (intsresp) {
      const out = intsresp.map(item => {
        return { code: item.desc.code, name: item.desc.name };
      });
      this.setState({ intsTypes: out });
    }
  };

  fetchCtrl = async () => {
    const { id } = this.props;
    const resp = await columns.queryCtrl(id);
    if (resp) {
      this.setState({ formData: resp });
    }
  };

  formSubmit = () => {
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const formData = { ...values };
        const { org, id, nextHandler, form } = this.props;

        if (
          formData.deny_info_kind_all === 1 &&
          (!formData.allow_info_kinds || formData.allow_info_kinds.length === 0)
        ) {
          form.setFields({
            allow_info_kinds: {
              value: [],
              errors: [new Error('允许发布所有类型信息关闭，必须设置该值')],
            },
          });
          return;
        }

        if (org) {
          formData.is_org = 0;
        }
        const response = await columns.submitUpdateCtrl(id, formData);
        if (response === 'ok') {
          message.success('保存成功');
          if (nextHandler) nextHandler();
        }
      }
    });
  };

  render() {
    const {
      org,
      form: { getFieldDecorator },
    } = this.props;
    const { formData, intsTypes, allowInfoKindsRequired } = this.state;
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
    // info_mode"`      // 信息编辑模式 -1  0 多篇文章模式 1 单篇文章模式
    // prohibit_post_info // 禁止发信息 0 不开启 1 开启
    // is_prohibit_pub_info // 禁止信息发布 0 不开启 1 开启

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
          })(<Input placeholder="请输入/xxx/xxx/xxx/:infoid" maxLength={100} />)}
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
            <RadioGroup buttonStyle="solid">
              <Radio.Button value={0}>一般模式</Radio.Button>
              <Radio.Button value={1}>单篇信息发布模式</Radio.Button>
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
        <FormItem {...formItemLayout} label="是否禁止发布文章">
          {getFieldDecorator('prohibit_post_info', {
            initialValue: formData.prohibit_post_info,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <RadioGroup buttonStyle="solid">
              <Radio.Button value={1}>开启</Radio.Button>
              <Radio.Button value={0}>关闭</Radio.Button>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="是否禁止所有信息类型发布">
          {getFieldDecorator('deny_info_kind_all', {
            initialValue: formData.deny_info_kind_all,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <RadioGroup
              buttonStyle="solid"
              onChange={e => {
                this.setState({ allowInfoKindsRequired: !!e.target.value });
              }}
            >
              <Radio.Button value={1}>开启</Radio.Button>
              <Radio.Button value={0}>关闭</Radio.Button>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="允许的信息发布类型">
          {getFieldDecorator('allow_info_kinds', {
            initialValue: formData.allow_info_kinds,
            rules: [
              {
                required: allowInfoKindsRequired,
              },
            ],
          })(
            <DicSelect
              disabled={!allowInfoKindsRequired}
              vmode="int"
              pcode="cms$#infos$#kind"
              selectProps={{ mode: 'multiple', placeholder: '请选择' }}
            />
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
            <RadioGroup buttonStyle="solid">
              <Radio.Button value={1}>开启</Radio.Button>
              <Radio.Button value={0}>关闭</Radio.Button>
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
            <RadioGroup buttonStyle="solid">
              <Radio.Button value={1}>开启</Radio.Button>
              <Radio.Button value={0}>关闭</Radio.Button>
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
            <RadioGroup buttonStyle="solid">
              <Radio.Button value={1}>开启</Radio.Button>
              <Radio.Button value={0}>关闭</Radio.Button>
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
            <RadioGroup buttonStyle="solid">
              <Radio.Button value={1}>开启</Radio.Button>
              <Radio.Button value={0}>关闭</Radio.Button>
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
            <RadioGroup buttonStyle="solid">
              <Radio.Button value={1}>开启</Radio.Button>
              <Radio.Button value={0}>关闭</Radio.Button>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="是否禁止信息发布">
          {getFieldDecorator('is_prohibit_pub_info', {
            initialValue: formData.is_prohibit_pub_info,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <RadioGroup buttonStyle="solid">
              <Radio.Button value={1}>开启</Radio.Button>
              <Radio.Button value={0}>关闭</Radio.Button>
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
            <RadioGroup buttonStyle="solid">
              <Radio.Button value={1}>开启</Radio.Button>
              <Radio.Button value={0}>关闭</Radio.Button>
            </RadioGroup>
          )}
        </FormItem>
        {!org && (
          <FormItem {...formItemLayout} label="是否允许开放给其他组织使用">
            {getFieldDecorator('is_org', {
              initialValue: formData.is_org,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <RadioGroup buttonStyle="solid">
                <Radio.Button value={1}>开启</Radio.Button>
                <Radio.Button value={0}>关闭</Radio.Button>
              </RadioGroup>
            )}
          </FormItem>
        )}
      </Form>
    );
  }
}
