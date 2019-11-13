import { stringify } from 'qs';
import { isNullOrUndefined } from 'util';
import request, { baseUrlMall, baseURLV1 } from '../utils/request';

const buRouter = 'stores';
export default class StoreService {
  static async queryPageStore(params) {
    let paramStr = '';
    for (const key in params) {
      if (isNullOrUndefined(params[key])) {
        paramStr = `${paramStr}${key}=&`;
      } else {
        paramStr = `${paramStr}${key}=${params[key]}&`;
      }
    }
    return request(`${baseUrlMall}/${buRouter}?${paramStr}`);
  }

  static async querySettedstatus() {
    return request(
      `${baseURLV1}/dictionaries?${stringify({
        q: 'tree',
        parent_code: `mall$#settedstatus`,
      })}&level=1`
    );
  }

  static async queryOrderstatus() {
    return request(
      `${baseURLV1}/dictionaries?${stringify({
        q: 'tree',
        parent_code: `mall$#order$#orderstatus`,
      })}&level=1`
    );
  }

  static async queryDeliveryStatus() {
    return request(
      `${baseURLV1}/dictionaries?${stringify({
        q: 'tree',
        parent_code: `mall$#order$#distribution`,
      })}&level=1`
    );
  }

  static async queryRefundstatus() {
    return request(
      `${baseURLV1}/dictionaries?${stringify({
        q: 'tree',
        parent_code: `mall$#refundstatus`,
      })}&level=1`
    );
  }

  static async queryComplaintstatus() {
    return request(
      `${baseURLV1}/dictionaries?${stringify({
        q: 'tree',
        parent_code: `mall$#complain_status`,
      })}&level=1`
    );
  }

  static async queryStorestatus() {
    return request(
      `${baseURLV1}/dictionaries?${stringify({
        q: 'tree',
        parent_code: `mall$#storestaues`,
      })}&level=1`
    );
  }

  // 挂起操作
  static async hangupStore(storeId) {
    return request(`${baseUrlMall}/${buRouter}/${storeId.recordId}/ban`, {
      method: 'PUT',
      body: '',
    });
  }

  static async queryRecommendedstatus() {
    return request(
      `${baseURLV1}/dictionaries?${stringify({
        q: 'tree',
        parent_code: `mall$#recommendedmerchandise`,
      })}&level=1`
    );
  }

  static async queryCommoditystatus() {
    return request(
      `${baseURLV1}/dictionaries/tree?${stringify({
        q: 'tree',
        parent_code: `mall$#commoditystate`,
      })}&level=1`
    );
  }

  static async queryDistributionstatus() {
    return request(
      `${baseURLV1}/dictionaries?${stringify({
        q: 'tree',
        parent_code: `mall$#distribution`,
      })}&level=1`
    );
  }

  static async queryShopstatus() {
    return request(
      `${baseURLV1}/dictionaries?${stringify({ q: 'tree', parent_code: `mall$#apstauts` })}&level=1`
    );
  }

  // 取消挂起操作
  static async cancleStore(storeId) {
    return request(`${baseUrlMall}/${buRouter}/${storeId.recordId}/unban`, {
      method: 'PUT',
      body: '',
    });
  }

  // 商铺申请
  static async queryApplicationPageStore(params) {
    let paramStr = '';
    for (const key in params) {
      if (isNullOrUndefined(params[key])) {
        paramStr = `${paramStr}${key}=&`;
      } else {
        paramStr = `${paramStr}${key}=${params[key]}&`;
      }
    }
    return request(`${baseUrlMall}/${buRouter}/application?${paramStr}`);
  }

  // 通过操作
  static async passOff(register) {
    return request(`${baseUrlMall}/${buRouter}/application/${register.register}/pass`, {
      method: 'PUT',
      body: '',
    });
  }

  // 驳回操作
  static async UnAuth(reason) {
    return request(`${baseUrlMall}/${buRouter}/application/${reason.reason.register_id}/reject`, {
      method: 'PUT',
      body: { remark: reason.reason.remark },
    });
  }

  // 商铺申请-变更
  static async queryModifyPageStore(params) {
    let paramStr = '';
    for (const key in params) {
      if (isNullOrUndefined(params[key])) {
        paramStr = `${paramStr}${key}=&`;
      } else {
        paramStr = `${paramStr}${key}=${params[key]}&`;
      }
    }
    return request(`${baseUrlMall}/${buRouter}/modify?${paramStr}`);
  }
  // 订单管理部分

  static async queryOrderPageStore(params) {
    let paramStr = '';
    for (const key in params) {
      if (isNullOrUndefined(params[key])) {
        paramStr = `${paramStr}${key}=&`;
      } else {
        paramStr = `${paramStr}${key}=${params[key]}&`;
      }
    }
    return request(`${baseUrlMall}/orders?${paramStr}`);
  }

  // 订单-请求详情
  static async Orderinfo(orderid) {
    return request(`${baseUrlMall}/orders/${orderid}`);
  }

  // 屏蔽操作
  // salesrecordId: rec.sales_record_id,
  static async Sheild(salesrecordId) {
    return request(`${baseUrlMall}/salesRecords/${salesrecordId}/comment/ban `, {
      method: 'PUT',
      body: '',
    });
  }

  // 取消屏蔽操作
  // salesrecordId: rec.sales_record_id,
  static async ReleaseShield(salesrecordId) {
    return request(`${baseUrlMall}/salesRecords/${salesrecordId}/comment/unban `, {
      method: 'PUT',
      body: '',
    });
  }

  // 商品管理部分
  static async queryCommodityPageStore(params) {
    let paramStr = '';
    for (const key in params) {
      if (isNullOrUndefined(params[key])) {
        paramStr = `${paramStr}${key}=&`;
      } else {
        paramStr = `${paramStr}${key}=${params[key]}&`;
      }
    }
    return request(`${baseUrlMall}/goods?${paramStr}`);
  }

  // 嵌套组件商品选择修改
  static async queryCommodityListPageStore(params) {
    let paramStr = '';
    let quekey = '';
    for (const key in params) {
      if (isNullOrUndefined(params[key])) {
        if (key === 'gender') {
          quekey = params[key];
        } else {
          paramStr = `${paramStr}${key}=&`;
        }
      } else if (key === 'gender') {
        quekey = params[key];
      } else {
        paramStr = `${paramStr}${key}=${params[key]}&`;
      }
    }
    if (quekey === 'JGT01' || quekey === 'JGT02') {
      return request(`${baseUrlMall}/goods/recommend/${quekey}?all_goods=true&${paramStr}`);
    } else {
      return request(`${baseUrlMall}/goods/tags/${quekey}/goods?all_goods=true&${paramStr}`);
    }
  }

  // 查询商品列表
  static async queryCommodityListPage(params) {
    let paramStr = '';
    for (const key in params) {
      if (isNullOrUndefined(params[key])) {
        paramStr = `${paramStr}${key}=&`;
      } else {
        paramStr = `${paramStr}${key}=${params[key]}&`;
      }
    }
    return request(`${baseUrlMall}/goods?${paramStr}`);
  }

  // 查询子商品列表
  static async GoodList(goodsid) {
    return request(`${baseUrlMall}/goods/subgoods?goods_id=${goodsid}`);
  }

  // 禁售商品
  static async ForbideOff(goodsid) {
    return request(`${baseUrlMall}/goods/${goodsid.goodsid}/unban `, {
      method: 'PUT',
      body: '',
    });
  }

  // 解禁商品
  static async LiftabanOff(goodsid) {
    return request(`${baseUrlMall}/goods/${goodsid.goodsid}/ban `, {
      method: 'PUT',
      body: '',
    });
  }

  // 商品分类管理
  static async queryCommodityClassificationPageStore(params) {
    let paramStr = '';
    for (const key in params) {
      if (isNullOrUndefined(params[key])) {
        paramStr = `${paramStr}${key}=&`;
      } else {
        paramStr = `${paramStr}${key}=${params[key]}&`;
      }
    }
    return request(`${baseUrlMall}/category/tree?${paramStr}`);
  }

  // 删除 分类
  static async DeleOff(category) {
    //
    return request(`${baseUrlMall}/category/${category.category}`, {
      method: 'DELETE',
      body: '',
    });
  }
  // editCommclass 编辑商品

  static async editCommclass(params) {
    //
    return request(`${baseUrlMall}/category/${params.category_id}`, {
      method: 'PUT',
      body: params,
    });
  }
  // insertCommclass 新建商品

  static async insertCommclass(params) {
    //
    return request(`${baseUrlMall}/category`, {
      method: 'POST',
      body: params,
    });
  }

  // 首页商品推荐
  static async queryHomeproductRecommendationPageStore(params) {
    let paramStr = '';
    let quekey = '';
    for (const key in params) {
      if (isNullOrUndefined(params[key])) {
        if (key === 'gender') {
          quekey = params[key];
        } else {
          paramStr += `${key}=&`;
        }
      } else if (key === 'gender') {
        quekey = params[key];
      } else {
        paramStr += `${key}=${params[key]}&`;
      }
    }
    return request(`${baseUrlMall}/goods/recommend/${quekey}?${paramStr}`);
  }
  // 上移操作

  static async moveupOff(goodsid) {
    return request(`${baseUrlMall}/goods/recommend/${goodsid.zcode}/${goodsid.goodsid}/up`, {
      method: 'PUT',
      body: '',
    });
  }
  // 下移操作

  static async movedownOff(goodsid) {
    return request(`${baseUrlMall}/goods/recommend/${goodsid.zcode}/${goodsid.goodsid}/down`, {
      method: 'PUT',
      body: '',
    });
  }

  // 删除
  static async deleOff(goodsid) {
    //
    return request(`${baseUrlMall}/goods/recommend/${goodsid.zcode}/${goodsid.goodsid}`, {
      method: 'DELETE',
      body: '',
    });
  }

  // 隐藏
  static async hideOff(goodsid) {
    return request(`${baseUrlMall}/goods/recommend/${goodsid.zcode}/${goodsid.goodsid}/hidden`, {
      method: 'PUT',
      body: '',
    });
  }

  // 显示
  static async showOff(goodsid) {
    return request(`${baseUrlMall}/goods/recommend/${goodsid.zcode}/${goodsid.goodsid}/show`, {
      method: 'PUT',
      body: '',
    });
  }

  // 添加商品
  static async selectcomm(goodsid) {
    return request(`${baseUrlMall}/goods/recommend/${goodsid.zcode}`, {
      method: 'POST',
      body: goodsid.data,
    });
  }

  // 首页分组管理
  static async queryHomePageGroupingPageStore(params) {
    let paramStr = '';
    for (const key in params) {
      if (isNullOrUndefined(params[key])) {
        paramStr = `${paramStr}${key}=&`;
      } else {
        paramStr = `${paramStr}${key}=${params[key]}&`;
      }
    }
    return request(`${baseUrlMall}/goods/tags?${paramStr}`);
  }

  // 首页-查询商品列表--daiying
  static async queryTagproductPageStore(goodstagid) {
    // let paramStr = '';
    // // let tsetgoos = '';
    // for (let key in goodstagid) {
    //   if (isNullOrUndefined(goodstagid[key])) {
    //     paramStr += key + '=' + '' + '&';
    //   } else {
    //     if (key === 'goodstagid') {
    //       tsetgoos = goodstagid[key];
    //     } else {
    //       paramStr += key + '=' + goodstagid[key] + '&';
    //     }
    //   }
    // }

    // return request(`${baseUrlMall}/goods/tags/${goodstagid.goodstagid}/${paramStr}/goods`).then((response) => {
    return request(`${baseUrlMall}/goods/tags/${goodstagid.goodstagid}/goods?`);
  }

  // 添加标签商品
  static async selectcommtag(goodsid) {
    return request(`${baseUrlMall}/goods/tags/${goodsid.tagid}/goods`, {
      method: 'POST',
      body: goodsid.data,
    });
  }

  // 删除标签
  static async deleTagOff(goodstagid) {
    return request(`${baseUrlMall}/goods/tags/${goodstagid.goodstagid}`, {
      method: 'DELETE',
      body: '',
    });
  }

  // 上移
  static async moveupTagOff(goodstagid) {
    return request(`${baseUrlMall}/goods/tags/${goodstagid.goodstagid}/up`, {
      method: 'PUT',
      body: '',
    });
  }

  // 下移
  static async movedownTagOff(goodstagid) {
    return request(`${baseUrlMall}/goods/tags/${goodstagid.goodstagid}/down`, {
      method: 'PUT',
      body: '',
    });
  }

  // 显示
  static async showTagOff(goodstagid) {
    return request(`${baseUrlMall}/goods/tags/${goodstagid.goodstagid}/show`, {
      method: 'PUT',
      body: '',
    });
  }

  // 隐藏
  static async hideTagOff(goodstagid) {
    return request(`${baseUrlMall}/goods/tags/${goodstagid.goodstagid}/hidden`, {
      method: 'PUT',
      body: '',
    });
  }

  // 添加标签
  static async insertTag(tagdata) {
    return request(`${baseUrlMall}/goods/tags`, {
      method: 'POST',
      body: tagdata,
    });
  }

  // 编辑标签
  static async updateTag(tagdata) {
    return request(`${baseUrlMall}/goods/tags/${tagdata.goods_tag_id}`, {
      method: 'PUT',
      body: tagdata,
    });
  }

  // 删除标签商品 /mall/web/v1/goods/tags/:tag_id/goods/:goods_id
  static async deleCommdityTag(goodsid) {
    //
    return request(`${baseUrlMall}/goods/tags/${goodsid.tag_id}/goods/${goodsid.goods_id}`, {
      method: 'DELETE',
      body: '',
    });
  }

  // 上移标签商品 /mall/web/v1/goods/tags/:tag_id/goods/:goods_id
  static async upCommdityTag(goodsid) {
    return request(`${baseUrlMall}/goods/tags/${goodsid.tag_id}/goods/${goodsid.goods_id}/up`, {
      method: 'PUT',
      body: '',
    });
  }

  // 下移标签商品 /mall/web/v1/goods/tags/:tag_id/goods/:goods_id
  static async downCommdityTag(goodsid) {
    return request(`${baseUrlMall}/goods/tags/${goodsid.tag_id}/goods/${goodsid.goods_id}/down`, {
      method: 'PUT',
      body: '',
    });
  }

  // 查询商品属性列表 /mall/web/v1/property
  static async getProductAttrList() {
    return request(`${baseUrlMall}/property`, {
      method: 'GET',
    });
  }

  // 查询商品属性列表 /mall/web/v1/property
  static async getProductAttr(goodsid) {
    return request(`${baseUrlMall}/property/${goodsid}`, {
      method: 'GET',
    });
  }

  // 添加商品属性 /mall/web/v1/property
  static async addProductAttrList(attr) {
    return request(`${baseUrlMall}/property`, {
      method: 'POST',
      body: attr,
    });
  }

  // 修改商品属性/web/v1/property/:property_id
  static async editProductAttrList(attr) {
    return request(`${baseUrlMall}/property/${attr.property_id}`, {
      method: 'PUT',
      body: attr,
    });
  }

  // 删除商品属性/web/v1/property/:property_id
  static async deleteProductAttrList(attr) {
    return request(`${baseUrlMall}/property/${attr.property_id}`, {
      method: 'DELETE',
    });
  }

  // /web/v1/category/:category_id/property/:property_id
  static async addProductClassAttr(attr) {
    return request(`${baseUrlMall}/category/${attr.category_id}/property/${attr.property_id}`, {
      method: 'GET',
    });
  }

  // 查询分类属性列表/web/v1/category/:category_id/property/
  static async addProductClassAttrList(attr) {
    return request(`${baseUrlMall}/category/${attr}/property`, {
      method: 'GET',
    });
  }

  // 获取单个商品
  static async getGoodOnly(goodsid) {
    return request(`${baseUrlMall}//goods/${goodsid}`, {
      method: 'GET',
    });
  }
}
