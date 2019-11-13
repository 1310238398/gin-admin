import React, { PureComponent } from 'react';
import { Tabs, Card, Layout, Row, Col, Table } from 'antd';
import { connect } from 'dva';
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import Chart3 from './Chart3';

const { TabPane } = Tabs;
@connect(state => ({
  energyConsumption: state.energyConsumption,
}))
export default class EnergyConsumption extends PureComponent {
  render() {
    const columns = [
      { title: '建筑名称', dataIndex: 'name' },
      { title: '时间', dataIndex: 'time' },
      { title: '企业', dataIndex: 'en', width: 200 },
      { title: '类型', dataIndex: 'kind', width: 80 },
      { title: '能耗值', dataIndex: 'value', width: 90 },
    ];

    const data = [
      {
        name: ' 汉峪金谷A2-1-1401-A	',
        time: '2019-03-12',
        en: '济南博雅得电子商务有限公司',
        kind: '电能',
        value: '2341KW',
      },
      {
        name: '汉峪金谷A2-1-1401-B',
        time: '2019-03-12',
        en: '山东融科数据服务有限公司',
        kind: '电能',
        value: '2031KW',
      },
      {
        name: '汉峪金谷A2-1-1402F',
        time: '2019-03-12',
        en: '济南庚辰铸造材料有限公司',
        kind: '电能',
        value: '1879KW',
      },
      {
        name: '汉峪金谷A2-1-13F',
        time: '2019-03-12',
        en: '山东金麒麟股份有限公司',
        kind: '电能',
        value: '1675KW',
      },
      {
        name: '汉峪金谷A2-1-1201F',
        time: '2019-03-12',
        en: '山东天房伟业控股有限公司',
        kind: '电能',
        value: '1402KW',
      },
      {
        name: '汉峪金谷A2-1-13F',
        time: '2019-03-12',
        en: '山东金麒麟股份有限公司',
        kind: '电能',
        value: '1675KW',
      },
      {
        name: '汉峪金谷A2-1-1201F',
        time: '2019-03-12',
        en: '山东天房伟业控股有限公司',
        kind: '电能',
        value: '1402KW',
      },
    ];
    return (
      <Table
        size="small"
        columns={columns}
        dataSource={data}
        style={{ height: '260px' }}
        scroll={{ y: '225px', x: '700px' }}
        pagination={false}
      />
    );
  }
}
