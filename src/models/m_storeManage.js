import { message } from 'antd';
import { isObjectNullOrUndefinedOrEmpty } from '../utils/utils';
import StoreService from '../services/s_shopApplicationReview';

export default {
  namespace: 'storeManage',
  state: {
    loading: false,
    search: {},
    pagination: {},
    storeStatueList: [],
    tableData: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    /**
     * 查询字典表-店铺状态
     */
    *queryStorestatue(_, { call, put }) {
      const result = yield call(StoreService.queryStorestatus);
      const response = result.list || [];
      if (!isObjectNullOrUndefinedOrEmpty(response)) {
        // 添加全部
        response.push({ code: '', name: '全部', key: '' });
        yield put({
          type: 'setStorestatue',
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
        const search = yield select(state => state.storeManage.search);
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
        const pag = yield select(state => state.storeManage.pagination);
        if (pag) {
          pagination = { ...pag };
        }
      }
      const result = yield call(StoreService.queryPageStore, {
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
    // *deleOff({ recordId }, { call,put }) {
    //   const response = yield call(PersonalService.writeOff, { recordId });
    //   if (response.status === 'ok') {
    //     message.success('删除成功');
    //     yield put({ type: 'queryShopStatueTotalInfo' });
    // }
    // },
    *hangUp({ recordId }, { call, put }) {
      const response = yield call(StoreService.hangupStore, { recordId });
      if (response.status === 'ok') {
        message.success('挂起成功');
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    *cancle({ recordId }, { call, put }) {
      const response = yield call(StoreService.cancleStore, { recordId });
      if (response.status === 'ok') {
        message.success('取消挂起成功');
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
  },

  reducers: {
    saveSearch(state, { payload }) {
      return { ...state, search: payload };
    },
    setStorestatue(state, { payload }) {
      if (isObjectNullOrUndefinedOrEmpty(payload)) {
        return;
      }
      return {
        ...state,
        storeStatueList: payload,
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
    changeLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
    savePagination(state, { payload }) {
      return { ...state, pagination: payload };
    },
  },
};
