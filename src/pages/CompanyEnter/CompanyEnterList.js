import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, List } from 'antd';

import SignDialog from './sign/SignDialog';
import QuestionDialog from './question/QuestionDialog';
import styles from './CompanyList.less';
import EntriespriseDialog from '../PrecisionInvestment/EntriespriseDialog';
import StageDialog from './StageDialog';

@connect(state => ({
  infoManage: state.infoManage,
}))
@Form.create()
export default class CompanyEnterList extends PureComponent {
  state = {
    signVisible: false,
    questionItem: {},
    SignDialogItem: {},
    questionVisible: false,
    loading: false,
    data: {},
    stageVisible: false,
    enterpriseVisible: false,
    activeItem: {},
    dataSet: [],
    // bigImage: false,
    // ShowUrl: null,
  };

  searchObj = { status: [0, 2, 5] };

  componentDidMount() {}

  onSearch = formData => {
    this.setState({ loading: true });
    console.log('ggg');
    setTimeout(() => {
      this.setState({ loading: false });
    }, 200);
    /* this.setState(item,)
     this.props.dispatch({
       type: 'infoManage/fetch',
       payload: formData,
     }); */
  };

  onQuestion = item => {
    this.setState({ questionVisible: true, questionItem: item });
    console.log(item);
  };

  onItemDesc = (id, record) => {
    this.setState({
      dataForm: true,
      dataFormID: record.info_id,
      dataType: record.desc.kind,
    });
  };

  sign = item => {
    this.setState({ signVisible: true, SignDialogItem: item });
  };

  handleDetailClick = item => {
    console.log('stageVisible');
    this.setState({ stageVisible: true, activeItem: item });
  };

  handleDetailCancel = () => {
    this.setState({ stageVisible: false });
  };

  handleItemCancel = () => {
    this.setState({ enterpriseVisible: false });
  };

  handleItemClick = item => {
    this.setState({ enterpriseVisible: true, activeItem: item });
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

  renderItem = item => {
    return (
      <Card
        className="chart"
        title={
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => {
              this.handleItemClick(item);
            }}
          >
            {item.name}
          </span>
        }
      >
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
        <ul className={styles.itemContent}>
          <li>
            <span>签约时间：</span>
            <span>{item.signTime}</span>
          </li>
          <li>
            <span>到期时间：</span>
            <span>{item.endTime}</span>
          </li>
          <li>
            <span>招商负责人：</span>
            <span>{item.qylxr}</span>
          </li>
          <li>
            <span>企业联系人：</span>
            <span>{item.zsfzr}</span>
          </li>
          <li>
            <span>问题：</span>
            <span onClick={() => this.onQuestion(item)}>
              {/* <a>{parseInt(item.unDoCount) + parseInt(item.doCount)}</a> */}
              <a>{parseInt(item.unDoCount, 10)}</a>
            </span>
            <span style={{ marginLeft: '30px' }}>申请：</span>
            <span onClick={() => this.sign(item)}>
              {/* <a>{parseInt(item.unAggree) + parseInt(item.doAggree)}</a> */}
              <a>{parseInt(item.unAggree, 10)}</a>
            </span>
            {/* <span style={{ marginLeft: '30px', color: '#2787e1' }}>合约：</span>
            <span>
              <img
                src={heyue}
                alt=""
                style={{ width: '30px', height: '30px' }}
                onClick={() => this.shouBigImage(heyue)}
              />
            </span> */}
          </li>
        </ul>
        <div className={styles.itemDetail}>
          <span
            onClick={() => {
              this.handleDetailClick(item);
            }}
          >
            查看详情
          </span>
        </div>
      </Card>
    );
  };

  render() {
    // 新增类型
    const {
      signVisible,
      questionVisible,
      stageVisible,
      activeItem,
      enterpriseVisible,
    } = this.state;
    const { dataSet } = this.props;
    return [
      <Card bordered={false} className="park">
        <List
          rowKey="id"
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          className={styles.list}
          dataSource={dataSet}
          renderItem={item => <List.Item>{this.renderItem(item)}</List.Item>}
        />
      </Card>,
      signVisible && (
        <SignDialog
          key="member"
          visible={this.state.signVisible}
          onCancel={() => {
            this.setState({ signVisible: false });
          }}
          MEemberDatas={this.state.SignDialogItem}
        />
      ),
      questionVisible && (
        <QuestionDialog
          key="member1"
          questionVisible={this.state.questionVisible}
          onCancel={() => {
            this.setState({ questionVisible: false });
          }}
          item={this.state.questionItem}
        />
      ),
      // this.state.bigImage && (
      //   <div className={styles.popoverbackdrop} onClick={() => this.hideBigImage()}>
      //     <img className={styles.imgresponsive} src={this.state.ShowUrl} alt="查看失败" />
      //   </div>
      // ),
      <StageDialog
        visible={stageVisible}
        item={activeItem}
        onCancel={() => {
          this.handleDetailCancel();
        }}
      />,
      <EntriespriseDialog
        visible={enterpriseVisible}
        name={activeItem.name}
        onCancel={() => {
          this.handleItemCancel();
        }}
      />,
    ];
  }
}
