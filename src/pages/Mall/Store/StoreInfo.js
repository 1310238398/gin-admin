import React from 'react';
/* 引用组件 */
import { connect } from 'dva';
import { Form, Row, Col, Radio, Select, Icon, message, Card } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import styles from './Store.less';
import { parseUtcTime } from '../../utils/utils';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@Form.create()
@connect(state => ({
  storeApply: state.store,
}))
/* 组件 */
export default class StoreInfo extends React.PureComponent {
  /* 初始数据 */
  state = {
    disabled: true,
    BigA: false,
    BigB: false,
    BigC: false,
    SelectDisabled: false,
    visible: false,
    imgSrc: '',
  };

  /* 挂载完成 */
  async componentDidMount() {
    await this.props.dispatch({
      type: 'store/getStore',
    });
    const { store } = this.props.storeApply;
    if (store.passed === 0 || !store.store_id) {
      message.error('请先开通店铺');
      this.props.dispatch({
        type: 'store/redirect',
      });
    }
    if (this.props.storeApply.store.store_status === 3) {
      this.setState({
        SelectDisabled: true,
      });
    }
  }

  /* 查看大图 */
  SeeImgBig = (val, name) => {
    if (name === 'BigA') {
      this.setState({
        BigA: val,
      });
    } else if (name === 'BigB') {
      this.setState({
        BigB: val,
      });
    } else {
      this.setState({
        BigC: val,
      });
    }
  };

  /* 开业歇业 */
  selectChang = value => {
    this.props.dispatch({
      type: 'store/storeStatus',
      payload: parseInt(value, 10),
    });
  };

  /* 查看大图 */
  SeeBig = val => {
    this.setState({
      visible: true,
      imgSrc: val,
    });
  };

  /* 对话框关闭 */
  onModalCancelClick = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    /* 表单布局 */
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const col = {
      sm: 24,
      md: 8,
    };
    /* 表单功能 */
    const {
      form: { getFieldDecorator },
    } = this.props;
    /* 表单数据 */
    const formData = this.props.storeApply.store;
    const { Option } = Select;

    return (
      <PageHeaderLayout title="商铺基本信息">
        <Card>
          <Form>
            <Row>
              <Col {...col}>
                <FormItem {...formItemLayout} label="商铺名称">
                  <span className={styles.marginTL}>{formData.name}</span>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <FormItem {...formItemLayout} label="商铺品牌">
                  <span className={styles.marginTL}>
                    {formData.brand ? formData.brand : formData.name}
                  </span>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <FormItem {...formItemLayout} label="商铺编号">
                  <span className={styles.marginTL}>{formData.store_code}</span>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <FormItem {...formItemLayout} label="计费面积（㎡）">
                  <span className={styles.marginTL}>{formData.rent_area}</span>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <FormItem {...formItemLayout} label="业态">
                  <span className={styles.marginTL}>{formData.store_type}</span>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <FormItem {...formItemLayout} label="经营单位名称">
                  <span className={styles.marginTL}>{formData.corporation || '未填写'}</span>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <FormItem {...formItemLayout} label="法定代表人">
                  <span className={styles.marginTL}>{formData.legal_persion || '未填写'}</span>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <FormItem {...formItemLayout} label="经营范围">
                  <span className={styles.marginTL}>{formData.business_scope || '未填写'}</span>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <FormItem {...formItemLayout} label="商铺地址">
                  <span className={styles.marginTL}>{formData.business_address || '未填写'}</span>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <FormItem {...formItemLayout} label="商铺电话">
                  <span className={styles.marginTL}>{formData.store_tel || '未填写'}</span>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <FormItem {...formItemLayout} label="商铺管理员姓名">
                  <span className={styles.marginTL}>{formData.applicant_name || '未填写'}</span>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <FormItem {...formItemLayout} label="联系电话">
                  <span className={styles.marginTL}>{formData.applicant_tel || '未填写'}</span>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <FormItem {...formItemLayout} label="营业执照开始有效期">
                  <span className={styles.marginTL}>{parseUtcTime(formData.issue_time)}</span>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                {formData.expiration_time !== '' && formData.expiration_time !== '长期有效' ? (
                  <FormItem {...formItemLayout} label="营业执照结束有效期">
                    <span className={styles.marginTL}>
                      {parseUtcTime(formData.expiration_time)}
                    </span>
                  </FormItem>
                ) : null}
                {formData.expiration_time !== '' && formData.expiration_time === '长期有效' ? (
                  <FormItem {...formItemLayout} label="营业执照开始有效期">
                    <span className={styles.marginTL}>长期有效</span>
                  </FormItem>
                ) : null}
                {formData.expiration_time === '' ? (
                  <FormItem {...formItemLayout} label="营业执照开始有效期">
                    <span className={styles.marginTL} />
                  </FormItem>
                ) : null}
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <FormItem {...formItemLayout} label="商铺LOGO">
                  <div className={styles.seeImg}>
                    <div
                      className={[styles.imgMask, this.state.BigA ? styles.black : ''].join(' ')}
                      onMouseEnter={() => this.SeeImgBig(true, 'BigA')}
                      onMouseLeave={() => this.SeeImgBig(false, 'BigA')}
                    >
                      <div className={styles.preview}>
                        {this.state.BigA && (
                          <Icon
                            type="zoom-in"
                            theme="outlined"
                            className={styles.icon}
                            onClick={() => this.SeeBig(formData.portrait)}
                          />
                        )}
                      </div>
                      <img src={formData.portrait} alt="未上传商铺LOGO" />
                    </div>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <FormItem {...formItemLayout} label="营业执照">
                  <div className={styles.seeImg}>
                    <div
                      className={[styles.imgMask, this.state.BigB ? styles.black : ''].join(' ')}
                      onMouseEnter={() => this.SeeImgBig(true, 'BigB')}
                      onMouseLeave={() => this.SeeImgBig(false, 'BigB')}
                    >
                      <div className={styles.preview}>
                        {this.state.BigB && (
                          <Icon
                            type="zoom-in"
                            theme="outlined"
                            className={styles.icon}
                            onClick={() => this.SeeBig(formData.license_image)}
                          />
                        )}
                      </div>
                      <img src={formData.license_image} alt="未上传" />
                    </div>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <FormItem {...formItemLayout} label="法定代表人身份证">
                  <div className={styles.seeImg}>
                    <div
                      className={[styles.imgMask, this.state.BigC ? styles.black : ''].join(' ')}
                      onMouseEnter={() => this.SeeImgBig(true, 'BigC')}
                      onMouseLeave={() => this.SeeImgBig(false, 'BigC')}
                    >
                      <div className={styles.preview}>
                        {this.state.BigC && (
                          <Icon
                            type="zoom-in"
                            theme="outlined"
                            className={styles.icon}
                            onClick={() => this.SeeBig(formData.persional_id_image)}
                          />
                        )}
                      </div>
                      <img src={formData.persional_id_image} alt="未上传" />
                    </div>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <FormItem {...formItemLayout} label="平台会员优惠">
                  {getFieldDecorator('member_cut', {
                    initialValue: formData.member_cut ? formData.member_cut.toString() : '2',
                  })(
                    <Radio.Group disabled={this.state.disabled}>
                      <Radio value="1">不参与</Radio>
                      <Radio value="2">参与</Radio>
                    </Radio.Group>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <FormItem {...formItemLayout} label="营业开始时间">
                  <span className={styles.marginTL}>{formData.open_time || '未填写'}</span>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <FormItem {...formItemLayout} label="营业结束时间">
                  <span className={styles.marginTL}>{formData.end_time || '未填写'}</span>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <FormItem {...formItemLayout} label="经营单位类型">
                  <span className={styles.marginTL}>
                    {formData.corporation_type === 1 ? '个体营业者' : '工商企业'}
                  </span>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <FormItem {...formItemLayout} label="商铺状态：">
                  {getFieldDecorator('store_status', {
                    initialValue: formData.store_status,
                  })(
                    <Select
                      style={{ width: '80px' }}
                      disabled={this.state.SelectDisabled}
                      onChange={this.selectChang}
                    >
                      <Option value={1}>开业</Option>
                      <Option value={2}>歇业</Option>
                      {this.state.SelectDisabled && <Option value={3}>挂起</Option>}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        {this.state.visible && (
          <div className={styles.maskWrap} onClick={this.onModalCancelClick}>
            <img src={this.state.imgSrc} className={styles.maskWrapImg} alt="查看大图" />
          </div>
        )}
      </PageHeaderLayout>
    );
  }
}
