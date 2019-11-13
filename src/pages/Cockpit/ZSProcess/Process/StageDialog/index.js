import React from 'react';
import { Modal, Card, Menu, Dropdown, Icon } from 'antd';
import ProcessList from './ProcessList';
import StageInfoDialog from './StageInfoDialog';
import styles from './index.less';

export default class StageDialog extends React.Component {
  state = {
    typeData: [
      { id: '事件', text: '事件' },
      { id: '拜访', text: '拜访' },
      { id: '来访', text: '来访' },
      { id: '洽谈', text: '洽谈' },
      { id: '签约', text: '签约' },
    ],
    infoVisible: false,
    activeItem: {},
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  handleInfoCancel = () => {
    this.setState({ infoVisible: false });
  };

  handleMenuClick = ({ key }) => {
    const { item } = this.props;
    this.setState({ infoVisible: true, activeItem: { ...item, type: key } });
  };

  renderTitle = () => {
    const { item } = this.props;
    return (
      <div className={styles.topTitle}>
        <div>
          企业名称：
          {item.name}
        </div>
        <div>
          招商阶段：
          <span>{item.stage}</span>
        </div>
      </div>
    );
  };

  render() {
    const { visible, item } = this.props;
    const { typeData, infoVisible, activeItem } = this.state;

    const menu = (
      <Menu
        className={styles.MenuLess}
        onClick={this.handleMenuClick}
        style={{ backgroundColor: '#2a3136' }}
      >
        {typeData.map(v => {
          return [<Menu.Item key={v.id}>{v.text}</Menu.Item>, <Menu.Divider key={`${v.id}_d`} />];
        })}
      </Menu>
    );

    return (
      <Modal
        title={this.renderTitle()}
        width={750}
        visible={visible}
        destroyOnClose
        onCancel={this.handleCancel}
        footer={null}
        className="darkModal"
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc( 100vh - 208px )', overflowY: 'auto' }}
      >
        <Card className="park" bodyStyle={{ padding: 0 }}>
          <Card title="企业基本信息" className="chart">
            <div className={styles.itemCard}>
              <div className={styles.infoItem}>
                <div>
                  <span>企业联系人：</span>
                  <span>{item.qylxr}</span>
                </div>
                <div>
                  <span>目标物业：</span>
                  <span>{item.mbwy}</span>
                </div>
                <div>
                  <span>招商负责人：</span>
                  <span>{item.zsfzr}</span>
                </div>
              </div>
            </div>
          </Card>
          <Card
            title="招商进度查看"
            className="chart"
            extra={
              <div className={styles.topExtra}>
                <Dropdown overlay={menu} trigger={['click']}>
                  <a
                    className="ant-dropdown-link"
                    href="#"
                    style={{ fontSize: '28px', color: '#ffc400' }}
                  >
                    <Icon type="plus-circle" />
                  </a>
                </Dropdown>
              </div>
            }
          >
            <ProcessList />
          </Card>
        </Card>
        <StageInfoDialog visible={infoVisible} item={activeItem} onCancel={this.handleInfoCancel} />
      </Modal>
    );
  }
}
