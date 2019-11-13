import React from 'react';

import styles from './index.less';
import shangsheng from '@/assets/shangsheng.png';
import xiajiang from '@/assets/xiajiang.png';

import getMockData from '@/services/s_mockData';

class WYFQNCard extends React.Component {
  state = {
    yjje: '425.00',
    sjje: '300.00',
    tbzjl: '0.2%',
    up_down: '',
  };

  componentDidMount() {
    getMockData('b_park_income_prorerty_total').then(data => {
      const list = data || [];
      if (list.length > 0) {
        const d = list[0];
        this.setState({ yjje: d.yjje, sjje: d.sjje, tbzjl: d.tbzjl, up_down: d.up_down });
      }
    });
  }

  render() {
    const { yjje, sjje, tbzjl, up_down } = this.state;
    return (
      <ul className={styles.itemCard}>
        <li>
          <div>
            <span>应缴金额（万元）：</span>
            <span>{yjje}</span>
          </div>
          {/* <div>
            <img src={shangsheng} alt="" />
            <span>8%</span>
          </div> */}
        </li>
        <li>
          <div>
            <span>实缴金额（万元）：</span>
            <span>{sjje}</span>
          </div>
          {/* <div>
            <img src={xiajiang} alt="" />
            <span>8%</span>
          </div> */}
        </li>
        <li>
          <div>
            <span>营收同比增长率（2018年）：</span>
            <img
              src={up_down === '1' ? shangsheng : xiajiang}
              alt=""
              style={{ width: '28px', height: '33px' }}
            />
            <span style={{ color: '#ffc400', fontSize: '22px', marginLeft: '5px' }}>{tbzjl}</span>
          </div>
          {/* <div>
            <img src={up_down === '1' ? shangsheng : xiajiang} alt="" />
            <span>{tbzjl}</span>
          </div> */}
          <div />
        </li>
      </ul>
    );
  }
}

export default WYFQNCard;
