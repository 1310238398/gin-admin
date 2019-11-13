import { stringify } from 'qs';
import request, { cmsURLV1 } from '../utils/request';
// import { isError, cmsURLV1 } from '../utils/utils';

// 日志管理请求接口
const buRouter = 'ints/types';
const buRouterTypeall = 'ints/typeall';

export default class IntTypeService {
  static async queryAll() {
    return request(`${cmsURLV1}/${buRouterTypeall}`, {
      method: 'GET',
    });
  }

  static async queryPage(params) {
    return request(`${cmsURLV1}/${buRouter}?${stringify(params, { arrayFormat: 'repeat' })}`, {
      method: 'GET',
    });
  }

  static async add(payload) {
    return request(`${cmsURLV1}/${buRouter}`, {
      method: 'POST',
      body: payload,
    });
  }

  static async update(code, payload) {
    return request(`${cmsURLV1}/${buRouter}/${code}`, {
      method: 'PUT',
      body: payload,
    });
  }

  static async query(code) {
    return request(`${cmsURLV1}/${buRouter}/${code}`, {
      method: 'GET',
    });
  }

  static async del(code) {
    return request(`${cmsURLV1}/${buRouter}/${code}`, {
      method: 'DELETE',
    });
  }

  static async lock(code) {
    return request(`${cmsURLV1}/${buRouter}/${code}/lock`, {
      method: 'PUT',
    });
  }

  static async unlock(code) {
    return request(`${cmsURLV1}/${buRouter}/${code}/unlock`, {
      method: 'PUT',
    });
  }

  static async recover(code) {
    return request(`${cmsURLV1}/${buRouter}/${code}/recover`, {
      method: 'PUT',
    });
  }

  static async destroy(code) {
    return request(`${cmsURLV1}/${buRouter}/${code}/destroy`, {
      method: 'DELETE',
    });
  }
}
