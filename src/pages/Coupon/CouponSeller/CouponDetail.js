import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Modal, Card, Button, Tag, Tabs } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import { formatDate } from '@/utils/utils';
import styles from './CouponSeller.less';

const { Description } = DescriptionList;
@connect(state => ({
  coupon: state.coupon,
}))
@Form.create()

//  企业入驻的模态对话框组件。
class CouponDetail extends PureComponent {
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

  statusType = status => {
    switch (status) {
      case 1:
        return <Tag color="blue">通用券</Tag>;
      case 2:
        return <Tag color="green">商家券</Tag>;
      case 3:
        return <Tag color="red">商品券</Tag>;
      default:
        return '';
    }
  };

  statusDate= (status,data)=> {
    switch (status) {
      case 1:
    return <span>{formatDate(data.validity_start, 'YYYY-MM-DD HH:mm:ss')}至{formatDate(data.validity_end, 'YYYY-MM-DD HH:mm:ss')}</span>;
      case 2:
    return <span>领取后当日{data.validity_day}天生效</span>;
      case 3:
        return <span>领取后次日{data.validity_day}天生效</span>;
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
              <Description term="优惠券名称">{formData.name}</Description>
              <Description term="数量">{formData.num}</Description>
              <Description term="发放平台">
                {formData.owner_type === 1 ? '平台' : '商家'}
              </Description>
            </DescriptionList>
          </div>
          {/* <div className={styles.form} style={{ marginTop: 25 }}>
            <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
              <Description term="商家名称">
                {formData.unit_num ? formData.unit_num.toString() : '0'}
              </Description>
              <Description term="商铺地址">
                {formData.layer_num ? formData.layer_num.toString() : '0'}
              </Description>
              <Description term="联系电话">
                {/* <DicShow pcode="pa$#build$#decora" code={[formData.decoration]} /> 
              </Description>
            </DescriptionList>
          </div> */}
          <div className={styles.form} style={{ marginTop: 25 }}>
            <DescriptionList title="" size="large" col={2} style={{ marginBottom: 32 }}>
              <Description term="缩略图图片上传">
                <img src={formData.show_img} alt="展示图片" style={{width:'100px',height:'100px'}} />
              </Description>
              <Description term="首页置顶图片上传">
                <img src={formData.top_img} alt="置顶图片" style={{width:'100px',height:'100px'}} />
              </Description>
            </DescriptionList>
          </div>
          <div className={styles.form} style={{ marginTop: 25 }}>
            <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
              <Description term="优惠券类型">{this.statusType(formData.c_type)}</Description>
              <Description term="单价">{this.statusValue(formData.price)}</Description>
              <Description term="使用门槛">
                {formData.threshold === 1
                  ? '无使用门槛'
                  : `满减${formData.threshold_amount}元，减免${formData.reduction_amount}`}
              </Description>
            </DescriptionList>
          </div>
          <div className={styles.form} style={{ marginTop: 25 }}>
            <DescriptionList title="" size="large" col={2} style={{ marginBottom: 32 }}>
              <Description term="有效期内每位顾客最多使用数量">
                {formData.per_capita_use}
              </Description>
              <Description term="有效期内每位顾客最多购买数量">
                {formData.buy_per_capita === 1 ? '不限制' : formData.buy_per_capita_count?formData.buy_per_capita_count.toString():'0'}
              </Description>
              <Description term="有效日期">{this.statusDate(formData.validity_type,formData)}</Description>
            </DescriptionList>
          </div>
          <div className={styles.form} style={{ marginTop: 25 }}>
            <DescriptionList title="" size="large" col={2} style={{ marginBottom: 32 }}>
              <Description term="领取和使用规则">{this.statusValue(formData.use_rule)}</Description>
              <Description term="销售规则">{this.statusValue(formData.sales_rule)}</Description>
            </DescriptionList>
          </div>
        </Card>
      </div>
    );
  };

  render() {
    const {
      coupon: { formVisible, submitting },
      callback,
    } = this.props;

    return (
      <Modal
        title="查看优惠券信息"
        width={873}
        visible={formVisible}
        maskClosable={false}
        confirmLoading={submitting}
        destroyOnClose
        onCancel={callback}
        footer={[
          <Button key="back" onClick={callback}>
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
export default CouponDetail;
