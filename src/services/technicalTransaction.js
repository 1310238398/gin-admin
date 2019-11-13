import { stringify } from 'qs';
import request, { baseURL } from '../utils/request';

const router = 'technical_transactions';

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

export async function publish(params,publishStatus = 1) {
  return request(`${baseURL}/v1/${router}/${params.record_id}/publish`, {
    method: 'PATCH',
    body:publishStatus,
  });
}
