import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

export default class DDTJ extends React.Component {
  state = {
    data: [{}],
  };

  componentDidMount() {}

  render() {
    const ds = new DataSet();
    const dv = ds.createView().source(this.props.data);
    dv.transform({
      type: 'fold',
      fields: ['订单数'],
      // 展开字段集
      key: 'mj',
      // key字段
      value: 'temperature', // value字段
    });

    return (
      <div>
        <Chart height={300} data={dv} padding={[50, 80, 50, 50]} forceFit>
          <Axis
            name="key"
            //   label={{ textStyle: { fill: '#fff' } }}
          />
          <Axis
            name="value"
            label={{
              formatter: val => `${val}`,
              //   textStyle: { fill: '#fff' },
            }}
          />
          <Legend
            position="top"
            marker="hyphen"
            // textStyle={{
            //   fill: '#fff',
            // }}
          />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="line"
            position="key*value"
            size={2}
            color={['mj', ['#ffc400', '#24ccb8']]}
            shape="smooth"
            tooltip={[
              'mj*value',
              (k, v) => {
                return {
                  name: k,
                  value: `${v}单`,
                };
              },
            ]}
          />
        </Chart>
      </div>
    );
  }
}
