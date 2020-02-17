/* eslint-disable react/react-in-jsx-scope */
import React, { PureComponent } from 'react';
import {
  Card,
  Form,
  Button,
  Modal,

  Table,
} from 'antd';
import { connect } from 'dva';
import {  DicShow } from '@/components/Dictionary';



@Form.create()
@connect(state => ({
  propertyAuthority: state.propertyAuthority,
}))
export default class ShowInfo extends PureComponent {
  state = {
    Quanloading: false,
  };

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type } = this.props;
    this.props.dispatch({
      type: 'propertyAuthority/loadForm',
      payload: {
        id,
        type,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'propertyAuthority/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };



  /**
   * 界面渲染
   */
  render() {
    const {
      propertyAuthority: { dataList, formTitle, formVisible },
      data,
    } = this.props;

    const footerJsx = [
      <Button key="close" onClick={this.props.onInfoFrameCloseCallback}>
        关闭
      </Button>,
    
    ];
    const columns = [
     
      {
        title: '楼栋',
        dataIndex: 'building_name',
      },
      {
        title: '用户标签',
        dataIndex: 'tag',
        render: val => {
          return <DicShow pcode="ops$#datarole" code={[val]} show={name} />;
        },
        // width: 140,
      },
    ];

    const resultJsx = (
      <Modal
        visible={formVisible}
        title={formTitle}
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.onInfoFrameCloseCallback}
        footer={footerJsx}
        width={900}
        bodyStyle={{ paddingRight: 30, paddingLeft: 30 }}
      >
        <Card title="基本信息" bordered={false}>
          <div style={{ marginBottom: '10px' }}>
            企业名称：{data.enterprise_name}，用户姓名：{data.real_name}，手机号：{data.phone}
          </div>
          <Table
            loading={this.state.Quanloading}
            dataSource={dataList}
            pagination={false}
            columns={columns}
            scroll={{ x: 550 }}
          />
        </Card>
      </Modal>
    );
    return resultJsx;
  }
}
