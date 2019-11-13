import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Drawer, Button, Modal, Input } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import { InfoDetail } from '../../components/Info';

const { TextArea } = Input;
const { Description } = DescriptionList;

@connect(state => ({
  feedbackManage: state.feedbackManage,
}))
export default class InfoCard extends PureComponent {
  state = {
    value: null,
  };

  componentDidMount() {
    const { callback } = this.props;
    this.props.dispatch({
      type: 'feedbackManage/saveFormCallback',
      payload: result => {
        this.setState({ visible: false, visibleNo: false });
        callback(result);
      },
    });
  }

  onClose = () => {
    this.props.callback();
  };

  onOkTextChange = value => {
    this.setState({ value });
  };

  onSubmitOK = () => {
    const { id } = this.props;
    this.props.dispatch({
      type: 'feedbackManage/submitOk',
      payload: {
        targetID: id,
        targetType: 1,
        reason: this.state.value,
      },
    });
  };

  onSubmitNo = () => {
    const { id } = this.props;
    this.props.dispatch({
      type: 'feedbackManage/submitNo',
      payload: {
        targetID: id,
        targetType: 1,
        reason: this.state.value,
      },
    });
  };

  onCommit = record => {
    this.props.dispatch({
      type: 'feedbackManage/commit',
      payload: record.info_id,
    });
  };

  showExtra = () => {
    const {
      infoManage: { formData },
    } = this.props;

    const { ctrl } = formData;
    if (!ctrl) {
      return;
    }
    const { desc } = formData;
    return ctrl.map(item => {
      const initv = desc && desc.extras && desc.extras[item.code] ? desc.extras[item.code] : '';
      return <Description term={item.name}>{initv}</Description>;
    });
  };

  handlerOk = () => {
    this.setState({ visible: true });
  };

  handlerNo = () => {
    this.setState({ visibleNo: true });
  };

  handlerOkHide = () => {
    this.setState({ visible: false });
  };

  renderOk = () => {
    if (this.state.visible) {
      return (
        <Modal
          title="处理完成"
          visible={this.state.visible}
          onOk={this.onSubmitOK}
          onCancel={this.handlerOkHide}
          okButtonProps={{ disabled: !this.state.value }}
          okText="确认"
          destroyOnClose
          cancelText="取消"
        >
          <TextArea
            placeholder="输入处理结果"
            onChange={v => this.onOkTextChange(v.target.value)}
            autosize={{ minRows: 4, maxRows: 5 }}
          />
        </Modal>
      );
    }
  };

  renderNo = () => {
    if (this.state.visibleNo) {
      return (
        <Modal
          title="放弃处理"
          visible={this.state.visibleNo}
          onOk={this.onSubmitNo}
          onCancel={this.handlerOkHide}
          okButtonProps={{ disabled: !this.state.value }}
          okText="确认"
          destroyOnClose
          cancelText="取消"
        >
          <TextArea
            placeholder="输入放弃处理原因"
            onChange={v => this.onOkTextChange(v.target.value)}
            autosize={{ minRows: 4, maxRows: 5 }}
          />
        </Modal>
      );
    }
  };

  renderActions = record => {
    if (record && record.status.status === 1) {
      return [
        <Button onClick={() => this.handlerOk(record)}>处理完成</Button>,
        <Button onClick={() => this.handlerNo(record)}>放弃处理</Button>,
      ];
    }
    if (record && record.status.status === 0) {
      return [<Button onClick={() => this.onCommit(record)}>提交处理</Button>];
    }
    return null;
  };

  render() {
    const { id } = this.props;

    // const desc = formData.desc ? formData.desc : {};

    return (
      <Drawer
        title="信息详情"
        placement="right"
        destroyOnClose
        closable={false}
        onClose={this.onClose}
        visible
        width="50%"
      >
        <InfoDetail
          value={id}
          actions={record => this.renderActions(record)}
          logcode="cms$#infos$#feedbackaction"
        />
        {this.renderOk()}
        {this.renderNo()}
      </Drawer>
    );
  }
}
