import React, { PureComponent } from 'react';
import { Table } from 'antd';

import getMockData from '@/services/s_mockData';

export default class WYFCJTable extends PureComponent {
  state = {
    data: [
      {
        name: '济南左邻有限公司',
        code: 'A1-3-301',
        amount: '300.00',
      },
      {
        name: '济南左邻有限公司',
        code: 'A1-3-301',
        amount: '300.00',
      },
      {
        name: '济南左邻有限公司',
        code: 'A1-3-301',
        amount: '300.00',
      },
      {
        name: '济南左邻有限公司',
        code: 'A1-3-301',
        amount: '300.00',
      },
      {
        name: '济南左邻有限公司',
        code: 'A1-3-301',
        amount: '300.00',
      },
      {
        name: '济南左邻有限公司',
        code: 'A1-3-301',
        amount: '300.00',
      },
      {
        name: '济南左邻有限公司',
        code: 'A1-3-301',
        amount: '300.00',
      },
      {
        name: '济南左邻有限公司',
        code: 'A1-3-301',
        amount: '300.00',
      },
      {
        name: '济南左邻有限公司',
        code: 'A1-3-301',
        amount: '300.00',
      },
      {
        name: '济南左邻有限公司',
        code: 'A1-3-301',
        amount: '300.00',
      },
      {
        name: '济南左邻有限公司',
        code: 'A1-3-301',
        amount: '300.00',
      },
    ],
  };

  componentDidMount() {
    getMockData('b_park_income_qianfei').then(data => {
      this.setState({ data });
    });
  }

  render() {
    const { data } = this.state;
    const columns = [
      { title: '企业名称', dataIndex: 'name' },
      { title: '房号', dataIndex: 'code', width: '30%' },
      { title: '未交金额(元)', dataIndex: 'amount', width: '30%' },
    ];
    return [
      <Table
        key="table"
        size="small"
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 240 }}
        style={{ height: 300 }}
      />,
    ];
  }
}
