import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Modal, Card, Button, Tag, Tabs } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import styles from './CouponSeller.less';

const { Description } = DescriptionList;
@connect(state => ({
  coupon: state.coupon,
}))
@Form.create()

//  企业入驻的模态对话框组件。
class EffectData extends PureComponent {
  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type } = this.props;
    this.dispatch({
      type: 'coupon/loadForm',
      payload: {
        id,
        type,
      },
    });
  }

  // 判断数值
  statusValue = value => {
    if (value && value !== 0) {
      return (value / 100).toString();
    }
    return '';
  };

  statusRender = status => {
    switch (status) {
      case 1:
        return <Tag color="blue">待审核</Tag>;
      case 2:
        return <Tag color="green">申请通过</Tag>;
      case 3:
        return <Tag color="red">申请驳回</Tag>;
      default:
        return '';
    }
  };

  dispatch = action => {
    const { dispatch } = this.props;
    dispatch(action);
  };

  renderFirstView = () => {
    const {
      coupon: { formData, proData },
    } = this.props;
    const { TabPane } = Tabs;

    return (
      <div className={styles.main}>
        <Card title="基本信息" bordered={false}>
          <div className={styles.form} style={{ marginTop: 25 }}>
            <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
              <Description term="优惠券名称">{proData.name}</Description>
              <Description term="总数量">
                {formData.name},已消费:{20},剩余:{20}
              </Description>
              <Description term="发放平台">
                {/* <DicShow pcode="pa$#build$#scale" code={[formData.is_all_rent]} /> */}
              </Description>
            </DescriptionList>
          </div>
          <div className={styles.form} style={{ marginTop: 25 }}>
            <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
              <Description term="用券总成交额">
                {formData.unit_num ? formData.unit_num.toString() : '0'}
              </Description>
              <Description term="优惠总金额">
                {formData.layer_num ? formData.layer_num.toString() : '0'}
              </Description>
              <Description term="用券新客数">
                {/* <DicShow pcode="pa$#build$#decora" code={[formData.decoration]} /> */}
              </Description>
              <Description term="用券老客数">
                {/* <DicShow pcode="pa$#build$#decora" code={[formData.decoration]} /> */}
              </Description>
            </DescriptionList>
          </div>
        </Card>
      </div>
    );
  };

  render() {
    const {
      coupon: { formVisible, submitting },
      onCancel,
    } = this.props;

    return (
      <Modal
        title="效果数据"
        width={873}
        visible={formVisible}
        maskClosable={false}
        confirmLoading={submitting}
        destroyOnClose
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            关闭
          </Button>,
        ]}
        style={{ top: 20 }}
        bodyStyle={{ height: 550, overflowY: 'scroll' }}
      >
        {this.renderFirstView()}
      </Modal>
    );
  }
}
export default EffectData;
