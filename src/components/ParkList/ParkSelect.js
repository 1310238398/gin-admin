import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { query } from '@/services/parklist';

export default class ParkSelect extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      data: [],
    };
  }

  componentDidMount() {
    query({ q: 'select' }).then(data => {
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
    const { style } = this.props;

    return (
      <Select
        value={value}
        onChange={this.handleChange}
        placeholder="请选择园区"
        style={style || { width: '100%' }}
      >
        {data.map(item => (
          <Select.Option key={item.record_id} value={item.record_id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    );
  }
}
