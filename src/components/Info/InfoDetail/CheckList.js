import React, { PureComponent } from 'react';
import TableList from '../../TableList';
import UserShow from '../../UserShow';
import review from '../../../services/s_reviewManage';
import { parseUtcTime } from '../../../utils/utils';

export default class CheckList extends PureComponent {
  state = {
    list: [],
    loading: false,
  };

  componentDidMount() {
    this.loadReview();
  }

  loadReview = async () => {
    const { value } = this.props;
    this.setState({ loading: true });
    const r = await review.queryAll({ targetType: 1, targetID: value });
    if (r && Array.isArray(r)) {
      this.setState({ list: r, loading: false });
    } else {
      this.setState({ loading: false });
    }
  };

  render() {
    const tableProps = this.props.tableProps || {};
    const { list, loading } = this.state;
    // reason: "审核通过"
    // result: true
    // review_time: "2018-12-18T08:16:36.085Z"
    // reviewer: "5b6bf2361d41c845270ecf5e"
    const columns = [
      {
        title: '审核人',
        dataIndex: 'review_desc.reviewer',
        width: 100,
        render: val => {
          return <UserShow uid={val} />;
        },
      },
      {
        title: '审核时间',
        dataIndex: 'review_desc.review_time',
        width: 200,
        render: val => {
          return <span> {parseUtcTime(val)} </span>;
        },
      },
      {
        title: '结果',
        dataIndex: 'review_desc.result',
        width: 100,
        render: val => {
          return val ? '通过' : '不通过';
        },
      },
      {
        title: '理由',
        dataIndex: 'review_desc.reason',
      },
    ];

    const prop = {
      loading,
      rowKey: record => record.id,
      columns,
      ...tableProps,
      dataSource: list,
    };
    return <TableList {...prop} />;
  }
}
