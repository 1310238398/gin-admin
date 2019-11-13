import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './FloorFrame.less';
import iconedit from '../../../assets/icon-edit@2x.png';
import FloorContentInfoEdit from './FloorContentInfoEdit';

@connect(state => ({
  building: state.building,
}))
class FloorTopContent extends PureComponent {
  state = {
    dataInfo: false,
    infoId: null,
    InfoType: null,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'parklist/queryParkList',
    });
  }

  // 规划用途: 1:出售 2:自持 3:混合
  planPurpose = status => {
    switch (status) {
      case 1:
        return '出售';
      case 2:
        return '自持';
      case 3:
        return '混合';
      default:
        return '';
    }
  };

  onDataInfoCallback = () => {
    this.setState({
      dataInfo: false,
      infoId: null,
      InfoType: null,
    });
  };

  onSaveInfoCallback = data => {
    this.props.dispatch({
      type: 'building/submit',
      payload: data,
    });
    this.onDataInfoCallback();
  };

  EditFloor = (type, value) => {
    this.setState({
      dataInfo: true,
      infoId: value,
      InfoType: type,
    });
  };

  renderDataInfo = () => {
    if (this.state.dataInfo) {
      return (
        <FloorContentInfoEdit
          infoId={this.state.infoId}
          callback={this.onDataInfoCallback}
          visible
          infoType={this.state.InfoType}
          onSubmit={this.onSaveInfoCallback}
        />
      );
    }
  };

  renderRare = (val1, val2) => {
    if (val2 !== 0) {
      return `${(val1 / val2).toFixed(2) * 100}%`;
    } else {
      return '0%';
    }
  };

  renderSub = (val1, val2) => {
    return val1 - val2 !== 0 ? (val1 - val2).toFixed(2) : 0;
  };

  renderSubnum = (val1, val2) => {
    return val1 - val2 !== 0 ? val1 - val2 : 0;
  };

  render() {
    const { ontypeDetail } = this.props;
    return (
      <div className={styles.Floortop}>
        <div className={styles.Floor}>
          <div className={styles.FloorName}>
            <span>
              {ontypeDetail.name}
              <img
                src={iconedit}
                alt="logo"
                onClick={() => this.EditFloor('floor', ontypeDetail.record_id)}
              />
            </span>
          </div>
          <div>
            <span className={styles.planPurpose}>规划用途</span>
            <span className={styles.useState}>{this.planPurpose(ontypeDetail.planned_use)}</span>
            <span className={styles.planPurpose}>建筑面积</span>
            <span className={styles.useState}>
              {ontypeDetail.floor_area ? ontypeDetail.floor_area.toFixed(2) : 0}m2
            </span>
            <span className={styles.planPurpose}>使用面积</span>
            <span className={styles.useState}>
              {ontypeDetail.usage_area ? ontypeDetail.usage_area.toFixed(2) : 0}m2
            </span>
          </div>
        </div>
        <div className={styles.dataArea}>
          {/* 出售情况 */}
          <div className={styles.dataSold}>
            <div className={styles.dataSoldOP}>
              <p className={styles.sellArea}>出售面积</p>
              <p className={styles.sellAreaData}>
                {ontypeDetail.saled_area ? ontypeDetail.saled_area.toFixed(2) : 0}m2
              </p>
            </div>
            <div className={styles.soldDataop}>
              <p className={styles.sellRate}>
                出售率
                <span>
                  {this.renderRare(ontypeDetail.saled_area, ontypeDetail.total_sale_area)}
                </span>
              </p>
              <p className={styles.sellRate}>
                已售
                <span>{ontypeDetail.saled_area ? ontypeDetail.saled_area.toFixed(2) : 0}m2</span>
              </p>
              <p className={styles.sellRate}>
                未售
                <span>
                  {this.renderSub(ontypeDetail.total_sale_area, ontypeDetail.saled_area)}m2
                </span>
              </p>
            </div>
            <div className={styles.sellline} />
          </div>
          {/* 门牌数量 */}
          <div className={styles.dataSold}>
            <div className={styles.dataSoldOP}>
              <p className={styles.sellArea}>门牌数量</p>
              <p className={styles.sellAreaData}>{ontypeDetail.total_sale_house_num}</p>
            </div>
            <div className={styles.soldDataop}>
              <p className={styles.sellRate}>
                出售率
                <span>
                  {this.renderRare(ontypeDetail.saled_house_num, ontypeDetail.total_sale_house_num)}
                </span>
              </p>
              <p className={styles.sellRate}>
                已售<span>{ontypeDetail.saled_house_num}间</span>
              </p>
              <p className={styles.sellRate}>
                未售
                <span>
                  {this.renderSubnum(
                    ontypeDetail.total_sale_house_num,
                    ontypeDetail.saled_house_num
                  )}
                  间
                </span>
              </p>
            </div>
            <div className={styles.sellline} />
          </div>
          {/* 出租数量 */}
          <div className={styles.dataSold}>
            <div className={styles.dataSoldOP}>
              <p className={styles.sellArea}>出租面积</p>
              <p className={styles.leaseData}>
                {ontypeDetail.total_rental_area ? ontypeDetail.total_rental_area.toFixed(2) : 0}m2
              </p>
            </div>
            <div className={styles.soldDataop}>
              <p className={styles.leaseRate}>
                出租率
                <span>
                  {this.renderRare(ontypeDetail.rentaled_area, ontypeDetail.total_rental_area)}
                </span>
              </p>
              <p className={styles.leaseRate}>
                已租
                <span>
                  {ontypeDetail.rentaled_area ? ontypeDetail.rentaled_area.toFixed(2) : 0}m2
                </span>
              </p>
              <p className={styles.leaseRate}>
                未租
                <span>
                  {this.renderSub(ontypeDetail.total_rental_area, ontypeDetail.rentaled_area)}m2
                </span>
              </p>
            </div>
            <div className={styles.sellline} />
          </div>
          {/* 门牌数量 */}
          <div className={styles.dataLease}>
            <div className={styles.dataSoldOP}>
              <p className={styles.sellArea}>门牌数量</p>
              <p className={styles.leaseData}>{ontypeDetail.total_rental_house_num}间</p>
            </div>
            <div className={styles.soldDataop}>
              <p className={styles.leaseRate}>
                出租率
                <span>
                  {this.renderRare(
                    ontypeDetail.rentaled_house_num,
                    ontypeDetail.total_rental_house_num
                  )}
                </span>
              </p>
              <p className={styles.leaseRate}>
                已租<span>{ontypeDetail.rentaled_house_num}间</span>
              </p>
              <p className={styles.leaseRate}>
                未租
                <span>
                  {this.renderSubnum(
                    ontypeDetail.total_rental_house_num,
                    ontypeDetail.rentaled_house_num
                  )}
                  间
                </span>
              </p>
            </div>
          </div>
        </div>
        {this.renderDataInfo()}
      </div>
    );
  }
}
export default FloorTopContent;
