import { message } from 'antd';
import infos from '../services/s_infoManage';
import columns from '../services/s_columnManage';
import { get } from '../services/s_user';
import { queryBuildings } from '../services/building';
// import { CONST_BUILDING_TYPE } from '../utils/Consts';

const zsxxColumnId = '5b6d5f019eea9f482876c48e';
// 日志管理
export default {
  namespace: 'zsxxManage',
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
    formTitle: '新建招商信息',
    formID: '',
    formVisible: false,
    formData: {},
    formExtra: [],
    extraTypes: [],
    parks: [],
    areas: [],
  },
  effects: {
    // *queryBuildings({ buildingType, parentId }, { call, put }) {
    //   const rstList = yield call(ParkService.queryBuildings, {
    //     parent_id: parentId,
    //   });
    //   let type = null;
    //   switch (buildingType) {
    //     case CONST_BUILDING_TYPE.PARK:
    //       type = 'setParks';
    //       break;
    //     case CONST_BUILDING_TYPE.AREA:
    //       type = 'setAreas';
    //       break;
    //     default:
    //   }
    //   yield put({
    //     type,
    //     payload: rstList,
    //   });
    // },
    *queryBuildingList({ park_id }, { call, put }) {
      let params = {
        q: 'list',
      };
      params = { ...params, park_id };
      const rstList = yield call(queryBuildings, params);
      const response = rstList.list || [];
      yield put({
        type: 'setAreas',
        payload: response,
      });
    },
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
        const search = yield select(state => state.zsxxManage.search);
        if (search) {
          params = { ...search };
        }
      }
      params.org = '';
      params.owner = '';
      params.range = 1;
      params.column = zsxxColumnId;
      if (pagination) {
        params = { ...params, ...pagination };
        yield put({
          type: 'savePagination',
          payload: pagination,
        });
      } else if (!payload) {
        const pag = yield select(state => state.zsxxManage.pagination);
        if (pag) {
          params = { ...params, ...pag };
        }
      }

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
          type: 'saveFormData',
          payload: {},
        }),
        put({
          type: 'saveFormTitle',
          payload: '新建信息',
        }),
        // put({
        //   type: 'queryBuildings',
        //   buildingType: CONST_BUILDING_TYPE.PARK,
        //   parentId: '',
        // }),
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
          desc: {
            org,
            owner,
            extras: { yq },
          },
        } = response;
        if (yq) {
          yield put({
            type: 'queryBuildingList',
            park_id: yq,
          });
        }
        yield put({
          type: 'columnManage/queryColumnTree',
          org,
          owner,
        });
        yield put({
          type: 'fetchFormExtra',
          columnId: response.desc.column_id,
          response,
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
        formData = yield select(state => state.zsxxManage.formData);
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
      const formID = yield select(state => state.zsxxManage.formID);
      params.column_id = zsxxColumnId;
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
          const formCallback = yield select(state => state.zsxxManage.formCallback);
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
          const formCallback = yield select(state => state.zsxxManage.formCallback);
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
      const response = yield call(infos.delInfo, payload);
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
    *publish({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      // 修改
      const response = yield call(infos.publishInfo, payload);
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      if (response === 'ok') {
        message.success('发布成功');
        yield put({
          type: 'fetch',
        });
      }
    },
    *unpublish({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      // 取消发布
      const response = yield call(infos.unpublishInfo, payload);
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      if (response === 'ok') {
        message.success('取消发布成功');
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
      const response = yield call(infos.recoverInfo, payload);
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
      const response = yield call(infos.destroyInfo, payload);
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
    setParks(state, { payload }) {
      return { ...state, parks: payload };
    },
    setAreas(state, { payload }) {
      return { ...state, areas: payload };
    },
  },
};
