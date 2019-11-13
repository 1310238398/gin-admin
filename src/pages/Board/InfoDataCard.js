import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, TreeSelect, Row, Col, Select } from 'antd';
import RichText from '../../components/RichText/RichText';
import PicturesWall from '../../components/PicturesWall/PicturesWall';
import ExtraInput from '../../components/Cms/ExtraInput';

const { Option } = Select;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
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
const formCol = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 12 },
  lg: { span: 12 },
  xl: { span: 12 },
  xxl: { span: 8 },
};
const form2Col = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 12 },
  lg: { span: 12 },
  xl: { span: 12 },
  xxl: { span: 12 },
};
// const formDescCol = {
//   xs: { span: 24 },
//   sm: { span: 24 },
//   md: { span: 24 },
//   lg: { span: 24 },
//   xl: { span: 12 },
//   xxl: { span: 12 },
// };
@connect(state => ({
  boardManage: state.boardManage,
  boardInfo: state.boardInfo,
}))
@Form.create()
export default class InfoDataCard extends PureComponent {
  componentDidMount() {
    const { id, callback } = this.props;
    this.props.dispatch({
      type: 'boardInfo/loadForm',
      payload: {
        id,
        callback,
      },
    });
    this.props.dispatch({
      type: 'boardManage/queryColumnTree1',
      org: this.props.boardManage.orgid,
      column: '',
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'boardInfo/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  onModalOKClick = () => {
    this.formSubmit();
  };

  onClomunChange = value => {
    if (!value) return;
    this.props.dispatch({
      type: 'boardInfo/fetchFormExtra',
      columnId: value,
    });
  };

  formSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        if (formData.list_mode === 4) {
          if (
            !formData.banner ||
            (Array.isArray(formData.banner) && formData.banner.length === 0)
          ) {
            this.props.form.setFields({
              banner: {
                value: [],
                errors: [new Error('显示旗帜图片模式必须上传旗帜图片')],
              },
            });
            return;
          }
        } else if (formData.list_mode === 2 || formData.list_mode === 3) {
          if (!formData.icon || (Array.isArray(formData.icon) && formData.icon.length === 0)) {
            this.props.form.setFields({
              icon: {
                value: [],
                errors: [new Error('图标至少上传一张图片')],
              },
            });
            return;
          }
        }
        if (formData.tags && typeof formData.tags === 'string') {
          if (formData.tags === '') {
            formData.tags = [];
          } else {
            formData.tags = formData.tags.split(/\s+/);
          }
        } else {
          formData.tags = [];
        }
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
        formData.Kind = 1;
        this.props.dispatch({
          type: 'boardInfo/submitDesc',
          payload: formData,
        });
      }
    });
  };

  showExtra = () => {
    const {
      boardInfo: { formData },
      form,
    } = this.props;

    const { ctrl } = formData;
    if (!ctrl) {
      return;
    }
    const { desc } = formData;
    return ctrl.map(item => {
      const initv = desc && desc.extras && desc.extras[item.code] ? desc.extras[item.code] : '';
      const prop = {
        ctrl: item,
        value: initv,
        formItemLayout,
        form,
      };
      return (
        <Col {...formCol} key={`extras_${item.code}`}>
          <ExtraInput {...prop} />
          {/* <Form.Item {...formItemLayout} label={item.name}>
            {getFieldDecorator(`extras.${item.code}`, {
              initialValue: initv,
              rules: [
                {
                  required: item.required,
                  message: item.message,
                },
              ],
            })(<Input placeholder={item.placeholder} maxLength={100} />)}
          </Form.Item> */}
        </Col>
      );
    });
  };

  render() {
    const {
      boardInfo: { formTitle, formVisible, formData, submitting },
      form: { getFieldDecorator },
    } = this.props;

    const desc = formData.desc ? formData.desc : {};

    const editorProps = {
      height: 200,
    };
    const tags = desc.tags ? desc.tags.join(' ') : '';
    let fIcons = [];
    let fBanner = [];
    const { banner, icon } = desc;
    if (banner) {
      fBanner = [banner];
    }
    if (icon && icon.length) {
      fIcons = icon;
    }
    return (
      <Modal
        title={formTitle}
        visible={formVisible}
        width="70%"
        maskClosable={false}
        confirmLoading={submitting}
        destroyOnClose
        onOk={this.onModalOKClick}
        onCancel={this.onModalCancelClick}
        style={{ top: 20 }}
        bodyStyle={{ maxWidth: 1280, height: 500, overflowY: 'auto' }}
      >
        <Form>
          <Row gutter={8} type="flex" justify="space-between">
            <Col {...formCol}>
              <Form.Item {...formItemLayout} label="标题">
                {getFieldDecorator('title', {
                  initialValue: desc.title,
                  rules: [
                    {
                      required: true,
                      message: '请输入标题',
                    },
                  ],
                })(<Input placeholder="请输入" maxLength={100} />)}
              </Form.Item>
            </Col>
            <Col {...formCol}>
              <Form.Item {...formItemLayout} label="副标题">
                {getFieldDecorator('sub_title', {
                  initialValue: desc.sub_title,
                  rules: [
                    {
                      required: false,
                      message: '请输入副标题',
                    },
                  ],
                })(<Input placeholder="请输入" maxLength={100} />)}
              </Form.Item>
            </Col>
            <Col {...formCol}>
              <FormItem {...formItemLayout} label="所属栏目">
                {getFieldDecorator('column_id', {
                  initialValue: desc.column_id,
                  rules: [
                    {
                      required: true,
                      message: '选择栏目',
                    },
                  ],
                })(
                  <TreeSelect
                    showSearch
                    style={{ width: '100%' }}
                    treeData={this.props.boardManage.configTreeData}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="请选择栏目"
                    treeDefaultExpandAll
                    allowClear
                    onChange={this.onClomunChange}
                  />
                )}
              </FormItem>
            </Col>
            <Col {...formCol}>
              <Form.Item {...formItemLayout} label="来源">
                {getFieldDecorator('from', {
                  initialValue: desc.from,
                  rules: [
                    {
                      required: false,
                      message: '请输入来源',
                    },
                  ],
                })(<Input placeholder="请输入" maxLength={100} />)}
              </Form.Item>
            </Col>
            <Col {...formCol}>
              <Form.Item {...formItemLayout} label="列表显示模式">
                {getFieldDecorator('list_mode', {
                  initialValue: desc.list_mode,
                  rules: [
                    {
                      required: false,
                      message: '请选择列表显示模式',
                    },
                  ],
                })(
                  <Select>
                    <Option value={0}>自动</Option>
                    <Option value={1}>文本模式</Option>
                    <Option value={2}>左图右文</Option>
                    <Option value={3}>上文下图</Option>
                    <Option value={4}>显示旗帜图片</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col {...formCol}>
              <Form.Item {...formItemLayout} label="标签">
                {getFieldDecorator('tags', {
                  initialValue: tags,
                  rules: [
                    {
                      required: false,
                      message: '标签',
                    },
                  ],
                })(<Input placeholder="请输入标签,多个使用空格分割" />)}
              </Form.Item>
            </Col>
            {this.showExtra()}
          </Row>
          <Row gutter={8} type="flex" justify="space-between">
            <Col {...form2Col}>
              <Form.Item {...formItemLayout} label="图标">
                {getFieldDecorator('icon', {
                  initialValue: fIcons,
                  rules: [
                    {
                      required: false,
                      message: '请输入图标',
                    },
                  ],
                })(
                  <PicturesWall
                    bucket="cms"
                    name="data"
                    num={9}
                    listType="picture-card"
                    rich={this.inputElement}
                  />
                )}
              </Form.Item>
            </Col>
            <Col {...form2Col}>
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
            <Col span={24}>
              <Form.Item {...formRichItemLayout} label="简介">
                {getFieldDecorator('desc', {
                  initialValue: desc.desc,
                  rules: [
                    {
                      required: false,
                      message: '请输入简介',
                    },
                  ],
                })(<Input.TextArea placeholder="请输入" maxLength={500} rows={4} />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <FormItem {...formRichItemLayout} label="内容">
                {getFieldDecorator('content', {
                  initialValue: desc.content,
                })(
                  <RichText
                    rich={editorProps}
                    ref={elem => {
                      this.inputElement = elem;
                    }}
                  />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
