import React, { PureComponent } from 'react';
import { Select } from 'antd';
import statisticsHuman from '@/services/s_statisticsHuman';

export default class AreaSelect extends PureComponent {
  state = {
    data: [],
  };

  componentDidMount() {
    const { code } = this.props;
    if (!code || code === '') {
      return;
    }
    statisticsHuman.getParks({ code }).then(data => {
      this.setState({ data });
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
        defaultValue="区域"
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
