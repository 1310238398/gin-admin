import React from 'react';

import styles from './index.less';

import shangsheng from '@/assets/shangsheng.png';
import xiajiang from '@/assets/xiajiang.png';
import getMockData from '@/services/s_mockData';

export default class LTCWSRCard extends React.Component {
  state = {
    dt: '425.00',
    byzsr: '3002.00',
    bnzsr: '16234.2',
    dt_percent: '0.2%',
    byzsr_persent: '0.2%',
    bnzsr_percent: '0.2%',
    dt_up_down: '1',
    byzsr_up_down: '1',
    bnzsr_up_down: '2',
  };

  componentDidMount() {
    getMockData('d_temp_parking_income_count').then(data => {
      const list = data || [];
      if (list.length > 0) {
        const d = list[0];
        this.setState({
          dt: d.dt,
          byzsr: d.byzsr,
          bnzsr: d.bnzsr,
          dt_percent: d.dt_percent,
          byzsr_persent: d.byzsr_persent,
          bnzsr_percent: d.bnzsr_percent,
          dt_up_down: d.dt_up_down,
          byzsr_up_down: d.byzsr_up_down,
          bnzsr_up_down: d.bnzsr_up_down,
        });
      }
    });
  }

  render() {
    const {
      dt,
      byzsr,
      bnzsr,
      dt_percent,
      byzsr_persent,
      bnzsr_percent,
      dt_up_down,
      byzsr_up_down,
      bnzsr_up_down,
    } = this.state;
    return (
      <ul className={styles.itemCard}>
        <li>
          <div>
            <span>当天（元）：</span>
            <span>{dt}</span>
          </div>
          <div>
            <img src={dt_up_down === '1' ? shangsheng : xiajiang} alt="" />
            <span>{dt_percent}</span>
          </div>
        </li>
        <li>
          <div>
            <span>本月总收入（元）：</span>
            <span>{byzsr}</span>
          </div>
          <div>
            <img src={byzsr_up_down === '1' ? shangsheng : xiajiang} alt="" />
            <span>{byzsr_persent}</span>
          </div>
        </li>
        <li>
          <div>
            <span>本年总收入（元）：</span>
            <span>{bnzsr}</span>
          </div>
          <div>
            <img src={bnzsr_up_down === '1' ? shangsheng : xiajiang} alt="" />
            <span>{bnzsr_percent}</span>
          </div>
        </li>
      </ul>
    );
  }
}
