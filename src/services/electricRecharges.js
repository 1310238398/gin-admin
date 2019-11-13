import { stringify } from 'qs';
import request, { baseURL } from '../utils/request';

const router = 'electricrecharges';

export async function query(params) {
  return request(`${baseURL}/v1/${router}?${stringify(params)}`);
}

export async function get(params) {
  return request(`${baseURL}/v1/${router}/${params.record_id}`);
}

export async function create(params) {
  return request(`${baseURL}/v1/${router}`, {
    method: 'POST',
    body: params,
  });
}

export async function update(params) {
  return request(`${baseURL}/v1/${router}/${params.record_id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function del(params) {
  return request(`${baseURL}/v1/${router}/${params.record_id}`, {
    method: 'DELETE',
  });
}

export function download(params) {
  return `${baseURL}/v1/${router}?${stringify(params)}`;
}

// 订单退费
export function payback(params) {
  return request(`${baseURL}/v1/${router}/${params.record_id}/payback`, {
    method: 'POST',
    body: params,
  });
}

// 标记为开具专票
export function specialInvoice(params) {
  return request(`${baseURL}/v1/${router}/${params.record_id}/special_invoice`, {
    method: 'POST',
    body: params,
  });
}

// 批量交账

export async function plcl(params) {
  return request(`${baseURL}/v1/${router}/update_submit_status?${stringify(params)}`, {
    method: 'PUT',
    body: params,
  });
}
