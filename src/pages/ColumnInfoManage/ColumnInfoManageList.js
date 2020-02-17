import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Form, Spin, Modal, Icon, Radio,Tooltip,Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { parseUtcTime } from '../../utils/utils';
import { InfoStatus, InfoSearch, InfoTableList, InfoCard, NewButton } from '../../components/Info';
import { ColumnEdit, ColumnCard } from '../../components/Column';
import { ContentShow } from '@/components/ContentShow';
// import InfoCard from './InfoCard';
import UserShow from '../../components/UserShow';

@connect(state => ({
  columnInfoManage: state.columnInfoManage,
  columnInfoCol: state.columnInfoCol,
  // loading: state.loading.models.columnInfoManage,
}))
@Form.create()
export default class ColumnInfoManageList extends Component {
  searchObj = {
    status: [0, 5],
  };

  constructor(props) {
    super(props);
    const {
      match: {
        params: { columnid, listmode },
      },
    } = props;
    this.state = {
      dataForm: false,
      dataInfo: false,
      dataInfoID: '',
      step: -1,
    };
    this.columnid = columnid;
    this.listmode = listmode;
  }

  componentDidMount() {
    const {
      match: {
        params: { columnid, listmode },
      },
    } = this.props;

    this.props.dispatch({
      type: 'columnInfoManage/init',
      searchObj: this.searchObj,
      columnid,
      listmode: 1 * listmode,
    });
  }

  shouldComponentUpdate(nextProps) {
    const {
      match: {
        params: { columnid, listmode },
      },
    } = nextProps;
    let flag = false;
    if (columnid !== this.columnid) {
      this.columnid = columnid;
      flag = true;
    }
    if (listmode !== this.listmode) {
      this.listmode = listmode;
      flag = true;
    }
    if (flag) {
      this.props.dispatch({
        type: 'columnInfoManage/init',
        searchObj: this.searchObj,
        columnid,
        listmode: 1 * listmode,
      });
    }
    return true;
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
      type: 'columnInfoManage/fetch',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  onSearch = formData => {
    this.props.dispatch({
      type: 'columnInfoManage/fetch',
      payload: formData,
    });
  };

  onDataFormCallback = result => {
    this.setState({
      dataForm: false,
      dataFormID: '',
    });
    if (result && result === 'ok') {
      this.props.dispatch({
        type: 'columnInfoManage/fetch',
      });
    }
    // if (this.state.schHandler) {
    //   this.state.schHandler();
    // }
  };

  onDataInfoCallback = () => {
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
        type: 'columnInfoManage/fetch',
      });
    }
  };

  onItemDesc = (id, record) => {
    this.setState({
      dataForm: true,
      dataFormID: record.info_id,
    });
  };

  onColDescClick = columnid => {
    this.showStep(0, columnid);
  };

  // onColDetailClick = columnid => {
  //   this.setState({ dataColFormID: columnid }, () => {
  //     this.showStep(-1);
  //   });
  // };

  onColCtrlClick = columnid => {
    this.showStep(1, columnid);
  };

  onColExtraClick = columnid => {
    this.showStep(2, columnid);
  };

  onColLockClick = columnid => {
    Modal.confirm({
      title: '确定锁定该栏目吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.props.dispatch({
          type: 'columnInfoManage/colLock',
          payload: columnid,
          callback: this.refreshCol,
        });
      },
    });
  };

  onColUnLockClick = columnid => {
    Modal.confirm({
      title: '确定解锁该栏目吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.props.dispatch({
          type: 'columnInfoManage/colUnlock',
          payload: columnid,
          callback: this.refreshCol,
        });
      },
    });
  };

  onDataColFormCallback = result => {
    this.setState({ dataColFormID: '' });
    if (result && result === 'ok') {
      this.refreshCol();
    }
    this.showStep(-1);
  };

  onColDetailClick = id => {
    this.setState({ dataDetail: true, dataColumnID: id });
  };

  onColDetailCallback = () => {
    this.setState({ dataDetail: false, dataColumnID: '' });
  };

  onDataInfoCallback = result => {
    this.setState({
      dataInfo: false,
      dataInfoID: '',
    });
    if (result && result === 'ok') {
      this.props.dispatch({
        type: 'columnInfoManage/fetch',
      });
    }
    // if (this.state.schHandler) {
    //   this.state.schHandler();
    // }
  };

  refreshCol = () => {
    this.props.dispatch({
      type: 'columnInfoManage/refreshCol',
    });
  };

  handleColClick = key => {
    const {
      match: {
        params: { columnid },
      },
    } = this.props;
    switch (key) {
      case 'detail':
        this.onColDetailClick(columnid);
        break;
      case 'desc':
        this.onColDescClick(columnid);
        break;
      case 'ctl':
        this.onColCtrlClick(columnid);
        break;
      case 'extra':
        this.onColExtraClick(columnid);
        break;
      case 'del':
        this.onColDeleteClick(columnid);
        break;
      case 'lock':
        this.onColLockClick(columnid);
        break;
      case 'unlock':
        this.onColUnLockClick(columnid);
        break;
      default:
    }
    this.setState({ key: '' });
  };

  showStep = (step, dataColFormID) => {
    this.setState({ step, dataColFormID });
  };

  renderDataInfo = () => {
    if (this.state.dataInfo) {
      return <InfoCard id={this.state.dataInfoID} callback={this.onDataInfoCallback} />;
    }
  };

  renderColDataForm = () => {
    if (this.state.step > -1) {
      return (
        <ColumnEdit
          columnId={this.state.dataColFormID}
          step={this.state.step}
          callback={this.onDataColFormCallback}
        />
      );
    }
  };

  renderColDataDetail = () => {
    if (this.state.dataDetail) {
      return (
        <ColumnCard id={this.state.dataColumnID} callback={this.onColDetailCallback} visible />
      );
    }
  };

  renderColOp = () => {
    const {
      columnInfoManage: { column },
    } = this.props;
    if (!('status' in column)) return;
    return (
      <Radio.Group value={this.state.key} onChange={e => this.handleColClick(e.target.value)}>
        {true && (
          <Radio.Button value="detail">
            <Icon type="detail" />
            栏目明细
          </Radio.Button>
        )}
        {column.status.status === 0 && (
          <Radio.Button value="desc">
            <Icon type="edit" />
            修改描述
          </Radio.Button>
        )}
        {column.status.status === 0 && (
          <Radio.Button value="ctl">
            <Icon type="edit" />
            控制参数
          </Radio.Button>
        )}
        {column.status.status === 0 && (
          <Radio.Button value="extra">
            <Icon type="edit" />
            扩展属性
          </Radio.Button>
        )}
        {column.status.status === 0 && (
          <Radio.Button value="lock">
            <Icon type="lock" />
            锁定
          </Radio.Button>
        )}
        {column.status.status === 1 && (
          <Radio.Button value="unlock">
            <Icon type="unlock" />
            解锁
          </Radio.Button>
        )}
      </Radio.Group>
    );
  };

  renderNewButton = () => {
    const {
      // loading,
      columnInfoManage: { loading, column },
    } = this.props;

    if (loading) {
      return <Spin />;
    }
    const edit = {
      callback: this.onDataFormCallback,
      column: this.columnid,
      hideColumn: true,
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
    if (column.ctl_param.deny_info_kind_all === 1) {
      if (column.ctl_param.allow_info_kinds && column.ctl_param.allow_info_kinds.length > 0) {
        prop.showKinds = column.ctl_param.allow_info_kinds;
      }
    }
    return <NewButton {...prop} />;
  };

  render() {
    const {
      columnInfoManage: {
        loading,
        column,
        data: { list, pagination },
      },
    } = this.props;
    const columns = [
      {
        title: '标题',
        dataIndex: 'desc.title',
        width: 220,
        render: val => {
          return (
            <Tooltip placement="rightBottom" title={val}>
              <Button style={{border:'0px'}}>{val}</Button>
            </Tooltip>
          );
        },
        // width: 350,
        // render: (val, record) => {
        //   return <span onClick={() => this.onItemViewClick(record.info_id)}>{val}</span>;
        // },
      },
      {
        title: '状态',
        dataIndex: 'status.status',
        width: 120,
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
        width: 200,
        render: val => {
          return <span> {parseUtcTime(val)} </span>;
        },
      },
    ];

    const paginationProps = {
      ...pagination,
    };
    const { desc } = column;
    let title = '';
    if (desc && desc.name) {
      title = `${desc.name}管理`;
    }
    const schHide = { column: 1, org: 1 };
    if (column && column.desc) {
      if (column.desc.kind === 0) {
        schHide.org = 1;
      } else if (column.desc.kind === 1) {
        schHide.org = 0;
      }
    }
    const tableProps = {
      title: () => (
        <div>
          {this.renderNewButton()}
          {this.renderColOp()}
        </div>
      ),
      loading,
      rowKey: record => record.info_id,
      dataSource: list,
      columns,
      pagination: paginationProps,
      onChange: this.onTableChange,
      scroll: { x: 840 },
      onRow: record => {
        return {
          onClick: () => {
            this.onItemViewClick(record.info_id);
          },
        };
      },
    };
    return (
      <PageHeaderLayout title={title}>
        <Card bordered={false}>
          <InfoSearch onSearch={this.onSearch} hide={schHide} searchObj={this.searchObj} />
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
        {this.renderDataInfo()}
        {this.renderColDataForm()}
        {this.renderColDataDetail()}
      </PageHeaderLayout>
    );
  }
}
