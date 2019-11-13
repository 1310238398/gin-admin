import infos from '../services/s_infoManage';
import groupInfos from '../services/s_groupInfoManage';
import columns from '../services/s_columnManage';
import { get } from '../services/s_user';
// 日志管理
export default {
  namespace: 'groupInfoSelect',
  state: {
    loading: false,
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
    *fetch({ groupId, payload, pagination }, { call, put, select }) {
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
        const search = yield select(state => state.groupInfoSelect.search);
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
        const pag = yield select(state => state.groupInfoSelect.pagination);
        if (pag) {
          params = { ...params, ...pag };
        }
      }

      const response = yield call(infos.queryPage, params);
      yield put({
        type: 'fetchGroupSelect',
        payload: response,
        groupId,
      });
      yield put({
        type: 'fetchColumnName',
        payload: response,
      });
      yield put({
        type: 'fetchUserInfo',
        payload: response,
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
    *fetchGroupSelect({ groupId, payload }, { call, put }) {
      const { list } = payload;
      if (list && list.length > 0) {
        const ids = [];
        const c = {};
        // 获取栏目名称
        for (const item of list) {
          ids.push(item.info_id);
          item.selected = false;
          c[item.info_id] = item;
        }
        const r = yield call(groupInfos.existsGroup, groupId, ids);

        for (const v of r) {
          c[v].selected = true;
        }
      }
      yield put({
        type: 'saveData',
        payload,
      });
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
    saveFormCallback(state, { payload }) {
      return { ...state, formCallback: payload };
    },
  },
};
