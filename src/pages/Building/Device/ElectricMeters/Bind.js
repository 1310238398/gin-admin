import React, { PureComponent } from 'react';
import { Card, Modal, notification } from 'antd';
import ZoneTree from '@/components/ZoneTree';
import styles from './Bind.less';
import * as electricMetersService from '@/services/electricMeters';

export default class extends PureComponent {
  building_id = '';

  onModalOKClick = () => {
    const { editDevice, onSaved } = this.props;
    if (this.building_id === '') {
      notification.error({
        key: 'no-building_id',
        message: '必须选择一个建筑位置',
        description: `电表必须绑定在一个确定的建筑位置（门牌号）！`,
      });
    } else {
      const body = {
        building_id: this.building_id,
        record_id: editDevice.record_id,
      };
      electricMetersService.bind(body).then(res => {
        if (res.status && res.status === 'OK') {
          notification.success({
            key: 'success',
            message: '电表绑定成功',
            description: `电表绑定成功！`,
          });
          onSaved();
        }
      });
    }
  };

  onModalCancelClick = () => {
    const { onClose } = this.props;
    onClose();
  };

  onTreeNodeSelect = data => {
    this.building_id = data == null ? '' : data.key;
  };

  render() {
    const { editVisible, editDevice } = this.props;

    return (
      <Modal
        title="绑定新门牌"
        width={800}
        visible={editVisible}
        okText="保存"
        cancelText="关闭"
        onOk={this.onModalOKClick}
        onCancel={this.onModalCancelClick}
      >
        <Card bordered={false} className={styles.gate}>
          {editDevice.building_name && (
            <div className={styles.zoneOld}>原门牌： {editDevice.building_name}</div>
          )}
          <div className={styles['zone-box']}>
            <ZoneTree onSelect={this.onTreeNodeSelect} />
          </div>
        </Card>
      </Modal>
    );
  }
}
