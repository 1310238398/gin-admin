import { message } from 'antd';
import { isObjectNullOrUndefinedOrEmpty } from '../utils/utils';
import StoreService from '../services/s_shopApplicationReview';

export default {
  namespace: 'orderManagement',
  state: {
    loading: false,
    search: {},
    OrderStatueList: [],
    deliveryStatus: [],
    ComplaintList: [],
    SettedList: [],
    pagination: {},
    RefundList: [],
    orderInfo: {},
    tableData: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    /**
     * 查询字典表-// 订单状态
     */
    *queryOrderstatue(_, { call, put }) {
      const result = yield call(StoreService.queryOrderstatus);
      if (!isObjectNullOrUndefinedOrEmpty(result)) {
        // 添加全部
        result.push({ code: '', name: '全部', key: '' });
        yield put({
          type: 'setOrderstatue',
          payload: [...result],
        });
      }
    },

    /**
     * 查询字典表-// 配送状态
     */
    *queryDeliveryStatus(_, { call, put }) {
      const result = yield call(StoreService.queryDeliveryStatus);
      if (!isObjectNullOrUndefinedOrEmpty(result)) {
        // 添加全部
        result.push({ code: '', name: '全部', key: '' });
        yield put({
          type: 'setDeliveryStatus',
          payload: [...result],
        });
      }
    },

    /**
     * 查询字典表-// 投诉标志
     */
    *queryComplaintstatue(_, { call, put }) {
      const result = yield call(StoreService.queryComplaintstatus);
      if (!isObjectNullOrUndefinedOrEmpty(result)) {
        // 添加全部
        result.push({ code: '', name: '全部', key: '' });
        yield put({
          type: 'setComplaintstatue',
          payload: [...result],
        });
      }
    },
    /**
     * 查询字典表-// 结算状态
     */
    *querySettedstatue(_, { call, put }) {
      const result = yield call(StoreService.querySettedstatus);
      if (!isObjectNullOrUndefinedOrEmpty(result)) {
        // 添加全部
        result.push({ code: '', name: '全部', key: '' });
        yield put({
          type: 'setSettedstatue',
          payload: [...result],
        });
      }
    },
    /**
     * 查询字典表-// 退款状态
     */
    *queryRefundstatue(_, { call, put }) {
      const result = yield call(StoreService.queryRefundstatus);
      if (!isObjectNullOrUndefinedOrEmpty(result)) {
        // 添加全部
        result.push({ code: '', name: '全部', key: '' });
        yield put({
          type: 'setRefundstatue',
          payload: [...result],
        });
      }
    },
    *queryShopStatueTotalInfo({ params, pagination }, { call, put, select }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      if (params) {
        yield put({
          type: 'saveSearch',
          payload: params,
        });
      } else {
        const search = yield select(state => state.orderManagement.search);
        if (search) {
          params = { ...search };
        }
      }
      if (pagination) {
        yield put({
          type: 'savePagination',
          payload: pagination,
        });
      } else {
        const pag = yield select(state => state.orderManagement.pagination);
        if (pag) {
          pagination = { ...pag };
        }
      }
      const result = yield call(StoreService.queryOrderPageStore, {
        ...params,
        ...pagination,
      });
      if (!isObjectNullOrUndefinedOrEmpty(result)) {
        yield put({
          type: 'setShopStatueTotal',
          payload: result,
        });
        yield put({
          type: 'changeLoading',
          payload: false,
        });
      }
    },
    *Orderinfo({ orderid }, { call, put }) {
      const result = yield call(StoreService.Orderinfo, orderid);
      if (!isObjectNullOrUndefinedOrEmpty(result)) {
        yield put({
          type: 'setOrderInfo',
          payload: result,
        });
      }
    },
    *Sheild({ param }, { call, put }) {
      const response = yield call(StoreService.Sheild, param.sales_record_id);
      if (response.status === 'ok') {
        message.success('屏蔽成功');
        yield put({
          type: 'Orderinfo',
          orderid: param.order_id,
        });
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    *ReleaseShield({ param }, { call, put }) {
      const response = yield call(StoreService.ReleaseShield, param.sales_record_id);
      if (response.status === 'ok') {
        message.success('取消屏蔽成功');
        yield put({
          type: 'Orderinfo',
          orderid: param.order_id,
        });
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
  },
  reducers: {
    setOrderstatue(state, { payload }) {
      if (isObjectNullOrUndefinedOrEmpty(payload)) {
        return;
      }
      return {
        ...state,
        OrderStatueList: payload,
      };
    },
    setDeliveryStatus(state, { payload }) {
      if (isObjectNullOrUndefinedOrEmpty(payload)) {
        return;
      }
      return {
        ...state,
        deliveryStatus: payload,
      };
    },
    setComplaintstatue(state, { payload }) {
      if (isObjectNullOrUndefinedOrEmpty(payload)) {
        return;
      }
      return {
        ...state,
        ComplaintList: payload,
      };
    },
    setSettedstatue(state, { payload }) {
      if (isObjectNullOrUndefinedOrEmpty(payload)) {
        return;
      }
      return {
        ...state,
        SettedList: payload,
      };
    },
    setRefundstatue(state, { payload }) {
      if (isObjectNullOrUndefinedOrEmpty(payload)) {
        return;
      }
      return {
        ...state,
        RefundList: payload,
      };
    },
    setShopStatueTotal(state, { payload }) {
      if (isObjectNullOrUndefinedOrEmpty(payload)) {
        return;
      }
      return {
        ...state,
        tableData: {
          list: payload.list,
          pagination: payload.pagination,
        },
      };
    },
    setOrderInfo(state, { payload }) {
      // if (isObjectNullOrUndefinedOrEmpty(payload)) {
      //   return;
      // }
      return {
        ...state,
        orderInfo: payload,
      };
    },
    saveSearch(state, { payload }) {
      return { ...state, search: payload };
    },
    changeLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
    savePagination(state, { payload }) {
      return { ...state, pagination: payload };
    },
  },
};
