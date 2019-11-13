import React from 'react';
import { Modal, Card } from 'antd';
import CkTJCL from './CkTJCL';

class CKTJ extends React.Component {
  componentDidMount() {}

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  render() {
    const { visible, ckData } = this.props;
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
            <p style={{ fontSize: '18px', color: '#fff' }}>{ckData}</p>
            {/* <p>
              <span style={{ color: '#fff' }}>当前车辆数：</span>
              <span style={{ color: '#FFC300' }}> 300</span>
            </p> */}
          </div>
          <Card className="chart" title="车流量分时统计">
            <CkTJCL />
          </Card>
        </Card>
      </Modal>
    );
  }
}

export default CKTJ;
