import React, { PureComponent } from 'react';
import { Card, Form, Modal, Badge, Button, Input, Select, Radio, notification } from 'antd';
import moment from 'moment';
import * as Service from '@/services/electricInvoices';
import * as invoicePayableService from '@/services/invoicePayable';
import * as electricRechargesService from '@/services/electricRecharges';

import styles from './Edit.less';

const { TextArea } = Input;

@Form.create()
export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      specialShow: false,
      refundShow: false,
      invoice_type: 2,
      redType: 0,
      formData: {},
      taxSelect: {},
      taxs: [],
    };
  }

  componentWillMount() {
    const { editInfo } = this.props;
    this.getTaxs(editInfo.enterprise_id);
  }

  onModalOKClick = () => {};

  getTaxs = id => {
    const Data = { record_id: id };
    invoicePayableService.query(Data).then(res => {
      this.analyse(res.taxs || []);
      this.setState({ taxs: res.taxs || [] });
    });
  };

  // 分析数据
  analyse = taxs => {
    const { editInfo } = this.props;
    if (editInfo.invoice !== null && editInfo.invoice.length > 0) {
      // 第一次开票的信息
      const invoice = editInfo.invoice[0];
      if (invoice.invoice_type === 2) {
        let taxSelect = null;
        // 公司
        taxs.forEach(item => {
          if (invoice.tax_number === item.invoice_number) {
            taxSelect = item;
          }
        });
        if (taxSelect === null && taxs.length > 0) {
          [taxSelect] = taxs;
        }
        this.setState({
          taxSelect,
          formData: {
            address: invoice.address,
            phone: invoice.phone,
            email: invoice.email,
          },
        });
      } else {
        // 个人
        this.setState({
          invoice_type: 1,
          formData: {
            name: invoice.name,
            address: invoice.address,
            phone: invoice.phone,
            email: invoice.email,
          },
        });
      }
    }
  };

  onModalCancelClick = () => {
    const { onClose } = this.props;
    onClose();
  };

  onRadioChange = e => {
    this.setState({ invoice_type: e.target.value });
  };

  create = () => {
    const { editInfo, onSaved } = this.props;
    const { invoice_type, taxSelect } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (invoice_type === 2 && Object.keys(taxSelect).length <= 0) {
          notification.error({
            key: 'error',
            message: '请选择抬头',
            description: `重新为公司开票时，必须选择一个抬头信息!`,
          });
          return false;
        } else {
          const createBody = {
            order_id: editInfo.record_id,
            order_type: 'electric',
            email: values.email,
            address: values.address,
            phone: values.phone,
          };
          if (invoice_type === 2) {
            createBody.invoice_type = 2;
            createBody.account = taxSelect.bank_account;
            createBody.name = taxSelect.invoice_name;
            createBody.tax_number = taxSelect.invoice_number;
          } else if (invoice_type === 1) {
            createBody.invoice_type = 1;
            createBody.tax_number = '';
            createBody.name = values.name;
          }
          Service.create(createBody).then(data => {
            if (data.third_status === 1) {
              onSaved();
              notification.success({
                key: 'success',
                message: '开票成功',
                description: `本订单发票开具成功!`,
              });
            } else {
              notification.error({
                key: 'error',
                message: '开票失败',
                description: data.third_fail_reason,
              });
            }
          });
        }
      }
    });
  };

  // 冲销
  doRed = () => {
    const { editInfo, onSaved } = this.props;
    const { redType, invoice_type, taxSelect } = this.state;
    if (editInfo.invoice !== null && editInfo.invoice.length > 0) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          // 重新开票 且 目标为公司 且 没有选择任何抬头信息
          if (redType === 3 && invoice_type === 2 && Object.keys(taxSelect).length <= 0) {
            notification.error({
              key: 'error',
              message: '请选择抬头',
              description: `重新为公司开票时，必须选择一个抬头信息!`,
            });
            return false;
          } else {
            const redBody = {
              record_id: editInfo.record_id,
              remark: `${values.remark} - ${values.remark_contact}`,
            };
            Service.redinvoice(redBody).then(res => {
              if (res.third_status === 4) {
                notification.success({
                  key: 'success',
                  message: '订单发票冲销成功',
                  description: `本订单发票成功冲销!`,
                });
                if (redType === 3) {
                  //  重新开票
                  const createBody = {
                    order_id: editInfo.record_id,
                    order_type: 'electric',
                    email: values.email,
                    address: values.address,
                    phone: values.phone,
                  };
                  if (invoice_type === 2) {
                    createBody.invoice_type = 2;
                    createBody.account = taxSelect.bank_account;
                    createBody.name = taxSelect.invoice_name;
                    createBody.tax_number = taxSelect.invoice_number;
                  } else if (invoice_type === 1) {
                    createBody.invoice_type = 1;
                    createBody.tax_number = '';
                    createBody.name = values.name;
                  }
                  Service.create(createBody).then(data => {
                    if (data.third_status === 1) {
                      onSaved();
                      notification.success({
                        key: 'success',
                        message: '订单发票重开成功',
                        description: `本订单发票成功重开!`,
                      });
                    }
                  });
                } else {
                  onSaved();
                }
              }
            });
          }
        }
      });
    }
  };

  // 重开发票
  reCreate = () => {
    const { editInfo } = this.props;
    const { invoice_type, taxSelect } = this.state;
    if (editInfo.invoice !== null && editInfo.invoice.length > 0) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const createBody = {
            order_id: editInfo.record_id,
            order_type: 'electric',
            email: values.email,
            address: values.address,
            phone: values.phone,
          };
          if (invoice_type === 2) {
            createBody.invoice_type = 2;
            createBody.account = taxSelect.bank_account;
            createBody.name = taxSelect.invoice_name;
            createBody.tax_number = taxSelect.invoice_number;
          } else if (invoice_type === 1) {
            createBody.invoice_type = 1;
            createBody.tax_number = '';
            createBody.name = values.name;
          }
          Service.create(createBody).then(data => {
            if (data.third_status === 1) {
              notification.success({
                key: 'success',
                message: '订单发票重开成功',
                description: `本订单发票成功重开!`,
              });
            }
          });
        }
      });
    }
  };

  // 关闭冲销
  closeRed = () => {
    this.setState({ redType: 0, refundShow: false, specialShow: false });
  };

  redAndCreate = type => {
    this.setState({
      redType: type,
      refundShow: false,
      specialShow: false,
    });
  };

  selectChangeHandle = ev => {
    this.state.taxs.forEach(item => {
      if (item.record_id === ev) {
        this.setState({ taxSelect: item });
      }
    });
  };

  // 订单退费
  refund = () => {
    const { editInfo } = this.props;
    const invoiceType = editInfo.invoice === null ? 0 : editInfo.invoice.length;
    if (editInfo.invoice === 2 || invoiceType === 0 || invoiceType === 2) {
      this.setState({ redType: 0, refundShow: true, specialShow: false });
    } else {
      notification.error({
        key: 'refund-error',
        message: '不可以退费',
        description: `只有未开发票或者发票已冲销的才可以退费!`,
      });
    }
  };

  // 执行退费
  doRefund = () => {
    const { editInfo, onSaved } = this.props;
    const invoiceType = editInfo.invoice === null ? 0 : editInfo.invoice.length;
    if (editInfo.invoice === 2 || invoiceType === 0 || invoiceType === 2) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const body = {
            record_id: editInfo.record_id,
            memo: `${values.remark} - ${values.remark_contact}`,
          };
          electricRechargesService.payback(body).then(data => {
            if (data.status && data.status === 'OK') {
              notification.success({
                key: 'refund-success',
                message: '订单退费成功',
                description: `订单退费成功!`,
              });
              onSaved();
            }
          });
        }
      });
    } else {
      notification.error({
        key: 'refund-error',
        message: '不可以退费',
        description: `只有未开发票或者发票已冲销的才可以退费!`,
      });
    }
  };

  openInvoice = invoice => {
    if (invoice.third_pdf_url !== '') {
      window.open(invoice.third_pdf_url);
    } else {
      Service.pdf(invoice).then(res => {
        if (res !== '') {
          window.open(res);
        } else {
          notification.success({
            key: 'error',
            message: '无法查看发票',
            description: `发票尚未生成，请耐心等待!`,
          });
        }
      });
    }
  };

  specialInvoiceMark = () => {
    const { editInfo } = this.props;
    const invoiceType = editInfo.invoice === null ? 0 : editInfo.invoice.length;
    if (editInfo.invoice === 2 || invoiceType === 0 || invoiceType === 2) {
      this.setState({ redType: 0, refundShow: false, specialShow: true });
    } else {
      notification.error({
        key: 'special-error',
        message: '不能开具专票',
        description: `只有未开发票或者发票已冲销的才能标记为开具专票!`,
      });
    }
  };

  doSpecialInvoiceMark = () => {
    const { editInfo, onSaved } = this.props;
    const invoiceType = editInfo.invoice === null ? 0 : editInfo.invoice.length;
    if (editInfo.invoice === 2 || invoiceType === 0 || invoiceType === 2) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const body = {
            record_id: editInfo.record_id,
            memo: values.memo,
          };
          electricRechargesService.specialInvoice(body).then(data => {
            if (data.status && data.status === 'OK') {
              notification.success({
                key: 'special-success',
                message: '标记成功',
                description: `本订单已标记为已开专票!`,
              });
              onSaved();
            }
          });
        }
      });
    } else {
      notification.error({
        key: 'special-error',
        message: '不能开具专票',
        description: `只有未开发票或者发票已冲销的才能标记为开具专票!`,
      });
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
      editVisible,
      editInfo,
    } = this.props;
    const {
      redType,
      refundShow,
      specialShow,
      formData,
      invoice_type,
      taxs,
      taxSelect,
    } = this.state;
    const invoiceType = editInfo.invoice === null ? 0 : editInfo.invoice.length;

    return (
      <React.Fragment>
        <Modal
          key="modal-info"
          title="电费缴费订单详情"
          width={1000}
          visible={editVisible}
          maskClosable={false}
          onCancel={this.onModalCancelClick}
          footer={
            editInfo.pay_status !== 2 ||
            editInfo.is_payback !== 0 ||
            editInfo.special_invoice === 2 ? (
              <Button
                key="close"
                onClick={() => {
                  this.onModalCancelClick();
                }}
              >
                关闭
              </Button>
            ) : (
              {
                0: [
                  <Button
                    key="mark"
                    onClick={() => {
                      this.specialInvoiceMark();
                    }}
                  >
                    标记开专票
                  </Button>,
                  <Button
                    key="create"
                    type="primary"
                    onClick={() => {
                      this.redAndCreate(1);
                    }}
                  >
                    补开发票
                  </Button>,
                  <Button
                    key="red"
                    type="danger"
                    onClick={() => {
                      this.refund();
                    }}
                  >
                    将此单退费
                  </Button>,
                ],
                1: [
                  <Button
                    key="red"
                    type="danger"
                    onClick={() => {
                      this.redAndCreate(2);
                    }}
                  >
                    冲销此单发票
                  </Button>,
                  <Button
                    key="rec"
                    onClick={() => {
                      this.redAndCreate(3);
                    }}
                    type="primary"
                  >
                    冲销并重开此单发票
                  </Button>,
                ],
                2: [
                  <Button
                    key="mark"
                    onClick={() => {
                      this.specialInvoiceMark();
                    }}
                  >
                    标记开专票
                  </Button>,
                  <Button
                    key="red"
                    type="danger"
                    onClick={() => {
                      this.refund();
                    }}
                  >
                    将此单退费
                  </Button>,
                ],
                3: (
                  <Button
                    key="close"
                    onClick={() => {
                      this.onModalCancelClick();
                    }}
                  >
                    关闭
                  </Button>
                ),
              }[invoiceType]
            )
          }
        >
          <Card bordered={false} className={styles.card}>
            <h4>
              缴费详情
              {editInfo.is_payback === 1 && <small style={{ color: 'red' }}>已退费</small>}
              {editInfo.special_invoice === 2 && <small style={{ color: 'red' }}>已开专票</small>}
            </h4>
            <table className={styles.border}>
              <tbody>
                <tr>
                  <th>订单ID</th>
                  <td>{editInfo.order_id}</td>
                  <th>创建时间</th>
                  <td>{moment(editInfo.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                </tr>
                <tr>
                  <th>充值人</th>
                  <td>{editInfo.creator_name}</td>
                  <th>充值人手机号</th>
                  <td>{editInfo.creator_tel}</td>
                </tr>
                <tr>
                  <th>充值人所在公司</th>
                  <td colSpan={3}>{editInfo.enterprise && editInfo.enterprise.name}</td>
                </tr>
                <tr>
                  <th>支付状态</th>
                  <td>
                    {
                      {
                        1: <Badge color="yellow" text="支付中" />,
                        2: <Badge color="green" text="支付成功" />,
                        3: <Badge color="red" text="支付失败" />,
                      }[editInfo.pay_status]
                    }
                  </td>
                  <th>支付方式</th>
                  <td>
                    {
                      {
                        alipay_app: <Badge color="blue" text="支付宝" />,
                        wechat_app: <Badge color="green" text="微信" />,
                      }[editInfo.payment_method]
                    }
                  </td>
                </tr>
                <tr>
                  <th>发票开票状态</th>
                  <td>
                    {editInfo.special_invoice === 2 ? (
                      <Badge color="green" text="已开票【专票】" />
                    ) : (
                      {
                        0: <Badge color="yellow" text="未开票" />,
                        1: <Badge color="green" text="已开票【普票】" />,
                        2: <Badge color="orange" text="已冲销" />,
                        3: <Badge color="blue" text="已重开" />,
                      }[invoiceType]
                    )}
                  </td>
                  <th>电子发票开票ID</th>
                  <td>{editInfo.billing_id}</td>
                </tr>
                <tr>
                  <th>支付时间</th>
                  <td>
                    {editInfo.payment_method === 'alipay_app' ||
                    editInfo.payment_method === 'wechat_app' ? (
                      moment(editInfo.pay_time).format('YYYY-MM-DD HH:mm:ss')
                    ) : editInfo.pay_status === 3 ? (
                      <Badge color="red" text="支付失败" />
                    ) : (
                      <Badge color="red" text="未支付" />
                    )}
                  </td>
                  <th>充值金额</th>
                  <td>{(editInfo.amount / 100).toFixed(2)} 元</td>
                </tr>
                {editInfo.is_payback === 1 &&
                  editInfo.payback_histories &&
                  editInfo.payback_histories.map(item => {
                    return (
                      <tr>
                        <th style={{ color: 'red' }}>退费备注</th>
                        <td>{item.memo}</td>
                        <th style={{ color: 'red' }}>退费时间</th>
                        <td>{moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <h4>本单电表充值详情</h4>
            {editInfo.details &&
              editInfo.details.map(item => {
                return (
                  <table className={styles.border}>
                    <tbody>
                      <tr>
                        <th>记录编号</th>
                        <td colSpan={3}>{item.record_id}</td>
                      </tr>
                      <tr>
                        <th>门牌号</th>
                        <td>{item.room_name}</td>
                        <th>电表名</th>
                        <td>{item.electric_meter_name}</td>
                      </tr>
                      <tr>
                        <th>电表号</th>
                        <td>{item.electric_meter_addr}</td>
                        <th>充值金额</th>
                        <td>{(item.amount / 100).toFixed(2)} 元</td>
                      </tr>
                      <tr>
                        <th>充值前金额</th>
                        <td>{item.before_amount} 元</td>
                        <th>充值后金额</th>
                        <td>{item.after_amount} 元</td>
                      </tr>
                      <tr>
                        <th>第三方充值状态</th>
                        <td>
                          {
                            {
                              1: <Badge color="yellow" text="超时" />,
                              2: <Badge color="green" text="成功" />,
                              3: <Badge color="red" text="失败" />,
                            }[item.third_status]
                          }
                        </td>
                        <th>失败原因</th>
                        <td>{item.third_fail_reason}</td>
                      </tr>
                    </tbody>
                  </table>
                );
              })}
            {editInfo.invoice !== null && editInfo.invoice.length > 0 && (
              <React.Fragment>
                <h4 key="invoice-title" style={{ overflow: 'hidden' }}>
                  本单开票信息
                  {editInfo.invoice.length > 1 && (
                    <small style={{ color: 'red' }}> 发票已冲销</small>
                  )}
                  <Button
                    type="primary"
                    style={{ float: 'right' }}
                    onClick={() => {
                      this.openInvoice(editInfo.invoice[0]);
                    }}
                  >
                    查看发票
                  </Button>
                </h4>
                <table key="invoice-table" className={styles.border}>
                  <tbody>
                    <tr>
                      <th>抬头</th>
                      <td>{editInfo.invoice[0].name}</td>
                      <th>税号</th>
                      <td>{editInfo.invoice[0].tax_number}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{editInfo.invoice[0].email}</td>
                      <th>手机号</th>
                      <td>{editInfo.invoice[0].phone}</td>
                    </tr>
                    <tr>
                      <th>地址</th>
                      <td colSpan={3}>{editInfo.invoice[0].address}</td>
                    </tr>
                    <tr>
                      <th>开户行及账号</th>
                      <td colSpan={3}>{editInfo.invoice[0].account}</td>
                    </tr>
                    <tr>
                      <th>发票代码</th>
                      <td>{editInfo.invoice[0].third_fpdm}</td>
                      <th>发票号码</th>
                      <td>{editInfo.invoice[0].third_fphm}</td>
                    </tr>
                  </tbody>
                </table>
              </React.Fragment>
            )}
            {editInfo.invoice && editInfo.invoice.length > 1 && (
              <React.Fragment>
                <h4 style={{ overflow: 'hidden' }}>
                  本单冲销信息
                  <Button
                    type="primary"
                    style={{ float: 'right' }}
                    onClick={() => {
                      this.openInvoice(editInfo.invoice[1]);
                    }}
                  >
                    查看发票
                  </Button>
                </h4>
                <table className={styles.border}>
                  <tbody>
                    <tr>
                      <th>冲销备注</th>
                    </tr>
                    <tr>
                      <td>{editInfo.invoice[1].third_red_status_remark}</td>
                    </tr>
                    <tr>
                      <th>操作时间</th>
                    </tr>
                    <tr>
                      <td>
                        {moment(editInfo.invoice[1].created_at).format('YYYY-MM-DD HH:mm:ss')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </React.Fragment>
            )}
            {editInfo.invoice && editInfo.invoice.length > 2 && (
              <React.Fragment>
                <h4 style={{ overflow: 'hidden' }}>
                  发票重开信息
                  <Button
                    type="primary"
                    style={{ float: 'right' }}
                    onClick={() => {
                      this.openInvoice(editInfo.invoice[2]);
                    }}
                  >
                    查看发票
                  </Button>
                </h4>
                <table className={styles.border}>
                  <tbody>
                    <tr>
                      <th>抬头</th>
                      <td>{editInfo.invoice[2].name}</td>
                      <th>税号</th>
                      <td>{editInfo.invoice[2].tax_number}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{editInfo.invoice[2].email}</td>
                      <th>手机号</th>
                      <td>{editInfo.invoice[2].phone}</td>
                    </tr>
                    <tr>
                      <th>地址</th>
                      <td colSpan={3}>{editInfo.invoice[2].address}</td>
                    </tr>
                    <tr>
                      <th>开户行及账号</th>
                      <td colSpan={3}>{editInfo.invoice[2].account}</td>
                    </tr>
                    <tr>
                      <th>发票代码</th>
                      <td>{editInfo.invoice[2].third_fpdm}</td>
                      <th>发票号码</th>
                      <td>{editInfo.invoice[2].third_fphm}</td>
                    </tr>
                  </tbody>
                </table>
              </React.Fragment>
            )}
            {editInfo.special_invoice === 2 && (
              <div key="special">
                <h4>专票标记操作</h4>
                <div style={{ fontSize: '16px' }}>{editInfo.special_invoice_memo}</div>
              </div>
            )}
          </Card>
        </Modal>
        {(redType === 1 || redType === 2 || redType === 3) && (
          <Modal
            key="modal-red"
            title={(() => {
              switch (redType) {
                case 1:
                  return '补开发票';
                case 2:
                  return '冲销发票';
                case 3:
                  return '冲销并重开发票';
                default:
                  return '';
              }
            })()}
            width={600}
            visible={redType === 1 || redType === 2 || redType === 3}
            okText={(() => {
              switch (redType) {
                case 1:
                  return '补开发票';
                case 2:
                  return '冲销发票';
                case 3:
                  return '冲销并重开发票';
                default:
                  return '';
              }
            })()}
            cancelText="关闭"
            onOk={redType === 1 ? this.create : this.doRed}
            onCancel={this.closeRed}
          >
            <Card bordered={false} className={styles.card}>
              <Form labelAlign="left" className={styles.form}>
                <table className={styles.table}>
                  <tbody>
                    {(redType === 2 || redType === 3) && [
                      <tr key="remark-1">
                        <td colSpan={2}>
                          <Form.Item className={styles.item}>
                            {getFieldDecorator('remark', {
                              initialValue: formData.remark,
                              rules: [
                                {
                                  required: true,
                                  message: '请输入冲销发票的原因',
                                },
                              ],
                            })(<TextArea placeholder="请输入冲销发票的原因" />)}
                          </Form.Item>
                        </td>
                      </tr>,
                      <tr key="remark-2">
                        <td colSpan={2}>
                          <Form.Item className={styles.item}>
                            {getFieldDecorator('remark_contact', {
                              rules: [
                                {
                                  required: true,
                                  message: '请输入您的姓名和电话',
                                },
                              ],
                            })(<Input placeholder="请输入您的姓名和电话" />)}
                          </Form.Item>
                        </td>
                      </tr>,
                    ]}
                    {(redType === 1 || redType === 3) && (
                      <React.Fragment>
                        <tr key="invoice_type">
                          <th>&nbsp;</th>
                          <td>
                            <Radio.Group onChange={this.onRadioChange} value={invoice_type}>
                              <Radio value={2}>公司</Radio>
                              <Radio value={1}>个人</Radio>
                            </Radio.Group>
                          </td>
                        </tr>
                        {invoice_type === 2 ? (
                          <React.Fragment>
                            <tr key="tr-com">
                              <th>名称</th>
                              <td>
                                <Form.Item className={styles.item}>
                                  <Select
                                    placeholder="请选择公司"
                                    value={taxSelect.record_id}
                                    onChange={event => {
                                      this.selectChangeHandle(event);
                                    }}
                                  >
                                    {taxs &&
                                      taxs.length > 0 &&
                                      taxs.map(item => {
                                        return (
                                          <Select.Option
                                            key={item.record_id}
                                            value={item.record_id}
                                          >
                                            {item.invoice_name}
                                          </Select.Option>
                                        );
                                      })}
                                  </Select>
                                </Form.Item>
                              </td>
                            </tr>
                            <tr key="tr-tax">
                              <th>税号</th>
                              <td>
                                <Form.Item className={styles.item}>
                                  <Input
                                    placeholder="企业税号"
                                    readOnly
                                    value={taxSelect.invoice_number}
                                  />
                                </Form.Item>
                              </td>
                            </tr>
                            <tr key="tr-account">
                              <th>开户行及账号</th>
                              <td>
                                <Form.Item className={styles.item}>
                                  <Input
                                    placeholder="开户行及账号"
                                    readOnly
                                    value={taxSelect.bank_account}
                                  />
                                </Form.Item>
                              </td>
                            </tr>
                            <tr key="tr-email-c">
                              <th>电子邮箱</th>
                              <td>
                                <Form.Item className={styles.item}>
                                  {getFieldDecorator('email', {
                                    initialValue: formData.email,
                                    rules: [
                                      {
                                        required: true,
                                        pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                                        message: '此用来接收电子发票的邮箱！',
                                      },
                                    ],
                                  })(<Input placeholder="此用来接收电子发票的邮箱" />)}
                                </Form.Item>
                              </td>
                            </tr>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <tr key="tr-name">
                              <th>姓名</th>
                              <td>
                                <Form.Item className={styles.item}>
                                  {getFieldDecorator('name', {
                                    initialValue: formData.name,
                                    rules: [
                                      {
                                        required: true,
                                        message: '请输入用户名！',
                                      },
                                    ],
                                  })(<Input placeholder="请输入用户名" />)}
                                </Form.Item>
                              </td>
                            </tr>
                            <tr key="tr-email-p">
                              <th>电子邮箱</th>
                              <td>
                                <Form.Item className={styles.item}>
                                  {getFieldDecorator('email', {
                                    initialValue: formData.email,
                                    rules: [
                                      {
                                        required: true,
                                        pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                                        message: '此用来接收电子发票的邮箱！',
                                      },
                                    ],
                                  })(<Input placeholder="此用来接收电子发票的邮箱" />)}
                                </Form.Item>
                              </td>
                            </tr>
                          </React.Fragment>
                        )}
                        <tr key="tr-address">
                          <th>单位地址</th>
                          <td>
                            <Form.Item className={styles.item}>
                              {getFieldDecorator('address', {
                                initialValue: formData.address,
                                rules: [
                                  {
                                    message: '请输入单位地址！',
                                  },
                                ],
                              })(<Input placeholder="请输入单位地址" />)}
                            </Form.Item>
                          </td>
                        </tr>
                        <tr key="tr-phone">
                          <th>联系电话</th>
                          <td>
                            <Form.Item className={styles.item}>
                              {getFieldDecorator('phone', {
                                initialValue: formData.phone,
                                rules: [
                                  {
                                    required: true,
                                    pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
                                    message: '请输入正确的手机号码！',
                                  },
                                ],
                              })(<Input placeholder="手机号码" />)}
                            </Form.Item>
                          </td>
                        </tr>
                        <tr key="tr-amount">
                          <th>票面金额</th>
                          <td>{editInfo && (editInfo.amount / 100).toFixed(2)} 元</td>
                        </tr>
                      </React.Fragment>
                    )}
                  </tbody>
                </table>
              </Form>
            </Card>
          </Modal>
        )}
        {refundShow && (
          <Modal
            key="modal-refund"
            title="订单退费"
            width={600}
            visible={refundShow}
            okText="订单退费"
            cancelText="关闭"
            onOk={this.doRefund}
            onCancel={this.closeRed}
          >
            <Card bordered={false} className={styles.card}>
              <Form labelAlign="left" className={styles.form}>
                <table className={styles.table}>
                  <tbody>
                    <tr key="refund-remark-1">
                      <td colSpan={2}>
                        <Form.Item className={styles.item}>
                          {getFieldDecorator('remark', {
                            initialValue: formData.remark,
                            rules: [
                              {
                                required: true,
                                message: '请输入退费的原因',
                              },
                            ],
                          })(<TextArea placeholder="请输入退费的原因" />)}
                        </Form.Item>
                      </td>
                    </tr>
                    <tr key="refund-remark-2">
                      <td colSpan={2}>
                        <Form.Item className={styles.item}>
                          {getFieldDecorator('remark_contact', {
                            rules: [
                              {
                                required: true,
                                message: '请输入您的姓名和电话',
                              },
                            ],
                          })(<Input placeholder="请输入您的姓名和电话" />)}
                        </Form.Item>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Form>
            </Card>
          </Modal>
        )}
        {specialShow && (
          <Modal
            key="modal-special"
            title="将本单标记为已开专票"
            width={600}
            visible={specialShow}
            okText="标记为已开专票"
            cancelText="关闭"
            onOk={this.doSpecialInvoiceMark}
            onCancel={this.closeRed}
          >
            <Card bordered={false} className={styles.card}>
              <Form labelAlign="left" className={styles.form}>
                <table className={styles.table}>
                  <tbody>
                    <tr key="special-memo">
                      <td colSpan={2}>
                        <Form.Item className={styles.item}>
                          {getFieldDecorator('memo', {
                            initialValue: formData.remark,
                            rules: [
                              {
                                required: true,
                                message: '请输入您的姓名',
                              },
                            ],
                          })(<TextArea placeholder="请输入您的姓名" />)}
                        </Form.Item>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Form>
            </Card>
          </Modal>
        )}
      </React.Fragment>
    );
  }
}
