import React from 'react';
import { Modal, Form, Row, Col, Input, Select, Button } from 'antd';
import { connect } from 'dva';
import UserSelect from '../../components/UserSelect/UserSelect';
import EnterpriseSelect from '../../components/EnterpriseSelect';
import { formatTimestamp } from '../../utils/utils';

@Form.create()
@connect(state => ({
  noticeRelease: state.noticeRelease,
}))
export default class NoticeReleaseCard extends React.PureComponent {
  state = {
    noticeObject: false,
    noticeUser: false,
    fromDisabled: true,
  };

  componentDidMount() {
    const { id, type, callback } = this.props;

    if (type === 'A') {
      this.setState({
        fromDisabled: false,
      });
    } else if (type === 'V') {
      this.setState({
        fromDisabled: true,
      });
    } else {
      this.setState({
        fromDisabled: false,
      });
    }
    this.props.dispatch({
      type: 'noticeRelease/loadForm',
      payload: {
        id,
        type,
        callback,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'noticeRelease/changemodalVisible',
      payload: false,
    });
    this.props.callback();
  };

  // selectCallBack = (val, status) => {
  //   console.log(val);
  // };

  sendOut = val => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // if (values.notice_mode.length === 2) {
        //   values.notice_mode = 3;
        // } else if (values.notice_mode.length === 1) {
        //   if (values.notice_mode[0] === '推送通知') {
        //     values.notice_mode = 1;
        //   } else {
        //     values.notice_mode = 2;
        //   }
        // }
        values.notice_mode = 1;
        values.receive_group_type = parseInt(values.receive_group_type, 10);
        this.props.dispatch({
          type: 'noticeRelease/add',
          payload: values,
          val,
          id: this.props.id,
        });
        this.props.callback();
      }
    });
  };

  handleChange = value => {
    if (value === 7 || value === 6) {
      this.setState({
        noticeObject: true,
      });
    } else {
      this.setState({
        noticeObject: false,
      });
    }
    if (value === 8) {
      this.setState({
        noticeUser: true,
      });
    } else {
      this.setState({
        noticeUser: false,
      });
    }
  };

  render() {
    const {
      noticeRelease: { modalVisible, modalTitle, formData },
      form: { getFieldDecorator },
    } = this.props;
    const { type } = this.props;
    let footerJsx = [];
    if (type === 'A') {
      footerJsx = [
        <Button key="addClose" onClick={this.onModalCancelClick}>
          关闭{' '}
        </Button>,
        <Button key="addSendOut" type="primary" onClick={() => this.sendOut('add')}>
          发送
        </Button>,
        <Button
          key="editDeposit"
          type="primary"
          onClick={() => this.sendOut('temporaryStorage_create')}
        >
          暂存
        </Button>,
      ];
    } else if (type === 'V') {
      footerJsx = [
        <Button key="viewClose" onClick={this.onModalCancelClick}>
          关闭{' '}
        </Button>,
      ];
    } else {
      footerJsx = [
        <Button key="editClose" onClick={this.onModalCancelClick}>
          关闭{' '}
        </Button>,
        <Button key="editSendOut" type="primary" onClick={() => this.sendOut('send')}>
          发送
        </Button>,
        <Button key="editDeposit" type="primary" onClick={() => this.sendOut('temporaryStorage')}>
          暂存
        </Button>,
      ];
    }
    // const CheckboxGroup = Checkbox.Group;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const { Option } = Select;
    const { TextArea } = Input;
    // const plainOptions = ['推送通知', '短信通知'];
    return (
      <Modal
        visible={modalVisible}
        title={modalTitle}
        width={600}
        footer={footerJsx}
        onCancel={this.onModalCancelClick}
      >
        <Form>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="标题">
                {getFieldDecorator('notice_title', {
                  initialValue: formData.notice_title ? formData.notice_title : '',
                  rules: [
                    {
                      required: true,
                      message: '请输入标题',
                    },
                  ],
                })(<Input placeholder="请输入标题" disabled={this.state.fromDisabled} />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="目标群体">
                {getFieldDecorator('receive_group_type', {
                  initialValue: formData.receive_group_type ? formData.receive_group_type : '',
                  rules: [
                    {
                      required: true,
                      message: '请选择目标群体',
                    },
                  ],
                })(
                  <Select
                    disabled={this.state.fromDisabled}
                    showSearch
                    placeholder="请选择目标群体"
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value={1}>所有企业管理员</Option>
                    <Option value={2}>所有用户</Option>
                    <Option value={3}>所有游客</Option>
                    <Option value={4}>所有未认证用户</Option>
                    <Option value={5}>所有认证用户</Option>
                    <Option value={6}>指定企业管理员</Option>
                    <Option value={7}>指定企业全员</Option>
                    <Option value={8}>指定用户</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          {this.state.noticeObject ||
          formData.receive_group_type === 7 ||
          formData.receive_group_type === 6 ? (
            <Row>
              <Col md={24} sm={24}>
                <Form.Item {...formItemLayout} label="通知对象">
                  {getFieldDecorator('receive_group', {
                    initialValue: formData.receive_group ? formData.receive_group : [],
                    rules: [
                      {
                        required: true,
                        message: '请选择通知对象',
                      },
                    ],
                  })(<EnterpriseSelect mode="multiple" disabled={this.state.fromDisabled} />)}
                </Form.Item>
              </Col>
            </Row>
          ) : null}
          {this.state.noticeUser || formData.receive_group_type === 8 ? (
            <Row>
              <Col md={24} sm={24}>
                <Form.Item {...formItemLayout} label="通知对象">
                  {getFieldDecorator('receive_group', {
                    initialValue: formData.receive_group ? formData.receive_group : [],
                    rules: [
                      {
                        required: true,
                        message: '请选择通知对象',
                      },
                    ],
                  })(<UserSelect mode="multiple" disabled={this.state.fromDisabled} type="get" />)}
                </Form.Item>
              </Col>
            </Row>
          ) : null}
          {/* <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="通知方式">
                {getFieldDecorator('notice_mode', {
                  initialValue: formData.notice_mode ? formData.notice_mode_name : [],
                  rules: [
                    {
                      required: true,
                      message: '请选择通知方式',
                    },
                  ],
                })(<CheckboxGroup options={plainOptions} disabled={this.state.fromDisabled} />)}
              </Form.Item>
            </Col>
          </Row> */}
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="通知内容">
                {getFieldDecorator('notice_content', {
                  initialValue: formData.notice_content ? formData.notice_content : '',
                  rules: [
                    {
                      required: true,
                      message: '请输入通知内容',
                    },
                  ],
                })(
                  <TextArea
                    placeholder="请输入通知内容"
                    autosize={{ minRows: 2, maxRows: 6 }}
                    disabled={this.state.fromDisabled}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          {type !== 'A' && (
            <div>
              <Row>
                <Col md={24} sm={24}>
                  <Form.Item {...formItemLayout} label="创建人">
                    <span>{formData.creator_name}</span>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={24} sm={24}>
                  <Form.Item {...formItemLayout} label="创建时间">
                    <span>{formatTimestamp(formData.created)} </span>
                  </Form.Item>
                </Col>
              </Row>
              {formData.status === 2 && (
                <Row>
                  <Col md={24} sm={24}>
                    <Form.Item {...formItemLayout} label="发送人">
                      <span>{formData.notice_sender_name}</span>
                    </Form.Item>
                  </Col>
                </Row>
              )}
              {formData.status === 2 && (
                <Row>
                  <Col md={24} sm={24}>
                    <Form.Item {...formItemLayout} label="发送时间">
                      <span>{formatTimestamp(formData.send_time)} </span>
                    </Form.Item>
                  </Col>
                </Row>
              )}
              <Row>
                <Col md={24} sm={24}>
                  <Form.Item {...formItemLayout} label="状态">
                    {formData.status === 1 && <span>编辑中</span>}
                    {formData.status === 2 && <span>已发送</span>}
                  </Form.Item>
                </Col>
              </Row>
            </div>
          )}
        </Form>
      </Modal>
    );
  }
}
