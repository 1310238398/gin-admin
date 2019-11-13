import React from 'react';
import { Modal, Card } from 'antd';
import NHChart from './NHChart';
import styles from './index.less';

export default class YCBJDialog extends React.Component {
  componentDidMount() {}

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  renderTitle = () => {
    const {
      item: { name, value },
    } = this.props;
    return (
      <div className={styles.topTitle}>
        <div>
          企业名称：
          {name}
        </div>
        {value && value !== '' && (
          <div>
            耗能总量（万度）：
            <span>{value}</span>
          </div>
        )}
      </div>
    );
  };

  render() {
    const { visible, item } = this.props;

    return (
      <Modal
        title={this.renderTitle()}
        width={700}
        visible={visible}
        destroyOnClose
        onCancel={this.handleCancel}
        footer={null}
        className="darkModal"
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        <Card className="park" bodyStyle={{ padding: 0 }}>
          <Card title="基本信息" className="chart">
            <div className={styles.itemCard}>
              <div className={styles.infoItem}>
                <div>
                  <span>行业：</span>
                  <span>金融行业</span>
                </div>
                <div>
                  <span>企业规模：</span>
                  <span>中型企业</span>
                </div>
                <div>
                  <span>楼层：</span>
                  <span>3</span>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div>
                  <span>占据面积：</span>
                  <span>200平米</span>
                </div>
                <div>
                  <span>员工数量：</span>
                  <span>100</span>
                </div>
                <div>
                  <span>业主：</span>
                  <span>侯婷婷</span>
                </div>
              </div>
            </div>
          </Card>
          {item && item.rihao && (
            <Card
              title={
                <span style={{ color: '#DE4D58' }}>
                  今日能耗状况 <span style={{ fontSize: 12, marginLeft: 10 }}>异常</span>
                </span>
              }
              className="chart"
              style={{ marginTop: 16 }}
            >
              <div className={styles.itemCard}>
                <div className={styles.infoItem}>
                  <div>
                    <span>日均消耗（度）：</span>
                    <span style={{ color: '#FFC400' }}>{item.rihao}</span>
                  </div>
                  <div>
                    <span>昨日消耗（度）：</span>
                    <span style={{ color: '#DE4D58' }}>{item.todhao}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
          <Card title="能耗情况" className="chart" style={{ marginTop: 16, paddingBottom: 30 }}>
            <NHChart />
          </Card>
        </Card>
      </Modal>
    );
  }
}
