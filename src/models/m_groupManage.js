import { message } from 'antd';
import groups from '../services/s_groupManage';
import { get } from '../services/s_user';
// 日志管理
export default {
  namespace: 'groupManage',
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
    formTitle: '新建信息组',
    formID: '',
    formVisible: false,
    formData: {},
    formCtrlData: {},
    formExtra: [],
    extraTypes: [],
    step: 0,
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
        const search = yield select(state => state.groupManage.search);
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
        const pag = yield select(state => state.groupManage.pagination);
        if (pag) {
          params = { ...params, ...pag };
        }
      }

      const response = yield call(groups.queryPage, params);

      yield put({
        type: 'saveData',
        payload: response,
      });
      // yield put({
      //   type: 'fetchColumnName',
      //   payload: response,
      // });
      yield put({
        type: 'fetchUserInfo',
        payload: response,
      });
      // yield put({
      //   type: 'changeLoading',
      //   payload: false,
      // });
    },

    // *fetchColumnName({ payload }, { call, put }) {
    //   const { list } = payload;
    //   if (list && list.length > 0) {
    //     const c = {};
    //     // 获取栏目名称
    //     for (const key in list) {
    //       if ({}.hasOwnProperty.call(list, key)) {
    //         const item = list[key];
    //         if (item) {
    //           if (c[item.desc.column_id]) {
    //             item.desc.column_name = c[item.desc.column_id].desc.name;
    //             item.ctl_param = c[item.desc.column_id].ctl_param;
    //           } else {
    //             const r = yield call(columns.query, item.desc.column_id);
    //             c[item.desc.column_id] = r;
    //             item.desc.column_name = r.desc.name;
    //             item.ctl_param = r.ctl_param;
    //           }
    //         }
    //       }
    //     }
    //   }
    //   yield put({
    //     type: 'saveData',
    //     payload,
    //   });
    // },
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
    *loadForm({ payload }, { put }) {
      // 给定初始值
      yield [
        put({
          type: 'changeFormVisible',
          payload: true,
        }),
        put({
          type: 'saveFormTitle',
          payload: '新建信息组',
        }),
      ];

      if (payload && payload.id) {
        yield [
          put({
            type: 'saveFormTitle',
            payload: '编辑信息组',
          }),
          put({
            type: 'saveFormID',
            payload: payload.id,
          }),
        ];
      } else {
        yield put({
          type: 'saveFormID',
          payload: '',
        });
      }
      if (payload && payload.callback) {
        yield put({
          type: 'saveFormCallback',
          payload: payload.callback,
        });
      }
    },
    //
    *fetchFormDesc({ payload }, { call, put }) {
      if (payload) {
        put({
          type: 'saveFormID',
          payload,
        });
        const response = yield call(groups.queryDesc, payload);
        yield put({
          type: 'saveFormData',
          payload: response,
        });
      }
    },
    *fetchFormCtrl({ payload }, { call, put }) {
      if (payload) {
        yield [
          put({
            type: 'saveFormID',
            payload,
          }),
          put({
            type: 'saveFormCtrlData',
            payload: {},
          }),
          put({
            type: 'saveFormData',
            payload: {},
          }),
        ];
        const desc = yield call(groups.queryDesc, payload);

        const ctrl = yield call(groups.queryCtrl, payload);
        if (ctrl && ctrl.rules) {
          ctrl.rules = ctrl.rules.map((item, index) => {
            return { ...item, ...{ id: index + 1 } };
          });
        }
        yield [
          put({
            type: 'saveFormCtrlData',
            payload: ctrl,
          }),
          put({
            type: 'saveFormData',
            payload: desc,
          }),
        ];
      }
    },
    *submitDesc({ payload }, { call, put, select }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });

      const params = { ...payload };
      const formID = yield select(state => state.groupManage.formID);

      if (formID) {
        // 修改
        const response = yield call(groups.submitUpdateDesc, formID, params);
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
        const response = yield call(groups.submitGroupAdd, params);
        yield put({
          type: 'changeSubmitting',
          payload: false,
        });
        if (response && response.group_id) {
          message.success('保存成功');
          yield put({
            type: 'saveFormID',
            payload: response.group_id,
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
      const formID = yield select(state => state.groupManage.formID);
      // console.log(`formID${  formID}`);
      if (formID) {
        // 修改
        const response = yield call(groups.submitUpdateCtrl, formID, params);
        yield put({
          type: 'changeSubmitting',
          payload: false,
        });
        if (response === 'ok') {
          message.success('保存成功');

          const formCallback = yield select(state => state.groupManage.formCallback);
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
      const response = yield call(groups.delGroup, payload);
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
    *start({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      // 修改
      const response = yield call(groups.start, payload);
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      if (response === 'ok') {
        message.success('开始收集成功');
        yield put({
          type: 'fetch',
        });
      }
    },
    *stop({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      // 取消发布
      const response = yield call(groups.stop, payload);
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      if (response === 'ok') {
        message.success('停止收集成功');
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
      const response = yield call(groups.recoverGroup, payload);
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
      const response = yield call(groups.destroyGroup, payload);
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
    saveFormCtrlData(state, { payload }) {
      return { ...state, formCtrlData: payload };
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
