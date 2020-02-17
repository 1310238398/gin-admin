import { stringify } from 'qs';
import request, { baseUrlAd } from '../utils/request';

const buRouter = 'gadvertisers';
export async function queryPage(params) {
  return request(`${baseUrlAd}/${buRouter}?${stringify(params)}`);
}

export async function get(params) {
  return request(`${baseUrlAd}/${buRouter}/${params.record_id}`);
}
export async function getOneInfo(params) {
  return request(`${baseUrlAd}/${buRouter}/${params}`);
}

export async function create(params) {
  return request(`${baseUrlAd}/${buRouter}`, {
    method: 'POST',
    body: params,
  });
}

export async function update(params) {
  return request(`${baseUrlAd}/${buRouter}/${params.record_id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function advertiserDele(param) {
  return request(`${baseUrlAd}/${buRouter}/${param}`, {
    method: 'DELETE',
  });
}

export async function advertisSelect(params) {
  return request(`${baseUrlAd}/${buRouter}.select?${stringify(params)}`);
}
