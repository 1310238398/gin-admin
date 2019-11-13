import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Steps, Card } from 'antd';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const { Step } = Steps;
@connect(state => ({
  columnInfoCol: state.columnInfoCol,
}))
export default class DataCard extends PureComponent {
  componentDidMount() {
    const { id, callback } = this.props;
    this.props.dispatch({
      type: 'columnInfoCol/loadForm',
      payload: {
        id,
        callback,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'columnInfoCol/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  onModalOKClick = () => {
    setTimeout(() => {
      const {
        columnInfoCol: { step },
      } = this.props;
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

  setStep1Submit = handler => {
    this.step1 = handler;
  };

  setStep2Submit = handler => {
    this.step2 = handler;
  };

  setStep3Submit = handler => {
    this.step3 = handler;
  };

  render() {
    const {
      columnInfoCol: { formTitle, formVisible, submitting, formID, step },
    } = this.props;

    return (
      <Modal
        title={formTitle}
        visible={formVisible}
        width="70%"
        maskClosable={false}
        confirmLoading={submitting}
        destroyOnClose
        onOk={this.onModalOKClick}
        onCancel={this.onModalCancelClick}
        style={{ top: 20 }}
        bodyStyle={{ maxWidth: 1280 }}
      >
        <Card
          title={
            <Steps current={step}>
              <Step title="基础信息" />
              <Step title="控制参数" />
              <Step title="扩展参数" />
            </Steps>
          }
          bodyStyle={{ height: 500, overflowY: 'auto', width: '100%' }}
          style={{ width: '100%' }}
        >
          {step === 0 && <Step1 id={formID} callback={this.setStep1Submit} />}
          {step === 1 && <Step2 id={formID} callback={this.setStep2Submit} />}
          {step === 2 && <Step3 id={formID} callback={this.setStep3Submit} />}
        </Card>
      </Modal>
    );
  }
}
