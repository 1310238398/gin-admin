import { message } from 'antd';
import { isObjectNullOrUndefinedOrEmpty } from '../utils/utils';
import StoreService from '../services/s_shopApplicationReview';

export default {
  namespace: 'pageGroupingManagement',
  state: {
    recommendedStatueList: [],
    tableData: {
      list: [],
    },
    zgoods_id: '',
    loading: false,
    goodLoading: false,
    search: {},
    testGoodstagID: {},
    pagination: {},
    goodData: {
      goodslist: [],
      pagination: {},
    },
  },
  effects: {
    /**
     * 查询字典表-状态
     */
    *queryRecommendedstatue(_, { call, put }) {
      const result = yield call(StoreService.queryRecommendedstatus);
      const response = result.list || [];
      if (!isObjectNullOrUndefinedOrEmpty(response)) {
        response.push({ code: '', name: '全部', key: '' });
        yield put({
          type: 'setRecommendstatue',
          payload: [...response],
        });
      }
    },

    *queryShopStatueTotalInfo({ params }, { call, put, select }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      if (params) {
        yield put({
          type: 'saveSearch',
          payload: params,
        });
      } else {
        const search = yield select(state => state.pageGroupingManagement.search);
        if (search) {
          params = { ...search };
        }
      }

      const result = yield call(StoreService.queryHomePageGroupingPageStore, {
        ...params,
      });
      yield put({
        type: 'setShopStatueTotal',
        payload: result,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *queryShopTagTotalInfo({ params }, { call, put }) {
      const result = yield call(StoreService.queryTagproductPageStore, {
        ...params,
      });
      yield put({
        type: 'setShopStatueTotal',
        payload: result,
      });
    },
    *queryTagInfo({ goodstagid, pagination }, { call, put, select }) {
      yield put({
        type: 'changegoodLoading',
        payload: true,
      });
      if (goodstagid) {
        yield put({
          type: 'savegoodsid',
          payload: goodstagid,
        });
      } else {
        const zangoods_id = yield select(state => state.pageGroupingManagement.zgoods_id);
        if (zangoods_id) {
          goodstagid = zangoods_id;
        }
      }

      if (pagination) {
        yield put({
          type: 'savePagination',
          payload: pagination,
        });
      } else {
        const pag = yield select(state => state.pageGroupingManagement.pagination);
        if (pag) {
          pagination = { ...pag };
        }
      }
      const result = yield call(StoreService.queryTagproductPageStore, {
        goodstagid,
        ...pagination,
      });
      yield put({
        type: 'setTagproduct',
        payload: result,
      });
      yield put({
        type: 'changegoodLoading',
        payload: false,
      });
    },
    *Selectcommtag({ data, tagid }, { call, put }) {
      //  const goodstagid = tagid;
      const response = yield call(StoreService.selectcommtag, { data, tagid });
      if (response.status === 'ok') {
        message.success('添加成功');
        yield put({ type: 'queryTagInfo' });
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    *deletagOff(goodstagid, { call, put }) {
      const response = yield call(StoreService.deleTagOff, goodstagid);
      if (response.status === 'ok') {
        message.success('删除成功');
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    *moveupTagOff(goodstagid, { call, put }) {
      const response = yield call(StoreService.moveupTagOff, goodstagid);
      if (response.status === 'ok') {
        message.success('上移成功');
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    *movedownOff(goodstagid, { call, put }) {
      const response = yield call(StoreService.movedownTagOff, goodstagid);
      if (response.status === 'ok') {
        message.success('下移成功');
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    *showTagOff(goodstagid, { call, put }) {
      const response = yield call(StoreService.showTagOff, goodstagid);
      if (response.status === 'ok') {
        message.success('显示成功');
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    *hideTagOff(goodstagid, { call, put }) {
      const response = yield call(StoreService.hideTagOff, goodstagid);
      if (response.status === 'ok') {
        message.success('显示成功');
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    *insertTag({ body }, { call, put }) {
      if (!body) {
        return;
      }
      const response = yield call(StoreService.insertTag, body);
      if (response.status === 'ok') {
        message.success('添加成功');
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    *updateTag({ body }, { call, put }) {
      if (!body) {
        return;
      }
      const response = yield call(StoreService.updateTag, body);
      if (response.status === 'ok') {
        message.success('编辑成功');
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    // 删除标签商品
    *deleCommdityTag({ goods_id, tag_id }, { call, put }) {
      // const goodstagid = tag_id;
      const response = yield call(StoreService.deleCommdityTag, {
        goods_id,
        tag_id,
      });
      if (response.status === 'ok') {
        message.success('删除成功');
        yield put({ type: 'queryTagInfo' });
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    // 上移标签商品
    *upCommdityTag({ goods_id, tag_id }, { call, put }) {
      const response = yield call(StoreService.upCommdityTag, {
        goods_id,
        tag_id,
      });
      if (response.status === 'ok') {
        message.success('上移成功');
        yield put({ type: 'queryTagInfo' });
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
    // 下移标签商品
    *downCommdityTag({ goods_id, tag_id }, { call, put }) {
      const response = yield call(StoreService.downCommdityTag, {
        goods_id,
        tag_id,
      });
      if (response.status === 'ok') {
        message.success('下移成功');
        yield put({ type: 'queryTagInfo' });
        yield put({ type: 'queryShopStatueTotalInfo' });
      }
    },
  },
  reducers: {
    setRecommendstatue(state, { payload }) {
      // if (isObjectNullOrUndefinedOrEmpty(payload)) {
      //   return;
      // }
      return {
        ...state,
        recommendedStatueList: payload,
      };
    },
    setShopStatueTotal(state, { payload }) {
      return {
        ...state,
        tableData: {
          list: payload,
        },
      };
    },
    setTagproduct(state, { payload }) {
      return {
        ...state,
        goodData: {
          goodslist: payload.list,
          pagination: payload.pagination,
        },
      };
    },
    saveSearch(state, { payload }) {
      return { ...state, search: payload };
    },
    changeLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
    changegoodLoading(state, { payload }) {
      return { ...state, goodLoading: payload };
    },
    savePagination(state, { payload }) {
      return { ...state, pagination: payload };
    },
    savegoodsid(state, { payload }) {
      return { ...state, zgoods_id: payload };
    },
  },
};
