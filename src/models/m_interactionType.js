import { message } from 'antd';
import intType from '../services/s_interactionType';
import { get } from '../services/s_user';
// 日志管理
export default {
  namespace: 'interactionType',
  state: {
    // loading: true,
    search: {},
    pagination: {},
    data: {
      list: [],
      pagination: {},
    },
    treeData: [],
    formTitle: '新建互动类型',
    formID: '',
    formVisible: false,
    formData: {},
    formExtra: [],
    formCallback() {},
    step: 0,
    extraTypes: [],
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
        const search = yield select(state => state.interactionType.search);
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
        const pag = yield select(state => state.interactionType.pagination);
        if (pag) {
          params = { ...params, ...pag };
        }
      }
      const response = yield call(intType.queryPage, params);
      yield put({
        type: 'saveData',
        payload: response,
      });
      yield put({
        type: 'fetchUserInfo',
        payload: response,
      });
      // yield put({
      //   type: 'changeLoading',
      //   payload: false,
      // });
    },
    *fetchUserInfo({ payload }, { call, put }) {
      const { list } = payload;
      if (list && list.length > 0) {
        const c = {};
        // 获取栏目名称
        for (const key in list) {
          if ({}.hasOwnProperty.call(list, key)) {
            const item = list[key];
            if (item) {
              if (c[item.operator.creator]) {
                item.operator.creator_name = c[item.operator.creator].nickname;
              } else {
                const r = yield call(get, {
                  record_id: item.operator.creator,
                });
                c[item.operator.creator] = r;
                item.operator.creator_name = r.nickname;
              }
            }
          }
        }
      }
      yield put({
        type: 'saveData',
        payload,
      });
    },
    *loadForm({ payload }, { put, call }) {
      // 给定初始值
      yield [
        put({
          type: 'changeFormVisible',
          payload: true,
        }),
        put({
          type: 'saveFormTitle',
          payload: '新建互动类型',
        }),
      ];

      if (payload && payload.id) {
        yield [
          put({
            type: 'saveFormTitle',
            payload: '修改互动类型',
          }),
          put({
            type: 'saveFormID',
            payload: payload.id,
          }),
        ];
        const response = yield call(intType.query, payload.id);
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
        const response = yield call(intType.query, payload.id);
        yield put({
          type: 'saveFormData',
          payload: response,
        });
      }
    },
    *submitDesc({ payload }, { call, put, select }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });

      const params = { ...payload };
      const formID = yield select(state => state.interactionType.formID);

      if (formID) {
        // 修改
        const response = yield call(intType.update, formID, params);
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
          const formCallback = yield select(state => state.interactionType.formCallback);
          formCallback('ok');
        }
      } else {
        // 新增
        const response = yield call(intType.add, params);
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
          const formCallback = yield select(state => state.interactionType.formCallback);
          formCallback('ok');
        }
      }
    },
    *del({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      // 修改
      const response = yield call(intType.del, payload);
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
      const response = yield call(intType.lock, payload);
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
      const response = yield call(intType.unlock, payload);
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
      const response = yield call(intType.recover, payload);
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
      const response = yield call(intType.destroy, payload);
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
  },
};
