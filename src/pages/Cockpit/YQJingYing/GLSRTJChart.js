import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

import getMockData from '@/services/s_mockData';

class GLSRTJChart extends React.Component {
  state = {
    data: [
      {
        month: '2018-03',
        APP商城: 10,
        电费: 11,
        物业费: 12,
        车辆管理费: 13,
        资源预定: 14,
        其他: 15,
      },
      {
        month: '2018-04',
        APP商城: 11,
        电费: 12,
        物业费: 13,
        车辆管理费: 14,
        资源预定: 15,
        其他: 16,
      },
      {
        month: '2018-05',
        APP商城: 12,
        电费: 13,
        物业费: 14,
        车辆管理费: 15,
        资源预定: 16,
        其他: 17,
      },
      {
        month: '2018-06',
        APP商城: 13,
        电费: 14,
        物业费: 15,
        车辆管理费: 16,
        资源预定: 17,
        其他: 18,
      },
      {
        month: '2018-07',
        APP商城: 14,
        电费: 15,
        物业费: 16,
        车辆管理费: 17,
        资源预定: 18,
        其他: 19,
      },
    ],
  };

  componentDidMount() {
    getMockData('b_park_income_ledger').then(data => {
      let list = data || [];
      list = list.map(v => {
        return {
          ...v,
          APP商城: parseFloat(v.APP商城, 10),
          电费: parseFloat(v.电费, 10),
          物业费: parseFloat(v.物业费, 10),
          车辆管理费: parseFloat(v.车辆管理费, 10),
          资源预定: parseFloat(v.资源预定, 10),
          其他: parseFloat(v.其他, 10),
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
      fields: ['APP商城', '电费', '物业费', '车辆管理费', '资源预定', '其他'],
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
          <Axis name="month" label={{ textStyle: { fill: '#fff' } }} />
          <Axis name="srtj" label={{ textStyle: { fill: '#fff' } }} />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="line"
            position="month*srtj"
            size={2}
            color={['sr', ['#FCC100', '#F2525C', '#FF9C48', '#24CCB8', '#4880FF', '#7942C8']]}
            shape="smooth"
            tooltip={[
              'sr*srtj',
              (k, v) => {
                return {
                  name: k,
                  value: `${v}(万元)`,
                };
              },
            ]}
          />
          <Geom
            type="point"
            position="month*srtj"
            size={4}
            shape="circle"
            color={['sr', ['#FCC100', '#F2525C', '#FF9C48', '#24CCB8', '#4880FF', '#7942C8']]}
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default GLSRTJChart;
