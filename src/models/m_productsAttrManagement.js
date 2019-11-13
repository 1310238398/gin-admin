import StoreService from '../services/s_shopApplicationReview';

export default {
  namespace: 'productsAttrManagement',
  state: {
    productList: [],
    loading: false,
  },
  effects: {
    // 渲染数据列表

    *listProductsAttr(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const ListData = yield call(StoreService.getProductAttrList);
      if (ListData && ListData.length > 0) {
        yield put({
          type: 'renderAttr',
          payload: ListData,
        });
      } else {
        yield put({
          type: 'renderAttr',
          payload: [],
        });
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    /**
     * 查询商品属性
     *  */
    *searchProductsAttr(_, { put }) {
      yield put({
        type: 'SearchAttr',
        payload: {},
      });
    },

    /**
     * 编辑商品属性
     *  */
    *editProductsAttr({ payload }, { call, put }) {
      const response = yield call(StoreService.editProductAttrList, payload);
      if (response.status === 'ok') {
        yield put({
          type: 'listProductsAttr',
        });
      }
    },

    /**
     * 添加商品属性
     *  */
    *addProductsAttr({ payload }, { call, put }) {
      const response = yield call(StoreService.addProductAttrList, payload);
      if (response.status === 'ok') {
        yield put({
          type: 'listProductsAttr',
        });
      }
    },

    *deleteProductsAttr({ payload }, { call, put }) {
      const response = yield call(StoreService.deleteProductAttrList, payload);
      if (response.status === 'ok') {
        yield put({
          type: 'listProductsAttr',
        });
      }
    },
  },
  reducers: {
    changeLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
    renderAttr(state, { payload }) {
      return { ...state, productList: payload };
    },
    EditAttr(state, { payload }) {
      return { ...state, productList: payload };
    },
    SearchAttr(state, { payload }) {
      return { ...state, payload };
    },
  },
};
