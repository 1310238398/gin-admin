import React, { PureComponent } from 'react';
import {
  // G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  // View,
  // Guide,
  // Shape,
  // Facet,
  // Util,
} from 'bizcharts';
import DataSet from '@antv/data-set';

class QyChart extends PureComponent {
  render() {
    const { data } = this.props;
    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: val => {
          val = `${val * 100}%`;
          return val;
        },
      },
    };
    return (
      <Chart height={240} data={dv} scale={cols} padding={[0, 80, 0, 0]} forceFit>
        <Coord type="theta" radius={0.75} />
        <Axis name="percent" />
        <Legend
          position="right"
          offsetY={-50}
          offsetX={-10}
          textStyle={{
            fill: '#fff', // 文本的颜色
            fontSize: '14', // 文本大小
          }}
        />
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        />

        <Geom
          type="intervalStack"
          position="percent"
          // color={['item']}
          color={['item', ['#EE5564', '#FC6E51', '#F7C137', '#A0D469', '#48CFAD', '#00C1D4']]}
          tooltip={[
            'item*percent*count',
            (item, percent, count) => {
              percent = `${(percent * 100).toFixed(1)}%`;
              return {
                name: item,
                value: `${percent} ${count}家`,
              };
            },
          ]}
          style={{
            lineWidth: 1,
            stroke: '#fff',
          }}
        >
          <Label
            content={[
              'item*percent',
              (v1, v2) => {
                return `${v1}(${(v2 * 100).toFixed(2)}%)`;
              },
            ]}
            textStyle={{
              rotate: 0,
              textAlign: 'center',
              shadowBlur: 2,
              fill: '#fff',
              shadowColor: 'rgba(0, 0, 0, .45)',
            }}
          />
        </Geom>
      </Chart>
    );
  }
}

export default QyChart;
