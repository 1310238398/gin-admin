import React, { PureComponent } from 'react';
import { Table, Collapse } from 'antd';
import DescriptionList from '../../components/DescriptionList';

const { Panel } = Collapse;
const { Description } = DescriptionList;

export default class GroupInfoCard extends PureComponent {
  render() {
    const { data } = this.props;
    let desc = {};
    if (data.desc) {
      desc = { ...data.desc };
    }
    let status = {};
    if (data.status) {
      status = { ...data.status };
    }
    let ctlParam = {};
    if (data.ctl_param) {
      ctlParam = { ...data.ctl_param };
    }
    let flags = '';
    if (ctlParam && ctlParam.flags) {
      flags = ctlParam.flags.join(' ');
    }
    const columns = [
      {
        title: '组织',
        dataIndex: 'org',
        width: 100,
      },
      {
        title: '栏目',
        dataIndex: 'column_id',
        width: 100,
        render: (val, record) => {
          if (record.column_id) {
            return `${record.column_name}(${record.column_id})`;
          }
          return '';
        },
      },
      {
        title: '所有者',
        dataIndex: 'own',
        width: 100,
      },
      {
        title: '关键字',
        dataIndex: 'key',
        width: 100,
      },
      {
        title: '标签',
        dataIndex: 'tags',
        width: 100,
        render: val => {
          let v = [];
          if (val && val.length) {
            v = val.map(item => {
              return <li key={`li_${item}`}>{item}</li>;
            });
          }
          return <ul>{v}</ul>;
        },
      },
    ];
    return (
      <div>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={`${desc.name}基本信息`} key="1">
            <DescriptionList size="large" style={{ marginBottom: 32 }}>
              <Description term="编号">{data.group_id}</Description>
              <Description term="访问标识">{flags}</Description>
              <Description term="短名称">{desc.short_name}</Description>
              <Description term="收集类型">{desc.kind === 1 ? '自动' : '手动'}</Description>
              <Description term="所属组织">{desc.org}</Description>
              <Description term="所属个人">{desc.owner}</Description>
              <Description term="信息数量">{`${status.info_num}`}</Description>
              <Description term="组状态">
                {status.status === -1 ? '已删除' : status.status === 0 ? '停止收集' : '开始收集'}
              </Description>
            </DescriptionList>
          </Panel>
          {desc.kind === 1 && (
            <Panel header="收集规则" key="2">
              <Table style={{ marginBottom: 16 }} dataSource={ctlParam.rules} columns={columns} />
            </Panel>
          )}
        </Collapse>
      </div>
    );
  }
}
