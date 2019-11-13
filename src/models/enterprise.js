import { message } from 'antd';
import { routerRedux } from 'dva/router';
import {
  queryPage,
  get,
  create,
  update,
  migration,
  querySelect,
  queryCategory,
  queryTreeNode,
  queryEnterpriseMark,
  queryEnterPriseTag,
  updataEnterTags,
  enterpriseDele,
  enterpriseSetHot,
  enterpriseCancelHot,
  enterpriseCretieOne,
  saveEnterpriseCretieData,
} from '../services/enterprise';

import { queryTree } from '../services/s_dicManage';

export default {
  namespace: 'enterprise',
  state: {
    search: {},
    pagination: {},
    data: {
      list: [],
      pagination: {},
    },
    submitting: false,
    formTitle: '企业入驻',
    formID: '',
    formVisible: false,
    formData: {},
    formCallback() {},
    selectData: [],
    categoryData: [],
    TreeNodeData: [],
    enterpriseMark: [],
    selectDataPro: {},
    formVisibleStock: false, // 修改库存控制显示隐藏c
    enterpriseTag: [],
    enterpriseCreite: { archive_file: '' }, // 查看企业信用档案
    enterpriseTagList:[],
  },
  effects: {
    *fetch({ payload, pagination }, { call, put, select }) {
      let params = {
        q: 'page',
      };
      if (payload) {
        params = { ...params, ...payload };
        yield put({
          type: 'saveSearch',
          payload,
        });
      } else {
        const search = yield select(state => state.enterprise.search);
        if (search) {
          params = { ...params, ...search };
        }
      }

      if (pagination) {
        params = { ...params, ...pagination };
        yield put({
          type: 'savePagination',
          payload: pagination,
        });
      } else {
        const p = yield select(state => state.enterprise.pagination);
        if (p) {
          params = { ...params, ...p };
        }
      }
      const response = yield call(queryPage, params);
      yield put({
        type: 'saveData',
        payload: response,
      });
    },
    //  获取建筑节点信息
    *fetchTreeNode(_, { call, put }) {
      const response = yield call(queryTreeNode);
      yield put({
        type: 'saveTreeNodeData',
        payload: response,
      });
    },
    *loadForm({ payload }, { put }) {
      let title = '企业入驻';
      if (payload.type === 'E') {
        title = '更新企业信息';
      } else if (payload.type === 'V') {
        title = '查看企业信息';
      }

      // 给定初始值
      yield [
        put({
          type: 'changeFormVisible',
          payload: true,
        }),
        put({
          type: 'saveFormTitle',
          payload: title,
        }),
        put({
          type: 'saveFormID',
          payload: '',
        }),
        put({
          type: 'saveFormData',
          payload: {},
        }),
      ];

      if (payload.id) {
        yield [
          put({
            type: 'saveFormID',
            payload: payload.id,
          }),
          yield put({
            type: 'fetchForm',
            payload: { record_id: payload.id },
          }),
        ];
      }
      // if (payload.type === 'Detail') {
      //   if (payload.callbackHandlePark) {
      //     yield payload.callbackHandlePark();
      //   }
      // }

      // if (payload.type === 'E') {
      //   if (payload.callBackHandleRestore) {
      //     yield payload.callBackHandleRestore();
      //   }
      // }

      if (payload.callback) {
        yield put({
          type: 'saveFormCallback',
          payload: payload.callback,
        });
      }
    },
    *fetchForm({ payload }, { call, put }) {
      const response = yield call(get, payload);
      const values = [];
      if (response.buildings && response.buildings.length > 0) {
        for (let i = 0; i < response.buildings.length; i += 1) {
          values.push({
            building_name: response.buildings[i].building_name,
            building_id: response.buildings[i].building_id,
            btype: response.buildings[i].btype,
          });
        }
      }
      response.buildings = values;
      yield put({
        type: 'saveFormData',
        payload: response,
      });
    },
    *submit({ payload }, { call, put, select }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });

      const params = { ...payload };
      const formID = yield select(state => state.enterprise.formID);
      let response;
      if (formID && formID !== '') {
        params.record_id = formID;
        response = yield call(update, params);
      } else {
        response = yield call(create, params);
      }

      yield put({
        type: 'changeSubmitting',
        payload: false,
      });

      if (response.record_id && response.record_id !== '') {
        message.success('保存成功');
        yield put({
          type: 'changeFormVisible',
          payload: false,
        });
        const formCallback = yield select(state => state.enterprise.formCallback);
        formCallback('ok');
      }
    },

    *changeMigration({ payload }, { call, put }) {
      const response = yield call(migration, payload);
      if (response.status === 'OK') {
        message.success('迁出成功');
        yield put({ type: 'fetch' });
        // const data = yield select(state => state.enterprise.data);
        // const newData = { list: [], pagination: data.pagination };

        // for (let i = 0; i < data.list.length; i += 1) {
        //   const item = data.list[i];
        //   if (item.record_id === payload.record_id) {
        //     item.status = 2;
        //   }
        //   newData.list.push(item);
        // }

        // yield put({
        //   type: 'saveData',
        //   payload: newData,
        // });
      }
    },
    *enterpriseFlag({ payload }, { call }) {
      const response = yield call(updataEnterTags, payload);
      if (response.status === 'OK') {
        message.success('保存成功');
        // yield put({
        //   type: 'changeFormVisible',
        //   payload: false,
        // }),
      }
    },
    *fetchSelect({ payload }, { call, put }) {
      const response = yield call(querySelect, payload);
      yield put({
        type: 'saveSelectData',
        payload: response,
      });
    },
    *fetchCategory(_, { call, put }) {
      const response = yield call(queryCategory);
      yield put({
        type: 'saveCategoryData',
        payload: response,
      });
    },
    *fetchEnterpriseMark(_, { call, put }) {
      const response = yield call(queryEnterpriseMark);
      yield put({
        type: 'saveEnterpriseMark',
        payload: response,
      });
    },

    // 跳转页面到企业部门
    *redirectDepts({ payload }, { put }) {
      yield put(
        routerRedux.push({
          pathname: '/enterprise/enterprisedepartment',
          query: { record_id: payload.record_id, name: payload.name },
        })
      );
    },

    // 跳转页面到认证管理
    *redirectCode({ payload }, { put }) {
      yield put(
        routerRedux.push({
          pathname: '/enterprise/authcode/',
          query: { record_id: payload.record_id, name: payload.name },
        })
      );
    },
    // 跳转页面到企业人员管理
    *enterpriseUser({ payload }, { put }) {
      yield put(
        routerRedux.push({
          pathname: '/personnel/personnellist',
          query: { enterprise_id: payload.record_id, name: payload.name },
        })
      );
    },

    // 保存
    *saveSelectDataPro({ payload }, { put }) {
      yield put({
        type: 'saveSelectDataPro',
        payload,
      });
    },
    // 企业标记
    *loadFormTag({ payload }, { call, put }) {
      const response = yield call(queryEnterPriseTag, payload);
      const result = response.list || [];
      const tagsList = [];
      if (result && result.length > 0) {
        for (let i = 0; i < result.length; i += 1) {
          tagsList.push({ code: result[i].tag.toString() });
        }
      }
      yield put({
        type: 'saveEnterpriseTags',
        payload: tagsList,
      });
    },
    // 删除
    *enterpriseDele({ payload }, { call, put }) {
      const response = yield call(enterpriseDele, payload);
      if (response.status === 'OK') {
        message.success('保存成功');
        yield put({ type: 'fetch' });
      }
    },
    // 设立企业为热门企业
    *enterpriseSetHot({ payload }, { call, put }) {
      const response = yield call(enterpriseSetHot, payload);
      if (response.status === 'OK') {
        message.success('设置成功');
        yield put({ type: 'fetch' });
      }
    },
    // 取消企业为热门企业
    *enterpriseCancelHot({ payload }, { call, put }) {
      const response = yield call(enterpriseCancelHot, payload);
      if (response.status === 'OK') {
        message.success('设置成功');
        yield put({ type: 'fetch' });
      }
    },
    // 查询企业信用档案数据
    *enterpriseCreiteOne({ payload }, { call, put }) {
      const response = yield call(enterpriseCretieOne, payload);
      if (response !== null) {
        yield put({
          type: 'saveEnterpriseCretieData',
          payload: response,
        });
      }
    },
    // 保存企业信用档案数据
    *saveCreiteData({ payload }, { call, put }) {
      const response = yield call(saveEnterpriseCretieData, payload);
       if (response.record_id && response.record_id !== ''){
        message.success('保存成功');
        yield put({ type: 'fetch' });
      }
    },
    // 查询标签
    *enterPriseFlagList(_, { call, put }) {
      const response = yield call(queryTree, {q: 'tree',
      parent_code: 'OPER$#corporate_marks',
      level: 1});
      const FlagList = response?response.list:[];
      
      yield put({
        type: 'saveDataTree',
        payload: FlagList,
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
    saveFormCallback(state, { payload }) {
      return { ...state, formCallback: payload };
    },
    changeSubmitting(state, { payload }) {
      return { ...state, submitting: payload };
    },
    saveSelectData(state, { payload }) {
      return { ...state, selectData: payload };
    },
    saveCategoryData(state, { payload }) {
      return { ...state, categoryData: payload };
    },
    saveEnterpriseMark(state, { payload }) {
      return { ...state, enterpriseMark: payload };
    },
    saveTreeNodeData(state, { payload }) {
      return { ...state, TreeNodeData: payload };
    },
    saveSelectDataPro(state, { payload }) {
      return { ...state, selectDataPro: payload };
    },
    // // 修改库存
    changeFormVisibleStock(state, { payload }) {
      return { ...state, formVisibleStock: payload };
    },
    // 查询企业标签
    saveEnterpriseTags(state, { payload }) {
      return { ...state, enterpriseTag: payload };
    },
    // 企业信用档案数据
    saveEnterpriseCretieData(state, { payload }) {
      return { ...state, enterpriseCreite: payload };
    },
    // 保存且标签
    saveDataTree(state,{payload}){
      return { ...state, enterpriseTagList: payload };
    },
  },
};
