import React from 'react';
/* 引用组件 */
import { connect } from 'dva';
import {
  Card,
  Form,
  Row,
  Col,
  Input,
  Radio,
  Checkbox,
  Button,
  message,
  Modal,
  Icon,
  TimePicker,
  Select,
  DatePicker,
} from 'antd';
import moment from 'moment';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import PicturesWall from '../../../components/PicturesWall/PicturesWall';
import Businesslicense from '../../../components/Businesslicense/Businesslicense';
import { formatTimestamp } from '../../../utils/utils';

/* 样式 */
import styles from './Store.less';

@Form.create()
@connect(state => ({
  storeApply: state.store,
}))
/* 组件 */
export default class StoreApplySever extends React.PureComponent {
  /* 初始数据 */
  state = {
    checked: true,
    disabled: false,
  };

  /* 挂载完成 */
  async componentDidMount() {
    await this.props.dispatch({
      type: 'store/getStore',
    });
    const { register } = this.props.storeApply;
    /* 状态 */
    if (register.application_status === 1) {
      this.setState({
        disabled: true,
      });
    }
  }

  /* 复选框变换 */
  checkedChange = e => {
    this.setState({
      checked: e.target.checked,
    });
  };

  /* 表单提交 */
  handleBtnClick = () => {
    const format = 'HH:mm';
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.state.checked) {
          values.member_cut = Math.round(Number(values.member_cut));
          values.corporation_type = Math.round(Number(values.corporation_type));
          // [values.portrait] = values.portrait;
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
          }
          // values.persional_id_image = values.persional_id_image[0];
          //[values.license_image] = values.license_image;
          // if (
          //   values.close_time &&
          //   values.close_time !== '' &&
          //   (values.open_time && values.open_time !== '')
          // ) {
          //   const a = values.close_time.format(format);
          //   const b = values.open_time.format(format);
          //   console.log(a, b);
          //   a.substring(0, 2);
          //   b.substring(0, 2);
          //   if (a < b) {
          //     message.error('营业开始时间不能晚于营业结束时间');
          //     return;
          //   }
          // }
          if (values.open_time && values.open_time !== '') {
            values.open_time = values.open_time.format(format);
          } else {
            values.open_time = '';
          }
          if (values.close_time && values.close_time !== '') {
            values.close_time = values.close_time.format(format);
          } else {
            values.close_time = '';
          }
          if (
            values.issue_time &&
            values.issue_time !== '' &&
            (values.expiration_time && values.expiration_time !== '长期有效')
          ) {
            if (moment(values.issue_time).unix(0) > moment(values.expiration_time).unix(0)) {
              message.error('营业执照开始时间不得晚于营业执照结束时间');
              return;
            }
          }
          if (values.issue_time && values.issue_time !== '') {
            values.issue_time = values.issue_time.format('YYYY-MM-DD');
          }
         
          const formData = { ...values };
          formData.portrait = values.portrait[0];
          formData.license_image = values.license_image[0];
          this.props.dispatch({
            type: 'store/applyStore',
            payload: formData,
          });
        } else {
          message.error('请阅读并接受《开店规约》');
        }
      }
    });
  };

  shopRegulation = () => {
    Modal.info({
      title: '开店规约',
      width: '600px',
      content: (
        <div>
          <p>提示使用本公司服务所须遵守的条款和条件。</p>
          <p>1、用户资格</p>
          <p>
            本公司的服务仅向适用法律下能够签订具有法律约束力的合同的个人提供并仅由其使用。在不限制前述规定的前提下，本公司的服务不向18周岁以下或被临时或无限期中止的用户提供。如您不合资格，请勿使用本公司的服务。此外，您的帐户（包括信用评价）和用户名不得向其他方转让或出售。另外，本公司保留根据其意愿中止或终止您的帐户的权利。
          </p>
          <p>2、您的资料（包括但不限于所添加的任何商品）不得：</p>
          <p>* 具有欺诈性、虚假、不准确或具误导性；</p>
          <p>* 侵犯任何第三方著作权、专利权、商标权、商业秘密或其他专有权利或发表权或隐私权；</p>
          <p>
            *
            违反任何适用的法律或法规（包括但不限于有关出口管制、消费者保护、不正当竞争、刑法、反歧视或贸易惯例/公平贸易法律的法律或法规）；
          </p>
          <p>* 有侮辱或者诽谤他人，侵害他人合法权益的内容；</p>
          <p>* 有淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的内容；</p>
          <p>
            *
            包含可能破坏、改变、删除、不利影响、秘密截取、未经授权而接触或征用任何系统、数据或个人资料的任何病毒、特洛依木马、蠕虫、定时炸弹、删除蝇、复活节彩
            蛋、间谍软件或其他电脑程序；
          </p>
          <p>3、违约</p>
          <p>
            如发生以下情形，本公司可能限制您的活动、立即删除您的商品、向本公司社区发出有关您的行为的警告、发出警告通知、暂时中止、无限期地中止或终止您的用户资格及拒绝向您提供服务：
          </p>
          <p>(a)您违反本协议或纳入本协议的文件；</p>
          <p>(b)本公司无法核证或验证您向本公司提供的任何资料；</p>
          <p>(c)本公司相信您的行为可能对您、本公司用户或本公司造成损失或法律责任。</p>
          <p>4、责任限制</p>
          <p>
            本公司、本公司的关联公司和相关实体或本公司的供应商在任何情况下均不就因本公司的网站、本公司的服务或本协议而产生或与之有关的利润损失或任何特别、间接或后果性的损害（无论以何种方式产生，包括疏忽）承担任何责任。您同意您就您自身行为之合法性单独承担责任。您同意，本公司和本公司的所有关联公司和相关实体对本公司用户的行为的合法性及产生的任何结果不承担责任。
          </p>
          <p>5、无代理关系</p>
          <p>
            用户和本公司是独立的合同方，本协议无意建立也没有创立任何代理、合伙、合营、雇员与雇主或特许经营关系。本公司也不对任何用户及其网上交易行为做出明示或默许的推荐、承诺或担保。
          </p>
          <p>6、一般规定</p>
          <p>
            本协议在所有方面均受中华人民共和国法律管辖。本协议的规定是可分割的，如本协议任何规定被裁定为无效或不可执行，该规定可被删除而其余条款应予以执行。
          </p>
        </div>
      ),
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
      <PageHeaderLayout title="开店申请">
        <div className={styles.APPLYStore}>
          <div className={styles.TOPtitle}>
            <p>店铺基本信息</p>
          </div>
          <Card bordered={false}>
            <Form>
              <Row>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="商铺编号">
                    {getFieldDecorator('store_code', {
                      initialValue: formData.store_code || '',
                      rules: [
                        {
                          required: true,
                          message: '请输入商铺编号',
                        },
                      ],
                    })(
                      <Input
                        placeholder="请输入商铺编号"
                        disabled={this.state.disabled}
                        maxLength="50"
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="商铺名称">
                    {getFieldDecorator('name', {
                      initialValue: formData.name || '',
                      rules: [
                        {
                          required: true,
                          message: '请输入商铺名称',
                        },
                      ],
                    })(
                      <Input
                        placeholder="请输入商铺名称"
                        disabled={this.state.disabled}
                        maxLength="50"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="商铺品牌">
                    {getFieldDecorator('brand', {
                      initialValue: formData.brand !== '' ? formData.brand : formData.name,
                      rules: [
                        {
                          required: false,
                          message: '请输入商铺品牌',
                        },
                      ],
                    })(
                      <Input
                        placeholder="请输入商铺品牌"
                        disabled={this.state.disabled}
                        maxLength="50"
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="商铺电话">
                    {getFieldDecorator('store_tel', {
                      initialValue: formData.store_tel || '',
                      rules: [
                        {
                          required: true,
                          whitespace: true,
                          message: '请输入商铺电话',
                        },
                      ],
                    })(
                      <Input
                        placeholder="请输入商铺电话"
                        disabled={this.state.disabled}
                        maxLength="20"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="商铺管理员姓名">
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
                  <Form.Item {...formItemLayout} label="商铺地址">
                    {getFieldDecorator('business_address', {
                      initialValue: formData.business_address || '',
                      rules: [
                        {
                          required: true,
                          message: '请输入商铺地址',
                        },
                      ],
                    })(
                      <Input
                        placeholder="请输入商铺地址"
                        disabled={this.state.disabled}
                        maxLength="100"
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="营业开始时间">
                    {getFieldDecorator('open_time', {
                      initialValue:
                        formData.open_time && formData.open_time !== '0:0'
                          ? moment(formData.open_time, 'HH:mm')
                          : moment('08:00', 'HH:mm'),
                      rules: [
                        {
                          required: false,
                          message: '请选择',
                        },
                      ],
                    })(<TimePicker format="HH:mm" disabled={this.state.disabled} />)}
                  </Form.Item>
                </Col>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="营业结束时间">
                    {getFieldDecorator('close_time', {
                      initialValue:
                        formData.close_time && formData.close_time !== '0:0'
                          ? moment(formData.close_time, 'HH:mm')
                          : moment('21:00', 'HH:mm'),
                      rules: [
                        {
                          required: false,
                          message: '请选择',
                        },
                      ],
                    })(
                      <TimePicker
                        defaultValue={moment('21:00', 'HH:mm')}
                        format="HH:mm"
                        disabled={this.state.disabled}
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
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="经营单位名称">
                    {getFieldDecorator('corporation', {
                      initialValue: formData.corporation || '',
                      rules: [
                        {
                          required: true,
                          message: '请输入经营单位名称',
                        },
                      ],
                    })(
                      <Input
                        placeholder="请输入经营单位名称"
                        disabled={this.state.disabled}
                        maxLength="100"
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="经营单位类型">
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
                  </Form.Item>
                </Col>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="法定代表人">
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
                    {getFieldDecorator('issue_time', {
                      initialValue: moment(formData.issue_time) || '',
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
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col sm={6} push="2">
                  <Form.Item label="商铺LOGO">
                    <span style={{ color: 'red' }}>（图片上传格式jpg,jpeg,png）</span>
                    {getFieldDecorator('portrait', {
                      initialValue: formData.portrait ? [formData.portrait] : '',
                      rules: [
                        {
                          required: true,
                          message: '请上传商铺LOGO',
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
                    {getFieldDecorator('license_image', {
                      initialValue: formData.license_image ? [formData.license_image] : '',
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
              <Row>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="平台会员优惠">
                    {getFieldDecorator('member_cut', {
                      initialValue: formData.member_cut ? formData.member_cut.toString() : '1',
                    })(
                      <Radio.Group disabled={this.state.disabled}>
                        <Radio value="1" defaultChecked={false} disabled>
                          不参与
                        </Radio>
                        <Radio value="2" disabled>
                          参与
                        </Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              {this.props.storeApply.store.store_id && (
                <div>
                  <Row>
                    <Col {...col}>
                      <Form.Item {...formItemLayout} label="提交日期">
                        <span className={styles.marginTL}>
                          {formData.created !== '' ? formatTimestamp(formData.created) : ''}
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
                  {formData.application_status === 3 && (
                    <Row>
                      <Col {...col}>
                        <Form.Item {...formItemLayout} label="驳回缘由">
                          <span className={styles.marginTL}>{formData.remark}</span>
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
                      <Checkbox checked={this.state.checked} onChange={this.checkedChange}>
                        已阅读并接受
                      </Checkbox>
                      <span
                        onClick={this.shopRegulation}
                        style={{ color: '#3f88bf', marginLeft: '-17px' }}
                      >
                        《开店规约》
                      </span>
                    </Col>
                  </Row>
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
                <Row>
                  <Col {...colC} style={{ textAlign: 'center' }}>
                    <Checkbox checked={this.state.checked} onChange={this.checkedChange}>
                      已阅读并接受
                    </Checkbox>
                    <span
                      onClick={this.shopRegulation}
                      style={{ color: '#3f88bf', marginLeft: '-17px' }}
                    >
                      《开店规约》
                    </span>
                  </Col>
                </Row>
                {formData.application_status === 3 && (
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
