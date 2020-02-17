import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Modal, Table, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
// import Info from './Info';
import AdvertisSetEdit from './AdvertisSetEdit';

import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import AdvertiserPositionSelect from '@/components/AdvertiserPosition/AdvertiserPosition';
import PButton from '@/components/PermButton';
import styles from '../AdvertisReview/AdvertisReview.less';

@connect(state => ({
  advertisSet: state.advertisSet,
}))
@Form.create()
export default class AdvertisSettingList extends PureComponent {
  state = {
    queryFormDisplay: false,
    selectedRowKeys: [],
    selectedRows: [],

    dataForm: false,
    dataFormID: '',
    dataFormType: '',
  };

  queryForm = null;

  pagination = {};

  componentDidMount() {
    // this.onBtnSearchClick();
  }

  onBtnSearchClick = () => {
    this.pagination = {
      current: 1,
      pageSize: 10,
    };
    this.props.form.validateFieldsAndScroll(err => {
      if (!err) {
        this.queryForm = this.props.form.getFieldsValue();
        this.queryListData(this.queryForm, this.pagination);
      }
    });
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
        type: 'advertisSet/fetch',
      });
    }
    this.clearSelectRows();
  };

  onItemSettingClick = item => {
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
      type: 'advertisSet/fetch',
      payload: params,
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  renderDataForm() {
    if (this.state.dataForm) {
      //   if (this.state.dataFormType === 'Detail') {
      //     return (
      //       <Info
      //         id={this.state.dataFormID}
      //         onCloseCallback={this.closeSubFrame}
      //       />
      //     );
      //   } else
      if (this.state.dataFormType === 'E') {
        return (
          <AdvertisSetEdit
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
      advertisSet: {
        data: { list, pagination },
        loading,
      },
    } = this.props;
    // console.log(this.props);
    // 列定义
    // const colWidthShort = 100;
    const columns = [
      {
        title: '推广名称',
        dataIndex: 'name',
        width: 120,
      },
      {
        title: '广告位',
        dataIndex: 'advertising_name',
        width: 150,
      },
      {
        title: '广告主',
        dataIndex: 'advertiser_name',
        width: 150,
      },
      {
        title: '广告创意组',
        dataIndex: 'creative_group_name',
        width: 130,
      },
      {
        title: '广告创意',
        dataIndex: 'creative_name',
      },
      {
        title: '最大曝光次数上限',
        dataIndex: 'max_cpm',
      },
      {
        title: '最大点击次数上限',
        dataIndex: 'max_cpc',
      },

      {
        title: '曝光次数',
        dataIndex: 'cpm',
      },
      {
        title: '点击次数',
        dataIndex: 'cpc',
      },
      {
        title: '权重值',
        dataIndex: 'weight',
      },
      {
        title: '是否固定该广告',
        dataIndex: 'fixed',
        render: val => {
          return <span>{val === 1 ? '是' : '否'}</span>;
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
        <PageHeaderLayout title="广告推广设置">
          <Card bordered={false} style={{ marginTop: '16px' }}>
            <div className={styles.tableList}>
              <Form>
                <Row>
                  <Col span={6}>
                    <FormItem {...formItemLayout} label="选择广告位">
                      {getFieldDecorator('advertisingID', {
                        rules: [
                          {
                            required: true,
                            message: '请选择广告位',
                          },
                        ],
                      })(<AdvertiserPositionSelect />)}
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
                  key="setting"
                  code="setting"
                  onClick={() => this.onItemSettingClick(selectedRows[0])}
                  style={{ marginRight: '8px' }}
                >
                  设置
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
                scroll={{ x: 1500 }}
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
