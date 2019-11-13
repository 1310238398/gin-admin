import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Modal, Row, Col, Card, Select, TreeSelect } from 'antd';
// import { DicSelect } from '@/components/Dictionary';
// import ParkSelect from '../../components/ParkList/ParkSelect';
import PicturesWall from '../../components/PicturesWall/PicturesWall';
import UserTypeRadioGroup from '../Enterprise/UserType/RadioGroup';
import styles from './PersonnelEdit.less';
import { getPhoto } from '@/utils/utils';
@connect(state => ({
  personnel: state.personnel,
}))
@Form.create()

//  员工信息的模态对话框组件。
export default class PersonnelInfoEdit extends PureComponent {
  // state = {
  //   addresslist: this.props.enterprise.formData.buildings,
  // };

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type, enterid } = this.props;
    this.props.dispatch({
      type: 'personnel/loadForm',
      payload: {
        id,
        type,
        enterid,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'personnel/changeFormVisible',
      payload: false,
    });
    this.props.clearSelectRows();
  };

  onModalOKClick = () => {
    const { submit } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { formData } = this.props;

        const Data = { ...formData, ...values };
        submit(Data);
        // this.props.dispatch({
        //   type: 'personnel/submit',
        //   payload: Data,
        //   enterpriseID: enterid,
        // });
      }
    });
  };

  renderFirstView = () => {
    const {
      personnel: { treeData, formData },
      form: { getFieldDecorator },
      enterid,
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

    const col = {
      sm: 24,
      md: 12,
    };
    const { Option } = Select;
    return (
      <div className={styles.APPLYStore}>
        <div className={styles.TOPtitle}>
          <p>个人基本信息</p>
        </div>
        <Card bordered={false}>
          <Form>
            <Row>
              <Col sm={5} push={2}>
                <Form.Item {...formItemLayout}>
                  <img src={getPhoto(formData.user?formData.user.photo:'')} alt="" width={100} height={100} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="昵称">
                  {getFieldDecorator('nickname', {
                    initialValue: formData.user?formData.user.nickname:'',
                    rules: [
                      {
                        required: false,
                        message: '请输入昵称',
                      },
                    ],
                  })(<Input placeholder="请输入昵称" maxLength="50" disabled />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="真实姓名">
                  {getFieldDecorator('real_name', {
                    initialValue: formData.user?formData.user.real_name :'',
                    rules: [
                      {
                        required: false,

                        message: '请输入真实姓名',
                      },
                    ],
                  })(<Input placeholder="请输入真实姓名" maxLength="20" disabled />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="性别">
                  {getFieldDecorator('gender', {
                    initialValue: formData.user?formData.user.gender :'',
                    rules: [
                      {
                        required: false,
                        message: '请输入',
                      },
                    ],
                  })(
                    <Select disabled>
                      <Option value={1}>男</Option>
                      <Option value={2}>女</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="手机号">
                  {getFieldDecorator('phone', {
                    initialValue: formData.user?formData.user.phone :'',
                    rules: [
                      {
                        required: false,
                        whitespace: true,
                        type: 'number',
                        transform(value) {
                          if (value) {
                            return Number(value);
                          }
                        },
                      },
                    ],
                  })(<Input placeholder="请输入" maxLength="11" disabled />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              {/* <Col {...col}>
                <Form.Item {...formItemLayout} label="园区">
                  {getFieldDecorator('category', {
                    initialValue: formData.category,
                    rules: [
                      {
                        required: true,
                        message: '请输入行业类别',
                      },
                    ],
                  })(<ParkSelect />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="企业">
                  {getFieldDecorator('category', {
                    initialValue: formData.category,
                    rules: [
                      {
                        required: true,
                        message: '请输入行业类别',
                      },
                    ],
                  })(
                    <DicSelect
                      pcode="OPER$#enterprise_category_industry"
                      selectProps={{ placeholder: '请选择' }}
                    />
                  )}
                </Form.Item>
              </Col> */}
              <Col {...col}>
                <Form.Item {...formItemLayout} label="用户类型">
                  {getFieldDecorator('user_type', {
                    initialValue: formData.user_type,
                    rules: [
                      {
                        required: true,
                        message: '请输入角色',
                      },
                    ],
                  })(
                    <UserTypeRadioGroup enterpriseID={enterid} />
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="部门">
                  {getFieldDecorator('dept_id', {
                    initialValue: formData.dept_id,
                    rules: [
                      {
                        required: true,
                        message: '请输入部门',
                      },
                    ],
                  })(
                    <TreeSelect
                      treeDefaultExpandedKeys={[treeData.length > 0 && treeData[0].record_id]}
                      treeNodeFilterProp="title"
                      style={{ minWidth: 200 }}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={treeData}
                      placeholder="请选择"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col {...col} push="2">
                <Form.Item label="人脸照片">
                  <img
                    src={formData.user?formData.user.human_face  : ''}
                    alt=""
                    style={{ width: '100px', height: '100px' }}
                  />
                  {/* <span style={{ color: 'red' }}>（图片上传格式jpg,jpeg,png）</span>
                  {getFieldDecorator('human_face', {
                    initialValue: formData.human_face ? [formData.human_face] : '',
                    rules: [
                      {
                        required: true,
                        message: '请上传图片',
                      },
                    ],
                  })(<PicturesWall num={1} bucket="oper" listType="picture-card" />)} */}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
  };

  render() {
    const {
      personnel: { formVisible, submitting, fomTitle },
    } = this.props;
    return (
      <Modal
        title={fomTitle}
        width={873}
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
        {this.renderFirstView()}
      </Modal>
    );
  }
}
