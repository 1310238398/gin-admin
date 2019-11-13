import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label } from 'bizcharts';
import DataSet from '@antv/data-set';
import { Radio } from 'antd';

import getMockData from '@/services/s_mockData';
import styles from '../Cockpit.less';

export default class TCCChart extends React.Component {
  state = {
    active: 'unused',
    shiyongData: {
      unused: 0,
      used: 0,
    },
    data: [
      {
        item: '私家车位',
        count: 300,
      },
      {
        item: '临停车位',
        count: 500,
      },
      {
        item: 'VIP车位',
        count: 200,
      },
    ],
    useddata: [
      {
        item: '私家车位',
        count: 300,
      },
      {
        item: '临停车位',
        count: 500,
      },
      {
        item: 'VIP车位',
        count: 200,
      },
    ],
  };

  componentDidMount() {
    getMockData('d_parking_count').then(data => {
      if (data && data.length > 0) {
        this.setState({ shiyongData: data[0] });
      }
    });

    getMockData('d_parking_used_count').then(data => {
      let list = data || [];
      list = list.map(v => {
        return { ...v, count: parseInt(v.count, 10) };
      });
      this.setState({ data: list });
    });
    getMockData('d_parking_unused_count').then(data => {
      let list = data || [];
      list = list.map(v => {
        return { ...v, count: parseInt(v.count, 10) };
      });
      this.setState({ useddata: list });
    });
  }

  handleItemChange = e => {
    this.setState({ active: e.target.value });
  };

  render() {
    const { data, active, shiyongData, useddata } = this.state;
    const ds = new DataSet();
    const chuandiData = active === 'unused' ? useddata : data;
    const dv = ds.createView().source(chuandiData);
    dv.source(chuandiData).transform({
      type: 'sort',
    });
    return (
      <div>
        <div style={{ width: '100%', paddingLeft: 30, textAlign: 'left' }}>
          <Radio.Group size="small" value={active} onChange={this.handleItemChange}>
            <Radio.Button value="unused">
              空闲：
              {shiyongData.unused}个
            </Radio.Button>
            <Radio.Button value="used">
              已用：
              {shiyongData.used}个
            </Radio.Button>
          </Radio.Group>
        </div>
        <Chart height={273} data={dv} forceFit padding={[30, 80, 30, 80]}>
          <Coord transpose />
          <Axis
            name="item"
            label={{
              textStyle: {
                fill: '#FFFFFF',
              },
              offset: 12,
            }}
          />
          <Axis
            name="count"
            label={{
              textStyle: {
                fill: '#FFFFFF',
              },
              offset: 12,
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
