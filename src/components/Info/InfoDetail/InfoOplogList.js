import React, { PureComponent } from 'react';
import { Divider } from 'antd';
import TableList from '../../TableList';
import UserShow from '../../UserShow';
import info from '../../../services/s_infoManage';
import { parseUtcTime } from '../../../utils/utils';
import { DicShow } from '../../Dictionary';
import DescriptionList from '@/components/DescriptionList';
import Description from '@/components/DescriptionList/Description';
/**
 * opsHanlder ={
 *    onItemDesc:(id,record)=>{}
 *    onItemPublish:(id,record)=>{}
 *    onItemUnpublish:(id,record)=>{}
 *    onItemRecover:(id,record)=>{}
 *    onItemDelete:(id,record)=>{}
 *    onItemDestroy:(id,record)=>{}
 *    onItemCheck:(id,record)=>{}
 *    onItemCommit:(id,record)=>{}
 * }
 */
export default class InfoOplogList extends PureComponent {
  state = {
    list: [],
    pagination: {},
    loading: false,
  };

  componentDidMount() {
    this.onTableChange({});
  }

  onTableChange = async pagination => {
    const { value } = this.props;
    this.setState({ loading: true });
    const r = await info.queryOplogPage(value, {
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
    if (r) {
      this.setState({ list: r.list, pagination: r.pagination, loading: false });
    }
  };

  render() {
    const tableProps = this.props.tableProps || {};
    const { actionpcode } = this.props;
    const pcode = actionpcode || 'cms$#infos$#action';
    const { list, pagination, loading } = this.state;

    const { dataSource } = this.props;
    const chkOperator = dataSource.chk_operator || {};
    const operator = dataSource.operator || {};
    const pubOperator = dataSource.pub_operator || {};

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => {
        return <span> 共 {total}条 </span>;
      },
      ...pagination,
    };
    const columns = [
      {
        title: '操作人',
        dataIndex: 'desc.operator',
        width: 100,
        render: val => {
          return <UserShow uid={val} />;
        },
      },
      {
        title: '操作时间',
        dataIndex: 'desc.op_time',
        width: 200,
        render: val => {
          return <span> {parseUtcTime(val)} </span>;
        },
      },
      {
        title: '操作行为',
        dataIndex: 'desc.action',
        width: 200,
        render: val => {
          return <DicShow pcode={pcode} code={[val]} />;
        },
      },
    ];

    const prop = {
      loading,
      rowKey: record => record.id,
      columns,
      ...tableProps,
      pagination: paginationProps,
      onChange: this.onTableChange,
      dataSource: list,
    };
    return (
      <div>
        <DescriptionList col={2} size="large" title="操作信息">
          <Description key="创建人" term="创建人">
            <UserShow uid={operator.creator} />
          </Description>
          <Description key="创建时间" term="创建时间">
            {parseUtcTime(operator.cre_time)}
          </Description>
          <Description key="最后修改人" term="最后修改人">
            <UserShow uid={operator.updater} />
          </Description>
          <Description key="最后修改时间" term="最后修改时间">
            {parseUtcTime(operator.update_time)}
          </Description>
          <Description key="发布人" term="发布人">
            <UserShow uid={pubOperator.publisher} />
          </Description>
          <Description key="发布时间" term="发布时间">
            {parseUtcTime(pubOperator.publish_time)}
          </Description>
        </DescriptionList>
        <DescriptionList col={2} size="large" title="审核操作">
          {chkOperator.cretator && (
            <Description key="审核人" term="审核人">
              <UserShow uid={chkOperator.cretator} />
            </Description>
          )}
          {chkOperator.cretator && (
            <Description key="审核时间" term="审核时间">
              {parseUtcTime(chkOperator.check_time)}
            </Description>
          )}
          {chkOperator.cretator && (
            <Description key="审核结果" term="审核结果">
              {chkOperator.check_result ? '通过' : '不通过'}
            </Description>
          )}
          {chkOperator.cretator && !chkOperator.check_result && (
            <Description key="驳回意见" term="驳回意见">
              {chkOperator.check_content}
            </Description>
          )}
        </DescriptionList>
        <Divider />
        <TableList {...prop} />
      </div>
    );
  }
}
