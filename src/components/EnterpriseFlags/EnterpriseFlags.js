import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { queryTree } from '../../services/s_dicManage';

function parseValue(value) {
  if (!value) {
    return [];
  }
  return value.map(v => v.code);
}

export default class EnterpriseFlags extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: parseValue(props.value),
      data: [],
    };
  }

  componentDidMount() {
    queryTree({ q: 'tree', parent_code: 'OPER$#corporate_marks', level: 1 }).then(data => {
      this.setState({ data: data.list || [] });
    });
  }

  static getDerivedStateFromProps(nextProps, state) {
    if ('value' in nextProps) {
      return { ...state, value: parseValue(nextProps.value) };
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
      const newData = data.map(v => ({ code: v }));
      onChange(newData);
    }
  };

  render() {
    const { value, data } = this.state;

    return (
      <Select
        mode="tags"
        value={value}
        onChange={this.handleChange}
        placeholder="请选择"
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
