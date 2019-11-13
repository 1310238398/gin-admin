import React from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';

export default class RiskColumnar extends React.Component {
  render() {
    const data = [
      {
        item: '经营异常',
        count: 1,
      },
      {
        item: '行政处罚',
        count: 1,
      },
      {
        item: '历史行政处罚',
        count: 1,
      },
      {
        item: '严重违法',
        count: 1,
      },
      {
        item: '股权出质',
        count: 5,
      },
      {
        item: '历史股权出质',
        count: 4,
      },
      {
        item: '动产抵押 ',
        count: 2,
      },
    ];
    const cols = {
      income: {
        tickInterval: 100,
      },
    };
    return (
      <div>
        <Chart height={250} data={data} scale={cols} forceFit padding={[30, 10, 60, 50]}>
          <Axis name="item" label={{ textStyle: { fill: '#fff' } }} Guide={null} />
          <Axis name="count" label={{ textStyle: { fill: '#fff' } }} Guide={null} />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="interval"
            tooltip={[
              'item*count',
              (item, count) => {
                return {
                  name: `${item}`,
                  value: `${count}个`,
                };
              },
            ]}
            position="item*count"
          />
        </Chart>
      </div>
    );
  }
}
