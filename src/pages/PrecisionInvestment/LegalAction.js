import React, { PureComponent } from 'react';
import { Table } from 'antd';

export default class LegalAction extends PureComponent {
  onItemDetailClick = rec => {
    const { onShowInfo } = this.props;
    onShowInfo(rec);
  };

  render() {
    const columns = [
      { title: '序号', dataIndex: 'id' },
      { title: '公告日期', dataIndex: 'date' },
      { title: '当事人', dataIndex: 'name' },
      { title: '公告类型', dataIndex: 'reason' },
      { title: '公告人', dataIndex: 'identify' },
    ];

    const data = [
      {
        id: '1',
        date: '2018-05-20',
        name: '首信金达投资有限公司',
        reason: '裁判文书',
        identify: '安徽省合肥市中级人民法院',
      },
      {
        id: '2',
        date: '2017-05-04',
        name: '首信金达投资有限公司',
        reason: '起诉状副本及开庭传票',
        identify: '安徽省合肥市中级人民法院',
      },
    ];
    return (
      <Table
        size="small"
        columns={columns}
        dataSource={data}
        style={{ height: '520px' }}
        // scroll={{ y: '225px', x: '700px' }}
        pagination={false}
        onRow={record => {
          return {
            onClick: () => {
              this.onItemDetailClick(record);
            },
          };
        }}
      />
    );
  }
}
