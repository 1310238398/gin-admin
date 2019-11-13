import React, { PureComponent } from 'react';
import { DicSelect } from '@/components/Dictionary';

class ExtDic extends PureComponent {
  render() {
    const { dicode, valuetyp, codes, onChange, value } = this.props;
    const props = {
      pcode: dicode,
      vmode: valuetyp,
      onChange,
      value,
    };
    if (codes) {
      const cs = codes.split(/\s+/);
      props.code = cs;
    }

    return <DicSelect {...props} />;
  }
}

// 扩展类型注册
function DicExtraInputReg() {
  return { key: 'dictionary', render: (prop, params) => <ExtDic {...params} /> };
}
export { ExtDic, DicExtraInputReg };
