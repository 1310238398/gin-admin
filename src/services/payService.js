
import request, { baseURLV1 } from '../utils/request';

const router = 'pay_urls';
export async function create(params) {
    debugger
    return request(`${baseURLV1}/${router}`, {
      method: 'POST',
      body: params,
    });
  }