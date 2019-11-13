import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Avatar, Radio } from 'antd';
import { parseUtcTime } from '@/utils/utils';
import DescriptionList from '../../../../components/DescriptionList';
import Toggle from './Toggle';
import styles from './index.less';

const { Description } = DescriptionList;

@connect(state => ({
  storeApply: state.store,
}))
class StoreBasicInfo extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'store/getStoreNew',
    });
  }

  handleToggleClick = value => {
    this.props.dispatch({
      type: 'store/toggleStatus',
      payload: value,
    });
  };

  tranSchange = value => {
    return value !== '' ? parseFloat(value).toFixed(2) : '';
  };

  render() {
    const {
      storeApply: { store, storeToggleValue },
    } = this.props;

    let pidImage1 = '';
    let pidImage2 = '';
    if (store.persional_id_image) {
      const ss = store.persional_id_image.split(',');
      if (ss.length > 0) {
        // eslint-disable-next-line prefer-destructuring
        pidImage1 = ss[0];
        if (ss.length > 1) {
          // eslint-disable-next-line prefer-destructuring
          pidImage2 = ss[1];
        }
      }
    }
    return (
      <div className={styles.main}>
        <Card title="店铺基本信息" bordered={false}>
          <div className={styles.topInfo}>
            <div className={styles.topInfoLeft}>
              <Avatar src={store.portrait} shape="circle" size={100} style={{ marginLeft: 49 }} />
            </div>
            <div className={styles.topInfoCenter}>
              <span>{store.name}</span>
              <span>
                商铺管理员：
                {store.applicant_name}
              </span>
              <span>
                商铺电话：
                {store.store_tel}
              </span>
            </div>
            <div className={styles.topInfoRight}>
              {store.store_status !== 3 && (
                <Toggle
                  value={storeToggleValue}
                  left="开业"
                  right="歇业"
                  onClick={this.handleToggleClick}
                />
              )}
              {store.store_status === 3 && <div className={styles.warnLabel}>挂起</div>}
            </div>
          </div>
          <div className={styles.form} style={{ marginTop: 25 }}>
            <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="商铺编号">{store.store_code}</Description>
              <Description term="商铺名称">{store.name}</Description>
              <Description term="计租面积">{this.tranSchange(store.rent_area)}㎡</Description>
            </DescriptionList>
            <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="业态">{store.store_type}</Description>
              <Description term="商铺品牌">
                {store.brand !== '' ? store.brand : store.name}
              </Description>
              <Description term="商铺电话">{store.store_tel}</Description>
            </DescriptionList>
            <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
              <Description term="商铺管理员">{store.applicant_name}</Description>
              <Description term="联系人电话">{store.applicant_tel}</Description>
              <Description term="商铺地址">{store.business_address}</Description>
            </DescriptionList>
            <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
              <Description term="营业开始时间">{store.open_time}</Description>
              <Description term="营业结束时间">{store.close_time}</Description>
            </DescriptionList>
          </div>
        </Card>
        <Card title="经营单位基本信息" bordered={false}>
          <div className={styles.form}>
            <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="统一社会信用代码">{store.credit_code}</Description>
              <Description term="经营单位名称">{store.corporation}</Description>
              <Description term="经营单位类型">
                {store.corporation_type === 1 ? '个体营业者' : '工商企业'}
              </Description>
            </DescriptionList>
            <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="法定代表人">{store.legal_persion}</Description>
              <Description term="经营范围">{store.business_scope}</Description>
              <Description term="营业执照有效期">
                {store.issue_time && store.issue_time !== ''
                  ? parseUtcTime(store.issue_time, 'YYYY-MM-DD')
                  : ''}
                &nbsp;至&nbsp;
                {store.expiration_time}
              </Description>
            </DescriptionList>
            <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="法定代表人信息">
                <div style={{ display: 'flex' }}>
                  {pidImage1 && (
                    <div
                      className={styles.formImage}
                      style={{ width: 248, height: 160, marginLeft: 20 }}
                    >
                      <img src={pidImage1} alt="身份证" />
                    </div>
                  )}
                  {pidImage2 && (
                    <div
                      className={styles.formImage}
                      style={{ width: 248, height: 160, marginLeft: 20 }}
                    >
                      <img src={pidImage2} alt="身份证" />
                    </div>
                  )}
                </div>
              </Description>
            </DescriptionList>
            <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="营业执照">
                <div
                  className={styles.formImage}
                  style={{ width: 147, height: 147, marginLeft: 20 }}
                >
                  <img src={store.license_image} alt="营业执照" />
                </div>
              </Description>
            </DescriptionList>
            <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="平台优惠活动">
                <Radio.Group value={store.member_cut === 1 ? '不参与' : '参与'} disabled>
                  <Radio value="参与">参与</Radio>
                  <Radio value="不参与">不参与</Radio>
                </Radio.Group>
              </Description>
            </DescriptionList>
          </div>
        </Card>
      </div>
    );
  }
}

export default StoreBasicInfo;
