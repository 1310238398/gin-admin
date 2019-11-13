// 促销活动
import ActivityService from "../services/s_activity";
import { message } from 'antd';
import { routerRedux } from 'dva/router';



export default {
    namespace: 'salesPromotion',
    state: {
        store: '',
        search: {},
        productSearch: {},
        data: {
            list: [],
            pagination: {},
        },
        ProductData: {
            list: [],
            pagination: {},
        },
        ProductDataList: '',
        loading: true,
        productClass: '',
        formTitle: '新建活动',
        formID: '',
        formVisible: false,
        formData: {},
        formCheck: [],
        formproductVisible: false,
        prohibit: false,
        goodsList: '',
        formCallback() { },
    },
    effects: {
        * redirect({ payload }, { put }) {
            yield put(routerRedux.push('/malls/storeApply'));
        },
        // 获取店铺信息
        * getStore(_, { call, put }) {
            const response = yield call(ActivityService.getStoreId);
            if(response[0]){
                yield put({
                    type: 'setStore',
                    payload: {
                        response
                    }
                })
            }
        },
        /* 列表信息 */
        *fetch({ payload, pagination }, { call, put, select }) {
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
                const search = yield select(state => state.salesPromotion.search);
                if (search) {
                    params = { ...search };
                }
            }

            if (pagination) {
                params = { ...params, ...pagination };
            }
            const store = yield select(state => state.salesPromotion.store.store_id);
            const response = yield call(ActivityService.queryPage, store, params);

            yield put({
                type: 'saveData',
                payload: response,
            });

            yield put({
                type: 'changeLoading',
                payload: false,
            });
        },
        /* 模态框 */
        *loadForm({ payload }, { call, put, select }) {
            // 给定初始值
            yield put({
                type: 'changeFormVisible',
                payload: true,
            })
            yield put({
                type: 'saveFormTitle',
                payload: '新建活动',
            })
            yield put({
                type: 'saveFormID',
                payload: '',
            })
            yield put({
                type: 'saveFormData',
                payload: {},
            })
            yield put({
                type: 'saveMenuKeys',
                payload: [],
            })
            yield put({
                type: 'saveProhibit',
                payload: false
            })
            if (payload && payload.type === 'K') {
                yield put({ type: 'saveFormTitle', payload: '查看活动', })
                yield put({ type: 'saveProhibit', payload: true })
                yield put({ type: 'saveFormID', payload: payload.id, })
                yield put({ type: 'fetchForm', payload: { discount_id: payload.id }, })
            } else if (payload && payload.type === 'E') {
                yield put({ type: 'saveFormTitle', payload: '编辑活动', })
                yield put({ type: 'saveProhibit', payload: false })
                yield put({ type: 'saveFormID', payload: payload.id, })
                yield put({ type: 'fetchForm', payload: { discount_id: payload.id }, })
            } else {
                yield put({
                    type: 'saveProductDate',
                    payload: [],
                });
            }
            if (payload && payload.callback) {
                yield put({
                    type: 'saveFormCallback',
                    payload: payload.callback,
                });
            }
        },
        /* 商品分类模态框 */
        *productLoadForm(_, { put }) {
            yield put({
                type: 'changeProductFormVisible',
                payload: true,
            })
        },
        /* ID查询 */
        *fetchForm({ payload }, { call, put, select }) {
            const store = yield select(state => state.salesPromotion.store.store_id);
            const response = yield call(ActivityService.get, store, payload);
            const goodsList = yield call(ActivityService.getGoodsList, response);
            yield put({
                type: 'saveFormData',
                payload: response,
            });

            yield put({
                type: 'saveFormDataCheck',
                payload: response.goods_list,
            });
            yield put({
                type: 'saveGoodsList',
                payload: goodsList,
            });

            yield put({
                type: 'setProductDate',
                payload: goodsList,
            });
        },
        /* 设置全选 */
        *saveFormDataCheck({ payload }, { call, put, select }) {
            yield put({
                type: 'saveFormCheck',
                payload: [...payload],
            });
        },
        /* 商品列表 */
        * getProductList({ payload, pagination }, { call, put, select }) {
            const store = yield select(state => state.salesPromotion.store.store_id);
            yield put({
                type: 'changeLoading',
                payload: true,
            });

            let params = {};

            if (payload) {
                params = { ...payload };
                yield put({
                    type: 'saveProductSearch',
                    payload,
                });
            } else {
                const search = yield select(state => state.salesPromotion.productSearch);
                if (search) {
                    params = { ...search };
                }
            }
            if (pagination) {
                params = { ...params, ...pagination };
            }
            const response = yield call(ActivityService.getProductList, store, params);
            yield put({
                type: 'saveProductData',
                payload: response,
            });

            yield put({
                type: 'changeLoading',
                payload: false,
            });
        },
        /* 获取商品分类 */
        * getProductClass(_, { call, put }) {
            const response = yield call(ActivityService.getProductClass);
            yield put({ type: 'saveProductClass', payload: response, })
        },
        * changStatus({payload}, { call, put }) {
            console.log(payload.type)
            if(payload.type === '1') {
                const response = yield call(ActivityService.changeRestart, payload);
                if(response.status === 'ok'){
                    message.success('操作成功')
                }
            }else{
                const response = yield call(ActivityService.changePause, payload);
                if(response.status === 'ok'){
                    message.success('操作成功')
                }
            }
            yield put({ type: 'fetch' });

         

        },
        /* 提交和编辑 */
        *submit({ payload }, { call, put, select }) {
            yield put({
                type: 'changeSubmitting',
                payload: true,
            });

            const params = { ...payload };
            const formID = yield select(state => state.salesPromotion.formID);
            const store = yield select(state => state.salesPromotion.store.store_id);
            let response;
            if (formID && formID !== '') {
                const formDataId = yield select(state => state.salesPromotion.formData.discount_id);
                response = yield call(ActivityService.update, store, params, formDataId);
            } else {
                response = yield call(ActivityService.create, store, params);
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
                yield put({ type: 'fetch' });
                const formCallback = yield select(state => state.salesPromotion.formCallback);
                formCallback('ok');
            }
        },
        /* 删除活动 */
        *del({ payload }, { call, put }) {
            const response = yield call(ActivityService.del, payload.item);
            if (response.status === 'ok') {
                message.success('删除成功');
                yield put({ type: 'fetch' });
            }
        },
        *setProductDate({ payload }, { call, put }) {
            yield put({
                type: 'saveProductDate',
                payload: payload,
            });
        },
    },
    reducers: {
        // 渲染店铺信息
        setStore(state, { payload }) {
            return {
                ...state,
                store: payload.response[0].store,
                register: payload.response[0].register
            }
        },
        /* 加载 */
        changeLoading(state, { payload }) {
            return { ...state, loading: payload };
        },
        /* 搜索 */
        saveSearch(state, { payload }) {
            return { ...state, search: payload };
        },
        /* 商品分类搜索 */
        saveProductSearch(state, { payload }) {
            return { ...state, ProductSearch: payload };
        },
        /* 列表渲染 */
        saveData(state, { payload }) {
            return { ...state, data: payload };
        },
        /* 商品选择列表渲染 */
        saveProductData(state, { payload }) {
            return { ...state, ProductData: payload };
        },
        /* 模态框显示 */
        changeFormVisible(state, { payload }) {
            return { ...state, formVisible: payload };
        },
        /* 设置标题 */
        saveFormTitle(state, { payload }) {
            return { ...state, formTitle: payload };
        },
        /* 设置ID */
        saveFormID(state, { payload }) {
            return { ...state, formID: payload };
        },
        /* 设置表格 */
        saveFormData(state, { payload }) {
            return { ...state, formData: payload, formCheck: payload.goods_list };
        },
        saveFormCheck(state, { payload }) {
            return { ...state, formCheck: payload };
        },
        /* 未知 */
        saveMenuKeys(state, { payload }) {
            return { ...state, menuKeys: payload };
        },
        /* 商品分类模态框 */
        changeProductFormVisible(state, { payload }) {
            return { ...state, formproductVisible: payload };
        },
        /* 设置商品分类 */
        saveProductClass(state, { payload }) {
            return { ...state, productClass: payload };
        },
        /* 提交和编辑 */
        changeSubmitting(state, { payload }) {
            return { ...state, submitting: payload };
        },
        /* 输入框禁用 */
        saveProhibit(state, { payload }) {
            return { ...state, prohibit: payload };
        },
        /* 查看活动商城信息 */
        saveGoodsList(state, { payload }) {
            return { ...state, goodsList: payload };
        },
        /* 设置商品 */
        saveProductDate(state, { payload }) {
            return { ...state, ProductDataList: payload };
        },
    }
};
