import React, { PureComponent } from 'react';
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
import EnterpriseInfoDetail from './EnterpriseInfoDetail';
import style from './PrecisionInvestment.less';
import GLChart from './GLChart';
import { isObjectNullOrUndefinedOrEmpty } from '../../utils/utils';

const { TabPane } = Tabs;
const { Option } = Select;
@Form.create()
export default class PrecisionInvestmentNew extends PureComponent {
  state = {
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
      tel: '010-5956',
      email: '***@qq.com',
      eWedSite: 'property.cic.cn',
      address: '安徽省合肥市庐阳区临泉路7363号正奇金融广场A座20-22层',
      renshu: '50-100人',
      comPanyty: '股份有限公司(非上市)',
      hangye: '金融业',
      newList: [
        {
          titel: '金信网银入选《普华永道中国金融科技调查报告',
          content:
            '近日，普华永道发布了《2018年中国金融科技调查报告》，报告从六个维度分别展现了中国金融科技领域的发',
        },
        {
          titel: '拓尔思旗下金信网银“大数据监测预警金融风险平台',
          content:
            '3月27日，由中国支付清算协会金融科技专业委员会、中国信息通信研究院云计算与大数据研究所主办的',
        },
        {
          titel: '科技助力监管 构筑金融风险“防火墙',
          content:
            '经济日报-中国经济网北京11月27日讯 （记者 闫欢）近年来,互联网金融在中国已进入高速发展阶段,随着第三方支付',
        },
      ],
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
    hangyeList: [
      { name: '金融业', code: '金融业' },
      { name: '制造业', code: '制造业' },
      { name: '电力', code: '电力' },
      { name: '批发和零售业', code: '批发和零售业' },
      { name: '住宿和餐饮业', code: '住宿和餐饮业' },
      { name: '信息传输、软件', code: '信息传输、软件' },
      { name: '房地产业', code: '房地产业' },
      { name: '租赁和商务服务业', code: '租赁和商务服务业' },
      { name: '科学研究和技术服务业', code: '科学研究和技术服务业' },
      { name: '教育', code: '教育' },
      { name: '信息技术服务业', code: '信息技术服务业' },
    ],
    quyuList: [
      { name: '北京市', code: '北京市' },
      { name: '重庆市', code: '重庆市' },
      { name: '上海市', code: '上海市' },
      { name: '天津市', code: '天津市' },
      { name: '河北省', code: '河北省' },
      { name: '山东省', code: '山东省' },
      { name: '辽宁省', code: '辽宁省' },
      { name: '黑龙江省', code: '黑龙江省' },
      { name: '甘肃省', code: '甘肃省' },
      { name: '吉林省', code: '吉林省' },
      { name: '青海省', code: '青海省' },
      { name: '河南省', code: '河南省' },
      { name: '江苏省', code: '江苏省' },
      { name: '湖北省', code: '湖北省' },
      { name: '湖南省', code: '湖南省' },
      { name: '浙江省', code: '浙江省' },
      { name: '江西省', code: '江西省' },
      { name: '广东省', code: '广东省' },
      { name: '云南省', code: '云南省' },
      { name: '福建省', code: '福建省' },
      { name: '台湾省', code: '台湾省' },
      { name: '海南省', code: '海南省' },
      { name: '山西省', code: '山西省' },
      { name: '四川省', code: '四川省' },
      { name: '陕西省', code: '陕西省' },
      { name: '贵州省', code: '贵州省' },
      { name: '安徽省', code: '安徽省' },
      { name: '内蒙古自治区', code: '内蒙古自治区' },
      { name: '广西壮族自治区', code: '广西壮族自治区' },
      { name: '西藏自治区', code: '西藏自治区' },
      { name: '新疆维吾尔自治区', code: '新疆维吾尔自治区' },
      { name: '宁夏回族自治区', code: '宁夏回族自治区' },
      { name: '澳门特别行政区', code: '澳门特别行政区' },
      { name: '香港特别行政区', code: '香港特别行政区' },
    ],
    yingyeguimoList: [
      { name: '特大型', code: '特大型' },
      { name: '大型', code: '大型' },
      { name: '中型', code: '中型' },
      { name: '小型', code: '小型' },
      { name: '微型', code: '微型' },
    ],
    qiyexingzhiList: [
      { name: '国有企业', code: '国有企业' },
      { name: '集体所有制企业', code: '集体所有制企业' },
      { name: '私营企业', code: '私营企业' },
      { name: '股份制企业', code: '股份制企业' },
      { name: '有限合伙企业', code: '有限合伙企业' },
      { name: '联营企业', code: '联营企业' },
      { name: '外商投资企业', code: '外商投资企业' },
      { name: '个人独资企业', code: '个人独资企业' },
    ],
    zucezijinList: [
      { name: '3万以下', code: '3万以下' },
      { name: '3-50万元', code: '3-50万元' },
      { name: '50-500万', code: '50-500万' },
      { name: '500万以上', code: '500万以上' },
    ],
    jingyingnianxianList: [
      { name: '1年', code: '1年' },
      { name: '2年', code: '2年' },
      { name: '3年', code: '3年' },
      { name: '4年', code: '4年' },
      { name: '5年', code: '5年' },
      { name: '6年', code: '6年' },
    ],
    queryForm: null,
    isState: true,
  };

  ParmListDetail = rec => {
    this.setState({
      companyInfo: {
        id: rec.id,
        name: rec.name,
        isRear: rec.isRear,
        tel: rec.tel,
        isZS: rec.isZS,
        email: rec.email,
        eWedSite: rec.eWedSite,
        address: rec.address,
        renshu: rec.renshu,
        comPanyty: rec.comPanyty,
        hangye: rec.hangye,
        newList: rec.newList,
      },
      contenType: '3',
      isState: true,
    });
  };

  showLegalInfo = rec => {
    console.log(rec);
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

  handleHangyeClick = value => {
    console.log(value);
    this.setState({
      hangye: value,
      isState: false,
    });
  };

  handleMenuMoneyClick = value => {
    this.setState({
      zucezijin: value,
      isState: false,
    });
  };

  handleMenuCompanyClick = value => {
    this.setState({
      qiyexingzhi: value,
      isState: false,
    });
  };

  handleMenuCityClick = value => {
    this.setState({
      quyu: value,
      isState: false,
    });
  };

  handleMenuTypeClick = value => {
    this.setState({
      qiyeguimo: value,
      isState: false,
    });
  };

  handleMenuYearClick = value => {
    this.setState({
      jingyingnianxian: value,
      isState: false,
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
    this.props.form.resetFields();
    this.setState({
      contenType: '1',
    });
  };

  SearchInfo = () => {
    this.queryForm = this.props.form.getFieldsValue();
    // if (
    // (this.state.hangye ||
    // this.state.jingyingnianxian ||
    // this.state.qiyeguimo ||
    // this.state.zucezijin ||
    // this.state.quyu ||
    // this.state.qiyexingzhi)
    if (!isObjectNullOrUndefinedOrEmpty(this.queryForm)) {
      this.setState({
        contenType: '2',
        isState: false,
      });
    }
  };

  render() {
    const { companyInfo } = this.state;
    const { getFieldDecorator } = this.props.form;
    const {
      hangye,
      quyu,
      qiyeguimo,
      qiyexingzhi,
      zucezijin,
      jingyingnianxian,
      hangyeList,
      quyuList,
      yingyeguimoList,
      qiyexingzhiList,
      zucezijinList,
      jingyingnianxianList,
    } = this.state;

    // const Searchoperations = (
    //   <div>
    //     <Input.Search placeholder="支持企业名称查询" style={{ width: 200 }} />
    //   </div>
    // );
    return (
      <Card className="park" bodyStyle={{ padding: 0 }}>
        {/* tabBarExtraContent={Searchoperations} */}
        {/* <Tabs defaultActiveKey="1">
          <TabPane tab="精准招商" key="1"> */}
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
          <Form layout="inline" className="searchBar" style={{ height: '44px' }}>
            <FormItem>
              {getFieldDecorator('hangye', {})(
                <Select
                  placeholder="请选择行业"
                  style={{ width: 120 }}
                  // value={hangye}
                  onChange={this.handleHangyeClick}
                  className="darkSelect"
                  dropdownClassName="darkDropdown"
                >
                  {hangyeList &&
                    hangyeList.map(item => {
                      return (
                        <Select.Option key={item.code} value={item.name}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                </Select>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('quyu', {})(
                <Select
                  placeholder="请选择区域"
                  style={{ width: 120 }}
                  // value={quyu}
                  onChange={this.handleMenuCityClick}
                  className="darkSelect"
                  dropdownClassName="darkDropdown"
                >
                  {quyuList &&
                    quyuList.map(item => {
                      return (
                        <Select.Option key={item.code} value={item.name}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                </Select>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('qiyeguimo', {})(
                <Select
                  placeholder="请选择企业规模"
                  style={{ width: 150 }}
                  // value={qiyeguimo}
                  onChange={this.handleMenuTypeClick}
                  className="darkSelect"
                  dropdownClassName="darkDropdown"
                >
                  {yingyeguimoList &&
                    yingyeguimoList.map(item => {
                      return (
                        <Select.Option key={item.code} value={item.name}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                </Select>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('qiyexingzhi', {})(
                <Select
                  placeholder="请选择企业性质"
                  style={{ width: 150 }}
                  // value={qiyexingzhi}
                  onChange={this.handleMenuCompanyClick}
                  className="darkSelect"
                  dropdownClassName="darkDropdown"
                >
                  {qiyexingzhiList &&
                    qiyexingzhiList.map(item => {
                      return (
                        <Select.Option key={item.code} value={item.name}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                </Select>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('zucezijin', {})(
                <Select
                  placeholder="请选择注册资本"
                  style={{ width: 150 }}
                  // value={zucezijin}
                  onChange={this.handleMenuMoneyClick}
                  className="darkSelect"
                  dropdownClassName="darkDropdown"
                >
                  {zucezijinList &&
                    zucezijinList.map(item => {
                      return (
                        <Select.Option key={item.code} value={item.name}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                </Select>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('jingyingnianxian', {})(
                <Select
                  placeholder="请选择经营年限"
                  style={{ width: 150 }}
                  // value={jingyingnianxian}
                  onChange={this.handleMenuYearClick}
                  className="darkSelect"
                  dropdownClassName="darkDropdown"
                >
                  {jingyingnianxianList &&
                    jingyingnianxianList.map(item => {
                      return (
                        <Select.Option key={item.code} value={item.name}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                </Select>
              )}
            </FormItem>

            <Button style={{ marginLeft: 29 }} onClick={this.SearchInfo}>
              查询
            </Button>
            <Button style={{ border: 'none', color: '#fff' }} onClick={this.resetCompany}>
              重置
            </Button>
          </Form>
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
          <Col
            span={16}
            style={{ backgroundColor: '#374148', padding: '0 20px 0 20px', minHeight: '520px' }}
          >
            {this.state.contenType === '1' ? (
              <Row gutter={24}>
                <Col
                  span={24}
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    height: '520px',
                    lineHeight: '520px',
                  }}
                >
                  暂无数据
                </Col>
              </Row>
            ) : (
              ''
            )}
            {this.state.contenType === '3' ? (
              <EnterpriseInfoDetail
                companyInfo={companyInfo}
                showName
                isState={this.state.isState}
              />
            ) : null}
            {this.state.contenType === '2' ? (
              <Row gutter={24}>
                <Col
                  span={24}
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    height: '520px',
                    lineHeight: '520px',
                  }}
                >
                  点击企业，查看详情
                </Col>
              </Row>
            ) : null}
          </Col>
        </Row>
        {/* </TabPane>
        </Tabs> */}
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
