import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

import getMockData from '@/services/s_mockData';

class ZSRChart extends React.Component {
  state = {
    data: [
      {
        year: '2016',
        count: 500,
      },
      {
        year: '2017',
        count: 800,
      },
      {
        year: '2018',
        count: 600,
      },
      {
        year: '2019',
        count: 700,
      },
    ],
  };

  componentDidMount() {
    getMockData('b_park_income_year').then(data => {
      let list = data || [];
      list = list.map(v => {
        return { ...v, count: parseInt(v.count, 10) };
      });
      this.setState({ data: list });
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Chart height={290} data={data} padding={[50]} forceFit>
          <Axis name="year" label={{ textStyle: { fill: '#fff' } }} />
          <Axis name="count" label={{ textStyle: { fill: '#fff' } }} />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="interval"
            position="year*count"
            tooltip={[
              'year*count',
              (m, c) => {
                return {
                  name: '总收入：',
                  value: `${c}（万元）`,
                };
              },
            ]}
          />
        </Chart>
      </div>
    );
  }
}

export default ZSRChart;
