import { stringify } from 'qs';
import request, { baseURLV1 } from '../utils/request';
// import { isError, baseURLV1 } from '../utils/utils';

const buRouter = 'enterprises';

export async function queryPage(params) {
  return request(`${baseURLV1}/${buRouter}/page?${stringify(params)}`);
  // .then(response => {
  //   if (isError(response)) {
  //     return {};
  //   }
  //   return response;
  // });
}

export async function querySelect(params) {
  return request(`${baseURLV1}/${buRouter}/select?${stringify(params)}`);
  // .then(response => {
  //   if (isError(response) || !Array.isArray(response)) {
  //     return [];
  //   }
  //   return response;
  // });
}

export async function queryUserSelect(params) {
  // params = { ...params, all: true };
  return request(`${baseURLV1}/${'users'}?${stringify(params)}`);
  // .then(response => {
  //   if (isError(response) || !Array.isArray(response)) {
  //     return [];
  //   }
  //   return response;
  // });
}

export async function getUserSelect(params) {
  return request(`${baseURLV1}/users?id=${params.users}`);
  // .then(response => {
  //   if (isError(response) || !Array.isArray(response)) {
  //     return [];
  //   }
  //   return response;
  // });
}

export async function queryCategory() {
  return request(`${baseURLV1}/${buRouter}/category`);
  // .then(response => {
  //   if (isError(response) || !Array.isArray(response)) {
  //     return [];
  //   }
  //   return response;
  // });
}

export async function queryEnterpriseMark() {
  return request(`${baseURLV1}/${buRouter}/enterprise-mark`);
  // .then(response => {
  //   if (isError(response) || !Array.isArray(response)) {
  //     return [];
  //   }
  //   return response;
  // });
}

export async function get(params) {
  return request(`${baseURLV1}/${buRouter}/${params.record_id}`);
  // .then(response => {
  //   if (isError(response)) {
  //     return {};
  //   }
  //   return response;
  // });
}

export async function create(params) {
  return request(`${baseURLV1}/${buRouter}`, {
    method: 'POST',
    body: params,
  });
}

export async function update(params) {
  return request(`${baseURLV1}/${buRouter}/${params.record_id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function migration(params) {
  return request(`${baseURLV1}/${buRouter}/${params.record_id}/migration`, {
    method: 'PATCH',
  });
}

//  获取建筑节点信息
export async function queryTreeNode() {
  return request(`${baseURLV1}/device/tree-node`);
  // .then(response => {
  //   if (isError(response) || !Array.isArray(response)) {
  //     return [];
  //   }
  //   return response;
  // });
}
