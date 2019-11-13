import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { parseUtcTime } from '../../utils/utils';
import DataCard from './DataCard';
import UserShow from '../../components/UserShow';
import { InfoStatus, InfoTableList, InfoSearch, InfoCard } from '../../components/Info';

@connect(state => ({
  zsxxManage: state.zsxxManage,
  columnManage: state.columnManage,
}))
@Form.create()
export default class InfoManageList extends PureComponent {
  state = {
    dataForm: false,
    dataFormID: '',

    dataInfo: false,
    dataInfoID: '',
  };

  searchObj = { status: [0, 2, 5] };

  componentDidMount() {
    this.props.dispatch({
      type: 'zsxxManage/saveSearch',
      payload: {},
    });
    this.props.dispatch({
      type: 'zsxxManage/fetch',
      payload: this.searchObj,
    });
    this.props.dispatch({
      type: 'columnManage/queryColumnTree',
    });
  }

  onItemViewClick = id => {
    this.setState({
      dataInfo: true,
      dataInfoID: id,
    });
  };

  // onDetailModalCancelClick = () => {
  //   this.setState({
  //     detailVisible: false,
  //   });
  // };

  onTableChange = pagination => {
    this.props.dispatch({
      type: 'zsxxManage/fetch',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  onSearch = formData => {
    this.props.dispatch({
      type: 'zsxxManage/fetch',
      payload: formData,
    });
  };

  onDataFormCallback = result => {
    const { dispatch } = this.props;
    dispatch({
      type: 'zsxxManage/saveFormID',
      payload: '',
    });
    dispatch({
      type: 'zsxxManage/saveFormData',
      payload: {},
    });
    this.setState({
      dataForm: false,
      dataFormID: '',
    });
    if (result && result === 'ok') {
      dispatch({
        type: 'zsxxManage/fetch',
      });
    }
  };

  onAddClick = () => {
    this.setState({
      dataForm: true,
      dataFormID: '',
    });
  };

  onItemDesc = infoid => {
    this.setState({
      dataForm: true,
      dataFormID: infoid,
    });
  };

  onTableCallback = ok => {
    if (ok === 'ok') {
      this.props.dispatch({
        type: 'zsxxManage/fetch',
      });
    }
  };

  onDataInfoCallback = ok => {
    if (ok === 'ok') {
      this.props.dispatch({
        type: 'infoManage/fetch',
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

  renderDataForm = () => {
    if (this.state.dataForm) {
      return <DataCard id={this.state.dataFormID} callback={this.onDataFormCallback} />;
    }
  };

  renderDataInfo = () => {
    if (this.state.dataInfo) {
      return <InfoCard id={this.state.dataInfoID} callback={this.onDataInfoCallback} visible />;
    }
  };

  render() {
    const {
      zsxxManage: {
        loading,
        data: { list, pagination },
      },
    } = this.props;

    const columns = [
      {
        title: '标题',
        dataIndex: 'desc.title',
        width: 350,
      },
      {
        title: '所属栏目',
        dataIndex: 'desc.column_name',
        width: 200,
      },
      // {
      //   title: '所属组织',
      //   dataIndex: 'desc.org',
      //   width: 200,
      // },
      // {
      //   title: '所属个人',
      //   dataIndex: 'desc.owner',
      //   width: 100,
      //   render: val => {
      //     return <UserShow uid={val} />;
      //   },
      // },
      {
        title: '状态',
        dataIndex: 'status.status',
        width: 100,
        render: val => {
          return <InfoStatus code={val} />;
        },
      },
      {
        title: '创建用户',
        dataIndex: 'operator.creator',
        width: 100,
        render: val => {
          return <UserShow uid={val} />;
        },
      },
      {
        title: '创建时间',
        dataIndex: 'operator.cre_time',
        // width: 200,
        render: val => {
          return <span> {parseUtcTime(val)} </span>;
        },
      },
    ];

    const paginationProps = {
      ...pagination,
    };
    // const opsHanlder = {
    //   onItemDesc: this.onItemDesc,
    //   onItemPublish: this.onItemPublish,
    //   onItemUnpublish: this.onItemUnpublish,
    //   onItemRecover: this.onItemRecover,
    //   onItemDelete: this.onItemDelete,
    //   onItemDestroy: this.onItemDestroy,
    //   onItemCheck: this.onItemCheck,
    //   onItemCommit: this.onItemCommit,
    // };
    const tableProps = {
      title: () => (
        <div>
          <Button icon="plus" type="primary" onClick={() => this.onAddClick()}>
            新建
          </Button>
        </div>
      ),
      loading,
      rowKey: record => record.info_id,
      dataSource: list,
      columns,
      pagination: paginationProps,
      onChange: this.onTableChange,
      scroll: { x: 1000 },
      onRow: record => {
        return {
          onClick: () => {
            this.onItemViewClick(record.info_id);
          },
        };
      },
    };
    return (
      <PageHeaderLayout title="招商信息管理">
        <Card bordered={false}>
          <InfoSearch onSearch={this.onSearch} hide={{ org: true }} searchObj={this.searchObj} />
          <InfoTableList
            tableProps={tableProps}
            onCallBack={ok => this.onTableCallback(ok)}
            infoOps={{
              edit: {
                handler: record => {
                  this.onItemDesc(record.info_id, record);
                },
              },
            }}
          />
        </Card>
        {this.renderDataForm()}
        {this.renderDataInfo()}
      </PageHeaderLayout>
    );
  }
}
