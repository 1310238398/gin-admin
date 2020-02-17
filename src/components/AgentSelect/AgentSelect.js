import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { agentSelect } from '../../services/agentServices';

export default class AgentSelect extends PureComponent {
  static defaultProps = {
    style: {},
    onChange: () => {},
  };

  static propTypes = {
    // 样式对象
    style: PropTypes.object,
    // 事件
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      data: [],
    };
  }

  componentDidMount() {
    this.fetch('');
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (nextProps.value !== preState.value) {
      return { ...preState, value: nextProps.value };
    }
    return preState;
  }

  fetch = name => {
    agentSelect({ name }).then(res => {
      if (res) {
        const data = res.list || [];
        this.setState({ data });
        if (data.length === 1) {
          this.setState({ value: data[0].record_id });
          this.handleChange(data[0].record_id);
        }
      }
    });
  };

  handleSearch = value => {
    this.fetch(value);
  };

  handleChange = value => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  onSelect = (value, option) => {
    if (this.props.callback) {
      this.props.callback(value, 'ok', option);
    }
  };

  render() {
    const { style, mode } = this.props;
    const { data } = this.state;

    return (
      <div>
        <Select
          mode={mode}
          disabled={data.length === 1}
          allowClear
          showSearch
          value={this.state.value}
          placeholder="输入名称(模糊匹配)"
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={this.handleSearch}
          onChange={this.handleChange}
          onSelect={this.onSelect}
          notFoundContent={null}
          style={style}
        >
          {data.map(v => {
            return (
              <Select.Option key={v.record_id} value={v.record_id} data={v}>
                {v.name}
              </Select.Option>
            );
          })}
        </Select>
      </div>
    );
  }
}
