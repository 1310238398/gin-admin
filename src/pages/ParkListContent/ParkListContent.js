import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './ParkListContent.less';
import logo from '../../assets/logo.svg';

@connect(state => ({
  parklist: state.parklist,
}))
class ParkListContent extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'parklist/queryParkList',
    });
  }

  storePark = item => {
    const storage = window.localStorage;
    storage.setItem('park', item.record_id);
  };

  render() {
    const {
      parklist: { parkLists },
    } = this.props;
    return (
      <div>
        <p className={styles.parKname}>选择园区</p>
        <div>
          {parkLists &&
            parkLists.map(item => {
              return (
                <div
                  className={styles.parkarea}
                  onClick={() => this.storePark(item)}
                  key={item.name}
                >
                  <img src={item.logo ? item.logo : logo} alt="logo" />
                  <span>{item.name}</span>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
export default ParkListContent;
