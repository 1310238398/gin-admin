import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import getMockData from '@/services/s_mockData';

export default class Grouped extends React.Component {
  state = {
    data: [
      {
        区域: 'A1',
        照明: 38,
        空调: 36,
        动力: 55,
        其他: 22,
      },
      {
        区域: 'A2',
        照明: 52,
        空调: 36,
        动力: 55,
        其他: 22,
      },
      {
        区域: 'A3',
        照明: 61,
        空调: 36,
        动力: 55,
        其他: 22,
      },
    ],
  };

  componentDidMount() {
    getMockData('c_parking_electric_detail').then(data => {
      let list = data || [];
      list = list.map(v => {
        return {
          ...v,
          区域: v.区域,
          照明: parseFloat(v.照明, 10),
          空调: parseFloat(v.空调, 10),
          动力: parseFloat(v.动力, 10),
          其他: parseFloat(v.其他, 10),
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
      fields: ['照明', '空调', '动力', '其他'],
      // 展开字段集
      key: 'type',
      // key字段
      value: 'value', // value字段
    });
    return (
      <div>
        <Chart height={300} data={dv} padding={[-10, 120, 50, 50]} forceFit>
          <Legend position="right" offsetY={-50} />
          <Axis name="value" label={{ textStyle: { fill: '#fff' } }} />
          <Axis
            name="区域"
            label={{
              textStyle: { fill: '#fff' },
              offset: 12,
            }}
          />
          <Tooltip showTitle={false} />
          <Geom
            type="interval"
            position="区域*value"
            color="type"
            adjust={[
              {
                type: 'dodge',
                marginRatio: 1 / 32,
              },
            ]}
            tooltip={[
              '区域*value',
              (k, v) => {
                return {
                  name: k,
                  value: `${v}(万度)`,
                };
              },
            ]}
          />
        </Chart>
      </div>
    );
  }
}
