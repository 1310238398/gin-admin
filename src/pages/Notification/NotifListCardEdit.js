import React from 'react';
import { Modal, Form, Row, Col, Input, Button, Table, Dropdown, Menu, Icon, message } from 'antd';
import { connect } from 'dva';
import ParkSelect from '@/components/ParkList/ParkSelect';
import RichText from '../../components/RichText/RichText';
import FormChangeItem from './FormChangeItem';
import EnterpriseShow from '@/components/EnterpriseShow';
import UserShow from '@/components/UserShow';
import { DicShow } from '@/components/Dictionary';
import DicShowNew from '@/components/DictionnaryNo/DicShowNew/index';

@Form.create()
@connect(state => ({
  notifList: state.notifList,
  enterprise: state.enterprise,
}))
export default class NotifListCardEdit extends React.PureComponent {
  state = {
    onItem: '1',
    arealoading: false,
    dataForm: false,
    areaList: [],
  };

  componentDidMount() {
    const { id, type, callback } = this.props;
    this.props.dispatch({
      type: 'notifList/loadForm',
      payload: {
        id,
        type,
        callback,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'notifList/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  // selectCallBack = (val, status) => {
  //   console.log(val);
  // };

  sendOut = val => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const itemList = this.props.notifList.onItemList;
        debugger
        if (itemList && itemList.length < 0) {
          message.error('请选择要发布通知的对象');
          return;
        }
        values.ranges = itemList;
        this.props.dispatch({
          type: 'notifList/submit',
          payload: values,
          val,
          id: this.props.id,
        });
        this.props.callback();
      }
    });
  };

  handleMenuItem = e => {
    this.setState({ dataForm: true, onItem: e.key });
  };

  onDataFormItemCallback = values => {
    this.props.dispatch({
      type: 'notifList/changeLoadingList',
      payload: true,
    });
    const itemList = this.props.notifList.onItemList;
    const areaList = [...itemList, ...values.ranges];
    this.props.dispatch({
      type: 'notifList/saveItemDataList',
      payload: areaList,
    });
   this.setState({ dataForm: false, onItem: '' });
    this.props.dispatch({
      type: 'notifList/changeLoadingList',
      payload: false,
    });
  };

  closeCallBack = () => {
    this.setState({ dataForm: false, onItem: '' });
  };

  deleObj = i => {
    this.props.dispatch({
      type: 'notifList/changeLoadingList',
      payload: true,
    });
    debugger
    const itemList = this.props.notifList.onItemList;
    console.log(itemList)
    console.log(i)
    const ItemDataList = itemList.slice(i, 1);
    const areaList =[...ItemDataList];
    this.props.dispatch({
      type: 'notifList/saveItemDataList',
      payload: areaList,
    });
    this.props.dispatch({
      type: 'notifList/changeLoadingList',
      payload: false,
    });
  };

  renderStatus = status => {
    switch (status) {
      case 1:
        return '企业';
      case 2:
        return '人员';
      case 3:
        return '企业标签';
      case 4:
        return '角色分类';
      case 5:
        return '行业分类';
      default:
        return '';
    }
  };

  renderItemName = (val, record) => {
    switch (record.bu_type) {
      case 1:
        return <EnterpriseShow value={val} />;
      case 2:
        return <UserShow uid={val} />;
      case 3:
        return <DicShow pcode="OPER$#corporate_marks" code={[val]} />;
      case 4:
        return <DicShowNew root="ops$#role_category" code={val} />;
      case 5:
        return <DicShow pcode="OPER$#enterprise_category_industry" code={[val]} />;
      default:
        return <span>{val}</span>;
    }
  };

  renderDataForm() {
    if (this.state.dataForm) {
      return (
        <FormChangeItem
          outItem={this.state.onItem}
          callback={this.onDataFormItemCallback}
          closeBack={this.closeCallBack}
        />
      );
    }
  }

  render() {
    const {
      notifList: { formTitle, formVisible, formData, onItemList, arealoading },
      form: { getFieldDecorator },
    } = this.props;
    console.log(this.props.notifList.onItemList);
    let footerJsx = [];
    footerJsx = [
      <Button key="addClose" onClick={this.onModalCancelClick}>
        关闭{' '}
      </Button>,
      <Button key="addSendOut" type="primary" onClick={() => this.sendOut()}>
        发送
      </Button>,
    ];

    // const CheckboxGroup = Checkbox.Group;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const editorProps = {
      height: 100,
    };
    // 授权
    const columnsArea = [
      {
        title: '操作',
        key: 'operation',
        fixed: 'left',
        width: 100,
        render: (index) => (
          <Dropdown
            placement="bottomCenter"
            overlay={
              <Menu>
                <Menu.Item onClick={() => this.deleObj(index)}>删除</Menu.Item>
              </Menu>
            }
          >
            <Button>操作</Button>
          </Dropdown>
        ),
      },
      {
        title: '通知类型',
        dataIndex: 'bu_type',
        // width: colWidthNormal,
        key: 'bu_type',
        render: val => {
          return <span>{this.renderStatus(val)}</span>;
        },
      },
      {
        title: '通知对象',
        dataIndex: 'bu_id',
        key: 'bu_id',
        render: this.renderItemName,
      },
    ];

    const menu = (
      <Menu onClick={this.handleMenuItem}>
        <Menu.Item key="1">企业</Menu.Item>
        <Menu.Item key="2">人员</Menu.Item>
        <Menu.Item key="3">企业标签</Menu.Item>
        <Menu.Item key="4">角色分类</Menu.Item>
        <Menu.Item key="5">行业分类</Menu.Item>
      </Menu>
    );

    // const plainOptions = ['推送通知', '短信通知'];
    return (
      <Modal
        visible={formVisible}
        title={formTitle}
        width={800}
        footer={footerJsx}
        onCancel={this.onModalCancelClick}
      >
        <Form>
          <Row>
            <Col md={20} sm={20}>
              <Form.Item {...formItemLayout} label="标题">
                {getFieldDecorator('title', {
                  initialValue: formData.title ? formData.title : '',
                  rules: [
                    {
                      required: true,
                      message: '请输入标题',
                    },
                  ],
                })(<Input placeholder="请输入标题" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={20} sm={20}>
              <Form.Item {...formItemLayout} label="概述">
                {getFieldDecorator('summary', {
                  initialValue: formData.summary ? formData.summary : '',
                  rules: [
                    {
                      required: true,
                      message: '请输入标题',
                    },
                  ],
                })(<Input placeholder="请输入" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={20} sm={20}>
              <Form.Item {...formItemLayout} label="园区">
                {getFieldDecorator('park_id', {
                  initialValue: formData.park_id ? formData.park_id : '',
                  rules: [
                    {
                      required: true,
                      message: '请选择',
                    },
                  ],
                })(<ParkSelect />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={20} sm={20}>
              <Form.Item {...formItemLayout} label="内容">
                {getFieldDecorator('content', {
                  initialValue: formData.content,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(
                  <RichText
                    rich={editorProps}
                    ref={elem => {
                      this.inputElement = elem;
                    }}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {/* <Row>
            <Col md={20} sm={20}>
              <Form.Item {...formItemLayout} label="目标群体">
                {getFieldDecorator('bu_type', {
                  initialValue: formData.bu_type ? formData.bu_type : '',
                  rules: [
                    {
                      required: true,
                      message: '请选择目标群体',
                    },
                  ],
                })(
                  <Radio.Group onChange={this.onChange} value={this.state.value}>
                    <Radio value={1}>企业</Radio>
                    <Radio value={2}>人员</Radio>
                    <Radio value={3}>企业标签</Radio>
                    <Radio value={4}>角色分类</Radio>
                    <Radio value={5}>行业分类</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
          </Row> */}

        <div>
          <Dropdown overlay={menu}>
            <Button style={{ marginLeft: 8 }}>
              添加 <Icon type="down" />
            </Button>
          </Dropdown>
        </div>
        <Table
          loading={arealoading}
          dataSource={onItemList}
          columns={columnsArea}
          scroll={{ x: 550 }}
        />
        {this.renderDataForm()}
      </Modal>
    );
  }
}
