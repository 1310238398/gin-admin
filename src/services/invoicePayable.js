import { stringify } from 'qs';
import request, { baseURL } from '../utils/request';

const router = 'invoiceheaders';

// 获取企业的列表
export async function lists(params) {
  return request(`${baseURL}/v1/${router}?${stringify(params)}`);
}

// 通过企业ID获取抬头信息
export async function query(params) {
  return request(`${baseURL}/v1/${router}/${params.record_id}/taxs`);
}

// 通过企业ID获取抬头信息
export async function get(params) {
  return request(`${baseURL}/v1/${router}/${params.record_id}`);
}

// 创建企业抬头信息
export async function create(params) {
  return request(`${baseURL}/v1/${router}`, {
    method: 'POST',
    body: params,
  });
}

// 更新企业抬头信息
export async function update(params) {
  return request(`${baseURL}/v1/${router}/${params.record_id}`, {
    method: 'PUT',
    body: params,
  });
}

// 删除指定的企业抬头
export async function del(params) {
  return request(`${baseURL}/v1/${router}/${params.record_id}`, {
    method: 'DELETE',
  });
}
