import React, { PureComponent } from 'react';
import { Input, InputNumber } from 'antd';
import style from './RangeNumber.less';

export default class RangeNumber extends PureComponent {
  state = {
    min: undefined,
    max: undefined,
    error: false,
  };

  constructor(props) {
    super(props);
    const { value } = props;
    if (value && (value.max !== undefined || value.min !== undefined)) {
      const { min, max } = value;
      this.state = {
        min,
        max,
      };
    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.value) {
      const { value } = nextProps;
      if (value && (value.max !== undefined || value.min !== undefined)) {
        const { min, max } = value;
        if (min !== state.min || max !== state.max) {
          return { ...state, min, max };
        }
      }
    }
    return null;
  }

  onChangeMin = v => {
    const { onChange, value } = this.props;
    if (this.state.max !== undefined) {
      if (v > this.state.max) {
        this.setState({ error: '最小值大于最大值，修改错误' });
        return;
      }
    }
    if (onChange) {
      this.triggerChange({ min: v, max: value && value.max ? value.max : null });
    } else {
      this.setState({ min: v, error: false }, () => {
        this.triggerChange({ min: v, max: value && value.max ? value.max : null });
      });
    }

    this.setState({ min: v, error: false });
  };

  onChangeMax = v => {
    const { onChange, value } = this.props;
    if (this.state.min !== undefined) {
      if (v < this.state.min) {
        this.setState({ error: '最大值小于最小值，修改错误' });
        return;
      }
    }
    if (onChange) {
      this.triggerChange({ max: v, min: value && value.min ? value.min : null });
    } else {
      this.setState({ max: v, error: false }, () => {
        this.triggerChange({ max: v, min: value && value.min ? value.min : null });
      });
    }
  };

  triggerChange = value => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const { min, max, error } = this.state;
    const gprop = {
      compact: true,
    };
    if (error) {
      gprop.className = style.error;
    }
    return (
      <Input.Group {...gprop}>
        <InputNumber
          style={{ width: 'calc(50% - 15px )', textAlign: 'center' }}
          placeholder="最小"
          value={min}
          onChange={e => {
            this.onChangeMin(e);
          }}
        />
        <Input
          style={{
            padding: 0,
            width: 20,
            borderLeft: 0,
            pointerEvents: 'none',
            backgroundColor: '#fff',
          }}
          placeholder="~"
          disabled
        />
        <InputNumber
          style={{ width: 'calc(50% - 15px )', textAlign: 'center', borderLeft: 0 }}
          value={max}
          placeholder="最大"
          onChange={e => {
            this.onChangeMax(e);
          }}
        />
      </Input.Group>
    );
  }
}
