import React from 'react';
/* 引用组件 */
import { connect } from 'dva';
import { Card, Form, Row, Col, Input, Button, message, Icon, DatePicker } from 'antd';
import moment from 'moment';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import PicturesWall from '../../../components/PicturesWall/PicturesWall';
import Businesslicense from '../../../components/Businesslicense/Businesslicense';
import { formatTimestamp } from '../../../utils/utils';
import { DicSelect } from '@/components/Dictionary';
/* 样式 */
import styles from './EnterpriseApply.less';

@Form.create()
@connect(state => ({
  enterprise: state.enterprise,
}))
/* 组件 */
export default class EnterpriseApply extends React.PureComponent {
  /* 初始数据 */
  state = {
    disabled: false,
  };

  // /* 挂载完成 */
  // async componentDidMount() {
  //   await this.props.dispatch({
  //     type: 'store/getStore',
  //   });
  //   const { register } = this.props.storeApply;
  //   /* 状态 */
  //   if (register.application_status === 1) {
  //     this.setState({
  //       disabled: true,
  //     });
  //   }
  // }

  /* 表单提交 */
  handleBtnClick = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.member_cut = Math.round(Number(values.member_cut));
        values.corporation_type = Math.round(Number(values.corporation_type));
        if (values.representative_idcard_front) {
          values.representative_idcard_front = values.representative_idcard_front;
        } else {
          message.error('身份证证件照信息缺失，请完善');
        }
        if (values.representative_idcard_back) {
          values.representative_idcard_back = values.representative_idcard_back;
        } else {
          message.error('身份证证件照信息缺失，请完善');
        }
        // values.persional_id_image = values.persional_id_image[0];
        [values.license_image] = values.license_image;

        if (
          values.issue_time &&
          values.issue_time !== '' &&
          (values.expiration_time && values.expiration_time !== '长期有效')
        ) {
          const formData = { ...values };
          this.props.dispatch({
            type: 'enterprise/applyStore',
            payload: formData,
          });
        }
      }
    });
  };

  render() {
    /* 表单布局 */
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
    const colC = {
      sm: 24,
      md: 24,
    };
    const colCjy = {
      sm: 24,
      md: 24,
    };
    /* 表单功能 */
    const { TextArea } = Input;
    const {
      form: { getFieldDecorator },
    } = this.props;
    /* 表单数据 */
    const formData = this.props.storeApply.register;
    return (
      <PageHeaderLayout title="企业信息">
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
                    })(
                      <Input
                        placeholder="请输入企业名称"
                        disabled={this.state.disabled}
                        maxLength="50"
                      />
                    )}
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
                        vmode="int"
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
                          required: true,
                          whitespace: true,
                          message: '请输入企业电话',
                        },
                      ],
                    })(
                      <Input
                        placeholder="请输入企业电话"
                        disabled={this.state.disabled}
                        maxLength="20"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="企业管理员姓名">
                    {getFieldDecorator('applicant_name', {
                      initialValue: formData.applicant_name || '',
                      rules: [
                        {
                          required: true,
                        },
                      ],
                    })(
                      <Input placeholder="请输入" disabled={this.state.disabled} maxLength="11" />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="联系人电话">
                    {getFieldDecorator('applicant_tel', {
                      initialValue: formData.applicant_tel || '',
                      rules: [
                        {
                          required: true,
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
                    })(
                      <Input
                        placeholder="请输入申请联系人电话"
                        disabled={this.state.disabled}
                        maxLength="11"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="企业地址">
                    {getFieldDecorator('address', {
                      initialValue: formData.address || '',
                      rules: [
                        {
                          required: true,
                          message: '请输入企业地址',
                        },
                      ],
                    })(
                      <Input
                        placeholder="请输入企业地址"
                        disabled={this.state.disabled}
                        maxLength="100"
                      />
                    )}
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
                          required: true,
                          message: '请输入',
                        },
                      ],
                    })(
                      <Input placeholder="请输入" disabled={this.state.disabled} maxLength="18" />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="企业规模">
                    {getFieldDecorator('size', {
                      initialValue: formData.size ? formData.size.toString() : '',
                    })(
                      <DicSelect
                        vmode="int"
                        pcode="OPER$#enterprise_scale"
                        selectProps={{ placeholder: '请选择' }}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="公司类型">
                    {getFieldDecorator('corporation_type', {
                      initialValue: formData.corporation_type
                        ? formData.corporation_type.toString()
                        : '',
                    })(
                      <DicSelect
                        vmode="int"
                        pcode="OPER$#company_type"
                        selectProps={{ placeholder: '请选择' }}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="法定代表人">
                    {getFieldDecorator('representative', {
                      initialValue: formData.representative || '',
                      rules: [
                        {
                          required: true,
                          message: '请输入法定代表人',
                        },
                      ],
                    })(
                      <Input
                        placeholder="请输入法定代表人"
                        disabled={this.state.disabled}
                        maxLength="20"
                      />
                    )}
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
                      <TextArea
                        placeholder="请输入经营范围"
                        autosize={{ minRows: 2, maxRows: 6 }}
                        disabled={this.state.disabled}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="营业执照开始有效期">
                    {getFieldDecorator('business_license_sdate', {
                      initialValue: moment(formData.business_license_sdate) || '',
                      rules: [
                        {
                          required: true,
                          message: '请输入营业执照有效期',
                        },
                      ],
                    })(
                      <DatePicker
                        format="YYYY-MM-DD"
                        placeholder="请选择"
                        disabled={this.state.disabled}
                      />
                    )}
                  </Form.Item>
                </Col>

                <Col {...col}>
                  <Form.Item {...formItemLayout} label="营业执照结束有效期">
                    {getFieldDecorator('business_license_edate', {
                      initialValue: formData.business_license_edate || '',
                      rules: [
                        {
                          required: true,
                          message: '请输入营业执照结束有效期',
                        },
                      ],
                    })(
                      <Businesslicense
                        onValue={formData.business_license_edate || ''}
                        ondisabled={this.state.disabled}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col sm={6} push="2">
                  <Form.Item label="企业LOGO">
                    <span style={{ color: 'red' }}>（图片上传格式jpg,jpeg,png）</span>
                    {getFieldDecorator('logo', {
                      initialValue: formData.logo ? [formData.logo] : '',
                      rules: [
                        {
                          required: true,
                          message: '请上传企业LOGO',
                        },
                      ],
                    })(
                      this.state.disabled ? (
                        <div className={styles.seeImg}>
                          <div
                            className={[styles.imgMask, this.state.BigA ? styles.black : ''].join(
                              ' '
                            )}
                          >
                            <div className={styles.preview}>
                              {this.state.BigA && (
                                <Icon type="zoom-in" theme="outlined" className={styles.icon} />
                              )}
                            </div>
                            <img src={formData.portrait} alt="未上传" />
                          </div>
                        </div>
                      ) : (
                        <PicturesWall num={1} bucket="mall" listType="picture-card" />
                      )
                    )}
                  </Form.Item>
                </Col>
                <Col sm={4} push={2}>
                  <Form.Item label="营业执照">
                    <span style={{ color: 'red' }}>（图片上传格式jpg,jpeg,png）</span>
                    {getFieldDecorator('business_license', {
                      initialValue: formData.business_license ? [formData.business_license] : '',
                      rules: [
                        {
                          required: true,
                          message: '请上传营业执照',
                        },
                      ],
                    })(
                      this.state.disabled ? (
                        <div className={styles.seeImg}>
                          <div
                            className={[styles.imgMask, this.state.BigA ? styles.black : ''].join(
                              ' '
                            )}
                          >
                            <div className={styles.preview}>
                              {this.state.BigA && (
                                <Icon type="zoom-in" theme="outlined" className={styles.icon} />
                              )}
                            </div>
                            <img src={formData.license_image} alt="未上传" />
                          </div>
                        </div>
                      ) : (
                        <PicturesWall num={1} bucket="mall" listType="picture-card" />
                      )
                    )}
                  </Form.Item>
                </Col>
                <Col sm={5} push={4}>
                  <Form.Item label="法定代表人身份证(正面)">
                    <span style={{ color: 'red' }}>（图片上传格式jpg,jpeg,png）</span>
                    {getFieldDecorator('representative_idcard_front', {
                      initialValue: formData.representative_idcard_front
                        ? [formData.representative_idcard_front]
                        : '',
                      rules: [
                        {
                          required: true,
                          message: '请上传法定代表人身份证(正面)',
                        },
                      ],
                    })(
                      this.state.disabled ? (
                        <div className={styles.seeImg}>
                          <div
                            className={[styles.imgMask, this.state.BigA ? styles.black : ''].join(
                              ' '
                            )}
                          >
                            <div className={styles.preview}>
                              {this.state.BigA && (
                                <Icon type="zoom-in" theme="outlined" className={styles.icon} />
                              )}
                            </div>
                            <img src={formData.persional_id_image} alt="未上传" />
                          </div>
                        </div>
                      ) : (
                        <PicturesWall num={1} bucket="mall" listType="picture-card" />
                      )
                    )}
                  </Form.Item>
                </Col>
                <Col sm={5} push={4}>
                  <Form.Item label="法定代表人身份证(反面)">
                    <span style={{ color: 'red' }}>（图片上传格式jpg,jpeg,png）</span>
                    {getFieldDecorator('representative_idcard_back', {
                      initialValue: formData.representative_idcard_back
                        ? [formData.representative_idcard_back]
                        : '',
                      rules: [
                        {
                          required: true,
                          message: '请上传法定代表人身份证(反面)',
                        },
                      ],
                    })(
                      this.state.disabled ? (
                        <div className={styles.seeImg}>
                          <div
                            className={[styles.imgMask, this.state.BigA ? styles.black : ''].join(
                              ' '
                            )}
                          >
                            <div className={styles.preview}>
                              {this.state.BigA && (
                                <Icon type="zoom-in" theme="outlined" className={styles.icon} />
                              )}
                            </div>
                            <img src={formData.persional_id_image} alt="未上传" />
                          </div>
                        </div>
                      ) : (
                        <PicturesWall num={1} bucket="mall" listType="picture-card" />
                      )
                    )}
                  </Form.Item>
                </Col>
              </Row>
              {this.props.storeApply.store.store_id && (
                <div>
                  <Row>
                    <Col {...col}>
                      <Form.Item {...formItemLayout} label="入驻园区时间">
                        <span className={styles.marginTL}>
                          {formData.entry_date !== '' ? formatTimestamp(formData.entry_date) : ''}
                        </span>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col {...col}>
                      <Form.Item {...formItemLayout} label="审核状态">
                        {formData.application_status === 1 && (
                          <span className={styles.marginTL}>审核中 </span>
                        )}
                        {formData.application_status === 2 && (
                          <span className={styles.marginTL}>通过 </span>
                        )}
                        {formData.application_status === 3 && (
                          <span className={styles.marginTL}>驳回 </span>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                  {formData.audit_status === 3 && (
                    <Row>
                      <Col {...col}>
                        <Form.Item {...formItemLayout} label="驳回缘由">
                          <span className={styles.marginTL}>{formData.audit_suggest}</span>
                        </Form.Item>
                      </Col>
                    </Row>
                  )}
                </div>
              )}
              {!this.props.storeApply.store.store_id && (
                <div>
                  <Row>
                    <Col {...colC} style={{ textAlign: 'center' }}>
                      <Button
                        type="primary"
                        style={{ marginTop: '10px' }}
                        disabled={this.props.storeApply.btnDisabled}
                        onClick={this.handleBtnClick}
                      >
                        提交
                      </Button>
                    </Col>
                  </Row>
                </div>
              )}

              <div>
                {formData.audit_status === 3 && (
                  <Row>
                    <Col {...colC} style={{ textAlign: 'center' }}>
                      <Button
                        type="primary"
                        style={{ marginTop: '10px' }}
                        disabled={this.props.storeApply.btnDisabled}
                        onClick={this.handleBtnClick}
                      >
                        重新提交
                      </Button>
                    </Col>
                  </Row>
                )}
              </div>
            </Form>
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
