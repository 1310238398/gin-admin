import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import getMockData from '@/services/s_mockData';

export default class CkTJCL extends React.Component {
  state = {
    data: [
      {
        time: '7:00',
        qiye: 45,
        laifang: 74,
      },
    ],
  };

  componentDidMount() {
    getMockData('d_enter_income_count_out').then(data => {
      let list = data || [];
      list = list.map(v => {
        return {
          ...v,
          园区企业车流量: parseFloat(v.qiye, 10),
          来访车流量: parseFloat(v.laifang, 10),
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
      fields: ['园区企业车流量', '来访车流量'],
      // 展开字段集
      key: 'mj',
      // key字段
      value: 'temperature', // value字段
    });

    return (
      <div>
        <Chart height={300} data={dv} padding={[50, 80, 50, 50]} forceFit>
          <Axis name="time" label={{ textStyle: { fill: '#fff' } }} />
          <Axis
            name="temperature"
            label={{
              formatter: val => `${val}`,
              textStyle: { fill: '#fff' },
            }}
          />
          <Legend
            position="top"
            marker="hyphen"
            textStyle={{
              fill: '#fff',
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
            color={['mj', ['#ffc400', '#24ccb8']]}
            shape="smooth"
            tooltip={[
              'mj*temperature',
              (mj, temperature) => {
                return {
                  name: mj,
                  value: `${temperature}辆`,
                };
              },
            ]}
          />
        </Chart>
      </div>
    );
  }
}
