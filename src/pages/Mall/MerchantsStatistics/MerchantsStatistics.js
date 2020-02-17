import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Tabs, Button, Modal, Badge, Select, Table, Icon, Row, Col } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import DDTJ from './DDTJ';
import XSETJ from './XSETJ';
import ShowCash from './ShowCash';

@connect(state => ({
  merchantsStatistics: state.merchantsStatistics,
}))
class MerchantsStatistics extends PureComponent {
  state = {};

  /* 挂载完成 */
  async componentDidMount() {
    await this.props.dispatch({
      type: 'merchantsStatistics/getStoreNew',
    });
  }

  // 显示提现内容
  showTX = () => {
    this.props.dispatch({
      type: 'merchantsStatistics/visibleTX',
      payload: true,
    });
  };

  handleDataFormCancel = () => {
    this.props.dispatch({
      type: 'merchantsStatistics/visibleTX',
      payload: false,
    });
  };

  handleDataFormSubmit = value => {
    this.props.dispatch({
      type: 'merchantsStatistics/TxJE',
      payload: value,
    });
  };

  renderShowCash() {
    const {merchantsStatistics:{storeTjData:{balance}}} = this.props;
    return <ShowCash onCancel={this.handleDataFormCancel} onSubmit={this.handleDataFormSubmit} balanyu={balance} />;
  }

  render() {
    const { TabPane } = Tabs;
    const {merchantsStatistics:{storeTjData,DDdata,XSEdata}} = this.props;
    return (
      <PageHeaderLayout title="统计分析页">
        <Card bordered={false}>
          <Row>
            <Col span={18}>
              <div>
                <table width="100%" style={{textAlign:"center"}}>
                  <tbody>
                    <tr>
                      <td>商家余额（元）</td>
                      <td>本月订单数</td>
                      <td>本月销售额</td>
                    </tr>
                    <tr>
                      <td>{storeTjData.balance}</td>
                      <td>{storeTjData.order_count}</td>
                      <td>{storeTjData.sales_sum}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
            <Col span={6}>
              <Button type="primary" onClick={this.showTX}>
                提现
              </Button>
              <Button type="primary" onClick={this.historyList}>
                提现历史
              </Button>
            </Col>
          </Row>
        </Card>
        <Card bordered={false}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="订单数" key="1">
              <DDTJ data={DDdata} />
            </TabPane>
            <TabPane tab="销售额" key="2">
              <XSETJ data={XSEdata}/>
            </TabPane>
          </Tabs>
        </Card>
        {this.renderShowCash()}
      </PageHeaderLayout>
    );
  }
}
export default MerchantsStatistics;
