import park from '@/services/s_parkstatistics';

export default {
  namespace: 'parkstatistics',

  state: {
    // userdata: {},
    // enterprisedata: {},
    enterprisedata: {
      all: 644,
      cate: [
        { name: '金融/营销', value: 103 },
        { name: '互联网', value: 96 },
        { name: '科技', value: 92 },
        { name: '建筑/工程', value: 53 },
        { name: '教育/培训/咨询', value: 28 },
        { name: '企事业单位', value: 25 },
        { name: '传媒', value: 24 },
        { name: '其他类', value: 223 },
      ],

      size: [
        { name: '大型', value: 218 },
        { name: '中型', value: 124 },
        { name: '小型', value: 94 },
        { name: '特大型', value: 84 },
        { name: '微型', value: 23 },
      ],
    },
    userdata: {
      age: [
        { name: '20-30', value: 10274 },
        { name: '30-40', value: 6421 },
        { name: '40-50', value: 5137 },
        { name: '50以上', value: 3855 },
      ],
      all: 25687,
      feman: 10275,
      man: 15412,
    },
    areadata: {},
    data: {
      name: 'A2-2',
      planned_use: 1,
      floor_area: 1000,
      usage_area: 998,
      Selling_area: 100,
      selling_rate: '69%',
      sold: 333,
      unsold: 777,
      palte_num: '5455',
    },
    buildingdata: [],
    loading: false,
    outhistroy: [
      {
        in: '2017-01-11',
        out: null,
        name: '山东蚂蚁有限公司',
        cate: '金融',
      },
      {
        in: '2017-01-11',
        out: '2017-08-12',
        name: '山东蚂蚁有限公司',
        cate: '金融',
      },
      {
        in: '2017-01-11',
        out: '2017-08-12',
        name: '山东蚂蚁有限公司',
        cate: '金融',
      },
    ],
    // 新的数据结构
    contentBasiaData: {},
    IndustryData: [],
    scaleData: [],
    startData: [],
  },

  effects: {
    // 新写的调用接口
    *fetchContentData(_, { call, put }) {
      const params = {
        q: 'data',
      };
      const ContenData = yield call(park.contentBasia, params);
      yield put({
        type: 'saveContentBasia',
        payload: ContenData,
      });
    },
    // 统计 园区行业分布
    *fetchIndustryData(_, { call, put }) {
      const params = {
        q: 'category',
      };
      function sortNumber(a, b) {
        return b.count - a.count;
      }
      const ContenData = yield call(park.IndustryData, params);
      // 显示行业前8个
      if (ContenData && ContenData.length > 0) {
        ContenData.sort(sortNumber);
      }
      const response = ContenData && ContenData.length > 10 ? ContenData.slice(0, 9) : ContenData;
      yield put({
        type: 'saveIndustryData',
        payload: response,
      });
    },
    // 统计园区企业规模分布
    *fetchScaleData(_, { call, put }) {
      const params = {
        q: 'size',
      };
      const ContenData = yield call(park.ScaleData, params);
      const responseData = [];
      if (ContenData && ContenData.length > 0) {
        ContenData.map(item => {
          return responseData.push({ name: item.name ? item.name : '其他', count: item.count });
        });
      }
      yield put({
        type: 'saveScaleData',
        payload: responseData,
      });
    },
    // 统计园区企业星级
    *fetchStartData(_, { call, put }) {
      const params = {
        q: 'credit',
      };
      const ContenData = yield call(park.StartData, params);
      yield put({
        type: 'saveStartData',
        payload: ContenData,
      });
    },
    // 旧的
    *fetchTotalUsers({ code }, { call, put }) {
      yield put({ type: 'saveLoading', payload: true });
      const response = yield call(park.totalUsers, code);
      yield put({
        type: 'saveUserdata',
        payload: response,
      });
      yield put({ type: 'saveLoading', payload: false });
    },
    *fetchTotalEnterprise({ code }, { call, put }) {
      yield put({ type: 'saveLoading', payload: true });
      const response = yield call(park.totalEnterprise, code);
      yield put({
        type: 'saveEnterprisedata',
        payload: response,
      });
      yield put({ type: 'saveLoading', payload: false });
    },
    *fetchTotalAreae({ code }, { call, put }) {
      yield put({ type: 'saveLoading', payload: true });
      const response = yield call(park.totalArea, code);
      yield put({
        type: 'saveTotalArea',
        payload: response,
      });
      yield put({ type: 'saveLoading', payload: false });
    },
    *fetchTotalBuilding({ code }, { call, put }) {
      yield put({ type: 'saveLoading', payload: true });
      const response = yield call(park.totalBuilding, code);
      yield put({
        type: 'saveTotalBuilding',
        payload: response,
      });
      yield put({ type: 'saveLoading', payload: false });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
    saveUserdata(state, { payload }) {
      return {
        ...state,
        userdata: payload,
      };
    },
    saveEnterprisedata(state, { payload }) {
      return {
        ...state,
        enterprisedata: payload,
      };
    },
    saveTotalArea(state, { payload }) {
      return {
        ...state,
        areadata: payload,
      };
    },
    saveTotalBuilding(state, { payload }) {
      return {
        ...state,
        buildingdata: payload,
      };
    },
    saveLoading(state, { payload }) {
      return {
        ...state,
        loading: payload,
      };
    },
    saveContentBasia(state, { payload }) {
      return {
        ...state,
        contentBasiaData: payload,
      };
    },
    saveIndustryData(state, { payload }) {
      return {
        ...state,
        IndustryData: payload,
      };
    },
    saveScaleData(state, { payload }) {
      return {
        ...state,
        scaleData: payload,
      };
    },
    saveStartData(state, { payload }) {
      return {
        ...state,
        startData: payload,
      };
    },
  },
};
