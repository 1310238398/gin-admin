import React, { PureComponent } from 'react';
import { connect } from 'dva';
import style from './ParkEnergyConsumption.less';
import p1 from '@/assets/demo/d2/p1.png';
import p2 from '@/assets/demo/d2/p2.png';
import p3 from '@/assets/demo/d2/p3.png';
import p4 from '@/assets/demo/d2/p4.png';
import p5 from '@/assets/demo/d2/p5.png';
@connect(state => ({
  energyConsumption: state.energyConsumption,
}))
export default class NHList extends PureComponent {
  render() {
    const data = [
      {
        name: '电梯A栋17-04#	',
        time: '2019-03-12 11:22',
        kind: '告警',
        level: 2,
        op: '待处理',
        img: p1,
      },
      {
        name: 'A5-17-34电表',
        time: '2019-03-12',
        kind: '告警',
        level: 1,
        op: '待处理',
        img: p2,
      },
      {
        name: 'A5-12-24空调',
        time: '2019-03-12',
        en: '济南庚辰铸造材料有限公司',
        kind: '故障',
        level: 2,
        op: '待处理',
        img: p3,
      },
      {
        name: 'A5-11-24电表',
        time: '2019-03-12',
        kind: '故障',
        level: 2,
        op: '已处理',
        img: p4,
      },
      {
        name: 'A5-11-24电表',
        time: '2019-03-12',
        kind: '故障',
        level: 2,
        op: '已处理',
        img: p5,
      },
    ];
    return (
      <div className={style.NHList}>
        <ul>
          {data.map(item => {
            return (
              <li className={`nhitem lvl${item.level}`}>
                <span className="nhleft">
                  <img src={item.img} alt="" />
                </span>
                <span className="nhright">
                  <span className="nhline">
                    <span>
                      {item.name}-{item.kind}
                    </span>
                    <span className="lvl">{item.level === 1 ? '一般' : '重要'}</span>
                  </span>
                  <span className="nhline sec">
                    <span>{item.time}</span>
                    <span>{item.op}</span>
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
