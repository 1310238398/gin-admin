import React, { PureComponent } from 'react';

import { Modal } from 'antd';
import CategorySelect from './CategorySelect';

class NumberPlateDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: props.formData ? props.formData : {},
      address: {},
    };
  }

  // 点击取消
  onCancelClick = () => {
    const { callback } = this.props;
    callback();
  };

  // 点击确定
  onOKClick = () => {
    const { address } = this.state;
    this.props.onSubmit(address);
  };

  // 选择
  handleFormChange = (fields, item) => {
    this.setState({
      address: {
        record_id: item.record_id,
        name: fields,
      },
    });
  };

  render() {
    const { visible, onCancel } = this.props;
    const { address } = this.state;
    return (
      <Modal
        title="选择所属分组"
        width={347}
        visible={visible}
        maskClosable={false}
        destroyOnClose
        onOk={this.onOKClick}
        onCancel={onCancel}
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        <CategorySelect data={address} onChange={this.handleFormChange} />
      </Modal>
    );
  }
}

export default NumberPlateDetail;
