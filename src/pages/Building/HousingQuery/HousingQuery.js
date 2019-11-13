import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Table, Select } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import ParkSelect from '@/components/ParkList/ParkSelect';
import TagSelect from '@/components/TagSelect';
import AreaInput from '@/components/AreaInput/AreaInput';
import StandardFormRow from '@/components/StandardFormRow';
import styles from './HousingQuery.less';

const { Option } = Select;

@connect(state => ({
  building: state.building,
  loading: state.loading.models.building,
}))
@Form.create()
class HousingQuery extends PureComponent {
  componentDidMount() {
    // query({ q: 'select' }).then(data => {
    //   this.setState({ data: data.list || [] });
    // });
  }

  // renderDataForm() {
  //   // return <ParkCard onCancel={this.handleDataFormCancel} onSubmit={this.handleDataFormSubmit} />;
  // }

  handleResetFormClick = () => {
    const { form } = this.props;
    form.resetFields();

    // this.dispatch({
    //   type: 'role/fetch',
    //   search: {},
    //   pagination: {},
    // });
  };

  handleSearchFormSubmit = e => {
    if (e) {
      e.preventDefault();
    }

    const { form } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (err) {
        return false;
      }

      values.floor_area = `${values.floor_area1 ? values.floor_area1 : ''}${
        values.floor_area1 ? ',' : ''
      }${values.floor_area2 ? values.floor_area2 : ''}`;
      values.retal_area = `${values.retal_area1 ? values.retal_area1 : ''}${
        values.retal_area1 ? ',' : ''
      }${values.retal_area2 ? values.retal_area2 : ''}`;
      if (values.self_use) {
        if (values.self_use.length === 0 && values.self_use.length === 2) {
          values.self_use = undefined;
        } else {
          values.self_use = values.self_use.join(',');
        }
      }
      if (values.sale_status) {
        if (values.sale_status.length === 0 && values.sale_status.length === 3) {
          values.sale_status = undefined;
        } else {
          values.sale_status = values.sale_status.join(',');
        }
      }
      if (values.rental_status) {
        if (values.rental_status.length === 0 && values.rental_status.length === 4) {
          values.rental_status = undefined;
        } else {
          values.rental_status = values.rental_status.join(',');
        }
      }

      delete values.floor_area1;
      delete values.floor_area2;
      delete values.retal_area1;
      delete values.retal_area2;
      this.props.dispatch({
        type: 'building/fetch',
        search: values,
        pagination: {},
      });
    });
  };

  handleTableChange = pagination => {
    this.props.dispatch({
      type: 'building/fetch',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  // 规划用途: 1:出售 2:自持 3:混合
  planPurpose = status => {
    switch (status) {
      case 1:
        return '出售';
      case 2:
        return '自持';
      case 3:
        return '混合';
      default:
        return '';
    }
  };

  renderSearchForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const actionsTextMap = {
      selectAllText: <FormattedMessage id="component.tagSelect.all" defaultMessage="全部" />,
    };
    const InputGroup = Input.Group;
    // Item布局
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    return (
      <Form onSubmit={this.handleSearchFormSubmit}>
        <Row>
          <Col span={4}>
            <Form.Item {...formItemLayout} label="园区">
              {getFieldDecorator('park')(<ParkSelect />)}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item {...formItemLayout} label="建筑类型">
              {getFieldDecorator('btype')(
                <Select defaultValue="整栋">
                  <Option value={80}>整栋</Option>
                  <Option value={60}>整层</Option>
                  <Option value={50}>门牌</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item {...formItemLayout} label="门牌号">
              {getFieldDecorator('code')(<Input placeholder="请输入门牌号" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="建筑面积">
              <InputGroup compact>
                {getFieldDecorator('floor_area1')(
                  <AreaInput style={{ textAlign: 'center' }} placeholder="最小面积" />
                )}
                <Input
                  style={{
                    width: 30,
                    borderLeft: 0,
                    pointerEvents: 'none',
                    backgroundColor: '#fff',
                  }}
                  placeholder="~"
                  disabled
                />
                {getFieldDecorator('floor_area2')(
                  <AreaInput
                    style={{ textAlign: 'center', borderLeft: 0 }}
                    placeholder="最大面积"
                  />
                )}
              </InputGroup>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8} style={{ height: '32px' }}>
            <StandardFormRow
              title="销售状态"
              block
              style={{ borderBottom: '0px', paddingBottom: '0px', marginBottom: '0px' }}
            >
              <Form.Item>
                {getFieldDecorator('sale_status')(
                  <TagSelect actionsText={actionsTextMap}>
                    <TagSelect.Option value={2}>未售</TagSelect.Option>
                    <TagSelect.Option value={1}>已售</TagSelect.Option>
                    <TagSelect.Option value={3}>部分已售</TagSelect.Option>
                    <TagSelect.Option value={4}>锁定</TagSelect.Option>
                  </TagSelect>
                )}
              </Form.Item>
            </StandardFormRow>
          </Col>
          <Col span={8} style={{ height: '32px' }}>
            <StandardFormRow
              title="出租状态"
              block
              style={{ borderBottom: '0px', paddingBottom: '0px', marginBottom: '0px' }}
            >
              <Form.Item>
                {getFieldDecorator('rental_status')(
                  <TagSelect actionsText={actionsTextMap}>
                    <TagSelect.Option value={2}>未租</TagSelect.Option>
                    <TagSelect.Option value={1}>已租</TagSelect.Option>
                    <TagSelect.Option value={3}>部分已租</TagSelect.Option>
                  </TagSelect>
                )}
              </Form.Item>
            </StandardFormRow>
          </Col>
          <Col span={8} style={{ height: '32px' }}>
            <StandardFormRow
              title="自用状态"
              block
              style={{ borderBottom: '0px', paddingBottom: '0px', marginBottom: '0px' }}
            >
              <Form.Item>
                {getFieldDecorator('self_use')(
                  <TagSelect actionsText={actionsTextMap}>
                    <TagSelect.Option value={1}>是</TagSelect.Option>
                    <TagSelect.Option value={0}>否</TagSelect.Option>
                  </TagSelect>
                )}
              </Form.Item>
            </StandardFormRow>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="使用面积">
              <InputGroup compact>
                {getFieldDecorator('retal_area1')(
                  <AreaInput style={{ textAlign: 'center' }} placeholder="最小面积" />
                )}
                <Input
                  style={{
                    width: 30,
                    borderLeft: 0,
                    pointerEvents: 'none',
                    backgroundColor: '#fff',
                  }}
                  placeholder="~"
                  disabled
                />
                {getFieldDecorator('retal_area2')(
                  <AreaInput
                    style={{ textAlign: 'center', borderLeft: 0 }}
                    placeholder="最大面积"
                  />
                )}
              </InputGroup>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <div style={{ overflow: 'hidden' }}>
              <span style={{ marginBottom: 24 }}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleResetFormClick}>
                  重置
                </Button>
              </span>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      loading,
      building: {
        data: { list, pagination },
      },
    } = this.props;

    const columns = [
      {
        title: '楼栋',
        dataIndex: 'building_name',
        width: 200,
      },
      {
        title: '楼层',
        dataIndex: 'floor_name',
        width: 200,
      },
      {
        title: '门牌号',
        dataIndex: 'room_name',
        width: 200,
      },
      {
        title: '产权人',
        dataIndex: 'building_sale',
        width: 300,
        render: value => {
          return <span>{value ? value.owner_name : null}</span>;
        },
      },
      {
        title: '产权人联系方式',
        dataIndex: 'contact',
        width: 200,
        render: value => {
          return <span>{value ? value.contact_tel : null}</span>;
        },
      },
      {
        title: '使用人',
        dataIndex: 'building_rental',
        width: 300,
        render: value => {
          return <span>{value ? value.contacter : null}</span>;
        },
      },
      {
        title: '使用人联系方式',
        dataIndex: 'contact',
        width: 200,
        render: value => {
          return <span>{value ? value.contact_tel : null}</span>;
        },
      },
      {
        title: '企业',
        dataIndex: 'enterprise',
        width: 200,
        render: value => {
          return <span>{value ? value.name : null}</span>;
        },
      },
      {
        title: '规划用途',
        dataIndex: 'planned_use',
        width: 200,
        render: val => {
         return  this.planPurpose(val);
        },
      },
      {
        title: '状态',
        dataIndex: 'contact',
        width: 200,
      },
      {
        title: '建筑面积（㎡）',
        dataIndex: 'floor_area',
        width: 200,
      },
      {
        title: '使用面积（㎡）',
        dataIndex: 'usage_area',
        width: 200,
      },
      {
        title: '计费面积（㎡）',
        dataIndex: 'billing_area',
        width: 200,
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => <span>共{total}条</span>,
      ...pagination,
    };

    return (
      <div className={styles.topHead}>房源查询</div>,
      (
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSearchForm()}</div>
            <div className="lightTable" style={{ marginTop: '24px' }}>
              <Table
                loading={loading}
                rowKey={record => record.record_id}
                dataSource={list}
                columns={columns}
                pagination={paginationProps}
                scroll={{ x: 1300 }}
                onChange={this.handleTableChange}
              />
            </div>
          </div>
          {/* {this.renderDataForm()} */}
        </Card>
      )
    );
  }
}

export default HousingQuery;
