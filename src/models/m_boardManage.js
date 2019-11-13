import { message } from 'antd';
import orgs from '../services/s_org';
import columns from '../services/s_columnManage';
import parks from '../services/s_parksManage';
import { querySelect } from '../services/s_enterprise';

export default {
  namespace: 'boardManage',
  state: {
    menu: [{ id: '001-000000', name: '测试园区' }],
    loading: true,
    orgdata: {},
    exists: false,
    orgid: '',
    submitting: false,
    treeData: [],
    configTreeData: [],
    configOrgdata: {},
  },
  effects: {
    *fetchParks(_, { call, put }) {
      const respons = yield call(parks.getParks);
      if (respons) {
        const out = respons.map(item => {
          return {
            id: `001-${item.record_id}`,
            name: item.name,
          };
        });
        yield put({
          type: 'saveMenu',
          payload: out,
        });
      } else {
        yield put({
          type: 'saveMenu',
          payload: [],
        });
      }
    },
    *fetchEnterprises({ payload }, { call, put }) {
      const response = yield call(querySelect, payload);
      if (response) {
        const out = response.map(item => {
          return {
            id: `002-${item.record_id}`,
            name: item.name,
          };
        });
        yield put({
          type: 'saveMenu',
          payload: out,
        });
      } else {
        yield put({
          type: 'saveMenu',
          payload: [],
        });
      }
    },
    *fetchOrg({ orgid }, { call, put }) {
      yield [
        put({
          type: 'changeLoading',
          payload: true,
        }),
        put({
          type: 'saveOrgid',
          payload: orgid,
        }),
      ];
      const respons = yield call(orgs.getOrg, orgid);
      yield [
        put({
          type: 'saveOrgdata',
          payload: respons,
        }),
        put({
          type: 'changeLoading',
          payload: false,
        }),
      ];
    },
    *fetchOrg1(_, { put }) {
      yield [
        put({
          type: 'changeSubmitting',
          payload: true,
        }),
        put({
          type: 'queryColumnTree1',
        }),
      ];

      yield [
        put({
          type: 'changeSubmitting',
          payload: false,
        }),
      ];
    },
    *openOrg({ orgid }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(orgs.openOrg, orgid);
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      if (response === 'ok') {
        message.success('开通展板成功');
        yield put({
          type: 'fetchOrg',
          orgid,
        });
      }
    },
    *publishOrg({ orgid }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(orgs.publishOrg, orgid);
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      if (response === 'ok') {
        message.success('发布展板成功');
        yield put({
          type: 'fetchOrg',
          orgid,
        });
      }
    },
    *noPublishOrg({ orgid }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(orgs.noPublishOrg, orgid);
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      if (response === 'ok') {
        message.success('取消发布展板成功');
        yield put({
          type: 'fetchOrg',
          orgid,
        });
      }
    },
    // *queryColumnTree({ column, sys, exclude }, { call, put, select }) {
    //   const orgid = yield select(state => state.boardManage.orgid);
    //   const response = yield call(columns.queryColumnTree, orgid, '', column, sys);
    //   const nres = treeDatafilter(response, exclude);

    //   yield put({
    //     type: 'replaceDataTree',
    //     payload: nres,
    //   });
    // },
    *queryColumnTree1(_, { call, put, select }) {
      const orgid = yield select(state => state.boardManage.orgid);
      const response = yield call(columns.queryColumnTree, orgid, '', '', 1);
      yield put({
        type: 'saveConfigDataTree',
        payload: response,
      });
    },
    *submitColumns({ payload }, { call, put, select }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });

      const orgid = yield select(state => state.boardManage.orgid);
      const response = yield call(orgs.putColumns, orgid, payload);
      if (response === 'ok') {
        const { columnids } = payload;
        message.success('保存成功');
        yield put({
          type: 'saveColumnids',
          payload: columnids,
        });
      }
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
    },
    *submitIcon({ payload }, { call, put, select }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });

      const orgid = yield select(state => state.boardManage.orgid);
      const response = yield call(orgs.putIcon, orgid, payload);
      if (response === 'ok') {
        const { icon } = payload;
        message.success('保存成功');
        yield put({
          type: 'saveIcon',
          payload: icon,
        });
      }
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
    },
  },
  reducers: {
    changeLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
    saveMenu(state, { payload }) {
      return { ...state, menu: payload };
    },
    saveColumnids(state, { payload }) {
      const orgdata = { ...state.orgdata };
      orgdata.desc.columnids = payload;
      return { ...state, orgdata };
    },
    saveIcon(state, { payload }) {
      const orgdata = { ...state.orgdata };
      orgdata.desc.icon = payload;
      return { ...state, orgdata };
    },
    saveOrgdata(state, { payload }) {
      const exists = !!(payload && payload.org_id);
      return { ...state, orgdata: payload, exists };
    },
    saveConfigOrgdata(state, { payload }) {
      return { ...state, configOrgdata: payload };
    },
    saveOrgid(state, { payload }) {
      return { ...state, orgid: payload };
    },
    replaceDataTree(state, action) {
      return {
        ...state,
        treeData: action.payload,
      };
    },
    saveConfigDataTree(state, { payload }) {
      return {
        ...state,
        configTreeData: payload,
      };
    },
    changeSubmitting(state, { payload }) {
      return { ...state, submitting: payload };
    },
  },
};
