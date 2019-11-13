import React, { PureComponent } from 'react';
import { Badge, Card, Modal } from 'antd';
import styles from './Edit.less';
import * as electricRechargesDetail from '@/services/electricRechargesDetail';

export default class GateEdit extends PureComponent {
  state = { detail: {} };

  componentWillMount() {
    const { editDevice } = this.props;
    electricRechargesDetail.get(editDevice).then(res => {
      this.setState({ detail: res });
    });
  }

  onModalCancelClick = () => {
    const { onClose } = this.props;
    onClose();
  };

  render() {
    const { editVisible } = this.props;
    const { detail } = this.state;
    return (
      <Modal
        title="充值记录详情"
        width={800}
        visible={editVisible}
        okText="确定"
        cancelText="关闭"
        onOk={this.onModalCancelClick}
        onCancel={this.onModalCancelClick}
      >
        <Card bordered={false} className={styles.card}>
          <table className={styles.order}>
            <tbody>
              <tr>
                <th>记录ID</th>
                <td colSpan={3}>{detail.record_id}</td>
              </tr>
              <tr>
                <th>充值记录ID</th>
                <td colSpan={3}>{detail.recharge_id}</td>
              </tr>
              <tr>
                <th>电表记录ID</th>
                <td colSpan={3}>{detail.electric_meter_id}</td>
              </tr>
              <tr>
                <th>电表名</th>
                <td>{detail.electric_meter_name}</td>
                <th>电表地址(表号)</th>
                <td>{detail.electric_meter_addr}</td>
              </tr>
              <tr>
                <th>门牌号</th>
                <td>{detail.room_name}</td>
                <th>充值人所在公司</th>
                <td>{detail.enterprise_name}</td>
              </tr>
              <tr>
                <th>充值人</th>
                <td>{detail.creator_name}</td>
                <th>充值人手机号</th>
                <td>{detail.creator_tel}</td>
              </tr>
              <tr>
                <th>充值金额</th>
                <td>{(detail.amount / 100).toFixed(2)} 元</td>
                <th>第三方充值状态</th>
                <td>
                  {
                    {
                      1: <Badge color="yellow" text="超时" />,
                      2: <Badge color="green" text="成功" />,
                      3: <Badge color="red" text="失败" />,
                    }[detail.third_status]
                  }
                </td>
              </tr>
              <tr>
                <th>失败原因</th>
                <td>{detail.third_fail_reason}</td>
                <th>退费状态</th>
                <td>
                  {
                    {
                      0: <Badge color="green" text="未退费" />,
                      1: <Badge color="red" text="已退费" />,
                    }[detail.is_payback]
                  }
                </td>
              </tr>
              <tr>
                <th>缴费前金额</th>
                <td>{detail.before_amount} 元</td>
                <th>缴费后金额</th>
                <td>{detail.after_amount} 元</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </Modal>
    );
  }
}
