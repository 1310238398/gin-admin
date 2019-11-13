// 服务

import { message } from 'antd';
import { routerRedux } from 'dva/router';
import StoreService from '../services/s_store.js';

export default {
  namespace: 'store',
  state: {
    formData: {},
    store: {},
    register: {},
    btnDisabled: false,
    storeToggleValue: '',
  },
  effects: {
    *redirect(_, { put }) {
      yield put(routerRedux.push('/malls/storeApplyserve'));
    },
    *redirectjump(_, { put }) {
      yield put(routerRedux.push('/malls/storeChangeserve'));
    },
    *getStoreNew(_, { call, put }) {
      const response = yield call(StoreService.getStoreId);
      if (!Array.isArray(response) || response[0].jump === 1) {
        message.warn('请先开通店铺');
        yield put({
          type: 'redirect',
          payload: {
            response,
          },
        });
      }
      if (!Array.isArray(response) || response[0].jump === 2) {
        message.warn('请先完善店铺信息');
        yield put({
          type: 'redirectjump',
          payload: {
            response,
          },
        });
      }
      if (response[0]) {
        const { store } = response[0];

        let toggleValue = '开业';
        if (store.store_status === 2) {
          toggleValue = '歇业';
        }

        yield put({
          type: 'saveStoreToggleValue',
          payload: toggleValue,
        });

        yield put({
          type: 'setStore',
          payload: {
            response,
          },
        });
      }
    },
    /* 获取店铺信息 */
    *getStore(_, { call, put }) {
      const response = yield call(StoreService.getStoreId);
      if (response) {
        yield put({
          type: 'setStore',
          payload: {
            response,
          },
        });
      }
    },
    /* 申请店铺 */
    *applyStore({ payload }, { call, put }) {
      yield put({ type: 'setBtnDisabled', payload: true });
      const response = yield call(StoreService.applyStore, payload);
      yield put({ type: 'getStore' });
      if (response.status === 'ok') {
        message.success('提交成功');
        yield put({ type: 'setBtnDisabled', payload: false });
      }
    },
    /* 审核店铺 */
    *UpdateStore({ payload }, { call, put, select }) {
      yield put({ type: 'setBtnDisabled', payload: true });
      const storeId = yield select(state => state.store.store.store_id);
      const response = yield call(StoreService.UpdateStore, payload, storeId);
      yield put({ type: 'getStore' });
      if (response.status === 'ok') {
        message.success('提交成功');
        yield put({ type: 'setBtnDisabled', payload: false });
      }
    },
    *storeStatus({ payload }, { call, select }) {
      const storeId = yield select(state => state.store.store.store_id);
      if (payload === 1) {
        const response = yield call(StoreService.open, storeId);
        if (response.status === 'ok') {
          message.success('提交成功');
        }
      } else {
        const response = yield call(StoreService.close, storeId);
        if (response.status === 'ok') {
          message.success('提交成功');
        }
      }
    },
    *toggleStatus({ payload }, { call, put, select }) {
      let status = 1;
      if (payload === '歇业') {
        status = 2;
      }

      const storeID = yield select(state => state.store.store.store_id);
      let response;
      if (status === 1) {
        response = yield call(StoreService.open, storeID);
      } else {
        response = yield call(StoreService.close, storeID);
      }

      if (response.status === 'ok') {
        message.success('更新成功');
        yield put({
          type: 'saveStoreToggleValue',
          payload,
        });
      }
    },
  },
  reducers: {
    setStore(state, { payload }) {
      return {
        ...state,
        store: payload.response[0].store,
        register: payload.response[0].register,
      };
    },
    setBtnDisabled(state, { payload }) {
      return {
        ...state,
        btnDisabled: payload,
      };
    },
    saveStoreToggleValue(state, { payload }) {
      return {
        ...state,
        storeToggleValue: payload,
      };
    },
  },
};
