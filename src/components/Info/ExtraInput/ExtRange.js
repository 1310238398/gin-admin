import React, { PureComponent } from 'react';
import { RangeNumber } from '@/components/RangeNumber';

class ExtRange extends PureComponent {
  render() {
    const { onChange, value } = this.props;
    const props = {
      onChange,
      value,
    };

    return <RangeNumber {...props} />;
  }
}

// 扩展类型注册
function ExtRangeInputReg() {
  return { key: 'rangeNumber', render: (prop, params) => <ExtRange {...params} /> };
}
export { ExtRange, ExtRangeInputReg };
