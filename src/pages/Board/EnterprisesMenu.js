import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Menu, Icon, Input } from 'antd';

const { Search } = Input;
@connect(state => ({
  boardManage: state.boardManage,
}))
export default class EnterprisesMenu extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'boardManage/fetchEnterprises',
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

  handleSearch = value => {
    this.props.dispatch({
      type: 'boardManage/fetchEnterprises',
      payload: { name: value },
    });
  };

  handleChange = value => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const {
      boardManage: { menu },
    } = this.props;
    return (
      <div>
        <div style={{ paddingRight: '24px' }}>
          <Search placeholder="输入企业名称(模糊匹配)" onSearch={this.handleSearch} />
        </div>

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
      </div>
    );
  }
}
