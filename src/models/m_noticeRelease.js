import { message } from 'antd';
import { add, queryPage, del, get, update } from '../services/s_noticeRelease';

export default {
  namespace: 'noticeRelease',
  state: {
    data: {},
    modalVisible: false,
    modalTitle: '',
    search: '',
    formData: '',
  },
  effects: {
    *fetch({ payload, pagination }, { call, put, select }) {
      let params = {};

      if (payload) {
        params = { ...payload };
        yield put({
          type: 'saveSearch',
          payload,
        });
      } else {
        const search = yield select(state => state.noticeRelease.search);
        if (search) {
          params = { ...search };
        }
      }

      if (pagination) {
        params = { ...params, ...pagination };
      }

      const response = yield call(queryPage, params);
      yield put({
        type: 'saveData',
        payload: response,
      });
    },

    *loadForm({ payload }, { call, put }) {
      yield put({ type: 'changemodalVisible', payload: true });
      yield put({ type: 'changemodalTiTle', payload: '新建通知' });
      yield put({
        type: 'saveFormData',
        payload: {},
      });
      if (payload && payload.id) {
        const response = yield call(get, payload);
        yield put({
          type: 'saveFormData',
          payload: response,
        });
        if (payload && payload.type === 'V') {
          yield put({ type: 'changemodalTiTle', payload: '查看通知' });
        } else if (payload && payload.type === 'E') {
          yield put({ type: 'changemodalTiTle', payload: '编辑通知' });
        }
      }
    },
    *add({ payload, val, id }, { call, put }) {
      if (val === 'add') {
        payload.message_frequency = 1;
        const result = yield call(add, payload);
        if (result.status === 'ok') {
          message.success('操作成功');
          yield put({
            type: 'fetch',
          });
          yield put({ type: 'changemodalVisible', payload: true });
        }
      } else if (val === 'send') {
        payload.message_frequency = 1;
        payload.record_id = id;
        const result = yield call(update, payload);
        if (result.status === 'ok') {
          message.success('操作成功');
          yield put({
            type: 'fetch',
          });
          yield put({ type: 'changemodalVisible', payload: true });
        }
      } else if (val === 'temporaryStorage') {
        payload.message_frequency = 0;
        payload.record_id = id;
        const result = yield call(update, payload);
        if (result.status === 'ok') {
          message.success('操作成功');
          yield put({
            type: 'fetch',
          });
          yield put({ type: 'changemodalVisible', payload: true });
        }
      } else if (val === 'temporaryStorage_create') {
        payload.message_frequency = 0;
        const result = yield call(add, payload);
        if (result.status === 'ok') {
          message.success('操作成功');
          yield put({
            type: 'fetch',
          });
          yield put({ type: 'changemodalVisible', payload: true });
        }
      }
    },
    *del({ payload }, { call, put }) {
      const result = yield call(del, payload);
      if (result.status === 'ok') {
        message.success('操作成功');
        yield put({
          type: 'fetch',
        });
        yield put({ type: 'changemodalVisible', payload: true });
      }
    },
  },
  reducers: {
    changemodalVisible(state, { payload }) {
      return { ...state, modalVisible: payload };
    },
    saveSearch(state, { payload }) {
      return { ...state, search: payload };
    },
    changemodalTiTle(state, { payload }) {
      return { ...state, modalTitle: payload };
    },

    saveData(state, { payload }) {
      return { ...state, data: payload };
    },
    saveFormData(state, { payload }) {
      return { ...state, formData: payload };
    },
  },
};
