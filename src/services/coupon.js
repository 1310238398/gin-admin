

import { stringify } from 'qs';
import request, { baseUrlMall2 } from '../utils/request';


const buRouter = 'coupons';
export async function queryPage(params) {
  return request(`${baseUrlMall2}/${buRouter}?${stringify(params)}`);
}

export async function get(params) {
  return request(`${baseUrlMall2}/${buRouter}/${params.record_id}`);
}
export async function getOneInfo(params) {
  return request(`${baseUrlMall2}/${buRouter}/${params}`);
}

export async function create(params) {
  return request(`${baseUrlMall2}/${buRouter}`, {
    method: 'POST',
    body: params,
  });
}

export async function update(params) {
  return request(`${baseUrlMall2}/${buRouter}/${params.record_id}`, {
    method: 'PUT',
    body: params,
  });
}

// -通过 passOff
export async function savePass(params) {
  return request(`${baseUrlMall2}/${buRouter}/${params.record_id}/audit`, {
    method: 'PUT',
    body: params,
  });
}


// 发布 passOff
export async function publishPass(params) {
  return request(`${baseUrlMall2}/${buRouter}/${params.record_id}/publish`, {
    method: 'PUT',
    body: params,
  });
}

export async function couponDele(param) {
  return request(`${baseUrlMall2}/${buRouter}/${param}`, {
    method: 'DELETE',
  });
}

