import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Select } from 'antd';
import PicturesWall from '../../components/PicturesWall/PicturesWall';
import { FormCard, FormItem } from '@/components/FormCard';

const { Option } = Select;

@connect(state => ({
  groupManage: state.groupManage,
}))
@Form.create()
export default class Step1 extends PureComponent {
  constructor(props) {
    super(props);
    const { callback } = props;
    callback(this.formSubmit);
  }

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.props.dispatch({
        type: 'groupManage/fetchFormDesc',
        payload: id,
      });
    }
  }

  formSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        if (formData.banner && formData.banner.length && typeof formData.banner !== 'string') {
          const tmp = formData.banner[0];
          if (tmp) {
            formData.banner = tmp;
          }
        } else {
          delete formData.banner;
        }
        if (!formData.icon || !formData.icon.length) {
          delete formData.icon;
        }
        this.props.dispatch({
          type: 'groupManage/submitDesc',
          payload: formData,
        });
      }
    });
  };

  render() {
    const {
      groupManage: { formData, formID },
      form: { getFieldDecorator },
    } = this.props;
    let fIcons = [];
    const { icon } = formData;
    if (icon && icon.length) {
      fIcons = icon;
    }
    return (
      <FormCard form={this.props.form}>
        {formID && <FormItem label="信息组编号">{formID}</FormItem>}

        <FormItem label="名称">
          {getFieldDecorator('name', {
            initialValue: formData.name,
            rules: [
              {
                required: true,
                message: '请输入信息组名称',
              },
            ],
          })(<Input placeholder="请输入" maxLength="20" />)}
        </FormItem>
        <FormItem label="短名称">
          {getFieldDecorator('short_name', {
            initialValue: formData.short_name,
            rules: [
              {
                required: true,
                max: 5,
                message: '请输入信息组短名称,最长不能超过5个字',
              },
            ],
          })(<Input placeholder="请输入" maxLength={5} />)}
        </FormItem>
        <FormItem label="收集类型">
          {getFieldDecorator('kind', {
            initialValue: formData.kind,
            rules: [
              {
                required: true,
                message: '请选择收集类型',
              },
            ],
          })(
            <Select>
              <Option value={0}>手动</Option>
              <Option value={1}>自动</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="所属组织">
          {getFieldDecorator('org', {
            initialValue: formData.org,
            rules: [
              {
                required: false,
                message: '请输入所属组织',
              },
            ],
          })(<Input placeholder="请输入" onChange={this.onOrgChange} />)}
        </FormItem>
        <FormItem col={1} label="图标">
          {getFieldDecorator('icon', {
            initialValue: fIcons,
            rules: [
              {
                required: false,
                message: '请输入图标',
              },
            ],
          })(<PicturesWall bucket="cms" name="data" num={9} listType="picture-card" />)}
        </FormItem>
        <FormItem col={1} label="简介">
          {getFieldDecorator('desc', {
            initialValue: formData.desc,
          })(<Input.TextArea rows={4} placeholder="请输入" />)}
        </FormItem>
      </FormCard>
    );
  }
}
