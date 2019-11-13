import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Modal, Row, Col, DatePicker, Card, Button, message } from 'antd';
import moment from 'moment';
import { DicSelect } from '@/components/Dictionary';
import PicturesWall from '../../../components/PicturesWall/PicturesWall';
import Businesslicense from '../../../components/Businesslicense/Businesslicense';
// import { parseTimestamp } from '../../../utils/utils';
import styles from '../EnterpriseApply/EnterpriseApply.less';
import NumberPlateDetail from '../NumberPlate/NumberPlateDetail';
import SpecificationTag from '../NumberPlate/SpecificationTag';
@connect(state => ({
  enterprise: state.enterprise,
}))
@Form.create()

//  企业入驻的模态对话框组件。
export default class EnterpriseInformationEdit extends PureComponent {
  // state = {
  //   addresslist: this.props.enterprise.formData.buildings,
  // };

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

  onAddClick = () => {
    this.props.dispatch({
      type: 'enterprise/changeFormVisibleStock',
      payload: true,
    });
  };

  handleDataFormCancel = () => {
    this.props.dispatch({
      type: 'enterprise/changeFormVisibleStock',
      payload: false,
    });
  };

  handleDataFormSubmit = addlist => {
    // const { addresslist } = this.state;
    // this.setState({ addresslist: [...addresslist, addlist] });
    const { form } = this.props;

    let buildings = form.getFieldValue('buildings');

    let exists = false;
    for (let i = 0; i < buildings.length; i += 1) {
      if (buildings[i].building_id === addlist.building_id) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      buildings = [...buildings, addlist];
    }

    form.setFieldsValue({ buildings });

    this.handleDataFormCancel();
  };

  onModalOKClick = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {
          enterprise: { formData: oldFormData },
        } = this.props;

        const formData = { ...oldFormData, ...values };
        if (formData.business_license_sdate) {
          formData.business_license_sdate = moment(formData.business_license_sdate, 'YYYY-MM-DD');
        }

        if (formData.business_license.length > 0) {
          formData.business_license = formData.business_license.join(',');
        } else {
          formData.business_license = '';
        }

        if (formData.logo && formData.logo.length > 0) {
          formData.logo = formData.logo.join(',');
        } else {
          formData.logo = '';
        }
        if (formData.representative_idcard_back && formData.representative_idcard_back.length > 0) {
          formData.representative_idcard_back = formData.representative_idcard_back.join(',');
        } else {
          formData.representative_idcard_back = '';
        }
        if (
          formData.representative_idcard_front &&
          formData.representative_idcard_front.length > 0
        ) {
          formData.representative_idcard_front = formData.representative_idcard_front.join(',');
        } else {
          formData.representative_idcard_front = '';
        }
        if (!formData.entry_date) {
          formData.entry_date = null;
        }
        if (formData.buildings.length === 0) {
          message.error('企业地址必填');
          return;
        }
        //  触发调度任务
        this.props.dispatch({
          type: 'enterprise/submit',
          payload: formData,
        });
      }
    });
  };

  renderDataForm() {
    const {
      enterprise: { formVisibleStock },
    } = this.props;
    return (
      <NumberPlateDetail
        visible={formVisibleStock}
        onCancel={this.handleDataFormCancel}
        onSubmit={this.handleDataFormSubmit}
        closeBack={this.onProEditClose}
      />
    );
  }

  renderFirstView = () => {
    const {
      enterprise: { formData },
      form: { getFieldDecorator },
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
    const formItemLayoutjy = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
      },
    };
    const col = {
      sm: 24,
      md: 12,
    };
    // const colC = {
    //   sm: 24,
    //   md: 24,
    // };
    const colCjy = {
      sm: 24,
      md: 24,
    };
    const { TextArea } = Input;
    return (
      <div className={styles.APPLYStore}>
        <div className={styles.TOPtitle}>
          <p>企业基本信息</p>
        </div>
        <Card bordered={false}>
          <Form>
            <Row>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="企业名称">
                  {getFieldDecorator('name', {
                    initialValue: formData.name || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入企业名称',
                      },
                    ],
                  })(<Input placeholder="请输入企业名称" maxLength="50" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="行业类别">
                  {getFieldDecorator('category', {
                    initialValue: formData.category,
                    rules: [
                      {
                        required: false,
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
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="企业电话">
                  {getFieldDecorator('phone', {
                    initialValue: formData.phone || '',
                    rules: [
                      {
                        required: false,
                        // whitespace: true,
                        // type: 'number',
                        // transform(value) {
                        //   if (value) {
                        //     return Number(value);
                        //   }
                        // },
                        message: '请输入企业电话',
                      },
                    ],
                  })(<Input placeholder="请输入企业电话" maxLength="13" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="企业管理员姓名">
                  {getFieldDecorator('applicant_name', {
                    initialValue: formData.applicant_name || '',
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(<Input placeholder="请输入" maxLength="11" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="管理员联系电话">
                  {getFieldDecorator('applicant_tel', {
                    initialValue: formData.applicant_tel || '',
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
                        message: '请输入申请联系人电话',
                      },
                    ],
                  })(<Input placeholder="请输入申请联系人电话" maxLength="11" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="企业邮箱">
                  {getFieldDecorator('zip_code', {
                    initialValue: formData.zip_code || '',
                    rules: [
                      {
                        type: 'email',
                        message: '请输入正确的邮箱格式!',
                      },
                      {
                        required: false,
                        message: '请输入',
                      },
                    ],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>

              <Col {...col}>
                <Form.Item {...formItemLayout} label={<span><span style={{color:'red'}}>*</span>企业入驻园区地址</span>}>
                  {getFieldDecorator('norm_value', {
                    //  rules: [
                    //   {
                    //     required: true,
                    //     message: '请选择企业地址',
                    //   },
                    // ],
                  })(
                    <Button icon="plus" type="primary" onClick={() => this.onAddClick()}>
                      新增企业入驻园区地址
                    </Button>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col {...colCjy}>
                <Form.Item {...formItemLayoutjy} label="企业园区地址列表">
                  {getFieldDecorator('buildings', {
                    initialValue: formData.buildings || [],
                    rules: [
                      {
                        required: false,
                        message: '请选择企业地址',
                      },
                    ],
                  })(<SpecificationTag />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="企业地址">
                  {getFieldDecorator('address', {
                    initialValue: formData.address || '',
                    rules: [
                      {
                        required: false,
                        message: '请输入',
                      },
                    ],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="企业入驻园区时间">
                  {getFieldDecorator('entry_date', {
                    initialValue: formData.entry_date ? moment(formData.entry_date) : '',
                  })(<DatePicker format="YYYY-MM-DD" placeholder="请选择" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <div className={styles.TOPtitle}>
          <p>经营单位基本信息</p>
        </div>
        <Card bordered={false}>
          <Form>
            <Row>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="统一社会信用代码">
                  {getFieldDecorator('credit_code', {
                    initialValue: formData.credit_code || '',
                    rules: [
                      {
                        required: false,
                        message: '请输入',
                      },
                    ],
                  })(<Input placeholder="请输入" maxLength="18" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="企业规模">
                  {getFieldDecorator('size', {
                    initialValue: formData.size ? formData.size.toString() : '',
                    rules: [
                      {
                        required: false,
                        message: '请选择',
                      },
                    ],
                  })(
                    <DicSelect
                      pcode="OPER$#enterprise_scale"
                      selectProps={{ placeholder: '请选择' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="公司类型">
                  {getFieldDecorator('company_type', {
                    initialValue: formData.company_type ? formData.company_type : '',
                    rules: [
                      {
                        required: false,
                        message: '请选择',
                      },
                    ],
                  })(
                    <DicSelect pcode="OPER$#company_type" selectProps={{ placeholder: '请选择' }} />
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="法定代表人">
                  {getFieldDecorator('representative', {
                    initialValue: formData.representative || '',
                    rules: [
                      {
                        required: false,
                        message: '请输入法定代表人',
                      },
                    ],
                  })(<Input placeholder="请输入法定代表人" maxLength="20" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col {...colCjy}>
                <Form.Item {...formItemLayoutjy} label="经营范围">
                  {getFieldDecorator('business_scope', {
                    initialValue: formData.business_scope || '',
                    rules: [
                      {
                        required: false,
                        message: '请输入经营范围',
                      },
                    ],
                  })(
                    <TextArea placeholder="请输入经营范围" autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="营业执照开始有效期">
                  {getFieldDecorator('business_license_sdate', {
                    initialValue: formData.business_license_sdate
                      ? moment(formData.business_license_sdate)
                      : '',
                    rules: [
                      {
                        required: false,
                        message: '请输入营业执照有效期',
                      },
                    ],
                  })(<DatePicker format="YYYY-MM-DD" placeholder="请选择" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="营业执照结束有效期">
                  {getFieldDecorator('business_license_edate', {
                    initialValue: formData.business_license_edate || '',
                    rules: [
                      {
                        required: false,
                        message: '请输入营业执照结束有效期',
                      },
                    ],
                  })(<Businesslicense onValue={formData.business_license_edate || ''} />)}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col sm={4} push="2">
                <Form.Item label="企业LOGO">
                  <span style={{ color: 'red' }}>（图片上传格式jpg,jpeg,png）</span>
                  {getFieldDecorator('logo', {
                    initialValue: formData.logo ? [formData.logo] : '',
                    rules: [
                      {
                        required: false,
                        message: '请上传企业LOGO',
                      },
                    ],
                  })(<PicturesWall num={1} bucket="oper" listType="picture-card" />)}
                </Form.Item>
              </Col>
              <Col sm={4} push={2}>
                <Form.Item label="营业执照">
                  <span style={{ color: 'red' }}>（图片上传格式jpg,jpeg,png）</span>
                  {getFieldDecorator('business_license', {
                    initialValue: formData.business_license ? [formData.business_license] : '',
                    rules: [
                      {
                        required: false,
                        message: '请上传营业执照',
                      },
                    ],
                  })(<PicturesWall num={1} bucket="oper" listType="picture-card" />)}
                </Form.Item>
              </Col>
              <Col sm={5} push={2}>
                <Form.Item label="法定代表人身份证(正面)">
                  <span style={{ color: 'red' }}>（图片上传格式jpg,jpeg,png）</span>
                  {getFieldDecorator('representative_idcard_front', {
                    initialValue: formData.representative_idcard_front
                      ? [formData.representative_idcard_front]
                      : '',
                    rules: [
                      {
                        required: false,
                        message: '请上传法定代表人身份证(正面)',
                      },
                    ],
                  })(<PicturesWall num={1} bucket="oper" listType="picture-card" />)}
                </Form.Item>
              </Col>
              <Col sm={5} push={2}>
                <Form.Item label="法定代表人身份证(反面)">
                  <span style={{ color: 'red' }}>（图片上传格式jpg,jpeg,png）</span>
                  {getFieldDecorator('representative_idcard_back', {
                    initialValue: formData.representative_idcard_back
                      ? [formData.representative_idcard_back]
                      : '',
                    rules: [
                      {
                        required: false,
                        message: '请上传法定代表人身份证(反面)',
                      },
                    ],
                  })(<PicturesWall num={1} bucket="oper" listType="picture-card" />)}
                </Form.Item>
              </Col>
            </Row>
            {/* <Row>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="热门企业">
                  {getFieldDecorator('flag', {
                    initialValue: formData.flag ? formData.flag.toString() : '2',
                  })(
                    <Radio.Group>
                      <Radio value="1">是</Radio>
                      <Radio value="2">否</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
            </Row> */}
          </Form>
        </Card>
        {this.renderDataForm()}
      </div>
      // <Form>

      //   <Row>
      //     <Col md={24} sm={24}>
      //       <Form.Item {...formItemLayout} label="企业简介">
      //         {getFieldDecorator('introduction', {
      //           initialValue: formData.introduction,
      //         })(<Input.TextArea rows={4} placeholder="请输入企业简介" />)}
      //       </Form.Item>
      //     </Col>
      //   </Row>
      // </Form>
    );
  };

  render() {
    const {
      enterprise: { formVisible, submitting },
    } = this.props;

    return (
      <Modal
        title="企业入驻"
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
