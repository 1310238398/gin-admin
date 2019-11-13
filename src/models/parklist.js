import * as parklistService from '@/services/parklist';

export default {
  namespace: 'parklist',

  state: {
    parkLists: [],
  },

  effects: {
    *queryParkList(_, { call, put }) {
      const result = yield call(parklistService.query, { q: 'select' });
      const list = result.list || [];
      yield put({
        type: 'saveParkList',
        payload: list,
      });
    },
  },

  reducers: {
    saveParkList(state, { payload }) {
      return {
        ...state,
        parkLists: payload,
      };
    },
  },
};
