import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { advertiserPositionSelect } from '../../services/advertPosition';

export default class AdvertiserPositionSelect extends React.Component {
  static propTypes = {
    // 样式对象
    style: PropTypes.object,
    // 事件
    onChange: PropTypes.func,
  };

  static defaultProps = {
    style: {},
    onChange: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      data: [],
    };
  }

  componentDidMount() {
    this.fetch();
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (nextProps.value !== preState.value) {
      return { ...preState, value: nextProps.value };
    }
    return preState;
  }

  fetch = name => {
    advertiserPositionSelect({ name }).then(data => {
      if (data) {
        this.setState({ data: data.list || [] });
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

  render() {
    const { style, disabled } = this.props;
    const { mode } = this.props;
    const { value, data } = this.state;

    return (
      <Select
        mode={mode}
        disabled={disabled}
        allowClear
        showSearch
        value={value}
        placeholder="输入名称(模糊匹配)"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        notFoundContent={null}
        style={style}
      >
        {data.map(v => {
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
