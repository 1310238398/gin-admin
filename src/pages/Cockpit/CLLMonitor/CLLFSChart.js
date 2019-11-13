import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

import getMockData from '@/services/s_mockData';

export default class CLLFSChart extends React.Component {
  state = {
    data: [
      {
        time: '00:00',
        园区企业车流量: 0,
        来访车流量: 0,
      },
      {
        time: '04:00',
        园区企业车流量: 0,
        来访车流量: 0,
      },
      {
        time: '08:00',
        园区企业车流量: 100,
        来访车流量: 10,
      },
      {
        time: '10:00',
        园区企业车流量: 200,
        来访车流量: 50,
      },
      {
        time: '12:00',
        园区企业车流量: 400,
        来访车流量: 100,
      },
    ],
  };

  componentDidMount() {
    getMockData('d_car_income_time_count').then(data => {
      let list = data || [];
      list = list.map(v => {
        return {
          ...v,
          园区企业车流量: parseInt(v.园区企业车流量, 10),
          来访车流量: parseInt(v.来访车流量, 10),
          // '18应交': parseInt(v['18应交'], 10),
          // '18实缴': parseInt(v['18实缴'], 10),
        };
      });
      this.setState({ data: list });
    });
  }

  render() {
    const { data } = this.state;
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['园区企业车流量', '来访车流量'],
      key: 'key', // key字段
      value: 'value', // value字段
    });

    const cols = {
      time: {
        range: [0, 1],
      },
    };
    return (
      <div>
        <Chart height={300} data={dv} scale={cols} padding={50} forceFit>
          <Legend
            position="top"
            marker="circle"
            textStyle={{
              fill: '#fff',
            }}
          />
          <Axis
            name="time"
            label={{
              textStyle: {
                fill: '#fff',
              },
            }}
          />
          <Axis
            name="value"
            label={{
              textStyle: {
                fill: '#fff',
              },
            }}
          />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="line"
            position="time*value"
            size={2}
            color={['key', ['#FCC100', '#F2525C']]}
            shape="smooth"
            tooltip={[
              'key*value',
              (k, v) => {
                return {
                  name: k,
                  value: `${v}(辆)`,
                };
              },
            ]}
          />
        </Chart>
      </div>
    );
  }
}
