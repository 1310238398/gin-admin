import { stringify } from 'qs';
import request, { baseURLV1, newBaseUrl } from '../utils/request';


const buRouter = 'enterprises';
const enterApply = 'enterprise_enter_applys';
const enterpriseCretie = 'enterprise_credits';
export async function queryPage(params) {
  return request(`${baseURLV1}/${buRouter}?${stringify(params)}`);
}

export async function querySelect(params) {
  return request(`${baseURLV1}/${buRouter}/select?${stringify(params)}`);
}

export async function queryUserSelect(params) {
  params = { ...params, all: true };
  return request(`${newBaseUrl}/${'users'}/search?${stringify(params)}`);
}

export async function getUserSelect(params) {
  return request(`${newBaseUrl}/users?id=${params.users}`);
}

export async function queryCategory() {
  return request(`${baseURLV1}/${buRouter}/category`);
}

export async function queryEnterpriseMark() {
  return request(`${baseURLV1}/${buRouter}/enterprise-mark`);
}

export async function get(params) {
  return request(`${baseURLV1}/${buRouter}/${params.record_id}`);
}
export async function getOneInfo(params) {
  return request(`${baseURLV1}/${enterApply}/${params}`);
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

// 设为热门企业
export async function enterpriseSetHot(params) {
  return request(`${baseURLV1}/${buRouter}/${params}/enable_hot`, {
    method: 'PATCH',
  });
}
// 取消热门企业
export async function enterpriseCancelHot(params) {
  return request(`${baseURLV1}/${buRouter}/${params}/disable_hot`, {
    method: 'PATCH',
  });
}

// 设为私密企业
export async function enterpriseSetPrivacy(params) {
  return request(`${baseURLV1}/${buRouter}/${params}/enable_privacy`, {
    method: 'PATCH',
  });
}

// 取消私密企业
export async function enterpriseCancelPrivacy(params) {
  return request(`${baseURLV1}/${buRouter}/${params}/disable_privacy`, {
    method: 'PATCH',
  });
}

export async function migration(params) {
  return request(`${baseURLV1}/${buRouter}/${params.id}/migration`, {
    method: 'PUT',
    body: { migration_date: params.migration_date },
  });
}

//  获取建筑节点信息
export async function queryTreeNode() {
  return request(`${baseURLV1}/device/tree-node`);
}
// 企业审核-查询列表
export async function queryEnterexaminePage(params) {
  return request(`${baseURLV1}/${enterApply}?${stringify(params)}`);
}
// 企业审核-通过 passOff
export async function passOff(params) {
  return request(`${baseURLV1}/${enterApply}/${params.param}`, {
    method: 'PUT',
    body: params.bodyContent,
  });
}

// 企业审核-驳回 UnAuth
export async function UnAuth(params) {
  return request(`${baseURLV1}/${enterApply}/${params.param}`, {
    method: 'PUT',
    body: params.bodyContent,
  });
}

// 获取企业标签
export async function queryEnterPriseTag(params) {
  return request(`${baseURLV1}/${buRouter}/${params}/tags`);
}

// 获取企业用户类型
export async function queryEnterpriseUserType(params) {
  return request(`${baseURLV1}/${buRouter}/${params.record_id}/usertypes`);
}

// 保存企业标签
export async function updataEnterTags(params) {
  return request(`${baseURLV1}/${buRouter}/${params.id}/tags`, {
    method: 'PUT',
    body: params.data,
  });
}

// 删除企业,迁出状态执行此操作
export async function enterpriseDele(param) {
  return request(`${baseURLV1}/${buRouter}/${param}`, {
    method: 'DELETE',
  });
}

// 查询企业信用档案单条数据
export async function enterpriseCretieOne(param){
  return request(`${baseURLV1}/${enterpriseCretie}/${param}`);
}
// 保存企业信用档案数据
export async function saveEnterpriseCretieData(param){
  return request(`${baseURLV1}/${enterpriseCretie}/${param.record_id}`,{
    method:'PUT',
    body:param,
  })
}
