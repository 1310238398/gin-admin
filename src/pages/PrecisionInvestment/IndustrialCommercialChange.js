import React from 'react';
import { Modal, Card, Row, Col, Timeline } from 'antd';
import IndustrialCommercial from './IndustrialCommercial';

class IndustrialCommercialChange extends React.Component {
  state = {
    legalInfo: {
      visible: false,
      data: null,
    },
  };

  handleCancel = () => {
    const { onshowgongshangCloseCallback } = this.props;
    onshowgongshangCloseCallback();
  };

  Detail = () => {
    this.setState({
      legalInfo: {
        visible: true,
      },
    });
  };

  render() {
    const { data } = this.props;
    console.log(data);
    const itemRowStyle = {
      backgroundColor: '#2A3136',
      margin: '0 20px',
      padding: '10px 20px',
      color: '#fff',
    };
    return (
      <Modal
        title=""
        width={695}
        visible
        destroyOnClose
        onCancel={this.handleCancel}
        footer={null}
        className="darkModal"
        style={{ top: 20 }}
      >
        <Card className="park">
          <Card title="工商变更" className="chart">
            <div style={{ marginLeft: '20px' }}>
              <Timeline>
                <Timeline.Item onClick={this.Detail} style={{ color: '#fff' }}>
                  地址变更（住所变更） 2018-09-18{' '}
                  <span style={{ color: '#eab607', borderBottom: '1px solid #eab607' }}>
                    共计9项修改点击查看详情
                  </span>
                </Timeline.Item>
                <Timeline.Item style={{ color: '#fff' }}>市场主体类型变更 2018-05-23</Timeline.Item>
                <Timeline.Item style={{ color: '#fff' }}>高级管理人员备案 2018-01-05</Timeline.Item>
                <Timeline.Item style={{ color: '#fff' }}>高级管理人员备案 2017-05-17</Timeline.Item>
                <Timeline.Item style={{ color: '#fff' }}>高级管理人员备案 2017-04-28</Timeline.Item>

                <Timeline.Item style={{ color: '#fff' }}>投资人变更 2017-02-22</Timeline.Item>
                <Timeline.Item style={{ color: '#fff' }}>投资人变更 2016-12-30</Timeline.Item>
                <Timeline.Item style={{ color: '#fff' }}>注册资本变更 2016-11-23</Timeline.Item>
              </Timeline>
            </div>
          </Card>

          {this.state.legalInfo.visible && <IndustrialCommercial />}
        </Card>
      </Modal>
    );
  }
}

export default IndustrialCommercialChange;
