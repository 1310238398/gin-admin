import React, { PureComponent } from 'react';
import { Card, Form, Input, Table, Badge, Button, Select } from 'antd';
import moment from 'moment';
import { DicSelect, DicShow } from '@/components/Dictionary';
import Edit from './Edit';

import styles from './index.less';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { SearchCard, SearchItem } from '../../../components/SearchCard';
import * as electricMetersService from '@/services/electricMeters';

/**
 * 当前企业电表管理
 * */
@Form.create()
export default class extends PureComponent {
  state = {
    loading: true,
    editVisible: false,
    editDevice: null,
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
      q: 'enterprise',
      pageSize: this.pageSize,
      current: this.current,
      ...formData,
    };
    electricMetersService.query(searchData).then(res => {
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

  onClose = () => {
    this.setState({ editVisible: false });
  };

  onSaved = device => {
    if (device) {
      this.setState({ editVisible: false, editDevice: { ...device }, selectedRowKeys: null, selectedRows: null }, () => {
        this.getList();
      });
    } else {
      this.setState({ editVisible: false, editDevice: null, selectedRowKeys: null, selectedRows: null }, () => {
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
      title: '门牌号',
      dataIndex: 'building_name',
      width: 120,
      render: val => val,
    },
    {
      title: '电表名',
      dataIndex: 'name',
      width: 120,
      render: val => val,
    },
    {
      title: '电表号',
      dataIndex: 'meter_addr',
      width: 120,
      render: val => val,
    },
    {
      title: '账户余额',
      dataIndex: 'wallet',
      width: 140,
      render: val => (
        <Badge color={val <= 0 ? 'red' : 'green'} text={`${(val / 100).toFixed(2)} 元`} />
      ),
    },
    {
      title: '电表类型',
      dataIndex: 'etype',
      width: 100,
      render: val => {
        return <DicShow pcode="OPER$#electric_meters_type" code={[val]} show={name => name} />;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      width: 220,
      render: val => moment(val).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <SearchCard form={this.props.form} onSearch={this.getList} onReset={this.onResetFormClick}>
        <SearchItem label="表号">
          {getFieldDecorator('meterAddr')(<Input placeholder="表号" />)}
        </SearchItem>
        <SearchItem label="名称">
          {getFieldDecorator('name')(<Input placeholder="名称" />)}
        </SearchItem>
        <SearchItem label="电表类型">
          {getFieldDecorator('etype', {
            rules: [{ required: false, message: '请选择电表类型' }],
          })(
            <DicSelect
              vmode="int"
              pcode="OPER$#electric_meters_type"
              selectProps={{ placeholder: '请选择' }}
            />
          )}
        </SearchItem>
        <SearchItem label="欠费状态">
          {getFieldDecorator('status', {
            rules: [{ required: false, message: '请选择欠费状态' }],
          })(
            <Select placeholder="请选择">
              <Select.Option value={1}>欠费</Select.Option>
              <Select.Option value={2}>正常</Select.Option>
            </Select>
          )}
        </SearchItem>
      </SearchCard>
    );
  }

  render() {
    const {
      editVisible,
      editDevice,
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
      <PageHeaderLayout title="企业电表">
        <Card className={styles.main}>
          {this.renderSearchForm()}
          <div className={styles.lists}>
            <div className={styles.buttons}>
              {selectedRows && selectedRows.length === 1 && (
                <Button
                  key="preview"
                  type="primary"
                  onClick={() => {
                    this.onItemEditClick(selectedRows[0]);
                  }}
                >
                  缴费流水
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
            editInfo={editDevice}
            onSaved={this.onSaved}
            onClose={this.onClose}
          />
        ) : null}
      </PageHeaderLayout>
    );
  }
}
