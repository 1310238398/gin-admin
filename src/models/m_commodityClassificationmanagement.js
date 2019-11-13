// import { queryShopstatus } from '../services/s_shopApplicationReview'
import { message } from 'antd';
import { isObjectNullOrUndefinedOrEmpty } from '../utils/utils';
import StoreService from '../services/s_shopApplicationReview';

export default {
  namespace: 'commodityClassificationmanagement',
  state: {
    loading: false,
    CommdityClassisfication: [],
    CommClasslist: [],
    TreeData: [],
    attrList: [],
  },
  effects: {
    *queryShopStatueTotalInfo(_, { call, put }) {
      //
      const result = yield call(StoreService.queryCommodityClassificationPageStore);
      if (!isObjectNullOrUndefinedOrEmpty(result)) {
        yield put({
          type: 'setShopStatueTotal',
          payload: result,
        });
      }
    },
    // 商品分类
    *queryCommClass(_, { call, put }) {
      //
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      // if (params) {
      //   yield put({
      //     type: 'saveSearch',
      //     payload:params
      //   });
      // } else {
      //   const search = yield select(state => state.orderManagement.search);
      //   if (search) {
      //     params = { ...search };
      //   }
      // }
      const result = yield call(StoreService.queryCommodityClassificationPageStore, {});
      const dataTree = [];
      if (!isObjectNullOrUndefinedOrEmpty(result)) {
        if (result) {
          for (let i = 0; i < result.length; i += 1) {
            if (result[i].children) {
              for (let j = 0; j < result[i].children.length; j += 1) {
                result[i].title = result[i].category_name;
                result[i].value = result[i].goods_category_id;
                result[i].key = result[i].category_name;

                result[i].children[j].title = result[i].children[j].category_name;
                result[i].children[j].value = result[i].children[j].goods_category_id;
                result[i].children[j].key = result[i].children[j].category_name;
              }
            } else {
              result[i].title = result[i].category_name;
              result[i].value = result[i].goods_category_id;
              result[i].key = result[i].category_name;
            }
          }
          for (let i = 0; i < result.length; i += 1) {
            dataTree.push({
              title: result[i].category_name,
              value: result[i].goods_category_id,
              key: result[i].category_name,
            });
          }
        }
        yield put({
          type: 'setCommClass',
          payload: result,
        });
        yield put({
          type: 'setParentCommClass',
          payload: dataTree,
        });
        yield put({
          type: 'changeLoading',
          payload: false,
        });
      }
    },
    *DeleOff({ category }, { call, put }) {
      const response = yield call(StoreService.DeleOff, { category });
      if (response.status === 'ok') {
        message.success('删除成功');
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    *EditCommclass({ params }, { call, put }) {
      if (!params) {
        return;
      }
      // 编辑数据
      const response = yield call(StoreService.editCommclass, params);
      if (response.status === 'ok') {
        message.success('编辑成功');
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    *insertCommclass({ params }, { call, put }) {
      if (!params) {
        return;
      }
      // 插入数据
      const response = yield call(StoreService.insertCommclass, params);
      if (response.status === 'ok') {
        message.success('新建成功');
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    *queryAttrList({ payload }, { call, put }) {
      const response = yield call(StoreService.addProductClassAttrList, payload);
      yield put({
        type: 'setAttrList',
        payload: response,
      });
    },
    // *submitProductClass({ payload }, { call, put }) {
    //   // yield call(StoreService)
    // },
  },
  reducers: {
    setShopStatueTotal(state, { payload }) {
      return {
        ...state,
        CommdityClassisfication: payload || [],
      };
    },
    setCommClass(state, { payload }) {
      return {
        ...state,
        CommClasslist: payload,
      };
    },
    // saveSearch(state, { payload }) {
    //   return { ...state, search: payload };
    // },
    changeLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
    setParentCommClass(state, { payload }) {
      return { ...state, TreeData: payload };
    },
    setAttrList(state, { payload }) {
      return {
        ...state,
        attrList: payload || [],
      };
    },
  },
};
