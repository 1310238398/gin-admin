/*
 *	商品信息管理
 */
import React from 'react';
import { connect } from 'dva';
import { Card, Button, Tag, Form, Row, Col, Input, Cascader, Modal, message, Divider } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import TableList from '../../../components/TableList';

import CommodityManagementDetail from './CommodityManagementDetail';

import styles from './CommodityManagement.less';

import { DicSelect, DicShow } from '@/components/Dictionary';
import editImg from '../../../assets/edit.png';
import CommodityModal from '../Commodity/Modal';
@Form.create()
@connect(state => ({
  productModule: state.productModule,
  storeApply: state.store,
}))
export default class CommodityManagement extends React.PureComponent {
  /*
   * 初始状态
   */
  queryForm = null;

  // state = {
  //   dataForm: false,
  //   dataFormID: '',
  //   dataFormType: '',
  //   store: '',
  //   selectedRows: [],
  //   dataInfo: false,
  //   childrenData: '',
  //   filesTitle: '',
  //   productClass: '',
  // };

  /*
   * 界面挂载完成
   */
  componentDidMount() {
    this.props.dispatch({
      type: 'productModule/getStoreNew',
    });
    this.props.dispatch({
      type: 'productModule/getProductClass',
    });
  }

  /* 表单 */
  onTableChange = pagination => {
    const { store } = this.props.productModule;
    this.props.dispatch({
      type: 'productModule/getProductList',
      store: store.store_id,
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  // 搜索
  onSearchFormSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    const formData = this.props.form.getFieldsValue();
    if (formData.category_id && formData.category_id.length > 0) {
      formData.category_id = formData.category_id[formData.category_id.length - 1];
    }

    this.props.dispatch({
      type: 'productModule/fetch',
      payload: formData,
    });
  };

  // 重置
  onBtnClearClick = () => {
    // 重置查询条件
    this.props.form.resetFields();
    // 重新刷新查询列表
    const { store } = this.props.productModule;
    this.props.dispatch({
      type: 'productModule/saveSearch',
      payload: {},
    });
    this.props.dispatch({
      type: 'productModule/getProductList',
      store: store.store_id,
    });
  };

  // 商品上架
  onItemUpClick = record => {
    this.props.dispatch({
      type: 'productModule/changeUpstatus',
      payload: record,
    });
  };

  // 商品下架
  onItemDisableClick = record => {
    this.props.dispatch({
      type: 'productModule/changeStatus',
      payload: record,
    });
  };

  // 添加商品
  onClickAdd = () => {
    this.props.dispatch({
      type: 'productModule/loadFormPro',
      payload: {
        type: 'A',
        id: '',
      },
    });
  };

  /* 删除商品 */
  onItemDelClick = item => {
    const { store } = this.props.productModule;
    Modal.confirm({
      title: `确定删除【${item.name}】商品？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDelOKClick.bind(this, store, item.goods_id),
    });
  };

  // 点击确认时执行的方法
  onDelOKClick(store, id) {
    this.props.dispatch({
      type: 'productModule/del',
      payload: { store: store.store_id, goods_id: id },
    });
  }

  // 点击确认时执行的方法
  onEditOKClick(store, id) {
    this.props.dispatch({
      type: 'productModule/del',
      payload: { store: store.store_id, goods_id: id },
    });
  }

  handleModalChange = data => {
    this.props.dispatch({
      type: 'productModule/saveFormDataPro',
      payload: data,
    });
  };

  // 编辑库存
  stockEditClick = item => {
    this.props.dispatch({
      type: 'productModule/getProductStock',
      payload: item,
    });
  };

  handleChange = data => {
    this.props.dispatch({
      type: 'productModule/saveStockData',
      payload: data,
    });
  };

  renderProEdit = () => {
    const {
      productModule: { formTitlePro, formVisiblePro, dataPro },
    } = this.props;
    return (
      <CommodityModal
        visible={formVisiblePro}
        title={formTitlePro}
        dataPro={dataPro}
        onChange={this.handleModalChange}
        callbackPro={this.onProEditCallback}
        closeBack={this.onProEditClose}
      />
    );
  };

  // 提交表单
  handleDataFormSubmit = data => {
    this.props.dispatch({
      type: 'productModule/submitStock',
      payload: data,
    });
  };

  handleDataFormCancel = () => {
    this.props.dispatch({
      type: 'productModule/changeFormVisibleStock',
      payload: false,
    });
  };

  onDataFormCallback = result => {
    // this.setState({ dataForm: false, dataFormID: '' });
    if (result && result === 'ok') {
      this.props.dispatch({
        type: 'productModule/fetch',
      });
    }
  };

  onItemEditClick = item => {
    this.props.dispatch({
      type: 'productModule/loadFormPro',
      payload: {
        type: 'E',
        id: item.goods_id,
        store_id: item.store_id,
      },
    });
  };

  onProEditClose = () => {
    this.props.dispatch({
      type: 'productModule/changeFormVisiblePro',
      payload: false,
    });
  };

  onProEditCallback = data => {
    if (!data.name) {
      message.error('请输入商品名称');
    } else if (!data.goods_category_id) {
      message.error('请选择商品分类');
    } else if (!data.images) {
      message.error('请上传商品图片');
    } else if (!data.norm_name) {
      message.error('请输入商品规格名称');
    } else if (!data.norm_value) {
      message.error('请添加商品规格值');
    } else {
      this.props.dispatch({
        type: 'productModule/submitPro',
        payload: data,
      });
    }
  };

  /* 商品上下架 */
  handelUpAndDown(record) {
    if (record.goods_status === 1) {
      return (
        <a
          onClick={() => {
            this.onItemDisableClick(record);
          }}
        >
          下架
        </a>
      );
    } else if (record.goods_status === 2) {
      return (
        <a
          onClick={() => {
            this.onItemUpClick(record);
          }}
        >
          上架
        </a>
      );
    } else {
      return null;
    }
  }

  renderDataForm() {
    const {
      productModule: { stockData, formVisibleStock },
    } = this.props;
    return (
      <CommodityManagementDetail
        visible={formVisibleStock}
        stockData={stockData}
        onChange={this.handleChange}
        onCancel={this.handleDataFormCancel}
        onSubmit={this.handleDataFormSubmit}
        closeBack={this.onProEditClose}
      />
    );
  }

  // 查询
  renderSearchForm = () => {
    // Item布局
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 12 },
        lg: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 12 },
        lg: { span: 8 },
      },
    };
    const col = {
      sm: 24,
      md: 8,
    };
    const { getFieldDecorator } = this.props.form;
    // const { Option } = Select;
    const { productClass } = this.props.productModule;
    return (
      <Form>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col {...col}>
            <FormItem {...formItemLayout} label="商品名称">
              {getFieldDecorator('name', {})(<Input placeholder="请输入商品名称" maxLength="50" />)}
            </FormItem>
          </Col>
          <Col {...col}>
            <Form.Item {...formItemLayout} label="商品分类">
              {getFieldDecorator('category_id', {})(
                <Cascader
                  fieldNames={{ label: 'value', value: 'key', children: 'children' }}
                  options={productClass}
                  onChange={this.ChangeProductClass}
                  expandTrigger="hover"
                  placeholder="请选择商品分类"
                />
              )}
            </Form.Item>
          </Col>
          <Col {...col}>
            <FormItem {...formItemLayout} label="商品状态">
              {getFieldDecorator('goods_status')(
                <DicSelect
                  vmode="int"
                  pcode="mall$#commodity$#status"
                  selectProps={{ placeholder: '请选择' }}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col {...col}>
            <FormItem {...formItemLayout} label="商品描述">
              {getFieldDecorator('des', {})(<Input placeholder="请输入商品描述" maxLength="200" />)}
            </FormItem>
          </Col>
          <Col {...col}>
            <FormItem {...formItemLayout} label="配送状态">
              {getFieldDecorator('delivery')(
                <DicSelect
                  vmode="int"
                  pcode="mall$#commodity$#delivery"
                  selectProps={{ placeholder: '请选择' }}
                />
              )}
            </FormItem>
          </Col>
          <Col {...col}>
            <Button type="primary" className={styles.searchBtn} onClick={this.onSearchFormSubmit}>
              查询
            </Button>
            <Button type="danger" className={styles.resetBtn} onClick={this.onBtnClearClick}>
            重置
            </Button>
          </Col>
        </Row>
      </Form>
    );
  };

  render() {
    /*
     * 表格
     */
    const {
      productModule: {
        data: { list, pagination },
      },
    } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => {
        return <span>共{total}条</span>;
      },
      ...pagination,
    };

    /*
     * table
     */
    const columns = [
      {
        title: '商品名称/价格',
        // dataIndex: 'name',
        render: (val, record) => {
          const image = record.images && record.images.length > 0 ? record.images[0] : '';
          const price = record.price !== 0 ? record.price / 100 : 0;
          return (
            <div className={styles.goodsName}>
              <div className={styles.goodsNameLeft}>
                <img src={image} alt="" />
              </div>
              <div className={styles.goodsNameRight}>
                <div className={styles.goodsNameRightTitle}>{record.name}</div>
                <div className={styles.goodsNameRightPrice}>￥{price}</div>
              </div>
            </div>
          );
        },
      },
      {
        title: '商品描述',
        dataIndex: 'des',
        width: 300,
      },
      {
        title: '商品分类',
        dataIndex: 'category_name',
        width: 100,
      },
      {
        title: '配送状态',
        dataIndex: 'delivery',
        width: 100,
        render: val => {
          const code = val ? 1 : 2;
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
        render: val => {
          const codeColor = ['green', 'blue', 'red'];
          return (
            <DicShow
              pcode="mall$#commodity$#status"
              code={[val]}
              show={name => (
                // val === 2 ? <div style={{ color: 'red' }}>{name}</div> : <div>{name}</div>)
                <Tag color={codeColor[val - 1]} key={name}>
                  {name}
                </Tag>
              )}
            />
          );
        },
      },
      {
        title: '库存',
        dataIndex: 'stock',
        width: 100,
        render: (value, record) => {
          return (
            <div className={styles.stockCon}>
              <span>{record.stock}</span>
              <img src={editImg} onClick={() => this.stockEditClick(record)} alt="" />
            </div>
          );
        },
      },
      {
        title: '总销量',
        dataIndex: 'quantity',
        width: 100,
      },
      {
        title: '操作',
        render: (val, record) => {
          return (
            <span className={styles.operationBtn}>
              <a
                onClick={() => {
                  this.onItemEditClick(val);
                }}
              >
                编辑
              </a>
              {record.goods_status !== 3 ? <Divider type="vertical" /> : null}
              {this.handelUpAndDown(record)}
              <Divider type="vertical" />
              <a
                className={styles.detBtn}
                onClick={() => {
                  this.onItemDelClick(record);
                }}
              >
                删除
              </a>
            </span>
          );
        },
      },
    ];

    const resultJsx = (
      <div>
        <Card
          title="商品管理"
          bordered={false}
          headStyle={{
            fontSize: 14,
            color: 'rgba(46, 56, 77, 1)',
            fontWeight: 600,
            padding: '0 32px 0 47px',
          }}
          className={styles.titleCard}
          extra={
            <Button className={styles.createCommodity} onClick={this.onClickAdd}>
              创建商品
            </Button>
          }
        >
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSearchForm()}</div>
            <div className={styles.tableListOperator} />
            <div>
              <TableList
                pagination={paginationProps}
                dataSource={list}
                rowKey={record => record.goods_id}
                columns={columns}
                scroll={{ x: 1170 }}
                onChange={this.onTableChange}
              />
            </div>
            <div />
          </div>
        </Card>
        {this.renderDataForm()}
        {this.renderProEdit()}
      </div>
    );
    return resultJsx;
  }
}
