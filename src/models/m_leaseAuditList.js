import { message } from 'antd';
import ReviewsService from '../services/s_reviewManage';
import InfosService from '../services/s_infoManage';
// import { get } from '../services/s_user';
import { getLeadit } from '../services/s_systemParameter';

export default {
  namespace: 'leaseAuditList',
  state: {
    // loading: true,
    search: {},
    pagination: {},
    data: {
      list: [],
      pagination: {},
    },
    formCallback() {},
    treeData: [],
    formID: '',
    code: 'cms.zlxx.columnid',
    leaditCode: '',
    formVisible: false,
    formData: {},
  },
  effects: {
    *fetchLeaditCode(_, { call, put }) {
      const param = { q: 'value', code: 'cms.zlxx.columnid' };
      const response = yield call(getLeadit, param);
      yield put({
        type: 'saveLeaditCode',
        payload: response.value,
      });
      const code = response.value;
      yield put({
        type: 'fetch',
        payload: {
          column: code,
          status: [1, 2, 4, 5, 6],
        },
      });
    },

    *fetch({ payload, pagination }, { call, put, select }) {
      let params = {};
      const syecode = yield select(state => state.leaseAuditList.leaditCode);
      // yield put({
      //   type: 'changeLoading',
      //   payload: true,
      // });

      if (payload) {
        params = { ...payload };
        yield put({
          type: 'saveSearch',
          payload,
        });
      } else {
        const search = yield select(state => state.leaseAuditList.search);
        if (search) {
          params = { ...search, ...payload };
        }
      }

      if (pagination) {
        params = { ...params, ...pagination };
        yield put({
          type: 'savePagination',
          payload: pagination,
        });
      } else if (!payload) {
        const pag = yield select(state => state.leaseAuditList.pagination);
        if (pag) {
          params = { ...params, ...pag };
        }
      }
      if (syecode === '') {
        yield put({ type: 'fetchLeaditCode' });
      } else {
        const column = syecode.payload;
        params = { ...params, column };
        const response = yield call(InfosService.queryPage, params);
        yield put({
          type: 'fetchColumnName',
          payload: response,
        });
        yield put({
          type: 'fetchUserInfo',
          payload: response,
        });
      }
    },

    /* 发布人 */
    *fetchUserInfo({ payload }, { put }) {
      // const { list } = payload;
      // if (list && list.length > 0) {
      //   const c = {};
      //   // 获取栏目名称
      //   for (const key in list) {
      //     if ({}.hasOwnProperty.call(list, key)) {
      //       const item = list[key];
      //       if (item) {
      //         if (c[item.operator.creator]) {
      //           item.operator.creator_name = c[item.operator.creator].nickname;
      //         } else if(c[item.operator.creator]!==''){
      //           const r = yield call(get, {
      //             record_id: item.operator.creator,
      //           });
      //           c[item.operator.creator] = r;
      //           item.operator.creator_name = r.nickname;
      //           item.operator.record_id = r.record_id;
      //         }
      //       }
      //     }
      //   }
      // }
      yield put({
        type: 'saveData',
        payload,
      });
      yield put({
        type: 'saveFormData',
        payload,
      });
      // yield put({
      //   type: 'changeLoading',
      //   payload: false,
      // });
    },
    *loadForm({ payload }, { call, put }) {
      // 给定初始值
      const response = yield call(InfosService.queryDesc, payload.id);
      yield put({
        type: 'saveFormData',
        payload: response,
      });

      if (response) {
        yield put({
          type: 'changeFormVisible',
          payload: true,
        });
      }
    },

    *handelAdopt({ payload }, { call, put }) {
      const response = yield call(InfosService.publishInfo, payload.info_id);
      if (response === 'ok') {
        message.success('保存成功');
      }
      yield put({
        type: 'fetch',
        payload: {
          status: [1, 2, 4, 5, 6],
        },
      });

      yield put({
        type: 'changeFormVisible',
        payload: false,
      });
    },

    *Coercion({ payload }, { call, put }) {
      if (payload.type) {
        const response = yield call(InfosService.prohibitInfo, payload.info_id);
        if (response === 'ok') {
          message.success('保存成功');
        }
      } else {
        const response = yield call(InfosService.cancelprohibit, payload.info_id);
        if (response === 'ok') {
          message.success('保存成功');
        }
      }

      yield put({
        type: 'fetch',
        payload: {
          status: [1, 2, 4, 5, 6],
        },
      });

      yield put({
        type: 'changeFormVisible',
        payload: false,
      });
    },

    *submitNo({ payload }, { call, put }) {
      const response = yield call(ReviewsService.submitNo, payload);
      if (response === 'ok') {
        message.success('保存成功');
      }

      yield put({
        type: 'fetch',
        payload: {
          status: [1, 2, 4, 5, 6],
        },
      });

      yield put({
        type: 'changeFormVisible',
        payload: false,
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
    // changeLoading(state, { payload }) {
    //   return { ...state, loading: payload };
    // },
    saveFormData(state, { payload }) {
      return { ...state, formData: payload };
    },
    changeFormVisible(state, { payload }) {
      return { ...state, formVisible: payload };
    },
    saveLeaditCode(state, payload) {
      return { ...state, leaditCode: payload };
    },
  },
};
