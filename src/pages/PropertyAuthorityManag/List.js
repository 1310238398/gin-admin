import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Modal, Select, Table,Alert } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
// import TableList from '../../components/TableList';
// import StoreManageInfo from './Info';
import PropertyAuthorityEdit from './Edit';
import EditInfo from './EditInfo';
import ShowInfo from './ShowInfo';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import * as builingService from '@/services/building';
import { DicSelect,DicShow } from '@/components/Dictionary';
// import UserSelect from '@/components/UserSelect/UserSelect';
// import UserShow from '@/components/UserShow/index';
import PButton from '@/components/PermButton';
import styles from './PropertyAuthor.less';

const { Option } = Select;

@connect(state => ({
  propertyAuthority: state.propertyAuthority,
}))
@Form.create()
export default class PropertyAuthorityList extends PureComponent {
  state = {
    queryFormDisplay: false,
    selectedRowKeys: [],
    selectedRows: [],

    dataForm: false,
    dataFormID: '',
    dataFormType: '',
    dataItem: {},
    floorList: [],
  };

  queryForm = null;

  pagination = {};

  componentDidMount() {
    builingService.HouseQuery({ q: 'list', btype: 80 }).then(data => {
      this.setState({ floorList: data.list ? data.list : [] });
    });
    this.props.dispatch({ type: 'propertyAuthority/queryStorestatue' });
    // this.props.dispatch({type:'storeManage/queryShopStatueTotalInfo'});
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
   * 重置按钮点击事件
   */
  onBtnClearClick = () => {
    this.props.form.resetFields();
    this.clearSelectRows();
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
        type: 'propertyAuthority/fetch',
      });
    }
    this.clearSelectRows();
  };

  saveRefuse = data => {
    this.props.dispatch({
      type: 'propertyAuthority/refuseReason',
      payload: data,
    });
    this.clearSelectRows();
    this.onDataFormCallback();
  };

  onItemDeleClick = item => {
    Modal.confirm({
      title: `确定删除此权限【${item.real_name}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDeleOKClick.bind(this, item.user_id),
    });
  };

  onDeleOKClick = data => {
    this.props.dispatch({
      type: 'propertyAuthority/propertyAuthorityDele',
      payload: data,
    });
    this.clearSelectRows();
  };

  // 新增店铺
  onAddClick = () => {
    // this.props.dispatch(routerRedux.push('./shopcreate'));
    this.setState({ dataForm: true, dataFormID: '', dataFormType: 'A' });
  };

  onItemEditClick = item => {
    this.setState({ dataForm: true, dataFormID: item.user_id, dataFormType: 'E', dataItem: item });
  };

  onItemDetailClick = item => {
    this.setState({
      dataForm: true,
      dataFormID: item.user_id,
      dataFormType: 'Detail',
      dataItem: item,
    });
  };

  /**
   * 查询数据
   * @param {*} pagination
   */
  queryListData(params, pagination) {
    this.props.dispatch({
      type: 'propertyAuthority/fetch',
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
          <ShowInfo
            id={this.state.dataFormID}
            onInfoFrameCloseCallback={this.closeSubFrame}
            data={this.state.dataItem}
          />
        );
      } else if (this.state.dataFormType === 'E') {
        return (
          <EditInfo
            id={this.state.dataFormID}
            data={this.state.dataItem}
            type={this.state.dataFormType}
            callback={this.onDataFormCallback}
          />
        );
      } else if (this.state.dataFormType === 'A') {
        return (
          <PropertyAuthorityEdit
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            callback={this.onDataFormCallback}
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
    const { selectedRowKeys, selectedRows, floorList } = this.state;

    const {
      propertyAuthority: {
        data: { list, pagination },
        loading,
      },
    } = this.props;
    const columns = [
      {
        title: '姓名',
        dataIndex: 'real_name',
        // width: 140,
      },
      {
        title: '用户手机号',
        dataIndex: 'phone',
      },
      {
        title: '门禁权限',
        dataIndex: 'items',
        render: val => {
            if (val.length === 0) {
              return '暂无信息';
            } else {
              return val.map(tax => {
                return (
                  <Alert
                    message={[
                      <div>
                        <b>楼栋</b>：{tax.building_names.join(',')}
                      </div>,
                      <div>
                        <b>标签</b>：<DicShow pcode="ops$#datarole" code={[tax.tag]} show={name} />
                      </div>,
                    ]}
                  />
                );
              });
            }
          },
      },

      {
        title: '企业名称',
        dataIndex: 'enterprise_name',
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
        <PageHeaderLayout title="门禁权限管理">
          <Card bordered={false} style={{ marginTop: '16px' }}>
            <div className={styles.tableList}>
              <Form>
                <Row>
                  <Col span={6}>
                    <FormItem {...formItemLayout} label="用户手机号">
                      {getFieldDecorator('likePhone', {})(<Input placeholder="请输入" />)}
                    </FormItem>
                  </Col>

                  <Col span={6}>
                    <FormItem {...formItemLayout} label="用户姓名">
                      {getFieldDecorator('likeRealName', {})(<Input placeholder="请输入" />)}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem {...formItemLayout} label="楼栋">
                      {getFieldDecorator('buildingID', {})(
                        <Select>
                          {floorList &&
                            floorList.map(v => {
                              return (
                                <Option key={v.record_id} value={v.record_id}>
                                  {v.name}
                                </Option>
                              );
                            })}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <FormItem {...formItemLayout} label="标签">
                      {getFieldDecorator('tag', {})(
                        <DicSelect
                          vmode="string"
                          pcode="ops$#datarole"
                          selectProps={{ placeholder: '请选择' }}
                        />
                      )}
                    </FormItem>
                  </Col>

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
              <PButton
                icon="plus"
                type="primary"
                code="add"
                onClick={() => this.onAddClick()}
                style={{ marginRight: '8px' }}
              >
                新增权限
              </PButton>
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

                <PButton
                  key="edit"
                  code="edit"
                  icon="edit"
                  onClick={() => this.onItemEditClick(selectedRows[0])}
                  style={{ marginRight: '8px' }}
                >
                  编辑
                </PButton>,
                <PButton
                  key="delete"
                  code="delete"
                  icon="delete"
                  type="danger"
                  onClick={() => this.onItemDeleClick(selectedRows[0])}
                  style={{ marginRight: '8px' }}
                >
                  删除
                </PButton>,
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
