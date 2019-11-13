import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from 'D:/workspace/ant-smartpark-web/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    "path": "/user",
    "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../../layouts/UserLayout'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../../layouts/UserLayout').default,
    "routes": [
      {
        "path": "/user",
        "redirect": "/user/login",
        "exact": true
      },
      {
        "path": "/user/login",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Login/Index'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Login/Index').default,
        "exact": true
      },
      {
        "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/cockpitm",
    "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../../layouts/ModalLayout'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../../layouts/ModalLayout').default,
    "routes": [
      {
        "path": "/cockpitm",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Cockpit/CockpitM'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Cockpit/CockpitM').default,
        "exact": true
      },
      {
        "path": "/cockpitm/2",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../ParkEnergyConsumption/ParkEnergyConsumption'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../ParkEnergyConsumption/ParkEnergyConsumption').default,
        "exact": true
      },
      {
        "path": "/cockpitm/3",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Cockpit/YQJingYing'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Cockpit/YQJingYing').default,
        "exact": true
      },
      {
        "path": "/cockpitm/4",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Cockpit/CLLMonitor'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Cockpit/CLLMonitor').default,
        "exact": true
      },
      {
        "path": "/cockpitm/5",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../ParkOverview/StatisticsHumanData'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../ParkOverview/StatisticsHumanData').default,
        "exact": true
      },
      {
        "path": "/cockpitm/videomonitor",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Cockpit/VideoMonitor'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Cockpit/VideoMonitor').default,
        "routes": [
          {
            "path": "/cockpitm/videomonitor",
            "redirect": "/cockpitm/videomonitor/dianti",
            "exact": true
          },
          {
            "path": "/cockpitm/videomonitor/dianti",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Cockpit/TKMonitor'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Cockpit/TKMonitor').default,
            "exact": true
          },
          {
            "path": "/cockpitm/videomonitor/lukou",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Cockpit/LKMonitor'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Cockpit/LKMonitor').default,
            "exact": true
          },
          {
            "path": "/cockpitm/videomonitor/shangqu",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Cockpit/SQMonitor'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Cockpit/SQMonitor').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/cockpitm/zsprocess",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Cockpit/ZSProcess'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Cockpit/ZSProcess').default,
        "routes": [
          {
            "path": "/cockpitm/zsprocess",
            "redirect": "/cockpitm/zsprocess/jingzhun",
            "exact": true
          },
          {
            "path": "/cockpitm/zsprocess/jingzhun",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../PrecisionInvestment/PrecisionInvestmentNew'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../PrecisionInvestment/PrecisionInvestmentNew').default,
            "exact": true
          },
          {
            "path": "/cockpitm/zsprocess/guocheng",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Cockpit/ZSProcess/Process'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Cockpit/ZSProcess/Process').default,
            "exact": true
          },
          {
            "path": "/cockpitm/zsprocess/ruzhu",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../CompanyEnter'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../CompanyEnter').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/cockpitm/parkview",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Building/Building'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Building/Building').default,
        "exact": true
      },
      {
        "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../../layouts/AdminLayout'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../../layouts/AdminLayout').default,
    "routes": [
      {
        "path": "/",
        "redirect": "/dashboard",
        "exact": true
      },
      {
        "path": "/dashboard",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Dashboard/Home'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Dashboard/Home').default,
        "exact": true
      },
      {
        "path": "/example",
        "routes": [
          {
            "path": "/example/demo",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Demo/DemoList'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Demo/DemoList').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/parklist",
        "routes": [
          {
            "path": "/parklist/parklist",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../ParkListContent/ParkListContent'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../ParkListContent/ParkListContent').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/building",
        "routes": [
          {
            "path": "/building/building",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Building/Building'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Building/Building').default,
            "exact": true
          },
          {
            "path": "/building/building2",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Building/ParkView'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Building/ParkView').default,
            "exact": true
          },
          {
            "path": "/building/floorframe/:id",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Building/FloorFrame/FloorFrame'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Building/FloorFrame/FloorFrame').default,
            "exact": true
          },
          {
            "path": "/building/housingquery",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Building/HousingQuery/HousingQuery'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Building/HousingQuery/HousingQuery').default,
            "exact": true
          },
          {
            "path": "/building/parkstatistics",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Building/ParkStatistics/ParkStatistics'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Building/ParkStatistics/ParkStatistics').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/zone",
        "routes": [
          {
            "path": "/zone/device/gate",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Building/Device/Gate'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Building/Device/Gate').default,
            "exact": true
          },
          {
            "path": "/zone/device/electricMeters",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Building/Device/ElectricMeters'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Building/Device/ElectricMeters').default,
            "exact": true
          },
          {
            "path": "/zone/device/videoEquipment",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Building/Device/VideoEquipment'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Building/Device/VideoEquipment').default,
            "exact": true
          },
          {
            "path": "/zone/device/videoShow",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Building/Device/MonitorShow/List'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Building/Device/MonitorShow/List').default,
            "exact": true
          },
          {
            "path": "/zone/device/monitor_show",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Building/Device/MonitorShow/List'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Building/Device/MonitorShow/List').default,
            "exact": true
          },
          {
            "path": "/zone/device/videoThirdSystem",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Building/Device/VideoThirdSystem'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Building/Device/VideoThirdSystem').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/finance",
        "routes": [
          {
            "path": "/finance/electricRecharge",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Finance/ElectricRecharge'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Finance/ElectricRecharge').default,
            "exact": true
          },
          {
            "path": "/finance/electricRechargeDetail",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Finance/ElectricRechargeDetail'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Finance/ElectricRechargeDetail').default,
            "exact": true
          },
          {
            "path": "/finance/electricRechargeDetailAbnormal",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Finance/ElectricRechargeDetailAbnormal'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Finance/ElectricRechargeDetailAbnormal').default,
            "exact": true
          },
          {
            "path": "/finance/invoicePayable",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Finance/InvoicePayable'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Finance/InvoicePayable').default,
            "exact": true
          },
          {
            "path": "/finance/invoicesManagement",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Finance/InvoicesManagement'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Finance/InvoicesManagement').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/malls",
        "routes": [
          {
            "path": "/malls/store",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Mall/StoreManage'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Mall/StoreManage').default,
            "exact": true
          },
          {
            "path": "/malls/commodity",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Mall/CommodityManagement'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Mall/CommodityManagement').default,
            "exact": true
          },
          {
            "path": "/malls/category",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Mall/CommodityClassificationManagement'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Mall/CommodityClassificationManagement').default,
            "exact": true
          },
          {
            "path": "/malls/storeApply",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Mall/ShopApplicationReview'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Mall/ShopApplicationReview').default,
            "exact": true
          },
          {
            "path": "/malls/storeChange",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Mall/ShopChangeAudit'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Mall/ShopChangeAudit').default,
            "exact": true
          },
          {
            "path": "/malls/storeorder",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Mall/OrderManagement'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Mall/OrderManagement').default,
            "exact": true
          },
          {
            "path": "/malls/recommend",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Mall/HomeRecommendedMerchandiseManagement'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Mall/HomeRecommendedMerchandiseManagement').default,
            "exact": true
          },
          {
            "path": "/malls/group",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Mall/HomePageGroupingManagement'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Mall/HomePageGroupingManagement').default,
            "exact": true
          },
          {
            "path": "/malls/storeApplyserve",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Mall/Store/StoreApply'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Mall/Store/StoreApply').default,
            "exact": true
          },
          {
            "path": "/malls/storeInfo",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Mall/Store/BasicInfo'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Mall/Store/BasicInfo').default,
            "exact": true
          },
          {
            "path": "/malls/storeChangeserve",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Mall/Store/StoreChange'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Mall/Store/StoreChange').default,
            "exact": true
          },
          {
            "path": "/malls/product",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Mall/ProductManagement/CommodityManagement'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Mall/ProductManagement/CommodityManagement').default,
            "exact": true
          },
          {
            "name": "订单管理",
            "path": "/malls/order",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Mall/orderManagement/orderManagement'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Mall/orderManagement/orderManagement').default,
            "exact": true
          },
          {
            "name": "促销活动",
            "path": "/malls/activity",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Mall/SalesPromotion/SalesPromotion'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Mall/SalesPromotion/SalesPromotion').default,
            "exact": true
          },
          {
            "path": "/malls/merchantsstatistics",
            "name": "店铺统计分析",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Mall/MerchantsStatistics/MerchantsStatistics'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Mall/MerchantsStatistics/MerchantsStatistics').default,
            "exact": true
          },
          {
            "path": "/malls/phonecode",
            "name": "商家绑定手机号",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Mall/BusinessBindingMobile/BusinessBindingMobile'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Mall/BusinessBindingMobile/BusinessBindingMobile').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/enterprise",
        "routes": [
          {
            "path": "/enterprise/enterpriseAuit",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Enterprise/EnterpriseAudit/EnterpriseAudit'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Enterprise/EnterpriseAudit/EnterpriseAudit').default,
            "exact": true
          },
          {
            "path": "/enterprise/enterpriseinfo",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Enterprise/EnterpriseInfo/EnterpriseInfo'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Enterprise/EnterpriseInfo/EnterpriseInfo').default,
            "exact": true
          },
          {
            "path": "/enterprise/enterpriseedit",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Enterprise/EnterpriseEdit/EnterpriseEdit'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Enterprise/EnterpriseEdit/EnterpriseEdit').default,
            "exact": true
          },
          {
            "path": "/enterprise/enterpriseapply",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Enterprise/EnterpriseApply/EnterpriseApply'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Enterprise/EnterpriseApply/EnterpriseApply').default,
            "exact": true
          },
          {
            "path": "/enterprise/enterprisedepartment",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Enterprise/EnterpriseDepartment/EnterpriseDepartment'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Enterprise/EnterpriseDepartment/EnterpriseDepartment').default,
            "exact": true
          },
          {
            "path": "/enterprise/authcode",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Enterprise/AuthCode/AuthCodeList'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Enterprise/AuthCode/AuthCodeList').default,
            "exact": true
          },
          {
            "path": "/enterprise/enterpriselist",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Enterprise/EnterpriseManage/EnterpriseList'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Enterprise/EnterpriseManage/EnterpriseList').default,
            "exact": true
          },
          {
            "path": "/enterprise/technicalTransaction",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Enterprise/TechnicalTransaction'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Enterprise/TechnicalTransaction').default,
            "exact": true
          },
          {
            "path": "/enterprise/enterpriseMeter",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Enterprise/EnterpriseMeter'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Enterprise/EnterpriseMeter').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "信息发布",
        "path": "/cms-manage",
        "routes": [
          {
            "name": "互动类型管理",
            "path": "/cms-manage/inttype",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Interaction/InteractionType'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Interaction/InteractionType').default,
            "exact": true
          },
          {
            "name": "栏目管理",
            "path": "/cms-manage/columns",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../ColumnManage/ColumnManageList'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../ColumnManage/ColumnManageList').default,
            "exact": true
          },
          {
            "name": "信息管理",
            "path": "/cms-manage/infos",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../InfoManage/InfoManageList'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../InfoManage/InfoManageList').default,
            "exact": true
          },
          {
            "name": "信息组管理",
            "path": "/cms-manage/groups",
            "routes": [
              {
                "name": "信息组管理",
                "path": "/cms-manage/groups/",
                "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../GroupManage/GroupManageList'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../GroupManage/GroupManageList').default,
                "exact": true
              },
              {
                "name": "信息组信息管理",
                "path": "/cms-manage/groups/:groupid/infos",
                "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../GroupManage/GroupInfoManageList'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../GroupManage/GroupInfoManageList').default,
                "exact": true
              },
              {
                "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "name": "",
            "path": "/cms-manage/",
            "exact": true
          },
          {
            "name": "招商信息",
            "path": "/cms-manage/zsxx",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../ZsxxManage/ZsxxManageList'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../ZsxxManage/ZsxxManageList').default,
            "exact": true
          },
          {
            "name": "栏目信息管理",
            "path": "/cms-manage/columninfos/:columnid",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../ColumnInfoManage/ColumnInfoManageList'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../ColumnInfoManage/ColumnInfoManageList').default,
            "exact": true
          },
          {
            "name": "栏目信息管理2",
            "path": "/cms-manage/columninfos/:columnid/:listmode",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../ColumnInfoManage/ColumnInfoManageList'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../ColumnInfoManage/ColumnInfoManageList').default,
            "exact": true
          },
          {
            "name": "展板管理",
            "path": "/cms-manage/board/:type",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Board/BoardMain'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Board/BoardMain').default,
            "exact": true
          },
          {
            "name": "反馈建议",
            "path": "/cms-manage/feedback",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Feedback/FeedbackManage'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Feedback/FeedbackManage').default,
            "exact": true
          },
          {
            "name": "投诉举报",
            "path": "/cms-manage/report",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      app: require('@tmp/dva').getApp(),
models: () => [
  import('D:/workspace/ant-smartpark-web/src/pages/ReportManage/models/m_target.js').then(m => { return { namespace: 'm_target',...m.default}})
],
      component: () => import('../ReportManage/ReportManage'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../ReportManage/ReportManage').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "租赁信息审核",
        "path": "/lease-audit",
        "routes": [
          {
            "name": "租赁信息审核",
            "path": "/lease-audit/",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../LeaseAudit/LeaseAuditList'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../LeaseAudit/LeaseAuditList').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "通知发布",
        "path": "/notice",
        "routes": [
          {
            "name": "通知发布",
            "path": "/notice/release",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../NoticeRelease/NoticeRelease'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../NoticeRelease/NoticeRelease').default,
            "exact": true
          },
          {
            "name": "通知发布",
            "path": "/notice/notification",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Notification/NotifList'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Notification/NotifList').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/personnel",
        "routes": [
          {
            "path": "/personnel/personnelinfo",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Personnel/PersonnelInfo'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Personnel/PersonnelInfo').default,
            "exact": true
          },
          {
            "path": "/personnel/personneledit",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Personnel/PersonnelInfoEdit'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Personnel/PersonnelInfoEdit').default,
            "exact": true
          },
          {
            "path": "/personnel/personnellist",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../Personnel/PersonnelList'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../Personnel/PersonnelList').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/electricityfee",
        "routes": [
          {
            "path": "/electricityfee/electricityfeelist",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../ElectricityFee/ElectricityFeeList'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../ElectricityFee/ElectricityFeeList').default,
            "exact": true
          },
          {
            "path": "/electricityfee/powderdetail",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../ElectricityFee/PowderDetail'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../ElectricityFee/PowderDetail').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import('../404'),
      LoadingComponent: require('D:/workspace/ant-smartpark-web/src/components/PageLoading/index').default,
    })
    : require('../404').default,
    "exact": true
  },
  {
    "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
history.listen(routeChangeHandler);
routeChangeHandler(history.location);

export { routes };

export default function RouterWrapper(props = {}) {
  return (
<RendererWrapper0>
          <Router history={history}>
      { renderRoutes(routes, props) }
    </Router>
        </RendererWrapper0>
  );
}
