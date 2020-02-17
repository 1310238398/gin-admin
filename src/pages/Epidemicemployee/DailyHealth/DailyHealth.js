import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, DatePicker, Badge, Select, Table, Icon } from 'antd';
// import moment from 'moment';
import { SearchCard, SearchItem } from '../../../components/SearchCard';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import DailyHealthDetail from './DailyHealthDetail';
import EnterpriseOwner from '@/components/EnterpriseOwner/EnterpriseOwner';
import EnterpriseNewSelect from '@/components/EnterpriseNewList/index';
import ParkOP from '@/components/ParkOP/ParkOP';
import ParkSelect from '@/components/ParkList/ParkSelect';
import { formatDate } from '../../../utils/utils';
import * as builingService from '@/services/building';
import store from '@/utils/store';
import * as dailyHealthService from '@/services/dailyHealth';
import styles from './Epidemicemployee.less';
// import SchTime from '../../../components/Info/SchTime';
import PButton from '@/components/PermButton';

const { Option } = Select;

@connect(state => ({
  dailyHealth: state.dailyHealth,
  loading: state.loading.models.dailyHealth,
}))
@Form.create()
export default class DailyHealth extends PureComponent {
  //  初始的状态信息
  state = {
    dataForm: false,
    dataFormID: '',
    dataFormType: '',
    data: {},

    queryFormDisplay: false,
    selectedRowKeys: [],
    selectedRows: [],
    floorList: [],
  };

  componentDidMount() {
    //  组件挂载的时候进行获取企业分类信息
    // this.props.dispatch({
    //   type: 'dailyHealth/fetchTreeNode',
    // });
    this.props.dispatch({
      type: 'dailyHealth/fetch',
      payload: {},
      pagination: {},
    });

    builingService.HouseQuery({ q: 'list_auth', btype: 80 }).then(data => {
      this.setState({ floorList: data.list ? data.list : [] });
    });
  }

  onItemDetailClick = item => {
    this.setState({ dataForm: true, dataFormID: item.user_id, dataFormType: 'Detail', data: item });
  };

  onExportClick = () => {
    const formData = this.props.form.getFieldsValue();
    if (formData.park_id) {
      formData.parkID = formData.park_id;
    } else {
      const parkItem = store.getDefaultPark();
      formData.parkID = parkItem.id;
    }

    // if (formData && formData.settlefromto) {
    //   const startTime = formData.settlefromto[0].format('YYYY-MM-DDTHH:mm:ssZ');
    //   const endTime = formData.settlefromto[1].format('YYYY-MM-DDTHH:mm:ssZ');
    //   delete formData.settlefromto;
    //   formData.startTime = startTime;
    //   formData.endTime = endTime;
    // }

    const link = document.createElement('a');
    link.href = dailyHealthService.download(formData);
    link.target = '_blank';
    link.download = '员工每日健康.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  onTableChange = pagination => {
    this.props.dispatch({
      type: 'dailyHealth/fetch',
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
      type: 'dailyHealth/fetch',
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
    // if (!isNullOrUndefined(formData)) {
    //   this.queryForm.from = parseInt(formData.date / 1000, 10);
    // }

    //  上面是准备数据，下面是用上面准备的请求数据进行调度请求。
    this.props.dispatch({
      type: 'dailyHealth/fetch',
      payload: formData,
      pagination: {},
    });
    this.clearSelectRows();
  };

  onDataFormCallback = () => {
    this.setState({ dataForm: false, dataFormID: '' });
    this.clearSelectRows();
  };

  onQueryFormToggleClick = () => {
    const { queryFormDisplay } = this.state;
    // 切换显示状态
    this.setState({
      queryFormDisplay: !queryFormDisplay,
    });
  };

  renderDataForm() {
    if (this.state.dataForm) {
      if (this.state.dataFormType === 'Detail') {
        return (
          <DailyHealthDetail
            id={this.state.dataFormID}
            data={this.state.data}
            type={this.state.dataFormType}
            callback={this.onDataFormCallback}
          />
        );
      }
    }
  }

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;
    const { floorList } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    return (
      //  查询条件表单，点击保存按钮，触发函数onSearchFormSubmit
      <SearchCard
        form={this.props.form}
        onSearch={this.onSearchFormSubmit}
        onReset={this.onResetFormClick}
      >
        <SearchItem label="园区" formItemLayout={formItemLayout}>
          {getFieldDecorator('park_id')(<ParkOP />)}
        </SearchItem>
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
        <SearchItem label="企业名称" formItemLayout={formItemLayout}>
          {getFieldDecorator('enterprise_id')(<EnterpriseOwner />)}
        </SearchItem>
        <SearchItem label="姓名" formItemLayout={formItemLayout}>
          {getFieldDecorator('name')(<Input placeholder="请输入" />)}
        </SearchItem>

        <SearchItem label="手机号" formItemLayout={formItemLayout}>
          {getFieldDecorator('phone')(<Input placeholder="请输入" />)}
        </SearchItem>
        <SearchItem label="身份证号" formItemLayout={formItemLayout}>
          {getFieldDecorator('license_num')(<Input placeholder="请输入" />)}
        </SearchItem>
        <SearchItem label="是否到岗" formItemLayout={formItemLayout}>
          {getFieldDecorator('is_working')(
            <Select placeholder="请选择">
              <Select.Option value="1">是</Select.Option>
              <Select.Option value="2">否</Select.Option>
            </Select>
          )}
        </SearchItem>
        <SearchItem label="接触疑似/确诊人群" formItemLayout={formItemLayout}>
          {getFieldDecorator('meet_patient')(
            <Select placeholder="请选择">
              <Select.Option value="1">是</Select.Option>
              <Select.Option value="2">否</Select.Option>
            </Select>
          )}
        </SearchItem>
        <SearchItem label="处于隔离期" formItemLayout={formItemLayout}>
          {getFieldDecorator('in_quarantine')(
            <Select placeholder="请选择">
              <Select.Option value="1">是</Select.Option>
              <Select.Option value="2">否</Select.Option>
            </Select>
          )}
        </SearchItem>
        <SearchItem label="今日体温" formItemLayout={formItemLayout}>
          {getFieldDecorator('fever')(
            <Select placeholder="请选择">
              <Select.Option value="1">正常</Select.Option>
              <Select.Option value="2">异常</Select.Option>
            </Select>
          )}
        </SearchItem>
        <SearchItem label="填报情况" formItemLayout={formItemLayout}>
          {getFieldDecorator('fill_in')(
            <Select placeholder="请选择">
              {/* <Select.Option value="1">全部</Select.Option> */}
              <Select.Option value="2">未填报</Select.Option>
              <Select.Option value="3">已填报</Select.Option>
            </Select>
          )}
        </SearchItem>
        <SearchItem label="填报日期" formItemLayout={formItemLayout}>
          {getFieldDecorator('date')(<DatePicker format="YYYY-MM-DD" placeholder="请选择时间" />)}
        </SearchItem>
      </SearchCard>
    );
  }

  render() {
    const {
      loading,
      dailyHealth: {
        data: { list, pagination },
      },
    } = this.props;
    const { selectedRowKeys, selectedRows } = this.state;
    const columns = [
      {
        title: '姓名',
        dataIndex: 'user_name',
        width: 150,
      },
      //   {
      //     title: '性别',
      //     dataIndex: 'gender',
      //     width: 80,
      //     render: val => {
      //       return <span>{val === '1' ? '男' : '女'}</span>;
      //     },
      //   },
      //   {
      //     title: '企业名称',
      //     dataIndex: 'enterprise_name',
      //     width: 200,
      //   },
      //   {
      //     title: '联系方式',
      //     dataIndex: 'phone',
      //     width: 150,
      //   },
      {
        title: '是否到岗(已在园区企业上班)',
        dataIndex: 'is_working',
        width: 150,
        render: (val, item) => {
          if (item.fill_in === 1) {
            return <span>{val === 1 ? '是' : '否'}</span>;
          } else {
            return '未填报';
          }
        },
      },
      {
        title: '是否接触疑似/确诊人群',
        dataIndex: 'meet_patient',
        width: 150,
        render: (val, item) => {
          if (item.fill_in === 1) {
            return <span>{val === 1 ? '是' : '否'}</span>;
          } else {
            return '未填报';
          }
        },
      },

      {
        title: '是否处于隔离期(省外返济14天隔离期内)',
        dataIndex: 'in_quarantine',
        width: 80,
        render: (val, item) => {
          if (item.fill_in === 1) {
            return <span>{val === 1 ? '是' : '否'}</span>;
          } else {
            return '未填报';
          }
        },
      },
      {
        title: '今日体温',
        dataIndex: 'fever',
        width: 80,
        render: (val, item) => {
          if (item.fill_in === 1) {
            return <span>{val === 1 ? '正常' : '异常'}</span>;
          } else {
            return '未填报';
          }
        },
      },
      {
        title: '是否填报',
        dataIndex: 'fill_in',
        width: 150,
        render: val => {
          return <span>{val === 1 ? '是' : '否'}</span>;
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
      <PageHeaderLayout title="企业员工每日健康查询">
        <Card bordered={false}>
          <div className={styles.tableList}>
            {this.renderSearchForm()}
            <div className={styles.tableListOperator}>
              <PButton
                type="primary"
                key="export"
                code="export"
                onClick={() => this.onExportClick()}
              >
                导出数据
              </PButton>

              {selectedRows.length === 1 && [
                <PButton
                  key="seeInfo"
                  code="seeInfo"
                  onClick={() => this.onItemDetailClick(selectedRows[0])}
                >
                  查看
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
