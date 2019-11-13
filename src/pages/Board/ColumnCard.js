import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Drawer, Card, Divider, Table } from 'antd';
import DescriptionList from '../../components/DescriptionList';

const { Description } = DescriptionList;

@connect(state => ({
  boardColumn: state.boardColumn,
}))
export default class ColumnCard extends PureComponent {
  componentDidMount() {
    const { id, callback } = this.props;
    this.props.dispatch({
      type: 'boardColumn/loadDetail',
      payload: {
        id,
        callback,
      },
    });
    this.props.dispatch({
      type: 'boardColumn/fetchFormExtra',
      payload: id,
    });
  }

  onClose = () => {
    this.props.callback();
  };

  onModalOKClick = () => {
    this.props.callback();
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

  showExtra = () => {
    const {
      boardColumn: { formData },
    } = this.props;

    const { ctrl } = formData;
    if (!ctrl) {
      return;
    }
    const { desc } = formData;
    return ctrl.map(item => {
      const initv = desc && desc.extras && desc.extras[item.code] ? desc.extras[item.code] : '';
      return <Description term={item.name}>{initv}</Description>;
    });
  };

  render() {
    const {
      boardColumn: { formVisible, formData, extraTypes },
    } = this.props;

    const desc = formData.desc ? formData.desc : {};
    const ctrlParams = formData.ctl_param ? formData.ctl_param : {};
    const extras = formData.extras ? formData.extras : [];

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
        visible={formVisible}
        width="50%"
      >
        <Card bordered={false}>
          <DescriptionList title="基础信息" size="large" style={{ marginBottom: 32 }}>
            <Description term="栏目编号">{formData.column_id}</Description>
            <Description term="栏目名称">{desc.name}</Description>
            <Description term="栏目短名称">{desc.short_name}</Description>
            <Description term="栏目类型">{this.getKindName(desc.kind)}</Description>
            <Description term="所属组织">{desc.org}</Description>
            <Description term="上级栏目">
              {desc.parent_name}({desc.parent_id})
            </Description>
          </DescriptionList>
          <DescriptionList size="large" style={{ marginBottom: 32 }}>
            <Description term="旗帜">{fBanner}</Description>
            <Description term="图片">{fIcons}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="简介" style={{ marginBottom: 32 }}>
            <Description>{desc.desc}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="封面" style={{ marginBottom: 32 }}>
            <Description>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: desc.page,
                }}
              />
            </Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList title="控制信息" size="large" style={{ marginBottom: 32 }}>
            <Description term="信息详情连接">{ctrlParams.infourl}</Description>
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
            <Description term="是否允许公开">{this.getYesNo(ctrlParams.is_public)}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />

          <DescriptionList title="扩展属性" size="large" style={{ marginBottom: 32 }}>
            <Table
              rowKey={record => record.code}
              dataSource={extras}
              columns={columns}
              pagination={false}
              scroll={{ x: 1500, y: 280 }}
            />
          </DescriptionList>
        </Card>
      </Drawer>
    );
  }
}
