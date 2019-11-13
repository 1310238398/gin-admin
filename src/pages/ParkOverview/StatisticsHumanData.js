import React, { PureComponent } from 'react';
import { Tabs, Card, Row, Col, Dropdown, Button, Icon, Input, Select } from 'antd';
import { connect } from 'dva';
import MonthChartOne from './MontnChartOne';
import DayChart from './DayChart';
import MemberTable from './MemberTable';
import style from './ElevatorMonitor.less';
import getMockData from '@/services/s_mockData';

const { TabPane } = Tabs;
const { Option } = Select;
@connect(state => ({
  statisticsHuman: state.statisticsHuman,
}))
export default class StatisticsHumanData extends PureComponent {
  state = {
    typeText: '企业员工',
    AleretData: [],
  };

  componentDidMount() {
    getMockData('e_enter_unusual_notice').then(data => {
      const list = data || [];
      if (list.length > 0) {
        this.setState({ AleretData: list });
      }
    });
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'statisticsHuman/getParks',
      code: '汉峪金谷',
    });
  }

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

  handleChange = value => {
    this.setState({
      typeText: value,
    });
  };

  onChangClick = value => {
    this.props.dispatch({
      type: 'statisticsHuman/getParkloudong',
      code: value,
    });
  };

  exportContent = () => {
    return [
      <Input placeholder="请输入用户名" />,
      <Select
        labelInValue
        defaultValue={{ key: '企业员工' }}
        style={{ width: 120 }}
        onChange={this.handleChange}
      >
        <Option value="企业员工">企业员工</Option>
        <Option value="访客">访客</Option>
        <Option value="物业人员">物业人员</Option>
      </Select>,
    ];
  };

  render() {
    const {
      statisticsHuman: { parkNode, parkNodeloudong },
    } = this.props;
    const { AleretData } = this.state;
    return (
      <Card className="park">
        <Tabs defaultActiveKey="1" style={{ padding: 0 }}>
          <TabPane tab="人流量统计" key="1">
            <div
              className={style.dropArea}
              style={{
                // float: 'left',
                backgroundColor: '#374148',
                width: '100%',
                height: '44px',
                marginBottom: '10px',
                lineHeight: '44px',
              }}
            >
              <Row gutter={8}>
                <Col span={1}>
                  <span style={{ color: '#FFFFFF' }}>区域：</span>
                </Col>
                <Col span={2}>
                  <Select
                    style={{ width: '100%' }}
                    notFoundContent="请先选择上级选项"
                    placeholder="请选择"
                    onChange={this.onChangClick}
                    defaultValue="全部"
                    className="darkSelect"
                    dropdownClassName="darkDropdown"
                  >
                    {parkNode &&
                      parkNode.map(item => {
                        return (
                          <Select.Option key={item.id} value={item.name}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Col>
                <Col span={1}>
                  <span style={{ color: '#FFFFFF' }}>楼栋：</span>
                </Col>
                <Col span={2}>
                  <Select
                    style={{ width: '100%' }}
                    notFoundContent="请先选择上级选项"
                    placeholder="请选择"
                    className="darkSelect"
                    dropdownClassName="darkDropdown"
                    defaultValue="全部"
                  >
                    {parkNodeloudong &&
                      parkNodeloudong.map(item => {
                        return (
                          <Select.Option key={item.id} value={item.name}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Col>
              </Row>
            </div>
            <Row gutter={24}>
              <Col span={12}>
                <Card className="chart" title="门禁使用用户统计" style={{ marginBottom: 16 }}>
                  <MonthChartOne />
                </Card>
                <Card className="chart" title="分时人流量统计">
                  <DayChart />
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  className="chart"
                  title="实时人流量监控"
                  extra={
                    <Row gutter={24}>
                      <Col span={8}>
                        <span>
                          <input
                            type="text"
                            placeholder="请输入用户名"
                            className={style.inputName}
                          />
                        </span>
                      </Col>
                      <Col span={8}>
                        <Select
                          labelInValue
                          defaultValue={{ key: '企业员工' }}
                          style={{ width: 120 }}
                          onChange={this.handleChange}
                          className="darkSelect"
                          dropdownClassName="darkDropdown"
                        >
                          <Option value="企业员工">企业员工</Option>
                          <Option value="访客">访客</Option>
                          <Option value="物业人员">物业人员</Option>
                        </Select>
                      </Col>
                      <Col span={8} style={{ paddingTop: '2px' }}>
                        <span className={style.SearhBtn}>查询</span>
                      </Col>
                    </Row>
                  }
                >
                  <MemberTable />
                </Card>
              </Col>
            </Row>
            <Row gutter={24} style={{ marginTop: '10px' }}>
              <Col span={24}>
                <Card className="chart" title="门禁异常情况警告">
                  {AleretData &&
                    AleretData.map(item => {
                      return (
                        <Col span={8}>
                          <div className={style.btomAlter}>
                            <Row gutter={24}>
                              <Col span={18}>
                                <span className={style.Cilcle} />
                                <span>
                                  编号：
                                  {item.number}
                                </span>
                              </Col>
                              <Col span={6} style={{ color: '#DE4D58' }}>
                                异常
                              </Col>
                            </Row>
                            <Row gutter={24}>
                              <Col span={24}>
                                <div style={{ color: '#fff' }}>
                                  区域：
                                  {item.quyu} 楼栋：
                                  {item.loudong}
                                </div>
                              </Col>
                            </Row>
                            <Row gutter={24}>
                              <Col span={24}>
                                <div style={{ color: '#fff' }}>
                                  门禁日均使用次数：
                                  <span style={{ color: '#FFC400' }}>{item.personCount}</span>
                                </div>
                              </Col>
                            </Row>
                            <Row gutter={24}>
                              <Col span={24}>
                                <div style={{ color: '#fff' }}>
                                  当日累计使用次数：{' '}
                                  <span style={{ color: '#DE4D58' }}>{item.dayCount}</span>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      );
                    })}
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}
