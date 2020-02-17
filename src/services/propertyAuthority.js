import { stringify } from 'qs';
import request, { baseURLV1} from '../utils/request';


const buRouter = 'user_buildings';

export async function queryBuilding() {
  return request(`${baseURLV1}/${buRouter}?q=building`);
}

export async function queryPage(params) {
  return request(`${baseURLV1}/${buRouter}?${stringify(params)}`);
}

export async function get(params) {
  return request(`${baseURLV1}/${buRouter}/${params.record_id}/details`);
}

export async function create(params) {
  return request(`${baseURLV1}/${buRouter}`, {
    method: 'POST',
    body: params,
  });
}

export async function update(params) {
  return request(`${baseURLV1}/${buRouter}/${params.user_id}/save`, {
    method: 'PUT',
    body: params.data,
  });
}

export async function propertyAuthorityDele(params) {
    return request(`${baseURLV1}/${buRouter}/${params}`, {
      method: 'DELETE',
    });
  }

// 店铺审核-通过 passOff
export async function savePass(params) {
  return request(`${baseURLV1}/${buRouter}/${params.record_id}/audit`, {
    method: 'PUT',
    body: params,
  });
}

// 店铺审核-驳回 UnAuth
export async function saveRefuse(params) {
  return request(`${baseURLV1}/${buRouter}/${params.param}`, {
    method: 'PUT',
    body: params.bodyContent,
  });
}

// 查询当前店铺信息
export async function selectInfo(){
  return request(`${baseURLV1}/${buRouter}.current`);
}




