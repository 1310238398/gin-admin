import React, { PureComponent } from 'react';

import { Tag, Input, Tooltip, Icon } from 'antd';

class SpecificationTag extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tags: props.value ? props.value : [],
      inputVisible: false,
      inputValue: '',
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    if ('value' in nextProps) {
      return { ...state, tags: nextProps.value };
    }
    return state;
  }

  handleClose = removedTag => {
    const { tags } = this.state;
    const ntags = tags.filter(tag => tag !== removedTag);
    this.setState({ ntags });
    this.triggerChange(ntags);
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
    this.triggerChange(tags);
  };

  saveInputRef = input => {
    this.input = input;
  };

  triggerChange = data => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(data);
    }
  };

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <div>
        {tags.map(tag => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable onClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed', cursor: 'pointer' }}
          >
            <Icon type="plus" /> 添加规格值
          </Tag>
        )}
      </div>
    );
  }
}

export default SpecificationTag;
