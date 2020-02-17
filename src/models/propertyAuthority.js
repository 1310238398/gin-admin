import { message } from 'antd';
import {
  queryPage,
  get,
  create,
  update,
  propertyAuthorityDele,
} from '../services/propertyAuthority';

export default {
  namespace: 'propertyAuthority',
  state: {
    search: {},
    pagination: {},
    data: {
      list: [],
      pagination: {},
    },
    submitting: false,
    formTitle: '创建权限',
    formID: '',
    formVisible: false,
    formData: {},
    formCallback() {},
    currentStoreInfo: {},
    dataList: [],
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
        const search = yield select(state => state.propertyAuthority.search);
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
        const p = yield select(state => state.propertyAuthority.pagination);
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
      let title = '创建门禁权限';
      if (payload.type === 'E') {
        title = '修改门禁权限信息';
      } else if (payload.type === 'V') {
        title = '查看门禁权限信息';
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
      const result = response || [];
      const data = [];

      for (let i = 0; i < result.length; i += 1) {
        let exists = false;
        for (let j = 0; j < data.length; j += 1) {
          if (data[j].tag === result[i].tag) {
            data[j].building_id += `,${result[i].building_id}`;
            data[j].building_name += `,${result[i].building_name}`;
            exists = true;
            break;
          }
        }
        if (!exists) {
          data.push({
            tag: result[i].tag,
            building_id: result[i].building_id,
            building_name: result[i].building_name,
          });
        }
      }

      yield put({
        type: 'saveFormDataS',
        payload: data,
      });
    },
    *submit({ payload }, { call, put, select }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });

      const params = { ...payload };
      //  const formID = yield select(state => state.propertyAuthority.formID);
      const response = yield call(update, params);
      //   if (formID && formID !== '') {
      //     params.record_id = formID;
      //     response = yield call(update, params);
      //   } else {
      //     response = yield call(create, params);
      //   }

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
        yield put({ type: 'fetch' });
        const formCallback = yield select(state => state.propertyAuthority.formCallback);
        formCallback('ok');
      }
    },

    // 删除
    *propertyAuthorityDele({ payload }, { call, put }) {
      const response = yield call(propertyAuthorityDele, payload);
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
    saveFormTitle(state, { payload }) {
      return { ...state, formTitle: payload };
    },
    saveFormID(state, { payload }) {
      return { ...state, formID: payload };
    },
    saveFormData(state, { payload }) {
      return { ...state, formData: payload };
    },
    saveFormDataS(state, { payload }) {
      return { ...state, dataList: payload };
    },
    saveFormCallback(state, { payload }) {
      return { ...state, formCallback: payload };
    },
    changeSubmitting(state, { payload }) {
      return { ...state, submitting: payload };
    },
  },
};
