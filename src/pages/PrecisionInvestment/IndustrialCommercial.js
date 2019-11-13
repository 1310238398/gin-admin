import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { connect } from 'dva';

@connect(state => ({
  industrialCommercial: state.industrialCommercial,
}))
export default class IndustrialCommercial extends PureComponent {
  render() {
    const columns = [
      { title: '变更日期', dataIndex: 'date', width: 300 },
      { title: '变更事项', dataIndex: 'item' },
      { title: '变更前', dataIndex: 'precontent', width: 300 },
      { title: '变更后内容', dataIndex: 'content' },
    ];

    const data = [
      {
        id: '1',
        date: '2018-09-18',
        item: '地址变更（住所地址、经营场所、驻在地址等变更）',
        precontent: '安徽省合肥市庐阳区阜南路169号招行大厦12-15层',
        content: '安徽省合肥市庐阳区临泉路7363号正奇金融广场A座20-22层',
      },
      {
        id: '2',
        date: '2018-09-17',
        item: '其他事项备案',
        precontent: '无',
        content: '100000018,100000003,100000022,100000020,100000023,100000021,100000007,340000126,',
      },
      {
        id: '3',
        date: '2018-09-17',
        item: '地址变更（住所地址、经营场所、驻在地址等变更）',
        precontent: '安徽省合肥市庐阳区阜南路169号招行大厦12-15层',
        content: '安徽省合肥市庐阳区临泉路7363号正奇金融广场A座20-22层',
      },

      {
        id: '4',
        date: '2018-09-17',
        item: '地址变更（住所地址、经营场所、驻在地址等变更）',
        precontent: '安徽省合肥市庐阳区阜南路169号招行大厦12-15层',
        content: '安徽省合肥市庐阳区临泉路7363号正奇金融广场A座20-22层',
      },
      {
        id: '5',
        date: '2018-05-23',
        item: '市场主体类型变更',
        precontent: '其他有限责任公司',
        content: '其他股份有限公司(非上市)',
      },
      {
        id: '6',
        date: '2018-05-23',
        item: '	注册资本变更（或外资中方认缴资本变更）',
        precontent: '278708.948413',
        content: '300000.000000',
      },
      {
        id: '7',
        date: '2018-05-23',
        item: '其他事项备案',
        precontent:
          '联想控股股份有限公司:82.52%;达孜德善企业管理合伙企业（有限合伙）:6.3%;厦门金海峡投资有限公司:5.37%;宁波梅山保税港区道鑫辰骏投资合伙企业（有限合伙）:3.23%;西藏德真企业管理合伙企业（有限合伙）:2.55%;',
        content:
          '联想控股股份有限公司:82.52%;厦门金海峡投资有限公司:5.37%;达孜德善企业管理合伙企业（有限合伙）:6.3%;宁波梅山保税港区道鑫辰骏投资合伙企业（有限合伙）:3.23%;西藏德真企业管理合伙企业（有限合伙）:2.55%;',
      },
      {
        id: '8',
        date: '2018-05-23',
        item: '	名称变更（字号名称、集团名称等）',
        precontent: '正奇安徽金融控股有限公司',
        content: '正奇金融控股股份有限公司',
      },
      {
        id: '9',
        date: '2018-05-23',
        item: '期限变更（经营期限、营业期限、驻在期限等变更）',
        precontent: '50',
        content: '长期',
      },
    ];
    return (
      <Table
        size="small"
        columns={columns}
        dataSource={data}
        style={{ height: '520px' }}
        scroll={{ y: '450px', x: '1500px' }}
        pagination={false}
      />
    );
  }
}
