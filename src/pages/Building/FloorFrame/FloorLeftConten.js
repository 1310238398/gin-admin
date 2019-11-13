import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './FloorFrame.less';
import { parseBuildingStatusText } from '../../../utils/utils';
// import finishsold from '../../../assets/finishsold@2x.png';
// import finishrealse from '../../../assets/finishrealse@2x.png';

@connect(state => ({
  parklist: state.parklist,
}))
class FloorLeftConten extends PureComponent {
  state = {};

  componentDidMount() {
    this.props.dispatch({
      type: 'parklist/queryParkList',
    });
  }

  stateFloor = state => {
    switch (state.sales_status) {
      case 10:
        return `${styles.ueseFloor}`;
      case 20:
        return `${styles.FloorList}`;
      case 21:
        return `${styles.FloorList}`;
      case 22:
        return `${styles.FloorList}`;
      case 30:
        return `${styles.soldFloors}`;
      case 31:
        return `${styles.soldFloors}`;
      case 32:
        return `${styles.soldFloors}`;
      case 40:
        return `${styles.solduse}`;
      case 41:
        return `${styles.solduse}`;
      default:
        return '';
    }
  };

  stateFloorName = state => {
    switch (state.sales_status) {
      case 10:
        return `${styles.ueseFloorstate}`;
      case 20:
        return `${styles.FloorListstate}`;
      case 21:
        return `${styles.FloorListstate}`;
      case 22:
        return `${styles.FloorListstate}`;
      case 30:
        return `${styles.soldFloorsstate}`;
      case 31:
        return `${styles.soldFloorsstate}`;
      case 32:
        return `${styles.soldFloorsstate}`;
      case 40:
        return `${styles.soldusestate}`;
      case 41:
        return `${styles.soldusestate}`;
      default:
        return '';
    }
  };

  stateName = state => {
    switch (state.sales_status) {
      case 10:
        return '自用';
      case 20:
        return '整售';
      case 21:
        return '分售';
      case 22:
        return '待售';
      case 30:
        return '整租';
      case 31:
        return '分租';
      case 32:
        return '待租';
      case 40:
        return '已租售';
      case 41:
        return '待租售';
      default:
        return '';
    }
  };

  clickFloor = item => {
    this.props.onlayerDetail(item);
  };

  render() {
    const { onTypeList } = this.props;
    return (
      <div className={styles.Floorlefttop}>
        <div className={styles.Floortopstyle}>
          <p className={styles.floor_Left_top}>楼层</p>
          {/* <p className={styles.typeLine}>
            出售
            <span className={styles.soldState} />
          </p>
          <p className={styles.typeLine}>
            出租
            <span className={styles.leaseState} />
          </p>
          <p className={styles.typeLinesold}>
            租售
            <span className={styles.rentState} />
          </p> */}
        </div>
        <div>
          {onTypeList &&
            onTypeList.map(item => {
              return (
                // <div
                //   className={this.stateFloor(item)}
                //   onClick={() => this.clickFloor(item)}
                //   key={item.name}
                // >
                //   <span className={styles.FLoorNameT}>{item.name}</span>
                //   <span className={this.stateFloorName(item)}>{this.stateName(item)}</span>
                //   {item.sales_status === 20 ? (
                //     <span>
                //       <img src={finishsold} className={styles.floorImg} alt="" />
                //     </span>
                //   ) : null}
                //   {item.sales_status === 30 ? (
                //     <span>
                //       <img src={finishrealse} className={styles.floorImg} alt="" />
                //     </span>
                //   ) : null}
                //   {item.sales_status === 40 ? (
                //     <span>
                //       <img src={finishrealse} className={styles.floorImg} alt="" />
                //       <img src={finishsold} className={styles.floorImgone} alt="" />
                //     </span>
                //   ) : null}
                //   <span className={styles.arrows} />
                // </div>
                <div
                  className={styles.houqiFloor}
                  onClick={() => this.clickFloor(item)}
                  key={item.name}
                >
                  <span className={styles.FLoorNameT}>{item.name}</span>
                  <span className={styles.ueseFloorstatehouqi}>
                    {parseBuildingStatusText(item)}
                  </span>
                  <span className={styles.arrows} />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
export default FloorLeftConten;
