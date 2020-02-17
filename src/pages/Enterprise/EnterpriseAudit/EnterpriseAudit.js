import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Select, Tag, Table } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { isNullOrUndefined } from 'util';
// import moment from 'moment';
import PButton from '@/components/PermButton';
import moment from 'moment';
import { isObjectNullOrUndefinedOrEmpty } from '../../../utils/utils';
import EnterpriseAuditInfo from './EnterpriseAuditInfo';
import EnterpriseAuditReason from './EnterpriseAuditReason';
import { DicSelect, DicShow } from '@/components/Dictionary';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './EnterpriseAuditInfo.less';

@connect(state => ({
  enterpriseAudit: state.enterpriseAudit,
  enterprise: state.enterprise,
  loading: state.loading.models.enterpriseAudit,
}))
@Form.create()
export default class EnterpriseAudit extends PureComponent {
  state = {
    selectedRowKeys: [],
    selectedRows: [],
    queryFormDisplay: false,
    enterpriseInfoFrame: {
      visible: false,
      data: null,
      noPass: null,
    },
    reasonInfo: {
      visible: false,
      data: '',
    },
  };

  queryForm = null;

  pagination = null;

  componentDidMount() {
    // this.props.dispatch({ type: 'enterpriseApplicationReview/queryenterprisestatue' });
    this.onBtnSearchClick();
  }

  clearSelectRows = () => {
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys.length === 0) {
      return;
    }
    this.setState({ selectedRowKeys: [], selectedRows: [] });
  };

  handleTableSelectRow  = (selectedRowKeys, selectedRows) => {
    let keys = selectedRowKeys;
    let rows = selectedRows;
    if (selectedRowKeys.length > 1) {
      keys = [selectedRowKeys[selectedRowKeys.length-1]];
      rows = [selectedRows[selectedRowKeys.length-1]];
    }

    this.setState({
      selectedRowKeys: keys,
      selectedRows: rows,
    });
  };

  // 企业认证码管理
  onAddAuthCodeClick = item => {
    this.props.dispatch({
      type: 'enterprise/redirectCode',
      payload: item,
    });
  };

  onBtnSearchClick = () => {
    this.pagination = {
      current: 1,
      pageSize: 10,
    };
    this.queryForm = this.props.form.getFieldsValue();

    // 修改时间精度到秒
    if (!isObjectNullOrUndefinedOrEmpty(this.queryForm)) {
      if (!isNullOrUndefined(this.queryForm.application_status)) {
        this.queryForm.application_status = parseInt(this.queryForm.application_status, 10);
      }
    }

    this.queryListData(this.queryForm, this.pagination);
  };

  /**
   * 分页事件
   */
  onTableChange = pagination => {
    const params = this.queryForm;
    this.queryListData(params, pagination);
  };

  /**
   * 清空按钮点击事件
   */
  onBtnClearClick = () => {
    this.props.form.resetFields();
    this.onBtnSearchClick();
  };

  /**
   * 查询表单区域折叠
   */
  onQueryFormToggleClick = () => {
    const { queryFormDisplay } = this.state;
    // 切换显示状态
    this.setState({
      queryFormDisplay: !queryFormDisplay,
    });
  };

  /**
   * 打开企业信息查看界面
   * @param {企业信息记录} rec
   */
  showEnterpriseStatueInfoFrame = rec => {
    this.setState({
      enterpriseInfoFrame: {
        visible: true,
        data: rec,
        noPass: 0,
      },
    });
  };

  // 驳回
  onNOpassCallback = rec => {
    this.setState({
      reasonInfo: {
        visible: true,
        data: rec,
      },
    });
  };

  // 审核
  onWriteOffCallback = rec => {
    this.setState({
      enterpriseInfoFrame: {
        visible: true,
        data: rec,
        noPass: 1,
      },
    });
  };

  // 通过->传值后台
  onPassOffCallback = rec => {
    this.props.dispatch({
      type: 'enterpriseAudit/passOff',
      param: rec.record_id,
      bodyContent: { status: 2, audit_suggest: rec.audit_suggest },
    });
    // 关闭窗口
    this.closeSubFrame();
  };

  // 驳回-》后台传值
  onUnAuthCallback = rec => {
    this.props.dispatch({
      type: 'enterpriseAudit/UnAuth',
      param: rec.record_id,
      bodyContent: { status: 3, audit_suggest: rec.audit_suggest },
    });

    // 关闭窗口
    this.closeSubFrame();
  };

  closeSubFrameReason = () => {
    this.setState({
      reasonInfo: {
        visible: false,
        data: '',
      },
    });
  };

  /**
   * 子窗口关闭回调
   */
  closeSubFrame = () => {
    // 关闭窗口
    this.setState({
      enterpriseInfoFrame: {
        visible: false,
        data: null,
      },
    });
  };

  /**
   * 查询数据
   * @param {*} pagination
   */
  queryListData(params, pagination) {
    this.props.dispatch({
      type: 'enterpriseAudit/queryEnterpriseList',
      payload: params,
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  /**
   * 界面渲染
   */
  render() {
    // const { queryFormDisplay } = this.state;
    // Item布局
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    const {
      enterpriseAudit: {
        tableData: { list, pagination },
        // enterpriseStatueList,
        loading,
      },
    } = this.props;
    const { selectedRowKeys, selectedRows } = this.state;
    // 日期控件样式
    // const dateFormat = 'YYYY/MM/DD';
    // 查询区域显示style
    // const queryFormDisplayStyly = {
    //   display: queryFormDisplay ? 'block' : 'none',
    // };
    // const queryFormDisplayButtonJsx = queryFormDisplay ? (
    //   <span>
    //     收起 <Icon type="up" />
    //   </span>
    // ) : (
    //   <span>
    //     展开 <Icon type="down" />
    //   </span>
    // );
    // 列定义
    // const colWidthShort = 100;
    const colWidthNormal = 120;
    const columns = [
      // {
      //   title: '企业LOGO',
      //   dataIndex: 'enterprise',
      //   key: 'enterprise',
      //   render: value => {
      //     return <img src={value.logo} alt="" style={{ width: 60, height: 60 }} />;
      //   },
      // },
      {
        title: '企业名称',
        dataIndex: 'enterprise',
        key: 'enterprise',
        width: 200,
        render: value => {
          return value ? value.name : '';
        },
      },
      {
        title: '行业类别',
        dataIndex: 'enterprise',
        width: colWidthNormal,
        key: 'enterprise',
        render: val => {
          return (
            <DicShow pcode="OPER$#enterprise_category_industry" code={[val.category]} show={name} />
          );
        },
      },

      {
        title: '企业规模',
        dataIndex: 'enterprise',
        width: 150,
        render: val => {
          return <DicShow pcode="OPER$#enterprise_scale" code={[val.company_type]} show={name} />;
        },
      },
      {
        title: '公司类型',
        dataIndex: 'enterprise',
        width: 150,
        render: val => {
          return <DicShow pcode="OPER$#company_type" code={[val.company_type]} show={name} />;
        },
      },
      {
        title: '申请状态',
        dataIndex: 'status',
        width: 100,
        key: 'status',
        render: gender => {
          // <Option value={1}>正常</Option>
          // <Option value={2}>注销</Option>
          switch (gender) {
            case 1:
              return <Tag color="blue">待审核</Tag>;
            case 2:
              return <Tag color="green">审批通过</Tag>;
            case 3:
              return <Tag color="red">审批驳回</Tag>;
            default:
              return null;
          }
        },
      },
      {
        title: '通过/驳回时间',
        dataIndex: 'audit_time',
        width: 200,
        key: 'audit_time',
        render: text => {
          if (text && text !== 0) {
            return moment(text).format('YYYY-MM-DD');
          } else {
            return '';
          }
        },
      },
      {
        title: '驳回原因',
        dataIndex: 'audit_suggest',
        width: 200,
        key: 'audit_suggest',
      },
      {
        title: '企业电话',
        dataIndex: 'enterprise.phone',
        width: 100,
      },

      {
        title: '法定代表人',
        dataIndex: 'enterprise.representative',
        width: 100,
      },
      {
        title: '企业管理员',
        dataIndex: 'enterprise.applicant_name',
        width: 100,
      },
      {
        title: '联系电话',
        dataIndex: 'enterprise.applicant_tel',
        width: 100,
      },
     
    ];
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => {
        return (
          <span>
            共{total}
            条记录
          </span>
        );
      },
      ...pagination,
    };

    return (
      <PageHeaderLayout title="企业申请审核">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Form>
              <Row>
                <Col span={7}>
                  <FormItem {...formItemLayout} label="企业名称">
                    {getFieldDecorator('name', {})(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col span={7}>
                  <FormItem {...formItemLayout} label="联系人">
                    {getFieldDecorator('applicant_name', {})(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col span={7}>
                  <FormItem {...formItemLayout} label="联系电话">
                    {getFieldDecorator('applicant_tel', {})(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={7}>
                  <FormItem {...formItemLayout} label="行业类别">
                    {getFieldDecorator('corporation', {})(
                      <DicSelect
                        vmode="int"
                        pcode="OPER$#enterprise_category_industry"
                        selectProps={{ placeholder: '请选择' }}
                      />
                    )}
                  </FormItem>
                </Col>
                {/* <Col span={7}>
                  <FormItem {...formItemLayout} label="地址">
                    {getFieldDecorator('legal_persion', {
                      //   initialValue: 0,
                    })(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col> */}
                <Col span={7}>
                  <FormItem {...formItemLayout} label="申请状态">
                    {getFieldDecorator('audit_status', {})(
                      <Select>
                        <Select.Option value="1">待审核</Select.Option>
                        <Select.Option value="2">审核通过</Select.Option>
                        <Select.Option value="3">审核驳回</Select.Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <Button type="primary" onClick={this.onBtnSearchClick}>
                    查询
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.onBtnClearClick}>
                    重置
                  </Button>
                  {/* <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.onQueryFormToggleClick}>
                    {queryFormDisplayButtonJsx}
                  </a> */}
                </Col>
              </Row>
            </Form>

            <div className={styles.tableListOperator}>
              {selectedRows.length === 1 && [
                <PButton
                  key="query"
                  code="query"
                  icon="read"
                  onClick={() => this.showEnterpriseStatueInfoFrame(selectedRows[0])}
                >
                  查看
                </PButton>,
                selectedRows[0].status === 1 && (
                  <PButton
                    key="pass"
                    code="pass"
                    type="primary"
                    onClick={() => this.onWriteOffCallback(selectedRows[0])}
                  >
                    通过
                  </PButton>
                ),
                selectedRows[0].status === 1 &&(
                  <PButton
                    key="reject"
                    code="reject"
                    type="danger"
                    onClick={() => this.onNOpassCallback(selectedRows[0])}
                  >
                    驳回
                  </PButton>
                ),
                // selectedRows[0].status === 2 && (
                //   <PButton
                //     key="AutherCode"
                //     code="AutherCode"
                //     icon="AutherCode"
                //     onClick={() => this.onAddAuthCodeClick(selectedRows[0])}
                //   >
                //     创建认证码
                //   </PButton>
                // ),
              ]}
            </div>
            <div>
              <Table
                rowSelection={{
                  selectedRowKeys,
                  onChange: this.handleTableSelectRow,
                }}
                loading={loading}
                dataSource={list}
                columns={columns}
                scroll={{ x: 2500 }}
                onChange={this.onTableChange}
                pagination={paginationProps}
              />
            </div>
          </div>
        </Card>
        {this.state.enterpriseInfoFrame.visible && (
          <EnterpriseAuditInfo
            data={this.state.enterpriseInfoFrame.data}
            noPass={this.state.enterpriseInfoFrame.noPass}
            onEnterpriseInfoFrameCloseCallback={this.closeSubFrame}
            onPassOffCallback={this.onPassOffCallback}
            onBtnUnAuthClick={this.onUnAuthCallback}
          />
        )}
        {this.state.reasonInfo.visible && (
          <EnterpriseAuditReason
            data={this.state.reasonInfo.data}
            onBtnUnReasonClick={this.onUnAuthCallback}
            onEnterpriseInfoFrameCloseCallback={this.closeSubFrameReason}
          />
        )}
      </PageHeaderLayout>
    );
  }
}
