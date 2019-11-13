import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import { SearchCard, SearchItem } from '@/components/SearchCard';
import { Form, Input, Card, Dropdown, Menu, Badge, Table } from 'antd';
import PaymentChannelDetail from './PaymentChannelDetail';
import { Button } from 'antd/lib/radio';
import { DicSelect, DicShow } from '@/components/Dictionary';

@Form.create()
@connect(state => ({
  paymentChannelManage: state.paymentChannelManage,
}))
export default class PaymentChannelManage extends PureComponent {
  state = {
    showDetail: false,
    storeID: '',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'paymentChannelManage/saveSearch',
      payload: {},
    });
    // 获取商家收款渠道列表
    this.props.dispatch({
      type: 'paymentChannelManage/getPaymentChannelList',
      pagination: {
        current: 1,
        pageSize: 10,
      },
    });
  }

  onItemView = record => {
    this.setState({
      showDetail: true,
      storeID: record.store_id,
    });
    this.props.dispatch({
      type: 'paymentChannelManage/getPaymentChannelDetail',
      storeID: record.store_id,
    });
  };

  onSearch = () => {
    const formData = this.props.form.getFieldsValue();
    // 获取商家收款渠道列表
    this.props.dispatch({
      type: 'paymentChannelManage/getPaymentChannelList',
      search: formData,
      pagination: {
        current: 1,
        pageSize: 10,
      },
    });
  };

  onClear = () => {
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'paymentChannelManage/saveSearch',
      payload: {},
    });
    this.props.dispatch({
      type: 'paymentChannelManage/getPaymentChannelList',
      pagination: {
        current: 1,
        pageSize: 10,
      },
    });
  };

  onDetailClose = () => {
    this.setState({
      showDetail: false,
    });
  };

  onPageChange = pagination => {
    this.props.dispatch({
      type: 'paymentChannelManage/getPaymentChannelList',
      pagination,
    });
  };

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <SearchCard form={this.props.form} onSearch={this.onSearch} onReset={this.onClear}>
        <SearchItem label="店铺名称">{getFieldDecorator('store_name')(<Input />)}</SearchItem>
        <SearchItem label="支付宝状态">
          {getFieldDecorator('alipay_app_status')(
            <DicSelect pcode="mall$#payment$#paymentChannelStatus" placeholder="请选择" />
          )}
        </SearchItem>
        <SearchItem label="支付宝账号">{getFieldDecorator('alipay_account')(<Input />)}</SearchItem>
        <SearchItem label="微信状态">
          {getFieldDecorator('wechat_app_status')(
            <DicSelect pcode="mall$#payment$#paymentChannelStatus" placeholder="请选择" />
          )}
        </SearchItem>
        <SearchItem label="微信账号">{getFieldDecorator('wechat_account')(<Input />)}</SearchItem>
      </SearchCard>
    );
  }

  render() {
    const { showDetail, storeID } = this.state;
    const {
      paymentChannelManage: {
        loading,
        listData: { list, pagination },
      },
    } = this.props;
    const columns = [
      {
        title: '操作',
        dataIndex: 'operation',
        fixed: 'left',
        width: 100,
        render: (_, record) => (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={() => this.onItemView(record)}>查看</Menu.Item>
              </Menu>
            }
          >
            <Button>操作</Button>
          </Dropdown>
        ),
      },
      {
        title: '店铺名称',
        dataIndex: 'store_name',
      },
      {
        title: '支付宝状态',
        dataIndex: 'alipay_app_status',
        render: val => {
          const statusColor = ['error', 'success', 'error', 'error'];
          return (
            <DicShow
              pcode="mall$#payment$#paymentChannelStatus"
              code={[val]}
              show={name => <Badge status={statusColor[val - 1]} text={name} />}
            />
          );
        },
      },
      {
        title: '支付宝账号',
        dataIndex: 'alipay_account',
        render: val => {
          return val || '--';
        },
      },
      {
        title: '微信状态',
        dataIndex: 'wechat_app_status',
        render: val => {
          const statusColor = ['error', 'success', 'error', 'error'];
          return (
            <DicShow
              pcode="mall$#payment$#paymentChannelStatus"
              code={[val]}
              show={name => <Badge status={statusColor[val - 1]} text={name} />}
            />
          );
        },
      },
      {
        title: '微信账号',
        dataIndex: 'wechat_account',
        render: val => {
          return val || '--';
        },
      },
    ];
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => {
        return (
          <span>
            共{total}
            条记录
          </span>
        );
      },
      ...pagination,
    };
    return (
      <PageHeaderLayout title="商家收款渠道管理">
        <Card>
          {this.renderSearchForm()}
          <Table
            loading={loading}
            style={{ marginTop: 20 }}
            dataSource={list}
            columns={columns}
            scroll={{ x: 1000 }}
            rowKey={record => record.store_id}
            pagination={paginationProps}
            onChange={this.onPageChange}
          />
        </Card>
        <PaymentChannelDetail
          show={showDetail}
          storeID={storeID}
          closeDetail={this.onDetailClose}
        />
      </PageHeaderLayout>
    );
  }
}
