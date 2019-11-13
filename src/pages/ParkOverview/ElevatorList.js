import React from 'react';
import { List, Card, Row, Col } from 'antd';
import dianti from '@/assets/dianti@2x.png';
import zhengchang from '@/assets/zhengchang@2x.png';
import guzhang from '@/assets/guzhang@2x.png';
import tongxun from '@/assets/tongxun@2x.png';
import jiankong from '@/assets/jiankong@2x.png';

import ElevatorDialog from './ElevatorDialog';

class ElevatorList extends React.Component {
  state = {
    data: [
      {
        id: 'ra351',
        name: 'A3-5-1号电梯',
        status: 1,
        weight: '1350kg',
        speed: '2.5m/s',
      },
      {
        id: 'ra352',
        name: 'A3-5-2号电梯',
        status: 1,
        weight: '1350kg',
        speed: '2.5m/s',
      },
      {
        id: 'ra353',
        name: 'A3-5-3号电梯',
        status: 1,
        weight: '1350kg',
        speed: '2.5m/s',
      },
      {
        id: 'ra354',
        name: 'A3-5-4号电梯',
        status: 2,
        weight: '1350kg',
        speed: '2.5m/s',
      },
      {
        id: 'ra355',
        name: 'A3-5-5号电梯',
        status: 1,
        weight: '1350kg',
        speed: '2.5m/s',
      },
      {
        id: 'ra356',
        name: 'A3-5-6号电梯',
        status: 2,
        weight: '1350kg',
        speed: '2.5m/s',
      },
      {
        id: 'ra357',
        name: 'A3-5-7号电梯',
        status: 1,
        weight: '1350kg',
        speed: '2.5m/s',
      },
      {
        id: 'ra358',
        name: 'A3-5-8号电梯',
        status: 1,
        weight: '1350kg',
        speed: '2.5m/s',
      },
    ],
    visible: false,
    visibleItem: {},
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleItemClick = item => {
    this.setState({ visible: true, visibleItem: item });
  };

  getStatusImg = status => {
    switch (status) {
      case 1:
        return zhengchang;
      case 2:
        return tongxun;
      case 3:
        return guzhang;
      default:
        break;
    }
  };

  render() {
    const { data, visible, visibleItem } = this.state;
    const itemTextStyle = {
      fontSize: 14,
      color: '#D0E3F1',
    };

    return [
      <List
        key="list"
        grid={{ gutter: 24, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }}
        dataSource={data}
        style={{ marginTop: 16 }}
        renderItem={item => (
          <List.Item
            key={item.id}
            onClick={() => {
              this.handleItemClick(item);
            }}
            style={{ width: 325 }}
          >
            <Card
              bordered={false}
              bodyStyle={{ padding: 15 }}
              style={{ backgroundColor: '#374148', cursor: 'pointer' }}
            >
              <Row gutter={12}>
                <Col span={12}>
                  <Row justify="center" align="middle">
                    <Col style={{ textAlign: 'center' }}>
                      <img src={dianti} alt="" style={{ maxWidth: 113, maxHeight: 178 }} />
                    </Col>
                    <Col
                      style={{
                        textAlign: 'center',
                        color: '#FFC400',
                        fontSize: '14px',
                        fontWeight: 'bolder',
                        paddingTop: 5,
                      }}
                    >
                      {item.name}
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row justify="center" align="middle">
                    <Col>
                      <Row style={{ marginTop: 15 }}>
                        <Col span={12} style={itemTextStyle}>
                          当前状态
                        </Col>
                        <Col span={12}>
                          <img
                            src={this.getStatusImg(item.status)}
                            alt=""
                            style={{ maxWidth: 22, maxHeight: 22 }}
                          />
                        </Col>
                      </Row>
                      <Row style={{ marginTop: 15 }}>
                        <Col span={12} style={itemTextStyle}>
                          额定载重
                        </Col>
                        <Col span={12} style={itemTextStyle}>
                          {item.weight}
                        </Col>
                      </Row>
                      <Row style={{ marginTop: 15 }}>
                        <Col span={12} style={itemTextStyle}>
                          额定速度
                        </Col>
                        <Col span={12} style={itemTextStyle}>
                          {item.speed}
                        </Col>
                      </Row>
                      <Row style={{ marginTop: 15 }}>
                        <Col span={12} style={itemTextStyle}>
                          视频监控
                        </Col>
                        <Col span={12}>
                          <img src={jiankong} alt="" style={{ maxWidth: 20, maxHeight: 18 }} />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />,
      visible && (
        <ElevatorDialog
          key="card"
          visible={visible}
          item={visibleItem}
          onCancel={() => {
            this.handleCancel();
          }}
        />
      ),
    ];
  }
}

export default ElevatorList;
