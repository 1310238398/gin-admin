import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Modal, Badge, Input, Tag } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { parseUtcTime } from '../../utils/utils';
import ReportCard from './ReportCard';
import UserShow from '../../components/UserShow';
import { DicShow, DicSelect } from '@/components/Dictionary';
import TableList from '@/components/TableList';
import { SearchCard, SearchItem } from '@/components/SearchCard';
import UserSelect from '@/components/UserSelect/UserSelect';
import { SchTime } from '@/components/Info';

@connect(state => ({
  reportManage: state.reportManage,
}))
@Form.create()
export default class ReportManage extends PureComponent {
  state = {
    dataInfo: false,
    dataInfoID: '',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'reportManage/saveSearch',
      payload: {},
    });
    this.props.dispatch({
      type: 'reportManage/fetch',
      payload: {
        status: [0, 1],
      },
    });
  }

  onItemViewClick = id => {
    this.setState({
      dataInfo: true,
      dataInfoID: id,
    });
  };

  onTableChange = pagination => {
    this.props.dispatch({
      type: 'reportManage/fetch',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  onSearch = e => {
    if (e) {
      e.preventDefault();
    }
    const formData = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'reportManage/fetch',
      payload: formData,
    });
  };

  onItemDeleteClick = (id, record) => {
    Modal.confirm({
      title: '确定删除该数据吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.props.dispatch({
          type: 'reportManage/del',
          payload: record.info_id,
        });
      },
    });
  };

  onDataInfoCallback = () => {
    this.setState({
      dataInfo: false,
      dataInfoID: '',
    });
  };

  creOps = record => {
    const out = [
      {
        icon: 'view',
        name: '查看',
        handler: () => this.onItemDescClick(record.report_id),
      },
      {
        icon: 'delete',
        name: '删除',
        handler: () => this.onItemDeleteClick(record.column_id),
      },
    ];
    return out;
  };

  renderDataInfo = () => {
    if (this.state.dataInfo) {
      return <ReportCard id={this.state.dataInfoID} callback={this.onDataInfoCallback} />;
    }
  };

  render() {
    const {
      reportManage: {
        loading,
        data: { list, pagination },
      },
      form: { getFieldDecorator },
    } = this.props;

    const columns = [
      {
        title: '状态',
        dataIndex: 'desc.status',
        width: 120,
        render: code => {
          const s = ['processing', 'success'];
          let status = 'processing';
          if (code >= 0) {
            status = s[code] ? s[code] : status;
          }
          return (
            <DicShow
              pcode="cms$#report$#status"
              code={[code]}
              show={(name, cval) => <Badge key={`${name}_${cval}`} status={status} text={name} />}
            />
          );
        },
      },
      {
        title: '内容',
        dataIndex: 'desc.content',
        width: 350,
      },
      {
        title: '目标类型',
        dataIndex: 'desc.target_type',
        width: 120,
        render: code => {
          return <DicShow pcode="cms$#report$#targettype" code={[code]} />;
        },
      },
      {
        title: '标签',
        dataIndex: 'desc.tags',
        width: 200,
        render: val => {
          return (
            <DicShow
              pcode="cms$#report$#type"
              code={val}
              show={name => {
                return <Tag>{name}</Tag>;
              }}
            />
          );
        },
      },
      {
        title: '举报人',
        dataIndex: 'desc.uid',
        width: 100,
        render: val => {
          return <UserShow uid={val} />;
        },
      },
      {
        title: '举报时间',
        dataIndex: 'desc.rep_time',
        width: 200,
        render: val => {
          return <span> {parseUtcTime(val)} </span>;
        },
      },
    ];

    const paginationProps = {
      ...pagination,
    };
    const tableProps = {
      loading,
      rowKey: record => record.report_id,
      dataSource: list,
      columns,
      pagination: paginationProps,
      onChange: this.onTableChange,
      scroll: { x: 1500 },
      onRow: record => {
        return {
          onClick: () => {
            this.onItemViewClick(record.report_id);
          },
        };
      },
    };
    return (
      <PageHeaderLayout title="投诉举报管理">
        <Card bordered={false}>
          <SearchCard onSearch={this.onSearch} form={this.props.form}>
            <SearchItem label="关键字">
              {getFieldDecorator('key', {})(<Input placeholder="请输入关键字" />)}
            </SearchItem>

            <SearchItem label="状态">
              {getFieldDecorator('status', {})(
                <DicSelect
                  pcode="cms$#report$#status"
                  selectProps={{ mode: 'multiple', placeholder: '请选择' }}
                />
              )}
            </SearchItem>
            <SearchItem label="目标类型">
              {getFieldDecorator('typ', {})(
                <DicSelect
                  pcode="cms$#report$#targettype"
                  selectProps={{ placeholder: '请选择' }}
                />
              )}
            </SearchItem>
            <SearchItem label="举报标签">
              {getFieldDecorator('tags', {})(
                <DicSelect
                  pcode="cms$#report$#type"
                  selectProps={{ placeholder: '请选择', showSearch: true }}
                />
              )}
            </SearchItem>
            <SearchItem label="举报用户">{getFieldDecorator('uid', {})(<UserSelect />)}</SearchItem>
            <SearchItem label="举报时间">
              {getFieldDecorator('repTime', {})(<SchTime isRange />)}
            </SearchItem>
          </SearchCard>
          <TableList {...tableProps} />
        </Card>
        {this.renderDataInfo()}
      </PageHeaderLayout>
    );
  }
}
