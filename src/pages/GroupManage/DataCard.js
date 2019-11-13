import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Steps, Card } from 'antd';
import Step1 from './Step1';
import Step2 from './Step2';

const { Step } = Steps;
@connect(state => ({
  groupManage: state.groupManage,
}))
export default class DataCard extends PureComponent {
  componentDidMount() {
    const { id, callback } = this.props;
    this.props.dispatch({
      type: 'groupManage/loadForm',
      payload: {
        id,
        callback,
      },
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'groupManage/saveFormCtrlData',
      payload: {},
    });
    dispatch({
      type: 'groupManage/saveFormData',
      payload: {},
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'groupManage/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  onModalOKClick = () => {
    setTimeout(() => {
      const {
        groupManage: { step },
      } = this.props;
      if (step === 0) {
        this.step1();
      }
      if (step === 1) {
        this.step2();
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

  render() {
    const {
      groupManage: { formTitle, formVisible, submitting, step },
      id,
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
            </Steps>
          }
          bodyStyle={{ height: 500, overflowY: 'auto', width: '100%' }}
          style={{ width: '100%' }}
        >
          {formVisible && step === 0 && <Step1 id={id} callback={this.setStep1Submit} />}
          {formVisible && step === 1 && <Step2 id={id} callback={this.setStep2Submit} />}
        </Card>
      </Modal>
    );
  }
}
