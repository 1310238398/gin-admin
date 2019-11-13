import React, { PureComponent } from 'react';
import DataSet from '@antv/data-set';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import style from './ParkEnergyConsumption.less';
import getMockData from '@/services/s_mockData';

const full1 = [
  {
    year: '17年',
    month: '1',
    value: 15468,
  },
  {
    year: '17年',
    month: '2',
    value: 16100,
  },
  {
    year: '17年',
    month: '3',
    value: 15900,
  },
  {
    year: '17年',
    month: '4',
    value: 17409,
  },
  {
    year: '17年',
    month: '5',
    value: 17000,
  },
  {
    year: '17年',
    month: '6',
    value: 31056,
  },
  {
    year: '17年',
    month: '7',
    value: 15468,
  },
  {
    year: '17年',
    month: '8',
    value: 16100,
  },
  {
    year: '17年',
    month: '9',
    value: 15900,
  },
  {
    year: '17年',
    month: '10',
    value: 17409,
  },
  {
    year: '17年',
    month: '11',
    value: 17000,
  },
  {
    year: '17年',
    month: '12',
    value: 31056,
  },
  {
    year: '18年',
    month: '1',
    value: 14468,
  },
  {
    year: '18年',
    month: '2',
    value: 17100,
  },
  {
    year: '18年',
    month: '3',
    value: 12900,
  },
  {
    year: '18年',
    month: '4',
    value: 18409,
  },
  {
    year: '18年',
    month: '5',
    value: 19000,
  },
  {
    year: '18年',
    month: '6',
    value: 37056,
  },
  {
    year: '18年',
    month: '7',
    value: 25468,
  },
  {
    year: '18年',
    month: '8',
    value: 17100,
  },
  {
    year: '18年',
    month: '9',
    value: 18900,
  },
  {
    year: '18年',
    month: '10',
    value: 19409,
  },
  {
    year: '18年',
    month: '11',
    value: 18000,
  },
  {
    year: '18年',
    month: '12',
    value: 32056,
  },
];
export default class ParkEnergyConsumption extends PureComponent {
  state = {
    full1: [
      {
        year: '17年',
        month: '1',
        value: 15468,
      },
      {
        year: '17年',
        month: '2',
        value: 16100,
      },
    ],
  };

  componentDidMount() {
    getMockData('c_parking_electric_count').then(data => {
      let list = data || [];
      list = list.map(v => {
        return {
          ...v,
          month: parseInt(v.month, 10),
          value: parseInt(v.value, 10),
          year: parseInt(v.year, 10),
          // '18应交': parseInt(v['18应交'], 10),
          // '18实缴': parseInt(v['18实缴'], 10),
        };
      });
      this.setState({ full1: list });
    });
  }

  parseData = data => {
    const ds = new DataSet();
    const dv = ds.createView('tt');
    dv.source(data);
    dv.transform({
      type: 'percent',
      field: 'value',
      dimension: 'month',
      groupBy: ['year'],
      as: 'percent',
    });
    return dv;
  };

  render() {
    // const { data } = this.state;

    const cols = {
      month: {
        type: 'linear',
      },
      percent: {
        formatter(value) {
          value = value || 0;
          value *= 100;
          return parseInt(value, 10);
        },
        alias: 'percent(%)',
      },
    };
    const data = this.parseData(this.state.full1);
    // const data = full1;
    return (
      <div className={style.chart1}>
        <Chart
          height={300}
          width="100%"
          data={data}
          scale={cols}
          forceFit
          padding={[30, 15, 40, 50]}
        >
          <Axis name="month" label={{ textStyle: { fill: '#fff' } }} />
          <Axis name="value" label={{ textStyle: { fill: '#fff' } }} />
          <Legend position="top-right" />
          <Tooltip showTitle={false} />
          <Geom
            type="area"
            adjustType="stack"
            position="month*value"
            color={['year', ['#ffd54f', '#1976d2']]}
            tooltip={[
              'month*value',
              (k, v) => {
                return {
                  name: `${k}月份用电量`,
                  value: `${v}万度`,
                };
              },
            ]}
          />
        </Chart>
      </div>
    );
  }
}
