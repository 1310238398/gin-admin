/* 促销活动 */
import React from 'react';
/* 样式 */
import styles from './SalesPromotion.less';
/* 容器 */
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import { connect } from 'dva';
/* antd */
import {
  Card,
  Button,
  Badge,
  Form,
  Row,
  Col,
  Input,
  Select,
  Dropdown,
  Menu,
  DatePicker,
  Modal,
  message,
} from 'antd';
import TableList from '@/components/TableList';
import FormItem from 'antd/lib/form/FormItem';

/* 组件 */
import SalesPromotionCard from './SalesPromotionCard.js';

import { formatTimestamp } from '@/utils/utils';

@Form.create()
@connect(state => ({
  salesPromotion: state.salesPromotion,
  storeApply: state.store,
}))
/* 促销活动入口文件 */
export default class SalesPromotion extends React.PureComponent {
  /* 初始数据 */
  state = {
    store: '',
    dataForm: false,
    dataFormID: '',
    dataFormType: '',
  };
  /* 页面挂载完成 */
  async componentDidMount() {
    await this.props.dispatch({
      type: 'salesPromotion/getStore',
    });
    // 获取商品列表
    const { store } = this.props.salesPromotion;
    if (store.passed === 0 || !store.store_id) {
      message.error('请先开通店铺');
      this.props.dispatch({
        type: 'salesPromotion/redirect',
      });
    } else {
      await this.setState({
        store: store.store_id,
      });
      /* 获取活动列表 */
      await this.props.dispatch({
        type: 'salesPromotion/fetch',
        store,
      });
    }
  }

  /* DOM */
  render() {
    /* 表头 */
    const columns = [
      {
        dataIndex: 'discount_id',
        width: 100,
        render: (val, record) => {
          return (
            <div>
              {
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item>
                        <a
                          onClick={() => {
                            this.onItemSeeClick(val);
                          }}
                        >
                          {' '}
                          查看{' '}
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <a
                          onClick={() => {
                            this.onItemEditClick(val);
                          }}
                        >
                          {' '}
                          编辑{' '}
                        </a>
                      </Menu.Item>
                      {record.discount_status === 3 && (
                        <Menu.Item>
                          <a
                            onClick={() => {
                              this.onItemChangeStatus(val, '1');
                            }}
                          >
                            {' '}
                            设置为启用{' '}
                          </a>
                        </Menu.Item>
                      )}
                      {record.discount_status === 2 && (
                        <Menu.Item>
                          <a
                            onClick={() => {
                              this.onItemChangeStatus(val, '2');
                            }}
                          >
                            {' '}
                            设置为关闭{' '}
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
              }
            </div>
          );
        },
      },
      {
        title: '活动名称',
        dataIndex: 'name',
        width: 150,
      },
      {
        title: '满足金额(元)',
        dataIndex: 'limit',
        render: val => {
          return <span>{val / 100}</span>;
        },
      },
      {
        title: '减去金额(元)',
        dataIndex: 'discount',
        render: val => {
          return <span>{(val / 100) * -1}</span>;
        },
      },
      {
        title: '活动开始时间',
        dataIndex: 'start_time',
        render: val => {
          return <span>{formatTimestamp(val)}</span>;
        },
      },
      {
        title: '活动结束时间',
        dataIndex: 'end_time',
        render: val => {
          return <span>{formatTimestamp(val)}</span>;
        },
      },
      {
        title: '状态',
        dataIndex: 'discount_status',
        render: (val, record) => {
          if (val === 1) {
            return <Badge status="success" text="新建" />;
          } else if (val === 2) {
            var timestamp = new Date().getTime();
            timestamp = `${timestamp}`;
            timestamp = timestamp.substring(0, 10);
            if (record.start_time > timestamp) {
              return <Badge status="warning" text="发布" />;
            } else if (record.end_time < timestamp) {
              return <Badge status="warning" text="过期" />;
            } else {
              return <Badge status="warning" text="正常" />;
            }
          } else if (val === 3) {
            return <Badge status="error" text="暂停" />;
          } else if (val === 4) {
            return <Badge status="error" text="关闭" />;
          } else {
            console.log('错误');
          }
        },
      },
    ];
    /* 表格数据 */
    const {
      salesPromotion: {
        data: { pagination, list },
      },
    } = this.props;
    /* 表格底部 */
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => {
        return <span>共{total}条</span>;
      },
      ...pagination,
    };
    return (
      <PageHeaderLayout title="促销活动">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {/* 搜索 */}
              {this.renderSearchForm()}
            </div>
            <div className={styles.tableListOperator} />
            <div>
              {/* 表格 */}
              <TableList
                pagination={paginationProps}
                dataSource={list}
                columns={columns}
                rowKey={record => record.discount_id}
                scroll={{ x: 1000 }}
                onChange={this.onTableChange}
              />
            </div>
            {/* 弹出框 */}
            {this.renderDataForm()}
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
  /* 搜索DOM */
  renderSearchForm = () => {
    // Item布局
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
      md: 6,
    };
    /* 初始化配置 */
    const { RangePicker } = DatePicker;
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    return (
      <Form>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col {...col}>
            <FormItem {...formItemLayout} label="活动名称">
              {getFieldDecorator('name', {})(<Input placeholder="请输入活动名称" maxLength="50" />)}
            </FormItem>
          </Col>
          <Col {...col}>
            <Form.Item label="选择时间区间">{getFieldDecorator('time')(<RangePicker />)}</Form.Item>
          </Col>
          <Col {...col}>
            <FormItem {...formItemLayout} label="状态">
              {getFieldDecorator('discount_status', {
                initialValue: 0,
              })(
                <Select>
                  <Option value={0}>全部</Option>
                  <Option value={2}>正常</Option>
                  <Option value={3}>关闭</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col {...col}>
            <Button
              icon="search"
              type="primary"
              style={{ marginLeft: 8 }}
              onClick={this.onSearchFormSubmit}
            >
              查询
            </Button>
            <Button type="danger" style={{ marginLeft: 8 }} onClick={this.onResetFormClick}>
              重置
            </Button>
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
  /* 弹出框 */
  renderDataForm() {
    if (this.state.dataForm) {
      return (
        <SalesPromotionCard
          id={this.state.dataFormID}
          type={this.state.dataFormType}
          callback={this.onDataFormCallback}
        />
      );
    }
  }
  /* 新建活动 */
  onAddClick = () => {
    this.setState({ dataForm: true, dataFormID: '', dataFormType: 'A' });
  };
  /* 模态框关闭回调 */
  onDataFormCallback = result => {
    this.setState({ dataForm: false, dataFormID: '' });
  };
  /* 查询 */
  onSearchFormSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    const formData = this.props.form.getFieldsValue();
    if (formData.time) {
      formData.from = formData.time[0].unix();
      formData.to = formData.time[1].unix();
    }
    formData.time = '';
    this.props.dispatch({
      type: 'salesPromotion/fetch',
      payload: formData,
    });
  };
  /* 分页 */
  onTableChange = pagination => {
    this.props.dispatch({
      type: 'salesPromotion/fetch',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };
  /* 删除活动 */
  onItemDelClick = item => {
    Modal.confirm({
      title: `确定删除【${item.name}】商品？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDelOKClick.bind(this, item),
    });
  };
  onDelOKClick(item) {
    this.props.dispatch({
      type: 'salesPromotion/del',
      payload: { item },
    });
  }
  /* 清空搜索 */
  onResetFormClick = () => {
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'salesPromotion/saveSearch',
      payload: {},
    });
    this.props.dispatch({
      type: 'salesPromotion/fetch',
    });
  };
  /* 查看 */
  onItemSeeClick = id => {
    this.setState({ dataForm: true, dataFormID: id, dataFormType: 'K' });
  };
  /* 编辑 */
  onItemEditClick = id => {
    this.setState({ dataForm: true, dataFormID: id, dataFormType: 'E' });
  };
  /* 启用停用 */
  onItemChangeStatus = (val, status) => {
    console.log(status);
    const { store } = this.props.salesPromotion;
    this.props.dispatch({
      type: 'salesPromotion/changStatus',
      payload: {
        store_id: store.store_id,
        discount_id: val,
        type: status,
      },
    });
  };
}
