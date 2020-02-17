import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Card, Modal, InputNumber, Row, Col, Radio, Button, DatePicker } from 'antd';
import moment from 'moment';
import StoreSelect from '@/components/StoreSelect/StoreSelect';
import PicturesWall from '@/components/PicturesWall/PicturesWall';

@connect(({ coupon }) => ({
  coupon,
}))
@Form.create()
class CouponEdit extends PureComponent {
  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type } = this.props;
    this.props.dispatch({
      type: 'coupon/loadForm',
      payload: {
        id,
        type,
      },
    });
  }

  onOKClick(value) {
    const { form, onSubmit } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        let formData = { ...values };
        formData.status = value;
        formData.top_img = values.top_img[0];
        formData.show_img = values.top_img.join(',');
        onSubmit(formData);
      }
    });
  }

  dispatch = action => {
    const { dispatch } = this.props;
    dispatch(action);
  };

  render() {
    const {
      coupon: { formVisible, formTitle, formData, submitting, formType },
      form: { getFieldDecorator, getFieldValue },
      callback,
    } = this.props;
    const RadioGroup = Radio.Group;
    const { TextArea } = Input;
    const InputGroup = Input.Group;
    const col = {
      sm: 24,
      md: 12,
    };
    const colCjy = {
      sm: 24,
      md: 24,
    };
    const footerJsx = [
      <Button key="close" onClick={this.props.callback}>
        关闭
      </Button>,
      <Button type="primary" onClick={() => this.onOKClick(1)}>
        暂存
      </Button>,
      <Button type="primary" onClick={() => this.onOKClick(2)}>
        提交审核
      </Button>,
    ];
    return (
      <Modal
        title={formTitle}
        width={850}
        visible={formVisible}
        maskClosable={false}
        confirmLoading={submitting}
        destroyOnClose
        footer={footerJsx}
        onCancel={callback}
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        <Card bordered={false} style={{ paddingLeft: 20, paddingRight: 20 }}>
          <p style={{ borderBottom: '1px #ececec solid' }}>基本信息</p>
          <Form layout="vertical">
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="优惠券名称">
                  {getFieldDecorator('name', {
                    initialValue: formData.name,
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="优惠券数量">
                  {getFieldDecorator('num', {
                    initialValue: formData.num ? formData.num : 0,
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                    ],
                  })(
                    <InputNumber
                      placeholder="请输入"
                      step={1}
                      min={0}
                      max={1000000}
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="优惠券购买单价">
                  {getFieldDecorator('price', {
                    initialValue: formData.price,
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(
                    <InputNumber
                      placeholder="请输入"
                      step={0.1}
                      min={0}
                      max={1000000}
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="优惠券类型">
                  {getFieldDecorator('c_type', {
                    initialValue: formData.c_type,
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(
                    <RadioGroup>
                      <Radio value={1}>抵扣券</Radio>
                      <Radio value={2}>满减券</Radio>
                      <Radio value={3}>折扣券</Radio>
                      {/* <Radio value={1}>通用券</Radio>
                      <Radio value={2}>商家券</Radio> */}
                      {/* <Radio value={2}>商品券</Radio> */}
                    </RadioGroup>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="发布平台">
                  {getFieldDecorator('owner_type', {
                    initialValue: formData.owner_type,
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(
                    <RadioGroup>
                      <Radio value={1}>平台</Radio>
                      <Radio value={2}>商家</Radio>
                    </RadioGroup>
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item
                  label="商家名称"
                  style={{
                    display: getFieldValue('owner_type') === 2 ? 'block' : 'none',
                  }}
                >
                  {getFieldDecorator('store_id', {
                    initialValue: formData.store_id,
                    rules: [
                      {
                        required: getFieldValue('owner_type') === 2,
                        message: '请输入',
                      },
                    ],
                  })(<StoreSelect />)}
                </Form.Item>
              </Col>
              {/* <Col {...col}>
                <Form.Item
                  label="商品券类型"
                  style={{
                    display: getFieldValue('c_type') === 3 ? 'block' : 'none',
                  }}
                >
                  {getFieldDecorator('good_type', {
                    initialValue: formData.good_type,
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                    ],
                  })( <RadioGroup>
                      <Radio value={1}>全部商品</Radio>
                      <Radio value={2}>指定商品可用</Radio>
                       <Radio value={3}>指定商品不可用</Radio>
                    </RadioGroup>)}
                </Form.Item>
              </Col> */}

              {/* <Col {...col}>
                <Form.Item
                  label="商品列表"
                  style={{
                    display: getFieldValue('good_type') !== 1 ? 'block' : 'none',
                  }}
                >
                  {getFieldDecorator('store_id', {
                    initialValue: formData.store_id,
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(<StoreSelect />)}
                </Form.Item>
              </Col> */}
            </Row>
            <Row gutter={32}>
              <Col {...colCjy}>
                <Form.Item label="使用门槛">
                  {getFieldDecorator('threshold', {
                    initialValue: formData.threshold,
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                    ],
                  })(
                    <RadioGroup>
                      <Radio value={1}>无使用门槛</Radio>
                      <InputGroup compact>
                        <Radio value={2} />
                        <Form.Item>
                          订单满
                          {getFieldDecorator('threshold_amount', {
                            initialValue: formData.threshold_amount,
                            rules: [
                              {
                                required: getFieldValue('validity_type') === 2,
                                message: '请填写',
                              },
                            ],
                          })(<InputNumber placeholder="请输入" step={1} min={0} max={1000000} />)}
                        </Form.Item>
                        元，减免
                        <Form.Item>
                          {getFieldDecorator('reduction_amount', {
                            initialValue: formData.reduction_amount,
                            rules: [
                              {
                                required: getFieldValue('validity_type') === 2,
                                message: '请填写',
                              },
                            ],
                          })(<InputNumber placeholder="请输入" step={1} min={0} max={1000000} />)}
                        </Form.Item>
                        元
                      </InputGroup>
                      <InputGroup compact>
                        <Radio value={3} />
                        <Form.Item>
                          抵扣金额
                          {getFieldDecorator('threshold_amount', {
                            initialValue: formData.threshold_amount,
                            rules: [
                              {
                                required: getFieldValue('validity_type') === 2,
                                message: '请填写',
                              },
                            ],
                          })(<InputNumber placeholder="请输入" step={1} min={0} max={1000000} />)}
                        </Form.Item>
                        元
                      </InputGroup>
                      <InputGroup compact>
                        <Radio value={4} />
                        <Form.Item>
                          上限金额
                          {getFieldDecorator('threshold_amount', {
                            initialValue: formData.threshold_amount,
                            rules: [
                              {
                                required: getFieldValue('validity_type') === 2,
                                message: '请填写',
                              },
                            ],
                          })(<InputNumber placeholder="请输入" step={1} min={0} max={1000000} />)}
                        </Form.Item>
                        元，折扣比例
                        <Form.Item>
                          {getFieldDecorator('reduction_amount', {
                            initialValue: formData.reduction_amount,
                            rules: [
                              {
                                required: getFieldValue('validity_type') === 2,
                                message: '请填写',
                              },
                            ],
                          })(<InputNumber placeholder="请输入" step={1} min={0} max={1000000} />)}
                        </Form.Item>
                        %
                      </InputGroup>
                    </RadioGroup>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="有效期内每位顾客最多使用数量">
                  {getFieldDecorator('per_capita_use', {
                    initialValue: formData.per_capita_use,
                    rules: [
                      {
                        required: true,
                        message: '请填写',
                      },
                    ],
                  })(
                    <RadioGroup>
                      {/* <Radio value={1}>无限制</Radio>
                      <InputGroup compact>
                        <Radio value={2} />
                        <Form.Item>
                          {getFieldDecorator('buy_per_capita_count', {
                            initialValue: formData.buy_per_capita_count,
                            rules: [
                              {
                                required: getFieldValue('per_capita_use') === 2,
                                message: '请填写',
                              },
                            ],
                          })(<InputNumber placeholder="请输入" step={1} min={0} max={1000000} />)}
                        </Form.Item>
                      </InputGroup> */}

                      <InputGroup>
                        <Row gutter={32}>
                          <Col span={6}>
                            <Radio value={1}>无限制</Radio>
                          </Col>

                          <Col span={2}>
                            <Radio value={2} />
                          </Col>
                          <Col span={8}>
                            <Form.Item>
                              {getFieldDecorator('buy_per_capita_count', {
                                initialValue: formData.buy_per_capita_count || 0,
                                rules: [
                                  {
                                    required: getFieldValue('per_capita_use') === 2,
                                    message: '请填写',
                                  },
                                ],
                              })(
                                <InputNumber placeholder="请输入" step={1} min={0} max={1000000} />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={2}>张</Col>
                        </Row>
                      </InputGroup>
                    </RadioGroup>
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="有效期内每位顾客最多购买数量">
                  {getFieldDecorator('buy_per_capita', {
                    initialValue: formData.buy_per_capita,
                    rules: [
                      {
                        required: true,
                        message: '请填写',
                      },
                    ],
                  })(
                    <InputNumber
                      placeholder="请输入"
                      step={1}
                      min={0}
                      max={1000000}
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="展示图片(最多上传9张)">
                  {getFieldDecorator('show_img', {
                    initialValue: formData.show_img ? [formData.show_img] : '',
                    rules: [
                      {
                        required: true,
                        message: '请上传',
                      },
                    ],
                  })(<PicturesWall num={9} bucket="mall" listType="picture-card" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="置顶图片">
                  {getFieldDecorator('top_img', {
                    initialValue: formData.top_img ? [formData.top_img] : '',
                    rules: [
                      {
                        required: true,
                        message: '请上传',
                      },
                    ],
                  })(<PicturesWall num={1} bucket="mall" listType="picture-card" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col {...colCjy}>
                <Form.Item label="有效期">
                  {getFieldDecorator('validity_type', {
                    initialValue: formData.validity_type,
                    rules: [
                      {
                        required: true,
                        message: '选择',
                      },
                    ],
                  })(
                    <RadioGroup>
                      <InputGroup>
                        <Row gutter={32}>
                          <Col span={2}>
                            <Radio value={1} />
                          </Col>
                          <Col span={10}>
                            <Form.Item>
                              {getFieldDecorator('validity_start', {
                                initialValue: moment(formData.validity_start) || '',
                                rules: [
                                  {
                                    required: getFieldValue('validity_type') === 1,
                                    message: '请填写',
                                  },
                                ],
                              })(<DatePicker showTime placeholder="请输入" />)}
                            </Form.Item>
                          </Col>
                          <Col span={2} push={2}>
                            至
                          </Col>
                          <Col span={10} push={2}>
                            <Form.Item>
                              {getFieldDecorator('validity_end', {
                                initialValue: moment(formData.validity_end) || '',
                                rules: [
                                  {
                                    required: getFieldValue('validity_type') === 1,
                                    message: '请填写',
                                  },
                                ],
                              })(<DatePicker showTime placeholder="请输入" />)}
                            </Form.Item>
                          </Col>
                        </Row>
                      </InputGroup>
                      <InputGroup compact>
                        <Radio value={2} />
                        <Form.Item>
                          领取后当天
                          {getFieldDecorator('validity_day', {
                            initialValue: formData.validity_day,
                            rules: [
                              {
                                required: getFieldValue('validity_type') === 2,
                                message: '请填写',
                              },
                            ],
                          })(<InputNumber placeholder="请输入" step={1} min={0} max={1000000} />)}
                          天生效
                        </Form.Item>
                      </InputGroup>
                      <InputGroup compact>
                        <Radio value={3} />
                        <Form.Item>
                          领取后次日
                          {getFieldDecorator('validity_day', {
                            initialValue: formData.validity_day,
                            rules: [
                              {
                                required: getFieldValue('validity_type') === 3,
                                message: '请填写',
                              },
                            ],
                          })(<InputNumber placeholder="请输入" step={1} min={0} max={1000000} />)}
                          天生效
                        </Form.Item>
                      </InputGroup>
                    </RadioGroup>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <p style={{ borderBottom: '1px #ececec solid' }}>领取和使用规则</p>
            <Row gutter={32}>
              {/* <Col {...colCjy}>
                <Form.Item label="领取人限制">
                  {getFieldDecorator('use_rule', {
                    initialValue: formData.use_rule || '',
                    rules: [
                      {
                        required: false,
                        message: '请输入经营范围',
                      },
                    ],
                  })(
                    <RadioGroup>
                      <Radio value={1}>不限制，所有人都可领取</Radio>
                      <InputGroup compact>
                        <Col span={12}>
                          <Radio value={2}>指定客户身份</Radio>
                        </Col>
                        <Col span={12} style={{display:getFieldValue('use_rule') === 2?'inline-block':'none'}}>
                          <Col span={12}>
                            <Button>选择客户身份</Button>
                          </Col>
                        </Col>
                      </InputGroup>
                    </RadioGroup>
                  )}
                </Form.Item>
              </Col> */}
            </Row>
            <Row gutter={32}>
              <Col {...colCjy}>
                <Form.Item label="使用规则">
                  {getFieldDecorator('sales_rule', {
                    initialValue: formData.sales_rule || '',
                    rules: [
                      {
                        required: false,
                        message: '请输入',
                      },
                    ],
                  })(<TextArea placeholder="请输入" autosize={{ minRows: 2, maxRows: 6 }} />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Modal>
    );
  }
}

export default CouponEdit;
