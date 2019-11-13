import { stringify } from 'qs';
import request, { baseURL } from '../utils/request';

const router = 'entrygates';

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
