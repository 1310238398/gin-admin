import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Layout, Card } from 'antd';
import BoardManage from './BoardManage';
// import styles from './BoardList.less';
// import ParksMenu from './ParksMenu';
// import EnterprisesMenu from './EnterprisesMenu';

const { Content } = Layout;
@connect(state => ({
  boardManage: state.boardManage,
}))
export default class BoardMain extends PureComponent {
  state = {
    id: null,
    name: null,
    // collapsed: false,
  };

  componentDidUpdate(_prevProps, _prevState, snapshot) {
    if (snapshot !== null) {
      (() => {
        this.setState({ id: null });
      })();
    }
  }

  getSnapshotBeforeUpdate(_prevProps) {
    if (_prevProps.match.params.type !== this.props.match.params.type) {
      return this.props.match.params.type;
    }
    return null;
  }

  onMenuChange = item => {
    this.setState({ ...item });
  };

  render() {
    const { id, name } = this.state;
    const {
      match: {
        params: { type },
      },
    } = this.props;
    const title =
      type === 'parks' ? '园区展板管理' : type === 'enterprises' ? '企业展板管理' : '未知';
    return (
      <Card title={title}>
        <Layout>
          {/* <Sider
            breakpoint="lg"
            collapsedWidth="0"
            className={styles.sider}
            onCollapse={collapsed => {
              this.setState({ collapsed });
            }}
          >
            {!this.state.collapsed && type === 'parks' && (
              <ParksMenu onChange={this.onMenuChange} />
            )}
            {!this.state.collapsed && type === 'enterprises' && (
              <EnterprisesMenu onChange={this.onMenuChange} />
            )}
          </Sider> */}
          {type === 'parks' && (
            <Content>{id === null ? <BoardManage orgid="001" orgname={name} /> : null}</Content>
          )}
          {type === 'enterprises' && (
            <Content>{<BoardManage orgid="002" orgname={name} />}</Content>
          )}
        </Layout>
      </Card>
    );
  }
}
