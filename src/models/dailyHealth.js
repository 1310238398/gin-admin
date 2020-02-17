
import {
    queryPage,
    get,
  
    
  } from '../services/dailyHealth';
  
  
  
  export default {
    namespace: 'dailyHealth',
    state: {
      search: {},
      pagination: {},
      data: {
        list: [],
        pagination: {},
      },
      submitting: false,
      formTitle: '员工每日健康信息',
      formID: '',
      formVisible: false,
      formData: {},
      formCallback() {},
      selectData: [],
      categoryData: [],
      TreeNodeData: [],
      dailyHealthMark: [],
      selectDataPro: {},
      formVisibleStock: false, // 修改库存控制显示隐藏c
      dailyHealthTag: [],
      dailyHealthCreite: { archive_file: '' }, // 查看企业信用档案
      dailyHealthTagList:[],
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
          const search = yield select(state => state.dailyHealth.search);
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
          const p = yield select(state => state.dailyHealth.pagination);
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
     
      *loadForm({ payload }, { put }) {
        let title = '员工每日健康信息';
         if (payload.type === 'Detail') {
          title = '员工每日健康信息';
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
              payload: { q:'by_user',user_id: payload.id },
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
        yield put({
          type: 'saveFormData',
          payload: response,
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
    
    
    
    },
  };
  