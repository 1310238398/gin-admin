import { stringify } from 'qs';
import request, { cmsURLV1 } from '../utils/request';

// 日志管理请求接口
const buRouter = 'reviews';

export default class ReviewsService {
  static async queryPage(params) {
    return request(`${cmsURLV1}/${buRouter}?${stringify(params, { arrayFormat: 'repeat' })}`, {
      method: 'GET',
    });
  }

  static async queryAll({ targetType, targetID }) {
    return request(`${cmsURLV1}/${buRouter}/target/${targetType}/${targetID}`, {
      method: 'GET',
    });
  }

  /**
   * 发布信息
   * @param {信息编号} infoid
   */
  static async publishInfo(payload) {
    return request(`${cmsURLV1}/${buRouter}/${payload.info_id}/publish`, {
      method: 'PUT',
    });
  }

  /**
   *审核通过
   * @param {targetType 类型, targetID id, reason 原因} targetType
   */
  static async submitOk({ targetType, targetID, reason }) {
    return request(`${cmsURLV1}/${buRouter}`, {
      method: 'POST',
      body: {
        result: true,
        target_type: targetType,
        target_id: targetID,
        reason,
      },
    });
  }

  /**
   *
   * @param {targetType 类型, targetID id, reason 原因} param0
   */
  static async submitNo({ targetType, targetID, reason }) {
    return request(`${cmsURLV1}/${buRouter}`, {
      method: 'POST',
      body: {
        result: false,
        target_type: targetType,
        target_id: targetID,
        reason,
      },
    });
  }

  static async queryDesc(infoid) {
    return request(`${cmsURLV1}/${buRouter}/${infoid}`, {
      method: 'GET',
    });
  }
}
