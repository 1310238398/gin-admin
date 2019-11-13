import React from 'react';
import getMockData from '@/services/s_mockData';

import YCBJDialog from './YCBJDialog';
import styles from './YCBJCard.less';

export default class YCBJCard extends React.Component {
  state = {
    visible: false,
    activedItem: {},
    data: [
      {
        comname: '企业名称1',
        rihao: '15.00',
        todhao: '300.00',
        yeshao: '40.00',
      },
      {
        comname: '企业名称2',
        rihao: '15.00',
        todhao: '300.00',
        yeshao: '40.00',
      },
      {
        comname: '企业名称3',
        rihao: '15.00',
        todhao: '300.00',
        yeshao: '40.00',
      },
      {
        comname: '企业名称4',
        rihao: '15.00',
        todhao: '300.00',
        yeshao: '40.00',
      },
      {
        comname: '企业名称5',
        rihao: '15.00',
        todhao: '300.00',
        yeshao: '40.00',
      },
    ],
  };

  componentDidMount() {
    getMockData('c_parking_electric_unusual_notice').then(data => {
      this.setState({ data });
    });
  }

  handleItemClick = item => {
    this.setState({
      visible: true,
      activedItem: item,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  renderItem = item => {
    return (
      <div className={styles.item} onClick={() => this.handleItemClick(item)}>
        <div className={styles.itemTop}>
          <span>{item.comname}</span>
          <span>异常</span>
        </div>
        <div className={styles.itemContent}>
          <div>
            <span>日均消耗（度）：</span>
            <span>{item.rihao}</span>
          </div>
          <div>
            <span>昨日消耗（度）：</span>
            <span style={{ color: '#DE4D58' }}>{item.todhao}</span>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { visible, data, activedItem } = this.state;
    return [
      <div className={styles.listCard}>
        {data.map(v => {
          return this.renderItem(v);
        })}
      </div>,
      visible && (
        <YCBJDialog
          visible={visible}
          item={{ ...activedItem, name: activedItem.comname }}
          onCancel={() => {
            this.handleCancel();
          }}
        />
      ),
    ];
  }
}
