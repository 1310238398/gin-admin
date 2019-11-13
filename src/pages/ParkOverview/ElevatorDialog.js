import React from 'react';
import { Modal, Card, Row, Col, message } from 'antd';
import moment from 'moment';
import ElevatorChart from './ElevatorChart';
import { getUUID } from '../../utils/utils';

class ElevatorDialog extends React.Component {
  wsAddr = 'rtsp.xiaoyuanjijiehao.com';

  clientID = getUUID();

  componentDidMount() {}

  componentWillUnmount() {
    if (this.player) {
      this.player.destroy();
      try {
        const ws = new WebSocket(
          `${this.getWSProtocol()}://${this.wsAddr}/ws/rtsp/stop/${this.clientID}`,
          ['rtsp']
        );
        ws.addEventListener('message', e => {
          const data = JSON.parse(e.data);
          if (data.status === 'OK') {
            ws.close();
          }
        });
      } catch (e) {
        message.error(e);
      }
    }
  }

  getWSProtocol = () => {
    let p = 'ws';
    if (window.location.href.startsWith('https')) {
      p = 'wss';
    }
    return p;
  };

  handleCam = el => {
    if (this.player) {
      return;
    }

    const { item } = this.props;

    this.player = new window.JSMpeg.Player(
      `${this.getWSProtocol()}://${this.wsAddr}/ws/rtsp?id=${item.id}&cid=${
        this.clientID
      }&size=300x230`,
      {
        canvas: el,
        autoplay: true,
        protocols: ['rtsp'],
      }
    );
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  renderTitleItem = (name, value, style = {}) => {
    const vstyle = {
      color: '#22C5B3',
      fontSize: '26px',
      ...style,
    };

    return (
      <Row>
        <Col style={{ color: '#D0E3F1', fontSize: '14px', marginBottom: 10 }}>{name}</Col>
        <Col style={vstyle}>{value}</Col>
      </Row>
    );
  };

  renderTitle = () => {
    const { item } = this.props;
    return (
      <Row>
        <Col style={{ color: '#FFC400', fontSize: '14px', fontWeight: 'bolder', marginBottom: 15 }}>
          {item.name}
          状态
        </Col>
        <Col>
          <Row>
            <Col span={6}>{this.renderTitleItem('停层', '3F')}</Col>
            <Col span={6}>{this.renderTitleItem('故障状态', '正常')}</Col>
            <Col span={6}>{this.renderTitleItem('报警状态', '未报警', { color: '#DE4D58' })}</Col>
            <Col span={6}>{this.renderTitleItem('电梯状态', '正常')}</Col>
          </Row>
        </Col>
      </Row>
    );
  };

  render() {
    const { visible } = this.props;
    const itemRowStyle = {
      backgroundColor: '#2A3136',
      margin: '0 20px',
      padding: '10px 20px',
      color: '#fff',
    };
    return (
      <Modal
        title={this.renderTitle()}
        width={695}
        visible={visible}
        destroyOnClose
        onCancel={this.handleCancel}
        footer={null}
        className="darkModal"
        style={{ top: 20 }}
      >
        <Card className="park" bodyStyle={{ padding: 0 }}>
          <Card title="电梯维保" className="chart">
            <Row style={itemRowStyle}>
              <Col style={{ marginBottom: 10 }}>内容：自动门在开启和关闭时有异响</Col>
              <Col>
                <span>维修时间：2019-02-02</span>{' '}
                <span style={{ marginLeft: 30 }}>维修人：王晓然</span>
              </Col>
            </Row>
          </Card>
          <Card title="基本情况" className="chart">
            <Row style={itemRowStyle}>
              <Col>
                <span>生产厂家：迅达</span>{' '}
                <span style={{ marginLeft: 15 }}>安装时间：2016-01-23</span>
                <span style={{ marginLeft: 15 }}>维保单位：绿城物业 </span>
              </Col>
            </Row>
          </Card>
          <Row>
            <Col span={12}>
              <Card title="故障率统计" className="chart">
                <ElevatorChart />
              </Card>
            </Col>
            <Col span={12}>
              <Row>
                <Col
                  style={{ color: '#fff', fontSize: '14px', textAlign: 'center', marginTop: 10 }}
                >
                  监控日期：
                  {moment().format('YYYY/MM/DD dddd')}{' '}
                </Col>
                <Col style={{ marginTop: 15, marginLeft: 10 }}>
                  <canvas
                    ref={el => {
                      this.handleCam(el);
                    }}
                    style={{ width: 300, height: 230, backgroundColor: 'transparent' }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Modal>
    );
  }
}

export default ElevatorDialog;
