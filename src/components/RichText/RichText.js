import { Input, Card, Button } from 'antd';
import 'braft-editor/dist/index.css';
import React, { Component } from 'react';
import BraftEditor, { EditorState } from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import styles from './style.less';

const { TextArea } = Input;
export default class RichText extends Component {
  constructor(props) {
    super(props);
    const { inputRef } = this.props;
    this.editor = inputRef || React.createRef();
    this.t = null;
    const state = {
      full: false,
      isHtml: false,
      fullstyles: {},
      //  value: EditorState.createFrom(value),
      initialValue: '',
    };
    if ('data-__meta' in props) {
      const { initialValue } = props['data-__meta'];
      this.initialValue = initialValue;
      this.text = initialValue;
    }
    this.insertImages = this.insertImages.bind(this);
    this.state = state;
  }

  shouldComponentUpdate(nextProps) {
    const { value } = nextProps;
    const editorState = this.value;
    if ('data-__meta' in nextProps) {
      const { initialValue } = nextProps['data-__meta'];
      if (this.initialValue !== initialValue) {
        this.initialValue = initialValue;
        this.value = EditorState.createFrom(initialValue);
        this.text = this.initialValue;
        this.triggerChange();
        return true;
      }
    }
    if (editorState) {
      if (editorState && editorState.toHTML() === value) {
        return true;
      }
      ContentUtils.clear(editorState);
      ContentUtils.insertHTML(editorState, value);
      // this.triggerChange({ value });
    } else if (value !== undefined) {
      this.value = EditorState.createFrom(value);
      this.context = value;
      // this.triggerChange({ value });
    }
    return true;
  }

  componentWillUnmount() {
    if (this.t) {
      clearTimeout(this.t);
    }
  }

  handleTextAreaChange = content => {
    this.value = EditorState.createFrom(content);
    this.text = content;
    this.triggerChange();
    // this.forceUpdate();
  };

  handleRichChange = editorState => {
    this.value = editorState;
    this.text = editorState.toHTML();
    this.triggerChange();
  };

  triggerChange = () => {
    // Should provide an event to pass value to Form.
    if (this.props.onChange) {
      if (this.t === null) {
        this.t = setTimeout(() => {
          this.props.onChange(this.text);
          this.t = null;
        }, 100);
      }
    }
  };

  handleRawChange = () => {
    // console.log(rawContent)
  };

  uploadFn = param => {
    const { bucket } = this.props;
    const serverURL = '/proxy/web/v1/files';
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    if (bucket) {
      fd.append('bucket', bucket);
    } else {
      fd.append('bucket', 'cms');
    }
    // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容
    //   console.log(param.libraryId);

    const successFn = ({ currentTarget: { response } }) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      const res = JSON.parse(response);
      param.success({
        id: res.url,
        title: res.name,
        alt: res.name,
        url: res.url,
        loop: false, // 指定音视频是否循环播放
        autoPlay: false, // 指定音视频是否自动播放
        controls: true, // 指定音视频是否显示控制栏
        // poster: 'http://xxx/xx.png', // 指定视频播放器的封面
      });
    };

    const progressFn = event => {
      // 上传进度发生变化时调用param.progress
      param.progress((event.loaded / event.total) * 100);
    };

    const errorFn = () => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.',
      });
    };

    xhr.upload.addEventListener('progress', progressFn, false);
    xhr.addEventListener('load', successFn, false);
    xhr.addEventListener('error', errorFn, false);
    xhr.addEventListener('abort', errorFn, false);

    fd.append('data', param.file);
    xhr.open('POST', serverURL, true);
    xhr.send(fd);
  };

  showFull = () => {
    if (this.state.full) {
      // 取消全屏
      this.setState({ fullstyles: {}, full: false });
      return;
    }
    this.setState({
      full: true,
      fullstyles: {
        position: 'fixed',
        zIndex: 1000000,
        top: '0px',
        right: '0px',
        left: '0px',
        bottom: '0px',
        background: '#ffffff',
      },
    });
  };

  chgText2Html = () => {
    if (this.state.isHtml) {
      this.setState({ isHtml: false });
    } else {
      this.setState({ isHtml: true });
    }
  };

  renderTextArea = () => {
    const { isHtml, full } = this.state;
    const { height } = this.props.rich;
    const { value } = this;
    const cstyles = {};
    if (isHtml) {
      if (full) {
        cstyles.height = '100%';
      } else {
        cstyles.height = `${height}px`;
      }
      return (
        <Card
          title={<Button onClick={this.chgText2Html}>切换</Button>}
          style={cstyles}
          headStyle={{ height: '40px' }}
          bodyStyle={{ height: 'calc(100% - 60px)' }}
        >
          <TextArea
            onChange={e => {
              this.handleTextAreaChange(e.currentTarget.value);
            }}
            style={{ height: '100%' }}
            defaultValue={value.toHTML()}
          />
        </Card>
      );
    }
  };

  insertImages(image) {
    const s = this.editor.current.getValue();
    if (this.editor.current.isLiving)
      this.editor.current.setValue(
        ContentUtils.insertMedias(s, [{ url: image, type: 'IMAGE', name: image }])
      );
  }

  render() {
    const { fullstyles, full, isHtml } = this.state;
    const cn = this.props.className || styles.editorWrap;
    // const { value, editable } = this.state;
    // const fname = full ? '取消全屏' : '全屏';
    // const ftype = full ? 'fullscreen-exit' : 'full_screen';

    const contentStyle = full ? { height: 'calc(100% - 100px)' } : {};
    // if (full) {
    //   fullProps.height = '100%'; height:  calc(100% - 100px);
    // }
    // }

    const editorProps = {
      contentFormat: 'html',
      pasteMode: '',
      value: this.value,
      defaultValue: {},
      ...this.props.rich,
      contentStyle,
      onRawChange: this.handleRawChange,
      onChange: this.handleRichChange,
      ref: this.editor,
      media: {
        allowPasteImage: true,
        image: true, // 开启图片插入功能
        video: true, // 开启视频插入功能
        audio: true, // 开启音频插入功能
        uploadFn: this.uploadFn,
        // onChange: e => {
        //   //console.log(e);
        // },
      },
      extendControls: [
        // {
        //   key: 'jgt_full',
        //   type: 'button',
        //   text: fname,
        //   html: `<span style="color:red;">${fname}</span>`,
        //   hoverTitle: fname,
        //   className: 'preview-button',
        //   onClick: this.showFull,
        // },
        {
          key: 'jgt_chg',
          type: 'button',
          text: '切换',
          html: '<span style="color:red;">切换</span>',
          hoverTitle: '源码切换',
          className: 'preview-button',
          onClick: this.chgText2Html,
        },
      ],
    };
    if ('data-__meta' in this.props) {
      const { initialValue } = this.props['data-__meta'];
      editorProps.defaultValue = EditorState.createFrom(initialValue);
    } else {
      editorProps.defaultValue = EditorState.createFrom('');
    }

    return (
      <div className={cn} style={{ ...fullstyles }}>
        {this.renderTextArea()}
        {!isHtml && <BraftEditor {...editorProps} />}
      </div>
    );
  }
}
