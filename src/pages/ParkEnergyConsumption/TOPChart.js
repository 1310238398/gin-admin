import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label } from 'bizcharts';
import DataSet from '@antv/data-set';
import getMockData from '@/services/s_mockData';
import YCBJDialog from './YCBJDialog';

export default class Basic extends React.Component {
  state = {
    visible: false,
    activedItem: {},
    data: [{ en: '济南博雅得电子商务有限公司', value: 10000 }],
  };

  componentDidMount() {
    getMockData('c_parking_electric_top_enterprise').then(data => {
      const list = data || [];
      if (list.length > 0) {
        this.setState({
          data: list.map(v => {
            const item = { ...v };
            item.value = parseFloat(item.value, 10);
            return item;
          }),
        });
      }
    });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handlePlotClick = e => {
    const { data } = e;
    if (!data) {
      return;
    }
    this.setState({
      visible: true,
      activedItem: data.point,
    });
  };

  render() {
    const { data, visible, activedItem } = this.state;
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'sort-by',
      fields: ['value'],
    });
    return (
      <div>
        <Chart
          height={680}
          data={dv}
          forceFit
          padding={[0, 80, 50, 250]}
          onPlotClick={this.handlePlotClick}
        >
          <Coord transpose />
          <Axis
            name="en"
            label={{
              textStyle: {
                fill: '#fff',
              },
              offset: 12,
            }}
          />
          <Axis name="value" />
          <Tooltip showTitle={false} />
          <Geom
            type="interval"
            position="en*value"
            color={['en', ['#4880FF']]}
            tooltip={[
              'en*value',
              (k, v) => {
                return {
                  name: k,
                  value: `${v}(万度)`,
                };
              },
            ]}
          >
            <Label content={['value', count => `${count}万度`]} textStyle={{ fill: '#fff' }} />
          </Geom>
        </Chart>
        {visible && (
          <YCBJDialog
            visible={visible}
            item={{
              name: activedItem.en,
              value: activedItem.value,
            }}
            onCancel={() => {
              this.handleCancel();
            }}
          />
        )}
      </div>
    );
  }
}
