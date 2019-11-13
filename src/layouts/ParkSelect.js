import React from 'react';
import Link from 'umi/link';
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

  render() {
    const { incollapsed } = this.props;
    const { OpenParkState } = this.state;
    return (
      <div>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="logo" />
            {!incollapsed ? <h1>汉峪金谷</h1> : null}
          </Link>
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
        />
      </div>
    );
  }
}
export default ParkSelect;
