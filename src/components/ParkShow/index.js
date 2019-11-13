import React, { PureComponent } from 'react';
import park from '../../services/s_park';

/**
 * 用户模糊匹配AutoComplete，可以匹配电话号码、昵称、姓名，模糊匹配
 * WGH
 */
export default class ParkShow extends PureComponent {
  constructor(props) {
    super(props);
    this.value = this.props.value;
    const tmp = window.sessionStorage.getItem(`ParkShow|${this.value}`);
    if (tmp) {
      const r = JSON.parse(tmp);
      this.state = { name: r.name };
    } else {
      this.state = { name: '' };
    }
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate() {
    if (this.value !== this.props.value) {
      this.value = this.props.value;
      this.fetch();
    }
  }

  fetch = async () => {
    const { value } = this.props;
    if (value === '') {
      return;
    }
    const tmp = window.sessionStorage.getItem(`ParkShow|${value}`);
    if (tmp) {
      const r = JSON.parse(tmp);
      setTimeout(() => {
        this.setState({ name: r.name });
      }, 1);
      return;
    }
    const r = await park.get({ record_id: value });
    if (r) {
      window.sessionStorage.setItem(`ParkShow|${value}`, JSON.stringify(r));
      this.setState({ name: r.name });
    }
  };

  /**
   * 渲染
   */
  render() {
    const { name } = this.state;
    const { value } = this.props;
    return (
      <span>
        {name && name}
        {!name && value}
      </span>
    );
  }
}
