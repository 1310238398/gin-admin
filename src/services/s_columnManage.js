import { stringify } from 'qs';
import request, { cmsURLV1 } from '../utils/request';
// import { isError, cmsURLoper } from '../utils/utils';

// 日志管理请求接口
const buRouter = 'columns';

export default class ColumnsService {
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

  static async submitColumnAdd(payload) {
    return request(`${cmsURLV1}/${buRouter}`, {
      method: 'POST',
      body: payload,
    });
  }

  static async submitUpdateDesc(columnid, payload) {
    return request(`${cmsURLV1}/${buRouter}/${columnid}/desc`, {
      method: 'PUT',
      body: payload,
    });
  }

  static async submitUpdateCtrl(columnid, payload) {
    return request(`${cmsURLV1}/${buRouter}/${columnid}/ctrl`, {
      method: 'PUT',
      body: payload,
    });
  }

  static async submitUpdateExtra(columnid, payload) {
    return request(`${cmsURLV1}/${buRouter}/${columnid}/extra`, {
      method: 'PUT',
      body: payload,
    });
  }

  static async query(columnid) {
    return request(`${cmsURLV1}/${buRouter}/${columnid}`, {
      method: 'GET',
    });
  }

  static async queryDesc(columnid) {
    return request(`${cmsURLV1}/${buRouter}/${columnid}/desc`, {
      method: 'GET',
    });
  }

  static async queryCtrl(columnid) {
    return request(`${cmsURLV1}/${buRouter}/${columnid}/ctrl`, {
      method: 'GET',
    });
  }

  static async queryExtra(columnid) {
    return request(`${cmsURLV1}/${buRouter}/${columnid}/extra`, {
      method: 'GET',
    });
  }

  static async delColumn(columnid) {
    return request(`${cmsURLV1}/${buRouter}/${columnid}`, {
      method: 'DELETE',
    });
  }

  static async lock(columnid) {
    return request(`${cmsURLV1}/${buRouter}/${columnid}/lock`, {
      method: 'PUT',
    });
  }

  static async unlock(columnid) {
    return request(`${cmsURLV1}/${buRouter}/${columnid}/unlock`, {
      method: 'PUT',
    });
  }

  static async recover(columnid) {
    return request(`${cmsURLV1}/${buRouter}/${columnid}/recover`, {
      method: 'PUT',
    });
  }

  static async destroy(columnid) {
    return request(`${cmsURLV1}/${buRouter}/${columnid}/destroy`, {
      method: 'DELETE',
    });
  }

  static async queryColumnTree(org, owner, column, sys) {
    const params = {};
    if (column) {
      params.column = column;
    }
    if (sys === 1) {
      params.sys = 1;
    }
    const c = stringify(params);
    let url = `${cmsURLV1}/columntrees/sys?${c}`;
    if (owner) {
      url = `${cmsURLV1}/columntrees/owner/${owner}?${c}`;
    } else if (org) {
      url = `${cmsURLV1}/columntrees/org/${org}?${c}`;
    }
    return request(url, { method: 'GET' });
  }

  static async queryExtraTypes() {
    return request(`${cmsURLV1}/extratypes`, {
      method: 'GET',
    });
  }
}
