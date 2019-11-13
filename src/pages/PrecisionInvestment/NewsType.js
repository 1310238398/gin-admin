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

export default class NewsType extends React.Component {
  render() {
    const { DataView } = DataSet;
    const data = [
      {
        item: '合作经营',
        count: 10,
      },
      {
        item: '经营业务',
        count: 12,
      },
      {
        item: '产业信息',
        count: 30,
      },
      {
        item: '安全事件',
        count: 21,
      },
      {
        item: '重大交易',
        count: 34,
      },
      {
        item: '政策文件',
        count: 45,
      },
      {
        item: '其他 ',
        count: 10,
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
        {/* <Legend position="right" offsetX={-50} /> */}
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        />
        <Geom
          type="intervalStack"
          position="percent"
          color={[
            'item',
            ['#FCC100', '#F2525C', '#FF9C48', '#24CCB8', '#4880FF', '#223273', '#2FC25B'],
          ]}
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
