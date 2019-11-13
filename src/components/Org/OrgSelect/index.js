import React, { PureComponent } from 'react';
import { Input, Select } from 'antd';
import ParkSelect from '../../ParkList/ParkSelect';
import EnterpriseSelect from '../../EnterpriseSelect';

const { Option } = Select;
const InputGroup = Input.Group;
/**
 * 用户模糊匹配AutoComplete，可以匹配电话号码、昵称、姓名，模糊匹配
 * WGH
 */
export default class OrgSelect extends PureComponent {
  constructor(props) {
    super(props);
    const { value } = this.props;
    const allorg = !value;
    const orgtype = value ? value.substring(0, 3) : '';
    this.state = { allorg, orgtype };

    if ('data-__meta' in props) {
      const { initialValue } = props['data-__meta'];
      this.initialValue = initialValue;
    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const { value } = nextProps;
      const allorg = !value;
      if (state.orgtype) {
        return { allorg: false, orgtype: state.orgtype };
      } else if (allorg) {
        return { allorg, orgtype: 0 };
      }

      const orgtype = value ? value.substring(0, 3) : '';
      return { allorg, orgtype };
    }
    return null;
  }

  onChange = org => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(org);
    }
  };

  onChangeOrgType = type => {
    if (type === '') {
      // 所有园区
      this.setState({ orgtype: '', allorg: true });
    } else {
      this.setState({ orgtype: type, allorg: false });
    }
    this.onChange(null);
  };

  /**
   * 渲染
   */
  render() {
    const { orgtype, allorg } = this.state;
    const { value } = this.props;
    let val = this.initialValue;
    if (value !== undefined) {
      val = value;
    }
    if (val) {
      val = val.substring(4);
    }
    if (!allorg) {
      return (
        <InputGroup compact>
          <Select style={{ width: '40%' }} value={orgtype} onChange={this.onChangeOrgType}>
            <Option value="">所有组织</Option>
            <Option value="001">园区</Option>
            <Option value="002">企业</Option>
          </Select>

          {orgtype === '001' && (
            <ParkSelect
              style={{ width: '60%' }}
              value={val}
              onChange={v => {
                if (v) this.onChange(`001-${v}`);
                else this.onChange(null);
              }}
            />
          )}
          {orgtype === '002' && (
            <EnterpriseSelect
              style={{ width: '60%' }}
              value={val}
              onChange={v => {
                if (v) this.onChange(`002-${v}`);
                else this.onChange(null);
              }}
            />
          )}
        </InputGroup>
      );
    }
    return (
      <Select onChange={this.onChangeOrgType} value={orgtype}>
        <Option value={0}>所有组织</Option>
        <Option value="001">园区</Option>
        <Option value="002">企业</Option>
      </Select>
    );
  }
}
