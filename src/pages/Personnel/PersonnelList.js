import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Modal, Alert, Table, Button, Descriptions } from 'antd';

import { SearchCard, SearchItem } from '../../components/SearchCard';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import EnterpriseInformationAdd from './EnterpriseInformationAdd';
import PersonnelInfoEdit from './PersonnelInfoEdit';
// import { DicShow } from '@/components/Dictionary';
import styles from './Personnel.less';
// import SchTime from '../../components/Info/SchTime';
import { getPhoto } from '@/utils/utils';
// import PButton from '@/components/PermButton';

@connect(state => ({
  personnel: state.personnel,
  loading: state.loading.models.personnel,
}))
@Form.create()
export default class PersonnelList extends PureComponent {
  //  初始的状态信息
  state = {
    dataFormType: '',
    queryFormDisplay: false,
    dataFormID: '',
    enterpriseID: '',
    data: null,
    selectedRows: [],
  };

  componentDidMount() {
    //  组件挂载的时候进行获取企业分类信息
    const { enterprise_id } = this.props.location.query;
    this.props.dispatch({
      type: 'personnel/saveEnterid',
      payload: enterprise_id,
    });

    this.props.dispatch({
      type: 'personnel/fetch',
      payload: { enterprise_id },
      pagination: {},
    });
  }

  onItemEditClick = item => {
    const { enterprise_id } = this.props.location.query;
    this.setState({
      dataFormID: item.record_id,
      dataFormType: 'E',
      enterpriseID: enterprise_id,
      data: item,
    });

    this.props.dispatch({
      type: 'personnel/changeFormVisible',
      payload: true,
    });
  };

  onItemDetailClick = item => {
    this.setState({ dataFormID: item.record_id, dataFormType: 'Detail' });
  };

  onAddClick = () => {
    this.setState({ dataFormID: '', dataFormType: 'A' });
  };

  onTableChange = pagination => {
    const { enterprise_id } = this.props.location.query;
    this.props.dispatch({
      type: 'personnel/fetch',
      payload: { enterprise_id },
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
    this.clearSelectRows();
  };

  onResetFormClick = () => {
    const { enterprise_id } = this.props.location.query;
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'personnel/fetch',
      payload: { enterprise_id },
      pagination: {},
    });
    this.clearSelectRows();
  };

  handleTableSelectRow = (keys, rows) => {
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
    const { enterprise_id } = this.props.location.query;

    //  上面是准备数据，下面是用上面准备的请求数据进行调度请求。
    this.props.dispatch({
      type: 'personnel/fetch',
      payload: { ...formData, enterprise_id },
      pagination: {},
      enterid: enterprise_id,
    });
    this.clearSelectRows();
  };

  onItemDeleClick = item => {
    Modal.confirm({
      title: `确定删除员工【${item.real_name}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDeleOKClick.bind(this, item.record_id),
    });
  };

  onDeleOKClick = data => {
    this.props.dispatch({
      type: 'personnel/delePerson',
      payload: data,
    });
    this.clearSelectRows();
  };

  submitPersonInfo = data => {
    const { enterprise_id } = this.props.location.query;
    this.props.dispatch({
      type: 'personnel/submit',
      payload: data,
      enterpriseID: enterprise_id,
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

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;
    // const { Option } = Select;

    return (
      //  查询条件表单，点击保存按钮，触发函数onSearchFormSubmit
      <SearchCard
        form={this.props.form}
        onSearch={this.onSearchFormSubmit}
        onReset={this.onResetFormClick}
      >
        <SearchItem label="昵称">
          {getFieldDecorator('nickname')(<Input placeholder="请输入" />)}
        </SearchItem>
        <SearchItem label="真实姓名">
          {getFieldDecorator('real_name')(<Input placeholder="请输入" />)}
        </SearchItem>
        <SearchItem label="联系电话">
          {getFieldDecorator('phone')(<Input placeholder="请输入" />)}
        </SearchItem>
        {/* <SearchItem label="性别">
          {getFieldDecorator('gender', {
            initialValue: 0,
          })(
            <Select>
              <Option value={0}>全部</Option>
              <Option value={1}>男</Option>
              <Option value={2}>女</Option>
            </Select>
          )}
        </SearchItem>
        <SearchItem label="认证状态">
          {getFieldDecorator('auth_status', {
            initialValue: 0,
          })(
            <Select>
              <Option value={0}>全部</Option>
              <Option value={1}>已认证</Option>
              <Option value={2}>未认证</Option>
            </Select>
          )}
        </SearchItem>
        <SearchItem label="状态">
          {getFieldDecorator('status', {
            initialValue: 0,
          })(
            <Select>
              <Option value={0}>全部</Option>
              <Option value={1}>正常</Option>
              <Option value={2}>注销</Option>
            </Select>
          )}
        </SearchItem>
        <SearchItem label="注册日期From">
          {getFieldDecorator('from')(<SchTime isRange />)}
        </SearchItem>
        <SearchItem label="注册日期To">{getFieldDecorator('to')(<SchTime isRange />)}</SearchItem> */}
      </SearchCard>
    );
  }

  render() {
    const {
      loading,
      personnel: {
        data: { list, pagination },
        formVisible,
      },
    } = this.props;
    const { selectedRowKeys, selectedRows } = this.state;
    const columns = [
      {
        title: '头像',
        dataIndex: 'photo',
        key: 'photo',
        width: 100,
        render: value => {
          return <img src={getPhoto(value)} alt="" style={{ width: 60, height: 60 }} />;
        },
      },
      {
        title: '真实姓名',
        dataIndex: 'real_name',
        width: 150,
      },
      {
        title: '昵称',
        dataIndex: 'nickname',
        width: 100,
      },
      {
        title: '性别',
        dataIndex: 'gender',
        width: 150,
        render: gender => {
          switch (gender) {
            case 1:
              return '男';
            case 2:
              return '女';
            default:
              return '未知';
          }
        },
      },
      {
        title: '部门名称',
        dataIndex: 'dept_name',
        width: 150,
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        width: 150,
      },
      {
        title: '角色',
        dataIndex: 'user_type_name',
        width: 250,
      },
      // {
      //   title: '认证状态',
      //   dataIndex: 'auth_status',
      //   key: 'auth_status',
      //   render: gender => {
      //     // 认证状态(1:已认证 2:未认证)
      //     switch (gender) {
      //       case 1:
      //         return '已认证';
      //       case 2:
      //         return '未认证';
      //       default:
      //         return '未知';
      //     }
      //   },
      // },
      // {
      //   title: '状态',
      //   dataIndex: 'status',
      //   key: 'status',
      //   render: gender => {
      //     switch (gender) {
      //       case 1:
      //         return <Tag color="green">正常</Tag>;
      //       case 2:
      //         return <Tag color="red">注销</Tag>;
      //       default:
      //         return null;
      //     }
      //   },
      // },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => {
        return <span>共{total}条</span>;
      },
      ...pagination,
    };
    const breadcrumbList = [
      { title: '企业管理', href: '/enterprise/enterpriselist' },
      { title: '企业员工管理', href: '' },
    ];

    //  默认render渲染方法返回的jsx标签
    return (
      <PageHeaderLayout title="企业员工管理" breadcrumbList={breadcrumbList}>
        <Card bordered={false}>
          <table width="100%">
            <tbody>
              <tr>
                <td>
                  {/* 全局统计信息 */}
                  <Alert
                    type="info"
                    showIcon
                    message={`当前所在企业：${this.props.location.query.name}，企业总人数:${
                      this.props.personnel.data.pagination.total
                    }`}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
        <Card bordered={false}>
          <div className={styles.tableList}>
            {this.renderSearchForm()}
            <div className={styles.tableListOperator}>
              {/* {selectedRows.length === 1 && [
                <PButton
                  key="edit"
                  code="edit"
                  icon="edit"
                  onClick={() => this.onItemEditClick(selectedRows[0])}
                >
                  编辑
                </PButton>,
                <PButton
                  key="dele"
                  code="dele"
                  icon="dele"
                  onClick={() => this.onItemDeleClick(selectedRows[0])}
                >
                  解除认证
                </PButton>,
              ]} */}
              {selectedRows.length === 1 && [
                <Button
                  key="edit"
                  code="edit"
                  icon="edit"
                  onClick={() => this.onItemEditClick(selectedRows[0])}
                >
                  编辑
                </Button>,
                <Button
                  key="dele"
                  code="dele"
                  icon="dele"
                  onClick={() => this.onItemDeleClick(selectedRows[0])}
                >
                  解除认证
                </Button>,
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
        {formVisible && (
          <PersonnelInfoEdit
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            enterid={this.state.enterpriseID}
            formData={this.state.data}
            submit={this.submitPersonInfo}
            clearSelectRows={this.clearSelectRows}
          />
        )}
      </PageHeaderLayout>
    );
  }
}
