import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Modal, Table, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import StoreManageInfo from '../ShopManage/Info';
import Refuse from '../ShopManage/refuse';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import { DicSelect, DicShow } from '@/components/Dictionary';
import { formatDate } from '@/utils/utils';
import PButton from '@/components/PermButton';
import styles from '../ShopManage/Store.less';

const { Option } = Select;
@connect(state => ({
  shopMallStore: state.shopMallStore,
}))
@Form.create()
export default class ShopExamineList extends PureComponent {
  state = {
    queryFormDisplay: false,
    selectedRowKeys: [],
    selectedRows: [],

    dataForm: false,
    dataFormID: '',
    dataFormType: '',
    storename: '',
  };

  queryForm = null;

  pagination = {};

  componentDidMount() {
    this.props.dispatch({ type: 'shopMallStore/queryStorestatue' });
    // this.props.dispatch({type:'storeManage/queryShopStatueTotalInfo'});
    this.onBtnSearchClick();
  }

  onBtnSearchClick = () => {
    this.pagination = {
      current: 1,
      pageSize: 10,
    };
    this.queryForm = this.props.form.getFieldsValue();
    this.queryForm.status =this.queryForm.status?this.queryForm.status:2;
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
        type: 'shopMallStore/fetch',
        payload: { status: 2 },
      });
    }
    this.clearSelectRows();
  };

  saveRefuse = data => {
    this.props.dispatch({
      type: 'shopMallStore/refuseReason',
      payload: data,
    });
    this.clearSelectRows();
    this.onDataFormCallback();
  };


  onItemDetailClick = item => {
    this.setState({ dataForm: true, dataFormID: item.record_id, dataFormType: 'Detail' });
  };

  // 通过
  onItemPassClick = item => {
    this.props.dispatch({
      type: 'shopMallStore/shopMallStorePass',
      payload: { record_id: item.record_id, status: 3, audit_reason: '' },
    });
    this.clearSelectRows();
  };

  // 拒绝
  onItemRefuseClick = item => {
    this.setState({
      dataForm: true,
      dataFormID: item.record_id,
      dataFormType: 'refuse',
      storename: item.name,
    });
  };

  /**
   * 查询数据
   * @param {*} pagination
   */
  queryListData(params, pagination) {
    this.props.dispatch({
      type: 'shopMallStore/fetch',
      payload: params,
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  renderDataForm() {
    if (this.state.dataForm) {
      if (this.state.dataFormType === 'Detail') {
        return (
          <StoreManageInfo
            id={this.state.dataFormID}
            onShopInfoFrameCloseCallback={this.closeSubFrame}
          />
        );
      } else if (this.state.dataFormType === 'refuse') {
        return (
          <Refuse
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            storename={this.state.storename}
            callbackClose={this.onDataFormCallback}
            callback={this.saveRefuse}
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
    const { getFieldDecorator } = this.props.form;
    const { selectedRowKeys, selectedRows } = this.state;
    const {
      shopMallStore: {
        data: { list, pagination },
        loading,
      },
    } = this.props;
    // console.log(this.props);
    // 列定义
    // const colWidthShort = 100;
    const colWidthNormal = 120;
    const columns = [
      // {
      //   title: '店铺LOGO',
      //   dataIndex: 'logo',
      //   render: value => {
      //     return <img src={value} alt="" style={{ width: 60, height: 60 }} />;
      //   },
      // },
      {
        title: '商铺号',
        dataIndex: 'code',
      },
      {
        title: '店铺名称',
        dataIndex: 'name',
      },
      {
        title: '商铺品牌',
        dataIndex: 'brand',
        // width: colWidthNormal,
        width: 100,
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
        dataIndex: 'legal_name',
        // width: 140,
      },
      {
        title: '营业执照编号',
        dataIndex: 'business_license',
        width: 200,
        // render: value => {
        //   return (
        //     <div title={value} className={styles.address}>
        //       {value}
        //     </div>
        //   );
        // },
      },
      {
        title: '商铺分类',
        dataIndex: 'category',
        width: colWidthNormal,
        render: val => {
          return <DicShow pcode="mall$#storeclass" code={[val]} show={name} />;
        },
      },
      {
        title: '店铺状态',
        dataIndex: 'status',
        // width: 50,
        render: val => {
          return <DicShow pcode="mall$#shopstate" code={[val]} show={name} />;
        },
      },
      {
        title: '审核人',
        dataIndex: 'auditor',
        // width: colWidthNormal,
      },
      {
        title: '审核时间',
        dataIndex: 'audit_time',
        render: val => {
          if (val) {
            return <span>{formatDate(val, 'YYYY-MM-DD HH:mm:ss')}</span>;
          } else {
            return <span>-</span>;
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
        <PageHeaderLayout title="店铺审核管理">
          <Card bordered={false} style={{ marginTop: '16px' }}>
            <div className={styles.tableList}>
              <Form>
                <Row>
                  <Col span={6}>
                    <FormItem {...formItemLayout} label="店铺名称">
                      {getFieldDecorator('likeName', {})(<Input placeholder="请输入" />)}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem {...formItemLayout} label="商铺号">
                      {getFieldDecorator('code', {})(<Input placeholder="请输入" />)}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem {...formItemLayout} label="商铺品牌">
                      {getFieldDecorator('likeBrand', {})(<Input placeholder="请输入" />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <FormItem {...formItemLayout} label="商铺分类">
                      {getFieldDecorator('category', {
                        //   initialValue: 0,
                      })(
                        <DicSelect
                          vmode="int"
                          pcode="mall$#storeclass"
                          selectProps={{ placeholder: '请选择' }}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem {...formItemLayout} label="营业状态">
                      {getFieldDecorator('businessStatus', {})(
                        <Select>
                          <Option value={1}>营业</Option>
                          <Option value={2}>歇业</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem {...formItemLayout} label="店铺状态">
                      {getFieldDecorator('status', {})(
                        <DicSelect
                          vmode="int"
                          pcode="mall$#shopstate"
                          selectProps={{ placeholder: '请选择' }}
                        />
                      )}
                    </FormItem>
                  </Col>

                  {/* <Col span={8}>
                    <FormItem {...formItemLayout} label="店铺状态">
                      {getFieldDecorator('status', {})(
                        <DicSelect
                          vmode="int"
                          pcode="mall$#shopstate"
                          selectProps={{ placeholder: '请选择' }}
                        />
                      )}
                    </FormItem>
                  </Col> */}
                  <Col span={6} style={{ textAlign: 'right' }}>
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
                    通过
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
                    驳回
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
                scroll={{ x: 1000 }}
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
