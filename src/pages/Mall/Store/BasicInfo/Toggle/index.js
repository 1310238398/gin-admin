import React, { PureComponent } from 'react';

import styles from './index.less';

export default class Toggle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    if ('value' in nextProps) {
      return { ...state, value: nextProps.value };
    }
    return state;
  }

  handleClick = () => {
    const { value } = this.state;
    const { left, right, onClick } = this.props;
    let active = value;
    if (value === left) {
      active = right;
    } else {
      active = left;
    }
    this.setState({ value: active });
    if (onClick) {
      onClick(active);
    }
  };

  render() {
    const { value } = this.state;
    const { left, right } = this.props;

    return (
      <div className={styles.main} onClick={this.handleClick}>
        <div className={value === left ? styles.active : null}>{left}</div>
        <div className={value === right ? styles.active : null}>{right}</div>
      </div>
    );
  }
}
