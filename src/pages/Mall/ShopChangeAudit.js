import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Modal,
  Menu,
  Select,
  DatePicker,
  Tag,
  Dropdown,
  Table,
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ShopChangeAuditInfo from './ShopChangeAuditInfo/ShopChangeAuditInfo';
import ShopApplicationRejected from './ShopApplicationReviewInfo/ShopApplicationRejected';
import { formatTimestamp } from '../../utils/utils';
import styles from './CommodityManagement.less';

const { RangePicker } = DatePicker;
@connect(state => ({
  shopChangeaudit: state.shopChangeaudit,
}))
@Form.create()
export default class ShopChangeAudit extends PureComponent {
  state = {
    from: null,
    to: null,
    queryFormDisplay: false,
    shopInfoFrame: {
      visible: false,
      data: null,
    },
    noPassshopInfoFrame: {
      visible: false,
      data: null,
    },
  };

  queryForm = null;

  pagination = {};

  componentDidMount() {
    this.props.dispatch({ type: 'shopChangeaudit/queryShopstatue' });
    // this.props.dispatch({type:'storeManage/queryShopStatueTotalInfo'});
    this.onBtnSearchClick();
  }

  onBtnSearchClick = () => {
    this.pagination = {
      current: 1,
      pageSize: 10,
    };
    this.queryForm = this.props.form.getFieldsValue();
    if (this.queryForm.name) {
      this.queryForm.name = this.queryForm.name.replace(/(^\s*)|(\s*$)/g, '');
    }
    if (this.queryForm.fromto) {
      this.state.from = this.queryForm.fromto[0].unix();
      this.state.to = this.queryForm.fromto[1].unix();
      this.queryForm.from = this.state.from;
      this.queryForm.to = this.state.to;
    } else {
      this.queryForm.from = this.state.from;
      this.queryForm.to = this.state.to;
    }
    delete this.queryForm.fromto;
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

  // 审核
  onWriteOffCallback = rec => {
    this.setState({
      shopInfoFrame: {
        visible: true,
        data: rec,
        noPass: 1,
      },
    });
  };

  // 通过->传值后台
  onPassOffCallback = rec => {
    this.props.dispatch({
      // type: 'personalManage/writeOff',
      recordId: rec.record_id,
    });

    // 关闭窗口
    this.closeSubFrame();

    // // 重新加载表格数据
    // this.queryListData(this.queryForm, this.pagination);
  };

  // 驳回
  onrefuseCallback(data) {
    this.setState({
      noPassshopInfoFrame: {
        visible: true,
        data,
      },
    });
  }
  // // 驳回-》后台传值
  // onUnAuthCallback  = rec => {
  //   console.log(rec);
  //
  //   this.props.dispatch({
  //     // type: 'personalManage/writeOff',
  //     res: rec,
  //   });

  //   // 关闭窗口
  //   this.closeSubFrame();

  //   // 重新加载表格数据
  //   this.queryListData(this.queryForm, this.pagination);
  // };

  /**
   * 子窗口关闭回调
   */
  closeSubFrame = () => {
    // 关闭窗口
    this.setState({
      shopInfoFrame: {
        visible: false,
        data: null,
      },
    });
  };

  // 驳回弹窗关闭
  closenoPasssSubFrame = () => {
    // 关闭窗口
    this.setState({
      noPassshopInfoFrame: {
        visible: false,
        data: null,
      },
    });
  };

  /**
   * 拒绝
   */
  onBtnReasonClick = rec => {
    // Modal.confirm({
    //   title: '操作确认',
    //   content: '确认要拒绝此商铺？',
    //   okType: 'danger',
    //   okText: '确定',
    //   cancelText: '取消',
    //   onOk: this.refuseOff.bind(this, rec),
    // });
    this.props.dispatch({
      type: 'shopChangeaudit/UnAuth',
      reason: rec,
    });

    // 关闭窗口
    this.closeSubFrame();

    // // 重新加载表格数据
    // this.queryListData(this.queryForm, this.pagination);
  };

  /**
   * 通过
   */
  onpassCallback = rec => {
    Modal.confirm({
      title: '操作确认',
      content: '确认要通过此商铺？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: this.passOff.bind(this, rec),
    });
  };

  /**
   * 通过后台传值
   */
  passOff = rec => {
    this.props.dispatch({
      type: 'shopChangeaudit/passOff',
      register: rec.register_id,
    });

    // 关闭窗口
    this.closeSubFrame();

    // // 重新加载表格数据
    // this.queryListData(this.queryForm, this.pagination);
  };

  showStoreStatueInfoFrame = rec => {
    this.setState({
      shopInfoFrame: {
        visible: true,
        data: rec,
      },
    });
  };

  /**
   * 查询数据
   * @param {*} pagination
   */
  queryListData(params, pagination) {
    this.props.dispatch({
      type: 'shopChangeaudit/queryShopStatueTotalInfo',
      params,
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
      shopChangeaudit: {
        tableData: { list, pagination },
        shopStatueList,
        loading,
      },
    } = this.props;
    // 日期控件样式
    const dateFormat = 'YYYY/MM/DD';

    // 列定义
    const colWidthShort = 100;
    const columns = [
      {
        title: '操作',
        key: 'operation',
        fixed: 'left',
        width: colWidthShort,
        render: (text, record) => (
          <Dropdown
            placement="bottomCenter"
            overlay={
              <Menu>
                <Menu.Item onClick={() => this.showStoreStatueInfoFrame(record)}>查看</Menu.Item>
                {record.application_status === 1 ? (
                  <Menu.Item onClick={() => this.onpassCallback(record)}>通过</Menu.Item>
                ) : null}
                {record.application_status === 1 ? (
                  <Menu.Item onClick={() => this.onrefuseCallback(record)}>拒绝</Menu.Item>
                ) : null}
              </Menu>
            }
          >
            <Button>操作</Button>
          </Dropdown>
        ),
      },
      {
        title: '店铺名称（修改前）',
        dataIndex: 'old_name',
        // width: 150,
        key: 'old_name',
        width: 400,
        render: value => {
          return (
            <div title={value} className={styles.des}>
              {value}
            </div>
          );
        },
      },
      {
        title: '店铺名称（修改后）',
        dataIndex: 'name',
        // width: 150,
        key: 'name',
        width: 400,
        render: value => {
          return (
            <div title={value} className={styles.des}>
              {value}
            </div>
          );
        },
      },
      // {
      //   title: '会员优惠（修改前）',
      //   dataIndex: 'tel',
      //   width: colWidthNormal,
      //   key: 'tel',
      // },
      // {
      //   title: '会员优惠（修改后）',
      //   dataIndex: 'gender',
      //   width: colWidthNormal,
      //   key: 'gender',
      // },
      {
        title: '申请时间',
        dataIndex: 'created',
        key: 'created',
        // width: 150,
        render: text => {
          if (text) {
            return formatTimestamp(text);
          } else {
            return '';
          }
        },
      },

      {
        title: '审核状态',
        dataIndex: 'application_status',
        // width: 60,
        key: 'application_status',
        render: gender => {
          // <Option value={1}>正常</Option>
          // <Option value={2}>注销</Option>
          switch (gender) {
            case 1:
              return <Tag color="blue">申请中</Tag>;
            case 2:
              return <Tag color="green">通过</Tag>;
            case 3:
              return <Tag color="red">驳回</Tag>;
            default:
              return null;
          }
        },
      },
      {
        title: '通过/拒绝时间',
        dataIndex: 'updated',
        key: 'updated',
        // width: 150,
        render: text => {
          if (text) {
            return formatTimestamp(text);
          } else {
            return '';
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
        <PageHeaderLayout title="店铺变更审核">
          <Card bordered={false} style={{ marginTop: '16px' }}>
            <Form>
              <Row>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="店铺名称">
                    {getFieldDecorator('name', {})(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="店铺状态">
                    {getFieldDecorator('application_status', {})(
                      <Select placeholder="请选择">
                        {shopStatueList.map(item => {
                          return (
                            <Select.Option key={item.code} value={item.code}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    )}
                  </FormItem>
                </Col>

                <Col span={6}>
                  <FormItem {...formItemLayout} label="申请时间">
                    {getFieldDecorator('fromto', {})(
                      <RangePicker
                        showTime={{
                          defaultValue: moment('00:00:00'),
                        }}
                        placeholder={['开始时间', '结束时间']}
                        format={dateFormat}
                        // onChange={this.timeonChange}
                        // onOk={this.timeonOk}
                      />
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
                    清空
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
          <Card bordered={false}>
            <Table
              loading={loading}
              dataSource={list}
              columns={columns}
              scroll={{ x: 1500 }}
              onChange={this.onTableChange}
              pagination={paginationProps}
            />
          </Card>
        </PageHeaderLayout>
        {this.state.shopInfoFrame.visible && (
          <ShopChangeAuditInfo
            data={this.state.shopInfoFrame.data}
            onShopInfoFrameCloseCallback={this.closeSubFrame}
            onHangupCallback={this.hangupOff}
          />
        )}
        {this.state.noPassshopInfoFrame.visible && (
          <ShopApplicationRejected
            data={this.state.noPassshopInfoFrame.data}
            onShopInfoFrameCloseCallback={this.closenoPasssSubFrame}
            //  onUnAuthCallback={this.onWriteOffCallback}
            onBtnUnReasonClick={this.onBtnReasonClick}
          />
        )}
      </div>
    );
    return resultJsx;
  }
}
