import { stringify } from 'qs';
import request, { baseURL } from '../utils/request';

const router = 'buildings';
// 查询楼-出租（售）情况（传楼的id）
export async function query(floorId) {
  return request(`${baseURL}/v1/${router}/${floorId.payload}`);
}
// 查询层-出租（售）列表
export async function larlayList(params) {
  return request(`${baseURL}/v1/${router}?${stringify(params.payload)}`);
}
// 查询房源
export async function HouseQuery(params) {
  return request(`${baseURL}/v1/${router}?${stringify(params)}`);
}
// 保存基本信息

export async function saveDetail(params) {
  return request(`${baseURL}/v1/${router}/${params.record_id}`, {
    method: 'PUT',
    body: params,
  });
}

// 查询企业地址
export async function buildingList(params) {
  return request(`${baseURL}/v1/${router}?${stringify(params)}`);
}
// 切换园区-选择不同的区域
export async function queryBuildings(parkId) {
  return request(`${baseURL}/v1/${router}?${stringify(parkId)}`);
}
