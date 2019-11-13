import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Button, Modal } from 'antd';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import { parseUtcTime } from '@/utils/utils';
import { ColumnStatus, ColumnSearch, ColumnEdit, ColumnCard } from '@/components/Column';
import TableList from '@/components/TableList';
import UserShow from '@/components/UserShow';
import { OrgShow } from '@/components/Org';

@connect(state => ({
  columnManage: state.columnManage,
  loading: state.loading.models.columnManage,
}))
@Form.create()
export default class ColumnManageList extends PureComponent {
  state = {
    // detailVisible: false,
    // detailData: '',
    dataFormID: '',
    step: -1,
    dataDetail: false,
    dataColumnID: '',
    //  org: '',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'columnManage/saveSearch',
      payload: { status: [0, 1] },
    });
    this.props.dispatch({
      type: 'columnManage/fetch',
    });
    this.refreshTree();
  }

  // onItemViewClick = (item) => {
  //   this.setState({
  //     detailVisible: true,
  //     detailData: JSON.stringify(JSON.parse(item.data), null, ' '),
  //   });
  // };

  // onDetailModalCancelClick = () => {
  //   this.setState({ detailVisible: false });
  // };
  onOrgChange = org => {
    this.setState({ value: org.target.value });
    this.props.dispatch({
      type: 'columnManage/queryColumnTree',
      org: org.target.value,
    });
  };

  onTableChange = pagination => {
    this.props.dispatch({
      type: 'columnManage/fetch',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  onResetFormClick = () => {
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'columnManage/saveSearch',
      payload: {},
    });
    this.refreshTree();
    this.props.dispatch({
      type: 'columnManage/fetch',
    });
  };

  onTableChange = pagination => {
    this.props.dispatch({
      type: 'columnManage/fetch',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  onSearchFormSubmit = formData => {
    this.props.dispatch({
      type: 'columnManage/fetch',
      payload: formData,
    });
  };

  onDataFormCallback = result => {
    if (result && result === 'ok') {
      this.props.dispatch({
        type: 'columnManage/fetch',
      });
      this.refreshTree();
    }
    this.showStep(-1);
  };

  onDataDetailCallback = () => {
    this.setState({ dataDetail: false, dataColumnID: '', step: -1 });
  };

  onItemDetailClick = id => {
    this.setState({ dataDetail: true, dataColumnID: id });
  };

  onAddClick = () => {
    this.setState({ dataFormID: '' }, () => {
      this.showStep(0);
    });
  };

  onItemDescClick = columnid => {
    this.setState({ dataFormID: columnid }, () => {
      this.showStep(0);
    });
  };

  onItemCtrlClick = columnid => {
    this.setState({ dataFormID: columnid }, () => {
      this.showStep(1);
    });
  };

  onItemExtraClick = columnid => {
    this.setState({ dataFormID: columnid }, () => {
      this.showStep(2);
    });
  };

  onDelOKClick = id => {
    this.props.dispatch({
      type: 'columnManage/del',
      payload: id,
    });
    this.refreshTree();
  };

  onItemDeleteClick = columnid => {
    Modal.confirm({
      title: '确定删除该数据吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDelOKClick.bind(this, columnid),
    });
  };

  onItemLockClick = columnid => {
    Modal.confirm({
      title: '确定锁定该栏目吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.props.dispatch({
          type: 'columnManage/lock',
          payload: columnid,
        });
        this.refreshTree();
      },
    });
  };

  onItemUnLockClick = columnid => {
    Modal.confirm({
      title: '确定解锁该栏目吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.props.dispatch({
          type: 'columnManage/unlock',
          payload: columnid,
        });
        this.refreshTree();
      },
    });
  };

  onItemRecoverClick = columnid => {
    Modal.confirm({
      title: '确定要恢复栏目吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.props.dispatch({
          type: 'columnManage/recover',
          payload: columnid,
        });
        this.refreshTree();
      },
    });
  };

  onItemDestroyClick = columnid => {
    Modal.confirm({
      title: '确定彻底删除该栏目吗？彻底删除后不能恢复。',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.props.dispatch({
          type: 'columnManage/destroy',
          payload: columnid,
        });
        this.refreshTree();
      },
    });
  };

  showStep = step => {
    this.setState({ step });
    // this.props.dispatch({
    //   type: 'columnManage/saveStep',
    //   payload: step,
    // });
    // this.props.dispatch({
    //   type: 'columnManage/changeFormVisible',
    //   payload: true,
    // });
  };

  refreshTree = () => {
    this.props.dispatch({
      type: 'columnManage/queryColumnTree',
      org: this.state.value,
    });
  };

  creOps = record => {
    const out = [];
    if (record.status.status === 0) {
      out.push({
        icon: 'edit',
        name: '修改描述',
        handler: () => this.onItemDescClick(record.column_id),
      });
    }

    if (record.status.status === 0) {
      out.push({
        icon: 'edit',
        name: '控制参数',
        handler: () => this.onItemCtrlClick(record.column_id),
      });
    }
    if (record.status.status === 0) {
      out.push({
        icon: 'edit',
        name: '扩展属性',
        handler: () => this.onItemExtraClick(record.column_id),
      });
    }
    if (record.status.status === 0) {
      out.push({
        icon: 'delete',
        name: '删除',
        handler: () => this.onItemDeleteClick(record.column_id),
      });
    }
    if (record.status.status === 0) {
      out.push({
        icon: 'lock',
        name: '锁定',
        handler: () => this.onItemLockClick(record.column_id),
      });
    }
    if (record.status.status === 1) {
      out.push({
        icon: 'unlock',
        name: '解锁',
        handler: () => this.onItemUnLockClick(record.column_id),
      });
    }
    if (record.status.status === -1) {
      out.push({
        icon: 'reload',
        name: '恢复',
        handler: () => this.onItemRecoverClick(record.column_id),
      });
    }

    if (record.status.status === -1) {
      out.push({
        icon: 'close',
        name: '彻底删除',
        handler: () => this.onItemDestroyClick(record.column_id),
      });
    }
    return out;
  };

  renderDataForm = () => {
    if (this.state.step > -1) {
      return (
        <ColumnEdit
          columnId={this.state.dataFormID}
          step={this.state.step}
          callback={this.onDataFormCallback}
        />
      );
    }
  };

  renderDataDetail = () => {
    if (this.state.dataDetail) {
      return (
        <ColumnCard id={this.state.dataColumnID} callback={this.onDataDetailCallback} visible />
      );
    }
  };

  render() {
    const {
      loading,
      columnManage: {
        data: { list, pagination },
      },
    } = this.props;

    const columns = [
      {
        title: '栏目名称',
        dataIndex: 'desc.name',
        width: 150,
      },
      {
        title: '短名称',
        dataIndex: 'desc.short_name',
        width: 100,
      },
      {
        title: '状态',
        dataIndex: 'status.status',
        // width: 100,
        render: val => {
          return <ColumnStatus code={val} />;
        },
      },
      {
        title: '所属组织',
        dataIndex: 'desc.org',
        width: 150,
        render: val => {
          return <OrgShow value={val} />;
        },
      },
      {
        title: '栏目类型',
        dataIndex: 'desc.kind',
        width: 100,
        render: val => {
          let title = '';
          if (val === 0) {
            title = '一般栏目';
          }
          if (val === 1) {
            title = '系统栏目';
          }
          if (val === 2) {
            title = '专题栏目';
          }
          if (val === 3) {
            title = '交流互动';
          }
          return <span>{title}</span>;
        },
      },
      {
        title: '创建用户',
        dataIndex: 'operator.creator',
        width: 100,
        render: val => {
          return <UserShow uid={val} />;
        },
      },
      {
        title: '创建时间',
        dataIndex: 'operator.cre_time',
        width: 200,
        render: val => {
          return <span>{parseUtcTime(val)}</span>;
        },
      },
    ];

    return (
      <PageHeaderLayout title="栏目管理">
        <Card bordered={false}>
          <ColumnSearch onSearch={this.onSearchFormSubmit} />
          <TableList
            loading={loading}
            ops={this.creOps}
            title={() => (
              <Button icon="plus" type="primary" onClick={() => this.onAddClick()}>
                新建
              </Button>
            )}
            rowKey={record => record.column_id}
            dataSource={list}
            columns={columns}
            pagination={pagination}
            onChange={this.onTableChange}
            scroll={{ x: 1000 }}
            onRow={record => {
              return {
                onClick: () => {
                  this.onItemDetailClick(record.column_id);
                },
              };
            }}
          />
        </Card>

        {this.renderDataForm()}
        {this.renderDataDetail()}
      </PageHeaderLayout>
    );
  }
}
