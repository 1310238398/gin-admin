import React from 'react';
/* 引用组件 */
import { connect } from 'dva';
import { Card, Form, Row, Col, Input, Radio, Button, TimePicker } from 'antd';
import moment from 'moment';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import PButton from '@/components/PermButton';
import { routerRedux } from 'dva/router';

/* 样式 */
import styles from './Store.less';

const RadioGroup = Radio.Group;
@Form.create()
@connect(state => ({
  storeList: state.store,
  user: state.global.user,
}))
/* 组件 */
export default class ShopList extends React.PureComponent {
  /* 初始数据 */
  state = {
    disabled: false,
  };

  /* 挂载完成 */
  componentDidMount() {
    this.props.dispatch({
      type: 'global/fetchUser',
    });
  }

  /* 表单提交 */
  handleBtnClick = () => {};

  // 创建店铺
  onItemAddClick = () => {
    // 跳转填写店铺信息界面
    // this.props.dispatch(routerRedux.push('./shopcreate'));
  };



  render() {
    /* 表单布局 */
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

    const col = {
      sm: 24,
      md: 12,
    };
    const colC = {
      sm: 24,
      md: 24,
    };

    const {
      form: { getFieldDecorator },
      user,
    } = this.props;
    /* 表单数据 */
    const formData = {};
    return (
      <PageHeaderLayout title="选择店铺">
        <div className={styles.APPLYStore}>
          <div className={styles.TOPtitle}>
            <p>{user.real_name}</p>
          </div>
          <Card
            bordered={false}
            title="店铺列表"
            extra={
              <PButton
                key="add"
                code="add"
                icon="plus"
                type="primary"
                onClick={() => this.onItemAddClick()}
              >
                创建店铺
              </PButton>
            }
          >
            <Row gutter={16}>
              <Col
                span={6}
                style={{
                  border: '1px solid #ececec',
                  borderTop: '5px solid #ececec',
                  marginRight: '5px',
                }}
              >
                <div style={{ padding: '10px 10px 10px 10px' }}>
                  <p>店铺名称</p>
                  <p>经营单位名称</p>
                  <p>商铺类型</p>
                </div>
              </Col>
              <Col
                span={6}
                style={{
                  border: '1px solid #ececec',
                  borderTop: '5px solid #ececec',
                  marginRight: '5px',
                }}
              >
                <div style={{ padding: '10px 10px 10px 10px' }}>
                  <p>店铺名称</p>
                  <p>经营单位名称</p>
                  <p>商铺类型</p>
                </div>
              </Col>
              <Col
                span={6}
                style={{
                  border: '1px solid #ececec',
                  borderTop: '5px solid #ececec',
                  marginRight: '5px',
                }}
              >
                <div style={{ padding: '10px 10px 10px 10px' }}>
                  <p>店铺名称</p>
                  <p>经营单位名称</p>
                  <p>商铺类型</p>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
