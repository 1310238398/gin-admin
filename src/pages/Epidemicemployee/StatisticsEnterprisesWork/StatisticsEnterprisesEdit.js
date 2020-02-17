import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Modal, Row, Col, Card, Radio, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import EnterpriseNewSelect from '@/components/EnterpriseNewList/index';
import ParkOP from '@/components/ParkOP/ParkOP';
import EnterpriseOwner from '@/components/EnterpriseOwner/EnterpriseOwner';
import ParkSelect from '@/components/ParkList/ParkSelect';
// import { parseTimestamp } from '../../../utils/utils';
import styles from '../../FaceEntry/FaceEntry.less';

const RadioGroup = Radio.Group;
@connect(state => ({
  statisticsEnterprisesList: state.statisticsEnterprisesList,
}))
@Form.create()

//  企业入驻的模态对话框组件。
export default class statisticsEnterprisesListEdit extends PureComponent {
  // state = {
  //   addresslist: this.props.enterprise.formData.buildings,
  // };

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type, callback } = this.props;
    this.props.dispatch({
      type: 'statisticsEnterprisesList/loadForm',
      payload: {
        id,
        type,
        callback,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'statisticsEnterprisesList/changeFormVisible',
      payload: false,
    });
    this.props.callback('ok');
  };

  onModalOKClick = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {
          statisticsEnterprisesList: { formData: oldFormData },
        } = this.props;

        const formData = { ...oldFormData, ...values };

        //  触发调度任务
        this.props.dispatch({
          type: 'statisticsEnterprisesList/submit',
          payload: formData,
        });
        this.props.callback();
      }
    });
  };

  render() {
    const {
      statisticsEnterprisesList: { formVisible, submitting, formTitle, formData },
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
        bodyStyle={{ height: 250, overflowY: 'scroll' }}
      >
        <div className={styles.APPLYStore}>
          <Card bordered={false}>
            <Form>
              <Row>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="园区">
                    {getFieldDecorator('park_id', {
                      initialValue: formData.park_id || '',
                      rules: [
                        {
                          required: true,
                          message: '请填写',
                        },
                      ],
                    })(<ParkOP />)}
                  </Form.Item>
                </Col>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="企业名称">
                    {getFieldDecorator('enterprise_id', {
                      initialValue: formData.enterprise_id || '',
                      rules: [
                        {
                          required: true,
                          message: '请填写',
                        },
                      ],
                    })(<EnterpriseOwner />)}
                  </Form.Item>
                </Col>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="是否复工">
                    {getFieldDecorator('is_back', {
                      initialValue: formData.is_back || 1,
                      rules: [
                        {
                          required: true,
                          message: '请填写',
                        },
                      ],
                    })(
                      <RadioGroup name="radiogroup">
                        <Radio value={1}>是</Radio>
                        <Radio value={2}>否</Radio>
                      </RadioGroup>
                    )}
                  </Form.Item>
                </Col>
                <Col {...col}>
                  <Form.Item
                    {...formItemLayout}
                    label={getFieldValue('is_back') === 1 ? '复工时间' : '计划复工时间'}
                  >
                    {getFieldDecorator('back_time', {
                      initialValue: moment(formData.back_time) || '',
                      rules: [
                        {
                          required: true,
                          message: '请填写',
                        },
                      ],
                    })(<DatePicker placeholder="选择时间" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                {/* <Col {...col}>
                  <Form.Item {...formItemLayout} label="复工人数">
                    {getFieldDecorator('back_num', {
                      initialValue: formData.back_num || 0,
                      rules: [
                        {
                          required: true,
                          message: '请选择性别',
                        },
                      ],
                    })(<InputNumber placeholder="请输入" min={0} style={{ width: '100%' }} />)}
                  </Form.Item>
                </Col> */}
              </Row>
            </Form>
          </Card>
        </div>
      </Modal>
    );
  }
}
