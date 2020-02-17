import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Button, Modal, Select, Table, message, DatePicker } from 'antd';
// import moment from 'moment';
import { SearchCard, SearchItem } from '@/components/SearchCard';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import EnterpriseOwner from '@/components/EnterpriseOwner/EnterpriseOwner';
import StatisticsEnterprisesDetail from './StatisticsEnterprisesDetail';
import StatisticsEnterprisesEdit from './StatisticsEnterprisesEdit';
import ParkOP from '@/components/ParkOP/ParkOP';
import * as builingService from '@/services/building';
import EnterpriseSelect from '@/components/EnterpriseSelect';
import ParkSelect from '@/components/ParkList/ParkSelect';

import { parseUtcTime } from '../../../utils/utils';
// import { DicShow } from '@/components/Dictionary';
import styles from '../../FaceEntry/FaceEntry.less';
import PButton from '@/components/PermButton';

const { Option } = Select;
@connect(state => ({
  statisticsEnterprisesList: state.statisticsEnterprisesList,
  loading: state.loading.models.statisticsEnterprisesList,
}))
@Form.create()
export default class StatisticsEnterprisesList extends PureComponent {
  //  初始的状态信息
  state = {
    dataForm: false,
    dataFormID: '',
    dataFormType: '',

    queryFormDisplay: false,
    selectedRowKeys: [],
    selectedRows: [],
    floorList: [],
  };

  componentDidMount() {
    //  组件挂载的时候进行获取企业分类信息
    // this.props.dispatch({
    //   type: 'enterprise/fetchTreeNode',
    // });
    this.props.dispatch({
      type: 'statisticsEnterprisesList/fetch',
      payload: {},
      pagination: {},
    });
    builingService.HouseQuery({ q: 'list_auth', btype: 80 }).then(data => {
      this.setState({ floorList: data.list ? data.list : [] });
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
      type: 'statisticsEnterprisesList/fetch',
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
      type: 'statisticsEnterprisesList/fetch',
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
    if (formData.date) {
      formData.date = formData.date.format('YYYY-MM-DD');
    }
    //  上面是准备数据，下面是用上面准备的请求数据进行调度请求。
    this.props.dispatch({
      type: 'statisticsEnterprisesList/fetch',
      payload: formData,
      pagination: {},
    });
    this.clearSelectRows();
  };

  onDataFormCallback = result => {
    if (this.state.dataFormType === 'A') {
      this.props.dispatch({
        type: 'statisticsEnterprisesList/savePagination',
        payload: {},
      });
    }

    if (result && result === 'ok') {
      this.setState({ dataForm: false, dataFormID: '' });
      this.props.dispatch({
        type: 'statisticsEnterprisesList/changeFormVisible',
        payload: false,
      });
      this.props.dispatch({
        type: 'statisticsEnterprisesList/fetch',
      });
    }
    this.clearSelectRows();
  };

  // 关闭
  onCloseCallback = () => {
    // this.setState({ dataForm: false, dataFormID: '' });
    this.props.dispatch({
      type: 'statisticsEnterprisesList/fetch',
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
      title: `确定删除企业--【${item.enterprise_name}】的复工数据？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDeleOKClick.bind(this, item.record_id),
    });
  };

  onDeleOKClick = data => {
    this.props.dispatch({
      type: 'statisticsEnterprisesList/statisticsEnterprisesListDele',
      payload: data,
    });
    this.clearSelectRows();
  };

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;
    const { floorList } = this.state;
    return (
      //  查询条件表单，点击保存按钮，触发函数onSearchFormSubmit
      <SearchCard
        form={this.props.form}
        onSearch={this.onSearchFormSubmit}
        onReset={this.onResetFormClick}
      >
        {/* <SearchItem label="用户姓名">
          {getFieldDecorator('realName')(<Input placeholder="请输入" />)}
        </SearchItem>
        <SearchItem label="手机号">
          {getFieldDecorator('phone')(<Input placeholder="请输入" />)}
        </SearchItem> */}
        <SearchItem label="园区">{getFieldDecorator('park_id')(<ParkOP />)}</SearchItem>
        <SearchItem label="楼栋">
          {getFieldDecorator('buildingID')(
            <Select>
              {floorList &&
                floorList.map(v => {
                  return (
                    <Option key={v.record_id} value={v.record_id}>
                      {v.name}
                    </Option>
                  );
                })}
            </Select>
          )}
        </SearchItem>
        <SearchItem label="企业名称">
          {getFieldDecorator('enterprise_id')(<EnterpriseOwner placeholder="请输入企业名称" />)}
        </SearchItem>
        <SearchItem label="复工日期">
          {getFieldDecorator('date')(<DatePicker format="YYYY-MM-DD" placeholder="请选择时间" />)}
        </SearchItem>
        
        {/* <SearchItem label="状态">
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
        </SearchItem> */}
      </SearchCard>
    );
  }

  renderDataForm() {
    if (this.state.dataForm) {
      if (this.state.dataFormType === 'A') {
        return (
          <StatisticsEnterprisesEdit
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            callback={this.onDataFormCallback}
          />
        );
      } else if (this.state.dataFormType === 'Detail') {
        return (
          <StatisticsEnterprisesDetail
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            callback={this.onDataFormCallback}
          />
        );
      } else if (this.state.dataFormType === 'E') {
        return (
          <StatisticsEnterprisesEdit
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
      statisticsEnterprisesList: {
        data: { list, pagination },
      },
    } = this.props;
    const { selectedRowKeys, selectedRows } = this.state;
    const columns = [
      {
        title: '企业名称',
        dataIndex: 'enterprise_name',
        width: 150,
      },
      {
        title: '是否复工',
        dataIndex: 'is_back',
        width: 100,
        render: val => {
          return <span> {val === 1 ? '是' : '否'} </span>;
        },
      },
      {
        title: '复工时间',
        dataIndex: 'back_time',
        width: 100,
        render: val => {
          if (val) {
            return <span> {parseUtcTime(val, 'YYYY-MM-DD')} </span>;
          } else {
            return '';
          }
        },
      },
      {
        title: '复工人数',
        dataIndex: 'back_num',
        width: 100,
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
      <PageHeaderLayout title="企业复工登记情况">
        <Card bordered={false}>
          <div className={styles.tableList}>
            {this.renderSearchForm()}
            <div className={styles.tableListOperator}>
              <Button type="primary" key="addFG" code="addFG" onClick={() => this.onAddClick()}>
                企业复工登记
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
              ]}
            </div>
            <div>
              <Table
                rowSelection={{
                  selectedRowKeys,
                  onChange: this.handleTableSelectRow,
                }}
                loading={loading}
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
