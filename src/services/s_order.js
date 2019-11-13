import request, { mallURLV1 } from '../utils/request';
import { stringify } from 'qs';

export default class OrderService {
  /* 商品ID */
  static async getStoreId() {
    return request(`${mallURLV1}/stores`, {
      method: 'GET',
    });
  }
  /* 订单列表 */
  static queryPage(storeId, params) {
    return request(`${mallURLV1}/${storeId}/orders?${stringify(params)}`, {
      method: 'GET',
    });
  }
  /* 获取单个 */
  static async get(store, params) {
    return request(`${mallURLV1}/${store}/orders/${params.order_id}`, {
      method: 'GET',
    });
  }
  /* 配送 */
  static async distribution(params) {
    return request(`${mallURLV1}/${params.store_id}/orders/${params.order_id}/sendOut`, {
      method: 'PUT',
    });
  }

  static async reply(params) {
    return request(`${mallURLV1}/${params.store_id}/salseRecords/${params.sales_record_id}/reply`, {
      method: 'PUT',
      body: params,
    });
  }
  /* 处理完成 */
  static async complete(params) {
    return request(`${mallURLV1}/${params.store_id}/orders/${params.order_id}/ready`, {
      method: 'PUT',
    });
  }
  /* 接单 */
  static async checkIn(params) {
    return request(`${mallURLV1}/${params.store_id}/orders/${params.order_id}/checkIn`, {
      method: 'PUT',
    });
  }
  /* 拒单 */
  static async reject(params) {
    return request(`${mallURLV1}/${params.store_id}/orders/${params.order_id}/reject`, {
      method: 'PUT',
    });
  }
  /* 投诉不处理 */
  static async nodispose(params) {
    debugger
    return request(`${mallURLV1}/${params.store_id}/orders/${params.order_id}/complainReject`, {
      method: 'PUT',
    });
  }
  /* 退款 */
  static async refund(params, price) {
    return request(
      `${mallURLV1}/${params.store_id}/orders/${params.order_id}/passRefund?price=${price}`,
      {
        method: 'PUT',
      }
    );
  }

  // 拒绝退款
  static async rejectRefund(params, price) {
      return request(
        `${mallURLV1}/${params.store_id}/orders/${params.order_id}/rejectRefund?price=${price}`,
        {
          method: 'PUT',
        }
      );
    }
  /* 投诉确认 */
  static async complainCheck(params, price) {
    return request(`${mallURLV1}/${params.store_id}/orders/${params.order_id}/complainCheck`, {
      method: 'PUT',
    });
  }
}
