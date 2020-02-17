import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { advertisCreateGroupSelect } from '../../services/advertisCreativeGroupServices';

export default class AdvertisCreateGroupSelect extends PureComponent {
  static defaultProps = {
    style: {},
    onChange: () => {},
    parentID: '',
  };

  static propTypes = {
    // 样式对象
    style: PropTypes.object,
    // 事件
    onChange: PropTypes.func,
    parentID: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      data: [],
    };
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (nextProps.value !== preState.value) {
      return { ...preState, value: nextProps.value };
    }
    return preState;
  }

  componentDidUpdate(preProps) {
    if (preProps.parentID !== this.props.parentID) {
      this.fetch();
    }
  }

  fetch = name => {
    advertisCreateGroupSelect({ advertiserID: this.props.parentID, name }).then(data => {
      if (data) {
        this.setState({ data: data.list });
      } else {
        this.setState({ data });
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
    const { style, disabled } = this.props;
    const { mode } = this.props;
    return (
      <Select
        mode={mode}
        disabled={disabled}
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
        {this.state.data &&
          this.state.data.map(v => {
            return (
              <Select.Option key={v.record_id} value={v.record_id} data={v}>
                {v.name}
              </Select.Option>
            );
          })}
      </Select>
    );
  }
}
