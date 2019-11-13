import React from 'react';
import { Drawer } from 'antd';
import styles from './ParkSelect.less';
import logo from '../assets/hyjg.png';

class OpenParkLayout extends React.PureComponent {
  state = {
    data: [{ name: '汉峪金谷', logo: '' }, { name: '创新谷', logo: '' }],
  };

  render() {
    const { collapsed, inOpenParkState, inclose } = this.props;
    const { data } = this.state;
    return (
      <div>
        {inOpenParkState && (
          <Drawer
            placement="left"
            closable={false}
            mark
            onClose={inclose}
            visible={inOpenParkState}
            className={!collapsed ? 'park-Drawer' : 'park-Drawer-ex'}
          >
            {data &&
              data.map(item => (
                <div key={item} className={styles.drawerContent}>
                  <div>
                    <img src={logo} alt="logo" />
                  </div>

                  <div className={styles.rightContent}>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.area}>230万㎡</p>
                  </div>
                </div>
              ))}
          </Drawer>
        )}
      </div>
    );
  }
}
export default OpenParkLayout;
