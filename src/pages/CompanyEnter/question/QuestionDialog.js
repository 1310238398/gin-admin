import React from 'react';
import { Modal, Timeline, Tabs, Row, Col, Card } from 'antd';
import styles from './question.less';
import ProcessList from './ProcessList';
import WJJList from './WJJList';
import style from '../CompanyList.less';

class QuestionDialog extends React.Component {
  componentDidMount() {
    const { item } = this.props;
    console.log(item);
  }

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  renderItem = (time, name, img1) => {
    return (
      <Timeline.Item color="#FFC400">
        <p style={{ color: '#A6B9C8', fontSize: '12px' }}>{time}</p>
        <Row style={{ backgroundColor: '#2A3136', padding: 10 }}>
          <Col style={{ marginBottom: 10, color: '#fff', fontSize: 14 }}>{name}</Col>
          <Col>
            <Row gutter={6}>
              <Col span={24}>
                {/* <img src={img1} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} /> */}
              </Col>
              {/* <Col span={12}>
                <img src={img2} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
              </Col> */}
            </Row>
          </Col>
        </Row>
      </Timeline.Item>
    );
  };

  render() {
    const { questionVisible, item = {} } = this.props;
    console.log('question', item);
    const unDo = `未解决(${item.unDoCount || 1})`;
    const Do = `已解决(${item.doCount || 1})`;
    return (
      <Modal
        width={623}
        visible={questionVisible}
        destroyOnClose
        onCancel={this.handleCancel}
        footer={null}
        className="darkModal"
        style={{ padding: 0 }}
      >
        <Card className="park" style={{ padding: 0 }}>
          <Tabs>
            <Tabs.TabPane tab={unDo} key="1">
              <span className={styles.mark}>
                {/* {item.status} */}
                {item.status === '未入驻' ? (
                  <span className={style.ico} style={{ color: '#fff' }}>
                    {item.status}
                  </span>
                ) : null}
                {item.status === '已入驻' ? (
                  <span className={style.un} style={{ color: '#fff' }}>
                    {item.status}
                  </span>
                ) : null}
                {item.status === '未入驻装修中' ? (
                  <span className={style.uny} style={{ color: '#fff' }}>
                    {item.status}
                  </span>
                ) : null}
              </span>
              <Card className="park">
                <div style={{ backgroundColor: '#374148' }}>
                  <div className={styles.title}>1、问题描述：</div>
                  <div className={styles.des}>{item.question && item.question.des}</div>

                  <div className={styles.title}>2、问题详情：</div>

                  <div className={styles.des}>{item.question && item.question.detail}</div>

                  <div className={styles.title}>3、附件：</div>
                  {(item.question &&
                    item.question.attach.length &&
                    item.question.attach.map(i => (
                      <div className={styles.des}>
                        <a href={i.url}>{i.name}</a>
                      </div>
                    ))) ||
                    '无'}
                  <div className={styles.title}>4、解决流程</div>
                  <WJJList data={item.process || []} />
                </div>
              </Card>
            </Tabs.TabPane>
            <Tabs.TabPane tab={Do} key="2">
              <span className={styles.mark}>
                {/* {item.status} */}
                {item.status === '未入驻' ? (
                  <span className={styles.ico} style={{ color: '#fff' }}>
                    {item.status}
                  </span>
                ) : null}
                {item.status === '已入驻' ? (
                  <span className={styles.un} style={{ color: '#fff' }}>
                    {item.status}
                  </span>
                ) : null}
                {item.status === '未入驻装修中' ? (
                  <span className={styles.uny} style={{ color: '#fff' }}>
                    {item.status}
                  </span>
                ) : null}
              </span>
              <Card className="park">
                <div style={{ backgroundColor: '#374148' }}>
                  <div className={styles.title}>1、问题描述：</div>
                  <div className={styles.des}>{item.question && item.question.des}</div>

                  <div className={styles.title}>2、问题详情：</div>

                  <div className={styles.des}>{item.question && item.question.detail}</div>

                  <div className={styles.title}>3、附件：</div>
                  {(item.question &&
                    item.question.attach.length &&
                    item.question.attach.map(i => (
                      <div className={styles.des}>
                        <a href={i.url} download>
                          {i.name}
                        </a>
                      </div>
                    ))) ||
                    '无'}
                  <div className={styles.title}>4、解决流程</div>
                  <ProcessList data={item.process || []} />
                </div>
              </Card>
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </Modal>
    );
  }
}

export default QuestionDialog;
