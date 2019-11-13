import React, { PureComponent } from 'react';
import { Drawer, Card, Divider, Table, Tag } from 'antd';
import DescriptionList from '../../DescriptionList';
import columnSvc from '@/services/s_columnManage';
import { ContentShow } from '../../ContentShow';
import ColumnShow from '../ColumnShow';
import { OrgShow } from '../../Org';
import { DicShow } from '@/components/Dictionary';

const { Description } = DescriptionList;

export default class ColumnCard extends PureComponent {
  state = {
    data: {},
    extraTypes: [],
  };

  componentDidMount() {
    this.fetchColumn();
    this.fetchExtraTypes();
  }

  fetchColumn = async () => {
    const { id } = this.props;
    const resp = await columnSvc.query(id);
    this.setState({ data: resp });
  };

  fetchExtraTypes = async () => {
    const resp = await columnSvc.queryExtraTypes();
    this.setState({ extraTypes: resp });
  };

  onClose = () => {
    if (this.props.callback) this.props.callback();
  };

  showExtra = () => {
    const { data } = this.state;
    const { ctrl } = data;
    if (!ctrl) {
      return;
    }
    const { desc } = data;
    return ctrl.map(item => {
      const initv = desc && desc.extras && desc.extras[item.code] ? desc.extras[item.code] : '';
      return <Description term={item.name}>{initv}</Description>;
    });
  };

  getKindName = kind => {
    return kind === 0
      ? '一般栏目'
      : kind === 1
      ? '系统栏目'
      : kind === 2
      ? '专题栏目'
      : kind === 3
      ? '互动交流'
      : '未知类型';
  };

  getInfoModeName = infoMode => {
    return infoMode === -1
      ? '禁止发文章'
      : infoMode === 0
      ? '一般模式'
      : infoMode === 1
      ? '单篇文章发布模式'
      : '未定义';
  };

  getYesNo = r => {
    return r === 1 ? '是' : '否';
  };

  render() {
    const { visible } = this.props;
    const { data, extraTypes } = this.state;
    const desc = data.desc ? data.desc : {};
    const ctrlParams = data.ctl_param ? data.ctl_param : {};
    const extras = data.extras ? data.extras : [];

    let fIcons = [];
    let fBanner = [];
    const { banner, icon } = desc;
    if (banner) {
      fBanner = [banner];
    }
    if (icon && icon.length) {
      fIcons = icon;
    }
    const columns = [
      {
        title: '属性名称',
        dataIndex: 'name',
        fixed: 'left',
        width: 150,
      },
      {
        title: '属性编码',
        dataIndex: 'code',
        width: 100,
        fixed: 'left',
      },
      {
        title: '属性种类',
        dataIndex: 'kind',
        width: 100,
        render: v => {
          let name = v;
          extraTypes.forEach(item => {
            if (v === item.code) {
              ({ name } = item);
            }
          });
          return name;
        },
      },
      {
        title: '输入提示',
        dataIndex: 'placeholder',
        width: 100,
      },
      {
        title: '是否必填',
        dataIndex: 'required',
        width: 100,
        render: item => {
          return <DicShow pcode="cms$#columns$#extraprops" code={[item]} />;
        },
      },
      {
        title: '提示消息',
        dataIndex: 'message',
        width: 100,
      },
      {
        title: '规则',
        dataIndex: 'rules',
        width: 100,
      },
      {
        title: '属性种类参数值:',
        dataIndex: 'param_values',
        render: v => {
          const out = [];
          for (const key in v) {
            if ({}.hasOwnProperty.call(v, key)) {
              out.push(<li key={key}>{`${key}:${v[key]}`}</li>);
            }
          }
          return <ul>{out}</ul>;
        },
      },
    ];
    return (
      <Drawer
        title={desc.Name}
        placement="right"
        destroyOnClose
        closable={false}
        onClose={this.onClose}
        visible={visible}
        width="50%"
      >
        <Card bordered={false}>
          <DescriptionList title="基础信息" col={2} size="large" style={{ marginBottom: 32 }}>
            <Description term="栏目编号">{data.column_id}</Description>
            <Description term="栏目名称">{desc.name}</Description>
            <Description term="栏目短名称">{desc.short_name}</Description>
            <Description term="栏目类型">{this.getKindName(desc.kind)}</Description>
            <Description term="所属组织">
              <OrgShow value={desc.org} />
            </Description>
            <Description term="上级栏目">
              <ColumnShow value={desc.parent_id} />
            </Description>
          </DescriptionList>
          <DescriptionList size="large" col={2} style={{ marginBottom: 32 }}>
            <Description term="旗帜">{fBanner}</Description>
            <Description term="图片">{fIcons}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" col={1} title="简介" style={{ marginBottom: 32 }}>
            <Description>{desc.desc}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" col={1} title="封面" style={{ marginBottom: 32 }}>
            <Description>
              <ContentShow content={desc.page} />
            </Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList title="控制信息" size="large" col={2} style={{ marginBottom: 32 }}>
            <Description term="信息详情连接">{ctrlParams.infourl}</Description>
            <Description term="互动类型">{ctrlParams.allow_int_code}</Description>
            <Description term="栏目信息模式">
              {this.getInfoModeName(ctrlParams.info_mode)}
            </Description>
            <Description term="是否开启栏目评论">
              {this.getYesNo(ctrlParams.is_col_reply)}
            </Description>
            <Description term="是否开启信息评论">{this.getYesNo(ctrlParams.is_reply)}</Description>
            <Description term="是否开启信息审核">
              {this.getYesNo(ctrlParams.is_info_chk)}
            </Description>
            <Description term="是否开启评论审核">{this.getYesNo(ctrlParams.is_chk)}</Description>
            <Description term="是否开启投稿">{this.getYesNo(ctrlParams.is_submit)}</Description>
            <Description term="是否禁止信息发布">
              {this.getYesNo(ctrlParams.is_prohibit_pub_info)}
            </Description>

            <Description term="是否允许公开">{this.getYesNo(ctrlParams.is_public)}</Description>
            <Description term="是否允许开放给其他组织">
              {this.getYesNo(ctrlParams.is_org)}
            </Description>
            <Description term="是否禁止所有信息类型发布">
              {this.getYesNo(ctrlParams.deny_info_kind_all)}
            </Description>
            <Description term="允许发布的信息类型">
              <DicShow
                pcode="cms$#infos$#kind"
                code={ctrlParams.allow_info_kinds}
                show={name => <Tag>{name}</Tag>}
              />
            </Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />

          <DescriptionList title="扩展属性" size="large" style={{ marginBottom: 32 }}>
            <Table
              rowKey={record => record.code}
              dataSource={extras}
              columns={columns}
              pagination={false}
              scroll={{ x: 1000, y: 280 }}
            />
          </DescriptionList>
        </Card>
      </Drawer>
    );
  }
}
