import React from 'react';
import { Modal, Card, Tabs } from 'antd';
// import PDF from 'react-pdf-js';
import ProcessList from './ProcessList';
import styles from './index.less';
import styleq from './ProcessList.less';
import style from '../CompanyList.less';
import heyue from '../../../assets/heyue.png';

export default class StageDialog extends React.Component {
  state = {
    // bigImage: false,
    // ShowUrl: null,
    page: 0,
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  renderTitle = () => {
    const { item } = this.props;
    return (
      <div className={styles.topTitle}>
        <div>{item.name}</div>
      </div>
    );
  };

  // shouBigImage(event) {
  //   console.log(event);
  //   this.setState({
  //     ShowUrl: event,
  //     bigImage: true,
  //   });
  // }

  // hideBigImage() {
  //   this.setState({
  //     bigImage: false,
  //   });
  // }

  onDocumentComplete = pages => {
    this.setState({ page: 1, pages });
  };

  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
  };

  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
  };

  renderPagination = (page, pages) => {
    let previousButton = (
      <li className="previous" onClick={this.handlePrevious}>
        <a href="#">
          <i className="fa fa-arrow-left" /> 上一页
        </a>
      </li>
    );
    if (page === 1) {
      previousButton = (
        <li className="previous disabled">
          <a href="#">
            <i className="fa fa-arrow-left" /> 上一页
          </a>
        </li>
      );
    }
    let nextButton = (
      <li className="next" onClick={this.handleNext}>
        <a href="#">
          下一页 <i className="fa fa-arrow-right" />
        </a>
      </li>
    );
    if (page === pages) {
      nextButton = (
        <li className="next disabled">
          <a href="#">
            下一页 <i className="fa fa-arrow-right" />
          </a>
        </li>
      );
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
    );
  };

  render() {
    const { visible, item } = this.props;
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    return (
      <Modal
        title={this.renderTitle()}
        width={750}
        visible={visible}
        destroyOnClose
        onCancel={this.handleCancel}
        footer={null}
        className="darkModal"
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        <Card className="park" bodyStyle={{ padding: 0 }}>
          <Tabs>
            <Tabs.TabPane tab="企业基本信息" key="1">
              <Card className="chart">
                <span className={styleq.mark}>
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
                <div className={styles.itemCard}>
                  <div className={styles.infoItem}>
                    <div>
                      <span>企业联系人：</span>
                      <span>{item.qylxr}</span>
                    </div>
                    <div>
                      <span>{item.phone}</span>
                    </div>
                    <div>
                      <span>房号：</span>
                      <span>{item.mbwy}</span>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="park">
                <ProcessList />
              </Card>
            </Tabs.TabPane>
            <Tabs.TabPane tab="合同" key="2">
              <Card className="chart" style={{ marginLeft: '25px' }}>
                {/* <PDF
                  file="/assets/房屋租赁合同.pdf"
                  onDocumentComplete={this.onDocumentComplete}
                  page={this.state.page}
                /> */}
                {pagination}
              </Card>
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </Modal>
    );
  }
}
