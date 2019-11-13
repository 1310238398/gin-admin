import { stringify } from 'qs';
import request, { cmsURLV1 } from '../utils/request';
// import { isError, cmsURLV1 } from '../utils/utils';

// 日志管理请求接口
const buRouter = 'replys';

export default class ReviewsService {
  static async queryPageByFirst(igid, params) {
    return request(
      `${cmsURLV1}/${buRouter}/first/${igid}?${stringify(params, { arrayFormat: 'repeat' })}`,
      {
        method: 'GET',
      }
    );
  }

  static async queryPageByChildren(replyid, params) {
    return request(
      `${cmsURLV1}/${buRouter}/children/${replyid}?${stringify(params, {
        arrayFormat: 'repeat',
      })}`,
      {
        method: 'GET',
      }
    );
  }

  static async delete(replyid) {
    return request(`${cmsURLV1}/${buRouter}/${replyid}`, {
      method: 'DELETE',
    });
  }
}
