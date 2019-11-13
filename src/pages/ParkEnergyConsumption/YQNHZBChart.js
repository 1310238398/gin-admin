import React from 'react';
import { Chart, Geom, Axis, Coord, Guide, Tooltip, Legend, Label } from 'bizcharts';
import DataSet from '@antv/data-set';

import getMockData from '@/services/s_mockData';

export default class YQNHZBChart extends React.Component {
  state = {
    data: [
      {
        item: '照明',
        count: 150,
      },
      {
        item: '空调',
        count: 50,
      },
      {
        item: '动力',
        count: 60,
      },
      {
        item: '其他',
        count: 90,
      },
    ],
  };

  componentDidMount() {
    getMockData('c_parking_electric_percent').then(data => {
      let list = data || [];
      list = list.map(v => {
        return { ...v, count: parseInt(v.count, 10) };
      });
      this.setState({ data: list });
    });
  }

  calcTotal = () => {
    const { data } = this.state;
    let total = 0;
    data.forEach(v => {
      total += v.count;
    });
    return total;
  };

  render() {
    const { data } = this.state;
    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: val => {
          val *= 100;
          return val;
        },
      },
    };
    return (
      <Chart height={300} data={dv} scale={cols} padding={[30, 100, 30, 100]} forceFit>
        <Coord type="theta" />
        <Axis name="percent" />
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        />
        <Legend
          position="right"
          offsetY={-50}
          offsetX={0}
          textStyle={{
            fill: '#fff',
          }}
        />
        <Geom
          type="intervalStack"
          position="percent"
          color={['item', ['#FCC100', '#F2525C', '#FF9C48', '#24CCB8']]}
          tooltip={[
            'item*percent',
            (item, percent) => {
              percent = `${(percent * 100).toFixed(1)}%`;
              return {
                name: item,
                value: percent,
              };
            },
          ]}
        >
          <Label
            content="percent"
            textStyle={{
              rotate: 0,
              shadowBlur: 2,
              fill: '#D0E3F1',
              fontSize: 14,
            }}
            formatter={(val, item) => {
              return `${item.point.item}: ${item.point.count}万度`;
            }}
          />
        </Geom>
      </Chart>
    );
  }
}
