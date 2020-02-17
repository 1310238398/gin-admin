import React, { PureComponent } from 'react';
import {
  Card,
  Form,
  Input,
  Table,
  Badge,
  Select,
  DatePicker,
  Button,
  Modal,
  notification,
} from 'antd';
import moment from 'moment';
import Edit from './Edit';

import styles from './index.less';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { SearchCard, SearchItem } from '../../../components/SearchCard';
import * as Service from '@/services/electricInvoices';
import { DicSelect } from '@/components/Dictionary';
import { DicShow } from '@/components/Dictionary';

import * as electricRechargesService from '@/services/electricRecharges';

const { RangePicker } = DatePicker;

/**
 * 电费缴费流水管理
 * */
@Form.create()
export default class extends PureComponent {
  state = {
    loading: true,
    editVisible: false,
    editInfo: null,
    selectedRowKeys: [],
    selectedRows: [],
    data: {
      list: [],
      pagination: {},
    },
  };

  pageSize = 6;

  current = 1;

  componentWillMount() {
    this.getList();
  }

  getList = reset => {
    this.setState({ loading: true });
    const formData = this.props.form.getFieldsValue();
    if (formData && formData.date) {
      const startTime = formData.date[0].format('YYYY-MM-DDTHH:mm:ssZ');
      const endTime = formData.date[1].format('YYYY-MM-DDTHH:mm:ssZ');
      delete formData.date;
      formData.startTime = startTime;
      formData.endTime = endTime;
    }
    if (reset) this.current = 1;
    this.setState({ editInfo: null });
    const searchData = {
      q: 'page',
      pageSize: this.pageSize,
      current: this.current,
      ...formData,
    };
    electricRechargesService.query(searchData).then(res => {
      this.setState({
        loading: false,
        data: res,
        selectedRowKeys: [],
        selectedRows: [],
      });
    });
  };

  onItemEditClick = info => {
    this.setState({ editInfo: { ...info } }, () => {
      this.setState({ editVisible: true });
    });
  };

  onItemDeleteClick = info => {
    Modal.confirm({
      title: `确定删除项目【${info.name}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        Service.del(info).then(res => {
          if (res && !res.error) {
            notification.success({
              key: 'itemDelete',
              message: '项目删除成功',
              description: `项目【${info.name}】已经删除!`,
            });
            this.getList();
          }
        });
      },
    });
  };

  onClose = () => {
    this.setState({ editVisible: false });
    this.clearSelectRows();
  };

  clearSelectRows = () => {
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys.length === 0) {
      return;
    }
    this.setState({ selectedRowKeys: [], selectedRows: [] });
  };

  onSaved = info => {
    if (info) {
      this.setState({ editVisible: false, editInfo: null }, () => {
        this.getList();
      });
    } else {
      this.setState({ editVisible: false, editInfo: null }, () => {
        this.getList();
      });
    }
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

  onResetFormClick = () => {
    this.props.form.resetFields();
    this.getList();
  };

  onTableChange = event => {
    this.current = event.current;
    this.pageSize = event.pageSize;
    this.getList();
  };

  columns = () => [
    {
      title: '订单ID',
      dataIndex: 'order_id',
      width: 220,
      render: val => val,
    },
    {
      title: '充值金额',
      dataIndex: 'amount',
      width: 120,
      render: val => `${(val / 100).toFixed(2)} 元`,
    },
    {
      title: '开票状态',
      dataIndex: 'invoice',
      width: 100,
      render: (val, row) => {
        if (row.special_invoice === 2) {
          return <Badge color="green" text="已开票" />;
        }
        const type = val === null ? 0 : val.length;
        return {
          0: <Badge color="yellow" text="未开票" />,
          1: <Badge color="green" text="已开票" />,
          2: <Badge color="orange" text="已冲销" />,
          3: <Badge color="blue" text="已重开" />,
        }[type];
      },
    },
    {
      title: '发票类型',
      dataIndex: 'special_invoice',
      width: 100,
      render: (val, row) => {
        if (val === 2) {
          return <Badge color="green" text="专票" />;
        } else {
          const type = row.invoice === null ? 0 : row.invoice.length;
          if (type === 1 || type === 3) {
            return <Badge color="blue" text="普票" />;
          } else {
            return '暂无';
          }
        }
      },
    },
    // {
    //   title: '支付方式',
    //   dataIndex: 'payment_method',
    //   width: 120,
    //   render: (val, item) => {
    //     switch (val) {
    //       case 'alipay_app':
    //         return <Badge color="blue" text="支付宝" />;
    //       case 'wechat_app':
    //         return <Badge color="green" text="微信" />;
    //       default:
    //         return item.pay_status === 3 ? (
    //           <Badge color="red" text="支付失败" />
    //         ) : (
    //           <Badge color="red" text="未支付" />
    //         );
    //     }
    //   },
    // },
    {
      title: '支付方式',
      dataIndex: 'payment_method',
      width: 120,
      render: val => {
        if (val === null || val === '') {
          return '暂无';
        }
        return <DicShow pcode="OPER$#wallet$#channel" code={[val]} show={name => name} />;
      },
    },
    {
      title: '支付状态',
      dataIndex: 'pay_status',
      width: 120,
      render: (val, item) => {
        switch (val) {
          case 1:
            return <Badge color="orange" text="未支付" />;
          case 2:
            return <Badge color="green" text="支付成功" />;
          case 3:
            return <Badge color="red" text="支付失败" />;
          case 4:
            return <Badge color="red" text="订单过期" />;
          case 5:
            return <Badge color="red" text="异常状态" />;
          default:
            return '暂无';
        }
      },
    },
    {
      title: '交账情况',
      dataIndex: 'is_submit',
      width: 100,
      render: val => {
        if (val === 1) {
          return <Badge color="red" text="未交账" />;
        } else if (val === 2) {
          return <Badge color="green" text="已交账" />;
        } else {
          return '暂无';
        }
      },
    },
    {
      title: '退费',
      dataIndex: 'is_payback',
      width: 100,
      render: val => {
        switch (val) {
          case 0:
            return <Badge color="green" text="未退费" />;
          case 1:
            return <Badge color="red" text="已退费" />;
          default:
            return <Badge color="green" text="未退费" />;
        }
      },
    },
    {
      title: '缴费人',
      dataIndex: 'creator_name',
      width: 100,
      render: val => val,
    },
    {
      title: '缴费人所属企业',
      dataIndex: 'enterprise.name',
      width: 240,
      render: val => val,
    },
    {
      title: '充值人手机号',
      dataIndex: 'creator_tel',
      width: 120,
      render: val => val,
    },
    {
      title: '支付时间',
      dataIndex: 'pay_time',
      width: 180,
      render: val => {
        if (val === null) {
          return '暂无';
        }
        return moment(val).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  ];

  publish = info => {
    Modal.confirm({
      title: `确定发布项目【${info.name}】？`,
      okText: '确认',
      okType: 'primary',
      cancelText: '取消',
      onOk: () => {
        Service.publish(info, 1).then(res => {
          if (res && !res.error) {
            notification.success({
              key: 'itemPublish',
              message: '项目发布成功',
              description: `项目【${info.name}】已经发布！!`,
            });
            this.getList();
          }
        });
      },
    });
  };

  downloadExcel = () => {
    const formData = this.props.form.getFieldsValue();
    if (formData && formData.date) {
      const startTime = formData.date[0].format('YYYY-MM-DDTHH:mm:ssZ');
      const endTime = formData.date[1].format('YYYY-MM-DDTHH:mm:ssZ');
      delete formData.date;
      formData.startTime = startTime;
      formData.endTime = endTime;
    }
    const searchData = {
      q: 'export',
      ...formData,
    };
    const link = document.createElement('a');
    link.href = electricRechargesService.download(searchData);
    link.target = '_blank';
    link.download = '缴费记录.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 去交账
  onItemAccountClick = selectRows => {
    const lastData = [];
    if (selectRows && selectRows.length > 0) {
      for (let i = 0; i < selectRows.length; i += 1) {
        lastData.push(selectRows[i].record_id);
      }
    }
    const ids = lastData.join();
    electricRechargesService.plcl({ ids });
    this.getList();
  };

  // 单个交账
  onItemAccouClick = value => {
    electricRechargesService.plcl({ ids: value.record_id });
    this.getList();
  };

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <SearchCard
        form={this.props.form}
        onSearch={() => {
          this.getList(true);
        }}
        onReset={this.onResetFormClick}
        onDownload={this.downloadExcel}
      >
        <SearchItem label="充值人">
          {getFieldDecorator('creatorName')(<Input placeholder="充值人" />)}
        </SearchItem>
        <SearchItem label="充值人手机号">
          {getFieldDecorator('creatorTel')(<Input placeholder="充值人手机号" />)}
        </SearchItem>
        <SearchItem label="订单ID">
          {getFieldDecorator('orderID')(<Input placeholder="订单ID" />)}
        </SearchItem>
        <SearchItem label="支付方式">
          {getFieldDecorator('paymentMethod')(
            <DicSelect
              vmode="string"
              pcode="OPER$#wallet$#channel"
              selectProps={{ placeholder: '请选择' }}
            />

            // <Select placeholder="支付方式">
            //   <Select.Option key="alipay_app" value="alipay_app">
            //     <Badge color="blue" text="支付宝" />
            //   </Select.Option>
            //   <Select.Option key="wechat_app" value="wechat_app">
            //     <Badge color="green" text="微信" />
            //   </Select.Option>
            // </Select>
          )}
        </SearchItem>
        <SearchItem label="支付状态">
          {getFieldDecorator('payStatus')(
            <Select placeholder="支付状态">
              <Select.Option key={1} value={1}>
                <Badge color="orange" text="未支付" />
              </Select.Option>
              <Select.Option key={2} value={2}>
                <Badge color="green" text="支付成功" />
              </Select.Option>
              <Select.Option key={3} value={3}>
                <Badge color="red" text="支付失败" />
              </Select.Option>
              <Select.Option key={4} value={4}>
                <Badge color="red" text="订单过期" />
              </Select.Option>
            </Select>
          )}
        </SearchItem>
        <SearchItem label="退费状态">
          {getFieldDecorator('payBackStatus')(
            <Select placeholder="退费状态">
              <Select.Option key={0} value={0}>
                <Badge color="green" text="未退费" />
              </Select.Option>
              <Select.Option key={1} value={1}>
                <Badge color="red" text="已退费" />
              </Select.Option>
            </Select>
          )}
        </SearchItem>
        <SearchItem label="发票开票状态">
          {getFieldDecorator('billingStatus')(
            <Select placeholder="发票开票状态">
              <Select.Option key={0} value={0}>
                <Badge color="yellow" text="未开票" />
              </Select.Option>
              <Select.Option key={1} value={1}>
                <Badge color="green" text="已开票" />
              </Select.Option>
              <Select.Option key={2} value={2}>
                <Badge color="orange" text="已冲销" />
              </Select.Option>
              <Select.Option key={3} value={3}>
                <Badge color="blue" text="已重开" />
              </Select.Option>
            </Select>
          )}
        </SearchItem>
        <SearchItem label="专票状态">
          {getFieldDecorator('specialInvoice')(
            <Select placeholder="发票开票状态">
              <Select.Option key={1} value={1}>
                <Badge color="orange" text="未开" />
              </Select.Option>
              <Select.Option key={2} value={2}>
                <Badge color="green" text="已开" />
              </Select.Option>
            </Select>
          )}
        </SearchItem>
        <SearchItem label="日期">{getFieldDecorator('date')(<RangePicker />)}</SearchItem>
        {/* <SearchItem label="交账情况">
          {getFieldDecorator('specialInv')(
                      // <DicSelect
            //   vmode="string"
            //   pcode="OPER$#account_for"
            //   selectProps={{ placeholder: '请选择' }}
            // />
          )}
        </SearchItem> */}

        <SearchItem label="交账情况">
          {getFieldDecorator('is_submit')(
            <Select placeholder="交账情况">
              <Select.Option key={1} value={1}>
                <Badge color="orange" text="未交账" />
              </Select.Option>
              <Select.Option key={2} value={2}>
                <Badge color="green" text="已交账" />
              </Select.Option>
            </Select>
          )}
        </SearchItem>
      </SearchCard>
    );
  }

  render() {
    const {
      editVisible,
      editInfo,
      data: { list, pagination },
      selectedRows,
      selectedRowKeys,
      loading,
    } = this.state;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => {
        return <span>共{total}条</span>;
      },
      ...pagination,
    };
    // const { form } = this.props;
    const formData = this.props.form.getFieldsValue();

    return (
      <PageHeaderLayout title="电费缴费流水管理">
        <Card className={styles.main}>
          {this.renderSearchForm()}
          <div className={styles.lists}>
            <div className={styles.buttons}>
              {selectedRows && selectedRows.length === 1 && (
                <Button type="primary" onClick={() => this.onItemEditClick(selectedRows[0])}>
                  查看详情
                </Button>
              )}
              {formData &&
                (formData.billingStatus !== undefined && formData.is_submit !== undefined)
                ? selectedRows &&
                selectedRows.length >= 1 &&
                ((formData.billingStatus === 1 || formData.billingStatus === 3) &&
                  formData.is_submit === 1) && (
                  <Button type="primary" onClick={() => this.onItemAccountClick(selectedRows)}>
                    批量交账
                    </Button>
                )
                : selectedRows &&
                selectedRows.length === 1 &&
                ((((selectedRows[0].invoice && selectedRows[0].invoice.length === 1) ||
                  (selectedRows[0].invoice && selectedRows[0].invoice.length === 3)) &&
                  selectedRows[0].is_submit === 1) ||
                  (selectedRows[0].special_invoice === 2 && selectedRows[0].is_submit === 1)) && (
                  <Button type="primary" onClick={() => this.onItemAccouClick(selectedRows[0])}>
                    交账
                    </Button>
                )}
            </div>
            <Table
              rowSelection={{
                selectedRowKeys,
                onChange: this.handleTableSelectRow,
              }}
              scroll={{ x: true, y: true }}
              loading={loading}
              rowKey={record => record.record_id}
              dataSource={list}
              columns={this.columns()}
              pagination={paginationProps}
              onChange={this.onTableChange}
            />
          </div>
        </Card>
        {/* 编辑窗口 */}
        {editVisible ? (
          <Edit
            editVisible={editVisible}
            editInfo={editInfo}
            onSaved={this.onSaved}
            onClose={this.onClose}
          />
        ) : null}
      </PageHeaderLayout>
    );
  }
}
