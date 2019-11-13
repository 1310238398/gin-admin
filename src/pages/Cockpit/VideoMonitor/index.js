import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Tabs, Card } from 'antd';

export default class VideoMonitor extends PureComponent {
  getActiveKey() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    const key = pathList[pathList.length - 1];
    if (key === 'dianti' || key === 'lukou' || key === 'shangqu') {
      return key;
    }
    return 'dianti';
  }

  handleTabChange = activeKey => {
    router.push(`/cockpitm/videomonitor/${activeKey}`);
  };

  render() {
    const activeKey = this.getActiveKey();
    const { children } = this.props;

    return (
      <Card className="park">
        <Tabs defaultActiveKey={activeKey} onChange={this.handleTabChange}>
          <Tabs.TabPane tab="电梯监控" key="dianti">
            {children}
          </Tabs.TabPane>
          <Tabs.TabPane tab="路口监控" key="lukou">
            {children}
          </Tabs.TabPane>
          <Tabs.TabPane tab="商区监控" key="shangqu">
            {children}
          </Tabs.TabPane>
        </Tabs>
      </Card>
    );
  }
}
