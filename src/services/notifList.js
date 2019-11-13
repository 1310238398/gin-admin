import { stringify } from 'qs';
import request, { baseURLV1 } from '../utils/request';

const router = 'notifications';
// 查询列表
export async function query(params) {
  return request(`${baseURLV1}/${router}?${stringify(params)}`);
}
// 查询单条数据
export async function queryOne(params) {
  return request(`${baseURLV1}/${router}/${params.record_id}`);
}
// 编辑数据
export async function saveOne(params) {
  return request(`${baseURLV1}/${router}/${params.record_id}`, {
    method: 'PUT',
    body: params,
  });
}
// 编辑数据发布
export async function saveOnePub(params) {
  return request(`${baseURLV1}/${router}/${params}`, {
    method: 'PUT',
    body: {record_id:params},
  });
}
// 创建数据
export async function CreateOne(params) {
  return request(`${baseURLV1}/${router}`, {
    method: 'POST',
    body: params,
  });
}
// 删除数据
export async function delOne(params) {
  return request(`${baseURLV1}/${router}/${params}/`, {
    method: 'DELETE',
  });
}
