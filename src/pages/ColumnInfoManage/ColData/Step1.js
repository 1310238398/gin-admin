import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Row, Col } from 'antd';
import RichText from '../../../components/RichText/RichText';
import PicturesWall from '../../../components/PicturesWall/PicturesWall';

const FormItem = Form.Item;

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
@connect(state => ({
  columnInfoCol: state.columnInfoCol,
}))
@Form.create()
export default class Step1 extends PureComponent {
  constructor(props) {
    super(props);
    const { id, callback } = props;
    callback(this.formSubmit);
    if (id) {
      this.props.dispatch({
        type: 'columnInfoCol/fetchFormDesc',
        payload: id,
      });
    }
  }

  onOrgChange = org => {
    this.props.dispatch({
      type: 'columnInfoCol/queryColumnTree',
      org: org.target.value,
      column: '',
    });
  };

  formSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...this.props.columnInfoCol.formData, ...values };
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
        this.props.dispatch({
          type: 'columnInfoCol/submitDesc',
          payload: formData,
        });
      }
    });
  };

  render() {
    const {
      columnInfoCol: { formData, formID },
      form: { getFieldDecorator },
    } = this.props;
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
            if (formID) {
              return (
                <Col {...formCol}>
                  <FormItem {...formItemLayout} label="栏目编号">
                    {formID}
                  </FormItem>
                </Col>
              );
            }
          })()}

          <Col {...formCol}>
            <FormItem {...formItemLayout} label="栏目名称">
              {formData.name}
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
