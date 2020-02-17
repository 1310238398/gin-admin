import { stringify } from 'qs';
import request, { baseURLV1 } from '../utils/request';

const router = 'parks';

export async function query(params) {
  return request(`${baseURLV1}/${router}?${stringify(params)}`);
}
export async function queryPark() {
  return request(`${baseURLV1}/${router}/current`);
}