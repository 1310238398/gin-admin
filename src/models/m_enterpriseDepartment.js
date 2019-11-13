import { message } from 'antd';
import { create, queryTree, queryPage, get, update, del } from '../services/s_enterpriseDepts';

export default {
  namespace: 'enterpriseDepartment',
  state: {
    loading: true,
    search: {},
    pagination: {},
    data: {
      list: [],
      pagination: {},
    },
    submitting: false,
    formTitle: '新建部门',
    formID: '',
    formVisible: false,
    formData: {},
    formCallback() {},
    searchTreeData: [],
    treeData: [],
    indexData: {},
    expandedKeys: [],
    checkedKeys: [],
    parentId: '',
    dataList: {},
  },
  effects: {
    *fetch({ payload, pagination, info }, { call, put, select }) {
      let params = {
        q: 'page',
        enterprise_id: info.record_id,
        parent_id: info.key_id,
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
        const search = yield select(state => state.enterprise.search);
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
        const p = yield select(state => state.enterprise.pagination);
        if (p) {
          params = { ...params, ...p };
        }
      }
      if (info.key_id) {
        yield put({
          type: 'saveParentId',
          payload: info.key_id,
        });
      }
      if (info) {
        params.enterprise_id = info.record_id;
        params.parent_id = info.key_id;
      }
      const response = yield call(queryPage, params);
      yield put({
        type: 'saveData',
        payload: response,
      });

      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    // 查看是否存在下级
    *fetchChildren({ info }, { call, put }) {
      const params = {
        q: 'page',
        enterprise_id: info.record_id,
        parent_id: info.item_id,
      };
      const response = yield call(queryPage, params);
      yield put({
        type: 'saveDataList',
        payload: response.list,
      });
    },

    *fetchSearchTree({ payload, info }, { call, put }) {
      const params = {
        q: 'tree',
        enterprise_id: info ? info.record_id : payload.record_id,
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
      if (response.list) {
        handleList(response.list);
        yield put({
          type: 'saveSearchTreeData',
          payload: response.list,
        });
      } else {
        yield put({
          type: 'saveSearchTreeData',
          payload: [],
        });
      }
    },
    *loadForm({ payload }, { put, select }) {
      // 给定初始值
      yield [
        put({
          type: 'changeFormVisible',
          payload: true,
        }),
        put({
          type: 'saveFormTitle',
          payload: '新建部门',
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
        enterprise_id: payload.info.record_id,
      });

      if (payload.type === 'A') {
        const search = yield select(state => state.enterpriseDepartment.search);
        yield put({
          type: 'saveFormData',
          payload: {
            parent_id: search.parent_id,
            type: (parseInt(search.parent_type || '0', 10) + 10).toString(),
          },
        });
      }

      if (payload && payload.id) {
        yield [
          put({
            type: 'saveFormTitle',
            payload: '编辑部门',
          }),
          put({
            type: 'saveFormID',
            payload: payload.id,
          }),
          put({
            type: 'fetchForm',
            payload: { record_id: payload.id },
          }),
        ];
      }

      if (payload && payload.callback) {
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
      const formID = yield select(state => state.enterpriseDepartment.formID);
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

      // if (response.status === 'ok') {
      if (response) {
        message.success('保存成功');
        yield put({
          type: 'changeFormVisible',
          payload: false,
        });
        const formCallback = yield select(state => state.enterpriseDepartment.formCallback);
        formCallback('ok');
      }
    },
    *del({ payload, info }, { call, put }) {
      const response = yield call(del, payload.record_id);
      if (response.status === 'OK') {
        message.success('删除成功');
        yield put({ type: 'fetchSearchTree', info });

        yield put({ type: 'fetch', info });
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
      if (response.list) {
        handleList(response.list);
      }

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
      if (response.list) {
        handle(response.list);
      }

      yield put({
        type: 'saveIndexData',
        payload: indexData,
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
    saveFormCallback(state, { payload }) {
      return { ...state, formCallback: payload };
    },
    changeSubmitting(state, { payload }) {
      return { ...state, submitting: payload };
    },
    saveSearchTreeData(state, { payload }) {
      return { ...state, searchTreeData: payload };
    },
    saveTreeData(state, { payload }) {
      return { ...state, treeData: payload };
    },
    saveIndexData(state, { payload }) {
      return { ...state, indexData: payload };
    },
    saveExpandedKeys(state, { payload }) {
      return { ...state, expandedKeys: payload };
    },
    saveParentId(state, { payload }) {
      return { ...state, parentId: payload };
    },
    saveDataList(state, { payload }) {
      return { ...state, dataList: payload };
    },
  },
};
