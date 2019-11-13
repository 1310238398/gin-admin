/* 活动对话框 */
import React, { PureComponent } from 'react';
/* 组件及配置 */
import { connect } from 'dva';
import { Form, Modal, Table, Col, Cascader, Row, Input, Button } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

@Form.create()
@connect(state => ({
  salesPromotion: state.salesPromotion,
}))
@Form.create()
export default class SalesPromotionProduct extends PureComponent {
  state = {
    productClass: '',
    productDate: [],
    selectedRowKeys: [],
  };
  async componentDidMount() {
    await this.props.dispatch({
      type: 'salesPromotion/productLoadForm',
    });
    /* 获取商品列表 */
    await this.props.dispatch({
      type: 'salesPromotion/getProductList',
    });
    /* 商品分类 */
    await this.props.dispatch({
      type: 'salesPromotion/getProductClass',
    });
    this.setState({
      productClass: this.props.salesPromotion.productClass,
      selectedRowKeys: this.props.salesPromotion.formCheck,
    });
  }

  render() {
    /* 初始化数据 */
    const {
      salesPromotion: {
        formproductVisible,
        ProductData: { list, pagination },
      },
      form: { getFieldDecorator },
    } = this.props;
    /* 分页配置 */
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => {
        return <span>共{total}条</span>;
      },
      ...pagination,
    };
    /* 商品全选和选择 */
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          productDate: selectedRows,
          selectedRowKeys,
        });
      },
    };
    /* 表头 */
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品分类',
        dataIndex: 'category_name',
      },
    ];
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
    /* 模态框 */
    return (
      <Modal
        title={'商品选择'}
        width={600}
        visible={formproductVisible}
        maskClosable={false}
        destroyOnClose
        onOk={this.onModalOKClick}
        onCancel={this.onModalCancelClick}
        style={{ top: 20 }}
        bodyStyle={{ height: 550, overflowY: 'scroll' }}
      >
        <Form>
          <Row>
            <Col span={10}>
              <FormItem {...formItemLayout} label="商品名称">
                {getFieldDecorator('name', {})(
                  <Input placeholder="请输入商品名称" maxLength="30" />
                )}
              </FormItem>
            </Col>
            <Col span={10} push={1}>
              <Form.Item {...formItemLayout} label="商品分类">
                {getFieldDecorator('category_id', {
                  initialValue: [],
                })(
                  <Cascader
                    fieldNames={{ label: 'value', value: 'key', children: 'children' }}
                    options={this.state.productClass}
                    onChange={this.ChangeProductClass}
                    expandTrigger="hover"
                    placeholder="请选择商品分类"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={21} style={{ textAlign: 'right', marginBottom: '10px' }}>
              <Button
                icon="search"
                type="primary"
                style={{ marginLeft: 8 }}
                onClick={this.onSearchFormSubmit}
              >
                查询
              </Button>
              <Button type="danger" style={{ marginLeft: 8 }} onClick={this.onBtnClearClick}>
                重置
              </Button>
            </Col>
          </Row>
        </Form>
        <Table
          dataSource={list}
          pagination={paginationProps}
          columns={columns}
          rowSelection={rowSelection}
          rowKey={record => record.goods_id}
          onChange={this.onTableChange}
        />
      </Modal>
    );
  }
  /* 模态框提交 */
  onModalOKClick = () => {
    this.props.dispatch({
      type: 'salesPromotion/setProductDate',
      payload: this.state.productDate,
    });
    this.props.callback();
  };
  /* 模态框关闭 */
  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'salesPromotion/productLoadForm',
      payload: false,
    });
    this.props.callback();
  };
  /* 商品分页 */
  onTableChange = pagination => {
    this.props.dispatch({
      type: 'salesPromotion/getProductList',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };
  /* 商品查询 */
  onSearchFormSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    let formData = this.props.form.getFieldsValue();
    formData.category_id = formData.category_id[formData.category_id.length - 1];
    this.props.dispatch({
      type: 'salesPromotion/getProductList',
      payload: formData,
    });
  };
  /* 查询清空 */
  onBtnClearClick = () => {
    this.props.form.resetFields();
    const { store } = this.state;
    this.props.dispatch({
      type: 'salesPromotion/saveProductSearch',
      payload: {},
    });
    this.props.dispatch({
      type: 'salesPromotion/getProductList',
      store,
    });
  };
}
