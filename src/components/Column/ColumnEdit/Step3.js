import React, { PureComponent } from 'react';
import { Form, message, Table, Card, Drawer, Button } from 'antd';
import columns from '../../../services/s_columnManage';
import Extra from './Extra';
import { DicShow } from '../../Dictionary';

@Form.create()
export default class Step3 extends PureComponent {
  state = {
    editdata: {},
    visible: false,
    extraTypes: [],
    formExtra: [],
  };

  constructor(props) {
    super(props);
    const { callback } = props;
    callback(this.formSubmit);
  }

  componentDidMount() {
    this.fetchExtra();
    this.fetchExtraTypes();
  }

  onClickAdd = () => {
    this.setState({ editdata: {} });
    this.showDrawer();
  };

  onClickEdit = code => {
    const { formExtra } = this.state;
    for (const v of formExtra) {
      if (v.code === code) {
        this.setState({ editdata: v });
        this.showDrawer();
        return;
      }
    }
  };

  onClickDel = code => {
    const { formExtra } = this.state;
    const out = [];
    for (const v of formExtra) {
      if (v.code !== code) {
        out.push(v);
      }
    }
    this.setState({ formExtra: out });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  fetchExtraTypes = async () => {
    const response = await columns.queryExtraTypes();
    if (response) {
      this.setState({ extraTypes: response });
    }
  };

  fetchExtra = async () => {
    const { id } = this.props;
    const response = await columns.queryExtra(id);
    if (response) {
      this.setState({ formExtra: response });
    }
  };

  appendFormExtra = data => {
    const { editdata } = this.state;

    const { formExtra } = this.state;
    let out = [];
    if (editdata.code) {
      const r = formExtra.some(item => {
        return editdata.code !== item.code && data.code === item.code;
      });
      if (r) {
        // 有重名code禁止修改
        message.warn('属性编号重复不能修改');
        return;
      }
      // 修改
      out = formExtra.map(item => {
        if (editdata.code === item.code) {
          return data;
        }
        return item;
      });
    } else {
      // 新增
      const r = formExtra.some(item => {
        return data.code === item.code;
      });
      if (r) {
        // 有重名code禁止修改
        message.warn('属性编号重复不能修改');
        return false;
      }
      out = formExtra;
      out.push(data);
    }
    this.setState({ formExtra: out });
    this.onClose();
    return true;
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  formSubmit = async () => {
    const response = await columns.submitUpdateExtra(this.props.id, this.state.formExtra);
    if (response === 'ok') {
      message.success('保存成功');
      if (this.props.nextHandler) this.props.nextHandler();
    }
  };

  render() {
    const { extraTypes, formExtra } = this.state;

    const tabcolumns = [
      {
        title: '属性名称',
        dataIndex: 'name',
        fixed: 'left',
        width: 150,
      },
      {
        title: '属性编码',
        dataIndex: 'code',
        width: 100,
        fixed: 'left',
      },
      {
        title: '属性种类',
        dataIndex: 'kind',
        width: 100,
        render: v => {
          let name = v;
          extraTypes.forEach(item => {
            if (v === item.code) {
              ({ name } = item);
            }
          });
          return name;
        },
      },
      {
        title: '输入提示',
        dataIndex: 'placeholder',
        width: 100,
      },
      {
        title: '是否必填',
        dataIndex: 'required',
        width: 100,
        render: val => <DicShow pcode="cms$#columns$#extraprops" code={[val]} />,
      },
      {
        title: '提示消息',
        dataIndex: 'message',
        width: 100,
      },
      {
        title: '规则',
        dataIndex: 'rules',
        width: 100,
      },
      {
        title: '属性种类参数值:',
        dataIndex: 'param_values',
        render: v => {
          const out = [];
          for (const key in v) {
            if ({}.hasOwnProperty.call(v, key)) {
              if (v[key] !== undefined) out.push(<li key={key}>{`${key}:${v[key]}`}</li>);
            }
          }
          return <ul>{out}</ul>;
        },
      },
      {
        title: '操作',
        width: 150,
        dataIndex: 'rowKey',
        fixed: 'right',
        render: (v, record) => {
          return (
            <div>
              <Button
                onClick={() => {
                  this.onClickEdit(record.code);
                }}
              >
                编辑
              </Button>
              <Button
                onClick={() => {
                  this.onClickDel(record.code);
                }}
              >
                删除
              </Button>
            </div>
          );
        },
      },
    ];
    return (
      <Card title={<Button onClick={this.onClickAdd}>新增</Button>}>
        <Table
          rowKey={record => record.code}
          dataSource={formExtra}
          columns={tabcolumns}
          pagination={false}
          scroll={{ x: 1500, y: 280 }}
        />
        <Drawer
          title="Create"
          width={720}
          placement="right"
          onClose={this.onClose}
          maskClosable
          destroyOnClose
          visible={this.state.visible}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 0,
          }}
        >
          {this.state.visible && (
            <Extra
              data={this.state.editdata}
              callback={this.appendFormExtra}
              extraTypes={extraTypes}
            />
          )}
        </Drawer>
      </Card>
    );
  }
}
