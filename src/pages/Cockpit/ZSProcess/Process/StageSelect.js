import React, { PureComponent } from 'react';
import { Select } from 'antd';

export default class StageSelect extends PureComponent {
  state = {
    data: [
      { id: '1', name: '未接触' },
      { id: '2', name: '意向客户' },
      { id: '3', name: '流失客户' },
      { id: '4', name: '潜在客户' },
      { id: '5', name: '成交客户' },
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
        defaultValue="全部"
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
