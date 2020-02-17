import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Button, Modal, Select, Table } from 'antd';
// import moment from 'moment';
import { SearchCard, SearchItem } from '../../../components/SearchCard';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import CouponDetail from './CouponDetail';
import { formatDate } from '@/utils/utils';
import StoreSelect from '@/components/StoreSelect/StoreSelect';
import Refuse from './RefuseReason';
import { DicSelect, DicShow } from '@/components/Dictionary';
import styles from './CouponSeller.less';
import PButton from '@/components/PermButton';

const { Option } = Select;
@connect(state => ({
  coupon: state.coupon,
  loading: state.loading.models.coupon,
}))
@Form.create()
export default class CouponExamineList extends PureComponent {
  //  初始的状态信息
  state = {
    dataForm: false,
    dataFormID: '',
    dataFormType: '',

    queryFormDisplay: false,
    selectedRowKeys: [],
    selectedRows: [],
    name: '',
  };

  componentDidMount() {
    //  组件挂载的时候进行获取企业分类信息
    this.onSearchFormSubmit();
  }

  onItemDetailClick = item => {
    this.setState({ dataForm: true, dataFormID: item.record_id, dataFormType: 'Detail' });
  };

  // 拒绝
  onItemRefuseClick = item => {
    this.setState({
      dataForm: true,
      dataFormID: item.record_id,
      dataFormType: 'refuse',
      name: item.name,
    });
  };

  onTableChange = pagination => {
    this.props.dispatch({
      type: 'coupon/fetch',
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
      type: 'coupon/fetch',
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
    this.pagination = {
      current: 1,
      pageSize: 10,
    };
    const formData = this.props.form.getFieldsValue();
    //  上面是准备数据，下面是用上面准备的请求数据进行调度请求。
    this.queryListData(formData, this.pagination);
    this.clearSelectRows();
  };

  onDataFormCallback = result => {
    if (this.state.dataFormType === 'A') {
      this.props.dispatch({
        type: 'coupon/savePagination',
        payload: {},
      });
    }
    this.setState({ dataForm: false, dataFormID: '' });
    if (result && result === 'ok') {
      this.props.dispatch({
        type: 'coupon/fetch',
      });
    }
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
      title: `确定删除优惠券【${item.name}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDeleOKClick.bind(this, item.record_id),
    });
  };

  onDeleOKClick = data => {
    this.props.dispatch({
      type: 'coupon/CouponDele',
      payload: data,
    });
    this.clearSelectRows();
  };

  onItemPassClick = item => {
    Modal.confirm({
      title: `确定通过优惠券【${item.name}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onPassOKClick.bind(this, item),
    });
  };

  onPassOKClick = data => {
    this.props.dispatch({
      type: 'coupon/CouponPass',
      payload: { record_id: data.record_id, status: 3, audit_reason: '' },
    });
    this.clearSelectRows();
  };

  // 发布
  onItemPublishClick = item => {
    Modal.confirm({
      title: `确定发布优惠券【${item.name}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onPbulishOKClick.bind(this, item),
    });
  };

  onPbulishOKClick = data => {
    this.props.dispatch({
      type: 'coupon/CouponPublish',
      payload: { record_id: data.record_id, publish_status: 2 },
    });
    this.clearSelectRows();
  };

  // 下架
  onItemDownClick = item => {
    Modal.confirm({
      title: `确定下架优惠券【${item.name}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDownOKClick.bind(this, item),
    });
  };

  onDownOKClick = data => {
    this.props.dispatch({
      type: 'coupon/CouponPublish',
      payload: { record_id: data.record_id, publish_status: 3 },
    });
    this.clearSelectRows();
  };

  onDataSave = data => {
    this.props.dispatch({
      type: 'coupon/submit',
      payload: data,
    });
    this.clearSelectRows();
    this.onDataFormCallback();
  };

  saveRefuse = data => {
    this.props.dispatch({
      type: 'coupon/refuseReason',
      payload: data,
    });
    this.clearSelectRows();
    this.onDataFormCallback();
  };

  /**
   * 查询数据
   * @param {*} pagination
   */
  queryListData(params, pagination) {
    this.props.dispatch({
      type: 'coupon/fetch',
      payload: params,
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  renderDataForm() {
    if (this.state.dataForm) {
      if (this.state.dataFormType === 'Detail') {
        return (
          <CouponDetail
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            callback={this.onDataFormCallback}
          />
        );
      } else if (this.state.dataFormType === 'refuse') {
        return (
          <Refuse
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            name={this.state.name}
            callbackClose={this.onDataFormCallback}
            callback={this.saveRefuse}
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
        <SearchItem label="优惠券名称">
          {getFieldDecorator('name')(<Input placeholder="请输入" />)}
        </SearchItem>
        <SearchItem label="商家">{getFieldDecorator('storeID')(<StoreSelect />)}</SearchItem>
        <SearchItem label="优惠券类型">
          {getFieldDecorator('cType')(
            <DicSelect
              vmode="int"
              pcode="mall$#coupontype"
              selectProps={{ placeholder: '请选择' }}
            />
          )}
        </SearchItem>
        <SearchItem label="审核状态">
          {getFieldDecorator('status')(
            <DicSelect
              vmode="int"
              pcode="mall$#couponstatus"
              selectProps={{ placeholder: '请选择' }}
            />
          )}
        </SearchItem>
        {/* <SearchItem label="发布状态">
          {getFieldDecorator('publishStatus')(
            <DicSelect
              vmode="int"
              pcode="mall$#publishstatus"
              selectProps={{ placeholder: '请选择' }}
            />
          )}
        </SearchItem> */}
      </SearchCard>
    );
  }

  render() {
    const {
      loading,
      coupon: {
        data: { list, pagination },
      },
    } = this.props;
    const { selectedRowKeys, selectedRows } = this.state;
    const columns = [
      {
        title: '置顶图片',
        dataIndex: 'top_img',
        render: value => {
          return <img src={value} alt="" style={{ width: 60, height: 60 }} />;
        },
      },
      {
        title: '优惠券名称',
        dataIndex: 'name',
        key: 'name',
        width: 120,
      },
      {
        title: '发放平台',
        dataIndex: 'owner_type',
        width: 100,
        render: (val, record) => {
          return val === 1 ? '平台' : '商家';
        },
      },

      {
        title: '总数量',
        dataIndex: 'num',
        width: 150,
      },
      {
        title: '已领取/剩余',
        dataIndex: 'size',
        width: 150,
      },
      {
        title: '优惠券单价（元）',
        dataIndex: 'price',
        width: 150,
      },

      {
        title: '审核状态',
        dataIndex: 'status',
        width: 150,
        render: val => {
          return <DicShow pcode="mall$#couponstatus" code={[val]} show={name} />;
        },
      },
      {
        title: '审核时间',
        dataIndex: 'audit_time',
        width: 150,
        render: val => {
            if (val) {
              return <span>{formatDate(val, 'YYYY-MM-DD HH:mm:ss')}</span>;
            } else {
              return <span>-</span>;
            }
          },
      },
      {
        title: '驳回原因',
        dataIndex: 'audit_reason',
        width: 150,
      },
      {
        title: '发布状态',
        dataIndex: 'publish_status',
        width: 150,
        render: val => {
          return <DicShow pcode="mall$#publishstatus" code={[val]} show={name} />;
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
      <PageHeaderLayout title="优惠券审核管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            {this.renderSearchForm()}
            <div className={styles.tableListOperator}>
              
              {selectedRows.length === 1 && [
                <PButton
                  key="query"
                  code="query"
                  icon="eye-visible"
                  onClick={() => this.onItemDetailClick(selectedRows[0])}
                >
                  查看
                </PButton>,
                selectedRows[0].status === 2 && (
                  <PButton
                    key="pass"
                    code="pass"
                    onClick={() => this.onItemPassClick(selectedRows[0])}
                  >
                    通过
                  </PButton>
                ),
                selectedRows[0].status === 2 && (
                  <PButton
                    key="refuse"
                    code="refuse"
                    type="danger"
                    onClick={() => this.onItemRefuseClick(selectedRows[0])}
                  >
                    驳回
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
