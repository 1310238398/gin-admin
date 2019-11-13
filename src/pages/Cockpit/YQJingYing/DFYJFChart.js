import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

import getMockData from '@/services/s_mockData';

class DFYJFChart extends React.Component {
  state = {
    data: [
      {
        month: '01',
        '17应交': 100,
        '17实缴': 100,
        '18应交': 100,
        '18实缴': 100,
      },
      {
        month: '02',
        '17应交': 200,
        '17实缴': 200,
        '18应交': 200,
        '18实缴': 200,
      },
      {
        month: '03',
        '17应交': 300,
        '17实缴': 300,
        '18应交': 300,
        '18实缴': 300,
      },
      {
        month: '04',
        '17应交': 400,
        '17实缴': 400,
        '18应交': 400,
        '18实缴': 400,
      },
      {
        month: '05',
        '17应交': 500,
        '17实缴': 500,
        '18应交': 500,
        '18实缴': 500,
      },
      {
        month: '06',
        '17应交': 600,
        '17实缴': 600,
        '18应交': 600,
        '18实缴': 600,
      },
      {
        month: '07',
        '17应交': 700,
        '17实缴': 700,
        '18应交': 700,
        '18实缴': 700,
      },
      {
        month: '08',
        '17应交': 800,
        '17实缴': 800,
        '18应交': 800,
        '18实缴': 800,
      },
      {
        month: '09',
        '17应交': 900,
        '17实缴': 900,
        '18应交': 900,
        '18实缴': 900,
      },
      {
        month: '10',
        '17应交': 1000,
        '17实缴': 1000,
        '18应交': 1000,
        '18实缴': 1000,
      },
      {
        month: '11',
        '17应交': 1100,
        '17实缴': 1100,
        '18应交': 1100,
        '18实缴': 1100,
      },
      {
        month: '12',
        '17应交': 1200,
        '17实缴': 1200,
        '18应交': 1200,
        '18实缴': 1200,
      },
    ],
  };

  componentDidMount() {
    getMockData('b_park_income_analyse_electric').then(data => {
      let list = data || [];
      list = list.map(v => {
        return {
          ...v,
          '17应交': parseInt(v['17应交'], 10),
          '17实缴': parseInt(v['17实缴'], 10),
          '18应交': parseInt(v['18应交'], 10),
          '18实缴': parseInt(v['18实缴'], 10),
        };
      });
      this.setState({ data: list });
    });
  }

  render() {
    const { data } = this.state;
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['17应交', '17实缴', '18应交', '18实缴'],
      key: 'sr', // key字段
      value: 'srtj', // value字段
    });

    const cols = {
      month: {
        range: [0, 1],
      },
    };
    return (
      <div>
        <Chart height={300} data={dv} scale={cols} padding={50} forceFit>
          <Legend
            position="top"
            marker="circle"
            textStyle={{
              fill: '#fff',
            }}
          />
          <Axis
            name="month"
            label={{
              textStyle: {
                fill: '#fff',
              },
            }}
          />
          <Axis
            name="srtj"
            label={{
              textStyle: {
                fill: '#fff',
              },
            }}
          />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="line"
            position="month*srtj"
            size={2}
            color={['sr', ['#FCC100', '#F2525C', '#FF9C48', '#24CCB8']]}
            shape="smooth"
            tooltip={[
              'sr*srtj',
              (k, v) => {
                return {
                  name: k,
                  value: `${v}(万元)`,
                };
              },
            ]}
          />
        </Chart>
      </div>
    );
  }
}

export default DFYJFChart;
