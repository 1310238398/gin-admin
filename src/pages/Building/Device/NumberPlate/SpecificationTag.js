import React, { PureComponent } from 'react';

import { Tag, Tooltip } from 'antd';

class SpecificationTag extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tags: props.value ? props.value : [],
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
    const ntags = tags.filter(tag => tag.record_id !== removedTag);
    this.setState({ tags: ntags });
    this.triggerChange(ntags);
  };

  triggerChange = data => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(data);
    }
  };

  render() {
    const { tags } = this.state;
    return (
      <div>
        {tags &&
          tags.length > 0 &&
          tags.map(tag => {
            const isLongTag = tag.name ? tag.name.length > 100 : '';
            const tagElem = (
              <Tag key={tag.record_id} closable onClose={() => this.handleClose(tag.record_id)}>
                {isLongTag ? `${tag.name.slice(0, 100)}...` : tag.name}
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag.name} key={tag.name}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
      </div>
    );
  }
}

export default SpecificationTag;
