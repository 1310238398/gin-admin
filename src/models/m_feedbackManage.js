import { message } from 'antd';
import feedback from '../services/s_feedbackManage';
import review from '../services/s_reviewManage';
// 日志管理
export default {
  namespace: 'feedbackManage',
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
        const search = yield select(state => state.feedbackManage.search);
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
        const pag = yield select(state => state.feedbackManage.pagination);
        if (pag) {
          params = { ...params, ...pag };
        }
      }

      const response = yield call(feedback.queryPage, params);
      yield put({
        type: 'saveData',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *loadForm({ payload }, { call, put }) {
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

        const response = yield call(feedback.queryDesc, payload.id);

        const {
          desc: { org, owner },
        } = response;
        yield put({
          type: 'columnManage/queryColumnTree',
          org,
          owner,
        });

        // const ctrlesp = yield call(columns.queryExtra, response.desc.column_id);
        // response.ctrl = ctrlesp;
        // s
        yield put({
          type: 'fetchFormExtra',
          columnId: response.desc.column_id,
          response,
        });
      } else {
        yield put({
          type: 'saveFormData',
          payload: {},
        });
        yield put({
          type: 'saveFormID',
          payload: '',
        });
        yield put({
          type: 'columnManage/queryColumnTree',
        });
      }
      if (payload && payload.callback) {
        yield put({
          type: 'saveFormCallback',
          payload: payload.callback,
        });
      }
    },
    // *fetchFormExtra({ columnId, response }, { call, put, select }) {
    //   const respextra = yield call(columns.queryExtra, columnId);
    //   let formData = response;
    //   if (!formData) {
    //     formData = yield select(state => state.feedbackManage.formData);
    //   }
    //   formData.ctrl = respextra;
    //   yield put({
    //     type: 'saveFormData',
    //     payload: formData,
    //   });
    // },

    *del({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      // 修改
      const response = yield call(feedback.delInfo, payload);
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
    *commit({ payload }, { call, put, select }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      // 修改
      const response = yield call(feedback.commitInfo, payload);
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      if (response === 'ok') {
        message.success('提交审核成功');
        yield put({
          type: 'fetch',
        });
        const formCallback = yield select(state => state.feedbackManage.formCallback);
        formCallback('ok');
      }
    },
    *submitOk({ payload }, { call, select }) {
      const response = yield call(review.submitOk, payload);
      if (response === 'ok') {
        message.success('保存成功');

        const formCallback = yield select(state => state.feedbackManage.formCallback);
        formCallback('ok');
      }
    },
    *submitNo({ payload }, { call, select }) {
      const response = yield call(review.submitNo, payload);
      if (response === 'ok') {
        message.success('保存成功');

        const formCallback = yield select(state => state.feedbackManage.formCallback);
        formCallback('ok');
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
    saveFormExtra(state, { payload }) {
      return { ...state, formExtra: payload };
    },
    saveExtraTypes(state, { payload }) {
      return { ...state, extraTypes: payload };
    },
    saveFormCallback(state, { payload }) {
      return { ...state, formCallback: payload };
    },
  },
};
