import { stringify } from 'qs';
import request, { cmsURLV1 } from '../utils/request';
// import { isError, cmsURLV1 } from '../utils/utils';
// 日志管理请求接口

const buRouter = 'groupinfos';
export default class GroupInfosService {
  static async queryGroupInfoPage(groupid, params) {
    return request(
      `${cmsURLV1}/${buRouter}/${groupid}/infos?${stringify(params, {
        arrayFormat: 'repeat',
      })}`,
      { method: 'GET' }
    );
  }

  static async appendInfo(groupid, infoids) {
    return request(`${cmsURLV1}/${buRouter}/${groupid}/infos/${infoids}`, { method: 'PUT' });
  }

  static async updateWeight(groupid, giid, weight) {
    return request(`${cmsURLV1}/${buRouter}/${groupid}/weight/${giid}`, {
      method: 'PUT',
      body: { weight },
    });
  }

  static async del(groupid, infoid) {
    const ids = infoid.join(',');
    return request(`${cmsURLV1}/${buRouter}/${groupid}/infos/${ids}`, {
      method: 'DELETE',
    });
  }

  static async existsGroup(groupid, infoid) {
    const ids = infoid.join(',');
    return request(`${cmsURLV1}/${buRouter}/${groupid}/exists/${ids}`, {
      method: 'GET',
    });
  }
}
