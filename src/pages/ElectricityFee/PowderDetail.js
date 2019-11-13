import React, { PureComponent } from 'react';
import { Row, Col, Card, Form, Button, Table, Input, Alert, DatePicker } from 'antd';
import { DicShow } from '@/components/Dictionary';
import PButton from '@/components/PermButton';
import moment from 'moment';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import { formatDate } from '@/utils/utils';
import styles from '@/pages/Enterprise/EnterpriseDepartment/EnterpriseDepartment.less';
import { SearchCard, SearchItem } from '@/components/SearchCard';
import * as electricChargesService from '@/services/electricChanges';
@Form.create()
export default class ElectricityFeeList extends PureComponent {
  state = {
    loading: true,
    data: {
      list: [],
      pagination: {},
    },
  };

  pageSize = 10;

  current = 1;

  componentDidMount() {
    this.getList();
  }

  onTableChange = event => {
    this.current = event.current;
    this.pageSize = event.pageSize;
    this.getList();
  };

  getList = () => {
    const {
      location: {
        query: { id },
      },
    } = this.props;
    this.setState({ loading: true });
    const formData = this.props.form.getFieldsValue();
    // 时间处理
    if (formData.settlefromto) {
      formData.startTime = formData.settlefromto[0].unix();
      formData.endTime = formData.settlefromto[1].unix();
    }
    const searchData = {
      pageSize: this.pageSize,
      current: this.current,
      recordid: id,
      startTime: formData.startTime, endTime: formData.endTime ,
    };
    electricChargesService.elePoderDetail(searchData).then(res => {
      this.setState({
        loading: false,
        data: res,
      });
    });
  };

  // 导出
  onItemExportClick = () => {
    const {
      location: {
        query: { id },
      },
    } = this.props;
    const formData = this.props.form.getFieldsValue();
    if (formData && formData.settlefromto) {
      const startTime = formData.settlefromto[0].format('YYYY-MM-DDTHH:mm:ssZ');
      const endTime = formData.settlefromto[1].format('YYYY-MM-DDTHH:mm:ssZ');
      delete formData.settlefromto;
      formData.startTime = startTime;
      formData.endTime = endTime;
    }
    const searchData = {
      ...formData,
    };
    const link = document.createElement('a');
    link.href = electricChargesService.download({id,startTime:formData.startTime,endTime:formData.endTime});
    link.target = '_blank';
    link.download = '用电量明细.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  onResetFormClick = () => {
    this.props.form.resetFields();
    this.getList();
  };

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;
    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY/MM/DD';
    return (
      <SearchCard form={this.props.form} onSearch={this.getList} onReset={this.onResetFormClick}>
        <SearchItem label="用电量查询时间">
          {getFieldDecorator('settlefromto', {})(
            <RangePicker
              style={{ width: '100%' }}
              showTime={{
                defaultValue: moment('00:00:00'),
              }}
              placeholder={['开始时间', '结束时间']}
              format={dateFormat}
              // onChange={this.settletimeonChange}
              // onOk={this.settletimeonOk}
            />
          )}
        </SearchItem>
      </SearchCard>
    );
  }

  render() {
    const {
      loading,
      data: { list, pagination },
    } = this.state;
    const {
      location: {
        query: { etype },
      },
    } = this.props;
    const columns = [
      {
        title: '用电量（kw.h）',
        dataIndex: 'epa_used',
      },
      {
        title: '用电额（元）',
        dataIndex: 'wallet_used',
      },
      {
        title: '更新前金额（元）',
        dataIndex: 'before_wallet',
      },
      {
        title: '更新后金额（元）',
        dataIndex: 'after_wallet',
      },
      {
        title: '更新时间',
        dataIndex: 'last_update_time',
        render: val => {
          if (val) {
            return <span>{formatDate(val, 'YYYY-MM-DD')}</span>;
          } else {
            return <span>-</span>;
          }
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
    const breadcrumbList = [
      { title: '电费业务明细', href: '/electricityfee/electricityfeelist' },
      { title: '用电量明细', href: '' },
    ];
    return (
      <PageHeaderLayout title="用电量明细" breadcrumbList={breadcrumbList}>
        <Card bordered={false}>
          <table width="100%">
            <tbody>
              <tr>
                <td>
                  门牌号：{this.props.location.query.building_name}
                  &nbsp;&nbsp; &nbsp;&nbsp; 设备名称:{this.props.location.query.name} &nbsp;&nbsp;
                  &nbsp;&nbsp; 电表地址：{this.props.location.query.meter_addr} &nbsp;&nbsp;
                  &nbsp;&nbsp; 电表类型:
                  <DicShow pcode="OPER$#electric_meters_type" code={[etype]} />
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
        <div style={{marginTop:'20px'}}>{this.renderSearchForm()}</div>
        <Card bordered={false}>
          <div className={styles.tableList}>
            {/* <div className={styles.tableListForm}>{this.renderSearchForm()}</div> */}
            <Button key="exportEle" code="exportEle" onClick={() => this.onItemExportClick()}>
              导出用电量明细
            </Button>

            <div style={{marginTop:'20px'}}>
              <Table
                loading={loading}
                rowKey={record => record.record_id}
                dataSource={list}
                columns={columns}
                pagination={paginationProps}
                onChange={this.onTableChange}
              />
            </div>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
