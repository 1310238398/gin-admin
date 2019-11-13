import React from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
import DataSet from '@antv/data-set';

export default class RiskColumnarBing extends React.Component {
  render() {
    const { DataView } = DataSet;
    const data = [
      {
        item: '经营异常',
        count: 1,
      },
      {
        item: '行政处罚',
        count: 1,
      },
      {
        item: '历史行政处罚',
        count: 1,
      },
      {
        item: '严重违法',
        count: 1,
      },
      {
        item: '股权出质',
        count: 5,
      },
      {
        item: '历史股权出质',
        count: 4,
      },
      {
        item: '动产抵押 ',
        count: 2,
      },
    ];
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
          val = `${(val * 100).toFixed(1)}%`;
          return val;
        },
      },
    };
    return (
      <Chart height={170} data={dv} scale={cols} padding={[0, 80, 0, 0]} forceFit>
        <Coord type="theta" radius={0.75} />
        <Axis name="percent" />
        <Legend position="right" offsetX={-50} />
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        />
        <Geom
          type="intervalStack"
          position="percent"
          color={['item', ['#FCC100', '#F2525C', '#FF9C48', '#24CCB8', '#4880FF']]}
          tooltip={[
            'item*percent',
            (item, percent) => {
              percent = `${(percent * 100).toFixed(1)}%`;
              return {
                name: item,
                value: percent,
              };
            },
          ]}
          style={{
            lineWidth: 0,
            stroke: '#fff',
          }}
        >
          <Label
            content="percent"
            textStyle={{
              rotate: 0,
              textAlign: 'center',
              shadowBlur: 2,
              fill: '#ffffff',
              shadowColor: 'rgba(0, 0, 0, .45)',
            }}
          />
        </Geom>
      </Chart>
    );
  }
}
