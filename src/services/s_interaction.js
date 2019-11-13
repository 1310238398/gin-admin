import { stringify } from 'qs';
import request, { cmsURLV1 } from '../utils/request';
// import { isError} from '../utils/utils';

// 日志管理请求接口
const buRouter = 'ints/intlist';

export default class InteractionService {
  static async queryPage(igid, params) {
    const response = await request(
      `${cmsURLV1}/${buRouter}/${igid}?${stringify(params, { arrayFormat: 'repeat' })}`,
      {
        method: 'GET',
      }
    );
    // if (isError(response)) {
    //   return {};
    // }
    return response;
  }

  static async queryGroup(igid) {
    const response = await request(`${cmsURLV1}/ints/groups/${igid}`, {
      method: 'GET',
    });
    // if (isError(response)) {
    //   return {};
    // }
    return response;
  }
}
