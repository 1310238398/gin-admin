import infos from '../../../services/s_infoManage';

export default {
  namespace: 'target1',

  state: {
    data: {},
    loading: false,
  },

  effects: {
    *fetchInfo(
      {
        payload: { infoid },
      },
      { call, put }
    ) {
      yield put({ type: 'saveLoading', payload: true });
      const response = yield call(infos.queryDesc, infoid);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({ type: 'saveLoading', payload: false });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
    saveLoading(state, { payload }) {
      return {
        ...state,
        loading: payload,
      };
    },
  },
};
