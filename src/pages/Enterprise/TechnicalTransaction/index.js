import React, { PureComponent } from 'react';
import { Card, Form, Input, Table, Badge, Button, Modal, notification, Select } from 'antd';
import moment from 'moment';
import { DicSelect, DicShow } from '@/components/Dictionary';
import Edit from './Edit';
import PButton from '@/components/PermButton';

import styles from './index.less';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { SearchCard, SearchItem } from '../../../components/SearchCard';
import * as Service from '@/services/technicalTransaction';

/**
 * 产权交易管理
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

  onItemEditClick = device => {
    this.setState({ editDevice: { ...device } }, () => {
      this.setState({ editVisible: true });
    });
  };

  onItemDeleteClick = device => {
    Modal.confirm({
      title: `确定删除项目【${device.name}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        Service.del(device).then(res => {
          if (res && !res.error) {
            notification.success({
              key: 'itemDelete',
              message: '项目删除成功',
              description: `项目【${device.name}】已经删除!`,
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
      this.setState({ editVisible: false, editDevice: { ...device }, selectedRowKeys: null, selectedRows: null  }, () => {
        this.getList();
      });
    } else {
      this.setState({ editVisible: false, editDevice: null, selectedRowKeys: null, selectedRows: null  }, () => {
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
      title: '编号',
      dataIndex: 'code',
      width: 150,
      render: val => val,
    },
    {
      title: '项目类型',
      dataIndex: 'category',
      width: 160,
      render: val => <DicShow pcode="OPER$#project_type" code={[val]} show={name => name} />,
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 400,
      render: val => val,
    },
    {
      title: '挂牌期限',
      dataIndex: 'the_term_start',
      width: 200,
      render: (val,row) => {
        return `${val || '未知'} 至 ${row.the_term_end?row.the_term_end:'未知'}`;
      },
    },
    {
      title: '挂牌价格（万元）',
      dataIndex: 'listing_price',
      width: 150,
      render: val => val,
    },
    {
      title: '行业分类',
      dataIndex: 'industry',
      width: 120,
      render: val => val,
    },
    {
      title: '项目状态',
      dataIndex: 'status',
      width: 120,
      render: val => {
        return <DicShow pcode="OPER$#project_status" code={[val]} show={name => name} />;
      },
    },
    {
      title: '发布状态',
      dataIndex: 'publish_status',
      width: 120,
      render: val => {
        return {
          1: <Badge color="green" text="已发布" />,
          2: <Badge color="yellow" text="未发布" />,
        }[val];
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      width: 220,
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
        <SearchItem label="编号">
          {getFieldDecorator('like_code')(<Input placeholder="编号" />)}
        </SearchItem>
        <SearchItem label="名称">
          {getFieldDecorator('like_name')(<Input placeholder="名称" />)}
        </SearchItem>
        <SearchItem label="项目类型">
          {getFieldDecorator('category', {
            rules: [{ required: false, message: '请选择项目类型' }],
          })(
            <DicSelect
              vmode="int"
              pcode="OPER$#project_type"
              selectProps={{ placeholder: '请选择' }}
            />
          )}
        </SearchItem>
        <SearchItem label="项目状态">
          {getFieldDecorator('status', {
            rules: [{ required: false, message: '请选择项目状态' }],
          })(
            <DicSelect
              vmode="int"
              pcode="OPER$#project_status"
              selectProps={{ placeholder: '请选择' }}
            />
          )}
        </SearchItem>
        <SearchItem label="发布状态">
          {getFieldDecorator('publish_status', {
            rules: [{ required: false, message: '请选择发布状态' }],
          })(
            <Select placeholder="请选择">
              <Select.Option value={1}>已发布</Select.Option>
              <Select.Option value={2}>未发布</Select.Option>
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
      <PageHeaderLayout title="产权交易管理">
        <Card className={styles.main}>
          {this.renderSearchForm()}
          <div className={styles.lists}>
            <div className={styles.buttons}>
              <PButton key="add" code="add" type="primary" onClick={() => this.onItemEditClick({})}>
                添加项目
              </PButton>
              {selectedRows && selectedRows.length === 1 && [
                <PButton
                  key="edit"
                  code="edit"
                  onClick={() => this.onItemEditClick(selectedRows[0])}
                >
                  编辑项目
                </PButton>,
                <PButton
                  key="delete"
                  code="delete"
                  type="danger"
                  onClick={() => this.onItemDeleteClick(selectedRows[0])}
                >
                  删除项目
                </PButton>,
                <Button
                  key="preview"
                  type="primary"
                  onClick={() => {
                    window.open(selectedRows[0].project_details)
                  }}
                >
                  预览项目
                </Button>,
                <Button
                  key="publish"
                  onClick={() => this.publish(selectedRows[0])}
                >
                  发布项目
                </Button>,
              ]}
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
            editDevice={editDevice}
            onSaved={this.onSaved}
            onClose={this.onClose}
          />
        ) : null}
      </PageHeaderLayout>
    );
  }
}
