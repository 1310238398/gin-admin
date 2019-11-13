import React from 'react';
import { Modal, Card, Row, Col } from 'antd';

class LeglaInfo extends React.Component {
  handleCancel = () => {
    const { onshowLegalInfoCloseCallback } = this.props;
    onshowLegalInfoCloseCallback();
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
        title="开庭公告"
        width={695}
        visible
        destroyOnClose
        onCancel={this.handleCancel}
        footer={null}
        className="darkModal"
        style={{ top: 20 }}
      >
        <Card className="park" bodyStyle={{ padding: 0 }}>
          <Card title="案例详情" className="chart">
            <Row style={itemRowStyle}>
              <Col style={{ marginBottom: 10 }}>
                法院：
                {data.name}
              </Col>
            </Row>
            <Row style={itemRowStyle}>
              <Col style={{ marginBottom: 10 }}>
                开庭时间：
                {data.date}
              </Col>
            </Row>
            <Row style={itemRowStyle}>
              <Col style={{ marginBottom: 10 }}>
                案由：
                {data.reason}
              </Col>
            </Row>
          </Card>
          <Card title="" className="chart">
            <Row style={itemRowStyle}>
              <Col>
                <span>
                  当事人：
                  {data.identify}
                </span>
              </Col>
            </Row>
            <Row style={itemRowStyle}>
              <Col>
                <span>
                  正文： 我院定于2018年08月24日
                  09时30分在本院第十八法庭依法开庭审理第三人许鸣和刘朝华、被告许辉与原告正奇安徽金融控股有限公司债权人撤销权纠纷一案。
                </span>
              </Col>
            </Row>
          </Card>
        </Card>
      </Modal>
    );
  }
}

export default LeglaInfo;
