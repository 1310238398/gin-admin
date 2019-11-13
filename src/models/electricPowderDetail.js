import { routerRedux } from 'dva/router';

export default {
  namespace: 'electricPowderDetail',
  state: {},
  effects: {
    *jumpPowder({ payload }, { put }) {
      yield put(
        routerRedux.push({
          pathname: '/electricityfee/powderdetail',
          query: {
            building_name: payload.building_name,
            name: payload.name,
            meter_addr: payload.meter_addr,
            etype: payload.etype,
            id: payload.record_id,
          },
        })
      );
    },
  },
  reducers: {},
};
