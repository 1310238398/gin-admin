import React, { PureComponent } from 'react';
import { Form, Input } from 'antd';
import { DicSelect } from '../../components/Dictionary';
import { SchTime } from '../../components/Info';
import { SearchCard, SearchItem } from '../../components/SearchCard';

const FormItem = SearchItem;
@Form.create()
export default class FeedbackSearchCard extends PureComponent {
  constructor(props) {
    super(props);
    const { searchObj, range } = props;
    const sobj = { range: range || 0, ...searchObj };
    this.state = { searchObj: sobj };
  }

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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { searchObj } = this.state;
    // const { getFieldDecorator } = this.props.form;
    // const { treeData, searchObj } = this.state;
    // const hide = this.props.hide || {};
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
                message: '请输入信息管理部分名称',
              },
            ],
          })(<Input placeholder="请输入信息管理部分名称" />)}
        </FormItem>

        <FormItem label="问题类型">
          {getFieldDecorator('tags', {
            initialValue: searchObj.tags,
            rules: [
              {
                required: false,
                message: '输入多个标签',
              },
            ],
          })(
            <DicSelect
              pcode="cms$#feedback$#kind"
              selectProps={{ mode: 'multiple', placeholder: '请选择' }}
              onChange={this.handleChange}
            />
          )}
        </FormItem>
        <FormItem label="提交时间">
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
              pcode="cms$#feedback$#status"
              selectProps={{ mode: 'multiple', placeholder: '请选择' }}
              onChange={this.handleChange}
            />
          )}
        </FormItem>
      </SearchCard>
    );
  }
}
