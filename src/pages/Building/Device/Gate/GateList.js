import React, { PureComponent } from 'react';
import { Icon, Table } from 'antd';
import { DicShow } from '@/components/Dictionary';

import PButton from '@/components/PermButton';
import styles from './GateList.less';

export default class GateList extends PureComponent {
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
      title: '门禁位置',
      dataIndex: 'building_name',
      width: 100,
    },
    {
      title: '门禁类型',
      dataIndex: 'device_type',
      width: 100,
      render: val => {
        return <DicShow pcode="OPER$#entrance_category" code={[val]} show={name => name} />;
      },
    },
    {
      title: '厂商标记',
      dataIndex: 'vendor_id',
      width: 100,
      render: val => {
        return <DicShow pcode="OPER$#device_vendor" code={[val]} show={name => name} />;
      },
    },
    {
      title: '门禁唯一序列号',
      dataIndex: 'serial',
      width: 100,
    },
    {
      title: '设备名称',
      dataIndex: 'name',
      width: 250,
      render: (val, record) => {
        if (record.flag === 1) {
          return (
            <React.Fragment>
              <span>{val}</span>
              <Icon type="fire" styles={{ color: 'red' }} />
            </React.Fragment>
          );
        }
        return <span>{val}</span>;
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
    const {
      pagination,
      list,
      loading,
      selectBuilding,
      onItemEditClick,
      onItemMigrationClick,
      onTableChange,
    } = this.props;

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
          {selectBuilding !== null ? (
            <PButton
              icon="plus"
              key="add"
              code="add"
              type="primary"
              onClick={() => {
                this.onAddClick();
              }}
            >
              新增设备
            </PButton>
          ) : null}
          {selectedRows.length === 1 && [
            <PButton
              key="edit"
              code="edit"
              icon="edit"
              onClick={() => onItemEditClick(selectedRows[0])}
            >
              编辑
            </PButton>,
            <PButton
              key="del"
              code="del"
              icon="delete"
              type="danger"
              onClick={() => onItemMigrationClick(selectedRows[0])}
            >
              删除
            </PButton>,
          ]}
        </div>
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: this.handleTableSelectRow,
          }}
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
