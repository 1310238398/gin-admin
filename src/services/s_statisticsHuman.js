import { stringify } from 'qs';
import request from '../utils/request';
import { isError, baseURLV1 } from '../utils/utils';

// 日志管理请求接口
const buRouter = 'parks';
export default class StatisticsHuman {
  // 获取用户信息
  static async getParks(code) {
    return request(`${baseURLV1}/${buRouter}/select?${stringify(code)}`)
      .then(response => {
        if (isError(response)) {
          return [];
        }
        return response;
      })
      .catch(() => {
        return [];
      });
  }
}
