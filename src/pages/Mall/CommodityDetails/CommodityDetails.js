import React, { PureComponent } from 'react';

import { Modal, Button, Tag, Row, Col, Divider } from 'antd';
// import TableList from '../../../components/TableList';
import { connect } from 'dva';
import styles from './CommodityDetails.less';
import SpecificationTable from './SpecificationTable';
// const { TabPane } = Tabs;
@connect(state => ({
  commodityManagement: state.commodityManagement,
}))
export default class CommodityDetails extends PureComponent {
  state = {
    bigImage: false,
    ShowUrl: null,
  };

  componentDidMount() {}

  statusRender = status => {
    switch (status) {
      case 1:
        return <Tag color="blue">上架</Tag>;
      case 2:
        return <Tag color="green">下架</Tag>;
      case 3:
        return <Tag color="red">禁售</Tag>;
      default:
        return '';
    }
  };

  DeliverystatusRender = status => {
    return status ? <Tag color="green">配送</Tag> : <Tag color="red">不配送</Tag>;
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

  /**
   * 界面渲染
   */
  render() {
    // let headerImgUrl = null;
    const { data, visible } = this.props;
    const footerJsx = [
      <Button key="close" onClick={this.props.onShopInfoFrameCloseCallback}>
        关闭
      </Button>,
    ];

    const resultJsx = (
      <Modal
        className={styles.frame}
        width={1000}
        visible={visible}
        title="商品详情"
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.onShopInfoFrameCloseCallback}
        footer={footerJsx}
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        <div className={styles.divBox}>
          <span className={styles.title}>商品名称：</span>
          <div className={styles.content}>{data.name ? data.name : ''}</div>
        </div>
        <div className={styles.divBox}>
          <span className={styles.title}>商品分类：</span>
          <div className={styles.content}>{data.category_name ? data.category_name : ''}</div>
        </div>
        <div className={styles.divBox}>
          <span className={styles.title}>所属店铺：</span>
          <div className={styles.content}>{data.store_name ? data.store_name : ''}</div>
        </div>
        <div className={styles.divBox}>
          <span className={styles.title}>推荐值：</span>
          <div className={styles.content}>{data.recommend_num ? data.recommend_num : 0}</div>
        </div>
        <div className={styles.divBox}>
          <span className={styles.title}>商品描述：</span>
          <div className={styles.contentDes}>{data.des ? data.des : ''}</div>
        </div>
        <div className={styles.divBox}>
          <span className={styles.title}>商品描述图片：</span>
          {data.images &&
            data.images.map(item => {
              return (
                <div className={styles.titleo1}>
                  <img
                    src={item}
                    className={styles.headImage}
                    onClick={() => this.shouBigImage(item)}
                    alt="图片"
                  />
                </div>
              );
            })}
        </div>
        <div className={styles.divBox}>
          <span className={styles.title}>是否配送：</span>
          <div className={styles.content}>
            {data.delivery ? this.DeliverystatusRender(data.delivery) : ''}
          </div>
        </div>
        <div className={styles.divBox}>
          <span className={styles.title}>商品状态：</span>
          <div className={styles.content}>
            {data.goods_status ? this.statusRender(data.goods_status) : ''}
          </div>
        </div>
        <Divider />
        <Row>
          <Col span={4} className={styles.formTitle}>
            价格库存
          </Col>
        </Row>
        <table
          style={{
            width: '99%',
          }}
        >
          <tbody>
            <tr>
              <td className={styles.title}>商品规格：</td>
              <div className={styles.formBorder}>
                <tr>
                  <td className={styles.title}>规格名：</td>
                  <td colSpan={6}>{data.norm_name ? data.norm_name : ''}</td>
                </tr>
                <tr>
                  <td className={styles.title}>规格值：</td>
                  <td colSpan={6}>{data.norm_value ? data.norm_value : ''}</td>
                </tr>
              </div>
            </tr>
            <tr>
              <td className={styles.title}>规格明细：</td>
              <div className={styles.formBorder}>
                <SpecificationTable
                  sname={data.norm_name}
                  data={data.norm_list ? data.norm_list : ''}
                />
              </div>
            </tr>
          </tbody>
        </table>
        {this.state.bigImage ? (
          <div className={styles.popoverbackdrop} onClick={() => this.hideBigImage()}>
            <img className={styles.imgresponsive} src={this.state.ShowUrl} alt="图片" />
          </div>
        ) : null}
      </Modal>
    );
    return resultJsx;
  }
}
