import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Table, Modal, Layout } from 'antd';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import PButton from '@/components/PermButton';
import BuildConstruCard from './BuildConstruCard';
import ZoneTree from '@/components/ZoneTree';
import styles from './BuildConstruList.less';

@connect(({ buildconstru, loading }) => ({
  buildconstru,
  loading: loading.models.buildconstru,
}))
@Form.create()
class BuildConstruList extends PureComponent {
  state = {
    selectedRowKeys: [],
    selectedRows: [],
  };

  componentDidMount() {
    this.dispatch({
      type: 'buildconstru/fetch',
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
      type: 'buildconstru/loadForm',
      payload: {
        type: 'E',
        id: item.record_id,
      },
    });
  };

  handleAddClick = () => {
    this.dispatch({
      type: 'buildconstru/loadForm',
      payload: {
        type: 'A',
      },
    });
  };

  handleDelClick = () => {
    const { selectedRows } = this.state;
    if (selectedRows.length === 0) {
      return;
    }
    const item = selectedRows[0];
    Modal.confirm({
      title: `确定删除【建筑数据：${item.name}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.handleDelOKClick.bind(this, item.record_id),
    });
  };

  onTableSelectRow = (selectedRowKeys, selectedRows) => {
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

  onResetFormClick = () => {
    const { form } = this.props;
    form.resetFields();

    const { search } = this.props.buildconstru;
    this.dispatch({
      type: 'buildconstru/fetch',
      search: { parent_id: search.parent_id },
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

      const { search } = this.props.buildconstru;
      this.dispatch({
        type: 'buildconstru/fetch',
        search: {
          ...search,
          ...values,
        },
      });
      this.clearSelectRows();
    });
  };

  handleFormSubmit = data => {
    this.dispatch({
      type: 'buildconstru/submit',
      payload: data,
    });
    this.clearSelectRows();
  };

  handleFormCancel = () => {
    this.dispatch({
      type: 'buildconstru/changeFormVisible',
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

  onTreeNodeSelect = node => {
    this.dispatch({
      type: 'buildconstru/saveSelectNode',
      payload: { record_id: node.key, name: node.title },
    });

    const { search } = this.props.buildconstru;
    this.dispatch({
      type: 'buildconstru/fetch',
      search: {
        ...search,
        parent_id: node.key,
      },
    });
  };

  handleDelOKClick(id) {
    this.dispatch({
      type: 'buildconstru/del',
      payload: { record_id: id },
    });
    this.clearSelectRows();
  }

  renderDataForm() {
    return <BuildConstruCard onCancel={this.handleFormCancel} onSubmit={this.handleFormSubmit} />;
  }

  renderSearchForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.onSearchFormSubmit} layout="inline">
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item label="建筑编号">
              {getFieldDecorator('code')(<Input placeholder="请输入" />)}
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
      buildconstru: {
        data: { list },
      },
    } = this.props;

    const { selectedRowKeys } = this.state;

    const columns = [
      {
        title: '建筑编号',
        dataIndex: 'code',
        width: 150,
      },
      {
        title: '建筑名称',
        dataIndex: 'name',
        width: 150,
      },
      {
        title: '建筑面积',
        dataIndex: 'floor_area',
        width: 100,
      },
      {
        title: '使用面积',
        dataIndex: 'usage_area',
        width: 100,
      },
      {
        title: '计费面积',
        dataIndex: 'billing_area',
        width: 100,
      },
    ];

    const breadcrumbList = [{ title: '空间管理' }, { title: '建筑管理', href: '/buildconstru' }];

    return (
      <PageHeaderLayout title="建筑管理" breadcrumbList={breadcrumbList}>
        <Layout>
          <Layout.Sider
            width={200}
            style={{ background: '#fff', borderRight: '1px solid lightGray' }}
          >
            <ZoneTree onSelect={this.onTreeNodeSelect} />
          </Layout.Sider>
          <Layout.Content>
            <Card bordered={false}>
              <div className={styles.tableList}>
                <div className={styles.tableListForm}>{this.renderSearchForm()}</div>
                <div className={styles.tableListOperator}>
                  <PButton
                    code="add"
                    icon="plus"
                    type="primary"
                    onClick={() => this.handleAddClick()}
                  >
                    新建
                  </PButton>
                  {selectedRowKeys.length === 1 && [
                    <PButton
                      key="edit"
                      code="edit"
                      icon="edit"
                      onClick={() => this.handleEditClick()}
                    >
                      编辑
                    </PButton>,
                    <PButton
                      key="del"
                      code="del"
                      icon="delete"
                      type="danger"
                      onClick={() => this.handleDelClick()}
                    >
                      删除
                    </PButton>,
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
                  pagination={false}
                  onChange={this.onTableChange}
                  size="small"
                />
              </div>
            </Card>
          </Layout.Content>
        </Layout>
        {this.renderDataForm()}
      </PageHeaderLayout>
    );
  }
}
export default BuildConstruList;
