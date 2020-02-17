import { message } from 'antd';
import { queryPage, get, create, update, faceEntryDele,faceEntryDisable,faceEntryUnabale } from '../services/faceEntry';

export default {
  namespace: 'faceEntry',
  state: {
    search: {},
    pagination: {},
    data: {
      list: [],
      pagination: {},
    },
    submitting: false,
    formTitle: '新增用户数据',
    formID: '',
    formVisible: false,
    formData: {},
    formCallback() {},
  },
  effects: {
    *fetch({ payload, pagination }, { call, put, select }) {
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
        const search = yield select(state => state.faceEntry.search);
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
        const p = yield select(state => state.faceEntry.pagination);
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
      let title = '新增用户数据';
      if (payload.type === 'E') {
        title = '更新用户数据';
      } else if (payload.type === 'V') {
        title = '查看用户数据';
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
      const formID = yield select(state => state.faceEntry.formID);
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

      if (response.status === 'OK') {
        message.success('保存成功');
        yield put({
          type: 'changeFormVisible',
          payload: false,
        });
        yield put({
          type: 'fetch',
        });
        const formCallback = yield select(state => state.faceEntry.formCallback);
        formCallback('ok');
      }
    },

    *faceEntryDele({ payload }, { call, put }) {
      const response = yield call(faceEntryDele, payload);
      if (response.status === 'OK') {
        message.success('删除成功');
        yield put({ type: 'fetch' });
      }
    },
    *faceEntryDisable({ payload }, { call, put }){
      const response = yield call(faceEntryDisable, payload);
      if (response.status === 'OK') {
        message.success('冻结成功');
        yield put({ type: 'fetch' });
      }
    },
    *faceEntryUnabale({ payload }, { call, put }){
      const response = yield call(faceEntryUnabale, payload);
      if (response.status === 'OK') {
        message.success('启用成功');
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
