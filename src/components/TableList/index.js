import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { TableOps } from './TableOps';
import styles from './styles.less';

export default class TableList extends PureComponent {
  render() {
    const { ops, pagination, columns } = this.props;
    // console.log(columns);
    const ncolumns = [];
    if (ops && ((Array.isArray(ops) && ops.length > 0) || typeof ops === 'function')) {
      ncolumns.push({
        title: '操作',
        dataIndex: '_id',
        width: 70,
        fixed: 'left',
        onCell: () => {
          return {
            onClick: e => {
              e.preventDefault();
              e.stopPropagation();
            }, // 点击行
          };
        },
        render: (_, record) => {
          return <TableOps ops={ops} record={record} />;
        },
      });
    }
    columns.map(item => {
      // debugger
      if ({}.propertyIsEnumerable.call(item, 'render')) {
        const oldrender = item.render;
        item.render = (val, record) => {
          return (
            <div className={styles.testContent} style={{ width: item.width }}>
              {oldrender(val, record)}
            </div>
          );
        };
      } else {
        item.render = text => {
          return (
            <div title={text} className={styles.testContent} style={{ width: item.width }}>
              {text}
            </div>
          );
        };
      }
      return item;
    });
    ncolumns.push(...columns);

    const tableProps = {
      ...this.props,
      columns: ncolumns,
      pagination: false,
    };
    if (pagination) {
      const paginationProps = {
        size: 'small',
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => {
          return <span> 共 {total}条 </span>;
        },
        ...pagination,
      };
      tableProps.pagination = { ...paginationProps };
    }
    return (
      <div className={styles.tableList}>
        <Table {...tableProps} className={styles.testTd} />
      </div>
    );
  }
}
