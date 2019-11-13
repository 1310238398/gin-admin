import React, { PureComponent } from 'react';
import { Tabs, Card } from 'antd';
import PrecisionInvestmentNew from './PrecisionInvestmentNew';

const { TabPane } = Tabs;

export default class PrecisionInvestment extends PureComponent {
  render() {
    return (
      <Card className="park">
        <Tabs defaultActiveKey="1">
          <TabPane tab="精准招商" key="1">
            <PrecisionInvestmentNew />
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}
