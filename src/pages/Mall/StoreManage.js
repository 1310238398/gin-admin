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
  Icon,
  DatePicker,
  Tag,
  Dropdown,
  Table,
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { isNullOrUndefined } from 'util';
import moment from 'moment';
// import TableList from '../../components/TableList';
import { formatTimestamp, isObjectNullOrUndefinedOrEmpty } from '../../utils/utils';
import StoreManageInfo from './StoreManageInfo/StoreManageInfo';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './CommodityManagement.less';

@connect(state => ({
  storeManage: state.storeManage,
}))
@Form.create()
export default class StoreManage extends PureComponent {
  state = {
    queryFormDisplay: false,
    shopInfoFrame: {
      visible: false,
      data: null,
    },
  };

  queryForm = null;

  pagination = {};

  componentDidMount() {
    this.props.dispatch({ type: 'storeManage/queryStorestatue' });
    // this.props.dispatch({type:'storeManage/queryShopStatueTotalInfo'});
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
      if (!isNullOrUndefined(this.queryForm.store_status)) {
        this.queryForm.store_status = parseInt(this.queryForm.store_status, 10);
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
  showStoreStatueInfoFrame = rec => {
    this.setState({
      shopInfoFrame: {
        visible: true,
        data: rec,
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
      // type: 'personalManage/writeOff',
      recordId: rec.record_id,
    });

    // 关闭窗口
    this.closeSubFrame();

    // // 重新加载表格数据
    // this.queryListData(this.queryForm, this.pagination);
  };

  // 驳回-》后台传值
  onUnAuthCallback = rec => {
    this.props.dispatch({
      // type: 'personalManage/writeOff',
      res: rec,
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
   * 删除
   */
  ondeleCallback = rec => {
    Modal.confirm({
      title: '操作确认',
      content: '确认要删除此商铺？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: this.deleOff.bind(this, rec),
    });
  };

  /**
   * 删除传值
   */
  deleOff = rec => {
    this.props.dispatch({
      type: 'storeManage/writeOff',
      recordId: rec.record_id,
    });

    // 关闭窗口
    this.closeSubFrame();
  };

  /**
   * 挂起
   */
  onhangupCallback = rec => {
    Modal.confirm({
      title: '操作确认',
      content: '确认要挂起此商铺？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: this.hangupOff.bind(this, rec),
    });
  };

  /**
   * 挂起后台传值
   */
  hangupOff = rec => {
    this.props.dispatch({
      type: 'storeManage/hangUp',
      recordId: rec.store_id,
    });

    // 关闭窗口
    this.closeSubFrame();
  };

  // 取消挂起
  oncancelCallback = rec => {
    Modal.confirm({
      title: '操作确认',
      content: '确认要取消挂起此商铺？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: this.cancelOff.bind(this, rec),
    });
  };

  // 后台传值
  cancelOff = rec => {
    this.props.dispatch({
      type: 'storeManage/cancle',
      recordId: rec.store_id,
    });

    // 关闭窗口
    this.closeSubFrame();
  };

  /**
   * 查询数据
   * @param {*} pagination
   */
  queryListData(params, pagination) {
    this.props.dispatch({
      type: 'storeManage/queryShopStatueTotalInfo',
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
      storeManage: {
        tableData: { list, pagination },
        storeStatueList,
        loading,
      },
    } = this.props;
    // console.log(this.props);
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
    // const colWidthShort = 100;
    const colWidthNormal = 120;
    const columns = [
      {
        title: '操作',
        key: 'operation',
        fixed: 'left',
        width: 100,
        render: (text, record) => (
          <Dropdown
            placement="bottomCenter"
            overlay={
              <Menu>
                <Menu.Item onClick={() => this.showStoreStatueInfoFrame(record)}>查看</Menu.Item>
                {record.store_status === 1 || record.store_status === 2 ? (
                  <Menu.Item onClick={() => this.onhangupCallback(record)}>挂起</Menu.Item>
                ) : null}

                {record.store_status === 3 ? (
                  <Menu.Item onClick={() => this.oncancelCallback(record)}>取消挂起</Menu.Item>
                ) : null}

                <Menu.Item onClick={() => this.ondeleCallback(record)}>删除</Menu.Item>
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
        render: value => {
          return <img src={value} alt="" style={{ width: 60, height: 60 }} />;
        },
      },
      {
        title: '店铺名称',
        dataIndex: 'name',
      },
      {
        title: '经营单位名称',
        dataIndex: 'corporation',
        // width: colWidthNormal,
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
        title: '法定代表人',
        dataIndex: 'legal_persion',
        // width: 140,
      },
      {
        title: '经营范围',
        dataIndex: 'business_scope',
        width: colWidthNormal,
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
        // width: colWidthNormal,
      },
      {
        title: '开店通过时间',
        dataIndex: 'passed',
        // width: 150,
        render: text => {
          if (text !== '' && text !== 0) {
            return formatTimestamp(text);
          } else {
            return '';
          }
        },
      },
      {
        title: '店铺状态',
        dataIndex: 'store_status',
        // width: 50,
        render: gender => {
          // <Option value={1}>正常</Option>
          // <Option value={2}>注销</Option>
          switch (gender) {
            case 1:
              return <Tag color="blue">正常</Tag>;
            case 2:
              return <Tag color="green">歇业</Tag>;
            case 3:
              return <Tag color="red">挂起</Tag>;
            default:
              return null;
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
        <PageHeaderLayout title="店铺管理">
          <Card bordered={false} style={{ marginTop: '16px' }}>
            <Form>
              <Row>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="店铺名称">
                    {getFieldDecorator('name', {})(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayout} label="经营单位名称">
                    {getFieldDecorator('corporation', {})(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="法定代表人">
                    {getFieldDecorator('legal_persion', {})(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="店铺电话">
                    {getFieldDecorator('tel', {
                      //   initialValue: 0,
                    })(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col span={8}>
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
                <Col span={6}>
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
              <Row style={{ ...queryFormDisplayStyly }}>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="店铺状态">
                    {getFieldDecorator('store_status', {})(
                      <Select placeholder="请选择">
                        {storeStatueList.map(item => {
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
              scroll={{ x: 1800 }}
              onChange={this.onTableChange}
              pagination={paginationProps}
            />
          </Card>
        </PageHeaderLayout>
        {this.state.shopInfoFrame.visible && (
          <StoreManageInfo
            data={this.state.shopInfoFrame.data}
            onShopInfoFrameCloseCallback={this.closeSubFrame}
            onHangupCallback={this.hangupOff}
            oncancelCallback={this.cancelOff}
          />
        )}
      </div>
    );
    return resultJsx;
  }
}
