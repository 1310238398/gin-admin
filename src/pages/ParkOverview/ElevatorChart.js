import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

class ElevatorChart extends React.Component {
  render() {
    const data = [
      {
        month: '18年9月',
        count: 3,
      },
      {
        month: '18年10月',
        count: 4,
      },
      {
        month: '18年11月',
        count: 1,
      },
      {
        month: '18年12月',
        count: 3,
      },
      {
        month: '19年1月',
        count: 2,
      },
      {
        month: '19年2月',
        count: 0,
      },
    ];

    return (
      <div>
        <Chart height={250} data={data} padding={[30, 30, 60, 50]} forceFit>
          <Axis name="month" label={{ textStyle: { fill: '#fff' } }} />
          <Axis name="count" label={{ textStyle: { fill: '#fff' } }} />
          <Tooltip
            showTitle={false}
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="interval"
            position="month*count"
            tooltip={[
              'month*count',
              (m, c) => {
                return {
                  name: m,
                  value: c,
                };
              },
            ]}
          />
        </Chart>
      </div>
    );
  }
}

export default ElevatorChart;
