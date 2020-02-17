export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './Login/Index' },
    ],
  },
  {
    path: '/cockpitm',
    component: '../layouts/ModalLayout',
    routes: [
      { path: '/cockpitm', component: './Cockpit/CockpitM' },
      { path: '/cockpitm/2', component: './ParkEnergyConsumption/ParkEnergyConsumption' },
      { path: '/cockpitm/3', component: './Cockpit/YQJingYing' }, // 能耗分析
      { path: '/cockpitm/4', component: './Cockpit/CLLMonitor' }, // 车流分析
      { path: '/cockpitm/5', component: './ParkOverview/StatisticsHumanData' }, // 人流量分析
      {
        path: '/cockpitm/videomonitor',
        component: './Cockpit/VideoMonitor',
        routes: [
          { path: '/cockpitm/videomonitor', redirect: '/cockpitm/videomonitor/dianti' },
          {
            path: '/cockpitm/videomonitor/dianti',
            component: './Cockpit/TKMonitor',
          },
          {
            path: '/cockpitm/videomonitor/lukou',
            component: './Cockpit/LKMonitor',
          },
          {
            path: '/cockpitm/videomonitor/shangqu',
            component: './Cockpit/SQMonitor',
          },
        ],
      }, // 视频监控
      {
        path: '/cockpitm/zsprocess',
        component: './Cockpit/ZSProcess',
        routes: [
          { path: '/cockpitm/zsprocess', redirect: '/cockpitm/zsprocess/jingzhun' },
          {
            path: '/cockpitm/zsprocess/jingzhun',
            component: './PrecisionInvestment/PrecisionInvestmentNew',
          },
          {
            path: '/cockpitm/zsprocess/guocheng',
            component: './Cockpit/ZSProcess/Process',
          },
          {
            path: '/cockpitm/zsprocess/ruzhu',
            component: './CompanyEnter',
          },
        ],
      }, // 精准招商
      // { path: '/cockpitm/parkview', component: './Building/Building' }, // 园区一览
    ],
  },
  {
    path: '/building/building',
    component: '../layouts/AdminLayout',
    routes: [{ path: '/building/building', component: './Building/Building' }],
  },
  {
    path: '/',
    component: '../layouts/AdminLayout',
    routes: [
      { path: '/', redirect: '/dashboard' },
      { path: '/dashboard', component: './Dashboard/Home' },
      {
        path: '/example',
        routes: [{ path: '/example/demo', component: './Demo/DemoList' }],
      },
      {
        path: '/parklist',
        routes: [{ path: '/parklist/parklist', component: './ParkListContent/ParkListContent' }],
      },
      {
        path: '/building',
        routes: [
          // { path: '/building/building', component: './Building/Building' },
          // { path: '/building/building2', component: './Building/ParkView' },
          { path: '/building/floorframe/:id', component: './Building/FloorFrame/FloorFrame' },
          { path: '/building/housingquery', component: './Building/HousingQuery/HousingQuery' },
          {
            path: '/building/parkstatistics',
            component: './Building/ParkStatistics/ParkStatistics',
          },
        ],
      },
      {
        path: '/zone',
        routes: [
          // 门禁设备管理
          { path: '/zone/device/gate', component: './Building/Device/Gate' },
          // 电表设备管理
          { path: '/zone/device/electricMeters', component: './Building/Device/ElectricMeters' },
          // 视频设备管理
          { path: '/zone/device/videoEquipment', component: './Building/Device/VideoEquipment' },
          // 视频展示
          { path: '/zone/device/videoShow', component: './Building/Device/MonitorShow/List' },
          { path: '/zone/device/monitor_show', component: './Building/Device/MonitorShow/List' },
          // 视频第三方系统管理
          {
            path: '/zone/device/videoThirdSystem',
            component: './Building/Device/VideoThirdSystem',
          },
        ],
      },
      {
        path: '/finance',
        routes: [
          // 电费充值记录
          { path: '/finance/electricRecharge', component: './Finance/ElectricRecharge' },
          // 电表缴费流水(第三方)
          {
            path: '/finance/electricRechargeDetail',
            component: './Finance/ElectricRechargeDetail',
          },
          // 电表缴费异常流水(第三方)
          {
            path: '/finance/electricRechargeDetailAbnormal',
            component: './Finance/ElectricRechargeDetailAbnormal',
          },
          // 企业发票抬头管理
          {
            path: '/finance/invoicePayable',
            component: './Finance/InvoicePayable',
          }, // 已开发票管理
          {
            path: '/finance/invoicesManagement',
            component: './Finance/InvoicesManagement',
          },
        ],
      },
      {
        path: '/malls',
        routes: [
          { path: '/malls/store', component: './Mall/StoreManage' }, // 商铺管理
          { path: '/malls/commodity', component: './Mall/CommodityManagement' }, // 商品管理
          { path: '/malls/category', component: './Mall/CommodityClassificationManagement' }, // 分类管理
          { path: '/malls/storeApply', component: './Mall/ShopApplicationReview' }, // 商铺审核管理
          { path: '/malls/storeChange', component: './Mall/ShopChangeAudit' }, // 商铺变更审核
          { path: '/malls/storeorder', component: './Mall/OrderManagement' }, // 订单管理-平台
          { path: '/malls/recommend', component: './Mall/HomeRecommendedMerchandiseManagement' }, // 首页推荐商品管理
          { path: '/malls/group', component: './Mall/HomePageGroupingManagement' }, // 首页分组管理
          { path: '/malls/storeApplyserve', component: './Mall/Store/StoreApply' }, // 开店申请
          { path: '/malls/storeInfo', component: './Mall/Store/BasicInfo' }, // 店铺基本信息
          { path: '/malls/storeChangeserve', component: './Mall/Store/StoreChange' }, // 注册信息变更
          { path: '/malls/product', component: './Mall/ProductManagement/CommodityManagement' }, // 商品管理
          {
            name: '订单管理',
            path: '/malls/order',
            component: './Mall/orderManagement/orderManagement',
          },
          {
            name: '促销活动',
            path: '/malls/activity',
            component: './Mall/SalesPromotion/SalesPromotion',
          },
          {
            path: '/malls/merchantsstatistics',
            name: '店铺统计分析',
            component: './Mall/MerchantsStatistics/MerchantsStatistics',
          },
          {
            path: '/malls/phonecode',
            name: '商家绑定手机号',
            component: './Mall/BusinessBindingMobile/BusinessBindingMobile',
          },
          {
            path: '/malls/generalsetting',
            name: '通用设置',
            component: './Mall/Store/GeneralSetting',
          },
          { path: '/malls/shoplist', name: '店铺列表', component: './Mall/Store/ShopList' },
          // { path:'/malls/shopcreate', name:'店铺创建', component: './Mall/Store/ShopCreate' },
        ],
      },
      {
        path: '/enterprise',
        routes: [
          {
            path: '/enterprise/enterpriseAuit',
            component: './Enterprise/EnterpriseAudit/EnterpriseAudit',
          }, // 企业审核
          {
            path: '/enterprise/enterpriseinfo',
            component: './Enterprise/EnterpriseInfo/EnterpriseInfo',
          }, // 企业基本信息查看
          {
            path: '/enterprise/enterpriseedit',
            component: './Enterprise/EnterpriseEdit/EnterpriseEdit',
          }, // 企业基本信息编辑
          {
            path: '/enterprise/enterpriseapply',
            component: './Enterprise/EnterpriseApply/EnterpriseApply',
          }, // 企业基本信息申请
          {
            path: '/enterprise/enterprisedepartment',
            component: './Enterprise/EnterpriseDepartment/EnterpriseDepartment',
          }, // 企业部门管理
          {
            path: '/enterprise/authcode',
            component: './Enterprise/AuthCode/AuthCodeList',
          }, // 企业认证码
          {
            path: '/enterprise/enterpriselist',
            component: './Enterprise/EnterpriseManage/EnterpriseList',
          }, // 企业信息管理
          {
            path: '/enterprise/technicalTransaction',
            component: './Enterprise/TechnicalTransaction',
          }, // 技术成果交易管理
          // 当前企业电表管理
          {
            path: '/enterprise/enterpriseMeter',
            component: './Enterprise/EnterpriseMeter',
          },
        ],
      },

      {
        name: '信息发布',
        path: '/cms-manage',
        routes: [
          {
            name: '互动类型管理',
            path: '/cms-manage/inttype',
            component: './Interaction/InteractionType',
          },
          {
            name: '栏目管理',
            path: '/cms-manage/columns',
            component: './ColumnManage/ColumnManageList',
          },
          {
            name: '信息管理',
            path: '/cms-manage/infos',
            component: './InfoManage/InfoManageList',
          },
          {
            name: '信息组管理',
            path: '/cms-manage/groups',
            routes: [
              {
                name: '信息组管理',
                path: '/cms-manage/groups/',
                component: './GroupManage/GroupManageList',
              },
              {
                name: '信息组信息管理',
                path: '/cms-manage/groups/:groupid/infos',
                component: './GroupManage/GroupInfoManageList',
              },
            ],
          },
          {
            name: '',
            path: '/cms-manage/',
          },
          {
            name: '招商信息',
            path: '/cms-manage/zsxx',
            component: './ZsxxManage/ZsxxManageList',
          },
          {
            name: '栏目信息管理',
            path: '/cms-manage/columninfos/:columnid',
            component: './ColumnInfoManage/ColumnInfoManageList',
          },
          {
            name: '栏目信息管理2',
            path: '/cms-manage/columninfos/:columnid/:listmode',
            component: './ColumnInfoManage/ColumnInfoManageList',
          },
          // {
          //   // 20190301 新增，针对目前不支持的功能菜单，只显示占位图片
          //   name: '栏目信息管理3',
          //   path: '/cms-manage/dashboard/:columnid',
          //   component: './Dashboard/index',
          // },
          {
            name: '展板管理',
            path: '/cms-manage/board/:type',
            component: './Board/BoardMain',
          },
          {
            name: '反馈建议',
            path: '/cms-manage/feedback',
            component: './Feedback/FeedbackManage',
          },
          {
            name: '投诉举报',
            path: '/cms-manage/report',
            component: './ReportManage/ReportManage',
          },
        ],
      },
      {
        name: '租赁信息审核',
        path: '/lease-audit',
        routes: [
          {
            name: '租赁信息审核',
            path: '/lease-audit/',
            component: './LeaseAudit/LeaseAuditList',
          },
        ],
      },
      {
        name: '通知发布',
        path: '/notice',
        routes: [
          {
            name: '通知发布',
            path: '/notice/release',
            component: './NoticeRelease/NoticeRelease',
          },
          {
            name: '通知发布',
            path: '/notice/notification',
            component: './Notification/NotifList',
          },
        ],
      },
      {
        path: '/personnel',
        routes: [
          {
            path: '/personnel/personnelinfo',
            component: './Personnel/PersonnelInfo',
          }, // 企业员工基本信息查看
          {
            path: '/personnel/personneledit',
            component: './Personnel/PersonnelInfoEdit',
          }, // 企业员工基本信息编辑
          {
            path: '/personnel/personnellist',
            component: './Personnel/PersonnelList',
          }, // 企业员工信息管理
        ],
      },
      {
        path: '/electricityfee',
        routes: [
          {
            path: '/electricityfee/electricityfeelist',
            component: './ElectricityFee/ElectricityFeeList',
          },
          {
            path: '/electricityfee/powderdetail',
            component: './ElectricityFee/PowderDetail',
          },
          {
            path: '/electricityfee/propertyauthority',
            component: './PropertyAuthorityManag/List',
          },
          {
            path: '/electricityfee/paytext',
            component: './PayText/PayText',
          },
        ],
      },
      {
        path: '/shopmall',
        routes: [
          {
            path: '/shopmall/shopmanage',
            name: '商铺管理', // 运营人员
            component: './ShopMall/MallOperation/ShopManage/List',
          },
          {
            path: '/shopmall/shopexaminelist', // 审核
            name: '商铺审核',
            component: './ShopMall/MallOperation/ShopExamine/List',
          },
          {
            path: '/shopmall/shopcurrentinfo', // 查看信息
            name: '商铺基本信息维护',
            component: './ShopMall/MallOperation/ShopManage/CurrentInfo',
          },
        ],
      },
      {
        path: '/coupon',
        routes: [
          {
            path: '/coupon/couponseller/list',
            name: '优惠券管理', // 运营人员--优惠券管理
            component: './Coupon/CouponSeller/CouponList',
          },
          {
            path: '/coupon/couponseller/refundlist',
            name: '退券审核管理', // 运营人员--退券审核管理
            component: './Coupon/CouponSeller/RefundList',
          },
          {
            path: '/coupon/couponseller/couponexaminelist',
            name: '优惠券审核管理', // 运营人员--优惠券审核管理
            component: './Coupon/CouponSeller/CouponExamine',
          },
          {
            path: '/coupon/couponseller/purchaseorderlist',
            name: '优惠券购买订单查询', // 运营人员--优惠券购买订单查询
            component: './Coupon/CouponSeller/Order/PurchaseOrder',
          },
          {
            path: '/coupon/couponseller/paymentorderlist',
            name: '支付订单查询', // 运营人员--支付订单查询
            component: './Coupon/CouponSeller/Order/PaymentOrder',
          },
          {
            path: '/coupon/couponseller/refundorderlist',
            name: '退券订单查询', // 运营人员--支付订单查询
            component: './Coupon/CouponSeller/Order/RefundOrder',
          },
        ],
      },
      {
        path: '/advertis',
        routes: [
          {
            path: '/advertis/agent/list', // 广告管理---代理商管理
            name: '代理商管理',
            component: './Advertisment/Agent/List',
          },
          {
            path: '/advertis/advertiser/list', // 广告管理---广告主管理
            name: '广告主管理',
            component: './Advertisment/Advertiser/List',
          },
          {
            path: '/advertis/advertiscreativegroup/list', // 广告管理---广告创意组管理
            name: '广告创意组管理',
            component: './Advertisment/AdvertisCreativeGroup/List',
          },
          {
            path: '/advertis/advertispromotion/list', // 广告管理---广告投放管理
            name: '广告投放管理',
            component: './Advertisment/AdvertisPromotion/List',
          },
          {
            path: '/advertis/advertisreview/list', // 广告管理---广告投放审核管理
            name: '广告推广审核管理',
            component: './Advertisment/AdvertisReview/List',
          },
          {
            path: '/advertis/advertposition/list', // 广告管理---广告位管理
            name: '广告位管理',
            component: './Advertisment/AdvertPosition/List',
          },
          {
            path: '/advertis/advertisreleaseList/list', // 广告管理---广告推广发布管理
            name: '广告推广发布管理',
            component: './Advertisment/AdvertisRelease/AdvertisRelease',
          },
          {
            path: '/advertis/advertissetting/list', // 广告管理---广告推广设置
            name: '广告推广设置',
            component: './Advertisment/AdvertisSetting/AdvertisSetting',
          },
        ],
      },
      {        
        path: '/buildconstru',
        name: '建筑管理',
        routes: [{
          path: '/buildconstru', // 建筑管理
          name: '建筑管理',
          component: './BuildConstru/BuildConstruList',
        },
        ],
      },
      {        
        path: '/facedata',
        name: '平台用户管理',
        routes: [{
          path: '/facedata', // 人脸数据维护
          name: '平台用户管理',
          component: './FaceEntry/FaceEntry',
        },
        ],
      },
      {path:'/epidemic',
      name:'疫情数据',
      routes:[{
        path:'/epidemic/epidemicemployeeinfo',
        name:'员工基本信息查询',
        component:'./Epidemicemployee/EpidemicemployeeInfo/EpidemicemployeeInfo',
      },
      
      {
        path:'/epidemic/dailyhealth',
        name:'员工每日健康',
        component:'./Epidemicemployee/DailyHealth/DailyHealth',
      },
      {
        path:'/epidemic/epidemicemployee',
        name:'企业复工情况',
        component:'./Epidemicemployee/StatisticsEnterprisesWork/StatisticsEnterprisesList',
        
      },
    ],

      },
    ],
  },

  {
    component: '404',
  },
];
