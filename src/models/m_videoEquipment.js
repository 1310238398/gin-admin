import { initImosSdk } from '@/utils/monitor';
import { message } from 'antd';
import * as VideoEquipmentService from '@/services/s_videoEquipment';

export default {
  namespace: 'videoEquipment',
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
    formVisible: false,
    formData: {},
    formSBData: {},
    formSBTitle: '',
    formSBID: '',
    dataList: [],
    treeData: [],
    indexData: {},
    treeVisible: false, // 新建设备分组
    formVisibleStock: false, // 选择分组
    dataSheB: {
      list: [],
      pagination: {},
    },
    selectList: [],
    formSeeTitle: '',
    formSeeID: '',
    formSeeVisible: false,
    formSeeData: {},
    positions: {},
  },
  effects: {
    // 显示左侧树的数据
    *queryTreeStore(_, { call, put }) {
      const params = {
        q: 'tree',
      };
      const result = yield call(VideoEquipmentService.queryTreeStore, params);
      const list = result.list || [];
      yield put({
        type: 'setShopStatueTotal',
        payload: list,
      });
    },

    // 视频设备
    *fetchEQ({ search, pagination }, { call, put, select }) {
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
        const s = yield select(state => state.videoEquipment.search);
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
        const p = yield select(state => state.videoEquipment.pagination);
        if (p) {
          params = { ...params, ...p };
        }
      }
      const response = yield call(VideoEquipmentService.queryEQ, params);
      yield put({
        type: 'saveData',
        payload: response,
      });
    },

    // 视频设备
    *loadSPForm({ payload }, { put }) {
      yield put({
        type: 'listThird',
      });
      yield put({
        type: 'changeFormVisible',
        payload: true,
      });

      yield put({
        type: 'fetchTree',
      });

      yield [
        put({
          type: 'saveFormSBID',
          payload: '',
        }),
        put({
          type: 'saveFormSBData',
          payload: {},
        }),
      ];
      if (payload.type === 'E') {
        yield [
          put({
            type: 'saveFormSBID',
            payload: payload.record_id,
          }),
          put({
            type: 'fetchSPForm',
            payload: payload.record_id,
          }),
          put({
            type: 'seeListInfo',
            payload: payload.record_id,
          }),
        ];
      }
    },

    // 第三方系统的list
    *listThird(_, { put, call }) {
      const result = yield call(VideoEquipmentService.getThirdList);
      const list = result ? result.list : [];
      yield put({
        type: 'saveThirdList',
        payload: list,
      });
    },

    // 左侧分组展示
    *loadFZForm({ payload }, { put }) {
      yield put({
        type: 'treeVisible',
        payload: true,
      });

      yield [
        put({
          type: 'saveFormID',
          payload: '',
        }),
        put({
          type: 'saveFormData',
          payload: {},
        }),
      ];
      if (payload.type === 'E') {
        yield put({
          type: 'fetchFZForm',
          payload: payload.record_id,
        });
      }
    },

    // 查看实况
    *loadSeeForm({ payload, callback }, { put, call }) {
      yield [
        put({
          type: 'saveFormSeeTitle',
          payload: payload.name,
        }),
        put({
          type: 'saveFormSeeID',
          payload: payload.record_id,
        }),
        put({
          type: 'saveFormSeeData',
          payload,
        }),
      ];

      const response = yield call(VideoEquipmentService.getThird, { record_id: payload.third_id });
      if (response.extra) {
        initImosSdk(response.extra, callback);
      } else {
        message.warn('无效的三方系统配置');
      }
    },

    // 设备分组
    *fetchFZForm({ payload }, { call, put }) {
      const response = yield call(VideoEquipmentService.get, payload);
      yield put({
        type: 'saveFormData',
        payload: response,
      });
      yield put({
        type: 'saveFormID',
        payload,
      });
    },

    // 查看所属分组列表
    *seeListInfo({ payload }, { call, put }) {
      const params = {
        q: 'tree',
      };
      const record_id = payload ? payload.record_id : '';
      const pdata = yield call(VideoEquipmentService.queryTreeStore, params);
      function getParents(data, id) {
        for (let i = 0; i < data.length; i += 1) {
          if (data[i].record_id === id) {
            return [data[i].name];
          }
          if (data[i].children) {
            const ro = getParents(data[i].children, id);
            if (ro !== undefined) {
              return ro.concat(data[i].name);
            }
          }
        }
      }
      const pkeys = getParents(pdata.list, record_id);
      function getTextByJs(arr) {
        let str = '';
        const split = '/';
        if (arr && arr.length > 0) {
          for (let j = 0; j < arr.length; j += 1) {
            str += arr[j] + split;
          }
        }

        // 去掉最后一个逗号(如果不需要去掉，就不用写)
        if (str.length > 0) {
          str = str.substr(0, str.length - 1);
        }
        return str;
      }
      const rePkeys = pkeys ? pkeys.reverse() : [];
      const newArr = [];
      const name = getTextByJs(rePkeys);
      newArr.push({
        record_id,
        name,
      });
      if (name) {
        yield [
          put({
            type: 'savePositions',
            payload: newArr,
          }),
        ];
      }
    },

    // 视频设备
    *fetchSPForm({ payload }, { call, put }) {
      const response = yield call(VideoEquipmentService.getEq, payload);

      const values = [];
      if (response.positions && response.positions.length > 0) {
        for (let i = 0; i < response.positions.length; i += 1) {
          values.push({
            name: response.positions[i].name,
            record_id: response.positions[i].record_id,
          });
        }
      }
      response.positions = values;
      yield [
        put({
          type: 'saveFormSBData',
          payload: response,
        }),
      ];
    },

    // 提交
    *submit({ payload }, { call, put, select }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });

      const params = { ...payload };
      const formType = yield select(state => state.videoEquipment.formType);
      let response;
      if (formType === 'E') {
        params.record_id = yield select(state => state.videoEquipment.formID);
        response = yield call(VideoEquipmentService.update, params);
      } else {
        response = yield call(VideoEquipmentService.create, params);
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

    //  删除分组
    *del({ payload }, { call, put }) {
      const response = yield call(VideoEquipmentService.del, payload);
      if (response.status === 'OK') {
        message.success('删除成功');
        yield put({ type: 'fetch' });
      }
    },

    // 显示树的结构
    *fetchTree(_, { call, put }) {
      const params = {
        q: 'tree',
      };
      const response = yield call(VideoEquipmentService.queryTreeStore, params);
      // 循环赋值children
      const handleList = dataList => {
        for (let i = 0; i < dataList.length; i += 1) {
          dataList[i].title = dataList[i].name;
          dataList[i].key = dataList[i].record_id;
          dataList[i].value = dataList[i].record_id;
          if (dataList[i].children) {
            handleList(dataList[i].children);
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
      return { ...state, formVisible: payload };
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
    saveFormSBData(state, { payload }) {
      return { ...state, formSBData: payload };
    },
    changeSubmitting(state, { payload }) {
      return { ...state, submitting: payload };
    },

    // 设备分组显示
    treeVisible(state, { payload }) {
      return { ...state, treeVisible: payload };
    },

    // 设备分组左侧树
    setShopStatueTotal(state, { payload }) {
      return {
        ...state,
        dataList: payload || [],
      };
    },

    // // 选择分组
    changeFormVisibleStock(state, { payload }) {
      return { ...state, formVisibleStock: payload };
    },
    // 新增选择上级分组
    saveTreeData(state, { payload }) {
      return { ...state, treeData: payload };
    },
    saveFormSeeTitle(state, { payload }) {
      return { ...state, formSeeTitle: payload };
    },
    saveFormSeeID(state, { payload }) {
      return { ...state, formSeeID: payload };
    },
    saveFormSeeData(state, { payload }) {
      return { ...state, formSeeData: payload };
    },

    changeFormSeeVisible(state, { payload }) {
      return { ...state, formSeeVisible: payload };
    },
    saveThirdList(state, { payload }) {
      return { ...state, selectList: payload };
    },

    changeFormSBVisible(state, { payload }) {
      return { ...state, formSBVisible: payload };
    },

    saveFormSBTitle(state, { payload }) {
      return { ...state, formSBTitle: payload };
    },
    saveFormSBType(state, { payload }) {
      return { ...state, formSBType: payload };
    },
    saveFormSBID(state, { payload }) {
      return { ...state, formSBID: payload };
    },
    savePositions(state, { payload }) {
      return { ...state, positions: payload };
    },
  },
};
