import { stringify } from 'qs';
import request, { cmsURLV1 } from '../utils/request';
// import { isError, cmsURLV1 } from '../utils/utils';

// 日志管理请求接口
const buRouter = 'groups';

export default class GroupsService {
  static async queryPage(params) {
    return request(`${cmsURLV1}/${buRouter}?${stringify(params, { arrayFormat: 'repeat' })}`, {
      method: 'GET',
    });
    // .then(response => {
    //   if (isError(response)) {
    //     return {};
    //   }
    //   return response;
    // });
  }

  static async submitGroupAdd(payload) {
    return request(`${cmsURLV1}/${buRouter}`, {
      method: 'POST',
      body: payload,
    });
  }

  static async submitUpdateDesc(groupid, payload) {
    return request(`${cmsURLV1}/${buRouter}/${groupid}/desc`, {
      method: 'PUT',
      body: payload,
    });
  }

  static async submitUpdateCtrl(groupid, payload) {
    return request(`${cmsURLV1}/${buRouter}/${groupid}/ctrl`, {
      method: 'PUT',
      body: payload,
    });
  }

  // static async  submitUpdateExtra(groupid,payload) {
  //   return request(`${cmsURLV1}/${buRouter}/${groupid}/extra`, {
  //     method: 'PUT',
  //     body: payload,
  //   });
  // }
  static async queryGroup(groupid) {
    return request(`${cmsURLV1}/${buRouter}/${groupid}`, {
      method: 'GET',
    });
  }

  static async queryDesc(groupid) {
    return request(`${cmsURLV1}/${buRouter}/${groupid}/desc`, {
      method: 'GET',
    });
  }

  static async queryCtrl(groupid) {
    return request(`${cmsURLV1}/${buRouter}/${groupid}/ctrl`, {
      method: 'GET',
    });
  }

  static async delGroup(groupid) {
    return request(`${cmsURLV1}/${buRouter}/${groupid}`, {
      method: 'DELETE',
    });
  }

  // static async publishGroup(groupid) {
  //   return request(`${cmsURLV1}/${buRouter}/${groupid}/publish`, {
  //     method: 'PUT',
  //   });
  // }
  // static async unpublishGroup(groupid) {
  //   return request(`${cmsURLV1}/${buRouter}/${groupid}/unpublish`, {
  //     method: 'PUT',
  //   });
  // }
  static async start(groupid) {
    return request(`${cmsURLV1}/${buRouter}/${groupid}/startcollecting`, {
      method: 'PUT',
    });
  }

  static async stop(groupid) {
    return request(`${cmsURLV1}/${buRouter}/${groupid}/stopcollecting`, {
      method: 'PUT',
    });
  }

  static async recoverGroup(groupid) {
    return request(`${cmsURLV1}/${buRouter}/${groupid}/recover`, {
      method: 'PUT',
    });
  }

  static async destroyGroup(groupid) {
    return request(`${cmsURLV1}/${buRouter}/${groupid}/destroy`, {
      method: 'DELETE',
    });
  }

  // static async queryExtraTypes() {
  //   return request(`${cmsURLV1}/extratypes`, {
  //     method: 'GET',
  //   });
  // }
}
