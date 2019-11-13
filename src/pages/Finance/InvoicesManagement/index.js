import React, { PureComponent } from 'react';
import { Card, Form, Input, Table, Badge, Button, Modal, notification } from 'antd';
import moment from 'moment';
import Edit from './Edit';

import styles from './index.less';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { SearchCard, SearchItem } from '../../../components/SearchCard';
import * as Service from '@/services/electricInvoices';

/**
 * 发票管理
 * */
@Form.create()
export default class extends PureComponent {
  state = {
    loading: true,
    editVisible: false,
    editInfo: null,
    selectedRowKeys: [],
    selectedRows: [],
    data: {
      list: [],
      pagination: {},
    },
  };

  pageSize = 6;

  current = 1;

  componentWillMount() {
    this.getList();
  }

  getList = () => {
    this.setState({
      selectedRowKeys: [],
      selectedRows: [],
      loading: true,
    });
    const formData = this.props.form.getFieldsValue();
    const searchData = {
      q: 'page',
      pageSize: this.pageSize,
      current: this.current,
      ...formData,
    };
    Service.query(searchData).then(res => {
      this.setState({
        loading: false,
        data: res,
      });
    });
  };

  onItemEditClick = info => {
    this.setState({ editInfo: { ...info } }, () => {
      this.setState({ editVisible: true });
    });
  };

  onItemDeleteClick = info => {
    Modal.confirm({
      title: `确定删除项目【${info.name}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        Service.del(info).then(res => {
          if (res && !res.error) {
            notification.success({
              key: 'itemDelete',
              message: '项目删除成功',
              description: `项目【${info.name}】已经删除!`,
            });
            this.getList();
          }
        });
      },
    });
  };

  onClose = () => {
    this.setState({ editVisible: false });
  };

  onSaved = info => {
    if (info) {
      this.setState({ editVisible: false, editInfo: { ...info }, selectedRowKeys: [],selectedRows: [] }, () => {
        this.getList();
      });
    } else {
      this.setState({ editVisible: false, editInfo: null, selectedRowKeys: [],selectedRows: []}, () => {
        this.getList();
      });
    }
  };

  handleTableSelectRow = (keys, rows) => {
    this.setState({
      selectedRowKeys: keys,
      selectedRows: rows,
    });
  };

  onResetFormClick = () => {
    this.props.form.resetFields();
    this.getList();
  };

  onTableChange = event => {
    this.current = event.current;
    this.pageSize = event.pageSize;
    this.getList();
  };

  columns = () => [
    {
      title: '订单ID',
      dataIndex: 'order_id',
      width: 200,
      render: val => val,
    },
    {
      title: '充值金额',
      dataIndex: 'amount',
      width: 120,
      render: val => `${(val / 100).toFixed(2)} 元`,
    },
    {
      title: '开票状态',
      dataIndex: 'invoice',
      width: 100,
      render: (val) => {
        const type = (val === null ? 0 : val.length);
        return {
          0: <Badge color="yellow" text="未开票" />,
          1: <Badge color="green" text="已开票" />,
          2: <Badge color="orange" text="已冲销" />,
          3: <Badge color="blue" text="已重开" /> ,
        }[type];
      },
    },
    {
      title: '支付方式',
      dataIndex: 'payment_method',
      width: 100,
      render: val => {
        return {
          alipay_app: <Badge color="blue" text="支付宝" />,
          wechat_app: <Badge color="green" text="微信" />,
        }[val];
      },
    },
    {
      title: '缴费人',
      dataIndex: 'creator_name',
      width: 100,
      render: val => val,
    },
    {
      title: '缴费人所属企业',
      dataIndex: 'enterprise.name',
      width: 240,
      render: val => val,
    },
    {
      title: '充值人手机号',
      dataIndex: 'creator_tel',
      width: 120,
      render: val => val,
    },
    {
      title: '支付时间',
      dataIndex: 'pay_time',
      width: 180,
      render: val => moment(val).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  publish = info =>{
    Modal.confirm({
      title: `确定发布项目【${info.name}】？`,
      okText: '确认',
      okType: 'primary',
      cancelText: '取消',
      onOk: () => {
        Service.publish(info,1).then(res => {
          if (res && !res.error) {
            notification.success({
              key: 'itemPublish',
              message: '项目发布成功',
              description: `项目【${info.name}】已经发布！!`,
            });
            this.getList();
          }
        });
      },
    });
  };

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <SearchCard form={this.props.form} onSearch={this.getList} onReset={this.onResetFormClick}>
        <SearchItem label="订单ID">
          {getFieldDecorator('order_id')(<Input placeholder="订单ID" />)}
        </SearchItem>
      </SearchCard>
    );
  }


  render() {
    const {
      editVisible,
      editInfo,
      data: { list, pagination },
      selectedRows,
      selectedRowKeys,
      loading,
    } = this.state;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => {
        return <span>共{total}条</span>;
      },
      ...pagination,
    };
    return (
      <PageHeaderLayout title="电费缴费发票管理">
        <Card className={styles.main}>
          {this.renderSearchForm()}
          <div className={styles.lists}>
            <div className={styles.buttons}>
              {selectedRows && selectedRows.length === 1 &&  (
              <Button type="primary" onClick={() => this.onItemEditClick(selectedRows[0])}>
                查看详情
              </Button>
              )}
            </div>
            <Table
              rowSelection={{
                selectedRowKeys,
                onChange: this.handleTableSelectRow,
              }}
              scroll={{ x: true, y: true }}
              loading={loading}
              rowKey={record => record.record_id}
              dataSource={list}
              columns={this.columns()}
              pagination={paginationProps}
              onChange={this.onTableChange}
            />
          </div>
        </Card>
        {/* 编辑窗口 */}
        {editVisible ? (
          <Edit
            editVisible={editVisible}
            editInfo={editInfo}
            onSaved={this.onSaved}
            onClose={this.onClose}
          />
        ) : null}
      </PageHeaderLayout>
    );
  }
}
