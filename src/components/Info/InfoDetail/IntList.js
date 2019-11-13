import React, { PureComponent } from 'react';
import { Collapse, Tag } from 'antd';
import TableList from '../../TableList';
import UserShow from '../../UserShow';
import interaction from '../../../services/s_interaction';
import interactionType from '../../../services/s_interactionType';
import { parseUtcTime } from '../../../utils/utils';
import DescriptionList from '../../DescriptionList';

const { Description } = DescriptionList;

export default class IntList extends PureComponent {
  state = {
    list: [],
    pagination: {},
    searchObj: {},
    loading: false,
    group: {},
  };

  typeAll = [];

  componentDidMount() {
    this.fetchTypeAll();
  }

  fetchTypeAll = () => {
    interactionType.queryAll().then(data => {
      this.typeAll = data;
      this.fetchGroup();
      this.onTableChange({});
    });
  };

  showType = code => {
    for (const item of this.typeAll) {
      if (item.desc.code === code) {
        return `${item.desc.name}(${code})`;
      }
    }
    return code;
  };

  fetchGroup = async () => {
    const { value } = this.props;
    const r = await interaction.queryGroup(`001-${value}`);
    if (r) {
      this.setState({ group: r, loading: false });
    }
  };

  onTableChange = async pagination => {
    const { value } = this.props;
    this.setState({ loading: true });
    const { searchObj } = this.state;
    const r = await interaction.queryPage(`001-${value}`, {
      ...searchObj,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
    if (r) {
      this.setState({ list: r.list, pagination: r.pagination, loading: false });
    }
  };

  render() {
    const tableProps = this.props.tableProps || {};
    const { list, pagination, loading, group } = this.state;
    const paginationProps = {
      ...pagination,
    };
    // interaction_desc: {igid: "001-5c18a59d1d41c81f830cc536", code: "count", uid: "5ba21da31d41c8076f41453e", value: 1}
    // code: "count"
    // igid: "001-5c18a59d1d41c81f830cc536"
    // uid: "5ba21da31d41c8076f41453e"
    // value: 1
    const columns = [
      {
        title: '操作人',
        dataIndex: 'interaction_desc.uid',
        render: val => {
          return <UserShow uid={val} />;
        },
      },
      {
        title: '互动类型',
        dataIndex: 'interaction_desc.code',
        render: val => this.showType(val),
      },
      {
        title: '值',
        dataIndex: 'interaction_desc.value',
      },
      {
        title: '操作时间',
        dataIndex: 'operator.cre_time',
        render: val => {
          return <span> {parseUtcTime(val)} </span>;
        },
      },
    ];

    const prop = {
      loading,
      rowKey: record => record.interaction_id,
      columns,
      ...tableProps,
      pagination: paginationProps,
      onChange: this.onTableChange,
      dataSource: list,
    };
    const ctrl = group && group.ctrl ? group.ctrl : {};
    const desc = group && group.desc ? group.desc : {};
    const replytotal = group && group.replytotal ? group.replytotal : {};
    const total = group && group.total ? group.total : [];
    const totalcolumns = [
      {
        title: '互动类型',
        dataIndex: 'it_code',
        render: val => this.showType(val),
      },
      {
        title: '访问数量',
        dataIndex: 'total',
      },
      {
        title: '总分数',
        dataIndex: 'total_score',
      },
      {
        title: '平均分数',
        dataIndex: 'avg_score',
      },
    ];
    const totalprop = {
      rowKey: record => record.it_code,
      columns: totalcolumns,
      ...tableProps,
      dataSource: total,
    };
    return (
      <Collapse defaultActiveKey={['1', '2']}>
        <Collapse.Panel header="基本信息" key="1">
          {group && group.ctrl ? (
            <DescriptionList size="large" col={2}>
              <Description term="状态">{ctrl.status === 0 ? '正常' : '删除'}</Description>
              <Description term="是否允许发评论">{ctrl.is_replay === 1 ? '是' : '否'}</Description>
              <Description term="评论是否需要审核">
                {ctrl.is_replay_chk === 1 ? '是' : '否'}
              </Description>
              <Description term="允许的互动类型">
                {ctrl.allow_codes && ctrl.allow_codes.map(item => <Tag>{this.showType(item)}</Tag>)}
              </Description>
              <Description term="创建时间">{parseUtcTime(desc.cre_time)}</Description>
            </DescriptionList>
          ) : (
            <DescriptionList size="large" col={2}>
              <Description>暂无数据</Description>
            </DescriptionList>
          )}
        </Collapse.Panel>
        <Collapse.Panel header="评论" key="2">
          {group && group.replytotal ? (
            <DescriptionList size="large" col={2}>
              <Description term="数量">{`${replytotal.replay_num}`}</Description>
              <Description term="最后评论时间">
                {replytotal.last_time === '0001-01-01T00:00:00Z'
                  ? '无评论'
                  : parseUtcTime(replytotal.last_time)}
              </Description>
            </DescriptionList>
          ) : (
            <DescriptionList size="large" col={2}>
              <Description>暂无数据</Description>
            </DescriptionList>
          )}
        </Collapse.Panel>
        <Collapse.Panel header="统计相关" key="3">
          <TableList {...totalprop} />
        </Collapse.Panel>
        <Collapse.Panel header="明细信息" key="4">
          <TableList {...prop} />
        </Collapse.Panel>
      </Collapse>
    );
  }
}
