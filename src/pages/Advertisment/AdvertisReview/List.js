import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Modal, Table, Select, Icon, Tooltip } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
// import Info from './Info';
import AdvertisReviewEdit from './AdvertisReviewEdit';
import { formatDate } from '@/utils/utils';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import AdvertiserSelect from '@/components/AdvertiserSelect/AdvertiserSelect';
import AdvertiserPositionSelect from '@/components/AdvertiserPosition/AdvertiserPosition';
import AdvertisCreateGroupSelect from '@/components/AdvertisCreateGroup/AdvertisCreateGroup';
import AdvertiserCreateSelect from '@/components/AdvertisCreate/AdvertisCreate';
import PButton from '@/components/PermButton';
import styles from './AdvertisReview.less';

@connect(state => ({
  advertisReview: state.advertisReview,
}))
@Form.create()
export default class AdvertisReviewList extends PureComponent {
  state = {
    queryFormDisplay: false,
    selectedRowKeys: [],
    selectedRows: [],

    dataForm: false,
    dataFormID: '',
    dataFormType: '',
  };

  queryForm = null;

  pagination = {};

  componentDidMount() {
    this.onBtnSearchClick();
  }

  onBtnSearchClick = () => {
    this.pagination = {
      current: 1,
      pageSize: 10,
    };
    this.queryForm = this.props.form.getFieldsValue();

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
    this.clearSelectRows();
  };

  /**
   * 子窗口关闭回调
   */
  closeSubFrame = () => {
    // 关闭窗口
    this.setState({ dataForm: false, dataFormID: '', dataFormType: '' });
    this.clearSelectRows();
  };

  handleTableSelectRow = (selectedRowKeys, selectedRows) => {
    let keys = selectedRowKeys;
    let rows = selectedRows;
    if (selectedRowKeys.length > 1) {
      keys = [selectedRowKeys[selectedRowKeys.length - 1]];
      rows = [selectedRows[selectedRowKeys.length - 1]];
    }
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

  onDataFormCallback = result => {
    this.setState({ dataForm: false, dataFormID: '', dataFormType: '' });
    if (result && result === 'ok') {
      this.props.dispatch({
        type: 'advertisReview/fetch',
      });
    }
    this.clearSelectRows();
  };

  onItemDeleClick = item => {
    Modal.confirm({
      title: `确定删除代理商【${item.name}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDeleOKClick.bind(this, item.record_id),
    });
  };

  onDeleOKClick = data => {
    this.props.dispatch({
      type: 'advertisReview/agentDele',
      payload: data,
    });
    this.clearSelectRows();
  };

  // 新增店铺
  onAddClick = () => {
    // this.props.dispatch(routerRedux.push('./shopcreate'));
    this.setState({ dataForm: true, dataFormID: '', dataFormType: 'A' });
  };

  onItemEditClick = item => {
    this.setState({ dataForm: true, dataFormID: item.record_id, dataFormType: 'E' });
  };

  onItemDetailClick = item => {
    this.setState({ dataForm: true, dataFormID: item.record_id, dataFormType: 'Detail' });
  };

  // 投放
  onItemPassClick = item => {
    Modal.confirm({
      title: `确定通过广告推广--【${item.name}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onPassOKClick.bind(this, item),
    });
  };

  onPassOKClick = data => {
    this.props.dispatch({
      type: 'advertisReview/advertProPass',
      payload: { id: data.record_id, status: 3, audit_reason: '' },
    });
    this.clearSelectRows();
  };

  // 驳回
  onItemRefuseClick = item => {
    this.setState({ dataForm: true, dataFormID: item.record_id, dataFormType: 'Refuse' });
  };

  callBackData = data => {
    this.props.dispatch({
      type: 'advertisReview/advertProPass',
      payload: { id: data.record_id, status: 4, audit_reason: data.audit_reason },
    });
    this.clearSelectRows();
    this.onDataFormCallback();
  };

  /**
   * 查询数据
   * @param {*} pagination
   */
  queryListData(params, pagination) {
    this.props.dispatch({
      type: 'advertisReview/fetch',
      payload: params,
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  renderDataForm() {
    if (this.state.dataForm) {
      //   if (this.state.dataFormType === 'Detail') {
      //     return (
      //       <Info
      //         id={this.state.dataFormID}
      //         onCloseCallback={this.closeSubFrame}
      //       />
      //     );
      //   } else
      if (this.state.dataFormType === 'E') {
        return (
          <AdvertisReviewEdit
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            callback={this.onDataFormCallback}
          />
        );
      } else if (this.state.dataFormType === 'A') {
        return (
          <AdvertisReviewEdit
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            callback={this.onDataFormCallback}
          />
        );
      } else if (this.state.dataFormType === 'Refuse') {
        return (
          <AdvertisReviewEdit
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            callback={this.onDataFormCallback}
            dataCallBack={this.callBackData}
          />
        );
      }
    }
  }

  /**
   * 界面渲染
   */
  render() {
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
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { selectedRowKeys, selectedRows } = this.state;
    const {
      advertisReview: {
        data: { list, pagination },
        loading,
      },
    } = this.props;
    // console.log(this.props);
    // 列定义
    // const colWidthShort = 100;
    const colWidthNormal = 120;
    const columns = [
      {
        title: '推广名称',
        dataIndex: 'name',
        width: 120,
      },
      {
        title: '广告位',
        dataIndex: 'advertising_name',
        width: 150,
      },
      {
        title: '广告主',
        dataIndex: 'advertiser_name',
        width: 150,
      },
      {
        title: '广告创意组',
        dataIndex: 'creative_group_name',
        width: 130,
      },
      {
        title: '广告创意',
        dataIndex: 'creative_name',
      },

      {
        title: '推广开始时间',
        dataIndex: 'start_time',
        width: 150,
        render: val => {
          if (val) {
            return <span>{formatDate(val, 'YYYY-MM-DD HH:mm:ss')}</span>;
          } else {
            return <span>-</span>;
          }
        },
      },
      {
        title: '推广结束时间',
        dataIndex: 'end_time',
        width: 150,
        render: val => {
          if (val) {
            return <span>{formatDate(val, 'YYYY-MM-DD HH:mm:ss')}</span>;
          } else {
            return <span>-</span>;
          }
        },
      },
      {
        title: '最大曝光次数上限',
        dataIndex: 'max_cpm',
      },
      {
        title: '最大点击次数上限',
        dataIndex: 'max_cpc',
      },
      {
        title: '曝光次数',
        dataIndex: 'cpm',
      },
      {
        title: '点击次数',
        dataIndex: 'cpc',
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 80,
        render: (val, item) => {
          switch (val) {
            case 1:
              return '暂存';
            case 2:
              return '待审核';
            case 3:
              return '审核通过';
            case 4:
              return (
                <div>
                  驳回
                  <Tooltip title={`驳回原因：${item.audit_reason}`}>
                    <Icon type="info-circle" style={{ color: 'red', paddingLeft: 10 }} />
                  </Tooltip>
                </div>
              );
            default:
              return '--';
          }
        },
      },
      {
        title: '发布状态',
        dataIndex: 'publish_status',
        render: val => {
          switch (val) {
            case 1:
              return '未发布';
            case 2:
              return '已发布';
            case 3:
              return '取消发布';
            default:
              return '--';
          }
        },
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

    const resultJsx = (
      <div>
        <PageHeaderLayout title="广告推广审核管理">
          <Card bordered={false} style={{ marginTop: '16px' }}>
            <div className={styles.tableList}>
              <Form>
                <Row>
                  <Col span={6}>
                    <FormItem {...formItemLayout} label="广告位">
                      {getFieldDecorator('advertisingID', {})(<AdvertiserPositionSelect />)}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem {...formItemLayout} label="广告主">
                      {getFieldDecorator('advertiserID', {})(<AdvertiserSelect />)}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem {...formItemLayout} label="广告创意组">
                      {getFieldDecorator('creativeGroupID', {})(
                        <AdvertisCreateGroupSelect parentID={getFieldValue('advertiser_id')} />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <FormItem {...formItemLayout} label="广告创意">
                      {getFieldDecorator('creativeID', {})(
                        <AdvertiserCreateSelect parentID={getFieldValue('creative_group_id')} />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem {...formItemLayout} label="推广名称">
                      {getFieldDecorator('name', {})(<Input placeholder="请输入" />)}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem {...formItemLayout} label="状态">
                      {getFieldDecorator('status', {})(
                        <Select style={{ width: '100%' }} defaultValue={1}>
                          <Select.Option value={1}>暂存</Select.Option>
                          <Select.Option value={2}>待审核</Select.Option>
                          <Select.Option value={3}>审核通过</Select.Option>
                          <Select.Option value={4}>审核驳回</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>

                  {/* <Col span={6}>
                    <FormItem {...formItemLayout} label="发布状态">
                      {getFieldDecorator('publishStatus', {})(
                        <Select style={{ width: '100%' }} defaultValue={1}>
                          <Select.Option value={1}>未发布</Select.Option>
                          <Select.Option value={2}>已发布</Select.Option>
                          <Select.Option value={2}>取消发布</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col> */}
                  <Col span={5} style={{ marginLeft: 20, paddingTop: 3 }}>
                    <Button type="primary" onClick={this.onBtnSearchClick}>
                      查询
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.onBtnClearClick}>
                      重置
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
            <div className={styles.tableListOperator} style={{ marginBottom: '16px' }}>
              {/* <PButton
                icon="plus"
                type="primary"
                code="add"
                onClick={() => this.onAddClick()}
                style={{ marginRight: '8px' }}
              >
                新增广告投放
              </PButton> */}
              {selectedRows.length === 1 && [
                <PButton
                  key="query"
                  code="query"
                  icon="eye-visible"
                  onClick={() => this.onItemDetailClick(selectedRows[0])}
                  style={{ marginRight: '8px' }}
                >
                  查看
                </PButton>,
                selectedRows[0].status === 2 && (
                  <PButton
                    key="pass"
                    code="pass"
                    type="primary"
                    onClick={() => this.onItemPassClick(selectedRows[0])}
                    style={{ marginRight: '8px' }}
                  >
                    审核通过
                  </PButton>
                ),
                selectedRows[0].status === 2 && (
                  <PButton
                    key="refuse"
                    code="refuse"
                    type="danger"
                    onClick={() => this.onItemRefuseClick(selectedRows[0])}
                    style={{ marginRight: '8px' }}
                  >
                    审核驳回
                  </PButton>
                ),
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
                scroll={{ x: 1500 }}
                onChange={this.onTableChange}
                pagination={paginationProps}
              />
            </div>
          </Card>
        </PageHeaderLayout>
        {this.renderDataForm()}
      </div>
    );
    return resultJsx;
  }
}
