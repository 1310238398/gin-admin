import React, { PureComponent } from 'react';
import { Table } from 'antd';

export default class KnowledgeLitigation extends PureComponent {
  onItemDetailClick = rec => {
    const { onKnowledgeInfo } = this.props;
    onKnowledgeInfo(rec);
  };

  render() {
    const columns = [
      { title: '序号', dataIndex: 'id' },
      { title: '日期', dataIndex: 'date' },
      { title: '标题', dataIndex: 'name' },
      { title: '案由', dataIndex: 'reason' },
      { title: '身份', dataIndex: 'identify' },
    ];

    const data = [
      {
        id: '1',
        date: '2018-12-12',
        name: '正奇安徽金融控股有限公司、安徽国瑞投资集团有限公司借款合同纠纷执行实施类执行裁定书',
        reason: '借款合同纠纷',
        identify: '申请执行人',
      },
      {
        id: '2',
        date: '2018-04-18',
        name: '正奇安徽金融控股有限公司与安徽国瑞投资集团有限公司、许辉借款合同纠纷一审民事判决书',
        reason: '借款合同纠纷',
        identify: '原告',
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
