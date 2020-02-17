import { stringify } from 'qs';
import request, { baseURLV1 } from '../utils/request';

const buRouter = 'disease_report_users';

export async function queryPage(params) {
  return request(`${baseURLV1}/${buRouter}?${stringify(params)}`);
}

export async function get(params) {
  return request(`${baseURLV1}/${buRouter}/${params.record_id}`);
}

// 删除状态执行此操作
export async function InfoDele(param) {
  return request(`${baseURLV1}/${buRouter}/${param}`, {
    method: 'DELETE',
  });
}

// 导出
export function download(params) {
  return `${baseURLV1}/${buRouter}?${'q=excel'}&${stringify(params)}`;
}

// 企业查询
export async function queryEnterprisePage(params) {
  return request(`${baseURLV1}/enterprises?${stringify(params)}`);
}
