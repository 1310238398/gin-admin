import React, { PureComponent } from 'react';
import { Divider } from 'antd';

export default class FormDivider extends PureComponent {
  render() {
    return <Divider {...this.props} />;
  }
}
