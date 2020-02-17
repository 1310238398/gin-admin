import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Avatar, Alert, TimePicker, Row, Col, Form, Radio, Button, message } from 'antd';
import moment from 'moment';
import { parseUtcTime } from '@/utils/utils';
import DescriptionList from '../../../../components/DescriptionList';
import styles from './storeCurent.less';

const RadioGroup = Radio.Group;
const { Description } = DescriptionList;
@Form.create()
@connect(state => ({
  shopMallStore: state.shopMallStore,
}))
class StoreCurrentInfo extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'shopMallStore/StoreCurrentInfo',
    });
  }

  switchTypeBus = val => {
    switch (val) {
      case 1:
        return '工商企业';
      case 2:
        return '个体经营者';
      case 3:
        return '其他';
      default:
        return '--';
    }
  };

  handleBtnClick = () => {
    const {
      shopMallStore: { currentStoreInfo },
    } = this.props;
    const format = 'HH:mm';
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
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
        formData.business_hours = values.open_time - values.close_time;
        const formData = { ...currentStoreInfo, ...values };
        this.props.dispatch({
          type: 'shopMallStore/submit',
          payload: formData,
        });
      }
    });
  };

  render() {
    const {
      shopMallStore: { currentStoreInfo },
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;

    const col = {
      sm: 24,
      md: 12,
    };
    const colC = {
      sm: 24,
      md: 24,
    };
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
    return (
      <div className={styles.main}>
        {currentStoreInfo.status === 4 ? (
          <Alert
            message={`您的店铺未通过审核，驳回原因：${
              currentStoreInfo.audit_reason
            },请您进行修改信息，重新提交申请。`}
            type="error"
          />
        ) : (
          ''
        )}
        <Card title="店铺基本信息" bordered={false}>
          <div className={styles.topInfo}>
            <div className={styles.topInfoLeft}>
              <Avatar
                src={currentStoreInfo.logo}
                shape="circle"
                size={100}
                style={{ marginLeft: 49 }}
              />
            </div>
            <div className={styles.topInfoCenter}>
              <span>{currentStoreInfo.name}</span>
              <span>
                商铺联系人：
                {currentStoreInfo.contacter}
              </span>
              <span>
                商铺电话：
                {currentStoreInfo.phone}
              </span>
            </div>
            {/* <div className={styles.topInfoRight}>
              {store.store_status !== 3 && (
                <Toggle
                  value={storeToggleValue}
                  left="开业"
                  right="歇业"
                  onClick={this.handleToggleClick}
                />
              )}
              {store.store_status === 3 && <div className={styles.warnLabel}>挂起</div>}
            </div> */}
          </div>
          <div className={styles.form} style={{ marginTop: 25 }}>
            <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="商铺编号">{currentStoreInfo.code}</Description>
              <Description term="商铺名称">{currentStoreInfo.name}</Description>
            </DescriptionList>
            <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="商铺品牌">
                {currentStoreInfo.brand !== '' ? currentStoreInfo.brand : currentStoreInfo.name}
              </Description>
              <Description term="商铺地址">{currentStoreInfo.address}</Description>
            </DescriptionList>
          </div>
        </Card>
        <Card title="经营单位基本信息" bordered={false}>
          <div className={styles.form}>
            <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="统一社会信用代码">{currentStoreInfo.business_license}</Description>
              <Description term="经营单位类型">
                {this.switchTypeBus(currentStoreInfo.business_unit_type)}
              </Description>
            </DescriptionList>
            <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="法定代表人">{currentStoreInfo.legal_name}</Description>
              <Description term="营业执照有效期">
                {currentStoreInfo.business_license_start &&
                currentStoreInfo.business_license_start !== ''
                  ? parseUtcTime(currentStoreInfo.business_license_start, 'YYYY-MM-DD')
                  : ''}
                &nbsp;至&nbsp;
                {currentStoreInfo.business_license_end}
              </Description>
            </DescriptionList>
            <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="法定代表人信息">
                <div style={{ display: 'flex' }}>
                  <div
                    className={styles.formImage}
                    style={{ width: 248, height: 160, marginLeft: 20 }}
                  >
                    <img src={currentStoreInfo.legal_idcard_positive} alt="身份证正面" />
                  </div>
                  <div
                    className={styles.formImage}
                    style={{ width: 248, height: 160, marginLeft: 20 }}
                  >
                    <img src={currentStoreInfo.legal_idcard_reverse} alt="身份证反面" />
                  </div>
                  )
                </div>
              </Description>
            </DescriptionList>
            <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="营业执照">
                <div
                  className={styles.formImage}
                  style={{ width: 147, height: 147, marginLeft: 20 }}
                >
                  <img src={currentStoreInfo.business_license_photo} alt="营业执照" />
                </div>
              </Description>
            </DescriptionList>
          </div>
        </Card>
        {currentStoreInfo.status === 3 ? (
          <Card title="营业信息" bordered={false}>
            <div className={styles.form}>
              <Form>
                <Row>
                  <Col {...col}>
                    <Form.Item {...formItemLayout} label="营业开始时间">
                      {getFieldDecorator('open_time', {
                        initialValue: currentStoreInfo.business_hours
                          ? moment(currentStoreInfo.business_hours.split('-')[0], 'HH:mm')
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
                        initialValue: currentStoreInfo.business_hours
                          ? moment(currentStoreInfo.business_hours.split('-')[1], 'HH:mm')
                          : moment('21:00', 'HH:mm'),
                        rules: [
                          {
                            required: false,
                            message: '请选择',
                          },
                        ],
                      })(<TimePicker defaultValue={moment('21:00', 'HH:mm')} format="HH:mm" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col {...col}>
                    <Form.Item {...formItemLayout} label="营业状态">
                      {getFieldDecorator('business_status', {
                        initialValue: currentStoreInfo.business_status,
                        rules: [
                          {
                            required: true,
                            message: '请选择',
                          },
                        ],
                      })(
                        <RadioGroup name="radiogroup">
                          <Radio value={1}>营业</Radio>
                          <Radio value={2}>歇业</Radio>
                        </RadioGroup>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col {...colC} style={{ textAlign: 'center' }}>
                    <Button
                      type="primary"
                      style={{ marginTop: '10px' }}
                      onClick={this.handleBtnClick}
                    >
                      重新提交
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Card>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default StoreCurrentInfo;
