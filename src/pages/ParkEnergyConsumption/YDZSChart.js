import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

import getMockData from '@/services/s_mockData';

class YDZSChart extends React.Component {
  state = {
    data: [
      {
        month: '1月',
        '17年': 100,
        '18年': 120,
        '19年': 130,
      },
      {
        month: '2月',
        '17年': 120,
        '18年': 130,
        '19年': 140,
      },
      {
        month: '3月',
        '17年': 140,
        '18年': 160,
        '19年': 170,
      },
    ],
  };

  componentDidMount() {
    getMockData('c_parking_electric_count').then(data => {
      let list = data || [];
      list = list.map(v => {
        return {
          ...v,
          '17年': parseInt(v['17年'], 10),
          '18年': parseInt(v['18年'], 10),
          '19年': parseInt(v['19年'], 10),
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
      fields: ['17年', '18年', '19年'],
      key: 'sr', // key字段
      value: 'srtj', // value字段
    });

    const cols = {
      month: {
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
            name="month"
            label={{
              textStyle: {
                fill: '#fff',
              },
            }}
          />
          <Axis
            name="srtj"
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
            position="month*srtj"
            size={2}
            color={['sr', ['#FCC100', '#F2525C', '#FF9C48']]}
            shape="smooth"
            tooltip={[
              'sr*srtj',
              (k, v) => {
                return {
                  name: k,
                  value: `${v}(万度)`,
                };
              },
            ]}
          />
          <Geom
            type="point"
            position="month*srtj"
            size={4}
            shape="circle"
            color={['sr', ['#FCC100', '#F2525C', '#FF9C48']]}
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
            tooltip={[
              'sr*srtj',
              (k, v) => {
                return {
                  name: k,
                  value: `${v}(万度)`,
                };
              },
            ]}
          />
        </Chart>
      </div>
    );
  }
}

export default YDZSChart;
