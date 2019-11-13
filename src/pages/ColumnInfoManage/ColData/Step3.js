import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, message, Table, Card, Drawer, Button } from 'antd';
import Extra from './Extra';

@connect(state => ({
  columnInfoCol: state.columnInfoCol,
}))
@Form.create()
export default class Step3 extends PureComponent {
  constructor(props) {
    super(props);
    const { id, callback } = props;

    callback(this.formSubmit);
    if (id) {
      this.props.dispatch({
        type: 'columnInfoCol/fetchExtraTypes',
      });
      this.props.dispatch({
        type: 'columnInfoCol/fetchFormExtra',
        payload: id,
      });
    }
  }

  state = {
    editdata: {},
    visible: false,
  };

  onClickAdd = () => {
    this.setState({ editdata: {} });
    this.showDrawer();
  };

  onClickEdit = code => {
    const {
      columnInfoCol: { formExtra },
    } = this.props;

    for (const v of formExtra) {
      if (v.code === code) {
        this.setState({ editdata: v });
        this.showDrawer();
        return;
      }
    }
  };

  onClickDel = code => {
    const {
      columnInfoCol: { formExtra },
    } = this.props;
    const out = [];
    for (const v of formExtra) {
      if (v.code !== code) {
        out.push(v);
      }
    }
    this.props.dispatch({
      type: 'columnInfoCol/saveFormExtra',
      payload: out,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  appendFormExtra = data => {
    const { editdata } = this.state;

    const {
      columnInfoCol: { formExtra },
    } = this.props;
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
    this.props.dispatch({
      type: 'columnInfoCol/saveFormExtra',
      payload: out,
    });
    this.onClose();
    return true;
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  formSubmit = () => {
    this.props.dispatch({
      type: 'columnInfoCol/submitExtra',
      payload: this.props.columnInfoCol.formExtra,
    });
  };

  render() {
    const {
      columnInfoCol: { extraTypes, formExtra },
    } = this.props;

    const columns = [
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
              out.push(<li key={key}>{`${key}:${v[key]}`}</li>);
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
          columns={columns}
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
            <Extra data={this.state.editdata} callback={this.appendFormExtra} />
          )}
        </Drawer>
      </Card>
    );
  }
}
