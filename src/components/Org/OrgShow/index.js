import React, { PureComponent } from 'react';
import ParkShow from '../../ParkShow';
import EnterpriseShow from '../../EnterpriseShow';

/**
 * 用户模糊匹配AutoComplete，可以匹配电话号码、昵称、姓名，模糊匹配
 * WGH
 */
export default class OrgShow extends PureComponent {
  /**
   * 渲染
   */
  render() {
    const { value } = this.props;
    const orgtype = value ? value.substring(0, 3) : '';
    const org = value ? value.substring(4) : '';
    if (orgtype === '001') {
      return <ParkShow value={org} />;
    } else if (orgtype === '002') {
      return <EnterpriseShow value={org} />;
    }
    return '';
  }
}
