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
    const ntags = tags.filter(tag => tag.building_id !== removedTag);
    this.setState({ tags: ntags });
    this.triggerChange(ntags);
  };

  triggerChange = data => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(data);
    }
  };

  switchRZ = data => {
    switch (data) {
      case 1:
        return '购买';
      case 2:
        return '租赁';
      case 3:
        return '自用';
      default: 
      return '';
    }
  };

  render() {
    const { tags } = this.state;
    return (
      <div>
        {tags &&
          tags.map(tag => {
            const isLongTag = tag.building_name.length > 100;
            const tagElem = (
              <Tag key={tag.building_id} closable onClose={() => this.handleClose(tag.building_id)}>
                {isLongTag ? `${tag.building_name.slice(0, 100)}...` : tag.building_name}
                {this.switchRZ(tag.incoming_type)}
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag.building_name} key={tag.building_name}>
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
