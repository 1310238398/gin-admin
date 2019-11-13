import React, { PureComponent } from 'react';
import { Badge, Icon, Table, Divider, Button } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { DicShow } from '@/components/Dictionary';
import { formatDate } from '@/utils/utils';

import PButton from '@/components/PermButton';
import styles from './List.less';
import ShowChangeTel from './ShowChangeTel';
import * as electricChargesService from '@/services/electricChanges';
@connect(state => ({
  electricPowderDetail: state.electricPowderDetail,
}))
export default class ElectricityFeeList extends PureComponent {
  state = {
    selectedRowKeys: [],
    selectedRows: [],
    showChangeTelWin: false,
    record: null,
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

  handleTableSelectRow = (selectedRowKeys, selectedRows) => {
    let keys = selectedRowKeys;
    let rows = selectedRows;
    if (selectedRowKeys.length > 1) {
      keys = [selectedRowKeys[selectedRowKeys.length - 1]];
      rows = [selectedRows[selectedRowKeys.length - 1]];
    }
    this.setState({
      selectedRowKeys: keys,
      selectedRows: rows,
    });
  };

  // 用电量详情
  onItemDetailClick = value => {
    // 跳转路由
    this.props.dispatch({
      type: 'electricPowderDetail/jumpPowder',
      payload: value,
    });
  };

  // 修改电话
  onChangeTelClick = value => {
    this.setState({ showChangeTelWin: true, record: value });
  };

  columns = () => [
    {
      title: '操作',
      key: '操作',
      width: 180,
      render: (text, record) => (
        <span>
          <a
            onClick={() => {
              this.onItemDetailClick(record);
            }}
          >
            用电量明细
          </a>
          {/* <Divider type="vertical" />
          <a
            onClick={() => {
              this.onChangeTelClick(record);
            }}
          >
            修改企业联系人电话
          </a> */}
        </span>
      ),
    },
    {
      title: '房间号',
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
      width: 150,
    },
    {
      title: '账户余额（元）',
      dataIndex: 'wallet',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'wallet',
      width: 100,
      render: val => {
        return <span>{val <= 0 ? '欠费' : '正常'}</span>;
      },
    },
    {
      title: '业主姓名',
      dataIndex: 'owner_name',
      width: 120,
      render: val => val,
    },
    {
      title: '业主电话',
      dataIndex: 'owner_tel',
      width: 140,
    },
    {
      title: '入驻企业',
      dataIndex: 'enterprise_name',
      width: 240,
    },
    {
      title: '联系电话',
      dataIndex: 'contact_tel',
      width: 100,
    },
    {
      title: '电表类型',
      dataIndex: 'etype',
      width: 100,
      render: val => {
        return <DicShow pcode="OPER$#electric_meters_type" code={[val]} show={name => name} />;
      },
    },
    {
      title: '是否允许缴费',
      dataIndex: 'payment_status',
      width: 100,
      render: val => {
        return <span>{val === 1 ? '是' : '否'}</span>;
      },
    },
    {
      title: '最后更新时间',
      dataIndex: 'updated_at',
      width: 130,
      render: val => {
        if (val) {
          return <span>{formatDate(val, 'YYYY-MM-DD')}</span>;
        } else {
          return <span>-</span>;
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

  // submitCallback
  submitCallback = data => {
    electricChargesService.changeTel(data).then(res => {
      this.setState({
        showChangeTelWin: false,
        record: null,
      });
      this.props.onChangeTel();
    });
  };

  // closeSubFrame
  closeSubFrame = () => {
    this.setState({ showChangeTelWin: false, record: null });
    // this.props.onChangeTel();
  };

  render() {
    const { selectedRowKeys, selectedRows } = this.state;
    const {
      pagination,
      list,
      loading,
      selectBuilding,
      onItemExportClick,
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
          {/* {selectBuilding !== null ? (
            <PButton
              key="exportEle"
              code="exportEle"
              onClick={() => onItemExportClick(selectedRows[0])}
            >
              导出用电量明细
            </PButton>
          ) : null} */}

          {selectedRows.length === 1 && [
            selectedRows[0].payment_status === 1 && (
              <PButton
                key="changeTel"
                code="changeTel"
                onClick={() => {
                  this.onChangeTelClick(selectedRows[0]);
                }}
              >
                修改企业联系人电话
              </PButton>
            ),
            selectedRows[0].payment_status === 1 && (
              <PButton
                key="forbidPay"
                code="forbidPay"
                icon="eye-invisible"
                type="danger"
                onClick={() => onItemUnbindClick(selectedRows[0])}
              >
                禁止缴费
              </PButton>
            ),
            selectedRows[0].payment_status === 2 && (
              <PButton
                key="allowPay"
                code="allowPay"
                icon="eye"
                type="primary"
                onClick={() => onItemBindClick(selectedRows[0])}
              >
                允许缴费
              </PButton>
            ),
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
          scroll={{ x: 'calc(600px + 100%)', y: 340 }}
        />
        {this.state.showChangeTelWin && (
          <ShowChangeTel
            onCancel={this.closeSubFrame}
            data={this.state.record}
            onSubmit={this.submitCallback}
          />
        )}
      </div>
    );
  }
}
