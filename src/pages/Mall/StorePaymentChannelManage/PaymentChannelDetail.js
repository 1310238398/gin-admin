import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Button, Row, Col, Card, Tag, Input, Form } from 'antd';
import styles from './PaymentChannelDetail.less';
import { DicShow } from '@/components/Dictionary';

@connect(state => ({
  paymentChannelManage: state.paymentChannelManage,
}))
export default class PaymentChannelDetail extends PureComponent {
  onClose = () => {
    const { closeDetail } = this.props;
    if (closeDetail) {
      closeDetail();
    }
  };

  operateAlipayAccount = () => {
    const {
      storeID,
      paymentChannelManage: {
        detail: {
          seller: { alipay },
        },
      },
    } = this.props;
    if (alipay.status === 4) {
      this.props.dispatch({
        type: 'paymentChannelManage/unForbidenAlipay',
        storeID,
      });
    } else {
      this.props.dispatch({
        type: 'paymentChannelManage/forbidenAlipay',
        storeID,
      });
    }
  };

  operateWeChatAccount = () => {
    const {
      storeID,
      paymentChannelManage: {
        detail: {
          seller: { wechat },
        },
      },
    } = this.props;
    if (wechat.status === 4) {
      this.props.dispatch({
        type: 'paymentChannelManage/unForbidenWeChat',
        storeID,
      });
    } else {
      this.props.dispatch({
        type: 'paymentChannelManage/forbidenWeChat',
        storeID,
      });
    }
  };

  render() {
    const {
      show,
      paymentChannelManage: {
        detail: {
          seller: { alipay, wechat },
          store,
        },
      },
    } = this.props;
    const tagColor = ['red', 'green', 'red', 'red'];
    const { TextArea } = Input;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
      },
    };
    return (
      <Modal
        visible={show}
        width={1000}
        title="商家收费渠道详情"
        onCancel={this.onClose}
        footer={<Button onClick={this.onClose}>关闭</Button>}
        destroyOnClose
      >
        <div>
          <Row className={styles.headDiv}>
            <Col offset={1} span={12}>
              <span>
                商铺名称:&nbsp;&nbsp;
                {store.name}
              </span>
            </Col>
            <Col span={10}>
              <span>
                联系电话:&nbsp;&nbsp;
                {store.store_tel}
              </span>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Card
                className={styles.centerCard}
                headStyle={{
                  backgroundColor: 'rgb(248, 254, 239)',
                  textAlign: 'center',
                  borderRadius: '10px 10px 0 0',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
                title={<span>支付宝</span>}
              >
                <Form>
                  <Form.Item {...formItemLayout} label="支付宝账号">
                    {alipay.account}
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="APPID">
                    {alipay.app_id}
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="商家私钥">
                    保密
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="支付宝公钥">
                    <TextArea rows={3} value={alipay.alipay_key} disabled />
                  </Form.Item>
                  <Form.Item style={{ verticalAlign: 'middle' }} {...formItemLayout} label="状态">
                    <DicShow
                      pcode="mall$#payment$#paymentChannelStatus"
                      code={[alipay.status]}
                      show={name => (
                        <Tag color={tagColor[alipay.status - 1]} key={name}>
                          {name}
                        </Tag>
                      )}
                    />
                  </Form.Item>
                </Form>
              </Card>
              <div className={styles.bottomButton}>
                <Button type="primary" onClick={this.operateAlipayAccount}>
                  {alipay.status === 4 ? '解除禁用' : '禁用'}
                </Button>
              </div>
            </Col>
            <Col span={12}>
              <Card
                className={styles.centerCard}
                headStyle={{
                  backgroundColor: 'rgb(209, 239, 253)',
                  textAlign: 'center',
                  borderRadius: '10px 10px 0 0',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
                title={<span>微信</span>}
              >
                <Form>
                  <Form.Item {...formItemLayout} label="微信账号">
                    {wechat.account}
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="APPID">
                    {wechat.app_id}
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="商家私钥">
                    保密
                  </Form.Item>
                  <Form.Item style={{ verticalAlign: 'middle' }} {...formItemLayout} label="状态">
                    <DicShow
                      pcode="mall$#payment$#paymentChannelStatus"
                      code={[wechat.status]}
                      show={name => (
                        <Tag color={tagColor[wechat.status - 1]} key={name}>
                          {name}
                        </Tag>
                      )}
                    />
                  </Form.Item>
                </Form>
              </Card>
              <div className={styles.bottomButton}>
                <Button type="primary" onClick={this.operateWeChatAccount}>
                  {wechat.status === 4 ? '解除禁用' : '禁用'}
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    );
  }
}
