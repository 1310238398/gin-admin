import React, { Component } from 'react';
import { DatePicker, message } from 'antd';
// import PropTypes from 'prop-types';
import moment from 'moment';

const { RangePicker } = DatePicker;
const defaultFormat = 'YYYY-MM-DD HH:mm:ssZ';
const defaultShowFormat = 'YYYY-M-D HH:mm';
export default class SchTime extends Component {
  constructor(props) {
    super(props);
    const { defaultValue } = props;
    this.setValue(defaultValue);
  }

  shouldComponentUpdate(nextProp) {
    const { value } = nextProp;
    if (value) {
      const newv = this.parseValue(value);
      const oldeq = this.value.eq ? this.value.eq.format(this.getFormat()) : null;
      if (!oldeq !== !newv.eq) {
        this.value = newv;
        return true;
      }
      const oldstart = this.value.start ? this.value.start.format(this.getFormat()) : null;
      if (oldstart !== newv.start) {
        this.value = newv;
        return true;
      }
      const oldend = this.value.end ? this.value.end.format(this.getFormat()) : null;
      if (oldend !== newv.end) {
        this.value = newv;
        return true;
      }
    } else {
      this.value = {};
    }
    return true;
  }

  // UNSAFE_componentWillUpdate(nextProp) {
  //   const { value } = nextProp;
  //   if (value) {
  //     const newv = this.parseValue(value);
  //     const oldeq = this.value.eq
  //       ? this.value.eq.format(this.getFormat())
  //       : null;
  //     if (!oldeq !== !newv.eq) {
  //       this.value = newv;
  //       return true;
  //     }
  //     const oldstart = this.value.start
  //       ? this.value.start.format(this.getFormat())
  //       : null;
  //     if (oldstart !== newv.start) {
  //       this.value = newv;
  //       return true;
  //     }
  //     const oldend = this.value.end
  //       ? this.value.end.format(this.getFormat())
  //       : null;
  //     if (oldend !== newv.end) {
  //       this.value = newv;
  //       return true;
  //     }
  //   } else {
  //     this.value = {};
  //   }
  //   return true;
  // }

  setValue(v) {
    this.value = this.parseValue(v);
  }

  outValue = () => {
    const { start, eq, end } = this.value;
    const out = {};
    if (eq) {
      out.eq = eq.format(this.getFormat());
    }
    if (start) {
      out.start = start.format(this.getFormat());
    }
    if (end) {
      out.end = end.format(this.getFormat());
    }
    return JSON.stringify(out);
  };

  parseTime = dateStr => {
    return moment(dateStr, this.getFormat());
  };

  formatTime = mtime => {
    return mtime.format(this.getFormat());
  };

  getFormat = () => {
    const { format } = this.props;
    return format || defaultFormat;
  };

  getShowFormat = () => {
    const { showformat } = this.props;
    return showformat || defaultShowFormat;
  };

  onChangeEq = date => {
    this.value.eq = date;
  };

  onChangeDate = start => {
    this.value = { start: start[0], end: start[1] };
    this.triggerHandler();
  };

  // onChangeCalendar = (start, end, a, b) => {
  //   this.value = { start, end };
  //   this.triggerHandler();
  // };

  getRanges = () => {
    // const now = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD');
    // const month = moment(moment().format('YYYY-MM'), 'YYYY-MM');
    return {
      今天: [moment().startOf('day'), moment().endOf('day')],
      本周: [moment().startOf('week'), moment().endOf('week')],
      本月: [moment().startOf('month'), moment().endOf('month')],
    };
  };

  triggerHandler = () => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(this.outValue());
    }
  };

  parseValue(v) {
    let out = {};
    if (typeof v === 'string' && v.indexOf('{') >= 0) {
      // 精确时间转换value
      out = JSON.parse(v);
    } else if (typeof v === 'string' && v.indexOf('{') === -1) {
      // 精确时间转换value
      out = { eq: this.parseTime(v) };
    } else if (typeof v === 'object') {
      const { start, eq, end } = v;
      out = {};
      if (eq) {
        out.eq = this.parseTime(eq);
      }
      if (start) {
        out.start = this.parseTime(start);
      }
      if (end) {
        out.end = this.parseTime(end);
      }
    } else if (v) {
      message.error('搜索时间控件defaultValue设置错误');
    } else {
      out = {};
    }
    return out;
  }

  renderRangePicker = () => {
    const dprops = {
      showTime: true,
      placeholder: ['请选择', '请选择'],
      ranges: this.getRanges(),
      style: { width: 'auto' },
      ...this.props,
      format: this.getShowFormat(),
      onChange: (start, end) => this.onChangeDate(start, end),
      //  onCalendarChange: (start, end) => this.onChangeCalendar(start, end),
      value: [this.value.start, this.value.end],
    };
    return <RangePicker {...dprops} />;
  };

  renderEq = () => {
    const dprops = {
      showTime: true,
      placeholder: '请选择时间',
      ...this.props,
      format: this.getShowFormat(),
      onChange: this.onChangeEq,
      value: this.value.eq,
    };
    return <DatePicker {...dprops} />;
  };

  render() {
    const { isRange } = this.props;
    if (isRange) {
      return this.renderRangePicker();
    }

    return this.renderEq();
  }
}
