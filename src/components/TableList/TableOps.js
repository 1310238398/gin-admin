import React, { PureComponent } from 'react';
import { Button, Dropdown, Menu, Icon } from 'antd';
import PropTypes from 'prop-types';

export class TableOps extends PureComponent {
  static propTypes = {
    // 指定列表访问编码
    ops: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    // 字典code值类型是否是数值类型,
    record: PropTypes.object.isRequired,
  };

  static defaultProps = {
    ops: [],
  };

  handlerMenu = (ops, record) => {
    return ({ key }) => {
      for (const op of ops) {
        if (key === op.key) {
          if (op.handler) {
            op.handler(record);
            break;
          }
        }
      }
    };
  };

  render() {
    const { ops, record } = this.props;
    let argops = Array.isArray(ops) ? ops : typeof ops === 'function' ? ops(record) : [];
    if (argops) {
      argops = argops.map((item, index) => {
        const key = `key${index}`;
        return { ...item, key };
      });
    } else {
      argops = [];
    }
    if (argops.length === 0) {
      return '';
    }
    return (
      <Dropdown
        overlay={
          <Menu onClick={this.handlerMenu(argops, record)}>
            {argops.map(item => {
              return (
                <Menu.Item key={item.key}>
                  <Icon type={item.icon} />
                  {item.name}
                </Menu.Item>
              );
            })}
          </Menu>
        }
      >
        <Button
          style={{ marginLeft: 8 }}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }}
        >
          操作 <Icon type="down" />
        </Button>
      </Dropdown>
    );
  }
}
