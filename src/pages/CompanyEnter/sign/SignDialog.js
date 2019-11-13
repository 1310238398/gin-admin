import React from 'react';
import { Modal, Timeline, Card, Row, Col, Tabs, Button } from 'antd';
import zhaji01 from '@/assets/zhaji01@2x.png';
import zhaji03 from '@/assets/zhaji03@2x.png';
import roomImg from '../../../assets/roomImg.jpg';
import ProcessList from './ProcessList';
import getMockData from '@/services/s_mockData';
import style from './ProcessList.less';
import SignnoPassLog from './SignnoPassLog';

class SignDialog extends React.Component {
  state = {
    MEemberData: {
      id: '1',
      name: '田念收',
      tel: '15564565788',
      enterpriseName: '汉峪金谷A2-2-1102',
      unitiy: '济高绿城物业',
      fuzeName: '韩振东',
      fuzeTel: '15188399200',
      fromEndTime: '2019-02-12~2019-02-24',
    },
    yishenhe: {
      id: '1',
      name: '王静茹',
      tel: '15879457818',
      enterpriseName: '汉峪金谷A1-2-1102',
      unitiy: '济高绿城物业',
      fuzeName: '岳彩彩',
      fuzeTel: '15148398900',
      fromEndTime: '2019-02-12~2019-04-24',
    },
    bigImage: false,
    ShowUrl: null,
    bigyishenImage: false,
    ShowyishenUrl: null,
    menuItem: '1',
    showReasonInfo: false,
    weitonguo: this.props.MEemberDatas.unAggree,
  };

  componentDidMount() {
    getMockData('enterprise_singdialog.json').then(data => {
      this.setState({ MEemberData: data });
    });
    getMockData('enterprise_singyishenhe.json').then(data => {
      this.setState({ yishenhe: data });
    });
  }

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  hideBigImage() {
    this.setState({
      bigImage: false,
    });
  }

  // {this.renderItem( '发起申请','申请时间：2019-01-23 08:23:18', '申请人：侯婷婷','15245687878')}
  // renderItem = (tiluchengme, time, appliction,tel) => {
  //   return (
  //     <Timeline.Item color="#FFC400">
  //       <p style={{ color: '#A6B9C8', fontSize: '12px' }}>{tiluchengme}</p>
  //       <Row style={{ backgroundColor: '#2A3136', padding: 10 }}>
  //         <Col style={{ marginBottom: 10, color: '#fff', fontSize: 14 }}>{time}</Col>
  //         <Col>
  //           <Row gutter={6}>
  //             <Col span={24}>
  //               <img src={img1} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
  //             </Col>
  //             <Col span={12}>
  //               <img src={img2} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
  //             </Col>
  //           </Row>
  //         </Col>
  //       </Row>
  //     </Timeline.Item>
  //   );
  // };
  shouBigImage(event) {
    console.log(event);
    this.setState({
      ShowUrl: event,
      bigImage: true,
    });
  }

  shouyishenBigImage(event) {
    console.log(event);
    this.setState({
      ShowyishenUrl: event,
      bigyishenImage: true,
    });
  }

  hideyishenBigImage() {
    this.setState({
      bigyishenImage: false,
    });
  }

  passShen = () => {
    const testl = this.state.weitonguo;
    this.setState({ menuItem: '2', weitonguo: testl - 1 });
  };

  callback = key => {
    this.setState({ menuItem: key });
  };

  rejustReason = () => {
    this.setState({
      showReasonInfo: true,
    });
  };

  render() {
    const { visible, MEemberDatas } = this.props;
    const { MEemberData, yishenhe, weitonguo } = this.state;
    console.log(MEemberDatas);
    const unDo = `未审批(${weitonguo || 1})`;
    const Do = `已审批(${MEemberDatas.doAggree || 1})`;
    const weishen = [
      {
        name: '发起申请',
        date: '2019/2/14  14:00',
        appliction: '侯婷婷',
        tel: '15847895678',
        status: '1',
        liuc: '0',
      },
      { name: '申请待审批', status: '0', liuc: '1' },
    ];
    const yiweishen = [
      {
        name: '发起申请',
        date: '2019/2/15  9:00',
        appliction: '侯婷婷',
        tel: '15847895678',
        status: '1',
        liuc: '0',
      },
      {
        name: '审批通过',
        status: '0',
        date: '2019/3/03 16:00',
        appliction: '韩振东',
        tel: '15545786856',
        liuc: '0',
      },
    ];
    return (
      <Modal
        width={625}
        visible={visible}
        destroyOnClose
        onCancel={this.handleCancel}
        footer={null}
        className="darkModal"
        style={{ top: 20 }}
      >
        <Card className="park" style={{ padding: 0 }}>
          <Tabs activeKey={this.state.menuItem} onChange={this.callback}>
            <Tabs.TabPane tab={unDo} key="1">
              <Card className="park">
                <p>
                  <span style={{ color: '#FFC400', border: '2px solid #FFC400' }} />
                  <span
                    style={{
                      color: '#FFC400',
                      fontSize: '14px',
                      marginLeft: '5px',
                    }}
                  >
                    业主信息
                  </span>
                </p>
                <div style={{ backgroundColor: '#374148' }}>
                  <p>
                    业主姓名：
                    {MEemberData.name}
                  </p>
                  <p>
                    电话：
                    {MEemberData.tel}
                  </p>
                  <p>
                    房号：
                    {MEemberData.enterpriseName}
                  </p>
                </div>
                <p>
                  <span style={{ color: '#FFC400', border: '2px solid #FFC400' }} />
                  <span
                    style={{
                      color: '#FFC400',
                      fontSize: '14px',
                      marginLeft: '5px',
                    }}
                  >
                    装修单位
                  </span>
                </p>
                <div style={{ backgroundColor: '#374148' }}>
                  <p>
                    单位名称：
                    {MEemberData.unitiy}
                  </p>
                  <p>
                    负责人姓名：
                    {MEemberData.fuzeName}
                  </p>
                  <p>
                    联系电话：
                    {MEemberData.fuzeTel}
                  </p>

                  <p>
                    装修起止时间：
                    {MEemberData.fromEndTime}
                  </p>
                </div>
                <div style={{ backgroundColor: '#374148' }}>
                  <p>
                    图纸：
                    <img
                      src={roomImg}
                      alt=""
                      style={{ width: '70px', height: '80px' }}
                      onClick={() => this.shouBigImage(roomImg)}
                    />
                  </p>
                </div>
                <p>
                  <span style={{ color: '#FFC400', border: '2px solid #FFC400' }} />
                  <span
                    style={{
                      color: '#FFC400',
                      fontSize: '14px',
                      marginLeft: '5px',
                    }}
                  >
                    审批流程
                  </span>
                </p>
                <ProcessList chuanData={weishen} />
              </Card>
              <div className={style.oppass}>
                <Button type="primary" style={{ marginRight: '20px' }} onClick={this.passShen}>
                  通过
                </Button>
                <Button type="danger" onClick={this.rejustReason}>
                  拒绝
                </Button>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab={Do} key="2">
              <Card className="park">
                <p>
                  <span style={{ color: '#FFC400', border: '2px solid #FFC400' }} />
                  <span
                    style={{
                      color: '#FFC400',
                      fontSize: '14px',
                      marginLeft: '5px',
                    }}
                  >
                    业主信息
                  </span>
                </p>
                <div style={{ backgroundColor: '#374148' }}>
                  <p>
                    业主姓名：
                    {yishenhe.name}
                  </p>
                  <p>
                    电话：
                    {yishenhe.tel}
                  </p>
                  <p>
                    房号：
                    {yishenhe.enterpriseName}
                  </p>
                </div>
                <p>
                  <span style={{ color: '#FFC400', border: '2px solid #FFC400' }} />
                  <span
                    style={{
                      color: '#FFC400',
                      fontSize: '14px',
                      marginLeft: '5px',
                    }}
                  >
                    装修单位
                  </span>
                </p>
                <div style={{ backgroundColor: '#374148' }}>
                  <p>
                    单位名称：
                    {yishenhe.unitiy}
                  </p>
                  <p>
                    负责人姓名：
                    {yishenhe.fuzeName}
                  </p>
                  <p>
                    联系电话：
                    {yishenhe.fuzeTel}
                  </p>

                  <p>
                    装修起止时间：
                    {yishenhe.fromEndTime}
                  </p>
                </div>

                <div style={{ backgroundColor: '#374148' }}>
                  <p>
                    图纸：
                    <img
                      src={roomImg}
                      alt=""
                      style={{ width: '70px', height: '80px' }}
                      onClick={() => this.shouyishenBigImage(roomImg)}
                    />
                  </p>
                </div>
                <p>
                  <span style={{ color: '#FFC400', border: '2px solid #FFC400' }} />
                  <span
                    style={{
                      color: '#FFC400',
                      fontSize: '14px',
                      marginLeft: '5px',
                    }}
                  >
                    审批流程
                  </span>
                </p>
                <ProcessList chuanData={yiweishen} />
              </Card>
            </Tabs.TabPane>
          </Tabs>
        </Card>
        {this.state.bigImage ? (
          <div className={style.popoverbackdrop} onClick={() => this.hideBigImage()}>
            <img className={style.imgresponsive} src={this.state.ShowUrl} alt="查看失败" />
          </div>
        ) : null}
        {this.state.bigyishenImage ? (
          <div className={style.popoverbackdrop} onClick={() => this.hideyishenBigImage()}>
            <img className={style.imgresponsive} src={this.state.ShowyishenUrl} alt="查看失败" />
          </div>
        ) : null}
        {this.state.showReasonInfo && (
          <SignnoPassLog
            visible={this.state.showReasonInfo}
            onCancel={() => {
              this.setState({ showReasonInfo: false });
            }}
          />
        )}
      </Modal>
    );
  }
}

export default SignDialog;
