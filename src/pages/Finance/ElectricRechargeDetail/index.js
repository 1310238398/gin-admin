import React, { PureComponent } from 'react';
import { Card, Form, Input, Modal, notification, Select, DatePicker } from 'antd';
import List from './List';
import Edit from './Edit';

import styles from './index.less';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { SearchCard, SearchItem } from '../../../components/SearchCard';
import * as electricRechargesDetail from '@/services/electricRechargesDetail';

const { RangePicker } = DatePicker;

@Form.create()
export default class ElectricMeters extends PureComponent {
  state = {
    loading: true,
    editVisible: false,
    editDevice: null,
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
    this.setState({ loading: true });
    const formData = this.props.form.getFieldsValue();
    if (formData && formData.date) {
      const startTime = formData.date[0].format('YYYY-MM-DDTHH:mm:ssZ');
      const endTime = formData.date[1].format('YYYY-MM-DDTHH:mm:ssZ');
      delete formData.date;
      formData.startTime = startTime;
      formData.endTime = endTime;
    }
    const searchData = {
      q: 'page',
      pageSize: this.pageSize,
      current: this.current,
      ...formData,
    };
    electricRechargesDetail.query(searchData).then(res => {
      this.setState({
        loading: false,
        data: res,
      });
    });
  };

  onItemEditClick = device => {
    this.setState({ editDevice: { ...device } }, () => {
      this.setState({ editVisible: true });
    });
  };

  /**
   * 删除选中的设备
   */
  onItemMigrationClick = device => {
    Modal.confirm({
      title: `确定删除电表【${device.name}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        electricRechargesDetail.del(device).then(res => {
          if (res && !res.error) {
            notification.success({
              key: 'deleteDevice',
              message: '设备删除成功',
              description: `电表【${device.name}】已经删除!`,
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

  onSaved = device => {
    if (device) {
      this.setState({ editVisible: false, editDevice: { ...device } }, () => {
        this.getList();
      });
    } else {
      this.setState({ editVisible: false, editDevice: null }, () => {
        this.getList();
      });
    }
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

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <SearchCard form={this.props.form} onSearch={this.getList} onReset={this.onResetFormClick}>
        <SearchItem label="充值人">
          {getFieldDecorator('creatorName')(<Input placeholder="充值人" />)}
        </SearchItem>
        <SearchItem label="充值人手机号">
          {getFieldDecorator('creatorTel')(<Input placeholder="充值人手机号" />)}
        </SearchItem>
        <SearchItem label="电表表号">
          {getFieldDecorator('meterAddr')(<Input placeholder="电表表号" />)}
        </SearchItem>
        <SearchItem label="最小金额">
          {getFieldDecorator('amountMin')(<Input placeholder="最小金额" />)}
        </SearchItem>
        <SearchItem label="最大金额">
          {getFieldDecorator('amountMax')(<Input placeholder="最大金额" />)}
        </SearchItem>
        <SearchItem label="第三方充值状态">
          {getFieldDecorator('thirdStatus')(
            <Select placeholder="第三方充值状态">
              <Select.Option key={1} value={1}>
                超时
              </Select.Option>
              <Select.Option key={2} value={2}>
                成功
              </Select.Option>
              <Select.Option key={3} value={3}>
                失败
              </Select.Option>
            </Select>
          )}
        </SearchItem>
        <SearchItem label="日期">{getFieldDecorator('date')(<RangePicker />)}</SearchItem>
      </SearchCard>
    );
  }

  render() {
    const {
      editVisible,
      editDevice,
      data: { list, pagination },
      loading,
    } = this.state;
    return (
      <PageHeaderLayout title="电表充值流水管理">
        <Card className={styles.gate}>
          {this.renderSearchForm()}
          <List
            list={list}
            pagination={pagination}
            loading={loading}
            onTableChange={this.onTableChange}
            onItemEditClick={this.onItemEditClick}
            onItemMigrationClick={this.onItemMigrationClick}
          />
        </Card>
        {/* 编辑窗口 */}
        {editVisible ? (
          <Edit editVisible={editVisible} editDevice={editDevice} onClose={this.onClose} />
        ) : null}
      </PageHeaderLayout>
    );
  }
}
