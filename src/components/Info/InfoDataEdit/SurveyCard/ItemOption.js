import React, { Component } from 'react';
import { Input, Button, List, Radio, Checkbox, Select } from 'antd';
import style from './style.less';

export default class ItemOption extends Component {
  state = {
    options: [{ ind: 1, title: '', write: 0 }],
  };

  options = [{ ind: 1, title: '', write: 0 }];

  constructor(props) {
    super(props);
    if (props.addOptionHandle) {
      props.addOptionHandle(this.onAddOption);
    }
    const { kind, options, answerRequest } = props;
    if (kind === 3) {
      this.state = {
        options,
        answerRequest,
      };
    }
    this.options = options;
    this.answerRequest = answerRequest;
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.options !== state.options) {
      state.options = nextProps.options;
    }
    if (nextProps.answerRequest !== state.answerRequest) {
      state.answerRequest = nextProps.answerRequest;
    }

    return state;
  }

  triggerChange = () => {
    const { options, answerRequest } = this;
    const { kind } = this.props;
    const { onChange } = this.props;
    if (!onChange) {
      return;
    }
    if (kind === 3) {
      const value = { answerRequest };
      onChange(value);
      return;
    }
    if (kind === 2 || kind === 1) {
      const value = { options: [...options] };
      onChange(value);
    }
  };

  onChangeRequire = v => {
    const { onChange } = this.props;
    this.answerRequest = v;
    if (!onChange) {
      this.setState({ answerRequest: v });
    }
    this.triggerChange();
  };

  onAddOption = () => {
    this.options.push({ ind: this.options.length + 1, title: '', write: 0 });
    const { onChange } = this.props;
    if (!onChange) {
      this.setState({ options: [...this.options] });
    } else {
      this.triggerChange();
    }
  };

  onDeleteItem = item => {
    let { options } = this;
    options = options.filter(it => {
      return it.ind !== item.ind;
    });
    this.resetSeq(options);
  };

  onUpItem = item => {
    const { options } = this;

    for (let i = 1; i < options.length; i += 1) {
      if (options[i].ind === item.ind) {
        options[i] = options[i - 1];
        options[i - 1] = item;
      }
    }

    this.resetSeq(options);
  };

  onDownItem = item => {
    const { options } = this;

    for (let i = options.length - 2; i >= 0; i -= 1) {
      if (options[i].ind === item.ind) {
        options[i] = options[i + 1];
        options[i + 1] = item;
      }
    }

    this.resetSeq(options);
  };

  onChgOptionType = (v, item) => {
    item.write = v;
    this.triggerChange();
    this.forceUpdate();
  };

  resetSeq(options) {
    let nextSeq = 1;
    this.options = options.map(it => {
      const ind = nextSeq;
      nextSeq += 1;
      return { ...it, ind };
    });
    const { onChange } = this.props;
    if (!onChange) {
      this.setState({ options: [...this.options] });
    } else {
      this.triggerChange();
    }
  }

  renderOption = item => {
    const { kind } = this.props;
    const RC = kind === 1 ? Radio : Checkbox;
    return (
      <List.Item>
        <Input.Group compact className={style.option}>
          <RC value={item.ind} className={[style.radio, 'ant-btn']} />
          <span className="ant-btn">{item.ind}</span>
          <Input
            placeholder="输入新的选项"
            value={item.title}
            onChange={t => {
              item.title = t.target.value;
              this.triggerChange();
              this.forceUpdate();
            }}
          />
          <Select
            style={{ width: '100px' }}
            value={item.write}
            onChange={v => this.onChgOptionType(v, item)}
          >
            <Select.Option value={0}>仅选择</Select.Option>
            <Select.Option value={1}>可填写</Select.Option>
          </Select>
          <Button
            icon="arrow-up"
            disabled={item.ind === 1}
            onClick={() => {
              this.onUpItem(item);
            }}
          />
          <Button
            icon="arrow-down"
            disabled={item.ind === this.state.options.length}
            onClick={() => {
              this.onDownItem(item);
            }}
          />
          <Button
            icon="delete"
            onClick={() => {
              this.onDeleteItem({ ...item });
            }}
          />
        </Input.Group>
      </List.Item>
    );
  };

  render() {
    const { options, answerRequest } = this.state;
    const { kind } = this.props;
    if (kind === 3) {
      // 问答题
      return (
        <Input.Group compact className={style.fillin}>
          <span className="ant-btn">答题要求：</span>
          <Input
            placeholder="请输入要求，可以不输入"
            value={answerRequest}
            onChange={t => {
              this.onChangeRequire(t.target.value);
            }}
          />
        </Input.Group>
      );
    }
    this.options = options;
    const Group = kind === 1 ? Radio.Group : Checkbox.Group;
    return (
      <Group name="button" style={{ width: '100%' }}>
        <List
          className={style.options}
          dataSource={options}
          renderItem={this.renderOption}
          locale={{ emptyText: '暂无选项' }}
        />
      </Group>
    );
  }
}
