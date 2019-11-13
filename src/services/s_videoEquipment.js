import { stringify } from 'qs';
import request, { baseURLV1 } from '../utils/request';

const router = 'monitor_positions';
const routerEq = 'monitors';

export async function query(params) {
  return request(`${baseURLV1}/${router}?${stringify(params)}`);
}

export async function get(params) {
  return request(`${baseURLV1}/${router}/${params}`);
}

export async function create(params) {
  return request(`${baseURLV1}/${router}`, {
    method: 'POST',
    body: params,
  });
}

export async function update(params) {
  return request(`${baseURLV1}/${router}/${params.record_id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function del(params) {
  return request(`${baseURLV1}/${router}/${params}`, {
    method: 'DELETE',
  });
}

// 得到树的结构
export async function queryTreeStore(params) {
  return request(`${baseURLV1}/${router}?${stringify(params)}`);
}

export async function queryEQ(params) {
  return request(`${baseURLV1}/${routerEq}?${stringify(params)}`);
}

export async function getEq(params) {
  return request(`${baseURLV1}/${routerEq}/${params}`);
}

export async function createEq(params) {
  return request(`${baseURLV1}/${routerEq}`, {
    method: 'POST',
    body: params,
  });
}

export async function updateEq(params) {
  return request(`${baseURLV1}/${routerEq}/${params.record_id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function delEq(params) {
  return request(`${baseURLV1}/${routerEq}/${params.record_id}`, {
    method: 'DELETE',
  });
}

export async function getThird(params) {
  return request(`${baseURLV1}/monitor_thirds/${params.record_id}`);
}

// 获取第三方的系统接口
export async function getThirdList() {
  return request(`${baseURLV1}/monitor_thirds?q=list`);
}
