import { stringify } from 'qs';
import request, { baseURLV1 } from '../utils/request';

const buRouter = 'disease_reports';

export async function queryPage(params) {
  return request(`${baseURLV1}/${buRouter}?${stringify(params)}`);
}

export async function get(params) {
  return request(`${baseURLV1}/${'disease_report_users'}/?${stringify(params)}`);
}

// 导出
export function download(params) {
  return `${baseURLV1}/${buRouter}?${'q=excel'}&${stringify(params)}`;
}
