import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Modal, Table } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
// import Info from './Info';
import AdvertisCreativeGroupEdit from './AdvertisCreativeGroupEdit';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import PButton from '@/components/PermButton';
import AdvertiserSelect from '@/components/AdvertiserSelect/AdvertiserSelect';
import styles from './AdvertisCreativeGroup.less';

@connect(state => ({
  advertisCreativeGroup: state.advertisCreativeGroup,
}))
@Form.create()
export default class AdvertisCreativeGroup extends PureComponent {
  state = {
    selectedRowKeys: [],
    selectedRows: [],

    dataForm: false,
    dataFormID: '',
    dataFormType: '',
  };

  queryForm = null;

  pagination = {};

  componentDidMount() {
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
        type: 'advertisCreativeGroup/fetch',
      });
    }
    this.clearSelectRows();
  };

  onItemDeleClick = item => {
    Modal.confirm({
      title: `确定删除广告创意组【${item.name}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDeleOKClick.bind(this, item.record_id),
    });
  };

  onDeleOKClick = data => {
    this.props.dispatch({
      type: 'advertisCreativeGroup/CreativeGroupDele',
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
    this.setState({ dataForm: true, dataFormID: item.record_id, dataFormType: 'E' });
  };

  onItemDetailClick = item => {
    this.setState({ dataForm: true, dataFormID: item.record_id, dataFormType: 'Detail' });
  };

  /**
   * 查询数据
   * @param {*} pagination
   */
  queryListData(params, pagination) {
    this.props.dispatch({
      type: 'advertisCreativeGroup/fetch',
      payload: params,
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  renderDataForm() {
    if (this.state.dataForm) {
      // if (this.state.dataFormType === 'Detail') {
      //   return <Info id={this.state.dataFormID} onCloseCallback={this.closeSubFrame} />;
      // } else

      if (this.state.dataFormType === 'E') {
        return (
          <AdvertisCreativeGroupEdit
            id={this.state.dataFormID}
            type={this.state.dataFormType}
            callback={this.onDataFormCallback}
          />
        );
      } else if (this.state.dataFormType === 'A') {
        return (
          <AdvertisCreativeGroupEdit
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
    const { selectedRowKeys, selectedRows } = this.state;
    const {
      advertisCreativeGroup: {
        data: { list, pagination },
        loading,
      },
    } = this.props;
    // console.log(this.props);
    // 列定义
    // const colWidthShort = 100;
    const colWidthNormal = 120;
    const columns = [
      {
        title: '创意组名称',
        dataIndex: 'name',
      },
      {
        title: '广告主名称',
        dataIndex: 'advertiser_name',
      },
      {
        title: '交互类型',
        dataIndex: 'interaction_type',
        render: val => {
          switch (val) {
            case 1:
              return '打开网页';
            case 2:
              return 'Android应用下载';
            case 3:
              return 'IOS应用下载';
            default:
              return '未知';
          }
        },
      },
      {
        title: '应用名',
        dataIndex: 'app_name',
      },
      {
        title: '应用包名',
        dataIndex: 'app_pkg_name',
        width: 80,
      },

      {
        title: '曝光监测地址',
        dataIndex: 'mille_addr',
        width: colWidthNormal,
      },
      {
        title: '点击监测地址',
        dataIndex: 'click_addr',
        width: colWidthNormal,
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
        <PageHeaderLayout title="广告创意组管理">
          <Card bordered={false} style={{ marginTop: '16px' }}>
            <div className={styles.tableList}>
              <Form>
                <Row>
                  <Col span={6}>
                    <FormItem {...formItemLayout} label="广告主">
                      {getFieldDecorator('advertiserID', {})(<AdvertiserSelect />)}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem {...formItemLayout} label="创意组名称">
                      {getFieldDecorator('name', {})(<Input placeholder="请输入" />)}
                    </FormItem>
                  </Col>
                  <Col span={6} style={{ marginLeft: 20, paddingTop: 3 }}>
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
                新增广告创意组
              </PButton>
              {selectedRows.length === 1 && [
                // <PButton
                //   key="query"
                //   code="query"
                //   icon="eye-visible"
                //   onClick={() => this.onItemDetailClick(selectedRows[0])}
                //   style={{ marginRight: '8px' }}
                // >
                //   查看
                // </PButton>,

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
