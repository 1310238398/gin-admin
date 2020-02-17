/* eslint-disable react/react-in-jsx-scope */
import React, { PureComponent } from 'react';
import { Modal, Tag, Button, Card } from 'antd';
import { connect } from 'dva';
import DescriptionList from '@/components/DescriptionList';
import { DicShow } from '@/components/Dictionary';
import styles from './AdvertPosition.less';

const { Description } = DescriptionList;
@connect(state => ({
  advertPosition: state.advertPosition,
}))
export default class AdvertPositionInfo extends PureComponent {
  state = {};

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type } = this.props;
    this.props.dispatch({
      type: 'advertPosition/loadForm',
      payload: {
        id,
        type,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'advertPosition/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  /**
   * 界面渲染
   */
  render() {
    const {
      advertPosition: { formData },
    } = this.props;

    const footerJsx = [
      <Button key="close" onClick={this.props.onCloseCallback}>
        关闭
      </Button>,
    ];
    const resultJsx = (
      <Modal
        className={styles.frame}
        visible
        title="查看广告位信息"
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.onCloseCallback}
        footer={footerJsx}
      >
        <div className={styles.main}>
          <Card title="广告位基本信息" bordered={false}>
            <div className={styles.form} style={{ marginTop: 25 }}>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="广告位名称">{formData.name}</Description>
                <Description term="广告位标识码">{formData.code}</Description>
              </DescriptionList>
              <DescriptionList>
                <Description term="广告位位置">{formData.location}</Description>
                <Description term="广告位类型">
                  {<DicShow pcode="mall$#advertisPostion" code={[formData.atype]} show={name} />}
                </Description>
              </DescriptionList>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="最大投放数量">{formData.max_count}</Description>
                <Description term="说明">{formData.memo}</Description>
              </DescriptionList>
            </div>
          </Card>
        </div>
      </Modal>
    );
    return resultJsx;
  }
}
