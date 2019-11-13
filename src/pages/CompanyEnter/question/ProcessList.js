import React from 'react';
import { Timeline } from 'antd';
import styles from './ProcessList.less';

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
        phone: '18363018952',
        attach: '客户资料详情',
      },
      {
        id: '2',
        name: '来访',
        zsfzr: '张三',
        addr: '招商地点',
        time: '2019/02/23',
        phone: '1444',
        desc: '当前这个客户非常中意我们的',
        attach: '客户资料详情',
      },
      {
        id: '3',
        name: '签约',
        zsfzr: '张三',
        phone: '1444',
        addr: '招商地点',
        time: '2019/02/23',
        desc: '当前这个客户非常中意我们的',
        attach: '客户资料详情',
      },
    ],
  };

  renderItem = item => {
    return (
      <ul className={styles.itemContent}>
        {item.endstep && item.endstep ? (
          <li>
            <span style={{ width: '75px' }}>解决时间：</span>
            <span>{item.time}</span>
          </li>
        ) : (
          <li>
            <span>上报时间：</span>
            <span>{item.time}</span>
          </li>
        )}
        {item.endstep && item.endstep ? (
          <li>
            <span style={{ width: '75px' }}>解决人：</span>
            <span>{item.zsfzr}</span>
          </li>
        ) : (
          <li>
            <span>上报人：</span>
            <span>{item.zsfzr}</span>
          </li>
        )}
        <li>
          <span>手机号：</span>
          <span>{item.phone}</span>
        </li>
        {item.endstep && item.endstep ? (
          <li style={{ height: '38px' }}>
            <span style={{ width: '75px' }}>解决措施：</span>
            <span>{item.endstep}</span>
          </li>
        ) : null}
      </ul>
    );
  };

  render() {
    const { data } = this.props || this.state;
    return (
      <div className={styles.listMain}>
        <Timeline>
          {data.map(v => {
            return (
              <Timeline.Item key={v.id} color="#ffc400">
                <p className={styles.markt}>{v.name}</p>
                {this.renderItem(v)}
              </Timeline.Item>
            );
          })}
        </Timeline>
      </div>
    );
  }
}
