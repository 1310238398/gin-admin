import { message } from 'antd';
import { isObjectNullOrUndefinedOrEmpty } from '../utils/utils';
import StoreService from '../services/s_shopApplicationReview';

export default {
  namespace: 'recommendedMerchandise',
  state: {
    recommendedStatueList: [],
    tableData: {
      list: [],
      pagination: {},
    },
    CommClasslist: [],
    loading: false,
    search: {},
    pagination: {},
    formVisible: false,
    seeVisible: false,
    dataSoure: {},
  },
  effects: {
    /**
     * 查询字典表-状态
     */
    *queryRecommendedstatue(_, { call, put }) {
      const result = yield call(StoreService.queryRecommendedstatus);
      const response = result.list || [];
      if (!isObjectNullOrUndefinedOrEmpty(response)) {
        response.push({ code: '', name: '全部', key: '' });
        yield put({
          type: 'setRecommendstatue',
          payload: [...response],
        });
      }
    },

    *queryShopStatueTotalInfo({ params, pagination }, { call, put, select }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      if (params) {
        yield put({
          type: 'saveSearch',
          payload: params,
        });
      } else {
        const search = yield select(state => state.recommendedMerchandise.search);
        if (search) {
          params = { ...search };
        }
      }
      if (pagination) {
        yield put({
          type: 'savePagination',
          payload: pagination,
        });
      } else {
        const pag = yield select(state => state.recommendedMerchandise.pagination);
        if (pag) {
          pagination = { ...pag };
        }
      }
      const result = yield call(StoreService.queryHomeproductRecommendationPageStore, {
        ...params,
        ...pagination,
      });
      if (!isObjectNullOrUndefinedOrEmpty(result)) {
        yield put({
          type: 'setShopStatueTotal',
          payload: result,
        });
        yield put({
          type: 'changeLoading',
          payload: false,
        });
      }
    },
    // 商品分类
    *queryCommClass(_, { call, put }) {
      //
      const result = yield call(StoreService.queryCommodityClassificationPageStore, {});
      if (!isObjectNullOrUndefinedOrEmpty(result)) {
        if (result) {
          for (let i = 0; i < result.length; i += 1) {
            if (result[i].children) {
              for (let j = 0; j < result[i].children.length; j += 1) {
                result[i].title = result[i].category_name;
                result[i].value = result[i].goods_category_id;
                result[i].key = result[i].category_name;
                result[i].children[j].title = result[i].children[j].category_name;
                result[i].children[j].value = result[i].children[j].goods_category_id;
                result[i].children[j].key = result[i].children[j].category_name;
              }
            } else {
              result[i].title = result[i].category_name;
              result[i].value = result[i].goods_category_id;
              result[i].key = result[i].category_name;
            }
          }
        }
        yield put({
          type: 'setCommClass',
          payload: result,
        });
      }
    },
    // 上移操作
    *MoveupOff({ goodsid, zcode }, { call, put }) {
      const response = yield call(StoreService.moveupOff, { goodsid, zcode });
      if (response.status === 'ok') {
        message.success('上移成功');
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    // 下移操作
    *MovedownOff({ goodsid, zcode }, { call, put }) {
      const response = yield call(StoreService.movedownOff, { goodsid, zcode });
      if (response.status === 'ok') {
        message.success('下移成功');
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    // 删除
    *deleOff({ goodsid, zcode }, { call, put }) {
      const response = yield call(StoreService.deleOff, { goodsid, zcode });
      if (response.status === 'ok') {
        message.success('删除成功');
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    // 隐藏
    *hideOff({ goodsid, zcode }, { call, put }) {
      const response = yield call(StoreService.hideOff, { goodsid, zcode });
      if (response.status === 'ok') {
        message.success('隐藏成功');
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    // 显示
    *showOff({ goodsid, zcode }, { call, put }) {
      const response = yield call(StoreService.showOff, { goodsid, zcode });
      if (response.status === 'ok') {
        message.success('显示成功');
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    *Selectcomm({ data, zcode }, { call, put }) {
      const response = yield call(StoreService.selectcomm, { data, zcode });
      if (response.status === 'ok') {
        message.success('添加成功');
        yield put({ type: 'changeVisible', payload: false });
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },

    *AddRecommendedMerchandiseFrame({ payload }, { put }) {
      // 给定初始值
      yield put({ type: 'changeVisible', payload });
    },

    *seeGoodsInfo({ payload }, { call, put }) {
      /* eslint-disable prefer-destructuring */
      const visible = payload.visible;
      if (payload.data) {
        const goodsid = payload.data.goods_id;
        const data = payload.data;
        yield put({ type: 'saveData', payload: { data } });
        const result = yield call(StoreService.getGoodOnly, goodsid);
        const pdata = yield call(StoreService.queryCommodityClassificationPageStore);
        const pkeys = [];
        // 显示商品分类

        /* eslint-disable no-inner-declarations */

        function filterPData(datas, parentPath) {
          for (let i = 0; i < datas.length; i += 1) {
            /* eslint-disable prefer-destructuring */

            if (datas[i].children && datas[i].children.length > 0) {
              let category_name = datas[i].category_name;
              let goods_category_id = datas[i].goods_category_id;

              /* eslint-disable  prefer-template */

              if (parentPath && parentPath !== '') {
                category_name = parentPath + '/' + category_name;
                goods_category_id = parentPath + '/' + goods_category_id;
              }
              filterPData(datas[i].children, category_name);
              filterPData(datas[i].children, goods_category_id);

              /* eslint-disable  no-continue */

              continue;
            }
            pkeys.push({
              category_name: parentPath + '/' + datas[i].category_name,
              goods_category_id: parentPath + '/' + datas[i].goods_category_id,
            });
          }
        }

        filterPData(pdata);

        if (result.goods_category_id) {
          for (let i = 0; i < pkeys.length; i += 1) {
            if (pkeys[i].goods_category_id.endsWith(result.goods_category_id)) {
              result.category_name = pkeys[i].category_name;
              break;
            }
          }
        }
        if (result.property && result.property.length > 0) {
          result.norm_name = result.property[result.property.length - 1].name;
        }
        let temp = '';
        // 循环每个数组，把每个值用逗号分隔
        if (result.property && result.property.length > 0) {
          result.property[result.property.length - 1].values.forEach(e => {
            if (e) {
              temp += e;
              temp += '，';
            }
          });
          // 去掉字符串的最后一个逗号
          result.norm_value = temp.substring(0, temp.length - 1);
        }
        // 规格值列表后台传值
        result.norm_list = normL;
        for (let i = 0; i < result.norms.length; i += 1) {
          result.norms[i].image = result.norms[i].image ? [result.norms[i].image] : [];
        }

        // 规格值列表
        const normL = [];
        for (let j = 0; j < result.norms.length; j += 1) {
          normL.push({
            name: result.norms[j].name,
            price: Number(result.norms[j].price) !== 0 ? Number(result.norms[j].price) / 100 : 0,
            stock: result.norms[j].stock,
            image: result.norms[j].image,
            goods_code: result.norms[j].goods_code,
            property: result.norms[j].property,
            norm_id: result.norms[j].norm_id,
          });
        }
        // 规格值列表后台传值
        result.norm_list = normL;
        if (!isObjectNullOrUndefinedOrEmpty(result)) {
          yield put({
            type: 'saveData',
            payload: result,
          });
        }
      }
      // 给定初始值
      yield put({ type: 'changeSeeVisible', payload: visible });
    },
  },
  reducers: {
    setRecommendstatue(state, { payload }) {
      if (isObjectNullOrUndefinedOrEmpty(payload)) {
        return;
      }
      return {
        ...state,
        recommendedStatueList: payload,
      };
    },
    setShopStatueTotal(state, { payload }) {
      if (isObjectNullOrUndefinedOrEmpty(payload)) {
        return;
      }
      return {
        ...state,
        tableData: {
          list: payload.list,
          pagination: payload.pagination,
        },
      };
    },
    setCommClass(state, { payload }) {
      return {
        ...state,
        CommClasslist: payload,
      };
    },
    saveSearch(state, { payload }) {
      return { ...state, search: payload };
    },
    changeLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
    savePagination(state, { payload }) {
      return { ...state, pagination: payload };
    },
    changeVisible(state, { payload }) {
      return { ...state, formVisible: payload };
    },
    changeSeeVisible(state, { payload }) {
      return { ...state, seeVisible: payload };
    },
    saveData(state, { payload }) {
      return { ...state, dataSoure: payload };
    },
  },
};
