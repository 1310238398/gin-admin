import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Guide, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

class BusinessRisk extends React.Component {
  render() {
    const { DataView } = DataSet;
    const { Html } = Guide;
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
          val *= 100;
          return val;
        },
      },
    };
    return (
      <Chart height={450} data={dv} scale={cols} padding={[0, 10, 100, 10]} forceFit>
        <Coord type="theta" radius={0.88} innerRadius={0.88} />
        <Legend
          textStyle={{
            fill: '#fff',
          }}
          position="bottom"
          marker="hyphen"
          itemTpl={
            '<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}" style="cursor: pointer;font-size: 14px;">' +
            '<i class="g2-legend-marker" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px;background-color: {color};"></i>' +
            '<span class="g2-legend-text">{value}</span>' +
            '</li>'
          }
        />
        <Tooltip showTitle={false} />
        <Guide>
          <Html
            position={['50%', '50%']}
            html='<div style="color:#fff;font-size:1.16em;text-align: center;width: 10em;">共4个<br><span style="color:#fff;font-size:1.16em">经营风险</span></div>'
            alignX="middle"
            alignY="middle"
          />
        </Guide>
        <Geom
          type="intervalStack"
          position="percent"
          color={['item', ['#FF4545', '#24CCB8', '#FFC400', '#4880FF']]}
          tooltip={[
            'item*percent',
            (item, percent) => {
              return {
                name: item,
                value: `${(percent * 100).toFixed(2)}%`,
              };
            },
          ]}
        />
      </Chart>
    );
  }
}

export default BusinessRisk;
