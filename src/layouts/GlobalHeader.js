import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
// import { Icon, Avatar, Spin } from 'antd';
import NoticeIcon from '../components/NoticeIcon';
// import HeaderDropdown from '@/components/HeaderDropdown';
import styles from './AdminLayout.less';

@connect(({ global, loading }) => ({
  global,
  fetchingNotices: loading.effects['global/fetchNotices'],
}))
class GlobalHeader extends PureComponent {
  onNoticeClear = type => {
    // 清空 type 对应数据
    this.dispatch({
      type: 'global/clearNotices',
      messageType: type,
    });
  };

  onItemClick = item => {
    this.dispatch({
      type: 'global/changeNoticeReadState',
      messageID: item.record_id,
    });
    // 通知事件被点击了
    router.push(item.show_url);
  };

  fetchMoreNotices = tabProps => {
    const { list, name } = tabProps;
    const lastItemId = list[list.length - 1].id;
    this.dispatch({
      type: 'global/fetchNotices',
      param: {
        message_type: name,
        id: lastItemId,
        pageSize: 10,
      },
    });
  };

  dispatch = action => {
    const { dispatch } = this.props;
    dispatch(action);
  };

  render() {
    const {
      // collapsed,
      // onCollapse,
      onNoticeVisibleChange,
      fetchingNotices,
      global: { unReadCount, noticeData, loadedAllNotices },
    } = this.props;
    const loadMoreProps = {
      loadedAll: loadedAllNotices,
      loading: fetchingNotices,
    };
    return (
      <div>
        <NoticeIcon
          className={styles.action}
          count={unReadCount.total}
          onItemClick={this.onItemClick}
          locale={{
            emptyText: '暂无数据',
            clear: '清空',
            loadedAll: '加载完毕',
            loadMore: '加载更多',
          }}
          onClear={this.onNoticeClear}
          onLoadMore={this.fetchMoreNotices}
          onPopupVisibleChange={onNoticeVisibleChange}
          loading={fetchingNotices}
          clearClose
        >
          <NoticeIcon.Tab
            count={unReadCount.notification}
            list={noticeData.notification}
            title="通知"
            name="notification"
            emptyText="暂无数据"
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            {...loadMoreProps}
          />
          <NoticeIcon.Tab
            count={unReadCount.message}
            list={noticeData.message}
            title="消息"
            name="message"
            emptyText="暂无数据"
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
            {...loadMoreProps}
          />
        </NoticeIcon>
      </div>
    );
  }
}
export default GlobalHeader;
