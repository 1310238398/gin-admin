/* eslint-disable react/react-in-jsx-scope */
import React, { PureComponent } from 'react';
import { Modal, Button, Card } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import DescriptionList from '@/components/DescriptionList';
import styles from './Qualification.less';

const { Description } = DescriptionList;
@connect(state => ({
  qualification: state.qualification,
}))
export default class QualificationInfo extends PureComponent {
  state = { bigImage: false, ShowUrl: null };

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type } = this.props;
    this.props.dispatch({
      type: 'qualification/loadForm',
      payload: {
        id,
        type,
      },
    });
  }


  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'qualification/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  hideBigImage() {
    this.setState({
      bigImage: false,
    });
  }

  shouBigImage(event) {
    this.setState({
      ShowUrl: event,
      bigImage: true,
    });
  }

  /**
   * 界面渲染
   */
  render() {
    const {
      qualification: { formData },
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
        title="查看资质信息"
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.onCloseCallback}
        footer={footerJsx}
      >
        <div className={styles.main}>
          <Card title="资质基本信息" bordered={false}>
            <div className={styles.form} style={{ marginTop: 25 }}>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="资质名称">{formData.name}</Description>
                <Description term="广告主">{formData.advertiser_name}</Description>
              </DescriptionList>
              <DescriptionList>
                <Description term="资质文件">
                  <div
                    className={styles.formImage}
                    style={{ width: 147, height: 147, marginLeft: 20 }}
                  >
                    <img
                      src={formData.logo}
                      alt="资质证书"
                      onClick={() => this.shouBigImage(formData.logo)}
                    />
                  </div>
                </Description>
                <Description term="资质过期时间">{formData.contacter}</Description>
              </DescriptionList>
            </div>
          </Card>
        </div>
        {this.state.bigImage ? (
          <div className={styles.popoverbackdrop} onClick={() => this.hideBigImage()}>
            <img className={styles.imgresponsive} src={this.state.ShowUrl} alt="查看失败" />
          </div>
        ) : null}
      </Modal>
    );
    return resultJsx;
  }
}
