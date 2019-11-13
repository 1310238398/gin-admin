import { message } from 'antd';
import columns from '../services/s_columnManage';
import intType from '../services/s_interactionType';
// 日志管理
export default {
  namespace: 'columnManage',
  state: {
    // loading: true,
    search: {},
    pagination: {},
    data: {
      list: [],
      pagination: {},
    },
    treeData: [],
    formTitle: '新建栏目',
    formID: '',
    formVisible: false,
    formData: {},
    formExtra: [],
    formCallback() {},
    step: 0,
    extraTypes: [],
    intsTypes: [],
  },
  effects: {
    *fetch({ payload, pagination }, { call, put, select }) {
      // yield put({
      //   type: 'changeLoading',
      //   payload: true,
      // });

      let params = {};
      if (payload) {
        params = { ...payload };
        yield put({
          type: 'saveSearch',
          payload,
        });
      } else {
        const search = yield select(state => state.columnManage.search);
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
        const pag = yield select(state => state.columnManage.pagination);
        if (pag) {
          params = { ...params, ...pag };
        }
      }
      const response = yield call(columns.queryPage, params);
      yield put({
        type: 'saveData',
        payload: response,
      });
      // yield put({
      //   type: 'changeLoading',
      //   payload: false,
      // });
    },
    *queryColumnTree({ org, column, owner }, { call, put }) {
      const response = yield call(columns.queryColumnTree, org, owner, column);
      yield put({
        type: 'replaceDataTree',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *loadForm({ payload }, { put }) {
      // 给定初始值
      yield [
        put({
          type: 'changeFormVisible',
          payload: true,
        }),
        put({
          type: 'saveFormTitle',
          payload: '新建栏目',
        }),
      ];

      if (payload && payload.id) {
        yield [
          put({
            type: 'saveFormTitle',
            payload: '编辑栏目',
          }),
          put({
            type: 'saveFormID',
            payload: payload.id,
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
    *loadDetail({ payload }, { call, put }) {
      // 给定初始值
      yield [
        put({
          type: 'changeFormVisible',
          payload: true,
        }),
        put({
          type: 'saveFormTitle',
          payload: '新建栏目',
        }),
      ];

      if (payload && payload.id) {
        yield [
          put({
            type: 'saveFormTitle',
            payload: '查看栏目详情',
          }),
          put({
            type: 'saveFormID',
            payload: payload.id,
          }),
        ];
        const response = yield call(columns.query, payload.id);
        yield put({
          type: 'saveFormData',
          payload: response,
        });
      }
    },
    *fetchFormDesc({ payload }, { call, put }) {
      if (payload) {
        put({
          type: 'saveFormID',
          payload,
        });
        const response = yield call(columns.queryDesc, payload);
        yield put({
          type: 'saveFormData',
          payload: response,
        });
      }
    },
    *fetchFormCtrl({ payload }, { call, put }) {
      if (payload) {
        put({
          type: 'saveFormID',
          payload,
        });
        const intsresp = yield call(intType.queryAll);
        if (intsresp) {
          const out = intsresp.map(item => {
            return { code: item.desc.code, name: item.desc.name };
          });
          yield put({
            type: 'saveIntsTypes',
            payload: out,
          });
        }
        const response = yield call(columns.queryCtrl, payload);
        yield put({
          type: 'saveFormData',
          payload: response,
        });
      }
    },
    *fetchFormExtra({ payload }, { call, put }) {
      if (payload) {
        put({
          type: 'saveFormID',
          payload,
        });
        const response = yield call(columns.queryExtra, payload);
        yield put({
          type: 'saveFormExtra',
          payload: response,
        });
      }
    },
    *fetchExtraTypes({ payload }, { call, put }) {
      const response = yield call(columns.queryExtraTypes, payload);
      yield put({
        type: 'saveExtraTypes',
        payload: response,
      });
    },
    *submitDesc({ payload }, { call, put, select }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });

      const params = { ...payload };
      const formID = yield select(state => state.columnManage.formID);

      if (formID) {
        // 修改
        const response = yield call(columns.submitUpdateDesc, formID, params);
        yield put({
          type: 'changeSubmitting',
          payload: false,
        });
        if (response === 'ok') {
          message.success('保存成功');

          yield put({
            type: 'saveStep',
            payload: 1,
          });
        }
      } else {
        // 新增
        const response = yield call(columns.submitColumnAdd, params);
        yield put({
          type: 'changeSubmitting',
          payload: false,
        });
        if (response && response.column_id) {
          message.success('保存成功');
          yield put({
            type: 'saveFormID',
            payload: response.column_id,
          });
          yield put({
            type: 'saveStep',
            payload: 1,
          });
        }
      }
    },
    *submitCtrl({ payload }, { call, put, select }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });

      const params = { ...payload };
      const formID = yield select(state => state.columnManage.formID);
      // console.log(`formID${  formID}`);
      if (formID) {
        // 修改
        const response = yield call(columns.submitUpdateCtrl, formID, params);
        yield put({
          type: 'changeSubmitting',
          payload: false,
        });
        if (response === 'ok') {
          message.success('保存成功');

          yield put({
            type: 'saveStep',
            payload: 2,
          });
        }
      }
    },
    *submitExtra({ payload }, { call, put, select }) {
      const formID = yield select(state => state.columnManage.formID);
      if (formID) {
        yield put({
          type: 'changeSubmitting',
          payload: true,
        });
        // 修改
        const response = yield call(columns.submitUpdateExtra, formID, payload);
        yield put({
          type: 'changeSubmitting',
          payload: false,
        });
        if (response === 'ok') {
          message.success('保存成功');
          yield put({
            type: 'changeFormVisible',
            payload: false,
          });
        }
      }
      const formCallback = yield select(state => state.columnManage.formCallback);
      formCallback('ok');
    },
    *del({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      // 修改
      const response = yield call(columns.delColumn, payload);
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
    *lock({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      // 修改
      const response = yield call(columns.lock, payload);
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      if (response === 'ok') {
        message.success('锁定成功');
        yield put({
          type: 'fetch',
        });
      }
    },
    *unlock({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      // 修改
      const response = yield call(columns.unlock, payload);
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      if (response === 'ok') {
        message.success('解锁成功');
        yield put({
          type: 'fetch',
        });
      }
    },
    *recover({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      // 修改
      const response = yield call(columns.recover, payload);
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      if (response === 'ok') {
        message.success('恢复成功');
        yield put({
          type: 'fetch',
        });
      }
    },
    *destroy({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      // 修改
      const response = yield call(columns.destroy, payload);
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      if (response === 'ok') {
        message.success('彻底删除成功');
        yield put({
          type: 'fetch',
        });
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
    // changeLoading(state, { payload }) {
    //   return { ...state, loading: payload };
    // },
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
    saveStep(state, { payload }) {
      return { ...state, step: payload };
    },
    saveIntsTypes(state, { payload }) {
      return { ...state, intsTypes: payload };
    },
  },
};
