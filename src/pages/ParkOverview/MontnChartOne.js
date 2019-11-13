import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Guide, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import getMockData from '@/services/s_mockData';

class MonthChartOne extends React.Component {
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
      let list = data || [];
      list = list.map(v => {
        return {
          ...v,
          count: parseFloat(v.count, 10),
        };
      });

      this.setState({ data: list });
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
      <Chart height={300} data={dv} scale={cols} padding={[30, 200, 30, 100]} forceFit>
        <Coord type="theta" />
        <Axis name="percent" />
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        />
        <Legend
          position="right"
          textStyle={{
            fill: '#fff',
            color: '#fff',
          }}
        />
        <Geom
          type="intervalStack"
          position="percent"
          color={['item', ['#FFC400', '#24CCB8', '#FF9C48']]}
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
                return `${v1}(${v2})`;
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

export default MonthChartOne;
