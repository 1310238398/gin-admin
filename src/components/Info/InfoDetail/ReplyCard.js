import React, { PureComponent } from 'react';
import { Comment, Avatar, Button, Modal, message } from 'antd';
import { get as getuser } from '../../../services/s_user';
// import interactionType from '../../../services/s_interactionType';
import { parseUtcTimeFromNow } from '../../../utils/utils';
import style from './style.less';
// eslint-disable-next-line import/no-cycle
import ReplyChildrenList from './ReplyChildrenList';
import reply from '../../../services/s_replyManage';
import { ContentShow } from '../../ContentShow';

const ReplyContent = ({ content, img }) => (
  <div>
    <ContentShow content={content} />
    {img.map(item => (
      <img className={style.replyimg} src={item} alt="" />
    ))}
  </div>
);

export default class ReplyCard extends PureComponent {
  state = {
    author: '',
    photo: '',
    children: [],
  };

  typeAll = [];

  page = {};

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.data) {
      if (state.data) {
        if (nextProps.data.replay_id !== state.data.replay_id) {
          return { ...state, data: nextProps.data, children: [] };
        } else {
          return null;
        }
      }
      return { ...state, data: nextProps.data };
    }
    return null;
  }

  componentDidMount() {
    this.fetchUser();
  }

  showChildren = async id => {
    this.setState({ children: [<ReplyChildrenList id={id} />] });
  };

  fetchUser = async () => {
    const {
      data: { creator },
    } = this.props;
    const r = await getuser({ record_id: creator });
    if (r) {
      this.setState({ author: r.nickname, photo: `/${r.photo}` });
    }
  };

  fetchDelete = async replyid => {
    const r = await reply.delete(replyid);
    if (r === 'ok') {
      message.info('删除成功');
      if (this.props.onDelete) {
        this.props.onDelete(this.props.data);
      }
    }
  };

  delete = replyid => {
    Modal.confirm({
      title: '确定要删除该评论吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.fetchDelete(replyid);
      },
    });
  };

  renderContent = content => {
    if (content.indexOf('content') >= 0) {
      // 有特殊格式需要特殊处理
      const contentObj = JSON.parse(content);
      return <ReplyContent {...contentObj} />;
    }
    return <p>{content}</p>;
  };

  render() {
    /**
     * ReplayID string    `json:"replay_id"`
	ParentID string    `json:"parent_id"`
	Content  string    `json:"content"`
	ChildNum int       `json:"child_num"`
	Creator  string    `json:"creator"`
	CreTime  time.Time `json:"cre_time"`
	//MyLike   bool      `json:"my_like"`
	LikeNum int `json:"like_num"`
     */

    const {
      data: { replay_id, content, cre_time, child_num, like_num },
    } = this.props;
    const { author, photo, children } = this.state;
    const commentProps = {
      className: style.comment,
      ...this.props,
      avatar: <Avatar icon="user" src={photo} alt={author} />,
      author,
      content: this.renderContent(content),
      datetime: parseUtcTimeFromNow(cre_time),
      actions: [
        <Button icon="snippets" onClick={() => this.showChildren(replay_id)}>
          评论[
          {child_num}]
        </Button>,
        <Button icon="like">
          点赞[
          {like_num}]
        </Button>,
        <Button icon="delete" onClick={() => this.delete(replay_id)}>
          删除
        </Button>,
      ],
    };
    return <Comment {...commentProps}>{children}</Comment>;
  }
}
