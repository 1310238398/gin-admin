import React, { PureComponent } from 'react';

import { Modal, Tag, Button, Card, Table, Row, Col, Form, Input, TreeSelect, message } from 'antd';
import { connect } from 'dva';
import FormItem from 'antd/lib/form/FormItem';
import styles from './CommoditySelection.less';

@Form.create()
@connect(state => ({
  recommendedMerchandise: state.recommendedMerchandise,
  commodityManagement: state.commodityManagement,
}))
export default class CommoditySelection extends PureComponent {
  state = {
    selectedRowKeys: [],
  };

  queryForm = null;

  pagination = {};

  componentDidMount() {
    this.props.dispatch({
      type: 'recommendedMerchandise/queryDistributionstatus',
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
    this.queryForm.gender = this.props.arear;
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

  // onSelectcommCallback = () => {
  //   const selectdata = [...this.state.selectedRowKeys];
  //   const { SelectcommCallback } = this.props;
  //   Modal.confirm({
  //     title: '操作确认',
  //     content: '确定要解除屏蔽此订单吗？',
  //     okType: 'danger',
  //     okText: '确定',
  //     cancelText: '取消',
  //     onOk() {
  //       SelectcommCallback(selectdata);
  //     },
  //   });
  // };

  selectRow = record => {
    const selectedRowKeys = [...this.state.selectedRowKeys];
    if (selectedRowKeys.indexOf(record.key) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
    } else {
      selectedRowKeys.push(record.key);
    }
  };

  /**
   * 清空按钮点击事件
   */
  onBtnClearClick = () => {
    this.props.form.resetFields();
  };

  statusRender = status => {
    switch (status) {
      case 1:
        return <Tag color="blue">正常</Tag>;
      case 2:
        return <Tag color="green">歇业</Tag>;
      case 3:
        return <Tag color="red">挂起</Tag>;
      default:
        return '';
    }
  };

  onSelectcommCallback = () => {
    const selectdata = [...this.state.selectedRowKeys];
    if (selectdata && selectdata.length > 0) {
      const listdata = { list: selectdata };
      const { onSelectcommCallback } = this.props;
      Modal.confirm({
        title: '操作确认',
        content: '确定要加入此商品吗？',
        okType: 'danger',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          onSelectcommCallback(listdata);
        },
      });
    } else {
      message.error('请至少选择一项商品');
    }
  };

  selectRow = record => {
    // const selectedRowKeys = [...this.state.selectedRowKeys];
    this.setState({
      selectedRowKeys: record,
    });
    //   const selectedRowKeys = [...this.state.selectedRowKeys];
    //   if (selectedRowKeys.indexOf(record.key) >= 0) {
    //     selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
    //   } else {
    //     selectedRowKeys.push(record.key);
    //   }
    //   this.setState({ selectedRowKeys });
  };

  onSelectedRowKeysChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  /**
   * 查询数据
   * @param {*} pagination
   */
  queryListData(params, pagination) {
    this.props.dispatch({
      type: 'commodityManagement/selectqueryShopStatueTotalInfo',
      params,
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  render() {
    const {
      recommendedMerchandise: { CommClasslist, formVisible },
      commodityManagement: {
        tableDataSelect: { list, pagination },
      },
    } = this.props;
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
    const footerJsx = [
      <Button key="close" onClick={this.props.onAddInfoFrameCloseCallback}>
        关闭
      </Button>,
      <Button key="unauth" onClick={this.onSelectcommCallback}>
        选择
      </Button>,
    ];

    // 列定义
    // const colWidthShort = 100;
    const colWidthNormal = 120;
    //   const list = [];
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        width: colWidthNormal,
        key: 'name',
      },
      {
        title: '商品分类',
        dataIndex: 'category_name',
        width: colWidthNormal,
        key: 'category_name',
      },
      {
        title: '所属店铺',
        dataIndex: 'store_name',
        width: 140,
        key: 'store_name',
      },
    ];
    // const {
    //   recommendedMerchandise: {
    //     CommClasslist
    //   },commodityManagement:{tableData: { list, pagination },}
    // } = this.props;
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
    // const { selectedRowKeys } = this.state;
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectedRowKeysChange
    // };
    const rowSelection = {
      onChange: selectedRowKeys => {
        this.setState({
          selectedRowKeys,
        });
      },
      getCheckboxProps: record => ({
        disabled: record.recommend === true, // Column configuration not to be checked
        // recommend: record.recommend,
      }),
    };
    const resultJsx = (
      <Modal
        className={styles.frame}
        visible
        title="商品选择"
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.onAddInfoFrameCloseCallback}
        footer={footerJsx}
      >
        <Form>
          <Row>
            <Col span={8}>
              <FormItem {...formItemLayout} label="商品名称：">
                {getFieldDecorator('name', {})(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label="商品分类：">
                {getFieldDecorator('category_id', {})(
                  <TreeSelect
                    style={{ width: '100%' }}
                    treeData={CommClasslist}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="请选择"
                    treeDefaultExpandAll
                    allowClear
                  />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label="所属商铺：">
                {getFieldDecorator('store_name', {})(<Input placeholder="请输入" />)}
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
        <Card bordered={false}>
          <Table
            rowSelection={rowSelection}
            dataSource={list}
            columns={columns}
            onChange={this.onTableChange}
            rowKey={record => record.goods_id}
            pagination={paginationProps}
            // onRow={record => ({
            //   onClick: () => {
            //     this.selectRow(record);
            //   }
            // })}
          />
        </Card>
      </Modal>
    );
    return resultJsx;
  }
}
