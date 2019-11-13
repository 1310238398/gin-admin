/* eslint-disable react/react-in-jsx-scope */
import React, { PureComponent } from 'react';
import { Modal, Tag, Button, Card, Avatar } from 'antd';
// import moment from 'moment';
import { parseUtcTime } from '../../../utils/utils';
import ShopApplicationRejected from './ShopApplicationRejected';
import DescriptionList from '../../../components/DescriptionList';
import styles from './ShopApplicationReviewInfo.less';

const { Description } = DescriptionList;
export default class ShopApplicationReviewInfo extends PureComponent {
  /**
   * 初始化界面数据
   * @param {员工数据记录}}}} data
   */

  state = {
    // queryFormDisplay: false,
    bigImage: false,
    ShowUrl: null,
    bigImageyingye: false,
    ShowUrlyingye: null,
    bigImagefading: false,
    ShowUrlfading: null,
    noPassshopInfoFrame: {
      visible: false,
      data: null,
    },
  };

  // 通过
  onBtnPassOffClick = () => {
    const { onShopInfoFrameCloseCallback, onPassOffCallback, data } = this.props;
    Modal.confirm({
      title: '操作确认',
      content: '确定要通过此商铺？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        onPassOffCallback(data);
        // 关闭窗口
        onShopInfoFrameCloseCallback();
      },
    });
  };

  // 驳回
  onBtnUnAuthClick(data) {
    this.setState({
      noPassshopInfoFrame: {
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
  onBtnReasonClick = () => {
    const { onShopInfoFrameCloseCallback, onBtnUnAuthClick, data } = this.props;
    console.log(data.remark);
    onBtnUnAuthClick(data);
    // 关闭窗口
    onShopInfoFrameCloseCallback();
  };

  /**
   * 子窗口关闭回调
   */
  closeSubFrame = () => {
    // 关闭窗口
    this.setState({
      noPassshopInfoFrame: {
        visible: false,
        data: null,
      },
    });
  };

  tranSchange = value => {
    return value !== '' ? parseFloat(value).toFixed(2) : '';
  };

  shouBigImage(event) {
    console.log(event);
    this.setState({
      ShowUrl: event,
      bigImage: true,
    });
  }

  shouBigImageyingye(event) {
    console.log(event);
    this.setState({
      ShowUrlyingye: event,
      bigImageyingye: true,
    });
  }

  shouBigImagefading(event) {
    console.log(event);
    this.setState({
      ShowUrlfading: event,
      bigImagefading: true,
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

  hideBigImagefading() {
    this.setState({
      bigImagefading: false,
    });
  }

  /**
   * 界面渲染
   */
  render() {
    const { data, noPass } = this.props;
    let headerImgUrl = null;
    let headerImgUrlfading = null;
    let headerImgUrlgeren = null;
    let headerImgUrlgerenone = null;
    if (data.portrait) {
      headerImgUrl = data.portrait;
    } else {
      headerImgUrl = '/s/mall/noimage.jpg';
    }
    if (data.license_image) {
      headerImgUrlfading = data.license_image;
    } else {
      headerImgUrlfading = '/s/mall/noimage.jpg';
    }
    if (data.persional_id_image) {
      [headerImgUrlgeren][0] = data.persional_id_image.split(',');
      [headerImgUrlgerenone][1] = data.persional_id_image.split(',');
    } else {
      headerImgUrlgeren = '/s/mall/noimage.jpg';
      headerImgUrlgerenone = '/s/mall/noimage.jpg';
    }

    const footerJsx = [
      <Button key="close" onClick={this.props.onShopInfoFrameCloseCallback}>
        关闭
      </Button>,
    ];
    const footerJsxNOpass = [
      <Button key="close" onClick={this.props.onShopInfoFrameCloseCallback}>
        关闭
      </Button>,

      <Button key="writeoff" type="danger" onClick={this.onBtnPassOffClick}>
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
        title="商铺申请审核"
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.onShopInfoFrameCloseCallback}
        footer={noPass === 1 ? footerJsxNOpass : footerJsx}
      >
        <div className={styles.main}>
          <Card title="店铺基本信息" bordered={false}>
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
                <span>{data.name}</span>
                <span>
                  商铺管理员：
                  {data.applicant_name}
                </span>
                <span>
                  商铺电话：
                  {data.store_tel}
                </span>
              </div>
            </div>
            <div className={styles.form} style={{ marginTop: 25 }}>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="商铺编号">{data.store_code}</Description>
                <Description term="商铺名称">{data.name}</Description>
                <Description term="计租面积">
                  {data.rent_area ? this.tranSchange(data.rent_area) : ''}㎡
                </Description>
              </DescriptionList>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="业态">{data.store_type}</Description>
                <Description term="商铺品牌">
                  {data.brand !== '' ? data.brand : data.name}
                </Description>
                <Description term="商铺电话">{data.store_tel}</Description>
              </DescriptionList>
              <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
                <Description term="商铺管理员">{data.applicant_name}</Description>
                <Description term="联系人电话">{data.applicant_tel}</Description>
                <Description term="商铺地址">{data.business_address}</Description>
              </DescriptionList>
              <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
                <Description term="营业开始时间">{data.open_time}</Description>
                <Description term="营业结束时间">{data.close_time}</Description>
              </DescriptionList>
            </div>
          </Card>
          <Card title="经营单位基本信息" bordered={false}>
            <div className={styles.form}>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="统一社会信用代码">{data.credit_code}</Description>
                <Description term="经营单位名称">{data.corporation}</Description>
                <Description term="经营单位类型">
                  {data.corporation_type === 1 ? '个体营业者' : '工商企业'}
                </Description>
              </DescriptionList>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="法定代表人">{data.legal_persion}</Description>
                <Description term="经营范围">{data.business_scope}</Description>
                <Description term="营业执照有效期">
                  {data.issue_time && data.issue_time !== ''
                    ? parseUtcTime(data.issue_time, 'YYYY-MM-DD')
                    : ''}
                  &nbsp;至&nbsp;
                  {data.expiration_time}
                </Description>
              </DescriptionList>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="法定代表人信息">
                  <div style={{ display: 'flex' }}>
                    {headerImgUrlgeren && (
                      <div
                        className={styles.formImage}
                        style={{ width: 248, height: 160, marginLeft: 20 }}
                      >
                        <img
                          src={headerImgUrlgeren}
                          alt="身份证"
                          onClick={() => this.shouBigImagefading(headerImgUrlgeren)}
                        />
                      </div>
                    )}
                    {headerImgUrlgerenone && (
                      <div
                        className={styles.formImage}
                        style={{ width: 248, height: 160, marginLeft: 20 }}
                      >
                        <img
                          src={headerImgUrlgerenone}
                          alt="身份证"
                          onClick={() => this.shouBigImagefading(headerImgUrlgerenone)}
                        />
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
                    <img
                      src={headerImgUrlfading}
                      alt="营业执照"
                      onClick={() => this.shouBigImageyingye(headerImgUrlfading)}
                    />
                  </div>
                </Description>
              </DescriptionList>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="申请状态">
                  {this.statusRender(data.application_status)}
                </Description>
                <Description term="通过/驳回时间">
                  {data.updated !== 0 ? parseUtcTime(data.updated, 'YYYY-MM-DD') : null}
                </Description>
              </DescriptionList>

              {data.application_status === 3 ? (
                <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                  <Description term="申请状态"> {data.remark}</Description>
                </DescriptionList>
              ) : null}
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
        {this.state.bigImagefading ? (
          <div className={styles.popoverbackdrop} onClick={() => this.hideBigImagefading()}>
            <img className={styles.imgresponsive} src={this.state.ShowUrlfading} alt="查看失败" />
          </div>
        ) : null}
        {this.state.noPassshopInfoFrame.visible && (
          <ShopApplicationRejected
            data={this.state.noPassshopInfoFrame.data}
            onShopInfoFrameCloseCallback={this.closeSubFrame}
            //  onUnAuthCallback={this.onWriteOffCallback}
            onBtnUnReasonClick={this.onBtnReasonClick}
          />
        )}
      </Modal>
    );
    return resultJsx;
  }
}
