import React, { Component } from 'react';
import { Badge } from 'antd';
import PropTypes from 'prop-types';
import { DicShow } from '../../Dictionary';

export default class InfoStatus extends Component {
  static propTypes = {
    // 指定加载的编码
    code: PropTypes.number.isRequired,
  };

  render() {
    const { code } = this.props;
    const s = ['default', 'processing', 'success', 'warning', 'warning', 'success'];
    let status = 'error';
    if (code >= 0) {
      status = s[code] ? s[code] : status;
    }
    return (
      <DicShow
        pcode="cms$#infos$#status"
        code={[code]}
        show={name => <Badge key={name} status={status} text={name} />}
      />
    );
  }
}
