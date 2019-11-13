import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Menu, Icon } from 'antd';

@connect(state => ({
  boardManage: state.boardManage,
}))
export default class ParksMenu extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'boardManage/fetchParks',
    });
  }

  onClickMenu = e => {
    const {
      boardManage: { menu },
    } = this.props;
    for (const v of menu) {
      if (v.id === e.key) {
        this.props.onChange({ ...v });
        break;
      }
    }
  };

  render() {
    const {
      boardManage: { menu },
    } = this.props;
    return (
      <Menu onClick={this.onClickMenu} mode="inline">
        {menu.map(item => {
          return (
            <Menu.Item key={item.id}>
              <Icon type="mail" />
              {item.name}
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
}
