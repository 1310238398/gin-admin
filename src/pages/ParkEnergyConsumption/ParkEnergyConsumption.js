import React, { PureComponent } from 'react';
import { Tabs, Card, Row, Col, Select } from 'antd';
import { connect } from 'dva';
import Chart3 from './Chart3';
import TOPChart from './TOPChart';
import YQNHZBChart from './YQNHZBChart';
import YCBJCard from './YCBJCard';
import YDZSChart from './YDZSChart';

const { TabPane } = Tabs;
@connect(state => ({
  energyConsumption: state.energyConsumption,
}))
export default class ParkEnergyConsumption extends PureComponent {
  getYearSelect = () => {
    const topYearStyle = {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#fff',
      marginRight: 10,
    };

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <span style={topYearStyle}>年份</span>
        <Select className="darkSelect" dropdownClassName="darkDropdown" defaultValue="2019">
          <Select.Option value="2019">2019</Select.Option>
          <Select.Option value="2018">2018</Select.Option>
          <Select.Option value="2017">2017</Select.Option>
        </Select>
      </div>
    );
  };

  render() {
    const all = 5273;
    return (
      <Card className="park">
        <Tabs defaultActiveKey="1">
          <TabPane tab="园区能耗分析" key="1">
            <Row gutter={20}>
              <Col span={14}>
                <Row gutter={20}>
                  <Col span={12}>
                    <Card className="chart" title={`园区用电总数${all}（万度）`}>
                      <YDZSChart />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card className="chart" title="园区能耗占比" extra={this.getYearSelect()}>
                      <YQNHZBChart />
                    </Card>
                  </Col>
                  <Col span={24} style={{ marginTop: 20 }}>
                    <Card className="chart" title="园区能耗详情" extra={this.getYearSelect()}>
                      <Chart3 />
                    </Card>
                  </Col>
                </Row>
              </Col>
              <Col span={10}>
                <Card className="chart" title="企业能耗TOP10" extra={this.getYearSelect()}>
                  <TOPChart />
                </Card>
              </Col>
            </Row>
            <Card className="chart" title="能耗数据异常告警" style={{ marginTop: 16 }}>
              <Row gutter={30} style={{ marginTop: 16 }}>
                <YCBJCard />
              </Row>
            </Card>
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}
