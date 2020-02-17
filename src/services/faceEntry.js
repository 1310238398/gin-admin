import { stringify } from 'qs';
import request, { baseURLV1 } from '../utils/request';


const buRouter = 'platform_users';

export async function queryPage(params) {
  return request(`${baseURLV1}/${buRouter}?${stringify(params)}`);
}

export async function querySelect(params) {
  return request(`${baseURLV1}/${buRouter}/select?${stringify(params)}`);
}
export async function get(params) {
  return request(`${baseURLV1}/${buRouter}/${params.record_id}`);
}

export async function create(params) {
  return request(`${baseURLV1}/${buRouter}`, {
    method: 'POST',
    body: params,
  });
}

export async function update(params) {
  return request(`${baseURLV1}/${buRouter}/${params.record_id}`, {
    method: 'PUT',
    body: params,
  });
}

// 删除状态执行此操作
export async function faceEntryDele(param) {
  return request(`${baseURLV1}/${buRouter}/${param}`, {
    method: 'DELETE',
  });
}

export async function faceEntryDisable(param) {
  return request(`${baseURLV1}/${buRouter}/${param}/disable`, {
    method: 'PATCH',
  });
}

export async function faceEntryUnabale(param) {
  return request(`${baseURLV1}/${buRouter}/${param}/enable`, {
    method: 'PATCH',
  });
}




