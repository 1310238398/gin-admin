import React, { PureComponent } from 'react';
import { List } from 'antd';
import ReplyCard from './ReplyCard';
// import interactionType from '../../../services/s_interactionType';
import reply from '../../../services/s_replyManage';

export default class ReplyList extends PureComponent {
  state = {
    firstlist: [],
    pagination: {},
    // searchObj: {},
    loading: false,
  };

  typeAll = [];

  firstPage = {};

  componentDidMount() {
    this.fetchFirst();
  }

  fetchFirst = async () => {
    const { value } = this.props;
    const igid = `001-${value}`;

    const r = await reply.queryPageByFirst(igid, { ...this.firstPage });
    if (r) {
      this.firstPage = r.pagination;
      this.setState({ firstlist: r.list, pagination: r.pagination, loading: false });
    }
  };

  onListChange = async (page, pageSize) => {
    this.setState({ loading: true });
    this.firstPage = { current: page, pageSize };

    this.fetchFirst();
  };

  render() {
    const { firstlist, pagination, loading } = this.state;
    const paginationProps =
      pagination && pagination.total > pagination.pageSize
        ? {
            showQuickJumper: true,
            ...pagination,
            onChange: this.onListChange,
          }
        : null;

    return (
      <List
        loading={loading}
        pagination={paginationProps}
        dataSource={firstlist}
        renderItem={item => (
          <ReplyCard key={item.replay_id} data={item} onDelete={() => this.fetchFirst()} />
        )}
      />
    );
  }
}
