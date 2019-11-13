import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Badge, Tag } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { parseUtcTime } from '../../utils/utils';
import InfoCard from './InfoCard';
import UserShow from '../../components/UserShow';
import { DicShow } from '../../components/Dictionary';
import FeedbackSearchCard from './FeedbackSearchCard';
import FeedbackTableList from './FeedbackTableList';

@connect(state => ({
  feedbackManage: state.feedbackManage,
}))
@Form.create()
export default class FeedbackManage extends PureComponent {
  state = {
    dataInfo: false,
    dataInfoID: '',
  };

  searchObj = {
    status: [0, 1],
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'feedbackManage/saveSearch',
      payload: this.searchObj,
    });
    this.props.dispatch({
      type: 'feedbackManage/fetch',
      payload: this.searchObj,
    });
  }

  onItemViewClick = record => {
    this.setState({
      dataInfo: true,
      dataInfoID: record.info_id,
    });
  };

  onTableChange = pagination => {
    this.props.dispatch({
      type: 'feedbackManage/fetch',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  onSearch = formData => {
    this.props.dispatch({
      type: 'feedbackManage/fetch',
      payload: formData,
    });
  };

  onDataFormCallback = result => {
    if (result && result === 'ok') {
      this.props.dispatch({
        type: 'feedbackManage/fetch',
      });
    }
    // if (this.state.schHandler) {
    //   this.state.schHandler();
    // }
  };

  onItemDelete = (id, record) => {
    this.props.dispatch({
      type: 'feedbackManage/del',
      payload: record.info_id,
    });
  };

  onItemCommit = (id, record) => {
    this.props.dispatch({
      type: 'feedbackManage/commit',
      payload: record.info_id,
    });
  };

  onDataInfoCallback = ok => {
    this.setState({
      dataInfo: false,
      dataInfoID: '',
    });
    if (ok === 'ok')
      this.props.dispatch({
        type: 'feedbackManage/fetch',
      });
  };

  renderDataInfo = () => {
    if (this.state.dataInfo) {
      return <InfoCard id={this.state.dataInfoID} callback={this.onDataInfoCallback} />;
    }
  };

  render() {
    const {
      feedbackManage: {
        loading,
        data: { list, pagination },
      },
    } = this.props;

    const columns = [
      {
        title: '状态',
        width: 100,
        dataIndex: 'status.status',
        render: val => {
          const s = ['default', 'processing', 'success', 'warning', 'warning', 'success'];
          let status = 'error';
          if (val >= 0) {
            status = s[val] ? s[val] : status;
          }
          return (
            <DicShow
              pcode="cms$#feedback$#status"
              code={[val]}
              show={name => <Badge key={name} status={status} text={name} />}
            />
          );
        },
      },
      {
        title: '类型',
        width: 100,
        dataIndex: 'desc.tags',
        render: val => {
          return (
            <DicShow
              pcode="cms$#feedback$#kind"
              code={val}
              show={name => <Tag color="blue">{name}</Tag>}
            />
          );
        },
      },
      {
        title: '内容',
        dataIndex: 'desc.title',
        // width: 320,
      },
      {
        title: '反馈用户',
        dataIndex: 'operator.creator',
        width: 100,
        render: val => {
          return <UserShow uid={val} />;
        },
      },
      {
        title: '反馈时间',
        dataIndex: 'operator.cre_time',
        width: 200,
        render: val => {
          return <span> {parseUtcTime(val)} </span>;
        },
      },
    ];

    const paginationProps = {
      ...pagination,
    };
    const opsHanlder = {
      onItemDesc: this.onItemDesc,
      onItemDelete: this.onItemDelete,
      onItemCheck: this.onItemCheck,
      onItemCommit: this.onItemCommit,
      onRowClick: this.onItemViewClick,
    };
    const tableProps = {
      loading,
      rowKey: record => record.info_id,
      dataSource: list,
      columns,
      pagination: paginationProps,
      onChange: this.onTableChange,
      scroll: { x: 1000 },
    };
    return (
      <PageHeaderLayout title="信息管理">
        <Card bordered={false}>
          <FeedbackSearchCard searchObj={this.searchObj} onSearch={this.onSearch} />
          <FeedbackTableList opsHanlder={opsHanlder} tableProps={tableProps} />
        </Card>
        {this.renderDataInfo()}
      </PageHeaderLayout>
    );
  }
}
