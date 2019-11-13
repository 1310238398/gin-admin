import { message } from 'antd';
import * as builingService from '@/services/building';

export default {
  namespace: 'building',

  state: {
    HouseQuery: [],
    search: {},
    pagination: {},
    data: {
      list: [],
      pagination: {},
    },
    typeDetail: {},
    layerDetail: {}, // 层详情
    plateNumDetail: {},
    typeList: [],
    layerList: [],
    plateNumList: [],
    AllAreas: [],
    AllBuilding: [],
    RecordId: '',
  },

  effects: {
    *buildings(_, { call, put }) {
      const area = yield call(builingService.HouseQuery, { q: 'list', btype: 90 });
      const lists = yield call(builingService.HouseQuery, { q: 'list', btype: 80 });
      yield put({
        type: 'save',
        AllAreas: area.list ? area.list : [],
        AllBuilding: lists.list ? lists.list : [],
      });
    },
    *fetch({ search, pagination }, { call, put, select }) {
      let params = {
        q: 'housing',
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

      const response = yield call(builingService.HouseQuery, params);
      yield put({
        type: 'saveData',
        payload: response,
      });
    },
    *queryParkList(_, { call, put }) {
      const result = yield call(builingService.query, { q: 'select' });
      const list = result.list || [];
      yield put({
        type: 'saveParkList',
        payload: list,
      });
    },
    *queryTypeDetail({ payload, buildingType }, { call, put }) {
      const result = yield call(builingService.query, { payload });
      if (buildingType === 'floor') {
        yield put({
          type: 'saveTypeDetail',
          payload: result,
        });
      } else if (buildingType === 'layer') {
        yield put({
          type: 'savelayerDetail',
          payload: result,
        });
      }
      if (buildingType === 'plateNum') {
        yield put({
          type: 'saveplateNumDetail',
          payload: result,
        });
      }
    },
    *queryTypeList({ payload, buildingType }, { call, put }) {
      const result = yield call(builingService.larlayList, { payload });
      const response = result.list || [];
      if (buildingType === 'floor') {
        yield put({
          type: 'saveTypeList',
          payload: response,
        });
        yield put({
          type: 'savelayerList',
          payload: [],
        });
      } else if (buildingType === 'layer') {
        yield put({
          type: 'savelayerList',
          payload: response,
        });
      } else if (buildingType === 'plateNum') {
        yield put({
          type: 'saveplateNumList',
          payload: response,
        });
      }
    },
    *submit({ payload }, { call }) {
      const result = yield call(builingService.saveDetail, payload);
      if (result.record_id && result.record_id !== '') {
        message.success('保存成功');
        // yield put({
        //   type: 'fetch',
        // });
      }
    },
  },

  reducers: {
    save(state, data) {
      return { ...state, ...data };
    },
    saveData(state, { payload }) {
      return { ...state, data: payload };
    },
    saveSearch(state, { payload }) {
      return { ...state, search: payload };
    },
    savePagination(state, { payload }) {
      return { ...state, pagination: payload };
    },
    saveParkList(state, { payload }) {
      return {
        ...state,
        parkLists: payload,
      };
    },
    saveTypeDetail(state, { payload }) {
      return {
        ...state,
        typeDetail: payload,
      };
    },
    savelayerDetail(state, { payload }) {
      return {
        ...state,
        layerDetail: payload,
      };
    },
    saveplateNumDetail(state, { payload }) {
      return {
        ...state,
        plateNumDetail: payload,
      };
    },
    saveTypeList(state, { payload }) {
      return {
        ...state,
        typeList: payload,
      };
    },
    savelayerList(state, { payload }) {
      return {
        ...state,
        layerList: payload,
      };
    },
    saveplateNumList(state, { payload }) {
      return {
        ...state,
        plateNumList: payload,
      };
    },
  },
};
