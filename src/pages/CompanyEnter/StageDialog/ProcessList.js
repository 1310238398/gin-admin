import React from 'react';
import { Timeline } from 'antd';
import styles from './ProcessList.less';
import getMockData from '../../../services/s_mockData';

export default class ProcessList extends React.Component {
  state = {
    data: [
      {
        id: '1',
        name: '发起申请',
        zsfzr: '张三',
        addr: '招商地点',
        time: '2019/02/23',
        desc: '当前这个客户非常中意我们的',
        attach: '客户资料详情',
      },
      {
        id: '2',
        name: '物业审批',
        zsfzr: '张三',
        addr: '招商地点',
        time: '2019/02/23',
        desc: '当前这个客户非常中意我们的',
        attach: '客户资料详情',
      },
      {
        id: '3',
        name: '签装修现场勘查',
        zsfzr: '张三',
        addr: '招商地点',
        time: '2019/02/23',
        desc: '当前这个客户非常中意我们的',
        attach: '客户资料详情',
      },
    ],
    bigImage: false,
    ShowUrl: null,
  };

  componentDidMount() {
    getMockData('companyenterlist_hzd_detail.json').then(data => {
      this.setState({ data: data || [] });
    });
  }

  hideBigImage() {
    this.setState({
      bigImage: false,
    });
  }

  shouBigImage(event) {
    console.log(event);

    this.setState({
      ShowUrl: event,
      bigImage: true,
    });
  }

  renderItem = item => {
    return (
      <ul className={styles.itemContent}>
        {item.zhuangsxiu && item.zhuangsxiu === '1' ? (
          <li>
            <span style={{ width: '100px' }}>装修起始时间：</span>
            <span>{item.time}</span>
          </li>
        ) : (
          <li>
            <span>时间：</span>
            <span>{item.time}</span>
          </li>
        )}
        {item.zhuangsxiu && item.zhuangsxiu === '1' ? (
          <li>
            <span style={{ width: '75px' }}>申请人：</span>
            <span>{item.zsfzr}</span>
            <span style={{ width: '75px', marginLeft: '10px' }}>电话：</span>
            <span>{item.tel}</span>
          </li>
        ) : (
          <li>
            <span>负责人：</span>
            <span>{item.zsfzr}</span>
            <span style={{ width: '75px', marginLeft: '10px' }}>电话：</span>
            <span>{item.tel}</span>
          </li>
        )}
        {item.zhuangsxiu && item.zhuangsxiu === '2' ? (
          <li>
            <span style={{ width: '75px' }}>审批结果：</span>
            <span style={{ color: '#1fb8a9' }}>{item.desc}</span>
          </li>
        ) : null}
        {/* {(item.zhuangsxiu && item.zhuangsxiu === '2') ||
        item.zhuangsxiu === '1' ||
        item.zhuangsxiu === '3' ||
        item.zhuangsxiu === '4' ? (
          <li>
            <span style={{ width: '75px' }}>电话：</span>
            <span>{item.tel}</span>
          </li>
        ) : null} */}
        {item.zhuangsxiu && item.zhuangsxiu === '3' ? (
          <li>
            <span style={{ width: '100px' }}>反馈检查结果：</span>
            <span style={{ color: '#ffc400' }}>{item.desc}</span>
          </li>
        ) : null}
        {(item.zhuangsxiu && item.zhuangsxiu === '2') ||
        item.zhuangsxiu === '4' ||
        item.zhuangsxiu === '3' ? (
          <li>
            <span>附件：</span>
            <span>
              {(item.attach &&
                item.attach.length &&
                item.attach.map(i => (
                  <div className={styles.des}>
                    <a href={i.url} download target={i.url}>
                      {i.name}
                    </a>
                  </div>
                ))) ||
                '无'}
            </span>
            {/* <span style={{ color: 'rgb(24, 144, 255)' }}>{item.attach}</span> */}
          </li>
        ) : null}
        {item.zhuangsxiu && item.zhuangsxiu === '1' ? (
          <li>
            <span>附件：</span>
            <span>
              {(item.attach &&
                item.attach.length &&
                item.attach.map(i => (
                  <div className={styles.des}>
                    <img
                      src={i.url}
                      alt=""
                      style={{ width: '40px', height: '40px' }}
                      onClick={() => this.shouBigImage(i.url)}
                    />
                    {/* <a href={i.url} download target={i.url}>
                      {i.name}
                    </a> */}
                  </div>
                ))) ||
                '无'}
            </span>
            {/* <span style={{ color: 'rgb(24, 144, 255)' }}>{item.attach}</span> */}
          </li>
        ) : null}
        {item.zhuangsxiu && item.zhuangsxiu === '4' ? (
          <li>
            <span style={{ width: '115px' }}>验收结果：</span>
            <span style={{ color: '#ffc400' }}>{item.desc}</span>
          </li>
        ) : null}
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
                {/* <p>{v.name}</p> */}
                {v.isEnd && v.isEnd !== '1' ? (
                  [<p className={styles.markt}>{v.name}</p>, this.renderItem(v)]
                ) : (
                  <p className={styles.markt}>结束</p>
                )}
              </Timeline.Item>
            );
          })}
        </Timeline>
        {this.state.bigImage ? (
          <div className={styles.popoverbackdrop} onClick={() => this.hideBigImage()}>
            <img className={styles.imgresponsive} src={this.state.ShowUrl} alt="查看失败" />
          </div>
        ) : null}
      </div>
    );
  }
}
