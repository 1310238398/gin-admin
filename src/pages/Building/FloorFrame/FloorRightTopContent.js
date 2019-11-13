import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './FloorRightContent.less';
import iconedit from '../../../assets/icon-edit@2x.png';
import FloorContentInfoEdit from './FloorContentInfoEdit';

@connect(state => ({
  building: state.building,
}))
class FloorRightTopContent extends PureComponent {
  state = {
    dataInfo: false,
    infoId: null,
    InfoType: null,
  };

  componentDidMount() {}

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

  Editlayer = (type, value) => {
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
    const { onLayerDetailone } = this.props;
    return (
      <div className={styles.Floortop}>
        <div className={styles.Floor}>
          <div className={styles.FloorName}>
            <span>
              {onLayerDetailone.name}
              <img
                src={iconedit}
                alt="logo"
                onClick={() => this.Editlayer('layer', onLayerDetailone.record_id)}
              />
            </span>
          </div>
          <div className={styles.floottop}>
            <span className={styles.planPurpose}>建筑面积</span>
            <span className={styles.useState}>
              {onLayerDetailone.floor_area ? onLayerDetailone.floor_area.toFixed(2) : 0}m2
            </span>
            <span className={styles.planPurpose}>使用面积</span>
            <span className={styles.useState}>
              {onLayerDetailone.usage_area ? onLayerDetailone.usage_area.toFixed(2) : 0}m2
            </span>
          </div>
        </div>
        <div className={styles.dataArea}>
          {/* 出售情况 */}
          <div className={styles.dataSold}>
            <div className={styles.dataSoldOP}>
              <p className={styles.sellArea}>出售面积</p>
              <p className={styles.sellAreaData}>
                {onLayerDetailone.saled_area ? onLayerDetailone.saled_area.toFixed(2) : 0}m2
              </p>
            </div>
            <div className={styles.soldDataop}>
              <p className={styles.sellRate}>
                出售率
                <span>
                  {this.renderRare(onLayerDetailone.saled_area, onLayerDetailone.total_sale_area)}
                </span>
              </p>
              <p className={styles.sellRate}>
                已售
                <span>
                  {onLayerDetailone.saled_area ? onLayerDetailone.saled_area.toFixed(2) : 0}m2
                </span>
              </p>
              <p className={styles.sellRate}>
                未售
                <span>
                  {this.renderSub(onLayerDetailone.total_sale_area, onLayerDetailone.saled_area)}m2
                </span>
              </p>
            </div>
            <div className={styles.sellline} />
          </div>
          {/* 门牌数量 */}
          <div className={styles.dataSold}>
            <div className={styles.dataSoldOP}>
              <p className={styles.sellArea}>门牌数量</p>
              <p className={styles.sellAreaData}>{onLayerDetailone.total_sale_house_num}</p>
            </div>
            <div className={styles.soldDataop}>
              <p className={styles.sellRate}>
                出售率
                <span>
                  {this.renderRare(
                    onLayerDetailone.saled_house_num,
                    onLayerDetailone.total_sale_house_num
                  )}
                </span>
              </p>
              <p className={styles.sellRate}>
                已售<span>{onLayerDetailone.saled_house_num}间</span>
              </p>
              <p className={styles.sellRate}>
                未售
                <span>
                  {this.renderSubnum(
                    onLayerDetailone.total_sale_house_num,
                    onLayerDetailone.saled_house_num
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
                {onLayerDetailone.total_rental_area
                  ? onLayerDetailone.total_rental_area.toFixed(2)
                  : 0}
                m2
              </p>
            </div>
            <div className={styles.soldDataop}>
              <p className={styles.leaseRate}>
                出租率
                <span>
                  {this.renderRare(
                    onLayerDetailone.rentaled_area,
                    onLayerDetailone.total_rental_area
                  )}
                </span>
              </p>
              <p className={styles.leaseRate}>
                已租
                <span>
                  {onLayerDetailone.rentaled_area ? onLayerDetailone.rentaled_area.toFixed(2) : 0}m2
                </span>
              </p>
              <p className={styles.leaseRate}>
                未租
                <span>
                  {this.renderSub(
                    onLayerDetailone.total_rental_area,
                    onLayerDetailone.rentaled_area
                  )}
                  m2
                </span>
              </p>
            </div>
            <div className={styles.sellline} />
          </div>
          {/* 门牌数量 */}
          <div className={styles.dataLease}>
            <div className={styles.dataSoldOP}>
              <p className={styles.sellArea}>门牌数量</p>
              <p className={styles.leaseData}>{onLayerDetailone.total_rental_house_num}间</p>
            </div>
            <div className={styles.soldDataop}>
              <p className={styles.leaseRate}>
                出租率
                <span>
                  {this.renderRare(
                    onLayerDetailone.rentaled_house_num,
                    onLayerDetailone.total_rental_house_num
                  )}
                </span>
              </p>
              <p className={styles.leaseRate}>
                已租<span>{onLayerDetailone.rentaled_house_num}间</span>
              </p>
              <p className={styles.leaseRate}>
                未租
                <span>
                  {this.renderSubnum(
                    onLayerDetailone.total_rental_house_num,
                    onLayerDetailone.rentaled_house_num
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
export default FloorRightTopContent;
