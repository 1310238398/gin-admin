import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Drawer, Button } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import { InfoDetail } from '../../components/Info';

const { Description } = DescriptionList;

@connect(state => ({
  infoManage: state.infoManage,
}))
export default class InfoCard extends PureComponent {
  componentDidMount() {
    const { callback } = this.props;
    this.props.dispatch({
      type: 'infoManage/saveFormCallback',
      payload: {
        callback,
      },
    });
    this.props.dispatch({
      type: 'infoManage/saveShowInfo',
      payload: true,
    });
  }

  onClose = () => {
    this.props.callback();
  };

  onModalOKClick = () => {
    this.props.callback();
  };

  showExtra = () => {
    const {
      infoManage: { formData },
    } = this.props;

    const { ctrl } = formData;
    if (!ctrl) {
      return;
    }
    const { desc } = formData;
    return ctrl.map(item => {
      const initv = desc && desc.extras && desc.extras[item.code] ? desc.extras[item.code] : '';
      return <Description term={item.name}>{initv}</Description>;
    });
  };

  onPublish = record => {
    this.props.dispatch({
      type: 'infoManage/publish',
      payload: record.info_id,
    });
  };

  renderActions = record => {
    const out = [];
    if (
      record.status.status === 4 ||
      (record.status.status === 0 && record.ctl_param && record.ctl_param.is_info_chk !== 1)
    ) {
      out.push(<Button onClick={() => this.onPublish(record)}>发布</Button>);
    }
    if (
      record.status.status === 3 ||
      (record.status.status === 0 && record.ctl_param && record.ctl_param.is_info_chk === 1)
    ) {
      out.push(<Button onClick={() => this.handlerOk(record)}>提交审核</Button>);
    }

    if (record.status.status === 1) {
      out.push(<Button onClick={() => this.handlerOk(record)}>审核</Button>);
    }

    if (record.status.status === 5) {
      out.push(<Button onClick={() => this.handlerOk(record)}>取消发布</Button>);
    }
    if (record.status.status >= 0) {
      out.push(<Button onClick={() => this.handlerOk(record)}>删除</Button>);
    }
    if (record.status.status === -1) {
      out.push(<Button onClick={() => this.handlerOk(record)}>恢复</Button>);
    }
    if (record.status.status === -1) {
      out.push(<Button onClick={() => this.handlerOk(record)}>彻底删除</Button>);
    }
    return out;
  };

  render() {
    const {
      // infoManage: { formVisible, formData },
      id,
    } = this.props;

    // const desc = formData.desc ? formData.desc : {};

    return (
      <Drawer
        title="信息详情"
        placement="right"
        destroyOnClose
        closable={false}
        onClose={this.onClose}
        visible
        width="50%"
      >
        <InfoDetail value={id} actions={record => this.renderActions(record)} />
      </Drawer>
    );
  }
}
