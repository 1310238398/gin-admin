import { stringify } from 'qs';
import request, { baseURL } from '../utils/request';

const router = 'electricinvoices';

export async function query(params) {
  return request(`${baseURL}/v1/${router}?${stringify(params)}`);
}

/**
 * .开票
 * */

export async function create(params) {
  return request(`${baseURL}/v1/${router}`, {
    method: 'POST',
    body: params,
  });
}

/**
 * params 结构
 * record_id:string;
 * remark:string;
 * */

export async function redinvoice(params) {
  return request(`${baseURL}/v1/${router}/redinvoice`, {
    method: 'POST',
    body: params,
  });
}

/**
 * params 结构
 * record_id:string;
 * */

export async function pdf(params) {
  return request(`${baseURL}/v1/${router}/${params.record_id}/pdf`);
}

