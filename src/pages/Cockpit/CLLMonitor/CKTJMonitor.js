import React from 'react';
import { Modal, Card, Row, Col } from 'antd';
import moment from 'moment';
import Monitor from '../Monitor';

class CKTJMonitor extends React.Component {
  componentDidMount() {}

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  render() {
    const { visible, item } = this.props;
    return (
      <Modal
        title=""
        width={640}
        visible={visible}
        destroyOnClose
        onCancel={this.handleCancel}
        footer={null}
        className="darkModal"
        style={{ top: 20 }}
      >
        <Card className="park">
          <div style={{ backgroundColor: '#374148' }}>
            <p style={{ fontSize: '18px', color: '#FFC400', fontWeight: 'bolder' }}>{item.name}</p>
          </div>
          <Row>
            <Col style={{ color: '#fff', fontSize: '14px', textAlign: 'center', marginTop: 10 }}>
              监控日期：
              {moment().format('YYYY/MM/DD dddd')}{' '}
            </Col>
            <Col style={{ marginTop: 15, display: 'flex', justifyContent: 'center' }}>
              <Monitor id={item.id} width={600} height={550} />
            </Col>
          </Row>
        </Card>
      </Modal>
    );
  }
}

export default CKTJMonitor;
