import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Button, Modal, Menu, Icon, Dropdown, Badge } from 'antd';
import TableList from '../../components/TableList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DataCard from './DataCard';
import { SearchCard, SearchItem } from '../../components/SearchCard';
import { DicShow, DicSelect } from '../../components/Dictionary';
// import ColumnCard from './ColumnCard';

@connect(state => ({
  interactionType: state.interactionType,
  loading: state.loading.models.interactionType,
}))
@Form.create()
export default class InteractionType extends PureComponent {
  state = {
    // detailVisible: false,
    // detailData: '',
    dataFormID: '',
    //  org: '',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'interactionType/saveSearch',
      payload: { status: [0, 1] },
    });
    this.props.dispatch({
      type: 'interactionType/fetch',
    });
    this.refreshTree();
  }

  // onItemViewClick = (item) => {
  //   this.setState({
  //     detailVisible: true,
  //     detailData: JSON.stringify(JSON.parse(item.data), null, ' '),
  //   });
  // };

  // onDetailModalCancelClick = () => {
  //   this.setState({ detailVisible: false });
  // };
  onOrgChange = org => {
    this.setState({ value: org.target.value });
    this.props.dispatch({
      type: 'interactionType/queryColumnTree',
      org: org.target.value,
    });
  };

  onTableChange = pagination => {
    this.props.dispatch({
      type: 'interactionType/fetch',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  onResetFormClick = () => {
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'interactionType/saveSearch',
      payload: {},
    });
    this.refreshTree();
    this.props.dispatch({
      type: 'interactionType/fetch',
    });
  };

  onSearchFormSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    const formData = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'interactionType/fetch',
      payload: formData,
    });
  };

  onDataFormCallback = result => {
    this.setState({ dataForm: false, dataFormID: '' });
    if (result && result === 'ok') {
      this.props.dispatch({
        type: 'interactionType/fetch',
      });
      this.refreshTree();
    }
  };

  onDataDetailCallback = () => {
    // this.setState({ dataDetail: false, dataColumnID: '' });
  };

  onItemDetailClick = () => {
    // this.setState({ dataDetail: true, dataColumnID: id });
  };

  onAddClick = () => {
    this.setState({ dataForm: true, dataFormID: '' });
    this.props.dispatch({
      type: 'interactionType/saveFormData',
      payload: {},
    });
    this.props.dispatch({
      type: 'interactionType/saveFormID',
      payload: '',
    });
  };

  onItemDescClick = code => {
    this.setState({ dataForm: true, dataFormID: code });
  };

  onDelOKClick = id => {
    this.props.dispatch({
      type: 'interactionType/del',
      payload: id,
    });
    this.refreshTree();
  };

  onItemDeleteClick = code => {
    Modal.confirm({
      title: '确定删除该数据吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: this.onDelOKClick.bind(this, code),
    });
  };

  onItemLockClick = code => {
    Modal.confirm({
      title: '确定锁定该栏目吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.props.dispatch({
          type: 'interactionType/lock',
          payload: code,
        });
        this.refreshTree();
      },
    });
  };

  onItemUnLockClick = code => {
    Modal.confirm({
      title: '确定解锁该栏目吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.props.dispatch({
          type: 'interactionType/unlock',
          payload: code,
        });
        this.refreshTree();
      },
    });
  };

  onItemRecoverClick = code => {
    Modal.confirm({
      title: '确定要恢复栏目吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.props.dispatch({
          type: 'interactionType/recover',
          payload: code,
        });
        this.refreshTree();
      },
    });
  };

  onItemDestroyClick = code => {
    Modal.confirm({
      title: '确定彻底删除该栏目吗？彻底删除后不能恢复。',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.props.dispatch({
          type: 'interactionType/destroy',
          payload: code,
        });
        this.refreshTree();
      },
    });
  };

  refreshTree = () => {
    this.props.dispatch({
      type: 'interactionType/queryColumnTree',
      org: this.state.value,
    });
  };

  handleMenuClick = (key, val) => {
    switch (key) {
      case 'desc':
        this.onItemDescClick(val);
        break;
      case 'del':
        this.onItemDeleteClick(val);
        break;
      case 'lock':
        this.onItemLockClick(val);
        break;
      case 'unlock':
        this.onItemUnLockClick(val);
        break;
      case 'recover':
        this.onItemRecoverClick(val);
        break;
      case 'destroy':
        this.onItemDestroyClick(val);
        break;
      default:
    }
  };

  renderDataForm = () => {
    if (this.state.dataForm) {
      return <DataCard id={this.state.dataFormID} callback={this.onDataFormCallback} />;
    }
  };

  renderDataDetail = () => {
    // if (this.state.dataDetail) {
    //   return (
    //     <ColumnCard
    //       id={this.state.dataColumnID}
    //       callback={this.onDataDetailCallback}
    //     />
    //   );
    // }
  };

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <SearchCard form={this.props.form} onSearch={this.onSearchFormSubmit}>
        <SearchItem label="关键字">
          {getFieldDecorator('key', {
            rules: [
              {
                message: '请输入栏目部分名称',
              },
            ],
          })(<Input placeholder="请输入栏目部分名称" />)}
        </SearchItem>

        <SearchItem label="状态">
          {getFieldDecorator('status', {
            initialValue: [0, 1],
            rules: [
              {
                required: false,
                message: '选择状态',
              },
            ],
          })(
            <DicSelect
              vmode="int"
              pcode="cms$#inttype$#status"
              selectProps={{ mode: 'multiple', placeholder: '请选择' }}
            />
          )}
        </SearchItem>
      </SearchCard>
    );
  }

  render() {
    const {
      loading,
      interactionType: {
        data: { list, pagination },
      },
    } = this.props;

    const columns = [
      {
        title: '操作',
        fixed: 'left',
        width: 100,
        render: (val, record) => {
          return (
            <Dropdown
              overlay={
                <Menu onClick={({ key }) => this.handleMenuClick(key, record.desc.code)}>
                  {record.desc.status === 0 && (
                    <Menu.Item key="desc">
                      <Icon type="edit" />
                      修改
                    </Menu.Item>
                  )}
                  {record.desc.status === 0 && (
                    <Menu.Item key="del">
                      <Icon type="delete" />
                      删除
                    </Menu.Item>
                  )}
                  {record.desc.status === 0 && (
                    <Menu.Item key="lock">
                      <Icon type="lock" />
                      锁定
                    </Menu.Item>
                  )}
                  {record.desc.status === 1 && (
                    <Menu.Item key="unlock">
                      <Icon type="unlock" />
                      解锁
                    </Menu.Item>
                  )}
                  {record.desc.status === -1 && (
                    <Menu.Item key="recover">
                      <Icon type="reload" />
                      恢复
                    </Menu.Item>
                  )}
                  {record.desc.status === -1 && (
                    <Menu.Item key="destroy">
                      <Icon type="close" />
                      彻底删除
                    </Menu.Item>
                  )}
                </Menu>
              }
            >
              <Button>
                操作 <Icon type="down" />
              </Button>
            </Dropdown>
          );
        },
      },
      {
        title: '名称',
        dataIndex: 'desc.name',
        width: 100,
        render: (val, record) => {
          return <span onClick={() => this.onItemDetailClick(record.column_id)}>{val}</span>;
        },
      },
      {
        title: '编码',
        dataIndex: 'desc.code',
        width: 100,
      },
      {
        title: '状态',
        dataIndex: 'desc.status',
        width: 100,
        render: val => {
          const s = ['default', 'processing', 'success', 'warning', 'warning', 'success'];
          let status = 'error';
          if (val >= -1) {
            status = s[val + 1] ? s[val + 1] : status;
          }
          return (
            <DicShow
              pcode="cms$#inttype$#status"
              code={[val]}
              show={name => <Badge key={name} status={status} text={name} />}
            />
          );
        },
      },
      {
        title: '模式',
        dataIndex: 'desc.mode',
        //  width: 100,
        render: val => {
          return <DicShow pcode="cms$#inttype$#mode" code={[val || 0]} />;
        },
      },
      {
        title: '是否启用平均值',
        dataIndex: 'desc.is_agv',
        //  width: 100,
        render: val => {
          return <DicShow pcode="cms$#inttype$#avg" code={[val || false]} />;
        },
      },
      {
        title: '是否公开',
        dataIndex: 'desc.is_public',
        //  width: 100,
        render: val => {
          return <DicShow pcode="cms$#inttype$#public" code={[val || 0]} />;
        },
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => {
        return <span>共{total}条</span>;
      },
      ...pagination,
    };

    return (
      <PageHeaderLayout title="互动类型管理管理">
        <Card bordered={false}>
          {this.renderForm()}

          <TableList
            title={() => (
              <Button icon="plus" type="primary" onClick={() => this.onAddClick()}>
                新建
              </Button>
            )}
            loading={loading}
            rowKey={record => record.desc.code}
            dataSource={list}
            columns={columns}
            pagination={paginationProps}
            onChange={this.onTableChange}
          />
        </Card>

        {this.renderDataForm()}
        {this.renderDataDetail()}
      </PageHeaderLayout>
    );
  }
}
