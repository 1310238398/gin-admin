import React, { PureComponent } from 'react';
import { List } from 'antd';
// eslint-disable-next-line import/no-cycle
import ReplyCard from './ReplyCard';
// import interactionType from '../../../services/s_interactionType';
import reply from '../../../services/s_replyManage';

export default class ReplyChildrenList extends PureComponent {
  state = {
    list: [],
    pagination: {},
    // searchObj: {},
    loading: false,
  };

  typeAll = [];

  page = {};

  componentDidMount() {
    this.fetchChildren();
  }

  fetchChildren = async page => {
    const { id } = this.props;
    const r = await reply.queryPageByChildren(id, { ...page });
    if (r) {
      // this.page = r.pagination;
      this.setState({ list: r.list, pagination: r.pagination, loading: false });
    }
  };

  onListChange = async (page, pageSize) => {
    this.setState({ loading: true });
    // this.page = { current: page, pageSize };
    this.fetchChildren({ current: page, pageSize });
  };

  render() {
    const { list, pagination, loading } = this.state;
    const paginationProps =
      pagination && pagination.total > pagination.pageSize
        ? {
            size: 'small',
            ...pagination,
            onChange: this.onListChange,
          }
        : null;

    return (
      <List
        loading={loading}
        pagination={paginationProps}
        dataSource={list}
        renderItem={item => (
          <ReplyCard key={item.replay_id} data={item} onDelete={() => this.fetchChildren()} />
        )}
      />
    );
  }
}
