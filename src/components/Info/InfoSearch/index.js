import React, { PureComponent } from 'react';
import { Form, Input, TreeSelect } from 'antd';
import { OrgSelect } from '../../Org';
import columns from '../../../services/s_columnManage';
import { DicSelect } from '../../Dictionary';
import SchTime from '../SchTime';
import { SearchCard, SearchItem } from '../../SearchCard';

const FormItem = SearchItem;
@Form.create()
export default class InfoSearch extends PureComponent {
  constructor(props) {
    super(props);
    const { searchObj, range } = props;
    const sobj = { range: range || 0, ...searchObj };
    this.state = { searchObj: sobj };

    if (searchObj && searchObj.org) {
      this.queryColumnTree({ org: searchObj.org });
    } else {
      this.queryColumnTree({});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchObj !== prevProps.searchObj) {
      const oldorg =
        prevProps.searchObj && prevProps.searchObj.org ? prevProps.searchObj.org : null;
      const neworg = this.props.searchObj.org;
      if (neworg !== oldorg) {
        this.queryColumnTree({ org: neworg });
      }
    }
  }

  onResetFormClick = () => {
    this.props.form.resetFields();
  };

  onOrgChange = org => {
    this.props.form.setFieldsValue({ column: undefined });
    this.queryColumnTree({ org });
  };

  onSearchFormSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    let formData = this.props.form.getFieldsValue();
    if (typeof formData.tags === 'string') {
      formData.tags = formData.tags.split(/\s+/);
    }
    const { searchObj } = this.props;
    if (searchObj) {
      formData = { ...searchObj, ...formData };
    }
    // console.log(formData.tags);
    if (this.props.onSearch) {
      this.props.onSearch(formData);
    }
  };

  queryColumnTree = ({ org, owner, column }) => {
    let sys = 0;
    if (org) {
      sys = 1;
    }
    columns.queryColumnTree(org, owner, column, sys).then(data => {
      this.setState({ treeData: data });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { treeData, searchObj } = this.state;
    const hide = this.props.hide || {};
    // const { getFieldDecorator } = this.props.form;
    // const { treeData, searchObj } = this.state;
    // const hide = this.props.hide || {};
    const col = {
      ...(this.props.col || {}),
    };

    let statusValue = [0, 2, 5];
    if (searchObj && searchObj.status) {
      statusValue = searchObj.status;
    }

    return (
      <SearchCard form={this.props.form} onSearch={this.onSearchFormSubmit} col={col}>
        <FormItem label="关键字">
          {getFieldDecorator('key', {
            initialValue: searchObj.key,
            rules: [
              {
                message: '请输入信息管理部分名称',
              },
            ],
          })(<Input placeholder="请输入信息管理部分名称" />)}
        </FormItem>
        <FormItem label="信息类型">
          {getFieldDecorator('kind', {
            initialValue: searchObj.kind,
            rules: [
              {
                required: false,
                message: '选择状态',
              },
            ],
          })(
            <DicSelect
              vmode="int"
              pcode="cms$#infos$#kind"
              selectProps={{ placeholder: '请选择' }}
            />
          )}
        </FormItem>
        {!hide.org && (
          <FormItem label="组织">
            {getFieldDecorator('org', {
              initialValue: searchObj.org,
              rules: [
                {
                  message: '请输入组织编号',
                },
              ],
            })(<OrgSelect onChange={this.onOrgChange} />)}
          </FormItem>
        )}
        {!hide.column && (
          <FormItem label="所属栏目">
            {getFieldDecorator('column', {
              initialValue: searchObj.column,
              rules: [
                {
                  required: false,
                  message: '选择栏目',
                },
              ],
            })(
              <TreeSelect
                showSearch
                treeData={treeData}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择"
                treeDefaultExpandAll
                allowClear
                treeNodeFilterProp="title"
                // onChange={this.onClomunChange}
              />
            )}
          </FormItem>
        )}
        {!hide.tags && (
          <FormItem label="标签">
            {getFieldDecorator('tags', {
              initialValue: searchObj.tags,
              rules: [
                {
                  required: false,
                  message: '输入多个标签',
                },
              ],
            })(<Input placeholder="请输入标签,多个标签用空格分割" />)}
          </FormItem>
        )}
        {!hide.pubTime && (
          <FormItem label="发布时间">
            {getFieldDecorator('pubTime', {
              initialValue: searchObj.pubTime,
              rules: [
                {
                  required: false,
                  message: '选择时间',
                },
              ],
            })(<SchTime isRange />)}
          </FormItem>
        )}
        {!hide.creTime && (
          <FormItem label="创建时间">
            {getFieldDecorator('creTime', {
              initialValue: searchObj.creTime,
              rules: [
                {
                  required: false,
                  message: '选择时间',
                },
              ],
            })(<SchTime isRange />)}
          </FormItem>
        )}
        {!hide.status && (
          <FormItem label="状态">
            {getFieldDecorator('status', {
              initialValue: statusValue,
              rules: [
                {
                  required: false,
                  message: '选择状态',
                },
              ],
            })(
              <DicSelect
                vmode="int"
                pcode="cms$#infos$#status"
                selectProps={{ mode: 'multiple', placeholder: '请选择' }}
                onChange={this.handleChange}
              />
            )}
          </FormItem>
        )}
      </SearchCard>
    );
  }
}
