import React from 'react';
import { Modal, Timeline, Card, Row, Col } from 'antd';
import style from './ElevatorMonitor.less';
import zhaji01 from '@/assets/zhaji01@2x.png';
import zhaji02 from '@/assets/zhaji02@2x.png';
import zhaji03 from '@/assets/zhaji03@2x.png';
import zhaji04 from '@/assets/zhaji04@2x.png';
import zhaji05 from '@/assets/zhaji05@2x.png';
import zhaji06 from '@/assets/zhaji06@2x.png';

class MemberDialog extends React.Component {
  componentDidMount() {}

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  renderItem = (time, name, img1) => {
    return (
      <Timeline.Item color="#FFC400" className={style.TimeLine}>
        <p style={{ color: '#A6B9C8', fontSize: '12px' }}>{time}</p>
        <Row style={{ backgroundColor: '#2A3136', padding: 10 }}>
          <Col style={{ marginBottom: 10, color: '#fff', fontSize: 14 }}>{name}</Col>
          <Col>
            <Row gutter={6}>
              <Col span={24}>
                {/* <img src={img1} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} /> */}
              </Col>
              {/* <Col span={12}>
                <img src={img2} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
              </Col> */}
            </Row>
          </Col>
        </Row>
      </Timeline.Item>
    );
  };

  render() {
    const { visible, MEemberData } = this.props;
    return (
      <Modal
        title="用户行为路径"
        width={423}
        visible={visible}
        destroyOnClose
        onCancel={this.handleCancel}
        footer={null}
        className="darkModal"
        style={{ top: 20 }}
      >
        <Card className="park">
          <div style={{ backgroundColor: '#374148' }}>
            <p>
              姓名：
              {MEemberData.name} 电话：
              {MEemberData.tel}
            </p>
            <p>
              公司名称：
              {MEemberData.enterpriseName}
            </p>
          </div>
          <Timeline>
            {this.renderItem(MEemberData.time, '汉峪金谷-A1-3-闸机01', zhaji01)}
            {/* {this.renderItem('2019-01-23 12:11:20', '汉峪金谷-A1-8-闸机02', zhaji03)}
            {this.renderItem('2019-01-23 18:23:11', '汉峪金谷-A1-3-闸机06', zhaji04)} */}
            <Timeline.Item dot={<div />} />
          </Timeline>
        </Card>
      </Modal>
    );
  }
}

export default MemberDialog;
