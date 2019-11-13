import React, { PureComponent } from 'react';
import { Table } from 'antd';
import getMockData from '@/services/s_mockData';

export default class ListCompanies extends PureComponent {
  state = {
    data: null,
  };

  onItemDetailClick = rec => {
    // 将企业Id传入，刷新左侧区域。
    const { onParmList } = this.props;

    onParmList(rec);
  };

  componentDidMount() {
    getMockData('enterprise_attract.json').then(data => {
      let list = data || [];

      list = list.map(v => {
        return {
          ...v,
        };
      });
      this.setState({ data: list });
    });
  }

  render() {
    const { companyType } = this.props;
    const columns = [{ title: '序号', dataIndex: 'id' }, { title: '企业名称', dataIndex: 'name' }];

    const data1 = [
      {
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
            title: '联想：旗下正奇金融将分拆上市',
            content: '公司已向香港联交所申请批准其附属公司正奇金融控股股份有限公司于联交所主',
          },
          {
            title: '正奇金融成功股改，筹划上市准备工作',
            content: '正奇安徽金融控股有限公司今日成功完成股份制改造，将更名为“正奇金融控股股份',
          },
          {
            title: '联想控股除了持有联想集团的股份外,还持有神州租车',
            content:
              '联想控股除了持有联想集团的股份外,还持有神州租车、拉卡拉、正奇金融等等公司的股份,不过目前联想控股90%的股份都是由联想集团贡献的',
          },
        ],
      },
      {
        id: '2',
        name: '北京金信网银金融信息服务有限公司',
        isRear: '济南市文化西路13号海辰大厦B座1102室',
        isZS: 1,
        tel: '010-5956',
        email: '***@qq.com',
        eWedSite: 'property.cic.cn',
        address: '安徽省合肥市庐阳区临泉路7363号正奇金融广场A座20-22层',
        renshu: '50-100人',
        comPanyty: '股份有限公司(非上市)',
        hangye: '金融业',
        newList: [
          {
            title: '金信网银入选《普华永道中国金融科技调查报告',
            content:
              '近日，普华永道发布了《2018年中国金融科技调查报告》，报告从六个维度分别展现了中国金融科技领域的发',
          },
          {
            title: '拓尔思旗下金信网银“大数据监测预警金融风险平台',
            content:
              '3月27日，由中国支付清算协会金融科技专业委员会、中国信息通信研究院云计算与大数据研究所主办的',
          },
          {
            title: '科技助力监管 构筑金融风险“防火墙',
            content:
              '经济日报-中国经济网北京11月27日讯 （记者 闫欢）近年来,互联网金融在中国已进入高速发展阶段,随着第三方支付',
          },
        ],
      },
      {
        id: '3',
        name: ' 北京怡昌投资有限公司',
        isRear: '济南市历下区经十路8000号龙奥金座1号楼17层',
        isZS: 1,
        tel: '010-5956',
        email: '***@qq.com',
        eWedSite: 'property.cic.cn',
        address: '安徽省合肥市庐阳区临泉路7363号正奇金融广场A座20-22层',
        renshu: '50-100人',
        comPanyty: '股份有限公司(非上市)',
        hangye: '金融业',
        newList: [
          {
            title: '金信网银入选《普华永道中国金融科技调查报告',
            content:
              '近日，普华永道发布了《2018年中国金融科技调查报告》，报告从六个维度分别展现了中国金融科技领域的发',
          },
          {
            title: '拓尔思旗下金信网银“大数据监测预警金融风险平台',
            content:
              '3月27日，由中国支付清算协会金融科技专业委员会、中国信息通信研究院云计算与大数据研究所主办的',
          },
          {
            title: '科技助力监管 构筑金融风险“防火墙',
            content:
              '经济日报-中国经济网北京11月27日讯 （记者 闫欢）近年来,互联网金融在中国已进入高速发展阶段,随着第三方支付',
          },
        ],
      },
      {
        id: '4',
        name: '珠海金融投资控股集团',
        isRear: '',
        isZS: 1,
        tel: '010-5956',
        email: '***@qq.com',
        eWedSite: 'property.cic.cn',
        address: '安徽省合肥市庐阳区临泉路7363号正奇金融广场A座20-22层',
        renshu: '50-100人',
        comPanyty: '股份有限公司(非上市)',
        hangye: '金融业',
        newList: [
          {
            title: '金信网银入选《普华永道中国金融科技调查报告',
            content:
              '近日，普华永道发布了《2018年中国金融科技调查报告》，报告从六个维度分别展现了中国金融科技领域的发',
          },
          {
            title: '拓尔思旗下金信网银“大数据监测预警金融风险平台',
            content:
              '3月27日，由中国支付清算协会金融科技专业委员会、中国信息通信研究院云计算与大数据研究所主办的',
          },
          {
            title: '科技助力监管 构筑金融风险“防火墙',
            content:
              '经济日报-中国经济网北京11月27日讯 （记者 闫欢）近年来,互联网金融在中国已进入高速发展阶段,随着第三方支付',
          },
        ],
      },
      {
        id: '5',
        name: '大连汇普金融控股有限公司',
        isRear: '',
        isZS: 1,
        tel: '010-5956',
        email: '***@qq.com',
        eWedSite: 'property.cic.cn',
        address: '安徽省合肥市庐阳区临泉路7363号正奇金融广场A座20-22层',
        renshu: '50-100人',
        comPanyty: '股份有限公司(非上市)',
        hangye: '金融业',
        newList: [
          {
            title: '金信网银入选《普华永道中国金融科技调查报告',
            content:
              '近日，普华永道发布了《2018年中国金融科技调查报告》，报告从六个维度分别展现了中国金融科技领域的发',
          },
          {
            title: '拓尔思旗下金信网银“大数据监测预警金融风险平台',
            content:
              '3月27日，由中国支付清算协会金融科技专业委员会、中国信息通信研究院云计算与大数据研究所主办的',
          },
          {
            title: '科技助力监管 构筑金融风险“防火墙',
            content:
              '经济日报-中国经济网北京11月27日讯 （记者 闫欢）近年来,互联网金融在中国已进入高速发展阶段,随着第三方支付',
          },
        ],
      },
      {
        id: '6',
        name: '大连怀诚房地产咨询服务有限公司',
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
            title: '金信网银入选《普华永道中国金融科技调查报告',
            content:
              '近日，普华永道发布了《2018年中国金融科技调查报告》，报告从六个维度分别展现了中国金融科技领域的发',
          },
          {
            title: '拓尔思旗下金信网银“大数据监测预警金融风险平台',
            content:
              '3月27日，由中国支付清算协会金融科技专业委员会、中国信息通信研究院云计算与大数据研究所主办的',
          },
          {
            title: '科技助力监管 构筑金融风险“防火墙',
            content:
              '经济日报-中国经济网北京11月27日讯 （记者 闫欢）近年来,互联网金融在中国已进入高速发展阶段,随着第三方支付',
          },
        ],
      },
      {
        id: '7',
        name: '中粮地产集团深圳房地产开发有限公司',
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
            title: '金信网银入选《普华永道中国金融科技调查报告',
            content:
              '近日，普华永道发布了《2018年中国金融科技调查报告》，报告从六个维度分别展现了中国金融科技领域的发',
          },
          {
            title: '拓尔思旗下金信网银“大数据监测预警金融风险平台',
            content:
              '3月27日，由中国支付清算协会金融科技专业委员会、中国信息通信研究院云计算与大数据研究所主办的',
          },
          {
            title: '科技助力监管 构筑金融风险“防火墙',
            content:
              '经济日报-中国经济网北京11月27日讯 （记者 闫欢）近年来,互联网金融在中国已进入高速发展阶段,随着第三方支付',
          },
        ],
      },
      {
        id: '8',
        name: '山东省装备制造业协会',
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
            title: '金信网银入选《普华永道中国金融科技调查报告',
            content:
              '近日，普华永道发布了《2018年中国金融科技调查报告》，报告从六个维度分别展现了中国金融科技领域的发',
          },
          {
            title: '拓尔思旗下金信网银“大数据监测预警金融风险平台',
            content:
              '3月27日，由中国支付清算协会金融科技专业委员会、中国信息通信研究院云计算与大数据研究所主办的',
          },
          {
            title: '科技助力监管 构筑金融风险“防火墙',
            content:
              '经济日报-中国经济网北京11月27日讯 （记者 闫欢）近年来,互联网金融在中国已进入高速发展阶段,随着第三方支付',
          },
        ],
      },
      {
        id: '9',
        name: '盐城服务业集聚区投资有限公司',
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
            title: '金信网银入选《普华永道中国金融科技调查报告',
            content:
              '近日，普华永道发布了《2018年中国金融科技调查报告》，报告从六个维度分别展现了中国金融科技领域的发',
          },
          {
            title: '拓尔思旗下金信网银“大数据监测预警金融风险平台',
            content:
              '3月27日，由中国支付清算协会金融科技专业委员会、中国信息通信研究院云计算与大数据研究所主办的',
          },
          {
            title: '科技助力监管 构筑金融风险“防火墙',
            content:
              '经济日报-中国经济网北京11月27日讯 （记者 闫欢）近年来,互联网金融在中国已进入高速发展阶段,随着第三方支付',
          },
        ],
      },
      {
        id: '10',
        name: '海南明典商务服务业有限公司',
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
            title: '金信网银入选《普华永道中国金融科技调查报告',
            content:
              '近日，普华永道发布了《2018年中国金融科技调查报告》，报告从六个维度分别展现了中国金融科技领域的发',
          },
          {
            title: '拓尔思旗下金信网银“大数据监测预警金融风险平台',
            content:
              '3月27日，由中国支付清算协会金融科技专业委员会、中国信息通信研究院云计算与大数据研究所主办的',
          },
          {
            title: '科技助力监管 构筑金融风险“防火墙',
            content:
              '经济日报-中国经济网北京11月27日讯 （记者 闫欢）近年来,互联网金融在中国已进入高速发展阶段,随着第三方支付',
          },
        ],
      },

      {
        id: '11',
        name: '中国金融租赁有限公司',
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
            title: '金信网银入选《普华永道中国金融科技调查报告',
            content:
              '近日，普华永道发布了《2018年中国金融科技调查报告》，报告从六个维度分别展现了中国金融科技领域的发',
          },
          {
            title: '拓尔思旗下金信网银“大数据监测预警金融风险平台',
            content:
              '3月27日，由中国支付清算协会金融科技专业委员会、中国信息通信研究院云计算与大数据研究所主办的',
          },
          {
            title: '科技助力监管 构筑金融风险“防火墙',
            content:
              '经济日报-中国经济网北京11月27日讯 （记者 闫欢）近年来,互联网金融在中国已进入高速发展阶段,随着第三方支付',
          },
        ],
      },
    ];
    return (
      <Table
        size="small"
        columns={columns}
        dataSource={companyType === '1' ? [] : this.state.data}
        pagination={false}
        onRow={record => {
          return {
            onClick: () => {
              this.onItemDetailClick(record);
            },
          };
        }}
      />
    );
  }
}
