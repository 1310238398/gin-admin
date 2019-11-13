import { message } from 'antd';
import { isObjectNullOrUndefinedOrEmpty } from '../utils/utils';
import StoreService from '../services/s_shopApplicationReview';

export default {
  namespace: 'shopApplicationReview',
  state: {
    shopStatueList: [],
    search: {},
    pagination: {},
    loading: false,
    tableData: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    /**
     * 查询字典表-上铺申请状态
     */
    *queryShopstatue(_, { call, put }) {
      const result = yield call(StoreService.queryShopstatus);
      const response = result.list || [];
      if (!isObjectNullOrUndefinedOrEmpty(response)) {
        response.push({ code: '', name: '全部', key: '' });
        yield put({
          type: 'setShopstatue',
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
        const search = yield select(state => state.shopApplicationReview.search);
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
        const pag = yield select(state => state.shopApplicationReview.pagination);
        if (pag) {
          pagination = { ...pag };
        }
      }
      const result = yield call(StoreService.queryApplicationPageStore, {
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
    *passOff({ register }, { call, put }) {
      const response = yield call(StoreService.passOff, { register });
      if (response.status === 'ok') {
        message.success('审核成功');
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    *UnAuth({ reason }, { call, put }) {
      const response = yield call(StoreService.UnAuth, { reason });
      if (response.status === 'ok') {
        message.success('发送成功');
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
  },
  reducers: {
    setShopstatue(state, { payload }) {
      if (isObjectNullOrUndefinedOrEmpty(payload)) {
        return;
      }
      return {
        ...state,
        shopStatueList: payload,
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
    saveSearch(state, { payload }) {
      return { ...state, search: payload };
    },
    changeLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
    savePagination(state, { payload }) {
      return { ...state, pagination: payload };
    },
  },
};
