import React from 'react';
import { Tabs, Card, Dropdown, Button, Icon, Menu, Row, Col, Progress, Select, Form } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import lianhe from '../../assets/lianhe.png';
import hualian from '../../assets/hualian.png';
import shengchan from '../../assets/shengchan.png';
import ListCompanies from './PeeT';
import RiskColumnarBing from './RiskColumnarBing';
import ShouYi from './ShouYi';
import EnterpriseTax from './EnterpriseTax';
import BusinessIncome from './BusinessIncome';
import RiskColumnar from './RiskColumnar';
import LegalAction from './LegalAction';
import KnowledgeLitigation from './KnowledgeLitigation';
import NoticeHear from './NoticeHear';
import NewsType from './NewsType';
import LeglaInfo from './LeglaInfo';
import IndustrialCommercialChange from './IndustrialCommercialChange';
import ActionInfo from './ActionInfo';
import KnowledgeInfo from './KnowledgeInfo';
import GLChart from './GLChart';
import EnpriseInfoName from './EnpriseInfoName';
import style from './PrecisionInvestment.less';

const { TabPane } = Tabs;
class EnterpriseInfoDetail extends React.Component {
  state = {
    gongshangbiangeng: {
      visible: false,
      data: null,
    },
    actionInfo: {
      visible: false,
      data: null,
    },
    legalInfo: {
      visible: false,
      data: null,
    },
    knowlegeInfo: {
      visible: false,
      data: null,
    },
    randData99: {},
    randData10: {},
  };

  componentDidMount() {
    this.setState({
      randData99: this.generate99(),
      randData10: this.generate10(),
    });
  }

  componentWillReceiveProps(props) {
    if ('companyInfo' in props && 'isState' in props && props.isState === true) {
      this.setState({
        randData99: this.generate99(),
        randData10: this.generate10(),
      });
    }
  }

  generate99 = () => {
    const item = {};
    for (let i = 0; i < 20; i += 1) {
      item[`v${i}`] = Math.floor(Math.random() * 99 + 1);
    }
    return item;
  };

  generate10 = () => {
    const item = {};
    for (let i = 0; i <= 20; i += 1) {
      item[`v${i}`] = Math.floor(Math.random() * 10 + 1);
    }
    return item;
  };

  handleCancel = () => {
    const { onshowLegalInfoCloseCallback } = this.props;
    onshowLegalInfoCloseCallback();
  };

  gongshangbiangeng = () => {
    this.setState({
      gongshangbiangeng: {
        visible: true,
        data: null,
      },
    });
  };

  closegongShangSubFrame = () => {
    this.setState({
      gongshangbiangeng: {
        visible: false,
        data: null,
      },
    });
  };

  showLegalInfo = rec => {
    this.setState({
      legalInfo: {
        visible: true,
        data: rec,
      },
    });
  };

  closeSubFrame = () => {
    this.setState({
      legalInfo: {
        visible: false,
        data: null,
      },
    });
  };

  showActioninfo = rec => {
    this.setState({
      actionInfo: {
        visible: true,
        data: rec,
      },
    });
  };

  showKnowledgeInfo = rec => {
    this.setState({
      knowlegeInfo: {
        visible: true,
        data: rec,
      },
    });
  };

  closeKnowledgeSubFrame = () => {
    this.setState({
      knowlegeInfo: {
        visible: false,
        data: null,
      },
    });
  };

  closefalvSubFrame = () => {
    this.setState({
      actionInfo: {
        visible: false,
        data: null,
      },
    });
  };

  CompanRow = (text, value) => {
    return [
      <span
        style={{
          color: '#EAB607',
          fontSize: '14px',
          marginRight: 5,
          whiteSpace: 'nowrap',
        }}
      >
        {text}:
      </span>,
      <span style={{ color: '#fff' }}>{value}</span>,
    ];
  };

  CompanRowContent = (text, value) => {
    return [
      <span
        style={{
          color: '#EAB607',
          fontSize: '14px',
          marginRight: 5,
          whiteSpace: 'nowrap',
          borderBottom: '1px solid #EAB607',
          // paddingbottom: '8px',
        }}
      >
        {text}:
      </span>,
      <span style={{ color: '#fff' }}>{value}</span>,
    ];
  };

  CompanNewRow = (titel, value) => {
    return [
      <div
        style={{
          color: '#fff',
          fontSize: '14px',
          paddingLeft: '10px',
          paddingTop: '10px',
        }}
      >
        {titel}
      </div>,
      <div
        style={{
          color: '#828282',
          fontSize: '12px',
          paddingLeft: '10px',
          paddingTop: '7px',
          paddingBottom: '10px',
        }}
      >
        {value}
      </div>,
    ];
  };

  render() {
    const { companyInfo, showName } = this.props;

    const { randData10, randData99 } = this.state;

    return (
      <Row gutter={24}>
        <Col span={24}>
          {showName && <EnpriseInfoName companyInfo={companyInfo} />}
          <Card className="chart">
            <div style={{ backgroundColor: '#2A3136', padding: '16px 20px 15px 20px' }}>
              <Row gutter={24}>
                <Col span={6} onClick={this.gongshangbiangeng}>
                  {this.CompanRowContent('工商变更', '9')}
                </Col>
                <Col span={6}>{this.CompanRow('开庭公告', randData10.v1)}</Col>
                <Col span={6}>{this.CompanRow('司法拍卖', randData10.v2)}</Col>
                <Col span={6}>{this.CompanRow('工商信息', randData10.v3)}</Col>
              </Row>
              <Row gutter={24}>
                <Col span={6}>{this.CompanRow('股东信息', randData10.v4)}</Col>
                <Col span={6}>{this.CompanRow('法律诉讼', randData10.v5)}</Col>
                <Col span={6}>{this.CompanRow('企业业务', randData10.v6)}</Col>
                <Col span={6}>{this.CompanRow('对外投资', randData10.v7)}</Col>
              </Row>
              <Row gutter={24}>
                <Col span={6}>{this.CompanRow('变更记录', randData10.v8)}</Col>
                <Col span={6}>{this.CompanRow('历史失信信息', randData10.v10)}</Col>
                <Col span={6}>{this.CompanRow('行政许可', randData10.v11)}</Col>
                <Col span={6}>{this.CompanRow('软件著作权', randData10.v12)}</Col>
              </Row>
              <Row gutter={24}>
                <Col span={6}>{this.CompanRow('企业年报', randData10.v13)}</Col>
                <Col span={6}>{this.CompanRow('经营异常', randData10.v14)}</Col>
                <Col span={6}>{this.CompanRow('商标信息', randData10.v15)}</Col>
                <Col span={6}>{this.CompanRow('商标信息', randData10.v16)}</Col>
              </Row>
            </div>
          </Card>
        </Col>
        <Col span={24}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="概览" key="1">
              <div
                className={style.dropArea}
                style={{
                  float: 'left',
                  backgroundColor: '#2A3136',
                  // width: '590px',
                  // height: '510px',
                  margin: '0px 21px 20px 0px',
                  // border: '1px dashed #fff',
                }}
              >
                <Col span={8} style={{ borderRight: '1px solid', paddingLeft: '0px' }}>
                  <div style={{ paddingTop: '21px', paddingLeft: '13px' }}>
                    <p>
                      <span style={{ color: '#FFC400', border: '2px solid #FFC400' }} />
                      <span
                        style={{
                          color: '#FFC400',
                          fontSize: '14px',
                          marginLeft: '5px',
                        }}
                      >
                        基本信息
                      </span>
                    </p>
                    <Row
                      gutter={24}
                      style={{ color: '#ffffff', fontSize: '12px', lineHeight: '26px' }}
                    >
                      <Col span={24}>
                        电话：
                        {companyInfo.tel}
                      </Col>
                      <Col span={24}>
                        邮箱：
                        {companyInfo.email}
                      </Col>
                      <Col span={24}>
                        网址：
                        {companyInfo.eWedSite}
                      </Col>
                      <Col>
                        地址：
                        {companyInfo.address}
                      </Col>
                    </Row>
                  </div>

                  <div style={{ paddingTop: '21px', paddingLeft: '13px' }}>
                    <p>
                      <span style={{ color: '#FFC400', border: '2px solid #FFC400' }} />
                      <span
                        style={{
                          color: '#FFC400',
                          fontSize: '14px',
                          marginLeft: '5px',
                        }}
                      >
                        股东信息
                      </span>
                    </p>
                    <Row
                      gutter={24}
                      style={{ color: '#ffffff', fontSize: '12px', lineHeight: '26px' }}
                    >
                      <Col span={24} style={{ marginBottom: '10px' }}>
                        <Row gutter={24}>
                          <span style={{ paddingLeft: '12px', paddingRight: '6px' }}>
                            <img src={lianhe} alt="" />
                          </span>
                          <span style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                            {companyInfo.isRear
                              ? '北京汉宇投资有限公司'
                              : '达孜德善企业管理合伙企业'}
                          </span>
                        </Row>
                      </Col>
                      <Col span={24} style={{ marginBottom: '10px' }}>
                        <Row gutter={24}>
                          <span style={{ paddingLeft: '12px', paddingRight: '6px' }}>
                            <img src={hualian} alt="" />
                          </span>
                          <span style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                            {companyInfo.isRear
                              ? '拓尔思信息技术股份有限公司'
                              : '厦门金海峡投资有限公司'}
                          </span>
                        </Row>
                      </Col>
                      <Col span={24}>
                        <Row gutter={24}>
                          <span style={{ paddingLeft: '12px', paddingRight: '6px' }}>
                            <img src={shengchan} alt="" />
                          </span>
                          <span style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                            {companyInfo.isRear
                              ? '拓尔思信息技术股份有限公司'
                              : '联想控股股份有限公司'}
                          </span>
                        </Row>
                      </Col>
                    </Row>
                  </div>

                  <div style={{ paddingTop: '21px', paddingLeft: '13px' }}>
                    <p>
                      <span style={{ color: '#FFC400', border: '2px solid #FFC400' }} />
                      <span
                        style={{
                          color: '#FFC400',
                          fontSize: '14px',
                          marginLeft: '5px',
                        }}
                      >
                        公司规模
                      </span>
                    </p>
                    <Row
                      gutter={24}
                      style={{ color: '#ffffff', fontSize: '12px', lineHeight: '26px' }}
                    >
                      <Col span={24}>
                        人数：
                        {companyInfo.renshu}
                      </Col>
                      <Col span={24} style={{ paddingRight: '0px' }}>
                        类型：
                        {companyInfo.comPanyty}
                      </Col>
                      <Col span={24}>
                        行业：
                        {companyInfo.hangye}
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col span={8} style={{ borderRight: '1px solid', paddingLeft: '0px' }}>
                  <div style={{ paddingTop: '21px', paddingLeft: '13px' }}>
                    <p>
                      <span style={{ color: '#FFC400', border: '2px solid #FFC400' }} />
                      <span
                        style={{
                          color: '#FFC400',
                          fontSize: '14px',
                          marginLeft: '5px',
                        }}
                      >
                        风险检查
                      </span>
                    </p>
                    <Row
                      gutter={24}
                      style={{ color: '#ffffff', fontSize: '12px', lineHeight: '26px' }}
                    >
                      <Col span={24}>
                        <Row gutter={20}>
                          <Col span={12}>
                            <div
                              style={{
                                backgroundColor: '#1F2123',
                                textAlign: 'center',
                                // width: '82px',
                                // height: '62px',
                              }}
                            >
                              <div style={{ color: '#fff' }}>{randData10.v17}</div>
                              <div style={{ color: '#EAB607' }}>工商检查</div>
                            </div>
                          </Col>
                          <Col span={12}>
                            <div
                              style={{
                                backgroundColor: '#1F2123',
                                textAlign: 'center',
                                // width: '82px',
                                // height: '62px',
                                marginBottom: '5px',
                              }}
                            >
                              <div style={{ color: '#fff' }}>{randData10.v18}</div>
                              <div style={{ color: '#EAB607' }}>资产检查</div>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24}>
                        <Row gutter={20}>
                          <Col span={12}>
                            <div
                              style={{
                                backgroundColor: '#1F2123',
                                textAlign: 'center',
                                // width: '82px',
                                // height: '62px',
                              }}
                            >
                              <div style={{ color: '#fff' }}>{randData10.v19}</div>
                              <div style={{ color: '#EAB607' }}>税务检查</div>
                            </div>
                          </Col>
                          <Col span={12}>
                            <div
                              style={{
                                backgroundColor: '#1F2123',
                                textAlign: 'center',
                                // width: '82px',
                                // height: '62px',
                              }}
                            >
                              <div style={{ color: '#fff' }}>{randData10.v20}</div>
                              <div style={{ color: '#EAB607' }}>涉诉检查</div>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>

                  <div style={{ paddingTop: '21px', paddingLeft: '13px' }}>
                    <p>
                      <span style={{ color: '#FFC400', border: '2px solid #FFC400' }} />
                      <span
                        style={{
                          color: '#FFC400',
                          fontSize: '14px',
                          marginLeft: '5px',
                        }}
                      >
                        涉诉
                      </span>
                    </p>
                    <Row
                      gutter={24}
                      style={{ color: '#ffffff', fontSize: '12px', lineHeight: '26px' }}
                    >
                      <Col span={24}>
                        <Row gutter={20}>
                          <Col span={12}>
                            <div
                              style={{
                                backgroundColor: '#1F2123',
                                textAlign: 'center',
                                // width: '82px',
                                // height: '62px',
                              }}
                            >
                              <div style={{ color: '#fff' }}>{randData10.v21}</div>
                              <div style={{ color: '#EAB607' }}>开庭公告</div>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Card className="chart" style={{ backgroundColor: '#2A3136' }}>
                          {/* <DisputeStatistics /> */}
                          <Progress
                            percent={87}
                            showInfo={false}
                            strokeWidth={13}
                            strokeColor="#4880FF"
                            trailColor="#2A3136"
                            className={style.testp}
                          />
                          <p style={{ color: '#D0E3F1', fontSize: '12px' }}>
                            机动车交通事故纠纷（985）
                          </p>
                          <Progress
                            percent={randData99.v1}
                            showInfo={false}
                            strokeWidth={13}
                            strokeColor="#4880FF"
                            trailColor="#2A3136"
                            style={{ borderRadius: '2px' }}
                            className={style.testp}
                          />
                          <p style={{ color: '#D0E3F1', fontSize: '12px' }}>
                            财产保险合同纠纷（130）
                          </p>
                          <Progress
                            percent={randData99.v1}
                            showInfo={false}
                            strokeWidth={13}
                            strokeColor="#4880FF"
                            trailColor="#2A3136"
                            style={{ borderRadius: '2px' }}
                            className={style.testp}
                          />
                          <p style={{ color: '#D0E3F1', fontSize: '12px' }}>
                            生命权 健康权 身体权纠纷（109）
                          </p>
                          <Progress
                            percent={randData99.v2}
                            showInfo={false}
                            strokeWidth={13}
                            strokeColor="#4880FF"
                            trailColor="#2A3136"
                            style={{ borderRadius: '2px' }}
                            className={style.testp}
                          />
                          <p style={{ color: '#D0E3F1', fontSize: '12px' }}>保险纠纷（81）</p>
                          <Progress
                            percent={randData99.v3}
                            showInfo={false}
                            strokeWidth={13}
                            strokeColor="#4880FF"
                            trailColor="#2A3136"
                            style={{ borderRadius: '2px' }}
                            className={style.testp}
                          />
                          <p style={{ color: '#D0E3F1', fontSize: '12px' }}>合同纠纷（20）</p>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col span={8} style={{ borderRight: '1px solid', paddingLeft: '0px' }}>
                  <div style={{ paddingTop: '21px', paddingLeft: '13px' }}>
                    <p>
                      <span style={{ color: '#FFC400', border: '2px solid #FFC400' }} />
                      <span
                        style={{
                          color: '#FFC400',
                          fontSize: '14px',
                          marginLeft: '5px',
                        }}
                      >
                        新闻事件
                      </span>
                    </p>
                    {companyInfo.newList &&
                      companyInfo.newList.map(item => {
                        return (
                          <Row gutter={24}>
                            <Col span={24}>
                              <Row gutter={20}>
                                <Col span={24}>
                                  <div
                                    style={{
                                      backgroundColor: '#1F2123',
                                      textAlign: 'left',
                                      marginBottom: '10px',
                                    }}
                                  >
                                    {this.CompanNewRow(item.title, item.content)}
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        );
                      })}
                  </div>
                </Col>
              </div>
            </TabPane>
            <TabPane tab="企业股东关联关系分析" key="2">
              <GLChart />
            </TabPane>
            <TabPane tab="经营" key="3">
              <div
                style={{
                  float: 'left',
                  backgroundColor: '#2A3136',
                  width: '100%',
                  margin: '0px 21px 20px 0px',
                  paddingTop: '30px',
                }}
              >
                <Row gutter={24}>
                  <Col span={24}>
                    <div style={{ paddingLeft: '13px' }}>
                      <p>
                        <span style={{ color: '#FFC400', border: '2px solid #FFC400' }} />
                        <span
                          style={{
                            color: '#FFC400',
                            fontSize: '14px',
                            marginLeft: '5px',
                          }}
                        >
                          经营状况
                        </span>
                      </p>
                      <Tabs defaultActiveKey="1" tabPosition="left" className={style.income}>
                        <TabPane tab="营业收入" key="1">
                          <BusinessIncome />
                        </TabPane>
                        <TabPane tab="企业税收" key="2">
                          <EnterpriseTax />
                        </TabPane>
                      </Tabs>
                    </div>
                  </Col>
                </Row>
              </div>
              <div
                style={{
                  float: 'left',
                  backgroundColor: '#2A3136',
                  width: '100%',
                  margin: '0px 21px 20px 0px',
                  paddingTop: '30px',
                }}
              >
                <Row gutter={24}>
                  <Col span={24}>
                    <div style={{ paddingLeft: '13px' }}>
                      <p>
                        <span style={{ color: '#FFC400', border: '2px solid #FFC400' }} />
                        <span
                          style={{
                            color: '#FFC400',
                            fontSize: '14px',
                            marginLeft: '5px',
                          }}
                        >
                          经营风险
                        </span>
                      </p>
                      <Row gutter={24}>
                        <Col span={12}>
                          <RiskColumnar />
                        </Col>
                        <Col span={12}>
                          <RiskColumnarBing />
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tab="诉讼" key="4">
              <Tabs defaultActiveKey="1">
                <TabPane tab="开庭公告（2）" key="1">
                  <NoticeHear onLegalInfo={this.showLegalInfo} />
                </TabPane>
                <TabPane tab="法律诉讼（2）" key="2">
                  <LegalAction onShowInfo={this.showActioninfo} />
                </TabPane>
                <TabPane tab="知识产权诉讼（2）" key="3">
                  <KnowledgeLitigation onKnowledgeInfo={this.showKnowledgeInfo} />
                </TabPane>
              </Tabs>
            </TabPane>
            <TabPane tab="新闻事件" key="5">
              <div
                style={{
                  float: 'left',
                  backgroundColor: '#2A3136',
                  width: '100%',
                  margin: '0px 21px 20px 0px',
                  paddingTop: '30px',
                }}
              >
                <Row gutter={24}>
                  <Col span={24}>
                    <div style={{ paddingLeft: '13px' }}>
                      <p>
                        <span style={{ color: '#FFC400', border: '2px solid #FFC400' }} />
                        <span
                          style={{
                            color: '#FFC400',
                            fontSize: '14px',
                            marginLeft: '5px',
                          }}
                        >
                          新闻类型占比
                        </span>
                      </p>
                      <Row gutter={24}>
                        <Col span={12}>
                          <NewsType />
                        </Col>
                        <Col span={12}>
                          <Row gutter={24}>
                            <Col span={4}>
                              <span style={{ color: '#D0E3F1', fontSize: '12px' }}>合作经营</span>
                            </Col>
                            <Col span={18}>
                              <Progress
                                percent={randData99.v1}
                                showInfo={false}
                                strokeWidth={13}
                                strokeColor="#dcab08"
                                trailColor="#2A3136"
                                className={style.testpro}
                              />
                            </Col>
                          </Row>

                          <Row gutter={24}>
                            <Col span={4}>
                              <span style={{ color: '#D0E3F1', fontSize: '12px' }}>经营业务</span>
                            </Col>
                            <Col span={18}>
                              <Progress
                                percent={randData99.v1}
                                showInfo={false}
                                strokeWidth={13}
                                strokeColor="#d44d56"
                                trailColor="#2A3136"
                                className={style.testpro}
                              />
                            </Col>
                          </Row>

                          <Row gutter={24}>
                            <Col span={4}>
                              <span style={{ color: '#D0E3F1', fontSize: '12px' }}>产业信息</span>
                            </Col>
                            <Col span={18}>
                              <Progress
                                percent={randData99.v1}
                                showInfo={false}
                                strokeWidth={13}
                                strokeColor="#df8b45"
                                trailColor="#2A3136"
                                className={style.testpro}
                              />
                            </Col>
                          </Row>

                          <Row gutter={24}>
                            <Col span={4}>
                              <span style={{ color: '#D0E3F1', fontSize: '12px' }}>安全事件</span>
                            </Col>
                            <Col span={18}>
                              <Progress
                                percent={randData99.v1}
                                showInfo={false}
                                strokeWidth={13}
                                strokeColor="#25b5a5"
                                trailColor="#2A3136"
                                className={style.testpro}
                              />
                            </Col>
                          </Row>
                          <Row gutter={24}>
                            <Col span={4}>
                              <span style={{ color: '#D0E3F1', fontSize: '12px' }}>重大交易</span>
                            </Col>
                            <Col span={18}>
                              <Progress
                                percent={randData99.v1}
                                showInfo={false}
                                strokeWidth={13}
                                strokeColor="#223169"
                                trailColor="#2A3136"
                                className={style.testpro}
                              />
                            </Col>
                          </Row>
                          <Row gutter={24}>
                            <Col span={4}>
                              <span style={{ color: '#D0E3F1', fontSize: '12px' }}>政策文件</span>
                            </Col>
                            <Col span={18}>
                              <Progress
                                percent={randData99.v1}
                                showInfo={false}
                                strokeWidth={13}
                                strokeColor="#4374e1"
                                trailColor="#2A3136"
                                className={style.testpro}
                              />
                            </Col>
                          </Row>
                          <Row gutter={24}>
                            <Col span={4}>
                              <span style={{ color: '#D0E3F1', fontSize: '12px' }}>其他</span>
                            </Col>
                            <Col span={18}>
                              <Progress
                                percent={randData99.v1}
                                showInfo={false}
                                strokeWidth={13}
                                strokeColor="#2eac55"
                                trailColor="#2A3136"
                                className={style.testpro}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
              <div
                style={{
                  float: 'left',
                  backgroundColor: '#2A3136',
                  width: '100%',
                  margin: '0px 21px 20px 0px',
                  paddingTop: '30px',
                }}
              >
                <Row gutter={24}>
                  <Col span={24}>
                    <div style={{ paddingLeft: '13px' }}>
                      <p>
                        <span style={{ color: '#FFC400', border: '2px solid #FFC400' }} />
                        <span
                          style={{
                            color: '#FFC400',
                            fontSize: '14px',
                            marginLeft: '5px',
                          }}
                        >
                          新闻展示
                        </span>
                      </p>
                      {companyInfo.newList &&
                        companyInfo.newList.map(item => {
                          return (
                            <Row gutter={24} style={{ marginTop: '10px' }}>
                              <Col span={24}>
                                <Row gutter={20}>
                                  <Col span={24}>
                                    <div
                                      style={{
                                        backgroundColor: '#1F2123',
                                        textAlign: 'left',
                                      }}
                                    >
                                      {this.CompanNewRow(item.title, item.content)}
                                    </div>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          );
                        })}
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
          </Tabs>
        </Col>
        {this.state.legalInfo.visible && (
          <LeglaInfo
            data={this.state.legalInfo.data}
            onshowLegalInfoCloseCallback={this.closeSubFrame}
          />
        )}
        {this.state.gongshangbiangeng.visible && (
          <IndustrialCommercialChange
            data={this.state.gongshangbiangeng.data}
            onshowgongshangCloseCallback={this.closegongShangSubFrame}
          />
        )}
        {this.state.actionInfo.visible && (
          <ActionInfo
            data={this.state.actionInfo.data}
            onshowfalvCloseCallback={this.closefalvSubFrame}
          />
        )}
        {this.state.knowlegeInfo.visible && (
          <KnowledgeInfo
            data={this.state.knowlegeInfo.data}
            onshowKnowleCloseCallback={this.closeKnowledgeSubFrame}
          />
        )}
      </Row>
    );
  }
}

export default EnterpriseInfoDetail;
