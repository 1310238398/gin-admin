import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Button, Modal, Dropdown, Icon, Menu, Badge } from 'antd';
import { Link } from 'react-router-dom';

import TableList from '../../components/TableList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { parseUtcTime } from '../../utils/utils';
import DataCard from './DataCard';
import GroupSearchCard from './GroupSearchCard';

@connect(state => ({
  groupManage: state.groupManage,
  columnManage: state.columnManage,
  loading: state.loading.models.groupManage,
}))
@Form.create()
export default class GroupManageList extends PureComponent {
  state = {
    dataForm: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'groupManage/saveSearch',
      payload: {},
    });
    dispatch({
      type: 'groupManage/fetch',
    });
  }

  onItemViewClick = () => {
    // const { group_id } = item;
    // console.log(item);
  };

  // onDetailModalCancelClick = () => {
  //   this.setState({
  //     detailVisible: false,
  //   });
  // };

  onTableChange = pagination => {
    this.props.dispatch({
      type: 'groupManage/fetch',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  onSearch = formData => {
    this.props.dispatch({
      type: 'groupManage/fetch',
      payload: formData,
    });
  };

  onDataFormCallback = result => {
    this.setState({
      dataForm: false,
      dataFormID: '',
    });
    if (result && result === 'ok') {
      this.props.dispatch({
        type: 'groupManage/fetch',
      });
    }
  };

  onAddClick = () => {
    this.setState({
      dataForm: true,
      dataFormID: '',
    });
    this.showStep(0);
  };

  onItemDescClick = groupid => {
    this.setState({
      dataForm: true,
      dataFormID: groupid,
    });
    this.showStep(0);
  };

  onItemCtrlClick = groupid => {
    this.setState({
      dataForm: true,
      dataFormID: groupid,
    });
    this.showStep(1);
  };

  onStopOKClick = id => {
    this.props.dispatch({
      type: 'groupManage/stop',
      payload: id,
    });
  };

  onItemStopClick = groupid => {
    Modal.confirm({
      title: '确定要发布信息吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onStopOKClick.bind(this, groupid),
    });
  };

  onStartOKClick = id => {
    this.props.dispatch({
      type: 'groupManage/start',
      payload: id,
    });
  };

  onItemStartClick = groupid => {
    Modal.confirm({
      title: '确定要开始收集信息吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onStartOKClick.bind(this, groupid),
    });
  };

  onRecoverOKClick = id => {
    this.props.dispatch({
      type: 'groupManage/recover',
      payload: id,
    });
  };

  onItemRecoverClick = groupid => {
    Modal.confirm({
      title: '确定要恢复信息吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onRecoverOKClick.bind(this, groupid),
    });
  };

  onDelOKClick = id => {
    this.props.dispatch({
      type: 'groupManage/del',
      payload: id,
    });
  };

  onItemDeleteClick = groupid => {
    Modal.confirm({
      title: '确定删除该数据吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDelOKClick.bind(this, groupid),
    });
  };

  onDestroyOKClick = id => {
    this.props.dispatch({
      type: 'groupManage/destroy',
      payload: id,
    });
  };

  onItemDestroyClick = groupid => {
    Modal.confirm({
      title: '确定彻底删除该数据吗？彻底删除后不能恢复。',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDestroyOKClick.bind(this, groupid),
    });
  };

  showStep = step => {
    this.props.dispatch({
      type: 'groupManage/saveStep',
      payload: step,
    });
    this.props.dispatch({
      type: 'groupManage/saveFormCtrlData',
      payload: {},
    });
    this.props.dispatch({
      type: 'groupManage/changeFormVisible',
      payload: true,
    });
  };

  handleMenuClick = (key, val) => {
    switch (key) {
      case 'info':
        // this.onItemDescClick(val);
        break;
      case 'desc':
        this.onItemDescClick(val);
        break;
      case 'ctrl':
        this.onItemCtrlClick(val);
        break;
      case 'start':
        this.onItemStartClick(val);
        break;
      case 'stop':
        this.onItemStopClick(val);
        break;
      case 'del':
        this.onItemDeleteClick(val);
        break;
      case 'recover':
        this.onItemRecoverClick(val);
        break;
      case 'destroy':
        this.onItemDestroyClick(val);
        break;
      default:
    }
  };

  renderDataForm = () => {
    if (this.state.dataForm) {
      return <DataCard id={this.state.dataFormID} callback={this.onDataFormCallback} />;
    }
  };

  renderMenu = (val, record) => {
    return (
      <Menu onClick={({ key }) => this.handleMenuClick(key, val)}>
        {record.status.status === 1 && (
          <Menu.Item key="info">
            <Link to={`./groups/${val}/infos`}>
              <Icon type="profile" />
              信息明细
            </Link>
          </Menu.Item>
        )}
        {record.status.status >= 0 && (
          <Menu.Item key="desc">
            <Icon type="edit" />
            修改
          </Menu.Item>
        )}
        {record.status.status >= 0 && (
          <Menu.Item key="ctrl">
            <Icon type="setting" />
            控制参数
          </Menu.Item>
        )}
        {record.status.status === 0 && (
          <Menu.Item key="start">
            <Icon type="caret-right" />
            开始收集
          </Menu.Item>
        )}
        {record.status.status === 1 && (
          <Menu.Item key="stop">
            <Icon type="pause-circle" />
            暂停收集
          </Menu.Item>
        )}
        {record.status.status >= 0 && (
          <Menu.Item key="del">
            <Icon type="delete" />
            删除
          </Menu.Item>
        )}
        {record.status.status === -1 && (
          <Menu.Item key="recover">
            <Icon type="reload" />
            恢复
          </Menu.Item>
        )}
        {record.status.status === -1 && (
          <Menu.Item key="destroy">
            <Icon type="close" />
            彻底删除
          </Menu.Item>
        )}
      </Menu>
    );
  };

  render() {
    const {
      loading,
      groupManage: {
        data: { list, pagination },
      },
    } = this.props;

    const columns = [
      {
        title: '操作',
        dataIndex: 'group_id',
        fixed: 'left',
        width: 100,
        render: (val, record) => {
          return (
            <Dropdown overlay={this.renderMenu(val, record)}>
              <Button>
                操作 <Icon type="down" />
              </Button>
            </Dropdown>
          );
        },
      },

      {
        title: '组名称',
        dataIndex: 'desc.name',
        fixed: 'left',
        render: (val, record) => {
          return <span onClick={this.onItemViewClick(record)}>{val}</span>;
        },
      },
      {
        title: '短名称',
        dataIndex: 'desc.short_name',
        width: 100,
        render: (val, record) => {
          return <span onClick={this.onItemViewClick(record)}>{val}</span>;
        },
      },
      {
        title: '访问标识',
        dataIndex: 'ctl_param.flags',
        width: 100,
        render: (val, record) => {
          return <span onClick={this.onItemViewClick(record)}>{val.join(' ')}</span>;
        },
      },
      {
        title: '信息数量',
        dataIndex: 'status.info_num',
        width: 100,
      },
      {
        title: '所属组织',
        dataIndex: 'desc.org',
        width: 200,
      },
      {
        title: '所属个人',
        dataIndex: 'desc.owner',
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
              return <Badge status="processing" text="停止收集" />;
            case 1:
              return <Badge status="success" text="正常" />;
            default:
              return <Badge status="Warning" text="未知" />;
          }
        },
      },
      {
        title: '创建用户',
        dataIndex: 'operator.cretator',
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

    return (
      <PageHeaderLayout title="信息组管理">
        <Card bordered={false}>
          <GroupSearchCard callback={this.onSearch} />
          <TableList
            loading={loading}
            title={() => {
              return (
                <Button icon="plus" type="primary" onClick={() => this.onAddClick()}>
                  新建
                </Button>
              );
            }}
            rowKey={record => record.group_id}
            dataSource={list}
            columns={columns}
            pagination={paginationProps}
            onChange={this.onTableChange}
            scroll={{ x: 1400 }}
          />
        </Card>
        {this.renderDataForm()}
      </PageHeaderLayout>
    );
  }
}
