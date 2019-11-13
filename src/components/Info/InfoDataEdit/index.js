import React, { Component } from 'react';
import { Modal, Skeleton } from 'antd';
import InfoDataKind1 from './InfoDataKind1';
import InfoDataKind2 from './InfoDataKind2';
import InfoDataKind5 from './InfoDataKind5';
import info from '../../../services/s_infoManage';
import columns from '../../../services/s_columnManage';

export default class InfoDataEdit extends Component {
  state = {
    dataSource: null,
    visible: true,
  };

  componentDidMount() {
    this.fetch(this.props.id);
  }

  // 取消
  onModalCancelClick = () => {
    this.setState({ visible: false });
    this.props.callback(false);
  };

  // 保存
  onModalOKClick = async () => {
    const { callback } = this;
    if (await callback()) {
      this.setState({ visible: false });
      if (this.props.callback) this.props.callback(true);
    }
  };

  callbackhandler = handler => {
    this.callback = handler;
  };

  tabContentsFuns = () => {
    const { org, column, hideOrg, hideColumn } = this.props;
    const { dataSource, treeData } = this.state;
    const desc = dataSource && dataSource.desc ? dataSource.desc : {};
    const { datatype, id } = this.props;
    const kindType = id
      ? desc && desc.kind
        ? desc.kind
        : 0
      : datatype && datatype > 0
      ? datatype
      : 0;
    const prop = {
      dataSource: dataSource || {},
      treeData: treeData || [],
      id,
      callback: this.callbackhandler,
      org,
      column,
      hideOrg,
      hideColumn,
    };
    if (kindType) {
      switch (kindType) {
        case 2:
          return <InfoDataKind2 {...prop} />;
        case 1:
          return <InfoDataKind1 {...prop} />;
        case 5:
          return <InfoDataKind5 {...prop} />;
        default:
          return <Skeleton />;
      }
    }
  };

  async fetch(value) {
    if (!value) return '';
    const r = await info.queryDesc(value);

    if (r && r.desc && r.desc.column_id) {
      const response = await columns.query(r.desc.column_id);
      if (response) {
        r.ctrl = response.extras;
        r.ctl_param = response.ctl_param;
        r.column_name = response.desc.name;

        const { org } = this.props;
        const orgid = org || response.desc.org;
        const resptreedata = await columns.queryColumnTree(orgid, '', '', 1);
        const treeData = Array.isArray(resptreedata) ? resptreedata : [];
        this.setState({ dataSource: r, treeData });
      }
    }
  }

  render() {
    const { formTitle, id } = this.props;
    const { visible } = this.state;
    const title = formTitle || (id ? '编辑信息' : '新增信息');
    return (
      <Modal
        title={title}
        visible={visible}
        width="70%"
        maskClosable={false}
        // confirmLoading={submitting}
        destroyOnClose
        onOk={this.onModalOKClick}
        onCancel={this.onModalCancelClick}
        style={{ top: 20, minWidth: '500px' }}
        bodyStyle={{ height: 'calc( 100vh - 158px )', overflowY: 'auto' }}
      >
        {this.tabContentsFuns()}
      </Modal>
    );
  }
}
