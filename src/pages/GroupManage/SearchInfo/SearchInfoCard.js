import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import InfoSelect from './InfoSelect';

@connect(state => ({
  groupInfo: state.groupInfo,
}))
export default class SearchInfoCard extends PureComponent {
  state = {
    selectedRowKeys: {},
    selectedRows: {},
  };

  componentDidMount() {
    const { callback } = this.props;
    this.props.dispatch({
      type: 'groupInfo/loadForm',
      payload: {
        callback,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'groupInfo/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  onModalOKClick = () => {
    const { okHandler } = this.props;
    okHandler(this.state.selectedRowKeys, this.state.selectedRows);
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  };

  render() {
    const {
      groupInfo: { formVisible, submitting },
    } = this.props;

    return (
      <Modal
        title="信息选择"
        visible={formVisible}
        width="70%"
        maskClosable={false}
        confirmLoading={submitting}
        destroyOnClose
        onOk={this.onModalOKClick}
        onCancel={this.onModalCancelClick}
        style={{ top: 20 }}
      >
        <InfoSelect onSelectChange={this.onSelectChange} />
      </Modal>
    );
  }
}
