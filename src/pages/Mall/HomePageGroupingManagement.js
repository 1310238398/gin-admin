import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Modal, Select, Tag, Dropdown, Menu } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import TableList from '../../components/TableList';
import PageGroupingInfo from './PageGroupingInfo/PageGroupingInfo';
import ShowPageGroupInfo from './ShowPageGroupInfo/ShowPageGroupInfo';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(state => ({
  pageGroupingManagement: state.pageGroupingManagement,
}))
@Form.create()
export default class HomePageGroupingManagement extends PureComponent {
  state = {
    // queryFormDisplay: false,
    showPageGroupingInfoFrame: {
      visible: false,
      data: null,
    },

    // 1新增，编辑2
    pageGroupingInfoFrame: {
      visible: false,
      data: null,
      mode: null,
    },
  };

  // queryForm = null

  pagination = {};

  componentDidMount() {
    this.props.dispatch({
      type: 'pageGroupingManagement/queryRecommendedstatue',
    });

    this.onBtnSearchClick();
  }

  onBtnSearchClick = () => {
    // this.pagination = {
    //   current: 1,
    //   pageSize: 10,
    // }
    this.queryForm = this.props.form.getFieldsValue();

    if (this.queryForm.tag_name) {
      this.queryForm.tag_name = this.queryForm.tag_name.replace(/(^\s*)|(\s*$)/g, '');
    }
    this.queryListData(this.queryForm);
  };

  /**
   * 分页事件
   */
  // onTableChange = pagination => {
  //   const params = this.queryForm
  //   this.queryListData(params, pagination)
  // }

  /**
   * 清空按钮点击事件
   */
  onBtnClearClick = () => {
    this.props.form.resetFields();
  };

  /**
   * 打开店铺信息查看界面
   * @param {店铺信息记录} rec
   */
  showpageGroupingInfoFrame = rec => {
    this.setState({
      showPageGroupingInfoFrame: {
        visible: true,
        data: rec,
      },
    });
  };

  /**
   * 子窗口关闭回调--查看
   */
  closeshowSubFrame = () => {
    // 关闭窗口
    this.setState({
      showPageGroupingInfoFrame: {
        visible: false,
        data: null,
      },
    });
  };

  /**
   * 子窗口关闭回调
   */
  closeSubFrame = () => {
    // 关闭窗口
    this.setState({
      pageGroupingInfoFrame: {
        visible: false,
        data: null,
        mode: null,
      },
    });
  };

  // 上移
  Moveup = rec => {
    Modal.confirm({
      title: '操作确认',
      content: '确认要上移此分组？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: this.MoveupOff.bind(this, rec),
    });
  };

  MoveupOff = rec => {
    this.props.dispatch({
      type: 'pageGroupingManagement/moveupTagOff',
      goodstagid: rec.goods_tag_id,
    });

    // 关闭窗口
    this.closeSubFrame();
  };

  // 下移
  Movedown = rec => {
    Modal.confirm({
      title: '操作确认',
      content: '确认要下移此分组？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: this.MovedownOff.bind(this, rec),
    });
  };

  MovedownOff = rec => {
    this.props.dispatch({
      type: 'pageGroupingManagement/movedownOff',
      goodstagid: rec.goods_tag_id,
    });

    // 关闭窗口
    this.closeSubFrame();
  };

  // 隐藏
  Hiderecommended = rec => {
    Modal.confirm({
      title: '操作确认',
      content: '确认要隐藏此分组？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: this.Hideoff.bind(this, rec),
    });
  };

  /**
   * 通过后台传值
   */
  Hideoff = rec => {
    this.props.dispatch({
      type: 'pageGroupingManagement/hideTagOff',
      goodstagid: rec.goods_tag_id,
    });

    // 关闭窗口
    this.closeSubFrame();
  };

  // 显示
  Showrecommended = rec => {
    Modal.confirm({
      title: '操作确认',
      content: '确认要显示此分组？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: this.Showrecommendedoff.bind(this, rec),
    });
  };

  Showrecommendedoff = rec => {
    this.props.dispatch({
      type: 'pageGroupingManagement/showTagOff',
      goodstagid: rec.goods_tag_id,
    });

    // 关闭窗口
    this.closeSubFrame();
  };

  // 删除
  delepageGrouping = rec => {
    Modal.confirm({
      title: '操作确认',
      content: '确认要删除此分组？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: this.delepageGroupingoff.bind(this, rec),
    });
  };

  delepageGroupingoff = rec => {
    this.props.dispatch({
      type: 'pageGroupingManagement/deletagOff',
      goodstagid: rec.goods_tag_id,
    });

    // 关闭窗口
    this.closeSubFrame();
  };

  // 选择商品之后传值掉后台
  SelectcommCallback = data => {
    this.props.dispatch({
      type: 'pageGroupingManagement/writeOff',
      data,
    });

    // 关闭窗口
    this.closeSubFrame();
  };

  // 编辑
  editpageGroupingInfoFrame = rec => {
    this.setState({
      pageGroupingInfoFrame: {
        visible: true,
        data: rec,
        mode: 2,
      },
    });
  };

  onNewpageGrouping = () => {
    this.setState({
      pageGroupingInfoFrame: {
        visible: true,
        data: { goods_tag_id: '', image_path: '', show: '', tag_name: '', zcode: '' },
        mode: 1,
      },
    });
  };

  // 新建
  NewClassifiedEditors = () => {
    // 关闭窗口
    this.closeSubFrame();

    // 重新加载表格数据
    this.queryListData(this.queryForm, this.pagination);
  };

  // 编辑
  EditClassifiedEditors = () => {
    // 关闭窗口
    this.closeSubFrame();

    // 重新加载表格数据
    this.queryListData(this.queryForm, this.pagination);
  };

  /**
   * 查询数据
   * @param {*} pagination
   */
  queryListData(params) {
    this.props.dispatch({
      type: 'pageGroupingManagement/queryShopStatueTotalInfo',
      params,
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
      pageGroupingManagement: {
        tableData: { list },
        recommendedStatueList,
        loading,
      },
    } = this.props;
    // console.log(this.props);
    // 日期控件样式
    // const dateFormat = 'YYYY/MM/DD'

    // 列定义
    // const colWidthShort = 100;
    // const colWidthNormal = 120;
    const columns = [
      {
        title: '操作',
        key: 'operation',
        // fixed: 'left',
        // width: colWidthShort,
        render: record => (
          <Dropdown
            placement="bottomCenter"
            overlay={
              <Menu>
                <Menu.Item onClick={() => this.showpageGroupingInfoFrame(record)}>查看</Menu.Item>
                <Menu.Item onClick={() => this.editpageGroupingInfoFrame(record)}>编辑</Menu.Item>
                <Menu.Item onClick={() => this.delepageGrouping(record)}>删除</Menu.Item>
                {record.index > 1 ? (
                  <Menu.Item onClick={() => this.Moveup(record)}>上移</Menu.Item>
                ) : null}
                {record.index < list.length ? (
                  <Menu.Item onClick={() => this.Movedown(record)}>下移</Menu.Item>
                ) : null}
                {record.show ? (
                  <Menu.Item onClick={() => this.Hiderecommended(record)}>隐藏</Menu.Item>
                ) : null}
                {record.show === false ? (
                  <Menu.Item onClick={() => this.Showrecommended(record)}>显示</Menu.Item>
                ) : null}
              </Menu>
            }
          >
            <Button>操作</Button>
          </Dropdown>
        ),
      },
      // {
      //     title: '操作',
      //     key: '操作',
      //     width: 200,
      //     render: (text, record) => (
      //       <span>
      //         <a  onClick={() => this.showpageGroupingInfoFrame(record)}>查看</a>
      //         <Divider type="vertical" />
      //         <a onClick={() => this.editpageGroupingInfoFrame(record)}> 编辑</a>
      //         <Divider type="vertical" />
      //         <a  onClick={() => this.delepageGrouping(record)}> 删除</a>
      //         <Divider type="vertical" />
      //         {record.index>1?
      //         [<a onClick={() => this.Moveup(record)}> 上移</a>,
      //         <Divider type="vertical" />]:null}
      //         {record.index<tabledatalength?
      //         [<a onClick={() => this.Movedown(record)}> 下移</a>,
      //         <Divider type="vertical" />]:null}
      //         {record.show?
      //         [<a onClick={() => this.Hiderecommended(record)}> 隐藏</a>,
      //         <Divider type="vertical" />]:null}
      //         {record.show===false?
      //         <a onClick={() => this.Showrecommended(record)}> 显示</a>:null}

      //       </span>
      //     ),
      //   },
      {
        title: '分组名称',
        dataIndex: 'tag_name',
        // width: colWidthNormal,
        key: 'tag_name',
      },

      {
        title: '状态',
        dataIndex: 'show',
        // width: 50,
        key: 'show',
        render: gender => {
          // <Option value={1}>正常</Option>
          // <Option value={2}>注销</Option>
          switch (gender) {
            case true:
              return <Tag color="blue">显示</Tag>;
            case false:
              return <Tag color="green">隐藏</Tag>;
            default:
              return null;
          }
        },
      },
    ];
    // const paginationProps = {
    //   showSizeChanger: true,
    //   showQuickJumper: true,
    //   showTotal: total => {
    //     return (
    //       <span>
    //         共{total}
    //         条记录
    //       </span>
    //     )
    //   },
    //   ...pagination,
    // }

    const resultJsx = (
      <div>
        <PageHeaderLayout title="首页分组管理">
          <Card bordered={false}>
            <Form>
              <Row>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="分组名称">
                    {getFieldDecorator('tag_name', {})(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>

                <Col span={6}>
                  <FormItem {...formItemLayout} label="状态">
                    {getFieldDecorator('show', {})(
                      <Select placeholder="请选择">
                        {recommendedStatueList.map(item => {
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
                </Col>
              </Row>
            </Form>
          </Card>
          <Card bordered={false}>
            <TableList
              dataSource={list}
              title={() => {
                return (
                  <Button icon="plus" type="primary" onClick={() => this.onNewpageGrouping()}>
                    添加
                  </Button>
                );
              }}
              columns={columns}
              rowKey={record => record.goods_tag_id}
              loading={loading}
              //   scroll={{ x: 1700 }}
              // onChange={this.onTableChange}
              pagination={false}
            />
          </Card>
        </PageHeaderLayout>

        {this.state.pageGroupingInfoFrame.visible && (
          <PageGroupingInfo
            data={this.state.pageGroupingInfoFrame.data}
            mode={this.state.pageGroupingInfoFrame.mode}
            onPageGroupingInfoFrameCloseCallback={this.closeSubFrame}
            // ReleaseShieldCallback={this.ReleaseShield}
            // onSelectcommCallback={this.SelectcommCallback}
            onNewClassifiedEditors={this.NewClassifiedEditors}
            onEditClassifiedEditors={this.EditClassifiedEditors}
          />
        )}
        {this.state.showPageGroupingInfoFrame.visible && (
          <ShowPageGroupInfo
            data={this.state.showPageGroupingInfoFrame.data}
            onShowPageGroupingInfoFrameCloseCallback={this.closeshowSubFrame}
          />
        )}
      </div>
    );
    return resultJsx;
  }
}
