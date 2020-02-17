import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as parklistService from '@/services/parklist';
import StoreService from '../services/s_store';
import {
  TxCash,
  TjSJ,
  CurrentDD,
  CurrentXSE,
  hqYzmcode,
  Hqxy,
  BDphone,
  selectPhone,
  sendVcodePhone,
  QRTX,
} from '../services/merchantsStatistics';

export default {
  namespace: 'merchantsStatistics',

  state: {
    parkLists: [],
    visibleTxMoal: false,
    store: {},
    register: {},
    storeTjData: {},
    DDdata: [],
    XSEdata: [],
    vscode: '',
    storeid: '',
    xy: '',
    storePhone: '',
    dwID: '',
    visibleNext: false,
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
        yield put({
          type: 'setStore',
          payload: {
            response,
          },
        });

        yield put({
          type: 'queryTjSJ',
          store: store.store_id,
        });
        yield put({
          type: 'queryCurrentDD',
          store: store.store_id,
        });
        yield put({
          type: 'queryCurrentXSE',
          store: store.store_id,
        });
        yield put({
          type: 'saveStoreId',
          store: store.store_id,
        });
        yield put({
          type: 'hqXY',
          store: store.store_id,
        });
       
      }
    },
    *queryTjSJ({ store }, { call, put }) {
      const result = yield call(TjSJ, store);
      yield put({
        type: 'saveTJsj',
        payload: result,
      });
    },

    *queryCurrentDD({ store }, { call, put }) {
      const result = yield call(CurrentDD, store);
      yield put({
        type: 'saveCurrentDD',
        payload: result,
      });
    },
    *queryCurrentXSE({ store }, { call, put }) {
      const result = yield call(CurrentXSE, store);
      yield put({
        type: 'saveCurrentXSE',
        payload: result,
      });
    },
    *queryParkList(_, { call, put }) {
      const result = yield call(parklistService.query, { q: 'select' });
      const list = result.list || [];
      yield put({
        type: 'saveParkList',
        payload: list,
      });
    },
    *visibleTX({ payload }, { put }) {
      yield put({
        type: 'saveVisibleTx',
        payload,
      });
    },
    *TxJE({ payload }, { call, put }) {
      const result = yield call(TxCash, payload);
      if(result.status==='ok'){
        yield put({
          type: 'saveDWID',
          payload: result.draw_id,
        });
        yield put({
          type: 'visibleTX',
          payload: false,
        });
        yield put({
          type: 'showTX',
          payload: true,
        });
      }
     
      // if (result === 'ok') {
      //   message.success('提现申请发起成功，将在15个工作日到账，请及时查询');
      // } else {
      //   message.error('提现失败');
      // }
    },

    // 验证码下一步
    *showTX({ payload }, { put }) {
      yield put({
        type: 'saveNT',
        payload,
      });
    },
    // 获取协议
    *hqXY({ store }, { call, put }) {
      const result = yield call(Hqxy, store);
      yield put({
        type: 'saveCurrentXy',
        payload: result.link,
      });
    },
    // 获取验证码
    *hQyzm({ payload }, { call, put }) {
      const result = yield call(hqYzmcode, { payload });
      yield put({
        type: 'saveYzm',
        payload: result,
      });
    },

    // 绑定手机号和验证码
    *bDPhone({ payload }, { call }) {
      const result = yield call(BDphone, { payload });
      if (result.status === 'ok') {
        message.success('手机号绑定成功');
      } else {
        message.warn('手机号绑定失败');
      }
    },

    // 判断用户是否绑定手机号
    *BindMobliNumber({ store }, { call, put }) {
      const result = yield call(selectPhone, store);
      if (result.phone) {
        yield put({
          type: 'redirectBindPhone',
        });
      }
      yield put({
        type: 'savePhone',
        payload: result.phone,
      });
    },
    // 商家未绑定手机号-跳转路由
    *redirectBindPhone(_, { put }) {
      yield put(routerRedux.push('/malls/phonecode'));
    },
    // 重发短信(验证码是否需要存储？？？)
    *CFDX({ payload }, { call, put }) {
      const result = yield call(sendVcodePhone, payload);
      yield put({
        type: 'saveVcode',
        payload: result,
      });
    },

    // 确认提现
    *QRTX({ payload }, { call, put }) {
      const result = yield call(QRTX, payload);
      yield put({
        type: 'showTX',
        payload: false,
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
    saveVisibleTx(state, { payload }) {
      return {
        ...state,
        visibleTxMoal: payload,
      };
    },
    setStore(state, { payload }) {
      return {
        ...state,
        store: payload.response[0].store,
        register: payload.response[0].register,
      };
    },
    saveTJsj(state, { payload }) {
      return {
        ...state,
        storeTjData: payload,
      };
    },
    saveCurrentDD(state, { payload }) {
      return {
        ...state,
        DDdata: payload,
      };
    },
    saveCurrentXSE(state, { payload }) {
      return {
        ...state,
        XSEdata: payload,
      };
    },
    saveYzm(state, { payload }) {
      return {
        ...state,
        vscode: payload,
      };
    },
    saveStoreID(state, { payload }) {
      return {
        ...state,
        storeid: payload,
      };
    },
    saveCurrentXy(state, { payload }) {
      return {
        ...state,
        xy: payload,
      };
    },
    savePhone(state, { payload }) {
      return {
        ...state,
        storePhone: payload,
      };
    },
    saveDWID(state, { payload }) {
      return {
        ...state,
        dwID: payload,
      };
    },
    saveNT(state, { payload }) {
      return {
        ...state,
        visibleNext: payload,
      };
    },
  },
};
