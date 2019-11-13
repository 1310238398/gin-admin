import React from 'react';

import zhengchang from '@/assets/zhengchang@2x.png';
import guzhang from '@/assets/guzhang@2x.png';

import styles from './CRKCLLCard.less';
import CKTJMonitor from './CKTJMonitor';
// import getMockData from '@/services/s_mockData';

const data = [
  {
    id: 'rk01',
    name: '峪悦里-晴日庭地下车库1号入口',
    status: 1,
    img: '/assets/chukou1.png',
  },
  {
    id: 'rk02',
    name: '峪悦里-晴日庭地下车库2号入口',
    status: 1,
    img: '/assets/chukou2.png',
  },
  {
    id: 'rk03',
    name: '峪悦里-晴日庭地下车库3号入口',
    status: 1,
    img: '/assets/chukou3.png',
  },
  {
    id: 'rk04',
    name: 'A2-6车库入口',
    status: 1,
    img: '/assets/chukou4.png',
  },
  {
    id: 'rk05',
    name: 'A2-6固定车位入口',
    status: 1,
    img: '/assets/chukou5.png',
  },
  {
    id: 'rk06',
    name: 'A2-1车库入口',
    status: 1,
    img: '/assets/chukou5.png',
  },
  // {
  //   name: 'A1-B1区出口',
  //   status: 1,
  //   img: '/assets/chukou4.png',
  // },
  // {
  //   name: 'A1-B2区入口',
  //   status: 1,
  //   img: '/assets/chukou5.png',
  // },
];
export default class CRKCLLCard extends React.Component {
  state = {
    visible: false,
    activeItem: {},
  };

  componentDidMount() {
    // getMockData('d_enter_income_count_out').then(data => {
    //   const list = data || [];
    //   if (list.length > 0) {
    //     const d = list[0];
    //     this.setState({ yjje: d.yjje, sjje: d.sjje, tbzjl: d.tbzjl });
    //   }
    // });
  }

  handleItemClick = item => {
    this.setState({
      visible: true,
      activeItem: item,
    });
  };

  //
  renderItem = item => {
    return (
      <div className={styles.item} onClick={() => this.handleItemClick(item)}>
        <div className={styles.itemTop}>
          <img src={item.status === 1 ? zhengchang : guzhang} alt="" />
          <span> {item.name}</span>
        </div>
        <div className={styles.itemContent}>
          <img src={item.img} alt="" />
        </div>
      </div>
    );
  };

  render() {
    const { visible, activeItem } = this.state;
    return [
      <div className={styles.listCard}>
        {data.map(v => {
          return this.renderItem(v);
        })}
      </div>,

      visible && (
        <CKTJMonitor
          visible={visible}
          onCancel={() => {
            this.setState({ visible: false });
          }}
          item={activeItem}
        />
      ),
    ];
  }
}
