import React, { PureComponent } from 'react';
import { Modal } from 'antd';
import TableList from '../../components/TableList';
/**
 * opsHanlder ={
 *    onItemDesc:(id,record)=>{}
 *    onItemPublish:(id,record)=>{}
 *    onItemUnpublish:(id,record)=>{}
 *    onItemRecover:(id,record)=>{}
 *    onItemDelete:(id,record)=>{}
 *    onItemDestroy:(id,record)=>{}
 *    onItemCheck:(id,record)=>{}
 *    onItemCommit:(id,record)=>{}
 * }
 */
export default class FeedbackTableList extends PureComponent {
  onItemDescClick = record => {
    const {
      opsHanlder: { onItemDesc },
    } = this.props;
    onItemDesc(record.info_id, record);
  };

  onItemCheckClick = record => {
    const {
      opsHanlder: { onItemCheck },
    } = this.props;
    onItemCheck(record.info_id, record);
  };

  onItemRecoverClick = record => {
    const {
      opsHanlder: { onItemRecover },
    } = this.props;
    Modal.confirm({
      title: '确定要恢复信息吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        onItemRecover(record.info_id, record);
      },
    });
  };

  onItemDeleteClick = record => {
    const {
      opsHanlder: { onItemDelete },
    } = this.props;
    Modal.confirm({
      title: '确定删除该数据吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        onItemDelete(record.info_id, record);
      },
    });
  };

  onItemDestroyClick = record => {
    const {
      opsHanlder: { onItemDestroy },
    } = this.props;
    Modal.confirm({
      title: '确定彻底删除该数据吗？彻底删除后不能恢复。',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        onItemDestroy(record.info_id, record);
      },
    });
  };

  onItemCommitClick = record => {
    const {
      opsHanlder: { onItemCommit },
    } = this.props;
    Modal.confirm({
      title: '确定要提交处理吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        onItemCommit(record.info_id, record);
      },
    });
  };

  creOps = record => {
    const { opsHanlder } = this.props;
    if (!opsHanlder) {
      return [];
    }
    const out = [];
    if (opsHanlder.onItemCommit && record.status.status === 0) {
      out.push({
        icon: 'commit',
        name: '提交处理',
        handler: this.onItemCommitClick,
      });
    }

    if (opsHanlder.onItemCheck && record.status.status === 1) {
      out.push({
        icon: 'check',
        name: '处理反馈',
        handler: this.onItemCheckClick,
      });
    }

    if (opsHanlder.onItemDelete && record.status.status >= 0) {
      out.push({
        icon: 'delete',
        name: '删除',
        handler: this.onItemDeleteClick,
      });
    }
    if (out.length > 0) {
      return out;
    }
    return [];
  };

  render() {
    const {
      opsHanlder: { onRowClick },
    } = this.props;
    const tableProps = this.props.tableProps || {};
    const prop = {
      ops: this.creOps,
      ...tableProps,
      onRow: record => {
        return {
          onClick: () => {
            return onRowClick(record);
          }, // 点击行
        };
      },
    };

    return <TableList {...prop} />;
  }
}
