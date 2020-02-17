import React, { Component } from 'react';
import { query } from '@/services/s_dicManage';

export default class DicShowNew extends Component {
  state = {
    name: '',
  };

  componentDidMount() {
    this.fetchName();
  }

  componentDidUpdate(preProps) {
    if (preProps.code !== this.props.code) {
      this.fetchName();
    }
  }

  fetchAllName = (root, codes, pnames, cb) => {
    if (!pnames) {
      pnames = [];
    }

    if (!codes || codes.length === 0) {
      cb(pnames);
      return;
    }

    let v = codes[0];
    if (root && root !== '') {
      v = `${root}$#${v}`;
    }

    const ncodes = codes.slice(1);
    const key = `dictionary_${v}`;
    const vv = sessionStorage.getItem(key);
    if (vv && vv !== '') {
      pnames.push(vv);
      this.fetchAllName(root, ncodes, pnames, cb);
      return;
    }

    query({ q: 'code', code: `${v}` }).then(data => {
      pnames.push(data.name);
      sessionStorage.setItem(key, data.name);
      this.fetchAllName(root, ncodes, pnames, cb);
    });
  };

  fetchName = () => {
    const { root, code } = this.props;
    if (!code || code === '') {
      return;
    }

    const codes = code.split('$#');
    for (let i = 0; i < codes.length; i += 1) {
      if (i > 0) {
        codes[i] = `${codes[i - 1]}$#${codes[i]}`;
      }
    }

    this.fetchAllName(root, codes, [], names => {
      this.setState({ name: names.join('/') });
    });
  };

  render() {
    const { name } = this.state;
    return <span>{name}</span>;
  }
}
