import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import { Radio } from 'antd';
import getMockData from '@/services/s_mockData';

export default class NHChart extends React.Component {
  state = {
    active: 'week',
    data: [
      {
        month: '1',
        engnum: 18,
      },
      {
        month: '2',
        engnum: 19,
      },
    ],
  };

  componentDidMount() {
    this.fetchData('c_parking_electric_detail_week');
  }

  fetchData = id => {
    getMockData(id).then(data => {
      const list = data || [];
      this.setState({
        data: list.map(v => {
          const item = { ...v };
          item.engnum = parseFloat(item.engnum, 10);
          return item;
        }),
      });
    });
  };

  handleItemChange = e => {
    this.setState({ active: e.target.value });
    switch (e.target.value) {
      case 'full':
        this.fetchData('c_parking_electric_detail_all');
        return;
      case 'half':
        this.fetchData('c_parking_electric_detail_half');
        return;
      default:
        this.fetchData('c_parking_electric_detail_week');
    }
  };

  render() {
    const { active, data } = this.state;
    const cols = {
      month: {
        range: [0, 1],
      },
    };

    return (
      <div>
        <Chart height={300} data={data} scale={cols} padding={[80, 50, 20, 50]} forceFit>
          <Axis
            name="month"
            position="top"
            label={{
              textStyle: {
                fill: '#fff',
              },
              formatter(text) {
                return `${text}`;
              },
            }}
          />
          <Axis
            name="engnum"
            label={{
              textStyle: {
                fill: '#fff',
              },
            }}
          />
          <Tooltip
            showTitle={false}
            crosshairs={{
              type: 'line',
            }}
          />
          <Geom
            type="area"
            position="month*engnum"
            tooltip={[
              'month*engnum',
              (k, v) => {
                return {
                  name: `${k}用电量`,
                  value: `${v}度`,
                };
              },
            ]}
          />
          <Geom
            type="line"
            position="month*engnum"
            size={2}
            tooltip={[
              'month*engnum',
              (k, v) => {
                return {
                  name: `${k}用电量`,
                  value: `${v}度`,
                };
              },
            ]}
          />
        </Chart>
        <div style={{ width: '100%', paddingLeft: 50, textAlign: 'left' }}>
          <Radio.Group size="small" value={active} onChange={this.handleItemChange}>
            <Radio.Button value="full">全年</Radio.Button>
            <Radio.Button value="half">半年</Radio.Button>
            <Radio.Button value="week">本周</Radio.Button>
          </Radio.Group>
        </div>
      </div>
    );
  }
}
