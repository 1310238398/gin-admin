import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Modal, Card, Button } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import { parseUtcTime } from '../../utils/utils';
import UserTypeShow from '../Enterprise/UserType/ShowNew';
import PostionShow from '@/components/EnterprisePosition/PostionShow';
import styles from './info.less';

const { Description } = DescriptionList;
@connect(state => ({
  faceEntry: state.faceEntry,
}))
@Form.create()

//  企业入驻的模态对话框组件。
export default class FaceEntryDetail extends PureComponent {
  state = {
    bigImage: false,
    ShowUrl: null,
  };

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type } = this.props;
    this.props.dispatch({
      type: 'faceEntry/loadForm',
      payload: {
        id,
        type,
      },
    });
  }

  rendSource = value => {
    switch (value) {
      case 'wx':
        return '微信';
      case 'oper':
        return '运营平台';
      default:
        return 'app';
    }
  };

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'faceEntry/changeFormVisible',
      payload: false,
    });
    this.props.callback("ok");
  };

  shouBigImage(event) {
    this.setState({
      ShowUrl: event,
      bigImage: true,
    });
  }

  hideBigImage() {
    this.setState({
      bigImage: false,
    });
  }

  renderFirstView = () => {
    const {
      faceEntry: { formData },
    } = this.props;
   
    return (
      <div className={styles.main}>
        <Card title="" bordered={false}>
          <div className={styles.topInfoLeft}>
            {formData.human_face ? (
              <img
                src={formData.human_face}
                style={{ width: 100, height: 100 }}
                onClick={() => this.shouBigImage(formData.human_face)}
                alt=""
              />
            ) : (
              '暂无人脸数据'
            )}
          </div>
          <div className={styles.form} style={{ marginTop: 25 }}>
            <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
              <Description term="用户姓名">{formData.real_name}</Description>
              <Description term="用户手机号">{formData.phone}</Description>
              <Description term="性别">{formData.gender === 1 ? '男' : '女'}</Description>
            </DescriptionList>
            <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
              <Description term="企业名称">{formData.enterprise_name}</Description>
              <Description term="部门">
                {formData.enterprise_id === '' ? (
                  ''
                ) : (
                  <PostionShow enterpriseID={formData.enterprise_id} code={formData.dept_id} />
                )}
              </Description>
              <Description term="用户类型">
                {formData.enterprise_id === '' ? (
                  '未认证用户'
                ) : (
                  <UserTypeShow enterpriseID={formData.enterprise_id} code={formData.user_type} />
                )}
              </Description>
            </DescriptionList>
            <DescriptionList title="" size="large" col={2} style={{ marginBottom: 32 }}>
              <Description term="用户来源">{this.rendSource(formData.source)}</Description>
              <Description term="创建时间">{parseUtcTime(formData.created_at)}</Description>
            </DescriptionList>
          </div>
        </Card>

        {this.state.bigImage ? (
          <div className={styles.popoverbackdrop} onClick={() => this.hideBigImage()}>
            <img className={styles.imgresponsive} src={this.state.ShowUrl} alt="查看失败" />
          </div>
        ) : null}
      </div>
    );
  };

  render() {
    const {
      faceEntry: { formVisible, submitting },
    } = this.props;

    return (
      <Modal
        title="用户人脸数据详情"
        width={873}
        visible={formVisible}
        maskClosable={false}
        confirmLoading={submitting}
        destroyOnClose
        onCancel={this.onModalCancelClick}
        footer={[
          <Button key="back" onClick={this.onModalCancelClick}>
            关闭
          </Button>,
        ]}
        style={{ top: 20 }}
        bodyStyle={{ height: 550, overflowY: 'scroll' }}
      >
        {this.renderFirstView()}
      </Modal>
    );
  }
}
