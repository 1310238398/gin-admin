import React, { PureComponent } from 'react';
import { Tabs, Card, Dropdown, Button, Icon, Menu, Row, Col, Progress } from 'antd';
import lianhe from '../../assets/lianhe.png';
import hualian from '../../assets/hualian.png';
import shengchan from '../../assets/shengchan.png';
import ListCompanies from './PeeT';
import RiskColumnarBing from './RiskColumnarBing';
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

import style from './PrecisionInvestment.less';
import GLChart from './GLChart';

export default class PrecisionInvestmentC extends PureComponent {
  state = {
    currentZSStatus: 0,
    actionInfo: {
      visible: false,
      data: null,
    },
    legalInfo: {
      visible: false,
      data: null,
    },
    companyInfo: {
      id: '1',
      name: '正奇金融控股股份有限公司',
      isRear: '',
      isZS: 0,
    },
    gongshangbiangeng: {
      visible: false,
      data: null,
    },
    knowlegeInfo: {
      visible: false,
      data: null,
    },
    hangye: '行业',
    quyu: '区域',
    qiyeguimo: '企业规模',
    qiyexingzhi: '企业性质',
    zucezijin: '注册资本',
    jingyingnianxian: '经营年限',
    contenType: '1',
  };

  ParmListDetail = rec => {
    this.setState({
      currentZSStatus: 0,
      companyInfo: {
        id: rec.id,
        name: rec.name,
        isRear: rec.isRear,
        isZS: rec.isZS,
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

  handleMenuClick = e => {
    this.setState({
      hangye: e.item.props.children,
    });
  };

  handleMenuMoneyClick = e => {
    this.setState({
      zucezijin: e.item.props.children,
    });
  };

  handleMenuCompanyClick = e => {
    this.setState({
      qiyexingzhi: e.item.props.children,
    });
  };

  handleMenuCityClick = e => {
    this.setState({
      quyu: e.item.props.children,
    });
  };

  handleMenuTypeClick = e => {
    this.setState({
      qiyeguimo: e.item.props.children,
    });
  };

  handleMenuYearClick = e => {
    this.setState({
      jingyingnianxian: e.item.props.children,
    });
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

  resetCompany = () => {
    this.setState({
      hangye: '行业',
      quyu: '区域',
      qiyeguimo: '企业规模',
      qiyexingzhi: '企业性质',
      zucezijin: '注册资本',
      jingyingnianxian: '经营年限',
    });
    this.setState({
      contenType: '1',
    });
  };

  SearchInfo = () => {
    if (
      this.state.hangye ||
      this.state.jingyingnianxian ||
      this.state.qiyeguimo ||
      this.state.zucezijin ||
      this.state.quyu ||
      this.state.qiyexingzhi
    ) {
      this.setState({
        contenType: '2',
      });
    }
  };

  render() {
    const { companyInfo, currentZSStatus } = this.state;
    const { hangye, quyu, qiyeguimo, qiyexingzhi, zucezijin, jingyingnianxian } = this.state;
    const menu1 = (
      <Menu
        style={{ backgroundColor: '#2a3136' }}
        className={style.MenuLess}
        onClick={this.handleMenuClick}
      >
        <Menu.Item key="1">制造业</Menu.Item>
        <Menu.Item key="2">电力</Menu.Item>
        <Menu.Item key="3">批发和零售业</Menu.Item>
        <Menu.Item key="4">住宿和餐饮业</Menu.Item>
        <Menu.Item key="5">信息传输、软件</Menu.Item>
        <Menu.Item key="6">金融业</Menu.Item>
        <Menu.Item key="7">房地产业</Menu.Item>
        <Menu.Item key="8">租赁和商务服务业</Menu.Item>
        <Menu.Item key="9">科学研究和技术服务业</Menu.Item>
        <Menu.Item key="10">教育</Menu.Item>
        <Menu.Item key="11">信息技术服务业</Menu.Item>
      </Menu>
    );
    const menu2 = (
      <Menu
        style={{ height: '200px', overflowY: 'scroll', backgroundColor: '#2a3136' }}
        className={style.MenuLess}
        onClick={this.handleMenuCityClick}
      >
        <Menu.Item key="1">北京市</Menu.Item>
        <Menu.Item key="2">重庆市</Menu.Item>
        <Menu.Item key="3">上海市</Menu.Item>
        <Menu.Item key="4">天津市</Menu.Item>
        <Menu.Item key="5">河北省</Menu.Item>
        <Menu.Item key="6">山东省</Menu.Item>
        <Menu.Item key="7">辽宁省</Menu.Item>
        <Menu.Item key="8">黑龙江省</Menu.Item>
        <Menu.Item key="9">甘肃省</Menu.Item>
        <Menu.Item key="10">吉林省</Menu.Item>
        <Menu.Item key="11">青海省</Menu.Item>
        <Menu.Item key="12">河南省</Menu.Item>
        <Menu.Item key="13">江苏省</Menu.Item>
        <Menu.Item key="14">湖北省</Menu.Item>
        <Menu.Item key="15">湖南省</Menu.Item>
        <Menu.Item key="16">浙江省</Menu.Item>
        <Menu.Item key="17">江西省</Menu.Item>
        <Menu.Item key="18">广东省</Menu.Item>
        <Menu.Item key="19">云南省</Menu.Item>
        <Menu.Item key="20">福建省</Menu.Item>
        <Menu.Item key="21">台湾省</Menu.Item>
        <Menu.Item key="22">海南省</Menu.Item>
        <Menu.Item key="23">山西省</Menu.Item>
        <Menu.Item key="24">四川省</Menu.Item>
        <Menu.Item key="25">陕西省</Menu.Item>
        <Menu.Item key="26">贵州省</Menu.Item>
        <Menu.Item key="27">安徽省</Menu.Item>
        <Menu.Item key="28">内蒙古自治区</Menu.Item>
        <Menu.Item key="29">广西壮族自治区</Menu.Item>
        <Menu.Item key="30">西藏自治区</Menu.Item>
        <Menu.Item key="3">新疆维吾尔自治区</Menu.Item>
        <Menu.Item key="31">宁夏回族自治区</Menu.Item>
        <Menu.Item key="32">澳门特别行政区</Menu.Item>
        <Menu.Item key="33">香港特别行政区</Menu.Item>
      </Menu>
    );
    const menu3 = (
      <Menu
        style={{ backgroundColor: '#2a3136' }}
        className={style.MenuLess}
        onClick={this.handleMenuTypeClick}
      >
        <Menu.Item key="1">特大型</Menu.Item>
        <Menu.Item key="2">大型</Menu.Item>
        <Menu.Item key="3">中型</Menu.Item>
        <Menu.Item key="4">小型</Menu.Item>
        <Menu.Item key="5">微型</Menu.Item>
      </Menu>
    );
    const menu4 = (
      <Menu
        style={{ backgroundColor: '#2a3136' }}
        className={style.MenuLess}
        onClick={this.handleMenuCompanyClick}
      >
        <Menu.Item key="1">国有企业</Menu.Item>
        <Menu.Item key="2">集体所有制企业</Menu.Item>
        <Menu.Item key="3">私营企业</Menu.Item>
        <Menu.Item key="4">股份制企业</Menu.Item>
        <Menu.Item key="5">有限合伙企业</Menu.Item>
        <Menu.Item key="3">联营企业</Menu.Item>
        <Menu.Item key="4">外商投资企业</Menu.Item>
        <Menu.Item key="5">个人独资企业</Menu.Item>
      </Menu>
    );
    const menu5 = (
      <Menu
        style={{ backgroundColor: '#2a3136' }}
        className={style.MenuLess}
        onClick={this.handleMenuMoneyClick}
      >
        <Menu.Item key="1">3万以下</Menu.Item>
        <Menu.Item key="2">3-50万元</Menu.Item>
        <Menu.Item key="3">50-500万</Menu.Item>
        <Menu.Item key="4">500万以上</Menu.Item>
      </Menu>
    );
    const menu6 = (
      <Menu
        style={{ backgroundColor: '#2a3136' }}
        className={style.MenuLess}
        onClick={this.handleMenuYearClick}
      >
        <Menu.Item key="1">1年</Menu.Item>
        <Menu.Item key="2">2年</Menu.Item>
        <Menu.Item key="3">3年</Menu.Item>
        <Menu.Item key="4">4年</Menu.Item>
        <Menu.Item key="3">5年</Menu.Item>
        <Menu.Item key="4">6年</Menu.Item>
      </Menu>
    );

    return (
      <Card className="park" bodyStyle={{ padding: 0 }}>
        <div
          className={style.dropArea}
          style={{
            backgroundColor: '#374148',
            width: '100%',
            height: '44px',
            marginBottom: '10px',
            lineHeight: '44px',
          }}
        >
          <Dropdown overlay={menu1} trigger="hover">
            <Button style={{ marginLeft: 8 }}>
              {hangye} <Icon type="down" />
            </Button>
          </Dropdown>
          <Dropdown overlay={menu2}>
            <Button style={{ marginLeft: 8 }}>
              {quyu} <Icon type="down" />
            </Button>
          </Dropdown>
          <Dropdown overlay={menu3}>
            <Button style={{ marginLeft: 8 }}>
              {qiyeguimo}
              <Icon type="down" />
            </Button>
          </Dropdown>
          <Dropdown overlay={menu4}>
            <Button style={{ marginLeft: 8 }}>
              {qiyexingzhi}
              <Icon type="down" />
            </Button>
          </Dropdown>
          <Dropdown overlay={menu5}>
            <Button style={{ marginLeft: 8 }}>
              {zucezijin}
              <Icon type="down" />
            </Button>
          </Dropdown>
          <Dropdown overlay={menu6}>
            <Button style={{ marginLeft: 8 }}>
              {jingyingnianxian}
              <Icon type="down" />
            </Button>
          </Dropdown>
          <Button
            style={{ marginLeft: 29, color: '#FFC400', border: 'none' }}
            onClick={this.SearchInfo}
          >
            查询
          </Button>
          <Button style={{ border: 'none' }} onClick={this.resetCompany}>
            重置
          </Button>
        </div>

        <Row gutter={20}>
          <Col span={8}>
            <Card className="chart" title="企业列表">
              <Card className="chart">
                <ListCompanies
                  style={{ padding: '20px' }}
                  onParmList={this.ParmListDetail}
                  companyType={this.state.contenType}
                />
              </Card>
            </Card>
          </Col>
          <Col span={16} style={{ backgroundColor: '#374148', padding: '0 20px 0 20px' }}>
            <Row gutter={24}>
              <Col span={24}>
                <Row
                  gutter={24}
                  style={{ color: '#EAB607', fontSize: '20px', margin: '16px 0px 12px 0px' }}
                >
                  <Col span={18}>
                    <span>{companyInfo.name}</span>
                    <span
                      onClick={() => {
                        if (currentZSStatus === 1) {
                          return;
                        }
                        this.setState({ currentZSStatus: 1 });
                      }}
                      style={{
                        marginLeft: 15,
                        border: '1px solid #ffc400',
                        borderRadius: 13,
                        padding: '4px 10px',
                        background: 'transparent',
                        fontSize: 16,
                        fontWeight: 'bolder',
                        color: '#d74b56',
                        cursor: 'pointer',
                      }}
                    >
                      {companyInfo.isZS === 0 && currentZSStatus === 0
                        ? '加入项目库'
                        : '已加入项目库'}
                    </span>
                  </Col>
                  <Col
                    span={6}
                    style={{ color: '#EAB607', fontSize: '14px', margin: '16px 0px 12px 0px' }}
                  >
                    {companyInfo.isRear ? companyInfo.isRear : '未落入济南市'}
                  </Col>
                </Row>
                <Card className="chart">
                  <div style={{ backgroundColor: '#2A3136', padding: '16px 20px 15px 20px' }}>
                    {companyInfo.isRear
                      ? [
                          <Row gutter={24}>
                            <Col span={6} onClick={this.gongshangbiangeng}>
                              {this.CompanRowContent('工商变更', '12')}
                            </Col>
                            <Col span={6}>{this.CompanRow('开庭公告', '2')}</Col>
                            <Col span={6}>{this.CompanRow('司法拍卖', '2')}</Col>
                            <Col span={6}>{this.CompanRow('工商信息', '4')}</Col>
                          </Row>,
                          <Row gutter={24}>
                            <Col span={6}>{this.CompanRow('股东信息', '3')}</Col>
                            <Col span={6}>{this.CompanRow('法律诉讼', '2')}</Col>
                            <Col span={6}>{this.CompanRow('企业业务', '5')}</Col>
                            <Col span={6}>{this.CompanRow('对外投资', '3')}</Col>
                          </Row>,
                          <Row gutter={24}>
                            <Col span={6}>{this.CompanRow('变更记录', '34')}</Col>
                            <Col span={6}>{this.CompanRow('历史失信信息', '2')}</Col>
                            <Col span={6}>{this.CompanRow('行政许可', '5')}</Col>
                            <Col span={6}>{this.CompanRow('软件著作权', '6')}</Col>
                          </Row>,
                          <Row gutter={24}>
                            <Col span={6}>{this.CompanRow('企业年报', '7')}</Col>
                            <Col span={6}>{this.CompanRow('经营异常', '6')}</Col>
                            <Col span={6}>{this.CompanRow('商标信息', '13')}</Col>
                            <Col span={6}>{this.CompanRow('商标信息', '4')}</Col>
                          </Row>,
                        ]
                      : [
                          <Row gutter={24}>
                            <Col span={6} onClick={this.gongshangbiangeng}>
                              {this.CompanRowContent('工商变更', '23')}
                            </Col>
                            <Col span={6}>{this.CompanRow('开庭公告', '2')}</Col>
                            <Col span={6}>{this.CompanRow('司法拍卖', '5')}</Col>
                            <Col span={6}>{this.CompanRow('工商信息', '1')}</Col>
                          </Row>,
                          <Row gutter={24}>
                            <Col span={6}>{this.CompanRow('股东信息', '10')}</Col>
                            <Col span={6}>{this.CompanRow('法律诉讼', '2')}</Col>
                            <Col span={6}>{this.CompanRow('企业业务', '6')}</Col>
                            <Col span={6}>{this.CompanRow('对外投资', '2')}</Col>
                          </Row>,
                          <Row gutter={24}>
                            <Col span={6}>{this.CompanRow('变更记录', '35')}</Col>
                            <Col span={6}>{this.CompanRow('历史失信信息', '4')}</Col>
                            <Col span={6}>{this.CompanRow('行政许可', '7')}</Col>
                            <Col span={6}>{this.CompanRow('软件著作权', '2')}</Col>
                          </Row>,
                          <Row gutter={24}>
                            <Col span={6}>{this.CompanRow('企业年报', '8')}</Col>
                            <Col span={6}>{this.CompanRow('经营异常', '5')}</Col>
                            <Col span={6}>{this.CompanRow('商标信息', '2')}</Col>
                            <Col span={6}>{this.CompanRow('商标信息', '1')}</Col>
                          </Row>,
                        ]}
                  </div>
                </Card>
              </Col>
              <Col span={24}>
                <Tabs defaultActiveKey="1">
                  <Tabs.TabPane tab="概览" key="1">
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
                            <span style={{ color: '#FFC400', fontSize: '14px', marginLeft: '5px' }}>
                              基本信息
                            </span>
                          </p>
                          <Row
                            gutter={24}
                            style={{ color: '#ffffff', fontSize: '12px', lineHeight: '26px' }}
                          >
                            {companyInfo.isRear
                              ? [
                                  <Col span={24}>电话：0535-7826</Col>,
                                  <Col span={24}>邮箱：***@163.com</Col>,
                                  <Col span={24}>网址：incpropertycom.cic.cn</Col>,
                                  <Col>
                                    地址：
                                    {companyInfo.isRear}
                                  </Col>,
                                ]
                              : [
                                  <Col span={24}>电话：010-5956</Col>,
                                  <Col span={24}>邮箱：***@qq.com</Col>,
                                  <Col span={24}>网址：property.cic.cn</Col>,
                                  <Col>
                                    地址：安徽省合肥市庐阳区临泉路7363号正奇金融广场A座20-22层
                                  </Col>,
                                ]}
                          </Row>
                        </div>

                        <div style={{ paddingTop: '21px', paddingLeft: '13px' }}>
                          <p>
                            <span style={{ color: '#FFC400', border: '2px solid #FFC400' }} />
                            <span style={{ color: '#FFC400', fontSize: '14px', marginLeft: '5px' }}>
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
                            <span style={{ color: '#FFC400', fontSize: '14px', marginLeft: '5px' }}>
                              公司规模
                            </span>
                          </p>

                          <Row
                            gutter={24}
                            style={{ color: '#ffffff', fontSize: '12px', lineHeight: '26px' }}
                          >
                            {companyInfo.isRear
                              ? [
                                  <Col span={24}>人数：100-499人</Col>,
                                  <Col span={24} style={{ paddingRight: '0px' }}>
                                    类型：其他股份有限公司(非上市)
                                  </Col>,
                                  <Col span={24}>行业：金融业</Col>,
                                ]
                              : [
                                  <Col span={24}>人数：200-500人</Col>,
                                  <Col span={24} style={{ paddingRight: '0px' }}>
                                    类型：股份有限公司(非上市)
                                  </Col>,
                                  <Col span={24}>行业：金融业</Col>,
                                ]}
                          </Row>
                        </div>
                      </Col>

                      <Col span={8} style={{ borderRight: '1px solid', paddingLeft: '0px' }}>
                        <div style={{ paddingTop: '21px', paddingLeft: '13px' }}>
                          <p>
                            <span style={{ color: '#FFC400', border: '2px solid #FFC400' }} />
                            <span style={{ color: '#FFC400', fontSize: '14px', marginLeft: '5px' }}>
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
                                    {companyInfo.isRear
                                      ? [
                                          <div style={{ color: '#fff' }}>0</div>,
                                          <div style={{ color: '#EAB607' }}>工商检查</div>,
                                        ]
                                      : [
                                          <div style={{ color: '#fff' }}>1</div>,
                                          <div style={{ color: '#EAB607' }}>工商检查</div>,
                                        ]}
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
                                    {companyInfo.isRear
                                      ? [
                                          <div style={{ color: '#fff' }}>12</div>,
                                          <div style={{ color: '#EAB607' }}>资产检查</div>,
                                        ]
                                      : [
                                          <div style={{ color: '#fff' }}>5</div>,
                                          <div style={{ color: '#EAB607' }}>资产检查</div>,
                                        ]}
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
                                    {companyInfo.isRear
                                      ? [
                                          <div style={{ color: '#fff' }}>15</div>,
                                          <div style={{ color: '#EAB607' }}>税务检查</div>,
                                        ]
                                      : [
                                          <div style={{ color: '#fff' }}>23</div>,
                                          <div style={{ color: '#EAB607' }}>税务检查</div>,
                                        ]}
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
                                    {companyInfo.isRear
                                      ? [
                                          <div style={{ color: '#fff' }}>3</div>,
                                          <div style={{ color: '#EAB607' }}>涉诉检查</div>,
                                        ]
                                      : [
                                          <div style={{ color: '#fff' }}>7</div>,
                                          <div style={{ color: '#EAB607' }}>涉诉检查</div>,
                                        ]}
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>

                        <div style={{ paddingTop: '21px', paddingLeft: '13px' }}>
                          <p>
                            <span style={{ color: '#FFC400', border: '2px solid #FFC400' }} />
                            <span style={{ color: '#FFC400', fontSize: '14px', marginLeft: '5px' }}>
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
                                    {companyInfo.isRear
                                      ? [
                                          <div style={{ color: '#fff' }}>20</div>,
                                          <div style={{ color: '#EAB607' }}>开庭公告</div>,
                                        ]
                                      : [
                                          <div style={{ color: '#fff' }}>15</div>,
                                          <div style={{ color: '#EAB607' }}>开庭公告</div>,
                                        ]}
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
                                {companyInfo.isRear
                                  ? [
                                      <p style={{ color: '#D0E3F1', fontSize: '12px' }}>
                                        机动车交通事故纠纷（985）
                                      </p>,
                                      <Progress
                                        percent={40}
                                        showInfo={false}
                                        strokeWidth={13}
                                        strokeColor="#4880FF"
                                        trailColor="#2A3136"
                                        style={{ borderRadius: '2px' }}
                                        className={style.testp}
                                      />,
                                    ]
                                  : [
                                      <p style={{ color: '#D0E3F1', fontSize: '12px' }}>
                                        机动车交通事故纠纷（21）
                                      </p>,
                                      <Progress
                                        percent={21}
                                        showInfo={false}
                                        strokeWidth={13}
                                        strokeColor="#4880FF"
                                        trailColor="#2A3136"
                                        style={{ borderRadius: '2px' }}
                                        className={style.testp}
                                      />,
                                    ]}

                                {companyInfo.isRear
                                  ? [
                                      <p style={{ color: '#D0E3F1', fontSize: '12px' }}>
                                        财产保险合同纠纷（90）
                                      </p>,
                                      <Progress
                                        percent={32}
                                        showInfo={false}
                                        strokeWidth={13}
                                        strokeColor="#4880FF"
                                        trailColor="#2A3136"
                                        style={{ borderRadius: '2px' }}
                                        className={style.testp}
                                      />,
                                    ]
                                  : [
                                      <p style={{ color: '#D0E3F1', fontSize: '12px' }}>
                                        财产保险合同纠纷（130）
                                      </p>,
                                      <Progress
                                        percent={12}
                                        showInfo={false}
                                        strokeWidth={13}
                                        strokeColor="#4880FF"
                                        trailColor="#2A3136"
                                        style={{ borderRadius: '2px' }}
                                        className={style.testp}
                                      />,
                                    ]}
                                {companyInfo.isRear
                                  ? [
                                      <p style={{ color: '#D0E3F1', fontSize: '12px' }}>
                                        生命权 健康权 身体权纠纷（98）
                                      </p>,
                                      <Progress
                                        percent={14}
                                        showInfo={false}
                                        strokeWidth={13}
                                        strokeColor="#4880FF"
                                        trailColor="#2A3136"
                                        style={{ borderRadius: '2px' }}
                                        className={style.testp}
                                      />,
                                    ]
                                  : [
                                      <p style={{ color: '#D0E3F1', fontSize: '12px' }}>
                                        生命权 健康权 身体权纠纷（109）
                                      </p>,
                                      <Progress
                                        percent={74}
                                        showInfo={false}
                                        strokeWidth={13}
                                        strokeColor="#4880FF"
                                        trailColor="#2A3136"
                                        style={{ borderRadius: '2px' }}
                                        className={style.testp}
                                      />,
                                    ]}
                                {companyInfo.isRear
                                  ? [
                                      <p style={{ color: '#D0E3F1', fontSize: '12px' }}>
                                        保险纠纷（65）
                                      </p>,
                                      <Progress
                                        percent={32}
                                        showInfo={false}
                                        strokeWidth={13}
                                        strokeColor="#4880FF"
                                        trailColor="#2A3136"
                                        style={{ borderRadius: '2px' }}
                                        className={style.testp}
                                      />,
                                    ]
                                  : [
                                      <p style={{ color: '#D0E3F1', fontSize: '12px' }}>
                                        保险纠纷（81）
                                      </p>,
                                      <Progress
                                        percent={65}
                                        showInfo={false}
                                        strokeWidth={13}
                                        strokeColor="#4880FF"
                                        trailColor="#2A3136"
                                        style={{ borderRadius: '2px' }}
                                        className={style.testp}
                                      />,
                                    ]}
                                {companyInfo.isRear
                                  ? [
                                      <p style={{ color: '#D0E3F1', fontSize: '12px' }}>
                                        合同纠纷（20）
                                      </p>,
                                    ]
                                  : [
                                      <p style={{ color: '#D0E3F1', fontSize: '12px' }}>
                                        合同纠纷（40）
                                      </p>,
                                    ]}
                              </Card>
                            </Col>
                          </Row>
                        </div>
                      </Col>

                      <Col span={8} style={{ borderRight: '1px solid', paddingLeft: '0px' }}>
                        <div style={{ paddingTop: '21px', paddingLeft: '13px' }}>
                          <p>
                            <span style={{ color: '#FFC400', border: '2px solid #FFC400' }} />
                            <span style={{ color: '#FFC400', fontSize: '14px', marginLeft: '5px' }}>
                              新闻事件
                            </span>
                          </p>
                          <Row gutter={24}>
                            <Col span={24}>
                              <Row gutter={20}>
                                <Col span={24}>
                                  <div
                                    style={{
                                      backgroundColor: '#1F2123',
                                      textAlign: 'left',
                                    }}
                                  >
                                    {companyInfo.isRear
                                      ? this.CompanNewRow(
                                          '金信网银入选《普华永道中国金融科技调查报告',
                                          '近日，普华永道发布了《2018年中国金融科技调查报告》，报告从六个维度分别展现了中国金融科技领域的发'
                                        )
                                      : this.CompanNewRow(
                                          '联想：旗下正奇金融将分拆上市',
                                          '公司已向香港联交所申请批准其附属公司正奇金融控股股份有限公司于联交所主'
                                        )}
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
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
                                    {companyInfo.isRear
                                      ? this.CompanNewRow(
                                          '拓尔思旗下金信网银“大数据监测预警金融风险平台”',
                                          '3月27日，由中国支付清算协会金融科技专业委员会、中国信息通信研究院云计算与大数据研究所主办的'
                                        )
                                      : this.CompanNewRow(
                                          '正奇金融成功股改，筹划上市准备工作',
                                          '正奇安徽金融控股有限公司今日成功完成股份制改造，将更名为“正奇金融控股股份'
                                        )}
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
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
                                    {companyInfo.isRear
                                      ? this.CompanNewRow(
                                          '科技助力监管 构筑金融风险“防火墙”',
                                          '经济日报-中国经济网北京11月27日讯 （记者 闫欢）近年来,互联网金融在中国已进入高速发展阶段,随着第三方支付'
                                        )
                                      : this.CompanNewRow(
                                          '联想控股除了持有联想集团的股份外,还持有神州租车',
                                          '联想控股除了持有联想集团的股份外,还持有神州租车、拉卡拉、正奇金融等等公司的股份,不过目前联想控股90%的股份都是由联想集团贡献的'
                                        )}
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          {/* <Card className="chart" style={{ backgroundColor: '#2A3136' }}>
                                <BusinessRiskChart />
                              </Card> */}
                        </div>
                      </Col>
                    </div>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="企业股东关联关系分析" key="2">
                    <GLChart Gldata={1} />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="经营" key="3">
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
                              <Tabs.TabPane tab="营业收入" key="1">
                                {companyInfo.isRear ? (
                                  <BusinessIncome />
                                ) : (
                                  <BusinessIncome dataIncome={1} />
                                )}
                              </Tabs.TabPane>
                              <Tabs.TabPane tab="企业税收" key="2">
                                {companyInfo.isRear ? (
                                  <EnterpriseTax />
                                ) : (
                                  <EnterpriseTax data={1} />
                                )}
                              </Tabs.TabPane>
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
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="诉讼" key="4">
                    <Tabs defaultActiveKey="1">
                      <Tabs.TabPane tab="开庭公告（2）" key="1">
                        <NoticeHear onLegalInfo={this.showLegalInfo} />
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="法律诉讼（2）" key="2">
                        <LegalAction onShowInfo={this.showActioninfo} />
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="知识产权诉讼（2）" key="3">
                        <KnowledgeLitigation onKnowledgeInfo={this.showKnowledgeInfo} />
                      </Tabs.TabPane>
                    </Tabs>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="新闻事件" key="5">
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
                                    <span style={{ color: '#D0E3F1', fontSize: '12px' }}>
                                      合作经营
                                    </span>
                                  </Col>
                                  <Col span={18}>
                                    <Progress
                                      percent={12}
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
                                    <span style={{ color: '#D0E3F1', fontSize: '12px' }}>
                                      经营业务
                                    </span>
                                  </Col>
                                  <Col span={18}>
                                    <Progress
                                      percent={15}
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
                                    <span style={{ color: '#D0E3F1', fontSize: '12px' }}>
                                      产业信息
                                    </span>
                                  </Col>
                                  <Col span={18}>
                                    <Progress
                                      percent={25}
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
                                    <span style={{ color: '#D0E3F1', fontSize: '12px' }}>
                                      安全事件
                                    </span>
                                  </Col>
                                  <Col span={18}>
                                    <Progress
                                      percent={35}
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
                                    <span style={{ color: '#D0E3F1', fontSize: '12px' }}>
                                      重大交易
                                    </span>
                                  </Col>
                                  <Col span={18}>
                                    <Progress
                                      percent={45}
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
                                    <span style={{ color: '#D0E3F1', fontSize: '12px' }}>
                                      政策文件
                                    </span>
                                  </Col>
                                  <Col span={18}>
                                    <Progress
                                      percent={65}
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
                                      percent={14}
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
                                      {this.CompanNewRow(
                                        '正奇金融成功股改，筹划上市准备工作',
                                        '正奇安徽金融控股有限公司今日成功完成股份制改造，将更名为“正奇金融控股股份'
                                      )}
                                    </div>
                                  </Col>
                                </Row>
                                <Row gutter={20} style={{ marginTop: '10px' }}>
                                  <Col span={24}>
                                    <div
                                      style={{
                                        backgroundColor: '#1F2123',
                                        textAlign: 'left',
                                      }}
                                    >
                                      {this.CompanNewRow(
                                        '联想控股除了持有联想集团的股份外,还持有神州租车、拉卡拉、正奇金融等等公司的股份',
                                        '联想控股除了持有联想集团的股份外,还持有神州租车、拉卡拉、正奇金融等等公司的股份,不过目前联想控股90%的股份都是由联想集团贡献的。'
                                      )}
                                    </div>
                                  </Col>
                                </Row>
                                <Row gutter={20} style={{ marginTop: '10px' }}>
                                  <Col span={24}>
                                    <div
                                      style={{
                                        backgroundColor: '#1F2123',
                                        textAlign: 'left',
                                      }}
                                    >
                                      {this.CompanNewRow(
                                        '招股书显示,截至报告期末',
                                        '招股书显示,截至报告期末,联想控股持有拉卡拉约1.1亿股,持股比例31.38%,是其第一大股东,但公司目前无实际控制人,联想旗下的另一金融布局正奇金融已赴港递交招股书。'
                                      )}
                                    </div>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Tabs.TabPane>
                </Tabs>
              </Col>
            </Row>
          </Col>
        </Row>
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
      </Card>
    );
  }
}
