/* eslint-disable react/react-in-jsx-scope */
import React, { PureComponent } from 'react';
import { Modal, Button, Card } from 'antd';
import { connect } from 'dva';
import DescriptionList from '@/components/DescriptionList';
import styles from './Advertiser.less';

const { Description } = DescriptionList;
@connect(state => ({
  advertiser: state.advertiser,
}))
export default class AdvertiserInfo extends PureComponent {
  state = {};

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type } = this.props;
    this.props.dispatch({
      type: 'advertiser/loadForm',
      payload: {
        id,
        type,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'advertiser/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  /**
   * 界面渲染
   */
  render() {
    const {
      agent: { formData },
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
        title="查看广告主信息"
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.onCloseCallback}
        footer={footerJsx}
      >
        <div className={styles.main}>
          <Card title="广告主基本信息" bordered={false}>
            <div className={styles.form} style={{ marginTop: 25 }}>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="名称">{formData.name}</Description>
                <Description term="代理商名称">{formData.agent_name}</Description>
                <Description term="公司地址">{formData.address}</Description>
              </DescriptionList>
              <DescriptionList>
                <Description term="电话">{formData.phone}</Description>
                <Description term="联系人">{formData.contacter}</Description>
              </DescriptionList>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="图标">
                  <img src={formData.logo} alt="图标" style={{width:'100px',height:'100px'}} />
                </Description>
                <Description term="备注">{formData.memo}</Description>
              </DescriptionList>
            </div>
          </Card>
        </div>
      </Modal>
    );
    return resultJsx;
  }
}
