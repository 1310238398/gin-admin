import { message } from 'antd';
import { isObjectNullOrUndefinedOrEmpty } from '../utils/utils';
import { queryEnterexaminePage, passOff, UnAuth, getOneInfo } from '../services/enterprise';

export default {
  namespace: 'enterpriseAudit',
  state: {
    shopStatueList: [],
    pagination: {},
    search: {},
    formData: {
      enterprise: {},
    },
    tableData: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    // /**
    //  * 查询字典表-上铺申请状态
    //  */
    // *queryShopstatue(_, { call, put }) {
    //   const result = yield call(enterpriseService.queryShopstatus);
    //   const response = result.list || [];
    //   if (!isObjectNullOrUndefinedOrEmpty(response)) {
    //     response.push({ code: '', name: '全部', key: '' });
    //     yield put({
    //       type: 'setShopstatue',
    //       payload: [...response],
    //     });
    //   }
    // },
    *loadForm({ payload }, { call, put }) {
      const response = yield call(getOneInfo, payload);
      yield put({
        type: 'saveDataInfo',
        payload: response,
      });
    },
    *queryEnterpriseList({ payload, pagination }, { call, put, select }) {
      let params = {
        q: 'page',
      };
      if (payload) {
        params = { ...params, ...payload };
        yield put({
          type: 'saveSearch',
          payload,
        });
      } else {
        const search = yield select(state => state.enterpriseAudit.search);
        if (search) {
          params = { ...params, ...search };
        }
      }

      if (pagination) {
        params = { ...params, ...pagination };
        yield put({
          type: 'savePagination',
          payload: pagination,
        });
      } else {
        const p = yield select(state => state.enterpriseAudit.pagination);
        if (p) {
          params = { ...params, ...p };
        }
      }
      const response = yield call(queryEnterexaminePage, params);
      yield put({
        type: 'saveData',
        payload: response,
      });
    },

    *passOff({ param, bodyContent }, { call, put }) {
      const response = yield call(passOff, { param, bodyContent });
      if (response.status === 'OK') {
        message.success('审核成功');
        yield put({ type: 'queryEnterpriseList' });
      }
    },
    *UnAuth({ param, bodyContent }, { call, put }) {
      const response = yield call(UnAuth, { param, bodyContent });
      if (response.status === 'OK') {
        message.success('驳回成功');
        yield put({ type: 'queryEnterpriseList' });
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
    saveData(state, { payload }) {
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
    savePagination(state, { payload }) {
      return { ...state, pagination: payload };
    },
    saveDataInfo(state, { payload }) {
      return { ...state, formData: payload };
    },
  },
};
