import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'building', ...(require('D:/workspace/ant-smartpark-web/src/models/building.js').default) });
app.model({ namespace: 'demo', ...(require('D:/workspace/ant-smartpark-web/src/models/demo.js').default) });
app.model({ namespace: 'electricPowderDetail', ...(require('D:/workspace/ant-smartpark-web/src/models/electricPowderDetail.js').default) });
app.model({ namespace: 'enterprise', ...(require('D:/workspace/ant-smartpark-web/src/models/enterprise.js').default) });
app.model({ namespace: 'enterpriseAudit', ...(require('D:/workspace/ant-smartpark-web/src/models/enterpriseAudit.js').default) });
app.model({ namespace: 'global', ...(require('D:/workspace/ant-smartpark-web/src/models/global.js').default) });
app.model({ namespace: 'login', ...(require('D:/workspace/ant-smartpark-web/src/models/login.js').default) });
app.model({ namespace: 'm_authCode', ...(require('D:/workspace/ant-smartpark-web/src/models/m_authCode.js').default) });
app.model({ namespace: 'm_boardColumn', ...(require('D:/workspace/ant-smartpark-web/src/models/m_boardColumn.js').default) });
app.model({ namespace: 'm_boardInfo', ...(require('D:/workspace/ant-smartpark-web/src/models/m_boardInfo.js').default) });
app.model({ namespace: 'm_boardManage', ...(require('D:/workspace/ant-smartpark-web/src/models/m_boardManage.js').default) });
app.model({ namespace: 'm_columnInfoManage', ...(require('D:/workspace/ant-smartpark-web/src/models/m_columnInfoManage.js').default) });
app.model({ namespace: 'm_columnManage', ...(require('D:/workspace/ant-smartpark-web/src/models/m_columnManage.js').default) });
app.model({ namespace: 'm_commodityClassificationmanagement', ...(require('D:/workspace/ant-smartpark-web/src/models/m_commodityClassificationmanagement.js').default) });
app.model({ namespace: 'm_commodityManagement', ...(require('D:/workspace/ant-smartpark-web/src/models/m_commodityManagement.js').default) });
app.model({ namespace: 'm_enterpriseDepartment', ...(require('D:/workspace/ant-smartpark-web/src/models/m_enterpriseDepartment.js').default) });
app.model({ namespace: 'm_feedbackManage', ...(require('D:/workspace/ant-smartpark-web/src/models/m_feedbackManage.js').default) });
app.model({ namespace: 'm_groupInfos', ...(require('D:/workspace/ant-smartpark-web/src/models/m_groupInfos.js').default) });
app.model({ namespace: 'm_groupInfoSelect', ...(require('D:/workspace/ant-smartpark-web/src/models/m_groupInfoSelect.js').default) });
app.model({ namespace: 'm_groupManage', ...(require('D:/workspace/ant-smartpark-web/src/models/m_groupManage.js').default) });
app.model({ namespace: 'm_infoManage', ...(require('D:/workspace/ant-smartpark-web/src/models/m_infoManage.js').default) });
app.model({ namespace: 'm_interactionType', ...(require('D:/workspace/ant-smartpark-web/src/models/m_interactionType.js').default) });
app.model({ namespace: 'm_leaseAuditList', ...(require('D:/workspace/ant-smartpark-web/src/models/m_leaseAuditList.js').default) });
app.model({ namespace: 'm_noticeRelease', ...(require('D:/workspace/ant-smartpark-web/src/models/m_noticeRelease.js').default) });
app.model({ namespace: 'm_orderManagement', ...(require('D:/workspace/ant-smartpark-web/src/models/m_orderManagement.js').default) });
app.model({ namespace: 'm_orderManagementsj', ...(require('D:/workspace/ant-smartpark-web/src/models/m_orderManagementsj.js').default) });
app.model({ namespace: 'm_pageGroupingManagement', ...(require('D:/workspace/ant-smartpark-web/src/models/m_pageGroupingManagement.js').default) });
app.model({ namespace: 'm_parkStatistics', ...(require('D:/workspace/ant-smartpark-web/src/models/m_parkStatistics.js').default) });
app.model({ namespace: 'm_productModule', ...(require('D:/workspace/ant-smartpark-web/src/models/m_productModule.js').default) });
app.model({ namespace: 'm_productsAttrManagement', ...(require('D:/workspace/ant-smartpark-web/src/models/m_productsAttrManagement.js').default) });
app.model({ namespace: 'm_recommendedMerchandise', ...(require('D:/workspace/ant-smartpark-web/src/models/m_recommendedMerchandise.js').default) });
app.model({ namespace: 'm_reportManage', ...(require('D:/workspace/ant-smartpark-web/src/models/m_reportManage.js').default) });
app.model({ namespace: 'm_salesPromotion', ...(require('D:/workspace/ant-smartpark-web/src/models/m_salesPromotion.js').default) });
app.model({ namespace: 'm_shopApplicationReview', ...(require('D:/workspace/ant-smartpark-web/src/models/m_shopApplicationReview.js').default) });
app.model({ namespace: 'm_shopChangeaudit', ...(require('D:/workspace/ant-smartpark-web/src/models/m_shopChangeaudit.js').default) });
app.model({ namespace: 'm_StatisticsHuman', ...(require('D:/workspace/ant-smartpark-web/src/models/m_StatisticsHuman.js').default) });
app.model({ namespace: 'm_store', ...(require('D:/workspace/ant-smartpark-web/src/models/m_store.js').default) });
app.model({ namespace: 'm_storeManage', ...(require('D:/workspace/ant-smartpark-web/src/models/m_storeManage.js').default) });
app.model({ namespace: 'm_videoEquipment', ...(require('D:/workspace/ant-smartpark-web/src/models/m_videoEquipment.js').default) });
app.model({ namespace: 'm_videoEquipmentThrid', ...(require('D:/workspace/ant-smartpark-web/src/models/m_videoEquipmentThrid.js').default) });
app.model({ namespace: 'm_zsxxManage', ...(require('D:/workspace/ant-smartpark-web/src/models/m_zsxxManage.js').default) });
app.model({ namespace: 'merchantsStatistics', ...(require('D:/workspace/ant-smartpark-web/src/models/merchantsStatistics.js').default) });
app.model({ namespace: 'monitorShow', ...(require('D:/workspace/ant-smartpark-web/src/models/monitorShow.js').default) });
app.model({ namespace: 'notifList', ...(require('D:/workspace/ant-smartpark-web/src/models/notifList.js').default) });
app.model({ namespace: 'parklist', ...(require('D:/workspace/ant-smartpark-web/src/models/parklist.js').default) });
app.model({ namespace: 'personnel', ...(require('D:/workspace/ant-smartpark-web/src/models/personnel.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
