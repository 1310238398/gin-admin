import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Avatar, Tag } from 'antd';
import { parseUtcTime } from '../../../utils/utils';
import DescriptionList from '../../../components/DescriptionList';
import { DicShow } from '@/components/Dictionary';
// import Toggle from '../../Mall/Store/BasicInfo/Toggle';
import styles from './EnterpriseInfo.less';

const { Description } = DescriptionList;

@connect(state => ({
  storeApply: state.store,
}))
class EnterpriseInfo extends PureComponent {
  state = {
    bigImage: false,
    ShowUrl: null,
    bigImageyingye: false,
    ShowUrlyingye: null,
  };

  componentDidMount() {
    // this.props.dispatch({
    //   type: 'store/getStoreNew',
    // });
  }

  //   handleToggleClick = value => {
  //     this.props.dispatch({
  //       type: 'store/toggleStatus',
  //       payload: value,
  //     });
  //   };

  tranSchange = value => {
    return value !== '' ? parseFloat(value).toFixed(2) : '';
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

  render() {
    const {
      storeApply: {
        store,
        // storeToggleValue
      },
    } = this.props;
    let headerImgUrl = null;
    let headerImgUrlfading = null;
    if (store.logo) {
      headerImgUrl = store.logo;
    } else {
      headerImgUrl = '/s/mall/noimage.jpg';
    }
    if (store.license_image) {
      headerImgUrlfading = store.license_image;
    } else {
      headerImgUrlfading = '/s/mall/noimage.jpg';
    }
    let pidImage1 = '';
    let pidImage2 = '';
    if (store.representative_idcard_front) {
      pidImage1 = store.representative_idcard_front;
    } else {
      pidImage1 = '/s/mall/noimage.jpg';
    }
    if (store.representative_idcard_back) {
      pidImage2 = store.representative_idcard_back;
    } else {
      pidImage2 = '/s/mall/noimage.jpg';
    }
    return (
      <div className={styles.main}>
        <Card title="企业基本信息" bordered={false}>
          <div className={styles.topInfo}>
            <div className={styles.topInfoLeft}>
              <Avatar
                src={store.headerImgUrl}
                shape="circle"
                size={100}
                style={{ marginLeft: 49 }}
                onClick={() => this.shouBigImage(headerImgUrl)}
              />
            </div>

            <div className={styles.topInfoCenter}>
              <span>{store.name}</span>
              <span>
                企业联系电话：
                {store.phone}
                企业邮箱：
                {store.email}
              </span>
              <span>
                入驻园区地址：
                {store.address}
              </span>
              <span>
                企业简介：
                {store.memo}
              </span>
            </div>
          </div>
          <div className={styles.form} style={{ marginTop: 25 }}>
            <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
              <Description term="行业类别">
                {
                  <DicShow
                    pcode="OPER$#enterprise_category_industry"
                    code={[store.category]}
                    show={name}
                  />
                }
              </Description>
              <Description term="企业规模">
                {<DicShow pcode="OPER$#enterprise_scale" code={[store.size]} show={name} />}
              </Description>
              <Description term="企业类型">
                {<DicShow pcode="OPER$#company_type" code={[store.company_type]} show={name} />}
              </Description>
            </DescriptionList>
            <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
              <Description term="企业联系人">{store.contacter}</Description>
              <Description term="联系人电话">{store.contact_tel}</Description>
            </DescriptionList>
            <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="企业地址">{store.address}</Description>
              <Description term="入驻时间">
                {parseUtcTime(store.entry_date, 'YYYY-MM-DD')}
              </Description>
            </DescriptionList>
            <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="企业简介">{store.memo}</Description>
            </DescriptionList>
            <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="企业地址">
                {store.buildings &&
                  store.buildings.map(item => {
                    return <Tag>{item.building_name}</Tag>;
                  })}
              </Description>
            </DescriptionList>
          </div>
        </Card>
        <Card title="经营单位基本信息" bordered={false}>
          <div className={styles.form}>
            <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="统一社会信用代码">{store.credit_code}</Description>
              <Description term="法定代表人">{store.representative}</Description>
              <Description term="经营范围">{store.business_scope}</Description>
            </DescriptionList>
            <DescriptionList col={1}>
              <Description term="营业执照有效期">
                {store.business_license_sdate && store.business_license_sdate !== ''
                  ? parseUtcTime(store.business_license_sdate, 'YYYY-MM-DD')
                  : ''}
                &nbsp;至&nbsp;
                {store.business_license_edate}
              </Description>
            </DescriptionList>
            <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="营业执照">
                <div
                  className={styles.formImage}
                  style={{ width: 147, height: 147, marginLeft: 20 }}
                >
                  <img
                    src={headerImgUrlfading}
                    alt="营业执照"
                    onClick={() => this.shouBigImageyingye(headerImgUrlfading)}
                  />
                </div>
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
              <Description term="申请状态">{this.statusRender(store.audit_status)}</Description>
              <Description term="通过/驳回时间">
                {store.audit_time !== 0 ? parseUtcTime(store.audit_time, 'YYYY-MM-DD') : null}
              </Description>
            </DescriptionList>

            {store.audit_status === 3 ? (
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="申请建议"> {store.audit_suggest}</Description>
              </DescriptionList>
            ) : null}
            {this.state.bigImage ? (
              <div className={styles.popoverbackdrop} onClick={() => this.hideBigImage()}>
                <img className={styles.imgresponsive} src={this.state.ShowUrl} alt="查看失败" />
              </div>
            ) : null}
            {this.state.bigImageyingye ? (
              <div className={styles.popoverbackdrop} onClick={() => this.hideBigImageyingye()}>
                <img
                  className={styles.imgresponsive}
                  src={this.state.ShowUrlyingye}
                  alt="查看失败"
                />
              </div>
            ) : null}
          </div>
        </Card>
      </div>
    );
  }
}

export default EnterpriseInfo;
