import React, { PureComponent } from 'react';
import VideoShow from './VideoShow';

export default class ExtraLabel extends PureComponent {
  creText = (prop, params, value) => {
    return value;
  };

  creVideo = (prop, params, value) => {
    return <VideoShow value={value} />;
  };

  creRangeNumber = (prop, params, value) => {
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'number') {
      return value;
    }
    const min = value && value.min;
    const max = value && value.max;
    return (
      <div>
        <span>{min}</span>
        <span>～</span>
        <span>{max}</span>
      </div>
    );
  };

  // creFile = (prop, params) => {
  //   const nprop = {
  //     ...{ bucket: 'cms', name: 'data', num: 9, listType: 'text', ...params },
  //   };
  //   return <PicturesWall {...nprop} />;
  // };
  renderValue = ({ kind, params, value }) => {
    const prop = {};

    switch (kind) {
      case 'text':
        return this.creText(prop, params, value);
      case 'int':
        return this.creText(prop, params, value);
      case 'file':
        return this.creText(prop, params);
      case 'video':
        return this.creVideo(prop, params, value);
      case 'rangeNumber':
        return this.creRangeNumber(prop, params, value);
      default:
        return this.creText(prop, params, value);
    }
  };

  render() {
    const {
      ctrl: {
        kind,
        // eslint-disable-next-line
        param_values,
      },
      value,
      renderHanler,
    } = this.props;
    const renderParam = { kind, params: param_values, value };
    if (renderHanler) {
      return <div>{renderHanler(renderParam)}</div>;
    }

    return <div>{this.renderValue(renderParam)}</div>;
  }
}
