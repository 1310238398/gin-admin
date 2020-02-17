/* eslint-disable react/react-in-jsx-scope */
import React, { PureComponent } from 'react';
import {
  Card,
  Form,
  Row,
  Col,
  Input,
  Radio,
  Checkbox,
  Button,
  Modal,
  Menu,
  Dropdown,
  message,
  Table,
} from 'antd';
import { connect } from 'dva';
// import moment from 'moment';
// import EnterpriseNewSelect from '@/components/EnterpriseNewList/index';
// import EnterUserSelect from '@/components/EnterUserSelect/index';
import {  DicShow } from '@/components/Dictionary';
import { compareArrayAndAdd } from '@/utils/utils';
import BuildingInfo from './BuildInfo';

// const RadioGroup = Radio.Group;

@Form.create()
@connect(state => ({
  propertyAuthority: state.propertyAuthority,
}))
export default class PropertyAuthorityEdit extends PureComponent {
  state = {
    Quanloading: false,
    quanList: [],
    Infoframe: {
      data: null,
      visible: false,
    },
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

  // 保存，暂存
  onBtnDataClick() {
    const { callback, data } = this.props;
    const { dataList } = this.props.propertyAuthority;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        formData.user_id = data.user_id;

        const fu = [];
        for (let i = 0; i < dataList.length; i += 1) {
          const bIDs = dataList[i].building_id.split(',');
          for (let j = 0; j < bIDs.length; j += 1) {
            fu.push({
              tag: dataList[i].tag,
              building_id: bIDs[j],
            });
          }
        }

        formData.data = fu;
        this.props.dispatch({
          type: 'propertyAuthority/submit',
          payload: formData,
        });
        callback();
      }
    });
  }

  onNewQuanXian = () => {
    this.setState({
      Infoframe: {
        data: null,
        visible: true,
      },
    });
  };

  closeBuildSubFrame = () => {
    this.setState({
      Infoframe: {
        data: null,
        visible: false,
      },
    });
  };

  onaddOffCallback = data => {
    const { dataList } = this.props.propertyAuthority;

    const newData = [...dataList];

    let exists = false;
    for (let i = 0; i < newData.length; i += 1) {
      if (newData[i].tag === data.tag) {
        const nIDs = compareArrayAndAdd(
          data.building_id.split(','),
          newData[i].building_id.split(',')
        );
        const nNames = compareArrayAndAdd(
          data.building_name.split(','),
          newData[i].building_name.split(',')
        );
        newData[i].building_id = nIDs.join(',');
        newData[i].building_name = nNames.join(',');
        exists = true;
        break;
      }
    }

    if (!exists) {
      newData.push(data);
    }

    this.props.dispatch({
      type: 'propertyAuthority/saveFormDataS',
      payload: newData,
    });
    this.closeBuildSubFrame();
  };

  deleFloor = rec => {
    const { dataList } = this.props.propertyAuthority;
    for (let i = 0; i < dataList.length; i += 1) {
      if (dataList[i].building_name === rec.building_name && dataList[i].tag === rec.tag) {
        dataList.splice(i, 1);
        this.props.dispatch({
          type: 'propertyAuthority/saveFormDataS',
          payload: dataList,
        });
      }
    }
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
      <Button key="close" onClick={this.props.callback}>
        关闭
      </Button>,
      <Button type="primary" onClick={() => this.onBtnDataClick()}>
        保存
      </Button>,
    ];
    const columns = [
      {
        title: '操作',
        key: 'operation',
        fixed: 'left',
        width: 100,
        render: (text, record) => (
          <Dropdown
            placement="bottomCenter"
            overlay={
              <Menu>
                <Menu.Item onClick={() => this.deleFloor(record)}>删除</Menu.Item>
              </Menu>
            }
          >
            <Button>操作</Button>
          </Dropdown>
        ),
      },
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
        onCancel={this.props.callback}
        footer={footerJsx}
        width={900}
        bodyStyle={{ paddingRight: 30, paddingLeft: 30 }}
      >
        <Card title="基本信息" bordered={false}>
          <div style={{ marginBottom: '10px' }}>
            企业名称：{data.enterprise_name}，用户姓名：{data.real_name}，手机号：{data.phone}
          </div>
          <div>
            <Button icon="plus" type="primary" onClick={() => this.onNewQuanXian()}>
              添加权限
            </Button>
          </div>
          <Table
            loading={this.state.Quanloading}
            dataSource={dataList}
            pagination={false}
            columns={columns}
            scroll={{ x: 550 }}
          />
        </Card>
        {this.state.Infoframe.visible && (
          <BuildingInfo
            data={this.state.Infoframe.data}
            onBuildCloseCallback={this.closeBuildSubFrame}
            onAddBuildCloseCallback={this.onaddOffCallback}
            // onPassOffCallback={this.onPassOffCallback}
            // onBtnUnAuthClick={this.onUnAuthCallback}
          />
        )}
      </Modal>
    );
    return resultJsx;
  }
}
