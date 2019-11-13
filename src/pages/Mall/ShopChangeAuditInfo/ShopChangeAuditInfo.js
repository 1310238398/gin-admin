import React, { PureComponent } from 'react';
import { Modal, Tag, Button } from 'antd';
import { formatTimestamp, parseUtcTime } from '../../../utils/utils';
import styles from './ShopChangeAuditInfo.less';

export default class ShopChangeAuditInfo extends PureComponent {
  state = {
    bigImage: false,
    ShowUrl: null,
    bigImageafter: false,
    ShowUrlafter: null,
    bigImagebefore: false,
    ShowUrlbefore: null,
    bigImagebeforeid: false,
  };

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

  membercutRender = status => {
    switch (status) {
      case 1:
        return <Tag color="blue">不参与</Tag>;
      case 2:
        return <Tag color="green">参与</Tag>;
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

  hideBigImage() {
    this.setState({
      bigImage: false,
    });
  }

  shouBigImageAfter(event) {
    this.setState({
      ShowUrlafter: event,
      bigImageafter: true,
    });
  }

  hideBigImageAfter() {
    this.setState({
      bigImageafter: false,
    });
  }

  shouBigImagebefore(event) {
    this.setState({
      ShowUrlbefore: event,
      bigImagebefore: true,
    });
  }

  // shouBigImagebeforeId(event) {
  //   this.setState({
  //     ShowUrlbeforeid: event,
  //     bigImagebeforeid: true,
  //   });
  // }

  hideBigImagebefore() {
    this.setState({
      bigImagebefore: false,
    });
  }

  hideBigImagebeforeId() {
    this.setState({
      bigImagebeforeid: false,
    });
  }
  // //挂起
  // onBtnHangupOffClick = () => {
  //     const { onShopInfoFrameCloseCallback, onHangupCallback, data } = this.props;
  //     Modal.confirm({
  //         title: '操作确认',
  //         content: "确定要挂起此商铺？",
  //         okType: 'danger',
  //         okText: '确定',
  //         cancelText: '取消',
  //         onOk() {
  //             onHangupCallback(data);
  //             // 关闭窗口
  //             onShopInfoFrameCloseCallback();
  //         }
  //     });
  // }

  /**
   * 界面渲染
   */
  render() {
    const { data } = this.props;
    let oldheaderImgUrl = null;
    let oldlicenseimage = null;
    let oldpersionalidimageone = null;
    let oldpersionalidimagetwo = null;
    let headerImgUrl = null;
    let licenseimage = null;
    let persionalidimage = null;
    let persionalidimageone = null;

    if (data.old_portrait) {
      oldheaderImgUrl = data.old_portrait;
    } else {
      oldheaderImgUrl = '/s/mall/noimage.jpg';
    }

    if (data.old_license_image) {
      oldlicenseimage = data.old_license_image;
    } else {
      oldlicenseimage = '/s/mall/noimage.jpg';
    }
    if (data.old_persional_id_image) {
      oldpersionalidimageone = data.old_persional_id_image.split(',')[0];
      oldpersionalidimagetwo = data.old_persional_id_image.split(',')[1];
    } else {
      oldpersionalidimageone = '/s/mall/noimage.jpg';
      oldpersionalidimagetwo = '/s/mall/noimage.jpg';
    }
    if (data.portrait) {
      headerImgUrl = data.portrait;
    } else {
      headerImgUrl = '/s/mall/noimage.jpg';
    }

    if (data.license_image) {
      licenseimage = data.license_image;
    } else {
      licenseimage = '/s/mall/noimage.jpg';
    }
    if (data.persional_id_image) {
      persionalidimage = data.persional_id_image.split(',')[0];
      persionalidimageone = data.persional_id_image.split(',')[1];
    } else {
      persionalidimage = '/s/mall/noimage.jpg';
      persionalidimageone = '/s/mall/noimage.jpg';
    }
    const footerJsx = [
      <Button key="close" onClick={this.props.onShopInfoFrameCloseCallback}>
        关闭
      </Button>,
      // <Button key="writeoff" type="danger" onClick={this.onBtnHangupOffClick}>挂起</Button>
    ];

    const resultJsx = (
      <Modal
        className={styles.frame}
        visible
        title="店铺变更审核"
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.onShopInfoFrameCloseCallback}
        footer={footerJsx}
      >
        <table style={{ width: '100%', border: 1 }}>
          <tbody>
            <tr>
              <td className={styles.title}>店铺基本信息</td>
              <td className={styles.title}>修改前</td>
              <td className={styles.title}>修改后</td>
            </tr>
            <tr>
              <td className={styles.title}>店铺编号：</td>
              <td className={styles.title}>{data.old_store_code}</td>
              <td className={styles.title}>{data.store_code}</td>
            </tr>
            <tr>
              <td className={styles.title}>店铺名称：</td>
              <td className={styles.title}>{data.old_name}</td>
              <td className={styles.title}>{data.name}</td>
            </tr>
            <tr>
              <td className={styles.title}>计租面积：</td>
              <td className={styles.title}>{data.old_rent_area ? data.old_rent_area : null}㎡</td>
              <td className={styles.title}>{data.rent_area ? data.rent_area : null}㎡</td>
            </tr>
            <tr>
              <td className={styles.title}>业态：</td>
              <td className={styles.title}>{data.old_store_type ? data.old_store_type : null}</td>
              <td className={styles.title}>{data.store_type ? data.store_type : null}</td>
            </tr>
            <tr>
              <td className={styles.title}>商铺品牌：</td>
              <td className={styles.title}>{data.old_brand !== '' ? data.old_brand : data.name}</td>
              <td className={styles.title}>{data.brand !== '' ? data.brand : data.name}</td>
            </tr>
            <tr>
              <td className={styles.title}>商铺电话：</td>
              <td className={styles.title}>
                {data.old_store_tel !== '' ? data.old_store_tel : null}
              </td>
              <td className={styles.title}>{data.store_tel !== '' ? data.store_tel : null}</td>
            </tr>
            <tr>
              <td className={styles.title}>商铺管理员：</td>
              <td className={styles.title}>
                {data.old_applicant_name !== '' ? data.old_applicant_name : null}
              </td>
              <td className={styles.title}>
                {data.applicant_name !== '' ? data.applicant_name : null}
              </td>
            </tr>
            <tr>
              <td className={styles.title}>联系人电话：</td>
              <td className={styles.title}>
                {data.old_applicant_tel !== '' ? data.old_applicant_tel : null}
              </td>
              <td className={styles.title}>
                {data.applicant_tel !== '' ? data.applicant_tel : null}
              </td>
            </tr>
            <tr>
              <td className={styles.title}>商铺地址：</td>
              <td className={styles.title}>
                {data.old_business_address !== '' ? data.old_business_address : null}
              </td>
              <td className={styles.title}>
                {data.business_address !== '' ? data.business_address : null}
              </td>
            </tr>
            <tr>
              <td className={styles.title}>营业开始时间：</td>
              <td className={styles.title}>
                {data.old_open_time !== '' ? data.old_open_time : null}
              </td>
              <td className={styles.title}>{data.open_time !== '' ? data.open_time : null}</td>
            </tr>
            <tr>
              <td className={styles.title}>营业结束时间：</td>
              <td className={styles.title}>
                {data.old_close_time !== '' ? data.old_close_time : null}
              </td>
              <td className={styles.title}>{data.close_time !== '' ? data.close_time : null}</td>
            </tr>
            <tr>
              <td className={styles.title}>店铺基本信息</td>
              <td className={styles.title}>修改前</td>
              <td className={styles.title}>修改后</td>
            </tr>
            <tr>
              <td className={styles.title}>统一社会信用代码：</td>
              <td className={styles.title}>
                {data.old_credit_code !== '' ? data.old_credit_code : null}
              </td>
              <td className={styles.title}>{data.credit_code !== '' ? data.credit_code : null}</td>
            </tr>
            <tr>
              <td className={styles.title}>经营单位名称：</td>
              <td className={styles.title}>
                {data.old_corporation !== '' ? data.old_corporation : null}
              </td>
              <td className={styles.title}>{data.corporation !== '' ? data.corporation : null}</td>
            </tr>
            <tr>
              <td className={styles.title}>经营单位类型：</td>
              <td className={styles.title}>
                {data.old_corporation_type === 1 ? '个体营业者' : '工商企业'}
              </td>
              <td className={styles.title}>
                {data.corporation_type === 1 ? '个体营业者' : '工商企业'}
              </td>
            </tr>
            <tr>
              <td className={styles.title}>法定代表人：</td>
              <td className={styles.title}>
                {data.old_legal_persion ? data.old_legal_persion : null}
              </td>
              <td className={styles.title}> {data.legal_persion ? data.legal_persion : null}</td>
            </tr>
            <tr>
              <td className={styles.title}>经营范围：</td>
              <td
                className={styles.title}
                title={data.old_business_scope ? data.old_business_scope : null}
              >
                {data.old_business_scope ? data.old_business_scope : null}
              </td>
              <td className={styles.title} title={data.business_scope ? data.business_scope : null}>
                {data.business_scope ? data.business_scope : null}
              </td>
            </tr>
            <tr>
              <td className={styles.title}>营业执照有效期：</td>
              <td className={styles.title}>
                {data.old_issue_time && data.old_issue_time !== ''
                  ? parseUtcTime(data.old_issue_time, 'YYYY-MM-DD')
                  : ''}
                &nbsp;至&nbsp;
                {data.old_expiration_time}
              </td>
              <td className={styles.title}>
                {data.issue_time && data.issue_time !== ''
                  ? parseUtcTime(data.issue_time, 'YYYY-MM-DD')
                  : ''}
                &nbsp;至&nbsp;
                {data.expiration_time}
              </td>
            </tr>
            <tr>
              <td className={styles.title}>法定代表人信息：</td>
              <td className={styles.title}>
                <img
                  alt="头像"
                  src={oldpersionalidimageone}
                  className={styles.headImage}
                  onClick={() => this.shouBigImageAfter(oldpersionalidimageone)}
                />
                <img
                  alt="头像"
                  src={oldpersionalidimagetwo}
                  className={styles.headImage}
                  onClick={() => this.shouBigImageAfter(oldpersionalidimagetwo)}
                />
              </td>
              <td className={styles.title}>
                <img
                  alt="头像"
                  src={persionalidimage}
                  className={styles.headImage}
                  onClick={() => this.shouBigImageAfter(persionalidimage)}
                />
                <img
                  alt="头像"
                  src={persionalidimageone}
                  className={styles.headImage}
                  onClick={() => this.shouBigImageAfter(persionalidimageone)}
                />
              </td>
            </tr>
            <tr>
              <td className={styles.title}>营业执照：</td>
              <td className={styles.title}>
                <img
                  alt="头像"
                  src={oldlicenseimage}
                  className={styles.headImage}
                  onClick={() => this.shouBigImage(oldlicenseimage)}
                />
              </td>
              <td className={styles.title}>
                <img
                  alt="头像"
                  src={licenseimage}
                  className={styles.headImage}
                  onClick={() => this.shouBigImage(licenseimage)}
                />
              </td>
            </tr>
            <tr>
              <td className={styles.title}>店铺Logo：</td>
              <td className={styles.title}>
                <img alt="头像" src={oldheaderImgUrl} className={styles.headImage} />
              </td>
              <td className={styles.title}>
                <img alt="头像" src={headerImgUrl} className={styles.headImage} />
              </td>
            </tr>
            <tr>
              <td className={styles.title}>平台会员优惠：</td>
              <td className={styles.title}>{this.membercutRender(data.old_member_cut)}</td>
              <td className={styles.title}>{this.membercutRender(data.member_cut)}</td>
            </tr>
          </tbody>
        </table>
        <div style={{ borderTop: '1px solid #ccc' }}>
          申请时间： {data.created === 0 ? '' : formatTimestamp(data.created)}
          审核状态：
          {this.statusRender(data.application_status)}
          通过/拒绝时间：
          {data.updated === 0 ? '' : formatTimestamp(data.updated)}
        </div>
        {this.state.bigImagebefore ? (
          <div className={styles.popoverbackdrop} onClick={() => this.hideBigImagebefore()}>
            <img className={styles.imgresponsive} src={this.state.ShowUrlbefore} alt="查看失败" />
          </div>
        ) : null}
        {this.state.bigImagebeforeid ? (
          <div className={styles.popoverbackdrop} onClick={() => this.hideBigImagebeforeId()}>
            <img
              className={styles.imgresponsive}
              src={this.state.shouBigImagebeforeId}
              alt="查看失败"
            />
          </div>
        ) : null}
        {this.state.bigImage ? (
          <div className={styles.popoverbackdrop} onClick={() => this.hideBigImage()}>
            <img className={styles.imgresponsive} src={this.state.ShowUrl} alt="查看失败" />
          </div>
        ) : null}
        {this.state.bigImageafter ? (
          <div className={styles.popoverbackdrop} onClick={() => this.hideBigImageAfter()}>
            <img className={styles.imgresponsive} src={this.state.ShowUrlafter} alt="查看失败" />
          </div>
        ) : null}
      </Modal>
    );
    return resultJsx;
  }
}
