import { message } from 'antd';
import groupInfos from '../services/s_groupInfoManage';
import groups from '../services/s_groupManage';
// 日志管理
export default {
  namespace: 'groupInfo',
  state: {
    loading: true,
    groupId: '',
    groupData: {},
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
      yield [
        put({
          type: 'changeLoading',
          payload: true,
        }),
        put({
          type: 'saveGroupId',
          payload: groupId,
        }),
      ];

      let params = {};
      if (payload) {
        params = { ...payload };
        yield put({
          type: 'saveSearch',
          payload,
        });
      } else {
        const search = yield select(state => state.groupInfo.search);
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
        const pag = yield select(state => state.groupInfo.pagination);
        if (pag) {
          params = { ...params, ...pag };
        }
      }

      const groupreps = yield call(groups.queryGroup, groupId);

      const response = yield call(groupInfos.queryGroupInfoPage, groupId, params);

      yield [
        put({
          type: 'saveData',
          payload: response,
        }),
        put({
          type: 'saveGroupData',
          payload: groupreps,
        }),
        put({
          type: 'changeLoading',
          payload: false,
        }),
      ];
    },
    *appendInfo({ groupid, infoids }, { call, put, select }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      // 修改
      const response = yield call(groupInfos.appendInfo, groupid, infoids);
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      if (response === 'ok') {
        message.success('添加信息成功');
        yield put({
          type: 'fetch',
          groupId: groupid,
        });
        const formCallback = yield select(state => state.groupInfo.formCallback);
        formCallback('ok');
      }
    },
    *updateWeight({ groupid, giid, weight }, { call, put, select }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      // 修改
      const response = yield call(groupInfos.updateWeight, groupid, giid, weight);
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      if (response === 'ok') {
        message.success('修改权重成功．');
        yield put({
          type: 'fetch',
          groupId: groupid,
        });
        const formCallback = yield select(state => state.groupInfo.formCallback);
        formCallback('ok');
      }
    },
    *del({ groupid, infoids }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      // 修改
      const response = yield call(groupInfos.del, groupid, infoids);
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      if (response === 'ok') {
        message.success('删除成功');
        yield put({
          type: 'fetch',
          groupId: groupid,
        });
      }
    },
    *loadForm({ payload }, { put }) {
      // 给定初始值
      yield [
        put({
          type: 'changeFormVisible',
          payload: true,
        }),
      ];
      if (payload && payload.callback) {
        yield put({
          type: 'saveFormCallback',
          payload: payload.callback,
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
    changeLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
    changeFormVisible(state, { payload }) {
      return { ...state, formVisible: payload };
    },
    saveGroupId(state, { payload }) {
      return { ...state, groupId: payload };
    },
    saveGroupData(state, { payload }) {
      return { ...state, groupData: payload };
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
