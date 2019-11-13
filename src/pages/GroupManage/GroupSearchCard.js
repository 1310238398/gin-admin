import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input } from 'antd';
import { DicSelect } from '../../components/Dictionary';
import { SearchCard, SearchItem } from '../../components/SearchCard';
import { OrgSelect } from '../../components/Org';

@connect(state => ({
  groupManage: state.groupManage,
  columnManage: state.columnManage,
}))
@Form.create()
export default class GroupSearchCard extends PureComponent {
  state = {
    searchObj: {},
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'columnManage/queryColumnTree',
    });
  }

  onResetFormClick = () => {
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'groupManage/saveSearch',
      payload: {},
    });
    this.props.dispatch({
      type: 'groupManage/fetch',
    });
  };

  onOrgChange = () => {
    // this.props.form.setFieldsValue({ column: undefined });
    // this.queryColumnTree({ org });
  };

  onSearchFormSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    const formData = this.props.form.getFieldsValue();
    if (typeof formData.flags === 'string') {
      formData.flags = formData.flags.split(/\s+/);
    }
    // console.log(formData.tags);
    this.props.callback(formData);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { searchObj } = this.state;

    return (
      <SearchCard form={this.props.form} onSearch={this.onSearchFormSubmit}>
        <SearchItem label="关键字">
          {getFieldDecorator('key', {
            rules: [
              {
                message: '请输入信息管理部分名称',
              },
            ],
          })(<Input placeholder="请输入信息管理部分名称" />)}
        </SearchItem>
        <SearchItem label="组织">
          {getFieldDecorator('org', {
            initialValue: searchObj.org,
          })(<OrgSelect />)}
          {/* {!allorg && (
            <InputGroup compact>
              <Select
                style={{ width: '40%' }}
                value={orgtype}
                onChange={this.onChangeOrgType}
              >
                <Option value="">所有组织</Option>
                <Option value="001">园区</Option>
                <Option value="002">企业</Option>
              </Select>
              {getFieldDecorator('org', {
                initialValue: searchObj.org,
                rules: [
                  {
                    message: '请输入组织编号',
                  },
                ],
              })(
                orgtype === '001' ? (
                  <ParkSelect
                    style={{ width: '60%' }}
                    onChange={value => this.onOrgChange(`001-${value}`)}
                  />
                ) : (
                  <EnterpriseSelect
                    style={{ width: '60%' }}
                    onChange={value => this.onOrgChange(`002-${value}`)}
                  />
                )
              )}
            </InputGroup>
          )}
          {allorg &&
            getFieldDecorator('range', {
              initialValue: searchObj.range,
            })(
              <Select onChange={this.onChangeOrgType}>
                <Option value={0}>所有组织</Option>
                <Option value="001">园区</Option>
                <Option value="002">企业</Option>
              </Select>
            )} */}
        </SearchItem>
        <SearchItem label="所有者编号">
          {getFieldDecorator('own', {
            rules: [
              {
                message: '请输入所有者编号',
              },
            ],
          })(<Input placeholder="请输入所有者编号" />)}
        </SearchItem>
        <SearchItem label="状态">
          {getFieldDecorator('status', {
            initialValue: [0],
            rules: [
              {
                required: false,
                message: '选择状态',
              },
            ],
          })(
            <DicSelect
              pcode="cms$#infoGroup"
              vmode="int"
              selectProps={{ mode: 'multiple', placeholder: '请选择' }}
            />
          )}
        </SearchItem>
        <SearchItem label="访问标识">
          {getFieldDecorator('flags', {
            rules: [
              {
                required: false,
                message: '输入访问标识',
              },
            ],
          })(<Input placeholder="请输入访问标识,多个访问标识用空格分割" />)}
        </SearchItem>
      </SearchCard>
    );
  }
}
