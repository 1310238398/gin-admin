import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend, Label } from 'bizcharts';
import DataSet from '@antv/data-set';
import getMockData from '@/services/s_mockData';

class DayChart extends React.Component {
  state = {
    data: [
      {
        time: '00:00',
        企业: 2,
        访客: 1,
        物业: 1,
      },
      {
        time: '02:00',
        企业: 5,
        访客: 2,
        物业: 1,
      },
      {
        time: '04:00',
        企业: 5,
        访客: 2,
        物业: 1,
      },
      {
        time: '06:00',
        企业: 5,
        访客: 2,
        物业: 1,
      },
      {
        time: '08:00',
        企业: 5,
        访客: 2,
        物业: 1,
      },
      {
        time: '10:00',
        企业: 5,
        访客: 2,
        物业: 1,
      },
      {
        time: '12:00',
        企业: 5,
        访客: 2,
        物业: 1,
      },
      {
        time: '14:00',
        企业: 5,
        访客: 2,
        物业: 1,
      },
      {
        time: '16:00',
        企业: 5,
        访客: 2,
        物业: 1,
      },
      {
        time: '18:00',
        企业: 5,
        访客: 2,
        物业: 1,
      },
      {
        time: '20:00',
        企业: 5,
        访客: 2,
        物业: 1,
      },
      {
        time: '22:00',
        企业: 5,
        访客: 2,
        物业: 1,
      },
    ],
  };

  componentDidMount() {
    getMockData('e_enter_time').then(data => {
      let list = data || [];
      list = list.map(v => {
        return {
          ...v,
          企业: parseFloat(v.企业, 10),
          访客: parseFloat(v.访客, 10),
          物业: parseFloat(v.物业, 10),
        };
      });
      this.setState({ data: list });
    });
  }

  render() {
    const ds = new DataSet();
    const dv = ds.createView().source(this.state.data);
    dv.transform({
      type: 'fold',
      fields: ['企业', '访客', '物业'],
      // 展开字段集
      key: 'mj',
      // key字段
      value: 'temperature', // value字段
    });
    const cols = {
      time: {
        range: [0, 1],
      },
    };
    return (
      <div>
        <Chart height={300} data={dv} scale={cols} padding={[50, 30, 50, 50]} forceFit>
          <Legend
            position="top"
            offsetY={-20}
            marker="hyphen"
            itemFormatter={val => {
              if (val === '企业') {
                return '园区企业员工使用量';
              }
              if (val === '访客') {
                return '访客使用量';
              }
              if (val === '物业') {
                return '物业使用量';
              }
            }}
            style={{ color: '#fff' }}
          />
          <Axis name="time" label={{ textStyle: { fill: '#fff' } }} />
          <Axis
            name="temperature"
            label={{
              formatter: val => `${val}`,
              textStyle: { fill: '#fff' },
            }}
          />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="line"
            position="time*temperature"
            size={2}
            color={['mj', ['#FFC400', '#24CCB8', '#FF9C48']]}
            shape="smooth"
            tooltip={[
              'mj*temperature',
              (k, v) => {
                return {
                  name: k,
                  value: `${v}(次)`,
                };
              },
            ]}
          />
          <Geom
            type="point"
            position="time*temperature"
            size={4}
            shape="circle"
            color={['mj', ['#FFC400', '#24CCB8', '#FF9C48']]}
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default DayChart;
