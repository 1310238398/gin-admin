import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Chart, Geom, Axis, Tooltip, Label } from 'bizcharts';
import DataSet from '@antv/data-set';

@connect(state => ({
  parkstatistics: state.parkstatistics,
}))
class StartClass extends PureComponent {
  render() {
    const { data } = this.props;
    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'item',
      dimension: 'count',
      as: 'percent',
    });
    return (
      <div>
        <Chart height={290} data={data} padding={[50]} forceFit>
          <Axis name="item" label={{ textStyle: { fill: '#fff' } }} line={null} />
          <Axis name="count" visible={false} />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="interval"
            position="item*count"
            color={['item', ['#2E5BFF', '#F7C137', '#8C54FF', '#00C1D4']]}
            tooltip={[
              'count*item',
              (m, c) => {
                return {
                  value: `${c} ${m}（家）`,
                };
              },
            ]}
          >
            <Label content={['count', count => `${count}家`]} textStyle={{ fill: '#fff' }} />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default StartClass;
