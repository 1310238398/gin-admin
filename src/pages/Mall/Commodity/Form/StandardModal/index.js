import React, { PureComponent } from 'react';

import { Modal, Button } from 'antd';
import styles from './index.less';
import standImg from '../../../../../assets/stand.png';

class StandardModal extends PureComponent {
  render() {
    const { title, onCancel } = this.props;
    return (
      <Modal
        title={title}
        width={480}
        visible
        maskClosable={false}
        destroyOnClose
        onOk={this.onOKClick}
        onCancel={onCancel}
        style={{ top: 20 }}
        footer={
          <Button className={styles.button} onClick={onCancel}>
            我知道了
          </Button>
        }
        bodyStyle={{ maxHeight: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        <div>
          <div className={styles.header}>
            <h2 className={styles.title}>商品规格示例</h2>
          </div>
          <div className={styles.connect}>
            <p className={styles.connect1}>在商品购买页选择商品规格时显示</p>
            <p>图例中：“套餐选择”为规格名 “虾仁鲜肉馄炖/全家福馄炖”为规格值</p>
            <img src={standImg} alt="" />
          </div>
        </div>
      </Modal>
    );
  }
}

export default StandardModal;
