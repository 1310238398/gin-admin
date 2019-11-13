import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Modal, Button, InputNumber } from 'antd';
import { parseUtcTime } from '../../utils/utils';
import TableList from '../../components/TableList';

const ButtonGroup = Button.Group;
@connect(state => ({
  groupInfo: state.groupInfo,
}))
@Form.create()
export default class TableInfoList extends PureComponent {
  state = {
    selectedRows: [],
  };

  onItemViewClick = () => {
    // const { info_id } = item;
    // console.log(item);
  };

  onDelOKClick = (groupid, infoids) => {
    this.props.dispatch({
      type: 'groupInfo/del',
      groupid,
      infoids,
    });
  };

  onItemDelClick = recoder => {
    Modal.confirm({
      title: '确定删除该数据吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDelOKClick.bind(this, recoder.group_id, [recoder.info_id]),
    });
  };

  onItemUpdateWeightClick = recoder => {
    this.weight = recoder.weight;
    Modal.confirm({
      title: '请输入权重',
      content: (
        <InputNumber
          defaultValue={this.weight}
          onChange={v => {
            this.weight = v;
          }}
        />
      ),
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.props.dispatch({
          type: 'groupInfo/updateWeight',
          groupid: recoder.group_id,
          giid: recoder.giid,
          weight: this.weight,
        });
      },
    });
  };

  onDeleteInfos = () => {
    const { selectedRows } = this.state;
    let gid = '';
    if (selectedRows && selectedRows.length > 0) {
      gid = selectedRows[0].group_id;
    }
    const infoids = selectedRows.map(item => item.info_id);
    this.props.dispatch({
      type: 'groupInfo/del',
      groupid: gid,
      infoids,
    });
  };

  onBatchDelClick = () => {
    Modal.confirm({
      title: '确定批量删除数据吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDeleteInfos.bind(this),
    });
  };

  creOps = () => {
    return [
      {
        key: 'del',
        icon: 'delete',
        name: '删除',
        handler: this.onItemDelClick,
      },
      {
        key: 'weight',
        icon: 'colum-height',
        name: '修改权重',
        handler: this.onItemUpdateWeightClick,
      },
    ];
  };

  render() {
    const { list, pagination, loading, onPageChange, onAddHandler, onRow } = this.props;
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        width: 300,
        render: (val, record) => {
          return <span onClick={this.onItemViewClick(record)}>{val}</span>;
        },
      },
      {
        title: '权重',
        dataIndex: 'weight',
        width: 70,
      },
      {
        title: '所属栏目',
        dataIndex: 'column_name',
        width: 200,
      },
      {
        title: '发布时间',
        dataIndex: 'publish_time',
        width: 200,
        render: val => {
          return <span> {parseUtcTime(val)} </span>;
        },
      },
    ];
    const rowSelection = {
      onChange: (_, selectedRows) => {
        this.setState({ selectedRows });
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };
    const { selectedRows } = this.state;
    const deleteDisabled = !selectedRows || selectedRows.length === 0;
    return (
      <TableList
        onRow={onRow}
        loading={loading}
        rowSelection={rowSelection}
        ops={this.creOps()}
        title={() => (
          <ButtonGroup>
            <Button icon="plus" key="a" type="primary" onClick={onAddHandler}>
              手动添加
            </Button>
            <Button icon="delete" key="b" onClick={this.onBatchDelClick} disabled={deleteDisabled}>
              批量删除
            </Button>
          </ButtonGroup>
        )}
        rowKey={record => record.info_id}
        dataSource={list}
        columns={columns}
        pagination={pagination}
        onChange={onPageChange}
      />
    );
  }
}
