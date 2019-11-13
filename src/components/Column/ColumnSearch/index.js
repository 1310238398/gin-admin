import React, { PureComponent } from 'react';
import { Form, Input, TreeSelect } from 'antd';
import { OrgSelect } from '../../Org';
import columns from '../../../services/s_columnManage';
import { DicSelect } from '../../Dictionary';
import { SearchCard, SearchItem } from '../../SearchCard';

const FormItem = SearchItem;
@Form.create()
export default class ColumnSearch extends PureComponent {
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
    const formData = this.props.form.getFieldsValue();
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
    const col = {
      ...(this.props.col || {}),
    };
    return (
      <SearchCard form={this.props.form} onSearch={this.onSearchFormSubmit} col={col}>
        <FormItem label="关键字">
          {getFieldDecorator('key', {
            initialValue: searchObj.key,
            rules: [
              {
                message: '请输入部分栏目名称',
              },
            ],
          })(<Input placeholder="请输入部分栏目名称" />)}
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
          <FormItem label="上级栏目">
            {getFieldDecorator('pid', {
              initialValue: searchObj.pid,
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

        {!hide.creTime && (
          <FormItem label="状态">
            {getFieldDecorator('status', {
              initialValue: searchObj.status,
              rules: [
                {
                  required: false,
                  message: '选择状态',
                },
              ],
            })(
              <DicSelect
                vmode="int"
                pcode="cms$#columns$#status"
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
