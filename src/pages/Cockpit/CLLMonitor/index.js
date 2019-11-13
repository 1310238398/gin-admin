import React, { PureComponent } from 'react';
import { Tabs, Card, Row, Col } from 'antd';

import zhengchang from '@/assets/zhengchang@2x.png';
import guzhang from '@/assets/guzhang@2x.png';

import TCCChart from './TCCChart';
import DXCWChart from './DXCWChart';
import CLLGCChart from './CLLGCChart';
import CLLFSChart from './CLLFSChart';
import LTCWSRCard from './LTCWSRCard';
import CRKCLLCard from './CRKCLLCard';

import styles from './index.less';
import getMockData from '@/services/s_mockData';

const { TabPane } = Tabs;

export default class CLLMonitor extends PureComponent {
  state = {
    areaData: [{ code: 'A2', status: 1 }, { code: 'A3', status: 1 }],
    areaActive: 'A2',
    shiyongData: [{ used: '0', unused: '0', total: '0' }],
  };

  componentDidMount() {
    getMockData('d_parking_count').then(data => {
      let list = data || [];
      list = list.map(v => {
        return { ...v, count: parseInt(v.count, 10) };
      });
      this.setState({ shiyongData: list });
    });
  }

  handleTopItemClick = id => {
    this.setState({ areaActive: id });
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
    const { areaData, areaActive, shiyongData } = this.state;

    return (
      <Card className="park">
        <Tabs defaultActiveKey="1" style={{ padding: 0 }}>
          <TabPane tab="车流量数据分析" key="1">
            <Row style={{ backgroundColor: '#374148', marginTop: -16 }}>
              <Col span={12}>
                <ul className={styles.topList}>
                  {areaData.map(v => {
                    const cnames = [];
                    if (v.status === 2) {
                      cnames.push(styles.topRItem);
                    }
                    if (v.code === areaActive) {
                      cnames.push(v.status === 1 ? styles.topItemActive : styles.topRItemActive);
                    }
                    return (
                      <li
                        className={cnames}
                        onClick={() => {
                          this.handleTopItemClick(v.code);
                        }}
                      >
                        {v.code}
                      </li>
                    );
                  })}
                </ul>
              </Col>
              <Col span={12}>
                <Row style={{ width: 150, float: 'right' }}>
                  <Col span={12}>{this.renderAction('空闲', zhengchang)}</Col>
                  <Col span={12}>{this.renderAction('拥堵', guzhang)}</Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={19} style={{ marginTop: 16 }}>
              <Col span={7}>
                <Card
                  className="chart"
                  title={`${areaActive}停车场（总数：${shiyongData[0].total}）`}
                  extra={<span style={{ color: '#fff', fontSize: 14 }}>使用率：高</span>}
                >
                  <TCCChart />
                </Card>
              </Col>
              <Col span={7}>
                <Card className="chart" title="车流量构成">
                  <CLLGCChart />
                </Card>
              </Col>
              <Col span={10}>
                <Card className="chart" title="低效车位统计">
                  <DXCWChart />
                </Card>
              </Col>
            </Row>
            <Row gutter={19} style={{ marginTop: 16 }}>
              <Col span={14}>
                <Card className="chart" title="车流量分时统计">
                  <CLLFSChart />
                </Card>
              </Col>
              <Col span={10}>
                <Card className="chart" title="临时车位收入统计">
                  <LTCWSRCard />
                </Card>
              </Col>
            </Row>
            <Card className="chart" title="出入口车流量数据分析" style={{ marginTop: 16 }}>
              <Row gutter={30} style={{ marginTop: 16 }}>
                <CRKCLLCard />
              </Row>
            </Card>
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}
