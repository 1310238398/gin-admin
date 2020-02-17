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
      
      component: () => import(/* webpackChunkName: "layouts__UserLayout" */'../../layouts/UserLayout'),
      
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
      
      component: () => import(/* webpackChunkName: "p__Login__Index" */'../Login/Index'),
      
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
      
      component: () => import(/* webpackChunkName: "layouts__ModalLayout" */'../../layouts/ModalLayout'),
      
    })
    : require('../../layouts/ModalLayout').default,
    "routes": [
      {
        "path": "/cockpitm",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "p__Cockpit__CockpitM" */'../Cockpit/CockpitM'),
      
    })
    : require('../Cockpit/CockpitM').default,
        "exact": true
      },
      {
        "path": "/cockpitm/2",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "p__ParkEnergyConsumption__ParkEnergyConsumption" */'../ParkEnergyConsumption/ParkEnergyConsumption'),
      
    })
    : require('../ParkEnergyConsumption/ParkEnergyConsumption').default,
        "exact": true
      },
      {
        "path": "/cockpitm/3",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "p__Cockpit__YQJingYing" */'../Cockpit/YQJingYing'),
      
    })
    : require('../Cockpit/YQJingYing').default,
        "exact": true
      },
      {
        "path": "/cockpitm/4",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "p__Cockpit__CLLMonitor" */'../Cockpit/CLLMonitor'),
      
    })
    : require('../Cockpit/CLLMonitor').default,
        "exact": true
      },
      {
        "path": "/cockpitm/5",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "p__ParkOverview__StatisticsHumanData" */'../ParkOverview/StatisticsHumanData'),
      
    })
    : require('../ParkOverview/StatisticsHumanData').default,
        "exact": true
      },
      {
        "path": "/cockpitm/videomonitor",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "p__Cockpit__VideoMonitor" */'../Cockpit/VideoMonitor'),
      
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
      
      component: () => import(/* webpackChunkName: "p__Cockpit__VideoMonitor" */'../Cockpit/TKMonitor'),
      
    })
    : require('../Cockpit/TKMonitor').default,
            "exact": true
          },
          {
            "path": "/cockpitm/videomonitor/lukou",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "p__Cockpit__VideoMonitor" */'../Cockpit/LKMonitor'),
      
    })
    : require('../Cockpit/LKMonitor').default,
            "exact": true
          },
          {
            "path": "/cockpitm/videomonitor/shangqu",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "p__Cockpit__VideoMonitor" */'../Cockpit/SQMonitor'),
      
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
      
      component: () => import(/* webpackChunkName: "p__Cockpit__ZSProcess" */'../Cockpit/ZSProcess'),
      
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
      
      component: () => import(/* webpackChunkName: "p__Cockpit__ZSProcess" */'../PrecisionInvestment/PrecisionInvestmentNew'),
      
    })
    : require('../PrecisionInvestment/PrecisionInvestmentNew').default,
            "exact": true
          },
          {
            "path": "/cockpitm/zsprocess/guocheng",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "p__Cockpit__ZSProcess" */'../Cockpit/ZSProcess/Process'),
      
    })
    : require('../Cockpit/ZSProcess/Process').default,
            "exact": true
          },
          {
            "path": "/cockpitm/zsprocess/ruzhu",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "p__Cockpit__ZSProcess" */'../CompanyEnter'),
      
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
        "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/building/building",
    "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../../layouts/AdminLayout'),
      
    })
    : require('../../layouts/AdminLayout').default,
    "routes": [
      {
        "path": "/building/building",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "p__Building__Building" */'../Building/Building'),
      
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
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../../layouts/AdminLayout'),
      
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
      
      component: () => import(/* webpackChunkName: "p__Dashboard__Home" */'../Dashboard/Home'),
      
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
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Demo/DemoList'),
      
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
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../ParkListContent/ParkListContent'),
      
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
            "path": "/building/floorframe/:id",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Building/FloorFrame/FloorFrame'),
      
    })
    : require('../Building/FloorFrame/FloorFrame').default,
            "exact": true
          },
          {
            "path": "/building/housingquery",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Building/HousingQuery/HousingQuery'),
      
    })
    : require('../Building/HousingQuery/HousingQuery').default,
            "exact": true
          },
          {
            "path": "/building/parkstatistics",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Building/ParkStatistics/ParkStatistics'),
      
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
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Building/Device/Gate'),
      
    })
    : require('../Building/Device/Gate').default,
            "exact": true
          },
          {
            "path": "/zone/device/electricMeters",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Building/Device/ElectricMeters'),
      
    })
    : require('../Building/Device/ElectricMeters').default,
            "exact": true
          },
          {
            "path": "/zone/device/videoEquipment",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Building/Device/VideoEquipment'),
      
    })
    : require('../Building/Device/VideoEquipment').default,
            "exact": true
          },
          {
            "path": "/zone/device/videoShow",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Building/Device/MonitorShow/List'),
      
    })
    : require('../Building/Device/MonitorShow/List').default,
            "exact": true
          },
          {
            "path": "/zone/device/monitor_show",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Building/Device/MonitorShow/List'),
      
    })
    : require('../Building/Device/MonitorShow/List').default,
            "exact": true
          },
          {
            "path": "/zone/device/videoThirdSystem",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Building/Device/VideoThirdSystem'),
      
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
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Finance/ElectricRecharge'),
      
    })
    : require('../Finance/ElectricRecharge').default,
            "exact": true
          },
          {
            "path": "/finance/electricRechargeDetail",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Finance/ElectricRechargeDetail'),
      
    })
    : require('../Finance/ElectricRechargeDetail').default,
            "exact": true
          },
          {
            "path": "/finance/electricRechargeDetailAbnormal",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Finance/ElectricRechargeDetailAbnormal'),
      
    })
    : require('../Finance/ElectricRechargeDetailAbnormal').default,
            "exact": true
          },
          {
            "path": "/finance/invoicePayable",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Finance/InvoicePayable'),
      
    })
    : require('../Finance/InvoicePayable').default,
            "exact": true
          },
          {
            "path": "/finance/invoicesManagement",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Finance/InvoicesManagement'),
      
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
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Mall/StoreManage'),
      
    })
    : require('../Mall/StoreManage').default,
            "exact": true
          },
          {
            "path": "/malls/commodity",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Mall/CommodityManagement'),
      
    })
    : require('../Mall/CommodityManagement').default,
            "exact": true
          },
          {
            "path": "/malls/category",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Mall/CommodityClassificationManagement'),
      
    })
    : require('../Mall/CommodityClassificationManagement').default,
            "exact": true
          },
          {
            "path": "/malls/storeApply",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Mall/ShopApplicationReview'),
      
    })
    : require('../Mall/ShopApplicationReview').default,
            "exact": true
          },
          {
            "path": "/malls/storeChange",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Mall/ShopChangeAudit'),
      
    })
    : require('../Mall/ShopChangeAudit').default,
            "exact": true
          },
          {
            "path": "/malls/storeorder",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Mall/OrderManagement'),
      
    })
    : require('../Mall/OrderManagement').default,
            "exact": true
          },
          {
            "path": "/malls/recommend",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Mall/HomeRecommendedMerchandiseManagement'),
      
    })
    : require('../Mall/HomeRecommendedMerchandiseManagement').default,
            "exact": true
          },
          {
            "path": "/malls/group",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Mall/HomePageGroupingManagement'),
      
    })
    : require('../Mall/HomePageGroupingManagement').default,
            "exact": true
          },
          {
            "path": "/malls/storeApplyserve",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Mall/Store/StoreApply'),
      
    })
    : require('../Mall/Store/StoreApply').default,
            "exact": true
          },
          {
            "path": "/malls/storeInfo",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Mall/Store/BasicInfo'),
      
    })
    : require('../Mall/Store/BasicInfo').default,
            "exact": true
          },
          {
            "path": "/malls/storeChangeserve",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Mall/Store/StoreChange'),
      
    })
    : require('../Mall/Store/StoreChange').default,
            "exact": true
          },
          {
            "path": "/malls/product",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Mall/ProductManagement/CommodityManagement'),
      
    })
    : require('../Mall/ProductManagement/CommodityManagement').default,
            "exact": true
          },
          {
            "name": "订单管理",
            "path": "/malls/order",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Mall/orderManagement/orderManagement'),
      
    })
    : require('../Mall/orderManagement/orderManagement').default,
            "exact": true
          },
          {
            "name": "促销活动",
            "path": "/malls/activity",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Mall/SalesPromotion/SalesPromotion'),
      
    })
    : require('../Mall/SalesPromotion/SalesPromotion').default,
            "exact": true
          },
          {
            "path": "/malls/merchantsstatistics",
            "name": "店铺统计分析",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Mall/MerchantsStatistics/MerchantsStatistics'),
      
    })
    : require('../Mall/MerchantsStatistics/MerchantsStatistics').default,
            "exact": true
          },
          {
            "path": "/malls/phonecode",
            "name": "商家绑定手机号",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Mall/BusinessBindingMobile/BusinessBindingMobile'),
      
    })
    : require('../Mall/BusinessBindingMobile/BusinessBindingMobile').default,
            "exact": true
          },
          {
            "path": "/malls/generalsetting",
            "name": "通用设置",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Mall/Store/GeneralSetting'),
      
    })
    : require('../Mall/Store/GeneralSetting').default,
            "exact": true
          },
          {
            "path": "/malls/shoplist",
            "name": "店铺列表",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Mall/Store/ShopList'),
      
    })
    : require('../Mall/Store/ShopList').default,
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
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Enterprise/EnterpriseAudit/EnterpriseAudit'),
      
    })
    : require('../Enterprise/EnterpriseAudit/EnterpriseAudit').default,
            "exact": true
          },
          {
            "path": "/enterprise/enterpriseinfo",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Enterprise/EnterpriseInfo/EnterpriseInfo'),
      
    })
    : require('../Enterprise/EnterpriseInfo/EnterpriseInfo').default,
            "exact": true
          },
          {
            "path": "/enterprise/enterpriseedit",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Enterprise/EnterpriseEdit/EnterpriseEdit'),
      
    })
    : require('../Enterprise/EnterpriseEdit/EnterpriseEdit').default,
            "exact": true
          },
          {
            "path": "/enterprise/enterpriseapply",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Enterprise/EnterpriseApply/EnterpriseApply'),
      
    })
    : require('../Enterprise/EnterpriseApply/EnterpriseApply').default,
            "exact": true
          },
          {
            "path": "/enterprise/enterprisedepartment",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Enterprise/EnterpriseDepartment/EnterpriseDepartment'),
      
    })
    : require('../Enterprise/EnterpriseDepartment/EnterpriseDepartment').default,
            "exact": true
          },
          {
            "path": "/enterprise/authcode",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Enterprise/AuthCode/AuthCodeList'),
      
    })
    : require('../Enterprise/AuthCode/AuthCodeList').default,
            "exact": true
          },
          {
            "path": "/enterprise/enterpriselist",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Enterprise/EnterpriseManage/EnterpriseList'),
      
    })
    : require('../Enterprise/EnterpriseManage/EnterpriseList').default,
            "exact": true
          },
          {
            "path": "/enterprise/technicalTransaction",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Enterprise/TechnicalTransaction'),
      
    })
    : require('../Enterprise/TechnicalTransaction').default,
            "exact": true
          },
          {
            "path": "/enterprise/enterpriseMeter",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Enterprise/EnterpriseMeter'),
      
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
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Interaction/InteractionType'),
      
    })
    : require('../Interaction/InteractionType').default,
            "exact": true
          },
          {
            "name": "栏目管理",
            "path": "/cms-manage/columns",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../ColumnManage/ColumnManageList'),
      
    })
    : require('../ColumnManage/ColumnManageList').default,
            "exact": true
          },
          {
            "name": "信息管理",
            "path": "/cms-manage/infos",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../InfoManage/InfoManageList'),
      
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
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../GroupManage/GroupManageList'),
      
    })
    : require('../GroupManage/GroupManageList').default,
                "exact": true
              },
              {
                "name": "信息组信息管理",
                "path": "/cms-manage/groups/:groupid/infos",
                "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../GroupManage/GroupInfoManageList'),
      
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
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../ZsxxManage/ZsxxManageList'),
      
    })
    : require('../ZsxxManage/ZsxxManageList').default,
            "exact": true
          },
          {
            "name": "栏目信息管理",
            "path": "/cms-manage/columninfos/:columnid",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../ColumnInfoManage/ColumnInfoManageList'),
      
    })
    : require('../ColumnInfoManage/ColumnInfoManageList').default,
            "exact": true
          },
          {
            "name": "栏目信息管理2",
            "path": "/cms-manage/columninfos/:columnid/:listmode",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../ColumnInfoManage/ColumnInfoManageList'),
      
    })
    : require('../ColumnInfoManage/ColumnInfoManageList').default,
            "exact": true
          },
          {
            "name": "展板管理",
            "path": "/cms-manage/board/:type",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Board/BoardMain'),
      
    })
    : require('../Board/BoardMain').default,
            "exact": true
          },
          {
            "name": "反馈建议",
            "path": "/cms-manage/feedback",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Feedback/FeedbackManage'),
      
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
  import(/* webpackChunkName: 'p__ReportManage__models__m_target.js' */'D:/workspace/ant-smartpark-web/src/pages/ReportManage/models/m_target.js').then(m => { return { namespace: 'm_target',...m.default}})
],
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../ReportManage/ReportManage'),
      
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
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../LeaseAudit/LeaseAuditList'),
      
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
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../NoticeRelease/NoticeRelease'),
      
    })
    : require('../NoticeRelease/NoticeRelease').default,
            "exact": true
          },
          {
            "name": "通知发布",
            "path": "/notice/notification",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Notification/NotifList'),
      
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
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Personnel/PersonnelInfo'),
      
    })
    : require('../Personnel/PersonnelInfo').default,
            "exact": true
          },
          {
            "path": "/personnel/personneledit",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Personnel/PersonnelInfoEdit'),
      
    })
    : require('../Personnel/PersonnelInfoEdit').default,
            "exact": true
          },
          {
            "path": "/personnel/personnellist",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Personnel/PersonnelList'),
      
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
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../ElectricityFee/ElectricityFeeList'),
      
    })
    : require('../ElectricityFee/ElectricityFeeList').default,
            "exact": true
          },
          {
            "path": "/electricityfee/powderdetail",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../ElectricityFee/PowderDetail'),
      
    })
    : require('../ElectricityFee/PowderDetail').default,
            "exact": true
          },
          {
            "path": "/electricityfee/propertyauthority",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../PropertyAuthorityManag/List'),
      
    })
    : require('../PropertyAuthorityManag/List').default,
            "exact": true
          },
          {
            "path": "/electricityfee/paytext",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../PayText/PayText'),
      
    })
    : require('../PayText/PayText').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/shopmall",
        "routes": [
          {
            "path": "/shopmall/shopmanage",
            "name": "商铺管理",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../ShopMall/MallOperation/ShopManage/List'),
      
    })
    : require('../ShopMall/MallOperation/ShopManage/List').default,
            "exact": true
          },
          {
            "path": "/shopmall/shopexaminelist",
            "name": "商铺审核",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../ShopMall/MallOperation/ShopExamine/List'),
      
    })
    : require('../ShopMall/MallOperation/ShopExamine/List').default,
            "exact": true
          },
          {
            "path": "/shopmall/shopcurrentinfo",
            "name": "商铺基本信息维护",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../ShopMall/MallOperation/ShopManage/CurrentInfo'),
      
    })
    : require('../ShopMall/MallOperation/ShopManage/CurrentInfo').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/coupon",
        "routes": [
          {
            "path": "/coupon/couponseller/list",
            "name": "优惠券管理",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Coupon/CouponSeller/CouponList'),
      
    })
    : require('../Coupon/CouponSeller/CouponList').default,
            "exact": true
          },
          {
            "path": "/coupon/couponseller/refundlist",
            "name": "退券审核管理",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Coupon/CouponSeller/RefundList'),
      
    })
    : require('../Coupon/CouponSeller/RefundList').default,
            "exact": true
          },
          {
            "path": "/coupon/couponseller/couponexaminelist",
            "name": "优惠券审核管理",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Coupon/CouponSeller/CouponExamine'),
      
    })
    : require('../Coupon/CouponSeller/CouponExamine').default,
            "exact": true
          },
          {
            "path": "/coupon/couponseller/purchaseorderlist",
            "name": "优惠券购买订单查询",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Coupon/CouponSeller/Order/PurchaseOrder'),
      
    })
    : require('../Coupon/CouponSeller/Order/PurchaseOrder').default,
            "exact": true
          },
          {
            "path": "/coupon/couponseller/paymentorderlist",
            "name": "支付订单查询",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Coupon/CouponSeller/Order/PaymentOrder'),
      
    })
    : require('../Coupon/CouponSeller/Order/PaymentOrder').default,
            "exact": true
          },
          {
            "path": "/coupon/couponseller/refundorderlist",
            "name": "退券订单查询",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Coupon/CouponSeller/Order/RefundOrder'),
      
    })
    : require('../Coupon/CouponSeller/Order/RefundOrder').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/advertis",
        "routes": [
          {
            "path": "/advertis/agent/list",
            "name": "代理商管理",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Advertisment/Agent/List'),
      
    })
    : require('../Advertisment/Agent/List').default,
            "exact": true
          },
          {
            "path": "/advertis/advertiser/list",
            "name": "广告主管理",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Advertisment/Advertiser/List'),
      
    })
    : require('../Advertisment/Advertiser/List').default,
            "exact": true
          },
          {
            "path": "/advertis/advertiscreativegroup/list",
            "name": "广告创意组管理",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Advertisment/AdvertisCreativeGroup/List'),
      
    })
    : require('../Advertisment/AdvertisCreativeGroup/List').default,
            "exact": true
          },
          {
            "path": "/advertis/advertispromotion/list",
            "name": "广告投放管理",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Advertisment/AdvertisPromotion/List'),
      
    })
    : require('../Advertisment/AdvertisPromotion/List').default,
            "exact": true
          },
          {
            "path": "/advertis/advertisreview/list",
            "name": "广告推广审核管理",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Advertisment/AdvertisReview/List'),
      
    })
    : require('../Advertisment/AdvertisReview/List').default,
            "exact": true
          },
          {
            "path": "/advertis/advertposition/list",
            "name": "广告位管理",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Advertisment/AdvertPosition/List'),
      
    })
    : require('../Advertisment/AdvertPosition/List').default,
            "exact": true
          },
          {
            "path": "/advertis/advertisreleaseList/list",
            "name": "广告推广发布管理",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Advertisment/AdvertisRelease/AdvertisRelease'),
      
    })
    : require('../Advertisment/AdvertisRelease/AdvertisRelease').default,
            "exact": true
          },
          {
            "path": "/advertis/advertissetting/list",
            "name": "广告推广设置",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Advertisment/AdvertisSetting/AdvertisSetting'),
      
    })
    : require('../Advertisment/AdvertisSetting/AdvertisSetting').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/buildconstru",
        "name": "建筑管理",
        "routes": [
          {
            "path": "/buildconstru",
            "name": "建筑管理",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../BuildConstru/BuildConstruList'),
      
    })
    : require('../BuildConstru/BuildConstruList').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/facedata",
        "name": "平台用户管理",
        "routes": [
          {
            "path": "/facedata",
            "name": "平台用户管理",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../FaceEntry/FaceEntry'),
      
    })
    : require('../FaceEntry/FaceEntry').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/ant-smartpark-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/epidemic",
        "name": "疫情数据",
        "routes": [
          {
            "path": "/epidemic/epidemicemployeeinfo",
            "name": "员工基本信息查询",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Epidemicemployee/EpidemicemployeeInfo/EpidemicemployeeInfo'),
      
    })
    : require('../Epidemicemployee/EpidemicemployeeInfo/EpidemicemployeeInfo').default,
            "exact": true
          },
          {
            "path": "/epidemic/dailyhealth",
            "name": "员工每日健康",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Epidemicemployee/DailyHealth/DailyHealth'),
      
    })
    : require('../Epidemicemployee/DailyHealth/DailyHealth').default,
            "exact": true
          },
          {
            "path": "/epidemic/epidemicemployee",
            "name": "企业复工情况",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__AdminLayout" */'../Epidemicemployee/StatisticsEnterprisesWork/StatisticsEnterprisesList'),
      
    })
    : require('../Epidemicemployee/StatisticsEnterprisesWork/StatisticsEnterprisesList').default,
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
      
      component: () => import(/* webpackChunkName: "p__404" */'../404'),
      
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
