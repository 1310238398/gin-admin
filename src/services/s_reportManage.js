import { stringify } from 'qs';
import request, { cmsURLV1 } from '../utils/request';

// 日志管理请求接口
const buRouter = 'report';

export default class InfosService {
  static async queryPage(params) {
    return request(`${cmsURLV1}/${buRouter}?${stringify(params, { arrayFormat: 'repeat' })}`, {
      method: 'GET',
    });
  }

  static async queryOne(id) {
    return request(`${cmsURLV1}/${buRouter}/${id}`, {
      method: 'GET',
    });
  }

  /**
   * 删除信息
   * @param {信息编号} id
   */
  static async delete(id) {
    return request(`${cmsURLV1}/${buRouter}/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * 处理举报
   * @param {信息编号} id
   */
  static async do({ id, result }) {
    return request(`${cmsURLV1}/${buRouter}/${id}/do`, {
      method: 'PUT',
      body: { result },
    });
  }
}
