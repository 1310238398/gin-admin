import { message } from 'antd';
import reports from '../services/s_reportManage';
// 举报
export default {
  namespace: 'reportManage',
  state: {
    loading: true,
    search: {},
    pagination: {},
    data: {
      list: [],
      pagination: {},
    },
    formCallback() {},
    treeData: [],
    formTitle: '新建信息',
    formID: '',
    formVisible: false,
    formData: {},
    formExtra: [],
    extraTypes: [],
    showreport: false,
  },
  effects: {
    *fetch({ payload, pagination }, { call, put, select }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });

      let params = {};
      if (payload) {
        params = { ...payload };
        yield put({
          type: 'saveSearch',
          payload,
        });
      } else {
        const search = yield select(state => state.reportManage.search);
        if (search) {
          params = { ...search };
        }
      }

      if (pagination) {
        params = { ...params, ...pagination };
        yield put({
          type: 'savePagination',
          payload: pagination,
        });
      } else if (!payload) {
        const pag = yield select(state => state.reportManage.pagination);
        if (pag) {
          params = { ...params, ...pag };
        }
      }

      const response = yield call(reports.queryPage, params);
      yield put({
        type: 'saveData',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *getInfo({ payload }, { call, put }) {
      // 给定初始值
      yield [
        put({
          type: 'changeFormVisible',
          payload: true,
        }),
        put({
          type: 'saveFormTitle',
          payload: '新建信息',
        }),
        put({
          type: 'saveFormData',
          payload: {},
        }),
      ];

      if (payload && payload.id) {
        yield [
          put({
            type: 'saveFormTitle',
            payload: '编辑信息',
          }),
          put({
            type: 'saveFormID',
            payload: payload.id,
          }),
        ];

        const response = yield call(reports.queryOne, payload.id);

        yield put({
          type: 'saveFormData',
          payload: response,
        });
      }
      if (payload && payload.callback) {
        yield put({
          type: 'saveFormCallback',
          payload: payload.callback,
        });
      }
    },
    *del({ id }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      // 修改
      const response = yield call(reports.delete, id);
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      if (response === 'ok') {
        message.success('删除成功');
        yield put({
          type: 'fetch',
        });
      }
    },
    *do(
      {
        payload: { id, result },
      },
      { call, put }
    ) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      // 修改
      const response = yield call(reports.do, { id, result });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      if (response === 'ok') {
        message.success('处理成功');
        yield put({
          type: 'fetch',
        });
        yield put({
          type: 'getInfo',
          payload: { id },
        });
        // const showreport = yield select(state => state.reportManage.showreport);
        // if (showreport) {
        //   const formCallback = yield select(state => state.reportManage.formCallback);
        //   formCallback('ok');
        //   yield put({
        //     type: 'saveShowreport',
        //     payload: false,
        //   });
        // }
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
    changeLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
    replaceDataTree(state, action) {
      return {
        ...state,
        treeData: action.payload,
      };
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
  },
};
