import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { parseUtcTime } from '../../utils/utils';
// import InfoCard from './InfoCard';
import { InfoStatus, InfoTableList, InfoSearch, InfoCard, NewButton } from '../../components/Info';
import UserShow from '../../components/UserShow';
import { ColumnShow } from '../../components/Column';
@connect(state => ({
  boardManage: state.boardManage,
  boardInfo: state.boardInfo,
}))
export default class BoardInfosManage extends PureComponent {
  state = {
    dataForm: false,
    dataInfo: false,
    dataInfoID: '',
  };

  searchObj = { status: [0, 2, 5] };

  componentDidMount() {
    const { orgid } = this.props;
    this.searchObj = { ...this.searchObj, org: orgid };
    this.props.dispatch({
      type: 'boardInfo/saveOrgid',
      payload: orgid,
    });
    this.props.dispatch({
      type: 'boardInfo/saveSearch',
      payload: {},
    });
    this.props.dispatch({
      type: 'boardInfo/fetch',
      payload: {
        ...this.searchObj,
      },
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
      type: 'boardInfo/fetch',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  onSearch = formData => {
    this.props.dispatch({
      type: 'boardInfo/fetch',
      payload: formData,
    });
  };

  onDataFormCallback = result => {
    this.setState({
      dataForm: false,
      dataFormID: '',
    });
    if (result) {
      this.props.dispatch({
        type: 'boardInfo/fetch',
      });
    }
    // if (this.state.schHandler) {
    //   this.state.schHandler();
    // }
  };

  onItemDesc = infoid => {
    this.setState({
      dataForm: true,
      dataFormID: infoid,
    });
  };

  onDataInfoCallback = ok => {
    if (ok === 'ok') {
      this.props.dispatch({
        type: 'boardInfo/fetch',
      });
    }
    this.setState({
      dataInfo: false,
      dataInfoID: '',
    });
  };

  onTableCallback = ok => {
    if (ok === 'ok') {
      this.props.dispatch({
        type: 'boardInfo/fetch',
      });
    }
  };

  renderNewButton = () => {
    const edit = {
      callback: this.onDataFormCallback,
      org: this.props.boardManage.orgid,
      hideOrg: true,
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

  renderDataInfo = () => {
    if (this.state.dataInfo) {
      return <InfoCard id={this.state.dataInfoID} callback={this.onDataInfoCallback} />;
    }
  };

  render() {
    const {
      boardInfo: {
        loading,
        data: { list, pagination },
      },
      boardManage: { orgid },
    } = this.props;

    const columns = [
      {
        title: '状态',
        dataIndex: 'status.status',
        width: 100,
        render: val => {
          return <InfoStatus code={val} />;
        },
      },
      {
        title: '所属栏目',
        dataIndex: 'desc.column_id',
        width: 100,
        render: val => {
          return <ColumnShow value={val} />;
        },
      },
      {
        title: '标题',
        dataIndex: 'desc.title',
        width: 350,
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
    const tableProps = {
      title: () => this.renderNewButton(),
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

    const col = {
      sm: 24,
      md: 24,
      lg: 24,
      xl: 12,
      xxl: 8,
    };
    return (
      <Card bordered={false}>
        <InfoSearch
          onSearch={this.onSearch}
          hide={{ org: 1 }}
          searchObj={{ org: orgid }}
          col={col}
        />
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
        {this.renderDataInfo()}
      </Card>
    );
  }
}
