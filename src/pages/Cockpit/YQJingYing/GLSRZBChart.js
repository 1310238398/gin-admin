import React from 'react';
import { Chart, Geom, Axis, Coord, Tooltip, Legend, Label } from 'bizcharts';
import DataSet from '@antv/data-set';

import getMockData from '@/services/s_mockData';

class GLSRZBChart extends React.Component {
  state = {
    data: [
      {
        item: 'APP商城',
        count: 150,
      },
      {
        item: '电费',
        count: 50,
      },
      {
        item: '物业费',
        count: 60,
      },
      {
        item: '车辆管理费',
        count: 90,
      },
      {
        item: '资源预定',
        count: 150,
      },
      {
        item: '其他',
        count: 200,
      },
    ],
  };

  componentDidMount() {
    getMockData('b_park_income_percent').then(data => {
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
        <Legend
          position="right"
          offsetY={-50}
          offsetX={0}
          textStyle={{
            fill: '#fff',
          }}
        />
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        />
        <Geom
          type="intervalStack"
          position="percent"
          color={['item', ['#FCC100', '#F2525C', '#FF9C48', '#24CCB8', '#4880FF', '#7942C8']]}
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
            content={[
              'item*count',
              (v1, v2) => {
                return `${v1}(${v2}万元)`;
              },
            ]}
            textStyle={{
              rotate: 0,
              textAlign: 'center',
              shadowBlur: 2,
              fill: '#fff',
              shadowColor: 'rgba(0, 0, 0, .45)',
            }}
          />
        </Geom>
      </Chart>
    );
  }
}

export default GLSRZBChart;
