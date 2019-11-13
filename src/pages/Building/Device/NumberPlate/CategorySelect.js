import React, { PureComponent } from 'react';
import { Cascader } from 'antd';
import * as VideoEquipmentService from '@/services/s_videoEquipment';

const sep = '/';

export default class CategorySelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      options: [],
      children: [],
      items: [],
    };
  }

  componentDidMount() {
    VideoEquipmentService.queryTreeStore({ q: 'tree' }).then(data => {
      const list = data.list || [];
      if (list) {
        this.setState({ options: this.ruleValidate(list) });
      }
    });
  }

  //  循环递归形成列表
  ruleValidate(data) {
    let flag = true;
    var arr = [];
    function judgeChildren(data) {
      data.forEach(e => {
        e.label = e.name;
        e.value = e.name;
        if (!flag) {
          return;
        }
        if (!e.record_id) {
          flag = false;
          return;
        } else if (e.children && e.children.length) {
          judgeChildren(e.children);
        }
      });
    }
    judgeChildren(data);
    return data;
  }

  static getDerivedStateFromProps(nextProps, state) {
    if ('value' in nextProps) {
      return { ...state, value: nextProps.value };
    }
    return state;
  }

  handleChange = (value, item) => {
    this.setState({ value });
    const items = item ? item[item.length - 1] : [];
    const arr = [];
    if (items) {
      if (items.record_id) {
        arr.push({
          record_id: items.record_id,
        });
      }
      if (items.children && items.children.length > 0) {
        const childrenList = this.myFilter(items.children, arr);
        items.children = childrenList;
      }
    }

    this.triggerChange(value, items);
  };

  // 过滤
  myFilter(arr1, arr2) {
    return arr1.filter(ele => arr2.filter(x => x.record_id === ele.parent_id).length > 0);
  }

  triggerChange = (data, item) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(data.join(sep), item);
    }
  };

  render() {
    const { options, value } = this.state;
    return (
      <Cascader
        value={value}
        options={options}
        onChange={this.handleChange}
        changeOnSelect
        placeholder="请选择所属分组"
        style={{ width: '100%' }}
      />
    );
  }
}
