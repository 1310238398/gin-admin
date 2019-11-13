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

  renderItem = item => {
    return (
      <ul className={styles.itemContent}>
        {item.status === '1' ? (
          <li>
            <span>申请时间：</span>
            <span>{item.date}</span>
          </li>
        ) : (
          <li>
            <span>审批时间：</span>
            <span>{item.date}</span>
          </li>
        )}
        {item.status === '1' ? (
          <li>
            <span>申请人：</span>
            <span>{item.appliction}</span>
          </li>
        ) : (
          <li>
            <span>审批人：</span>
            <span>{item.appliction}</span>
          </li>
        )}

        <li>
          <span>电话：</span>
          <span>{item.tel}</span>
        </li>
      </ul>
    );
  };

  render() {
    const { chuanData } = this.props;
    console.log(chuanData);
    return (
      <div className={styles.listMain}>
        <Timeline>
          {chuanData.map(v => {
            return (
              <Timeline.Item key={v.id} color="#ffc400">
                <p>{v.name}</p>
                {v.liuc === '0' ? this.renderItem(v) : ''}
              </Timeline.Item>
            );
          })}
        </Timeline>
      </div>
    );
  }
}
