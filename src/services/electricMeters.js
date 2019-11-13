import { stringify } from 'qs';
import request, { baseURL } from '../utils/request';

const router = 'electricmeters';

// 电表设备

export async function query(params) {
  return request(`${baseURL}/v1/${router}?${stringify(params)}`);
}

export async function get(params) {
  return request(`${baseURL}/v1/${router}/${params.record_id}`);
}

// 电表冲正
export async function reverse(params) {
  return request(`${baseURL}/v1/${router}/${params.record_id}/reverse`);
}

// 电表解绑
export async function unbind(params) {
  return request(`${baseURL}/v1/${router}/${params.record_id}/unbind`);
}

// 电表重新绑定
export async function bind(params) {
  return request(`${baseURL}/v1/${router}/bind`, {
    method: 'POST',
    body: params,
  });
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
