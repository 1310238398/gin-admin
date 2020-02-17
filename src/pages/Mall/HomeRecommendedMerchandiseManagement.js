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
  Select,
  Tag,
  TreeSelect,
  Dropdown,
  Menu,
  Table,
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { isNullOrUndefined } from 'util';
import { isObjectNullOrUndefinedOrEmpty } from '../../utils/utils';
import CommoditySelection from './CommoditySelection/CommoditySelection';
import CommodityDetails from './CommodityDetails/CommodityDetails';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './CommodityManagement.less';
@connect(state => ({
  recommendedMerchandise: state.recommendedMerchandise,
}))
@Form.create()
export default class HomeRecommendedMerchandiseManagement extends PureComponent {
  state = {
    // RecommendedMerchandiseInfoFrame: {
    //   visible: false,
    //   data: null,
    // },
    // mode ：有值就是有范围，没有值就是没有范围的添加
    // AddRecommendedMerchandiseFrame: {
    //   visible: false,
    //   data: null,
    //   //  mode: null
    // },
    area: 'JGT01',
    // recommendedMerchandise: {
    //   seeVisible: false,
    //   data: null,
    // },
  };

  queryForm = null;

  pagination = {};

  componentDidMount() {
    this.props.dispatch({
      type: 'recommendedMerchandise/queryRecommendedstatue',
    });
    this.props.dispatch({ type: 'recommendedMerchandise/queryCommClass' });
    this.onBtnSearchClick();
  }

  onBtnSearchClick = () => {
    this.pagination = {
      current: 1,
      pageSize: 10,
    };
    this.queryForm = this.props.form.getFieldsValue();

    this.props.form.validateFieldsAndScroll(err => {
      if (!err) {
        if (!isObjectNullOrUndefinedOrEmpty(this.queryForm)) {
          if (!isNullOrUndefined(this.queryForm.from)) {
            this.queryForm.from = parseInt(this.queryForm.from / 1000, 10);
          }
          if (!isNullOrUndefined(this.queryForm.to)) {
            this.queryForm.to = parseInt(this.queryForm.to / 1000, 10);
          }
        }
      }
    });
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

  // 添加
  onNewRecommendedmerchandise = () => {
    this.props.dispatch({
      type: 'recommendedMerchandise/AddRecommendedMerchandiseFrame',
      payload: true,
    });
  };

  // 关闭添加
  closeSubFrameRecommende = () => {
    // 关闭窗口
    this.props.dispatch({
      type: 'recommendedMerchandise/AddRecommendedMerchandiseFrame',
      payload: false,
    });
  };

  /**
   * 打开店铺信息查看界面
   * @param {店铺信息记录} rec
   */
  showrecommendedInfoFrame = rec => {
    this.props.dispatch({
      type: 'recommendedMerchandise/seeGoodsInfo',
      payload: {
        visible: true,
        data: rec,
      },
    });
  };

  /**
   * 子窗口关闭回调
   */
  closeSubFrame = () => {
    // 关闭窗口
    this.props.dispatch({
      type: 'recommendedMerchandise/seeGoodsInfo',
      payload: {
        visible: false,
        data: null,
      },
    });
  };

  // 上移
  Moveup = rec => {
    Modal.confirm({
      title: '操作确认',
      content: '确认要上移此商品？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: this.MoveupOff.bind(this, rec),
    });
  };

  MoveupOff = rec => {
    const zcode = this.queryForm.gender;
    this.props.dispatch({
      type: 'recommendedMerchandise/MoveupOff',
      goodsid: rec.goods_id,
      zcode,
    });

    // 关闭窗口
    this.closeSubFrame();
  };

  // 下移
  Movedown = rec => {
    Modal.confirm({
      title: '操作确认',
      content: '确认要下移此商品？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: this.MovedownOff.bind(this, rec),
    });
  };

  MovedownOff = rec => {
    const zcode = this.queryForm.gender;
    this.props.dispatch({
      type: 'recommendedMerchandise/MovedownOff',
      goodsid: rec.goods_id,
      zcode,
    });

    // 关闭窗口
    this.closeSubFrame();
  };

  // 删除
  dele = rec => {
    Modal.confirm({
      title: '操作确认',
      content: '确认要删除此商品？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: this.deleOff.bind(this, rec),
    });
  };

  deleOff = rec => {
    const zcode = this.queryForm.gender;
    this.props.dispatch({
      type: 'recommendedMerchandise/deleOff',
      goodsid: rec.goods_id,
      zcode,
    });

    // 关闭窗口
    this.closeSubFrame();
  };

  handleChange = e => {
    this.setState({ area: e });
  };
  // onCommodityChange = value => {
  //   if (!value) return;
  //   // this.props.dispatch({
  //   //   type: 'infoManage/fetchFormExtra',
  //   //   columnId: value,
  //   // });
  // };

  // 隐藏
  Hiderecommended = rec => {
    Modal.confirm({
      title: '操作确认',
      content: '确认要隐藏此商品？',
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
    const zcode = this.queryForm.gender;
    this.props.dispatch({
      type: 'recommendedMerchandise/hideOff',
      goodsid: rec.goods_id,
      zcode,
    });

    // 关闭窗口
    this.closeSubFrame();
  };

  // 显示
  Showrecommended = rec => {
    Modal.confirm({
      title: '操作确认',
      content: '确认要显示此商品？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: this.Showrecommendedoff.bind(this, rec),
    });
  };

  Showrecommendedoff = rec => {
    const zcode = this.queryForm.gender;
    this.props.dispatch({
      type: 'recommendedMerchandise/showOff',
      goodsid: rec.goods_id,
      zcode,
    });

    // 关闭窗口
    this.closeSubFrame();
  };

  // 选择商品之后传值掉后台
  SelectcommCallback = data => {
    const zcode = this.state.area;
    this.props.dispatch({
      type: 'recommendedMerchandise/Selectcomm',
      data,
      zcode,
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
      type: 'recommendedMerchandise/queryShopStatueTotalInfo',
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
    const { Option } = Select;
    const {
      recommendedMerchandise: {
        tableData: { list, pagination },
        recommendedStatueList,
        dataSoure,
        CommClasslist,
        loading,
        seeVisible,
      },
    } = this.props;

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
                <Menu.Item onClick={() => this.showrecommendedInfoFrame(record)}>查看</Menu.Item>
                {record.index > 1 ? (
                  <Menu.Item onClick={() => this.Moveup(record)}>上移</Menu.Item>
                ) : null}
                {record.index < this.props.recommendedMerchandise.tableData.pagination.total ? (
                  <Menu.Item onClick={() => this.Movedown(record)}>下移</Menu.Item>
                ) : null}
                {record.show === true ? (
                  <Menu.Item onClick={() => this.Hiderecommended(record)}>隐藏</Menu.Item>
                ) : null}
                {record.show === false ? (
                  <Menu.Item onClick={() => this.Showrecommended(record)}>显示</Menu.Item>
                ) : null}
                <Menu.Item onClick={() => this.dele(record)}>删除</Menu.Item>
              </Menu>
            }
          >
            <Button>操作</Button>
          </Dropdown>
        ),
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        width: 400,
        // width: colWidthNormal,
        key: 'name',
        render: value => {
          return (
            <div title={value} className={styles.des}>
              {value}
            </div>
          );
        },
      },
      {
        title: '商品分类',
        dataIndex: 'category_name',
        // width: colWidthNormal,
        key: 'category_name',
      },
      {
        title: '所属店铺',
        dataIndex: 'store_name',
        // width: 140,
        key: 'store_name',
      },

      {
        title: '状态',
        dataIndex: 'show',
        width: 100,
        key: 'show',
        render: gender => {
          switch (gender) {
            case true:
              return <Tag color="blue">正常</Tag>;
            case false:
              return <Tag color="green">隐藏</Tag>;
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
        <PageHeaderLayout title="首页推荐商品管理">
          <Card bordered={false} style={{ marginTop: '16px' }}>
            <Form>
              <Row>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="所属区域">
                    {getFieldDecorator('gender', {
                      initialValue: 'JGT01',
                      rules: [
                        {
                          required: true,
                          message: '请选择',
                        },
                      ],
                    })(
                      <Select onChange={this.handleChange}>
                        <Option value="JGT01">商城首页</Option>
                        <Option value="JGT02">云通发现页</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="商品名称">
                    {getFieldDecorator('name', {})(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayout} label="商品分类">
                    {getFieldDecorator('category_id', {})(
                      <TreeSelect
                        style={{ width: '100%' }}
                        treeData={CommClasslist}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="请选择"
                        treeDefaultExpandAll
                        allowClear
                        // onChange={this.onCommodityChange}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="所属商铺">
                    {getFieldDecorator('store_name', {})(<Input placeholder="请输入" />)}
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
                    重置
                  </Button>
                </Col>
              </Row>
            </Form>
            <div>
              <Button icon="plus" type="primary" onClick={() => this.onNewRecommendedmerchandise()}>
                添加
              </Button>
            </div>
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
        {seeVisible && (
          <CommodityDetails
            data={dataSoure}
            visible={seeVisible}
            onShopInfoFrameCloseCallback={this.closeSubFrame}
          />
        )}
        {this.props.recommendedMerchandise.formVisible && (
          <CommoditySelection
            onAddInfoFrameCloseCallback={this.closeSubFrameRecommende}
            arear={this.state.area}
            onSelectcommCallback={this.SelectcommCallback}
          />
        )}
      </div>
    );
    return resultJsx;
  }
}
