/* 订单管理tab页面 */
import React, { PureComponent } from 'react';
import { Menu, Icon } from 'antd';
import { connect } from 'dva';

@connect(state => ({
  orderManagementsj: state.orderManagementsj,
}))
export default class orderManagementMenu extends PureComponent {
  state = {
    menu: [
      {
        name: '新订单',
        id: '1',
      },
      {
        name: '处理中',
        id: '2',
      },
      {
        name: '配送中',
        id: '3',
      },
      {
        name: '已完成',
        id: '4',
      },
      {
        name: '投诉处理',
        id: '5',
      },
      {
        name: '全部订单',
        id: '6',
      },
    ],
  };
  /* 	切换 */
  onClickMenu = e => {
    const {
      orderManagementsj: { menu },
    } = this.props;
    for (const v of menu) {
      if (v.id === e.key) {
        /* 相等调用父组件方法 */
        this.props.onChange({ ...v });
        break;
      }
    }
  };
  /* 入口DOM */
  render() {
    const { menu } = this.state;
    return (
      <div>
        <Menu
          defaultSelectedKeys={['1']}
          onClick={this.onClickMenu}
          style={{ border: 'none', height: 'auto' }}
        >
          {menu.map(item => {
            return (
              <Menu.Item key={item.id}>
                <Icon type="bars" />
                {item.name}
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
    );
  }
}
