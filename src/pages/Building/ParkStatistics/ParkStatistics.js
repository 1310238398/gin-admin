import React, { PureComponent } from 'react';
import { Row, Col, Card } from 'antd';
import { connect } from 'dva';
import QyChart from './QyChart';
import HyChart from './HyChart';
import StartClass from './StartClass';
// import UserChart from './UserChart';
import styles from './ParkStatistics.less';

@connect(state => ({
  parkstatistics: state.parkstatistics,
}))
class ParkStatistics extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'parkstatistics/fetchContentData',
    });
    this.props.dispatch({
      type: 'parkstatistics/fetchIndustryData',
    });
    this.props.dispatch({
      type: 'parkstatistics/fetchScaleData',
    });
    this.props.dispatch({
      type: 'parkstatistics/fetchStartData',
    });
  }

  showUesrToal = (data, text, text1) => {
    return (
      <p style={{ fontSize: '12px', color: '#ffffff', fontWight: 400, letterSpacing: '1px' }}>
        {text}
        <span style={{ fontSize: '20px', color: '#ffffff', fontWight: 600, padding: '0 10px' }}>
          {data}
        </span>
        {text1}
      </p>
    );
  };

  caleWsale = (v1, v2) => {
    return (v1 - v2).toFixed(2);
  };

  saleLv = (v1, v2) => {
    return (v1 / v2).toFixed(2) * 100;
  };

  render() {
    const {
      parkstatistics: { scaleData, IndustryData, contentBasiaData, startData },
    } = this.props;
    return (
      <div className={styles.park}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>汉峪金谷园区</div>
          <div className={styles.headerContent}>
            <span className={styles.areaContent}>
              占地面积：<span className={styles.contentData}>{contentBasiaData.total_area}</span>
            </span>
            <span className={styles.areaContent}>
              园区入驻企业：
              <span className={styles.contentData}>{contentBasiaData.enterprise_number}个</span>
            </span>
            <span className={styles.areaContent}>
              园区入驻人数：
              <span className={styles.contentData}>{contentBasiaData.user_number}人</span>
            </span>
          </div>
        </div>
        <Card className={styles.parkNav}>
          <Row gutter={10}>
            {/* <Col className={styles.gutterRow} span={3}>
              <div className={styles.gutterBox}>
                <div className={styles.gutterTitle}>规划用途</div>
                <div className={styles.gutterData}>出售</div>
              </div>
            </Col> */}
            <Col className={styles.gutterRow} span={3}>
              <div className={styles.gutterBox}>
                <div className={styles.gutterTitle}>建筑面积</div>
                <div className={styles.gutterData}>{contentBasiaData.floor_area}</div>
              </div>
            </Col>
            <Col className={styles.gutterRow} span={3}>
              <div className={styles.gutterBox}>
                <div className={styles.gutterTitle}>容积率</div>
                <div className={styles.gutterData}>{contentBasiaData.volume_rate}</div>
              </div>
            </Col>
            <Col className={styles.gutterRow} span={3}>
              <div className={styles.gutterBox}>
                <div className={styles.gutterTitle}>绿化率</div>
                <div className={styles.gutterData}>{contentBasiaData.greening_rate}%</div>
              </div>
            </Col>
            <Col className={styles.gutterRow} span={9}>
              <div className={styles.gutterSellArea}>
                <div className={styles.sellAreaLeft}>
                  <div className={styles.gutterTitle}>出售面积</div>
                  <div className={styles.gutterData}>
                    {contentBasiaData.total_sale_area
                      ? contentBasiaData.total_sale_area.toFixed(2)
                      : 0}
                    m2
                  </div>
                </div>
                <div className={styles.sellAreaRight}>
                  <p className={styles.sellRate}>
                    出售率
                    <span>
                      {this.saleLv(contentBasiaData.saled_area, contentBasiaData.total_sale_area)}%
                    </span>
                  </p>
                  <p className={styles.sellRate}>
                    已售
                    <span>
                      {contentBasiaData.saled_area ? contentBasiaData.saled_area.toFixed(2) : 0}m2
                    </span>
                  </p>
                  <p className={styles.sellRate}>
                    未售
                    <span>
                      {this.caleWsale(
                        contentBasiaData.total_sale_area,
                        contentBasiaData.saled_area
                      )}
                      m2
                    </span>
                  </p>
                </div>
              </div>
            </Col>
            <Col className={styles.gutterRow} span={6}>
              <div className={styles.gutterLeaseArea}>
                <div className={styles.sellAreaLeft}>
                  <div className={styles.gutterTitle}>规划出售楼栋</div>
                  <div className={styles.gutterData}>
                    {contentBasiaData.building_saled_num +
                      contentBasiaData.building_unsaled_num +
                      contentBasiaData.building_saling_num}
                  </div>
                </div>
                <div className={styles.sellAreaRight}>
                  <p className={styles.sellRate}>
                    已售完<span>{contentBasiaData.building_saled_num}栋</span>
                  </p>
                  <p className={styles.sellRate}>
                    待售&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{contentBasiaData.building_unsaled_num}栋</span>
                  </p>
                  <p className={styles.sellRate}>
                    租售中<span>{contentBasiaData.building_saling_num}栋</span>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
        <Card className={styles.parkDistribution}>
          <Row gutter={16} className={styles.listNav}>
            <Col span={8}>
              <Card
                title="园区行业分布"
                headStyle={{ color: '#00F8FD', height: 20, padding: 0 }}
                className={styles.chart}
              >
                {IndustryData && IndustryData && (
                  <HyChart
                    data={IndustryData.map(item => {
                      return { item: item.name, count: item.count };
                    })}
                  />
                )}
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title="园区企业结构"
                headStyle={{ color: '#00F8FD', height: 20, padding: 0 }}
                className={styles.chart}
                // extra={this.showUesrToal(enterprisedata.all, '园区入驻企业', '家')}
              >
                {scaleData && scaleData && (
                  <QyChart
                    data={scaleData.map(item => {
                      return { item: item.name, count: item.count };
                    })}
                  />
                )}
              </Card>
            </Col>
            <Col span={8}>
              <Card
                className={styles.chart}
                title="园区企业信用评级"
                headStyle={{ color: '#00F8FD', height: 20, padding: 0 }}
                // extra={this.showUesrToal(userdata.all, '园区入驻人数', '人')}
              >
                {StartClass && StartClass && (
                  <StartClass
                    data={startData.map(item => {
                      return { item: item.star, count: item.count };
                    })}
                  />
                )}
                {/* {userdata.age && userdata.age.length > 0 && (
                  <UserChart
                    data={userdata.age.map(item => ({ item: item.name, count: item.value }))}
                    indata={[
                      { item: '男', count: userdata.man },
                      { item: '女', count: userdata.feman },
                    ]}
                  />
                )} */}
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default ParkStatistics;
