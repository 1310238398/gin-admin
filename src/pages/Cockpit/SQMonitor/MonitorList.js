import React from 'react';
import { List, Card, Row, Col } from 'antd';
import honglvdeng from '@/assets/honglvdeng.png';
import zhengchang from '@/assets/zhengchang@2x.png';
import guzhang from '@/assets/guzhang@2x.png';
import jiankong from '@/assets/jiankong@2x.png';

import MonitorDialog from './MonitorDialog';

class MonitorList extends React.Component {
  state = {
    data: [
      {
        id: 'sq01',
        name: 'A3室外A1层商业区东入口',
        status: 1,
      },
      {
        id: 'sq02',
        name: 'A3室外A1层商业区东南角',
        status: 1,
      },
      {
        id: 'sq03',
        name: 'A3室外A2层商业区东北角',
        status: 1,
      },
      {
        id: 'sq04',
        name: 'A3室外A2层商业区东北角',
        status: 1,
      },
      {
        id: 'sq05',
        name: 'A3室外A1层商业区内部',
        status: 1,
      },
      {
        id: 'sq06',
        name: 'A3室外A2层商业区东南角',
        status: 1,
      },
      {
        id: 'sq07',
        name: 'A3室外A2层商业区东南角',
        status: 1,
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
                      <img src={honglvdeng} alt="" style={{ maxWidth: 42, maxHeight: 62 }} />
                    </Col>
                    <Col
                      style={{
                        textAlign: 'center',
                        color: '#FFC400',
                        fontSize: '14px',
                        fontWeight: 'bolder',
                        paddingTop: 10,
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
        <MonitorDialog
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

export default MonitorList;
