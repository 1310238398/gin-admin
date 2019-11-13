import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { DicShow } from '@/components/Dictionary';

import PButton from '@/components/PermButton';
import styles from './VideoThirdSystemList.less';

export default class VideoThirdSystemList extends PureComponent {
  state = {
    selectedRowKeys: [],
    selectedRows: [],
    dataFormType: '',
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
      title: '三方系统',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: '厂商',
      dataIndex: 'vendor',
      width: 100,
      render: val => {
        return <DicShow pcode="OPER$#device_monitor_vendor" code={[val]} show={name => name} />;
      },
    },
  ];

  onAddClick = () => {
    const { onAddClick } = this.props;
    this.setState({ selectedRowKeys: [], selectedRows: [], dataFormType: 'A' }, () => {
      onAddClick();
    });
  };

  render() {
    const { selectedRowKeys, selectedRows } = this.state;
    const {
      pagination,
      list,
      loading,
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
      <div className={styles.VideoThirdSystemList}>
        <div className={styles.buttons}>
          <PButton
            icon="plus"
            key="add"
            code="add"
            type="primary"
            onClick={() => {
              this.onAddClick();
            }}
          >
            新增
          </PButton>
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
