import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { queryPage } from '@/services/enterprise';

export default class EnterpriseSelect extends PureComponent {
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
    this.fetch('');
  }

  fetch = name => {
    queryPage({ q: 'page', status: 1, name }).then(data => {
      const response = data.list || [];
      this.setState({ data: response });
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

  render() {
    const { style, disabled } = this.props;
    const { mode } = this.props;
    return (
      <Select
        mode={mode}
        disabled={disabled}
        allowClear
        showSearch
        value={this.state.value}
        placeholder="输入企业名称(模糊匹配)"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        notFoundContent={null}
        style={style}
      >
        {this.state.data.length > 0 &&
          this.state.data.map(v => {
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
