/* 促销活动 */
import request from '../utils/request';
import { isError, mallURLV1 } from '../utils/utils';
import { stringify } from 'qs';


export default class ActivityService {
    /* 商品ID */
    static async getStoreId() {
        return request(`${mallURLV1}/stores`, {
            method: 'GET',
        });
    }
    /* 活动列表 */
    static queryPage(storeId, params) {
        return request(`${mallURLV1}/${storeId}/discount?${stringify(params)}`).then((response) => {
            if (isError(response)) {
                return {};
            }
            return response;
        });
    }
    /* 商品列表*/
    static async  getProductList(storeId, params) {
        return request(`${mallURLV1}/${storeId}/goods?${stringify(params)}`).then((response) => {
            if (isError(response)) {
                return {};
            }
            return response;
        });
    }
    // 获取商品分类
    static async  getProductClass(params) {
        return request(`${mallURLV1}/goods/categorys/tree`, {
            method: 'GET',
        });
    }
    /* 添加活动函 */
    static async  create(storeId, params) {
        return request(`${mallURLV1}/${storeId}/discount`, {
            method: 'POST',
            body: params,
        });
    }
    /* 删除活动 */
    static async del(params) {
        return request(`${mallURLV1}/${params.store_id}/discount/${params.discount_id}`, {
            method: 'DELETE',
        });
    }
    /* 获取单个活动 */
    static async get(store, params) {
        return request(`${mallURLV1}/${store}/discount/${params.discount_id}`).then((response) => {
            if (isError(response)) {
                return {};
            }
            return response;
        });
    }
    // 改变状态
    static async  changePause(params) {
        return request(`${mallURLV1}/${params.store_id}/discount/${params.discount_id}/pause`, {
            method: 'PUT',
        });
    }
    static async  changeRestart(params) {
        return request(`${mallURLV1}/${params.store_id}/discount/${params.discount_id}/restart`, {
            method: 'PUT',
        });
    }
    /* 根据列表获取数据 */
    static async  getGoodsList(params) {
        return request(`${mallURLV1}/${params.store_id}/goodsList`, {
            method: 'POST',
            body: {
                goods_list: params.goods_list
            }
        });
    }
    /* 更新数据 */
    static async  update(storeId, params, formDataId) {
        return request(`${mallURLV1}/${storeId}/discount/${formDataId}`, {
            method: 'PUT',
            body: params,
        });
    }
}
