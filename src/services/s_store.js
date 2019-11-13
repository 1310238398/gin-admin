import request, { mallURLV1 } from '../utils/request';

export default class StoreService {
  /* 获取店铺信息 */
  static async getStoreId() {
    return request(`${mallURLV1}/stores`, {
      method: 'GET',
    });
  }

  static async applyStore(params) {
    return request(`${mallURLV1}/stores/apply`, {
      method: 'POST',
      body: params,
    });
  }

  static async UpdateStore(params, storeId) {
    return request(`${mallURLV1}/${storeId}/apply`, {
      method: 'PUT',
      body: params,
    });
  }

  static async open(storeId) {
    return request(`${mallURLV1}/${storeId}/open`, {
      method: 'PUT',
    });
  }

  static async close(storeId) {
    return request(`${mallURLV1}/${storeId}/close`, {
      method: 'PUT',
    });
  }
}
