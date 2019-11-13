import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Guide } from 'bizcharts';
import DataSet from '@antv/data-set';
import getMockData from '@/services/s_mockData';

class MonthChart extends React.Component {
  state = {
    data: [
      {
        item: '园区企业员工当日使用量',
        count: 28201,
      },
      {
        item: '园区访客当日使用量',
        count: 7756,
      },
      {
        item: '园区物业人员当日使用量',
        count: 7756,
      },
    ],
  };

  componentDidMount() {
    getMockData('e_enter_device').then(data => {
      const list = data || [];

      this.list = list.map(v => {
        return {
          ...v,
          count: parseFloat(v.count, 10),
        };
      });

      this.setState({ data: this.list });
    });
  }

  render() {
    const { DataView } = DataSet;
    const { Html } = Guide;

    const dv = new DataView();
    dv.source(this.state.data).transform({
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
      <Chart height={300} data={dv} scale={cols} padding={[20, 25, 40, 15]} forceFit>
        <Coord type="theta" radius={0.75} innerRadius={0.6} />
        <Axis name="percent" />
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}次</li>'
        />
        <Guide>
          <Html
            position={['50%', '50%']}
            html='<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">当日共计<br><span style="color:#fff;font-size:1.5em">43713次</span></div>'
            alignX="middle"
            alignY="middle"
          />
        </Guide>
        <Geom
          type="intervalStack"
          position="percent"
          color={['item', ['#FFC400', '#24CCB8', '#FF9C48']]}
          tooltip={[
            'item*count*percent',
            (item, count) => {
              return {
                name: item,
                value: count,
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
              return `${item.point.item}: ${item.point.count}`;
            }}
          />
        </Geom>
      </Chart>
    );
  }
}

export default MonthChart;
