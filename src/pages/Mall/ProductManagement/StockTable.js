import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { EditableCell, EditableFormRow } from './SpecificationTable/EditableCell';
import styles from './CommodityManagement.less';

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
export default class stockTable extends PureComponent {
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

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const cols = [
      {
        title: '规格',
        dataIndex: 'name',
        editable: false,
      },
      {
        title: '库存',
        dataIndex: 'stock',
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
      <div className={styles.stockTable}>
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
