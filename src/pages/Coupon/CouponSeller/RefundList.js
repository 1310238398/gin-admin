import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Button, Modal, Badge, Select, Table, Icon } from 'antd';
// import moment from 'moment';
import { SearchCard, SearchItem } from '../../../components/SearchCard';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { formatDate } from '../../../utils/utils';
import { DicSelect, DicShow } from '@/components/Dictionary';
import { RefuseReason } from './RefuseReason';
import styles from './CouponSeller.less';
import PButton from '@/components/PermButton';

const { Option } = Select;
@connect(state => ({
  coupon: state.coupon,
  loading: state.loading.models.coupon,
}))
@Form.create()
export default class RefundList extends PureComponent {
  //  初始的状态信息
  state = {
    dataForm: false,
    dataFormID: '',
    dataFormType: '',

    queryFormDisplay: false,
    selectedRowKeys: [],
    selectedRows: [],
  };

  componentDidMount() {
    //  组件挂载的时候进行获取企业分类信息
    this.props.dispatch({
      type: 'coupon/fetchRefuse',
      payload: {},
      pagination: {},
    });
  }

  onItemAgreeClick = item => {
    Modal.confirm({
      title: `确定同意用户退券此操作？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onAgreeOKClick.bind(this, item.record_id),
    });
  };

  onAgreeOKClick = data => {
    this.props.dispatch({
      type: 'coupon/couponAgree',
      payload: data,
    });
    this.clearSelectRows();
  };

  //   onItemDetailClick = item => {
  //     this.setState({ dataForm: true, dataFormID: item.record_id, dataFormType: 'Detail' });
  //   };

  onTableChange = pagination => {
    this.props.dispatch({
      type: 'coupon/fetchRefuse',
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
      type: 'coupon/fetchRefuse',
      payload: {},
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
    //  上面是准备数据，下面是用上面准备的请求数据进行调度请求。
    this.props.dispatch({
      type: 'coupon/fetchRefuse',
      payload: formData,
      pagination: {},
    });
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
        type: 'coupon/fetchRefuse',
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

  onItemRefuseClick = item => {
    this.setState({ dataForm: true, dataFormID: item.record_id, dataFormType: 'Refuse' });
  };

  onRefuseOKClick = data => {
    this.props.dispatch({
      type: 'coupon/couponRefuse',
      payload: data,
    });
    this.clearSelectRows();
  };

  renderDataForm() {
    if (this.state.dataForm) {
      if (this.state.dataFormType === 'Refuse') {
        return (
          <RefuseReason
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            callback={this.onDataFormCallback}
            refuseBack={this.onRefuseOKClick}
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
        <SearchItem label="审核状态">
          {getFieldDecorator('status')(
            <DicSelect
              vmode="int"
              pcode="mall$#couponstatus"
              selectProps={{ placeholder: '请选择' }}
            />
          )}
        </SearchItem>
      </SearchCard>
    );
  }

  render() {
    const {
      loading,
      coupon: {
        dataRefuse: { list, pagination },
      },
    } = this.props;
    const { selectedRowKeys, selectedRows } = this.state;
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'name',
        key: 'name',
        width: 150,
      },
      {
        title: '优惠券名称',
        dataIndex: 'name',
        key: 'name',
        width: 150,
      },

      {
        title: '下单时间',
        dataIndex: 'time',
        width: 150,
      },
      {
        title: '退券数量',
        dataIndex: 'num',
        width: 150,
      },
      {
        title: '用户联系方式',
        dataIndex: 'tel',
        width: 150,
      },
      {
        title: '退券原因',
        dataIndex: 'reason',
        width: 150,
      },

      {
        title: '退券时间',
        dataIndex: 'applicant_name',
        width: 150,
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
      <PageHeaderLayout title="退券审核管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            {this.renderSearchForm()}
            <div className={styles.tableListOperator}>
              {selectedRows.length === 1 && [
                <PButton
                  key="pass"
                  code="pass"
                  onClick={() => this.onItemAgreeClick(selectedRows[0])}
                >
                  同意
                </PButton>,
                <PButton
                  key="refuse"
                  code="refuse"
                  onClick={() => this.onItemRefuseClick(selectedRows[0])}
                >
                  拒绝
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
