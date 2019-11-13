import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Tabs, Card } from 'antd';
import PrecisionInvestmentNew from '@/pages/PrecisionInvestment/PrecisionInvestmentNew';
import Process from '@/pages/Cockpit/ZSProcess/Process';
import CompanyEnter from '@/pages/CompanyEnter';

export default class ZSProcess extends PureComponent {
  state = {
    activeKey: 'jingzhun',
  };

  getActiveKey() {
    const { modal } = this.props;
    if (modal === 1) {
      const { activeKey } = this.state;
      return activeKey;
    }
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    const key = pathList[pathList.length - 1];
    if (key === 'jingzhun' || key === 'guocheng' || key === 'ruzhu') {
      return key;
    }
    return 'jingzhun';
  }

  handleTabChange = activeKey => {
    const { modal } = this.props;
    if (modal === 1) {
      this.setState({ activeKey });
      return;
    }
    router.push(`/cockpitm/zsprocess/${activeKey}`);
  };

  renderChildren = activeKey => {
    const { children, modal } = this.props;
    if (activeKey === 'jingzhun') {
      if (modal === 1) {
        return <PrecisionInvestmentNew {...this.props} />;
      }
      return children;
    } else if (activeKey === 'guocheng') {
      if (modal === 1) {
        return <Process {...this.props} />;
      }
      return children;
    } else if (activeKey === 'ruzhu') {
      if (modal === 1) {
        return <CompanyEnter {...this.props} />;
      }
      return children;
    }
    return null;
  };

  render() {
    const activeKey = this.getActiveKey();

    return (
      <Card className="park">
        <Tabs defaultActiveKey={activeKey} onChange={this.handleTabChange}>
          <Tabs.TabPane tab="精准招商" key="jingzhun">
            {this.renderChildren(activeKey)}
          </Tabs.TabPane>
          <Tabs.TabPane tab="招商过程" key="guocheng">
            {this.renderChildren(activeKey)}
          </Tabs.TabPane>
          <Tabs.TabPane tab="企业入驻" key="ruzhu">
            {this.renderChildren(activeKey)}
          </Tabs.TabPane>
        </Tabs>
      </Card>
    );
  }
}
