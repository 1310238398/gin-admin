import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Modal,
  Layout,
  Tree,
  Input,
  Alert,
  message,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import EnterpriseDepartmentCard from './EnterpriseDepartmentCard';
import styles from './EnterpriseDepartment.less';
// import EnterpriseSelect from '../../../components/EnterpriseSelect';

@connect(state => ({
  enterpriseDepartment: state.enterpriseDepartment,
}))
@Form.create()
export default class EnterpriseDepartment extends PureComponent {
  state = {
    // expandForm: false,
    selectedRows: [],
    selectedRowsCon: [],
    dataForm: false,
    dataFormID: '',
    dataFormType: '',
    treeSelectedKeys: [],
  };

  componentDidMount() {
    const {
      location: { query },
    } = this.props;
    this.props.dispatch({
      type: 'enterpriseDepartment/saveSearch',
      payload: {},
    });
    this.props.dispatch({
      type: 'enterpriseDepartment/savePagination',
      payload: {},
    });
    this.props.dispatch({
      type: 'enterpriseDepartment/fetchSearchTree',
      payload: query,
    });
    this.props.dispatch({
      type: 'enterpriseDepartment/fetch',
      payload: {},
      pagination: {},
      info: query,
    });
  }

  onDelBatchOKClick = item => {
    const {
      location: { query },
      enterpriseDepartment: { parentId, dataList },
    } = this.props;
    const key_id = parentId;
    if (dataList && dataList.length > 0) {
      message.warn('该部门下面存在下级部门，不允许删除，如需删除请先将下级部门删除');
    } else {
      this.props.dispatch({
        type: 'enterpriseDepartment/del',
        payload: item,
        info: { key_id, ...query },
      });
    }
    this.setState({
      selectedRows: [],
      selectedRowsCon: [],
    });
  };

  onBatchDelClick = item => {
    const item_id = item.record_id;
    const {
      location: { query },
    } = this.props;

    this.props.dispatch({
      type: 'enterpriseDepartment/fetchChildren',
      info: { item_id, ...query },
    });
    Modal.confirm({
      title: '确认删除选中的部门吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDelBatchOKClick.bind(this, item),
    });
  };

  onAddClick = () => {
    this.setState({ dataForm: true, dataFormID: '', dataFormType: 'A' });
  };

  onBatchEditClick = id => {
    this.setState({ dataForm: true, dataFormID: id, dataFormType: 'E' });
  };

  onDelOKClick(id) {
    this.props.dispatch({
      type: 'enterpriseDepartment/del',
      payload: { record_id: id },
    });
  }

  onItemDelClick = item => {
    Modal.confirm({
      title: `确定删除【部门数据：${item.name}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDelOKClick.bind(this, item.record_id),
    });
  };

  onTableSelectRow = (rows, rowsCon) => {
    this.setState({
      selectedRows: rows,
      selectedRowsCon: rowsCon,
    });
  };

  onTableChange = pagination => {
    const {
      location: { query },
      enterpriseDepartment: { parentId },
    } = this.props;
    const key_id = parentId;
    this.props.dispatch({
      type: 'enterpriseDepartment/fetch',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
      info: { key_id, ...query },
    });
  };

  // onToggleFormClick = () => {
  //   this.setState({
  //     expandForm: !this.state.expandForm,
  //   });
  // };

  onResetFormClick = () => {
    const {
      location: { query },
    } = this.props;
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'enterpriseDepartment/savePagination',
      payload: {},
    });
    this.props.dispatch({
      type: 'enterpriseDepartment/saveSearch',
      payload: { parent_id: this.getParentID() },
    });
    this.props.dispatch({
      type: 'enterpriseDepartment/fetch',
      info: query,
    });
  };

  onSearchFormSubmit = e => {
    const {
      location: { query },
    } = this.props;
    if (e) {
      e.preventDefault();
    }
    this.props.dispatch({
      type: 'enterpriseDepartment/savePagination',
      payload: {},
    });

    const formData = this.props.form.getFieldsValue();

    this.props.dispatch({
      type: 'enterpriseDepartment/fetch',
      payload: {
        name: formData.name,
      },
      info: query,
    });
  };

  onDataFormCallback = result => {
    const {
      location: { query },
      enterpriseDepartment: { parentId },
    } = this.props;
    const key_id = parentId;
    this.setState({ dataForm: false, dataFormID: '' });
    if (result && result === 'ok') {
      this.props.dispatch({
        type: 'enterpriseDepartment/fetchSearchTree',
        payload: query,
      });
      this.props.dispatch({
        type: 'enterpriseDepartment/fetch',
        info: { key_id, ...query },
      });
    }
  };

  getParentID = () => {
    const { treeSelectedKeys } = this.state;
    let parentID = '';
    if (treeSelectedKeys.length > 0) {
      [parentID] = treeSelectedKeys;
    }
    return parentID;
  };

  renderDataForm() {
    const {
      location: { query },
    } = this.props;
    if (this.state.dataForm) {
      return (
        <EnterpriseDepartmentCard
          id={this.state.dataFormID}
          type={this.state.dataFormType}
          callback={this.onDataFormCallback}
          info={query}
        />
      );
    }
  }

  renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <Tree.TreeNode title={item.name} key={item.record_id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode title={item.name} key={item.record_id} dataRef={item} />;
    });
  };

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.onSearchFormSubmit} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Form.Item label="部门名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </Form.Item>
          </Col>
          {/* <Col md={8} sm={24}>
            <Form.Item label="企业名称">
              {getFieldDecorator('enterprise_id')(<Input placeholder="请输入" />)}
            </Form.Item>
          </Col> */}
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.onResetFormClick}>
              重置
            </Button>
          </span>
        </div>
      </Form>
    );
  }

  renderProvince(val) {
    const { treeData } = this.props.province;

    const getName = data => {
      for (let i = 0; i < data.length; i += 1) {
        if (data[i].record_id === val) {
          return data[i].name;
        } else if (data[i].children && data[i].children.length > 0) {
          const name = getName(data[i].children);
          if (name !== '') {
            return name;
          }
        }
      }
      return '';
    };
    return <span>{getName(treeData)}</span>;
  }

  render() {
    const {
      enterpriseDepartment: {
        loading,
        data: { list, pagination },
        searchTreeData,
        expandedKeys,
      },
      location: { query },
    } = this.props;
    const { selectedRowsCon, selectedRows } = this.state;
    const columns = [
      {
        title: '部门名称',
        dataIndex: 'name',
      },
      {
        title: '备注',
        dataIndex: 'memo',
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
      { title: '企业管理', href: '/enterprise/enterpriselist' },
      { title: '部门管理', href: '' },
    ];
    return (
      <PageHeaderLayout title="部门管理" breadcrumbList={breadcrumbList}>
        <Card bordered={false}>
          <table width="100%">
            <tbody>
              <tr>
                <td>
                  {/* 全局统计信息 */}
                  <Alert
                    type="info"
                    showIcon
                    message={`当前所在企业：${this.props.location.query.name}`}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
        <Layout>
          <Layout.Sider
            width={240}
            style={{ background: '#fff', borderRight: '1px solid lightGray' }}
          >
            <Tree
              expandedKeys={expandedKeys}
              onSelect={(keys, { selectedNodes }) => {
                this.setState({ treeSelectedKeys: keys });
                const { search } = this.props.enterpriseDepartment;
                const item = {
                  parent_id: '',
                  parent_type: '',
                };
                const key_id = keys[0];
                if (keys.length > 0) {
                  [item.parent_id] = keys;
                  item.parent_type = selectedNodes[0].props.dataRef.type;
                }
                this.props.dispatch({
                  type: 'enterpriseDepartment/savePagination',
                  payload: {},
                });
                this.props.dispatch({
                  type: 'enterpriseDepartment/saveSearch',
                  payload: { ...search, ...item },
                });
                this.props.dispatch({
                  type: 'enterpriseDepartment/fetch',
                  info: { key_id, ...query },
                });
              }}
              onExpand={keys => {
                this.props.dispatch({
                  type: 'enterpriseDepartment/saveExpandedKeys',
                  payload: keys,
                });
              }}
            >
              {this.renderTreeNodes(searchTreeData)}
            </Tree>
          </Layout.Sider>
          <Layout.Content>
            <Card bordered={false}>
              <div className={styles.tableList}>
                {/* <div className={styles.tableListForm}>{this.renderSearchForm()}</div> */}
                <div className={styles.conBtn}>
                  <Button icon="plus" type="primary" onClick={() => this.onAddClick()}>
                    新建
                  </Button>
                  {selectedRows.length === 1 && (
                    <span className={styles.delBtn}>
                      <Button
                        icon="edit"
                        type="danger"
                        onClick={() => this.onBatchEditClick(selectedRows[0])}
                      >
                        编辑
                      </Button>
                    </span>
                  )}
                  {selectedRows.length === 1 && (
                    <span className={styles.editBtn}>
                      <Button
                        icon="delete"
                        type="danger"
                        onClick={() => this.onBatchDelClick(selectedRowsCon[0])}
                      >
                        删除
                      </Button>
                    </span>
                  )}
                </div>
                <div>
                  <Table
                    rowSelection={{
                      selectedRowKeys: selectedRows,
                      onChange: this.onTableSelectRow,
                      selectedRows: selectedRowsCon,
                      hideDefaultSelections: true,
                    }}
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
          </Layout.Content>
        </Layout>
        {this.renderDataForm()}
      </PageHeaderLayout>
    );
  }
}
