import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label } from 'bizcharts';
import DataSet from '@antv/data-set';

import getMockData from '@/services/s_mockData';

export default class SPTOPChart extends React.Component {
  state = {
    data: [
      {
        item: '商务礼品',
        count: 200,
      },
      {
        item: '桶装水',
        count: 100,
      },
    ],
  };

  componentDidMount() {
    getMockData('b_mall_goods_top').then(data => {
      let list = data || [];
      list = list.map(v => {
        return { ...v, count: parseFloat(v.count, 10) };
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
        <Chart height={300} data={dv} forceFit padding={[30, 100, 30, 100]}>
          <Coord transpose />
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
            }}
          />
          <Tooltip showTitle={false} />
          <Geom
            type="interval"
            position="item*count"
            color={['item', ['#4880FF']]}
            tooltip={[
              'item*count',
              (k, v) => {
                return {
                  name: k,
                  value: `${v}(万元)`,
                };
              },
            ]}
          >
            <Label content={['count', count => `${count}万元`]} textStyle={{ fill: '#fff' }} />
          </Geom>
        </Chart>
      </div>
    );
  }
}
