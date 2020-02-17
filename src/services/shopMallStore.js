import { stringify } from 'qs';
import request, { baseUrlMall2} from '../utils/request';


const buRouter = 'stores';

export async function queryPage(params) {
  return request(`${baseUrlMall2}/${buRouter}?${stringify(params)}`);
}

export async function get(params) {
  return request(`${baseUrlMall2}/${buRouter}/${params.record_id}`);
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

export async function shopMallStoreDele(params) {
    return request(`${baseUrlMall2}/${buRouter}/${params}`, {
      method: 'DELETE',
    });
  }

// 店铺审核-通过 passOff
export async function savePass(params) {
  return request(`${baseUrlMall2}/${buRouter}/${params.record_id}/audit`, {
    method: 'PUT',
    body: params,
  });
}

// 店铺审核-驳回 UnAuth
export async function saveRefuse(params) {
  return request(`${baseUrlMall2}/${buRouter}/${params.param}`, {
    method: 'PUT',
    body: params.bodyContent,
  });
}

// 查询当前店铺信息
export async function selectInfo(){
  return request(`${baseUrlMall2}/${buRouter}.current`);
}




