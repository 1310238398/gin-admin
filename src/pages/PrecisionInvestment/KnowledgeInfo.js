import React from 'react';
import { Modal, Card, Row, Col } from 'antd';

class KnowledgeInfo extends React.Component {
  handleCancel = () => {
    const { onshowKnowleCloseCallback } = this.props;
    onshowKnowleCloseCallback();
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
        title="知识产权诉讼"
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
                开庭时间：
                {data.date}
              </Col>
            </Row>
            <Row style={itemRowStyle}>
              <Col style={{ marginBottom: 10 }}>
                标题：
                {data.name}
              </Col>
            </Row>
          </Card>
          <Card title="" className="chart">
            <Row style={itemRowStyle}>
              <Col>
                <span>
                  案由：
                  {data.reason}
                </span>
              </Col>
            </Row>
            <Row style={itemRowStyle}>
              <Col>
                <span>
                  身份：
                  {data.identify}
                </span>
              </Col>
            </Row>
            <Row style={itemRowStyle}>
              <Col>
                <span>
                  正文：
                  正奇安徽金融控股有限公司与安徽国瑞投资集团有限公司（以下简称安徽国瑞公司）、许辉、王福海、首信金达投资有限公司（以下简称首信金达公司）借款合同纠纷一案，本院作出的（2017）皖01民初88号民事判决书已发生法律效力，因上述被执行人未履行生效法律文书确定的义务，申请执行人正奇安徽金融控股有限公司向本院申请强制执行，本院依法立案执行，立案执行标的为借款本金及利息34230040.48元及迟延履行期间的债务利息。
                </span>
              </Col>
            </Row>
          </Card>
        </Card>
      </Modal>
    );
  }
}

export default KnowledgeInfo;
