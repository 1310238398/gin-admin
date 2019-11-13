import React from 'react';
import { Modal } from 'antd';

import styles from './index.less';

class MonitorShowModal extends React.Component {
  componentDidMount() {
    this.frameID = window.imosSdk.createPanelWindow();

    setTimeout(() => {
      this.mount.appendChild(this.frameID);
      const { formData } = this.props;
      const deviceCode = formData.device_code;
      window.imosSdk.imosSdkPlayLive(this.frameID, deviceCode, deviceCode, () => {});
    });
  }

  componentWillUnmount() {
    this.mount.removeChild(this.frameID);
  }

  render() {
    const { visible, title, onCancel } = this.props;

    return (
      <Modal
        title={title}
        width={850}
        visible={visible}
        maskClosable={false}
        footer={null}
        destroyOnClose
        onCancel={onCancel}
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        <div
          className={styles.main}
          ref={mount => {
            this.mount = mount;
          }}
        />
      </Modal>
    );
  }
}

export default MonitorShowModal;
