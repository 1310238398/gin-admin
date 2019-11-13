import React, { PureComponent } from 'react';
import { Tabs, Card, Row, Col, Select } from 'antd';
import moment from 'moment';

import ZSRChart from './ZSRChart';
import GLSRZBChart from './GLSRZBChart';
import GLSRTJChart from './GLSRTJChart';
import WYFQNCard from './WYFQNCard';
import WYFYJFChart from './WYFYJFChart';
import WYFCJTable from './WYFCJTable';
import DFQNCard from './DFQNCard';
import DFYJFChart from './DFYJFChart';
import DFCJTable from './DFCJTable';
import SPFLChart from './SPFLChart';
import SPTOPChart from './SPTOPChart';
import SHFLChart from './SHFLChart';
import SHTOPChart from './SHTOPChart';
import DDFLChart from './DDFLChart';
import YSFLChart from './YSFLChart';

import styles from './index.less';

import getMockData from '@/services/s_mockData';

export default class IncomePreview extends PureComponent {
  state = {
    wy: 'wyf',
    mall: 'sh',
    totalSR: 0,
  };

  componentDidMount() {
    getMockData('b_park_total').then(data => {
      const list = data || [];
      if (list.length > 0) {
        const d = list[0];

        this.setState({ wy: 'wyf', mall: 'sh', totalSR: parseFloat(d.totalSR, 10) });
      }
    });
  }

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

  handleMallItemClick = id => {
    this.setState({ mall: id });
  };

  handleWYItemClick = id => {
    this.setState({ wy: id });
  };

  renderWY = () => {
    const { wy } = this.state;
    switch (wy) {
      case 'wyf':
        return (
          <Row>
            <Col span={6}>
              <Card className="chart" title="全年总额">
                <WYFQNCard />
              </Card>
            </Col>
            <Col span={9}>
              <Card className="chart" title="月缴费情况">
                <WYFYJFChart />
              </Card>
            </Col>
            <Col span={9}>
              <Card className="chart" title="迟缴客户列表">
                <WYFCJTable />
              </Card>
            </Col>
          </Row>
        );
      case 'df':
        return (
          <Row>
            <Col span={6}>
              <Card className="chart" title="电费总额">
                <DFQNCard />
              </Card>
            </Col>
            <Col span={9}>
              <Card className="chart" title="月缴费情况">
                <DFYJFChart />
              </Card>
            </Col>
            <Col span={9}>
              <Card className="chart" title="欠费客户列表">
                <DFCJTable />
              </Card>
            </Col>
          </Row>
        );
      default:
    }
  };

  renderMall = () => {
    const { mall } = this.state;
    switch (mall) {
      case 'sh':
        return (
          <Row>
            <Col span={10}>
              <Card className="chart" title="商户分类占比">
                <SHFLChart />
              </Card>
            </Col>
            <Col span={14}>
              <Card className="chart" title="热门商户">
                <SHTOPChart />
              </Card>
            </Col>
          </Row>
        );
      case 'sp':
        return (
          <Row>
            <Col span={12}>
              <Card className="chart" title="商品分类占比">
                <SPFLChart />
              </Card>
            </Col>
            <Col span={12}>
              <Card className="chart" title="热门商品">
                <SPTOPChart />
              </Card>
            </Col>
          </Row>
        );
      case 'ddfl':
        return (
          <Row>
            <Col span={12}>
              <Card className="chart" title="订单分类构成分析">
                <DDFLChart />
              </Card>
            </Col>
          </Row>
        );
      case 'ysfl':
        return (
          <Row>
            <Col span={12}>
              <Card className="chart" title="全部应收分类构成分析">
                <YSFLChart />
              </Card>
            </Col>
          </Row>
        );
      default:
    }
  };

  render() {
    const { wy, mall, totalSR } = this.state;

    return (
      <Card className="park">
        <Tabs defaultActiveKey="1" style={{ padding: 0 }}>
          <Tabs.TabPane tab="园区经营收入分析" key="1">
            <Row gutter={24}>
              <Col span={7}>
                <Card className="chart" title={`园区经营总收入 ${totalSR}（亿）`}>
                  <Row>
                    <Col style={{ color: '#fff', fontSize: 12, paddingLeft: 13 }}>
                      截止日期：
                      {moment().format('YYYY-MM')}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <ZSRChart />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={7}>
                <Card className="chart" title="各类收入占比" extra={this.getYearSelect()}>
                  <GLSRZBChart />
                </Card>
              </Col>
              <Col span={10}>
                <Card className="chart" title="各类收入统计">
                  <GLSRTJChart />
                </Card>
              </Col>
            </Row>
            <Card
              className="chart"
              title="园区物业收费数据分析"
              extra={
                <ul className={styles.topList}>
                  <li
                    className={wy === 'wyf' ? styles.topItemActive : null}
                    onClick={() => {
                      this.handleWYItemClick('wyf');
                    }}
                  >
                    物业费
                  </li>
                  <li
                    className={wy === 'df' ? styles.topItemActive : null}
                    onClick={() => {
                      this.handleWYItemClick('df');
                    }}
                  >
                    电费
                  </li>
                </ul>
              }
              style={{ marginTop: 20 }}
            >
              {this.renderWY()}
            </Card>
            <Card
              className="chart"
              title="商城经营数据分析（总收入62万元）"
              extra={
                <ul className={styles.topList}>
                  <li
                    className={mall === 'sh' ? styles.topItemActive : null}
                    onClick={() => {
                      this.handleMallItemClick('sh');
                    }}
                  >
                    商户分析
                  </li>
                  <li
                    className={mall === 'sp' ? styles.topItemActive : null}
                    onClick={() => {
                      this.handleMallItemClick('sp');
                    }}
                  >
                    商品分析
                  </li>
                  <li
                    className={mall === 'ddfl' ? styles.topItemActive : null}
                    onClick={() => {
                      this.handleMallItemClick('ddfl');
                    }}
                  >
                    订单分类构成分析
                  </li>
                </ul>
              }
              style={{ marginTop: 20 }}
            >
              {this.renderMall()}
            </Card>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    );
  }
}
