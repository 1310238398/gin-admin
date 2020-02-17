import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Tag, Table, Modal, Button } from 'antd';
// import { parseUtcTime } from '../../utils/utils';
import DescriptionList from '../../components/DescriptionList';
import EnterpriseShow from '@/components/EnterpriseShow';
import UserShow from '@/components/UserShow';
import { DicShow } from '@/components/Dictionary';
import DicShowNew from '@/components/DictionnaryNo/DicShowNew/index';
import { ContentShow } from '@/components/ContentShow';

import styles from './NotifList.less';

const { Description } = DescriptionList;

@connect(state => ({
  notifList: state.notifList,
  loading: state.loading.models.notifList,
}))
class NotifListView extends PureComponent {
  state = {
    // bigImage: false,
    // ShowUrl: null,
    // bigImageyingye: false,
    // ShowUrlyingye: null,
  };

  componentDidMount() {
    const { id, type } = this.props;
    this.props.dispatch({
      type: 'notifList/loadForm',
      payload: {
        id,
        type,
      },
    });
  }

  statusRenderStatus = status => {
    switch (status) {
      case 1:
        return <Tag color="blue">已发布</Tag>;
      case 2:
        return <Tag color="green">未发布</Tag>;
      default:
        return '';
    }
  };

  statusRender = status => {
    switch (status) {
      case 1:
        return <Tag color="blue">企业</Tag>;
      case 2:
        return <Tag color="green">人员</Tag>;
      case 3:
        return <Tag color="green">企业标签</Tag>;
      case 4:
        return <Tag color="green">角色分类</Tag>;
      case 5:
        return <Tag color="green">行业分类</Tag>;
      default:
        return '';
    }
  };

  renderStatus = status => {
    switch (status) {
      case 1:
        return '企业';
      case 2:
        return '人员';
      case 3:
        return '企业标签';
      case 4:
        return '角色分类';
      case 5:
        return '行业分类';
      default:
        return '';
    }
  };

  renderItemName = (val, record) => {
    debugger
    switch (record.bu_type) {
      case 1:
        return <EnterpriseShow value={val} />;
      case 2:
        return <UserShow uid={val} />;
      case 3:
        return <DicShow pcode="OPER$#corporate_marks" code={[val]} />;
      case 4:
        return <DicShowNew root="ops$#role_category" code={val} />;
      case 5:
        return <DicShow pcode="OPER$#enterprise_category_industry" code={[val]} />;
      default:
        return <span>{val}</span>;
    }
  };

  render() {
    const {
      notifList: { formData },
    } = this.props;
    // 授权
    const columnsArea = [
      {
        title: '通知类型',
        dataIndex: 'bu_type',
        // width: colWidthNormal,
        key: 'bu_type',
        render: val => {
          return <span>{this.renderStatus(val)}</span>;
        },
      },
      {
        title: '通知对象',
        dataIndex: 'bu_id',
        key: 'bu_id',
        render: this.renderItemName,
      },
    ];
    return (
      <Modal
        title="企业详情"
        width={873}
        visible
        maskClosable={false}
        destroyOnClose
        onCancel={this.props.callback}
        footer={[
          <Button key="back" onClick={this.props.callback}>
            关闭
          </Button>,
        ]}
        style={{ top: 20 }}
        bodyStyle={{ height: 550, overflowY: 'scroll' }}
      >
        <div className={styles.main}>
          <Card title="通知详情" bordered={false}>
            <div className={styles.form} style={{ marginTop: 25 }}>
              <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
                <Description term="标题">{formData.title}</Description>
              </DescriptionList>
              <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
                <Description term="概述">{formData.summary}</Description>
                <Description term="园区">{formData.park_name}</Description>
              </DescriptionList>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="内容">
                  <ContentShow content={formData.content} />
                </Description>
              </DescriptionList>

              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="发布状态">
                  {this.statusRenderStatus(formData.status)}
                </Description>
              </DescriptionList>
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Table
                  loading={false}
                  dataSource={formData.ranges}
                  columns={columnsArea}
                  scroll={{ x: 550 }}
                />
              </DescriptionList>
            </div>
          </Card>
        </div>
      </Modal>
    );
  }
}

export default NotifListView;
