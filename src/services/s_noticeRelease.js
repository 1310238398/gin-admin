import { stringify } from 'qs';
import request, { baseURLV1, newBaseUrl } from '../utils/request';
// import { isError, baseURLV1 } from '../utils/utils';

const buRouter = 'notice';

export async function queryPage(params) {
  return request(`${newBaseUrl}/${buRouter}/page?${stringify(params)}`);
  // .then((response) => {
  //   if (isError(response)) {
  //     return {};
  //   }
  //   return response;
  // });
}

export async function add(params) {
  return request(`${baseURLV1}/${buRouter}/create`, {
    method: 'POST',
    body: params,
  });
}
export async function update(params) {
  return request(`${baseURLV1}/${buRouter}/update`, {
    method: 'PUT',
    body: params,
  });
}

export async function del(params) {
  return request(`${baseURLV1}/${buRouter}/delete/${params.id}`, {
    method: 'DELETE',
  });
}

export async function get(params) {
  return request(`${baseURLV1}/${buRouter}/detail/${params.id}`);
  // .then((response) => {
  //   if (isError(response)) {
  //     return {};
  //   }
  //   return response;
  // });
}
