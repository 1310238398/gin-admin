import React, { Component } from 'react';
import { Card, Input, Button, Select } from 'antd';
import ItemOption from './ItemOption';
import style from './style.less';

export default class QuestionItem extends Component {
  state = {
    kind: 1,
    title: '',
    options: [],
    answerRequest: '',
  };

  constructor(props) {
    super(props);
    const { kind, title, options, answerRequest, req } = props;
    this.kind = kind;
    this.title = title;
    this.options = options;
    this.answerRequest = answerRequest;
    this.req = req;
    this.state = {
      kind,
      title,
      options,
      req,
      answerRequest,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.kind !== state.kind) {
      state.kind = nextProps.kind;
    }
    if (nextProps.title !== state.title) {
      state.title = nextProps.title;
    }
    if (nextProps.req !== state.req) {
      state.req = nextProps.req;
    }
    if (nextProps.options !== state.options) {
      if (nextProps.options && Array.isArray(nextProps.options) && nextProps.options.length > 0) {
        state.options = nextProps.options;
      } else {
        state.options = [];
      }
    }
    if (nextProps.answerRequest !== state.answerRequest) {
      state.answerRequest = nextProps.answerRequest;
    }
    return state;
  }

  triggerChange = () => {
    const { onChange } = this.props;
    if (!onChange) {
      return;
    }
    const { answerRequest, title, options, kind, req } = this;
    if (kind === 3) {
      const value = { answerRequest, kind: 3, title, req };
      onChange(value);
      return;
    }
    if (kind === 2 || kind === 1) {
      const value = { options, kind, title, req };
      onChange(value);
    }
  };

  onDelete = () => {
    const { onDelete } = this.props;
    if (onDelete) {
      onDelete();
    }
  };

  onChangeOptionType = v => {
    // this.addHandler();
    const { onChange } = this.props;
    this.kind = v;
    if (!onChange) {
      this.setState({ kind: v });
    } else {
      this.triggerChange();
    }
  };

  onChangeReq = v => {
    // this.addHandler();
    const { onChange } = this.props;
    this.req = v;
    if (!onChange) {
      this.setState({ req: v });
    } else {
      this.triggerChange();
    }
  };

  onAddItem = () => {
    this.addHandler();
  };

  onChangeTitle = t => {
    const { onChange } = this.props;
    this.title = t.target.value;
    if (!onChange) {
      this.setState({ title: t.target.value });
    } else {
      this.triggerChange();
    }
  };

  onOptionsChange = value => {
    const { answerRequest, options } = value;
    const { onChange } = this.props;
    if (!onChange) {
      if (options !== undefined) {
        this.options = options;
        this.setState({ options });
      }
      if (answerRequest !== undefined) {
        this.answerRequest = answerRequest;
        this.setState({ answerRequest });
      }
    } else {
      if (options !== undefined) {
        this.options = options;
        this.triggerChange();
      }

      if (answerRequest !== undefined) {
        this.answerRequest = answerRequest;
        this.triggerChange();
      }
    }
  };

  addOptionHandle = handler => {
    this.addHandler = handler;
  };

  render() {
    const { title, kind, options, answerRequest, req } = this.state;
    this.answerRequest = answerRequest;
    this.title = title;
    this.options = options;
    this.kind = kind;
    const { ind } = this.props;
    return (
      <Card
        type="inner"
        className={style.optionArea}
        style={{ height: 'calc(100%)' }}
        bodyStyle={{ height: 'calc(100% - 64px)', overflowY: 'auto' }}
        title={
          <Input.Group compact className={style.question}>
            <span className="ant-btn">{`题${ind}`}</span>
            <Input placeholder="输入题目" value={title} onChange={t => this.onChangeTitle(t)} />
            <Select style={{ width: '80px' }} value={kind} onChange={this.onChangeOptionType}>
              <Select.Option value={1}>单选</Select.Option>
              <Select.Option value={2}>多选</Select.Option>
              <Select.Option value={3}>填写</Select.Option>
            </Select>
            <Select style={{ width: '80px' }} value={req} onChange={this.onChangeReq}>
              <Select.Option value={0}>选填</Select.Option>
              <Select.Option value={1}>必答</Select.Option>
            </Select>
            <Button icon="plus" onClick={this.onAddItem} disabled={this.state.kind === 3} />
            <Button icon="delete" onClick={this.onDelete} />
          </Input.Group>
        }
      >
        <ItemOption
          kind={kind}
          options={options}
          answerRequest={answerRequest}
          addOptionHandle={this.addOptionHandle}
          onChange={this.onOptionsChange}
        />
      </Card>
    );
  }
}
