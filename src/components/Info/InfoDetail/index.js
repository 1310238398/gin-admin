import React, { Component } from 'react';
import { Skeleton, Card } from 'antd';
import { isFunction, isArray } from 'util';
import InfoDetailKind1 from './InfoDetailKind1';
import InfoDetailKind2 from './InfoDetailKind2';
import InfoDetailKind5 from './InfoDetailKind5';
import info from '../../../services/s_infoManage';
import columns from '../../../services/s_columnManage';
import InfoOplogList from './InfoOplogList';
import CheckList from './CheckList';
import IntList from './IntList';
import ReplyList from './ReplyList';
import Timingpub from './Timingpub';
import Notice from './Notice';
import SurveyCard from './SurveyCard';

const tabList = [
  {
    key: 'detail',
    tab: '详情',
  },
  {
    key: 'survey',
    tab: '问卷详情',
  },
  {
    key: 'timingpub',
    tab: '定时发布',
  },
  {
    key: 'notice',
    tab: '通知',
  },
  {
    key: 'oplog',
    tab: '操作记录',
  },
  {
    key: 'chk',
    tab: '审核记录',
  },
  {
    key: 'int',
    tab: '互动',
  },
  {
    key: 'reply',
    tab: '评论',
  },
];
export default class InfoDetail extends Component {
  state = {
    dataSource: null,
    key: 'detail',
  };

  componentDidMount() {
    const { value } = this.props;
    this.fetch(value);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.fetch(nextProps.value);
    } else if ('refresh' in nextProps && nextProps.refresh !== this.props.refresh) {
      this.refresh();
    }
    return true;
  }

  onTabChange = key => {
    this.setState({ key });
  };

  refresh = () => {
    this.fetch(this.props.value);
  };

  getTabList = () => {
    const { dataSource } = this.state;
    const desc = dataSource && dataSource.desc ? dataSource.desc : {};
    let ntablist = tabList;
    if (!desc || desc.kind !== 5) {
      ntablist = ntablist.filter(item => {
        return item.key !== 'survey';
      });
    }
    return ntablist;
  };

  async fetch(value) {
    if (!value) return '';
    const r = await info.queryDesc(value);

    if (r && r.desc && r.desc.column_id) {
      const response = await columns.query(r.desc.column_id);
      if (response) {
        r.ctrl = response.extras;
        r.ctl_param = response.ctl_param;
        r.column_name = response.desc.name;
        this.setState({ dataSource: r });
      }
    }
  }

  render() {
    const { actions, value, logcode } = this.props;
    const { dataSource } = this.state;
    const desc = dataSource && dataSource.desc ? dataSource.desc : {};
    const tabContents = {
      detail: (() => {
        switch (desc.kind || 0) {
          case 2:
            return <InfoDetailKind2 dataSource={dataSource} />;
          case 1:
            return <InfoDetailKind1 dataSource={dataSource} />;
          case 5:
            return <InfoDetailKind5 dataSource={dataSource} />;
          default:
            return <Skeleton active />;
        }
      })(),
      oplog: value ? (
        <InfoOplogList value={value} actionpcode={logcode} dataSource={dataSource} />
      ) : (
        <Skeleton active />
      ),
      survey: value ? <SurveyCard value={value} dataSource={dataSource} /> : <Skeleton active />,
      chk: value ? <CheckList value={value} /> : <Skeleton active />,
      int: value ? <IntList value={value} /> : <Skeleton active />,
      reply: value ? <ReplyList value={value} /> : <Skeleton active />,
      timingpub: value ? <Timingpub dataSource={dataSource} /> : <Skeleton active />,
      notice: value ? <Notice dataSource={dataSource} /> : <Skeleton active />,
    };

    const cardProps = {
      bordered: false,
      tabList: this.getTabList(),
      activeTabKey: this.state.key,
      onTabChange: key => {
        this.onTabChange(key);
      },
      // style:{ display: 'flex' }}
      // headStyle:{ height: '40px' }}
      bodyStyle: {
        height: 'calc(100vh - 157px)',
        width: '100%',
        overflowY: 'auto',
      },
    };
    if (isFunction(actions) && dataSource) {
      cardProps.actions = actions(dataSource);
      if (cardProps.actions && cardProps.actions.length > 0)
        cardProps.bodyStyle.height = 'calc(100vh - 214px)';
    } else if (isArray(actions) && actions.length > 0) {
      cardProps.actions = actions;
      cardProps.bodyStyle.height = 'calc(100vh - 214px)';
    }

    return <Card {...cardProps}>{tabContents[this.state.key]}</Card>;
  }
}
