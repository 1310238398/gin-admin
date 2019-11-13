import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Avatar, Modal, Card, Button, Tag } from 'antd';
import { DicShow } from '@/components/Dictionary';
import DescriptionList from '../../../components/DescriptionList';
import { parseUtcTime } from '../../../utils/utils';
import styles from '../EnterpriseInfo/EnterpriseInfo.less';

const { Description } = DescriptionList;
@connect(state => ({
  enterprise: state.enterprise,
}))
@Form.create()

//  企业入驻的模态对话框组件。
export default class EnterpriseInformationDetail extends PureComponent {
  state = {
    bigImage: false,
    ShowUrl: null,
    bigImageyingye: false,
    ShowUrlyingye: null,
  };

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type } = this.props;
    this.props.dispatch({
      type: 'enterprise/loadForm',
      payload: {
        id,
        type,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'enterprise/changeFormVisible',
      payload: false,
    });
    this.props.callback();
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

  shouBigImage(event) {
    this.setState({
      ShowUrl: event,
      bigImage: true,
    });
  }

  shouBigImageyingye(event) {
    this.setState({
      ShowUrlyingye: event,
      bigImageyingye: true,
    });
  }

  hideBigImage() {
    this.setState({
      bigImage: false,
    });
  }

  hideBigImageyingye() {
    this.setState({
      bigImageyingye: false,
    });
  }

  renderBuildingType = value => {
    switch (value) {
      case 1:
        return <Tag color="blue">购买</Tag>;
      case 2:
        return <Tag color="green">租赁</Tag>;
      case 3:
        return <Tag color="yellow">自用</Tag>;
      default:
        return '';
    }
  };

  renderFirstView = () => {
    const {
      enterprise: { formData },
    } = this.props;
    let headerImgUrl = null;
    let headerImgUrlfading = null;
    if (formData.logo) {
      headerImgUrl = formData.logo;
    } else {
      headerImgUrl = '/s/mall/noimage.jpg';
    }
    if (formData.business_license) {
      headerImgUrlfading = formData.business_license;
    } else {
      headerImgUrlfading = '/s/mall/noimage.jpg';
    }
    let pidImage1 = '';
    let pidImage2 = '';
    if (formData.representative_idcard_front) {
      pidImage1 = formData.representative_idcard_front;
    } else {
      pidImage1 = '/s/mall/noimage.jpg';
    }
    if (formData.representative_idcard_back) {
      pidImage2 = formData.representative_idcard_back;
    } else {
      pidImage2 = '/s/mall/noimage.jpg';
    }
    return (
      <div className={styles.main}>
        <Card title="企业基本信息" bordered={false}>
          <div className={styles.topInfo}>
            <div className={styles.topInfoLeft}>
              <Avatar
                src={headerImgUrl}
                shape="circle"
                size={100}
                style={{ marginLeft: 49 }}
                onClick={() => this.shouBigImage(headerImgUrl)}
              />
            </div>
            <div className={styles.topInfoCenter}>
              <span>{formData.name}</span>
              <span>
                企业联系电话：
                {formData.phone}
                企业邮箱：
                {formData.zip_code}
              </span>
              <span>
                入驻园区地址：
                {formData.buildings &&
                  formData.buildings.map(item => {
                    return (
                      <Tag>
                        {item.building_name} {this.renderBuildingType(item.incoming_type)}
                      </Tag>
                    );
                  })}
              </span>
              {/* <span>
                企业简介：
                {formData.memo}
              </span> */}
            </div>
          </div>
          <div className={styles.form} style={{ marginTop: 25 }}>
            <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
              <Description term="行业类别">
                {
                  <DicShow
                    pcode="OPER$#enterprise_category_industry"
                    code={[formData.category]}
                    show={name}
                  />
                }
              </Description>
              <Description term="企业规模">
                {<DicShow pcode="OPER$#enterprise_scale" code={[formData.size]} show={name} />}
              </Description>
              <Description term="企业类型">
                {<DicShow pcode="OPER$#company_type" code={[formData.company_type]} show={name} />}
              </Description>
            </DescriptionList>
            <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
              <Description term="企业电话">{formData.phone}</Description>
              <Description term="法定代表人">{formData.representative}</Description>
              <Description term="企业管理员">{formData.applicant_name}</Description>
              <Description term="联系电话">{formData.applicant_tel}</Description>
            </DescriptionList>
            <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="入驻时间">
                {formData.entry_date ? parseUtcTime(formData.entry_date, 'YYYY-MM-DD') : ''}
              </Description>
              <Description term="企业地址">{formData.address ? formData.address : ''}</Description>
            </DescriptionList>
            {/* <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="企业简介">{formData.memo}</Description>
            </DescriptionList> */}
          </div>
        </Card>
        <Card title="经营单位基本信息" bordered={false}>
          <div className={styles.form}>
            <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="统一社会信用代码">{formData.credit_code}</Description>
            </DescriptionList>
            <DescriptionList col={1} style={{ marginBottom: 32 }}>
              <Description term="经营范围">{formData.business_scope}</Description>
            </DescriptionList>
            <DescriptionList col={1}>
              <Description term="营业执照有效期">
                {formData.business_license_sdate && formData.business_license_sdate
                  ? parseUtcTime(formData.business_license_sdate, 'YYYY-MM-DD')
                  : ''}
                &nbsp;至&nbsp;
                {formData.business_license_edate}
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
            {/* <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="申请状态">{this.statusRender(formData.audit_status)}</Description>
              <Description term="通过/驳回时间">
                {formData.audit_time ? parseUtcTime(formData.audit_time, 'YYYY-MM-DD') : null}
              </Description>
            </DescriptionList> */}

            {/* {formData.audit_status === 3 ? (
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="申请建议"> {formData.audit_suggest}</Description>
              </DescriptionList>
            ) : null} */}
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
            <DescriptionList>
              <Description term="热门企业">
                {formData.flag && formData.flag === 1 ? '是' : '否'}
              </Description>
            </DescriptionList>
          </div>
        </Card>
      </div>
    );
  };

  render() {
    const {
      enterprise: { formVisible, submitting },
    } = this.props;

    return (
      <Modal
        title="企业详情"
        width={873}
        visible={formVisible}
        maskClosable={false}
        confirmLoading={submitting}
        destroyOnClose
        onCancel={this.onModalCancelClick}
        footer={[
          <Button key="back" onClick={this.onModalCancelClick}>
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
