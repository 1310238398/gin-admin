import React from 'react';

import shangsheng from '@/assets/shangsheng.png';
import xiajiang from '@/assets/xiajiang.png';
import styles from './index.less';

import getMockData from '@/services/s_mockData';

class DFQNCard extends React.Component {
  state = {
    yjje: '425.00',
    sjje: '300.00',
    tbzjl: '500.00',
  };

  componentDidMount() {
    getMockData('b_park_income_electric_total').then(data => {
      const list = data || [];
      if (list.length > 0) {
        const d = list[0];
        this.setState({ yjje: d.charged, sjje: d.remainder, tbzjl: d.total });
      }
    });
  }

  render() {
    const { yjje, sjje, tbzjl } = this.state;
    return (
      <ul className={styles.itemCard}>
        <li>
          <div>
            <span>余额（万元）：</span>
            <span>{yjje}</span>
          </div>
          {/* <div>
            <img src={shangsheng} alt="" />
            <span>8%</span>
          </div> */}
        </li>
        <li>
          <div>
            <span>充值金额（万元）：</span>
            <span>{sjje}</span>
          </div>
          {/* <div>
            <img src={xiajiang} alt="" />
            <span>8%</span>
          </div> */}
        </li>
        <li>
          <div>
            <span>电费缴纳总额（万元）：</span>
            <span>{tbzjl}</span>
          </div>
          {/* <div>
            <img src={xiajiang} alt="" />
            <span>8%</span>
          </div> */}
        </li>
      </ul>
    );
  }
}

export default DFQNCard;
