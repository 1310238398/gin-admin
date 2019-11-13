import moment from 'moment';
import md5 from 'md5';
import uuid from 'uuid/v4';
import { isNullOrUndefined } from 'util';

// 格式化时间戳
export function formatTimestamp(val, format) {
  let f = 'YYYY-MM-DD HH:mm:ss';
  if (format) {
    f = format;
  }
  return moment.unix(val).format(f);
}

// 解析时间戳
export function parseTimestamp(val) {
  return moment.unix(val);
}

// 解析日期
export function parseDate(val) {
  return moment(val);
}

// 格式化日期
export function formatDate(val, format) {
  let f = 'YYYY-MM-DD HH:mm:ss';
  if (format) {
    f = format;
  }
  return moment(val).format(f);
}
// 解析时间戳
export function parseUtcTime(val, format) {
  let f = 'YYYY-MM-DD HH:mm:ss';
  if (format) {
    f = format;
  }
  return moment(val).format(f);
}
// md5加密
export function md5Hash(value) {
  return md5(value);
}

// 创建UUID
export function newUUID() {
  return uuid();
}

// 解析时间戳
export function parseUtcTimeFromNow(val) {
  return moment(val).fromNow();
}
/**
 * 检查对象是否为空对象 {}, null, undefined
 * WGH
 * @param {目标对象} value
 */
export function isObjectNullOrUndefinedOrEmpty(value) {
  if (isNullOrUndefined(value)) {
    return true;
  }
  if (typeof value !== 'object') {
    return false;
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const key in value) {
    if ({}.hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

// 建筑状态
export const buildingStatus = {
  10: '自用',
  20: '已售完',
  21: '待售',
  30: '已租完',
  31: '待租',
  40: '租售完成',
  41: '待租待售',
  42: '租售中',
};

// 建筑门牌状态
export const buildingRoomStatus = {
  10: '自用',
  20: '已售',
  21: '待售',
  22: '锁定',
  30: '已租',
  31: '待租',
};

// 解析建筑状态
export function parseBuildingStatus(data) {
  // 自用
  if (data.self_use === 1) {
    return 10;
  }

  // 售完、租完
  if (data.sale_status === 1 && data.rental_status === 1) {
    return 40;
  } else if (data.sale_status === 1) {
    // 已售完，待租
    if (data.rental_status === 2 || data.rental_status === 3) {
      // 如果为门牌，则状态为待租，否则为租售中
      if (data.btype === 50) {
        return 31;
      }
      return 42;
    }
    return 20;
  } else if (data.planned_use === 2 && data.rental_status === 1) {
    // 已租完
    return 30;
  }

  if (data.planned_use === 1) {
    if (data.sale_status === 2) {
      return 21;
    } else if (data.sale_status === 3) {
      return 42;
    }
    // 规划用途为出售
    return 21;
  } else if (data.planned_use === 2) {
    if (data.rental_status === 3) {
      return 42;
    }
    // 规划用途为自持
    return 31;
  } else if (data.planned_use === 3) {
    // 规划用途为混合，如果处于未售、未租状态则为待租待售
    if (data.sale_status === 2 && data.rental_status === 2) {
      return 41;
    }
    return 42;
  }

  return 0;
}

// 解析建筑状态文本
export function parseBuildingStatusText(data) {
  const status = parseBuildingStatus(data);
  if (data.btype === 50) {
    return buildingRoomStatus[status];
  }
  return buildingStatus[status];
}

// 获取当前的秒时间戳
export function getNowUnix() {
  return moment().unix();
}

// 获取photo地址
export function getPhoto(v) {
  if (!v) {
    return '';
  }
  if (v[0] === '/') {
    return v;
  }
  return `/${v}`;
}
