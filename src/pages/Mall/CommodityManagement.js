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
  Tag,
  Dropdown,
  TreeSelect,
  Table,
} from 'antd';
// import TableList from '../../components/TableList';
import FormItem from 'antd/lib/form/FormItem';
import CommodityDetails from './CommodityDetails/CommodityDetails';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { DicSelect, DicShow } from '@/components/Dictionary';
import styles from './CommodityManagement.less';

@connect(state => ({
  commodityManagement: state.commodityManagement,
}))
@Form.create()
export default class CommodityManagement extends PureComponent {
  state = {
    // CommodityInfoFrame: {
    //   visible: false,
    //   data: null,
    // },
  };

  queryForm = null;

  pagination = {};

  componentDidMount() {
    this.props.dispatch({ type: 'commodityManagement/queryCommClass' });

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
    this.onBtnSearchClick();
  };

  /**
   * 打开店铺信息查看界面
   * @param {店铺信息记录} rec
   */
  showCommodityInfoFrame = rec => {
    // this.setState({
    //   CommodityInfoFrame: {
    //     visible: true,
    //     data: rec,
    //   },
    // });
    this.props.dispatch({
      type: 'commodityManagement/seeGoodsInfo',
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
      type: 'commodityManagement/seeGoodsInfo',
      payload: {
        visible: false,
        data: null,
      },
    });
  };

  // 禁售
  Liftaban = rec => {
    Modal.confirm({
      title: '操作确认',
      content: '确认要禁售此商品？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: this.Liftabanoff.bind(this, rec),
    });
  };

  /**
   * 通过后台传值
   */
  Liftabanoff = rec => {
    this.props.dispatch({
      type: 'commodityManagement/LiftabanOff',
      goodsid: rec.goods_id,
    });

    // 关闭窗口
    this.closeSubFrame();

    // // 重新加载表格数据
    // this.queryListData(this.queryForm, this.pagination);
  };

  // 解禁
  forbidThesale = rec => {
    Modal.confirm({
      title: '操作确认',
      content: '确认要解禁此商品？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: this.forbidThesaleoff.bind(this, rec),
    });
  };

  forbidThesaleoff = rec => {
    this.props.dispatch({
      type: 'commodityManagement/ForbideOff',
      goodsid: rec.goods_id,
    });

    // 关闭窗口
    this.closeSubFrame();
  };

  queryListData(params, pagination) {
    this.props.dispatch({
      type: 'commodityManagement/queryShopStatueTotalInfo',
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
      commodityManagement: {
        tableData: { list, pagination },
        // commodityStatueList,
        CommClasslist,
        loading,
        seeVisible,
        dataSoure,
      },
    } = this.props;

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
                <Menu.Item onClick={() => this.showCommodityInfoFrame(record)}>查看</Menu.Item>
                {record.goods_status === 3 ? (
                  <Menu.Item onClick={() => this.forbidThesale(record)}>解禁</Menu.Item>
                ) : null}

                {record.goods_status === 1 || record.goods_status === 2 ? (
                  <Menu.Item onClick={() => this.Liftaban(record)}>禁售</Menu.Item>
                ) : null}
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
        width: 600,
        render: (val, record) => {
          const image = record.images && record.images.length > 0 ? record.images[0] : '';
          const price = record.price !== 0 ? record.price / 100 : 0;
          return (
            <div className={styles.goodsName}>
              <div className={styles.goodsNameLeft}>
                <img src={image} alt="" />
              </div>
              <div className={styles.goodsNameRight}>
                <div className={styles.goodsNameRightTitle} title={record.name}>
                  {record.name}
                </div>
                <div className={styles.goodsNameRightPrice}>￥{price}</div>
              </div>
            </div>
          );
        },
      },
      {
        title: '商品分类',
        dataIndex: 'category_name',
        // width: colWidthNormal,
        // width: 200,
        key: 'category_name',
      },
      {
        title: '所属店铺',
        dataIndex: 'store_name',
        key: 'store_name',
      },
      {
        title: '商品描述',
        dataIndex: 'des',
        width: 400,
        key: 'des',
        render: value => {
          return (
            <div title={value} className={styles.des}>
              {value}
            </div>
          );
        },
      },
      {
        title: '配送',
        dataIndex: 'delivery',
        width: 100,
        key: 'delivery',
        render: value => {
          const code = value ? 1 : 2;
          const codeColor = ['green', 'blue'];
          return (
            <DicShow
              pcode="mall$#commodity$#delivery"
              code={[code]}
              show={name => (
                <Tag color={codeColor[code - 1]} key={name}>
                  {name}
                </Tag>
              )}
            />
          );
        },
      },
      {
        title: '状态',
        dataIndex: 'goods_status',
        width: 100,
        key: 'goods_status',
        render: value => {
          const codeColor = ['green', 'blue', 'red'];
          return (
            <DicShow
              pcode="mall$#commodity$#status"
              code={[value]}
              show={name => (
                <Tag color={codeColor[value - 1]} key={name}>
                  {name}
                </Tag>
              )}
            />
          );
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
        <PageHeaderLayout title="商品管理">
          <Card bordered={false} style={{ marginTop: '16px' }}>
            <Form>
              <Row>
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
                        onChange={this.onCommodityChange}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="所属店铺">
                    {getFieldDecorator('store_name', {})(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="商品描述">
                    {getFieldDecorator('des', {})(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayout} label="配送">
                    {getFieldDecorator('delivery', {})(
                      <DicSelect
                        vmode="string"
                        pcode="mall$#commodity$#delivery"
                        selectProps={{ placeholder: '请选择' }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="商品状态">
                    {getFieldDecorator('goods_status', {})(
                      <DicSelect
                        vmode="string"
                        pcode="mall$#commodity$#status"
                        selectProps={{ placeholder: '请选择' }}
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
              scroll={{ x: 2000 }}
              rowKey={record => record.goods_id}
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
      </div>
    );
    return resultJsx;
  }
}
