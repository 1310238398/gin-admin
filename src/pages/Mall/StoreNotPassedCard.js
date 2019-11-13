import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Modal, Row, Col, Divider } from 'antd';

import PicturesWall from '../../components/PicturesWall/PicturesWall';
//  import { parseTimestamp } from '../../utils/utils';

@connect(state => ({
  storeManage: state.storeManage,
}))
@Form.create()
export default class StoreNotPassedCard extends PureComponent {
  componentDidMount() {
    const { id, type, callback } = this.props;
    this.props.dispatch({
      type: 'storeManage/notPassedCardLoadForm',
      payload: {
        id,
        type,
        callback,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'storeManage/changeFormVisible',
      payload: false,
    });
    //  TODO:此处的callback()函数很重要。使调用此组件的组件刷新渲染。
    this.props.callback();
  };

  onModalOKClick = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        const { applicationStatus } = formData;
        const { id } = this.props;
        this.props.dispatch({
          type: 'storeManage/submitConfirm',
          payload: {
            store_id: id,
            application_status: applicationStatus,
          },
        });
      }
    });
  };

  render() {
    const {
      storeManage: { formTitle, formVisible, detailData, submitting, reasonData },
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const formItemLayout2 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    return (
      <Modal
        title={formTitle}
        width={800}
        visible={formVisible}
        maskClosable={false}
        confirmLoading={submitting}
        destroyOnClose
        okText="确定"
        cancelText="关闭"
        onOk={this.onModalCancelClick}
        onCancel={this.onModalCancelClick}
        style={{ top: 20 }}
        bodyStyle={{ height: 550, overflowY: 'scroll' }}
      >
        <Form>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="审核意见">
                {reasonData.map(item => {
                  if (detailData.application_status === item.record_id) {
                    return <Input disabled="true" placeholder={item.name} />;
                  }
                  return null;
                })}
              </Form.Item>
            </Col>
          </Row>
          <Divider>申请详情</Divider>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="商铺名称">
                {getFieldDecorator('name', {
                  initialValue: detailData.name ? detailData.name : '暂无',
                })(<Input disabled="true" placeholder="商铺名称" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="企业名称">
                {getFieldDecorator('category', {
                  initialValue: detailData.corporation ? detailData.corporation : '暂无',
                })(<Input disabled="true" placeholder="企业名称" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="分区区号">
                {getFieldDecorator('contacter', {
                  initialValue: detailData.zcode ? detailData.zcode : '暂无',
                })(<Input disabled="true" placeholder="分区区号？？" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="申请人">
                {getFieldDecorator('contact_tel', {
                  initialValue: detailData.applicant_id ? detailData.applicant_id : '暂无',
                })(<Input disabled="true" placeholder="申请人" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="申请人电话">
                {getFieldDecorator('address', {
                  initialValue: detailData.ApplicantTel ? detailData.ApplicantTel : '暂无',
                })(<Input disabled="true" placeholder="申请人电话" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="法人代表">
                {getFieldDecorator('address', {
                  initialValue: detailData.legal_persion ? detailData.legal_persion : '暂无',
                })(<Input disabled="true" placeholder="法人代表" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="法人身份证号">
                {getFieldDecorator('address', {
                  initialValue: detailData.persional_id_num ? detailData.persional_id_num : '暂无',
                })(<Input disabled="true" placeholder="法人身份证号" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="经营地址">
                {getFieldDecorator('address', {
                  initialValue: detailData.business_address ? detailData.business_address : '暂无',
                })(<Input disabled="true" placeholder="经营地址" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="证件有效期">
                {getFieldDecorator('address', {
                  initialValue: detailData.expiration_time ? detailData.expiration_time : '暂无',
                })(<Input disabled="true" placeholder="证件有效期" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="创建时间">
                {getFieldDecorator('address', {
                  initialValue: detailData.created ? detailData.created : '暂无',
                })(<Input disabled="true" placeholder="创建时间" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="申请人ID">
                {getFieldDecorator('address', {
                  initialValue: detailData.applicant_id ? detailData.applicant_id : '暂无',
                })(<Input disabled="true" placeholder="申请人ID" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="商铺ID">
                {getFieldDecorator('store_id', {
                  initialValue: detailData.store_id ? detailData.store_id : '暂无',
                })(<Input disabled="true" placeholder="商铺ID" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={12} sm={24}>
              <Form.Item {...formItemLayout2} label="营业执照">
                {getFieldDecorator('business_license', {
                  initialValue: detailData.business_license ? [detailData.business_license] : [],
                  rules: [
                    {
                      required: false,
                      message: '请选择营业执照',
                    },
                  ],
                })(<PicturesWall num={1} bucket="oper" listType="picture-card" />)}
              </Form.Item>
            </Col>
            <Col md={12} sm={24}>
              <Form.Item {...formItemLayout2} label="商铺头像">
                {getFieldDecorator('logo', {
                  initialValue: detailData.file_id ? [detailData.file_id] : [],
                  rules: [
                    {
                      required: false,
                      message: '请选择商铺头像',
                    },
                  ],
                })(<PicturesWall num={1} bucket="oper" listType="picture-card" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="经营范围">
                {getFieldDecorator('introduction', {
                  initialValue: detailData.business_scope ? detailData.business_scope : '暂无',
                })(<Input.TextArea disabled="true" rows={4} placeholder="经营范围" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="自动接单">
                {getFieldDecorator('address', {
                  initialValue: detailData.auto_check ? detailData.auto_check : '暂无',
                })(<Input disabled="true" placeholder="自动接单" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="商铺电话">
                {getFieldDecorator('address', {
                  initialValue: detailData.store_tel ? detailData.store_tel : '暂无',
                })(<Input disabled="true" placeholder="商铺电话" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="营业时间">
                {getFieldDecorator('address', {
                  initialValue: detailData.business_hours ? detailData.business_hours : '暂无',
                })(<Input disabled="true" placeholder="营业时间" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="商铺状态">
                {getFieldDecorator('address', {
                  initialValue: detailData.store_status ? detailData.store_status : '暂无',
                })(<Input disabled="true" placeholder="商铺状态" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="会员优惠">
                {getFieldDecorator('address', {
                  initialValue: detailData.member ? detailData.member : '暂无',
                })(<Input disabled="true" placeholder="会员优惠" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="收款方式">
                {getFieldDecorator('address', {
                  initialValue: detailData.gathering ? detailData.gathering : '暂无',
                })(<Input disabled="true" placeholder="收款方式" />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
