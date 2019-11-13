import React from 'react';
import { Timeline } from 'antd';
import styles from './ProcessList.less';
import getMockData from '@/services/s_mockData';

export default class ProcessList extends React.Component {
  state = {
    data: [
      {
        id: '1',
        name: '拜访',
        zsfzr: '张三',
        addr: '招商地点',
        time: '2019/02/23',
        desc: '当前这个客户非常中意我们的',
        attach: '客户资料详情',
      },
      {
        id: '2',
        name: '来访',
        zsfzr: '张三',
        addr: '招商地点',
        time: '2019/02/23',
        desc: '当前这个客户非常中意我们的',
        attach: '客户资料详情',
      },
      {
        id: '3',
        name: '签约',
        zsfzr: '张三',
        addr: '招商地点',
        time: '2019/02/23',
        desc: '当前这个客户非常中意我们的',
        attach: '客户资料详情',
      },
    ],
  };

  componentDidMount() {
    getMockData('b_enterprise_zs_process.json').then(data => {
      this.setState({ data });
    });
  }

  renderItem = item => {
    return (
      <ul className={styles.itemContent}>
        <li>
          <span>时间：</span>
          <span>{item.time}</span>
        </li>
        <li>
          <span>录入人：</span>
          <span>{item.zsfzr}</span>
        </li>
        <li>
          <span>地点：</span>
          <span>{item.addr}</span>
        </li>
        {item.desc !== '' && (
          <li>
            <span>描述：</span>
            <span style={{ color: '#ffc400' }}>{item.desc === '' ? '无' : item.desc}</span>
          </li>
        )}
        {item.attach !== '' && (
          <li>
            <span>附件：</span>
            <span style={{ color: 'rgb(24, 144, 255)' }}>
              {item.attach === '' ? '无' : item.attach}
            </span>
          </li>
        )}
      </ul>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <div className={styles.listMain}>
        <Timeline>
          {data.map(v => {
            return (
              <Timeline.Item key={v.id} color="#ffc400">
                <p>{v.name}</p>
                {this.renderItem(v)}
              </Timeline.Item>
            );
          })}
        </Timeline>
      </div>
    );
  }
}
