import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import CompanyUserList from './CompanyUserList';

export default class EnpriseInfoName extends PureComponent {
  state = {
    currentZSStatus: 0,
    showUserVisible: false,
  };

  showCheckUserInfo = () => {
    this.setState({
      showUserVisible: true,
      currentZSStatus: 1,
    });
  };

  closeInfo = () => {
    this.setState({
      showUserVisible: false,
    });
  };

  render() {
    const { companyInfo } = this.props;
    console.log(companyInfo);
    const { currentZSStatus } = this.state;
    return [
      <Row gutter={24} style={{ color: '#EAB607', fontSize: '20px', margin: '16px 0px 12px 0px' }}>
        <Col span={18}>
          <span>{companyInfo.name}</span>
          <span
            onClick={() => {
              this.showCheckUserInfo();
              //   if (currentZSStatus === 1) {
              //     return;
              //   }
              //   this.setState({ currentZSStatus: 1 });
            }}
            style={{
              marginLeft: 15,
              border: '1px solid #ffc400',
              borderRadius: 13,
              padding: '4px 10px',
              background: 'transparent',
              fontSize: 16,
              fontWeight: 'bolder',
              color: '#d74b56',
              cursor: 'pointer',
            }}
          >
            {companyInfo.isZS === 0 && currentZSStatus === 0 ? '加入项目库' : '已加入项目库'}
          </span>
        </Col>
        <Col span={6} style={{ color: '#EAB607', fontSize: '14px', margin: '16px 0px 12px 0px' }}>
          {companyInfo.isRear ? companyInfo.isRear : '未落入济南市'}
        </Col>
      </Row>,
      this.state.showUserVisible && (
        <CompanyUserList onCloseInfo={this.closeInfo} visible={this.state.showUserVisible} />
      ),
    ];
  }
}
