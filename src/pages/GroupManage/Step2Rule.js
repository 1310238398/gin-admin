import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, TreeSelect } from 'antd';
import { OrgSelect } from '../../components/Org';

const FormItem = Form.Item;
@connect(state => ({
  columnManage: state.columnManage,
}))
@Form.create()
export default class Step2Rule extends PureComponent {
  constructor(props) {
    super(props);
    const { data } = props;
    this.state = { edit: data, columnName: '' };
  }

  componentDidMount() {
    const { data } = this.props;
    this.props.dispatch({
      type: 'columnManage/queryColumnTree',
      org: data.org,
      owner: data.own,
    });
  }

  onChangeKind = e => {
    const { edit } = this.state;
    edit.kind = e;
    this.setState({ edit });
  };

  onOrgChange = org => {
    const {
      edit: { own },
    } = this.state;
    this.props.dispatch({
      type: 'columnManage/queryColumnTree',
      org,
      owner: own,
      column: '',
    });
  };

  onOwnChange = own => {
    const {
      edit: { org },
    } = this.state;
    this.props.dispatch({
      type: 'columnManage/queryColumnTree',
      org,
      owner: own.target.value,
      column: '',
    });
  };

  onSubmit = () => {
    const { columnName } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        const { callback } = this.props;
        if (formData.tags === '') {
          formData.tags = [];
        } else if (formData.tags && typeof formData.tags === 'string') {
          formData.tags = formData.tags.split(/\s+/);
        }
        const {
          edit: { id },
        } = this.state;
        if (id) {
          formData.id = id;
        }
        if (formData.column_id === this.state.edit.column_id) {
          formData.column_name = this.state.edit.column_name;
        } else if (formData.column_id && columnName && columnName !== '') {
          formData.column_name = columnName;
        }
        callback(formData);
      }
    });
  };

  onClomunChange = (value, label) => {
    this.setState({ columnName: label[0] });
  };

  render() {
    const { edit } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 14 },
      },
    };
    let tags = '';
    if (edit.tags) {
      tags = edit.tags.join(' ');
    }
    return (
      <Form>
        <FormItem {...formItemLayout} label="组织">
          {getFieldDecorator('org', {
            initialValue: edit.org,
            rules: [
              {
                required: false,
                message: '请输入组织编号',
              },
            ],
          })(<OrgSelect onChange={this.onOrgChange} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="所有者">
          {getFieldDecorator('own', {
            initialValue: edit.own,
            rules: [
              {
                required: false,
                message: '请输入所有者编号',
              },
            ],
          })(<Input placeholder="请输入" maxLength="24" onChange={this.onOwnChange} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="栏目">
          {getFieldDecorator('column_id', {
            initialValue: edit.column_id,
            rules: [
              {
                required: false,
              },
            ],
          })(
            <TreeSelect
              style={{ width: '100%' }}
              treeData={this.props.columnManage.treeData}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请选择栏目"
              treeDefaultExpandAll
              allowClear
              showSearch
              onChange={this.onClomunChange}
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="关键字">
          {getFieldDecorator('key', {
            initialValue: edit.key,
            rules: [
              {
                required: false,
                message: '请输入关键字',
              },
            ],
          })(<Input placeholder="请输入" maxLength="100" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="标签">
          {getFieldDecorator('tags', {
            initialValue: tags,
            rules: [
              {
                required: false,
                message: '请输入标签',
              },
            ],
          })(<Input placeholder="请输入，多个标签使用空格分割" maxLength="100" />)}
        </FormItem>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            textAlign: 'right',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px',
          }}
        >
          <Button onClick={this.onSubmit} type="primary">
            确定
          </Button>
        </div>
      </Form>
    );
  }
}
