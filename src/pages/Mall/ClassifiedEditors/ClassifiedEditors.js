import React, { PureComponent } from 'react';
// import { Modal, Tag, Button, Card,Table,Menu, Dropdown } from "antd";
import { Form, Input, Button, Radio, TreeSelect, Card } from 'antd';
import { connect } from 'dva';
import PicturesWall from '../../../components/PicturesWall/PicturesWall';
// import styles from './ClassifiedEditors.less';
// const { Option } = Select;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
@Form.create({
  mapPropsToFields: props => {
    return {
      category_name: Form.createFormField({
        value: props.data.category_name,
      }),
      image_path: Form.createFormField({
        value: props.data.image_path && props.data.image_path !== '' ? [props.data.image_path] : [],
      }),
      parent_name: Form.createFormField({
        value: props.data.parent_name,
      }),
      Delivery: Form.createFormField({
        value: props.data.Delivery,
      }),
    };
  },
})
@connect(state => ({
  commodityClassificationmanagement: state.commodityClassificationmanagement,
}))
export default class ClassifiedEditors extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'commodityClassificationmanagement/queryCommClass',
    });
  }

  onClassifiedEditorSaveCallback = () => {
    const { onNewClassifiedEditors, onEditClassifiedEditors } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        formData.parent_id = this.props.data.parent_id;
        // 保存数据
        if (this.props.mode === 1) {
          if (formData.image_path && formData.image_path.length > 0) {
            formData.image_path = formData.image_path.join('');
          } else {
            formData.image_path = '';
          }
          formData.category_id = this.props.data.goods_category_id;

          // 编辑
          this.props.dispatch({
            type: 'commodityClassificationmanagement/EditCommclass',
            params: formData,
          });
          onEditClassifiedEditors();
        } else if (this.props.mode === 2) {
          if (formData.image_path && formData.image_path.length > 0) {
            formData.image_path = formData.image_path.join('');
          } else {
            formData.image_path = '';
          }
          if (formData.parent_name) {
            formData.parent_id = formData.parent_name;
            formData.parent_name = '';
          }
          delete formData.parent_name;
          delete formData.is_leaf;
          // 新建
          this.props.dispatch({
            type: 'commodityClassificationmanagement/insertCommclass',
            params: formData,
          });
          onNewClassifiedEditors();
        }
      }
    });
  };

  /**
   * 界面渲染
   */
  render() {
    // Item布局
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 10,
        },
      },
    };
    const { getFieldDecorator } = this.props.form;
    const {
      data,
      mode,
      commodityClassificationmanagement: {
        TreeData,
        // attrAllList
      },
    } = this.props;

    const footerJsx = [
      <Button
        style={{ marginRight: 10 }}
        key="close"
        onClick={this.props.onClassifiedEditorsFrameCloseCallback}
      >
        关闭
      </Button>,
      <Button type="primary" key="unauth" onClick={this.onClassifiedEditorSaveCallback}>
        保存
      </Button>,
    ];

    const resultJsx = (
      <Card bordered={false}>
        <Form style={{ maxWidth: 600 }}>
          <div>{mode === 1 ? '商品分类编辑' : '商品分类新建'}</div>
          <Form.Item {...formItemLayout} label="分类名称">
            {getFieldDecorator('category_name', {
              // initialValue: data.category_name,
              rules: [
                {
                  required: true,
                  message: '请输入标题',
                },
              ],
            })(<Input placeholder="请输入" maxLength={100} />)}
          </Form.Item>
          {mode === 1 ? (
            <Form.Item {...formItemLayout} label="父分类">
              {getFieldDecorator('parent_name', {
                // initialValue: data.parent_name,
                rules: [
                  {
                    required: false,
                    message: '请选择',
                  },
                ],
              })(<Input placeholder="请输入" maxLength={100} disabled />)}{' '}
            </Form.Item>
          ) : (
            <Form.Item {...formItemLayout} label="父分类">
              {getFieldDecorator('parent_name', {
                // initialValue: data.parent_name,
                rules: [
                  {
                    required: false,
                    message: '请选择',
                  },
                ],
              })(
                <TreeSelect
                  treeData={TreeData}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="请选择"
                  treeDefaultExpandAll
                  allowClear
                />
              )}{' '}
            </Form.Item>
          )}

          <FormItem {...formItemLayout} label="是否支持配送：">
            {getFieldDecorator('Delivery', {
              // initialValue: data.Delivery,
              rules: [
                {
                  required: false,
                  message: '请选择',
                },
              ],
            })(
              <RadioGroup value={data.Delivery}>
                <Radio value={1} onChange={() => this.changeDelivery()}>
                  是
                </Radio>
                <Radio value={2} onChange={() => this.nochangeDelivery()}>
                  否
                </Radio>
              </RadioGroup>
            )}
          </FormItem>
          <Form.Item {...formItemLayout} label="分类图标">
            {getFieldDecorator('image_path', {
              rules: [
                {
                  required: false,
                  message: '请上传',
                },
              ],
            })(<PicturesWall num={1} bucket="oper" listType="picture-card" />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {/* <Button type="primary" onClick={this.onClassifiedEditorSaveCallback}>保存</Button> */}
            {footerJsx}
          </Form.Item>
        </Form>
      </Card>
    );
    return resultJsx;
  }
}
