import React, { PureComponent } from 'react';
import { parseUtcTimeFromNow, parseUtcTime } from '@/utils/utils';
import DescriptionList from '@/components/DescriptionList';
import Description from '@/components/DescriptionList/Description';
import { Empty } from 'antd';
import TableList from '@/components/TableList';
import UserShow from '@/components/UserShow';

export default class Timingpub extends PureComponent {
  renderNoticeList = () => {
    const { loading, list, pagination } = this.state;

    const columns = [
      {
        title: '标题',
        dataIndex: 'desc.title',
      },
      {
        title: '创建人',
        dataIndex: 'desc.creator',
        width: 100,
        render: val => {
          return <UserShow uid={val} />;
        },
      },
      {
        title: '创建时间',
        dataIndex: 'desc.cre_time',
        width: 200,
        render: val => {
          return <span> {parseUtcTime(val)} </span>;
        },
      },
    ];

    const prop = {
      loading,
      rowKey: record => record.id,
      columns,
      dataSource: list,
      pagination,
      onChange: this.onTableChange,
    };
    return <TableList {...prop} />;
  };

  render() {
    const { dataSource } = this.props;
    const { timingpub } = dataSource;

    return (
      <DescriptionList col={1} size="large">
        {timingpub.start && (
          <Description term="定时发布时间">{parseUtcTimeFromNow(timingpub.start)}</Description>
        )}
        {timingpub.end && (
          <Description term="定时取消发布时间">{parseUtcTimeFromNow(timingpub.end)}</Description>
        )}
        {!timingpub.end && !timingpub.start && (
          <Description term="">
            <Empty />
          </Description>
        )}
      </DescriptionList>
    );
  }
}
