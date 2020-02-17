/* eslint-disable react/react-in-jsx-scope */
import React, { PureComponent } from 'react';
import {
  Card,
  Form,
  Row,
  Col,
  Input,
  Radio,
  Checkbox,
  Button,
  Modal,
  Select,
  DatePicker,
  message,
} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import PicturesWall from '@/components/PicturesWall/PicturesWall';
import Businesslicense from '@/components/Businesslicense/Businesslicense';
import { DicSelect } from '@/components/Dictionary';

const RadioGroup = Radio.Group;

@Form.create()
@connect(state => ({
  shopMallStore: state.shopMallStore,
}))
export default class ShopEdit extends PureComponent {
  state = { checked: true };

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type } = this.props;
    this.props.dispatch({
      type: 'shopMallStore/loadForm',
      payload: {
        id,
        type,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'shopMallStore/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  // 保存，暂存
  onBtnDataClick(value) {
    const { callback } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.state.checked) {
          if (
            values.business_license_start &&
            values.business_license_start !== '' &&
            (values.business_license_end && values.business_license_end !== '长期有效')
          ) {
            if (
              moment(values.business_license_start).unix(0) >
              moment(values.business_license_end).unix(0)
            ) {
              message.error('营业执照开始时间不得晚于营业执照结束时间');
              return;
            }
          }
          if (values.business_license_start && values.business_license_start !== '') {
            values.business_license_start = values.business_license_start;
          }

          const formData = { ...values };
          formData.legal_idcard_positive = values.legal_idcard_positive[0];
          formData.legal_idcard_reverse = values.legal_idcard_reverse[0];
          if (values.qualification_certificate && values.qualification_certificate[0]) {
            formData.qualification_certificate = values.qualification_certificate[0];
          }
          if (values.logo && values.logo[0]) {
            formData.logo = values.logo[0];
          }
          formData.business_license_photo = values.business_license_photo[0];
          formData.status = value;
          this.props.dispatch({
            type: 'shopMallStore/submit',
            payload: formData,
          });
          callback();
        } else {
          message.error('请阅读并接受《开店规约》');
        }
      }
    });
  }

  /* 复选框变换 */
  checkedChange = e => {
    this.setState({
      checked: e.target.checked,
    });
  };

  shopRegulation = () => {
    Modal.info({
      title: '开店规约',
      width: '800px',
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

  /**
   * 界面渲染
   */
  render() {
    const {
      shopMallStore: { formData, formTitle, formVisible },
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

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

    const footerJsx = [
      <Button key="close" onClick={this.props.callback}>
        关闭
      </Button>,
      <Button type="primary" onClick={() => this.onBtnDataClick(1)}>
        暂存
      </Button>,
      <Button type="primary" onClick={() => this.onBtnDataClick(2)}>
        提交审核
      </Button>,
    ];

    const resultJsx = (
      <Modal
        visible={formVisible}
        title={formTitle}
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.callback}
        footer={footerJsx}
        width={900}
        bodyStyle={{ paddingRight: 30, paddingLeft: 30 }}
      >
        <Card title="店铺基本信息" bordered={false}>
          <Form layout="vertical">
            <Row gutter={32}>
              {/* <Col {...col}>
                <Form.Item label="是否属于园区内商铺">
                  {getFieldDecorator('is_belong_park', {
                    initialValue: formData.is_belong_park || 1,
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                    ],
                  })(
                    <RadioGroup>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </RadioGroup>
                  )}
                </Form.Item>
              </Col> */}
              {/* <Col {...col}>
                <Form.Item label="商铺号">
                  {getFieldDecorator('code', {
                    initialValue: formData.code || '',
                    rules: [
                      {
                        required: getFieldValue('is_belong_park') === 1,
                        message: '请输入商铺编号',
                      },
                    ],
                  })(<Input placeholder="请输入商铺编号" maxLength="50" />)}
                </Form.Item>
              </Col> */}
            </Row>
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="商铺号">
                  {getFieldDecorator('code', {
                    initialValue: formData.code || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入商铺号',
                      },
                    ],
                  })(<Input placeholder="请输入商铺号" maxLength="50" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="商铺名称">
                  {getFieldDecorator('name', {
                    initialValue: formData.name || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入商铺名称',
                      },
                    ],
                  })(<Input placeholder="请输入商铺名称" maxLength="50" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="商铺品牌">
                  {getFieldDecorator('brand', {
                    initialValue: formData.brand !== '' ? formData.brand : formData.name,
                    rules: [
                      {
                        required: true,
                        message: '请输入商铺品牌',
                      },
                    ],
                  })(<Input placeholder="请输入商铺品牌" maxLength="50" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="商铺电话">
                  {getFieldDecorator('phone', {
                    initialValue: formData.phone || '',
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请输入商铺电话',
                      },
                    ],
                  })(<Input placeholder="请输入商铺电话" maxLength="20" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="商铺联系人">
                  {getFieldDecorator('contacter', {
                    initialValue: formData.contacter || '',
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(<Input placeholder="请输入" maxLength="11" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              {/* <Col {...col}>
                <Form.Item label="联系人电话">
                  {getFieldDecorator('admin_phone', {
                    initialValue: formData.admin_phone || '',
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
              </Col> */}
              <Col {...col}>
                <Form.Item label="商铺地址">
                  {getFieldDecorator('address', {
                    initialValue: formData.address || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入商铺地址',
                      },
                    ],
                  })(<Input placeholder="请输入商铺地址" maxLength="100" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="商铺分类">
                  {getFieldDecorator('category', {
                    initialValue: formData.category || '',
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                    ],
                  })(
                    <DicSelect
                      vmode="string"
                      pcode="mall$#storeclass"
                      selectProps={{ placeholder: '请选择' }}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="经营单位基本信息" bordered={false}>
          <Form layout="vertical">
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="统一社会信用代码">
                  {getFieldDecorator('business_license', {
                    initialValue: formData.business_license || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(<Input placeholder="请输入" maxLength="18" />)}
                </Form.Item>
              </Col>
              {/* <Col {...col}>
                <Form.Item label="经营单位名称">
                  {getFieldDecorator('business_name', {
                    initialValue: formData.business_name || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入经营单位名称',
                      },
                    ],
                  })(<Input placeholder="请输入经营单位名称" maxLength="100" />)}
                </Form.Item>
              </Col> */}
            </Row>
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="经营单位类型">
                  {getFieldDecorator('business_unit_type', {
                    initialValue: formData.business_unit_type || 1,
                    rules: [
                      {
                        required: false,
                        message: '请选择',
                      },
                    ],
                  })(
                    <Select>
                      <Select.Option value={1}>工商企业</Select.Option>
                      <Select.Option value={2}>个体经营者</Select.Option>
                      <Select.Option value={3}>其他</Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="法定代表人">
                  {getFieldDecorator('legal_name', {
                    initialValue: formData.legal_name || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入法定代表人',
                      },
                    ],
                  })(<Input placeholder="请输入法定代表人" maxLength="20" />)}
                </Form.Item>
              </Col>
            </Row>
            {/* <Row gutter={32}>
              <Col {...colCjy}>
                <Form.Item label="经营范围">
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
            </Row> */}
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="营业执照开始有效期">
                  {getFieldDecorator('business_license_start', {
                    initialValue: moment(formData.business_license_start) || '',
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
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>

              <Col {...col}>
                <Form.Item label="营业执照结束有效期">
                  {getFieldDecorator('business_license_end', {
                    initialValue: formData.business_license_end || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入营业执照结束有效期',
                      },
                    ],
                  })(<Businesslicense onValue={formData.business_license_end || ''} />)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="商铺LOGO">
                  <span style={{ color: 'red' }}>（图片上传格式jpg,jpeg,png）</span>
                  {getFieldDecorator('logo', {
                    initialValue: formData.logo ? [formData.logo] : '',
                    rules: [
                      {
                        required: false,
                        message: '请上传商铺LOGO',
                      },
                    ],
                  })(<PicturesWall num={1} bucket="mall" listType="picture-card" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="营业执照">
                  <span style={{ color: 'red' }}>（图片上传格式jpg,jpeg,png）</span>
                  {getFieldDecorator('business_license_photo', {
                    initialValue: formData.business_license_photo
                      ? [formData.business_license_photo]
                      : '',
                    rules: [
                      {
                        required: true,
                        message: '请上传营业执照',
                      },
                    ],
                  })(<PicturesWall num={1} bucket="mall" listType="picture-card" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="法定代表人身份证(正面)">
                  <span style={{ color: 'red' }}>（图片上传格式jpg,jpeg,png）</span>
                  {getFieldDecorator('legal_idcard_positive', {
                    initialValue: formData.legal_idcard_positive
                      ? [formData.legal_idcard_positive]
                      : '',
                    rules: [
                      {
                        required: true,
                        message: '请上传法定代表人身份证(正面)',
                      },
                    ],
                  })(<PicturesWall num={1} bucket="mall" listType="picture-card" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="法定代表人身份证(反面)">
                  <span style={{ color: 'red' }}>（图片上传格式jpg,jpeg,png）</span>
                  {getFieldDecorator('legal_idcard_reverse', {
                    initialValue: formData.legal_idcard_reverse
                      ? [formData.legal_idcard_reverse]
                      : '',
                    rules: [
                      {
                        required: true,
                        message: '请上传法定代表人身份证(反面)',
                      },
                    ],
                  })(<PicturesWall num={1} bucket="mall" listType="picture-card" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="行业资格证书">
                  <span style={{ color: 'red' }}>（图片上传格式jpg,jpeg,png）</span>
                  {getFieldDecorator('qualification_certificate', {
                    initialValue: formData.qualification_certificate
                      ? [formData.qualification_certificate]
                      : '',
                    rules: [
                      {
                        required: false,
                        message: '请上传行业资格证书',
                      },
                    ],
                  })(<PicturesWall num={1} bucket="mall" listType="picture-card" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Row gutter={32}>
            <Col {...colC} style={{ textAlign: 'center' }}>
              <Checkbox checked={this.state.checked} onChange={this.checkedChange}>
                已阅读并接受
              </Checkbox>
              <span onClick={this.shopRegulation} style={{ color: '#3f88bf', marginLeft: '-17px' }}>
                《开店规约》
              </span>
            </Col>
          </Row>
        </Card>
      </Modal>
    );
    return resultJsx;
  }
}
