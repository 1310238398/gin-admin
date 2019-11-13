import React, { PureComponent } from 'react';
import { InputNumber } from 'antd';

export default class AreaInput extends PureComponent {
  static getDerivedStateFromProps(nextProps, state) {
    if ('value' in nextProps) {
      if (state == null || nextProps.value !== state.value) {
        if (nextProps.value === undefined || nextProps.value === null) {
          return {
            ...state,
            value: nextProps.value,
          };
        }
        return {
          ...state,
          value: Number(nextProps.value || 0),
        };
      }
    }
    return state;
  }

  constructor(props) {
    super(props);
    if (props.value !== undefined && props.value !== null) {
      const value = props.value || 0;
      this.state = {
        value,
      };
    } else {
      this.state = {
        value: null,
      };
    }
  }

  onChange = value => {
    if (typeof value === 'string') {
      return;
    }
    if (value === undefined || value === null) {
      this.triggerHandle(value);
      return;
    }
    const v = Number(value || 0);
    this.triggerHandle(v);
  };

  triggerHandle = value => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const { value } = this.state;
    const inputProps = {
      ...this.props,
      value,
      onChange: this.onChange,
      precision: 2,
    };
    return <InputNumber {...inputProps} />;
  }
}
