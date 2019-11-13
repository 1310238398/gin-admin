import React from 'react';
import { message } from 'antd';
import { getUUID } from '@/utils/utils';

class Monitor extends React.Component {
  wsAddr = 'rtsp.xiaoyuanjijiehao.com';

  clientID = getUUID();

  componentDidMount() {}

  componentWillUnmount() {
    if (this.player) {
      try {
        const ws = new WebSocket(
          `${this.getWSProtocol()}://${this.wsAddr}/ws/rtsp/stop/${this.clientID}`,
          ['rtsp']
        );
        ws.addEventListener('message', e => {
          const data = JSON.parse(e.data);
          if (data.status === 'OK') {
            ws.close();
          }
        });
        this.player.destroy();
      } catch (e) {
        message.error(e);
      }
    }
  }

  getWSProtocol = () => {
    let p = 'ws';
    if (window.location.href.startsWith('https')) {
      p = 'wss';
    }
    return p;
  };

  handleCam = el => {
    if (this.player) {
      return;
    }

    const { id, width, height } = this.props;
    this.player = new window.JSMpeg.Player(
      `${this.getWSProtocol()}://${this.wsAddr}/ws/rtsp?id=${id}&cid=${
        this.clientID
      }&size=${width}x${height}`,
      {
        canvas: el,
        autoplay: true,
        protocols: ['rtsp'],
      }
    );
  };

  render() {
    const { width, height, ...rest } = this.props;
    return (
      <canvas
        ref={el => {
          this.handleCam(el);
        }}
        style={{ backgroundColor: 'transparent', width, height }}
        {...rest}
      />
    );
  }
}

export default Monitor;
