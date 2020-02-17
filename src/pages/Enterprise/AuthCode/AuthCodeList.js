import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Modal, Badge, Alert, Table } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import AuthCodeCard from './AuthCodeCard';
import ViewCard from './ViewCard';
import CodeCard from './CodeCard';
import HistoryCard from './HistoryCard';
import UserTypeSelect from '../UserType/Select';
import UserTypeShow from '../UserType/Show';
import { getNowUnix, formatDate } from '../../../utils/utils';
import styles from './AuthCodeList.less';

@connect(state => ({
  authCode: state.authCode,
}))
@Form.create()
export default class AuthCodeList extends PureComponent {
  state = {
    dataForm: false,
    dataFormID: '',
    selectedRows: [],
    selectedRowsCon: [],
    dataFormType: '',
    codeForm: false,
    codeFormValue: '',
    viewForm: false,
    historyForm: false,
  };

  componentDidMount() {
    const enterprise_id = this.props.location.query.record_id;
    this.props.dispatch({
      type: 'authCode/saveSearch',
      payload: {enterprise_id},
    });

    this.props.dispatch({
      type: 'authCode/fetch',
      payload: { enterprise_id },
      pagination: {},
    });
  }

  onItemDisableOKClick = id => {
    this.props.dispatch({
      type: 'authCode/changeStatus',
      payload: { record_id: id, status: 2 },
    });
  };

  onItemDisableClick = item => {
    Modal.confirm({
      title: `确定作废认证码【${item.code}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onItemDisableOKClick.bind(this, item.record_id),
    });
  };

  onItemListClick = id => {
    this.setState({ historyForm: true, dataFormID: id, dataFormType: 'H' });
  };

  onItemViewClick = id => {
    this.setState({ viewForm: true, dataFormID: id, dataFormType: 'V' });
  };

  onAddClick = () => {
    this.setState({ dataForm: true, dataFormID: '', dataFormType: 'A' });
  };

  onTableChange = pagination => {
    const enterprise_id = this.props.location.query.record_id;
    this.props.dispatch({
      type: 'authCode/fetch',
      payload: { enterprise_id },
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  onTableSelectRow = (rows, rowsCon) => {
    this.setState({
      selectedRows: rows,
      selectedRowsCon: rowsCon,
    });
  };

  onResetFormClick = () => {
    this.props.form.resetFields();

    const enterprise_id = this.props.location.query.record_id;
    this.props.dispatch({
      type: 'authCode/saveSearch',
      payload: {enterprise_id},
    });

    this.props.dispatch({
      type: 'authCode/fetch',
      payload: { enterprise_id },
      pagination: {},
    });
  };

  onSearchFormSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    const enterprise_id = this.props.location.query.record_id;
    const formData = this.props.form.getFieldsValue();
    if (formData.effective_start) {
      formData.effective_start = formData.effective_start.unix();
    }
    if (formData.effective_end) {
      formData.effective_end = formData.effective_end.unix();
    }
    formData.enterprise_id = enterprise_id;
    this.props.dispatch({
      type: 'authCode/fetch',
      payload: formData,
    });
  };

  onDataFormCallback = (result, code) => {
    const enterprise_id = this.props.location.query.record_id;
    this.setState({ dataForm: false, dataFormID: '' });
    if (result && result === 'ok') {
      this.setState({ codeForm: true, codeFormValue: code });
      this.props.dispatch({
        type: 'authCode/fetch',
        payload: { enterprise_id },
      });
    }
  };

  onCodeFormCallback = () => {
    this.setState({ codeForm: false, codeFormValue: '' });
  };

  onViewFormCallback = () => {
    this.setState({ viewForm: false, dataFormID: '' });
  };

  onHistoryFormCallback = () => {
    this.setState({ historyForm: false, dataFormID: '' });
  };

  renderDataForm() {
    const {
      location: { query },
    } = this.props;
    if (this.state.dataForm) {
      return (
        <AuthCodeCard
          id={this.state.dataFormID}
          type={this.state.dataFormType}
          info={query}
          callback={this.onDataFormCallback}
          enterId={this.props.location.query.record_id}
        />
      );
    }
  }

  renderCodeForm() {
    if (this.state.codeForm) {
      return <CodeCard value={this.state.codeFormValue} callback={this.onCodeFormCallback} />;
    }
  }

  renderViewForm() {
    const {
      location: { query },
    } = this.props;
    if (this.state.viewForm) {
      return (
        <ViewCard
          id={this.state.dataFormID}
          type={this.state.dataFormType}
          info={query}
          callback={this.onViewFormCallback}
        />
      );
    }
  }

  renderHistoryForm() {
    const {
      location: { query },
    } = this.props;
    if (this.state.historyForm) {
      return (
        <HistoryCard
          id={this.state.dataFormID}
          type={this.state.dataFormType}
          info={query}
          callback={this.onHistoryFormCallback}
        />
      );
    }
  }

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSearchFormSubmit} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {/* <Col md={8} sm={24}>
            <Form.Item label="企业名称">
              {getFieldDecorator('enterprise_id')(<Input placeholder="请输入" />)}
            </Form.Item>
          </Col> */}
          <Col md={8} sm={24}>
            <Form.Item label="认证码">
              {getFieldDecorator('code')(<Input placeholder="请输入" />)}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="认证类别">
              {getFieldDecorator('code_type')(
                <UserTypeSelect enterpriseID={this.props.location.query.record_id} />
              )}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
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

        {/* <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Form.Item label="生效方式">
              {getFieldDecorator('effective_mode')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Select.Option value="1">时间</Select.Option>
                  <Select.Option value="2">次数</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="有效期From">
              {getFieldDecorator('effective_start')(
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="请选择"
                  style={{ width: '100%' }}
                />
              )}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="有效期To">
              {getFieldDecorator('effective_end')(
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="请选择"
                  style={{ width: '100%' }}
                />
              )}
            </Form.Item>
          </Col>
        </Row> */}

        {/* <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Form.Item label="状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Select.Option value="1">有效</Select.Option>
                  <Select.Option value="2">作废</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>      
        </Row> */}
      </Form>
    );
  }

  render() {
    const {
      authCode: {
        loading,
        data: { list, pagination },
      },
    } = this.props;
    const { selectedRows, selectedRowsCon } = this.state;
    const columns = [
      {
        title: '认证码',
        dataIndex: 'code',
        width: 100,
      },
      // {
      //   title: '企业',
      //   dataIndex: 'enterprise_name',
      //   width: 250,
      // },
      {
        title: '认证身份',
        dataIndex: 'code_type',
        width: 150,
        render: val => {
          return <UserTypeShow enterpriseID={this.props.location.query.record_id} code={val} />;
        },
      },
      {
        title: '生效方式',
        dataIndex: 'effective_mode',
        width: 100,
        render: val => {
          if (val === 1) {
            return <span>按时间</span>;
          }
          return <span>按次数</span>;
        },
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 100,
        render: (val, record) => {
          if (val === 1) {
            if (record.effective_mode === 1) {
              if (getNowUnix() >= record.effective_end) {
                return <Badge status="warning" text="有效(已过期)" />;
              }
            } else if (record.effective_number <= record.used_number) {
              return <Badge status="warning" text="有效(无剩余次数)" />;
            }

            return <Badge status="success" text="有效" />;
          }
          return <Badge status="error" text="作废" />;
        },
      },
      {
        title: '剩余次数/总次数',
        dataIndex: 'effective_number',
        width: 150,
        render: (val, record) => {
          if (record.effective_mode === 1) {
            return <span>-</span>;
          }
          return (
            <span>
              {val - record.used_number}/{val}
            </span>
          );
        },
      },
      {
        title: '有效期From',
        dataIndex: 'effective_start',
        width: 200,
        render: (val, record) => {
          if (record.effective_mode === 2) {
            return <span>-</span>;
          }
          return <span>{formatDate(val, 'YYYY/MM/DD')}</span>;
        },
      },
      {
        title: '有效期To',
        width: 200,
        dataIndex: 'effective_end',
        render: (val, record) => {
          if (record.effective_mode === 2) {
            return <span>-</span>;
          }
          return <span>{formatDate(val, 'YYYY/MM/DD')}</span>;
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
      { title: '企业管理', href: '/enterprise/enterpriselist' },
      { title: '企业认证码管理', href: '' },
    ];
    return (
      <PageHeaderLayout title="企业认证码管理" breadcrumbList={breadcrumbList}>
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
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSearchForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.onAddClick()}>
                新建
              </Button>
              {selectedRows.length === 1 && (
                <span className={styles.delBtn}>
                  <Button
                    icon="view"
                    type="danger"
                    onClick={() => this.onItemViewClick(selectedRows[0])}
                  >
                    查看
                  </Button>
                </span>
              )}
              {selectedRows.length === 1 && selectedRowsCon[0].status === 1 && (
                <span className={styles.editBtn}>
                  <Button
                    icon="delete"
                    type="danger"
                    onClick={() => this.onItemDisableClick(selectedRowsCon[0])}
                  >
                    作废
                  </Button>
                </span>
              )}
              {/* {selectedRowsCon[0].status === 2 && (
                <span className={styles.editBtn}>
                  <Button
                    icon="delete"
                    type="danger"
                    onClick={() => this.onItemAbleClick(selectedRowsCon[0])}
                  >
                    作废
                  </Button>
                </span>
              )} */}
              {selectedRows.length === 1 && (
                <span className={styles.editBtn}>
                  <Button
                    icon="delete"
                    type="danger"
                    onClick={() => this.onItemListClick(selectedRows[0])}
                  >
                    认证清单
                  </Button>
                </span>
              )}
            </div>
            <div>
              <Table
                rowSelection={{
                  selectedRowKeys: selectedRows,
                  selectedRows: selectedRowsCon,
                  onChange: this.onTableSelectRow,
                  hideDefaultSelections: true,
                }}
                loading={loading}
                rowKey={record => record.record_id}
                dataSource={list}
                columns={columns}
                scroll={{ x: 1350 }}
                pagination={paginationProps}
                onChange={this.onTableChange}
              />
            </div>
          </div>
        </Card>
        {this.renderDataForm()}
        {this.renderCodeForm()}
        {this.renderViewForm()}
        {this.renderHistoryForm()}
      </PageHeaderLayout>
    );
  }
}
