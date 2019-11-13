/* eslint-disable react/react-in-jsx-scope */
import React, { PureComponent } from 'react';
import { Modal, Tag, Button, Card, Avatar } from 'antd';
// import moment from 'moment';
import { connect } from 'dva';
import { parseUtcTime } from '../../../utils/utils';
import EnterpriseAuditReason from './EnterpriseAuditReason';
import DescriptionList from '../../../components/DescriptionList';
import styles from './EnterpriseAuditInfo.less';
import { DicShow } from '@/components/Dictionary';

const { Description } = DescriptionList;
@connect(state => ({
  enterpriseAudit: state.enterpriseAudit,
}))
export default class EnterpriseAuditInfo extends PureComponent {
  state = {
    // queryFormDisplay: false,
    bigImage: false,
    ShowUrl: null,
    bigImageyingye: false,
    ShowUrlyingye: null,
    bigImagepid: false,
    ShowUrlpid: null,
    bigImagepid2: false,
    ShowUrlpid2: null,
    noPassenterpriseInfoFrame: {
      visible: false,
      data: null,
    },
  };

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { data } = this.props;
    this.props.dispatch({
      type: 'enterpriseAudit/loadForm',
      payload: data.record_id,
    });
  }

  // 通过
  onBtnPassOffClick = () => {
    const { onEnterpriseInfoFrameCloseCallback, onPassOffCallback, data } = this.props;
    Modal.confirm({
      title: '操作确认',
      content: '确定要通过此企业？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        onPassOffCallback(data);
        // 关闭窗口
        onEnterpriseInfoFrameCloseCallback();
      },
    });
  };

  // 驳回
  onBtnUnAuthClick(data) {
    this.setState({
      noPassenterpriseInfoFrame: {
        visible: true,
        data,
      },
    });
  }

  statusRender = status => {
    switch (status) {
      case 1:
        return <Tag color="blue">申请中</Tag>;
      case 2:
        return <Tag color="green">通过</Tag>;
      case 3:
        return <Tag color="red">驳回</Tag>;
      default:
        return '';
    }
  };

  // 驳回-》后台传值
  onBtnReasonClick = rec => {
    const { onEnterpriseInfoFrameCloseCallback, onBtnUnAuthClick } = this.props;
    onBtnUnAuthClick(rec);
    // 关闭窗口
    onEnterpriseInfoFrameCloseCallback();
  };

  /**
   * 子窗口关闭回调
   */
  closeSubFrame = () => {
    // 关闭窗口
    this.setState({
      noPassenterpriseInfoFrame: {
        visible: false,
        data: null,
      },
    });
  };

  tranSchange = value => {
    return value !== '' ? parseFloat(value).toFixed(2) : '';
  };

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

  shouBigImagepid(event) {
    this.setState({
      ShowUrlpid: event,
      bigImagepid: true,
    });
  }

  shouBigImagepid2(event) {
    this.setState({
      ShowUrlpid2: event,
      bigImagepid2: true,
    });
  }

  hideBigImagepid() {
    this.setState({
      bigImagepid: false,
    });
  }
  
  hideBigImagepid2() {
    this.setState({
      bigImagepid2: false,
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

  /**
   * 界面渲染
   */
  render() {
    const { data } = this.props;
    const {
      enterpriseAudit: { formData },
    } = this.props;
    let headerImgUrl = null;
    let headerImgUrlfading = null;
    if (formData.enterprise.logo) {
      headerImgUrl = formData.enterprise.logo;
    } else {
      headerImgUrl = '/s/mall/noimage.jpg';
    }
    if (formData.enterprise.business_license) {
      headerImgUrlfading = formData.enterprise.business_license;
    } else {
      headerImgUrlfading = '/s/mall/noimage.jpg';
    }
    let pidImage1 = '';
    let pidImage2 = '';
    if (formData.enterprise.representative_idcard_front) {
      pidImage1 = formData.enterprise.representative_idcard_front;
    } else {
      pidImage1 = '/s/mall/noimage.jpg';
    }
    if (formData.enterprise.representative_idcard_back) {
      pidImage2 = formData.enterprise.representative_idcard_back;
    } else {
      pidImage2 = '/s/mall/noimage.jpg';
    }
    const footerJsx = [
      <Button key="close" onClick={this.props.onEnterpriseInfoFrameCloseCallback}>
        关闭
      </Button>,
    ];
    const footerJsxNOpass = [
      <Button key="close" onClick={this.props.onEnterpriseInfoFrameCloseCallback}>
        关闭
      </Button>,

      <Button key="writeoff" type="primary" onClick={this.onBtnPassOffClick}>
        通过
      </Button>,
      <Button key="unauth" type="danger" onClick={() => this.onBtnUnAuthClick(data)}>
        驳回
      </Button>,
    ];

    const resultJsx = (
      <Modal
        className={styles.frame}
        visible
        title="企业申请审核"
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.onEnterpriseInfoFrameCloseCallback}
        footer={data.status === 1 ? footerJsxNOpass : footerJsx}
      >
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
                <span>{formData.enterprise.name}</span>
                <span>
                  <span style={{ fontSize: '14px' }}>
                    申请人：{formData.enterprise.applicant_name}
                  </span>
                </span>
                <span>
                  <span style={{ fontSize: '14px' }}>
                    申请人联系方式:{formData.enterprise.applicant_tel}
                  </span>
                  <span> 申请状态: {this.statusRender(formData.status)}</span>
                </span>
                <span>
                  入驻园区地址：
                  {formData.enterprise.buildings &&
                    formData.enterprise.buildings.map(item => {
                      return (
                        <Tag>
                          {item.building_name}
                          {this.renderBuildingType(item.incoming_type)}
                        </Tag>
                      );
                    })}
                </span>
                <span>
                  {formData.status !== 1 && formData.audit_time
                    ? `通过/驳回时间：${parseUtcTime(formData.audit_time, 'YYYY-MM-DD')}`
                    : null}
                </span>
                {formData.status === 3 ? <span> ( 驳回意见:{formData.audit_suggest}) </span> : null}
              </div>
            </div>

            <div className={styles.form} style={{ marginTop: 25 }}>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="企业电话">{formData.enterprise.phone}</Description>
                <Description term="企业邮箱">{formData.enterprise.zip_code}</Description>
                {/* <Description term="入驻园区地址">
                  {formData.buildings &&
                    formData.buildings.map(item => {
                      return <Tag>{item.building_name}</Tag>;
                    })}
                </Description> */}
              </DescriptionList>

              <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
                <Description term="行业类别">
                  {
                    <DicShow
                      pcode="OPER$#enterprise_category_industry"
                      code={[formData.enterprise.category]}
                      show={name}
                    />
                  }
                </Description>
                <Description term="企业规模">
                  {
                    <DicShow
                      pcode="OPER$#enterprise_scale"
                      code={[formData.enterprise.size]}
                      show={name}
                    />
                  }
                </Description>
                <Description term="企业类型">
                  {
                    <DicShow
                      pcode="OPER$#company_type"
                      code={[formData.enterprise.company_type]}
                      show={name}
                    />
                  }
                </Description>
              </DescriptionList>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="入驻时间">
                  {formData.enterprise.entry_date
                    ? parseUtcTime(formData.enterprise.entry_date, 'YYYY-MM-DD')
                    : ''}
                </Description>
              </DescriptionList>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="企业简介">{formData.enterprise.memo}</Description>
              </DescriptionList>
            </div>
          </Card>
          <Card title="经营单位基本信息" bordered={false}>
            <div className={styles.form}>
              <DescriptionList title="" style={{ marginBottom: 32 }} col="2">
                <Description term="统一社会信用代码">{formData.enterprise.credit_code}</Description>
                <Description term="法定代表人">{formData.enterprise.representative}</Description>
              </DescriptionList>
              <DescriptionList title="" style={{ marginBottom: 32 }} col="1">
                <Description term="经营范围">{formData.enterprise.business_scope}</Description>
              </DescriptionList>
              <DescriptionList col="1">
                <Description term="营业执照有效期">
                  {formData.enterprise.business_license_sdate &&
                  formData.enterprise.business_license_sdate !== ''
                    ? formData.enterprise.business_license_sdate
                    : ''}
                  &nbsp;至&nbsp;
                  {formData.enterprise.business_license_edate}
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
                        <img
                          src={pidImage1}
                          alt="身份证"
                          onClick={() => this.shouBigImagepid(pidImage1)}
                        />
                      </div>
                    )}
                    {pidImage2 && (
                      <div
                        className={styles.formImage}
                        style={{ width: 248, height: 160, marginLeft: 20 }}
                      >
                        <img
                          src={pidImage2}
                          alt="身份证"
                          onClick={() => this.shouBigImagepid2(pidImage2)}
                        />
                      </div>
                    )}
                  </div>
                </Description>
              </DescriptionList>
            </div>
          </Card>
        </div>
        {this.state.bigImage ? (
          <div className={styles.popoverbackdrop} onClick={() => this.hideBigImage()}>
            <img className={styles.imgresponsive} src={this.state.ShowUrl} alt="查看失败" />
          </div>
        ) : null}
        {this.state.bigImageyingye ? (
          <div className={styles.popoverbackdrop} onClick={() => this.hideBigImageyingye()}>
            <img className={styles.imgresponsive} src={this.state.ShowUrlyingye} alt="查看失败" />
          </div>
        ) : null}
        {this.state.bigImagepid ? (
          <div className={styles.popoverbackdrop} onClick={() => this.hideBigImagepid()}>
            <img className={styles.imgresponsive} src={this.state.ShowUrlpid} alt="查看失败" />
          </div>
        ) : null}
        {this.state.bigImagepid2 ? (
          <div className={styles.popoverbackdrop} onClick={() => this.hideBigImagepid2()}>
            <img className={styles.imgresponsive} src={this.state.ShowUrlpid2} alt="查看失败" />
          </div>
        ) : null}
        {this.state.noPassenterpriseInfoFrame.visible && (
          <EnterpriseAuditReason
            data={this.state.noPassenterpriseInfoFrame.data}
            onEnterpriseInfoFrameCloseCallback={this.closeSubFrame}
            onBtnUnReasonClick={this.onBtnReasonClick}
          />
        )}
      </Modal>
    );
    return resultJsx;
  }
}
