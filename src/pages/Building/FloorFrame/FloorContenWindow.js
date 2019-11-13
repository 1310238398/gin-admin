import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import styles from './FloorContenWindow.less';

@connect(state => ({
  building: state.building,
}))
class FloorContenWindow extends PureComponent {
  state = {};

  componentWillMount() {
    // 查看详情
    const { id } = this.props;
    this.props.dispatch({
      type: 'building/queryTypeDetail',
      payload: id,
      buildingType: 'plateNum',
    });
  }

  onCloseWin = () => {
    const { callback } = this.props;
    callback();
  };

  render() {
    const {
      building: { plateNumDetail },
    } = this.props;

    return (
      <Modal
        visible
        footer={null}
        title={null}
        onCancel={this.onCloseWin}
        width={873}
        className="lightModal"
      >
        <div className={styles.FloorContentWin}>
          <div className={styles.Floorwin}>
            {plateNumDetail.park ? plateNumDetail.park.name : ''}
          </div>
          <div className={styles.FloorWinDetail}>
            <p className={styles.FloorWinDetailTop}>
              {plateNumDetail.name?plateNumDetail.name:''}
            </p>
            <div className={styles.FloorWinDatailInfo}>
              <p className={styles.FloorWcontInfo}>建筑信息</p>
              <div className={styles.FloorcontArea}>
                <div className={styles.FloorContetContru}>
                  <p className={styles.contruArea}>建筑面积</p>
                  <p className={styles.contruAreaData}>{plateNumDetail.floor_area}</p>
                </div>
                <p className={styles.ContruLine} />
                <div className={styles.FloorContetContru}>
                  <p className={styles.contruArea}>使用面积</p>
                  <p className={styles.contruAreaData}>{plateNumDetail.usage_area}</p>
                </div>
                <p className={styles.ContruLine} />
                <div className={styles.FloorContetContru}>
                  <p className={styles.contruArea}>计费面积</p>
                  <p className={styles.contruAreaData}>{plateNumDetail.billing_area}</p>
                </div>
              </div>
            </div>
            {plateNumDetail.building_sale ? (
              <div className={styles.FloorWinDatailInfo}>
                <p className={styles.FloorWcontInfo}>产权方信息</p>
                <div className={styles.FloorcontArea}>
                  <div className={styles.FloorContetContru}>
                    <p className={styles.contruArea}>入驻企业名称</p>
                    <p className={styles.contruAreaData}>{plateNumDetail.building_sale&&plateNumDetail.building_sale.owner_name?plateNumDetail.building_sale.owner_name:''}</p>
                  </div>
                  <p className={styles.ContruLine} />
                  <div className={styles.FloorContetContru}>
                    <p className={styles.contruArea}>产权方姓名</p>
                    <p className={styles.contruAreaData}>
                      {plateNumDetail.building_sale.contacter}
                    </p>
                  </div>
                  <p className={styles.ContruLine} />
                  <div className={styles.FloorContetContru}>
                    <p className={styles.contruArea}>产权方联系方式</p>
                    <p className={styles.contruAreaData}>
                      {plateNumDetail.building_sale.contact_tel}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
            {plateNumDetail.building_rental ? (
              <div className={styles.FloorWinDatailInfo}>
                <p className={styles.FloorWcontInfo}>使用方信息</p>
                <div className={styles.FloorcontArea}>
                  <div className={styles.FloorContetContru}>
                    <p className={styles.contruArea}>入驻企业名称</p>
                    <p className={styles.contruAreaData}>{plateNumDetail.enterprise&&plateNumDetail.enterprise.name?plateNumDetail.enterprise.name:''}</p>
                  </div>
                  <p className={styles.ContruLine} />
                  <div className={styles.FloorContetContru}>
                    <p className={styles.contruArea}>使用方姓名</p>
                    <p className={styles.contruAreaData}>
                      {plateNumDetail.building_rental.contacter}
                    </p>
                  </div>
                  <p className={styles.ContruLine} />
                  <div className={styles.FloorContetContru}>
                    <p className={styles.contruArea}>使用方联系方式</p>
                    <p className={styles.contruAreaData}>
                      {plateNumDetail.building_rental.contact_tel}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Modal>
    );
  }
}
export default FloorContenWindow;
