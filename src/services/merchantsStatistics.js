import { stringify } from 'qs';
import request, { baseURLV1, mallURLV1 } from '../utils/request';

export async function TjSJ(params) {
  return request(`${mallURLV1}/${params}/total/balance`);
}

export async function CurrentDD(params) {
  return request(`${mallURLV1}/${params}/total/ordercount/period`);
}

export async function CurrentXSE(params) {
  return request(`${mallURLV1}/${params}/total/salessum/period`);
}
export async function Hqxy(params) {
  return request(`${mallURLV1}/${params}/signature`);
}
// 查询商家是否绑定手机号
export async function selectPhone(params) {
  return request(`${mallURLV1}/${params}/bindingphone`);
}

// 下一步
export async function sendVcodePhone(params) {
  return request(`${mallURLV1}/${params.store_id}/drawings/${params.dwID}/resend`);
}
export async function TxCash(params) {
  return request(`${mallURLV1}/${params.store_id}/drawings`, {
    method: 'POST',
    body: { draw_money: params.draw_money },
  });
}
// /mall/svc/v1/:store_id/bindingphone/:phone
// 获取验证码
export async function hqYzmcode(params) {
  return request(
    `${mallURLV1}/${params.payload.storeId}/bindingphone/${params.payload.buildings}`,
    {
      method: 'PUT',
      body: { phone: params.payload.buildings },
    }
  );
}

// 绑定手机号和验证码
export async function BDphone(params) {
  return request(
    `${mallURLV1}/${params.payload.storeId}/bindingphone/${params.payload.phone}/check/${
      params.payload.vcode
    }`,
    {
      method: 'PUT',
      body: { phone: params.payload.phone, vcode: params.payload.vcode },
    }
  );

 
}
 // 确认提现
 export async function QRTX(params) {
  return request(
    `${mallURLV1}/${params.payload.store_id}/drawings/${params.payload.draw_id}/check/${
      params.payload.vcode
    }`,
    {
      method: 'PUT',
      body: { store_id:params.payload.store_id,draw_id: params.payload.draw_id, vcode: params.payload.vcode },
    }
  );
  }
