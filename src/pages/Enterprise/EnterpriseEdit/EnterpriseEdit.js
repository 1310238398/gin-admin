import React from 'react';
/* 引用组件 */
import { connect } from 'dva';
import { Card, Form, Row, Col, Input, Button, message, Select, DatePicker, Icon } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import moment from 'moment';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import PicturesWall from '../../../components/PicturesWall/PicturesWall';
import Businesslicense from '../../../components/Businesslicense/Businesslicense';
import { formatTimestamp } from '../../../utils/utils';
import styles from './EnterpriseEdit.less';

@Form.create()
@connect(state => ({
  storeApply: state.store,
}))
/* 组件 */
export default class EnterpriseEdit extends React.PureComponent {
  /* 初始数据 */
  state = {
    disabled: false,
  };

  /* 挂载完成 */
  async componentDidMount() {
    await this.props.dispatch({
      type: 'store/getStore',
    });
    // const { store } = this.props.storeApply;
  }

  /* 表单提交 */
  handleBtnClick = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.member_cut = Math.round(Number(values.member_cut));
        [values.portrait][0] = values.portrait;
        if (
          values.persional_id_image1 &&
          values.persional_id_image1.length &&
          (values.persional_id_image2 && values.persional_id_image2.length)
        ) {
          values.persional_id_image = `${values.persional_id_image1[0]},${
            values.persional_id_image2[0]
          }`;
        } else {
          message.error('身份证证件照信息缺失，请完善');
          return;
        }
        [values.license_image][0] = values.license_image;
        values.corporation_type = Math.round(Number(values.corporation_type));
        const formData = { ...values };
        delete values.persional_id_image1;
        delete values.persional_id_image2;
        this.props.dispatch({
          type: 'store/UpdateStore',
          payload: formData,
        });
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
    // const formItemLayoutjy = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 5 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 19 },
    //   },
    // };
    const col = {
      sm: 24,
      md: 12,
    };
    const colC = {
      sm: 24,
      md: 24,
    };
    // const colCjy = {
    //   sm: 24,
    //   md: 24,
    // };
    /* 表单功能 */
    // const { TextArea } = Input;
    const {
      form: { getFieldDecorator },
    } = this.props;
    /* 表单数据 */
    const formData = this.props.storeApply.register;
    return (
      <PageHeaderLayout title="企业信息编辑">
        <div className={styles.APPLYStore}>
          <div className={styles.TOPtitle}>
            <p>企业基本信息</p>
          </div>
          <Card bordered={false}>
            <Form>
              <Row>
                <Col {...col}>
                  <FormItem {...formItemLayout} label="企业名称">
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
                  </FormItem>
                </Col>
                <Col {...col}>
                  <FormItem {...formItemLayout} label="行业类别">
                    {getFieldDecorator('brand', {
                      initialValue: formData.brand ? formData.brand : formData.name,
                      rules: [
                        {
                          required: true,
                          message: '请输入',
                        },
                      ],
                    })(
                      <Input placeholder="请输入" disabled={this.state.disabled} maxLength="50" />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col {...col}>
                  <FormItem {...formItemLayout} label="企业电话">
                    {getFieldDecorator('store_tel', {
                      initialValue: formData.store_tel || '',
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
                  </FormItem>
                </Col>
                <Col {...col}>
                  <FormItem {...formItemLayout} label="企业管理员姓名">
                    {getFieldDecorator('applicant_name', {
                      initialValue: formData.applicant_name || '',
                      rules: [
                        {
                          required: true,
                          message: '请输入企业管理员姓名',
                        },
                      ],
                    })(
                      <Input
                        placeholder="请输入企业管理员姓名"
                        disabled={this.state.disabled}
                        maxLength="100"
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col {...col}>
                  <FormItem {...formItemLayout} label="联系电话">
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
                          message: '请输入联系电话',
                        },
                      ],
                    })(
                      <Input
                        placeholder="请输入联系电话"
                        disabled={this.state.disabled}
                        maxLength="11"
                      />
                    )}
                  </FormItem>
                </Col>
                <Col {...col}>
                  <FormItem {...formItemLayout} label="企业地址">
                    {getFieldDecorator('business_address', {
                      initialValue: formData.business_address || '',
                      rules: [
                        {
                          required: true,
                          message: '请输入企业地址',
                        },
                      ],
                    })(
                      <Input
                        placeholder="请输入企业地址"
                        maxLength="100"
                        disabled={this.state.disabled}
                      />
                    )}
                  </FormItem>
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
                <Col {...col}>
                  <FormItem {...formItemLayout} label="企业法人姓名">
                    {getFieldDecorator('corporation', {
                      initialValue: formData.corporation || '',
                      rules: [
                        {
                          required: true,
                          message: '请输入企业法人姓名',
                        },
                      ],
                    })(
                      <Input
                        placeholder="请输入企业法人姓名"
                        disabled={this.state.disabled}
                        maxLength="100"
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col {...col}>
                  <FormItem {...formItemLayout} label="营业执照类型">
                    {getFieldDecorator('corporation_type', {
                      initialValue: formData.corporation_type
                        ? formData.corporation_type.toString()
                        : '',
                    })(
                      <Select disabled={this.state.disabled}>
                        <Select.Option value="1">个体经营者</Select.Option>
                        <Select.Option value="2">工商企业</Select.Option>
                        <Select.Option value="3">其他</Select.Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                {/* <Col {...col}>
                  <FormItem {...formItemLayout} label="法定代表人">
                    {getFieldDecorator('legal_persion', {
                      initialValue: formData.legal_persion || '',
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
                  </FormItem>
                </Col> */}
              </Row>
              {/* <Row>
                <Col {...colCjy}>
                  <FormItem {...formItemLayoutjy} label="经营范围">
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
                  </FormItem>
                </Col>
              </Row> */}
              <Row>
                <Col {...col}>
                  <FormItem {...formItemLayout} label="营业执照开始有效期">
                    {getFieldDecorator('issue_time', {
                      initialValue:
                        formData && formData.issue_time ? moment(formData.issue_time) : '',
                      rules: [
                        {
                          required: true,
                          message: '请输入营业执照开始有效期',
                        },
                      ],
                    })(
                      <DatePicker
                        format="YYYY-MM-DD"
                        placeholder="请选择"
                        disabled={this.state.disabled}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col {...col}>
                  <FormItem {...formItemLayout} label="营业执照结束有效期">
                    {getFieldDecorator('expiration_time', {
                      initialValue: formData.expiration_time || '',
                      rules: [
                        {
                          required: true,
                          message: '请输入营业执照结束有效期',
                        },
                      ],
                    })(
                      <Businesslicense
                        onValue={formData.expiration_time || ''}
                        ondisabled={this.state.disabled}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col sm={6} push="2">
                  <Form.Item label="企业LOGO">
                    <span style={{ color: 'red' }}>（图片上传格式jpg,jpeg,png）</span>
                    {getFieldDecorator('portrait', {
                      initialValue: formData.portrait ? [formData.portrait] : '',
                      rules: [
                        {
                          required: true,
                          message: '请上传企业LOGO',
                        },
                      ],
                    })(<PicturesWall num={1} bucket="mall" listType="picture-card" />)}
                  </Form.Item>
                </Col>
                <Col sm={4} push={2}>
                  <Form.Item label="营业执照">
                    <span style={{ color: 'red' }}>（图片上传格式jpg,jpeg,png）</span>
                    {getFieldDecorator('license_image', {
                      initialValue: formData.license_image ? [formData.license_image] : '',
                      rules: [
                        {
                          required: true,
                          message: '请上传营业执照',
                        },
                      ],
                    })(<PicturesWall num={1} bucket="mall" listType="picture-card" />)}
                  </Form.Item>
                </Col>
                <Col sm={5} push={4}>
                  <Form.Item label="法定代表人身份证(正面)">
                    <span style={{ color: 'red' }}>（图片上传格式jpg,jpeg,png）</span>
                    {getFieldDecorator('persional_id_image1', {
                      initialValue: formData.persional_id_image
                        ? [formData.persional_id_image.split(',')[0]]
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
                    {getFieldDecorator('persional_id_image2', {
                      initialValue: formData.persional_id_image
                        ? [formData.persional_id_image.split(',')[1]]
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
                      <FormItem {...formItemLayout} label="入驻园区时间">
                        <span className={styles.marginTL}>
                          {formData.created !== 0 ? formatTimestamp(formData.created) : ''}
                        </span>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col {...col}>
                      <FormItem {...formItemLayout} label="审核状态">
                        {formData.application_status === 1 && (
                          <span className={styles.marginTL}>审核中 </span>
                        )}
                        {formData.application_status === 2 && (
                          <span className={styles.marginTL}>通过 </span>
                        )}
                        {formData.application_status === 3 && (
                          <span className={styles.marginTL}>驳回 </span>
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                  {formData.application_status === 3 && (
                    <Row>
                      <Col {...col}>
                        <FormItem {...formItemLayout} label="驳回缘由">
                          <span className={styles.marginTL}>{formData.remark}</span>
                        </FormItem>
                      </Col>
                    </Row>
                  )}
                </div>
              )}
              <Row>
                <Col {...colC} style={{ textAlign: 'center' }}>
                  {formData.application_status !== 1 && (
                    <Button
                      type="primary"
                      style={{ marginTop: '10px' }}
                      disabled={this.props.storeApply.btnDisabled}
                      onClick={this.handleBtnClick}
                    >
                      提交审核
                    </Button>
                  )}
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
