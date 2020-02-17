import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Button, Modal, Select, Table, message } from 'antd';
// import moment from 'moment';
import { SearchCard, SearchItem } from '@/components/SearchCard';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import FaceEntryInfo from './FaceEntryInfo';
import FaceEntryEdit from './FaceEntryEdit';
import EnterpriseSelect from '@/components/EnterpriseSelect';
import UserTypeShow from '../Enterprise/UserType/Show/index';
import { parseUtcTime } from '../../utils/utils';
// import { DicShow } from '@/components/Dictionary';
import styles from './FaceEntry.less';
import PButton from '@/components/PermButton';

@connect(state => ({
  faceEntry: state.faceEntry,
  loading: state.loading.models.faceEntry,
}))
@Form.create()
export default class FaceEntry extends PureComponent {
  //  初始的状态信息
  state = {
    dataForm: false,
    dataFormID: '',
    dataFormType: '',

    queryFormDisplay: false,
    selectedRowKeys: [],
    selectedRows: [],
    tagList: [],
  };

  componentDidMount() {
    //  组件挂载的时候进行获取企业分类信息
    // this.props.dispatch({
    //   type: 'enterprise/fetchTreeNode',
    // });
    this.props.dispatch({
      type: 'faceEntry/fetch',
      payload: {},
      pagination: {},
    });
  }

  onItemEditClick = item => {
    if (item.enterprise_id === '') {
      message.error('');
    } else {
      this.setState({ dataForm: true, dataFormID: item.record_id, dataFormType: 'E' });
    }
  };

  onItemDetailClick = item => {
    this.setState({ dataForm: true, dataFormID: item.record_id, dataFormType: 'Detail' });
  };

  onAddClick = () => {
    this.setState({ dataForm: true, dataFormID: '', dataFormType: 'A' });
  };

  onTableChange = pagination => {
    this.props.dispatch({
      type: 'faceEntry/fetch',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
    this.clearSelectRows();
  };

  onResetFormClick = () => {
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'faceEntry/fetch',
      payload: {},
      pagination: {},
    });
    this.clearSelectRows();
  };

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

  clearSelectRows = () => {
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys.length === 0) {
      return;
    }
    this.setState({ selectedRowKeys: [], selectedRows: [] });
  };

  onSearchFormSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    const formData = this.props.form.getFieldsValue();

    if (formData.tags) {
      delete formData.tags;
    }
    formData.tags = this.state.tagList;

    //  上面是准备数据，下面是用上面准备的请求数据进行调度请求。
    this.props.dispatch({
      type: 'faceEntry/fetch',
      payload: formData,
      pagination: {},
    });
    this.clearSelectRows();
  };

  onDataFormCallback = result => {
    if (this.state.dataFormType === 'A') {
      this.props.dispatch({
        type: 'faceEntry/savePagination',
        payload: {},
      });
    }

    if (result && result === 'ok') {
      this.setState({ dataForm: false, dataFormID: '' });
      this.props.dispatch({
        type: 'faceEntry/changeFormVisible',
        payload: false,
      });
      this.props.dispatch({
        type: 'faceEntry/fetch',
      });
    }
    this.clearSelectRows();
  };

  // 关闭
  onCloseCallback = () => {
    // this.setState({ dataForm: false, dataFormID: '' });
    this.props.dispatch({
      type: 'faceEntry/fetch',
    });
    this.clearSelectRows();
  };

  onQueryFormToggleClick = () => {
    const { queryFormDisplay } = this.state;
    // 切换显示状态
    this.setState({
      queryFormDisplay: !queryFormDisplay,
    });
  };

  onItemDeleClick = item => {
    Modal.confirm({
      title: `确定删除用户--【${item.real_name}】的人脸数据？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDeleOKClick.bind(this, item.record_id),
    });
  };

  onDeleOKClick = data => {
    this.props.dispatch({
      type: 'faceEntry/faceEntryDele',
      payload: data,
    });
    this.clearSelectRows();
  };

  onItemDisableClick = item => {
    Modal.confirm({
      title: `确定冻结用户--【${item.real_name}】的数据？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDisableOKClick.bind(this, item.record_id),
    });
  };

  onDisableOKClick = data => {
    this.props.dispatch({
      type: 'faceEntry/faceEntryDisable',
      payload: data,
    });
    this.clearSelectRows();
  };

  onItemUnabaleClick = item => {
    Modal.confirm({
      title: `确定启用用户--【${item.real_name}】的数据？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onUnabaleOKClick.bind(this, item.record_id),
    });
  };

  onUnabaleOKClick = data => {
    this.props.dispatch({
      type: 'faceEntry/faceEntryUnabale',
      payload: data,
    });
    this.clearSelectRows();
  };

  rendSource = value => {
    switch (value) {
      case 'wx':
        return '微信';
      case 'oper':
        return '运营平台';
      default:
        return 'app';
    }
  };

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      //  查询条件表单，点击保存按钮，触发函数onSearchFormSubmit
      <SearchCard
        form={this.props.form}
        onSearch={this.onSearchFormSubmit}
        onReset={this.onResetFormClick}
      >
        <SearchItem label="用户姓名">
          {getFieldDecorator('realName')(<Input placeholder="请输入" />)}
        </SearchItem>
        <SearchItem label="手机号">
          {getFieldDecorator('phone')(<Input placeholder="请输入" />)}
        </SearchItem>
        <SearchItem label="企业名称">
          {getFieldDecorator('enterpriseID')(<EnterpriseSelect placeholder="请输入企业名称" />)}
        </SearchItem>
        <SearchItem label="状态">
          {getFieldDecorator('status')(
            <Select placeholder="请选择">
              <Select.Option value="1">正常</Select.Option>
              <Select.Option value="2">冻结</Select.Option>
            </Select>
          )}
        </SearchItem>
        <SearchItem label="用户来源">
          {getFieldDecorator('source')(
            <Select placeholder="请选择">
              <Select.Option value="wx">微信</Select.Option>
              <Select.Option value="oper">运营平台</Select.Option>
              <Select.Option value="app">app</Select.Option>
            </Select>
          )}
        </SearchItem>
      </SearchCard>
    );
  }

  renderDataForm() {
    if (this.state.dataForm) {
      if (this.state.dataFormType === 'A') {
        return (
          <FaceEntryEdit
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            callback={this.onDataFormCallback}
          />
        );
      } else if (this.state.dataFormType === 'Detail') {
        return (
          <FaceEntryInfo
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            callback={this.onDataFormCallback}
          />
        );
      } else if (this.state.dataFormType === 'E') {
        return (
          <FaceEntryEdit
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            callback={this.onDataFormCallback}
          />
        );
      }
    }
  }

  render() {
    const {
      loading,
      faceEntry: {
        data: { list, pagination },
      },
    } = this.props;
    const { selectedRowKeys, selectedRows } = this.state;
    const columns = [
      {
        title: '用户姓名',
        dataIndex: 'real_name',
        width: 150,
      },
      {
        title: '用户昵称',
        dataIndex: 'nickname',
        width: 150,
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        width: 100,
      },
      {
        title: '性别',
        dataIndex: 'gender',
        width: 60,
        render: val => {
          return <span>{val === 1 ? '男' : '女'}</span>;
        },
      },
      {
        title: '企业名称',
        dataIndex: 'enterprise_name',
        width: 200,
        render: val => {
          return <span>{val === '' ? '未认证企业' : val}</span>;
        },
      },
      {
        title: '用户身份',
        dataIndex: 'user_type',
        width: 100,
        render: (val, record) => {
          if (record.enterprise_id === '') {
            return <span>未认证</span>;
          } else {
            return <UserTypeShow enterpriseID={record.enterprise_id} code={val} />;
          }
        },
      },
      //   {
      //     title: '部门',
      //     dataIndex: 'category',
      //     width: 150,
      //     render: val => {
      //       return <DicShow pcode="OPER$#enterprise_category_industry" code={[val]} show={name} />;
      //     },
      //   },
      {
        title: '状态',
        dataIndex: 'status',
        width: 80,
        render: val => {
          return <span>{val === 1 ? '正常' : '冻结'}</span>;
        },
      },
      {
        title: '用户来源',
        dataIndex: 'source',
        width: 80,
        render: val => {
          return <span>{this.rendSource(val)}</span>;
        },
      },
      {
        title: '创建时间',
        dataIndex: 'created_at',
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
        return <span>共{total}条</span>;
      },
      ...pagination,
    };
    //  默认render渲染方法返回的jsx标签
    return (
      <PageHeaderLayout title="平台用户管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            {this.renderSearchForm()}
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.onAddClick()}>
                新增平台用户数据
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
                <PButton
                  key="edit"
                  code="edit"
                  icon="edit"
                  onClick={() => this.onItemEditClick(selectedRows[0])}
                >
                  编辑
                </PButton>,
                <PButton
                  key="delete"
                  code="delete"
                  icon="delete"
                  type="danger"
                  onClick={() => this.onItemDeleClick(selectedRows[0])}
                >
                  删除
                </PButton>,
                selectedRows[0].status === 1 && (
                  <PButton
                    key="disabled"
                    code="disabled"
                    type="danger"
                    onClick={() => this.onItemDisableClick(selectedRows[0])}
                  >
                    冻结
                  </PButton>
                ),
                selectedRows[0].status === 2 && (
                  <PButton
                    key="undisabled"
                    code="undisabled"
                    type="primary"
                    onClick={() => this.onItemUnabaleClick(selectedRows[0])}
                  >
                    启用
                  </PButton>
                ),
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
