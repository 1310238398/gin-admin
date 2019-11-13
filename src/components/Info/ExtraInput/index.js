import React, { PureComponent } from 'react';
import { Input, Alert, InputNumber } from 'antd';
import PicturesWall from '../../PicturesWall/PicturesWall';
import VideoInput from './VideoInput';
import { DicExtraInputReg } from './ExtDic';
import { ExtRangeInputReg } from './ExtRange';
import { FormItem } from '@/components/FormCard';

export default class ExtraInput extends PureComponent {
  constructor(props) {
    super(props);
    this.extras = {};
    this.reg(DicExtraInputReg());
    this.reg(ExtRangeInputReg());
  }

  reg = ({ key, render }) => {
    this.extras[key] = render;
  };

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
      case 'video':
        return this.creVideo(prop, params);
      default:
        if (kind in this.extras) {
          const renderhandler = this.extras[kind];
          if (renderhandler) {
            return renderhandler(prop, params);
          }
        }
        return <Alert message={`没有实现${kind}扩展类型`} type="error" />;
    }
  };

  creText = (prop, params) => {
    const max = params && params.maxLength ? params.maxLength * 1 : 0;
    const iprop = { ...prop };
    if (max) {
      iprop.max = max;
    }
    return <Input {...iprop} />;
  };

  creInt = (prop, params) => {
    const max = params.maxLength ? params.maxLength * 1 : 0;
    const iprop = { ...prop };
    if (max) {
      iprop.max = max;
    }
    return <InputNumber {...iprop} />;
  };

  creFile = (prop, params) => {
    const nprop = {
      ...{ bucket: 'cms', name: 'data', num: 9, listType: 'text', ...params },
    };
    return <PicturesWall {...nprop} />;
  };

  creVideo = (prop, params) => {
    const nprop = { ...params };
    return <VideoInput {...nprop} />;
  };

  render() {
    const {
      ctrl: {
        name,
        code,
        kind,
        required,
        message,
        rules,
        placeholder,
        // eslint-disable-next-line
        param_values,
      },
      formItemLayout,
      value,
      form: { getFieldDecorator },
    } = this.props;
    let r = [];
    if (rules) {
      try {
        r = JSON.parse(rules);
      } catch (e) {
        r = [];
      }
    }

    return (
      <FormItem {...formItemLayout} label={name}>
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
      </FormItem>
    );
  }
}
