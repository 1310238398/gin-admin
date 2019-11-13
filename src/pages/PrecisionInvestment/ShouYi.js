import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

class ShouYi extends React.Component {
  render() {
    const data = [
      {
        time: '1月',
        qy: 20,
        fk: 10,
      },
      {
        time: '2月',
        qy: 25,
        fk: 12,
      },
      {
        time: '3月',
        qy: 10,
        fk: 35,
      },
      {
        time: '4月',
        qy: 45,
        fk: 50,
      },
      {
        time: '5月',
        qy: 60,
        fk: 34,
      },
      {
        time: '6月',
        qy: 52,
        fk: 36,
      },
      {
        time: '7月',
        qy: 60,
        fk: 30,
      },
      {
        time: '8月',
        qy: 61,
        fk: 31,
      },
      {
        time: '9月',
        qy: 62,
        fk: 32,
      },
      {
        time: '10月',
        qy: 64,
        fk: 35,
      },
      {
        time: '11月',
        qy: 66,
        fk: 36,
      },
      {
        time: '12月',
        qy: 67,
        fk: 38,
      },
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['qy', 'fk'],
      // 展开字段集
      key: 'mj',
      // key字段
      value: 'temperature', // value字段
    });
    const cols = {
      time: {
        range: [0, 1],
      },
    };
    return (
      <div>
        <Chart height={300} data={dv} scale={cols} padding={[50, 30, 50, 30]} forceFit>
          <Legend
            position="top"
            offsetY={-20}
            marker="hyphen"
            textStyle={{
              fill: '#fff',
            }}
            itemFormatter={val => {
              if (val === 'qy') {
                return '2018';
              }
              if (val === 'fk') {
                return '2017';
              }
            }}
          />
          <Axis name="time" label={{ textStyle: { fill: '#fff' } }} />
          <Axis
            name="temperature"
            label={{
              formatter: val => `${val}`,
              textStyle: { fill: '#fff' },
            }}
          />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="line"
            position="time*temperature"
            size={2}
            color={['mj', ['#FF9F00', '#FF4545']]}
            shape="smooth"
            tooltip={[
              'mj*temperature',
              (mj, temperature) => {
                return {
                  name: mj === 'qy' ? '2018年月收益' : '2017年月收益',
                  value: temperature,
                };
              },
            ]}
          />
          {/* <Geom
            type="point"
            position="time*temperature"
            size={4}
            shape="circle"
            color={['mj', ['#FF9F00', '#FF4545']]}
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
            tooltip={[
              'mj*temperature',
              (mj, temperature) => {
                return {
                  name: mj === 'qy' ? '2018' : '2017',
                  value: temperature,
                };
              },
            ]}
          /> */}
        </Chart>
      </div>
    );
  }
}

export default ShouYi;
