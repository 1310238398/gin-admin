import React, { PureComponent } from 'react';
import { Cascader, Radio} from 'antd';
import { buildingList } from '@/services/building';

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
    buildingList({ q: 'list' }).then(data => {
      const { list } = data;
      const newData = [];
      for (let i = 0; i < list.length; i += 1) {
        const item = { ...list[i], label: list[i].code, value: list[i].code, isLeaf: false };
        newData.push(item);
      }
      this.setState({ options: newData });
    });
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
    this.triggerChange(value, items);
  };

  triggerChange = (data, item) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(data.join(sep), item);
    }
  };

  getList = value => {
    const childrenList = [];
    buildingList({
      q: 'list',
      parent_id: value,
    }).then(data => {
      const { list } = data;
      for (let i = 0; i < list.length; i += 1) {
        const item = {
          ...list[i],
          label: list[i].name,
          value: list[i].code,
          isLeaf: list[i].btype === 50,
        };
        childrenList.push(item);
      }
      this.setState({ children: childrenList });

      // load options lazily
    });
  };

  loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    this.getList(targetOption.record_id);
    setTimeout(() => {
      targetOption.loading = false;
      const { children, options } = this.state;
      const tarChildren = [];
      for (let j = 0; j < children.length; j += 1) {
        const item = { ...children[j], label: children[j].label, value: children[j].value };
        tarChildren.push(item);
      }
      targetOption.children = tarChildren;
      this.setState({
        options: [...options],
      });
    }, 500);
  };

  render() {
    const { options, value } = this.state;
    return (
      <div style={{width:'300px'}}>
       
        <Cascader
          value={value}
          options={options}
          loadData={this.loadData}
          onChange={this.handleChange}
          changeOnSelect
          placeholder="请选择企业地址"
          style={{ width: '100%' }}
        />
      </div>
    );
  }
}
