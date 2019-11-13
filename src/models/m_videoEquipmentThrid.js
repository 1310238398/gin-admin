import { message } from 'antd';
import VideoEquipmentThirdService from '@/services/s_videoEquipmentThird';

export default {
  namespace: 'videoEquipmentThird',
  state: {
    search: {},
    pagination: {},
    data: {
      list: [],
      pagination: {},
    },
    submitting: false,
    formTitle: '',
    formID: '',
    editVisible: false,
    formData: {},
    dataList: [],
    formVisibleStock: false, // 选择分组
  },
  effects: {
    *fetch({ search, pagination }, { call, put, select }) {
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
        const s = yield select(state => state.demo.search);
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
        const p = yield select(state => state.demo.pagination);
        if (p) {
          params = { ...params, ...p };
        }
      }

      const response = yield call(VideoEquipmentThirdService.query, params);
      yield put({
        type: 'saveData',
        payload: response,
      });
    },

    // 提交
    *submit({ payload }, { call, put, select }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });

      const params = { ...payload };
      params.vendor = params.vendor.toString();
      const formType = yield select(state => state.videoEquipment.formType);
      let response;
      if (formType === 'E') {
        params.record_id = yield select(state => state.videoEquipment.formID);
        response = yield call(VideoEquipmentThirdService.update, params);
      } else {
        response = yield call(VideoEquipmentThirdService.create, params);
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
        yield put({
          type: 'fetch',
        });
      }
    },

    *del({ payload }, { call, put }) {
      const response = yield call(VideoEquipmentThirdService.del, payload);
      if (response.status === 'OK') {
        message.success('删除成功');
        yield put({ type: 'fetch' });
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
    changeFormVisible(state, { payload }) {
      return { ...state, editVisible: payload };
    },
    saveFormTitle(state, { payload }) {
      return { ...state, formTitle: payload };
    },
    saveFormType(state, { payload }) {
      return { ...state, formType: payload };
    },
    saveFormID(state, { payload }) {
      return { ...state, formID: payload };
    },
    saveFormData(state, { payload }) {
      return { ...state, formData: payload };
    },
    changeSubmitting(state, { payload }) {
      return { ...state, submitting: payload };
    },
  },
};
