import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Button, Modal, Badge } from 'antd';
import { parseUtcTime } from '../../utils/utils';
import { ColumnSearch, ColumnEdit, ColumnCard } from '../../components/Column';
import TableList from '@/components/TableList';

@connect(state => ({
  boardManage: state.boardManage,
  boardColumn: state.boardColumn,
  loading: state.loading.models.boardColumn,
}))
@Form.create()
export default class BoardColumnsManage extends PureComponent {
  state = {
    // detailVisible: false,
    // detailData: '',
    dataFormID: '',
    //  org: '',

    dataDetail: false,
    dataColumnID: '',
    searchObj: { status: [0, 1], org: '', range: 1 },
  };

  componentDidMount() {
    const { orgid } = this.props;
    this.props.dispatch({
      type: 'boardColumn/saveOrgid',
      payload: orgid,
    });
    const { searchObj } = this.state;
    searchObj.org = orgid;
    this.setState({ searchObj });
    this.props.dispatch({
      type: 'boardColumn/saveSearch',
      payload: { ...searchObj },
    });
    this.props.dispatch({
      type: 'boardColumn/fetch',
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

  onTableChange = pagination => {
    this.props.dispatch({
      type: 'boardColumn/fetch',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  onResetFormClick = () => {
    const { orgid } = this.props;
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'boardColumn/saveSearch',
      payload: { status: [0, 1], org: orgid, range: 1 },
    });
    this.refreshTree();
    this.props.dispatch({
      type: 'boardColumn/fetch',
    });
  };

  onSearchFormSubmit = formData => {
    const { orgid } = this.props;
    const data = { ...formData };
    data.org = orgid;
    data.range = 1;
    this.props.dispatch({
      type: 'boardColumn/fetch',
      payload: data,
    });
  };

  onDataFormCallback = result => {
    if (result && result === 'ok') {
      this.props.dispatch({
        type: 'boardColumn/fetch',
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
      type: 'boardColumn/del',
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
          type: 'boardColumn/lock',
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
          type: 'boardColumn/unlock',
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
          type: 'boardColumn/recover',
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
          type: 'boardColumn/destroy',
          payload: columnid,
        });
        this.refreshTree();
      },
    });
  };

  showStep = step => {
    this.setState({ step });
  };
  // showStep = step => {
  //   this.props.dispatch({
  //     type: 'boardColumn/saveStep',
  //     payload: step,
  //   });
  //   this.props.dispatch({
  //     type: 'boardColumn/changeFormVisible',
  //     payload: true,
  //   });
  // };

  refreshTree = () => {
    const { orgid } = this.props;
    this.props.dispatch({
      type: 'boardColumn/queryColumnTree',
      org: orgid,
    });
  };

  onItemViewClick = id => {
    this.setState({
      dataDetail: true,
      dataColumnID: id,
    });
  };

  renderDataForm = () => {
    if (this.state.step > -1) {
      return (
        <ColumnEdit
          columnId={this.state.dataFormID}
          orgid={this.props.orgid}
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

  creOps = record => {
    if (record.desc.kind !== 0) {
      return null;
    }
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

  render() {
    const {
      loading,
      boardColumn: {
        data: { list, pagination },
      },
    } = this.props;
    const { searchObj } = this.state;
    const columns = [
      {
        title: '栏目名称',
        dataIndex: 'desc.name',
        width: 200,
        render: (val, record) => {
          return <span onClick={() => this.onItemDetailClick(record.column_id)}>{val}</span>;
        },
      },
      {
        title: '短名称',
        dataIndex: 'desc.short_name',
        width: 100,
      },
      {
        title: '状态',
        dataIndex: 'status.status',
        width: 100,
        render: val => {
          switch (val) {
            case -1:
              return <Badge status="default" text="已删除" />;
            case 0:
              return <Badge status="proccess" text="未锁定" />;
            case 1:
              return <Badge status="success" text="已锁定" />;
            default:
              return <Badge status="error" text="未知" />;
          }
        },
      },
      {
        title: '栏目类型',
        dataIndex: 'desc.kind',
        //  width: 100,
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
        dataIndex: 'operator.creator_name',
        // width: 100,
      },
      {
        title: '创建时间',
        dataIndex: 'operator.cre_time',
        // width: 200,
        render: val => {
          return <span>{parseUtcTime(val)}</span>;
        },
      },
    ];

    const col = {
      sm: 24,
      md: 24,
      lg: 24,
      xl: 12,
      xxl: 8,
    };
    return (
      <Card bordered={false}>
        <ColumnSearch
          onSearch={this.onSearchFormSubmit}
          hide={{ org: true }}
          col={col}
          searchObj={searchObj}
        />
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
                this.onItemViewClick(record.column_id);
              },
            };
          }}
        />

        {/* <Table
          title={() => (
            <Button icon="plus" type="primary" onClick={() => this.onAddClick()}>
              新建
            </Button>
          )}
          loading={loading}
          rowKey={record => record.column_id}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.onTableChange}
          scroll={{ x: 1000 }}
          onRow={record => {
            return {
              onClick: () => {
                this.onItemViewClick(record.column_id);
              },
            };
          }}
        /> */}
        {this.renderDataForm()}
        {this.renderDataDetail()}
      </Card>
    );
  }
}
