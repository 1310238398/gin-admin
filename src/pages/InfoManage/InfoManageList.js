import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { parseUtcTime } from '../../utils/utils';

// import InfoCard from './InfoCard';
import { ContentShow } from '@/components/ContentShow';
import { InfoStatus, InfoTableList, InfoSearch, InfoCard, NewButton } from '../../components/Info';
import { ColumnShow } from '../../components/Column';
import UserShow from '../../components/UserShow';
import { OrgShow } from '../../components/Org';

@connect(state => ({
  infoManage: state.infoManage,
  loading: state.loading.models.infoManage,
}))
@Form.create()
export default class InfoManageList extends PureComponent {
  state = {
    dataForm: false,
    dataInfo: false,
    dataInfoID: '',
    dataType: '',
  };

  searchObj = { status: [0, 2, 5] };

  componentDidMount() {
    this.props.dispatch({
      type: 'infoManage/saveSearch',
      payload: {},
    });
    this.props.dispatch({
      type: 'infoManage/fetch',
      payload: this.searchObj,
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
      type: 'infoManage/fetch',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  onSearch = formData => {
    this.props.dispatch({
      type: 'infoManage/fetch',
      payload: formData,
    });
  };

  onDataFormCallback = result => {
    if (result) {
      this.props.dispatch({
        type: 'infoManage/fetch',
      });
    }
    this.closeKindeBack();
  };

  closeKindeBack = () => {
    this.setState({
      dataForm: false,
      dataFormID: '',
      dataType: '',
    });
  };

  onAddClick = () => {
    this.setState({
      dataForm: true,
      dataFormID: '',
    });
  };

  onItemDesc = (id, record) => {
    this.setState({
      dataForm: true,
      dataFormID: record.info_id,
      dataType: record.desc.kind,
    });
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

  onTableCallback = ok => {
    if (ok === 'ok') {
      this.props.dispatch({
        type: 'infoManage/fetch',
      });
    }
  };

  renderDataInfo = () => {
    if (this.state.dataInfo) {
      return <InfoCard id={this.state.dataInfoID} callback={this.onDataInfoCallback} visible />;
    }
  };

  renderNewButton = () => {
    const edit = {
      callback: this.onDataFormCallback,
    };
    if (this.state.dataForm) {
      edit.id = this.state.dataFormID;
      edit.datatype = this.state.dataType;
    }
    const prop = {
      visible: this.state.dataForm,
      edit,
    };
    return <NewButton {...prop} mode="button" />;
  };

  render() {
    const {
      loading,
      infoManage: {
        data: { list, pagination },
      },
    } = this.props;
    // 新增类型

    const columns = [
      {
        title: '状态',
        dataIndex: 'status.status',
        width: 120,
        render: val => {
          return <InfoStatus code={val} />;
        },
      },
      {
        title: '所属栏目',
        dataIndex: 'desc.column_id',
        width: 200,
        render: val => {
          return <ColumnShow value={val} />;
        },
      },
      {
        title: '标题',
        dataIndex: 'desc.title',
        width: 350,
        render: val => {
          return <ContentShow content={val} />;
        },
      },
      {
        title: '所属组织',
        dataIndex: 'desc.org',
        width: 200,
        render: val => {
          return <OrgShow value={val} />;
        },
      },
      {
        title: '所属个人',
        dataIndex: 'desc.owner',
        width: 100,
        render: val => {
          return <UserShow uid={val} />;
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
      title: () => this.renderNewButton(),
      loading,
      rowKey: record => record.info_id,
      dataSource: list,
      columns,
      pagination: paginationProps,
      onChange: this.onTableChange,
      scroll: { x: 1500 },
      onRow: record => {
        return {
          onClick: () => {
            this.onItemViewClick(record.info_id);
          },
        };
      },
    };
    return (
      <PageHeaderLayout title="信息管理">
        <Card bordered={false}>
          <InfoSearch onSearch={this.onSearch} searchObj={this.searchObj} />
          <InfoTableList
            tableProps={tableProps}
            onCallBack={ok => this.onTableCallback(ok)}
            infoOps={{
              edit: {
                handler: record => {
                  this.onItemDesc(record.infoid, record);
                },
              },
            }}
          />
        </Card>
        {/* {this.renderDataForm()} */}
        {this.renderDataInfo()}
      </PageHeaderLayout>
    );
  }
}
