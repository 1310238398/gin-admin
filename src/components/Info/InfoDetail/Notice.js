import React, { PureComponent } from 'react';
import { parseUtcTime } from '@/utils/utils';
import { Button, Modal, Form, Input, Select, message } from 'antd';
import TableList from '@/components/TableList';
import UserShow from '@/components/UserShow';
import infos from '@/services/s_infoManage';
import { FormCard, FormItem } from '@/components/FormCard';
import EnterpriseSelect from '@/components/EnterpriseSelect';
import UserSelect from '@/components/UserSelect/UserSelect';

@Form.create()
export default class Notice extends PureComponent {
  state = {
    list: [],
    pagination: null,
    loading: false,
    noticeObject: 0,
    noticeUser: 0,
  };

  componentDidMount() {
    this.fetchNoticeList();
  }

  fetchNoticeList = async p => {
    const {
      dataSource: { info_id },
    } = this.props;
    this.setState({ loading: true });
    const resp = await infos.queryInfoNotices(info_id, p);

    const { list, pagination } = resp;
    this.setState({ list, pagination, loading: false });
  };

  onTableChange = pagination => {
    this.fetchNoticeList(pagination);
  };

  onNewNotice = () => {
    this.setState({ visible: true });
  };

  onModalOKClick = () => {
    const {
      dataSource: { info_id },
    } = this.props;
    // 提交
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        values.receive_group_type = parseInt(values.receive_group_type, 10);
        const resp = await infos.postInfoNotices(info_id, values);
        if (resp && resp === 'ok') {
          //
          message.success('发送成功');
          this.setState({ visible: false });
          this.fetchNoticeList();
        }
      }
    });
  };

  onModalCancelClick = () => {
    this.setState({ visible: false });
  };

  onChangeObject = value => {
    if (value === '7' || value === '6') {
      this.setState({
        noticeObject: true,
      });
    } else {
      this.setState({
        noticeObject: false,
      });
    }
    if (value === '8') {
      this.setState({
        noticeUser: true,
      });
    } else {
      this.setState({
        noticeUser: false,
      });
    }
  };

  renderNoticeList = () => {
    const { loading, list, pagination } = this.state;

    const columns = [
      {
        title: '标题',
        dataIndex: 'desc.title',
      },
      {
        title: '创建人',
        dataIndex: 'desc.creator',
        width: 100,
        render: val => {
          return <UserShow uid={val} />;
        },
      },
      {
        title: '创建时间',
        dataIndex: 'desc.cre_time',
        width: 200,
        render: val => {
          return <span> {parseUtcTime(val)} </span>;
        },
      },
    ];

    const prop = {
      title: () => (
        <Button
          type="primary"
          icon="plus"
          onClick={() => {
            this.onNewNotice();
          }}
        >
          新建
        </Button>
      ),
      loading,
      rowKey: record => record.id,
      columns,
      dataSource: list,
      pagination,
      onChange: this.onTableChange,
    };
    return <TableList {...prop} />;
  };

  render() {
    const { dataSource, form } = this.props;
    const { getFieldDecorator } = form;
    const { visible } = this.state;
    const {
      desc: { title },
    } = dataSource;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 8 },
        lg: { span: 6 },
        xl: { span: 6 },
        xxl: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 16 },
        lg: { span: 18 },
        xl: { span: 18 },
        xxl: { span: 20 },
      },
    };
    return (
      <div>
        {this.renderNoticeList()}
        <Modal
          title="创建通知"
          visible={visible}
          maskClosable={false}
          // confirmLoading={submitting}
          width={500}
          destroyOnClose
          onOk={this.onModalOKClick}
          onCancel={this.onModalCancelClick}
        >
          <FormCard>
            <FormItem col={1} {...formItemLayout} label="标题">
              {getFieldDecorator('notice_title', {
                initialValue: `关于《${title}》的通知`,
                rules: [
                  {
                    required: true,
                    message: '请输入标题',
                  },
                ],
              })(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem col={1} {...formItemLayout} label="目标群体">
              {getFieldDecorator('receive_group_type', {
                rules: [
                  {
                    required: true,
                    message: '请选择目标群体',
                  },
                ],
              })(
                <Select onChange={this.onChangeObject}>
                  <Select.Option value="1">所有企业管理员</Select.Option>
                  <Select.Option value="2">所有用户</Select.Option>
                  <Select.Option value="3">所有游客</Select.Option>
                  <Select.Option value="4">所有未认证用户</Select.Option>
                  <Select.Option value="5">所有认证用户</Select.Option>
                  <Select.Option value="6">指定企业管理员</Select.Option>
                  <Select.Option value="7">指定企业全员</Select.Option>
                  <Select.Option value="8">指定用户</Select.Option>
                </Select>
              )}
            </FormItem>

            {this.state.noticeObject && (
              <FormItem col={1} {...formItemLayout} label="通知对象">
                {getFieldDecorator('receive_group', {})(<EnterpriseSelect mode="multiple" />)}
              </FormItem>
            )}
            {this.state.noticeUser && (
              <FormItem col={1} {...formItemLayout} label="通知对象">
                {getFieldDecorator('receive_group', {})(<UserSelect mode="multiple" />)}
              </FormItem>
            )}
            <FormItem col={1} {...formItemLayout} label="通知内容">
              {getFieldDecorator('notice_content', {
                rules: [
                  {
                    required: true,
                    message: '请输入通知内容',
                  },
                ],
              })(
                <Input.TextArea
                  placeholder="请输入通知内容"
                  autosize={{ minRows: 2, maxRows: 6 }}
                  disabled={this.state.fromDisabled}
                />
              )}
            </FormItem>
          </FormCard>
        </Modal>
      </div>
    );
  }
}
