import React from 'react';
import { Drawer } from 'antd';
import { query } from '@/services/parklist';
import styles from './ParkSelect.less';
import logo from '../assets/hyjg.png';

class OpenParkLayout extends React.PureComponent {
  state = {
    data: [],
  };

  componentDidMount() {
    query({ q: 'select' }).then(res => {
      const data = res.list || [];
      this.setState({ data });
    });
  }

  handleSelect = item => {
    const { onSelect } = this.props;
    if (onSelect) {
      onSelect(item);
    }
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
                <div
                  key={item.record_id}
                  className={styles.drawerContent}
                  onClick={() => {
                    this.handleSelect(item);
                  }}
                >
                  <div>
                    <img src={item.logo ? item.logo : logo} alt="logo" />
                  </div>
                  <div className={styles.rightContent}>
                    <p className={styles.name}>{item.name}</p>
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
