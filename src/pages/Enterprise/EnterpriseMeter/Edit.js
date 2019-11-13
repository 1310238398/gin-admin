import React, { PureComponent } from 'react';
import { Card, Col, Form, Modal, Row, Alert, DatePicker, Table, Badge } from 'antd';
import moment from 'moment';
import styles from './Edit.less';
import * as Service from '@/services/electricRechargesDetail';
import { SearchCard, SearchItem } from '../../../components/SearchCard';

const { RangePicker } = DatePicker;

/**
 * 指定电表的充值流水
 * */
@Form.create()
export default class extends PureComponent {
  pageSize = 6;

  current = 1;

  state = {
    total: {
      total_epa: '0',
      total_pay: '0.02',
    },
    data: {
      list: [],
      pagination: {},
    },
    loading: true,
  };

  componentWillMount() {
    this.getList();
  }

  getList = () => {
    const { editInfo } = this.props;
    const formData = this.props.form.getFieldsValue();
    let date = {};
    if (formData.date) {
      const startTime = formData.date[0].format('YYYY-MM-DDTHH:mm:ssZ');
      const endTime = formData.date[1].format('YYYY-MM-DDTHH:mm:ssZ');
      date = { startTime, endTime };
    }

    const searchList = {
      q: 'page',
      pageSize: this.pageSize,
      current: this.current,
      meterRecordID: editInfo.record_id,
      ...date,
    };
    Service.query(searchList).then(res => {
      this.setState({ data: res, loading: false });
    });

    Service.total(editInfo.record_id, date).then(res => {
      this.setState({ total: res });
    });
  };

  onResetFormClick = () => {
    this.props.form.resetFields();
    this.getList();
  };

  onModalOKClick = () => {
    const { onClose } = this.props;
    onClose();
  };

  onModalCancelClick = () => {
    const { onClose } = this.props;
    onClose();
  };

  onTableChange = event => {
    this.current = event.current;
    this.pageSize = event.pageSize;
    this.getList();
  };

  columns = () => [
    {
      title: '电表地址(电表号)',
      dataIndex: 'electric_meter_addr',
      width: 150,
      render: val => val,
    },
    {
      title: '充值金额',
      dataIndex: 'amount',
      width: 100,
      render: val => `${(val / 100).toFixed(2)} 元`,
    },
    {
      title: '充值状态',
      dataIndex: 'third_status',
      width: 120,
      render: val => {
        return {
          0: <Badge color="red" text="未支付" />,
          1: <Badge color="yellow" text="超时" />,
          2: <Badge color="green" text="成功" />,
          3: <Badge color="red" text="失败" />,
        }[val];
      },
    },
    {
      title: '充值前金额',
      dataIndex: 'before_amount',
      width: 140,
      render: (val, row) => {
        if (row.third_fail_reason) {
          return <Badge color="red" text={val} />;
        } else {
          return `${row.before_amount} 元`;
        }
      },
    },
    {
      title: '充值后金额',
      dataIndex: 'after_amount',
      width: 140,
      render: (val, row) => {
        if (row.third_fail_reason) {
          return <Badge color="red" text={val} />;
        } else {
          return `${row.after_amount} 元`;
        }
      },
    },
    {
      title: '充值人',
      dataIndex: 'creator_name',
      width: 100,
      render: val => val,
    },
    {
      title: '充值人手机号',
      dataIndex: 'creator_tel',
      width: 140,
      render: val => val,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      width: 200,
      render: val => moment(val).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  render() {
    const {
      form: { getFieldDecorator },
      editVisible,
      editInfo,
    } = this.props;

    const {
      loading,
      data: { list, pagination },
      total,
    } = this.state;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: Total => {
        return <span>共{Total}条</span>;
      },
      ...pagination,
    };
    return (
      <Modal
        title="充值流水"
        width={1000}
        maskClosable={false}
        visible={editVisible}
        cancelText="关闭"
        onOk={this.onModalOKClick}
        onCancel={this.onModalCancelClick}
      >
        <Card bordered={false} className={styles.card}>
          <SearchCard
            form={this.props.form}
            onSearch={this.getList}
            onReset={this.onResetFormClick}
          >
            <SearchItem label="门牌号">{editInfo.building_name}</SearchItem>
            <SearchItem label="电表名">{editInfo.name}</SearchItem>
            <SearchItem label="电表号">{editInfo.meter_addr}</SearchItem>
            <SearchItem label="缴费时间">{getFieldDecorator('date')(<RangePicker />)}</SearchItem>
          </SearchCard>
          <Row gutter={16} className={styles.row}>
            <Col span={24}>
              <Alert message={`缴费总金额：${total.total_pay} 元`} type="info" />
            </Col>
            {/* <Col span={12}> */}
            {/*  <Alert message={`用电量：${  total.total_epa} kW·h`} type="warning" /> */}
            {/* </Col> */}
          </Row>
          <Table
            scroll={{ x: true, y: true }}
            loading={loading}
            rowKey={record => record.record_id}
            dataSource={list}
            columns={this.columns()}
            pagination={paginationProps}
            onChange={this.onTableChange}
          />
        </Card>
      </Modal>
    );
  }
}
