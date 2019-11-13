import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Button, Select, Table, Modal } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { SearchCard, SearchItem } from '../../components/SearchCard';
// import { DicSelect, DicShow } from '@/components/Dictionary';
import { parseUtcTime } from '../../utils/utils';
import PButton from '@/components/PermButton';
import ParkSelect from '@/components/ParkList/ParkSelect';
import NotifListCard from './NotifListCard';
import NotifListCardEdit from './NotifListCardEdit';
import NotifListView from './NotifListView';
import styles from './NotifList.less';
@connect(state => ({
  notifList: state.notifList,
  loading: state.loading.models.notifList,
}))
@Form.create()
export default class NotifList extends PureComponent {
  state = {
    dataForm: false,
    dataInfo: false,
    dataInfoID: '',
    dataType: '',
    selectedRows: [],
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'infoManage/saveSearch',
      payload: {},
    });
    this.props.dispatch({
      type: 'notifList/queryList',
      search: {},
      pagination: {},
    });
  }

  onTableChange = pagination => {
    this.props.dispatch({
      type: 'notifList/queryList',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  onSearchFormSubmit = formData => {
    this.props.dispatch({
      type: 'notifList/queryList',
      payload: formData,
      pagination: {},
    });
  };

  onResetFormClick = () => {
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'notifList/queryList',
      payload: {},
      pagination: {},
    });
    this.clearSelectRows();
  };

  clearSelectRows = () => {
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys.length === 0) {
      return;
    }
    this.setState({ selectedRowKeys: [], selectedRows: [] });
  };

  onAddClick = () => {
    this.setState({ dataForm: true, dataFormID: '', dataFormType: 'A' });
  };

  onItemDetailClick = item => {
    this.setState({ dataForm: true, dataFormID: item.record_id, dataFormType: 'V' });
  };

  // 删除
  onItemDeleClick = item => {
    Modal.confirm({
      title: `确定删除此通知吗？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDeleOKClick.bind(this, item.record_id),
    });
  };

  // 编辑
  onItemEditClick = item => {
    this.setState({ dataForm: true, dataFormID: item.record_id, dataFormType: 'E' });
  };
  // 编辑只是修改发布状态

  onItemEditDataClick = item => {
    Modal.confirm({
      title: `确定发布此通知吗？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onPulishOKClick.bind(this, item.record_id),
    });
  };

  onPulishOKClick = data => {
    this.props.dispatch({
      type: 'notifList/publishNote',
      payload: data,
    });
    this.clearSelectRows();
  };

  onDeleOKClick = data => {
    this.props.dispatch({
      type: 'notifList/deleNote',
      payload: data,
    });
    this.clearSelectRows();
  };

  onDataFormCallback = result => {
    if (this.state.dataFormType === 'A' || this.state.dataFormType === 'E') {
      this.props.dispatch({
        type: 'notifList/queryList',
        payload: {},
      });
    }
    this.setState({ dataForm: false, dataFormID: '' });
    if (result && result === 'ok') {
      this.props.dispatch({
        type: 'notifList/queryList',
      });
    }
    if (this.state.dataFormType === 'E') {
      this.clearSelectRows();
    }
  };

  handleTableSelectRow = (keys, rows) => {
    this.setState({
      selectedRowKeys: keys,
      selectedRows: rows,
    });
  };

  renderDataForm() {
    if (this.state.dataForm) {
      if (this.state.dataFormType === 'A') {
        return (
          <NotifListCard
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            callback={this.onDataFormCallback}
          />
        );
      } else if (this.state.dataFormType === 'V') {
        return (
          <NotifListView
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            callback={this.onDataFormCallback}
          />
        );
      } else if (this.state.dataFormType === 'E') {
        return (
          <NotifListCardEdit
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            callback={this.onDataFormCallback}
          />
        );
      }
    }
  }

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      //  查询条件表单，点击保存按钮，触发函数onSearchFormSubmit
      <SearchCard
        form={this.props.form}
        onSearch={this.onSearchFormSubmit}
        onReset={this.onResetFormClick}
      >
        <SearchItem label="园区">{getFieldDecorator('park')(<ParkSelect />)}</SearchItem>
        <SearchItem label="状态">
          {getFieldDecorator('status')(
            <Select placeholder="请选择">
              <Select.Option value="1">已发布</Select.Option>
              <Select.Option value="2">未发布</Select.Option>
            </Select>
          )}
        </SearchItem>
      </SearchCard>
    );
  }

  render() {
    const {
      loading,
      notifList: {
        data: { list, pagination },
      },
    } = this.props;
    // 新增类型
    const { selectedRowKeys, selectedRows } = this.state;
    const columns = [
      {
        title: '园区',
        dataIndex: 'park_name',
        width: 120,
      },
      {
        title: '标题',
        dataIndex: 'title',
        width: 350,
      },
      {
        title: '概述',
        dataIndex: 'summary',
        width: 200,
      },
      {
        title: '发布时间',
        dataIndex: 'publish_time',
        width: 100,
        render: val => {
          if(val!=null){
            return <span> {parseUtcTime(val)} </span>;
          }else{
            return <span>未知</span>
          }
         
        },
      },
      {
        title: '发布状态',
        dataIndex: 'status',
        width: 100,
        render: val => {
          return <span>{val === 1 ? '已发布' : '未发布'}</span>;
        },
      },
    ];

    const paginationProps = {
      ...pagination,
    };

    return (
      <PageHeaderLayout title="通知发布">
        <Card bordered={false}>
          <div className={styles.tableList}>
            {this.renderSearchForm()}
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.onAddClick()}>
                新增通知
              </Button>
              {selectedRows.length === 1 && [
                <PButton
                  key="query"
                  code="query"
                  icon="eye-visible"
                  onClick={() => this.onItemDetailClick(selectedRows[0])}
                >
                  查看
                </PButton>,
                // <PButton
                //   key="edit"
                //   code="edit"
                //   icon="edit"
                //   onClick={() => this.onItemEditClick(selectedRows[0])}
                // >
                //   编辑
                // </PButton>,
                <PButton
                  key="edit"
                  code="edit"
                  icon="edit"
                  onClick={() => this.onItemEditDataClick(selectedRows[0])}
                >
                  发布
                </PButton>,

                // selectedRows[0].status === 2 && (
                <PButton
                  key="delete"
                  code="delete"
                  icon="delete"
                  type="danger"
                  onClick={() => this.onItemDeleClick(selectedRows[0])}
                >
                  删除
                </PButton>,
                // ),
              ]}
            </div>
            <div>
              <Table
                rowSelection={{
                  selectedRowKeys,
                  onChange: this.handleTableSelectRow,
                }}
                loading={loading}
                rowKey={record => record.record_id}
                dataSource={list}
                columns={columns}
                pagination={paginationProps}
                scroll={{ x: 1450 }}
                onChange={this.onTableChange}
              />
            </div>
          </div>
        </Card>
        {this.renderDataForm()}
      </PageHeaderLayout>
    );
  }
}
