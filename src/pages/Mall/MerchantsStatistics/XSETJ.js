import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

export default class XSETJ extends React.Component {
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
  }

  render() {
    const ds = new DataSet();
    const dv = ds.createView().source(this.props.data);
    dv.transform({
      type: 'fold',
      fields: '销售额',
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
            color={['mj', ['#24ccb8']]}
            shape="smooth"
            tooltip={[
              'mj*value',
              (mj, temperature) => {
                return {
                  name: mj,
                  value: `${temperature}元`,
                };
              },
            ]}
          />
        </Chart>
      </div>
    );
  }
}
