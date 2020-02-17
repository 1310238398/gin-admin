import React, { PureComponent } from 'react';
/* antd */
import { Card, Button, Form, Row, Col, Input, Dropdown, Menu } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { connect } from 'dva';
import { DicSelect, DicShow } from '../../components/Dictionary';
import UserShow from '../../components/UserShow';
import SchTime from '../../components/Info/SchTime';
import TableList from '../../components/TableList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import UserSelect from '../../components/UserSelect/UserSelect';
import LeaseDetail from './SubFrame/LeaseDetail';
import { parseUtcTime } from '../../utils/utils';

const initialData = [1];
/**
 * 租赁信息审核
 */
@Form.create()
@connect(state => ({
  leaseAuditList: state.leaseAuditList,
  loading: state.loading.models.leaseAuditList,
}))
export default class LeaseAuditList extends PureComponent {
  state = {
    dataForm: false,
    dataFormID: '',
    dataFormType: '',
    // creator: '',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'leaseAuditList/fetch',
      payload: {
        status: initialData,
      },
    });
  }

  onItemSeeClick = id => {
    this.setState({ dataForm: true, dataFormID: id.info_id, dataFormInfo: id });
  };

  onBtnClearClick = () => {
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'leaseAuditList/saveSearch',
      payload: {},
    });
    this.props.dispatch({
      type: 'leaseAuditList/fetch',
      payload: {
        status: initialData,
      },
    });
  };

  onDataFormCallback = () => {
    this.setState({ dataForm: false, dataFormID: '' });
  };

  onSearchFormSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    const formData = this.props.form.getFieldsValue();
    const extral = {};
    if (formData.lxdh) {
      extral.lxdh = { '~=': formData.lxdh };
    }
    if (formData.fydz) {
      extral.fydz = { '~=': formData.fydz };
    }
    if (formData.lxr) {
      extral.lxr = { '~=': formData.lxr };
    }
    if (formData.house_type) {
      extral.fl = formData.house_type;
    }
    formData.extral = JSON.stringify(extral);

    this.props.dispatch({
      type: 'leaseAuditList/fetch',
      payload: formData,
    });
  };

  onTableChange = pagination => {
    this.props.dispatch({
      type: 'leaseAuditList/fetch',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  // selectCallBack = (val, status) => {
  //   if (status === 'ok') {
  //     this.setState({
  //       creator: val,
  //     });
  //   }
  // };

  renderDataForm() {
    if (this.state.dataForm) {
      return (
        <LeaseDetail
          id={this.state.dataFormID}
          type={this.state.dataFormType}
          dataFormInfo={this.state.dataFormInfo}
          callback={this.onDataFormCallback}
        />
      );
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

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

    // ------------------------------

    // 列定义
    const columns = [
      {
        title: '操作',
        fixed: 'left',
        width: 80,
        render: val => (
          <Dropdown
            placement="bottomCenter"
            overlay={
              <Menu>
                <Menu.Item
                  onClick={() => {
                    this.onItemSeeClick(val);
                  }}
                >
                  查看
                </Menu.Item>
              </Menu>
            }
          >
            <Button>操作</Button>
          </Dropdown>
        ),
      },
      {
        title: '标题',
        dataIndex: 'desc.title',
        width: 300,
      },
      {
        title: '房源类型',
        width: 100,
        dataIndex: 'desc.extras.fl',
        render: val => {
          return <DicShow pcode="cms$#infos$#fylx" code={[val]} />;
        },
      },
      {
        title: '发布人昵称（姓名）',
        dataIndex: 'desc.owner',
        width: 100,
        render: val => {
          return <UserShow uid={val} />;
        },
      },
      {
        title: '联系人姓名',
        width: 100,
        dataIndex: 'desc.extras.lxr',
      },
      {
        title: '联系人电话',
        width: 100,
        dataIndex: 'desc.extras.lxdh',
      },
      {
        title: '房源地址',
        width: 100,
        dataIndex: 'desc.extras.fydz',
      },
      {
        title: '房源状态',
        width: 100,
        dataIndex: 'status.status',
        render: val => {
          return <DicShow pcode="cms$#infos$#zlxxstatus" code={[val]} />;
        },
      },
      {
        title: '发布时间',
        dataIndex: 'operator.cre_time',
        width: 240,
        render: val => {
          return <span>{parseUtcTime(val)}</span>;
        },
      },
    ];
    /* 表格数据 */
    const {
      loading,
      leaseAuditList: {
        data: { pagination },
      },
    } = this.props;
    /* 表格底部 */
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => {
        return <span>共{total}条</span>;
      },
      ...pagination,
    };
    return (
      <div>
        <PageHeaderLayout title="租赁信息审核">
          <Card bordered={false} style={{ marginTop: '16px' }}>
            <Form>
              <Row>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="标题">
                    {getFieldDecorator('key', {})(<Input placeholder="请输入标题" />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="房源类型">
                    {getFieldDecorator('house_type', {})(
                      <DicSelect
                        pcode="cms$#infos$#fylx"
                        placeholder="请选择"
                        // selectProps={{
                        //   mode: 'multiple',
                        // }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="发布人">
                    {getFieldDecorator('creator')(<UserSelect />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="联系人姓名">
                    {getFieldDecorator('lxr', {})(<Input placeholder="请输入联系人姓名" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="联系人电话">
                    {getFieldDecorator('lxdh', {})(<Input placeholder="请输入联系人电话" />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="房源地址">
                    {getFieldDecorator('fydz', {})(<Input placeholder="请输入房源地址" />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="房源状态">
                    {getFieldDecorator('status', {
                      initialValue: initialData,
                    })(
                      <DicSelect
                        vmode="int"
                        pcode="cms$#infos$#zlxxstatus"
                        placeholder="请选择"
                        selectProps={{
                          mode: 'multiple',
                        }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout} label="发布日期">
                    {getFieldDecorator('creTime', {
                      rules: [
                        {
                          required: false,
                          message: '选择时间',
                        },
                      ],
                    })(<SchTime isRange />)}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <Button type="primary" onClick={this.onSearchFormSubmit}>
                    查询
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.onBtnClearClick}>
                    重置
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
          <Card bordered={false}>
            <TableList
              pagination={paginationProps}
              dataSource={this.props.leaseAuditList.data.list}
              columns={columns}
              rowKey={record => record.info_id}
              scroll={{ x: 1700 }}
              onChange={this.onTableChange}
              loading={loading}
            />
          </Card>
        </PageHeaderLayout>
        {this.renderDataForm()}
      </div>
    );
  }
}
