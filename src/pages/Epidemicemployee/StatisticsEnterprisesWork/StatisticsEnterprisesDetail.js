import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Modal, Card, Button, Descriptions } from 'antd';
import DescriptionList from '../../../components/DescriptionList';
import { parseUtcTime } from '../../../utils/utils';
import styles from '../../FaceEntry/info.less';

const { Description } = DescriptionList;
@connect(state => ({
  statisticsEnterprisesList: state.statisticsEnterprisesList,
}))
@Form.create()

//  企业入驻的模态对话框组件。
export default class statisticsEnterprisesListDetail extends PureComponent {
  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type } = this.props;
    this.props.dispatch({
      type: 'statisticsEnterprisesList/loadForm',
      payload: {
        id,
        type,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'statisticsEnterprisesList/changeFormVisible',
      payload: false,
    });
    this.props.callback('ok');
  };

  renderFirstView = () => {
    const {
      statisticsEnterprisesList: { formData },
    } = this.props;

    return (
      <div className={styles.main}>
        <Card title="" bordered={false}>
          <div className={styles.form} style={{ marginTop: 25 }}>
            <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
              <Description term="企业名称">{formData.enterprise_name}</Description>
              <Description term="是否复工">{formData.is_back === 1 ? '是' : '否'}</Description>

              <Description term="复工人数">{formData.back_num}</Description>
            </DescriptionList>
            <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
              <Description term="复工时间">
                {formData.back_time ? parseUtcTime(formData.back_time) : ''}
              </Description>
            </DescriptionList>
          </div>
        </Card>
      </div>
    );
  };

  render() {
    const {
      statisticsEnterprisesList: { formVisible, submitting },
    } = this.props;

    return (
      <Modal
        title="企业复工登记详情"
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
        bodyStyle={{ height: 350, overflowY: 'scroll' }}
      >
        {this.renderFirstView()}
      </Modal>
    );
  }
}
