import { message } from 'antd';
import * as notiListService from '@/services/notifList';

export default {
  namespace: 'notifList',

  state: {
    search: {},
    pagination: {},
    data: {
      list: [],
      pagination: {},
    },
    submitting: false,
    formTitle: '通知发布',
    formID: '',
    formVisible: false,
    formData: {},
    formCallback() {},
    ItemData:[],
    onItemList:[],
    arealoading:false,
  },

  effects: {
    *queryList({ search, pagination }, { call, put, select }) {
      let params = {
        q: 'page',
      };

      if (search) {
        params = { ...params, ...search };
        yield put({
          type: 'saveSearch',
          payload: search,
        });
      } else {
        const s = yield select(state => state.building.search);
        if (s) {
          params = { ...params, ...s };
        }
      }
      if (pagination) {
        params = { ...params, ...pagination };
        yield put({
          type: 'savePagination',
          payload: pagination,
        });
      } else {
        const p = yield select(state => state.building.pagination);
        if (p) {
          params = { ...params, ...p };
        }
      }
      const result = yield call(notiListService.query, params);

      yield put({
        type: 'saveNotiList',
        payload: result,
      });
    },
    *loadForm({ payload }, { put }) {
      let title = '通知发布新增';
      if (payload.type === 'E') {
        title = '通知发布编辑';
      } else if (payload.type === 'V') {
        title = '查看通知信息';
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
      // if (payload.type === 'V') {
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
      const response = yield call(notiListService.queryOne, payload);
      if(response&&response.ranges&&response.ranges.length>0){
        yield put({
          type: 'changeLoadingList',
          payload:true,
        });
        yield put({
          type: 'saveItemDataList',
          payload: response.ranges,
        });
        yield put({
          type: 'changeLoadingList',
          payload:false,
        });
      }
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
      const formID = yield select(state => state.notifList.formID);
      let response;
      if (formID && formID !== '') {
        params.record_id = formID;
        response = yield call(notiListService.saveOne, params);
      } else {
        response = yield call(notiListService.CreateOne, params);
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
        const formCallback = yield select(state => state.notifList.formCallback);
        formCallback('ok');
      }
    },
    // 暂存数据操作
    *saveDataForm({ params}, { put }) {
      yield put({
        type: 'saveFormData',
        payload: params,
      });
    },
    // 删除发布
    *deleNote({ payload }, { call, put}) {
      const response = yield call(notiListService.delOne, payload);
      if (response.status === 'OK') {
        yield put({ type: 'queryList' });
      }
    },
    // 编辑发布通知
    *publishNote({payload},{call,select}){
     const response = yield call(notiListService.saveOnePub, payload);
     if (response.record_id && response.record_id !== '') {
      message.success('发布成功');
      const formCallback = yield select(state => state.notifList.formCallback);
      formCallback('ok');
    }

    },
  },

  reducers: {
    saveNotiList(state, { payload }) {
      return { ...state, data: { list: payload.list, pagination: payload.pagination } };
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
    saveItemData(state,{payload}){
      return {...state,ItemData:payload};
    },
    saveItemDataList(state,{payload}){
      return {...state,onItemList:payload}
    },
    changeLoadingList(state,{payload}){
      return {...state,arealoading:payload}
    },
  },
};
