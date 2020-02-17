/* eslint-disable react/react-in-jsx-scope */
import React, { PureComponent } from 'react';
import { Card, Form, Row, Col, Input, Button, Modal, InputNumber, DatePicker } from 'antd';
import { connect } from 'dva';
import AdvertiserSelect from '@/components/AdvertiserSelect/AdvertiserSelect';
import AdvertiserPositionSelect from '@/components/AdvertiserPosition/AdvertiserPosition';
import AdvertisCreateGroupSelect from '@/components/AdvertisCreateGroup/AdvertisCreateGroup';
import AdvertiserCreateSelect from '@/components/AdvertisCreate/AdvertisCreate';
import moment from 'moment';

@Form.create()
@connect(state => ({
  advertisPromotion: state.advertisPromotion,
}))
export default class AdvertisPromotionEdit extends PureComponent {
  state = {};

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type } = this.props;
    this.props.dispatch({
      type: 'advertisPromotion/loadForm',
      payload: {
        id,
        type,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'advertisPromotion/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  // 保存，暂存
  onBtnDataClick(value) {
    const { callback } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        formData.status = value;

        this.props.dispatch({
          type: 'advertisPromotion/submit',
          payload: formData,
        });
        callback();
      }
    });
  }

  changeForm = (name, value) => {
    const {
      advertisPromotion: { formData },
    } = this.props;

    this.props.dispatch({
      type: 'advertisPromotion/saveFormData',
      payload: { ...formData, [name]: value },
    });
  };

  /**
   * 界面渲染
   */
  render() {
    const {
      advertisPromotion: { formData, formTitle, formVisible },
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    console.log(formVisible);
    const col = {
      sm: 24,
      md: 8,
    };
    const footerJsx = [
      <Button key="close" onClick={this.props.callback}>
        关闭
      </Button>,
      <Button type="primary" onClick={() => this.onBtnDataClick(1)}>
        暂存
      </Button>,
      <Button type="primary" onClick={() => this.onBtnDataClick(2)}>
        提交
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
        width={1000}
        style={{ top: 20 }}
        bodyStyle={{
          paddingRight: 30,
          paddingLeft: 30,
          height: 550,
          overflowY: 'scroll',
          paddingBottom: 0,
          paddingTop: 0,
        }}
      >
        <Card title="推广基本信息" bordered={false}>
          <Form layout="vertical">
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="广告位">
                  {getFieldDecorator('advertising_id', {
                    initialValue: formData.advertising_id || '',
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请输入',
                      },
                    ],
                  })(<AdvertiserPositionSelect />)}
                </Form.Item>
              </Col>

              <Col {...col}>
                <Form.Item label="广告主">
                  {getFieldDecorator('advertiser_id', {
                    initialValue: formData.advertiser_id || '',
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                    ],
                  })(<AdvertiserSelect />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="创意组">
                  {getFieldDecorator('creative_group_id', {
                    initialValue: formData.creative_group_id || '',
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                    ],
                  })(<AdvertisCreateGroupSelect parentID={getFieldValue('advertiser_id')} />)}
                </Form.Item>
              </Col>

              <Col {...col}>
                <Form.Item label="创意">
                  {getFieldDecorator('creative_id', {
                    initialValue: formData.creative_id || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(<AdvertiserCreateSelect parentID={getFieldValue('creative_group_id')} />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="推广名称">
                  {getFieldDecorator('name', {
                    initialValue: formData.name || '',
                    rules: [
                      {
                        required: true,
                        message: '请填写',
                      },
                    ],
                  })(<Input placeholder="请输入" maxLength="100" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="推广开始时间">
                  {getFieldDecorator('start_time', {
                    initialValue: formData.start_time ? moment(formData.end_time) : '',
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(<DatePicker showTime placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="推广结束时间">
                  {getFieldDecorator('end_time', {
                    initialValue: formData.end_time ? moment(formData.end_time) : '',
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(<DatePicker showTime placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="最大曝光次数上限">
                  {getFieldDecorator('max_cpm', {
                    initialValue: formData.max_cpm || 0,
                    rules: [
                      {
                        required: false,
                        message: '请输入',
                      },
                    ],
                  })(
                    <InputNumber
                      placeholder="请输入"
                      min={0}
                      max={9999999}
                      step={1}
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="最大点击次数上限">
                  {getFieldDecorator('max_cpc', {
                    initialValue: formData.max_cpc || 0,
                    rules: [
                      {
                        required: false,
                        message: '请输入',
                      },
                    ],
                  })(
                    <InputNumber
                      placeholder="请输入"
                      min={0}
                      max={9999999}
                      step={1}
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Modal>
    );
    return resultJsx;
  }
}
