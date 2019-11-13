import { initImosSdk } from '@/utils/monitor';
import * as monitorShowService from '@/services/monitorShow';
import { message } from 'antd';

export default {
  namespace: 'monitorShow',
  state: {
    search: {},
    pagination: {},
    data: {
      list: [],
      pagination: {},
    },
    formTitle: '',
    formID: '',
    formVisible: false,
    formData: {},
    treeData: [],
    expandedKeys: [],
  },
  effects: {
    *fetchPositionTree(_, { put, call }) {
      const params = {
        q: 'tree',
      };
      const response = yield call(monitorShowService.queryPosition, params);
      const list = response.list ? response.list : [];
      yield put({
        type: 'saveTreeData',
        payload: list,
      });

      const expandedKeys = [];
      if (list.length > 0) {
        expandedKeys.push(list[0].record_id);
      }
      yield put({
        type: 'saveExpandedKeys',
        payload: expandedKeys,
      });
    },
    *fetchMonitor({ search, pagination }, { call, put, select }) {
      let params = {
        q: 'page',
      };

      if (search) {
        params = { ...params, ...search };
        yield put({
          type: 'saveSearch',
          payload: search,
        });
      } else {
        const s = yield select(state => state.monitorShow.search);
        if (s) {
          params = { ...params, ...s };
        }
      }

      if (pagination) {
        params = { ...params, ...pagination };
        yield put({
          type: 'savePagination',
          payload: pagination,
        });
      } else {
        const p = yield select(state => state.monitorShow.pagination);
        if (p) {
          params = { ...params, ...p };
        }
      }

      const response = yield call(monitorShowService.queryMonitor, params);
      yield put({
        type: 'saveData',
        payload: response,
      });
    },
    *loadForm({ payload, callback }, { put, call }) {
      yield [
        put({
          type: 'saveFormTitle',
          payload: payload.name,
        }),
        put({
          type: 'saveFormID',
          payload: payload.record_id,
        }),
        put({
          type: 'saveFormData',
          payload,
        }),
      ];

      const response = yield call(monitorShowService.getThird, { record_id: payload.third_id });
      if (response.extra) {
        initImosSdk(response.extra, callback);
      } else {
        message.warn('无效的三方系统配置');
      }
    },
  },
  reducers: {
    saveData(state, { payload }) {
      return { ...state, data: payload };
    },
    saveSearch(state, { payload }) {
      return { ...state, search: payload };
    },
    savePagination(state, { payload }) {
      return { ...state, pagination: payload };
    },
    changeFormVisible(state, { payload }) {
      return { ...state, formVisible: payload };
    },
    saveFormType(state, { payload }) {
      return { ...state, formType: payload };
    },
    saveFormTitle(state, { payload }) {
      return { ...state, formTitle: payload };
    },
    saveFormID(state, { payload }) {
      return { ...state, formID: payload };
    },
    saveFormData(state, { payload }) {
      return { ...state, formData: payload };
    },
    saveTreeData(state, { payload }) {
      return { ...state, treeData: payload };
    },
    saveExpandedKeys(state, { payload }) {
      return { ...state, expandedKeys: payload };
    },
  },
};
