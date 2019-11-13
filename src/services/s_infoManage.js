import { stringify } from 'qs';
import request, { cmsURLV1 } from '../utils/request';
// import { isError, cmsURLV1 } from '../utils/utils';

// 日志管理请求接口
const buRouter = 'infos';

export default class InfosService {
  static async putSurveyAnswer(infoid, answers) {
    return request(`${cmsURLV1}/${buRouter}/${infoid}/survey/answer`, {
      method: 'PUT',
      body: answers,
    });
  }

  static async getSurveyTotal(infoid) {
    return request(`${cmsURLV1}/${buRouter}/${infoid}/survey/total`, {
      method: 'GET',
    });
  }

  static async queryPageSurveyDetails(infoid, params) {
    return request(
      `${cmsURLV1}/${buRouter}/${infoid}/survey/details?${stringify(params, {
        arrayFormat: 'repeat',
      })}`,
      {
        method: 'GET',
      }
    );
    // ).then(response => {
    //   if (isError(response)) {
    //     return {};
    //   }
    //   return response;
    // });
  }

  static async queryInfoNotices(infoid, params) {
    return request(
      `${cmsURLV1}/${buRouter}/${infoid}/notices?${stringify(params, { arrayFormat: 'repeat' })}`,
      {
        method: 'GET',
      }
    );
    // .then(response => {
    //   if (isError(response)) {
    //     return {};
    //   }
    //   return response;
    // });
  }

  static async postInfoNotices(infoid, params) {
    return request(`${cmsURLV1}/${buRouter}/${infoid}/notices`, {
      method: 'POST',
      body: params,
    });
    // .then(response => {
    //   if (isError(response)) {
    //     return {};
    //   }
    //   return response;
    // });
  }

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

  static async queryOplogPage(infoid, params) {
    return request(
      `${cmsURLV1}/${buRouter}/${infoid}/oplog?${stringify(params, {
        arrayFormat: 'repeat',
      })}`,
      {
        method: 'GET',
      }
    );
    // .then(response => {
    //   if (isError(response)) {
    //     return {};
    //   }
    //   return response;
    // });
  }

  static async submitInfoAdd(payload) {
    return request(`${cmsURLV1}/${buRouter}/1`, {
      method: 'POST',
      body: payload,
    });
  }

  static async submitInfoAddForKind(kind, payload) {
    return request(`${cmsURLV1}/${buRouter}/${kind}`, {
      method: 'POST',
      body: payload,
    });
  }

  /**
   *
   * @param {信息id} infoid
   * @param {start 定时发布时间，end 定时取消发布时间} param1
   */
  static async timingpub(infoid, { start, end }) {
    return request(`${cmsURLV1}/${buRouter}/${infoid}/timingpub`, {
      method: 'PUT',
      body: { start, end },
    });
  }

  /**
   * 修改信息描述，是更新所有对应的描述字段
   * @param {信息编号} infoid
   * @param {信息描述} payload
   */
  static async submitUpdateDesc(infoid, payload) {
    return request(`${cmsURLV1}/${buRouter}/${infoid}/desc/1`, {
      method: 'PUT',
      body: payload,
    });
  }

  /**
   * 修改信息描述，是更新所有对应的描述字段
   * @param {信息编号} infoid
   * @param {信息类型 1 文章 ，2 短文 ，3 投票，4活动，5 调查问卷} kind
   * @param {信息描述} payload
   */
  static async submitUpdateDescKind(infoid, kind, payload) {
    return request(`${cmsURLV1}/${buRouter}/${infoid}/desc/${kind}`, {
      method: 'PUT',
      body: payload,
    });
  }

  // static async  submitUpdateCtrl(infoid,payload) {
  //   return request(`${cmsURLV1}/${buRouter}/${infoid}/ctrl`, {
  //     method: 'PUT',
  //     body: payload,
  //   });
  // }
  // static async  submitUpdateExtra(infoid,payload) {
  //   return request(`${cmsURLV1}/${buRouter}/${infoid}/extra`, {
  //     method: 'PUT',
  //     body: payload,
  //   });
  // }
  static async queryDesc(infoid) {
    return request(`${cmsURLV1}/${buRouter}/${infoid}`, {
      method: 'GET',
    });
  }

  static async queryCtrl(infoid) {
    return request(`${cmsURLV1}/${buRouter}/${infoid}/ctrl`, {
      method: 'GET',
    });
  }

  /**
   * 删除信息
   * @param {信息编号} infoid
   */
  static async delInfo(infoid) {
    return request(`${cmsURLV1}/${buRouter}/${infoid}`, {
      method: 'DELETE',
    });
  }

  /**
   * 发布信息
   * @param {信息编号} infoid
   */
  static async publishInfo(infoid) {
    return request(`${cmsURLV1}/${buRouter}/${infoid}/publish`, {
      method: 'PUT',
    });
  }

  /**
   * 信息提交审核
   * @param {信息编号} infoid
   */
  static async commitInfo(infoid) {
    return request(`${cmsURLV1}/${buRouter}/${infoid}/commit`, {
      method: 'PUT',
    });
  }

  /**
   * 取消发布
   * @param {信息编号} infoid
   */
  static async unpublishInfo(infoid) {
    return request(`${cmsURLV1}/${buRouter}/${infoid}/unpublish`, {
      method: 'PUT',
    });
  }

  /**
   * 禁止发布接口
   * @param {信息编号} infoid
   */
  static async prohibitInfo(infoid) {
    return request(`${cmsURLV1}/${buRouter}/${infoid}/prohibit`, {
      method: 'PUT',
    });
  }

  /**
   * 取消禁止发布
   * @param {信息编号} infoid
   */
  static async cancelprohibit(infoid) {
    return request(`${cmsURLV1}/${buRouter}/${infoid}/cancelprohibit`, {
      method: 'PUT',
    });
  }

  static async recoverInfo(infoid) {
    return request(`${cmsURLV1}/${buRouter}/${infoid}/recover`, {
      method: 'PUT',
    });
  }

  static async destroyInfo(infoid) {
    return request(`${cmsURLV1}/${buRouter}/${infoid}/destroy`, {
      method: 'DELETE',
    });
  }

  static async queryInfoTree(org, column) {
    let c = '';
    if (column) {
      c = `?column=${column}`;
    }
    let url = `${cmsURLV1}/columntrees/sys${c}`;
    if (org) {
      url = `${cmsURLV1}/columntrees/org/${org}${c}`;
    }
    return request(url, { method: 'GET' });
  }

  static async queryExtraTypes() {
    return request(`${cmsURLV1}/extratypes`, {
      method: 'GET',
    });
  }
}
