/* eslint-disable react/react-in-jsx-scope */
import React, { PureComponent } from 'react';
import { Modal, Tag, Button, Avatar, Card } from 'antd';
import { parseUtcTime } from '../../../utils/utils';
import DescriptionList from '../../../components/DescriptionList';
import styles from './StoreManageInfo.less';

const { Description } = DescriptionList;
export default class StoreManageInfo extends PureComponent {
  state = {
    bigImage: false,
    ShowUrl: null,
    bigImageyingye: false,
    ShowUrlyingye: null,
    bigImagefading: false,
    ShowUrlfading: null,
  };

  statusRender = status => {
    switch (status) {
      case 1:
        return <Tag color="blue">正常</Tag>;
      case 2:
        return <Tag color="green">歇业</Tag>;
      case 3:
        return <Tag color="red">挂起</Tag>;
      default:
        return '';
    }
  };

  tranSchange = value => {
    return value !== '' ? parseFloat(value).toFixed(2) : '';
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

  /**
   * 界面渲染
   */
  render() {
    const { data } = this.props;
    let headerImgUrl = null;
    let headerImgUrlfading = null;
    let headerImgUrlgere = null;
    const headerImgUrlgereone = null;
    if (data.portrait) {
      headerImgUrl = data.portrait;
    } else {
      headerImgUrl = '/s/defaultphoto/http.png';
    }
    if (data.license_image) {
      headerImgUrlfading = data.license_image;
    } else {
      headerImgUrlfading = '/s/defaultphoto/http.png';
    }
    if (data.persional_id_image) {
      [headerImgUrlgere][0] = data.persional_id_image.split(',');
      [headerImgUrlgereone][1] = data.persional_id_image.split(',');
    } else {
      headerImgUrlgere = '/s/defaultphoto/http.png';
    }

    const footerJsx = [
      <Button key="close" onClick={this.props.onShopInfoFrameCloseCallback}>
        关闭
      </Button>,
      <Button key="writeoff" type="danger" onClick={this.onBtnHangupOffClick}>
        挂起
      </Button>,
    ];
    const footerJsxqx = [
      <Button key="close" onClick={this.props.onShopInfoFrameCloseCallback}>
        关闭
      </Button>,
      <Button key="writeoff" type="danger" onClick={this.onBtnCancleOffClick}>
        取消挂起
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
        footer={data.store_status === 1 || data.store_status === 2 ? footerJsx : footerJsxqx}
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
                <Description term="计租面积">{this.tranSchange(data.rent_area)}㎡</Description>
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
              </DescriptionList>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="申请状态">{this.statusRender(data.store_status)}</Description>
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
