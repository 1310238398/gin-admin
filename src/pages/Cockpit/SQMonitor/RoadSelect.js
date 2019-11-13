import React, { PureComponent } from 'react';
import { Select } from 'antd';

export default class RoadSelect extends PureComponent {
  state = {
    data: [],
  };

  handleChange = value => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const { data } = this.state;
    const { ...rest } = this.props;

    return (
      <Select
        defaultValue="路"
        notFoundContent="未找到内容"
        className="darkSelect"
        dropdownClassName="darkDropdown"
        onChange={this.handleChange}
        {...rest}
      >
        {data.map(v => {
          return (
            <Select.Option key={v.record_id} value={v.name}>
              {v.name}
            </Select.Option>
          );
        })}
      </Select>
    );
  }
}
