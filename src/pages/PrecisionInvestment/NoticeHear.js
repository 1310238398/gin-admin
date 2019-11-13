import React, { PureComponent } from 'react';
import { Table } from 'antd';

export default class NoticeHear extends PureComponent {
  onItemDetailClick = rec => {
    const { onLegalInfo } = this.props;
    onLegalInfo(rec);
  };

  render() {
    const columns = [
      { title: '序号', dataIndex: 'id' },
      { title: '开庭日期', dataIndex: 'date' },
      { title: '法院', dataIndex: 'name' },
      { title: '案由', dataIndex: 'reason' },
      { title: '当事人', dataIndex: 'identify' },
    ];

    const data = [
      {
        id: '1',
        date: '2018-08-24',
        name: '安徽省合肥市庐阳区人民法院',
        reason: '债权人撤销权纠纷',
        identify: '原告：正奇安徽金融控股有限公司，被告：许辉，其他：许鸣，刘朝华',
      },
      {
        id: '2',
        date: '2018-04-17	',
        name: '安徽省合肥市中级人民法院',
        reason: '借款合同纠纷',
        identify:
          '原告：正奇安徽金融控股有限公司，被告：安徽国瑞投资集团有限公司，许辉，首信金达投资有限公司，王福海',
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
