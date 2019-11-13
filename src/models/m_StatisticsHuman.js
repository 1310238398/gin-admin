import statisticsHuman from '../services/s_statisticsHuman';

export default {
  namespace: 'statisticsHuman',
  state: {
    loading: false,
    parkNode: [],
    parkNodeloudong: [],
  },

  effects: {
    *getParks(code, { call, put }) {
      const nodeData = yield call(statisticsHuman.getParks, code);
      yield put({
        type: 'saveNodeData',
        payload: nodeData,
      });
    },
    *getParkloudong(code, { call, put }) {
      const nodeData = yield call(statisticsHuman.getParks, code);
      yield put({
        type: 'saveNodeDataloudong',
        payload: nodeData,
      });
    },
  },
  reducers: {
    saveNodeData(state, { payload }) {
      return { ...state, parkNode: payload };
    },
    saveNodeDataloudong(state, { payload }) {
      return { ...state, parkNodeloudong: payload };
    },
  },
};
