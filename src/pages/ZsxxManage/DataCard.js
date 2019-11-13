import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, InputNumber, Row, Col, Select } from 'antd';
import RichText from '../../components/RichText/RichText';
import PicturesWall from '../../components/PicturesWall/PicturesWall';
import { ExtraInput, VideoInput } from '../../components/Info';
import { CONST_BUILDING_TYPE } from '../../utils/Consts';
import { DicSelect } from '@/components/Dictionary';
import ParkSelect from '../../components/ParkList/ParkSelect';

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
@connect(state => ({
  columnManage: state.columnManage,
  zsxxManage: state.zsxxManage,
}))
@Form.create()
export default class DataCard extends PureComponent {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }

  componentDidMount() {
    const { id, callback } = this.props;
    this.props.dispatch({
      type: 'zsxxManage/loadForm',
      payload: {
        id,
        callback,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'zsxxManage/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  onModalOKClick = () => {
    this.formSubmit();
  };

  onOrgChange = org => {
    this.props.dispatch({
      type: 'columnManage/queryColumnTree',
      org: org.target.value,
      column: '',
    });
  };

  onChangePark = value => {
    this.props.dispatch({
      type: 'building/queryBuildings',
      buildingType: CONST_BUILDING_TYPE.AREA,
      parentId: value,
    });
  };

  onClomunChange = value => {
    if (!value) return;
    this.props.dispatch({
      type: 'zsxxManage/fetchFormExtra',
      columnId: value,
    });
  };

  formSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        if (formData.tags && typeof formData.tags === 'string') {
          formData.tags = formData.tags.split(/\s+/);
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

        formData.Kind = 1;
        this.props.dispatch({
          type: 'zsxxManage/submitDesc',
          payload: formData,
        });
      }
    });
  };

  showExtra = () => {
    const {
      zsxxManage: { formData },
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
        </Col>
      );
    });
  };

  onChangePark = value => {
    this.props.dispatch({
      type: 'zsxxManage/queryBuildingList',

      park_id: value,
    });
  };

  render() {
    const {
      zsxxManage: { formTitle, formVisible, formData, submitting, areas },
      form: { getFieldDecorator },
    } = this.props;

    const desc = formData.desc ? formData.desc : {};
    const extras = desc && desc.extras ? desc.extras : {};

    const editorProps = {
      height: 200,
    };
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
          </Row>
          <Row gutter={8} type="flex" justify="space-between">
            <Col {...formCol}>
              <Form.Item {...formItemLayout} label="园区">
                {getFieldDecorator('extras.yq', {
                  initialValue: extras.yq,
                  rules: [
                    {
                      required: true,
                      message: '请输入园区',
                    },
                  ],
                })(<ParkSelect onChange={this.onChangePark} />)}
              </Form.Item>
            </Col>
            <Col {...formCol}>
              <Form.Item {...formItemLayout} label="区域">
                {getFieldDecorator('extras.qy', {
                  initialValue: extras.qy,
                  rules: [
                    {
                      required: true,
                      message: '请输入区域',
                    },
                  ],
                })(
                  <Select>
                    {areas.map(item => (
                      <Option key={item.record_id} value={item.record_id}>
                        {item.code}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8} type="flex" justify="space-between">
            <Col {...formCol}>
              <FormItem {...formItemLayout} label="分类">
                {getFieldDecorator('extras.fl', {
                  initialValue: extras.fl,
                  rules: [
                    {
                      required: true,
                      message: '请输入分类',
                    },
                  ],
                })(<DicSelect pcode="cms$#zsxx$#fl" />)}
              </FormItem>
            </Col>
            <Col {...formCol}>
              <FormItem {...formItemLayout} label="租售方式">
                {getFieldDecorator('extras.zsfs', {
                  initialValue: extras.zsfs,
                  rules: [
                    {
                      required: true,
                      message: '请输入租售方式',
                    },
                  ],
                })(<DicSelect pcode="cms$#zsxx$#zsfs" />)}
              </FormItem>
            </Col>
            <Col {...formCol}>
              <Form.Item {...formItemLayout} label="面积">
                {getFieldDecorator('extras.mj', {
                  initialValue: extras.mj,
                  rules: [
                    {
                      required: true,
                      message: '请输入面积',
                    },
                  ],
                })(<InputNumber maxLength={12} />)}
                <span>
                  平方米(m
                  <sup>2</sup>)
                </span>
              </Form.Item>
            </Col>
            <Col {...formCol}>
              <Form.Item {...formItemLayout} label="地址">
                {getFieldDecorator('extras.dz', {
                  initialValue: extras.dz,
                  rules: [
                    {
                      required: true,
                      message: '请输入地址',
                    },
                  ],
                })(<Input maxLength={200} />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8} type="flex" justify="space-between">
            <Col {...form2Col}>
              <Form.Item {...formItemLayout} label="图片">
                {getFieldDecorator('icon', {
                  initialValue: fIcons,
                  rules: [
                    {
                      required: false,
                      message: '请输入图片',
                    },
                  ],
                })(
                  <PicturesWall
                    accept="image/*"
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
            <Col {...form2Col}>
              <Form.Item {...formItemLayout} label="视频">
                {getFieldDecorator('extras.sp', {
                  initialValue: extras.sp,
                  rules: [
                    {
                      required: false,
                      message: '请输入视频',
                    },
                  ],
                })(<VideoInput />)}
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
              <FormItem {...formRichItemLayout} label="详情">
                {getFieldDecorator('content', {
                  required: true,
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
