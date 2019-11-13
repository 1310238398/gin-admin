import React from 'react';
import { Chart, Geom, Axis, Tooltip, Label } from 'bizcharts';
import DataSet from '@antv/data-set';

import getMockData from '@/services/s_mockData';

export default class DXCWChart extends React.Component {
  state = {
    data: [
      {
        item: 'A4-402',
        count: 20,
      },
      {
        item: 'A4-403',
        count: 30,
      },
      {
        item: 'A4-404',
        count: 40,
      },
      {
        item: 'A4-405',
        count: 50,
      },
    ],
  };

  componentDidMount() {
    getMockData('d_parking_low_efficiency_count').then(data => {
      let list = data || [];
      list = list.map(v => {
        return { ...v, count: parseInt(v.count, 10) };
      });
      this.setState({ data: list });
    });
  }

  render() {
    const { data } = this.state;
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.source(data).transform({
      type: 'sort',
    });
    return (
      <div>
        <Chart height={300} data={dv} forceFit padding={[50, 50, 50, 50]}>
          <Axis
            name="item"
            label={{
              textStyle: {
                fill: '#fff',
              },
              offset: 12,
            }}
          />
          <Axis
            name="count"
            label={{
              textStyle: {
                fill: '#fff',
              },
              offset: 12,
            }}
          />
          <Tooltip showTitle={false} />
          <Geom
            type="interval"
            position="item*count"
            color={['item', ['#C19A15']]}
            tooltip={[
              'item*count',
              (k, v) => {
                return {
                  name: k,
                  value: `${v}(个)`,
                };
              },
            ]}
          >
            <Label content={['count', count => `${count}个`]} textStyle={{ fill: '#fff' }} />
          </Geom>
        </Chart>
      </div>
    );
  }
}
