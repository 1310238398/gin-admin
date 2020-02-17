import { message } from 'antd';
import {
  queryPage,
  get,
  create,
  update,
  advertProDele,
  advertPass,
} from '../services/advertisPromotionService';

export default {
  namespace: 'advertisReview',
  state: {
    search: {},
    pagination: {},
    data: {
      list: [],
      pagination: {},
    },
    submitting: false,
    formTitle: '',
    formID: '',
    formVisible: false,
    formData: {},
    formCallback() {},
  },
  effects: {
    *fetch({ payload, pagination }, { call, put, select }) {
      let params = { notStatus: 1};
      if (payload) {
        params = { ...params, ...payload };
        yield put({
          type: 'saveSearch',
          payload,
        });
      } else {
        const search = yield select(state => state.advertisReview.search);
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
        const p = yield select(state => state.advertisReview.pagination);
        if (p) {
          params = { ...params, ...p };
        }
      }
      const response = yield call(queryPage, params);
      yield put({
        type: 'saveData',
        payload: response,
      });
    },
    *loadForm({ payload }, { put }) {
      let title = '新建广告主';
      if (payload.type === 'E') {
        title = '修改广告主信息';
      } else if (payload.type === 'V') {
        title = '查看广告主信息';
      }

      // 给定初始值
      yield [
        put({
          type: 'changeFormVisible',
          payload: true,
        }),
        put({
          type: 'saveFormTitle',
          payload: title,
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

      if (payload.id) {
        yield [
          put({
            type: 'saveFormID',
            payload: payload.id,
          }),
          yield put({
            type: 'fetchForm',
            payload: { record_id: payload.id },
          }),
        ];
      }

      if (payload.callback) {
        yield put({
          type: 'saveFormCallback',
          payload: payload.callback,
        });
      }
    },
    *fetchForm({ payload }, { call, put }) {
      const response = yield call(get, payload);
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
      const formID = yield select(state => state.advertisReview.formID);
      let response;
      if (formID && formID !== '') {
        params.record_id = formID;
        response = yield call(update, params);
      } else {
        response = yield call(create, params);
      }

      yield put({
        type: 'changeSubmitting',
        payload: false,
      });

      if (response.record_id && response.record_id !== '') {
        message.success('保存成功');
        yield put({
          type: 'changeFormVisible',
          payload: false,
        });
        yield put({ type: 'fetch' });
        const formCallback = yield select(state => state.advertisReview.formCallback);
        formCallback('ok');
      }
    },

    // 删除
    *advertPromDele({ payload }, { call, put }) {
      const response = yield call(advertProDele, payload);
      if (response.status === 'OK') {
        message.success('删除成功');
        yield put({ type: 'fetch' });
      }
    },
    // 通过
    *advertProPass({ payload }, { call, put }) {
      const response = yield call(advertPass, payload);
      if (response.status === 'OK') {
        message.success('保存成功');
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
    saveFormTitle(state, { payload }) {
      return { ...state, formTitle: payload };
    },
    saveFormID(state, { payload }) {
      return { ...state, formID: payload };
    },
    saveFormData(state, { payload }) {
      return { ...state, formData: payload };
    },
    saveFormCallback(state, { payload }) {
      return { ...state, formCallback: payload };
    },
    changeSubmitting(state, { payload }) {
      return { ...state, submitting: payload };
    },
  },
};
