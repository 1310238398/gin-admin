import React, { PureComponent } from 'react';
import { Modal, Tag, Button, Card, Menu, Dropdown, Table } from 'antd';
import TableList from '../../../components/TableList';
import { connect } from 'dva';
import { formatTimestamp } from '../../../utils/utils';
import styles from './OrderManagementInfo.less';
import { DicShow } from '@/components/Dictionary';
@connect(state => ({
  orderManagement: state.orderManagement,
}))
export default class OrderManagementInfo extends PureComponent {
  paymentMethodRender = payChannel => {
    const tagColor = { alipay_app: 'blue', wechat_app: 'green' };
    return (
      <DicShow
        pcode="mall$#payment$#paymentMethod"
        code={[payChannel]}
        show={name => (
          <Tag color={tagColor[payChannel]} key={name}>
            {name}
          </Tag>
        )}
      />
    );
  };

  orderstatusRender = status => {
    const statusColor = {
      1: 'blue',
      21: 'blue',
      22: 'blue',
      23: 'green',
      3: 'red',
      4: 'blue',
      5: 'blue',
      6: 'green',
      7: 'green',
      8: 'red',
    };
    return (
      <DicShow
        pcode="mall$#order$#orderstatus"
        code={[status]}
        show={name => (
          <Tag color={statusColor[status]} key={name}>
            {name}
          </Tag>
        )}
      />
    );
  };

  deliveryStatusRender = status => {
    const codeColor = ['blue', 'blue', 'green', 'red'];
    return (
      <DicShow
        pcode="mall$#order$#distribution"
        code={[status]}
        show={name => (
          <Tag color={codeColor[status]} key={name}>
            {name}
          </Tag>
        )}
      />
    );
  };

  settlestatusRender = status => {
    switch (status) {
      case 1:
        return <Tag color="blue">结算</Tag>;
      case 2:
        return <Tag color="green">未结算</Tag>;
      default:
        return '';
    }
  };

  complanstatusRender = status => {
    switch (status) {
      case 1:
        return <Tag color="blue">无投诉</Tag>;
      case 2:
        return <Tag color="green">有投诉</Tag>;
      case 3:
        return <Tag color="red">已处理</Tag>;
      case 4:
        return <Tag color="blue">不处理</Tag>;
      default:
        return '';
    }
  };

  refusestatusRender = status => {
    switch (status) {
      case 1:
        return <Tag color="blue">无退款</Tag>;
      case 2:
        return <Tag color="green">有退款</Tag>;
      default:
        return '';
    }
  };

  pricesamp = text => {
    if (text === 0) {
      return '0.00';
    } else {
      let s;
      if (`${text}`.substring(1, `${text}`.length - 2) === '.') {
        s =
          `${text}`.substring(0, `${text}`.length - 2) +
          `${text}`.substring(`${text}`.length - 2, `${text}`.length);
        // s = parseFloat(s);
        return s;
      } else if (`${text}`.substring(0, `${text}`.length - 2) === '') {
        s = `${`${text}`.substring(0, `${text}`.length - 2)}0.0${`${text}`.substring(
          `${text}`.length - 2,
          `${text}`.length
        )}`;
        // s = parseFloat(s);
        return s;
      } else {
        s = `${`${text}`.substring(0, `${text}`.length - 2)}.${`${text}`.substring(
          `${text}`.length - 2,
          `${text}`.length
        )}`;
        // s = parseFloat(s);
        return s;
      }
    }
  };

  // TODO
  Shield = rec => {
    const { ShieldCallback } = this.props;
    Modal.confirm({
      title: '操作确认',
      content: '确定要屏蔽此评价吗？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        ShieldCallback(rec);
      },
    });
  };

  ReleaseShield = rec => {
    const { ReleaseShieldCallback } = this.props;
    Modal.confirm({
      title: '操作确认',
      content: '确定要解除屏蔽此评价吗？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        ReleaseShieldCallback(rec);
      },
    });
  };

  /**
   * 界面渲染
   */
  render() {
    // const { data } = this.props;
    const {
      orderManagement: { orderInfo },
    } = this.props;
    const footerJsx = [
      <Button key="close" onClick={this.props.onShopInfoFrameCloseCallback}>
        关闭
      </Button>,
    ];

    // 列定义
    const colWidthShort = 100;
    const colWidthNormal = 120;
    const columns = [
      {
        title: '操作',
        key: 'operation',
        fixed: 'left',
        width: colWidthShort,
        render: record => (
          <Dropdown
            placement="bottomCenter"
            overlay={
              <Menu>
                {record.comment_status === 1 || record.comment_status === 2 ? (
                  <Menu.Item onClick={() => this.Shield(record)}>屏蔽</Menu.Item>
                ) : null}

                {record.comment_status === 3 ? (
                  <Menu.Item onClick={() => this.ReleaseShield(record)}>解除屏蔽</Menu.Item>
                ) : null}
              </Menu>
            }
          >
            <Button>操作</Button>
          </Dropdown>
        ),
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        width: colWidthNormal,
        key: 'name',
      },
      {
        title: '单价(元)',
        dataIndex: 'unit_price',
        width: colWidthNormal,
        key: 'unit_price',
        render: text => {
          let s;
          if (`${text}`.substring(1, `${text}`.length - 2) === '.') {
            s =
              `${text}`.substring(0, `${text}`.length - 2) +
              `${text}`.substring(`${text}`.length - 2, `${text}`.length);
          } else if (`${text}`.substring(0, `${text}`.length - 2) === '') {
            s = `${`${text}`.substring(0, `${text}`.length - 2)}0.0${`${text}`.substring(
              `${text}`.length - 2,
              `${text}`.length
            )}`;
            // s = parseFloat(s);
            return s;
          } else {
            s = `${`${text}`.substring(0, `${text}`.length - 2)}.${`${text}`.substring(
              `${text}`.length - 2,
              `${text}`.length
            )}`;
          }

          // s = parseFloat(s);
          return s;
        },
      },
      {
        title: '数量',
        dataIndex: 'quantity',
        width: 140,
        key: 'quantity',
      },
      {
        title: '金额(元)',
        dataIndex: 'gender',
        width: colWidthShort,
        key: 'gender',
        render: (text, record) => {
          let s = 0;
          let final;
          s = record.quantity * record.unit_price;
          if (`${s}`.substring(1, `${s}`.length - 2) === '.') {
            final =
              `${s}`.substring(0, `${s}`.length - 2) +
              `${s}`.substring(`${s}`.length - 2, `${s}`.length);
          } else if (`${s}`.substring(0, `${s}`.length - 2) === '') {
            final = `${`${s}`.substring(0, `${s}`.length - 2)}0.0${`${s}`.substring(
              `${s}`.length - 2,
              `${s}`.length
            )}`;
            // s = parseFloat(s);
            return final;
          } else {
            final = `${`${s}`.substring(0, `${s}`.length - 2)}.${`${s}`.substring(
              `${s}`.length - 2,
              `${s}`.length
            )}`;
          }

          return final;
        },
      },
      {
        title: '评价状态',
        dataIndex: 'sales_record_status',
        width: colWidthShort,
        key: 'sales_record_status',
        render: (value, record) => {
          const statusColor = ['blue', 'blue', 'green', 'red'];
          if (value === 3 && record.comment_status === 2) {
            return <Tag color={statusColor[value]}>已回复</Tag>;
          }
          if (value === 3 && record.comment_status === 3) {
            return <Tag color={statusColor[value]}>已屏蔽</Tag>;
          }
          return (
            <DicShow
              pcode="mall$#order$#comment"
              code={[value]}
              show={name => (
                <Tag color={statusColor[value]} key={name}>
                  {name}
                </Tag>
              )}
            />
          );
        },
      },
      {
        title: '评分',
        dataIndex: 'score',
        width: colWidthNormal,
        key: 'score',
      },
      {
        title: '评价内容',
        dataIndex: 'text',
        width: colWidthNormal,
        key: 'text',
      },
      {
        title: '商家回复',
        dataIndex: 'replay',
        width: colWidthShort,
        key: 'replay',
      },
    ];
    const resultJsx = (
      <Modal
        className={styles.frame}
        visible
        title="订单详情"
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.onShopInfoFrameCloseCallback}
        footer={footerJsx}
      >
        <table
          style={{
            width: '100%',
          }}
        >
          <tbody>
            <tr>
              <td className={styles.title}>订单编号：</td>
              <td className={styles.label} colSpan={3}>
                {orderInfo.order_id}
              </td>
              {/* <td style={{ width: '136px', verticalAlign: 'top' }} rowSpan={4}>
                                <img alt="头像" src={headerImgUrl} className={styles.headImage} />
                            </td> */}
            </tr>
            <tr>
              <td className={styles.title}>买家名称：</td>
              <td className={styles.label}>{orderInfo.user_name}</td>
              <td className={styles.title}>买家账号：</td>
              <td className={styles.label}>{orderInfo.user_tel}</td>
            </tr>
            <tr>
              <td className={styles.title}>所属店铺：</td>
              <td className={styles.label}>{orderInfo.store_name}</td>
              <td className={styles.title}>店铺电话：</td>
              <td className={styles.label}>{orderInfo.store_tel}</td>
            </tr>
            <tr>
              <td className={styles.title}>优惠金额：</td>
              <td className={styles.label}>{this.pricesamp(orderInfo.cut_price)}元</td>
              <td className={styles.title}>订单金额：</td>
              <td className={styles.label}>{this.pricesamp(orderInfo.price)}元</td>
            </tr>
            <tr>
              <td className={styles.title}>订单状态：</td>
              <td className={styles.label}>{this.orderstatusRender(orderInfo.order_status)}</td>
              <td className={styles.title}>下单时间：</td>
              <td className={styles.label}>
                {orderInfo.created === 0 ? '' : formatTimestamp(orderInfo.created)}
              </td>
            </tr>
            {/* <tr>
              <td className={styles.title}>退款状态：</td>
              <td className={styles.label}>{this.refusestatusRender(data.refund_status)}</td>
              <td className={styles.title}>退款时间：</td>
              <td className={styles.label}>
                {data.refunded === 0 ? '' : formatTimestamp(data.refunded)}
              </td>
            </tr>
            <tr>
              <td className={styles.title}>投诉状态：</td>
              <td className={styles.label}>{this.complanstatusRender(data.complain_status)}</td>
              <td className={styles.title}>投诉时间：</td>
              <td className={styles.label}>
                {data.complain.created === 0 ? '' : formatTimestamp(data.complain.created)}
              </td>
            </tr>
            <tr>
              <td className={styles.title}>投诉内容：</td>
              <td className={styles.label} colSpan={2}>
                {data.complain.text}
              </td>
            </tr> */}
            {/* <tr>
              <td className={styles.title}>结算状态：</td>
              <td className={styles.label}>{data.settled.length > 2 ? '结算' : '未结算'}</td>
              <td className={styles.title}>结算时间：</td>
              <td className={styles.label}>
                {data.settled === 0 ? '' : formatTimestamp(data.settled)}
              </td>
            </tr> */}
            <tr>
              <td className={styles.title}>商家接单时间：</td>
              <td className={styles.label}>
                {orderInfo.check_in === 0 || orderInfo.check_in === undefined
                  ? ''
                  : formatTimestamp(orderInfo.check_in)}
              </td>
              <td className={styles.title}>订单完成时间：</td>
              <td className={styles.label}>
                {orderInfo.finished === 0 || orderInfo.finished === undefined
                  ? ''
                  : formatTimestamp(orderInfo.finished)}
              </td>
            </tr>
            <tr>
              <td className={styles.title}>支付方式：</td>
              <td className={styles.label}>
                {orderInfo.pay_channel && this.paymentMethodRender(orderInfo.pay_channel)}
              </td>
              <td className={styles.title}>配送状态：</td>
              <td className={styles.label}>
                {this.deliveryStatusRender(orderInfo.delivery_status)}
              </td>
            </tr>
          </tbody>
        </table>
        <Card bordered={false}>
          <Table
            rowKey={record => record.id}
            dataSource={orderInfo.goods_list}
            columns={columns}
            scroll={{ x: 1100 }}
          />
        </Card>
      </Modal>
    );
    return resultJsx;
  }
}
