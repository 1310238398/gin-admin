import React, { PureComponent } from 'react';

import { Modal } from 'antd';
import StockForm from './StockForm';

class CommodityManagementDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: props.stockData ? props.stockData : {},
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    if ('stockData' in nextProps) {
      return { ...state, data: nextProps.stockData ? nextProps.stockData : {} };
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
    const { data } = this.state;
    this.props.onSubmit(data);
  };

  // 选择
  handleFormChange = fields => {
    for (const key in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, key)) {
        const { data } = this.state;
        const newData = { ...data };
        newData[key] = fields[key].value;
        this.setState({ data: newData });
        const { onChange } = this.props;
        onChange(newData);
      }
    }
  };

  render() {
    const { title, visible, onCancel } = this.props;
    const { data } = this.state;
    return (
      <Modal
        title={title}
        width={347}
        visible={visible}
        maskClosable={false}
        destroyOnClose
        onOk={this.onOKClick}
        onCancel={onCancel}
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        <StockForm data={data} onChange={this.handleFormChange} />
      </Modal>
    );
  }
}

export default CommodityManagementDetail;
