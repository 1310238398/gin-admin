import React from 'react';
import { Form, Input, TreeSelect, Select } from 'antd';
import RichText from '../../RichText/RichText';
import PicturesWall from '../../PicturesWall/PicturesWall';
import { OrgSelect } from '../../Org';
import UserSelect from '../../UserSelect/UserSelect';
import { FormCard, FormItem, FormDivider } from '../../FormCard';
import InfoDataComponent from './InfoDataComponent';

const { Option } = Select;

@Form.create()
export default class InfoDataKind1 extends InfoDataComponent {
  formSubmit = () => {
    return this.formSubmitHandler(1, formData => {
      // const { org, hideOrg, hideColumn, column } = this.props;
      if (formData.list_mode === 4) {
        if (!formData.banner || (Array.isArray(formData.banner) && formData.banner.length === 0)) {
          this.props.form.setFields({
            banner: {
              value: [],
              errors: [new Error('显示旗帜图片模式必须上传旗帜图片')],
            },
          });
          return;
        }
      } else if (formData.list_mode === 2 || formData.list_mode === 3) {
        if (!formData.icon || (Array.isArray(formData.icon) && formData.icon.length === 0)) {
          this.props.form.setFields({
            icon: {
              value: [],
              errors: [new Error('图标至少上传一张图片')],
            },
          });
          return;
        }
      }
      if (formData.tags && typeof formData.tags === 'string') {
        if (formData.tags === '') {
          formData.tags = [];
        } else {
          formData.tags = formData.tags.split(/\s+/);
        }
      } else {
        formData.tags = [];
      }
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
      // if (hideOrg) {
      //   formData.org = org;
      // }
      // if (hideColumn) {
      //   formData.column_id = column;
      // }
      return formData;
    });
  };

  render() {
    // const {
    // //   infoManage: { formTitle, formVisible, formData, submitting },
    //   ,
    // } = this.props;
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
    let fBanner = [];
    const { banner, icon } = desc;
    if (banner) {
      fBanner = [banner];
    }
    if (icon && Array.isArray(icon)) {
      fIcons = icon;
    }
    return (
      <FormCard form={this.props.form}>
        <FormItem label="标题">
          {getFieldDecorator('title', {
            initialValue: desc.title,
            rules: [
              {
                required: true,
                message: '请输入标题',
              },
            ],
          })(<Input placeholder="请输入" maxLength={100} />)}
        </FormItem>

        <FormItem label="副标题">
          {getFieldDecorator('sub_title', {
            initialValue: desc.sub_title,
            rules: [
              {
                required: false,
                message: '请输入副标题',
              },
            ],
          })(<Input placeholder="请输入" maxLength={100} />)}
        </FormItem>
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
        <FormItem label="来源">
          {getFieldDecorator('from', {
            initialValue: desc.from,
            rules: [
              {
                required: false,
                message: '请输入来源',
              },
            ],
          })(<Input placeholder="请输入" maxLength={100} />)}
        </FormItem>

        <FormItem label="列表显示模式">
          {getFieldDecorator('list_mode', {
            initialValue: desc.list_mode,
            rules: [
              {
                required: false,
                message: '请选择列表显示模式',
              },
            ],
          })(
            <Select>
              <Option value={0}>自动</Option>
              <Option value={1}>文本模式</Option>
              <Option value={2}>左图右文</Option>
              <Option value={3}>上文下图</Option>
              <Option value={4}>显示旗帜图片</Option>
            </Select>
          )}
        </FormItem>

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
        <FormItem col={2} label="旗帜">
          {getFieldDecorator('banner', {
            initialValue: fBanner,
            rules: [
              {
                required: false,
                message: '请输入旗帜',
              },
            ],
          })(<PicturesWall bucket="cms" name="data" num={1} listType="picture" />)}
        </FormItem>
        <FormDivider />
        <FormItem col={1} label="简介">
          {getFieldDecorator('desc', {
            initialValue: desc.desc,
            rules: [
              {
                required: false,
                message: '请输入简介',
              },
            ],
          })(<Input.TextArea placeholder="请输入" rows={4} />)}
        </FormItem>
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
