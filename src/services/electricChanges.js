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


export async function update(params) {
  return request(`${baseURL}/v1/${router}/${params.record_id}`, {
    method: 'PUT',
    body: params,
  });
}

export function download(params) {
  debugger
    return `${baseURL}/v1/${router}/${params.id}/use-history/export?${stringify(params)}`;
  }

  // 查询用电量明细
  export async function elePoderDetail(params) {
    return request(`${baseURL}/v1/${router}/${params.recordid}/use-history?${stringify(params)}`);
  }

  // 修改电话
  export async function changeTel(params){
    return request(`${baseURL}/v1/${router}/${params.record_id}`, {
      method: 'PUT',
      body: params,
    });
  }
