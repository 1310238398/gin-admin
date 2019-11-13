import { isNullOrUndefined } from 'util';
import request, { baseURLV1 } from '../utils/request';
// import { isError, baseURLV1 } from '../utils/utils';

// 日志管理请求接口
const buRouter = 'users';

// 获取用户信息
export async function get(params) {
  return request(`${baseURLV1}/${buRouter}/${params.record_id}`, { notNotify: true });
  // .then(
  //   response => {
  //     if (isError(response)) {
  //       return {};
  //     }
  //     return response;
  //   }
  // );
}

/**
 * 根据电话、昵称、姓名模糊查询用户（分页）
 * WGH
 * 2018/10/11
 * @param {电话、昵称、姓名，模糊匹配}} param
 * @param {结果数}} count
 * @returns 用户列表[{ID,电话，昵称，姓名}]
 */
export async function queryUserByTelNameNick(param, count) {
  // 输入空返回null
  if (isNullOrUndefined(param)) {
    return null;
  }

  return request(`${baseURLV1}/${buRouter}/search?search=${param}&count=${count}`);
  // .then(response => {
  //   if (isError(response) || !Array.isArray(response)) {
  //     return [];
  //   }
  //   return response;
  // });
}
