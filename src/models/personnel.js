import { message } from 'antd';
import PersonalService from '../services/s_personal';
import { queryTree } from '../services/s_enterpriseDepts';

export default {
  namespace: 'personnel',
  state: {
    personalTotal: {
      all: 0,
      auth: 0,
      unAuth: 0,
    },
    data: {
      list: [],
      pagination: {},
    },
    loading: false,
    search: '',
    userData: [],
    formTitle: '新增个人信息',
    formID: '',
    formVisible: false,
    formData: {user:{photo:''}},
    formCallback() {},
    treeData: [],
    indexData: {},
    enterpriseID: '',
  },

  effects: {
    *fetch({ payload, pagination }, { call, put, select }) {
      let params = {
        q: 'page',
      };
      yield put({
        type: 'changeLoading',
        payload: true,
      });

      if (payload) {
        params = { ...params, ...payload };
        yield put({
          type: 'saveSearch',
          payload,
        });
      } else {
        const search = yield select(state => state.personnel.search);
        if (search) {
          params = { ...params, ...search };
        }
      }

      if (pagination) {
        params = { ...params, ...pagination };
      }
      const response = yield call(PersonalService.queryPersonalInfos, params);
      yield put({
        type: 'saveData',
        payload: response,
      });

      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *loadForm({ payload }, { put }) {
      let title = '新增个人信息';
      if (payload.type === 'E') {
        title = '更新个人信息';
      } else if (payload.type === 'V') {
        title = '查看个人信息';
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
      yield yield put({
        type: 'fetchTree',
        enterprise_id: payload.enterid,
      });
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
    },
    *fetchTree(payload, { call, put }) {
      const params = {
        q: 'tree',
        enterprise_id: payload.enterprise_id,
      };
      const response = yield call(queryTree, params);

      const handleList = dataList => {
        for (let i = 0; i < dataList.length; i += 1) {
          dataList[i].title = dataList[i].name;
          dataList[i].key = dataList[i].record_id;
          dataList[i].value = dataList[i].record_id;
          if (dataList[i].children) {
            for (let j = 0; j < dataList[i].children.length; j += 1) {
              dataList[i].children[j].title = dataList[i].children[j].name;
              dataList[i].children[j].key = dataList[i].children[j].record_id;
              dataList[i].children[j].value = dataList[i].children[j].record_id;
            }
          }
        }
      };
      handleList(response.list);

      yield put({
        type: 'saveTreeData',
        payload: response.list,
      });

      const indexData = {};
      const handle = data => {
        for (let i = 0; i < data.length; i += 1) {
          indexData[data[i].record_id] = data[i];

          if (data[i].children) {
            handle(data[i].children);
          }
        }
      };

      handle(response.list);

      yield put({
        type: 'saveIndexData',
        payload: indexData,
      });
    },
    *fetchForm({ payload }, { call, put }) {
      const response = yield call(PersonalService.get, payload);
      yield put({
        type: 'saveFormData',
        payload: response,
      });
    },
    // 保存基础信息
    *submit({ payload }, { call, put, select }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });

      const params = { ...payload };
      const response = yield call(PersonalService.update, params);
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });

      if (response.status === 'OK') {
        message.success('保存成功');
        yield put({
          type: 'changeFormVisible',
          payload: false,
        });

        const enterid = yield select(state => state.personnel.enterpriseID);
        yield put({
          type: 'fetch',
          payload: { enterprise_id: enterid },
        });
      }
    },
    // 删除员工
    *delePerson({ payload }, { call, put, select }) {
      const response = yield call(PersonalService.delePerson, payload);
      if (response.status === 'OK') {
        const enterid = yield select(state => state.personnel.enterpriseID);
        yield put({ type: 'fetch', payload: { enterprise_id: enterid } });
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
    saveUserdata(state, { payload }) {
      return { ...state, userData: payload };
    },
    changeLoading(state, { payload }) {
      return { ...state, loading: payload };
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
    saveTreeData(state, { payload }) {
      return { ...state, treeData: payload };
    },
    saveIndexData(state, { payload }) {
      return { ...state, indexData: payload };
    },
    saveFormCallback(state, { payload }) {
      return { ...state, formCallback: payload };
    },
    saveEnterid(state, { payload }) {
      return { ...state, enterpriseID: payload };
    },
  },
};
