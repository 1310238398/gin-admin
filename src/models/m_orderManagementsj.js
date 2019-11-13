// 服务

import { message } from 'antd';
import { routerRedux } from 'dva/router';
import OrderService from '../services/s_order';

export default {
  namespace: 'orderManagementsj',
  state: {
    /* tab栏数据 */
    menu: [
      {
        name: '新订单',
        id: '1',
      },
      {
        name: '处理中',
        id: '2',
      },
      {
        name: '配送中',
        id: '3',
      },
      {
        name: '已完成',
        id: '4',
      },
      {
        name: '投诉处理',
        id: '5',
      },
      {
        name: '全部订单',
        id: '6',
      },
    ],
    data: '',
    search: '',
    store: '',
    loading: false,
    formData: '',
    register: '',
  },
  effects: {
    /* 获取店铺信息 */
    *getStore(_, { call, put }) {
      const response = yield call(OrderService.getStoreId);
      if (response) {
        yield put({
          type: 'setStore',
          payload: {
            response,
          },
        });
      }
    },
    *redirect(_, { put }) {
      yield put(routerRedux.push('/malls/storeApplyserve'));
    },
    *redirectjump(_, { put }) {
      yield put(routerRedux.push('/malls/storeChangeserve'));
    },
    *getStoreNew(_, { call, put }) {
      const response = yield call(OrderService.getStoreId);
      if (!Array.isArray(response)) {
        message.warn('请先开通店铺');
        yield put({
          type: 'redirect',
          payload: {
            response,
          },
        });
      }
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
        // const { store } = response[0];
        yield put({
          type: 'setStore',
          payload: {
            response,
          },
        });
      }
    },

    /* 渲染 */
    *fetch({ payload, pagination }, { call, put, select }) {
      const store = yield select(state => state.orderManagementsj.store.store_id);
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
        const search = yield select(state => state.orderManagementsj.search);
        if (search) {
          params = { ...search };
        }
      }
      if (pagination) {
        params = { ...params, ...pagination };
      }
      const response = yield call(OrderService.queryPage, store, params);
      yield put({
        type: 'saveData',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    /* 查看 */
    *loadForm({ payload }, { call, put, select }) {
      // 给定初始值
      const store = yield select(state => state.orderManagementsj.store.store_id);
      const response = yield call(OrderService.get, store, payload);
      yield put({
        type: 'saveFormData',
        payload: response,
      });
    },
    /* 配送 */
    *distribution({ payload }, { call, put, select }) {
      const response = yield call(OrderService.distribution, payload);
      if (response.status === 'ok') {
        message.success('操作成功');
        yield put({ type: 'fetch', payload: { status: 2 } });
      }
    },
    /* 处理完成 */
    *complete({ payload }, { call, put, select }) {
      const response = yield call(OrderService.complete, payload);
      if (response.status === 'ok') {
        message.success('操作成功');
        yield put({ type: 'fetch', payload: { status: 2 } });
      }
    },
    *reply({ payload }, { call, put, select }) {
      const response = yield call(OrderService.reply, payload);
      if (response.status === 'ok') {
        message.success('操作成功');
        yield put({ type: 'fetch', payload: { status: 4 } });
      }
    },
    /* 接单 */
    *checkIn({ payload }, { call, put, select }) {
      const response = yield call(OrderService.checkIn, payload);
      if (response.status === 'ok') {
        message.success('操作成功');
        yield put({ type: 'fetch', payload: { status: 1 } });
      }
    },
    /* 拒单 */
    *reject({ payload }, { call, put, select }) {
      const response = yield call(OrderService.reject, payload);
      if (response.status === 'ok') {
        message.success('操作成功');
        yield put({ type: 'fetch', payload: { status: 1 } });
      }
    },
    /* 投诉不处理 */
    *nodispose({ payload }, { call, put, select }) {
      const response = yield call(OrderService.nodispose, payload);
      if (response.status === 'ok') {
        message.success('操作成功');
        yield put({ type: 'fetch', payload: { status: 5 } });
      }
    },
    /* 退款 */
    *refund({ payload, price }, { call, put}) {
     // yield call(OrderService.complainCheck, payload, price);
      const response = yield call(OrderService.refund, payload, price);
      if (response.status === 'ok') {
        message.success('操作成功');
        yield put({ type: 'fetch', payload: { status: 5 } });
      }
    },
    // 拒绝退款
    *Rejectrefund({ payload, price }, { call, put }){
      const response = yield call(OrderService.rejectRefund, payload, price);
      if (response.status === 'ok') {
        message.success('操作成功');
        yield put({ type: 'fetch', payload: { status: 5 } });
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
    saveData(state, { payload }) {
      return { ...state, data: payload };
    },
    changeLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
    saveSearch(state, { payload }) {
      return { ...state, search: payload };
    },
    saveFormData(state, { payload }) {
      return { ...state, formData: payload };
    },
  },
};
