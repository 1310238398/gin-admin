/* 活动对话框 */
import React, { PureComponent } from 'react';
/* 组件及配置 */
import { connect } from 'dva';
import { Form, Modal, Tabs, Row, Col, Input, DatePicker, Button, Table, message, Tag } from 'antd';

/* 组件 */
import SalesPromotionProduct from './SalesPromotionProduct.js';

import { parseTimestamp } from '@/utils/utils';

@connect(state => ({
  salesPromotion: state.salesPromotion,
}))
@Form.create()
export default class SalesPromotionCard extends PureComponent {
  /* 初始数据 */
  state = {
    productVisible: false,
  };
  async componentDidMount() {
    const { id, type, callback } = this.props;
    await this.props.dispatch({
      type: 'salesPromotion/loadForm',
      payload: {
        id,
        type,
        callback,
      },
    });
  }
  render() {
    /* 初始配置 */
    const {
      salesPromotion: { formTitle, formVisible, formData, prohibit },
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout2 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const TabPane = Tabs.TabPane;
    /* 模态框 */
    return (
      <Modal
        title={formTitle}
        width={600}
        visible={formVisible}
        maskClosable={false}
        destroyOnClose
        onOk={this.onModalOKClick}
        onCancel={this.onModalCancelClick}
        style={{ top: 20 }}
        bodyStyle={{ height: 550, overflowY: 'scroll' }}
      >
        <Tabs defaultActiveKey="1" onChange={this.tabCallback}>
          <TabPane tab="满减活动基本信息" key="1">
            <Form>
              <Row>
                <Col md={24} sm={24}>
                  <Form.Item {...formItemLayout2} label="活动名称">
                    {getFieldDecorator('name', {
                      initialValue: formData.name,
                      rules: [
                        {
                          required: true,
                          message: '请输入活动名称',
                        },
                      ],
                    })(<Input placeholder="请输入活动名称" disabled={prohibit} maxLength="50" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={24} sm={24}>
                  <Form.Item {...formItemLayout2} label="满足金额">
                    {getFieldDecorator('limit', {
                      initialValue: formData.limit ? formData.limit / 100 : null,
                      rules: [
                        {
                          required: true,
                          message: '请输入满足金额',
                          type: 'number',
                          transform(value) {
                            if (value) {
                              return Number(value);
                            }
                          },
                        },
                      ],
                    })(<Input placeholder="请输入满足金额" disabled={prohibit} maxLength="20" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={24} sm={24}>
                  <Form.Item {...formItemLayout2} label="减去金额">
                    {getFieldDecorator('discount', {
                      initialValue: formData.discount ? formData.discount / 100 : null,
                      rules: [
                        {
                          required: true,
                          message: '请输入减去金额',
                          type: 'number',
                          transform(value) {
                            if (value) {
                              return Number(value);
                            }
                          },
                        },
                      ],
                    })(<Input placeholder="请输入减去金额" disabled={prohibit} maxLength="20" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={24} sm={24}>
                  <Form.Item {...formItemLayout2} label="开始时间">
                    {getFieldDecorator('start_time', {
                      initialValue: formData.start_time
                        ? parseTimestamp(formData.start_time)
                        : null,
                      rules: [
                        {
                          required: true,
                          message: '请输入开始时间',
                        },
                      ],
                    })(<DatePicker format="YYYY-MM-DD" disabled={prohibit} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={24} sm={24}>
                  <Form.Item {...formItemLayout2} label="结束时间">
                    {getFieldDecorator('end_time', {
                      initialValue: formData.end_time ? parseTimestamp(formData.end_time) : null,
                      rules: [
                        {
                          required: true,
                          message: '请输入结束时间',
                        },
                      ],
                    })(<DatePicker format="YYYY-MM-DD" disabled={prohibit} />)}
                  </Form.Item>
                </Col>
              </Row>
              {this.props.type === 'K' || this.props.type === 'E' ? (
                <Row>
                  <Col md={24} sm={24}>
                    {formData.discount_status === 2 && (
                      <Form.Item {...formItemLayout2} label="状态">
                        {getFieldDecorator('discount_status', {})(<Tag color="green">正常</Tag>)}
                      </Form.Item>
                    )}
                    {formData.discount_status === 3 && (
                      <Form.Item {...formItemLayout2} label="状态">
                        {getFieldDecorator('discount_status', {})(<Tag color="red">关闭</Tag>)}
                      </Form.Item>
                    )}
                  </Col>
                </Row>
              ) : null}
            </Form>
          </TabPane>
          <TabPane tab="活动商品信息" key="2">
            {/* 添加活动商品判断 */}
            {this.showAddClick()}
            {/* 表格 */}
            {this.renderTable()}
          </TabPane>
        </Tabs>
        {this.renderProduct()}
      </Modal>
    );
  }
  /* 商品选择数据 */
  renderProduct = () => {
    if (this.state.productVisible) {
      return (
        <SalesPromotionProduct
          type={this.state.productVisibleType}
          callback={this.onDataFormCallback.bind(this)}
        />
      );
    }
  };
  /* 表格 */
  renderTable = () => {
    /* 表头 */
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品分类',
        dataIndex: 'category_name',
      },
      {
        title: '库存',
        dataIndex: 'stock',
      },
      {
        title: '操作',
        dataIndex: '',
        render: val => (
          <Button type="danger" onClick={() => this.deldataSourceItem(val)}>
            删除
          </Button>
        ),
      },
    ];
    const { type } = this.props;
    const {
      salesPromotion: { ProductDataList },
    } = this.props;
    var data = ProductDataList;
    if (data.length === undefined) {
      data = [];
    }
    console.log(data);
    if (type === 'A') {
      if (ProductDataList !== '') {
        return (
          /* 添加 */
          <Table
            dataSource={data}
            columns={columns}
            rowKey={record => record.goods_id}
            onChange={this.onTableChange}
          />
        );
      }
    } else if (type === 'K') {
      columns.pop();
      if (ProductDataList !== '') {
        return (
          /* 查看 */
          <Table
            dataSource={data}
            columns={columns}
            rowKey={record => record.goods_id}
            onChange={this.onTableChange}
          />
        );
      }
    } else {
      if (ProductDataList !== '') {
        return (
          /* 编辑 */
          <Table
            dataSource={data}
            columns={columns}
            rowKey={record => record.goods_id}
            onChange={this.onTableChange}
          />
        );
      }
    }
  };
  /* 模态框提交 */
  onModalOKClick = () => {
    const {
      salesPromotion: { ProductDataList },
    } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        message.error('请完善活动基本信息');
      } else {
        if (!ProductDataList.length) {
          message.error('请完善活动商品信息');
        } else {
          if (values.start_time > values.end_time) {
            message.error('开始时间不能大于结束时间');
          } else {
            values.limit = Math.round(Number(values.limit) * 100);
            values.discount = Math.round(Number(values.discount) * 100);
            if (values.limit < values.discount) {
              message.error('减去金额大于满足金额 ');
            } else {
              values.start_time = values.start_time.unix();
              values.end_time = values.end_time.unix();

              let goods_list = [];
              for (let item in ProductDataList) {
                goods_list.push(ProductDataList[item].goods_id);
              }
              let formData = { discount: values, goods_list };
              this.props.dispatch({
                type: 'salesPromotion/submit',
                payload: formData,
              });
              this.props.callback('ok');
            }
          }
        }
      }
    });
  };
  /* 模态框关闭 */
  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'salesPromotion/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };
  /* 商品分类对话框 */
  onAddClick = () => {
    this.setState({ productVisible: true });
  };
  /* 商品分类模态框关闭回调 */
  async onDataFormCallback(item) {
    await this.setState({
      productVisible: false,
    });
  }
  /* 商品删除 */
  deldataSourceItem = item => {
    const {
      salesPromotion: { ProductDataList },
    } = this.props;
    let newArr = ProductDataList;
    for (var i = newArr.length - 1; i >= 0; i--) {
      if (newArr[i].id === item.id) {
        newArr.splice(i, 1);
        this.props.dispatch({
          type: 'salesPromotion/setProductDate',
          payload: newArr,
        });
        let check = [];
        for (let i in newArr) {
          check.push(newArr[i].goods_id);
        }
        this.props.dispatch({
          type: 'salesPromotion/saveFormDataCheck',
          payload: check,
        });
      }
    }
  };
  /* 添加活动商品按钮判断 */
  showAddClick = () => {
    const { type } = this.props;
    if (type === 'E' || type === 'A') {
      return (
        <Button type="primary" style={{ margin: '10px' }} onClick={() => this.onAddClick()}>
          添加活动商品
        </Button>
      );
    }
  };
}
