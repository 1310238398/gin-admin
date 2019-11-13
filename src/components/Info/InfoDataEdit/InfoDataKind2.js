import React from 'react';
import { Form, Input, TreeSelect, message } from 'antd';
import RichText from '../../RichText/RichText';
import PicturesWall from '../../PicturesWall/PicturesWall';
import { OrgSelect } from '../../Org';
import UserSelect from '../../UserSelect/UserSelect';
import { FormCard, FormItem, FormDivider } from '../../FormCard';
import InfoDataComponent from './InfoDataComponent';

@Form.create()
export default class InfoDataKind2 extends InfoDataComponent {
  formSubmit = () => {
    return this.formSubmitHandler(2, formData => {
      if (formData.tags && typeof formData.tags === 'string') {
        if (formData.tags === '') {
          formData.tags = [];
        } else {
          formData.tags = formData.tags.split(/\s+/);
        }
      } else {
        formData.tags = [];
      }
      if (!formData.icon || !formData.icon.length) {
        delete formData.icon;
      }
      if ((!formData.content || formData.content === '<p></p>') && !formData.icon) {
        message.warn('图片或内容至少填写一项');
        return;
      }
      return formData;
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      org,
      column,
      hideOrg,
      hideColumn,
    } = this.props;
    const { treeData, dataSource } = this.state;
    const dataSources = dataSource || {};
    const desc = dataSources.desc ? dataSources.desc : {};
    const editorProps = {
      height: 200,
    };
    const tags = desc.tags ? desc.tags.join(' ') : '';
    let fIcons = [];
    const { icon } = desc;
    if (icon && Array.isArray(icon)) {
      fIcons = icon;
    }
    return (
      <FormCard form={this.props.form}>
        {!hideOrg && (
          <FormItem label="所属组织">
            {getFieldDecorator('org', {
              initialValue: desc.org || org,
              rules: [
                {
                  required: false,
                  message: '请输入所属组织',
                },
              ],
            })(<OrgSelect onChange={this.onOrgChange} />)}
          </FormItem>
        )}
        {!hideOrg && (
          <FormItem label="所属用户">
            {getFieldDecorator('owner', {
              initialValue: desc.owner,
              rules: [
                {
                  required: false,
                  message: '请输入所属用户',
                },
              ],
            })(<UserSelect />)}
          </FormItem>
        )}
        {!hideColumn && (
          <FormItem label="所属栏目">
            {getFieldDecorator('column_id', {
              initialValue: desc.column_id || column,
              rules: [
                {
                  required: true,
                  message: '选择栏目',
                },
              ],
            })(
              <TreeSelect
                style={{ width: '100%' }}
                treeData={treeData}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择栏目"
                treeDefaultExpandAll
                showSearch
                allowClear
                onChange={this.onClomunChange}
              />
            )}
          </FormItem>
        )}
        <FormItem label="标签">
          {getFieldDecorator('tags', {
            initialValue: tags,
            rules: [
              {
                required: false,
                message: '标签',
              },
            ],
          })(<Input placeholder="请输入标签,多个使用空格分割" />)}
        </FormItem>
        {this.showExtra()}
        <FormDivider />
        <FormItem col={2} label="图标">
          {getFieldDecorator('icon', {
            initialValue: fIcons,
            rules: [
              {
                required: false,
                message: '请输入图标',
              },
            ],
          })(
            <PicturesWall
              bucket="cms"
              name="data"
              num={9}
              listType="picture-card"
              rich={this.inputElement}
            />
          )}
        </FormItem>
        <FormDivider />
        <FormItem col={1} label="内容">
          {getFieldDecorator('content', {
            initialValue: desc.content,
          })(
            <RichText
              rich={editorProps}
              ref={elem => {
                this.inputElement = elem;
              }}
            />
          )}
        </FormItem>
      </FormCard>
    );
  }
}
