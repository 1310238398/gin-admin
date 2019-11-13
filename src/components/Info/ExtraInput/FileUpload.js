import React, { PureComponent } from 'react';
import { Upload } from 'antd';

const defaction = '/proxy/web/v1/files';
const defbucket = 'cms';
const defname = 'data';

const defaultProps = {
  accept: '*',
  multiple: false,
  showUploadList: false,
  listType: 'text',
  //  value: undefined,
  action: defaction,
  name: defname,
  data: { bucket: defbucket },
};

export class FileUpload extends PureComponent {
  static getDerivedStateFromProps(nextProps, state) {
    if (!('value' in nextProps) || !nextProps.value) {
      return state;
    }
    const fileList = nextProps.value;

    if (!state && !FileUpload.isChg(fileList, state.validFilelist)) {
      // 无变化
      return state;
    }

    const validFilelist = fileList ? [...fileList] : [];
    if (validFilelist.length === 0) {
      return { fileList: [], validFilelist: [] };
    }
    // 获取新增的文件列表
    const tmp = fileList.filter(item => {
      return !state.fileList.some(i => {
        return i.url === item;
      });
    });
    // 原来的文件列表
    const old = state.fileList;
    // 正在上传的文件列表
    const nodone = old.filter(item => {
      return item.status !== 'done';
    });
    // 原来已经传完的文件列表,并且是以改变的值
    const done = old.filter(item => {
      return (
        item.status === 'done' &&
        fileList.some(i => {
          return item.url === i;
        })
      );
    });
    // 合并
    let i = -1;
    for (const item of tmp) {
      done.push({
        uid: `${i}`,
        name: item,
        status: 'done',
        url: item,
        thumbUrl: item,
      });
      i += -1;
    }
    done.sort((a, b) => {
      let ak = 0;
      let bk = 0;
      for (const key in fileList) {
        if (a.url === fileList[key]) {
          ak = key;
        } else if (b.url === fileList[key]) {
          bk = key;
        }
      }
      return ak - bk;
    });
    for (const item of nodone) {
      done.push(item);
    }
    return { ...state, fileList: done, validFilelist };
  }

  static isChg = (fileList, validFilelist) => {
    if (!validFilelist || !fileList) {
      if (!validFilelist === !fileList) {
        return false;
      }
      return true;
    }
    if (validFilelist.length !== fileList.length) {
      return true;
    }
    for (const key in fileList) {
      if (!validFilelist[key] || fileList[key] === validFilelist[key]) {
        return true;
      }
    }
    return false;
  };

  constructor(props) {
    super(props);
    let validFilelist = [];
    const { value, num } = props;
    const fileList = [];

    if (value && value.length) {
      validFilelist = [...value];
      let i = -1;

      for (const item of value) {
        fileList.push({
          uid: `${i}`,
          name: item,
          status: 'done',
          url: item,
          thumbUrl: item,
        });
        i += -1;
      }
    }
    let fnum = 3;
    if (num > 0) {
      fnum = num;
    }
    this.state = {
      num: this.props.num || fnum,
      fileList,
      validFilelist,
    };
  }

  onChange = info => {
    let { fileList } = info;

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-this.state.num);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      const out = { ...file };
      if (out.response) {
        // Component will show file.url as link
        out.url = out.response.url;
      }
      return out;
    });

    // 3. Filter successfully uploaded files according to response from server
    fileList = fileList.filter(file => {
      if (file.response) {
        return !!file.response.url;
      }
      return true;
    });
    // const oldList = this.state.fileList;
    // fileList = [...oldList, ...fileList];
    this.setState({ fileList });
    // this.setState({ fileList });
    this.forceUpdate();
    this.triggerChange({ fileList });
  };

  triggerChange = ({ fileList }) => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      const tmp = fileList.filter(item => {
        return {}.hasOwnProperty.call(item, 'url');
      });
      const out = tmp.map(item => {
        if ({}.hasOwnProperty.call(item, 'url')) {
          return item.url;
        } else {
          return '';
        }
      });
      if (FileUpload.isChg(out, this.state.validFilelist)) {
        this.setState({ validFilelist: [...out] });
        onChange(out);
      }
    }
  };

  render() {
    const { children, uploadProps } = this.props;
    const { fileList } = this.state;
    let uprops = uploadProps ? { ...defaultProps, ...uploadProps } : { ...defaultProps };
    uprops = { ...uprops, onChange: this.onChange, fileList };
    return <Upload {...uprops}>{children}</Upload>;
  }
}
