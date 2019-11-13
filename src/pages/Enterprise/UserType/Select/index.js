import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { queryEnterpriseUserType } from '@/services/enterprise';

export default class UserTypeSelect extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      data: [],
    };
  }

  componentDidMount() {
    const {enterpriseID} = this.props;
    queryEnterpriseUserType({ record_id: enterpriseID }).then(data => {
      this.setState({ data: data.list || [] });
    });
  }

  static getDerivedStateFromProps(nextProps, state) {
    if ('value' in nextProps) {
      return { ...state, value: nextProps.value };
    }
    return state;
  }

  handleChange = value => {
    this.setState({ value });
    this.triggerChange(value);
  };

  triggerChange = data => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(data);
    }
  };

  render() {
    const { value, data } = this.state;

    return (
      <Select
        value={value}
        onChange={this.handleChange}
        placeholder="请选择用户类型"
        style={{ width: '100%' }}
      >
        {data.map(item => (
          <Select.Option key={item.code} value={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    );
  }
}
