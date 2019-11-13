import React, { PureComponent } from 'react';
import { Table, Tag, Alert } from 'antd';

import PButton from '@/components/PermButton';
import styles from './List.less';

export default class extends PureComponent {
  state = {
    selectedRowKeys: [],
    selectedRows: [],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list) {
      this.setState({
        selectedRowKeys: [],
        selectedRows: [],
      });
    }
    return true;
  }

  handleTableSelectRow = (keys, rows) => {
    this.setState({
      selectedRowKeys: keys,
      selectedRows: rows,
    });
  };

  columns = () => [
    {
      title: '企业名称',
      dataIndex: 'name',
      width: 400,
      render: val => val,
    },
    {
      title: '抬头信息',
      dataIndex: 'taxs',
      width: 440,
      render: val => {
        if (val.length === 0) {
          return '暂无抬头信息';
        } else {
          return val.map(tax => {
            return (
              <Alert
                key={tax.record_id}
                message={[
                  <div key={`${tax.record_id}-invoice_name`}>
                    <b>抬头</b>：{tax.invoice_name}
                  </div>,
                  <div key={`${tax.record_id}-invoice_number`}>
                    <b>税号</b>：{tax.invoice_number}
                  </div>,
                  <div key={`${tax.record_id}-bank_account`}>
                    <b>开户行及账户</b>：{tax.bank_account}
                  </div>,
                ]}
              />
            );
          });
        }
      },
    },
    {
      title: '房间号',
      dataIndex: 'rooms',
      width: 200,
      render: val => {
        if (val.length === 0) {
          return '暂无抬头信息';
        } else {
          return val.map(room => {
            return <Tag key={room}>{room}</Tag>;
          });
        }
      },
    },
  ];

  onAddClick = () => {
    const { onAddClick } = this.props;
    this.setState({ selectedRowKeys: [], selectedRows: [] }, () => {
      onAddClick();
    });
  };

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
              key="edit"
              code="edit"
              icon="edit"
              onClick={() => onItemEditClick(selectedRows[0])}
            >
              编辑抬头
            </PButton>
          )}
        </div>
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: this.handleTableSelectRow,
          }}
          scroll={{ x: 800, y: true }}
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
