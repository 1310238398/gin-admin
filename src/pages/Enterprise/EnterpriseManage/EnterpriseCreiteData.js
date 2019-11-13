import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Modal, Row, Col, DatePicker, Card, InputNumber } from 'antd';
import moment from 'moment';
import PicturesWall from '../../../components/PicturesWall/PicturesWall';
// import { parseTimestamp } from '../../../utils/utils';
import styles from '../EnterpriseApply/EnterpriseApply.less';

@connect(state => ({
  enterprise: state.enterprise,
}))
@Form.create()

//  企业入驻的模态对话框组件。
export default class EnterpriseCreiteData extends PureComponent {
  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { data } = this.props;
    this.props.dispatch({
      type: 'enterprise/enterpriseCreiteOne',
      payload: data.record_id,
    });
  }

  onModalCancelClick = () => {
    const { callbackClose } = this.props;
    callbackClose();
  };

  onModalOKClick = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {
          enterprise: { enterpriseCreite: oldFormData },
        } = this.props;

        const formData = { ...oldFormData, ...values };
        if (formData.report_date) {
          formData.report_date = moment(formData.report_date,"YYYY-MM-DD");
          //formData.report_date = formData.report_date.format("YYYY-MM-DD");
        } else {
          formData.report_date = null;
        }
        if(formData.archive_file){
            [formData.archive_file] =formData.archive_file;
        }
        formData.record_id = this.props.data.record_id;

        //  触发调度任务
        this.props.callback(formData);
      }
    });
  };

  renderFirstView = () => {
    const {
      enterprise: { enterpriseCreite },
      form: { getFieldDecorator },
      data,
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
      <div className={styles.APPLYStore}>
        <div className={styles.TOPtitle}>
          <p>企业信用档案维护</p>
        </div>
        <Card bordered={false}>
          <Form>
            <Row>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="企业名称">
                  {getFieldDecorator('name', {
                    initialValue: enterpriseCreite.name ? enterpriseCreite.name : data.name,
                  })(<Input placeholder="请输入" maxLength="18" readOnly />)}
                </Form.Item>
              </Col>

              <Col {...col}>
                <Form.Item {...formItemLayout} label="企业信用档案文件">
                  {/* <span style={{ color: 'red' }}>（图片上传格式jpg,jpeg,png）</span> */}
                  {getFieldDecorator('archive_file', {
                    initialValue: enterpriseCreite.archive_file
                      ? [enterpriseCreite.archive_file]
                      : [],
                    rules: [
                      {
                        required: false,
                        message: '请上传企业信用档案',
                      },
                    ],
                  })(<PicturesWall num={1} bucket="oper" listType="text" />)}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="报告生成时间">
                  {getFieldDecorator('report_date', {
                    initialValue: enterpriseCreite.report_date
                      ? moment(enterpriseCreite.report_date)
                      : '',
                  })(<DatePicker format="YYYY-MM-DD" placeholder="请选择" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card bordered={false}>
          <Form>
            <Row>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="参保人数">
                  {getFieldDecorator('social_security_num', {
                    initialValue: enterpriseCreite.social_security_num || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(<InputNumber min={0} step={1} placeholder="请输入" maxLength="18" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="企业信用评分">
                  {getFieldDecorator('credit_score', {
                    initialValue: enterpriseCreite.credit_score || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(<InputNumber min={0} step={1} placeholder="请输入" maxLength="18" />)}
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
      enterprise: { submitting },
    } = this.props;
    return (
      <Modal
        title="企业信用档案维护"
        width={873}
        visible
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
