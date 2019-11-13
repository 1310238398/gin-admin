import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { EditableCell, EditableFormRow } from './EditableCell';

import styles from './index.less';

function fillKey(data) {
  if (!data) {
    return [];
  }
  return data.map(item => {
    const nitem = { ...item };
    if (!nitem.key) {
      nitem.key = nitem.name;
    }
    return nitem;
  });
}

export default class SpecificationTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: fillKey(props.value),
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    if ('value' in nextProps) {
      return { ...state, dataSource: fillKey(nextProps.value) };
    }
    return state;
  }

  handleSave = row => {
    const { dataSource } = this.state;
    const data = [...dataSource];
    const index = data.findIndex(item => row.key === item.key);
    const item = data[index];
    data.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: data }, () => {
      this.triggerChange(data);
    });
  };

  triggerChange = data => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(data);
    }
  };

  renderTitle = title => {
    return (
      <span>
        <span style={{ color: '#E84228', fontSize: 14 }}>*</span>
        {title}
      </span>
    );
  };

  render() {
    const { dataSource } = this.state;
    const { sname } = this.props;

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const cols = [
      {
        title: sname,
        dataIndex: 'name',
        editable: false,
        width: '20%',
      },
      {
        title: '价格(元)',
        dataIndex: 'price',
        editable: true,
        width: '15%',
      },
      {
        title: '库存',
        dataIndex: 'stock',
        editable: true,
        width: '15%',
      },
      {
        title: '商品编码',
        dataIndex: 'goods_code',
        editable: true,
        width: '20%',
      },
      {
        title: '规格图片',
        dataIndex: 'image',
        editable: true,
      },
    ];

    const columns = cols.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
        }),
      };
    });
    return (
      <div className={styles.tableList}>
        <Table
          components={components}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          onRow={record => ({
            record,
            handleSave: this.handleSave,
          })}
        />
      </div>
    );
  }
}
