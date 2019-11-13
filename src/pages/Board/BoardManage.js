import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Tooltip } from 'antd';
import BoardImageManage from './BoardImageManage';
import BoardColumnsManage from './BoardColumnsManage';
import BoardConfigManage from './BoardConfigManage';
import BoardInfosManage from './BoardInfosManage';
@connect(state => ({
  boardManage: state.boardManage,
}))
export default class BoardManage extends PureComponent {
  constructor(props) {
    super(props);
    const { orgid } = this.props;
    if (orgid) {
      this.props.dispatch({
        type: 'boardManage/fetchOrg',
        orgid,
      });
    }
  }

  state = {
    tabKey: 'images',
  };

  componentDidUpdate(nextProps) {
    if ('orgid' in nextProps) {
      if (nextProps.orgid !== this.props.orgid) {
        this.props.dispatch({
          type: 'boardManage/fetchOrg',
          orgid: this.props.orgid,
        });
      }
    }
  }

  onClickOpen = () => {
    const { orgid } = this.props;
    this.props.dispatch({
      type: 'boardManage/openOrg',
      orgid,
    });
  };

  onTabChange = key => {
    this.setState({ tabKey: key });
  };

  onClickPublish = () => {
    const { orgid } = this.props;
    this.props.dispatch({
      type: 'boardManage/publishOrg',
      orgid,
    });
  };

  onClickNoPublish = () => {
    const { orgid } = this.props;
    this.props.dispatch({
      type: 'boardManage/noPublishOrg',
      orgid,
    });
  };

  handleTabChange = key => {
    switch (key) {
      case 'images':
        break;
      case 'columns':
        break;
      default:
    }
  };

  render() {
    const {
      orgname,
      orgid,
      boardManage: { loading, exists, orgdata },
    } = this.props;
    const { tabKey } = this.state;
    const title = (
      <Tooltip title={orgid} mouseEnterDelay={1}>
        <span>{orgname}</span>
      </Tooltip>
    );
    const tabList = [
      {
        key: 'images',
        tab: '展示图片',
      },
      {
        key: 'columns',
        tab: '栏目管理',
      },
      {
        key: 'parks',
        tab: '展板管理',
      },
      {
        key: 'infos',
        tab: '信息管理',
      },
    ];
    const cardprop = {
      loading,
      title,
    };
    if (exists) {
      cardprop.tabList = tabList;
      cardprop.activeTabKey = tabKey;
      cardprop.onTabChange = key => {
        this.onTabChange(key, 'key');
      };
    }
    const status = orgdata.desc && orgdata.desc.status ? orgdata.desc.status : 0;
    cardprop.extra =
      status === 0 ? (
        <Button onClick={this.onClickPublish}>发布</Button>
      ) : status === 1 ? (
        <Button onClick={this.onClickNoPublish}>取消发布</Button>
      ) : (
        ''
      );

    return (
      <Card {...cardprop}>
        {!exists && <Button onClick={this.onClickOpen}>开通展板</Button>}
        {exists && tabKey === 'images' && <BoardImageManage orgid={orgid} />}
        {exists && tabKey === 'columns' && <BoardColumnsManage orgid={orgid} />}
        {exists && tabKey === 'parks' && <BoardConfigManage orgid={orgid} />}
        {exists && tabKey === 'infos' && <BoardInfosManage orgid={orgid} />}
      </Card>
    );
  }
}
