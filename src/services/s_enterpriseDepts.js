import { stringify } from 'qs';
import request, { baseURLV1 } from '../utils/request';

const buRouter = 'enterprise_depts';

//  得到树的结构
export async function queryTree(params) {
  return request(`${baseURLV1}/${buRouter}?${stringify(params)}`);
}

// 查询分页列表数据
export async function queryPage(params) {
  return request(`${baseURLV1}/${buRouter}?${stringify(params)}`);
}

//  保存部门管理数据
export async function create(params) {
  return request(`${baseURLV1}/${buRouter}`, {
    method: 'POST',
    body: params,
  });
}

// 更新一条数据
export async function update(params) {
  return request(`${baseURLV1}/${buRouter}/${params.record_id}`, {
    method: 'PUT',
    body: params,
  });
}

// 删除部门
export async function del(params) {
  return request(`${baseURLV1}/${buRouter}/${params}`, {
    method: 'DELETE',
  });
}

// 获取部门
export async function get(params) {
  return request(`${baseURLV1}/${buRouter}/${params.record_id}`);
}
