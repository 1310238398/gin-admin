import React, { PureComponent } from 'react';
import { get } from '../../services/s_user';

/**
 * 用户模糊匹配AutoComplete，可以匹配电话号码、昵称、姓名，模糊匹配
 * WGH
 */
export default class UserShow extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.uid,
    };
    this.uid = this.props.uid;
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate() {
    if (this.uid !== this.props.uid) {
      this.uid = this.props.uid;
      this.fetch();
    }
  }

  fetch = async () => {
    const { uid } = this.props;
    if (uid === '') {
      return;
    }

    const tmp = window.sessionStorage.getItem(`UserShow|${uid}`);
    if (tmp) {
      const r = JSON.parse(tmp);
      setTimeout(() => {
        this.setState({ nickname: r.nickname });
      }, 1);
      return;
    }
    const r = await get({ record_id: uid });
    if (r.error) {
      this.setState({ nickname: '未知用户' });
    } else {
      window.sessionStorage.setItem(`UserShow|${uid}`, JSON.stringify(r));
      this.setState({ nickname: r.nickname });
    }
  };

  /**
   * 选中事件处理
   */
  onSelect = val => {
    this.props.callback(val, 'ok');
  };

  /**
   * 渲染
   */
  render() {
    const { nickname } = this.state;
    const { uid, showTitle } = this.props;
    const obj = {};
    if (showTitle) {
      obj.title = uid;
    }
    return (
      <span {...obj}>
        {nickname && nickname}
        {!nickname && uid}
      </span>
    );
  }
}
