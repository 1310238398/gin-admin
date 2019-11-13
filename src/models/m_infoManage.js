import { message } from 'antd';
import infos from '../services/s_infoManage';
import columns from '../services/s_columnManage';
// 日志管理
export default {
  namespace: 'infoManage',
  state: {
    // loading: true,
    search: {},
    pagination: {},
    data: {
      list: [],
      pagination: {},
    },
    formCallback: () => {},
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
        const search = yield select(state => state.infoManage.search);
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
        const pag = yield select(state => state.infoManage.pagination);
        if (pag) {
          params = { ...params, ...pag };
        }
      }

      const response = yield call(infos.queryPage, params);
      yield put({
        type: 'fetchColumnName',
        payload: response,
      });
      // yield put({
      //   type: 'changeLoading',
      //   payload: false,
      // });
    },

    *fetchColumnName({ payload }, { call, put }) {
      const { list, pagination } = payload;
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
        payload: { list, pagination },
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
    *fetchFormExtra({ columnId, response }, { call, put, select }) {
      const respextra = yield call(columns.queryExtra, columnId);
      let formData = response;
      if (!formData) {
        formData = yield select(state => state.infoManage.formData);
      }
      formData.ctrl = respextra;
      yield put({
        type: 'saveFormData',
        payload: formData,
      });
    },
    *submitDesc({ payload }, { call, put, select }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });

      const params = { ...payload };
      const formID = yield select(state => state.infoManage.formID);

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
          const formCallback = yield select(state => state.infoManage.formCallback);
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
          const formCallback = yield select(state => state.infoManage.formCallback);
          formCallback('ok');
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
    saveShowInfo(state, { payload }) {
      return { ...state, showInfo: payload };
    },
  },
};
