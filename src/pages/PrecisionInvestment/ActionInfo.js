import React from 'react';
import { Modal, Card, Row, Col } from 'antd';

class ActionInfo extends React.Component {
  handleCancel = () => {
    const { onshowfalvCloseCallback } = this.props;
    onshowfalvCloseCallback();
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
        title="法律讼诉"
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
                公告时间：
                {data.date}
              </Col>
            </Row>
            <Row style={itemRowStyle}>
              <Col style={{ marginBottom: 10 }}>
                当事人：
                {data.name}
              </Col>
            </Row>
          </Card>
          <Card title="" className="chart">
            <Row style={itemRowStyle}>
              <Col>
                <span>
                  公告类型：
                  {data.reason}
                </span>
              </Col>
            </Row>
            <Row style={itemRowStyle}>
              <Col>
                <span>
                  公告人：
                  {data.identify}
                </span>
              </Col>
            </Row>
            <Row style={itemRowStyle}>
              <Col>
                <span>
                  正文：
                  首信金达投资有限公司：本院在审理原告正奇安徽金融控股有限公司与被告安徽国瑞投资集团有限公司、首信金达投资有限公司、许辉、王福海借款合同纠纷一案中，因你下落不明，依照《中华人民共和国民事诉讼法》第九十二条的规定，向你公告送达起诉状副本及开庭传票等。原告正奇安徽金融控股有限公司的诉讼请求：1、判令被告安徽国瑞投资集团有限公司、被告首信金达投资有限公司、被告许辉、被告王福海立即支付借款本金4000万元、利罚息20408562.96元（暂计至2017年2月10日，此后以4000万元为基数按每日万分之六标准计至款清日止）、实现债权的费用（律师费）10万元，以上合计60508562.96元；2、本案的全部诉讼费用由上述四被告共同负担。本院定于2017年8月7日上午9时00分在本院第十二法庭公开开庭审理本案。自本公告发出之日起，经过六十日，即视为送达。提出答辩状的期限为公告送达期满后的十五日。举证期限为公告送达期满后的十五日。逾期将依法判决。
                </span>
              </Col>
            </Row>
          </Card>
        </Card>
      </Modal>
    );
  }
}

export default ActionInfo;
