// 服务

import { message } from 'antd';
import { routerRedux } from 'dva/router';
import {
  getStoreId,
  getProductList,
  create,
  del,
  get,
  edit,
  getImgs,
  enable,
  disable,
  getChildern,
  addChildren,
  delChildren,
  changeOutTotal,
  changeaddTotal,
  getProductClass,
  editChildren,
  getProductStock,
  submitStock,
} from '../services/s_mall';
import StoreService from '../services/s_store';

export default {
  namespace: 'productModule',
  state: {
    store: {},
    loading: true,
    search: {},
    data: {
      list: [],
      pagination: {},
    },
    productClass: '',
    submitting: false,
    formTitle: '新建角色',
    formID: '',
    formVisible: false,
    formData: {},
    formCallback() {},
    selectData: [],
    menuKeys: [],
    imgList: [],
    children: [],
    register: [],
    childrenInfo: '',
    formTitlePro: '', // 后期修改商品
    formIDPro: '', // 后期修改商品
    changeFormVisiblePro: false, // 后期修改商品
    dataPro: {}, // 后期修改商品
    stockData: {}, // 修改库存
    formIDStock: '', // 修改库存
    formVisibleStock: false, // 修改库存控制显示隐藏
    formTypePro: '',
    visibleStand: false, // 修改商品规格说明弹窗显示隐藏
  },
  effects: {
    *fetch({ payload, pagination }, { call, put, select }) {
      const store = yield select(state => state.productModule.store.store_id);
      yield put({
        type: 'changeLoading',
        payload: true,
      });

      let params = {};

      if (payload) {
        params = { ...payload };
        yield put({
          type: 'saveSearch',
          payload,
        });
      } else {
        const search = yield select(state => state.productModule.search);
        if (search) {
          params = { ...search };
        }
      }

      if (pagination) {
        params = { ...params, ...pagination };
      }
      const response = yield call(getProductList, store, params);
      yield put({ type: 'saveData', payload: response });
      yield put({ type: 'changeLoading', payload: false });
    },
    *redirect(_, { put }) {
      yield put(routerRedux.push('/malls/storeApplyserve'));
    },
    *redirectjump(_, { put }) {
      yield put(routerRedux.push('/malls/storeChangeserve'));
    },
    *getStoreNew(_, { call, put }) {
      const response = yield call(StoreService.getStoreId);
      if (!Array.isArray(response)) {
        message.warn('请先开通店铺');
        yield put({
          type: 'redirect',
          payload: {
            response,
          },
        });
      }
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
          type: 'getProductList',
          store: store.store_id,
        });
      }
    },
    // 获取店铺信息
    *getStore(_, { call, put }) {
      const response = yield call(getStoreId);
      if (response[0]) {
        yield put({
          type: 'setStore',
          payload: {
            response,
          },
        });
      }
    },

    // 获取商品分类
    *getProductClass(_, { call, put }) {
      const response = yield call(getProductClass);
      const result = response && response.length > 0 ? response : [];
      yield put({ type: 'saveProductClass', payload: result });
    },
    *loadForm({ payload }, { put, select }) {
      const store = yield select(state => state.productModule.store.store_id);
      // 对话框初始化 详情见下方
      yield put({ type: 'changeFormVisible', payload: true });
      yield put({ type: 'saveFormTitle', payload: '添加商品' });
      yield put({ type: 'saveFormID', payload: '' });
      yield put({ type: 'saveFormData', payload: {} });
      if (payload && payload.callback) {
        yield put({
          type: 'saveFormCallback',
          payload: payload.callback,
        });
      }
      // 编辑
      if (payload && payload.id) {
        yield put({ type: 'saveFormTitle', payload: '编辑商品' });
        yield put({ type: 'saveFormID', payload: payload.id });
        yield put({ type: 'fetchForm', payload: { goods_id: payload.id, store_id: store } });
      }
    },
    // 获取单个商品
    *fetchForm({ payload }, { call, put }) {
      const response = yield call(get, payload);
      yield put({
        type: 'saveFormData',
        payload: response,
      });
      yield put({
        type: 'saveMenuKeys',
        payload: response.menu_ids || [],
      });
    },
    // 获取商品列表
    *getProductList({ store, payload, pagination }, { call, put, select }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });

      let params = {};

      if (payload) {
        params = { ...payload };
        yield put({
          type: 'saveSearch',
          payload,
        });
      } else {
        const search = yield select(state => state.productModule.search);
        if (search) {
          params = { ...search };
        }
      }
      if (pagination) {
        params = { ...params, ...pagination };
      }
      const response = yield call(getProductList, store, params);
      yield put({
        type: 'saveData',
        payload: response,
      });

      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    // 表单提交
    *submit({ storeId, payload }, { call, put, select }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const params = { ...payload };
      const formID = yield select(state => state.productModule.formID);
      let response;
      if (formID && formID !== '') {
        response = yield call(edit, storeId, params);
      } else {
        response = yield call(create, storeId, params);
      }

      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      if (response.status === 'ok') {
        message.success('保存成功');
        yield put({
          type: 'changeFormVisible',
          payload: false,
        });
        const formCallback = yield select(state => state.productModule.formCallback);
        formCallback('ok');
      }
    },
    // 删除商品
    *del({ payload }, { call, put }) {
      const response = yield call(del, payload);
      if (response.status === 'ok') {
        message.success('删除成功');
        yield put({ type: 'fetch' });
      }
    },
    // 删除子商品
    *delChildren({ payload }, { call, put }) {
      const response = yield call(delChildren, payload);
      if (response.status === 'ok') {
        message.success('删除成功');
        yield put({ type: 'getChildrenInfo' });
      }
    },
    // 单个商品图片
    *getImgList({ payload }, { call, put }) {
      const response = yield call(getImgs, payload);
      yield put({ type: 'saveImgs', payload: response });
    },
    // 商品上下架
    *changeStatus({ payload }, { call, put }) {
      if (payload.goods_status === 1) {
        const response = yield call(enable, payload);
        if (response.status === 'ok') {
          message.success('下架成功');
          yield put({ type: 'fetch' });
        }
      }
      if (payload.goods_status === 2) {
        const response = yield call(disable, payload);
        if (response.status === 'ok') {
          message.success('上架成功');
          yield put({ type: 'fetch' });
        }
      }
    },
    // 商品上架
    *changeUpstatus({ payload }, { call, put }) {
      if (payload.goods_status === 2) {
        const response = yield call(disable, payload);
        if (response.status === 'ok') {
          message.success('上架成功');
          yield put({ type: 'fetch' });
        }
      }
    },
    // 获取子商品
    *getChildrenInfo(_, { call, put, select }) {
      yield put({ type: 'changeFormVisible', payload: true });
      const payload = yield select(state => state.productModule.childrenInfo);
      const response = yield call(getChildern, payload);
      yield put({ type: 'saveChildren', payload: response });
    },
    // 添加子商品
    *addchildren({ store, payload }, { call, put }) {
      const response = yield call(addChildren, store, payload);
      if (response.status === 'ok') {
        message.success('添加成功');
        yield put({ type: 'getChildrenInfo' });
      }
    },
    // 编辑子商品
    *editChildren({ formData, payload }, { call, put }) {
      const response = yield call(editChildren, formData, payload);
      if (response.status === 'ok') {
        message.success('编辑成功');
        yield put({ type: 'getChildrenInfo' });
      }
    },
    *changeTotal({ payload, totalInfo }, { call, put }) {
      if (totalInfo.title === '出库') {
        yield call(changeOutTotal, payload, totalInfo);
        yield put({ type: 'getChildrenInfo' });
      } else {
        yield call(changeaddTotal, payload, totalInfo);
        yield put({ type: 'getChildrenInfo' });
      }
    },
    // 后期修改
    *loadFormPro({ payload }, { put }) {
      yield put({
        type: 'changeFormVisiblePro',
        payload: true,
      });

      yield [
        put({
          type: 'saveFormTypePro',
          payload: 'A',
        }),
        put({
          type: 'saveFormTitle',
          payload: '新建商品',
        }),
        put({
          type: 'saveFormID',
          payload: '',
        }),
        put({
          type: 'saveFormDataPro',
          payload: {},
        }),
      ];

      if (payload.type === 'E') {
        yield [
          put({
            type: 'saveFormTitle',
            payload: '编辑商品',
          }),
          put({
            type: 'saveFormTypePro',
            payload: 'E',
          }),
          put({
            type: 'saveFormID',
            payload: payload.id,
          }),
          put({
            type: 'fetchFormPro',
            payload: { goods_id: payload.id, store_id: payload.store_id },
          }),
        ];
      }
    },
    *fetchFormPro({ payload }, { call, put }) {
      const response = yield call(get, payload);

      const pdata = yield call(getProductClass);
      const pkeys = [];
      // 显示商品分类
      function filterPData(data, parentPath) {
        for (let i = 0; i < data.length; i += 1) {
          /* eslint-disable prefer-destructuring */

          if (data[i].children && data[i].children.length > 0) {
            let key = data[i].key;

            /* eslint-disable  prefer-template */

            if (parentPath && parentPath !== '') {
              key = parentPath + '/' + key;
            }
            filterPData(data[i].children, key);

            /* eslint-disable  no-continue */

            continue;
          }
          pkeys.push(parentPath + '/' + data[i].key);
        }
      }

      filterPData(pdata);

      if (response.goods_category_id) {
        for (let i = 0; i < pkeys.length; i += 1) {
          if (pkeys[i].endsWith(response.goods_category_id)) {
            response.goods_category_id = pkeys[i];
            break;
          }
        }
      }

      // 规格名
      if (response.property && response.property.length > 0) {
        response.norm_name = response.property[response.property.length - 1].name;
      }

      // 规格值
      if (response.property && response.property.length > 0) {
        response.norm_value = response.property[response.property.length - 1].values;
      }

      // const newList = [];
      for (let i = 0; i < response.norms.length; i += 1) {
        response.norms[i].image = response.norms[i].image ? [response.norms[i].image] : [];
      }
      // 规格值列表
      const normL = [];
      for (let j = 0; j < response.norms.length; j += 1) {
        normL.push({
          name: response.norms[j].name,
          price: Number(response.norms[j].price) !== 0 ? Number(response.norms[j].price) / 100 : 0,
          stock: response.norms[j].stock,
          image: response.norms[j].image,
          goods_code: response.norms[j].goods_code,
          property: response.norms[j].property,
          norm_id: response.norms[j].norm_id,
        });
      }
      // 规格值列表后台传值
      response.norm_list = normL;
      // 配送方式
      if (response.delivery === true) {
        response.delivery = '1';
      } else {
        response.delivery = '2';
      }
      yield [
        put({
          type: 'saveFormDataPro',
          payload: response,
        }),
      ];
    },
    *submitPro({ payload }, { call, put, select }) {
      const params = { ...payload };
      const normValue = params.norm_value;
      let propertyList = [];
      const values = [];
      // 循环生成value
      if (normValue && normValue.length) {
        for (let i = 0; i < normValue.length; i += 1) {
          values.push(normValue[i]);
        }
      }
      // 属性的list
      propertyList = [
        ...propertyList,
        {
          name: params.norm_name,
          code: 'default',
          property_id: '',
          values,
        },
      ];
      // 属性
      params.property = propertyList;
      let nowPropertyList = [];
      const propertyP = params.property;
      const normList = params.norm_list;

      if (normList && normList.length) {
        for (let j = 0; j < normList.length; j += 1) {
          for (let k = 0; k < propertyP.length; k += 1) {
            nowPropertyList = [
              ...nowPropertyList,
              {
                name: propertyP[k].name,
                code: 'default',
                value: normList[j].name,
              },
            ];
          }
          normList[j].property = [nowPropertyList[j]];
          if (params.norms && params.norms.length > 0) {
            for (let p = 0; p < params.norms.length; p += 1) {
              if (normList[p] && normList[p].norm_id) {
                normList[p].norm_id = params.norms[p].norm_id;
              }
            }
          }

          normList[j].image = normList[j].image.toString();

          if (normList[j].key) {
            delete normList[j].key;
          }
          delete normList[j].code;
          if (normList[j].price) {
            normList[j].price = Math.round((normList[j].price || 0) * 100);
          }
          if (normList[j].stock) {
            normList[j].stock = parseInt(normList[j].stock, 10);
          }
        }
      }

      // 去掉其中的norm_name,norm_value
      delete params.norm_name;
      delete params.norm_value;
      if (params.delivery === '2') {
        params.delivery = false;
      } else {
        params.delivery = true;
      }
      const goodCscategoryId = params.goods_category_id.split('/');
      if (goodCscategoryId && goodCscategoryId.length > 0) {
        params.goods_category_id = goodCscategoryId[goodCscategoryId.length - 1];
      }

      const store = yield select(state => state.productModule.store.store_id);
      const formType = yield select(state => state.productModule.formTypePro);
      // 判断商品规格价格和库存是否为0

      if (params.norm_list && params.norm_list.length > 0) {
        for (let k = 0; k < params.norm_list.length; k += 1) {
          if (
            params.norm_list[k].price === '' ||
            params.norm_list[k].price === null ||
            params.norm_list[k].price === undefined ||
            Number.isNaN(params.norm_list[k].price)
          ) {
            message.error('商品价格不能为空');
            return;
          }
          if (
            params.norm_list[k].stock === '' ||
            params.norm_list[k].stock === null ||
            params.norm_list[k].stock === undefined ||
            Number.isNaN(params.norm_list[k].stock)
          ) {
            message.error('商品的库存不能为空');
            return;
          }
          if (params.norm_list[k].stock === 0) {
            message.error('商品的库存不能为0');
            return;
          }
        }
      }

      let response;
      if (formType === 'E') {
        response = yield call(edit, store, params);
      } else {
        response = yield call(create, store, params);
      }
      if (response.status === 'ok') {
        message.success('保存成功');
        yield put({
          type: 'changeFormVisiblePro',
          payload: false,
        });
        yield put({
          type: 'fetch',
        });
      }
    },
    // 获取单个商品的规格和库存
    *getProductStock({ payload }, { call, put }) {
      const params = { ...payload };

      yield put({
        type: 'changeFormVisibleStock',
        payload: true,
      });
      const response = yield call(getProductStock, params);
      const newList = [];
      for (let i = 0; i < response.length; i += 1) {
        newList.push({
          name: response[i].name,
          stock: response[i].stock,
        });
      }
      response.norm_list = newList;
      yield put({
        type: 'saveStockData',
        payload: response,
      });
    },

    // 保存库存
    *submitStock({ payload }, { call, put }) {
      const params = { ...payload };
      const normList = params.norm_list;

      if (params.norm_list) {
        delete params.norm_list;
      }
      const tmp = [];
      if (normList && normList.length) {
        for (let j = 0; j < normList.length; j += 1) {
          tmp.push(params[j]);
        }
        for (let i = 0; i < normList.length; i += 1) {
          tmp[i].stock = parseInt(normList[i].stock, 10);
          if (
            tmp[i].stock === '' ||
            tmp[i].stock === null ||
            tmp[i].stock === undefined ||
            Number.isNaN(tmp[i].stock)
          ) {
            message.error('商品的库存不能为空');
            return;
          }
        }
      }

      const storeId = params[0].store_id;
      const goodsId = params[0].goods_id;
      const dataA = [];
      dataA.data = tmp;

      const response = yield call(submitStock, storeId, goodsId, { ...dataA });

      if (response.status === 'ok') {
        message.success('修改库存成功');
        yield put({
          type: 'changeFormVisibleStock',
          payload: false,
        });
        yield put({
          type: 'fetch',
        });
      }
    },
    *renderStand(_, { put }) {
      yield put({
        type: 'saveStandModal',
        payload: true,
      });
    },
  },
  reducers: {
    // 表单显示隐藏
    changeFormVisible(state, { payload }) {
      return { ...state, formVisible: payload };
    },
    // 表单名称
    saveFormTitle(state, { payload }) {
      return { ...state, formTitle: payload };
    },
    // 表单id(主要用于编辑)
    saveFormID(state, { payload }) {
      return { ...state, formID: payload };
    },
    // 表单参数 (主要用于添加-编辑参数改变)
    saveFormData(state, { payload }) {
      return { ...state, formData: payload };
    },
    // 设置商品分类
    saveProductClass(state, { payload }) {
      return { ...state, productClass: payload };
    },
    changeChildrenInfo(state, { payload }) {
      return { ...state, childrenInfo: payload };
    },
    changeSubmitting(state, { payload }) {
      return { ...state, submitting: payload };
    },
    saveMenuKeys(state, { payload }) {
      return { ...state, menuKeys: payload };
    },
    saveFormCallback(state, { payload }) {
      return { ...state, formCallback: payload };
    },
    // 列表渲染
    saveData(state, { payload }) {
      return { ...state, data: payload };
    },
    saveSearch(state, { payload }) {
      return { ...state, search: payload };
    },
    saveImgs(state, { payload }) {
      return { ...state, formData: { ...state.formData, imgList: payload } };
    },
    changeLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
    saveChildren(state, { payload }) {
      return { ...state, children: [].concat(payload) };
    },
    // 渲染店铺信息
    setStore(state, { payload }) {
      return {
        ...state,
        store: payload.response[0].store,
        register: payload.response[0].register,
      };
    },
    // 后期修改商品
    changeFormVisiblePro(state, { payload }) {
      return { ...state, formVisiblePro: payload };
    },
    saveFormTitlePro(state, { payload }) {
      return { ...state, formTitlePro: payload };
    },
    saveFormTypePro(state, { payload }) {
      return { ...state, formTypePro: payload };
    },
    saveFormIDPro(state, { payload }) {
      return { ...state, formIDPro: payload };
    },
    saveFormDataPro(state, { payload }) {
      return { ...state, dataPro: payload };
    },
    // 修改库存
    changeFormVisibleStock(state, { payload }) {
      return { ...state, formVisibleStock: payload };
    },
    // 商品库存列表渲染
    saveStockData(state, { payload }) {
      return { ...state, stockData: payload };
    },
    // 编辑还是新增
    saveAactionBtn(state, { payload }) {
      return { ...state, actionBtn: payload };
    },
    saveStandModal(state, { payload }) {
      return { ...state, visibleStand: payload };
    },
  },
};
