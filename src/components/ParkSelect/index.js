import React, { PureComponent } from 'react';
import { Select } from 'antd';

import parks from '../../services/s_parksManage';

export default class ParkSelect extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      data: [],
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      if (state.value !== nextProps.value) {
        return { ...state, value: nextProps.value };
      }
    }
    return state;
  }

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    parks.getParks().then(data => {
      this.setState({ data });
    });
  };

  handleChange = value => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const { style } = this.props;
    return (
      <Select
        allowClear
        showSearch
        value={this.state.value}
        placeholder="输入园区名称(模糊匹配)"
        optionFilterProp="name"
        onChange={this.handleChange}
        style={style}
      >
        {this.state.data.map(v => {
          return (
            <Select.Option key={v.record_id} value={v.record_id}>
              {v.name}
            </Select.Option>
          );
        })}
      </Select>
    );
  }
}
