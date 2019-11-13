import React, { PureComponent } from 'react';

import { Modal, Radio } from 'antd';
import CategorySelect from './CategorySelect';

class NumberPlateDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: props.formData ? props.formData : {},
      address: {},
      type:1,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    if ('formData' in nextProps) {
      return { ...state, data: nextProps.formData ? nextProps.formData : {} };
    }
    return state;
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

  onChangeRuzhu = value => {
    this.setState({
      type: parseInt(value.target.value,10),
    });
  };

  // 选择
  handleFormChange = (fields, item) => {
    const typeIn = this.state.type;
    this.setState({
      address: {
        btype: item.btype,
        building_id: item.record_id,
        building_name: fields,
        incoming_type:typeIn,
      },
    });
  };

  

  render() {
    const { visible, onCancel } = this.props;
    const { address,type } = this.state;
    return (
      <Modal
        title="选择企业地址"
        width={500}
        visible={visible}
        maskClosable={false}
        destroyOnClose
        onOk={this.onOKClick}
        onCancel={onCancel}
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        <div>
          <span>入驻方式:</span>
          <Radio.Group defaultValue={1} onChange={this.onChangeRuzhu} value={type}>
            <Radio value={1}>购买</Radio>
            <Radio value={2}>租赁</Radio>
            <Radio value={3}>自用</Radio>
          </Radio.Group>

          <CategorySelect data={address} onChange={this.handleFormChange} />
        </div>
      </Modal>
    );
  }
}

export default NumberPlateDetail;
