import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Form, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import GroupInfoCard from './GroupInfoCard';
import SearchInfoCard from './SearchInfo/SearchInfoCard';
import TableInfoList from './TableInfoList';
import { InfoCard } from '@/components/Info';

@connect(state => ({
  groupInfo: state.groupInfo,
}))
@Form.create()
export default class GroupInfoManageList extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    this.gid = '';
    if (match && match.params) {
      const {
        params: { groupid },
      } = match;
      this.gid = groupid;
    }
    this.state = {
      selectInfo: false,
      dataInfo: false,
      dataInfoID: '',
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'groupInfo/fetch',
      groupId: this.gid,
    });
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.match.params.groupid !== this.gid) {
      this.gid = nextProps.match.params.groupid;
      this.props.dispatch({
        type: 'groupInfo/fetch',
        groupId: nextProps.match.params.groupid,
      });
    }
    return true;
  }
  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (nextProps.match.params.groupid !== this.state.gid) {
  //     this.setState({ gid: nextProps.match.params.groupid });
  //     this.props.dispatch({
  //       type: 'groupInfo/fetch',
  //       groupId: nextProps.match.params.groupid,
  //     });
  //   }
  // }

  onTableChange = pagination => {
    this.props.dispatch({
      type: 'groupInfo/fetch',
      groupId: this.gid,
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  onSearch = formData => {
    this.props.dispatch({
      type: 'groupInfo/fetch',
      groupId: this.gid,
      payload: formData,
    });
  };

  onAddClick = () => {
    this.setState({ selectInfo: true });
  };

  onSelectOkHandler = selectedRowKeys => {
    const { gid } = this;
    this.props.dispatch({
      type: 'groupInfo/appendInfo',
      groupid: gid,
      infoids: selectedRowKeys,
    });
  };

  onSelectCallback = result => {
    this.setState({ selectInfo: false });
    const { gid } = this;
    if (result && result === 'ok') {
      this.props.dispatch({
        type: 'groupInfo/fetch',
        groupId: gid,
      });
    }
  };

  onItemViewClick = id => {
    this.setState({
      dataInfo: true,
      dataInfoID: id,
    });
  };

  onDataInfoCallback = ok => {
    if (ok === 'ok') {
      this.props.dispatch({
        type: 'groupInfo/fetch',
        groupId: this.gid,
      });
    }
    this.setState({
      dataInfo: false,
      dataInfoID: '',
    });
    // if (this.state.schHandler) {
    //   this.state.schHandler();
    // }
  };

  renderDataInfo = () => {
    if (this.state.dataInfo) {
      return <InfoCard id={this.state.dataInfoID} callback={this.onDataInfoCallback} visible />;
    }
  };

  renderSelectInfo = () => {
    if (this.state.selectInfo) {
      return <SearchInfoCard okHandler={this.onSelectOkHandler} callback={this.onSelectCallback} />;
    }
  };

  render() {
    const {
      groupInfo: {
        groupId,
        groupData,
        loading,
        data: { list, pagination },
      },
    } = this.props;

    const breadcrumbList = [
      {
        title: '信息组管理',
        href: 'cms-manage/groups',
      },
      {
        title: '信息组信息管理',
      },
    ];
    const action = (
      <div>
        <Button icon="left" onClick={this.props.history.goBack}>
          返回
        </Button>
      </div>
    );
    return (
      <PageHeaderLayout
        title={`信息组信息管理(${groupId})`}
        breadcrumbList={breadcrumbList}
        action={action}
      >
        <Card bordered={false}>
          <GroupInfoCard data={groupData} />

          <TableInfoList
            onRow={record => {
              return {
                onClick: () => {
                  this.onItemViewClick(record.info_id);
                },
              };
            }}
            loading={loading}
            onAddHandler={this.onAddClick}
            pagination={pagination}
            list={list}
            onPageChange={this.onTableChange}
          />
        </Card>
        {this.renderSelectInfo()}
        {this.renderDataInfo()}
      </PageHeaderLayout>
    );
  }
}
