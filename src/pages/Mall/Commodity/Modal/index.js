import React, { PureComponent } from 'react';
import { Modal } from 'antd';
import CommodityForm from '../Form';

class CommodityModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: props.dataPro ? props.dataPro : {},
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    if ('dataPro' in nextProps) {
      return { ...state, data: nextProps.dataPro ? nextProps.dataPro : {} };
    }
    return state;
  }

  handleOKClick = () => {
    const { data } = this.state;
    this.props.callbackPro(data);
  };

  handleFormChange = fields => {
    for (const key in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, key)) {
        const { data } = this.state;
        const newData = { ...data };
        newData[key] = fields[key].value;
        if (key === 'norm_value') {
          const normList = data.norm_list ? data.norm_list : [];
          const normValue = fields.norm_value.value;

          let newNormList = [];
          for (let i = 0; i < normValue.length; i += 1) {
            let exists = false;
            for (let j = 0; j < normList.length; j += 1) {
              if (normList[j].name === normValue[i]) {
                newNormList = [...newNormList, normList[j]];
                exists = true;
                break;
              }
            }

            if (!exists) {
              newNormList = [
                ...newNormList,
                {
                  name: normValue[i],
                  code: '',
                  price: 0,
                  stock: 0,
                  image: [],
                },
              ];
            }
          }
          newData.norm_list = newNormList;
        }
        this.setState({ data: newData });

        const { onChange } = this.props;
        onChange(newData);
      }
    }
  };

  render() {
    const { visible, title, closeBack } = this.props;
    const { data } = this.state;
    return (
      <Modal
        title={title}
        width={1000}
        visible={visible}
        maskClosable={false}
        destroyOnClose
        onOk={this.handleOKClick}
        onCancel={closeBack}
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        <CommodityForm data={data} onChange={this.handleFormChange} />
      </Modal>
    );
  }
}

export default CommodityModal;
