import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Modal, Badge, Select, Table, Icon, DatePicker } from 'antd';
// import moment from 'moment';
import { SearchCard, SearchItem } from '../../../components/SearchCard';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import EpidemicemployeeInfoDetail from './EpidemicemployeeInfoDetail';
import EnterpriseOwner from '@/components/EnterpriseOwner/EnterpriseOwner';
import EnterpriseNewSelect from '@/components/EnterpriseNewList/index';
import ParkOP from '@/components/ParkOP/ParkOP';
import { formatDate } from '../../../utils/utils';
import * as epidemicemployeeInfoService from '@/services/epidemicemployeeInfo';
import { DicShow } from '@/components/Dictionary';
import * as builingService from '@/services/building';
import styles from './Epidemicemployeeinfo.less';
import store from '@/utils/store';
// import SchTime from '../../../components/Info/SchTime';
import PButton from '@/components/PermButton';


const { Option } = Select;

@connect(state => ({
  epidemicemployeeInfo: state.epidemicemployeeInfo,
  loading: state.loading.models.epidemicemployeeInfo,
}))
@Form.create()
export default class EpidemicemployeeInfo extends PureComponent {
  //  初始的状态信息
  state = {
    dataForm: false,
    dataFormID: '',
    dataFormType: '',
    data: '',

    queryFormDisplay: false,
    selectedRowKeys: [],
    selectedRows: [],
    floorList:[],
  };

  componentDidMount() {
    //  组件挂载的时候进行获取企业分类信息
    // this.props.dispatch({
    //   type: 'epidemicemployeeInfo/fetchTreeNode',
    // });
    this.props.dispatch({
      type: 'epidemicemployeeInfo/fetch',
      payload: {},
      pagination: {},
    });
    builingService.HouseQuery({ q: 'list_auth', btype: 80 }).then(data => {
      this.setState({ floorList: data.list ? data.list : [] });
    });
  }

  onItemDetailClick = item => {
    this.setState({
      dataForm: true,
      dataFormID: item.record_id,
      dataFormType: 'Detail',
      data: item,
    });
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
    link.href = epidemicemployeeInfoService.download(formData);
    link.target = '_blank';
    link.download = '员工信息.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  onTableChange = pagination => {
    this.props.dispatch({
      type: 'epidemicemployeeInfo/fetch',
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
      type: 'epidemicemployeeInfo/fetch',
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
      type: 'epidemicemployeeInfo/fetch',
      payload: formData,
      pagination: {},
    });
    this.clearSelectRows();
  };

  onDataFormCallback = () => {
    this.setState({ dataForm: false, dataFormID: '',data:'' });
    this.clearSelectRows();
  };

  // 删除
  onItemDeleteClick = item => {
    Modal.confirm({
      title: `确定删除员工--【${item.name}】的填报数据？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDeleOKClick.bind(this, item.record_id),
    });
  };

  onDeleOKClick = data => {
    this.props.dispatch({
      type: 'epidemicemployeeInfo/epidemicemployeeInfoDele',
      payload: data,
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

  renderDataForm() {
    if (this.state.dataForm) {
      if (this.state.dataFormType === 'Detail') {
        return (
          <EpidemicemployeeInfoDetail
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            callback={this.onDataFormCallback}
            data={this.state.data}
          />
        );
      }
    }
  }

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;
    const {floorList} = this.state;
    return (
      //  查询条件表单，点击保存按钮，触发函数onSearchFormSubmit
      <SearchCard
        form={this.props.form}
        onSearch={this.onSearchFormSubmit}
        onReset={this.onResetFormClick}
      >
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
        <SearchItem label="姓名">
          {getFieldDecorator('name')(<Input placeholder="请输入" />)}
        </SearchItem>

        <SearchItem label="手机号">
          {getFieldDecorator('phone')(<Input placeholder="请输入" />)}
        </SearchItem>
        <SearchItem label="身份证号">
          {getFieldDecorator('license_num')(<Input placeholder="请输入" />)}
        </SearchItem>
        <SearchItem label="填报情况">
          {getFieldDecorator('fill_in')(
            <Select placeholder="请选择">
              {/* <Select.Option value="1">全部</Select.Option> */}
              <Select.Option value="2">未填报</Select.Option>
              <Select.Option value="3">已填报</Select.Option>
            </Select>
          )}
        </SearchItem>
        <SearchItem label="填报日期">
          {getFieldDecorator('date')(<DatePicker format="YYYY-MM-DD" placeholder="请选择时间" />)}
        </SearchItem>
      </SearchCard>
    );
  }

  render() {
    const {
      loading,
      epidemicemployeeInfo: {
        data: { list, pagination },
      },
    } = this.props;

    const { selectedRowKeys, selectedRows } = this.state;
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        width: 150,
      },
      {
        title: '性别',
        dataIndex: 'gender',
        width: 80,
        render: val => {
          return <span>{val === 1 ? '男' : '女'}</span>;
        },
      },
      {
        title: '企业名称',
        dataIndex: 'enterprise_name',
        width: 200,
      },
      {
        title: '证件类型',
        dataIndex: 'certificate_type',
        width: 150,
        render: (val, item) => {
          switch (val) {
            case 1:
              return '身份证';
            case 2:
              return '港澳通行证';
            case 3:
              return '护照';
            default:
              return '';
          }
        },
      },
      {
        title: '证件号码',
        dataIndex: 'license_num',
        width: 150,
      },

      {
        title: '联系方式',
        dataIndex: 'phone',
        width: 150,
      },
      {
        title: '是否湖北籍',
        dataIndex: 'native_hubei',
        width: 80,
        render: val => {
          return <span>{val === 1 ? '是' : '否'}</span>;
        },
      },
      {
        title: '是否假期离济',
        dataIndex: 'left_jinan',
        width: 80,
        render: val => {
          return <span>{val === 1 ? '是' : '否'}</span>;
        },
      },
      {
        title: '离济时间',
        dataIndex: 'left_time',
        width: 150,
        render: val => {
          if (val) {
            return <span>{formatDate(val, 'YYYY-MM-DD')}</span>;
          } else {
            return <span>-</span>;
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
      <PageHeaderLayout title="企业员工基本信息查询">
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
                <PButton
                  key="delete"
                  code="delete"
                  onClick={() => this.onItemDeleteClick(selectedRows[0])}
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
