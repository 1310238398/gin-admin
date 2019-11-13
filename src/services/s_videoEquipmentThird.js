import { stringify } from 'qs';
import request, { baseURLV1 } from '../utils/request';

const router = 'monitor_thirds';

export default class VideoEquipmentThirdService {
  static async query(params) {
    return request(`${baseURLV1}/${router}?${stringify(params)}`);
  }

  static async get(params) {
    return request(`${baseURLV1}/${router}/${params.record_id}`);
  }

  static async create(params) {
    return request(`${baseURLV1}/${router}`, {
      method: 'POST',
      body: params,
    });
  }

  static async update(params) {
    return request(`${baseURLV1}/${router}/${params.record_id}`, {
      method: 'PUT',
      body: params,
    });
  }

  static async del(params) {
    return request(`${baseURLV1}/${router}/${params.record_id}`, {
      method: 'DELETE',
    });
  }
}
