import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Modal, Row, Col, Table, Button } from 'antd';
import UserTypeShow from '../UserType/Show';
import { formatDate } from '../../../utils/utils';

@connect(state => ({
  authCode: state.authCode,
}))
export default class AuthCodeHistoryCard extends PureComponent {
  componentDidMount() {
    const { id, type, callback, info } = this.props;
    this.props.dispatch({
      type: 'authCode/loadForm',
      payload: {
        id,
        type,
        callback,
        info,
      },
    });
    this.props.dispatch({
      type: 'authCode/fetchHistory',
      payload: {
        record_id: id,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'authCode/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  onTableChange = pagination => {
    this.props.dispatch({
      type: 'authCode/fetchHistory',
      payload: {
        record_id: this.props.id,
      },
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  render() {
    const {
      info,
      authCode: {
        formTitle,
        formVisible,
        formData,
        historyLoading: loading,
        historyData: { list, pagination },
      },
    } = this.props;

    const columns = [
      {
        title: '昵称',
        dataIndex: 'user.nickname',
        render: val => {
          return <span>{val}</span>;
        },
      },
      {
        title: '姓名',
        dataIndex: 'real_name',
      },
      {
        title: '性别',
        dataIndex: 'user.gender',
        render: val => {
          return <span>{val === 1 ? '男' : '女'}</span>;
        },
      },
      {
        title: '联系电话',
        dataIndex: 'user.phone',
        render: val => {
          return <span>{val}</span>;
        },
      },
      {
        title: '部门',
        dataIndex: 'dept',
        render: val => {
          return <span>{val ? val.name : ''}</span>;
        },
      },
      {
        title: '认证时间',
        dataIndex: 'created_at',
        render: val => {
          return <span>{val ? formatDate(val, 'YYYY-MM-DD HH:mm:ss') : ''}</span>;
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

    return (
      <Modal
        title={formTitle}
        width={1000}
        visible={formVisible}
        maskClosable={false}
        destroyOnClose
        footer={<Button onClick={this.onModalCancelClick}>关闭</Button>}
        onCancel={this.onModalCancelClick}
        style={{ top: 20 }}
      >
        <Form layout="inline">
          <Row>
            <Col md={24}>
              <Form.Item label="企业名称">
                <span className="ant-form-text">{formData.enterprise_name}</span>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Form.Item label="认证码">
                <span className="ant-form-text">{formData.code}</span>
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item label="认证码类型">
                <span className="ant-form-text">
                  {formData.code_type && (
                    <UserTypeShow enterpriseID={info.record_id} code={formData.code_type} />
                  )}
                </span>
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item label="状态">
                <span className="ant-form-text">{formData.status === 1 ? '有效' : '作废'}</span>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Form.Item label="生效方式">
                <span className="ant-form-text">
                  {formData.effective_mode === 1 ? '时间' : '次数'}
                </span>
              </Form.Item>
            </Col>
            <Col md={16}>
              {formData.effective_mode === 1 && (
                <Form.Item label="有效期">
                  <span className="ant-form-text">
                    {formatDate(formData.effective_start, 'YYYY/MM/DD')} ~{' '}
                    {formatDate(formData.effective_end, 'YYYY/MM/DD')}
                  </span>
                </Form.Item>
              )}
              {formData.effective_mode === 2 && (
                <Form.Item label="剩余次数/总次数">
                  <span className="ant-form-text">
                    {formData.effective_number - formData.used_number} / {formData.effective_number}
                  </span>
                </Form.Item>
              )}
            </Col>
          </Row>
        </Form>
        <div
          style={{
            height: 1,
            width: '100%',
            background: '#F0F0F0',
            marginTop: 10,
            marginBottom: 20,
          }}
        />
        <Table
          loading={loading}
          rowKey={record => record.id}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.onTableChange}
        />
      </Modal>
    );
  }
}
