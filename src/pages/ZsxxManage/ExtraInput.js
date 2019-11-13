import React, { PureComponent } from 'react';
import { Form, Input, Alert } from 'antd';
import PicturesWall from '../../components/PicturesWall/PicturesWall';

export default class ExtraInput extends PureComponent {
  getInput = (kind, placeholder, params) => {
    const prop = {};

    if (placeholder) {
      prop.placeholder = placeholder;
    }
    switch (kind) {
      case 'text':
        return this.creText(prop, params);
      case 'int':
        return this.creInt(prop, params);
      case 'file':
        return this.creFile(prop, params);
      default:
        return <Alert message="没有实现改扩展类型" type="error" />;
    }
  };

  creText = (prop, params) => {
    const max = params && params.maxLength ? params.maxLength * 1 : 0;
    if (max) {
      prop.max = max;
    }
    return <Input {...prop} />;
  };

  creInt = (prop, params) => {
    const max = params.maxLength ? params.maxLength * 1 : 0;
    if (max) {
      prop.max = max;
    }
    return <Input {...prop} />;
  };

  creFile = (prop, params) => {
    const nprop = { ...{ bucket: 'cms', name: 'data', num: 9, listType: 'text', ...params } };
    return <PicturesWall {...nprop} />;
  };

  render() {
    const {
      ctrl: { name, code, kind, required, message, rules, placeholder, param_values },
      formItemLayout,
      value,
      form: { getFieldDecorator },
    } = this.props;
    let r = [];
    if (rules) {
      try {
        r = JSON.parse(rules);
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }

    return (
      <Form.Item {...formItemLayout} label={name}>
        {getFieldDecorator(`extras.${code}`, {
          initialValue: value,
          rules: [
            {
              required,
              message,
            },
            ...r,
          ],
        })(this.getInput(kind, placeholder, param_values))}
      </Form.Item>
    );
  }
}
