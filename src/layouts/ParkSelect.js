import React from 'react';
import Link from 'umi/link';
import store from '@/utils/store';
import styles from './ParkSelect.less';
import OpenParkLayout from './OpenParkLayout';
import logo from '../assets/hyjg.png';

class ParkSelect extends React.PureComponent {
  state = {
    OpenParkState: false,
  };

  onOpenpark = () => {
    this.setState({
      OpenParkState: true,
    });
  };

  onClose = () => {
    this.setState({
      OpenParkState: false,
    });
  };

  onSelect = item => {
    store.setDefaultPark({ id: item.record_id, name: item.name, logo: item.logo });
    this.setState({
      OpenParkState: false,
    });
    window.location.reload(true);
  };

  render() {
    const { incollapsed } = this.props;
    const { OpenParkState } = this.state;
    const parkItem = store.getDefaultPark();
    return (
      <div>
        <div className={styles.logo} onClick={this.onOpenpark}>
          <img src={parkItem.logo ? parkItem.logo : logo} alt="logo" />
          {!incollapsed ? <h1>{parkItem.name}</h1> : null}
        </div>
        {/*
        <div className={styles.logo} onClick={this.onOpenpark}>
          <Icon type="plus" className={!incollapsed ? styles.left_icon : styles.left_iconex} />
          {!incollapsed ? (
            <React.Fragment>
              <span className={styles.parkSelectName}>选择园区</span>
              <Icon type="right" className={styles.right_icon} />
            </React.Fragment>
          ) : null}
          </div> */}
        <OpenParkLayout
          collapsed={incollapsed}
          inOpenParkState={OpenParkState}
          inclose={this.onClose}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}
export default ParkSelect;
