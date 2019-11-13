import { message } from 'antd';
import { isObjectNullOrUndefinedOrEmpty } from '../utils/utils';
import StoreService from '../services/s_shopApplicationReview';

export default {
  namespace: 'commodityManagement',
  state: {
    loading: false,
    search: {},
    pagination: {},
    distributionsStatueList: [],
    commodityStatueList: [],
    tableData: {
      list: [],
      pagination: {},
    },
    goodlist: [],
    CommClasslist: [],
    loadingSelect: false,
    searchSelect: {},
    paginationSelect: {},
    tableDataSelect: {
      list: [],
      pagination: {},
    },
    seeVisible: false,
    dataSoure: {},
  },
  effects: {
    /**
     * 查询字典表-配送状态
     */
    *queryDistributionstatus(_, { call, put }) {
      const result = yield call(StoreService.queryDistributionstatus);
      if (!isObjectNullOrUndefinedOrEmpty(result)) {
        result.push({ code: '', name: '全部', key: '' });
        yield put({
          type: 'setDistributionsstatue',
          payload: [...result],
        });
      }
    },
    /**
     * 查询字典表-商品状态
     */
    *queryCommoditystatus(_, { call, put }) {
      const result = yield call(StoreService.queryCommoditystatus);
      if (!isObjectNullOrUndefinedOrEmpty(result)) {
        result.push({ code: '', name: '全部', key: '' });
        yield put({
          type: 'setCommoditystatue',
          payload: [...result],
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
        const search = yield select(state => state.commodityManagement.search);
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
        const pag = yield select(state => state.commodityManagement.pagination);
        if (pag) {
          pagination = { ...pag };
        }
      }
      const result = yield call(StoreService.queryCommodityListPage, {
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
    // 查询选择商品列表的时候
    *selectqueryShopStatueTotalInfo({ params, pagination }, { call, put, select }) {
      yield put({
        type: 'changeLoadingSelect',
        payload: true,
      });
      if (params) {
        yield put({
          type: 'saveSearchSelect',
          payload: params,
        });
      } else {
        const search = yield select(state => state.commodityManagement.searchSelect);
        if (search) {
          params = { ...search };
        }
      }
      if (pagination) {
        yield put({
          type: 'savePaginationSelect',
          payload: pagination,
        });
      } else {
        const pag = yield select(state => state.commodityManagement.paginationSelect);
        if (pag) {
          pagination = { ...pag };
        }
      }
      const result = yield call(StoreService.queryCommodityListPageStore, {
        ...params,
        ...pagination,
      });
      if (!isObjectNullOrUndefinedOrEmpty(result)) {
        yield put({
          type: 'setShopStatueTotalSelect',
          payload: result,
        });
        yield put({
          type: 'changeLoadingSelect',
          payload: false,
        });
      }
    },
    *queryGoodList({ goodsid }, { call, put }) {
      const result = yield call(StoreService.GoodList, goodsid);
      if (!isObjectNullOrUndefinedOrEmpty(result)) {
        yield put({
          type: 'setGoodList',
          payload: result,
        });
      }
    },
    *LiftabanOff({ goodsid }, { call, put }) {
      const response = yield call(StoreService.LiftabanOff, { goodsid });
      if (response.status === 'ok') {
        message.success('解禁成功');
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },

    *ForbideOff({ goodsid }, { call, put }) {
      const response = yield call(StoreService.ForbideOff, { goodsid });
      if (response.status === 'ok') {
        message.success('禁售成功');
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    // 商品分类
    *queryCommClass(_, { call, put }) {
      //
      const result = yield call(StoreService.queryCommodityClassificationPageStore);
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
    setDistributionsstatue(state, { payload }) {
      if (isObjectNullOrUndefinedOrEmpty(payload)) {
        return;
      }
      return {
        ...state,
        distributionsStatueList: payload,
      };
    },
    setCommoditystatue(state, { payload }) {
      if (isObjectNullOrUndefinedOrEmpty(payload)) {
        return;
      }
      return {
        ...state,
        commodityStatueList: payload,
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
    setShopStatueTotalSelect(state, { payload }) {
      if (isObjectNullOrUndefinedOrEmpty(payload)) {
        return;
      }
      return {
        ...state,
        tableDataSelect: {
          list: payload.list,
          pagination: payload.pagination,
        },
      };
    },
    setGoodList(state, { payload }) {
      if (isObjectNullOrUndefinedOrEmpty(payload)) {
        return;
      }
      return {
        ...state,
        goodlist: payload,
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

    saveSearchSelect(state, { payload }) {
      return { ...state, searchSelect: payload };
    },
    changeLoadingSelect(state, { payload }) {
      return { ...state, loadingSelect: payload };
    },
    savePaginationSelect(state, { payload }) {
      return { ...state, paginationSelect: payload };
    },
    changeSeeVisible(state, { payload }) {
      return { ...state, seeVisible: payload };
    },
    saveData(state, { payload }) {
      return { ...state, dataSoure: payload };
    },
  },
};
