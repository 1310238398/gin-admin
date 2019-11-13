import React, { PureComponent } from 'react';
import { Badge, Table } from 'antd';

import moment from 'moment';
import PButton from '@/components/PermButton';
import styles from './List.less';

export default class GateList extends PureComponent {
  state = {
    selectedRowKeys: [],
    selectedRows: [],
  };

  handleTableSelectRow = (keys, rows) => {
    this.setState({
      selectedRowKeys: keys,
      selectedRows: rows,
    });
  };

  columns = () => [
    {
      title: '房间号',
      dataIndex: 'room_name',
      width: 100,
      render: val => val,
    },
    {
      title: '电表名称',
      dataIndex: 'electric_meter_name',
      width: 160,
      render: val => val,
    },
    {
      title: '电表地址(电表号)',
      dataIndex: 'electric_meter_addr',
      width: 150,
      render: val => val,
    },
    {
      title: '充值金额',
      dataIndex: 'amount',
      width: 100,
      render: val => `${(val / 100).toFixed(2)} 元`,
    },
    {
      title: '充值状态',
      dataIndex: 'third_status',
      width: 100,
      render: val => {
        return {
          0: <Badge color="red" text="未支付" />,
          1: <Badge color="yellow" text="超时" />,
          2: <Badge color="green" text="成功" />,
          3: <Badge color="red" text="失败" />,
        }[val];
      },
    },
    {
      title: '退费状态',
      dataIndex: 'is_payback',
      width: 100,
      render: val => {
        switch (val) {
          case 0:
            return <Badge color="green" text="未退费" />;
          case 1:
            return <Badge color="red" text="已退费" />;
          default:
            return <Badge color="green" text="未退费" />;
        }
      },
    },
    {
      title: '充值人',
      dataIndex: 'creator_name',
      width: 100,
      render: val => val,
    },
    {
      title: '充值人手机号',
      dataIndex: 'creator_tel',
      width: 120,
      render: val => val,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      width: 240,
      render: val => moment(val).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  render() {
    const { selectedRowKeys, selectedRows } = this.state;
    const { pagination, list, loading, onItemEditClick, onTableChange } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => {
        return <span>共{total}条</span>;
      },
      ...pagination,
    };
    return (
      <div className={styles.gateList}>
        <div className={styles.buttons}>
          {selectedRows.length === 1 && (
            <PButton
              key="recharge"
              code="recharge"
              type="primary"
              onClick={() => onItemEditClick(selectedRows[0])}
            >
              重新充值
            </PButton>
          )}
        </div>
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: this.handleTableSelectRow,
          }}
          scroll={{ x: true, y: true }}
          loading={loading}
          rowKey={record => record.record_id}
          dataSource={list}
          columns={this.columns()}
          pagination={paginationProps}
          onChange={onTableChange}
        />
      </div>
    );
  }
}
