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

export default class EnterpriseTax extends React.Component {
  render() {
    const { data } = this.props;
    const data1 = [
      {
        year: '2010',
        income: 187,
      },
      {
        year: '2011',
        income: 69,
      },
      {
        year: '2012',
        income: 136,
      },
      {
        year: '2013',
        income: 95,
      },
      {
        year: '2014',
        income: 117,
      },
      {
        year: '2015',
        income: 166,
      },
      {
        year: '2016',
        income: 67,
      },
      {
        year: '2017',
        income: 63,
      },
      {
        year: '2018',
        income: 178,
      },
    ];
    const data2 = [
      {
        year: '2010',
        income: 813,
      },
      {
        year: '2011',
        income: 638,
      },
      {
        year: '2012',
        income: 574,
      },
      {
        year: '2013',
        income: 909,
      },
      {
        year: '2014',
        income: 781,
      },
      {
        year: '2015',
        income: 336,
      },
      {
        year: '2016',
        income: 909,
      },
      {
        year: '2017',
        income: 446,
      },
      {
        year: '2018',
        income: 460,
      },
    ];
    const cols = {
      income: {
        tickInterval: 100,
      },
    };
    return (
      <div>
        <Chart
          height={250}
          data={data ? data1 : data2}
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
                  name: `${year}年税收`,
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
