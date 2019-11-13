import React, { PureComponent } from 'react';
import { Tabs, Card, Row, Col } from 'antd';
import router from 'umi/router';
import MonthChart from './MonthChart';
import DayChart from './DayChart';
import MemberTable from './MemberTable';
import ElevatorList from './ElevatorList';

import zhengchang from '@/assets/zhengchang@2x.png';
import guzhang from '@/assets/guzhang@2x.png';
import tongxun from '@/assets/tongxun@2x.png';

const { TabPane } = Tabs;

export default class ElevatorMonitor extends PureComponent {
  handleTabChange = key => {
    switch (key) {
      case '1':
        router.push(`/park/elevatorMonitor/1`);
        break;
      case '2':
        router.push(`/park/elevatorMonitor/2`);
        break;
      default:
        break;
    }
  };

  renderAction = (text, img) => {
    return (
      <Row gutter={6} align="middle">
        <Col span={12} style={{ color: '#A6B9C8', textAlign: 'right', marginTop: 2 }}>
          {text}
        </Col>
        <Col span={12}>
          <img src={img} alt="" style={{ maxWidth: 22, maxHeight: 22 }} />
        </Col>
      </Row>
    );
  };

  render() {
    const {
      match: { params },
    } = this.props;

    return (
      <Card className="park">
        <Tabs
          defaultActiveKey={params.key ? params.key : '1'}
          onChange={this.handleTabChange}
          style={{ padding: 0 }}
        >
          <TabPane tab="门禁使用情况总览" key="1">
            <Row gutter={24}>
              <Col span={12}>
                <Card className="chart" title="门禁使用用户统计" style={{ marginBottom: 16 }}>
                  <MonthChart />
                </Card>
                <Card className="chart" title="逐时人流统计">
                  <DayChart />
                </Card>
              </Col>
              <Col span={12}>
                <Card className="chart" title="实时人流量监控">
                  <MemberTable />
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="梯控监控" key="2">
            <Row style={{ backgroundColor: '#374148', height: 40, marginTop: -16 }}>
              <Col span={12} />
              <Col span={12}>
                <Row style={{ width: 260, float: 'right' }}>
                  <Col span={8}>{this.renderAction('正常', zhengchang)}</Col>
                  <Col span={8}>{this.renderAction('通讯', tongxun)}</Col>
                  <Col span={8}>{this.renderAction('故障', guzhang)}</Col>
                </Row>
              </Col>
            </Row>
            <div style={{ marginTop: 16 }}>
              <ElevatorList />
            </div>
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}
