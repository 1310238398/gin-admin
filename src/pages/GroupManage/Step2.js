import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Radio, Input, Card, Button, Table, Drawer, Modal, Tag } from 'antd';
import Step2Rule from './Step2Rule';
import { OrgShow } from '../../components/Org';
import UserShow from '../../components/UserShow';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
@connect(state => ({
  groupManage: state.groupManage,
}))
@Form.create()
export default class Step2 extends PureComponent {
  constructor(props) {
    super(props);
    const { callback } = props;
    callback(this.formSubmit);
    this.state = {
      // selectedRowKeys: [],
      rules: [],
      visible: false,
      rule: {},
      newid: -1,
    };
  }

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.props.dispatch({
        type: 'groupManage/fetchFormCtrl',
        payload: id,
      });
    }
  }

  componentDidUpdate(prevprops, prevstate, snapshot) {
    if (snapshot != null) {
      this.updateRules(snapshot);
    }
  }

  getSnapshotBeforeUpdate(prevprops) {
    if (prevprops.groupManage.formCtrlData === this.props.groupManage.formCtrlData) {
      return null;
    }
    return this.props.groupManage.formCtrlData.rules
      ? this.props.groupManage.formCtrlData.rules
      : null;
  }

  updateRules = rules => {
    this.setState({ rules });
  };

  onAddClick = () => {
    this.setState({
      rule: {},
    });
    this.showDrawer();
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onEditClick = record => {
    this.setState({
      rule: record,
    });
    this.showDrawer();
  };

  onEditRule = data => {
    const { rule, newid, rules } = this.state;
    let newrules = rules;
    if (rule && rule.id && data.id === rule.id) {
      // 修改
      newrules = rules.map(item => {
        if (item.id === data.id) {
          return data;
        }
        return item;
      });
    } else {
      // 新增
      const newdata = { ...data };
      newdata.id = newid;
      this.setState({ newid: newid - 1 });
      newrules.push(newdata);
    }
    this.setState({ rules: newrules });
    this.onClose();
  };

  onDeleteClick = record => {
    Modal.confirm({
      title: '确定删除该数据吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDelOKClick.bind(this, record),
    });
  };

  onDelOKClick = ({ id }) => {
    let { rules } = this.state;
    rules = rules.filter(item => {
      return id !== item.id;
    });
    this.setState({ rules });
  };

  formSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        if (
          formData &&
          (formData.flags || formData.flags === '') &&
          typeof formData.flags === 'string'
        ) {
          formData.flags = formData.flags.split(/\s+/);
        }
        const { rules } = this.state;
        formData.rules = rules;
        this.props.dispatch({
          type: 'groupManage/submitCtrl',
          payload: formData,
        });
      }
    });
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const {
      groupManage: { formCtrlData, formData },
      form: { getFieldDecorator },
    } = this.props;
    const { rules } = this.state;
    // if (
    //   this.state.rules.length === 0 &&
    //   formCtrlData.rules &&
    //   formCtrlData.rules.length > 0
    // ) {
    //   this.setState({ rules: formCtrlData.rules });
    //   rules = [...formCtrlData.rules];
    // }

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 14 },
      },
    };
    const { flags } = formCtrlData;
    let vflags = '';
    if (flags && flags.length) {
      vflags = flags.join(' ');
    }
    // const rowSelection = {
    //   onChange: (selectedRowKeys) => {
    //     // console.log(
    //     //   `selectedRowKeys: ${selectedRowKeys}`,
    //     //   'selectedRows: ',
    //     //   selectedRows,
    //     // );
    //     //this.setState({ selectedRowKeys });
    //   },
    //   // getCheckboxProps: record => ({
    //   //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //   //   name: record.name,
    //   // }),
    // };
    const columns = [
      {
        title: '组织',
        dataIndex: 'org',
        width: 100,
        render: val => {
          return <OrgShow value={val} />;
        },
      },
      {
        title: '栏目',
        dataIndex: 'column_id',
        width: 100,
        render: (val, record) => {
          if (record.column_id) {
            return `${record.column_name}(${record.column_id})`;
          }
          return '';
        },
      },
      {
        title: '所有者',
        dataIndex: 'own',
        width: 100,
        render: val => {
          return <UserShow uid={val} />;
        },
      },
      {
        title: '关键字',
        dataIndex: 'key',
        width: 100,
      },
      {
        title: '标签',
        dataIndex: 'tags',
        width: 100,
        render: val => {
          let v = [];
          if (val && val.length) {
            v = val.map(item => {
              return (
                <Tag key={item} color="blue">
                  {item}
                </Tag>
              );
            });
          }
          return v;
        },
      },
      {
        title: '操作',
        dataIndex: 'id',
        width: 100,
        render: (val, record) => {
          return (
            <span>
              <Button key="edit" icon="edit" onClick={() => this.onEditClick(record)}>
                编辑
              </Button>
              <Button key="delete" icon="delete" onClick={() => this.onDeleteClick(record)}>
                删除
              </Button>
            </span>
          );
        },
      },
    ];
    return (
      <Form>
        <FormItem {...formItemLayout} label="收录信息权重模式">
          {getFieldDecorator('info_weight', {
            initialValue: formCtrlData.info_weight,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <RadioGroup name="radiogroup">
              <Radio value={0}>保持收录信息的权重</Radio>
              <Radio value={1}>默认信息的权重0</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="访问标识">
          {getFieldDecorator('flags', {
            initialValue: vflags,
            rules: [
              {
                required: false,
                message: '多个值使用空格分割',
              },
            ],
          })(<Input placeholder="请输入访问标识，多个值使用空格分割" />)}
        </FormItem>
        {formData.kind === 1 && (
          <Card
            style={{ marginTop: 16 }}
            type="inner"
            title="收集规则"
            extra={
              <Button icon="plus" type="primary" onClick={() => this.onAddClick()}>
                新建
              </Button>
            }
          >
            <Table
              // rowSelection={rowSelection}
              columns={columns}
              dataSource={rules}
            />
          </Card>
        )}
        <Drawer
          title="编辑规则"
          width={720}
          placement="right"
          onClose={this.onClose}
          maskClosable
          visible={this.state.visible}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
        >
          {this.state.visible && <Step2Rule data={this.state.rule} callback={this.onEditRule} />}
        </Drawer>
      </Form>
    );
  }
}
