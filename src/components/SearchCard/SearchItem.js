import React, { PureComponent } from 'react';
import { Form } from 'antd';

export default class SearchItem extends PureComponent {
  static formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

  render() {
    const formItemLayout = {
      ...SearchItem.formItemLayout,
      ...(this.props.formItemLayout || {}),
    };
    const getFitemProps = label => {
      return {
        key: `formkey_${label}`,
        ...formItemLayout,
        label,
      };
    };
    const p = getFitemProps(this.props.label);
    const fp = { ...this.props, ...p };
    return <Form.Item {...fp}>{this.props.children}</Form.Item>;
  }
}
