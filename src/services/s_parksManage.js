import { stringify } from 'qs';
import request, { baseURLV1 } from '../utils/request';

// 日志管理请求接口
const buRouter = 'parks';
export default class OrgsService {
  // 获取用户信息
  static async getParks() {
    const param = { type: 10, parent_id: '' };
    return request(`${baseURLV1}/${buRouter}/select?${stringify(param)}`);
  }
}
