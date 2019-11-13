import React, { PureComponent } from 'react';
import { Select } from 'antd';
import statisticsHuman from '@/services/s_statisticsHuman';

export default class AreaSelect extends PureComponent {
  state = {
    data: [],
  };

  componentWillReceiveProps(nextProps) {
    const { code } = nextProps;
    if (!code || code === '') {
      return;
    }
    statisticsHuman.getParks({ code }).then(data => {
      let list = data;
      if (!Array.isArray(data)) {
        list = [];
      }
      this.setState({ data: list });
    });
  }

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
        defaultValue="楼栋"
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
