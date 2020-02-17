import { message } from 'antd';
import { queryPage, get, create, update, couponDele, savePass,publishPass } from '../services/coupon';

export default {
  namespace: 'coupon',
  state: {
    search: {},
    pagination: {},
    data: {
      list: [],
      pagination: {},
    },
    submitting: false,
    formTitle: '新增优惠券',
    formID: '',
    formVisible: false,
    formData: {},
    formCallback() {},

    searchRefuse: {},
    paginationRefuse: {},
    dataRefuse: {
      list: [],
      pagination: {},
    },
    submittingRefuse: false,
    formTitleRefuse: '新增优惠券',
    formIDRefuse: '',
    formVisibleRefuse: false,
    formDataRefuse: {},
    formCallbackRefuse() {},
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
        const search = yield select(state => state.coupon.search);
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
        const p = yield select(state => state.coupon.pagination);
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
      let title = '新增优惠券';
      if (payload.type === 'E') {
        title = '修改优惠券';
      } else if (payload.type === 'V') {
        title = '查看优惠券信息';
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
      const formID = yield select(state => state.coupon.formID);
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
        yield put({ type: 'fetch' });
        const formCallback = yield select(state => state.coupon.formCallback);
        formCallback('ok');
      }
    },

    // 删除
    *couponDele({ payload }, { call, put }) {
      const response = yield call(couponDele, payload);
      if (response.status === 'OK') {
        message.success('保存成功');
        yield put({ type: 'fetch' });
      }
    },

    // 审核通过
    *CouponPass({ payload }, { call, put }) {
      const response = yield call(savePass, payload);
      if (response.status === 'OK') {
        message.success('保存成功');
        yield put({ type: 'fetch' });
      }
    },
    // 驳回
    *refuseReason({ payload }, { call, put }) {
      const response = yield call(savePass, payload);
      if (response.status === 'OK') {
        message.success('保存成功');
        yield put({ type: 'fetch' });
      }
    },

    // 发布
    *CouponPublish({ payload }, { call, put }) {
      const response = yield call(publishPass, payload);
      if (response.status === 'OK') {
        message.success('发布成功');
        yield put({ type: 'fetch' });
      }
    },

    // 退券管理
    *fetchRefuse({ payload, pagination }, { call, put, select }) {
      let params = {
        q: 'page',
      };
      if (payload) {
        params = { ...params, ...payload };
        yield put({
          type: 'saveSearchRefuse',
          payload,
        });
      } else {
        const search = yield select(state => state.coupon.searchRefuse);
        if (search) {
          params = { ...params, ...search };
        }
      }

      if (pagination) {
        params = { ...params, ...pagination };
        yield put({
          type: 'savePaginationRefuse',
          payload: pagination,
        });
      } else {
        const p = yield select(state => state.coupon.paginationRefuse);
        if (p) {
          params = { ...params, ...p };
        }
      }
      const response = yield call(queryPage, params);
      yield put({
        type: 'saveDataRefuse',
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

    // 退券管理

    saveDataRefuse(state, { payload }) {
      return { ...state, dataRefuse: payload };
    },
    saveSearchRefuse(state, { payload }) {
      return { ...state, searchRefuse: payload };
    },
    savePaginationRefuse(state, { payload }) {
      return { ...state, paginationRefuse: payload };
    },
  },
};
