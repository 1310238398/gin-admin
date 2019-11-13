import React, { PureComponent } from 'react';
import { Table } from 'antd';

import MemberDialog from './MemberDialog';
import getMockData from '@/services/s_mockData';
import { Record } from 'immutable';

export default class MemberTable extends PureComponent {
  state = {
    visible: false,
    data: null,
    merbernData: [
      {
        postion: 'A1',
        type: '访客',
        name: '王立钟',
        tel: '13065007223',
        action: 'A3-5 2#闸机',
        time: '03-13 10:00',
      },
    ],
  };

  componentDidMount() {
    getMockData('e_enter_time_current').then(data => {
      const list = data || [];

      this.list = list.map(v => {
        return {
          ...v,
          count: parseFloat(v.count, 10),
        };
      });

      this.setState({ merbernData: this.list });
    });
  }

  handleRowClick = rec => {
    this.setState({ visible: true, data: rec });
  };

  render() {
    const { visible } = this.state;

    const columns = [
      { title: '设备位置', dataIndex: 'postion' },
      { title: '用户类型', dataIndex: 'type' },
      { title: '姓名', dataIndex: 'name' },
      // { title: '用户行为', dataIndex: 'action' },
      { title: '时间', dataIndex: 'time' },
    ];

    // const data = [
    //   {
    //     postion: 'A1',
    //     name: '王立钟',
    //     tel: '13065007223',
    //     action: 'A3-5 2#闸机',
    //     time: '03-13 10:00',
    //   },
    //   {
    //     name: '陈云雪',
    //     tel: '13065007224',
    //     action: 'A3-5 5#闸机',
    //     time: '03-13 10:05',
    //   },
    //   {
    //     name: '严飞',
    //     tel: '13065007225',
    //     action: 'A3-5 5#电梯',
    //     time: '03-13 11:05',
    //   },
    //   {
    //     name: '赵爱国',
    //     tel: '13065007226',
    //     action: 'A3-5 1#电梯',
    //     time: '03-13 12:05',
    //   },
    //   {
    //     name: '刘琪琪',
    //     tel: '13065007227',
    //     action: 'A3-5 5#闸机',
    //     time: '03-13 13:05',
    //   },
    //   {
    //     name: '严飞',
    //     tel: '13065007225',
    //     action: 'A3-5 7#电梯',
    //     time: '03-13 11:05',
    //   },
    //   {
    //     name: '赵爱国',
    //     tel: '13065007226',
    //     action: 'A3-5 6#电梯',
    //     time: '03-13 12:05',
    //   },
    //   {
    //     name: '刘琪琪',
    //     tel: '13065007227',
    //     action: 'A3-5 1#闸机',
    //     time: '03-13 13:05',
    //   },
    //   {
    //     name: '严飞',
    //     tel: '13065007225',
    //     action: 'A3-5 8#电梯',
    //     time: '03-13 11:05',
    //   },
    //   {
    //     name: '严飞',
    //     tel: '13065007225',
    //     action: 'A3-5 1#电梯',
    //     time: '03-13 11:05',
    //   },
    //   {
    //     name: '赵爱国',
    //     tel: '13065007226',
    //     action: 'A3-5 4#电梯',
    //     time: '03-13 12:05',
    //   },
    //   {
    //     name: '刘琪琪',
    //     tel: '13065007227',
    //     action: 'A3-5 4#闸机',
    //     time: '03-13 13:05',
    //   },
    //   {
    //     name: '刘琪琪',
    //     tel: '13065007227',
    //     action: 'A3-5 3#闸机',
    //     time: '03-13 13:05',
    //   },
    //   {
    //     name: '严飞',
    //     tel: '13065007225',
    //     action: 'A3-5 7#电梯',
    //     time: '03-13 11:05',
    //   },
    //   {
    //     name: '严飞',
    //     tel: '13065007225',
    //     action: 'A3-5 2#电梯',
    //     time: '03-13 11:05',
    //   },
    //   {
    //     name: '赵爱国',
    //     tel: '13065007226',
    //     action: 'A3-5 6#电梯',
    //     time: '03-13 12:05',
    //   },
    //   {
    //     name: '刘琪琪',
    //     tel: '13065007227',
    //     action: 'A3-5 4#闸机',
    //     time: '03-13 13:05',
    //   },
    // ];
    return [
      <Table
        key="table"
        size="small"
        columns={columns}
        dataSource={this.state.merbernData}
        pagination={false}
        // scroll={{ y: 600}}
        style={{ height: 678 }}
        onRow={record => {
          return {
            onClick: () => {
              this.handleRowClick(record);
            },
          };
        }}
      />,
      visible && (
        <MemberDialog
          key="member"
          visible={visible}
          onCancel={() => {
            this.setState({ visible: false });
          }}
          MEemberData={this.state.data}
        />
      ),
    ];
  }
}
