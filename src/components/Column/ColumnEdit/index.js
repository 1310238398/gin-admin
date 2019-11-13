import React, { PureComponent } from 'react';
import { Modal, Steps, Card, Row, Col } from 'antd';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const { Step } = Steps;

export default class ColumnEdit extends PureComponent {
  state = {
    formVisible: false,
    id: '',
    step: -1,
    submitting: false,
  };

  constructor(props) {
    super(props);
    const { step } = this.props;
    const state = {};
    if (step > -1) {
      state.step = step;
    }
    this.state = { ...this.state, ...state };
  }

  componentDidMount() {
    this.setState({ formVisible: true });
  }

  onModalCancelClick = () => {
    this.setState({ formVisible: false });
    this.execCallback();
  };

  onModalOKClick = () => {
    setTimeout(() => {
      const { step } = this.state;
      if (step === 0) {
        this.step1();
      }
      if (step === 1) {
        this.step2();
      }
      if (step === 2) {
        this.step3();
      }
    }, 1);
  };

  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'desc':
        return 0;
      case 'ctrl':
        return 1;
      case 'extra':
        return 2;
      default:
        return 0;
    }
  }

  execCallback = () => {
    const { chg } = this.state;
    this.props.callback(chg && 'ok');
    this.setState({ chg: false });
  };

  showStep = step => {
    const cobj = { step, formVisible: step !== -1 };
    const columnid = this.getColumnId();
    if (!columnid) {
      cobj.step = 0;
    }

    this.setState({ ...cobj });
  };

  setStep1Submit = handler => {
     this.step1 = handler;
  };

  step1Next = () => {
    this.showStep(1);
    this.setState({ chg: true });
  };

  step2Next = () => {
    this.showStep(2);
  };

  step3Next = () => {
    this.showStep(-1);
    this.execCallback();
  };

  setStep2Submit = handler => {
    this.step2 = handler;
  };

  setStep3Submit = handler => {
    this.step3 = handler;
  };

  idHandler = id => {
    this.setState({ id });
  };

  getColumnId = () => {
    const { columnId } = this.props;
    const { id } = this.state;
    return columnId || id;
  };

  render() {
    const { orgid } = this.props;
    const { formVisible, step, submitting } = this.state;
    const cstep = step === -1 ? this.props.step : step;
    const columnid = this.getColumnId();

    return (
      <Modal
        title={
          <Row>
            <Col span={3}>编辑栏目信息</Col>
            <Col span={12}>
              <Steps current={cstep}>
                <Step title={<span onClick={() => this.showStep(0)}>基础信息</span>} />
                <Step title={<span onClick={() => this.showStep(1)}>控制参数</span>} />
                <Step title={<span onClick={() => this.showStep(2)}>扩展参数</span>} />
              </Steps>
            </Col>
          </Row>
        }
        visible={formVisible}
        width="70%"
        maskClosable={false}
        confirmLoading={submitting}
        destroyOnClose
        onOk={this.onModalOKClick}
        onCancel={this.onModalCancelClick}
        style={{ top: 20 }}
        bodyStyle={{ height: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        <Card
          // title={
          //   <Steps current={cstep}>
          //     <Step title={<span onClick={() => this.showStep(0)}>基础信息</span>} />
          //     <Step title={<span onClick={() => this.showStep(1)}>控制参数</span>} />
          //     <Step title={<span onClick={() => this.showStep(2)}>扩展参数</span>} />
          //   </Steps>
          // }
          bodyStyle={{ height: 'calc(100vh - 210px)', overflowY: 'auto', width: '100%' }}
          style={{ width: '100%' }}
        >
          {cstep === 0 && (
            <Step1
              id={columnid}
              callback={this.setStep1Submit}
              idHandler={this.idHandler}
              nextHandler={this.step1Next}
              org={orgid}
            />
          )}
          {cstep === 1 && (
            <Step2
              id={columnid}
              org={orgid}
              callback={this.setStep2Submit}
              nextHandler={this.step2Next}
            />
          )}
          {cstep === 2 && (
            <Step3
              id={columnid}
              org={orgid}
              callback={this.setStep3Submit}
              nextHandler={this.step3Next}
            />
          )}
        </Card>
      </Modal>
    );
  }
}
