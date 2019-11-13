import React, { PureComponent } from 'react';
import TableList from '../../TableList';
import InfoOp from '../InfoOp';
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
export default class InfoTableList extends PureComponent {
  constructor(props) {
    super(props);
    this.ops = new InfoOp({
      callback: this.onCallBack,
      ops: this.props.infoOps || {},
    });
  }

  onCallBack = ok => {
    const { onCallBack } = this.props;
    if (onCallBack) {
      onCallBack(ok);
    }
  };

  creOps = record => {
    const { allowActions, denyActions } = this.props;

    let actions = this.ops.getActions(record, true);

    if (allowActions && Array.isArray(allowActions) && allowActions.length > 0) {
      actions = actions.filter(item => {
        for (const key of allowActions) {
          if (item.key === key) {
            return true;
          }
        }
        return false;
      });
    }

    if (denyActions && Array.isArray(denyActions) && denyActions.length > 0) {
      actions = actions.filter(item => {
        for (const key of denyActions) {
          if (item.key === key) {
            return false;
          }
        }
        return true;
      });
    }
    return actions;
  };

  render() {
    const tableProps = this.props.tableProps || {};
    const prop = {
      ops: this.creOps,
      ...tableProps,
    };

    return <TableList {...prop} />;
  }
}
