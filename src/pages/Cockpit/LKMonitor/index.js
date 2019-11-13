import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import MonitorList from './MonitorList';
import AreaSelect from './AreaSelect';
import RoadSelect from './RoadSelect';
import IntersectionSelect from './IntersectionSelect';

import zhengchang from '@/assets/zhengchang@2x.png';
import guzhang from '@/assets/guzhang@2x.png';

export default class LKMonitor extends PureComponent {
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
    return [
      <Row
        key="top"
        style={{ backgroundColor: '#374148', marginTop: -16, paddingTop: 15, paddingBottom: 15 }}
      >
        <Col span={12} style={{ paddingLeft: 30 }}>
          <AreaSelect code="汉峪金谷" style={{ width: 120 }} />
          <RoadSelect style={{ marginLeft: 15, marginRight: 15, width: 120 }} />
          <IntersectionSelect style={{ width: 120 }} />
        </Col>
        <Col span={12}>
          <Row style={{ width: 260, float: 'right' }}>
            <Col span={8}>{this.renderAction('正常', zhengchang)}</Col>
            <Col span={8}>{this.renderAction('故障', guzhang)}</Col>
          </Row>
        </Col>
      </Row>,
      <div key="list" style={{ marginTop: 16 }}>
        <MonitorList />
      </div>,
    ];
  }
}
