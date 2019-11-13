import { stringify } from 'qs';
import request, { baseURLV1 } from '../utils/request';

// 服务名
const serviceName = 'enterprise_users';

export default class PersonalService {
  static async queryPersonalTotalInfo() {
    return request(`${baseURLV1}/${serviceName}/count`);
  }

  static async queryPersonalInfos(params) {
    return request(`${baseURLV1}/${serviceName}?${stringify(params)}`);
  }

  static async getUserClass() {
    return request(`${baseURLV1}/${'user_types'}`);
  }

  // 查询单条人员数据
  static async get(params) {
    return request(`${baseURLV1}/${serviceName}/${params.record_id}`);
  }

  static async delePerson(params) {
    return request(`${baseURLV1}/${serviceName}/${params}`, {
      method: 'DELETE',
    });
  }

  static async update(params) {
    return request(`${baseURLV1}/${serviceName}/${params.record_id}`, {
      method: 'PUT',
      body: params,
    });
  }

  static async unAuth({ recordId }) {
    return request(`${baseURLV1}/${serviceName}/${recordId}/unauth`, {
      method: 'PUT',
    });
  }

  static async writeOff({ recordId }) {
    return request(`${baseURLV1}/${serviceName}/${recordId}/writeoff`, {
      method: 'PUT',
    });
  }

  static async prohibit({ payload }) {
    return request(`${baseURLV1}/${serviceName}/${payload.id}/${payload.type}/${payload.act}`, {
      method: 'PUT',
    });
  }
}
