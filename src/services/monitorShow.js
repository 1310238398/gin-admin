import { stringify } from 'qs';
import request, { baseURLV1 } from '@/utils/request';

export async function queryPosition(params) {
  return request(`${baseURLV1}/monitor_positions?${stringify(params)}`);
}

export async function queryMonitor(params) {
  return request(`${baseURLV1}/monitors?${stringify(params)}`);
}

export async function getThird(params) {
  return request(`${baseURLV1}/monitor_thirds/${params.record_id}`);
}
