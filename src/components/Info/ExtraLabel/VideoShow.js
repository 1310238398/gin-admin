import React, { PureComponent } from 'react';
import { Card, Alert } from 'antd';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import style from './VideoShow.less';

export default class VideoShow extends PureComponent {
  static defaultVideoProps = {
    accept: 'video/*',
  };

  static defaultPicProps = {
    accept: 'image/*',
  };

  static getDerivedStateFromProps(nextProps, state) {
    if ('value' in nextProps && nextProps.value !== undefined) {
      const newValue = VideoShow.parseValue(nextProps.value);
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
    const value = VideoShow.parseValue(this.props.value);
    this.state = {
      value,
    };
  }

  render() {
    const {
      value: { video_src, video_pic },
    } = this.state;
    return (
      <Card
        hoverable
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
            {!video_pic && <Alert message="没有上传图片" type="info" />}
            {!video_src && <Alert message="没有上传视频" type="info" />}
          </div>
        }
      />
    );
  }
}
