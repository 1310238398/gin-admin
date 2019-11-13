import React, { PureComponent } from 'react';
import { Card, Form, Input, Button } from 'antd';

import StageSelect from './StageSelect';
import AreaSelect from './AreaSelect';
import BuildingSelect from './BuildingSelect';
import FloorSelect from './FloorSelect';
import EnterpriseList from './EnterpriseList';

// import styles from './index.less';

@Form.create()
class Process extends PureComponent {
  state = {
    buildingCode: '',
    isSearch: false,
  };

  handleAreaChange = value => {
    this.setState({ buildingCode: value });
  };

  handleSearchClick = () => {
    this.setState({ isSearch: true });
  };

  handleResetClick = () => {
    this.setState({ isSearch: false });
  };

  render() {
    const { buildingCode, isSearch } = this.state;
    return (
      <Card className="park" bodyStyle={{ padding: 0 }}>
        <Form layout="inline" className="searchBar">
          <Form.Item label="企业名称">
            <Input placeholder="请输入企业名称" />
          </Form.Item>
          <Form.Item label="招商阶段">
            <StageSelect style={{ width: 120 }} />
          </Form.Item>
          <Form.Item label="目标物业">
            <AreaSelect code="汉峪金谷" style={{ width: 120 }} onChange={this.handleAreaChange} />
            <BuildingSelect code={buildingCode} style={{ width: 120 }} />
            <FloorSelect style={{ width: 120 }} />
          </Form.Item>
          <Form.Item>
            <Button onClick={this.handleSearchClick}>查询</Button>
            <Button onClick={this.handleResetClick} style={{ color: '#fff' }}>
              重置
            </Button>
          </Form.Item>
        </Form>
        <EnterpriseList search={isSearch} />
      </Card>
    );
  }
}

export default Process;
