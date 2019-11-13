/* 订单管理 */
import React from 'react';
/* 样式及组件 */
import { Layout, Card, message } from 'antd';
import { connect } from 'dva';
/* 导航 */
import OrderManagementMenu from './orderManagementMenu';
/* 导航信息 */
import OrderManagementInfo from './orderManagementInfo';

const { Content, Sider } = Layout;

/* 关联models */
@connect(state => ({
  orderManagementsj: state.orderManagementsj,
  storeApply: state.store,
}))
/* 订单管理入口文件 */
export default class orderManagement extends React.PureComponent {
  /* 初始化数据 */
  state = {
    id: '1',
    name: '新订单',
    store: '',
    source: '',
  };
  /* 页面挂载完成 */
  async componentDidMount() {
    await this.props.dispatch({
      type: 'orderManagementsj/getStoreNew',
    }).then(()=>this.getOrderStatus(1))

  }
  /* TAB */
  onMenuChange = item => {
    this.setState({ ...item });
    /* 清空 */
    this.props.dispatch({
      type: 'orderManagementsj/saveSearch',
      payload: {},
    });
    /* 全部订单 */
    if (item.id === '6') {
      this.getOrderStatus(0);
    } else if (item.id === '1') {
      /* 新订单 */
      this.getOrderStatus(1);
    } else if (item.id === '2') {
      /* 处理中 */
      this.getOrderStatus(2);
    } else if (item.id === '3') {
      /* 配送中 */
      this.getOrderStatus(3);
    } else if (item.id === '4') {
      /* 已完成 */
      this.getOrderStatus(4);
    } else if (item.id === '5') {
      /* 投诉处理 */
      this.getOrderStatus(5);
    }
  };
  /* 订单状态 */
  getOrderStatus = order => {
    this.props.dispatch({
      type: 'orderManagementsj/fetch',
      payload: {
        status: order,
      },
    });
  };
  /* DOM */
  render() {
    const { id, name } = this.state;
    return (
      <Card title={'订单管理'}>
        <Layout>
          <Sider style={{ background: '#fff', borderRight: '1px solid #e8e8e8' }}>
            <OrderManagementMenu onChange={this.onMenuChange} />
          </Sider>
          <Content>{id && <OrderManagementInfo orgid={id} orgname={name} />}</Content>
        </Layout>
      </Card>
    );
  }
}
