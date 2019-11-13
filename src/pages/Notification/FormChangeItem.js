import React from 'react';
import { Modal, Form, Row, Col, Select, Button } from 'antd';
import { connect } from 'dva';
import UserSelect from '../../components/UserSelect/UserSelect';
import EnterpriseSelect from '../../components/EnterpriseSelect';
import { DicSelect } from '@/components/Dictionary';
import DictionaryCascader from '@/components/DictionnaryNo/Cascader/index';

@Form.create()
@connect(state => ({
  enterprise: state.enterprise,
}))
export default class FormChangeItem extends React.PureComponent {
  state = {
    bu_id: [],
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'enterprise/enterPriseFlagList',
    });
  }

  sendOut = () => {
    const { callback } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.bu_type = parseInt(this.props.outItem, 10);
        const ranges = [];
        if (values.bu_type && values.bu_id && Array.isArray(values.bu_id)) {
          for (let i = 0; i < values.bu_id.length; i += 1) {
            ranges.push({ bu_type: values.bu_type, bu_id: values.bu_id[i].toString(),notification_id:'',record_id:'' });
          }
        }else if(values.bu_type && values.bu_id ){
          ranges.push({bu_type:values.bu_type,bu_id:values.bu_id})
        }
        values.ranges = ranges;
        delete values.bu_type;
        delete values.bu_id;
        callback(values);
      }
    });
  };

  onModalCancelClick = () => {
    this.props.closeBack();
  };

  render() {
    const {
      form: { getFieldDecorator },
      enterprise: { enterpriseTagList },
    } = this.props;
    const { outItem } = this.props;
    const { Option } = Select;
    let footerJsx = [];

    footerJsx = [
      <Button key="editClose" onClick={this.onModalCancelClick}>
        关闭{' '}
      </Button>,
      <Button key="editSendOut" type="primary" onClick={() => this.sendOut()}>
        保存
      </Button>,
    ];

    // const CheckboxGroup = Checkbox.Group;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

    // const plainOptions = ['推送通知', '短信通知'];
    return (
      <Modal
        visible
        title="发布通知对象"
        width={600}
        footer={footerJsx}
        onCancel={this.onModalCancelClick}
        maskClosable={false}
      >
        <Form>
          {outItem === '1' ? (
            <Row>
              <Col md={20} sm={20}>
                <Form.Item {...formItemLayout} label="通知对象">
                  {getFieldDecorator('bu_id', {
                    initialValue: this.state.bu_id ? this.state.bu_id : [],
                    rules: [
                      {
                        required: true,
                        message: '请选择通知对象',
                      },
                    ],
                  })(<EnterpriseSelect mode="multiple" />)}
                </Form.Item>
              </Col>
            </Row>
          ) : null}
          {outItem === '2' ? (
            <Row>
              <Col md={20} sm={20}>
                <Form.Item {...formItemLayout} label="通知对象">
                  {getFieldDecorator('bu_id', {
                    initialValue: this.state.bu_id ? this.state.bu_id : [],
                    rules: [
                      {
                        required: true,
                        message: '请选择通知对象',
                      },
                    ],
                  })(<UserSelect mode="multiple" type="get" />)}
                </Form.Item>
              </Col>
            </Row>
          ) : null}
          {outItem === '3' ? (
            <Row>
              <Col md={20} sm={20}>
                <Form.Item {...formItemLayout} label="通知对象">
                  {getFieldDecorator('bu_id', {
                    initialValue: this.state.bu_id ? this.state.bu_id : [],
                    rules: [
                      {
                        required: true,
                        message: '请选择通知对象',
                      },
                    ],
                  })(
                    <Select mode="multiple" onChange={this.ChangeFlag}>
                      {enterpriseTagList &&
                        enterpriseTagList.map(v => {
                          return (
                            <Option key={v.code} value={v.code}>
                              {v.name}
                            </Option>
                          );
                        })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          ) : null}
          {outItem === '4' ? (
            <Row>
              <Col md={20} sm={20}>
                <Form.Item {...formItemLayout} label="通知对象">
                  {getFieldDecorator('bu_id', {
                    initialValue:
                      this.state.bu_id && this.state.bu_id.length > 0 ? this.state.bu_id[0] : '',
                    rules: [
                      {
                        required: true,
                        message: '请选择通知对象',
                      },
                    ],
                  })(<DictionaryCascader code="ops$#role_category" level="-1" />)}
                </Form.Item>
              </Col>
            </Row>
          ) : null}
          {outItem === '5' ? (
            <Row>
              <Col md={20} sm={20}>
                <Form.Item {...formItemLayout} label="通知对象">
                  {getFieldDecorator('bu_id', {
                    initialValue: this.state.bu_id ? this.state.bu_id : [],
                    rules: [
                      {
                        required: true,
                        message: '请选择通知对象',
                      },
                    ],
                  })(
                    <DicSelect
                      vmode="int"
                      pcode="OPER$#enterprise_category_industry"
                      selectProps={{ mode: 'multiple', placeholder: '请选择' }}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          ) : null}
        </Form>
      </Modal>
    );
  }
}
