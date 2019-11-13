import React, { PureComponent } from 'react';
import { Form, Input, TreeSelect, Select, Row, Col, message } from 'antd';
import RichText from '../../RichText/RichText';
import PicturesWall from '../../PicturesWall/PicturesWall';
import columns from '../../../services/s_columnManage';
import { OrgSelect } from '../../Org';

const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
    md: { span: 6 },
    lg: { span: 6 },
    xl: { span: 6 },
    xxl: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 17 },
    md: { span: 18 },
    lg: { span: 18 },
    xl: { span: 18 },
    xxl: { span: 18 },
  },
};

const formRichItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 24 },
    xl: { span: 24 },
    xxl: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
  },
};

const editorProps = {
  height: 200,
};
const formCol = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 12 },
  lg: { span: 12 },
  xl: { span: 12 },
  xxl: { span: 8 },
};
const formDescCol = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 24 },
  lg: { span: 24 },
  xl: { span: 12 },
  xxl: { span: 12 },
};
// @connect(state => ({
//   columnManage: state.columnManage,
// }))
@Form.create()
export default class Step1 extends PureComponent {
  constructor(props) {
    super(props);
    const { callback } = this.props;
    callback(this.formSubmit);
  }

  state = {
    formData: {},
    treeData: [],
  };

  async componentDidMount() {
    const { id, org, owner } = this.props;
    if (id) {
      const response = await columns.queryDesc(id);
      this.setState({ formData: response }, () => {});
    }
    this.fetchColumnTree({ org, owner });
  }

  /**
   * 切换组织时触发事件
   */
  onOrgChange = org => {
    this.fetchColumnTree({ org, column: '' });
  };

  fetchColumnTree = async ({ org, owner, column }) => {
    const response = await columns.queryColumnTree(org, owner, column);
    if (response) {
      this.setState({ treeData: this.filterColumnByID(response) });
    }
  };

  filterColumnByID = data => {
    const { id } = this.props;
    const ndata = data.filter(item => {
      if (item.value === id) {
        return false;
      }
      return true;
    });
    return ndata.map(item => {
      if (item.children && item.children.length > 0) {
        item.children = this.filterColumnByID(item.children);
      }
      return item;
    });
  };

  formSubmit = () => {
    const { org } = this.props;
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const formData = { ...values };
        if (formData.banner && formData.banner.length && typeof formData.banner !== 'string') {
          const tmp = formData.banner[0];
          if (tmp) {
            formData.banner = tmp;
          }
        } else {
          delete formData.banner;
        }
        if (!formData.icon || !formData.icon.length) {
          delete formData.icon;
        }
        if (org) {
          formData.org = org;
          formData.kind = 0;
        }
        const { id, idHandler, nextHandler } = this.props;
        if (id) {
          // 修改
          const response = await columns.submitUpdateDesc(id, formData);
          if (response === 'ok') {
            message.success('保存成功');
            if (nextHandler) nextHandler();
          }
        } else {
          // 新增
          const response = await columns.submitColumnAdd(formData);
          if (response && response.column_id) {
            message.success('保存成功');
            idHandler(response.column_id);
            if (nextHandler) nextHandler();
          }
        }
      }
    });
  };

  render() {
    const {
      org,
      id,
      form: { getFieldDecorator },
    } = this.props;
    const { formData, treeData } = this.state;
    let fIcons = [];
    let fBanner = [];
    // const desc = formData.desc ? formData.desc : {};
    const { banner, icon } = formData;
    if (banner) {
      fBanner = [banner];
    }
    if (icon && icon.length) {
      fIcons = icon;
    }
    return (
      <Form>
        <Row gutter={8} type="flex" justify="space-between">
          {(() => {
            if (id) {
              return (
                <Col {...formCol}>
                  <FormItem {...formItemLayout} label="栏目编号">
                    {id}
                  </FormItem>
                </Col>
              );
            }
          })()}

          <Col {...formCol}>
            <FormItem {...formItemLayout} label="栏目名称">
              {getFieldDecorator('name', {
                initialValue: formData.name,
                rules: [
                  {
                    required: true,
                    message: '请输入栏目名称',
                  },
                ],
              })(<Input placeholder="请输入" maxLength="20" />)}
            </FormItem>
          </Col>
          <Col {...formCol}>
            <FormItem {...formItemLayout} label="栏目短名称">
              {getFieldDecorator('short_name', {
                initialValue: formData.short_name,
                rules: [
                  {
                    required: true,
                    max: 5,
                    message: '请输入栏目短名称,最长不能超过5个字',
                  },
                ],
              })(<Input placeholder="请输入" maxLength={5} />)}
            </FormItem>
          </Col>
          {!org && (
            <Col {...formCol}>
              <FormItem {...formItemLayout} label="栏目类型">
                {getFieldDecorator('kind', {
                  initialValue: formData.kind,
                  rules: [
                    {
                      required: true,
                      message: '请选择栏目类型',
                    },
                  ],
                })(
                  <Select>
                    <Option value={0}>一般栏目</Option>
                    <Option value={1}>系统栏目</Option>
                    <Option value={3}>互动交流</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          )}
          {!org && (
            <Col {...formCol}>
              <FormItem {...formItemLayout} label="所属组织">
                {getFieldDecorator('org', {
                  initialValue: formData.org,
                  rules: [
                    {
                      required: false,
                      message: '请输入所属组织',
                    },
                  ],
                })(<OrgSelect onChange={this.onOrgChange} />)}
              </FormItem>
            </Col>
          )}
          <Col {...formCol}>
            <FormItem {...formItemLayout} label="上级栏目">
              {getFieldDecorator('parent_id', {
                initialValue: formData.parent_id,
                rules: [
                  {
                    required: false,
                    message: '选择栏目',
                  },
                ],
              })(
                <TreeSelect
                  style={{ width: '100%' }}
                  treeData={treeData}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="请选择上级栏目"
                  treeDefaultExpandAll
                  showSearch
                  allowClear
                  treeNodeFilterProp="title"
                  // onChange={this.onClomunChange}
                />
              )}
            </FormItem>
          </Col>
          <Col {...formCol}>
            <Form.Item {...formItemLayout} label="图标">
              {getFieldDecorator('icon', {
                initialValue: fIcons,
                rules: [
                  {
                    required: false,
                    message: '请输入图标',
                  },
                ],
              })(<PicturesWall bucket="cms" name="data" num={9} listType="picture-card" />)}
            </Form.Item>
          </Col>

          <Col {...formCol}>
            <Form.Item {...formItemLayout} label="旗帜">
              {getFieldDecorator('banner', {
                initialValue: fBanner,
                rules: [
                  {
                    required: false,
                    message: '请输入旗帜',
                  },
                ],
              })(<PicturesWall bucket="cms" name="data" num={1} listType="picture" />)}
            </Form.Item>
          </Col>
          <Col {...formDescCol}>
            <FormItem {...formItemLayout} label="简介">
              {getFieldDecorator('desc', {
                initialValue: formData.desc,
              })(<Input.TextArea rows={4} placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formRichItemLayout} label="封面">
              {getFieldDecorator('page', {
                initialValue: formData.page,
              })(<RichText rich={editorProps} />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
