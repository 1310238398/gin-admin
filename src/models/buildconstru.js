import { message } from 'antd';
import * as buildconstruService from '@/services/buildconstru';

export default {
  namespace: 'buildconstru',
  state: {
    search: {},
    data: {
      list: [],
    },
    submitting: false,
    formType: '',
    formTitle: '',
    formID: '',
    formVisible: false,
    formData: {},
    selectNode: {},
  },
  effects: {
    *fetch({ search }, { call, put, select }) {
      let params = {
        q: 'list',
      };

      if (search) {
        params = { ...params, ...search };
        yield put({
          type: 'saveSearch',
          payload: search,
        });
      } else {
        const s = yield select(state => state.buildconstru.search);
        if (s) {
          params = { ...params, ...s };
        }
      }

      const response = yield call(buildconstruService.query, params);
      yield put({
        type: 'saveData',
        payload: response,
      });
    },
    *loadForm({ payload }, { put, select }) {
      yield put({
        type: 'changeFormVisible',
        payload: true,
      });

      yield [
        put({
          type: 'saveFormType',
          payload: payload.type,
        }),
        put({
          type: 'saveFormTitle',
          payload: '新建建筑',
        }),
        put({
          type: 'saveFormID',
          payload: '',
        }),
        put({
          type: 'saveFormData',
          payload: {},
        }),
      ];

      if (payload.type === 'E') {
        yield [
          put({
            type: 'saveFormTitle',
            payload: '编辑建筑',
          }),
          put({
            type: 'saveFormID',
            payload: payload.id,
          }),
          put({
            type: 'fetchForm',
            payload: { record_id: payload.id },
          }),
        ];
      }

      if (payload.type === 'A') {
        const search = yield select(state => state.buildconstru.search);
        yield put({
          type: 'saveFormData',
          payload: { parent_id: search.parent_id ? search.parent_id : '' },
        });
      }
    },
    *fetchForm({ payload }, { call, put }) {
      const response = yield call(buildconstruService.get, payload);
      yield put({
        type: 'saveFormData',
        payload: response,
      });
    },
    *submit({ payload }, { call, put, select }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });

      const params = { ...payload };
      const formType = yield select(state => state.buildconstru.formType);
      let success = false;
      let response;
      if (formType === 'E') {
        params.record_id = yield select(state => state.buildconstru.formID);
        response = yield call(buildconstruService.update, params);
      } else {
        const selectNode = yield select(state => state.buildconstru.selectNode);
        params.parent_id = selectNode.record_id;
        response = yield call(buildconstruService.create, params);
      }
      if (response.record_id && response.record_id !== '') {
        success = true;
      }

      yield put({
        type: 'changeSubmitting',
        payload: false,
      });

      if (success) {
        message.success('保存成功');
        yield put({
          type: 'changeFormVisible',
          payload: false,
        });

        yield put({ type: 'fetch' });
      }
    },
    *del({ payload }, { call, put }) {
      const response = yield call(buildconstruService.del, payload);
      if (response.status === 'OK') {
        message.success('删除成功');
        yield put({ type: 'fetch' });
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
    saveSelectNode(state, { payload }) {
      return { ...state, selectNode: payload };
    },
    changeSubmitting(state, { payload }) {
      return { ...state, submitting: payload };
    },
  },
};
