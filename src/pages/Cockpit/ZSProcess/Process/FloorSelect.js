import React, { PureComponent } from 'react';
import { Select } from 'antd';

export default class FloorSelect extends PureComponent {
  state = {
    data: [
      { id: '1', name: '1层' },
      { id: '2', name: '2层' },
      { id: '3', name: '3层' },
      { id: '4', name: '4层' },
      { id: '5', name: '5层' },
      { id: '6', name: '6层' },
      { id: '7', name: '7层' },
      { id: '8', name: '8层' },
    ],
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
        defaultValue="楼层"
        className="darkSelect"
        dropdownClassName="darkDropdown"
        onChange={this.handleChange}
        {...rest}
      >
        {data.map(v => {
          return (
            <Select.Option key={v.id} value={v.id}>
              {v.name}
            </Select.Option>
          );
        })}
      </Select>
    );
  }
}
