import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Table, Layout, Tree } from 'antd';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import ShowModal from '../Modal';
import { DicShow } from '@/components/Dictionary';

import styles from './index.less';

@connect(({ monitorShow, loading }) => ({
  monitorShow,
  loading: loading.models.monitorShow,
}))
@Form.create()
class MonitorShowList extends PureComponent {
  state = {
    selectedRowKeys: [],
    selectedRows: [],
    treeSelectedKeys: [],
  };

  componentDidMount() {
    this.dispatch({
      type: 'monitorShow/fetchPositionTree',
    });

    this.dispatch({
      type: 'monitorShow/fetchMonitor',
      search: {},
      pagination: {},
    });
  }

  handleEditClick = () => {
    const { selectedRows } = this.state;
    if (selectedRows.length === 0) {
      return;
    }
    const item = selectedRows[0];
    this.dispatch({
      type: 'monitorShow/loadForm',
      payload: item,
      callback: this.handleCallback.bind(this),
    });
  };

  handleCallback = () => {
    this.dispatch({
      type: 'monitorShow/changeFormVisible',
      payload: true,
    });
  };

  onTableSelectRow = (selectedRowKeys, selectedRows) => {
    const obj = {
      selectedRowKeys: [],
      selectedRows: [],
    };
    if (selectedRowKeys.length > 0) {
      obj.selectedRowKeys = [selectedRowKeys[selectedRowKeys.length - 1]];
    }
    if (selectedRows.length > 0) {
      obj.selectedRows = [selectedRows[selectedRows.length - 1]];
    }
    this.setState(obj);
  };

  onTableChange = pagination => {
    this.dispatch({
      type: 'monitorShow/fetchMonitor',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
    this.clearSelectRows();
  };

  onResetFormClick = () => {
    const { form } = this.props;
    form.resetFields();
    this.dispatch({
      type: 'monitorShow/fetchMonitor',
      search: { position_id: this.getParentID() },
      pagination: {},
    });
  };

  onSearchFormSubmit = e => {
    if (e) {
      e.preventDefault();
    }

    const { form } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.dispatch({
        type: 'monitorShow/fetchMonitor',
        search: {
          ...values,
          position_id: this.getParentID(),
        },
        pagination: {},
      });
      this.clearSelectRows();
    });
  };

  handleFormCancel = () => {
    this.dispatch({
      type: 'monitorShow/changeFormVisible',
      payload: false,
    });
  };

  clearSelectRows = () => {
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys.length === 0) {
      return;
    }
    this.setState({ selectedRowKeys: [], selectedRows: [] });
  };

  dispatch = action => {
    const { dispatch } = this.props;
    dispatch(action);
  };

  getParentID = () => {
    const { treeSelectedKeys } = this.state;
    let parentID = '';
    if (treeSelectedKeys.length > 0) {
      [parentID] = treeSelectedKeys;
    }
    return parentID;
  };

  renderShow() {
    const {
      monitorShow: { formVisible, formTitle, formData },
    } = this.props;
    return (
      formVisible && (
        <ShowModal
          visible={formVisible}
          title={formTitle}
          formData={formData}
          onCancel={this.handleFormCancel}
        />
      )
    );
  }

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <Tree.TreeNode title={item.name} key={item.record_id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode title={item.name} key={item.record_id} dataRef={item} />;
    });

  renderSearchForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.onSearchFormSubmit} layout="inline">
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item label="设备名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </Form.Item>
          </Col>
          <Col span={6}>
            <div style={{ overflow: 'hidden' }}>
              <span style={{ marginBottom: 24 }}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.onResetFormClick}>
                  重置
                </Button>
              </span>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      loading,
      monitorShow: {
        data: { list, pagination },
        treeData,
        expandedKeys,
      },
    } = this.props;

    const { selectedRowKeys } = this.state;

    const columns = [
      {
        title: '设备名称',
        dataIndex: 'name',
        width: 200,
      },
      {
        title: '设备厂商',
        dataIndex: 'vendor',
        width: 100,
      },
      {
        title: '设备类型',
        dataIndex: 'device_type',
        width: 100,
        render: val => {
          return <DicShow pcode="OPER$#monitor_category" code={[val]} show={name => name} />;
        },
      },
      {
        title: '设备编号',
        dataIndex: 'device_code',
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => <span>共{total}条</span>,
      ...pagination,
    };

    // const breadcrumbList = [{ title: '监控设备展示' }];

    return (
      <PageHeaderLayout title="视频监控展示">
        <Layout>
          <Layout.Sider
            width={200}
            style={{ background: '#fff', borderRight: '1px solid lightGray' }}
          >
            <Tree
              expandedKeys={expandedKeys}
              onSelect={keys => {
                this.setState({
                  treeSelectedKeys: keys,
                });

                const {
                  monitorShow: { search },
                } = this.props;

                const item = {
                  position_id: '',
                };

                if (keys.length > 0) {
                  [item.position_id] = keys;
                }

                this.dispatch({
                  type: 'monitorShow/fetchMonitor',
                  search: { ...search, ...item },
                  pagination: {},
                });

                this.clearSelectRows();
              }}
              onExpand={keys => {
                this.dispatch({
                  type: 'monitorShow/saveExpandedKeys',
                  payload: keys,
                });
              }}
            >
              {this.renderTreeNodes(treeData)}
            </Tree>
          </Layout.Sider>
          <Layout.Content>
            <Card bordered={false}>
              <div className={styles.tableList}>
                <div className={styles.tableListForm}>{this.renderSearchForm()}</div>
                <div className={styles.tableListOperator}>
                  {selectedRowKeys.length === 1 && [
                    <Button
                      key="edit"
                      icon="eye"
                      type="primary"
                      onClick={() => this.handleEditClick()}
                    >
                      查看实时监控
                    </Button>,
                  ]}
                </div>
                <Table
                  rowSelection={{
                    selectedRowKeys,
                    onChange: this.onTableSelectRow,
                  }}
                  loading={loading}
                  rowKey={record => record.record_id}
                  dataSource={list}
                  columns={columns}
                  pagination={paginationProps}
                  onChange={this.onTableChange}
                  size="small"
                />
              </div>
            </Card>
          </Layout.Content>
        </Layout>
        {this.renderShow()}
      </PageHeaderLayout>
    );
  }
}
export default MonitorShowList;
