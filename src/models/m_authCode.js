import { message } from 'antd';
import { queryPage, queryHistoryPage, get, create, disable } from '../services/s_authCode';

export default {
  namespace: 'authCode',
  state: {
    loading: true,
    search: {},
    data: {
      list: [],
      pagination: {},
    },
    submitting: false,
    formTitle: '生成企业认证码',
    formID: '',
    formVisible: false,
    formData: {},
    formCallback() {},
    historyLoading: true,
    historyData: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetch({ payload, pagination }, { call, put, select }) {
      let params = {
        q: 'page',
      };
      yield put({
        type: 'changeLoading',
        payload: true,
      });

      if (payload) {
        params = { ...params, ...payload };
        yield put({
          type: 'saveSearch',
          payload,
        });
      } else {
        const search = yield select(state => state.enterprise.search);
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
        const p = yield select(state => state.enterprise.pagination);
        if (p) {
          params = { ...params, ...p };
        }
      }
      const response = yield call(queryPage, params);
      yield put({
        type: 'saveData',
        payload: response,
      });

      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *fetchHistory({ payload, pagination }, { call, put }) {
      yield put({
        type: 'changeHistoryLoading',
        payload: true,
      });

      let params = { q: 'page', ...payload };
      if (pagination) {
        params = { ...params, ...pagination };
      }

      const response = yield call(queryHistoryPage, params);
      // const hisData = response.list||[];

      // if (response && response.list) {
      //   hisData.nickname = response.list.nickname;
      //   hisData.real_name = response.list.real_name;
      //   hisData.gender = response.list.gender;
      //   hisData.tel = response.list.tel;
      //   hisData.created = response.list.created_at;
      // }
      // if (response && response.dept) {
      //   hisData.dept_name = response.dept.name;
      // }

      yield put({
        type: 'saveHistoryData',
        payload: response,
      });

      yield put({
        type: 'changeHistoryLoading',
        payload: false,
      });
    },
    *loadForm({ payload }, { put }) {
      let title = '';
      switch (payload.type) {
        case 'V':
          title = '查看企业认证码';
          break;
        case 'H':
          title = '企业认证码认证清单';
          break;
        default:
          title = '生成企业认证码';
          break;
      }
      const params = {};
      if (payload.info) {
        const enterName = payload.info.name;
        const parkName = payload.info.park_id;
        const enterId = payload.info.record_id;
        params.enterprise_name = enterName;
        params.park_name = parkName;
        params.enterprise_id = enterId;
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
          payload: params,
        }),
      ];

      if (payload && payload.id) {
        yield [
          put({
            type: 'saveFormID',
            payload: payload.id,
          }),
          put({
            type: 'fetchForm',
            payload: { record_id: payload.id },
            params,
          }),
        ];
      }

      if (payload && payload.callback) {
        yield put({
          type: 'saveFormCallback',
          payload: payload.callback,
        });
      }
    },
    *fetchForm({ payload, params }, { call, put }) {
      const response = yield call(get, payload.record_id);

      if (params) {
        response.enterprise_name = params.enterprise_name;
        response.park_name = params.park_name;
        response.enterprise_id = params.enterprise_id;
      }

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
      delete params.effective_date;
      const response = yield call(create, params);

      yield put({
        type: 'changeSubmitting',
        payload: false,
      });

      // if (response.status === 'ok') {
      if (response) {
        yield put({
          type: 'changeFormVisible',
          payload: false,
        });
        const formCallback = yield select(state => state.authCode.formCallback);
        formCallback('ok', response.code);
      }

      // }
    },
    *submitInvalid({ payload }, { call, put, select }) {
      const response = yield call(disable, payload);
      if (response.status === 'OK') {
        yield put({
          type: 'changeFormVisible',
          payload: false,
        });
        message.success('作废成功');
        const formCallback = yield select(state => state.authCode.formCallback);
        formCallback('ok');
      }
    },
    *changeStatus({ payload }, { call, put, select }) {
      let response;
      if (payload.status === 2) {
        response = yield call(disable, payload);
      }

      if (response.status === 'OK') {
        const msg = '作废成功';
        message.success(msg);
        const data = yield select(state => state.authCode.data);
        const newData = { list: [], pagination: data.pagination };

        for (let i = 0; i < data.list.length; i += 1) {
          const item = data.list[i];
          if (item.record_id === payload.record_id) {
            item.status = payload.status;
          }
          newData.list.push(item);
        }

        yield put({
          type: 'saveData',
          payload: newData,
        });
      }
    },
  },
  reducers: {
    saveData(state, { payload }) {
      return { ...state, data: payload };
    },
    changeLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
    savePagination(state, { payload }) {
      return { ...state, pagination: payload };
    },
    saveHistoryData(state, { payload }) {
      return { ...state, historyData: payload };
    },
    changeHistoryLoading(state, { payload }) {
      return { ...state, historyLoading: payload };
    },
    saveSearch(state, { payload }) {
      return { ...state, search: payload };
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
