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

export default class BusinessIncome extends React.Component {
  render() {
    const { dataIncome } = this.props;
    const data1 = [
      {
        year: '2010',
        income: 1370,
      },
      {
        year: '2011',
        income: 990,
      },
      {
        year: '2012',
        income: 1210,
      },
      {
        year: '2013',
        income: 1080,
      },
      {
        year: '2014',
        income: 1150,
      },
      {
        year: '2015',
        income: 1300,
      },
      {
        year: '2016',
        income: 960,
      },
      {
        year: '2017',
        income: 900,
      },
      {
        year: '2018',
        income: 1340,
      },
    ];
    const data2 = [
      {
        year: '2010',
        income: 904,
      },
      {
        year: '2011',
        income: 1089,
      },
      {
        year: '2012',
        income: 1545,
      },
      {
        year: '2013',
        income: 2541,
      },
      {
        year: '2014',
        income: 4521,
      },
      {
        year: '2015',
        income: 5400,
      },
      {
        year: '2016',
        income: 4300,
      },
      {
        year: '2017',
        income: 4800,
      },
      {
        year: '2018',
        income: 5300,
      },
    ];
    const cols = {
      income: {
        tickInterval: 1000,
      },
    };
    return (
      <div>
        <Chart
          height={250}
          data={dataIncome ? data1 : data2}
          scale={cols}
          forceFit
          padding={[30, 10, 60, 50]}
        >
          <Axis name="year" label={{ textStyle: { fill: '#fff' } }} Guide={null} />
          <Axis name="income" label={{ textStyle: { fill: '#fff' } }} Guide={null} />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="interval"
            tooltip={[
              'year*income',
              (year, income) => {
                return {
                  name: `${year}年营业收入`,
                  value: `${(income / 1000).toFixed(2)}亿`,
                };
              },
            ]}
            position="year*income"
          />
        </Chart>
      </div>
    );
  }
}
