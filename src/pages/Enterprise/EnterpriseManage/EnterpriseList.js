import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Button, Modal, Badge, Select, Table, Icon } from 'antd';
// import moment from 'moment';
import { SearchCard, SearchItem } from '../../../components/SearchCard';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import EnterpriseInformationDetail from './EnterpriseInformationDetail';
import EnterpriseInformationAdd from './EnterpriseInformationAdd';
import EnterpriseInformationEdit from './EnterpriseInformationEdit';
import EnterpriseFlag from './EnterpriseFlag';
import EnterpriseMoveDate from './EnterpriseMoveDate';
import EnterpriseCreiteData from './EnterpriseCreiteData';
import { formatDate } from '../../../utils/utils';
import { DicSelect, DicShow } from '@/components/Dictionary';
import styles from './EnterpriseList.less';
// import SchTime from '../../../components/Info/SchTime';
import * as builingService from '@/services/building';
import PButton from '@/components/PermButton';

const { Option } = Select;
@connect(state => ({
  enterprise: state.enterprise,
  loading: state.loading.models.enterprise,
}))
@Form.create()
export default class EnterpriseList extends PureComponent {
  //  初始的状态信息
  state = {
    dataForm: false,
    dataFormID: '',
    dataFormType: '',

    queryFormDisplay: false,
    selectedRowKeys: [],
    selectedRows: [],
    enterFlag: false,
    enterFlagData: '',
    moveOut: false,
    moveOutData: '',
    creite: false,
    creiteData: null,
    tagList: [],
    floorList: [],
  };

  componentDidMount() {
    //  组件挂载的时候进行获取企业分类信息
    // this.props.dispatch({
    //   type: 'enterprise/fetchTreeNode',
    // });
    this.props.dispatch({
      type: 'enterprise/fetch',
      payload: {},
      pagination: {},
    });
    this.props.dispatch({
      type: 'enterprise/enterPriseFlagList',
    });
    builingService.HouseQuery({ q: 'list', btype: 80 }).then(data => {
      this.setState({ floorList: data.list ? data.list : [] });
    });
  }

  onItemEditClick = item => {
    this.setState({ dataForm: true, dataFormID: item.record_id, dataFormType: 'E' });
  };

  onItemDetailClick = item => {
    this.setState({ dataForm: true, dataFormID: item.record_id, dataFormType: 'Detail' });
  };

  onAddClick = () => {
    this.setState({ dataForm: true, dataFormID: '', dataFormType: 'A' });
  };

  // 迁出数据传值
  onMigrationOKClick = item => {
    this.props.dispatch({
      type: 'enterprise/changeMigration',
      payload: item,
    });
    this.MoveEnterclose();
  };

  //  迁出点击事件
  onItemMigrationClick = item => {
    Modal.confirm({
      title: `确定迁出企业【${item.name}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onMigrationOKClick.bind(this, item.record_id),
    });
  };

  onMoveOutShow = rec => {
    this.setState({
      moveOut: true,
      moveOutData: rec,
    });
  };

  MoveEnterclose = () => {
    this.setState({
      moveOut: false,
      moveOutData: '',
    });
  };

  // 企业认证码管理
  onAddAuthCodeClick = item => {
    this.props.dispatch({
      type: 'enterprise/redirectCode',
      payload: item,
    });
  };

  // 企业部门管理
  onAddDeptsClick = item => {
    this.props.dispatch({
      type: 'enterprise/redirectDepts',
      payload: item,
    });
  };

  onTableChange = pagination => {
    this.props.dispatch({
      type: 'enterprise/fetch',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
    this.clearSelectRows();
  };

  onResetFormClick = () => {
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'enterprise/fetch',
      payload: {},
      pagination: {},
    });
    this.clearSelectRows();
  };

  handleTableSelectRow = (keys, rows) => {
    this.setState({
      selectedRowKeys: keys,
      selectedRows: rows,
    });
  };

  clearSelectRows = () => {
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys.length === 0) {
      return;
    }
    this.setState({ selectedRowKeys: [], selectedRows: [] });
  };

  onSearchFormSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    const formData = this.props.form.getFieldsValue();

    if (formData.tags) {
      delete formData.tags;
    }
    formData.tags = this.state.tagList;

    //  上面是准备数据，下面是用上面准备的请求数据进行调度请求。
    this.props.dispatch({
      type: 'enterprise/fetch',
      payload: formData,
      pagination: {},
    });
    this.clearSelectRows();
  };

  onDataFormCallback = result => {
    if (this.state.dataFormType === 'A') {
      this.props.dispatch({
        type: 'enterprise/savePagination',
        payload: {},
      });
    }
    this.setState({ dataForm: false, dataFormID: '' });
    if (result && result === 'ok') {
      this.props.dispatch({
        type: 'enterprise/fetch',
      });
    }
    this.clearSelectRows();
  };

  onQueryFormToggleClick = () => {
    const { queryFormDisplay } = this.state;
    // 切换显示状态
    this.setState({
      queryFormDisplay: !queryFormDisplay,
    });
  };

  onAddFlagClick = item => {
    // 企业的标签
    this.setState({
      enterFlag: true,
      enterFlagData: item,
    });
  };

  onAddUserClick = item => {
    this.props.dispatch({
      type: 'enterprise/enterpriseUser',
      payload: item,
    });
  };

  onAddcreitArchiveClick = item => {
    // 企业信用档案
    this.setState({
      creite: true,
      creiteData: item,
    });
  };

  DataFlag = () => {
    this.setState({
      enterFlag: false,
      enterFlagData: null,
    });
  };

  DataEnterFlag = (data, id) => {
    this.props.dispatch({
      type: 'enterprise/enterpriseFlag',
      payload: { data, id },
    });
    this.DataFlag();
  };

  onItemDeleClick = item => {
    Modal.confirm({
      title: `确定删除企业【${item.name}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDeleOKClick.bind(this, item.record_id),
    });
  };

  onsetHotEnterClick = item => {
    Modal.confirm({
      title: `确定设立企业【${item.name}】为热门企业吗？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onsetHotOKClick.bind(this, item.record_id),
    });
  };

  onsetHotOKClick = data => {
    this.props.dispatch({
      type: 'enterprise/enterpriseSetHot',
      payload: data,
    });
    this.clearSelectRows();
  };

  oncancelHotEnterClick = item => {
    Modal.confirm({
      title: `确定取消热门企业【${item.name}】吗？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.oncancelHotOKClick.bind(this, item.record_id),
    });
  };

  oncancelHotOKClick = data => {
    this.props.dispatch({
      type: 'enterprise/enterpriseCancelHot',
      payload: data,
    });
    this.clearSelectRows();
  };

  onDeleOKClick = data => {
    this.props.dispatch({
      type: 'enterprise/enterpriseDele',
      payload: data,
    });
    this.clearSelectRows();
  };

  DataCriteBack = data => {
    this.props.dispatch({
      type: 'enterprise/saveCreiteData',
      payload: data,
    });
    this.cloeseCreite();
    this.clearSelectRows();
  };

  cloeseCreite = () => {
    this.setState({
      creite: false,
      creiteData: null,
    });
  };

  ChangeFlag = value => {
    this.setState({ tagList: value.join(',') });
  };

  renderDataForm() {
    if (this.state.dataForm) {
      if (this.state.dataFormType === 'A') {
        return (
          <EnterpriseInformationAdd
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            callback={this.onDataFormCallback}
          />
        );
      } else if (this.state.dataFormType === 'Detail') {
        return (
          <EnterpriseInformationDetail
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            callback={this.onDataFormCallback}
          />
        );
      } else if (this.state.dataFormType === 'E') {
        return (
          <EnterpriseInformationEdit
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            callback={this.onDataFormCallback}
          />
        );
      }
    }
    if (this.state.enterFlag) {
      return (
        <EnterpriseFlag
          callback={this.DataEnterFlag}
          callbackClose={this.DataFlag}
          data={this.state.enterFlagData}
        />
      );
    }
    if (this.state.moveOut) {
      return (
        <EnterpriseMoveDate
          callback={this.onMigrationOKClick}
          callbackClose={this.MoveEnterclose}
          data={this.state.moveOutData}
        />
      );
    }
    if (this.state.creite) {
      return (
        <EnterpriseCreiteData
          callback={this.DataCriteBack}
          callbackClose={this.cloeseCreite}
          data={this.state.creiteData}
        />
      );
    }
  }

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;
    const {
      enterprise: { enterpriseTagList },
    } = this.props;
    const { floorList } = this.state;
    return (
      //  查询条件表单，点击保存按钮，触发函数onSearchFormSubmit
      <SearchCard
        form={this.props.form}
        onSearch={this.onSearchFormSubmit}
        onReset={this.onResetFormClick}
      >
        <SearchItem label="企业名称">
          {getFieldDecorator('name')(<Input placeholder="请输入" />)}
        </SearchItem>
        <SearchItem label="行业">
          {getFieldDecorator('category')(
            <DicSelect
              vmode="int"
              pcode="OPER$#enterprise_category_industry"
              selectProps={{ placeholder: '请选择' }}
            />
          )}
        </SearchItem>
        <SearchItem label="状态">
          {getFieldDecorator('status')(
            <Select placeholder="请选择">
              <Select.Option value="1">正常</Select.Option>
              <Select.Option value="2">迁出</Select.Option>
            </Select>
          )}
        </SearchItem>

        <SearchItem label="企业标记">
          {getFieldDecorator('tags')(
            <Select mode="multiple" onChange={this.ChangeFlag}>
              {enterpriseTagList &&
                enterpriseTagList.map(v => {
                  return (
                    <Option key={v.code} value={v.code}>
                      {v.name}
                    </Option>
                  );
                })}
            </Select>
          )}
        </SearchItem>
        <SearchItem label="企业所属楼栋">
          {getFieldDecorator('buildingID')(
            <Select>
              {floorList &&
                floorList.map(v => {
                  return (
                    <Option key={v.record_id} value={v.record_id}>
                      {v.name}
                    </Option>
                  );
                })}
            </Select>
          )}
        </SearchItem>

        {/* <SearchItem label="入驻日期">
          {getFieldDecorator('entry_time')(<SchTime isRange />)}
        </SearchItem>
        <SearchItem label="迁出日期">
          {getFieldDecorator('migration_time')(<SchTime isRange />)}
        </SearchItem> */}
      </SearchCard>
    );
  }

  render() {
    const {
      loading,
      enterprise: {
        data: { list, pagination },
      },
    } = this.props;
    const { selectedRowKeys, selectedRows } = this.state;
    const columns = [
      {
        title: '企业LOGO',
        dataIndex: 'logo',
        key: 'logo',
        width: 150,
        render: value => {
          return <img src={value} alt="" style={{ width: 60, height: 60 }} />;
        },
      },
      {
        title: '企业名称',
        dataIndex: 'name',
        width: 250,
        render: (val, record) => {
          if (record.flag === 99) {
            return (
              <React.Fragment>
                <Icon type="fire" style={{ color: 'red' }} />
                <span>{val}</span>
              </React.Fragment>
            );
          }
          return <span>{val}</span>;
        },
      },
      {
        title: '行业类别',
        dataIndex: 'category',
        width: 150,
        render: val => {
          return <DicShow pcode="OPER$#enterprise_category_industry" code={[val]} show={name} />;
        },
      },
      {
        title: '企业规模',
        dataIndex: 'size',
        width: 150,
        render: val => {
          return <DicShow pcode="OPER$#enterprise_scale" code={[val]} show={name} />;
        },
      },
      {
        title: '公司类型',
        dataIndex: 'company_type',
        width: 150,
        render: val => {
          return <DicShow pcode="OPER$#company_type" code={[val]} show={name} />;
        },
      },
      {
        title: '企业电话',
        dataIndex: 'phone',
        width: 150,
      },

      {
        title: '法定代表人',
        dataIndex: 'representative',
        width: 150,
      },
      {
        title: '企业管理员',
        dataIndex: 'applicant_name',
        width: 150,
      },
      {
        title: '联系电话',
        dataIndex: 'applicant_tel',
        width: 150,
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 100,
        render: val => {
          if (val === 1) {
            return <Badge status="success" text="正常" />;
          }
          if (val === 0) {
            return <Badge status="success" text="申请中" />;
          }
          if (val === 2) {
            return <Badge status="error" text="迁出" />;
          }
        },
      },
      // {
      //   title: '企业地址',
      //   dataIndex: 'address',
      //   width: 250,
      // },
      // {
      //   title: '入驻日期',
      //   dataIndex: 'entry_date',
      //   width: 150,
      //   render: val => {
      //     if (val === 0) {
      //       return <span>-</span>;
      //     }
      //     if (val) {
      //       return <span>{formatDate(val, 'YYYY-MM-DD')}</span>;
      //     } else {
      //       return <span>-</span>;
      //     }
      //   },
      // },
      {
        title: '迁出日期',
        dataIndex: 'migration_date',
        width: 150,
        render: val => {
          if (val) {
            return <span>{formatDate(val, 'YYYY-MM-DD')}</span>;
          } else {
            return <span>-</span>;
          }
        },
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => {
        return <span>共{total}条</span>;
      },
      ...pagination,
    };
    //  默认render渲染方法返回的jsx标签
    return (
      <PageHeaderLayout title="企业管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            {this.renderSearchForm()}
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.onAddClick()}>
                新增企业
              </Button>
              {selectedRows.length === 1 && [
                <PButton
                  key="query"
                  code="query"
                  icon="eye-visible"
                  onClick={() => this.onItemDetailClick(selectedRows[0])}
                >
                  查看
                </PButton>,
                <PButton
                  key="edit"
                  code="edit"
                  icon="edit"
                  onClick={() => this.onItemEditClick(selectedRows[0])}
                >
                  编辑
                </PButton>,
                selectedRows[0].status !== 2 && (
                  <PButton key="del" code="del" onClick={() => this.onMoveOutShow(selectedRows[0])}>
                    迁出
                  </PButton>
                ),

                selectedRows[0].status === 2 && (
                  <PButton
                    key="delete"
                    code="delete"
                    icon="delete"
                    type="danger"
                    onClick={() => this.onItemDeleClick(selectedRows[0])}
                  >
                    删除
                  </PButton>
                ),
                <PButton
                  key="depart"
                  code="depart"
                  onClick={() => this.onAddDeptsClick(selectedRows[0])}
                >
                  企业部门管理
                </PButton>,
                selectedRows[0].status === 1 && (
                  <PButton
                    key="AutherCode"
                    code="AutherCode"
                    onClick={() => this.onAddAuthCodeClick(selectedRows[0])}
                  >
                    企业认证码管理
                  </PButton>
                ),
                selectedRows[0].flag !== 99 && (
                  <PButton
                    key="setHotEnter"
                    code="setHotEnter"
                    onClick={() => this.onsetHotEnterClick(selectedRows[0])}
                  >
                    设为热门企业
                  </PButton>
                ),
                selectedRows[0].flag === 99 && (
                  <PButton
                    key="cancelHotEnter"
                    code="cancelHotEnter"
                    onClick={() => this.oncancelHotEnterClick(selectedRows[0])}
                  >
                    取消热门企业
                  </PButton>
                ),
                <PButton
                  key="Enterpriseflag"
                  code="Enterpriseflag"
                  onClick={() => this.onAddFlagClick(selectedRows[0])}
                >
                  企业标签
                </PButton>,
                <PButton
                  key="EnterpriseUser"
                  code="EnterpriseUser"
                  onClick={() => this.onAddUserClick(selectedRows[0])}
                >
                  企业人员管理
                </PButton>,
                <PButton
                  key="creditArchives"
                  code="creditArchives"
                  onClick={() => this.onAddcreitArchiveClick(selectedRows[0])}
                >
                  企业信用档案管理
                </PButton>,
              ]}
            </div>
            <div>
              <Table
                rowSelection={{
                  selectedRowKeys,
                  onChange: this.handleTableSelectRow,
                }}
                loading={loading}
                rowKey={record => record.record_id}
                dataSource={list}
                columns={columns}
                pagination={paginationProps}
                scroll={{ x: 1450 }}
                onChange={this.onTableChange}
              />
            </div>
          </div>
        </Card>
        {this.renderDataForm()}
      </PageHeaderLayout>
    );
  }
}
