import React, { PureComponent } from 'react';
import { Badge, Icon, Table } from 'antd';
import { DicShow } from '@/components/Dictionary';

import PButton from '@/components/PermButton';
import styles from './List.less';

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

  handleTableSelectRow= (selectedRowKeys, selectedRows) => {
    let keys = selectedRowKeys;
    let rows = selectedRows;
    if (selectedRowKeys.length > 1) {
      keys = [selectedRowKeys[selectedRowKeys.length-1]];
      rows = [selectedRows[selectedRowKeys.length-1]];
    }
    this.setState({
      selectedRowKeys: keys,
      selectedRows: rows,
    });
  };

  columns = () => [
    {
      title: '电表位置',
      dataIndex: 'building_name',
      width: 120,
      render: val => {
        if (val === '') {
          return <Badge color="red" text="未绑定" />;
        } else {
          return val;
        }
      },
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
    {
      title: '电表地址',
      dataIndex: 'meter_addr',
      width: 120,
      render: val => val,
    },
    {
      title: '账户余额',
      dataIndex: 'wallet',
      width: 140,
      render: val => <Badge color={val <= 0 ? 'red' : 'green'} text={`${val} 元`} />,
    },
    {
      title: '电表类型',
      dataIndex: 'etype',
      width: 100,
      render: val => {
        return <DicShow pcode="OPER$#electric_meters_type" code={[val]} show={name => name} />;
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
      onItemReverseClick,
      onItemUnbindClick,
      onItemBindClick,
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
              添加电表
            </PButton>
          ) : null}
          {selectedRows.length === 1 && [
            <PButton
              icon="transaction"
              key="reverse"
              code="reverse"
              type="danger"
              onClick={() => onItemReverseClick(selectedRows[0])}
            >
              电表冲正
            </PButton>,
            <PButton
              key="edit"
              code="edit"
              icon="edit"
              onClick={() => onItemEditClick(selectedRows[0])}
            >
              编辑电表
            </PButton>,
            <PButton
              key="unbind"
              code="unbind"
              icon="eye-invisible"
              type="danger"
              onClick={() => onItemUnbindClick(selectedRows[0])}
            >
              解除绑定
            </PButton>,
            <PButton
              key="bind"
              code="bind"
              icon="eye"
              type="primary"
              onClick={() => onItemBindClick(selectedRows[0])}
            >
              重新绑定
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
