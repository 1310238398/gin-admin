import React from 'react';
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Dropdown,
  Menu,
  Modal,
} from 'antd';
import TableList from '@/components/TableList';
import FormItem from 'antd/lib/form/FormItem';
import { connect } from 'dva';
import { formatTimestamp } from '../../utils/utils';
import UserSelect from '../../components/UserSelect/UserSelect';
import EnterpriseSelect from '../../components/EnterpriseSelect';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './NoticeRelease.less';
import NoticeReleaseCard from './NoticeReleaseCard';

@Form.create()
@connect(state => ({
  noticeRelease: state.noticeRelease,
  loading: state.loading.models.noticeRelease,
}))
export default class NoticeRelease extends React.PureComponent {
  state = {
    dataForm: false,
    dataFormID: '',
    dataFormType: '',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'noticeRelease/fetch',
    });
  }

  onAddClick = () => {
    this.setState({ dataForm: true, dataFormID: '', dataFormType: 'A' });
  };

  onModalCallback = () => {
    this.setState({ dataForm: false, dataFormID: '' });
  };

  onItemView = val => {
    this.setState({
      dataForm: true,
      dataFormID: val.record_id,
      dataFormType: 'V',
    });
  };

  onItemEdit = val => {
    this.setState({
      dataForm: true,
      dataFormID: val.record_id,
      dataFormType: 'E',
    });
  };

  onTableChange = pagination => {
    this.props.dispatch({
      type: 'noticeRelease/fetch',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  onSearchFormSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    const formData = this.props.form.getFieldsValue();
    if (formData.time) {
      formData.start_time = formData.time[0].unix();
      formData.end_time = formData.time[1].unix();
    }
    if (formData.receive_group) {
      formData.receive_group = formData.receive_group.join(',');
    }
    formData.time = '';
    this.props.dispatch({
      type: 'noticeRelease/fetch',
      payload: formData,
    });
  };

  onItemDelClick = item => {
    Modal.confirm({
      title: `确定删除【${item.notice_title}】商品？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDelOKClick.bind(this, item.record_id),
    });
  };

  onDelOKClick(id) {
    this.props.dispatch({
      type: 'noticeRelease/del',
      payload: {
        id,
      },
    });
  }

  onBtnClearClick = () => {
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'noticeRelease/saveSearch',
      payload: {},
    });
    this.props.dispatch({
      type: 'noticeRelease/fetch',
    });
  };

  handleChange = value => {
    if (value === '7' || value === '6') {
      this.setState({
        noticeObject: true,
      });
    } else {
      this.setState({
        noticeObject: false,
      });
    }
    if (value === '8') {
      this.setState({
        noticeUser: true,
      });
    } else {
      this.setState({
        noticeUser: false,
      });
    }
  };

  renderSearchForm = () => {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 12 },
        lg: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 12 },
        lg: { span: 8 },
      },
    };
    const col = {
      sm: 24,
      md: 8,
    };
    const { RangePicker } = DatePicker;

    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    return (
      <Form>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col {...col}>
            <FormItem {...formItemLayout} label="通知标题">
              {getFieldDecorator('notice_title', {})(
                <Input placeholder="请输入通知标题" maxLength="10" />
              )}
            </FormItem>
          </Col>
          <Col {...col}>
            <FormItem {...formItemLayout} label="目标群体">
              {getFieldDecorator('receive_group_type', {
                initialValue: '0',
              })(
                <Select onChange={this.handleChange}>
                  <Option value="0">全部</Option>
                  <Option value="1">所有企业管理员</Option>
                  <Option value="2">所有用户</Option>
                  <Option value="3">所有游客</Option>
                  <Option value="4">所有未认证用户</Option>
                  <Option value="5">所有认证用户</Option>
                  <Option value="6">指定企业管理员</Option>
                  <Option value="7">指定企业全员</Option>
                  <Option value="8">指定用户</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          {this.state.noticeObject && (
            <Col {...col}>
              <Form.Item {...formItemLayout} label="通知对象">
                {getFieldDecorator('receive_group', {})(<EnterpriseSelect mode="multiple" />)}
              </Form.Item>
            </Col>
          )}
          {this.state.noticeUser && (
            <Col {...col}>
              <Form.Item {...formItemLayout} label="通知对象">
                {getFieldDecorator('receive_group', {})(<UserSelect mode="multiple" />)}
              </Form.Item>
            </Col>
          )}
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col {...col}>
            <FormItem {...formItemLayout} label="通知内容">
              {getFieldDecorator('notice_content', {})(
                <Input placeholder="请输入通知内容" maxLength="10" />
              )}
            </FormItem>
          </Col>
          {/* <Col {...col}>
            <FormItem {...formItemLayout} label="推送通知">
              {getFieldDecorator('push_mode', {
                initialValue: 0,
              })(
                <Select>
                  <Option value={0}>全部</Option>
                  <Option value={1}>是</Option>
                  <Option value={2}>否</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col {...col}>
            <FormItem {...formItemLayout} label="短信通知">
              {getFieldDecorator('message_mode', {
                initialValue: 0,
              })(
                <Select>
                  <Option value={0}>全部</Option>
                  <Option value={1}>是</Option>
                  <Option value={2}>否</Option>
                </Select>
              )}
            </FormItem>
          </Col> */}
          <Col {...col}>
            <Form.Item label="创建时间">{getFieldDecorator('time')(<RangePicker />)}</Form.Item>
          </Col>
          <Col {...col}>
            <FormItem {...formItemLayout} label="状态">
              {getFieldDecorator('status', {
                initialValue: 0,
              })(
                <Select>
                  <Option value={0}>全部</Option>
                  <Option value={1}>编辑中</Option>
                  <Option value={2}>已发送</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col {...col} offset={19}>
            <Button
              icon="search"
              type="primary"
              style={{ marginLeft: 8 }}
              onClick={this.onSearchFormSubmit}
            >
              查询
            </Button>
            <Button type="danger" style={{ marginLeft: 8 }} onClick={this.onBtnClearClick}>
              清空
            </Button>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.onQueryFormToggleClick}>
              {' '}
            </a>
          </Col>
        </Row>
        <Row>
          <Button icon="plus" type="primary" onClick={() => this.onAddClick()}>
            新建
          </Button>
        </Row>
      </Form>
    );
  };

  renderModal = () => {
    if (this.state.dataForm) {
      return (
        <NoticeReleaseCard
          id={this.state.dataFormID}
          type={this.state.dataFormType}
          callback={this.onModalCallback}
        />
      );
    }
  };

  render() {
    const columns = [
      {
        dataIndex: '1',
        fixed: 'left',
        width: 100,
        render: (val, record) => {
          return (
            <Dropdown
              placement="bottomCenter"
              overlay={
                <Menu>
                  <Menu.Item>
                    <a
                      onClick={() => {
                        this.onItemView(record);
                      }}
                    >
                      {' '}
                      查看{' '}
                    </a>
                  </Menu.Item>
                  {record.status === 1 && (
                    <Menu.Item>
                      <a
                        onClick={() => {
                          this.onItemEdit(record);
                        }}
                      >
                        {' '}
                        编辑{' '}
                      </a>
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    <a
                      onClick={() => {
                        this.onItemDelClick(record);
                      }}
                    >
                      {' '}
                      删除{' '}
                    </a>
                  </Menu.Item>
                </Menu>
              }
            >
              <Button>操作</Button>
            </Dropdown>
          );
        },
      },
      {
        title: '通知标题',
        dataIndex: 'notice_title',
      },
      {
        title: '目标群体',
        dataIndex: 'receive_group_type',
        render: val => {
          if (val === 1) {
            return <span>所有企业管理员</span>;
          } else if (val === 2) {
            return <span>所有用户</span>;
          } else if (val === 3) {
            return <span>所有游客</span>;
          } else if (val === 4) {
            return <span>所有未认证用户</span>;
          } else if (val === 5) {
            return <span>所有认证用户</span>;
          } else if (val === 6) {
            return <span>指定企业管理员</span>;
          } else if (val === 7) {
            return <span>指定企业全员</span>;
          } else if (val === 8) {
            return <span>指定用户</span>;
          }
        },
      },
      {
        title: '通知对象',
        dataIndex: 'receive_group_name',
      },
      // {
      //   title: '推送通知',
      //   dataIndex: 'notice_mode_1',
      //   render: (val, all) => {
      //     if (all.notice_mode === 1 || all.notice_mode === 3) {
      //       return <span style={{ color: 'rgba(0, 0, 255)' }}>是</span>;
      //     } else {
      //       return <span style={{ color: 'rgba(255, 0, 0)' }}>否</span>;
      //     }
      //   },
      // },
      // {
      //   title: '短信通知',
      //   dataIndex: 'notice_mode_2',
      //   render: (val, all) => {
      //     if (all.notice_mode === 2 || all.notice_mode === 3) {
      //       return <span style={{ color: 'rgba(0, 0, 255)' }}>是</span>;
      //     } else {
      //       return <span style={{ color: 'rgba(255, 0, 0)' }}>否</span>;
      //     }
      //   },
      // },
      {
        title: '通知内容',
        dataIndex: 'notice_content',
      },
      {
        title: '创建人',
        dataIndex: 'creator_name',
      },
      {
        title: '创建时间',
        dataIndex: 'created',
        render: val => {
          return <span> {formatTimestamp(val)} </span>;
        },
      },
      {
        title: '发送人',
        dataIndex: 'notice_sender_name',
      },
      {
        title: '发送时间',
        dataIndex: 'send_time',
        render: val => {
          if (val === 0) {
            return <span> - </span>;
          } else {
            return <span> {formatTimestamp(val)} </span>;
          }
        },
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: val => {
          if (val === 1) {
            return <span style={{ color: 'rgba(0, 0, 255)' }}>编辑中</span>;
          } else if (val === 2) {
            return <span style={{ color: 'rgba(0, 128, 0)' }}>已发送</span>;
          }
        },
      },
    ];
    const {
      noticeRelease: {
        data: { list, pagination },
      },
      loading,
    } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => {
        return <span>共{total}条</span>;
      },
      ...pagination,
    };

    return (
      <PageHeaderLayout title="通知发布">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSearchForm()}</div>
            <div className={styles.tableListOperator} />
            <div>
              <TableList
                scroll={{ x: 1700 }}
                pagination={paginationProps}
                dataSource={list}
                rowKey={record => record.record_id}
                columns={columns}
                loading={loading}
                onChange={this.onTableChange}
              />
            </div>
          </div>
        </Card>
        {this.renderModal()}
      </PageHeaderLayout>
    );
  }
}
