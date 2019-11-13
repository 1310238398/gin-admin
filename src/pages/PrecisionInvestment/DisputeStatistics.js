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

export default class DisputeStatistics extends React.Component {
  render() {
    const data = [
      { en: '机动车交通事故纠纷（1065）', value: 1065 },
      { en: '财产保险合同纠纷（130）', value: 130 },
      { en: '生命权 健康权 身体权纠纷（109）', value: 109 },
      { en: '保险纠纷（81）', value: 81 },
      { en: '生命权 健康权 身体权纠纷（109）', value: 109 },
      { en: '保险纠纷（81）', value: 81 },
      { en: '合同纠纷（40）', value: 40 },
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.source(data).transform({
      type: 'sort',

      callback(a, b) {
        // 排序依据，和原生js的排序callback一致
        return a.population - b.population > 0;
      },
    });
    return (
      <div>
        <Chart height={380} data={dv} forceFit padding={[0, 0, 0, 200]}>
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
          <Tooltip />
          <Geom type="interval" position="en*value" color={['en', ['#4880FF']]} />
        </Chart>
      </div>
    );
  }
}
