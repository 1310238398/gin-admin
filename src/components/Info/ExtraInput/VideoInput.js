import React, { PureComponent } from 'react';
import { Card, Icon, Alert } from 'antd';
import { DefaultPlayer as Video } from 'react-html5video';
import { FileUpload } from './FileUpload';
import 'react-html5video/dist/styles.css';
import style from './VideoInput.less';

export default class VideoInput extends PureComponent {
  static defaultVideoProps = {
    accept: 'video/*',
  };

  static defaultPicProps = {
    accept: 'image/*',
  };

  static getDerivedStateFromProps(nextProps, state) {
    if ('value' in nextProps && nextProps.value !== undefined) {
      const newValue = VideoInput.parseValue(nextProps.value);
      const oldValue = state.value;
      if (newValue.video_pic !== oldValue.video_pic || newValue.video_src !== oldValue.video_src) {
        return { ...state, value: { ...newValue } };
      }
    }
    return state;
  }

  static parseValue = value => {
    if (!value || typeof value !== 'string') {
      return {};
    }
    value = value.trim();
    if (value.indexOf('{') === 0) {
      // 是json对象
      try {
        const obj = JSON.parse(value);
        const { video_src, video_pic } = obj;
        return { video_src, video_pic };
      } catch (e) {
        return {};
      }
    }
    return { video_src: value, video_pic: false };
  };

  constructor(props) {
    super(props);
    const value = VideoInput.parseValue(this.props.value);
    this.state = {
      value,
    };
  }

  onVideoChange = fileList => {
    if (fileList && fileList.length > 0) {
      const v = { ...this.state.value };
      this.triggerChange({ ...v, video_src: fileList[0] });
    }
  };

  onPicChange = fileList => {
    if (fileList && fileList.length > 0) {
      const v = { ...this.state.value };
      this.triggerChange({ ...v, video_pic: fileList[0] });
    }
  };

  onDelete = () => {
    this.triggerChange({});
  };

  triggerChange = value => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(JSON.stringify(value));
    }
  };

  render() {
    const {
      value: { video_src, video_pic },
    } = this.state;
    const videoProp = { ...VideoInput.defaultVideoProps, disabled: !!video_src };
    const picProp = { ...VideoInput.defaultPicProps, disabled: !!video_pic };

    const srciconprop = !video_src ? { theme: 'twoTone' } : {};
    const piciconprop = !video_pic ? { theme: 'twoTone' } : {};
    const deliconprop = video_src || video_pic ? { theme: 'twoTone' } : {};
    return (
      <Card
        hoverable
        actions={[
          <FileUpload
            value={[video_src]}
            num={1}
            uploadProps={videoProp}
            onChange={this.onVideoChange}
          >
            <Icon type="video-camera" style={{ width: '100%' }} {...srciconprop} />
          </FileUpload>,
          <FileUpload value={[video_pic]} num={1} uploadProps={picProp} onChange={this.onPicChange}>
            <Icon type="picture" style={{ width: '100%' }} {...piciconprop} />
          </FileUpload>,
          <Icon type="delete" onClick={() => this.onDelete()} {...deliconprop} />,
        ]}
        bodyStyle={{ padding: 0 }}
        cover={
          <div>
            {(video_pic || video_src) && (
              <Video
                className={style.video}
                // loop
                // muted
                // controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                poster={video_pic || ''}
                src={video_src}
              />
            )}
            {!video_pic && <Alert message="没有上传视频封面" type="info" />}
            {!video_src && <Alert message="没有上传视频" type="info" />}
          </div>
        }
      />
    );
  }
}
