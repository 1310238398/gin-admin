import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Modal, Select, Row, Col, DatePicker, Radio, Tabs, Button, Table } from 'antd';

import PicturesWall from '../../components/PicturesWall/PicturesWall';
import { parseTimestamp } from '../../utils/utils';

@connect(state => ({
  enterprise: state.enterprise,
}))
@Form.create()

//  企业入驻的模态对话框组件。
export default class EnterpriseCard extends PureComponent {
  state = {
    loading: false, //  添加门牌信息到临时列表的时候，对话框的加载状态标志
    visible: false, //  添加门牌信息到临时列表的时候，对话框的可见性的状态标志
    menuItem: '1', //  企业基本信息和门牌信息的切换标签的状态标志，默认显示第一个标签
  };

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type, callback } = this.props;
    this.props.dispatch({
      type: 'enterprise/loadForm',
      payload: {
        id,
        type,
        callback,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'enterprise/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  onModalOKClick = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        if (formData.entry_time) {
          formData.entry_time = formData.entry_time.unix();
        }
        if (formData.migration_time) {
          formData.migration_time = formData.migration_time.unix();
        }
        if (formData.is_hot) {
          formData.is_hot = parseInt(formData.is_hot, 10);
        }
        if (formData.business_license.length > 0) {
          [formData.business_license] = formData.business_license;
        } else {
          formData.business_license = '';
        }
        if (formData.logo && formData.logo.length > 0) {
          [formData.logo] = formData.logo;
        } else {
          formData.logo = '';
        }
        //  触发调度任务
        this.props.dispatch({
          type: 'enterprise/submit',
          payload: formData,
        });
      }
    });
  };

  callback = key => {
    this.setState({ menuItem: key });
  };

  renderFirstView = () => {
    const {
      enterprise: { formData, categoryData },
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const formItemLayout2 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    return (
      <Form>
        <Row>
          <Col md={24} sm={24}>
            <Form.Item {...formItemLayout} label="企业名称">
              {getFieldDecorator('name', {
                initialValue: formData.name,
                rules: [
                  {
                    required: true,
                    message: '请输入企业名称',
                  },
                ],
              })(<Input placeholder="请输入企业名称" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={24} sm={24}>
            <Form.Item {...formItemLayout} label="行业类别">
              {getFieldDecorator('category', {
                initialValue: formData.category,
                rules: [
                  {
                    required: true,
                    message: '请选择行业类别',
                  },
                ],
              })(
                <Select style={{ width: '100%' }} placeholder="请选择">
                  {categoryData.map(item => {
                    return (
                      <Select.Option key={item.record_id} value={item.record_id}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={24} sm={24}>
            <Form.Item {...formItemLayout} label="企业联系人">
              {getFieldDecorator('contacter', {
                initialValue: formData.contacter,
                rules: [
                  {
                    required: true,
                    message: '请输入企业联系人',
                  },
                ],
              })(<Input placeholder="请输入企业联系人" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={24} sm={24}>
            <Form.Item {...formItemLayout} label="联系电话">
              {getFieldDecorator('contact_tel', {
                initialValue: formData.contact_tel,
                rules: [
                  {
                    required: true,
                    message: '请输入联系电话',
                  },
                ],
              })(<Input placeholder="请输入联系电话" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={24} sm={24}>
            <Form.Item {...formItemLayout} label="企业地址">
              {getFieldDecorator('address', {
                initialValue: formData.address,
                rules: [
                  {
                    required: true,
                    message: '请输入企业地址',
                  },
                ],
              })(<Input placeholder="请输入企业地址" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={24} sm={24}>
            <Form.Item {...formItemLayout} label="入驻时间">
              {getFieldDecorator('entry_time', {
                initialValue: formData.entry_time ? parseTimestamp(formData.entry_time) : null,
                rules: [
                  {
                    required: true,
                    message: '请选择入驻时间',
                  },
                ],
              })(<DatePicker format="YYYY-MM-DD" placeholder="请选择" style={{ width: '100%' }} />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={24} sm={24}>
            <Form.Item {...formItemLayout} label="迁出时间">
              {getFieldDecorator('migration_time', {
                initialValue: formData.migration_time
                  ? parseTimestamp(formData.migration_time)
                  : null,
                rules: [
                  {
                    required: false,
                    message: '请选择迁出时间',
                  },
                ],
              })(<DatePicker format="YYYY-MM-DD" placeholder="请选择" style={{ width: '100%' }} />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={24}>
            <Form.Item {...formItemLayout2} label="营业执照">
              {getFieldDecorator('business_license', {
                initialValue: formData.business_license ? [formData.business_license] : [],
                rules: [
                  {
                    required: false,
                    message: '请选择营业执照',
                  },
                ],
              })(<PicturesWall num={1} bucket="oper" listType="picture-card" />)}
            </Form.Item>
          </Col>
          <Col md={12} sm={24}>
            <Form.Item {...formItemLayout2} label="企业Logo">
              {getFieldDecorator('logo', {
                initialValue: formData.logo ? [formData.logo] : [],
                rules: [
                  {
                    required: false,
                    message: '请选择企业Logo',
                  },
                ],
              })(<PicturesWall num={1} bucket="oper" listType="picture-card" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={24} sm={24}>
            <Form.Item {...formItemLayout} label="热门企业">
              {getFieldDecorator('is_hot', {
                initialValue: formData.is_hot ? formData.is_hot.toString() : '2',
              })(
                <Radio.Group>
                  <Radio value="1">是</Radio>
                  <Radio value="2">否</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={24} sm={24}>
            <Form.Item {...formItemLayout} label="企业简介">
              {getFieldDecorator('introduction', {
                initialValue: formData.introduction,
              })(<Input.TextArea rows={4} placeholder="请输入企业简介" />)}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  renderSecondView = () => {
    // const dataSource = [{
    //   key: '1',
    //   name: '胡彦斌',
    //   age: 32,
    //   address: '西湖区湖底公园1号',
    // }, {
    //   key: '2',
    //   name: '胡彦祖',
    //   age: 42,
    //   address: '西湖区湖底公园1号',
    // }];

    const columns = [
      {
        title: '园区',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '区域',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '栋楼',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '单元',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '楼层',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '门牌',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '操作',
        dataIndex: 'address',
        key: 'address',
      },
    ];
    const { visible, loading } = this.state;

    const {
      enterprise: { formData, categoryData },
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <div>
        <Button type="primary" style={{ marginBottom: '10px' }} onClick={this.showModal}>
          添加
        </Button>
        <Table columns={columns} size="small" />
        <Modal
          visible={visible}
          title="企业门牌"
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <Form>
            <Row>
              <Col md={24} sm={24}>
                <Form.Item {...formItemLayout} label="园区">
                  {getFieldDecorator('category', {
                    initialValue: formData.category,
                    rules: [
                      {
                        required: true,
                        message: '请选择行业类别',
                      },
                    ],
                  })(
                    <Select style={{ width: '100%' }} placeholder="请选择">
                      {categoryData.map(item => {
                        return (
                          <Select.Option key={item.record_id} value={item.record_id}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col md={24} sm={24}>
                <Form.Item {...formItemLayout} label="区域">
                  {getFieldDecorator('category', {
                    initialValue: formData.category,
                    rules: [
                      {
                        required: true,
                        message: '请选择行业类别',
                      },
                    ],
                  })(
                    <Select style={{ width: '100%' }} placeholder="请选择">
                      {categoryData.map(item => {
                        return (
                          <Select.Option key={item.record_id} value={item.record_id}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col md={24} sm={24}>
                <Form.Item {...formItemLayout} label="楼栋">
                  {getFieldDecorator('category', {
                    initialValue: formData.category,
                    rules: [
                      {
                        required: true,
                        message: '请选择行业类别',
                      },
                    ],
                  })(
                    <Select style={{ width: '100%' }} placeholder="请选择">
                      {categoryData.map(item => {
                        return (
                          <Select.Option key={item.record_id} value={item.record_id}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col md={24} sm={24}>
                <Form.Item {...formItemLayout} label="单元">
                  {getFieldDecorator('category', {
                    initialValue: formData.category,
                    rules: [
                      {
                        required: true,
                        message: '请选择行业类别',
                      },
                    ],
                  })(
                    <Select style={{ width: '100%' }} placeholder="请选择">
                      {categoryData.map(item => {
                        return (
                          <Select.Option key={item.record_id} value={item.record_id}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col md={24} sm={24}>
                <Form.Item {...formItemLayout} label="楼层">
                  {getFieldDecorator('category', {
                    initialValue: formData.category,
                    rules: [
                      {
                        required: true,
                        message: '请选择行业类别',
                      },
                    ],
                  })(
                    <Select style={{ width: '100%' }} placeholder="请选择">
                      {categoryData.map(item => {
                        return (
                          <Select.Option key={item.record_id} value={item.record_id}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col md={24} sm={24}>
                <Form.Item {...formItemLayout} label="房号">
                  {getFieldDecorator('category', {
                    initialValue: formData.category,
                    rules: [
                      {
                        required: true,
                        message: '请选择行业类别',
                      },
                    ],
                  })(
                    <Select style={{ width: '100%' }} placeholder="请选择">
                      {categoryData.map(item => {
                        return (
                          <Select.Option key={item.record_id} value={item.record_id}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  };

  render() {
    const {
      enterprise: { formVisible, submitting },
    } = this.props;

    return (
      <Modal
        title="企业入驻"
        width={600}
        visible={formVisible}
        maskClosable={false}
        confirmLoading={submitting}
        destroyOnClose
        okText="保存"
        cancelText="关闭"
        onOk={this.onModalOKClick}
        onCancel={this.onModalCancelClick}
        style={{ top: 20 }}
        bodyStyle={{ height: 550, overflowY: 'scroll' }}
      >
        <Tabs type="card" activeKey={this.state.menuItem} onChange={this.callback}>
          <Tabs.TabPane tab="基本信息" key="1">
            {this.renderFirstView()}
          </Tabs.TabPane>
          <Tabs.TabPane tab="门牌信息" key="2">
            {this.renderSecondView()}
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    );
  }
}
