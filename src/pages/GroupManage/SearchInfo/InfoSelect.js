import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Table } from 'antd';
import { parseUtcTime } from '../../../utils/utils';
import { InfoSearch, InfoStatus } from '../../../components/Info';
import { OrgShow } from '../../../components/Org';
import UserShow from '../../../components/UserShow';

@connect(state => ({
  groupInfoSelect: state.groupInfoSelect,
  groupInfo: state.groupInfo,
}))
@Form.create()
export default class InfoSelect extends PureComponent {
  componentDidMount() {
    const {
      groupInfo: { groupId },
    } = this.props;
    this.props.dispatch({
      type: 'groupInfoSelect/saveSearch',
      payload: {},
    });
    this.props.dispatch({
      type: 'groupInfoSelect/fetch',
      groupId,
      payload: { status: 5 },
      pagination: {},
    });
  }

  onItemViewClick = () => {
    // const { info_id } = item;
    // console.log(item);
  };

  onTableChange = pagination => {
    const {
      groupInfo: { groupId },
    } = this.props;
    this.props.dispatch({
      type: 'groupInfoSelect/fetch',
      groupId,
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  onSearch = formData => {
    const {
      groupInfo: { groupId },
    } = this.props;
    this.props.dispatch({
      type: 'groupInfoSelect/fetch',
      groupId,
      payload: formData,
    });
  };

  render() {
    const {
      groupInfoSelect: {
        loading,
        data: { list, pagination },
      },
      onSelectChange,
    } = this.props;

    const columns = [
      {
        title: '标题',
        dataIndex: 'desc.title',
        width: 300,
        render: (val, record) => {
          return <span onClick={this.onItemViewClick(record)}>{val}</span>;
        },
      },
      {
        title: '所属栏目',
        dataIndex: 'desc.column_name',
        width: 200,
      },
      {
        title: '所属组织',
        dataIndex: 'desc.org',
        width: 200,
        render: val => {
          return <OrgShow value={val} />;
        },
      },
      {
        title: '所属个人',
        dataIndex: 'desc.owner',
        width: 100,
        render: val => {
          return <UserShow uid={val} />;
        },
      },
      {
        title: '状态',
        dataIndex: 'status.status',
        width: 100,
        render: val => {
          return <InfoStatus code={val} />;
        },
      },
      {
        title: '创建用户',
        dataIndex: 'operator.creator_name',
        width: 100,
      },
      {
        title: '创建时间',
        dataIndex: 'operator.cre_time',
        width: 200,
        render: val => {
          return <span> {parseUtcTime(val)} </span>;
        },
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => {
        return <span> 共 {total}条 </span>;
      },
      ...pagination,
    };
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        onSelectChange(selectedRowKeys, selectedRows);
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      fixed: true,
      getCheckboxProps: ({ selected }) => {
        return {
          disabled: !!selected,
        };
      },
    };
    return (
      <Card bordered={false}>
        <InfoSearch onSearch={this.onSearch} hide={{ status: 1 }} searchObj={{ status: [5] }} />
        <Table
          rowSelection={rowSelection}
          loading={loading}
          rowKey={record => record.info_id}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.onTableChange}
          scroll={{ x: 1500, y: 400 }}
        />
      </Card>
    );
  }
}
