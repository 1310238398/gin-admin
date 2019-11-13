import { stringify } from 'qs';
import request, { baseURLV1 } from '../utils/request';

const buRouter = 'enterprise_auths';

export async function queryPage(params) {
  return request(`${baseURLV1}/${buRouter}?${stringify(params)}`);
}

export async function queryHistoryPage(params) {
  const payload = { ...params };
  const recordID = payload.record_id;
  delete payload.record_id;
  return request(`${baseURLV1}/${buRouter}/${recordID}/history?${stringify(payload)}`);
}

// 查询单条数据
export async function get(params) {
  return request(`${baseURLV1}/${buRouter}/${params}`);
}

// 创建数据
export async function create(params) {
  return request(`${baseURLV1}/${buRouter}`, {
    method: 'POST',
    body: params,
  });
}

// 禁用数据
export async function disable(params) {
  return request(`${baseURLV1}/${buRouter}/${params.record_id}/disable`, {
    method: 'PATCH',
  });
}

// 启用数据
export async function enable(params) {
  return request(`${baseURLV1}/${buRouter}/${params.record_id}/enable`, {
    method: 'PATCH',
  });
}
