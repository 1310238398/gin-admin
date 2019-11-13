import { message } from 'antd';
import infos from '../services/s_infoManage';
import columns from '../services/s_columnManage';
import { get } from '../services/s_user';

// 日志管理
export default {
  namespace: 'columnInfoManage',
  state: {
    columnId: '',
    column: {},
    listmode: 0,
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
    showInfo: false,
  },
  effects: {
    *fetch({ payload, pagination }, { call, put, select }) {
      const loading = yield select(state => state.columnInfoManage.loading);
      if (!loading) {
        yield put({
          type: 'changeLoading',
          payload: true,
        });
      }
      let params = {};
      if (payload) {
        params = { ...payload };
        yield put({
          type: 'saveSearch',
          payload,
        });
      } else {
        const search = yield select(state => state.columnInfoManage.search);
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
        const pag = yield select(state => state.columnInfoManage.pagination);
        if (pag) {
          params = { ...params, ...pag };
        }
      }
      const columnId = yield select(state => state.columnInfoManage.columnId);
      params.column = columnId;
      const response = yield call(infos.queryPage, params);

      yield put({
        type: 'fetchColumnName',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *init({ columnid, listmode, searchObj }, { call, put }) {
      yield [
        put({
          type: 'saveSearch',
          payload: {},
        }),
        put({
          type: 'saveParams',
          columnid,
          listmode,
        }),
        put({
          type: 'changeLoading',
          payload: true,
        }),
      ];
      const column = yield call(columns.query, columnid);
      yield put({
        type: 'saveColumn',
        payload: column,
      });
      // 正常模式
      yield put({
        type: 'fetch',
        payload: {
          ...searchObj,
        },
      });
    },
    *refreshCol(_, { call, put, select }) {
      yield [
        put({
          type: 'changeLoading',
          payload: true,
        }),
        put({
          type: 'saveColumn',
          payload: {},
        }),
      ];

      const columnId = yield select(state => state.columnInfoManage.columnId);
      const column = yield call(columns.query, columnId);
      yield put({
        type: 'saveColumn',
        payload: column,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *fetchColumnName({ payload }, { call, put }) {
      const { list } = payload;
      if (list && list.length > 0) {
        const c = {};
        // 获取栏目名称
        for (const key in list) {
          if ({}.hasOwnProperty.call(list, key)) {
            const item = list[key];
            if (item) {
              if (c[item.desc.column_id]) {
                item.desc.column_name = c[item.desc.column_id].desc.name;
                item.ctl_param = c[item.desc.column_id].ctl_param;
              } else {
                const r = yield call(columns.query, item.desc.column_id);
                c[item.desc.column_id] = r;
                item.desc.column_name = r.desc.name;
                item.ctl_param = r.ctl_param;
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

        const response = yield call(infos.queryDesc, payload.id);

        yield put({
          type: 'saveFormData',
          payload: response,
        });
      } else {
        yield put({
          type: 'saveFormID',
          payload: '',
        });
        yield put({
          type: 'saveFormData',
          payload: {},
        });
      }
      if (payload && payload.callback) {
        yield put({
          type: 'saveFormCallback',
          payload: payload.callback,
        });
      }
    },

    *submitDesc({ payload }, { call, put, select }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });

      const params = { ...payload };
      const formID = yield select(state => state.columnInfoManage.formID);
      const column = yield select(state => state.columnInfoManage.column);
      const columnId = yield select(state => state.columnInfoManage.columnId);
      const listmode = yield select(state => state.columnInfoManage.listmode);
      params.org = column.desc.org;
      params.owner = column.desc.owner;
      params.column_id = columnId;
      if (listmode) {
        params.list_mode = listmode;
      }
      if (formID) {
        // 修改
        const response = yield call(infos.submitUpdateDesc, formID, params);
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
          const formCallback = yield select(state => state.columnInfoManage.formCallback);
          formCallback('ok');
        }
      } else {
        // 新增
        const response = yield call(infos.submitInfoAdd, params);
        yield put({
          type: 'changeSubmitting',
          payload: false,
        });
        if (response && response.info_id) {
          message.success('保存成功');

          yield put({
            type: 'changeFormVisible',
            payload: false,
          });
          const formCallback = yield select(state => state.columnInfoManage.formCallback);
          formCallback('ok');
        }
      }
    },

    *colLock({ payload, callback }, { call, put }) {
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
        if (callback) {
          callback();
        }
      }
    },
    *colUnlock({ payload, callback }, { call, put }) {
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
        if (callback) {
          callback();
        }
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
    saveParams(state, { columnid, listmode }) {
      return { ...state, columnId: columnid, listmode };
    },
    saveColumn(state, { payload }) {
      return { ...state, column: payload };
    },
    saveShowInfo(state, { payload }) {
      return { ...state, showInfo: payload };
    },
  },
};
