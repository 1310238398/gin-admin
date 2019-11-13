import request, { cmsURLV1 } from '../utils/request';
// import { isError, cmsURLoper } from '../utils/utils';

// 日志管理请求接口
const buRouter = 'orgs';
export default class OrgsService {
  // 获取用户信息
  static async getOrg(orgid) {
    return request(`${cmsURLV1}/${buRouter}/${orgid}`, null, true);
  }

  static async openOrg(orgid) {
    return request(`${cmsURLV1}/${buRouter}/${orgid}`, {
      method: 'POST',
      body: { icon: [], columnids: [] },
    });
  }

  static async publishOrg(orgid) {
    return request(`${cmsURLV1}/${buRouter}/${orgid}/publish`, {
      method: 'PUT',
    });
  }

  static async noPublishOrg(orgid) {
    return request(`${cmsURLV1}/${buRouter}/${orgid}/nopublish`, {
      method: 'PUT',
    });
  }

  static async putColumns(orgid, { columnids }) {
    return request(`${cmsURLV1}/${buRouter}/${orgid}/columns`, {
      method: 'PUT',
      body: { columnids },
    });
  }

  static async putIcon(orgid, { icon }) {
    return request(`${cmsURLV1}/${buRouter}/${orgid}/icon`, {
      method: 'PUT',
      body: { icon },
    });
  }
}
