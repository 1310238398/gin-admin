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
  View,
  // Guide,
  // Shape,
  // Facet,
  // Util,
} from 'bizcharts';
import DataSet from '@antv/data-set';

class UserChart extends PureComponent {
  render() {
    const { data, indata } = this.props;
    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const dv1 = new DataView();
    dv1.source(indata).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: val => {
          val = `${(val * 100).toFixed(2)}%`;
          return val;
        },
      },
    };
    return (
      <Chart height={240} data={dv1} scale={cols} padding={[0, 120, 0, 50]} forceFit>
        <Coord type="theta" radius={0.5} />
        <Axis
          name="percent"
          label={{
            textStyle: {
              fill: '#fff',
            },
          }}
        />
        <Legend
          position="right-center"
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
          active
          type="intervalStack"
          position="percent"
          // color={['item']}
          color={['item', ['#FF5760', '#FE9C48', '#FFD000', '#23CBB7', '#4A80FF', '#7148FE']]}
          tooltip={[
            'item*percent*count',
            (item, percent, count) => {
              percent = `${(percent * 100).toFixed(1)}%`;
              return {
                name: item,
                value: `${percent} ${count}人`,
              };
            },
          ]}
          style={{
            lineWidth: 1,
            stroke: '#fff',
          }}
          select={false}
        >
          <Label
            content="item"
            offset={-15}
            textStyle={{
              fill: '#fff',
            }}
          />
        </Geom>
        <View data={dv} scale={cols}>
          <Coord type="theta" radius={0.75} innerRadius={0.5 / 0.75} />
          <Axis name="percent" />
          <Geom
            type="intervalStack"
            position="percent"
            color={['item']}
            tooltip={[
              'item*percent*count',
              (item, percent, count) => {
                percent = `${(percent * 100).toFixed(1)}%`;
                return {
                  name: item,
                  value: `${percent} ${count}人`,
                };
              },
            ]}
            style={{
              lineWidth: 1,
              stroke: '#fff',
            }}
            select={false}
          >
            <Label
              content="item"
              textStyle={{
                fill: '#fff',
              }}
            />
          </Geom>
        </View>
      </Chart>
    );
  }
}

export default UserChart;
