import React, { PureComponent } from 'react';
import { Alert, Card, Col, Form, Input, Modal, notification, Row, Table } from 'antd';

import PButton from '@/components/PermButton';

import styles from './Edit.less';
import * as Service from '@/services/invoicePayable';

@Form.create()
export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      company: {},
      editType: '',
      loading: false,
      editTax: {
        enterprise_id: '',
        invoice_name: '',
        invoice_number: '',
        bank_account: '',
        record_id: '',
      },
    };
  }

  componentWillMount() {
    this.getCompany();
  }

  getCompany = () => {
    this.setState({ loading: true });
    const { Data } = this.props;
    Service.query(Data).then(res => {
      this.setState({ company: res || {}, loading: false });
    });
  };

  onModalOKClick = () => {
    const { onSaved } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = {
          ...values,
          record_id: this.state.formData.record_id,
        };
        Service.update(formData).then(res => {
          if (res && !res.error) {
            onSaved(formData);
          }
        });
      }
    });
  };

  onManageCancelClick = () => {
    const { onClose } = this.props;
    onClose();
  };

  editTax = item => {
    this.setState({
      editTax: item,
      editType: 'edit',
    });
  };

  saveTax = () => {
    const { onSaved } = this.props;
    const { company, editTax } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = {
          ...editTax,
          enterprise_id: company.record_id,
          invoice_name: values.invoice_name,
          invoice_number: values.invoice_number,
          bank_account: values.bank_account,
        };
        if (this.state.editType === 'add') {
          Service.create(formData).then(res => {
            if(res && !res.error){
              notification.success({
                message: '保存成功',
              });
              this.getCompany();
              this.editCancelClick();
            }
          });
        }
        if (this.state.editType === 'edit') {
          Service.update(formData).then(res => {
            if(res && !res.error) {
              notification.success({
                message: '保存成功',
              });
              onSaved();
              this.getCompany();
              this.editCancelClick();
            }
          });
        }
      } else {
        notification.error({
          message: '保存失败',
          description: '请确保您填写的数据没有异常！',
        });
      }
    });
  };

  editCancelClick = () => {
    this.setState({
      editType: '',
      editTax: {
        enterprise_id: '',
        invoice_name: '',
        invoice_number: '',
        bank_account: '',
        record_id: '',
      },
    });
  };

  addTax = () => {
    this.setState({
      editType: 'add',
      editTax: {
        enterprise_id: '',
        invoice_name: '',
        invoice_number: '',
        bank_account: '',
        record_id: '',
      },
    });
  };

  deleteTax = tax => {
    const { onSaved } = this.props;
    Modal.confirm({
      title: `确定删除此抬头信息？`,
      content: (
        <p>
          {tax.invoice_name} / {tax.invoice_number}
        </p>
      ),
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        Service.del(tax).then(res => {
          if (res && res.status) {
            notification.success({
              message: '删除成功！',
            });
            this.getCompany();
            onSaved();
          }
        });
      },
    });
  };

  columns = () => [
    {
      title: '抬头信息',
      dataIndex: 'invoice_name',
      width: 300,
      render: (_, item) => {
        return (
          <Alert
            key={item.record_id}
            message={[
              <div key={`${item.record_id}-invoice_name`}>
                <b>抬头</b>：{item.invoice_name}
              </div>,
              <div key={`${item.record_id}-invoice_number`}>
                <b>税号</b>：{item.invoice_number}
              </div>,
              <div key={`${item.record_id}-bank_account`}>
                <b>开户行及账户</b>：{item.bank_account}
              </div>,
            ]}
          />
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'record_id',
      width: 100,
      render: (_, item) => [
        <PButton key="save" code="save" icon="edit" onClick={() => this.editTax(item)}>
          编辑
        </PButton>,
        <PButton
          key="del"
          code="del"
          icon="delete"
          type="danger"
          onClick={() => this.deleteTax(item)}
        >
          删除
        </PButton>,
      ],
    },
  ];

  render() {
    const { company, loading, editType, editTax } = this.state;
    const {
      form: { getFieldDecorator },
      editVisible,
    } = this.props;
    const formItemLayout = {
      labelAlign: 'left',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
    };
    const col = {
      sm: 23,
      md: 23,
      offset: 1,
    };
    return [
      <Modal
        key="manage"
        title="维护开票信息"
        width={1000}
        maskClosable={false}
        visible={editVisible}
        cancelText="关闭"
        onOk={this.onManageCancelClick}
        onCancel={this.onManageCancelClick}
      >
        <Card bordered={false} className={styles.card}>
          <Row>
            <Col {...col}>
              <Form.Item label="企业名称">
                <Input placeholder="企业名称" value={company.name || ''} readOnly />
              </Form.Item>
            </Col>
            <Col {...col}>
              <PButton key="add" code="add" icon="edit" onClick={() => this.addTax()}>
                新增抬头
              </PButton>
            </Col>
            <Col {...col}>
              <Table
                scroll={{ x: true, y: true }}
                loading={loading}
                rowKey={record => record.record_id}
                dataSource={company.taxs}
                columns={this.columns()}
              />
            </Col>
          </Row>
        </Card>
      </Modal>,
      (editType === 'add' || editType === 'edit') && (
        <Modal
          key="edit"
          title={editType === 'add' ? '新增开票信息' : '编辑开票信息'}
          width={600}
          visible={editType === 'add' || editType === 'edit'}
          okText={editType === 'add' ? '保存新增' : '保存修改'}
          cancelText={editType === 'add' ? '取消新增' : '取消修改'}
          onOk={this.saveTax}
          onCancel={this.editCancelClick}
        >
          <Card>
            <Form {...formItemLayout}>
              <Form.Item label="发票抬头">
                {getFieldDecorator('invoice_name', {
                  initialValue: editTax.invoice_name,
                  rules: [{ required: true, message: '发票抬头必须输入' }],
                })(<Input placeholder="发票抬头" />)}
              </Form.Item>
              <Form.Item label="税号">
                {getFieldDecorator('invoice_number', {
                  initialValue: editTax.invoice_number,
                  rules: [
                    {
                      required: true,
                      min: 6,
                      max: 20,
                      message: '税号必须输入，且必须在6-20位之间！',
                    },
                  ],
                })(<Input placeholder="税号" />)}
              </Form.Item>
              <Form.Item label="开户行及账号">
                {getFieldDecorator('bank_account', {
                  initialValue: editTax.bank_account,
                  rules: [
                    {
                      required: false,
                      message: '开户行及账号必须输入！',
                    },
                  ],
                })(<Input placeholder="开户行及账号" />)}
              </Form.Item>
            </Form>
          </Card>
        </Modal>
      ),
    ];
  }
}
