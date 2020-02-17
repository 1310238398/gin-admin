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
import moment from 'moment';
import EnterpriseNewSelect from '@/components/EnterpriseNewList/index';
import EnterUserSelect from '@/components/EnterUserSelect/index';
import { DicSelect, DicShow } from '@/components/Dictionary';
import { compareArrayAndAdd } from '@/utils/utils';
import BuildingInfo from './BuildInfo';

const RadioGroup = Radio.Group;

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
    const { callback } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        const fu = [];
        const { quanList } = this.state;

        for (let i = 0; i < quanList.length; i += 1) {
          const bIDs = quanList[i].building_id.split(',');
          for (let j = 0; j < bIDs.length; j += 1) {
            fu.push({
              tag: quanList[i].tag,
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
    const { quanList } = this.state;
    const newData = [...quanList];
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

    this.setState({
      quanList: newData,
    });
    this.closeBuildSubFrame();
  };

  deleFloor = rec => {
    const datalist = this.state.quanList;
    for (let i = 0; i < datalist.length; i += 1) {
      if (datalist[i].building_name === rec.building_name && datalist[i].tag === rec.tag) {
        datalist.splice(i, 1);
        this.setState({ quanList: [...datalist] });
      }
    }
  };

  /**
   * 界面渲染
   */
  render() {
    const {
      propertyAuthority: { formData, formTitle, formVisible },
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const col = {
      sm: 24,
      md: 12,
    };

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
          <Form layout="vertical">
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="企业名称">
                  {getFieldDecorator('EnterPrise_id', {
                    initialValue: formData.EnterPrise_id || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(<EnterpriseNewSelect />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="用户姓名">
                  {getFieldDecorator('user_id', {
                    initialValue: formData.user_id || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(<EnterUserSelect parentID={getFieldValue('EnterPrise_id')} />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div>
            <Button icon="plus" type="primary" onClick={() => this.onNewQuanXian()}>
              添加权限
            </Button>
          </div>
          <Table
            loading={this.state.Quanloading}
            dataSource={this.state.quanList}
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
