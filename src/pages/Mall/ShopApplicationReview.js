import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Menu,
  Select,
  Icon,
  DatePicker,
  Tag,
  Dropdown,
  Table,
} from 'antd';
// import TableList from '../../components/TableList';
import FormItem from 'antd/lib/form/FormItem';
import { isNullOrUndefined } from 'util';
import moment from 'moment';
import { formatTimestamp, isObjectNullOrUndefinedOrEmpty } from '../../utils/utils';
import ShopApplicationReviewInfo from './ShopApplicationReviewInfo/ShopApplicationReviewInfo';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './CommodityManagement.less';
@connect(state => ({
  shopApplicationReview: state.shopApplicationReview,
}))
@Form.create()
export default class ShopApplicationReview extends PureComponent {
  state = {
    queryFormDisplay: false,
    shopInfoFrame: {
      visible: false,
      data: null,
      noPass: null,
    },
  };

  queryForm = null;

  pagination = null;

  componentDidMount() {
    this.props.dispatch({ type: 'shopApplicationReview/queryShopstatue' });
    // this.props.dispatch({type:'shopApplicationReview/queryShopStatueTotalInfo'});
    this.onBtnSearchClick();
  }

  onBtnSearchClick = () => {
    this.pagination = {
      current: 1,
      pageSize: 10,
    };
    this.queryForm = this.props.form.getFieldsValue();

    // 修改时间精度到秒
    if (!isObjectNullOrUndefinedOrEmpty(this.queryForm)) {
      if (!isNullOrUndefined(this.queryForm.from)) {
        this.queryForm.from = parseInt(this.queryForm.from / 1000, 10);
      }
      if (!isNullOrUndefined(this.queryForm.to)) {
        this.queryForm.to = parseInt(this.queryForm.to / 1000, 10);
      }
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
   * 打开店铺信息查看界面
   * @param {店铺信息记录} rec
   */
  showShopStatueInfoFrame = rec => {
    this.setState({
      shopInfoFrame: {
        visible: true,
        data: rec,
        noPass: 0,
      },
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
      type: 'shopApplicationReview/passOff',
      register: rec.register_id,
    });

    // 关闭窗口
    this.closeSubFrame();

    // // 重新加载表格数据
    // this.queryListData(this.queryForm, this.pagination);
  };

  // 驳回-》后台传值
  onUnAuthCallback = rec => {
    this.props.dispatch({
      type: 'shopApplicationReview/UnAuth',
      reason: rec,
    });

    // 关闭窗口
    this.closeSubFrame();

    // // 重新加载表格数据
    // this.queryListData(this.queryForm, this.pagination);
  };

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

  /**
   * 查询数据
   * @param {*} pagination
   */
  queryListData(params, pagination) {
    this.props.dispatch({
      type: 'shopApplicationReview/queryShopStatueTotalInfo',
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
    const { queryFormDisplay } = this.state;
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
      shopApplicationReview: {
        tableData: { list, pagination },
        shopStatueList,
        loading,
      },
    } = this.props;
    // 日期控件样式
    const dateFormat = 'YYYY/MM/DD';
    // 查询区域显示style
    const queryFormDisplayStyly = {
      display: queryFormDisplay ? 'block' : 'none',
    };
    const queryFormDisplayButtonJsx = queryFormDisplay ? (
      <span>
        收起 <Icon type="up" />
      </span>
    ) : (
      <span>
        展开 <Icon type="down" />
      </span>
    );
    // 列定义
    const colWidthShort = 100;
    const colWidthNormal = 120;
    const columns = [
      {
        title: '操作',
        key: 'operation',
        fixed: 'left',
        width: colWidthShort,
        render: record => (
          <Dropdown
            placement="bottomCenter"
            overlay={
              <Menu>
                <Menu.Item onClick={() => this.showShopStatueInfoFrame(record)}>查看</Menu.Item>
                {record.application_status === 1 ? (
                  <Menu.Item onClick={() => this.onWriteOffCallback(record)}>审核</Menu.Item>
                ) : null}
              </Menu>
            }
          >
            <Button>操作</Button>
          </Dropdown>
        ),
      },
      {
        title: '店铺LOGO',
        dataIndex: 'portrait',
        key: 'portrait',
        render: value => {
          return <img src={value} alt="" style={{ width: 60, height: 60 }} />;
        },
      },
      {
        title: '店铺名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '申请人姓名',
        dataIndex: 'applicant_name',
        width: colWidthNormal,
        key: 'applicant_name',
      },
      {
        title: '申请人电话',
        dataIndex: 'applicant_tel',
        key: 'applicant_tel',
      },
      {
        title: '经营单位名称',
        dataIndex: 'corporation',
        width: 400,
        key: 'corporation',
        render: value => {
          return (
            <div title={value} className={styles.des}>
              {value}
            </div>
          );
        },
      },
      {
        title: '法定代表人',
        dataIndex: 'legal_persion',
        key: 'legal_persion',
        width: colWidthNormal,
      },
      {
        title: '经营范围',
        dataIndex: 'business_scope',
        width: colWidthNormal,
        key: 'business_scope',
        render: value => {
          return (
            <div title={value} className={styles.address}>
              {value}
            </div>
          );
        },
      },
      {
        title: '经营地址',
        dataIndex: 'business_address',
        width: colWidthNormal,
        key: 'business_address',
        render: value => {
          return (
            <div title={value} className={styles.address}>
              {value}
            </div>
          );
        },
      },
      {
        title: '店铺电话',
        dataIndex: 'store_tel',
        width: colWidthShort,
        key: 'store_tel',
      },
      {
        title: '申请时间',
        dataIndex: 'created',
        key: 'created',
        render: text => {
          if (text) {
            return formatTimestamp(text);
          } else {
            return '';
          }
        },
      },
      {
        title: '申请状态',
        dataIndex: 'application_status',
        width: 100,
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
        title: '通过/驳回时间',
        dataIndex: 'updated',
        width: 200,
        key: 'updated',
        render: text => {
          if (text && text !== 0) {
            return formatTimestamp(text);
          } else {
            return '';
          }
        },
      },
      {
        title: '驳回原因',
        dataIndex: 'remark',
        width: 200,
        key: 'remark',
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
        <PageHeaderLayout title="店铺申请审核">
          <Card bordered={false} style={{ marginTop: '16px' }}>
            <Form>
              <Row>
                <Col span={7}>
                  <FormItem {...formItemLayout} label="店铺名称">
                    {getFieldDecorator('name', {})(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col span={7}>
                  <FormItem {...formItemLayout} label="申请人姓名">
                    {getFieldDecorator('applicant_name', {})(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col span={7}>
                  <FormItem {...formItemLayout} label="申请人电话">
                    {getFieldDecorator('applicant_tel', {})(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={7}>
                  <FormItem {...formItemLayout} label="经营单位名称">
                    {getFieldDecorator('corporation', {})(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col span={7}>
                  <FormItem {...formItemLayout} label="法定代表人">
                    {getFieldDecorator('legal_persion', {
                      //   initialValue: 0,
                    })(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col span={7}>
                  <FormItem {...formItemLayout} label="店铺电话">
                    {getFieldDecorator('store_tel', {
                      //   initialValue: 0,
                    })(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{ ...queryFormDisplayStyly }}>
                <Col span={7}>
                  <FormItem {...formItemLayout} label="申请状态">
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
                <Col span={7}>
                  <FormItem {...formItemLayout} label="申请日期From">
                    {getFieldDecorator('from', {})(
                      <DatePicker
                        format={dateFormat}
                        style={{ width: '100%' }}
                        showTime={{
                          defaultValue: moment('00:00:00', 'HH:mm:ss'),
                        }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={7}>
                  <FormItem {...formItemLayout} label="申请日期To">
                    {getFieldDecorator('to', {})(
                      <DatePicker
                        format={dateFormat}
                        style={{ width: '100%' }}
                        showTime={{
                          defaultValue: moment('23:59:59', 'HH:mm:ss'),
                        }}
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
                  <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.onQueryFormToggleClick}>
                    {queryFormDisplayButtonJsx}
                  </a>
                </Col>
              </Row>
            </Form>
          </Card>
          <Card bordered={false}>
            <Table
              loading={loading}
              dataSource={list}
              columns={columns}
              scroll={{ x: 2500 }}
              onChange={this.onTableChange}
              pagination={paginationProps}
            />
          </Card>
        </PageHeaderLayout>
        {this.state.shopInfoFrame.visible && (
          <ShopApplicationReviewInfo
            data={this.state.shopInfoFrame.data}
            noPass={this.state.shopInfoFrame.noPass}
            onShopInfoFrameCloseCallback={this.closeSubFrame}
            onPassOffCallback={this.onPassOffCallback}
            onBtnUnAuthClick={this.onUnAuthCallback}
          />
        )}
      </div>
    );
    return resultJsx;
  }
}
