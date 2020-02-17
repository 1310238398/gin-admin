/* eslint-disable react/react-in-jsx-scope */
import React, { PureComponent } from 'react';
import { Modal, Tag, Button, Avatar, Card } from 'antd';
import { parseUtcTime } from '@/utils/utils';
import { connect } from 'dva';
import DescriptionList from '@/components/DescriptionList';
import { DicShow } from '@/components/Dictionary';
import styles from './StoreManageInfo.less';

const { Description } = DescriptionList;
@connect(state => ({
  shopMallStore: state.shopMallStore,
}))
export default class StoreManageInfo extends PureComponent {
  state = {
    bigImage: false,
    ShowUrl: null,
    bigImageyingye: false,
    ShowUrlyingye: null,
    bigImagefading: false,
    ShowUrlfading: null,
  };

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type } = this.props;
    this.props.dispatch({
      type: 'shopMallStore/loadForm',
      payload: {
        id,
        type,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'shopMallStore/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  // 挂起
  onBtnHangupOffClick = () => {
    const { onShopInfoFrameCloseCallback, onHangupCallback, data } = this.props;
    Modal.confirm({
      title: '操作确认',
      content: '确定要挂起此商铺？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        onHangupCallback(data);
        // 关闭窗口
        onShopInfoFrameCloseCallback();
      },
    });
  };

  onBtnCancleOffClick = () => {
    const { onShopInfoFrameCloseCallback, oncancelCallback, data } = this.props;
    Modal.confirm({
      title: '操作确认',
      content: '确定要取消挂起此商铺？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        oncancelCallback(data);
        // 关闭窗口
        onShopInfoFrameCloseCallback();
      },
    });
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

  shouBigImagefading(event) {
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

  RenderStatus = value => {
    switch (value) {
      case 1:
        return <Tag color="blue">个体经营者</Tag>;
      case 2:
        return <Tag color="green">工商企业</Tag>;
      case 3:
        return <Tag color="yellow">其他</Tag>;
      default:
        return '';
    }
  };

  /**
   * 界面渲染
   */
  render() {
    const {
      shopMallStore: { formData },
    } = this.props;
    let headerImgUrl = null;
    let headerImgUrlfading = null;
    let headerImgUrlgere = null;
    let headerImgUrlgereone = null;
    if (formData.logo) {
      headerImgUrl = formData.logo;
    } else {
      headerImgUrl = '/s/defaultphoto/http.png';
    }
    if (formData.business_license_photo) {
      headerImgUrlfading = formData.business_license_photo;
    } else {
      headerImgUrlfading = '/s/defaultphoto/http.png';
    }
    if (formData.legal_idcard_positive) {
      headerImgUrlgere = formData.legal_idcard_positive;
      headerImgUrlgereone = formData.legal_idcard_reverse;
    } else {
      headerImgUrlgere = '/s/defaultphoto/http.png';
    }

    const footerJsx = [
      <Button key="close" onClick={this.props.onShopInfoFrameCloseCallback}>
        关闭
      </Button>,
    ];
    const resultJsx = (
      <Modal
        className={styles.frame}
        visible
        title="商铺详情"
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.onShopInfoFrameCloseCallback}
        footer={footerJsx}
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
                <span>{formData.name}</span>
                <span>
                  商铺联系人：
                  {formData.contacter}
                </span>
                <span>
                  商铺电话：
                  {formData.phone}
                </span>
              </div>
            </div>
            <div className={styles.form} style={{ marginTop: 25 }}>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="是否属于园区内商铺">
                  {formData.is_belong_park === 1 ? '是' : '否'}
                </Description>
                <Description term="商铺编号">{formData.code}</Description>
                <Description term="商铺名称">{formData.name}</Description>
                <Description term="商铺品牌">
                  {formData.brand !== '' ? formData.brand : formData.name}
                </Description>
              </DescriptionList>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="商铺地址">{formData.address}</Description>

                <Description term="商铺分类">
                  {
                    <DicShow
                      pcode="mall$#storeclass"
                      code={[formData.category]}
                      show={name}
                    />
                  }
                </Description>
              </DescriptionList>
            </div>
          </Card>
          <Card title="经营单位基本信息" bordered={false}>
            <div className={styles.form}>
              <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
                <Description term="统一社会信用代码">
                  {formData.business_license}
                </Description>
                {/* <Description term="经营单位名称">{formData.business_name}</Description> */}
                <Description term="经营单位类型">
                  {this.RenderStatus(formData.business_unit_type)}
                </Description>
              </DescriptionList>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="法定代表人">{formData.legal_name}</Description>
                {/* <Description term="经营范围">{formData.business_scope}</Description> */}
              </DescriptionList>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }} col={1}>
                <Description term="营业执照有效期">
                  {formData.business_license_start && formData.business_license_start !== ''
                    ? parseUtcTime(formData.business_license_start, 'YYYY-MM-DD')
                    : ''}
                  &nbsp;至&nbsp;
                  {formData.business_license_end === '长期有效'
                    ? '长期有效'
                    : parseUtcTime(formData.business_license_end, 'YYYY-MM-DD')}
                </Description>
              </DescriptionList>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="法定代表人信息">
                  <div style={{ display: 'flex' }}>
                    {headerImgUrlgere && (
                      // eslint-disable-next-line react/react-in-jsx-scope
                      <div
                        className={styles.formImage}
                        style={{ width: 248, height: 160, marginLeft: 20 }}
                      >
                        <img
                          src={headerImgUrlgere}
                          alt="身份证"
                          onClick={() => this.shouBigImagefading(headerImgUrlgere)}
                        />
                      </div>
                    )}
                    {headerImgUrlgereone && (
                      <div
                        className={styles.formImage}
                        style={{ width: 248, height: 160, marginLeft: 20 }}
                      >
                        <img
                          src={headerImgUrlgereone}
                          alt="身份证"
                          onClick={() => this.shouBigImagefading(headerImgUrlgereone)}
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
                <Description term="营业资格证书">
                  <div
                    className={styles.formImage}
                    style={{ width: 147, height: 147, marginLeft: 20 }}
                  >
                    <img
                      src={formData.qualification_certificate}
                      alt="营业执照"
                      onClick={() => this.shouBigImageyingye(formData.qualification_certificate)}
                    />
                  </div>
                </Description>
              </DescriptionList>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="申请状态">
                  {<DicShow pcode="mall$#shopstate" code={[formData.status]} show={name} />}
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
        {this.state.bigImagefading ? (
          <div className={styles.popoverbackdrop} onClick={() => this.hideBigImagefading()}>
            <img className={styles.imgresponsive} src={this.state.ShowUrlfading} alt="查看失败" />
          </div>
        ) : null}
      </Modal>
    );
    return resultJsx;
  }
}
