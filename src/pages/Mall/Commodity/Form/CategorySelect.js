import React, { PureComponent } from 'react';
import { Cascader } from 'antd';
import { getProductClass } from '@/services/s_mall';

const sep = '/';

function parseValue(value) {
  return value ? value.split(sep) : [];
}

export default class CategorySelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: parseValue(props.value),
      data: [],
    };
  }

  componentDidMount() {
    getProductClass().then(data => {
      this.setState({ data: this.toTreeSelect(data) });
    });
  }

  static getDerivedStateFromProps(nextProps, state) {
    if ('value' in nextProps) {
      return { ...state, value: parseValue(nextProps.value) };
    }
    return state;
  }

  toTreeSelect = data => {
    if (!data) {
      return [];
    }
    const newData = [];
    for (let i = 0; i < data.length; i += 1) {
      const item = { ...data[i], label: data[i].name, value: data[i].key };
      if (item.children && item.children.length > 0) {
        item.children = this.toTreeSelect(item.children);
      }
      newData.push(item);
    }
    return newData;
  };

  handleChange = value => {
    this.setState({ value });
    this.triggerChange(value);
  };

  triggerChange = data => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(data.join(sep));
    }
  };

  filter = (inputValue, path) => {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  };

  render() {
    const { value, data } = this.state;

    return (
      <Cascader
        value={value}
        options={data}
        onChange={this.handleChange}
        placeholder="请选择商品分类"
        style={{ width: '100%' }}
        showSearch={this.filter}
      />
    );
  }
}
