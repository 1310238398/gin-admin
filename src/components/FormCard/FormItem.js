import React, { PureComponent } from 'react';
import { Form } from 'antd';
import style from './FormCard.less';

export default class FormItem extends PureComponent {
  static formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  static oneCol = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      md: { span: 4 },
      lg: { span: 3 },
      xxl: { span: 2 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
      md: { span: 20 },
      lg: { span: 21 },
      xxl: { span: 22 },
    },
  };

  static twoCol = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      md: { span: 8 },
      lg: { span: 6 },
      xl: { span: 6 },
      xxl: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
      md: { span: 16 },
      lg: { span: 18 },
      xl: { span: 18 },
      xxl: { span: 20 },
    },
  };

  render() {
    const { col } = this.props;
    let formItemLayout = { ...FormItem.formItemLayout };
    if (col === 1) {
      formItemLayout = { ...FormItem.oneCol };
    } else if (col === 2) {
      formItemLayout = { ...FormItem.twoCol };
    }
    formItemLayout = {
      ...formItemLayout,
      ...this.props,
    };
    delete formItemLayout.col;
    const getFitemProps = label => {
      return {
        key: `formkey_${label}`,
        ...formItemLayout,
        label,
      };
    };
    const p = getFitemProps(this.props.label);
    const fp = { ...this.props, ...p };
    return (
      <Form.Item className={style.item} {...fp}>
        {this.props.children}
      </Form.Item>
    );
  }
}
