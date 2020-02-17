/* 订单管理tab详情页面 */
import React, { PureComponent } from 'react';
/* 相关组件 */
import { connect } from 'dva';
import DescriptionList from '@/components/DescriptionList';
import { DicSelect, DicShow } from '@/components/Dictionary';
/* antd */
import {
  Button,
  Form,
  Row,
  Col,
  Input,
  Dropdown,
  Menu,
  Select,
  DatePicker,
  Modal,
  message,
  Table,
  Tag,
} from 'antd';
import TableList from '@/components/TableList';
import FormItem from 'antd/lib/form/FormItem';

/* 时间功能方法 */
import { formatTimestamp } from '@/utils/utils';
/* 布局 */
const { Description } = DescriptionList;

/* 关联models */
@connect(state => ({
  orderManagementsj: state.orderManagementsj,
}))
@Form.create()
export default class orderManagementInfo extends PureComponent {
  /* 初始数据 */
  state = {
    list: '',
    visible: false,
    Modalfooter: [],
    title: '',
    refundVisible: false,
    priceInfo: '',
    replayVisible: false,
    sales_record_id: '',
    refundprice: '',
  };

  /* 分页 */
  onTableChange = pagination => {
    this.props.dispatch({
      type: 'orderManagementsj/fetch',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
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
    const { orgid } = this.props;
    if (orgid === '6') {
      this.getOrderStatus(0, formData);
    } else if (orgid === '1') {
      /* 新订单 */
      this.getOrderStatus(1, formData);
    } else if (orgid === '2') {
      /* 处理中 */
      this.getOrderStatus(2, formData);
    } else if (orgid === '3') {
      /* 配送中 */
      this.getOrderStatus(3, formData);
    } else if (orgid === '4') {
      /* 已完成 */
      this.getOrderStatus(4, formData);
    } else if (orgid === '5') {
      /* 投诉处理 */
      this.getOrderStatus(5, formData);
    }
  };

  /* 订单状态 */
  getOrderStatus = (order, formData) => {
    this.props.dispatch({
      type: 'orderManagementsj/fetch',
      payload: {
        ...formData,
        status: order,
      },
    });
  };

  /* 清空搜索 */
  onResetFormClick = () => {
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'orderManagementsj/saveSearch',
      payload: {},
    });
    const { orgid } = this.props;
    this.getOrderStatus(orgid);
  };

  /* 查看 */
  onItemSeeClick = val => {
    const { orgid } = this.props;
    this.props.dispatch({
      type: 'orderManagementsj/loadForm',
      payload: {
        order_id: val.order_id,
      },
    });
    this.setState({
      visible: true,
    });
    /* 状态判断 */
    if (orgid === '1') {
      this.setState({
        Modalfooter: [
          <Button key={'cancel'} onClick={this.handleCancel}>
            取消
          </Button>,
          <Button key={'Refusal'} type="danger" onClick={e => this.onItemRefusalClick()}>
            拒单
          </Button>,
          <Button key={'Receipt'} type="primary" onClick={e => this.onItemReceiptClick()}>
            接单
          </Button>,
        ],
        title: '新订单',
      });
    } else if (orgid === '2') {
      this.setState({
        Modalfooter: [
          <Button key={'cancel'} onClick={this.handleCancel}>
            取消
          </Button>,
          <Button key={'Refusal'} type="danger" onClick={e => this.onItemDistributionClick()}>
            配送
          </Button>,
          <Button key={'Receipt'} type="primary" onClick={e => this.onItemCompleteClick()}>
            处理完成
          </Button>,
        ],
        title: '处理中',
      });
    } else if (orgid === '3' || orgid === '4' || orgid === '6') {
      this.setState({
        Modalfooter: [
          <Button key={'cancel'} type="primary" onClick={this.handleCancel}>
            确定
          </Button>,
        ],
        title: '处理中',
      });
    } else if (orgid === '5') {
      this.setState({
        Modalfooter: [
          <Button key={'cancel'} onClick={this.handleCancel}>
            取消
          </Button>,
          <Button key={'noRefund'} type="dashed" onClick={e => this.noRefund()}>
            不退款
          </Button>,
          <Button key={'noDispose'} type="danger" onClick={e => this.noDispose()}>
            不处理
          </Button>,
          <Button key={'refund'} type="primary" onClick={e => this.refund()}>
            退款
          </Button>,
        ],
        title: '投诉处理',
      });
    }
  };

  /* 拒单 */
  onItemRefusalClick = val => {
    Modal.confirm({
      title: `你确定要拒单吗？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      zIndex: '2000',
      onOk: this.onDelOKClick.bind(this, val),
    });
  };
  /* 拒单 */
  onDelOKClick = val => {
    const {
      orderManagementsj: { formData },
    } = this.props;
    let payload;
    if (!val) {
      payload = formData;
    } else {
      payload = val;
    }
    this.props.dispatch({
      type: 'orderManagementsj/reject',
      payload,
    });
    this.setState({
      visible: false,
    });
  };

  /* 接单 */
  onItemReceiptClick = val => {
    const {
      orderManagementsj: { formData },
    } = this.props;
    let payload;
    if (!val) {
      payload = formData;
    } else {
      payload = val;
    }
    this.props.dispatch({
      type: 'orderManagementsj/checkIn',
      payload,
    });
    this.setState({
      visible: false,
    });
  };
  /* 配送 */
  onItemDistributionClick = val => {
    const {
      orderManagementsj: { formData },
    } = this.props;
    let payload;
    if (!val) {
      payload = formData;
    } else {
      payload = val;
    }
    this.props.dispatch({
      type: 'orderManagementsj/distribution',
      payload,
    });
    this.setState({
      visible: false,
    });
  };

  /* 处理完成 */
  onItemCompleteClick = val => {
    if (val.order_status === 4) {
      message.success('已经处理');
    } else {
      Modal.confirm({
        title: `确定完成吗？`,
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        zIndex: '2000',
        onOk: this.onCompleteClick.bind(this, val),
      });
    }
  };

  /* 处理完成 */
  onCompleteClick(val) {
    const {
      orderManagementsj: { formData },
    } = this.props;
    let payload;
    if (!val) {
      payload = formData;
    } else {
      payload = val;
    }
    this.props.dispatch({
      type: 'orderManagementsj/complete',
      payload,
    });
    this.setState({
      visible: false,
    });
  }

  /* 投诉不处理 */
  noDispose = val => {
    const {
      orderManagementsj: { formData },
    } = this.props;
    let payload;
    if (!val) {
      payload = formData;
    } else {
      payload = val;
    }
    this.props.dispatch({
      type: 'orderManagementsj/nodispose',
      payload,
    });
    this.setState({
      visible: false,
    });
  };

  /* 退款 */
  refund = val => {
    this.setState({
      refundVisible: true,
      priceInfo: val,
      refundprice: val.price / 100,
    });
  };

  onModalPriceOK = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      const {
        orderManagementsj: { formData },
      } = this.props;
      let payload;
      if (!this.state.priceInfo) {
        payload = formData;
      } else {
        payload = this.state.priceInfo;
      }
      this.props.dispatch({
        type: 'orderManagementsj/refund',
        payload,
        price: Math.round(Number(values.price) * 100),
      });
      this.setState({
        refundVisible: false,
        visible: false,
      });
    });
  };

  replayTextVisibleClick = val => {
    this.props.form.validateFields(['reply'], (err, values) => {
      if (!err) {
        const {
          orderManagementsj: { formData },
        } = this.props;
        let payload = {
          store_id: formData.store_id,
          sales_record_id: this.state.sales_record_id,
          reply: { ...values },
        };
        this.props.dispatch({
          type: 'orderManagementsj/reply',
          payload: { ...payload, ...values },
        });
        setTimeout(() => {
          this.setState({
            replayVisible: false,
          });
        }, 1000);
      }
    });
  };
  /* 不退款 */
  noRefund = val => {
    const {
      orderManagementsj: { formData },
    } = this.props;
    let payload;
    if (!val) {
      payload = formData;
    } else {
      payload = val;
    }
    this.props.dispatch({
      type: 'orderManagementsj/Rejectrefund',
      payload,
      price: 0,
    });
    this.setState({
      visible: false,
    });
  };

  handelreplayTextVisible = val => {
    this.setState({
      replayVisible: true,
      sales_record_id: val,
    });
  };
  /* 操作查看 模态框 */
  renderDescription = () => {
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品图片',
        dataIndex: 'goods_image',
        render: val => {
          return <img src={val} width={64} height={64} alt={'商品图片'} />;
        },
      },
      {
        title: '商品数量',
        dataIndex: 'quantity',
      },
      {
        title: '商品价格',
        dataIndex: 'unit_price',
        render: val => {
          return <span>{val / 100}</span>;
        },
      },
      {
        title: '回复',
        dataIndex: 'replay',
      },
      {
        title: '评价',
        dataIndex: 'text',
      },
      {
        title: '评价分数',
        dataIndex: 'score',
        render: val => {
          return <span>{val === 0 ? '' : val}</span>;
        },
      },
      {
        title: '操作',
        width: 100,
        dataIndex: 'sales_record_id',
        render: (val, all) => {
          if (all.text !== '') {
            return (
              <span
                onClick={() => this.handelreplayTextVisible(val)}
                style={{ color: '#1890FF', cursor: 'pointer' }}
              >
                回复
              </span>
            );
          } else {
            return null;
          }
        },
      },
    ];
    const {
      orderManagementsj: { formData },
      orgid,
    } = this.props;

    let formDataList = [
      {
        name: '订单编号',
        value: formData.order_id,
      },
      {
        name: '买家名称',
        value: formData.user_name,
      },
      {
        name: '收件人姓名',
        value: formData.consignee,
      },
      {
        name: '收件人电话',
        value: formData.consignee_tel,
      },
      {
        name: '收件人地址',
        value: formData.address,
      },
      {
        name: '订单金额',
        value: formData.price / 100 + '元',
      },
      {
        name: '支付时间',
        value: formData.paid === 0 ? '' : formatTimestamp(formData.paid),
      },
      {
        name: '备注',
        value: formData.remark,
      },
    ];
    if (orgid === '1' || orgid === '2' || orgid === '3' || orgid === '6') {
      columns.splice(4, 4);
    }
    return (
      <div>
        <DescriptionList size="large" col={2} style={{ marginBottom: 32 }}>
          {formDataList.map((val, index) => {
            return (
              <Description key={index} term={val.name}>
                {val.value}
              </Description>
            );
          })}
        </DescriptionList>
        <TableList
          dataSource={formData.goods_list}
          columns={columns}
          rowKey={record => record.id}
          onChange={this.onTableChange}
        />
      </div>
    );
  };

  /* 模态框消失 */
  handleCancel = () => {
    this.setState({
      visible: false,
      refundVisible: false,
    });
  };
  handlereplayCancel = () => {
    this.setState({
      replayVisible: false,
    });
  };

  /* 模糊搜索 */
  searchCriteria = () => {
    const { orgid } = this.props;
    const { Option } = Select;
    const { getFieldDecorator } = this.props.form;
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
      xs: 12,
      lg: 12,
      sm: 24,
      md: 12,
    };
    if (orgid === '2' || orgid === '3' || orgid === '4' || orgid === '5' || orgid === '6') {
      return (
        <div>
          <Col {...col}>
            <FormItem {...formItemLayout} label="投诉状态">
              {getFieldDecorator('complain_status', {
                initialValue: 0,
              })(
                <Select>
                  <Option value={0}>全部</Option>
                  <Option value={1}>无投诉</Option>
                  <Option value={2}>有投诉</Option>
                  <Option value={3}>已确认</Option>
                  <Option value={4}>已处理</Option>
                  <Option value={5}>不处理</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col {...col}>
            <FormItem {...formItemLayout} label="退款状态">
              {getFieldDecorator('refund_status', {
                initialValue: 0,
              })(
                <Select>
                  <Option value={0}>全部</Option>
                  <Option value={1}>无退款</Option>
                  <Option value={2}>有退款</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </div>
      );
    }
  };

  /* 模糊搜索 */
  searchCriteriaOk = () => {
    const { orgid } = this.props;
    const { Option } = Select;
    const { getFieldDecorator } = this.props.form;
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
      xs: 12,
      lg: 12,
      sm: 24,
      md: 12,
    };
    if (orgid === '6' || orgid === '4') {
      return (
        <Col {...col}>
          <FormItem {...formItemLayout} label="结算状态">
            {getFieldDecorator('settled', {
              initialValue: 0,
            })(
              <Select>
                <Option value={0}>全部</Option>
                <Option value={1}>已结算</Option>
                <Option value={2}>未结算</Option>
              </Select>
            )}
          </FormItem>
        </Col>
      );
    }
  };

  /* 表格渲染 */
  renderTabel = () => {
    const columns = [
      {
        dataIndex: 'id',
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
                            this.onItemSeeClick(record);
                          }}
                        >
                          {' '}
                          查看{' '}
                        </a>
                      </Menu.Item>
                      {/* 新订单 */}
                      {this.props.orgid === '1' && (
                        <Menu.Item>
                          <a
                            onClick={() => {
                              this.onItemReceiptClick(record);
                            }}
                          >
                            {' '}
                            接单{' '}
                          </a>
                        </Menu.Item>
                      )}
                      {this.props.orgid === '1' && (
                        <Menu.Item>
                          <a
                            onClick={() => {
                              this.onItemRefusalClick(record);
                            }}
                          >
                            {' '}
                            拒单{' '}
                          </a>
                        </Menu.Item>
                      )}
                      {/* 处理中 */}
                      {this.props.orgid === '2' && (
                        <Menu.Item>
                          <a
                            onClick={() => {
                              this.onItemDistributionClick(record);
                            }}
                          >
                            {' '}
                            配送{' '}
                          </a>
                        </Menu.Item>
                      )}
                      {this.props.orgid === '2' && (
                        <Menu.Item>
                          <a
                            onClick={() => {
                              this.onItemCompleteClick(record);
                            }}
                          >
                            {' '}
                            处理完成{' '}
                          </a>
                        </Menu.Item>
                      )}
                      {/* 投诉处理 */}
                      {this.props.orgid === '5' && (
                        <Menu.Item>
                          <a
                            onClick={() => {
                              this.refund(record);
                            }}
                          >
                            {' '}
                            退款{' '}
                          </a>
                        </Menu.Item>
                      )}
                      {this.props.orgid === '5' && (
                        <Menu.Item>
                          <a
                            onClick={() => {
                              this.noRefund(record);
                            }}
                          >
                            {' '}
                            不退款{' '}
                          </a>
                        </Menu.Item>
                      )}
                      {this.props.orgid === '5' && (
                        <Menu.Item>
                          <a
                            onClick={() => {
                              this.noDispose(record);
                            }}
                          >
                            {' '}
                            不处理{' '}
                          </a>
                        </Menu.Item>
                      )}
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
        title: '订单编号',
        dataIndex: 'order_id',
      },
      {
        title: '买家名称',
        dataIndex: 'user_name',
      },
      {
        title: '收件人姓名',
        dataIndex: 'consignee',
      },
      {
        title: '收件人电话',
        dataIndex: 'consignee_tel',
      },
      {
        title: '收件人地址',
        dataIndex: 'address',
      },
      {
        title: '订单金额',
        dataIndex: 'price',
        render: val => {
          return <span>{val / 100} 元</span>;
        },
      },
      {
        title: '订单状态',
        dataIndex: 'order_status',
        render: value => {
          const statusColor = {
            1: 'blue',
            21: 'blue',
            22: 'blue',
            23: 'green',
            3: 'red',
            4: 'blue',
            5: 'blue',
            6: 'green',
            7: 'green',
            8: 'red',
          };
          return (
            <DicShow
              pcode="mall$#order$#orderstatus"
              code={[value]}
              show={name => (
                <Tag color={statusColor[value]} key={name}>
                  {name}
                </Tag>
              )}
            />
          );
        },
      },
      {
        title: '配送状态',
        dataIndex: 'delivery_status',
        render: value => {
          const codeColor = ['blue', 'blue', 'green', 'red'];
          return (
            <DicShow
              pcode="mall$#order$#distribution"
              code={[value]}
              show={name => (
                <Tag color={codeColor[value - 1]} key={name}>
                  {name}
                </Tag>
              )}
            />
          );
        },
      },
      {
        title: '投诉状态',
        dataIndex: 'complain_status',
        render: val => {
          if (val === 1) {
            return <span>无投诉</span>;
          } else if (val === 2) {
            return <span>有投诉</span>;
          } else if (val === 3) {
            return <span>已确认</span>;
          } else if (val === 4) {
            return <span>已处理</span>;
          } else if (val === 5) {
            return <span>不处理</span>;
          }
        },
      },
      {
        title: '退款状态',
        dataIndex: 'refund_status',
        render: val => {
          if (val === 1) {
            return <span>无退款</span>;
          } else if (val === 2) {
            return <span>有退款</span>;
          }
        },
      },
      {
        title: '退款额',
        dataIndex: 'refund_price',
        render: val => {
          return <span>{val === 0 ? '' : `${val / 100}元`}</span>;
        },
      },
      {
        title: '创建时间',
        dataIndex: 'created',
        render: val => {
          return <span>{formatTimestamp(val)}</span>;
        },
      },
      {
        title: '支付时间',
        dataIndex: 'paid',
        render: val => {
          return <span>{formatTimestamp(val)}</span>;
        },
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
    ];

    /* 表头判断(用于判断表头内容-不同订单显示内容不一样)*/
    const { orgid } = this.props;
    if (orgid === '1') {
      columns.splice(8, 4);
    }
    const {
      orderManagementsj: {
        loading,
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
      <Table
        pagination={paginationProps}
        dataSource={list}
        loading={loading}
        columns={columns}
        scroll={{ x: 1700 }}
        rowKey={record => record.order_id}
        onChange={this.onTableChange}
      />
    );
  };

  /* 搜索 */
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
      xs: 12,
      lg: 12,
      sm: 24,
      md: 12,
    };

    /* 初始化配置 */
    const { getFieldDecorator } = this.props.form;
    const { RangePicker } = DatePicker;
    return (
      <Form>
        <Row>
          <Col {...col}>
            <FormItem {...formItemLayout} label="订单编号">
              {getFieldDecorator('order_id', {})(<Input placeholder="订单编号" maxLength="60" />)}
            </FormItem>
          </Col>
          <Col {...col}>
            <FormItem {...formItemLayout} label="买家名称">
              {getFieldDecorator('user_name', {})(<Input placeholder="买家名称" maxLength="30" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col {...col}>
            <FormItem {...formItemLayout} label="收件人电话">
              {getFieldDecorator('consignee_tel', {})(
                <Input placeholder="收件人电话" maxLength="20" />
              )}
            </FormItem>
          </Col>
          <Col {...col}>
            <FormItem {...formItemLayout} label="收件人姓名">
              {getFieldDecorator('consignee', {})(
                <Input placeholder="收件人姓名" maxLength="20" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col {...col}>
            <FormItem {...formItemLayout} label="收件人地址">
              {getFieldDecorator('address', {})(<Input placeholder="收件人地址" maxLength="60" />)}
            </FormItem>
          </Col>
          <Col {...col}>
            <FormItem {...formItemLayout} label="时间区间">
              {getFieldDecorator('time', {})(<RangePicker />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          {this.searchCriteria()}
          {this.searchCriteriaOk()}
          <Col {...col} style={{ marginBottom: '20px' }} push={3}>
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
      </Form>
    );
  };

  /* 入口DOM */
  render() {
    /* 初始数据 */
    const { visible, refundVisible } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { TextArea } = Input;
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
    /* 表头 */
    return (
      <div style={{ padding: '20px', height: 'auto', background: '#fff' }}>
        {/* 搜索 */}
        {this.renderSearchForm()}
        {/* 表格 */}
        {this.renderTabel()}
        <Modal
          visible={visible}
          title={this.state.title}
          destroyOnClose={true}
          width={700}
          onCancel={this.handleCancel}
          footer={[...this.state.Modalfooter]}
        >
          {this.renderDescription()}
        </Modal>
        <Modal
          visible={this.state.replayVisible}
          title={'回复'}
          destroyOnClose={true}
          width={700}
          onCancel={this.handlereplayCancel}
          onOk={this.replayTextVisibleClick}
        >
          <Form>
            <Row>
              <Col>
                <Form.Item label="回复">
                  {getFieldDecorator('reply', {
                    rules: [
                      {
                        required: true,
                        message: '请输入回复',
                      },
                    ],
                  })(<TextArea placeholder="请输入回复" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
        {/* 退款 */}
        <Modal
          visible={refundVisible}
          title={'投诉处理'}
          destroyOnClose={true}
          onCancel={this.handleCancel}
          onOk={this.onModalPriceOK}
        >
          <Form>
            <Row>
              <Col>
                <Form.Item {...formItemLayout} label="退款金额">
                  {getFieldDecorator('price', {
                    initialValue: this.state.refundprice ? this.state.refundprice : '',
                    rules: [
                      {
                        required: true,
                        message: '请输入退款金额',
                      },
                    ],
                  })(<Input type="number" placeholder="请输入退款金额" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
