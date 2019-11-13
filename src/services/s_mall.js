import { stringify } from 'qs';
import request, { mallURLV1 } from '../utils/request';

// 获取店铺信息
export async function getStoreId() {
  return request(`${mallURLV1}/stores`, {
    method: 'GET',
  });
}

// 获取商品列表
export async function getProductList(storeId, params) {
  return request(`${mallURLV1}/${storeId}/goods?${stringify(params)}`);
}
// 添加商品
export async function create(storeId, params) {
  return request(`${mallURLV1}/${storeId}/goods`, {
    method: 'POST',
    body: params,
  });
}
// 删除商品
export async function del(params) {
  return request(`${mallURLV1}/${params.store}/goods/${params.goods_id}/`, {
    method: 'DELETE',
  });
}
// 获取单个商品
export async function get(params) {
  return request(`${mallURLV1}/${params.store_id}/goods/${params.goods_id}`);
}
// 编辑商品
export async function edit(storeId, params) {
  return request(`${mallURLV1}/${storeId}/goods/${params.goods_id}/`, {
    method: 'PUT',
    body: params,
  });
}
// 单个商品图片
export async function getImgs(params) {
  return request(`${mallURLV1}/${params.storeId}/goods/${params.id}/images`);
}
// 商品下架
export async function enable(params) {
  return request(`${mallURLV1}/${params.store_id}/goods/${params.goods_id}/off_sell`, {
    method: 'PUT',
  });
}
// 商品上架
export async function disable(params) {
  return request(`${mallURLV1}/${params.store_id}/goods/${params.goods_id}/on_sell`, {
    method: 'PUT',
  });
}
// 获取子商品
export async function getChildern(params) {
  return request(`${mallURLV1}/${params.store_id}/goods/${params.goods_id}/subgoods`, {
    method: 'GET',
  });
}
// 添加子商品
export async function addChildren(store, params) {
  return request(`${mallURLV1}/${store.store_id}/goods/${store.goods_id}/subGoods`, {
    method: 'POST',
    body: params,
  });
}
// 编辑子商品
export async function editChildren(formData, params) {
  return request(
    `${mallURLV1}/${params.store_id}/goods/${params.goods_id}/subGoods/${params.sub_goods_id}`,
    {
      method: 'PUT',
      body: formData,
    }
  );
}
// 删除子商品
export async function delChildren(params) {
  return request(
    `${mallURLV1}/${params.store_id}/goods/${params.goods_id}/subGoods/${params.sub_goods_id}`,
    {
      method: 'DELETE',
    }
  );
}
// 出库
export async function changeOutTotal(params, totalInfo) {
  return request(
    `${mallURLV1}/${params.store_id}/goods/${params.goods_id}/subGoods/${totalInfo.id}/decrease`,
    {
      method: 'PUT',
      body: totalInfo,
    }
  );
}
// 入库
export async function changeaddTotal(params, totalInfo) {
  return request(
    `${mallURLV1}/${params.store_id}/goods/${params.goods_id}/subGoods/${totalInfo.id}/increase`,
    {
      method: 'PUT',
      body: totalInfo,
    }
  );
}
// 获取商品分类
export async function getProductClass() {
  return request(`${mallURLV1}/categorys/tree`, {
    method: 'GET',
  });
}

// 编辑库存
export async function submitStock(storeId, goodsId, params) {
  return request(`${mallURLV1}/${storeId}/goods/${goodsId}/norms/stock`, {
    method: 'PUT',
    body: params,
  });
}
// 通过商品id 获取商品的规格
export async function getProductStock(params) {
  return request(`${mallURLV1}/${params.store_id}/goods/${params.goods_id}/norms`, {
    method: 'GET',
  });
}
