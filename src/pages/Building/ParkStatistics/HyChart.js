import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  // G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  // Label,
  Legend,
  // View,
  // Guide,
  // Shape,
  // Facet,
  // Util,
} from 'bizcharts';
import DataSet from '@antv/data-set';

@connect(state => ({
  parkstatistics: state.parkstatistics,
}))
class HyChart extends PureComponent {
  render() {
    // const { Html } = Guide;
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
      <Chart height={240} data={dv} scale={cols} padding={[0, 150, -20, 0]} forceFit>
        <Coord type="theta" radius={0.75} innerRadius={0.6} />
        <Axis name="percent" />
        <Legend
          position="right"
          offsetY={-40}
          offsetX={-10}
          textStyle={{
            fill: '#fff', // 文本的颜色
            fontSize: '14', // 文本大小
          }}
          // itemWidth = {30}
        />
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        />
        {/* <Guide>
          <Html
            position={['50%', '50%']}
            html='<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">主机<br><span>共</span><span style="color:#262626;font-size:2.5em">200</span>人</div>'
            alignX="middle"
            alignY="middle"
          />
        </Guide> */}
        <Geom
          type="intervalStack"
          position="percent"
          color={[
            'item',
            [
              '#EE5564',
              '#FC6E51',
              '#F7C137',
              '#A0D469',
              '#48CFAD',
              '#00C1D4',
              '#5D9CEC',
              '#8C54FF',
              '#EC87BF',
              '#2E5BFF',
            ],
          ]}
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
        />
      </Chart>
    );
  }
}

export default HyChart;
