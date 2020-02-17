import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Modal, Row, Col, Card, Radio } from 'antd';
import PicturesWall from '@/components/PicturesWall/PicturesWall';
import EnterpriseNewSelect from '@/components/EnterpriseNewList/index';
import EnterpriseShow from '@/components/EnterpriseShow/index';
import UserTypeShow from '../Enterprise/UserType/Show/index';
import EnterprisePositionSelect from '@/components/EnterprisePosition/EnterprisePosition';
import UserTypeRadioGroup from '../Enterprise/UserType/RadioGroup';
import { checkPhoneNum } from '@/utils/utils';
// import { parseTimestamp } from '../../../utils/utils';
import styles from './FaceEntry.less';

const RadioGroup = Radio.Group;
@connect(state => ({
  faceEntry: state.faceEntry,
}))
@Form.create()

//  企业入驻的模态对话框组件。
export default class FaceEntryEdit extends PureComponent {
  // state = {
  //   addresslist: this.props.enterprise.formData.buildings,
  // };

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type, callback } = this.props;
    this.props.dispatch({
      type: 'faceEntry/loadForm',
      payload: {
        id,
        type,
        callback,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'faceEntry/changeFormVisible',
      payload: false,
    });
    this.props.callback("ok");
  };

  onModalOKClick = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {
          faceEntry: { formData: oldFormData },
        } = this.props;

        const formData = { ...oldFormData, ...values };
        if (formData.human_face && formData.human_face.length > 0) {
          formData.human_face = formData.human_face.join(',');
        } else {
          formData.human_face = '';
        }
        console.log(formData);
        //  触发调度任务
        this.props.dispatch({
          type: 'faceEntry/submit',
          payload: formData,
        });
        this.props.callback();
      }
     
    });
  };

  render() {
    const {
      faceEntry: { formVisible, submitting, formTitle, formData },
      form: { getFieldDecorator, getFieldValue },
      type,
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
    return (
      <Modal
        title={formTitle}
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
        <div className={styles.APPLYStore}>
          <Card bordered={false}>
            <Form>
              <Row>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="用户姓名">
                    {getFieldDecorator('real_name', {
                      initialValue: formData.real_name || '',
                      rules: [
                        {
                          required: true,
                          message: '请填写用户姓名',
                        },
                      ],
                    })(<Input placeholder="请输入" maxLength="11" />)}
                  </Form.Item>
                </Col>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="手机号">
                    {getFieldDecorator('phone', {
                      initialValue: formData.phone || '',
                      rules: [
                        {
                          required: true,
                          message: '请填写手机号',

                        },
                        { validator: checkPhoneNum },
                      ],
                    })(
                      <Input
                        placeholder="请输入"
                        maxLength="11"
                        style={{ width: '100%' }}
                        disabled={type === 'E' ? true : false}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="用户性别">
                    {getFieldDecorator('gender', {
                      initialValue: formData.gender || 1,
                      rules: [
                        {
                          required: true,
                          message: '请选择性别',
                        },
                      ],
                    })(
                      <RadioGroup name="radiogroup">
                        <Radio value={1}>男</Radio>
                        <Radio value={2}>女</Radio>
                      </RadioGroup>
                    )}
                  </Form.Item>
                </Col>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="昵称">
                    {getFieldDecorator('nickname', {
                      initialValue: formData.nickname || '',
                      rules: [
                        {
                          required: true,
                          message: '请填写昵称',
                        },
                      ],
                    })(<Input placeholder="请输入" maxLength="11" style={{ width: '100%' }} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col {...col}>
                  {type === 'E' ? (
                    <Form.Item {...formItemLayout} label="企业名称">
                      {getFieldDecorator('enterprise_id', {
                        initialValue: formData.enterprise_id || '',
                        rules: [
                          {
                            required: true,
                            message: '请输入企业名称',
                          },
                        ],
                      })(<EnterpriseShow value={formData.enterprise_id} />)}
                    </Form.Item>
                  ) : (
                    <Form.Item {...formItemLayout} label="企业名称">
                      {getFieldDecorator('enterprise_id', {
                        initialValue: formData.enterprise_id || '',
                        rules: [
                          {
                            required: true,
                            message: '请输入企业名称',
                          },
                        ],
                      })(<EnterpriseNewSelect placeholder="请输入企业名称" />)}
                    </Form.Item>
                  )}
                </Col>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="部门">
                    {getFieldDecorator('dept_id', {
                      initialValue: formData.dept_id,
                      rules: [
                        {
                          required: true,
                          message: '请选择',
                        },
                      ],
                    })(<EnterprisePositionSelect parentID={getFieldValue('enterprise_id')} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col {...col}>
                  {type === 'E' ? (
                    <Form.Item {...formItemLayout} label="用户类型">
                      {getFieldDecorator('user_type', {
                        initialValue: formData.user_type,
                        rules: [
                          {
                            required: true,
                            message: '请选择用户类型',
                          },
                        ],
                      })(
                        <UserTypeShow
                          enterpriseID={formData.enterprise_id}
                          code={formData.user_type}
                        />
                      )}
                    </Form.Item>
                  ) : (
                    <Form.Item {...formItemLayout} label="用户类型">
                      {getFieldDecorator('user_type', {
                        initialValue: formData.user_type,
                        rules: [
                          {
                            required: true,
                            message: '请选择用户类型',
                          },
                        ],
                      })(<UserTypeRadioGroup enterpriseID={getFieldValue('enterprise_id')} />)}
                    </Form.Item>
                  )}
                </Col>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="用户人脸照片">
                    <span style={{ color: 'red' }}>（图片上传格式jpg,jpeg,png）</span>
                    {getFieldDecorator('human_face', {
                      initialValue: formData.human_face ? [formData.human_face] : '',
                      rules: [
                        {
                          required: true,
                          message: '请上传人脸照片',
                        },
                      ],
                    })(<PicturesWall num={1} bucket="oper" listType="picture-card" />)}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      </Modal>
    );
  }
}
